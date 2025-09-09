# Common Issues Troubleshooting Guide

This document collects common issues and solutions during the development and deployment process of the Gin-Vue-Admin project.

## 🚀 Installation and Startup Issues

### 1. Backend Startup Issues

#### Issue: Database Connection Failed

**Error Message:**
```
failed to initialize database, got error dial tcp 127.0.0.1:3306: connect: connection refused
```

**Solution:**

1. Check if database service is running
```bash
# MySQL
sudo systemctl status mysql
# 或
brew services list | grep mysql

# PostgreSQL
sudo systemctl status postgresql
# 或
brew services list | grep postgresql
```

2. Check configuration file `config.yaml`
```yaml
mysql:
  path: 127.0.0.1
  port: "3306"
  config: charset=utf8mb4&parseTime=True&loc=Local
  db-name: gin_vue_admin
  username: root
  password: "your_password"
  prefix: ""
  singular: false
  engine: ""
  max-idle-conns: 10
  max-open-conns: 100
  log-mode: ""
  log-zap: false
```

3. Test database connection
```bash
mysql -h 127.0.0.1 -P 3306 -u root -p
```

4. Create database
```sql
CREATE DATABASE gin_vue_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Issue: Redis Connection Failed

**Error Message:**
```
failed to ping redis, got error dial tcp 127.0.0.1:6379: connect: connection refused
```

**Solution:**

1. Start Redis service
```bash
# Linux
sudo systemctl start redis

# macOS
brew services start redis

# Manual start
redis-server
```

2. Check Redis configuration
```yaml
redis:
  db: 0
  addr: 127.0.0.1:6379
  password: ""
```

3. Test Redis connection
```bash
redis-cli ping
```

#### Issue: Port Already in Use

**Error Message:**
```
listen tcp :8888: bind: address already in use
```

**Solution:**

1. Find the process occupying the port
```bash
# Linux/macOS
lsof -i :8888
netstat -tulpn | grep 8888

# Windows
netstat -ano | findstr 8888
```

2. Terminate the process
```bash
# Linux/macOS
kill -9 <PID>

# Windows
taskkill /PID <PID> /F
```

3. Or modify the port in the configuration file
```yaml
system:
  addr: 8889  # Change to another port
```

### 2. Frontend Startup Issues

#### Issue: Dependency Installation Failed

**Error Message:**
```
npm ERR! code ERESOLVECONFLICT
npm ERR! ERESOLVECONFLICT unable to resolve dependency tree
```

**Solution:**

1. Clear cache and dependencies
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

2. Use yarn instead of npm
```bash
# Install yarn
npm install -g yarn

# Use yarn to install dependencies
yarn install
```

3. Use the --legacy-peer-deps parameter
```bash
npm install --legacy-peer-deps
```

#### Issue: Node.js Version Incompatibility

**Error Message:**
```
engine "node" is incompatible with this module
```

**Solution:**

1. Check Node.js version
```bash
node --version
```

2. Install the recommended version (Node.js 16+)
```bash
# Use nvm to manage Node.js versions
nvm install 18
nvm use 18
```

3. Or modify the engine requirements in package.json
```json
{
  "engines": {
    "node": ">=14.0.0"
  }
}
```

#### Issue: Vite Development Server Failed to Start

**Error Message:**
```
Error: Cannot find module '@vitejs/plugin-vue'
```

**Solution：**

1. Reinstall Vite related dependencies
```bash
npm install @vitejs/plugin-vue @vitejs/plugin-vue-jsx --save-dev
```

2. Check vite.config.js configuration
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

## 🔧 Development Issues

### 1. API Request Issues

#### Issue: Cross-Origin Request Blocked

**Error Message:**
```
Access to XMLHttpRequest at 'http://localhost:8888/api/login' from origin 'http://localhost:8080' has been blocked by CORS policy
```

**Solution：**

1. Backend configure CORS middleware
```go
// middleware/cors.go
func Cors() gin.HandlerFunc {
    return gin.HandlerFunc(func(c *gin.Context) {
        method := c.Request.Method
        origin := c.Request.Header.Get("Origin")
        c.Header("Access-Control-Allow-Origin", origin)
        c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token,X-Token,X-User-Id")
        c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE,UPDATE")
        c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type")
        c.Header("Access-Control-Allow-Credentials", "true")
        if method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
        c.Next()
    })
}
```

2. Frontend configure proxy
```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

