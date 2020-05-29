#!/bin/bash

export ENDPOINT="https://localhost:8443/hellotls"
env | grep '^ENDPOINT='

export CERT=`cat ../certs/localhost/public-cert.pem`
env | grep '^CERT='
