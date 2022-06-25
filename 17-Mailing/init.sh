#!/bin/sh

export MAIL_HOST="localhost"
env | grep '^MAIL_HOST='

export MAIL_PORT="1025"
env | grep '^MAIL_PORT='

export MAIL_SECURE="false"
env | grep '^MAIL_SECURE='

export MAIL_USER="nouser"
env | grep '^MAIL_USER='

export MAIL_PASS="nopass"
env | grep '^MAIL_PASS='

export MAIL_FROM="sender@mailtest.com"
env | grep '^MAIL_FROM='

export MAIL_TO="receiver@mailtest.com"
env | grep '^MAIL_TO='

export MAIL_SUBJECT="mail test"
env | grep '^MAIL_SUBJECT='

export MAIL_TEXT="This is a mail test"
env | grep '^MAIL_TEXT='