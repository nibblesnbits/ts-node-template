#! /bin/sh

docker build --secret id=npmrc,src=$HOME/.npmrc -t my-org/my-api -f ./Dockerfile .
