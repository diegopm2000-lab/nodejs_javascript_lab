#!/bin/bash

export PORT="8443"
env | grep '^PORT='

export KEY=`cat ../certs/localhost/private-key.pem`
env | grep '^KEY='

export CERT=`cat ../certs/localhost/public-cert.pem`
env | grep '^CERT='


