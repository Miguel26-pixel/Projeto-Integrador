from collections import deque
import json
import os
from server_connect.utils import get_url
from utils import check_in_config
import requests
import time
import logging

tries = check_in_config("CONNECTION_TRIES")
try:
    tries = int(tries)
except:
    tries = 1

timeout_inc = check_in_config("CONNECTION_TIMEOUT_INC")
try:
    timeout_inc = int(timeout_inc)
except:
    timeout_inc = 0

timeout = check_in_config("CONNECTION_TIMEOUT")
try:
    timeout = int(timeout)
except:
    timeout = 1

def general_request(request_func):
    remaining_tries = tries
    cur_timeout = timeout

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

            logging.warning("Couldn't connect. Trying again in {} seconds.".format(cur_timeout))
            time.sleep(cur_timeout)
            cur_timeout = cur_timeout + timeout_inc

    raise ConnectionError()


def post(url, path, body):
    return general_request(lambda: requests.post("{}/api/{}".format(url, path), data=body))


def get_unsaved():
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


def store_unsaved(unsaved):
    with open("storage/unsaved.json", "w") as storage:
        storage.write(json.dumps({'unsaved':list(unsaved)}))

def send_data(body):
    url = get_url()
    unsaved = get_unsaved()
    unsaved.append(body)

    while len(unsaved) > 0:
        data = unsaved[0]

        try:
            response = post(url, "sendData", data)
        except:
            logging.warning("Couldn't connect.")
            store_unsaved(unsaved)
            break
        else:
            if response.status_code != 200:
                logging.warning("Couldn't connect.")
                store_unsaved(unsaved)
                break

            unsaved.popleft()
    
    store_unsaved(unsaved)

