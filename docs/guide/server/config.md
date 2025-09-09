# Configuration File

## JWT

### yaml

```yaml
# jwt configuration
jwt:
  signing-key: 'qmPlus'
  expires-time: 7d
  buffer-time: 1d
```

### struct

```go
type JWT struct {
	SigningKey  string `mapstructure:"signing-key" json:"signing-key" yaml:"signing-key"`    // jwt signature
	ExpiresTime string `mapstructure:"expires-time" json:"expires-time" yaml:"expires-time"` // expiration time
	BufferTime  string `mapstructure:"buffer-time" json:"buffer-time" yaml:"buffer-time"`    // buffer time
	Issuer      string `mapstructure:"issuer" json:"issuer" yaml:"issuer"`                   // issuer
}
```

### description

| Configuration Name | Type   | Description      |
| :---------- | :----- | :-------- |
| signing-key | string | jwt signature |
| expires-time | int64 | expiration time |
| buffer-time | int64 | buffer time (requests within this time before expiration will refresh jwt renewal) |
| issuer | string | jwt issuer |

## Zap

### yaml

```yaml
# zap logger configuration
zap:
  level: 'info'
  format: 'console'
  prefix: '[GIN-VUE-ADMIN]'
  director: 'log'
  show-line: true
  encode-level: 'LowercaseColorLevelEncoder'
  stacktrace-key: 'stacktrace'
  log-in-console: true
  retention-day: 7
```

### struct

```go
type Zap struct {
	Level         string `mapstructure:"level" json:"level" yaml:"level"`                            // Level
	Prefix        string `mapstructure:"prefix" json:"prefix" yaml:"prefix"`                         // Log prefix
	Format        string `mapstructure:"format" json:"format" yaml:"format"`                         // Output
	Director      string `mapstructure:"director" json:"director"  yaml:"director"`                  // Log folder
	EncodeLevel   string `mapstructure:"encode-level" json:"encode-level" yaml:"encode-level"`       // Encode level
	StacktraceKey string `mapstructure:"stacktrace-key" json:"stacktrace-key" yaml:"stacktrace-key"` // Stack name
	ShowLine      bool   `mapstructure:"show-line" json:"show-line" yaml:"show-line"`                // Show line
	LogInConsole  bool   `mapstructure:"log-in-console" json:"log-in-console" yaml:"log-in-console"` // Output to console
	RetentionDay  int    `mapstructure:"retention-day" json:"retention-day" yaml:"retention-day"`    // Log retention days
}
```

### description

