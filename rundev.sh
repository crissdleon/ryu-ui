#!/bin/bash

MATTERMOST_REMOTE="http://localhost:8000"


if [[ $MATTERMOST_REMOTE == */ ]]; then
	echo "MATTERMOST_REMOTE should not end with a slash (it should only the protocol and the domain; no path)" >&2
	exit 1
fi

mitmproxy -s mitm_cors.py --mode "reverse:$MATTERMOST_REMOTE"

