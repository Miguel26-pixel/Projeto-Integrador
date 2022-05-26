## INSTRUCTIONS

### SETTING UP DEPENDENCIES

Run the following command:

	pip3 install -r requirements.txt

### SETTING UP WI-FI

Run the following command:

	sudo raspi-config

- Select option "2 Network Options"
- Select option "N1 Hostname"
- Enter a hostname for the Raspberry Pi. This is used to identify the Raspberry Pi whenever it sends data to the server.
- Select option "2 Network Options" again
- Select option "N2 Wi-fi"
- Enter the SSID of the network the Raspberry Pi will connect to. Then, after being prompted, enter the passphrase for that network.
- Select option "3 Boot Options"
- Select option "B2 Wait for Network at Boot"
- Select Yes.
- Select Finish

### SETTING UP ENV VARIABLES

Edit the .env file with the following information:

	SERVER_IP=<ip address of server> // use only if SERVER_HOSTNAME not set, specify port
	SERVER_HOSTNAME=<url of server> // use only if SERVER_IP not set, specify port
	HTTP_PROTOCOL=<http protocol of server> // http OR https
	CONNECTION_TRIES=<number of attempts to retry connection> // -1 for infinite attempts, default: 1
	CONNECTION_TIMEOUT=<number of seconds waited to retry failed connection> // default: 1
	CONNECTION_TIMEOUT_INC=<number of seconds added for each consecutive failed connection> // default: 0
	LOG_FILE=<path_to_log_file> // default: log.log
    STORAGE=<path_to_store_file> // default: storage/store.csv
	
### SETTING UP RUN ON STARTUP

Run the following command:

	crontab -e
	
Choose your preferred editor and at the end of the file append this line:

	@reboot cd <path_to_project_folder> ; python3 . &
	
Where <path_to_project_folder> is the folder where the \_\_main\_\_.py file is stored.
