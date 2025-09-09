# 🎨 Frontend Knowledge Base

Gin-Vue-Admin frontend is built on Vue 3 + Vite 4 + Element Plus, using modern frontend development technology stack, providing efficient development experience and excellent user interface.

## 🚀 Technology Stack

### Core Frameworks
- **Vue 3** - Progressive JavaScript framework
- **Vite 4** - Next-generation frontend build tool
- **Element Plus** - Component library based on Vue 3

### State Management
- **Pinia** - Official Vue 3 recommended state management library
- **Vue Router 4** - Official Vue.js router manager

### Development Tools
- **TypeScript** - Superset of JavaScript (optional)
- **ESLint** - Code quality checking tool
- **Prettier** - Code formatting tool
- **Sass/SCSS** - CSS preprocessor

### Build Optimization
- **Vite Plugin** - Rich plugin ecosystem
- **Tree Shaking** - Automatically remove unused code
- **Code Splitting** - Code splitting optimization
- **Hot Module Replacement** - Hot module replacement

## 📁 Frontend Directory Structure
```
web
 ├── babel.config.js
 ├── Dockerfile
 ├── favicon.ico
 ├── index.html                  -- Main page
 ├── limit.js                    -- Assistant code
 ├── package.json                -- Package manager code
 ├── src                         -- Source code
 │   ├── api                    -- API group
 │   ├── App.vue                -- Main page
 │   ├── assets                 -- Static resources
 │   ├── components             -- Global components
 │   ├── core                   -- GVA component package
 │   │   ├── config.js         -- GVA website configuration file
 │   │   ├── gin-vue-admin.js  -- Registration welcome file
 │   │   └── global.js         -- Unified import file
 │   ├── directive              -- v-auth registration file
 │   ├── main.js                -- Main file
 │   ├── permission.js          -- Route middleware
 │   ├── pinia                  -- Pinia state manager, replacing vuex
 │   │   ├── index.js          -- Entry file
 │   │   └── modules           -- Modules
 │   │       ├── dictionary.js
 │   │       ├── router.js
 │   │       └── user.js
 │   ├── router                 -- Route declaration file
 │   │   └── index.js
 │   ├── style                  -- Global styles
 │   │   ├── base.scss
 │   │   ├── basics.scss
 │   │   ├── element_visiable.scss  -- Can globally override element-plus styles here
 │   │   ├── iconfont.css           -- Style file for top icons
 │   │   ├── main.scss
 │   │   ├── mobile.scss
 │   │   └── newLogin.scss
 │   ├── utils                  -- Method package library
 │   │   ├── asyncRouter.js    -- Dynamic routing related
 │   │   ├── btnAuth.js        -- Dynamic permission button related
 │   │   ├── bus.js            -- Global mitt declaration file
 │   │   ├── date.js           -- Date related
 │   │   ├── dictionary.js     -- Dictionary retrieval method 
 │   │   ├── downloadImg.js    -- Image download method
 │   │   ├── format.js         -- Format organization related
 │   │   ├── image.js          -- Image related methods
 │   │   ├── page.js           -- Set page title
 │   │   ├── request.js        -- Unified request file
 │   │   └── stringFun.js      -- String file
 |   ├── view                   -- Main view code
 |   |   ├── about              -- About us
 |   |   ├── dashboard          -- Dashboard
 |   |   ├── error              -- Error
 |   |   ├── example            -- Upload example
 |   |   ├── iconList           -- Icon list
 |   |   ├── init               -- Initialize data  
 |   |   ├── layout             -- Layout constraint page 
 |   |   |   ├── aside          -- Sidebar
 |   |   |   ├── bottomInfo     -- Bottom info
 |   |   |   ├── screenfull     -- Full screen settings
 |   |   |   ├── setting        -- System settings
 |   |   |   └── index.vue      -- Base constraint
 |   |   ├── login              -- Login 
 |   |   ├── person             -- Personal center 
 |   |   ├── superAdmin         -- Super administrator operations
 |   |   ├── system             -- System detection page
 |   |   ├── systemTools        -- System configuration related pages
 |   |   └── routerHolder.vue   -- Page entry page 
 ├── vite.config.js             -- Vite configuration file
 └── yarn.lock
```

