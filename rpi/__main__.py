import server_connect.core as server_connect
from utils import config_logger


def main():
    config_logger()
    data_controller = server_connect.DataController()

    data_controller.send_data({'hostname': 'pi', 'temp': '22'})
    data_controller.send_data({'hostname': 'pi', 'temp': '23'})
    data_controller.send_data({'hostname': 'pi', 'temp': '24'})
    data_controller.send_data({'hostname': 'pi', 'temp': '25'})
    data_controller.send_data({'hostname': 'pi', 'temp': '26'})


if __name__ == "__main__":
    main()
