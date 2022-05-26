import logging

import board
import adafruit_dht

from rpi.sensors.dht import DHT, DHTResults


class DHT11(DHT):
    '''Interface for the DHT11 sensor'''

    def __init__(self, retry_period: float = 2, data_pin=board.D4) -> None:
        self.__dht_device: adafruit_dht.DHT11 = adafruit_dht.DHT11(data_pin)
        self.__previous: DHTResults = None
        self.__last_time: float = 0
        self.__retry_period: float = retry_period

    def get_data(self, cur_time: float) -> DHTResults:
        '''Get the current temperature and humidity from the sensor.'''

        if cur_time - self.__last_time < self.__retry_period:
            return self.__previous

        try:
            temperature = self.__dht_device.temperature
            humidity = self.__dht_device.humidity

            result = DHTResults(temperature=temperature, humidty=humidity)
            self.__previous = result

            return result
        except RuntimeError as error:
            logging.info(error.args[0])
            self.__last_time = cur_time
            return self.__previous
        except Exception as error:
            self.__dht_device.exit()
            raise error