## 🛠️ Development Environment Configuration

### Environment Requirements
- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 or **yarn** >= 1.22.0
- **Git** Version control tool

### Install Dependencies

```bash
# Enter the frontend directory
cd web

# Install using npm
npm install

# Or install using yarn
yarn install
```

### Development Commands

```bash
# Start the development server
npm run serve
# Or
yarn serve

# Build the production version
npm run build
# Or
yarn build

# Code linting
npm run lint
# Or
yarn lint

# Code formatting
npm run format
# Or
yarn format
```

## 🎯 Core Configuration Files

### Vite Configuration (vite.config.js)

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
```

### Project Configuration (src/core/config.js)

```javascript
// Global system configuration
export const config = {
  appName: 'Gin-Vue-Admin',
  appLogo: 'logoIco.png',
  showProgressBar: true,
  progressBarColor: '#409EFF',
  showInfoTip: true,
  
  // Layout configuration
  layout: {
    showTagsView: true,
    showSidebarLogo: true,
    fixedHeader: true,
    sidebarTextTheme: true,
    showGreyMode: false,
    showColorWeakness: false
  },
  
  // Theme configuration
  theme: {
    primaryColor: '#409EFF',
    successColor: '#67C23A',
    warningColor: '#E6A23C',
    dangerColor: '#F56C6C',
    infoColor: '#909399'
  }
}
```

## 🏗️ Core Architecture

### 1. Routing System

#### Static Route Configuration

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { asyncRouterHandle } from '@/utils/asyncRouter'

// 静态路由
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/login/index.vue')
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('@/view/layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/view/dashboard/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

#### Dynamic Route Handling

```javascript
// src/utils/asyncRouter.js
import { asyncRoutes } from '@/router/asyncRouter'

// 动态路由处理
export function asyncRouterHandle(asyncRouter) {
  asyncRouter.forEach(item => {
    if (item.component) {
      if (item.component === 'view/routerHolder.vue') {
        item.component = () => import('@/view/routerHolder.vue')
      } else {
        const component = item.component
        item.component = () => import(`@/view/${component}`)
      }
    }
    if (item.children) {
      asyncRouterHandle(item.children)
    }
  })
  return asyncRouter
}

// 格式化路由
export function formatRouter(routes, routeMap) {
  const newRoutes = []
  routes.forEach(item => {
    if (item.path === 'dashboard') {
      item.component = () => import('@/view/dashboard/index.vue')
    } else if (item.component) {
      item.component = routeMap[item.component] || (() => import(`@/view/error/404.vue`))
    }
    if (item.children && item.children.length > 0) {
      item.children = formatRouter(item.children, routeMap)
    }
    newRoutes.push(item)
  })
  return newRoutes
}
```

### 2. State Management (Pinia)

#### User State Management

```javascript
// src/pinia/modules/user.js
import { defineStore } from 'pinia'
import { login, getUserInfo, logout } from '@/api/user'
import { jsonInBlacklist } from '@/api/jwt'
import router from '@/router/index'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      uuid: '',
      nickName: '',
      headerImg: '',
      authority: {},
      sideMode: 'dark',
      activeColor: '#1890ff',
      baseColor: '#fff'
    },
    token: '',
    mode: 'light'
  }),
  
  getters: {
    // 获取用户信息
    getUserInfo: (state) => state.userInfo,
    // 获取token
    getToken: (state) => state.token,
    // 获取模式
    getMode: (state) => state.mode
  },
  
  actions: {
    // 登录
    async LoginIn(loginInfo) {
      try {
        const res = await login(loginInfo)
        if (res.code === 0) {
          this.setUserInfo(res.data.user)
          this.setToken(res.data.token)
          await this.GetUserInfo()
          return true
        }
      } catch (error) {
        console.error('登录失败:', error)
        return false
      }
    },
    
    // 获取用户信息
    async GetUserInfo() {
      try {
        const res = await getUserInfo()
        if (res.code === 0) {
          this.setUserInfo(res.data.userInfo)
        }
        return res
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    },
    
    // 登出
    async LoginOut() {
      try {
        const res = await logout()
        if (res.code === 0) {
          this.userInfo = {}
          this.token = ''
          localStorage.clear()
          router.push({ name: 'Login' })
        }
      } catch (error) {
        console.error('登出失败:', error)
      }
    },
    
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
    
    // 设置token
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    
    // 设置模式
    setMode(mode) {
      this.mode = mode
      localStorage.setItem('mode', mode)
    }
  }
})
```

#### Router State Management

```javascript
// src/pinia/modules/router.js
import { defineStore } from 'pinia'
import { asyncRouterHandle } from '@/utils/asyncRouter'
import { getMenu } from '@/api/menu'

