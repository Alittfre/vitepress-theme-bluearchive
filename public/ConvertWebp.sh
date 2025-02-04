#!/usr/bin/env bash
#todo 打包自动转换所有图片为webp

shopt -s extglob nullglob

[[ ! -d ./webp ]] && mkdir ./webp

for f in *.@(bmp|jpg|jpeg|png); do
  ffmpeg -i "$f" -c:v libwebp -quality 80 -compression_level 6 "./webp/${f%.*}.webp"
done
