---
id: vscode
title: VS Code Development Configuration
---

# VS Code Development Configuration

VS Code is a lightweight but powerful code editor, very suitable for Gin-Vue-Admin project development. This guide will detail how to configure VS Code for the best development experience.

## 📋 Prerequisites

Before starting configuration, please ensure you have:

- ✅ Installed [VS Code](https://code.visualstudio.com/)
- ✅ Completed [Environment Setup](/guide/start-quickly/env)
- ✅ Cloned project code to local

## 🚀 Quick Start

### 1. Open Workspace

It is recommended to use VS Code's workspace feature to manage the entire project:

```bash
# Enter project root directory
cd gin-vue-admin

# Open entire project with VS Code
code .
```

Or open the pre-configured workspace file:

![VS Code Workspace](https://qmplusimg.henrongyi.top/gva/vscode.png)

### 2. Workspace Configuration

Create `.vscode/gin-vue-admin.code-workspace` file:

```json
{
  "folders": [
    {
      "name": "🔧 Server (Go)",
      "path": "./server"
    },
    {
      "name": "🎨 Web (Vue)",
      "path": "./web"
    },
    {
      "name": "📚 Docs",
      "path": "./docs"
    }
  ],
  "settings": {
    "go.gopath": "",
    "go.goroot": "",
    "go.toolsManagement.autoUpdate": true,
    "typescript.preferences.importModuleSpecifier": "relative",
    "eslint.workingDirectories": ["web"],
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },
  "extensions": {
    "recommendations": [
      "golang.go",
      "vue.volar",
      "bradlc.vscode-tailwindcss",
      "esbenp.prettier-vscode",
      "ms-vscode.vscode-typescript-next"
    ]
  }
}
```

## 🔌 Essential Extensions Installation

### Go Development Extensions

1. **Go** (golang.go)
   - Official Go language extension
   - Provides syntax highlighting, IntelliSense, debugging, etc.

2. **Go Outliner** (766b.go-outliner)
   - Shows Go file structure outline

### Vue Development Extensions

1. **Vue Language Features (Volar)** (vue.volar)
   - Official Vue 3 language support
   - Replaces Vetur, provides better TypeScript support

2. **TypeScript Vue Plugin (Volar)** (vue.vscode-typescript-vue-plugin)
   - TypeScript support for Vue files

### General Development Extensions

1. **Prettier - Code formatter** (esbenp.prettier-vscode)
   - Code formatting tool

2. **ESLint** (dbaeumer.vscode-eslint)
   - JavaScript/TypeScript code linting

3. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
   - Tailwind CSS IntelliSense

4. **Auto Rename Tag** (formulahendry.auto-rename-tag)
   - Auto rename paired HTML/XML tags

5. **Path Intellisense** (christian-kohler.path-intellisense)
   - File path IntelliSense

### Install Extensions

```bash
# Install recommended extensions using command line
code --install-extension golang.go
code --install-extension vue.volar
code --install-extension vue.vscode-typescript-vue-plugin
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension bradlc.vscode-tailwindcss
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
```

## 🏃‍♂️ Run and Debug Configuration

### 1. Create Debug Configuration

Create `.vscode/launch.json` file in project root directory:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🔧 Launch Server (Go)",
      "type": "go",
      "request": "launch",
      "mode": "auto",
      "program": "${workspaceFolder}/server/main.go",
      "cwd": "${workspaceFolder}/server",
      "env": {
        "GIN_MODE": "debug"
      },
      "args": [],
      "showLog": true,
      "console": "integratedTerminal"
    },
    {
      "name": "🎨 Launch Web (Node)",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}/web",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "serve"]
    }
  ],
  "compounds": [
    {
      "name": "🚀 Launch Both (Server + Web)",
      "configurations": [
        "🔧 Launch Server (Go)",
        "🎨 Launch Web (Node)"
      ],
      "stopAll": true
    }
  ]
}
```

### 2. Create Tasks Configuration

Create `.vscode/tasks.json` file:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "🔧 Build Server",
      "type": "shell",
      "command": "go",
      "args": ["build", "-o", "gin-vue-admin", "main.go"],
      "options": {
        "cwd": "${workspaceFolder}/server"
      },
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "🎨 Build Web",
      "type": "shell",
      "command": "npm",
      "args": ["run", "build"],
      "options": {
        "cwd": "${workspaceFolder}/web"
      },
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "📝 Generate Swagger",
      "type": "shell",
      "command": "swag",
      "args": ["init"],
      "options": {
        "cwd": "${workspaceFolder}/server"
      },
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ]
}
```

### 3. Run Project

#### Method 1: Using Debug Panel