#### Issue: Token Validation Failed

**Error Message:**
```
{
  "code": 7,
  "data": {},
  "msg": "token expired"
}
```

**Solution:**

1. Check if the token is set correctly
```javascript
// utils/request.js
service.interceptors.request.use(
  config => {
    const token = store.getters['user/token']
    if (token) {
      config.headers['x-token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
```

2. Implement token auto-refresh
```javascript
// utils/request.js
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 7) {
      // Token expired, try to refresh
      return store.dispatch('user/refreshToken').then(() => {
        // Resend the original request
        return service(response.config)
      }).catch(() => {
        // Refresh failed, redirect to login page
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('Token expired'))
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
```

### 2. Permission Issues

#### Issue: Permission Validation Failed

**Error Message:**
```
{
  "code": 7,
  "data": {},
  "msg": "insufficient permissions"
}
```

**Solution：**

1. Check user role permission configuration
```sql
-- View user permissions
SELECT u.username, a.authority_name, ar.authority_id, ar.path, ar.method
FROM sys_users u
JOIN sys_authorities a ON u.authority_id = a.authority_id
JOIN sys_authority_menus am ON a.authority_id = am.sys_authority_authority_id
JOIN sys_base_menus m ON am.sys_base_menu_id = m.id
JOIN casbin_rule ar ON a.authority_id = ar.v0
WHERE u.username = 'your_username';
```

2. Add permission rules
```go
// In system management -> role management -> API permissions add corresponding permissions
// Or add by code
casbinService := service.ServiceGroupApp.SystemServiceGroup.CasbinService
casbinService.UpdateCasbin(authorityId, casbinInfos)
```

3. Check Casbin configuration
```go
// config/casbin.go
func (c *Casbin) TableName() string {
    return c.CasbinRule
}
```

### 3. Database Issues

#### Issue: Database Migration Failed

**Error Message:**
```
Error 1071: Specified key was too long; max key length is 767 bytes
```

**Solution：**

1. Modify MySQL configuration
```sql
-- Set innodb_large_prefix
SET GLOBAL innodb_large_prefix = 1;
SET GLOBAL innodb_file_format = 'Barracuda';
SET GLOBAL innodb_file_per_table = 1;
```

2. Modify table structure
```go
// Specify index length in the model
type SysUser struct {
    Username string `gorm:"index:idx_username,length:191;comment:User login name"`
    Email    string `gorm:"index:idx_email,length:191;comment:User email"`
}
```

#### Issue: Foreign Key Constraint Error

**Error Message:**
```
Error 1452: Cannot add or update a child row: a foreign key constraint fails
```

**Solution：**

1. Check if the foreign key associated data exists
```sql
-- Check associated data
SELECT * FROM sys_authorities WHERE authority_id = 'your_authority_id';
```

2. Temporarily disable foreign key checks
```sql
SET FOREIGN_KEY_CHECKS = 0;
-- Perform your operations
SET FOREIGN_KEY_CHECKS = 1;
```

3. Modify GORM configuration
```go
// config/gorm.go
func GormConfig() *gorm.Config {
    return &gorm.Config{
        DisableForeignKeyConstraintWhenMigrating: true,
        // Other configurations...
    }
}
```

## 🎨 Frontend Issues

### 1. Routing Issues

#### Issue: Routing Jump Failed

**Error Message:**
```
Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location
```

