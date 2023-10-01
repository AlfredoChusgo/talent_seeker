# environment setup
### database setup
#### build the image 
docker build -t <image-name>:<tag> <path-to-dockerfile-directory>
docker build -t mongodb:v1 ./backend/mongo_db
#### run the image 
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
<!-- docker run -d mongodb:v1 -->
docker run -d -p 27017:27017 mongodb

docker exec -it my-mongodb-container /bin/bash




list images docker image ls
remove images docker rmi [OPTIONS] IMAGE [IMAGE...]
docker rmi my-image

#### list containers 
docker ps 
#### list all containers running/stopped
docker ps -a

#### remove container 
docker rm my-container

#### run image 
docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:latest