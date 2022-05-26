from abc import abstractmethod
from collections import namedtuple

DHTResults = namedtuple("DHTResults", ["temperature", "humidity"])


class DHT:
    '''Interface for the DHT sensor'''

    @abstractmethod
    def get_data(self, cur_time: float) -> DHTResults:
        '''Get the current temperature and humidity from the sensor.'''
