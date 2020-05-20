#!/bin/sh

# Configuration Source
export MAIL_HOST="localhost"
env | grep '^MAIL_HOST='

# Spring Cloud Config Endpoint
export MAIL_PORT="1025"
env | grep '^MAIL_PORT='

# Configuration File
export MAIL_SECURE="false"
env | grep '^MAIL_SECURE='

# App Port
export MAIL_USER="nouser"
env | grep '^MAIL_USER='

# Api File
export MAIL_PASS="nopass"
env | grep '^MAIL_PASS='