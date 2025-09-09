# Plugin Usage Guide

This guide will help you understand how to install, configure and use plugins in the Gin-Vue-Admin project, allowing you to quickly extend system functionality.

## Overview

The Gin-Vue-Admin plugin system provides rich functionality extension capabilities, supporting multiple installation methods, allowing you to choose the most suitable installation method according to your needs.

### Plugin Types

- **Free Plugins**: Open source and free, can be downloaded and used directly
- **Paid Plugins**: Commercial plugins, require purchase authorization
- **Custom Plugins**: Dedicated plugins developed according to business needs

### Supported Installation Methods

- **Automatic Installation**: One-click installation through management interface (recommended)
- **Manual Installation**: Manually deploy plugin files
- **One-click Installation**: Command line quick installation (in development)

## Prerequisites

### System Requirements

- Gin-Vue-Admin version >= 2.5.3 (automatic installation feature)
- Node.js version >= 16.0.0
- Go version >= 1.19
- Database support (MySQL/PostgreSQL/SQLite)

### Permission Requirements

- System administrator permissions
- Plugin management permissions
- File read/write permissions

## Installation Methods

### Automatic Installation (Recommended)

Automatic installation is the simplest and safest installation method, suitable for most users.

#### Operation Steps

1. **Get Plugin Package**
   - Visit [Plugin Market](https://plugin.gin-vue-admin.com/)
   - Select the required plugin
   - Download free plugins or purchase paid plugins
   - Get plugin ZIP package

2. **Login to Management Backend**
   - Use administrator account to login to system
   - Ensure you have plugin management permissions

3. **Install Plugin**
   - Go to `System Management` → `Plugin System` → `Plugin Installation`
   - Click `Choose File` button
   - Select downloaded plugin ZIP file
   - Click `Confirm Installation` button
   - Wait for installation to complete

4. **Verify Installation**
   - Check if plugin appears in plugin list
   - Confirm plugin status is `Installed`
   - Test if plugin functionality works normally

#### Installation Process Description

The system will automatically execute the following operations:
- Verify plugin package integrity
- Check dependencies
- Extract and deploy files
- Register routes and menus
- Execute database migrations
- Update system configuration

### Manual Installation

Manual installation is suitable for advanced users or scenarios requiring custom deployment.

#### Operation Steps

1. **Download Plugin Package**
   - Download plugin from [Plugin Market](https://plugin.gin-vue-admin.com/)
   - Get plugin ZIP package

2. **Extract Plugin Package**
   ```bash
   # Extract plugin package
   unzip plugin-name.zip
   
   # View plugin structure
   ls -la plugin-name/
   ```

3. **Deploy Frontend Files**
   ```bash
   # Copy frontend files to project directory
   cp -r plugin-name/web/* /path/to/gin-vue-admin/web/
   
   # Install frontend dependencies (if needed)
   cd /path/to/gin-vue-admin/web
   npm install
   ```

4. **Deploy Backend Files**
   ```bash
   # Copy backend files to project directory
   cp -r plugin-name/server/* /path/to/gin-vue-admin/server/
   
   # Update Go modules
   cd /path/to/gin-vue-admin/server
   go mod tidy
   ```

5. **Configure Plugin**
   - Read plugin's `README.md` file
   - Configure according to instructions
   - Modify necessary configuration files

6. **Restart Services**
   ```bash
   # Restart backend service
   go run main.go
   
   # Restart frontend service
   npm run serve
   ```

#### Notes

- Please backup project files before manual installation
- Ensure plugin version is compatible with system version
- Carefully read plugin documentation and notes
- Test if plugin functionality works normally

## Plugin Configuration

### Basic Configuration

Most plugins require basic configuration after installation:

1. **Database Configuration**
   - Execute database migration scripts
   - Initialize plugin data
   - Configure database connection parameters

2. **Permission Configuration**
   - Assign plugin access permissions
   - Configure role and user permissions
   - Set menu display permissions

3. **Feature Configuration**
   - Adjust configurations based on business needs
   - Set plugin parameters
   - Configure third-party service integrations

### Advanced Configuration

For complex plugins, advanced configuration may be required:

1. **Environment Variable Configuration**
   ```bash
   # Add plugin configurations in the .env file
   PLUGIN_NAME_API_KEY=your_api_key
   PLUGIN_NAME_SECRET=your_secret
   ```

2. **Configuration File Modifications**
   ```yaml
   # config.yaml
   plugin:
     name:
       enabled: true
       config:
         option1: value1
         option2: value2
   ```

3. **Custom Configuration**
   - Modify plugin configuration files
   - Adjust business logic parameters
   - Configure external service interfaces

### Updating Plugins

   - Backup current plugin files
   - Download the new plugin version
   - Redeploy following the installation steps
   - Execute database migrations (if required)

### Uninstalling Plugins

   ```bash
   # Remove frontend files
   rm -rf web/src/plugin/plugin-name

   # Remove backend files
   rm -rf server/plugin/plugin-name

   # Clean up the database (use caution)
   # Execute cleanup scripts as per plugin documentation
   ```

## Troubleshooting

### Common Issues

#### Plugin Installation Failed

**Possible Causes:**
- Plugin package is corrupted or in the wrong format
- System version is incompatible
- Insufficient permissions
- Insufficient disk space

**Solutions:**
1. Re-download the plugin package
2. Check system version compatibility
3. Confirm administrator permissions
4. Clear disk space
5. Check system logs for detailed error information

#### Plugin Fails to Start

**Possible Causes:**
- Missing dependencies
- Configuration errors
- Port conflicts
- Database connection issues

**Solutions:**
1. Check and install missing dependencies
2. Validate plugin configuration files
3. Check for port usage
4. Test database connection
5. View plugin log files

#### Plugin Functionality Issues

**Possible Causes:**
- Incorrect permission configuration
- Abnormal database data
- Third-party service unavailability
- Outdated plugin version

**Solutions:**
1. Check user permission configurations
2. Validate database data integrity
3. Test third-party service connections
4. Update the plugin to the latest version
5. Contact the plugin developer for support

## Best Practices

### Pre-Installation Preparation

1. **Backup Data**
   - Backup the database
   - Backup project files
   - Record current configurations

2. **Test Environment Validation**
   - Install in a test environment first
   - Validate plugin functionality
   - Test system compatibility

3. **Read Documentation**
   - Carefully read the plugin instructions
   - Understand configuration requirements
   - Check known issues

### Post-Installation Maintenance

1. **Regular Updates**
   - Monitor plugin update notifications
   - Install security patches promptly
   - Keep the plugin version up-to-date

2. **Monitor Running Status**
   - Regularly check plugin status
   - Monitor system performance
   - Review error logs

3. **Backup Strategy**
   - Regularly backup plugin data
   - Save configuration files
   - Record custom modifications

## Technical Support

If you encounter problems while using the plugin, you can get help through the following ways:

- **Official Documentation**: Consult the detailed technical documentation
- **Community Forum**: Exchange experiences with other users
- **GitHub Issues**: Report bugs or suggest features
- **Commercial Support**: Purchase professional technical support services
