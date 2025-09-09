# Common Questions

This document collects common problems and solutions during the use of Gin-Vue-Admin, helping you quickly locate and solve problems.

## Quick Navigation

- [System Initialization Issues](#system-initialization-issues)
- [Frontend Related Issues](#frontend-related-issues)
- [Backend Related Issues](#backend-related-issues)
- [Permission Management Issues](#permission-management-issues)
- [Deployment Related Issues](#deployment-related-issues)
- [Database Related Issues](#database-related-issues)

## System Initialization Issues

### Frontend No Captcha Display

**Problem Description:** Captcha image on login page cannot be displayed or shows blank

**Solution:**
1. **Check Backend Service Status**
   ```bash
   # Confirm if backend service is running normally
   curl http://localhost:8888/api/base/captcha
   ```

2. **Confirm System Initialization**
   - Ensure database initialization is completed through system initialization page
   - Check if database connection is normal
   - Verify database configuration in `config.yaml` file

3. **Check Network Connection**
   - Confirm frontend-backend network connectivity
   - Check firewall settings
   - Verify proxy configuration is correct

### Initialization Timeout Issues

**Problem Description:** Timeout errors like `time-out` occur during initialization process

**Solution:**
1. **Adjust Frontend Timeout Settings**
   ```javascript
   // Increase timeout time in requset.js configuration
   timeout = 30000; // 30 seconds
   ```

2. **Adjust Backend Timeout Settings**
 Configure time in core/server.go

3. **Check Database Performance**
   - Confirm database server performance
   - Check network latency
   - Optimize database configuration

### Database Engine Error

**Problem Description:** `Error 1071: Specified key was too long; max key length is 1000 bytes` occurs during initialization

**Solution:**
1. **Modify Database Default Engine**
   ```sql
   -- Modify database default engine to InnoDB
   ALTER DATABASE your_database_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **Modify Casbin Table Engine Separately**
   ```sql
   -- Modify casbin_rule table engine
   ALTER TABLE casbin_rule ENGINE=InnoDB;
   ```

3. **Specify Engine When Creating Database**
   ```sql
   CREATE DATABASE gin_vue_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

## Frontend Related Issues

### Route Prefix Issues

**Problem Description:** Frontend route prefix is inconsistent with definition when accessing routes

**Solution:**
- **Reason**: To prevent browser CORS issues, GVA uses Vite (Webpack in older versions) for route proxying in the frontend
- **Configuration Check**:
  ```javascript
  // vite.config.js
  export default {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
  ```

### Vite Version Compatibility Issues

**Problem Description:** `vite.createFilter is not a function` error occurs during frontend packaging

**Root Cause:**
- Vite official version updates cause `@vitejs/plugin-vue` and `vite` version mismatch
- Using `latest` version in package.json causes version conflicts

**Solution:**
1. **Modify package.json**
   ```json
   {
     "devDependencies": {
       "@vitejs/plugin-vue": "^2.3.3",
       "vite": "^3.0.0"
     }
   }
   ```

2. **Reinstall Dependencies**
   ```bash
   # Delete node_modules and package-lock.json
   rm -rf node_modules package-lock.json
   
   # Reinstall
   npm install
   ```

3. **Use Fixed Versions**
   - Avoid using `latest` tag
   - Use specific version numbers or compatible version ranges

### Node.js Version Issues

**Problem Description:** `node:***` field errors occur during frontend runtime

**Solution:**
1. **Check Node.js Version**
   ```bash
   node --version
   # Ensure version >= 14.18 or >= 16.0
   ```

2. **Upgrade Node.js**
   ```bash
   # Use nvm to manage Node.js versions
   nvm install 16
   nvm use 16
   ```

3. **Version Requirements**
   - Vite 3 requires Node.js version >= 14.18+ or 16+
   - Recommend using LTS version for stability

### Frontend White Screen Issues

**Problem Description:** Frontend interface shows white screen, stuck in loading state with no error prompts

**Troubleshooting Steps:**
1. **Check Console Errors**
   - Open browser developer tools
   - Check Console and Network tabs
   - Look for JavaScript errors

2. **Check Import Paths**
   ```javascript
   // Check if all import statement paths are correct
   import Component from '@/components/Component.vue' // Ensure path exists
   ```

3. **Check Third-party Packages**
   ```bash
   # Reinstall dependencies
   npm install
   
   # Check package version compatibility
   npm ls
   ```

4. **Step-by-step Troubleshooting**
   - Comment out suspicious import statements
   - Restore one by one to locate problematic code

## Backend Related Issues

### Custom API 404 Error

**Problem Description:** Custom API returns 404 error

**Solution:**
1. **Restart Backend Service**
   ```bash
   # Stop service
   Ctrl + C
   
   # Restart
   go run main.go
   ```

2. **Check Route Registration**
   - Check route registration information in startup logs
   - Confirm custom routes are registered correctly
   - Reference [Server Documentation](../server/index.md)

3. **Verify Route Configuration**
   ```go
   // Ensure routes are registered correctly
   func InitRouter() {
       Router.POST("/api/custom/endpoint", customHandler)
   }
   ```

## Permission Management Issues

### Insufficient Permission Error

**Problem Description:** Permission denied when accessing APIs

**Troubleshooting Steps:**

1. **Check API Management Configuration**
   - Go to `System Management` → `API Management`
   - Check target API path and request method
   - **Important**: Ensure no extra spaces in path and request method
   - After saving changes, reassign role permissions

2. **Check Role Permission Assignment**
   - Go to `System Management` → `Role Management`
   - Reassign API permissions for corresponding roles
   - Confirm permissions are saved successfully

3. **Database Permission Rule Check**
   ```sql
   -- Query if permission rules exist
   SELECT * FROM casbin_rule 
   WHERE v0='RoleID' AND v1='RequestRoute' AND v2='RequestMethod';
   ```

4. **Manually Add Permission Rules**
   ```sql
   -- If rules don't exist, add manually
   INSERT INTO casbin_rule (p_type, v0, v1, v2, v3, v4, v5) 
   VALUES ('p', 'RoleID', 'RequestRoute', 'RequestMethod', null, null, null);
   ```

### Menu Not Displaying Issue

**Problem Description:** Left navigation bar doesn't show after adding menu

**Solution:**
1. **Check Menu Permissions**
   - Go to `System Management` → `Role Management`
   - Find corresponding role, edit permissions
   - Check newly added menu in menu permissions
   - Save permission settings

2. **Check Menu Configuration**
   - Confirm menu status is enabled
   - Check menu hierarchy relationships
   - Verify route configuration is correct

3. **Refresh Permission Cache**
   - Re-login to system
   - Or clear browser cache

## Deployment Related Issues

### Static Resource Access Issues

**Problem Description:** Images and other static resources cannot be accessed after Baota deployment

**Solution:**
1. **Check Nginx Configuration**
   ```nginx
   # Remove static resource blocking rules
   # Comment or delete configurations like:
   # location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
   #     deny all;
   # }
   ```

2. **Configure Static Resource Service**
   ```nginx
   location /uploads/ {
       alias /path/to/gin-vue-admin/uploads/;
       expires 30d;
   }
   ```

3. **Backend Resource Configuration**
   - Ensure backend static resources are in `public` directory
   - Check file permission settings

## Database Related Issues

### Timezone Issues

**Problem Description:** Time is 8 hours behind real time

**Troubleshooting Steps:**
1. **Check System Timezone**
   ```bash
   # Check system timezone
   date
   timedatectl status
   ```

2. **Check Docker Timezone**
   ```dockerfile
   # Set timezone in Dockerfile
   ENV TZ=Asia/Shanghai
   RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
   ```

3. **Database Timezone Configuration**
   
   **MySQL:**
   ```sql
   -- Check timezone
   SELECT @@global.time_zone, @@session.time_zone;
   
   -- Set timezone
   SET GLOBAL time_zone = '+8:00';
   SET SESSION time_zone = '+8:00';
   ```
   
   **PostgreSQL:**
   ```sql
   -- Set timezone
   ALTER SYSTEM SET timezone TO 'Asia/Shanghai';
   SELECT pg_reload_conf();
   SHOW TIMEZONE;
   ```

4. **Application Timezone Configuration**
   ```go
   // Set timezone in main.go
   import "time"
   
   func init() {
       loc, _ := time.LoadLocation("Asia/Shanghai")
       time.Local = loc
   }
   ```

### Reinitialize Database

**Problem Description:** Need to reinitialize database

**Operation Steps:**
1. **Temporarily Disconnect Database**
   ```yaml
   # Modify config.yaml to prevent backend from connecting to database
   mysql:
     path: "wrong_host:3306"  # Intentionally fill wrong host
     db-name: "wrong_db"      # Intentionally fill wrong database name
   ```

2. **Restart Backend Service**
   ```bash
   # Restart backend
   go run main.go
   ```

3. **Execute Reinitialization**
   - Access frontend initialization page
   - Fill in correct database configuration
   - Click initialization button

4. **Restore Correct Configuration**
   - After initialization, restore correct configuration in `config.yaml`
   - Restart service

## Debugging Tips

### Log Viewing

1. **Backend Logs**
   ```bash
   # View real-time logs
   tail -f logs/server.log
   
   # View error logs
   grep "ERROR" logs/server.log
   ```

2. **Frontend Debugging**
   - Use browser developer tools
   - Check request responses in Network tab
   - View error information in Console

### Common Debugging Commands

```bash
# Check port usage
netstat -tulpn | grep :8888

# Check process status
ps aux | grep gin-vue-admin

# Check disk space
df -h

# Check memory usage
free -h
```

## Getting Help

If the above solutions cannot resolve your issue, you can get help through the following ways:

- **Official Documentation**: Check detailed technical documentation
- **GitHub Issues**: [Submit issue reports](https://github.com/flipped-aurora/gin-vue-admin/issues)
- **Community Forum**: [Participate in discussions](https://github.com/flipped-aurora/gin-vue-admin/discussions)
- **QQ Group**: Join official QQ group for communication
- **WeChat Group**: Follow official WeChat to get group QR code

## Related Documentation

- [Quick Start](../start-quickly/initialization.md) - Project quick start guide
- [Deployment Guide](../deployment/index.md) - Production environment deployment
- [Troubleshooting](../troubleshooting/common-issues.md) - Detailed troubleshooting guide
- [Best Practices](../best-practices/development-standards.md) - Development best practices
