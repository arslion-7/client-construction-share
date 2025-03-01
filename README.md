create .env.local file like .env.example

scp -r dist/\* payly:/var/www/payly/client

ssh payly

sudo systemctl restart nginx.service
