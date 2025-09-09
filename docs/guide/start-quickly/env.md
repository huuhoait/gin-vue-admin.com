# Environment Setup

This guide will help you set up the development environment for the Gin-Vue-Admin project from scratch. If you already have the relevant environment, you can skip the corresponding sections.

## 🚀 Quick Checklist

Before starting, please ensure your system meets the following requirements:

::: warning 📋 Environment Requirements
- **Git**: For code version management
- **Node.js**: >= 18.16.2 (recommended to use LTS version)
- **Go**: >= 1.22 (recommended to use latest stable version)
- **MySQL**: >= 8.0, storage engine must be <span class="bg-red-600 text-white rounded font-medium dark:bg-red-500 px-1">InnoDB</span>
- **Redis**: >= 6.0 (optional, for caching)
:::

## 📦 Node.js Environment Installation

### 1. Download and Install Node.js

Visit the [Node.js official website](https://nodejs.org/zh-cn/) to download and install the LTS version.

**Recommended version**: Node.js 18.x or higher

### 2. Verify Installation

Open terminal or command prompt and run the following commands to verify installation:

```bash
# Check Node.js version
node -v
# Output example: v18.17.0

# Check npm version
npm -v
# Output example: 9.6.7
```

### 3. Configure npm Mirror Source (Optional)

To improve download speed in China, it's recommended to configure Taobao mirror source:

```bash
# Set Taobao mirror source
npm config set registry https://registry.npmmirror.com

# Verify configuration
npm config get registry
```

### 4. Recommended Development Tools

- **VS Code**: [Download Link](https://code.visualstudio.com/)
- **WebStorm**: [Download Link](https://www.jetbrains.com/webstorm/)

## 🔧 Go Environment Installation

### 1. Download and Install Go

Choose the download link based on your network environment:

- **International Users**: [https://golang.org/dl/](https://golang.org/dl/)
- **Domestic Users**: [https://golang.google.cn/dl/](https://golang.google.cn/dl/)

**Recommended version**: Go 1.22 or higher

### 2. Verify Installation

```bash
# Check Go version
go version
# Output example: go version go1.22.0 darwin/amd64

# View Go environment information
go env
```

### 3. Configure Go Module Proxy (Recommended)

To improve module download speed, it is recommended to configure the Go module proxy:

```bash
# Enable Go Modules
go env -w GO111MODULE=on

# Configure module proxy
go env -w GOPROXY=https://goproxy.cn,direct

# Configure private module exclusion from proxy
go env -w GOPRIVATE=*.corp.example.com
```

### 4. Recommended Development Tools

- **GoLand**: [Download Link](https://www.jetbrains.com/go/) (Recommended)
- **VS Code + Go Plugin**: Free alternative

## 🗄️ Database Environment

### MySQL Installation

#### macOS
```bash
# Install using Homebrew
brew install mysql

# Start MySQL service
brew services start mysql
```

#### Ubuntu/Debian
```bash
# Update package list
sudo apt update

# Install MySQL
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql
```

#### Windows
Visit [MySQL Official Website](https://dev.mysql.com/downloads/mysql/) to download the installer.

### Redis Installation (Optional)

#### macOS
```bash
brew install redis
brew services start redis
```

#### Ubuntu/Debian
```bash
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

## 🛠️ Development Tool Configuration

### Recommended VS Code Plugins

```json
{
  "recommendations": [
    "golang.go",
    "vue.volar",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### GoLand Configuration Suggestions

1. **Go Modules**: Ensure Go Modules support is enabled
2. **Code Formatting**: Configure `gofmt` and `goimports`
3. **Code Inspection**: Enable `golint` and `go vet`

## 📚 Branch Version Description

| Branch | Status | Description | Recommended |
|------|------|------|----------|
| [main](https://github.com/flipped-aurora/gin-vue-admin/tree/main) | 🟢 Actively Maintained | Main branch, recommended for production environments | ✅ Recommended |
| [i18n-dev-new](https://github.com/flipped-aurora/gin-vue-admin/tree/i18n-dev-new) | 🟡 Updating | Composition API multilingual version | 🔄 In Development |
| [v2.4.x](https://github.com/flipped-aurora/gin-vue-admin/tree/v2.4.x) | 🔴 No Longer Maintained | Declarative API version | ❌ Not Recommended |
| [i18n-dev](https://github.com/flipped-aurora/gin-vue-admin/tree/i18n-dev) | 🔴 No Longer Maintained | Declarative API multilingual version | ❌ Not Recommended |

## ✅ Environment Verification

After completing the environment installation, run the following commands to verify if the environment is correctly configured:

```bash
# Check Git
git --version

# Check Node.js and npm
node -v && npm -v

# Check Go
go version

# Check MySQL (ensure the service is started)
mysql --version

# Check Redis (if installed)
redis-cli --version
```

If all commands output version information correctly, the environment setup is successful!
