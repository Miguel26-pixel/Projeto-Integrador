from server_connect.utils import get_url, check_in_config
import os
import requests
import time
	
def general_request(request_func):
	remaining_tries = check_in_config("CONNECTION_TRIES")
	try:
		remaining_tries = int(remaining_tries)
	except:
		remaining_tries = -1
	
	timeout_inc = check_in_config("CONNECTION_TIMEOUT_INC")
	try:
		timeout_inc = int(timeout_inc)
	except:
		timeout_inc = 2
		
	timeout = check_in_config("CONNECTION_TIMEOUT")
	try:
		timeout = int(timeout)
	except:
		timeout = 5
		
	if remaining_tries == -1:
		condition = lambda: True
	else:
		condition = lambda: remaining_tries > 0
		
	while condition():
		try:
			return request_func()
		except:
			print("Couldn't connect. Trying again in {} seconds.".format(timeout))
			time.sleep(timeout)
			timeout = timeout + timeout_inc
			remaining_tries = remaining_tries - 1
			
	raise Error()

def get(url, path):
	return general_request(lambda: requests.get("{}/api/{}".format(url, path)))

def connect():
	url = get_url()
	print("Connecting to {}...".format(url))
	try:
		response = get(url, "")
	except:
		print("Couldn't connect.")
		exit(1)
	else:
		if response.status_code == 200:
			print("Connection successful.")
		else:
			print("Couldn't connect.")
			exit(1)
