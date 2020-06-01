#!/bin/bash

export ENDPOINT="https://localhost:8443/hellotls"
env | grep '^ENDPOINT='

export CA=`cat ../certs/localhost/ca-crt.pem`
env | grep '^CA='
