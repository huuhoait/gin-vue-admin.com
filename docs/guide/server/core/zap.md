# zap

## Extended route logging middleware based on zap

> Add file, code source from [Li Wenzhou](https://www.liwenzhou.com/posts/Go/use_zap_in_gin/)

Create a new `logger.go` file in the `server/middleware` directory, copy and paste the following code into the `logger.go` file

```go
package middleware

import (
	"gin-vue-admin/global"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"time"
)

// ZapLogger receives gin framework route logs
func ZapLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		query := c.Request.URL.RawQuery
		c.Next()

		cost := time.Since(start)
		global.GVA_LOG.Info(path,
			zap.Int("status", c.Writer.Status()),
			zap.String("method", c.Request.Method),
			zap.String("path", path),
			zap.String("query", query),
			zap.String("ip", c.ClientIP()),
			zap.String("user-agent", c.Request.UserAgent()),
			zap.String("errors", c.Errors.ByType(gin.ErrorTypePrivate).String()),
			zap.Duration("cost", cost),
		)
	}
}
```

> Using ZapLogger() middleware

```go
var Router = gin.Default()
// Replace the above code with
var Router = gin.New()
Router.Use(middleware.ZapLogger(), gin.Recovery())
```

- In `server/initialize/router.go` file

- Must register `ZapLogger` middleware **as global middleware**, otherwise it won't take effect

- `gin.Recovery()` and `Logger()` are the global middleware used by default in Gin framework's `gin.Default()`

	- ```go
		// This code is from Gin framework source
		// Default returns an Engine instance with the Logger and Recovery middleware already attached.
		func Default() *Engine {
			debugPrintWARNINGDefault()
			engine := New()
			engine.Use(Logger(), Recovery())
			return engine
		}
		```

## Zap-based Recovery middleware for catching panic exceptions

> Add file, code source from [Li Wenzhou](https://www.liwenzhou.com/posts/Go/use_zap_in_gin/)

Create a new `logger.go` file in `server/middleware` directory, copy and paste the following code into the `logger.go` file

```go
package middleware

import (
	"gin-vue-admin/global"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"net"
	"net/http"
	"net/http/httputil"
	"os"
	"runtime/debug"
	"strings"
)

// ZapRecovery recover from possible panics in the project and use zap to record related logs
func ZapRecovery(stack bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				// Check for a broken connection, as it is not really a
				// condition that warrants a panic stack trace.
				var brokenPipe bool
				if ne, ok := err.(*net.OpError); ok {
					if se, ok := ne.Err.(*os.SyscallError); ok {
						if strings.Contains(strings.ToLower(se.Error()), "broken pipe") || strings.Contains(strings.ToLower(se.Error()), "connection reset by peer") {
							brokenPipe = true
						}
					}
				}

				httpRequest, _ := httputil.DumpRequest(c.Request, false)
				if brokenPipe {
					global.GVA_LOG.Error(c.Request.URL.Path,
						zap.Any("error", err),
						zap.String("request", string(httpRequest)),
					)
					// If the connection is dead, we can't write a status to it.
					_ = c.Error(err.(error)) // nolint: errcheck
					c.Abort()
					return
				}

				if stack {
					global.GVA_LOG.Error("[Recovery from panic]",
						zap.Any("error", err),
						zap.String("request", string(httpRequest)),
						zap.String("stack", string(debug.Stack())),
					)
				} else {
					global.GVA_LOG.Error("[Recovery from panic]",
						zap.Any("error", err),
						zap.String("request", string(httpRequest)),
					)
				}
				c.AbortWithStatus(http.StatusInternalServerError)
			}
		}()
		c.Next()
	}
}
```

- [v2.3.0](https://github.com/flipped-aurora/gin-vue-admin/releases/tag/v2.3.0) and above versions do not need to add this file code

> Using ZapRecovery() middleware

```go
var Router = gin.Default()
// Replace the above code with
var Router = gin.New()
Router.Use(middleware.ZapLogger(), middleware.ZapRecovery())

// V2.3.0 version please use the following code
var Router = gin.Default()
// Replace the above code with
var Router = gin.New()
Router.Use(middleware.ZapLogger(), middleware.GinRecovery())
```



> Zap Logging Library Usage Guide & Configuration Guide

The configuration for the Zap logging library is located in `config.yaml` (./server/config.yaml) under the `zap` section.

```yaml
# zap logger configuration
zap:
  level: 'debug'
  format: 'console'
  prefix: '[GIN-VUE-ADMIN]'
  director: 'log'
  link_name: 'latest_log'
  show_line: true
  encode_level: 'LowercaseColorLevelEncoder'
  stacktrace_key: 'stacktrace'
  log_in_console: true
```

| Configuration Name | Type       | Description                                                                 |
|--------------------|------------|-----------------------------------------------------------------------------|
| level              | string     | Logging level. For detailed explanation, see [Zap official documentation](https://pkg.go.dev/go.uber.org/zap?tab=doc#pkg-constants).<br>info: Info level, no error stack trace, only outputs information.<br>debug: Debug level, includes detailed error stack trace.<br>warn: Warning level.<br>error: Error level, includes detailed error stack trace.<br>dpanic: DPanic level.<br>panic: Panic level.<br>fatal: Fatal level. |
| format             | string     | `console`: Outputs logs in console format.<br>`json`: Outputs logs in JSON format. |
| prefix             | string     | Log prefix.                                                                 |
| director           | string     | Directory to store log files. Modify as needed; no manual creation required. |
| link_name          | string     | A [symbolic link file](https://en.wikipedia.org/wiki/Symbolic_link) named as specified, linking to the latest log file in the `director` directory. |
| show_line          | bool       | Whether to display line numbers. Default is `true`. Not recommended to change. |
| encode_level       | string     | `LowercaseLevelEncoder`: Lowercase.<br>`LowercaseColorLevelEncoder`: Lowercase with color.<br>`CapitalLevelEncoder`: Uppercase.<br>`CapitalColorLevelEncoder`: Uppercase with color. |
| stacktrace_key     | string     | Key name for stack trace in JSON log output.                                |
| log_in_console     | bool       | Whether to output logs to the console. Default is `true`.                   |

- **Development or Debugging Environment Configuration Suggestions**
  - `level: debug`
  - `format: console`
  - `encode_level: LowercaseColorLevelEncoder` or `encode_level: CapitalColorLevelEncoder`
- **Production Environment Configuration Suggestions**
  - `level: error`
  - `format: json`
  - `encode_level: LowercaseLevelEncoder` or `encode_level: CapitalLevelEncoder`
  - `log_in_console: false`
- These are only suggestions. Adjust according to your needs. The recommendations are for reference only.











































