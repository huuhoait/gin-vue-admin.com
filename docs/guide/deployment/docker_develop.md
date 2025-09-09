# Docker Quick Development

## Docker & Docker-compose Environment

1. Go to [Docker Desktop for Windows by Docker | Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows/) to download the latest version of Docker
2. Go to [Release v2.3.3 · docker/compose (github.com)](https://github.com/docker/compose/releases/tag/v2.3.3) to download the latest version of Docker-Compose

## 1. To use docker for quick development, you need to modify two project files

1. Open the file `web/vite.config.js` in the frontend directory, around line 57.

   ```
      server: {
         // If using docker-compose development mode, set to false
         open: false,
         port: process.env.VITE_CLI_PORT,
   ```

   

2. Open the file `web/.env.development` in the frontend directory, around line 6.

   ```
   ENV = 'development'
   VITE_CLI_PORT = 8080
   VITE_SERVER_PORT = 8888
   VITE_BASE_API = /api
   // VITE_BASE_PATH = http://127.0.0.1         // Also comment out this line
   // If using docker-compose development mode, set to the address below, or physical machine IP
   VITE_BASE_PATH = http://177.7.0.12             
   ```

   


### 2. One-click Start

1. Enter the project directory, specify the docker-compose development configuration file docker-compose-dev.yaml to start

   ```
   // Start, the first startup may be slightly slower
   docker-compose -f deploy/docker-compose/docker-compose-dev.yaml  up
   
   // Background start
   docker-compose -f deploy/docker-compose/docker-compose-dev.yaml  up  -d
   
   // Stop
   docker-compose -f deploy/docker-compose/docker-compose-dev.yaml  stop
   ```

2. 启动完成请打开浏览器访问

   ```
   http://127.0.0.1:8080
   ```




### 三、初始化

1.  请使用下面的数据进行初始化，具体配置参考 docker-compose-dev.yaml ，若要直接使用请修改 server/config.yaml

![image-20220310173721432](/deployment/image-20220310173721432.png)

