# Project Deployment

## Frontend

Execute `npm run build` in the web directory to get the dist folder, upload the dist folder to the server, recommend using nginx for proxy and set proxy to forward requests to the backend

## Backend

### Cross Compilation

Compile from Windows to Linux and Mac:
```
# Cross compile to Linux
set GOOS=linux
set GOARCH=amd64
go build -o app-linux

# Cross compile to Mac
set GOOS=darwin
set GOARCH=amd64
go build -o app-mac
```

Cross compile from Linux to Windows and Mac:

```
# Cross compile to Windows
GOOS=windows GOARCH=amd64 go build -o app-windows.exe

# Cross compile to Mac
GOOS=darwin GOARCH=amd64 go build -o app-mac
```

Cross compile from Mac to Windows and Linux:

```
# Cross compile to Windows
GOOS=windows GOARCH=amd64 go build -o app-windows.exe

# Cross compile to Linux
GOOS=linux GOARCH=amd64 go build -o app-linux
```



In the server directory, `go build .` to get an executable file, then upload the executable file, config.yaml, and resource folder to the server. It's best to place all three in the same path. The final server directory structure might be as follows 

```

    ├── breakpointDir  // Auto-generated for subsequent resumable uploads
    ├── chunk   // Auto-generated for subsequent resumable uploads
    ├── fileDir   // Auto-generated for subsequent resumable uploads
    ├── finish   // Auto-generated for subsequent resumable uploads
    ├── resource
    │   └── Subdirectory files					
    ├── dist
    │   └── Subdirectory files
    ├── gin-vue-admin
    ├── config.yaml
    
```

## [Tips.] Nginx Configuration (The following content is excerpted from the authorization documentation)

Install Nginx

```
yum install -y nginx
# Install all modules
yum -y install nginx-all-modules.noarch

# Start nginx
systemctl start nginx && systemctl enable nginx 

```

Open and edit configuration file
```
vim /etc/nginx/nginx.conf
```


Reference configuration code is as follows

```nginx
user root;
events {
  worker_connections  1024;  ## Default: 1024
} 

http {
     include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

server {
    listen 80;
    index index.php index.html index.htm default.php default.htm default.html;
    server_name home.mychat.cloud;
    root Your dist location;
    
    location  /api {
        rewrite ^/api/(.*)$ /$1 break;
        proxy_pass http://127.0.0.1:8888; # Set proxy server protocol and address, port should match backend deployment
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
}
```

Restart to take effect
```
sudo systemctl restart nginx
```

Backend address defaults to ```http://127.0.0.1:8888``` when not modified
