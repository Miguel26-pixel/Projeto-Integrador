## INSTRUCTIONS

### SETTING UP OS

First, update current packages

	sudo apt update
	sudo apt dist-upgrade
	sudo apt autoremove
	sudo apt autoclean

Then reboot the system.
Afterwards, edit the /etc/apt/sources.list file, changing your OS version ("stretch" for example) to "buster" in the line:

	deb http://..... <replace_with_buster> main contrib non-free rpi

And edit the /etc/apt/sources.list.d/raspi.list file the same way.
Finally, run the following commands, which should take a long time to complete:

	sudo apt update
	sudo apt dist-upgrade
	sudo apt autoremove
	sudo apt autoclean

If the Raspberry Pi boots up to a terminal, you may need to do the following (usually, login is "pi" and password is "raspberry"):

	sudo apt install xserver-xorg-video-fbturbo

OR

	sudo raspi_config

And setup Boot Options and select to boot up with Desktop with automated password and change the resolution in advanced settings.

### SETTING UP DEPENDENCIES

First run the following commands:

	sudo pip3 install --upgrade setuptools

Finally, run the following command:

	sudo pip3 install -r requirements.txt

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

Create a .env file inside the rpi/ directory with the following information:

	SERVER_IP=<ip address of server> // use only if SERVER_HOSTNAME not set, specify port
	SERVER_HOSTNAME=<url of server> // use only if SERVER_IP not set, specify port
	HTTP_PROTOCOL=<http protocol of server> // http OR https
	CONNECTION_TRIES=<number of attempts to retry connection> // -1 for infinite attempts, default: 1
	CONNECTION_TIMEOUT=<number of seconds waited to retry failed connection> // default: 1
	CONNECTION_TIMEOUT_INC=<number of seconds added for each consecutive failed connection> // default: 0
	POLL_RATE=<number of seconds between each sensor read> // default: 0.01
	CHUNK_SIZE=<number of sensor samples to send per server connection> // default: 10
	LOG_FILE=<path_to_log_file> // default: log.log
    STORAGE=<path_to_store_file> // default: storage/store.csv

A file .env.template in the directory where this README file is stored is an example on how to correctly set the .env file
	
### SETTING UP RUN ON STARTUP

Run the following command:

	crontab -e
	
Choose your preferred editor and at the end of the file append this line:

	@reboot cd <path_to_project_folder> ; python3 -m rpi &
	
Where <path_to_project_folder> is the folder where the rpi/ directory is stored in.
