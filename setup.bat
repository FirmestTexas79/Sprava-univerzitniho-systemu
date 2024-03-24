@echo off

rem Run docker-compose for MySQL in detached mode
docker-compose -f database/docker-compose-mysql.yml up -d

rem Setup project
npm run project:init

rem Navigate to the server directory
cd server

rem Install server dependencies
npm install

rem Run start:dev script
start npm run start:dev

rem Navigate back to the root directory
cd ..

rem Navigate to the client directory
cd client

rem Install client dependencies
npm install

rem Run the client start script
start npm start