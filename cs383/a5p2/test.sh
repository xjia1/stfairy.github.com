#!/bin/bash
RUNID=$(date "+%Y.%m.%d.%H.%M.%S")
JARS=$(ls jars)

touch java.policy
mkdir -p jars

for JAR in $JARS; do
  ID=${JAR%%.*}
  echo "Testing the program of student $ID ... $(date)"
  java -Djava.security.policy=java.policy -cp gctester.jar:jars/$JAR gctest.Main $ID
done
