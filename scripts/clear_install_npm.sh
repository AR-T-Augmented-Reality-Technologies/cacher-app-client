#!/bin/bash

echo "Deleting 'node_modules' & 'package-lock.json'"
rm -rf ./node_modules/
rm -rf package-lock.json
rm -rf build/

echo "Running 'npm clear cache --force'"
npm cache clear --force

echo "Running 'npm i'"
npm i

