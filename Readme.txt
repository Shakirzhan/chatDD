sudo docker-compose up -d

sudo docker-compose down -v

sudo docker-compose ps

sudo chmod 777 /var/www/html/web/assets

composer install --ignore-platform-reqs

sudo docker exec -it chatdd_php_1 bash

php /var/www/app/yii migrate

php yii migrate/create create_messages_table


routes

/login

/signin

/users

/message/<user_id>

autocomplete



