# Database Design Documentation

This document provides detailed information about the database design of the Gin-Vue-Admin project, including table structure, relationship design, index optimization, etc.

## 📊 Database Architecture Overview

### 1. Database Selection

Gin-Vue-Admin supports multiple databases:

- **MySQL 8.0+** (Recommended)
- **PostgreSQL 12+**
- **SQLite 3** (Development environment)
- **SQL Server 2019+**

### 2. Core Modules

```
Database Architecture
├── System Management Module
│   ├── User Management (sys_users)
│   ├── Role Management (sys_authorities)
│   ├── Menu Management (sys_base_menus)
│   ├── API Management (sys_apis)
│   └── Permission Rules (casbin_rule)
├── Basic Function Module
│   ├── Dictionary Management (sys_dictionaries)
│   ├── File Upload (exa_file_upload_and_downloads)
│   ├── Operation History (sys_operation_records)
│   └── JWT Blacklist (jwt_blacklists)
├── Code Generation Module
│   ├── Auto Code (sys_auto_codes)
│   └── Code History (sys_auto_code_histories)
└── Example Module
    ├── Customer Management (exa_customers)
    └── File Chunks (exa_file_chunks)
```

## 🗃️ Core Table Structure

### 1. User Management Tables

#### sys_users (User Table)

