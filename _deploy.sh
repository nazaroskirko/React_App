#!/bin/sh
npm run build
eval $(ssh-agent)
ssh-add /Users/pavel/.amazon/demostand.pem
rsync -azv ./build/* ubuntu@simplepro.club:/home/ubuntu/Sites/epicalls/epicalls_build/
