1. npm init -y
2. code .
3. npm install express ejs express-ejs-layouts bcrypt cors --save
4. npm install nodemon --save-dev
5. npm install body-parser --save       // This is a node.js middleware for handling JSON, Raw, Text and URL encoded form data.
6. npm install cookie-parser --save     // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
7. npm install multer --save            // This is a node.js middleware for handling multipart/form-data.
8. npm install debug --save             // A tiny JavaScript debugging utility modelled after Node.js core's debugging technique
9. npm install morgan --save            // HTTP request logger middleware for node.js
10.npm install http-errors --save       // Create HTTP errors for Express
11.npm install dotenv --save            // Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
12.npm install jsonwebtoken --save      // JWT encode and decode for Node.js
13.npm install localStorage --save      // A drop-in substitute for the browser native localStorage API that runs on node.js.
14.npm install axios --save             // For calling web api
15.npm install sequelize pg pg-hstore  --save        // ORM For Postgresql, Mysql, Mssql...vs 
16.npm install sequelize-cli --save     // sequelize-cli
OR npm install sequelize-auto --save

Scafollding Command
sudo ./node_modules/.bin/sequelize-auto -o "./repository/models" -d baseDb -h localhost -u postgres -p 5432 -x postgres -e postgres

