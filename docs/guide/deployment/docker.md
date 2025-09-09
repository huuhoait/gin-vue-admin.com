# Docker

## Web Frontend Project Standalone Packaging

- Using `nginx` image

`my.conf` source from [gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin)'s [my.conf](https://github.com/flipped-aurora/gin-vue-admin/blob/master/.docker-compose/nginx/conf.d/my.conf)

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
        proxy_pass http://127.0.0.1:8888; # Set proxy server protocol and address
     }

    location /api/swagger/index.html {
        proxy_pass http://127.0.0.1:8888/swagger/index.html;
     }
 }
 ```

`Dockerfile` source from [gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin)'s [dockerfile_web](https://github.com/flipped-aurora/gin-vue-admin/blob/master/dockerfile_web)

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

## Server Project Standalone Packaging

`Dockerfile` source from [gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin)'s [Dockerfile](https://github.com/flipped-aurora/gin-vue-admin/blob/gva_gormv2_dev/server/Dockerfile)

```
# Declare image source as golang:alpine
FROM golang:alpine

# Declare working directory
WORKDIR /go/src/gin-vue-admin

# Copy entire server project to working directory
COPY . .

# go generate automatically execute code before compilation
# go env view go environment variables
# go build -o server . package project generate binary file named server
RUN go generate && go env && go build -o server .

# ==================================================== Multi-stage build below ==========================================================

# Declare image source as alpine:latest
FROM alpine:latest

# Image author and email
LABEL MAINTAINER="SliverHorn@sliver_horn@qq.com"

# Declare working directory
WORKDIR /go/src/gin-vue-admin

# Copy entire folder files from /go/src/gin-vue-admin to current working directory
COPY --from=0 /go/src/gin-vue-admin ./

EXPOSE 8888

# Run packaged binary and use -c to specify config.docker.yaml configuration file
ENTRYPOINT ./server -c config.docker.yaml
```

## Generate Docker Image from Dockerfile

```shell
# -f specify Dockerfile file, default is Dockerfile
# -t image name:version tag
# . must definitely be added
docker build -t gva-server:1.0 .
```

## Run Docker Image

```shell
# -d run in background
# -p map port:internal port
# -name container name
# gva-server:1.0 is the -t parameter from docker build
docker run -d -p 8888:8888 --name gva-server-v1 gva-server:1.0

# -it run in interactive mode and enter container, use Ctrl + p + q to run program in background, Ctrl+c to exit container
# -p map port:internal port
# -name container name
# gva-server:1.0 is the -t parameter from docker build
docker run -it -p 8888:8888 --name gva-server-v1 gva-server:1.0
```





