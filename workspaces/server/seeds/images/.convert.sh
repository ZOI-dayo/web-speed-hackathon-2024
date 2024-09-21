#!/bin/bash

# Convert all files in this dir to webp
cd `dirname $0`
for f in *; do
  if [ -f "$f" ]; then
    ffmpeg -i "$f" "${f%.*}.webp"
  fi
done