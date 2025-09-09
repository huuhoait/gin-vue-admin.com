# Environment Variables

## .env.development

```
ENV = 'development'  // Identifier, don't worry about it

VITE_CLI_PORT = 8080
VITE_SERVER_PORT = 8888
VITE_BASE_API = /api
VITE_FILE_API = /api
VITE_BASE_PATH = http://127.0.0.1
VITE_POSITION = close  // open to enable code positioning function, close to disable code positioning function
VITE_EDITOR = vscode  // Options: vscode webstorm
// VITE_EDITOR = webstorm If using webstorm for development and want to use dom positioning to code line function, please first add webstorm to environment variables, then change VITE_EDITOR value to webstorm
// If using docker-compose development mode, set to the address below or local host IP
// VITE_BASE_PATH = http://177.7.0.12

// When code positioning function is enabled, hold shift+alt+left mouse click on code lines in web page to open corresponding code files in editor
```

## .env.production

```
ENV = 'production'  // Identifier, don't worry about it

# Below are the program proxy prefixes needed for production, generally used for nginx proxy forwarding
VITE_BASE_API = /api
VITE_FILE_API = /api
# Change below to your production IP (use when need to use form builder tool online, no need for other cases)
VITE_BASE_PATH = https://demo.gin-vue-admin.com
```
