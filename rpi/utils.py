import logging
import sys
from datetime import datetime
from dotenv import dotenv_values

config = dotenv_values(".env")

def check_in_config(key):
    if key in config.keys():
        result = config[key]
        if result == "":
            return None
        else:
            return result

    return None

class Config:
    poll_rate = check_in_config("POLL_RATE")
    try:
        poll_rate: float = float(self.poll_rate)
    except:
        poll_rate:float = 2.0
        
    tries = check_in_config("CONNECTION_TRIES")
    try:
        tries = int(tries)
    except:
        tries = 1

    timeout_inc = check_in_config("CONNECTION_TIMEOUT_INC")
    try:
        timeout_inc = int(self.timeout_inc)
    except:
        timeout_inc = 0

    timeout = check_in_config("CONNECTION_TIMEOUT")
    try:
        timeout = self.int(self.timeout)
    except:
        timeout = 1
        
    log_file_name = check_in_config("LOG_FILE")
    if log_file_name is None:
        log_file_name = "logs/log.log"

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

    def exception_handler(type, value, tb):
        if issubclass(type, KeyboardInterrupt):
            sys.__excepthook__(type, value, tb)

        logging.exception("Uncaught exception", exc_info=(type, value, tb))

    sys.excepthook = exception_handler
