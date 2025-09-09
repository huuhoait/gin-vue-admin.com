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
  oss-type: 'local'    # 控制oss选择走本地还是 七牛等其他仓 自行增加其他oss仓可以在 server/utils/upload/upload.go 中 NewOss函数配置
  use-multipoint: false
  # IP限制次数 一个小时15000次
  iplimit-count: 15000
  #  IP限制一个小时
  iplimit-time: 3600
```


### config.yaml 配置字段详解
```yaml
mysql:
  path: ''   # 链接地址
  port: ''   # 链接端口
  config: ''  # 其他配置 例如时区
  db-name: ''  # 数据库名称
  username: '' # 数据库用户名
  password: '' # 数据库密码
  max-idle-conns: 10 # 连接池相关
  max-open-conns: 100 # 连接池相关
  log-mode: "" # 是控制台打印日志级别 "silent"、"error"、"warn"、"info" 不填默认info  填入silent可以关闭控制台日志
  log-zap: false # 日志是否用zap保存到本地
```