```sql
CREATE TABLE `sys_users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'User ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT 'Created time',
  `updated_at` datetime(3) DEFAULT NULL COMMENT 'Updated time',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT 'Deleted time',
  `uuid` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'User UUID',
  `username` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'User login name',
  `password` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'User login password',
  `nick_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT 'System User' COMMENT 'User nickname',
  `side_mode` varchar(191) COLLATE utf8mb4_general_ci DEFAULT 'dark' COMMENT 'Theme mode',
  `header_img` varchar(191) COLLATE utf8mb4_general_ci DEFAULT 'https://qmplusimg.henrongyi.top/gva_header.jpg' COMMENT 'User avatar',
  `base_color` varchar(191) COLLATE utf8mb4_general_ci DEFAULT '#fff' COMMENT 'Base color',
  `active_color` varchar(191) COLLATE utf8mb4_general_ci DEFAULT '#1890ff' COMMENT 'Active color',
  `authority_id` bigint unsigned DEFAULT '888' COMMENT 'User role ID',
  `phone` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'User phone number',
  `email` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'User email',
  `enable` tinyint(1) DEFAULT '1' COMMENT 'User freeze status 1 normal 2 frozen',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_sys_users_username` (`username`),
  UNIQUE KEY `idx_sys_users_uuid` (`uuid`),
  KEY `idx_sys_users_deleted_at` (`deleted_at`),
  KEY `idx_sys_users_authority_id` (`authority_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='User table';
```

#### sys_authorities (Role Table)

```sql
CREATE TABLE `sys_authorities` (
  `created_at` datetime(3) DEFAULT NULL COMMENT 'Created time',
  `updated_at` datetime(3) DEFAULT NULL COMMENT 'Updated time',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT 'Deleted time',
  `authority_id` bigint unsigned NOT NULL COMMENT 'Role ID',
  `authority_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Role name',
  `parent_id` bigint unsigned DEFAULT NULL COMMENT 'Parent role ID',
  `default_router` varchar(191) COLLATE utf8mb4_general_ci DEFAULT 'dashboard' COMMENT 'Default menu',
  PRIMARY KEY (`authority_id`),
  UNIQUE KEY `idx_sys_authorities_authority_id` (`authority_id`),
  KEY `idx_sys_authorities_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Role table';
```

#### sys_user_authority (User Role Association Table)

```sql
CREATE TABLE `sys_user_authority` (
  `sys_user_id` bigint unsigned NOT NULL COMMENT 'User ID',
  `sys_authority_authority_id` bigint unsigned NOT NULL COMMENT 'Role ID',
  PRIMARY KEY (`sys_user_id`,`sys_authority_authority_id`),
  KEY `fk_sys_user_authority_sys_authority` (`sys_authority_authority_id`),
  CONSTRAINT `fk_sys_user_authority_sys_authority` FOREIGN KEY (`sys_authority_authority_id`) REFERENCES `sys_authorities` (`authority_id`),
  CONSTRAINT `fk_sys_user_authority_sys_user` FOREIGN KEY (`sys_user_id`) REFERENCES `sys_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='User role association table';
```

### 2. Permission Management Tables

#### casbin_rule (Permission Rules Table)

```sql
CREATE TABLE `casbin_rule` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ptype` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Policy type',
  `v0` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Role ID',
  `v1` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Resource path',
  `v2` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Request method',
  `v3` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `v4` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `v5` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_casbin_rule` (`ptype`,`v0`,`v1`,`v2`,`v3`,`v4`,`v5`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Casbin permission rules table';
```

#### sys_apis (API Management Table)

```sql
CREATE TABLE `sys_apis` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'API ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT 'Created time',
  `updated_at` datetime(3) DEFAULT NULL COMMENT 'Updated time',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT 'Deleted time',
  `path` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'API path',
  `description` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'API description',
  `api_group` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'API group',
  `method` varchar(191) COLLATE utf8mb4_general_ci DEFAULT 'POST' COMMENT 'Request method',
  PRIMARY KEY (`id`),
  KEY `idx_sys_apis_deleted_at` (`deleted_at`),
  KEY `idx_sys_apis_path_method` (`path`,`method`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='API management table';
```

#### sys_authority_menus (Role Menu Association Table)

```sql
CREATE TABLE `sys_authority_menus` (
  `sys_authority_authority_id` bigint unsigned NOT NULL COMMENT 'Role ID',
  `sys_base_menu_id` bigint unsigned NOT NULL COMMENT 'Menu ID',
  PRIMARY KEY (`sys_authority_authority_id`,`sys_base_menu_id`),
  KEY `fk_sys_authority_menus_sys_base_menu` (`sys_base_menu_id`),
  CONSTRAINT `fk_sys_authority_menus_sys_authority` FOREIGN KEY (`sys_authority_authority_id`) REFERENCES `sys_authorities` (`authority_id`),
  CONSTRAINT `fk_sys_authority_menus_sys_base_menu` FOREIGN KEY (`sys_base_menu_id`) REFERENCES `sys_base_menus` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Role menu association table';
```

### 3. Menu Management Tables

#### sys_base_menus (Base Menu Table)

```sql
CREATE TABLE `sys_base_menus` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Menu ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT 'Created time',
  `updated_at` datetime(3) DEFAULT NULL COMMENT 'Updated time',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT 'Deleted time',
  `menu_level` bigint unsigned DEFAULT NULL COMMENT 'Menu level',
  `parent_id` bigint unsigned DEFAULT NULL COMMENT 'Parent menu ID',
  `path` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Route path',
  `name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Route name',
  `hidden` tinyint(1) DEFAULT NULL COMMENT 'Whether hidden',
  `component` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Component path',
  `sort` bigint DEFAULT NULL COMMENT 'Sort order',
  `active_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Active menu',
  `keep_alive` tinyint(1) DEFAULT NULL COMMENT 'Whether to cache',
  `default_menu` tinyint(1) DEFAULT NULL COMMENT 'Whether default menu',
  `title` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Menu title',
  `icon` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Menu icon',
  `close_tab` tinyint(1) DEFAULT NULL COMMENT 'Whether to close tab',
  PRIMARY KEY (`id`),
  KEY `idx_sys_base_menus_deleted_at` (`deleted_at`),
  KEY `idx_sys_base_menus_parent_id` (`parent_id`),
  KEY `idx_sys_base_menus_sort` (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Base menu table';
```

#### sys_base_menu_btns (Menu Button Table)

```sql
CREATE TABLE `sys_base_menu_btns` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Button ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT 'Created time',
  `updated_at` datetime(3) DEFAULT NULL COMMENT 'Updated time',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT 'Deleted time',
  `name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Button name',
  `desc` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Button description',
  `sys_base_menu_id` bigint unsigned DEFAULT NULL COMMENT 'Menu ID',
  PRIMARY KEY (`id`),
  KEY `idx_sys_base_menu_btns_deleted_at` (`deleted_at`),
  KEY `idx_sys_base_menu_btns_sys_base_menu_id` (`sys_base_menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Menu button table';
```

### 4. System Function Tables

#### sys_dictionaries (Dictionary Table)

```sql
CREATE TABLE `sys_dictionaries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Dictionary ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT 'Created time',
  `updated_at` datetime(3) DEFAULT NULL COMMENT 'Updated time',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT 'Deleted time',
  `name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Dictionary name',
  `type` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Dictionary type',
  `status` tinyint(1) DEFAULT NULL COMMENT 'Status',
  `desc` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Description',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_sys_dictionaries_type` (`type`),
  KEY `idx_sys_dictionaries_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Dictionary table';
```

#### sys_dictionary_details (Dictionary Details Table)

```sql
CREATE TABLE `sys_dictionary_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Dictionary detail ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT 'Created time',
  `updated_at` datetime(3) DEFAULT NULL COMMENT 'Updated time',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT 'Deleted time',
  `label` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Display value',
  `value` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Dictionary value',
  `extend` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Extended value',
  `status` tinyint(1) DEFAULT NULL COMMENT 'Enable status',
  `sort` bigint DEFAULT NULL COMMENT 'Sort order',
  `sys_dictionary_id` bigint unsigned DEFAULT NULL COMMENT 'Associated dictionary ID',
  PRIMARY KEY (`id`),
  KEY `idx_sys_dictionary_details_deleted_at` (`deleted_at`),
  KEY `idx_sys_dictionary_details_sys_dictionary_id` (`sys_dictionary_id`),
  KEY `idx_sys_dictionary_details_sort` (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Dictionary details table';
```

#### sys_operation_records (Operation Records Table)

```sql
CREATE TABLE `sys_operation_records` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Record ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT 'Created time',
  `updated_at` datetime(3) DEFAULT NULL COMMENT 'Updated time',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT 'Deleted time',
  `ip` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Request IP',
  `method` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Request method',
  `path` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Request path',
  `status` bigint DEFAULT NULL COMMENT 'Request status',
  `latency` bigint DEFAULT NULL COMMENT 'Latency time',
  `agent` text COLLATE utf8mb4_general_ci COMMENT 'Agent information',
  `error_message` text COLLATE utf8mb4_general_ci COMMENT 'Error message',
  `body` text COLLATE utf8mb4_general_ci COMMENT 'Request Body',
  `resp` text COLLATE utf8mb4_general_ci COMMENT 'Response Body',
  `user_id` bigint unsigned DEFAULT NULL COMMENT 'User ID',
  PRIMARY KEY (`id`),
  KEY `idx_sys_operation_records_deleted_at` (`deleted_at`),
  KEY `idx_sys_operation_records_user_id` (`user_id`),
  KEY `idx_sys_operation_records_created_at` (`created_at`),
  KEY `idx_sys_operation_records_method_path` (`method`,`path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Operation records table';
```

### 5. File Management Tables

#### exa_file_upload_and_downloads (File Upload and Download Table)

```sql
CREATE TABLE `exa_file_upload_and_downloads` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'File ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT 'Created time',
  `updated_at` datetime(3) DEFAULT NULL COMMENT 'Updated time',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT 'Deleted time',
  `name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'File name',
  `url` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'File address',
  `tag` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'File tag',
  `key` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'File unique identifier',
  PRIMARY KEY (`id`),
  KEY `idx_exa_file_upload_and_downloads_deleted_at` (`deleted_at`),
  KEY `idx_exa_file_upload_and_downloads_tag` (`tag`),
  KEY `idx_exa_file_upload_and_downloads_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='File upload and download table';
```

#### exa_file_chunks (File Chunks Table)

```sql
CREATE TABLE `exa_file_chunks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Chunk ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT 'Created time',
  `updated_at` datetime(3) DEFAULT NULL COMMENT 'Updated time',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT 'Deleted time',
  `exa_file_id` bigint unsigned DEFAULT NULL COMMENT 'File ID',
  `file_chunk_number` bigint DEFAULT NULL COMMENT 'Chunk number',
  `file_chunk_path` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Chunk path',
  PRIMARY KEY (`id`),
  KEY `idx_exa_file_chunks_deleted_at` (`deleted_at`),
  KEY `idx_exa_file_chunks_exa_file_id` (`exa_file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='File chunks table';
```

### 6. Code Generation Tables

#### sys_auto_codes (Auto Code Table)

```sql
CREATE TABLE `sys_auto_codes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Code ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT 'Created time',
  `updated_at` datetime(3) DEFAULT NULL COMMENT 'Updated time',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT 'Deleted time',
  `package_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Package name',
  `label` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Display name',
  `desc` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Description',
  PRIMARY KEY (`id`),
  KEY `idx_sys_auto_codes_deleted_at` (`deleted_at`),
  KEY `idx_sys_auto_codes_package_name` (`package_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Auto code table';
```

#### sys_auto_code_histories (Code Generation History Table)

```sql
CREATE TABLE `sys_auto_code_histories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'History ID',
  `created_at` datetime(3) DEFAULT NULL COMMENT 'Created time',
  `updated_at` datetime(3) DEFAULT NULL COMMENT 'Updated time',
  `deleted_at` datetime(3) DEFAULT NULL COMMENT 'Deleted time',
  `package` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Package name',
  `business_db` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Business database',
  `table_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Table name',
  `menu_id` bigint unsigned DEFAULT NULL COMMENT 'Menu ID',
  `request_meta` text COLLATE utf8mb4_general_ci COMMENT 'Request metadata',
  `auto_code_path` text COLLATE utf8mb4_general_ci COMMENT 'Auto generated code path',
  `injection_meta` text COLLATE utf8mb4_general_ci COMMENT 'Injection metadata',
  `struct_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Struct name',
  `struct_cn_name` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Struct Chinese name',
  `api_ids` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'API IDs',
  `flag` bigint DEFAULT NULL COMMENT 'Flag',
  PRIMARY KEY (`id`),
  KEY `idx_sys_auto_code_histories_deleted_at` (`deleted_at`),
  KEY `idx_sys_auto_code_histories_package` (`package`),
  KEY `idx_sys_auto_code_histories_table_name` (`table_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Code generation history table';
```

## 🔗 Table Relationship Design

### 1. User Permission Relationship Diagram

```
User (sys_users)
    ↓ (1:N)
User Role Association (sys_user_authority)
    ↓ (N:1)
Role (sys_authorities)
    ↓ (1:N)
Role Menu Association (sys_authority_menus)
    ↓ (N:1)
Menu (sys_base_menus)
    ↓ (1:N)
Menu Buttons (sys_base_menu_btns)

Role (sys_authorities)
    ↓ (via Casbin)
Permission Rules (casbin_rule)
    ↓ (associated)
API (sys_apis)
```

### 2. Core Relationship Description

#### User-Role Relationship

```go
// User struct
type SysUser struct {
    global.GVA_MODEL
    UUID        uuid.UUID      `json:"uuid" gorm:"index;comment:User UUID"`
    Username    string         `json:"userName" gorm:"index;comment:User login name"`
    Password    string         `json:"-" gorm:"comment:User login password"`
    NickName    string         `json:"nickName" gorm:"default:System User;comment:User nickname"`
    SideMode    string         `json:"sideMode" gorm:"default:dark;comment:User sidebar theme"`
    HeaderImg   string         `json:"headerImg" gorm:"default:https://qmplusimg.henrongyi.top/gva_header.jpg;comment:User avatar"`
    BaseColor   string         `json:"baseColor" gorm:"default:#fff;comment:Base color"`
    ActiveColor string         `json:"activeColor" gorm:"default:#1890ff;comment:Active color"`
    AuthorityId uint           `json:"authorityId" gorm:"default:888;comment:User role ID"`
    Authority   SysAuthority   `json:"authority" gorm:"foreignKey:AuthorityId;references:AuthorityId;comment:User role"`
    Authorities []SysAuthority `json:"authorities" gorm:"many2many:sys_user_authority;"`
    Phone       string         `json:"phone" gorm:"comment:User phone number"`
    Email       string         `json:"email" gorm:"comment:User email"`
    Enable      int            `json:"enable" gorm:"default:1;comment:User freeze status 1 normal 2 frozen"`
}
```

#### Role-Menu Relationship

```go
// Role struct
type SysAuthority struct {
    CreatedAt     time.Time       `json:"createdAt"`
    UpdatedAt     time.Time       `json:"updatedAt"`
    DeletedAt     *gorm.DeletedAt `json:"-" gorm:"index"`
    AuthorityId   uint            `json:"authorityId" gorm:"not null;unique;primary_key;comment:Role ID"`
    AuthorityName string          `json:"authorityName" gorm:"comment:Role name"`
    ParentId      *uint           `json:"parentId" gorm:"comment:Parent role ID"`
    DataAuthorityId []SysAuthority `json:"dataAuthorityId" gorm:"many2many:sys_data_authority_id"`
    Children      []SysAuthority  `json:"children" gorm:"-"`
    SysBaseMenus  []SysBaseMenu   `json:"menus" gorm:"many2many:sys_authority_menus;"`
    Users         []SysUser       `json:"-" gorm:"many2many:sys_user_authority;"`
    DefaultRouter string          `json:"defaultRouter" gorm:"comment:Default menu"`
}
```

#### Menu Hierarchy Relationship

```go
// Menu struct
type SysBaseMenu struct {
    global.GVA_MODEL
    MenuLevel     uint                                     `json:"-"`
    ParentId      *uint                                    `json:"parentId" gorm:"comment:Parent menu ID"`
    Path          string                                   `json:"path" gorm:"comment:Route path"`
    Name          string                                   `json:"name" gorm:"comment:Route name"`
    Hidden        *bool                                    `json:"hidden" gorm:"comment:Whether hidden in list"`
    Component     string                                   `json:"component" gorm:"comment:Corresponding frontend file path"`
    Sort          int                                      `json:"sort" gorm:"comment:Sort order"`
    ActiveName    string                                   `json:"activeName" gorm:"comment:Active menu"`
    KeepAlive     *bool                                    `json:"keepAlive" gorm:"comment:Whether to cache"`
    DefaultMenu   *bool                                    `json:"defaultMenu" gorm:"comment:Whether is base route (in development)"`
    Title         string                                   `json:"title" gorm:"comment:Menu name"`
    Icon          string                                   `json:"icon" gorm:"comment:Menu icon"`
    CloseTab      *bool                                    `json:"closeTab" gorm:"comment:Auto close tab"`
    Authorities   []SysAuthority                           `json:"authorities" gorm:"many2many:sys_authority_menus;"`
    Children      []SysBaseMenu                            `json:"children" gorm:"-"`
    MenuBtn       []SysBaseMenuBtn                         `json:"menuBtn"`
    Parameters    []SysBaseMenuParameter                   `json:"parameters"`
}
```

## 📈 Index Optimization Strategy

### 1. Main Index Design

#### User Table Indexes

```sql
-- Primary key index
PRIMARY KEY (`id`)

-- Unique indexes
UNIQUE KEY `idx_sys_users_username` (`username`)
UNIQUE KEY `idx_sys_users_uuid` (`uuid`)

-- Regular indexes
KEY `idx_sys_users_deleted_at` (`deleted_at`)
KEY `idx_sys_users_authority_id` (`authority_id`)
KEY `idx_sys_users_email` (`email`)
KEY `idx_sys_users_phone` (`phone`)

-- Composite indexes
KEY `idx_sys_users_enable_deleted` (`enable`, `deleted_at`)
```

#### Operation Records Table Indexes

```sql
-- Time range query index
KEY `idx_sys_operation_records_created_at` (`created_at`)

-- User operation query index
KEY `idx_sys_operation_records_user_id` (`user_id`)

-- API path query index
KEY `idx_sys_operation_records_method_path` (`method`, `path`)

-- Status query index
KEY `idx_sys_operation_records_status` (`status`)

-- Composite query index
KEY `idx_operation_user_time` (`user_id`, `created_at`, `method`)
```

#### Permission Rules Table Indexes

```sql
-- Casbin query optimization index
UNIQUE KEY `idx_casbin_rule` (`ptype`,`v0`,`v1`,`v2`,`v3`,`v4`,`v5`)

-- Role permission query index
KEY `idx_casbin_rule_v0` (`v0`)

-- Resource permission query index
KEY `idx_casbin_rule_v1_v2` (`v1`, `v2`)
```

### 2. Query Optimization Examples

#### User List Query Optimization

```sql
-- Before optimization: full table scan
SELECT * FROM sys_users 
WHERE deleted_at IS NULL 
AND enable = 1 
ORDER BY created_at DESC 
LIMIT 10 OFFSET 0;

-- After optimization: using composite index
SELECT id, username, nick_name, email, phone, created_at 
FROM sys_users 
WHERE enable = 1 AND deleted_at IS NULL 
ORDER BY created_at DESC 
LIMIT 10 OFFSET 0;

-- Corresponding index
KEY `idx_users_enable_deleted_created` (`enable`, `deleted_at`, `created_at`)
```

#### Operation Log Query Optimization

```sql
-- Query by user and time range
SELECT * FROM sys_operation_records 
WHERE user_id = 1 
AND created_at BETWEEN '2023-01-01' AND '2023-12-31'
AND deleted_at IS NULL
ORDER BY created_at DESC;

-- Corresponding index
KEY `idx_operation_user_time_deleted` (`user_id`, `created_at`, `deleted_at`)
```

#### Permission Verification Query Optimization

```sql
-- Casbin permission verification query
SELECT * FROM casbin_rule 
WHERE ptype = 'p' 
AND v0 = '888' 
AND v1 = '/user/getUserList' 
AND v2 = 'POST';

-- Existing unique index covers this query
UNIQUE KEY `idx_casbin_rule` (`ptype`,`v0`,`v1`,`v2`,`v3`,`v4`,`v5`)
```

## 🗄️ Database Configuration

### 1. GORM Configuration

```go
// config/gorm.go
type Mysql struct {
    GeneralDB `yaml:",inline" mapstructure:",squash"`
}

type GeneralDB struct {
    Path         string `mapstructure:"path" json:"path" yaml:"path"`
    Port         string `mapstructure:"port" json:"port" yaml:"port"`
    Config       string `mapstructure:"config" json:"config" yaml:"config"`
    Dbname       string `mapstructure:"db-name" json:"db-name" yaml:"db-name"`
    Username     string `mapstructure:"username" json:"username" yaml:"username"`
    Password     string `mapstructure:"password" json:"password" yaml:"password"`
    Prefix       string `mapstructure:"prefix" json:"prefix" yaml:"prefix"`
    Singular     bool   `mapstructure:"singular" json:"singular" yaml:"singular"`
    Engine       string `mapstructure:"engine" json:"engine" yaml:"engine" default:"InnoDB"`
    MaxIdleConns int    `mapstructure:"max-idle-conns" json:"max-idle-conns" yaml:"max-idle-conns"`
    MaxOpenConns int    `mapstructure:"max-open-conns" json:"max-open-conns" yaml:"max-open-conns"`
    LogMode      string `mapstructure:"log-mode" json:"log-mode" yaml:"log-mode"`
    LogZap       bool   `mapstructure:"log-zap" json:"log-zap" yaml:"log-zap"`
}
```

### 2. Connection Pool Configuration

```go
// initialize/gorm.go
func GormMysql() *gorm.DB {
    m := global.GVA_CONFIG.Mysql
    if m.Dbname == "" {
        return nil
    }
    mysqlConfig := mysql.Config{
        DSN:                       m.Dsn(),
        DefaultStringSize:         191,
        SkipInitializeWithVersion: false,
    }
    if db, err := gorm.Open(mysql.New(mysqlConfig), internal.Gorm.Config(m.Prefix, m.Singular)); err != nil {
        return nil
    } else {
        db.InstanceSet("gorm:table_options", "ENGINE="+m.Engine)
        sqlDB, _ := db.DB()
        sqlDB.SetMaxIdleConns(m.MaxIdleConns)
        sqlDB.SetMaxOpenConns(m.MaxOpenConns)
        return db
    }
}
```

### 3. Database Migration

```go
// initialize/gorm.go
func RegisterTables() {
    db := global.GVA_DB
    err := db.AutoMigrate(
        // System module
        system.SysUser{},
        system.SysAuthority{},
        system.SysApi{},
        system.SysBaseMenu{},
        system.SysBaseMenuBtn{},
        system.SysBaseMenuParameter{},
        system.SysAutoCode{},
        system.SysAutoCodeHistory{},
        system.SysDictionary{},
        system.SysDictionaryDetail{},
        system.SysOperationRecord{},
        
        // Example module
        example.ExaFile{},
        example.ExaFileChunk{},
        example.ExaFileUploadAndDownload{},
        example.ExaCustomer{},
    )
    if err != nil {
        global.GVA_LOG.Error("register table failed", zap.Error(err))
        os.Exit(0)
    }
    global.GVA_LOG.Info("register table success")
}
```

## 🔧 Database Maintenance

### 1. Backup Strategy

#### Full Backup Script

```bash
#!/bin/bash
# backup_full.sh

DB_NAME="gin_vue_admin"
DB_USER="root"
DB_PASS="password"
BACKUP_DIR="/backup/mysql"
DATE=$(date +"%Y%m%d_%H%M%S")

# Create backup directory
mkdir -p $BACKUP_DIR

# Full backup
mysqldump -u$DB_USER -p$DB_PASS \
  --single-transaction \
  --routines \
  --triggers \
  --events \
  --hex-blob \
  $DB_NAME > $BACKUP_DIR/full_backup_$DATE.sql

# Compress backup file
gzip $BACKUP_DIR/full_backup_$DATE.sql

# Delete backups older than 7 days
find $BACKUP_DIR -name "full_backup_*.sql.gz" -mtime +7 -delete

echo "Full backup completed: full_backup_$DATE.sql.gz"
```

#### Incremental Backup Script

```bash
#!/bin/bash
# backup_incremental.sh

DB_NAME="gin_vue_admin"
DB_USER="root"
DB_PASS="password"
BACKUP_DIR="/backup/mysql/incremental"
DATE=$(date +"%Y%m%d_%H%M%S")

# Create backup directory
mkdir -p $BACKUP_DIR

# Incremental backup (based on binlog)
mysqlbinlog --start-datetime="$(date -d '1 hour ago' '+%Y-%m-%d %H:%M:%S')" \
  --stop-datetime="$(date '+%Y-%m-%d %H:%M:%S')" \
  /var/lib/mysql/mysql-bin.* > $BACKUP_DIR/incremental_$DATE.sql

# Compress backup file
gzip $BACKUP_DIR/incremental_$DATE.sql

echo "Incremental backup completed: incremental_$DATE.sql.gz"
```

### 2. Performance Monitoring

#### Slow Query Monitoring

```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;
SET GLOBAL log_queries_not_using_indexes = 'ON';

-- View slow query statistics
SELECT 
    SCHEMA_NAME,
    DIGEST_TEXT,
    COUNT_STAR,
    AVG_TIMER_WAIT/1000000000 AS avg_time_seconds,
    MAX_TIMER_WAIT/1000000000 AS max_time_seconds
FROM performance_schema.events_statements_summary_by_digest 
WHERE SCHEMA_NAME = 'gin_vue_admin'
ORDER BY AVG_TIMER_WAIT DESC 
LIMIT 10;
```

#### Index Usage Statistics

```sql
-- View unused indexes
SELECT 
    t.TABLE_SCHEMA,
    t.TABLE_NAME,
    t.INDEX_NAME,
    t.NON_UNIQUE,
    t.COLUMN_NAME
FROM information_schema.STATISTICS t
LEFT JOIN performance_schema.table_io_waits_summary_by_index_usage i
    ON t.TABLE_SCHEMA = i.OBJECT_SCHEMA
    AND t.TABLE_NAME = i.OBJECT_NAME
    AND t.INDEX_NAME = i.INDEX_NAME
WHERE t.TABLE_SCHEMA = 'gin_vue_admin'
    AND i.INDEX_NAME IS NULL
    AND t.INDEX_NAME != 'PRIMARY'
ORDER BY t.TABLE_NAME, t.INDEX_NAME;

-- View index usage frequency
SELECT 
    OBJECT_SCHEMA,
    OBJECT_NAME,
    INDEX_NAME,
    COUNT_READ,
    COUNT_WRITE,
    COUNT_FETCH,
    COUNT_INSERT,
    COUNT_UPDATE,
    COUNT_DELETE
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = 'gin_vue_admin'
ORDER BY COUNT_READ DESC;
```

### 3. Data Cleanup

#### Operation Log Cleanup

```sql
-- Clean up operation logs older than 30 days
DELETE FROM sys_operation_records 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- Clean up soft deleted data (use with caution)
DELETE FROM sys_users 
WHERE deleted_at IS NOT NULL 
AND deleted_at < DATE_SUB(NOW(), INTERVAL 90 DAY);
```

#### Regular Maintenance Script

```sql
-- Optimize tables
OPTIMIZE TABLE sys_operation_records;
OPTIMIZE TABLE sys_users;
OPTIMIZE TABLE casbin_rule;

-- Analyze tables
ANALYZE TABLE sys_operation_records;
ANALYZE TABLE sys_users;
ANALYZE TABLE casbin_rule;

-- Check tables
CHECK TABLE sys_operation_records;
CHECK TABLE sys_users;
CHECK TABLE casbin_rule;
```

## 📊 Data Dictionary

### 1. Status Code Definitions

| Field | Value | Description |
|-------|-------|-------------|
| enable | 1 | User enabled |
| enable | 2 | User frozen |
| status | 1 | Dictionary enabled |
| status | 0 | Dictionary disabled |
| hidden | true | Menu hidden |
| hidden | false | Menu visible |

### 2. Default Data

#### Default Roles

```sql
INSERT INTO `sys_authorities` VALUES 
('2023-01-01 00:00:00.000','2023-01-01 00:00:00.000',NULL,888,'Regular User',0,'dashboard'),
('2023-01-01 00:00:00.000','2023-01-01 00:00:00.000',NULL,8881,'Regular User Sub-role',888,'dashboard'),
('2023-01-01 00:00:00.000','2023-01-01 00:00:00.000',NULL,9528,'Test Role',0,'dashboard');
```

#### Default User

```sql
INSERT INTO `sys_users` VALUES 
(1,'2023-01-01 00:00:00.000','2023-01-01 00:00:00.000',NULL,'a303176530-3dda-4a33-b261-61809d378a34','admin','$2a$10$2XLuViXqLcn18zyGHU.9COFYqI16yGHjs6pXU5klUkdOKWjjceYUC','Super Administrator','dark','https://qmplusimg.henrongyi.top/gva_header.jpg','#fff','#1890ff',888,'17611111111','333333333@qq.com',1);
```

## 📚 Related Documentation

- [GORM Official Documentation](https://gorm.io/zh_CN/docs/)
- [MySQL Performance Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [Casbin Permission Model](https://casbin.org/docs/zh-CN/overview)
- [Database Design Standards](/guide/best-practices/development-standards)