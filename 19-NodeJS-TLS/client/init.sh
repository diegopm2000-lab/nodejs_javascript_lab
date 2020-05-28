#!/bin/bash

export HOSTNAME="localhost"
env | grep '^HOSTNAME='

export PORT="8443"
env | grep '^PORT='

export CERT=`cat ../certs/localhost/public-cert.pem`
env | grep '^CERT='
