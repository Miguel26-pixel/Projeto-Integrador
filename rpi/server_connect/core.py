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

    while condition():
        try:
            return request_func()
        except:
            logging.warning("Couldn't connect. Trying again in {} seconds.".format(cur_timeout))
            time.sleep(cur_timeout)
            cur_timeout = cur_timeout + timeout_inc
            remaining_tries = remaining_tries - 1

    raise ConnectionError()


def post(url, path, body):
    return general_request(lambda: requests.post("{}/api/{}".format(url, path), data=body))


def store_unsaved(body):
    logging.warning("Couldn't connect.")

    with open("storage/unsaved.json", "a+") as storage:
        storage.seek(0)

        try:
            unsaved = json.load(storage)
            unsaved['unsaved'].append(body)
        except:
            unsaved = {'unsaved':[body]}

        storage.seek(0)
        storage.truncate()
        storage.write(json.dumps(unsaved))

def send_data(body):
    url = get_url()
    try:
        response = post(url, "sendData", body)
    except:
        store_unsaved(body)
    else:
        if response.status_code != 200:
            store_unsaved(body)

