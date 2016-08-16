#!/bin/bash

export GOROOT=<<GOLANG_PATH>>

__pwd=$PWD
installDir=$PWD
if [ ! "$1" == "" ]
then
    installDir=$1
fi

if [ ! -d "$installDir" ]
then
    echo "ERROR: Path: '$installDir' does not exist!"
    exit
fi

scriptDir="`dirname \"$0\"`"
if [ "$scriptDir" == "$installDir" ]
then
    echo "ERROR: Installation in sources directory is not supported!"
    exit
fi

packageName=${scriptDir##*/}

export GOPATH="$installDir"
export GOBIN="$installDir/bin"

function prepareDir {
    if [ -d $1 ]
    then 
        rm "$1" -r
    fi
    mkdir "$1"
}

function createStructure {
    echo "Preparing project's structure..."
    prepareDir "$installDir/bin"
    prepareDir "$installDir/pkg"
    prepareDir "$installDir/src"
    prepareDir "$installDir/public"
    prepareDir "$installDir/public/widgets"
    prepareDir "$installDir/src/github.com"
    prepareDir "$installDir/src/github.com/amisiuda"
    prepareDir "$installDir/src/github.com/amisiuda/$packageName"
}


function copyFiles {
    echo "Copying requred files..."
    cp "$scriptDir/golang-server/assertw" "$installDir/src/github.com/amisiuda/$packageName/" -R
    cp "$scriptDir/golang-server/errors" "$installDir/src/github.com/amisiuda/$packageName/" -R
    cp "$scriptDir/golang-server/server" "$installDir/src/github.com/amisiuda/$packageName/" -R
    cp "$scriptDir/golang-server/url" "$installDir/src/github.com/amisiuda/$packageName/" -R
    cp "$scriptDir/golang-server/widget" "$installDir/src/github.com/amisiuda/$packageName/" -R
    cp "$scriptDir/golang-server/build.sh" "$installDir/src/github.com/amisiuda/$packageName/build.sh"
    eval "cp $scriptDir/angular2-app/* $installDir/public -R"
    packagePlaceholder="<<REPO_NAME>>"
    eval "grep -lZr \"$packagePlaceholder\" --exclude-dir=./$packageName ./ | xargs -0 -l sed -i \"s/$packagePlaceholder/$packageName/g\""
}

function getDependencies {
    echo "Installing 'testify' library..."
    prepareDir "$installDir/src/github.com/stretchr/"
    pwd=$PWD
    cd "$installDir/src/github.com/stretchr/"
    git clone https://github.com/stretchr/testify.git
    cd "$pwd"
}

function installServer {
    echo "Installing server..."
    cd "$installDir/src/"
    export GOPATH="$installDir"
    export GOBIN="$installDir/bin"
    source "$installDir/src/github.com/amisiuda/$packageName/build.sh"
    cd "$__pwd"
}

function createTestMainProject {
    echo "Installing test 'main' project..."
    prepareDir "$installDir/src/main"
    mainProjFile="$installDir/src/main/main.go"
    touch "$mainProjFile"
    echo "package main" >> "$mainProjFile"
    echo "import \"github.com/amisiuda/$packageName/server\"" >> "$mainProjFile"
    echo "func main() {" >> "$mainProjFile"
    echo "    server.Run()" >> "$mainProjFile"
    echo "}" >> "$mainProjFile"

    cd "$installDir/src/"
    eval "$GOROOT/bin/go install $mainProjFile"
    cd "$__pwd"
}

createStructure
copyFiles
getDependencies
installServer
createTestMainProject
