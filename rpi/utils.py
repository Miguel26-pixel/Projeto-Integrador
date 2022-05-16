from dotenv import dotenv_values

config = dotenv_values(".env")


def check_in_config(key):
    if key in config.keys():
        result = config[key]
        if result == "":
            return None
        else:
            return result

    return None
