import socket
import sys
import time
import signal
import logging

from rpi.utils import config_logger, Config
import rpi.server_connect.core as server_connect
from rpi.sensors.arduino import ArduinoI


def main(arduino: ArduinoI) -> None:
    config_logger()
    logging.info("Starting main thread on %s", socket.gethostname())

    poll_rate: float = Config.poll_rate
    data_controller = server_connect.DataController(["time", "temperature", "humidity", "distance", "plant"])
    data_controller.start()
    stopping = False

    def close_thread():
        nonlocal data_controller
        logging.info("Stopping main thread on %s", socket.gethostname())
        logging.info("Waiting for data controller to finish")
        data_controller.stop()
        data_controller.join()
        logging.info("Exiting...")
        sys.exit(1)

    def exception_handler(ex_type, value, traceback):
        if issubclass(ex_type, KeyboardInterrupt):
            sys.__excepthook__(ex_type, value, traceback)

        logging.exception("Uncaught exception",
                          exc_info=(ex_type, value, traceback))

        close_thread()

    sys.excepthook = exception_handler

    def signal_handler(_s, _f):
        nonlocal stopping
        stopping = True

    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    while not stopping:
        cur_time: float = time.time()

        arduino_result = arduino.get_data()

        if arduino_result is not None:
            arduino_result["time"] = cur_time
            arduino_result["plant"] = arduino.port
            data_controller.queue.put(arduino_result)

        time.sleep(poll_rate)

    close_thread()
    sys.exit(0)
