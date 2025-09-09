# strictAuth Strict Role Mode

## Introduction

After enabling strict role mode, users can only access permissions of their own roles and cannot access permissions of other roles.

## Configuration

```yaml
system:
  db-type: mysql
  oss-type: local
  router-prefix: ""
  addr: 8888
  iplimit-count: 15000
  iplimit-time: 3600
  use-multipoint: false
  use-redis: false
  use-mongo: false
  use-strict-auth: true  # Change this to true
```

## Usage
If it is a top-level role, you can see your own role and can assign related API permissions and menu permissions of your own role
If it is a sub-role, you cannot see your own role, you can see all sub-roles of your own role, and you can assign permissions to sub-levels and all sub-level roles, the assignment scope is all permissions of your own role
```
