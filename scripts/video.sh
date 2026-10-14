#!/bin/zsh
# Turn a stock clip into the site's looping background film.
#
#   FFMPEG=/path/to/ffmpeg scripts/video.sh <input> <name> <start-s> <length-s> [xfade|pingpong] [slow] [crop]
#
# Takes <length> seconds from <start> and makes a loop with no visible seam:
#   xfade     the last 1.5 s dissolve into the first (for forward motion, e.g. a drone pass)
#   pingpong  plays forward, then in reverse (for gentle glides and pans)
# <slow> stretches time (1.2 turns 30 fps footage into calm 25 fps). Audio is dropped.
# <crop> (e.g. 16:9) cuts the desktop versions as a centred band of that aspect from the full-
# resolution frame, for portrait footage shown in a wide section; phones keep the whole frame.
#
# Writes public/video/<name>-1440.mp4 (AV1, sharpest), -1080.mp4 (H.264) and -720.mp4 (H.264, for
# phones), sized by the short side unless cropped. The loop's opening frame is saved as
# ./<name>-poster.png for scripts/images.py.
set -euo pipefail
FF=${FFMPEG:-ffmpeg}
IN=$1 NAME=$2 START=$3 LEN=$4 MODE=${5:-xfade} SLOW=${6:-1} CROP=${7:-}
X=1.5
OUT=${0:A:h}/../public/video
mkdir -p "$OUT"
TMP=$(mktemp -d)
q() { "$FF" -hide_banner -loglevel error -y "$@"; }
short() { echo "scale='if(gt(iw,ih),-2,$1)':'if(gt(iw,ih),$1,-2)':flags=lanczos"; }

if [[ $MODE == pingpong ]]; then
  LOOP="[0:v]split[f][r];[r]reverse[rv];[f][rv]concat=n=2:v=1:a=0"
  POSTER_AT=0
else
  OFFSET=$(printf "%.3f" $(( LEN - 2 * X )))
  LOOP="[0:v]split[a][b];[a]trim=${X}:${LEN},setpts=PTS-STARTPTS[main];[b]trim=0:${X},setpts=PTS-STARTPTS[head];[main][head]xfade=transition=fade:duration=${X}:offset=${OFFSET}"
  POSTER_AT=$X
fi
[[ $SLOW != 1 ]] && LOOP="${LOOP},setpts=${SLOW}*PTS,fps=25"

# a high-quality loop from <filter>, so the reverse filter never holds full 4K frames
loop() { # <filter> <tag>
  q -ss "$START" -t "$LEN" -i "$IN" -an -vf "$1,format=yuv420p" -c:v libx264 -preset slow -crf 12 "$TMP/src-$2.mp4"
  q -i "$TMP/src-$2.mp4" -filter_complex "${LOOP},format=yuv420p" -c:v libx264 -preset slow -crf 12 "$TMP/loop-$2.mp4"
}
av1() { q -i "$1" -an -vf "$2" -c:v libsvtav1 -preset 5 -crf 34 -g 120 -movflags +faststart "$3"; }
avc() { q -i "$1" -an -vf "$2" -c:v libx264 -preset slow -crf "$4" -profile:v high -level:v "$5" -pix_fmt yuv420p -movflags +faststart "$3"; }  # explicit level: older decoders refuse 5.x

loop "$(short 1440)" full
avc "$TMP/loop-full.mp4" "$(short 720)" "$OUT/$NAME-720.mp4" 26 3.1
if [[ -n $CROP ]]; then
  CW=${CROP%%:*} CH=${CROP##*:}
  loop "crop=iw:trunc(iw*$CH/$CW/2)*2" band
  av1 "$TMP/loop-band.mp4" "scale='min(iw,2560)':-2:flags=lanczos" "$OUT/$NAME-1440.mp4"
  avc "$TMP/loop-band.mp4" "scale=1920:-2:flags=lanczos" "$OUT/$NAME-1080.mp4" 24 4.1
else
  av1 "$TMP/loop-full.mp4" "null" "$OUT/$NAME-1440.mp4"
  avc "$TMP/loop-full.mp4" "$(short 1080)" "$OUT/$NAME-1080.mp4" 23 4.1
fi

# poster: the loop's opening frame, from the full-resolution source
q -ss "$(printf "%.3f" $(( START + POSTER_AT )))" -i "$IN" -frames:v 1 "$NAME-poster.png"
rm -rf "$TMP"
ls -la "$OUT"/$NAME-*.mp4
