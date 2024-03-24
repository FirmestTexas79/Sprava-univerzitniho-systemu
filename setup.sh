#!/bin/bash

# Run docker-compose for MySQL in detached mode
docker-compose -f database/docker-compose-mysql.yml up -d

# Setup project
npm run project:init

# Navigate to the server directory
cd server

# Install server dependencies
npm install

# Run start:dev script
npm run start:dev &

# Navigate back to the root directory
cd ..

# Navigate to the client directory
cd client

# Install client dependencies
npm install

# Run the client start script
npm start &

# run sh ./setup.sh