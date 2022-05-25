from server_connect.utils import get_url
from utils import Config
from collections import deque
import json
import time
import logging
import requests


class DataController:
    def __init__(self):
        self.__tries = Config.tries
        self.__timeout_inc = Config.timeout_inc
        self.__timeout = Config.timeout
        self.__store_path = Config.store
        self.__unsaved = self.__get_unsaved()

    def __general_request(self, request_func):
        remaining_tries = self.__tries
        cur_timeout = self.__timeout

        if remaining_tries == -1:
            def condition(): return True
        else:
            def condition(): return remaining_tries > 0

        while True:
            try:
                return request_func()
            except:
                remaining_tries = remaining_tries - 1
                if not condition():
                    break

                logging.warning(
                    "Couldn't connect. Trying again in {} seconds.".format(cur_timeout))
                time.sleep(cur_timeout)
                cur_timeout = cur_timeout + self.__timeout_inc

        raise ConnectionError()

    def __post(self, url, path, body):
        return self.__general_request(lambda: requests.post("{}/api/{}".format(url, path), json=body))

    def __get_unsaved(self):
        try:
            with open("storage/unsaved.json", "r") as storage:
                try:
                    stored_unsaved = json.load(storage)
                    unsaved = deque(stored_unsaved['unsaved'])
                except:
                    unsaved = deque()

            return unsaved
        except:
            return deque()

    def __store_unsaved(self):
        with open("storage/unsaved.json", "w") as storage:
            storage.write(json.dumps({'unsaved': list(self.__unsaved)}))

    def __store_data(self, body):
        with open(self.__store_path, "a") as store:
            for _, value in body.items():
                store.write(str(value) + ",")
            store.write("\n")

    def send_data(self, hostname, data):
        self.__store_data(data)
        url = get_url()
        self.__unsaved.append(data)

        while len(self.__unsaved) > 0:
            to_send = {
                'hostname': hostname,
                'data': [self.__unsaved[0]]
            }

            try:
                response = self.__post(url, "sendData", to_send)
            except:
                logging.warning("Couldn't connect to {}.".format(url))
                break
            else:
                if response.status_code != 200:
                    logging.warning("Couldn't connect to {}.".format(url))
                    break

                self.__unsaved.popleft()

        self.__store_unsaved()
