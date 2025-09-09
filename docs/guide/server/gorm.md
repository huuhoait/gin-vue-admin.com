# GORM Configuration and Guide for MySQL and PostgreSQL

> Needs to be rewritten!


## mysql

### server/config/gorm_mysql.go

- gorm-mysql

```go
package config

type Mysql struct {
	Path         string `mapstructure:"path" json:"path" yaml:"path"`                             // Server address
	Port         string `mapstructure:"port" json:"port" yaml:"port"`                             // Port
	Config       string `mapstructure:"config" json:"config" yaml:"config"`                       // Advanced configuration
	Dbname       string `mapstructure:"db-name" json:"dbname" yaml:"db-name"`                     // Database name
	Username     string `mapstructure:"username" json:"username" yaml:"username"`                 // Database username
	Password     string `mapstructure:"password" json:"password" yaml:"password"`                 // Database password
	MaxIdleConns int    `mapstructure:"max-idle-conns" json:"maxIdleConns" yaml:"max-idle-conns"` // Maximum number of idle connections
	MaxOpenConns int    `mapstructure:"max-open-conns" json:"maxOpenConns" yaml:"max-open-conns"` // Maximum number of open connections to database
	LogMode      string `mapstructure:"log-mode" json:"logMode" yaml:"log-mode"`                  // Whether to enable GORM global logging
	LogZap       bool   `mapstructure:"log-zap" json:"logZap" yaml:"log-zap"`                     // Whether to write logs to file through zap
}
```

## pgsql

### server/config/gorm_pgsql.go

- gorm-pgsql

```go
package config

type Pgsql struct {
	Path         string `mapstructure:"path" json:"path" yaml:"path"`                             // Server address:port
	Port         string `mapstructure:"port" json:"port" yaml:"port"`                             // :port
	Config       string `mapstructure:"config" json:"config" yaml:"config"`                       // Advanced configuration
	Dbname       string `mapstructure:"db-name" json:"dbname" yaml:"db-name"`                     // Database name
	Username     string `mapstructure:"username" json:"username" yaml:"username"`                 // Database username
	Password     string `mapstructure:"password" json:"password" yaml:"password"`                 // Database password
	MaxIdleConns int    `mapstructure:"max-idle-conns" json:"maxIdleConns" yaml:"max-idle-conns"` // Maximum number of idle connections
	MaxOpenConns int    `mapstructure:"max-open-conns" json:"maxOpenConns" yaml:"max-open-conns"` // Maximum number of open connections to database
	LogMode      string `mapstructure:"log-mode" json:"logMode" yaml:"log-mode"`                  // Whether to enable GORM global logging
	LogZap       bool   `mapstructure:"log-zap" json:"logZap" yaml:"log-zap"`                     // Whether to write logs to file through zap
}
```

### server/config/config.go

### Under system options, choose db-type as mysql or pgsql

```yaml
system:
  env: 'public'  # Change to "develop" to skip authentication for development mode
  addr: 8888
  db-type: 'mysql'
  oss-type: 'local'    # Controls OSS selection for local or Qiniu and other storage. You can add other OSS storage in server/utils/upload/upload.go NewOss function configuration
  use-multipoint: false
  # IP limit count 15000 times per hour
  iplimit-count: 15000
  # IP limit time one hour
  iplimit-time: 3600
```


### config.yaml Configuration Field Details
```yaml
mysql:
  path: ''   # Connection address
  port: ''   # Connection port
  config: ''  # Other configurations such as timezone
  db-name: ''  # Database name
  username: '' # Database username
  password: '' # Database password
  max-idle-conns: 10 # Connection pool related
  max-open-conns: 100 # Connection pool related
  log-mode: "" # Console log level "silent", "error", "warn", "info" defaults to info if not filled, fill silent to close console logs
  log-zap: false # Whether to save logs to local using zap
```
