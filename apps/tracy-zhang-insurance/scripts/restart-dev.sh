#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3000}"
PATHNAME="${1:-/}"
DEV_HOST="${DEV_HOST:-localhost}"

cd "$(dirname "$0")/.."

kill_port() {
  local port="$1"
  local pids
  pids="$(lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "$pids" ]]; then
    # shellcheck disable=SC2086
    kill -9 $pids 2>/dev/null || true
  fi
}

wait_for_http() {
  local url="$1"
  local attempts="${2:-40}"
  local sleep_s="${3:-0.25}"
  local i
  for i in $(seq 1 "$attempts"); do
    if curl -fsS -o /dev/null "$url" 2>/dev/null; then
      return 0
    fi
    sleep "$sleep_s"
  done
  return 1
}

kill_port "$PORT"

rm -f .dev.log
osascript >/dev/null 2>&1 <<EOF
tell application "Terminal"
  activate
  do script "cd $(pwd) && npm run dev -- --port $PORT --hostname $DEV_HOST | tee .dev.log"
end tell
EOF

URL="http://${DEV_HOST}:${PORT}${PATHNAME}"
if ! wait_for_http "$URL" 60 0.25; then
  echo "Dev server did not become ready. See $(pwd)/.dev.log" >&2
  exit 1
fi

if osascript >/dev/null 2>&1 <<EOF
tell application "Google Chrome"
  activate
  if (count of windows) = 0 then make new window end if
  set URL of active tab of front window to "$URL"
end tell
EOF
then
  exit 0
fi

if osascript >/dev/null 2>&1 <<EOF
tell application "Safari"
  activate
  open location "$URL"
end tell
EOF
then
  exit 0
fi

open "$URL"
