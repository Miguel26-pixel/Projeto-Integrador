import board
import adafruit_dht

from typing import Tuple

class DHTResults:
	def __init__(self, temperature, humidity):
		self.temperature = temperature
		self.humidity = humidity

class DHT11:
	def __init__(self, retry_period: float = 2, data_pin = board.D4) -> None:
		self.__dhtDevice: adafruit_dht.DHT11 = adafruit_dht.DHT11(data_pin)
		self.__previous: DHTResults = None
		self.__last_time: float = 0
		self.__retry_period: float = retry_period
		
	def get_data(self, cur_time: float) -> DHTResults:
		if cur_time - self.__last_time < self.__retry_period:
			return self.__previous
		
		try:
			temperature = self.__dhtDevice.temperature
			humidity = self.__dhtDevice.humidity
			
			result = DHTResults(temperature, humidity)
			self.__previous = result
			
			return result
		except RuntimeError as error:
			self.__last_time = cur_time
			return self.__previous
		except Exception as error:
			dhtDevice.exit()
			raise error