1. Press `Ctrl+Shift+D` (Windows/Linux) or `Cmd+Shift+D` (macOS) to open debug panel
2. Select the configuration to run:
   - **🔧 Launch Server (Go)**: Start backend service only
   - **🎨 Launch Web (Node)**: Start frontend application only
   - **🚀 Launch Both (Server + Web)**: Start both frontend and backend

![VS Code Backend Debug](https://qmplusimg.henrongyi.top/gva/vscode-backend.png)

![VS Code Frontend Debug](https://qmplusimg.henrongyi.top/gva/vscode-frontend.png)

![VS Code Run Both](https://qmplusimg.henrongyi.top/gva/vscode-both.png)

#### Method 2: Using Terminal

```bash
# Start backend (in server directory)
cd server
go run main.go

# Start frontend (in web directory)
cd web
npm run serve
```

#### Method 3: Using Tasks

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type "Tasks: Run Task"
3. Select the task to execute

## ⚙️ Go Environment Configuration

### 1. Configure Go Module Proxy

To improve dependency download speed, it's recommended to configure Go module proxy:

```bash
# Enable Go Modules
go env -w GO111MODULE=on

# Configure module proxy
go env -w GOPROXY=https://goproxy.cn,direct

# Configure checksum database
go env -w GOSUMDB=sum.golang.google.cn
```

### 2. VS Code Go Extension Configuration

Add the following configuration in VS Code settings:

```json
{
  "go.toolsManagement.autoUpdate": true,
  "go.useLanguageServer": true,
  "go.gocodeAutoBuild": false,
  "go.lintOnSave": "package",
  "go.vetOnSave": "package",
  "go.buildOnSave": "package",
  "go.testOnSave": false,
  "go.coverOnSave": false,
  "go.formatTool": "goimports",
  "go.gotoSymbol.includeImports": true,
  "go.gotoSymbol.includeGoroot": true,
  "gopls": {
    "experimentalWorkspaceModule": true,
    "completeUnimported": true,
    "usePlaceholders": true,
    "deepCompletion": true
  }
}
```

### 3. Install Go Tools

In VS Code, press `Ctrl+Shift+P`, type "Go: Install/Update Tools", select all tools to install.

## 🎨 Frontend Development Configuration

### 1. Prettier Configuration

Create `.prettierrc` file in `web` directory:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 2. ESLint Configuration

Ensure `web` directory has correct `.eslintrc.js` configuration file.

### 3. VS Code Frontend Settings

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.workingDirectories": ["web"],
  "vetur.validation.template": false,
  "vetur.validation.script": false,
  "vetur.validation.style": false
}
```

## 🔧 Practical Tips

### 1. Code Snippets

Create Go code snippets `.vscode/go.code-snippets`:

```json
{
  "Gin Handler": {
    "prefix": "ginhandler",
    "body": [
      "// $1 $2",
      "// @Tags $3",
      "// @Summary $2",
      "// @Security ApiKeyAuth",
      "// @accept application/json",
      "// @Produce application/json",
      "// @Success 200 {object} response.Response \"成功\"",
      "// @Router /$4 [$5]",
      "func (a *$6Api) $1(c *gin.Context) {",
      "\t$0",
      "}"
    ],
    "description": "Create a Gin handler with Swagger annotations"
  }
}
```

### 2. Keyboard Shortcuts Configuration

Add custom keyboard shortcuts in `keybindings.json`:

```json
[
  {
    "key": "ctrl+shift+r",
    "command": "workbench.action.tasks.runTask",
    "args": "🔧 Build Server"
  },
  {
    "key": "ctrl+shift+w",
    "command": "workbench.action.tasks.runTask",
    "args": "🎨 Build Web"
  }
]
```

### 3. File Associations

Add file associations in settings:

```json
{
  "files.associations": {
    "*.vue": "vue",
    "*.go": "go",
    "*.yaml": "yaml",
    "*.yml": "yaml"
  }
}
```

## 🐛 Debugging Tips

### 1. Go Debugging

- Click to the left of line numbers to set breakpoints
- Use `F5` to start debugging
- Use `F10` for step over, `F11` for step into
- View variable values in debug console

### 2. Frontend Debugging

- Use browser developer tools
- Install "Debugger for Chrome" extension in VS Code
- Configure browser debugging

### 3. Log Viewing

- Use integrated terminal to view application logs
- Configure output panel to display different types of logs

## 🚀 Performance Optimization

### 1. Exclude Files

Exclude unnecessary files in `.vscode/settings.json`:

```json
{
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true,
    "**/vendor": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/vendor": true
  }
}
```

### 2. Disable Unnecessary Extensions

Disable irrelevant extensions in the workspace to improve performance.