export const useRouterStore = defineStore('router', {
  state: () => ({
    asyncRouters: [],
    keepAliveRouters: [],
    routerList: [],
    addRouters: [],
    routerMap: {}
  }),
  
  actions: {
    // 设置动态路由
    async SetAsyncRouter() {
      try {
        const res = await getMenu()
        if (res.code === 0) {
          const asyncRouter = res.data.menus || []
          this.asyncRouters = asyncRouterHandle(asyncRouter)
          this.routerList = res.data.menus || []
          return this.asyncRouters
        }
      } catch (error) {
        console.error('获取菜单失败:', error)
      }
    },
    
    // 设置keep-alive路由
    setKeepAliveRouters(history) {
      this.keepAliveRouters = history
    }
  }
})
```

### 3. HTTP Request Encapsulation

```javascript
// src/utils/request.js
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/pinia/modules/user'
import router from '@/router/index'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 99999
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    
    // 添加token
    if (userStore.token) {
      config.headers['x-token'] = userStore.token
    }
    
    // 添加请求时间戳
    config.headers['x-timestamp'] = Date.now()
    
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    
    // 处理文件下载
    if (response.headers['content-type'] === 'application/octet-stream') {
      return response
    }
    
    // 业务错误处理
    if (res.code !== 0) {
      ElMessage({
        message: res.msg || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })
      
      // token过期处理
      if (res.code === 1004 || res.code === 1005) {
        const userStore = useUserStore()
        userStore.LoginOut()
        return Promise.reject(new Error(res.msg || '登录过期'))
      }
      
      return Promise.reject(new Error(res.msg || '请求失败'))
    }
    
    return res
  },
  error => {
    console.error('响应错误:', error)
    
    let message = '网络错误'
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录'
          break
        case 403:
          message = '权限不足'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `连接错误${error.response.status}`
      }
    }
    
    ElMessage({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    
    return Promise.reject(error)
  }
)

export default service
```

## 🎨 Component Development

### Global Component Registration

```javascript
// src/core/global.js
import GvaIcon from '@/components/gva-icon/index.vue'
import GvaTable from '@/components/gva-table/index.vue'
import GvaForm from '@/components/gva-form/index.vue'
import GvaUpload from '@/components/gva-upload/index.vue'

// 全局组件列表
const components = {
  GvaIcon,
  GvaTable,
  GvaForm,
  GvaUpload
}

// 注册全局组件
export function setupGlobalComponents(app) {
  Object.keys(components).forEach(key => {
    app.component(key, components[key])
  })
}
```

### Custom Component Example

```vue
<!-- src/components/gva-table/index.vue -->
<template>
  <div class="gva-table">
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :row-key="rowKey"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load"
      :tree-props="treeProps"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      @cell-click="handleCellClick"
      @cell-dblclick="handleCellDblclick"
      @row-click="handleRowClick"
      @row-contextmenu="handleRowContextmenu"
      @row-dblclick="handleRowDblclick"
      @header-click="handleHeaderClick"
      @header-contextmenu="handleHeaderContextmenu"
      @sort-change="handleSortChange"
      @filter-change="handleFilterChange"
      @current-change="handleCurrentChange"
      @header-dragend="handleHeaderDragend"
      @expand-change="handleExpandChange"
    >
      <slot />
    </el-table>
    
    <!-- 分页组件 -->
    <div v-if="showPagination" class="gva-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :small="small"
        :disabled="disabled"
        :background="background"
        :layout="layout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props定义
