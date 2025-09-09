# Swagger API Documentation

Swagger is a powerful API documentation generation tool, Gin-Vue-Admin integrates Swagger to automatically generate and maintain API documentation. This guide will introduce how to install, configure and use Swagger.

## 📋 What is Swagger

Swagger is an open source software framework for designing, building, documenting and using RESTful Web services. It provides:

- 🔍 **Automatic API Documentation Generation**: Automatically generate documentation from code comments
- 🧪 **Online Testing**: Test APIs directly in the browser
- 📊 **Visual Interface**: Clear API structure display
- 🔄 **Real-time Updates**: Documentation automatically syncs when code changes

## 🛠️ Install Swagger

### Method 1: Direct Installation (Recommended)

If your network environment is good, you can install directly:

```bash
# Install the latest version of swag tool
go install github.com/swaggo/swag/cmd/swag@latest
```

### Method 2: Install with Proxy

If you encounter network issues, it's recommended to configure Go module proxy:

```bash
# Enable Go Modules
go env -w GO111MODULE=on

# Configure domestic proxy (choose one)
go env -w GOPROXY=https://goproxy.cn,direct
# or use
# go env -w GOPROXY=https://goproxy.io,direct

# Install swag tool
go install github.com/swaggo/swag/cmd/swag@latest
```

### Verify Installation

After installation, verify that the swag tool is correctly installed:

```bash
# Check swag version
swag --version

# View help information
swag --help
```

## 📝 Configure Swagger Comments

### 1. Main Program Comments

Add basic API information in the `main.go` file:

```go
// @title           Gin-Vue-Admin API
// @version         1.0
// @description     This is a sample server for Gin-Vue-Admin.
// @termsOfService  https://github.com/flipped-aurora/gin-vue-admin

// @contact.name   API Support
// @contact.url    https://github.com/flipped-aurora/gin-vue-admin/issues
// @contact.email  support@gin-vue-admin.com

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8888
// @BasePath  /

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name x-token

func main() {
    // Application code
}
```

### 2. API Interface Comments

Add detailed comments for each API interface:

```go
// CreateUser Create user
// @Tags      User Management
// @Summary   Create user
// @Description Create new user account
// @Security  ApiKeyAuth
// @accept    application/json
// @Produce   application/json
// @Param     data  body      request.CreateUserReq  true  "User information"
// @Success   200   {object}  response.Response{data=response.UserResponse}  "Created successfully"
// @Failure   400   {object}  response.Response  "Request parameter error"
// @Failure   500   {object}  response.Response  "Internal server error"
// @Router    /user [post]
func (u *UserApi) CreateUser(c *gin.Context) {
    // Interface implementation code
}
```

### 3. Data Model Comments

Add comments for data structures:

```go
// User User information
type User struct {
    ID       uint   `json:"id" example:"1"`                    // User ID
    Username string `json:"username" example:"admin"`          // Username
    Email    string `json:"email" example:"admin@example.com"` // Email
    Phone    string `json:"phone" example:"13800138000"`       // Phone number
    Status   int    `json:"status" example:"1"`                // Status: 1-enabled, 0-disabled
}
```

## 🔄 Generate API Documentation

### 1. Generate Documentation

Run in the project root directory (directory containing `main.go`):

```bash
# Generate Swagger documentation
swag init
```

### 2. Generation Success

After the command executes successfully, the following files will be generated in the project:

```
server/
├── docs/
│   ├── docs.go      # Documentation data
│   ├── swagger.json # JSON format documentation
│   └── swagger.yaml # YAML format documentation
└── main.go
```

### 3. Automated Generation

You can also add `go:generate` directive in `main.go` to automate documentation generation:

```go
//go:generate swag init

package main
```

Then use the `go generate` command:

```bash
go generate
```

## 🌐 Access Swagger Documentation

### 1. Start Service

Ensure the backend service is running:

```bash
go run main.go
```

### 2. Access Documentation

Access Swagger UI in your browser:

**Local Access**: `http://localhost:8888/swagger/index.html`

### 3. Documentation Features

Swagger UI provides the following features:

- 📖 **API List**: View all available API interfaces
- 🔍 **Interface Details**: View detailed information such as parameters and responses for each interface
- 🧪 **Online Testing**: Test API interfaces directly on the page
- 📥 **Download Documentation**: Download API documentation in JSON or YAML format

## 🎯 Usage Tips

### 1. Interface Grouping

Use `@Tags` comments to group interfaces:

```go
// @Tags User Management
// @Tags Permission Management
// @Tags System Settings
```

### 2. Parameter Validation

Combine `binding` tags for parameter validation:

```go
type CreateUserReq struct {
    Username string `json:"username" binding:"required" example:"admin"`     // Username (required)
    Password string `json:"password" binding:"required,min=6" example:"123456"` // Password (required, minimum 6 characters)
    Email    string `json:"email" binding:"email" example:"admin@example.com"` // Email (email format)
}
```

### 3. Response Examples

Provide detailed response examples:

```go
// @Success 200 {object} response.Response{data=[]model.User} "Retrieved successfully"
// @Success 200 {object} response.PageResult{list=[]model.User} "Paginated retrieval successful"
```

### 4. Error Handling

Define common error responses:

```go
// @Failure 400 {object} response.Response "Request parameter error"
// @Failure 401 {object} response.Response "Unauthorized"
// @Failure 403 {object} response.Response "Insufficient permissions"
// @Failure 404 {object} response.Response "Resource not found"
// @Failure 500 {object} response.Response "Internal server error"
```

## 🔧 Advanced Configuration

### 1. Custom Configuration

Create `.swaggo` configuration file:

```yaml
# .swaggo
dir: ./
general_info: main.go
output_dir: ./docs
parse_vendor: false
parse_dependency: false
parse_internal: false
generate_types: false
```

### 2. Exclude Specific Files

Use `--exclude` parameter to exclude files that don't need parsing:

```bash
swag init --exclude ./vendor
```

### 3. Specify Output Directory

```bash
swag init --output ./api-docs
```

## 🔗 Related Resources

### Official Documentation

- [Swag GitHub Repository](https://github.com/swaggo/swag)
- [Swag Chinese Documentation](https://github.com/swaggo/swag/blob/master/README_zh-CN.md)
- [Swagger Official Website](https://swagger.io/)

### Comment Standards

- [Swagger Comment Syntax](https://github.com/swaggo/swag#declarative-comments-format)
- [OpenAPI 3.0 Specification](https://swagger.io/specification/)

### Example Projects

- [Gin Swagger Example](https://github.com/swaggo/gin-swagger)
- [Gin-Vue-Admin API Documentation](https://demo.gin-vue-admin.com/swagger/index.html)

## 🚀 Best Practices

1. **Update Documentation Timely**: Regenerate documentation after every API modification
2. **Detailed Comments**: Provide clear descriptions and examples for each interface
3. **Unified Standards**: Unify comment format and naming conventions within the team
4. **Version Management**: Maintain corresponding documentation for different API versions
5. **Test Validation**: Use Swagger UI to test interfaces to ensure documentation accuracy
