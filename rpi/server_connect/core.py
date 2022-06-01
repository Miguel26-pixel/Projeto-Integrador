from server_connect.utils import get_url
from utils import check_in_config
from collections import deque
import json
import time
import logging
import requests


class DataController:
    def __init__(self):
        self.tries = check_in_config("CONNECTION_TRIES")
        try:
            self.tries = int(self.tries)
        except:
            self.tries = 1

        self.timeout_inc = check_in_config("CONNECTION_TIMEOUT_INC")
        try:
            self.timeout_inc = int(self.timeout_inc)
        except:
            self.timeout_inc = 0

        self.timeout = check_in_config("CONNECTION_TIMEOUT")
        try:
            self.timeout = self.int(self.timeout)
        except:
            self.timeout = 1

        self.store = check_in_config("STORAGE")
        if self.store is None:
            self.store = "storage/store.csv"

        self.unsaved = self.get_unsaved()

    def general_request(self, request_func):
        remaining_tries = self.tries
        cur_timeout = self.timeout

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
                cur_timeout = cur_timeout + self.timeout_inc

        raise ConnectionError()

    def post(self, url, path, body):
        return self.general_request(lambda: requests.post("{}/api/{}".format(url, path), data=body))

    def get_unsaved(self):
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

    def store_unsaved(self, unsaved):
        with open("storage/unsaved.json", "w") as storage:
            storage.write(json.dumps({'unsaved': list(unsaved)}))

    def store_data(self, body):
        with open("storage/store.csv", "a") as store:
            for _, value in body.items():
                store.write(value + ",")
            store.write("\n")

    def send_data(self, body):
        self.store_data(body)
        url = get_url()
        self.unsaved.append(body)

        while len(self.unsaved) > 0:
            data = self.unsaved[0]

            try:
                response = self.post(url, "sendData", data)
            except:
                logging.warning("Couldn't connect to {}.".format(url))
                break
            else:
                if response.status_code != 200:
                    logging.warning("Couldn't connect to {}.".format(url))
                    break

                self.unsaved.popleft()

        self.store_unsaved(self.unsaved)