| Configuration Name | Type   | Description                                                         |
| -------------- | ------ | ------------------------------------------------------------ |
| level          | string | Detailed description of level modes, see [zap official documentation](https://pkg.go.dev/go.uber.org/zap?tab=doc#pkg-constants) <br />info: info mode, no error stack information, only output information <br />debug: debug mode, detailed error stack information <br />warn: warn mode <br />error: error mode, detailed error stack information <br />dpanic: dpanic mode <br />panic: panic mode <br />fatal: fatal mode |
| format         | string | console: console format output logs json: json format output logs           |
| prefix         | string | Log prefix                                                   |
| director       | string | Log folder, modify as needed, no need to manually create                     |
| show_line      | bool   | Show line numbers, default true, not recommended to modify                              |
| encode_level   | string | LowercaseLevelEncoder: lowercase <br />LowercaseColorLevelEncoder: lowercase with color <br />CapitalLevelEncoder: uppercase <br />CapitalColorLevelEncoder: uppercase with color |
| stacktrace_key | string | Stack name, the json key when outputting logs in json format                 |
| log_in_console | bool   | Whether to output to console, default true                                  |
| retention_day  | int    | Log retention days                                                 |

- Development Environment || Debug Environment Configuration Recommendations
	- `level:debug`
	- `format:console`
	- `encode-level:LowercaseColorLevelEncoder` or `encode-leve:CapitalColorLevelEncoder`
- Production Environment Configuration Recommendations
	- `level:error`
	- `format:json`
	- `encode-level: LowercaseLevelEncoder ` or `encode-level:CapitalLevelEncoder`
	- `log-in-console: false`
- These are just recommendations, adjust according to your needs, provided for reference only

## Redis

### yaml

```yaml
# redis configuration
redis:
  name: ''
  addr: '127.0.0.1:6379'
  password: ''
  db: 0
  use-cluster: false
  cluster-addrs: []
```

### struct

```go
type Redis struct {
	Name         string   `mapstructure:"name" json:"name" yaml:"name"`                         // Represents the name of the current instance
	Addr         string   `mapstructure:"addr" json:"addr" yaml:"addr"`                         // Server address:port
	Password     string   `mapstructure:"password" json:"password" yaml:"password"`             // Password
	DB           int      `mapstructure:"db" json:"db" yaml:"db"`                               // Which database in single instance mode redis
	UseCluster   bool     `mapstructure:"useCluster" json:"useCluster" yaml:"useCluster"`       // Whether to use cluster mode
	ClusterAddrs []string `mapstructure:"clusterAddrs" json:"clusterAddrs" yaml:"clusterAddrs"` // Node address list in cluster mode
}
```

### description

| Configuration Name | Type     | Description                        |
| ------------- | -------- | --------------------------- |
| name          | string   | Represents the name of the current instance          |
| addr          | string   | Redis connection address and port         |
| password      | string   | Password                        |
| db            | int      | Which database in redis           |
| use-cluster   | bool     | Whether to use cluster mode            |
| cluster-addrs | []string | Node address list in cluster mode    |

## Email

### yaml

```yaml
# email configuration
email:
  to: 'xxx@qq.com'
  port: 465
  from: 'xxx@163.com'
  host: 'smtp.163.com'
  is-ssl: true
  secret: 'xxx'
  nickname: 'test'
  is-loginauth: false
```

### struct

```go
type Email struct {
	To          string `mapstructure:"to" json:"to" yaml:"to"`                               // Recipients: multiple separated by English commas, e.g.: a@qq.com b@qq.com, in formal development please use this item as a parameter
	From        string `mapstructure:"from" json:"from" yaml:"from"`                         // Sender: your own email address for sending emails
	Host        string `mapstructure:"host" json:"host" yaml:"host"`                         // Server address, e.g. smtp.qq.com, please check the SMTP protocol from QQ or the email you want to send from
	Secret      string `mapstructure:"secret" json:"secret" yaml:"secret"`                   // Secret key for login, preferably not using email password, apply for a login secret key from email SMTP
	Nickname    string `mapstructure:"nickname" json:"nickname" yaml:"nickname"`             // Nickname: sender nickname, usually your own email
	Port        int    `mapstructure:"port" json:"port" yaml:"port"`                         // Port: please check the SMTP protocol from QQ or the email you want to send from, mostly 465
	IsSSL       bool   `mapstructure:"is-ssl" json:"is-ssl" yaml:"is-ssl"`                   // Whether SSL: whether to enable SSL
	IsLoginAuth bool   `mapstructure:"is-loginauth" json:"is-loginauth" yaml:"is-loginauth"` // Whether LoginAuth: whether to use LoginAuth authentication method (suitable for IBM, Microsoft email servers, etc.)
}
```

### description

| Configuration Name | Type   | Description                                                         |
| ------------ | ------ | ------------------------------------------------------------ |
| to           | string | Email recipients, can be multiple,<br />separated by English commas (,), preferably no spaces, if it's one email please don't add English comma (,) at the end |
| from         | string | Sender email address                                                   |
| host         | string | Main server address of the email                                           |
| secret       | string | Secret key for login, preferably not using email password                     |
| nickname     | string | Sender nickname                                                   |
| port         | int    | Email service port                                                 |
| is-ssl       | bool   | Whether to use SSL                                                  |
| is-loginauth | bool   | Whether to use LoginAuth authentication method (suitable for IBM, Microsoft email servers, etc.)     |

## Casbin

### yaml

```yaml
# casbin configuration
casbin:
  model-path: './resource/rbac_model.conf'
```

### struct

```go
type Casbin struct {
	ModelPath string `mapstructure:"model-path" json:"modelPath" yaml:"model-path"`
}
```

### description

| Configuration Name | Type   | Description                                                         | Recommended to Modify |
| ---------- | ------ | ------------------------------------------------------------ | ------------ |
| model-path | string | Relative path to store casbin model<br />Default value is `./resource/rbac_model.conf` | Not recommended   |

## System

### yaml

```yaml
# system configuration
system:
  env: 'public'
  db-type: 'mysql'
  oss-type: 'local'
  router-prefix: ''
  addr: 8888
  iplimit-count: 15000
  iplimit-time: 3600
  use-multipoint: false
  use-redis: false
  use-mongo: false
  use-strict-auth: false
```

### struct

```go
type System struct {
	Env           string `mapstructure:"env" json:"env" yaml:"env"`                                     // Environment value
	DbType        string `mapstructure:"db-type" json:"db-type" yaml:"db-type"`                         // Database type: mysql(default)|sqlite|sqlserver|postgresql
	OssType       string `mapstructure:"oss-type" json:"oss-type" yaml:"oss-type"`                     // OSS type
	RouterPrefix  string `mapstructure:"router-prefix" json:"router-prefix" yaml:"router-prefix"`       // Route prefix
	Addr          int    `mapstructure:"addr" json:"addr" yaml:"addr"`                                 // Port value
	LimitCountIP  int    `mapstructure:"iplimit-count" json:"iplimit-count" yaml:"iplimit-count"`       // Limit same IP access count
	LimitTimeIP   int    `mapstructure:"iplimit-time" json:"iplimit-time" yaml:"iplimit-time"`          // Limit time
	UseMultipoint bool   `mapstructure:"use-multipoint" json:"use-multipoint" yaml:"use-multipoint"`    // Multi-point login interception
	UseRedis      bool   `mapstructure:"use-redis" json:"use-redis" yaml:"use-redis"`                   // Use redis
	UseMongo      bool   `mapstructure:"use-mongo" json:"use-mongo" yaml:"use-mongo"`                   // Use mongo
	UseStrictAuth bool   `mapstructure:"use-strict-auth" json:"use-strict-auth" yaml:"use-strict-auth"` // Use tree role assignment mode
}
```

### description

| Configuration Name | Type   | Description                                                                                                                                   |
| ---------------- | ------ |--------------------------------------------------------------------------------------------------------------------------------------|
| env              | string | Environment mode, "develop" for development mode (skip authentication), "public" for production mode                                                                                      |
| addr             | int    | Backend service port, default 8888                                                                                                                        |
| db-type          | string | Database type, supports: mysql, pgsql, sqlite, mssql, oracle                                                                                            |
| oss-type         | string | Object storage type: local (local storage), qiniu (Qiniu Cloud), aliyun (Alibaba Cloud), minio<br />local: store to `local.path` directory<br />Other types need to configure corresponding parameters                                |
| router-prefix    | string | Route prefix, used for API route unified prefix                                                                                                                     |
| use-multipoint   | bool   | Whether to enable multi-point login interception (single sign-on), default false                                                                                                            |
| use-redis        | bool   | Whether to use Redis cache, default false                                                                                                                  |
| iplimit-count    | int    | IP rate limiting: maximum access count for same IP within specified time period, default 15000                                                                                                        |
| iplimit-time     | int    | IP rate limiting: limit time window (seconds), default 3600                                                                                                               |
| use-mongo        | bool   | Whether to use MongoDB database, default false                                                                                                              |
| use-strict-auth  | bool   | Whether to enable strict role mode (tree role assignment), default false                                                                                                         |

## captcha

### yaml

```yaml
# captcha configuration
captcha:
  key-long: 6
  img-width: 240
  img-height: 80
  open-captcha: 0
  open-captcha-timeout: 3600
```

### struct

```go
type Captcha struct {
	KeyLong            int `mapstructure:"key-long" json:"key-long" yaml:"key-long"`                                     // Captcha length
	ImgWidth           int `mapstructure:"img-width" json:"img-width" yaml:"img-width"`                                  // Captcha width
	ImgHeight          int `mapstructure:"img-height" json:"img-height" yaml:"img-height"`                               // Captcha height
	OpenCaptcha        int `mapstructure:"open-captcha" json:"open-captcha" yaml:"open-captcha"`                         // Anti-brute force captcha enable count, 0 means captcha required for every login, other numbers represent wrong password count, e.g. 3 means captcha appears after 3 wrong attempts
	OpenCaptchaTimeOut int `mapstructure:"open-captcha-timeout" json:"open-captcha-timeout" yaml:"open-captcha-timeout"` // Anti-brute force captcha timeout, unit: s(seconds)
}
```

### description

| Configuration Name | Type | Description                                                         |
| --------------------- | ---- | ------------------------------------------------------------ |
| key-long              | int  | Captcha length                                                   |
| img-width             | int  | Captcha width                                                   |
| img-height            | int  | Captcha height                                                   |
| open-captcha          | int  | Anti-brute force captcha enable count, 0 means captcha required for every login, other numbers represent wrong password count |
| open-captcha-timeout  | int  | Anti-brute force captcha timeout, unit: s(seconds)                            |

## Mysql [pgsql,sqlite,mssql,oracle]

### yaml

```yaml
# mysql connect configuration
mysql:
  path: ''
  port: ''
  config: ''
  db-name: ''
  username: ''
  password: ''
  prefix: ''
  singular: false
  engine: 'InnoDB'
  max-idle-conns: 10
  max-open-conns: 100
  log-mode: 'info'
  log-zap: false
```

### struct

```go
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

### description

| Configuration Name | Type   | Description                         |
| -------------- | ------ | ---------------------------- |
| path           | string | Database server address             |
| port           | string | Database port                   |
| username       | string | Database username                 |
| password       | string | Database password                   |
| db-name        | string | Database name                     |
| config         | string | Database connection advanced configuration           |
| prefix         | string | Table name prefix                     |
| singular       | bool   | Whether to use singular table names             |
| engine         | string | Database engine, default InnoDB       |
| max-idle-conns | int    | Set maximum number of idle connections       |
| max-open-conns | int    | Set maximum number of open connections to database |
| log-mode       | string | Enable Gorm global log level: "silent", "error", "warn", "info", default info |
| log-zap        | bool   | Whether to write logs to file through zap      |

### struct

```go
type Pgsql struct {
    GeneralDB `yaml:",inline" mapstructure:",squash"`
}

// GeneralDB struct definition see above Mysql section
```

### description

| Configuration Name | Type   | Description                         |
| -------------- | ------ | ---------------------------- |
| path           | string | Database server address             |
| port           | string | Database port                   |
| username       | string | Database username                 |
| password       | string | Database password                   |
| db-name        | string | Database name                     |
| config         | string | Database connection advanced configuration           |
| prefix         | string | Table name prefix                     |
| singular       | bool   | Whether to use singular table names             |
| engine         | string | Database engine, default InnoDB       |
| max-idle-conns | int    | Set maximum number of idle connections       |
| max-open-conns | int    | Set maximum number of open connections to database |
| log-mode       | string | Enable Gorm global log level: "silent", "error", "warn", "info", default info |
| log-zap        | bool   | Whether to write logs to file through zap      |

## Local

### yaml

```yaml
# local configuration
local:
  path: 'uploads/file'
  store-path: 'uploads/file'
```

### struct

```go
type Local struct {
	Path      string `mapstructure:"path" json:"path" yaml:"path"`                   // Local file access path
	StorePath string `mapstructure:"store-path" json:"store-path" yaml:"store-path"` // Local file storage path
}
```

### description

| Configuration Name | Type   | Description             |
| ---------- | ------ | ---------------- |
| path       | string | Local file access path |
| store-path | string | Local file storage path |

## Qiniu

### yaml

```yaml
# qiniu configuration (Please apply for corresponding public key, private key, bucket and domain address from Qiniu)
qiniu:
  zone: 'Your space region'
  bucket: 'Your space name'
  img-path: 'Your OSS domain'
  use-https: false
  access-key: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
  secret-key: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
  use-cdn-domains: false
```

### struct

```go
type Qiniu struct {
	Zone          string `mapstructure:"zone" json:"zone" yaml:"zone"`
	Bucket        string `mapstructure:"bucket" json:"bucket" yaml:"bucket"`
	ImgPath       string `mapstructure:"img-path" json:"imgPath" yaml:"img-path"`
	UseHTTPS      bool   `mapstructure:"use-https" json:"useHttps" yaml:"use-https"`
	AccessKey     string `mapstructure:"access-key" json:"accessKey" yaml:"access-key"`
	SecretKey     string `mapstructure:"secret-key" json:"secretKey" yaml:"secret-key"`
	UseCdnDomains bool   `mapstructure:"use-cdn-domains" json:"useCdnDomains" yaml:"use-cdn-domains"`
}
```

### description

| Configuration Name | Type   | Description                                                         |
| --------------- | ------ | ------------------------------------------------------------ |
| zone            | string | Storage region [Zone](https://github.com/qiniu/api.v7/blob/master/storage/zone.go), configurable options are `ZoneHuadong` / `ZoneHuabei` / `ZoneHuanan` / `ZoneBeimei` / `ZoneXinjiapo` |
| bucket          | string | Storage space                                                     |
| img-path        | string | CDN acceleration domain                                                 |
| use-https       | bool   | Whether to use https                                                |
| access-key      | string | Secret key AK                                                       |
| secret-key      | string | Secret key SK                                                       |
| use-cdn-domains | bool   | Whether to use CDN upload acceleration for uploads                                      |


## AutoCode

### yaml

```yaml
# autocode configuration
autocode:
  web: '/web/src'
  root: ''
  server: '/server'
  module: 'github.com/flipped-aurora/gin-vue-admin/server'
  ai-path: ''
```


### struct

```go
type Autocode struct {
	Web    string `mapstructure:"web" json:"web" yaml:"web"`
	Root   string `mapstructure:"root" json:"root" yaml:"root"`
	Server string `mapstructure:"server" json:"server" yaml:"server"`
	Module string `mapstructure:"module" json:"module" yaml:"module"`
	AiPath string `mapstructure:"ai-path" json:"ai-path" yaml:"ai-path"`
}
```

### description

| Configuration Name | Type   | Description                                                         |
| ------- | -------- | ------------------------------------------------------------ |
| web     | string | Frontend project path                                                 |
| root    | string | Project root directory, auto-adapted, please do not configure manually                         |
| server  | string | Server project path                                               |
| module  | string | Go module name                                                   |
| ai-path | string | AI related path                                                   |
