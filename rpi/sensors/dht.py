import time
import board
import adafruit_dht

from typing import Tuple

class DHTResults:
	def __init__(self, temperature, humidity):
		self.temperature = temperature
		self.humidity = humidity

class DHT11:
	def __init__(self, data_pin = board.D4) -> None:
		self.__dhtDevice: adafruit_dht.DHT11 = adafruit_dht.DHT11(data_pin)
		self.__previous: DHTResults = None
		self.__last_time: float = 0
		
	def get_data(self) -> DHTResults:
		cur_time = time.time()
		
		if cur_time - self.__last_time < 2:
			print("test")
			return self.__previous
		
		try:
			temperature = self.__dhtDevice.temperature
			humidity = self.__dhtDevice.humidity
			self.__last_time = time.time()
			
			return DHTResults(temperature, humidity)
		except RuntimeError as error:
			return self.__previous
		except Exception as error:
			return self.__previous

