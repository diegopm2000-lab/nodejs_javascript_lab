#!/bin/bash

export PORT="8443"
env | grep '^PORT='

export KEY=`cat ../certs/localhost/server-key.pem`
env | grep '^KEY='

export CERT=`cat ../certs/localhost/server-crt.pem`
env | grep '^CERT='

export CA=`cat ../certs/localhost/ca-crt.pem`
env | grep '^CA='

export CRL=`cat ../certs/client/ca-crl.pem`
env | grep '^CRL='


