create .env.local file like .env.example

scp -r dist/\* payly:/var/www/payly/client

ssh payly

sudo systemctl restart nginx.service

# Deploy using PuTTY

cd client-construction-share

npm run build
pscp -r dist/\* itadmin@192.168.0.10:/var/www/payly/client/
plink itadmin@192.168.0.10 "sudo systemctl restart nginx"

1q2w3e!@A98lk

# Check file permissions

sudo chown -R www-data:www-data /var/www/payly/client/
sudo chmod -R 755 /var/www/payly/client/
