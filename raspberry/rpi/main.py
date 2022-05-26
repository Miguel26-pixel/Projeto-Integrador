import socket
import sys
import time
import signal
import logging

from rpi.utils import config_logger, Config
import rpi.server_connect.core as server_connect
from rpi.sensors.dht import DHT, DHTResults


def main(dht_sensor: DHT) -> None:
    config_logger()
    logging.info("Starting main thread on %s", socket.gethostname())

    poll_rate: float = Config.poll_rate
    data_controller = server_connect.DataController()
    data_controller.start()
    stopping = False

    def signal_handler(_s, _f):
        nonlocal stopping
        stopping = True

    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    while not stopping:
        cur_time: float = time.time()

        dht_result: DHTResults = dht_sensor.get_data(cur_time)
        if dht_result is not None:
            data_controller.queue.put({
                'time': cur_time,
                'temperature': dht_result.temperature,
                'humidity':  dht_result.humidity,
            })

        time.sleep(poll_rate)

    logging.info("Stopping main thread on %s", socket.gethostname())
    logging.info("Waiting for data controller to finish")
    data_controller.stop()
    data_controller.join()
    logging.info("Exiting...")
    sys.exit(0)