**Solution：**

1. Check routing jump logic
```javascript
// Avoid duplicate jump
if (this.$route.path !== '/target-path') {
  this.$router.push('/target-path')
}
```

2. Use replace instead of push
```javascript
this.$router.replace('/target-path')
```

#### Issue: Dynamic Routing Ineffective

**Solution：**

1. Check routing registration order
```javascript
// router/index.js
// Ensure dynamic routes are registered after static routes
const routes = [
  // Static routes
  { path: '/login', component: Login },
  // Dynamic routes
  ...asyncRoutes
]
```

2. Check permission verification logic
```javascript
// store/modules/router.js
const actions = {
  async GenerateRoutes({ commit }, roles) {
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    commit('SET_ROUTES', accessedRoutes)
    return accessedRoutes
  }
}
```

### 2. Component Issues

#### Issue: Element Plus Component Style Abnormal

**Solution：**

1. Check style import
```javascript
// main.js
import 'element-plus/dist/index.css'
```

2. Check theme configuration
```scss
// styles/element-variables.scss
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': #409eff,
    ),
  )
);
```

#### Issue: Component Responsiveness Failure

**Solution：**

1. Check data responsiveness declaration
```javascript
// Vue 3 Composition API
import { ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const state = reactive({
      name: 'test'
    })
    
    return {
      count,
      state
    }
  }
}
```

2. Check array/object update method
```javascript
// Incorrect method
this.list[0] = newItem

// Correct method
this.$set(this.list, 0, newItem)
// Or
this.list.splice(0, 1, newItem)
```

## 🚀 Deployment Issues

### 1. Docker Deployment Issues

#### Issue: Docker Image Build Failed

**Error Message:**
```
failed to solve with frontend dockerfile.v0: failed to read dockerfile
```

**Solution：**

1. Check Dockerfile syntax
```dockerfile
# Ensure Dockerfile format is correct
FROM golang:1.19-alpine AS builder

WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
COPY --from=builder /app/config.yaml .
CMD ["./main"]
```

2. Check .dockerignore file
```
node_modules
.git
.gitignore
README.md
Dockerfile
.dockerignore
```

#### Issue: Container Startup Failed

**Error Message:**
```
standard_init_linux.go: exec user process caused: no such file or directory
```

**Solution：**

1. Check executable file permissions
```dockerfile
RUN chmod +x ./main
```

2. Use the correct base image
```dockerfile
# For Go programs, use alpine or scratch
FROM alpine:latest
# Or
FROM scratch
```

### 2. Nginx Configuration Issues

#### Issue: Frontend Route 404

