#!/bin/bash

# Declaring variable
# name="Ben"

# Let's ask for name and print it
# echo "What's you name"

# read name

# put name when run this script
name=$1 #Positional parameters

# Some more variable
user=$(whoami)
whereami=$(pwd)
date=$(date)
wheather=$(curl wttr.in)


echo "Good Morning $name"
sleep 1s
echo "You're looking good $name"
sleep 1s
echo "You have the best $2 I'v ever seen $name"
sleep 2

echo "You are currently logged in as $user and you are in the directory $whereami. ALso tody is: $date 😅😅"

echo "$wheather wheather prited"