const props = defineProps({
  // 表格数据
  tableData: {
    type: Array,
    default: () => []
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 是否显示分页
  showPagination: {
    type: Boolean,
    default: true
  },
  // 分页配置
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  // 表格配置
  height: [String, Number],
  maxHeight: [String, Number],
  stripe: Boolean,
  border: Boolean,
  size: String,
  fit: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  cellClassName: [String, Function],
  cellStyle: [Object, Function],
  headerRowClassName: [String, Function],
  headerRowStyle: [Object, Function],
  headerCellClassName: [String, Function],
  headerCellStyle: [Object, Function],
  rowKey: [String, Function],
  emptyText: String,
  defaultExpandAll: Boolean,
  expandRowKeys: Array,
  defaultSort: Object,
  tooltipEffect: String,
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  spanMethod: Function,
  selectOnIndeterminate: {
    type: Boolean,
    default: true
  },
  indent: {
    type: Number,
    default: 16
  },
  lazy: Boolean,
  load: Function,
  treeProps: {
    type: Object,
    default: () => ({
      hasChildren: 'hasChildren',
      children: 'children'
    })
  },
  small: Boolean,
  disabled: Boolean,
  background: {
    type: Boolean,
    default: true
  }
})

// Emits定义
const emit = defineEmits([
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change',
  'size-change',
  'page-change'
])

// 表格引用
const tableRef = ref()

// 事件处理
const handleSelect = (selection, row) => emit('select', selection, row)
const handleSelectAll = (selection) => emit('select-all', selection)
const handleSelectionChange = (selection) => emit('selection-change', selection)
const handleCellMouseEnter = (row, column, cell, event) => emit('cell-mouse-enter', row, column, cell, event)
const handleCellMouseLeave = (row, column, cell, event) => emit('cell-mouse-leave', row, column, cell, event)
const handleCellClick = (row, column, cell, event) => emit('cell-click', row, column, cell, event)
const handleCellDblclick = (row, column, cell, event) => emit('cell-dblclick', row, column, cell, event)
const handleRowClick = (row, column, event) => emit('row-click', row, column, event)
const handleRowContextmenu = (row, column, event) => emit('row-contextmenu', row, column, event)
const handleRowDblclick = (row, column, event) => emit('row-dblclick', row, column, event)
const handleHeaderClick = (column, event) => emit('header-click', column, event)
const handleHeaderContextmenu = (column, event) => emit('header-contextmenu', column, event)
const handleSortChange = (data) => emit('sort-change', data)
const handleFilterChange = (filters) => emit('filter-change', filters)
const handleCurrentChange = (currentRow, oldCurrentRow) => emit('current-change', currentRow, oldCurrentRow)
const handleHeaderDragend = (newWidth, oldWidth, column, event) => emit('header-dragend', newWidth, oldWidth, column, event)
const handleExpandChange = (row, expandedRows) => emit('expand-change', row, expandedRows)

// 分页事件处理
const handleSizeChange = (size) => emit('size-change', size)
const handlePageChange = (page) => emit('page-change', page)

// 暴露表格方法
defineExpose({
  tableRef,
  clearSelection: () => tableRef.value?.clearSelection(),
  toggleRowSelection: (row, selected) => tableRef.value?.toggleRowSelection(row, selected),
  toggleAllSelection: () => tableRef.value?.toggleAllSelection(),
  toggleRowExpansion: (row, expanded) => tableRef.value?.toggleRowExpansion(row, expanded),
  setCurrentRow: (row) => tableRef.value?.setCurrentRow(row),
  clearSort: () => tableRef.value?.clearSort(),
  clearFilter: (columnKeys) => tableRef.value?.clearFilter(columnKeys),
  doLayout: () => tableRef.value?.doLayout(),
  sort: (prop, order) => tableRef.value?.sort(prop, order)
})
</script>

<style lang="scss" scoped>
.gva-table {
  .gva-pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
```

## 🔐 Permission Control

### Permission Directive

```javascript
// src/directive/auth.js
import { useUserStore } from '@/pinia/modules/user'

// 权限检查函数
function checkPermission(el, binding) {
  const { value } = binding
  const userStore = useUserStore()
  const roles = userStore.userInfo.authority?.defaultRouter || []
  
  if (value && value instanceof Array && value.length > 0) {
    const permissionRoles = value
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('权限指令需要传入数组参数')
  }
}

// 权限指令
export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  updated(el, binding) {
    checkPermission(el, binding)
  }
}
```

### Button Permission Control

```javascript
// src/utils/btnAuth.js
import { useUserStore } from '@/pinia/modules/user'

// 检查按钮权限
export function checkBtnPermission(btnName) {
  const userStore = useUserStore()
  const btnAuth = userStore.userInfo.authority?.btns || []
  return btnAuth.includes(btnName)
}

// 权限按钮组件
export function useBtnAuth() {
  const userStore = useUserStore()
  
  const hasAuth = (btnName) => {
    const btnAuth = userStore.userInfo.authority?.btns || []
    return btnAuth.includes(btnName)
  }
  
  return {
    hasAuth
  }
}
```

## 🎨 Theme Customization

### Element Plus Theme Customization

```scss
// src/style/element_variables.scss
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': #409eff,
    ),
    'success': (
      'base': #67c23a,
    ),
    'warning': (
      'base': #e6a23c,
    ),
    'danger': (
      'base': #f56c6c,
    ),
    'error': (
      'base': #f56c6c,
    ),
    'info': (
      'base': #909399,
    ),
  )
);