**Solution：**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;
    
    # Handle frontend routes
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy
    location /api {
        proxy_pass http://backend:8888;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Issue: Static Resource Loading Failed

**Solution：**

```nginx
server {
    # Static resource caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
    
    # Font files
    location ~* \.(woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public";
        add_header Access-Control-Allow-Origin "*";
    }
}
```

## 🔍 Debugging Tips

### 1. Backend Debugging

#### Enable Detailed Logs

```yaml
# config.yaml
zap:
  level: 'debug'  # Set to debug level
  format: 'console'
  prefix: '[gin-vue-admin]'
  director: 'log'
  show-line: true
  encode-level: 'LowercaseColorLevelEncoder'
  stacktrace-key: 'stacktrace'
  log-in-console: true
```

#### Use Delve Debugger

```bash
# Install Delve
go install github.com/go-delve/delve/cmd/dlv@latest

# Start debugging
dlv debug main.go

# Set breakpoints in the code
(dlv) break main.main
(dlv) continue
```

### 2. Frontend Debugging

#### Use Vue DevTools

1. Install browser extension
2. Enable in development environment
```javascript
// main.js
if (process.env.NODE_ENV === 'development') {
  app.config.devtools = true
}
```

#### Network Request Debugging

```javascript
// utils/request.js
service.interceptors.request.use(
  config => {
    console.log('Request:', config)
    return config
  }
)

service.interceptors.response.use(
  response => {
    console.log('Response:', response)
    return response
  },
  error => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)
```

## 📊 Performance Issues

### 1. Backend Performance Optimization

#### Database Query Optimization

```go
// Use index
db.Where("username = ?", username).First(&user)

// Preload associated data
db.Preload("Authorities").Find(&users)

// Paginate query
db.Limit(pageSize).Offset(offset).Find(&users)

// Only query required fields
db.Select("id, username, email").Find(&users)
```

#### Cache Optimization

```go
// Use Redis cache
func GetUserFromCache(userID uint) (*system.SysUser, error) {
    key := fmt.Sprintf("user:%d", userID)
    cached := global.GVA_REDIS.Get(context.Background(), key).Val()
    
    if cached != "" {
        var user system.SysUser
        err := json.Unmarshal([]byte(cached), &user)
        return &user, err
    }
    
    // Query from database and cache
    var user system.SysUser
    err := global.GVA_DB.First(&user, userID).Error
    if err != nil {
        return nil, err
    }
    
    userJSON, _ := json.Marshal(user)
    global.GVA_REDIS.Set(context.Background(), key, userJSON, 30*time.Minute)
    
    return &user, nil
}
```

### 2. Frontend Performance Optimization

#### Component Lazy Loading

```javascript
// Route lazy loading
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/index.vue')
  }
]

// Component lazy loading
export default {
  components: {
    HeavyComponent: () => import('@/components/HeavyComponent.vue')
  }
}
```

#### Virtual Scrolling

```vue
<template>
  <el-table
    v-loading="loading"
    :data="visibleData"
    height="400"
    @scroll="handleScroll"
  >
    <!-- Table column definition -->
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      allData: [],
      visibleData: [],
      scrollTop: 0,
      itemHeight: 50,
      containerHeight: 400
    }
  },
  computed: {
    startIndex() {
      return Math.floor(this.scrollTop / this.itemHeight)
    },
    endIndex() {
      const visibleCount = Math.ceil(this.containerHeight / this.itemHeight)
      return Math.min(this.startIndex + visibleCount, this.allData.length)
    }
  },
  watch: {
    startIndex() {
      this.updateVisibleData()
    },
    endIndex() {
      this.updateVisibleData()
    }
  },
  methods: {
    updateVisibleData() {
      this.visibleData = this.allData.slice(this.startIndex, this.endIndex)
    },
    handleScroll(event) {
      this.scrollTop = event.target.scrollTop
    }
  }
}
</script>
```

## 📞 Getting Help

### Community Support

- [GitHub Issues](https://github.com/flipped-aurora/gin-vue-admin/issues)
- [Official Documentation](https://www.gin-vue-admin.com/)
- [QQ Group](https://qm.qq.com/cgi-bin/qm/qr?k=_GGNvjK6Ej8xJJhJhJhJhJhJhJhJhJhJ)
- [WeChat Group](https://www.gin-vue-admin.com/coffee/)

### Submitting Bug Reports

When submitting a bug report, please include the following information:

1. **Environment Information**
   - Operating system version
   - Go version
   - Node.js version
   - Database version

2. **Error Description**
   - Detailed error message
   - Steps to reproduce
   - Expected behavior

3. **Relevant Code**
   - Minimal reproducible code
   - Configuration files
   - Log information

### Common Debugging Commands

```bash
# Check Go version
go version

# Check Node.js version
node --version
npm --version

# Check database version
mysql --version
redis-server --version

# Check port occupation
lsof -i :8888
netstat -tulpn | grep 8888

# Check process
ps aux | grep gin-vue-admin

# Check logs
tail -f log/server.log
journalctl -u gin-vue-admin -f

# Docker related
docker ps
docker logs container_name
docker exec -it container_name /bin/sh
```