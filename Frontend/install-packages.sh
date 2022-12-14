#!/bin/bash

sudo rm -rf node_modules yarn.lock
npm install
yarn import
yarn install --check-files
