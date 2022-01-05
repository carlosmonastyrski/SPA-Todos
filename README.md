# SPA-Todos
This is a simple web application that allows you to create to-do items and folders to group them

##Startin
_This instructions will let you set evetything up for this SPA application_

**Pre-Requirements 📋
```
npm :  7.5.4 
```
```
MySql :  5.7.25
```
```
Docker :  20.10.11
```
```
React : 17.0.2
```
```
MUI  :  5.2.7
```
```
In both projects you can find a file named package.json where you can see the other dependencies with their exact version like axios/typeorm/etc
```

## Installation 🔧

```
The following steps are the manual way to install everything. There is also an automatic way to do this
but it's for linux users just by executing the .sh file in the root folder of the project
```

### First lets set up the backend:

The Back-End was developed in Nestjs (a Nodejs framework) and runs in the port 4000. The database is mysql that runs in a docker container

Enter in back-todo folder, and run the following commands

Install all the dependencies
```
npm install
```
Configure the docker container
```
docker-compose -f docker.compose.yml up -d
```
Run the server
```
run start:dev
```

### Now the frontend:

The Front-End was developed in React and runs in the port 3000

Enter in front-todo folder, and run the following commands

Install all the dependencies
```
npm install
```
Run the server
```
npm start
```