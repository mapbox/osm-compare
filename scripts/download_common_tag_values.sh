#!/bin/sh
readonly HIGHWAY_FILE="common_tag_values/highway.json"

if [ ! -f $HIGHWAY_FILE ]; then
  echo "Downloading common tags from taginfo"
  curl -s "https://taginfo.openstreetmap.org/api/4/key/values?key=highway" -o "$HIGHWAY_FILE"
fi
