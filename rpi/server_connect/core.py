from dotenv import dotenv_values
import os
import requests

config = dotenv_values(".env")

def check_in_config(key):
	if key in config.keys():
		result = config[key]
		if result == "":
			return None
		else:
			return result
			
	return None

def connect():
	hostname = check_in_config("SERVER_HOSTNAME")
	if hostname is None:
		hostname = check_in_config("SERVER_IP")
		if hostname is None:
			print("No server hostname given, stopping...")
			exit(1)

	protocol = check_in_config("HTTP_PROTOCOL")
	if protocol is None:
		print("No HTTP protocol given, stopping...")
		exit(1)
	
	response = requests.get("{}://{}/api/sendData".format(protocol, hostname), headers={'host':'localhost'})
	print(response)
