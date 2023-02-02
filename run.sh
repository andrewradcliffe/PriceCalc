#!/bin/sh
# checks for updates from git and installs packages
git pull origin master
npm install

#run node server in the background
node server.js&

# make the firewall allow access from other machines in the network
sudo ufw allow 8080/tcp
