#!/bin/bash

# download tests
rm -rf devoir-4-tests
git clone https://github.com/UPB-FILS-ALF/devoir-4-tests.git

# run all tests
./devoir-4-tests/run.sh
