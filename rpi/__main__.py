import server_connect.core as server_connect
import board
import time
from utils import config_logger
from sensors.dht import DHT11, DHTResults


def main():
    config_logger()
    data_controller = server_connect.DataController()
    dht11: DHT11 = DHT11(board.D4)
    
    while True:
        dht_result: DTHResults = dht11.get_data()
        if(dht_result is not None):
            print("{:.1f} {}%".format(dht_result.temperature, dht_result.humidity))
        
        time.sleep(0.5)

    data_controller.send_data({'hostname': 'pi', 'temp': '22'})
    data_controller.send_data({'hostname': 'pi', 'temp': '23'})
    data_controller.send_data({'hostname': 'pi', 'temp': '24'})
    data_controller.send_data({'hostname': 'pi', 'temp': '25'})
    data_controller.send_data({'hostname': 'pi', 'temp': '26'})


if __name__ == "__main__":
    main()
