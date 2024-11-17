# COMP4977_Project_Database_ts

## To start mysql locally
brew services start mysql
mysql -u root -p -h localhost -P 3306

## To migrate
 npx sequelize-cli db:migrate
 ### If you want to specify migration file
 npx sequelize-cli migration:generate --name drop-userId-column-from-chat
