#!/bin/bash

export ENDPOINT="https://localhost:8443/hellotls"
env | grep '^ENDPOINT='

export CA=`cat ../certs/localhost/ca-crt.pem`
env | grep '^CA='

export KEY=`cat ../certs/client/client2-key.pem`
env | grep '^KEY='

export CERT=`cat ../certs/client/client2-crt.pem`
env | grep '^CERT='