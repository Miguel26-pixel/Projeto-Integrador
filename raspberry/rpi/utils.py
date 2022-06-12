import logging
import sys
import os

from datetime import datetime
from dotenv import dotenv_values


config = dotenv_values(f"{os.path.dirname(os.path.realpath(sys.argv[0]))}/.env")


def check_in_config(key):
    if key in config.keys():
        result = config[key]
        if result == "":
            return None

        return result

    return None


class Config:
    poll_rate = check_in_config("POLL_RATE")
    try:
        poll_rate: float = float(poll_rate)
    except (ValueError, TypeError):
        poll_rate: float = 0.01

    tries = check_in_config("CONNECTION_TRIES")
    try:
        tries = int(tries)
    except (ValueError, TypeError):
        tries = 1

    timeout_inc = check_in_config("CONNECTION_TIMEOUT_INC")
    try:
        timeout_inc = int(timeout_inc)
    except (ValueError, TypeError):
        timeout_inc = 0

    timeout = check_in_config("CONNECTION_TIMEOUT")
    try:
        timeout = int(timeout)
    except (ValueError, TypeError):
        timeout = 1

    chunk_size = check_in_config("CHUNK_SIZE")
    try:
        chunk_size = int(chunk_size)
    except (ValueError, TypeError):
        chunk_size = 10

    log_file_name = check_in_config("LOG_FILE")
    if log_file_name is None:
        log_file_name = "logs/log.log"

    hostname = check_in_config("HOSTNAME")
    if hostname is None:
        hostname = "pi"

    store = check_in_config("STORAGE")
    if store is None:
        store = "storage/store.csv"


def config_logger():
    log_file_name = Config.log_file_name

    cur_date = datetime.now().strftime("_%Y-%m-%d_%H:%M:%S.")

    log_file_name = log_file_name.rsplit(".", 1)
    log_file_name = cur_date.join(log_file_name)
    logging.basicConfig(filename=log_file_name, filemode="w",
                        format="%(asctime)s %(levelname)s %(message)s", level=logging.INFO)
