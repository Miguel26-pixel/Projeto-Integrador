import sys
from rpi.utils import check_in_config


class UtilConfigs:
    hostname = check_in_config("SERVER_HOSTNAME")
    if hostname is None:
        hostname = check_in_config("SERVER_IP")
        if hostname is None:
            print("No server hostname given, stopping...")
            sys.exit(1)

    protocol = check_in_config("HTTP_PROTOCOL")
    if protocol is None:
        print("No HTTP protocol given, stopping...")
        sys.exit(1)


def get_url():
    return f"{UtilConfigs.protocol}://{UtilConfigs.hostname}"
