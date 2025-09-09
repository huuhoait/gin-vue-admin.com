# Plugin Development Guide

This guide will help you understand how to develop custom plugins for Gin-Vue-Admin, including plugin directory structure, development standards and best practices.

## Overview

The Gin-Vue-Admin plugin system adopts a modular design, supporting frontend-backend separated plugin architecture. Each plugin contains independent frontend (web) and backend (server) parts, which can be seamlessly integrated into the main project.

### Plugin Features

- **Modular Design**: Frontend-backend separation, clear structure
- **Hot Swappable**: Support dynamic loading and unloading
- **Standardized**: Unified directory structure and development standards
- **Extensible**: Rich APIs and hook functions
- **Easy Maintenance**: Independent configuration and dependency management

## Quick Start

### Prerequisites

- Familiar with Vue 3 + TypeScript frontend development
- Familiar with Go + Gin backend development
- Understand Gin-Vue-Admin project structure
- Have basic plugin development concepts

### Development Process

1. **Plan Plugin Functionality**: Clarify plugin functional requirements and technical solutions
2. **Create Plugin Structure**: Create plugin files according to standard directory structure
3. **Develop Frontend Components**: Implement user interface and interaction logic
4. **Develop Backend Interfaces**: Implement business logic and data processing
5. **Test and Debug**: Ensure plugin functionality works normally
6. **Package and Release**: Generate plugin package and publish to plugin market

## Standardized Plugin Directory

### Frontend (Web) Directory Structure

```
Plugin Name/
  └─ web/
    └─ plugin/
      └─ Plugin Name/                # Plugin root directory (required)
        ├─ api/                      # API interface files (optional)
        ├─ view/                     # Page components (optional)
        │  ├─ index.vue             # Main page
        │  └─ components/           # Page sub-components
        ├─ components/               # Public components (optional)
        │  ├─ PluginComponent.vue   # Plugin component
        │  └─ index.ts              # Component export
        └─ utils/                    # Utility functions (optional)
           ├─ index.ts              # Utility functions
           └─ constants.ts          # Constant definitions
```

### Backend (Server) Directory Structure

::: tip Tip
Backend plugins can use automatic plugin template tools to generate basic structure, improving development efficiency.
:::

```
Plugin Name/
  └─ server/
    └─ plugin/
      └─ Plugin Name/                # Plugin root directory (required)
        ├─ api/                      # API controllers (optional)
        │  ├─ api.go             # Main API interfaces
        │  └─ enter.go              # API entry file
        ├─ config/                   # Configuration structure (optional)
        │  └─ config.go             # Configuration definitions
        ├─ global/                   # Global variables (optional)
        │  └─ global.go             # Global variable definitions
        ├─ model/                    # Data models (optional)
        │  ├─ model.go             # Data models
        │  ├─ request/              # Request models
        │  │  └─ main.go          # Request parameter structures
        │  └─ response/             # Response models
        │     └─ main.go          # Response data structures
        ├─ router/                   # Route registration (optional)
           ├─ router.go              # Route definitions
        │  └─ enter.go             # Route entry
        ├─ service/                  # Business logic (optional)
        │  ├─ service.go             # Main business logic
        │  └─ enter.go              # Service entry file
        ├─ utils/                    # Utility functions (optional)
        │  └─ plugin.go             # Utility functions
        ├─ middleware/               # Middleware (optional)
        │  └─ plugin.go             # Custom middleware
        ├─ initialize/               # Initialization (optional)
        │  ├─ router.go             # Route initialization
        │  ├─ gorm.go               # Database initialization
        │  └─ viper.go              # Configuration initialization
        ├─ plugin.go                 # Plugin entry file (required)
        └─ README.md                 # Plugin documentation (recommended)
```

## Development Standards

### Naming Conventions

- **Plugin Name**: Use lowercase letters and hyphens, such as `user-management`
- **File Naming**: Follow project naming conventions, Go files use underscores, Vue files use PascalCase
- **API Paths**: Use RESTful style, such as `/api/plugin/user-management/users`
- **Component Naming**: Use PascalCase, such as `UserManagement`

### Code Standards

- **Frontend Code**: Follow Vue 3 + TypeScript best practices
- **Backend Code**: Follow Go coding standards and Gin framework conventions
- **Comment Standards**: Provide clear function and interface comments
- **Error Handling**: Unified error handling and logging

### Version Management

- Use semantic versioning (Semantic Versioning)
- Clearly specify version information in `package.json`
- Provide version update logs

### Backend Configuration

Define plugin information in `server/plugin/plugin_name/plugin.go`:

```go
package plugin_name

import (
    "github.com/flipped-aurora/gin-vue-admin/server/global"
    "github.com/flipped-aurora/gin-vue-admin/server/plugin/plugin_name/router"
)

type Plugin struct{}

func CreatePlugin() *Plugin {
    return &Plugin{}
}

func (*Plugin) Register(group *gin.RouterGroup) {
    router.RouterGroupApp.InitPluginRouter(group)
}

func (*Plugin) RouterPath() string {
    return "plugin-name"
}
```

### Development Environment Configuration

1. **Frontend Development**: Develop and debug in the main project's `web` directory
2. **Backend Development**: Develop and debug in the main project's `server` directory
3. **Hot Reload**: Support hot reloading for both frontend and backend code

## Best Practices

### Performance Optimization

- **Lazy Loading**: Use Vue's asynchronous components and route lazy loading
- **Code Splitting**: Split code reasonably to avoid overly large files
- **Caching Strategy**: Use caching effectively to improve response speed
- **Database Optimization**: Optimize query statements and index design

### Security Considerations

- **Input Validation**: Strictly validate user input data
- **Permission Control**: Integrate the main project's permission management system
- **SQL Injection Protection**: Use parameterized queries
- **XSS Protection**: Escape output content

### Error Handling

- **Unified Error Codes**: Use the project's unified error code specifications
- **Log Recording**: Record key operations and error information
- **User-Friendly**: Provide clear error messages
- **Fallback Handling**: Ensure plugin exceptions do not affect the main system

### Testing Strategy

- **Unit Testing**: Write unit tests for core business logic
- **Integration Testing**: Test the integration of the plugin with the main system
- **End-to-End Testing**: Test complete user operation flows
- **Performance Testing**: Verify the plugin's performance

## Common Issues

### Plugin Fails to Load

1. Check if the plugin directory structure is correct
2. Ensure the plugin configuration file format is correct
3. View console error messages
4. Check if plugin dependencies are installed

### Route Conflicts

1. Ensure plugin route paths are unique
2. Avoid conflicts with main system routes
3. Use plugin prefixes to distinguish routes

### Style Conflicts

1. Use CSS Modules or scoped styles
2. Avoid global style pollution
3. Use plugin-specific CSS class name prefixes

### Database Migration

1. Provide database migration scripts
2. Support version upgrades and rollbacks
3. Pay attention to database compatibility