// 自定义组件样式
.el-button {
  border-radius: 4px;
  
  &.is-round {
    border-radius: 20px;
  }
}

.el-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-table {
  .el-table__header {
    th {
      background-color: #fafafa;
      color: #606266;
      font-weight: 500;
    }
  }
}
```

### Dark Mode Support

```scss
// src/style/dark.scss
[data-theme='dark'] {
  --el-bg-color: #141414;
  --el-bg-color-page: #0a0a0a;
  --el-bg-color-overlay: #1d1e1f;
  --el-text-color-primary: #e5eaf3;
  --el-text-color-regular: #cfd3dc;
  --el-text-color-secondary: #a3a6ad;
  --el-text-color-placeholder: #8d9095;
  --el-text-color-disabled: #6c6e72;
  --el-border-color: #4c4d4f;
  --el-border-color-light: #414243;
  --el-border-color-lighter: #363637;
  --el-border-color-extra-light: #2b2b2c;
  --el-border-color-dark: #58585b;
  --el-border-color-darker: #636466;
  --el-fill-color: #303133;
  --el-fill-color-light: #262727;
  --el-fill-color-lighter: #1d1d1d;
  --el-fill-color-extra-light: #191919;
  --el-fill-color-dark: #39393a;
  --el-fill-color-darker: #424243;
  --el-fill-color-blank: transparent;
  
  // 自定义组件暗色样式
  .layout-container {
    background-color: var(--el-bg-color-page);
  }
  
  .gva-card {
    background-color: var(--el-bg-color);
    border-color: var(--el-border-color);
  }
}
```

## 📱 Responsive Design

### Mobile Adaptation

```scss
// src/style/mobile.scss
@media screen and (max-width: 768px) {
  .layout-container {
    .aside {
      position: fixed;
      top: 0;
      left: -210px;
      z-index: 1001;
      transition: left 0.3s;
      
      &.mobile-show {
        left: 0;
      }
    }
    
    .main-container {
      margin-left: 0;
      
      .navbar {
        .hamburger-container {
          display: block;
        }
      }
    }
  }
  
  .gva-table {
    .el-table {
      font-size: 12px;
    }
    
    .gva-pagination {
      .el-pagination {
        justify-content: center;
        
        .el-pagination__sizes,
        .el-pagination__jump {
          display: none;
        }
      }
    }
  }
  
  .gva-form {
    .el-form-item {
      margin-bottom: 15px;
      
      .el-form-item__label {
        line-height: 20px;
        margin-bottom: 5px;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .gva-search-box {
    .el-form {
      .el-form-item {
        width: 100%;
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
  
  .gva-btn-list {
    .el-button {
      margin-bottom: 10px;
      width: 100%;
    }
  }
}
```

## 🚀 Performance Optimization

### Route Lazy Loading

```javascript
// 路由懒加载配置
const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/view/dashboard/index.vue')
  },
  {
    path: '/system',
    name: 'System',
    component: () => import(/* webpackChunkName: "system" */ '@/view/system/index.vue'),
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "system-user" */ '@/view/system/user/index.vue')
      }
    ]
  }
]
```

### Component Lazy Loading

```vue
<template>
  <div>
    <!-- 使用 Suspense 包装异步组件 -->
    <Suspense>
      <template #default>
        <AsyncComponent />
      </template>
      <template #fallback>
        <div class="loading">加载中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

// 异步组件
const AsyncComponent = defineAsyncComponent({
  loader: () => import('@/components/heavy-component.vue'),
  loadingComponent: () => import('@/components/loading.vue'),
  errorComponent: () => import('@/components/error.vue'),
  delay: 200,
  timeout: 3000
})
</script>
```

### Image Lazy Loading

```vue
<template>
  <div class="image-container">
    <img
      v-lazy="imageSrc"
      :alt="imageAlt"
      class="lazy-image"
      @load="handleImageLoad"
      @error="handleImageError"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: ''
  }
})

