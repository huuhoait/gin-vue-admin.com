# docker-compose

## Web Docker Packaging Example

- Using `nginx` image

`my.conf` sourced from [gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin)'s [my.conf](https://github.com/flipped-aurora/gin-vue-admin/blob/master/web/.docker-compose/nginx/conf.d/my.conf)

 ```shell
server {
    listen       8080;
    server_name localhost;

    #charset koi8-r;
    #access_log  logs/host.access.log  main;

    location / {
        root /usr/share/nginx/html;
        add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_set_header Host $http_host;
        proxy_set_header  X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        rewrite ^/api/(.*)$ /$1 break;  #rewrite
        proxy_pass http://177.7.0.12:8888; # Set proxy server protocol and address
     }

    location /api/swagger/index.html {
        proxy_pass http://127.0.0.1:8888/swagger/index.html;
     }
 }
 ```

`Dockerfile` sourced from [gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin)'s [Dockerfile](https://github.com/flipped-aurora/gin-vue-admin/blob/master/web/Dockerfile)

```
# Declare image source as node:12.16.1
FROM node:12.16.1

# Declare working directory
WORKDIR /gva_web/

# Copy entire web project to current working directory
COPY . .

# Download cnpm through npm
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

# Use cnpm to install dependencies
RUN cnpm install || npm install

# Use npm run build command to package web project
RUN npm run build
# ===================================================== Multi-stage build below ==========================================================

# Declare image source as nginx:alpine, alpine image is small
FROM nginx:alpine

# Image author and email
LABEL MAINTAINER="SliverHorn@sliver_horn@qq.com"

# Copy my.conf from .docker-compose/nginx/conf.d/ directory to /etc/nginx/conf.d/my.conf in container
COPY .docker-compose/nginx/conf.d/my.conf /etc/nginx/conf.d/my.conf

# Copy files from first stage
COPY --from=0 /gva_web/dist /usr/share/nginx/html

# View /etc/nginx/nginx.conf file
RUN cat /etc/nginx/nginx.conf

# View /etc/nginx/conf.d/my.conf
RUN cat /etc/nginx/conf.d/my.conf

# Check if files are copied successfully
RUN ls -al /usr/share/nginx/html
```

## Server Docker Packaging Example

- `mysql` -> `path`'s `mysql` will automatically get mysql service container internal ip and port
- `redis` -> `path`'s `redis` will automatically get redis service container internal ip

`Dockerfile` sourced from [gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin)'s [Dockerfile](https://github.com/flipped-aurora/gin-vue-admin/blob/master/server/Dockerfile)

```
# Declare image source as golang:alpine
FROM golang:alpine

# Declare working directory
WORKDIR /go/src/gin-vue-admin

# Copy entire server project to working directory
COPY . .

# go generate automatically execute code before compilation
# go env view go environment variables
# go build -o server . package project to generate binary file named server
RUN go generate && go env && go build -o server .

# ==================================================== Multi-stage build below ==========================================================

# Declare image source as alpine:latest
FROM alpine:latest

# Image author and email
LABEL MAINTAINER="SliverHorn@sliver_horn@qq.com"

# Declare working directory
WORKDIR /go/src/gin-vue-admin

# Add executable files and configuration files (resource template files) from /go/src/gin-vue-admin into docker
COPY --from=0 /go/src/gin-vue-admin/server ./
COPY --from=0 /go/src/gin-vue-admin/config.docker.yaml ./
COPY --from=0 /go/src/gin-vue-admin/resource ./

EXPOSE 8888

# Run packaged binary and use -c to specify config.docker.yaml configuration file
ENTRYPOINT ./server -c config.docker.yaml
```

## docker-compose.yaml Detailed Explanation

`docker-compose.yaml` sourced from [gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin)'s [docker-compose.yaml](https://github.com/flipped-aurora/gin-vue-admin/blob/master/docker-compose.yaml)

```yaml
version: "3"

# Declare a network named network, subnet is the subnet address of network, default gateway is 177.7.0.1
networks:
  network:
    ipam:
      driver: default
      config:
        - subnet: '177.7.0.0/16'

# Set mysql, redis persistent storage
volumes:
  mysql:

services:
  # web service
  web:
    build:
      context: ./web
      # Specify dockerfile to start container
      dockerfile: ./Dockerfile
    # Custom container name
    container_name: gva-web
    # Whether to restart container on startup failure
    restart: always
    # Port mapping
    ports:
      - '8080:8080'
    # web service depends on server service
    depends_on:
      - server
    command: [ 'nginx-debug', '-g', 'daemon off;' ]
    networks:
      network:
        # Ipv4 address inside container under network network
        ipv4_address: 177.7.0.11

  # server service
  server:
    build:
      context: ./server
      # Specify dockerfile to start container
      dockerfile: ./Dockerfile
    # Custom container name
    container_name: gva-server
    # Whether to restart container on startup failure
    restart: always
    # Port mapping
    ports:
      - '8888:8888'
    # server service depends on mysql service and redis service
    depends_on:
      - mysql
      - redis
    networks:
      network:
      	# Ipv4 address inside container under network network
        ipv4_address: 177.7.0.12

  mysql:
    # Specify mysql image version
    # If you are arm64 architecture: like MacOS M1, please modify image to image: mysql/mysql-server:8.0.21
    image: mysql:8.0.21
    # Custom container name
    container_name: gva-mysql
    # Set utf8 character set
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci 
    # Whether to restart container on startup failure
    restart: always
    # Port mapping
    ports:
      - "13306:3306"  # host physical direct mapping port is 13306
    # System environment variables
    environment:
      MYSQL_DATABASE: 'qmPlus' # Database name to create when initializing startup
      MYSQL_ROOT_PASSWORD: 'Aa@6447985' # root admin user password
    # Map data volume to database
    volumes:
      - mysql:/var/lib/mysql
    networks:
      network:
        # Ipv4 address inside container under network network
        ipv4_address: 177.7.0.13

  # redis service
  redis:
    # Specify redis image version
    image: redis:6.0.6
    # Custom container name
    container_name: gva-redis # Container name
    # Whether to restart container on startup failure
    restart: always
    # Port mapping
    ports:
      - '6379:6379'
    networks:
      network:
        # Ipv4 address inside container under network network
        ipv4_address: 177.7.0.14
```

## Common Commands

```shell
# Use docker-compose to start four containers
docker-compose -f deploy/docker-compose/docker-compose.yaml up
# If you modified some configuration options, you can use this command to repackage images
docker-compose -f deploy/docker-compose/docker-compose.yaml up --build
# Use docker-compose to start in background
docker-compose -f deploy/docker-compose/docker-compose.yaml up -d
# Use docker-compose to repackage images and start in background
docker-compose -f deploy/docker-compose/docker-compose.yaml up --build -d
# After all services start successfully, use this command line to clear none images
docker system prune
```





















































