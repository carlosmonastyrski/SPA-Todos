#!/usr/bin/env bash
#!/usr/local/bin/npm

cd front-todos
echo "Installing Frontend dependencies"
npm install
echo "Starting application"
(npm run start&)
cd ../

cd back-todos
echo "Installing Backend dependencies"
npm install
echo "Starting docker-compose"
docker-compose up
echo "Starting docker DB"
docker-compose -f docker.compose.yml -d
echo "Waiting for docker to initialize"
sleep 10

echo "Starting application"
(npm run start:dev&)
cd ../
