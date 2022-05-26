import time
import socket

from rpi.utils import config_logger, Config
import rpi.server_connect.core as server_connect
from rpi.sensors.dht import DHT, DHTResults


def main(dht_sensor: DHT) -> None:
    config_logger()

    poll_rate: float = Config.poll_rate
    data_controller = server_connect.DataController()

    while True:
        cur_time: float = time.time()

        dht_result: DHTResults = dht_sensor.get_data(cur_time)
        if dht_result is not None:
            data_controller.send_data(socket.gethostname(),
                                      {
                'time': cur_time,
                'temperature': dht_result.temperature,
                'humidity':  dht_result.humidity,
            })

        time.sleep(poll_rate)
