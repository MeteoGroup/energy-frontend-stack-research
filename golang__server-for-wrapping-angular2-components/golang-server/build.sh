#!/bin/bash
# IMPORTANT!!! -> Requires setting $GOPATH and $GOROOT system variables


function build() {
    echo "Installing packages..."
    cd $GOPATH/src;
    for i in $(ls -d ./github.com/amisiuda/<<REPO_NAME>>/*/);
    do
        PKG="${i%%/}";
        echo "* istalling $PKG...";
        var=$($GOROOT/bin/go install $PKG  2>&1 > /dev/null);
        if [ -n "$var" ]
        then
            echo -e "\e[31mERROR: ${var}";
            echo -e "\e[39m"
            exit 1
        fi
    done
    cd ../;
}


function test() {
    echo "Testing build..."
    cd $GOPATH/src;
    for i in $(ls -d ./github.com/amisiuda/<<REPO_NAME>>/*/);
    do
        PKG="${i%%/}";
        echo "* testing $PKG...";
        if [ "$PKG" == "./github.com/amisiuda/<<REPO_NAME>>/widget" ]
        then
            var=$($GOROOT/bin/go test $PKG -widgetsPath "$GOPATH/public/widgets/" 2>&1)
        else
            var=$($GOROOT/bin/go test $PKG 2>&1)
        fi
        if [ -n "$var" ]
        then
            echo -e "\e[31mERROR: ${var}";
            echo -e "\e[39m"
        fi
    done
    cd ../;
}


pwd=$PWD
build
test
cd $pwd
