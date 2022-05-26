from collections import deque
from itertools import islice
import time
import logging
import json

import requests

from rpi.server_connect.utils import get_url
from rpi.utils import Config


class DataController:
    def __init__(self):
        self.__tries: int = Config.tries
        self.__timeout_inc: int = Config.timeout_inc
        self.__timeout: int = Config.timeout
        self.__store_path: str = Config.store
        self.__chunk_size: int = Config.chunk_size
        self.__unsaved = self.__get_unsaved()

    def __general_request(self, request_func):
        remaining_tries = self.__tries
        cur_timeout = self.__timeout

        if remaining_tries == -1:
            def condition():
                return True
        else:
            def condition():
                return remaining_tries > 0

        while True:
            try:
                return request_func()
            except Exception as error:
                remaining_tries = remaining_tries - 1
                if not condition():
                    break

                logging.warning(
                    error.args[0]
                )
                logging.warning(
                    "Couldn't connect. Trying again in %d seconds.",
                    cur_timeout
                )
                time.sleep(cur_timeout)
                cur_timeout = cur_timeout + self.__timeout_inc

        raise ConnectionError()

    def __post(self, url, path, body):
        return self.__general_request(lambda: requests.post(f"{url}/api/{path}", json=body))

    def __get_unsaved(self):
        try:
            with open("storage/unsaved.json", "r", encoding="UTF-8") as storage:
                try:
                    stored_unsaved = json.load(storage)
                    unsaved = deque(stored_unsaved['unsaved'])
                except Exception as error:
                    logging.warning(error.args[0])
                    unsaved = deque()

            return unsaved
        except Exception as error:
            logging.warning(error.args[0])
            return deque()

    def __store_unsaved(self):
        with open("storage/unsaved.json", "w", encoding="UTF-8") as storage:
            storage.write(json.dumps({'unsaved': list(self.__unsaved)}))

    def __store_data(self, body):
        with open(self.__store_path, "a", encoding="UTF-8") as store:
            for _, value in body.items():
                store.write(str(value) + ",")
            store.write("\n")

    def send_data(self, hostname, data):
        '''
        Sends chunked data to the server.
        If the server is not available, the data is stored in a temporary file.
        All data is stored in a file.
        '''

        self.__store_data(data)
        url = get_url()
        self.__unsaved.append(data)

        while len(self.__unsaved) > self.__chunk_size:
            to_send = {
                'hostname': hostname,
                'data': list(
                    islice(self.__unsaved, 0, self.__chunk_size)
                )
            }

            try:
                response = self.__post(url, "sendData", to_send)
            except Exception:
                logging.warning("Couldn't connect to %s.", url)
                break
            else:
                if response.status_code != 200:
                    logging.warning("Couldn't connect to %s.", url)
                    break

                for _ in range(self.__chunk_size):
                    self.__unsaved.popleft()

        self.__store_unsaved()
