# Project Initialization

This guide will detail how to initialize and start the Gin-Vue-Admin project, including backend service, frontend application, and database configuration.

::: tip 📺 Video Tutorial
If you prefer video learning, you can watch our [video tutorial](https://www.bilibili.com/video/BV1kv4y1g7nT?p=3).
:::

## 📋 Prerequisites

Before starting, please ensure you have completed:

- ✅ [Environment Setup](/guide/start-quickly/env) - Install Node.js, Go, MySQL and other necessary environments
- ✅ Clone project code to local
- ✅ Database service running normally

## 🚀 Quick Start

### 1. Clone Project

```bash
# Clone main branch code
git clone https://github.com/flipped-aurora/gin-vue-admin.git

# Enter project directory
cd gin-vue-admin
```

### 2. Project Structure Overview

```
gin-vue-admin/
├── server/          # Backend Go project
│   ├── main.go      # Program entry point
│   ├── config.yaml  # Configuration file
│   └── ...
├── web/             # Frontend Vue project
│   ├── src/         # Source code
│   ├── package.json # Dependency configuration
│   └── ...
└── README.md        # Project description
```

## 📚 Detailed Tutorial Videos

::: tip 💡 Learning Suggestion
Strongly recommend watching the following episode video tutorials. Although the new UI style has some differences, the basic operations remain unchanged.
:::

### Basic Introduction

- [1. Clone Project and Install Dependencies](https://www.bilibili.com/video/BV1jx4y1s7xx)
- [2. Initialize Project](https://www.bilibili.com/video/BV1sr421K7sv)
- [3. Enable Debug Tools + Create Initialization Package](https://www.bilibili.com/video/BV1iH4y1c7Na)

### Feature Development

- [4. Manually Use Automated Creation Features](https://www.bilibili.com/video/BV1UZ421T7fV)
- [5. Create Business Using Existing Tables](https://www.bilibili.com/video/BV1NE4m1977s)
- [6. Use AI to Create Business and Data Source Mode Options](https://www.bilibili.com/video/BV17i421a7DE)
- [7. Create Your Own Backend Methods](https://www.bilibili.com/video/BV1Yw4m1k7fg)

### Frontend Development

- [8. Add a Frontend Page](https://www.bilibili.com/video/BV12y411i7oE)
- [9. Configure a Frontend Secondary Page](https://www.bilibili.com/video/BV1ZM4m1y7i3)
- [10. Configure Frontend Menu Parameters](https://www.bilibili.com/video/BV1WS42197DZ)
- [11. Menu Parameter Practice + Dynamic Menu Title + Menu Highlight Configuration](https://www.bilibili.com/video/BV1NE4m1979c)
- [12. Add Menu Controllable Buttons](https://www.bilibili.com/video/BV1Sw4m1k746)

### Advanced Configuration

- [14. Add Customer Roles and Related Configuration Tutorial](https://www.bilibili.com/video/BV1Ki421a7X2)
- [15. Deploy Project Online](https://www.bilibili.com/video/BV1Lx4y1s77D)

## 🔧 Backend Service Startup

### 1. Open Backend Project

Use GoLand or VS Code to open the `server` folder:

```bash
# Enter backend directory
cd server

# Open with GoLand (if installed)
goland .

# Or open with VS Code
code .
```

### 2. Install Dependencies

Run the following command in the project root directory to install Go module dependencies:

```bash
# Download and organize dependencies
go mod tidy
```

::: details 🔍 Command Description
- `go mod tidy`: Add missing module dependencies, remove unused dependencies
- This command will download required third-party packages based on the `go.mod` file
:::

### 3. Start Backend Service

#### Method 1: Command Line Startup

```bash
# Run in server directory
go run main.go
```

#### Method 2: GoLand Startup

1. Open `main.go` file in GoLand
2. Click the green triangle button next to the line number
3. Or use shortcut `Ctrl+Shift+F10` (Windows/Linux) or `Cmd+Shift+R` (macOS)

#### Method 3: VS Code Startup

1. Press `F5` or click debug button
2. Select "Go: Launch Package"

### 4. Verify Backend Startup

If you see the following output, the backend service has started successfully:

```
[GIN-debug] Listening and serving HTTP on :8888
```

Visit `http://localhost:8888/health` to check service status.

## 🎨 Frontend Application Startup

### 1. Open Frontend Project

Use VS Code to open the `web` folder:

```bash
# Enter frontend directory
cd web

# Open with VS Code
code .
```

### 2. Install Dependencies

::: warning ⚠️ Node.js Version Requirement
Ensure your Node.js version >= 18.16.2
:::

```bash
# Install project dependencies
npm install

# Or use yarn (if installed)
yarn install

# Or use pnpm (recommended, faster)
pnpm install
```

### 3. Start Development Server

```bash
# Start development server
npm run serve

# Or use other package managers
yarn serve
pnpm serve
```

### 4. Verify Frontend Startup

If you see the following output, the frontend application has started successfully:

```
  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.1.100:8080/
```

## 🗄️ Database Initialization

### 1. Access Initialization Page

Visit in browser: `http://localhost:8080/#/init`

### 2. Configure Database Information

Fill in database connection information on the initialization page:

- **Database Type**: Select MySQL
- **Host Address**: `127.0.0.1`
- **Port**: `3306`
- **Username**: `root`
- **Password**: Your database password
- **Database Name**: `gva` (will be created automatically if it doesn't exist)

### 3. Execute Initialization

1. Confirm all information is correct
2. Click "Initialize Now" button
3. Wait for initialization to complete

![Database Initialization](https://qmplusimg.henrongyi.top/gva/gin-vue-admin.png)

### 4. Initialization Complete

After successful initialization, the system will:

- ✅ Create all necessary data tables
- ✅ Insert basic data (admin account, menus, permissions, etc.)
- ✅ Automatically redirect to login page

**Default Admin Account**:
- Username: `admin`
- Password: `123456`

## Appendix. Running Web Project with GoLand

### App.1 Edit Configuration

![image-20210710094929206](/first/image-20210710094929206.png)

### App.2 Add npm Startup Item

![image-20210710095126844](/first/image-20210710095126844.png)

### App.3 Configuration

![image-20210710095356257](/first/image-20210710095356257.png)

### App.4 Configuration Complete

![image-20210710095715145](/first/image-20210710095715145.png)

### App.5 Start Web Project

![image-20210710095814641](/first/image-20210710095814641.png)

### App.6 Web Project Started Successfully

![image-20210710095838176](/first/image-20210710095838176.png)
