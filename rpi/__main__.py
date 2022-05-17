import server_connect.core as server_connect
import logging
import sys
from utils import check_in_config
from datetime import datetime

log_file_name = check_in_config("LOG_FILE")
if log_file_name is None:
	log_file_name = "logs/log.log"
	
cur_date = datetime.now().strftime("_%Y-%m-%d_%H:%M:%S.")

log_file_name = log_file_name.rsplit(".", 1)
log_file_name = cur_date.join(log_file_name)
logging.basicConfig(filename=log_file_name, filemode="w", format="%(asctime)s %(levelname)s %(message)s", level=logging.INFO)

def exception_handler(type, value, tb):
    if issubclass(type, KeyboardInterrupt):
        sys.__excepthook__(type, value, tb)
	
    logging.exception("Uncaught exception", exc_info=(type, value, tb))
	
sys.excepthook = exception_handler

server_connect.send_data({'hostname':'pi', 'temp': '22'})
server_connect.send_data({'hostname':'pi', 'temp': '23'})
server_connect.send_data({'hostname':'pi', 'temp': '24'})
server_connect.send_data({'hostname':'pi', 'temp': '25'})
server_connect.send_data({'hostname':'pi', 'temp': '26'})

