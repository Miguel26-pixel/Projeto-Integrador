import server_connect.core as server_connect
import board
import time
import socket
from utils import config_logger, Config
from sensors.dht import DHT11, DHTResults


def main():
    config_logger()
    
    poll_rate: float = Config.poll_rate
    data_controller = server_connect.DataController()
    dht11: DHT11 = DHT11(data_pin = board.D4)
    
    while True:
        cur_time: float = time.time()
        
        dht_result: DTHResults = dht11.get_data(cur_time)
        if dht_result is not None:
            data_controller.send_data(socket.gethostname(),
                        {
                            'time': cur_time,
                            'temperature': dht_result.temperature,
                            'humidity': dht_result.humidity,
                        }
            )
        
        time.sleep(poll_rate)


if __name__ == "__main__":
    main()
