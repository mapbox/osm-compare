#!/bin/sh
if [ ! -f landmarks.spatialite ]; then
  echo "Downloading landmarks database from S3 ...";
  curl -s https://s3.amazonaws.com/vandalism-dynamosm-support/landmarksupdate.spatialite -o landmarks.spatialite
fi