const imageLoaded = ref(false)
const imageError = ref(false)

const handleImageLoad = () => {
  imageLoaded.value = true
}

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.image-container {
  position: relative;
  overflow: hidden;
}

.lazy-image {
  width: 100%;
  height: auto;
  transition: opacity 0.3s;
}

.lazy-image[lazy=loading] {
  opacity: 0.3;
}

.lazy-image[lazy=loaded] {
  opacity: 1;
}

.lazy-image[lazy=error] {
  opacity: 0.3;
}
</style>
```

## 🧪 Testing

### Unit Test Configuration

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
```

### Component Test Example

```javascript
// tests/components/GvaTable.test.js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import GvaTable from '@/components/gva-table/index.vue'
import { ElTable, ElPagination } from 'element-plus'

describe('GvaTable', () => {
  it('renders table with data', () => {
    const tableData = [
      { id: 1, name: '张三', age: 25 },
      { id: 2, name: '李四', age: 30 }
    ]
    
    const wrapper = mount(GvaTable, {
      props: {
        tableData,
        total: 2,
        currentPage: 1,
        pageSize: 10
      },
      global: {
        components: {
          ElTable,
          ElPagination
        }
      }
    })
    
    expect(wrapper.find('.gva-table').exists()).toBe(true)
    expect(wrapper.find('.gva-pagination').exists()).toBe(true)
  })
  
  it('emits page-change event when page changes', async () => {
    const wrapper = mount(GvaTable, {
      props: {
        tableData: [],
        total: 100,
        currentPage: 1,
        pageSize: 10
      }
    })
    
    await wrapper.vm.handlePageChange(2)
    
    expect(wrapper.emitted('page-change')).toBeTruthy()
    expect(wrapper.emitted('page-change')[0]).toEqual([2])
  })
})
```

## 📚 Best Practices

### 1. Code Specification
- Use ESLint + Prettier to ensure code quality
- Follow Vue 3 Composition API best practices
- Component naming uses PascalCase
- File naming uses kebab-case

### 2. Performance Optimization
- Reasonably use v-memo and v-once
- Avoid complex calculations in templates
- Use shallowRef and shallowReactive to optimize reactivity
- Reasonably split components to avoid overly large components

### 3. Security Protection
- Validate and filter user input
- Be cautious of XSS protection when using v-html
- Do not store sensitive information on the front end
- Use HTTPS to transmit data

### 4. User Experience
- Provide loading status prompts
- Reasonable error handling and prompts
- Responsive design adapts to mobile devices
- Accessibility support

## 🐛 Common Issues

### Q: How to solve route lazy loading failure?
A: Check if the path is correct, ensure the component file exists, and add error handling.

### Q: Element Plus styles not taking effect?
A: Ensure the style file is correctly imported, and check CSS specificity and scope.

### Q: Pinia state loss?
A: Check if the state is correctly persisted, and reinitialize the state on page refresh.

### Q: Static resource path error after packaging?
A: Check the base path and publicPath settings in the Vite configuration.
