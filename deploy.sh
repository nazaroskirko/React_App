#!/bin/sh
npm run build
eval $(ssh-agent)
ssh-add /Users/pavel/.amazon/epicalls.pem
rsync -azv ./build/* ubuntu@app.epicalls.com:/home/ubuntu/Sites/epicalls/epicalls_build/
