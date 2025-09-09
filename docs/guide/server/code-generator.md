# 🚀 Code Generator

Gin-Vue-Admin provides a powerful code generator that supports automatically generating complete CRUD code based on database table structure, including backend APIs, frontend pages, route configuration, etc., greatly improving development efficiency.

## 🎯 Feature Overview

### Generated Content

- **Backend Code**: Model, Service, API, Router
- **Frontend Code**: Vue pages, API interfaces, route configuration
- **Database**: Auto table creation, field validation
- **Permission Configuration**: API permissions, menu permissions

### Supported Features

- 🔄 **CRUD Operations**: Complete CRUD operations
- 🔍 **Conditional Queries**: Support multi-field condition filtering
- 📄 **Pagination Queries**: Automatic pagination processing
- 📁 **File Upload**: Support file field processing
- 🔗 **Join Queries**: Support table join operations
- 🎨 **Custom Templates**: Customizable code templates

## 🛠️ Usage Methods

### 1. Web Interface Generation

Access System Management → Code Generator, configure through visual interface:

```
System Tools → Code Generator → Add New
```

#### Configuration Steps

1. **Basic Information Configuration**
   - Table name
   - Table description
   - Struct name
   - Package name
   - File name

2. **Field Configuration**
   - Field name
   - Field type
   - Database type
   - Field description
   - Required or not
   - Query conditions
   - Dictionary type

3. **Generation Options**
   - Generation module
   - Generation path
   - Whether to overwrite

### 2. Command Line Generation

```bash
# Enter project directory
cd server

# Run code generator
go run main.go -c=config.yaml -gva=gen
```

### 3. API Interface Generation

```bash
# Use curl to call generation interface
curl -X POST "http://localhost:8888/autoCode/createTemp" \
  -H "Content-Type: application/json" \
  -d '{
    "structName": "User",
    "tableName": "sys_users",
    "packageName": "system",
    "fields": [
      {
        "fieldName": "Name",
        "fieldDesc": "Username",
        "fieldType": "string",
        "dataType": "varchar(255)",
        "fieldJson": "name",
        "require": true,
        "errorText": "Please enter username"
      }
    ]
  }'
```

## 📋 Configuration Details

### Basic Configuration Structure

```go
type AutoCodeStruct struct {
    StructName         string                 `json:"structName"`         // Struct name
    TableName          string                 `json:"tableName"`          // Table name
    PackageName        string                 `json:"packageName"`        // Package name
    HumpPackageName    string                 `json:"humpPackageName"`    // Camel case package name
    Abbreviation       string                 `json:"abbreviation"`       // Abbreviation
    Description        string                 `json:"description"`        // Description
    AutoCreateApiToSql bool                   `json:"autoCreateApiToSql"` // Automatically create API
    AutoCreateResource bool                   `json:"autoCreateResource"` // Automatically create resources
    AutoMoveFile       bool                   `json:"autoMoveFile"`       // Automatically move files
    Fields             []Field                `json:"fields"`             // Field list
    DictTypes          []string               `json:"dictTypes"`          // Dictionary types
    Package            string                 `json:"package"`            // Full package path
    PackageT           string                 `json:"packageT"`           // Template package path
    NeedValid          bool                   `json:"needValid"`          // Validation required
    HasTimer           bool                   `json:"hasTimer"`           // Includes time fields
    NeedSort           bool                   `json:"needSort"`           // Sorting required
    HasSearchTimer     bool                   `json:"hasSearchTimer"`     // Includes search time
    HasFile            bool                   `json:"hasFile"`            // Includes file fields
    HasDataSource      bool                   `json:"hasDataSource"`      // Includes data source
    HasRichText        bool                   `json:"hasRichText"`        // Includes rich text
    HasPic             bool                   `json:"hasPic"`             // Includes pictures
    LogicDelete        bool                   `json:"logicDelete"`        // Logical deletion
    MenuID             string                 `json:"menuID"`             // Menu ID
}
```

### Field Configuration Structure

```go
type Field struct {
    FieldName       string `json:"fieldName"`       // Field name
    FieldDesc       string `json:"fieldDesc"`       // Field description
    FieldType       string `json:"fieldType"`       // Go field type
    FieldJson       string `json:"fieldJson"`       // JSON tag
    DataType        string `json:"dataType"`        // Database field type
    ColumnName      string `json:"columnName"`      // Database column name
    Comment         string `json:"comment"`         // Comment
    Require         bool   `json:"require"`         // Required
    ErrorText       string `json:"errorText"`       // Error message
    Clearable       bool   `json:"clearable"`       // Clearable
    Sort            bool   `json:"sort"`            // Sort field
    PrimaryKey      bool   `json:"primaryKey"`      // Primary key
    DefaultValue    string `json:"defaultValue"`    // Default value
    DictType        string `json:"dictType"`        // Dictionary type
    Front           bool   `json:"front"`           // Frontend display
    Desc            bool   `json:"desc"`            // Descending order
    SearchType      string `json:"searchType"`      // Search type
    FieldSearchType string `json:"fieldSearchType"` // Field search type
    FieldSearchHide bool   `json:"fieldSearchHide"` // Hide search
    FieldIndexType  string `json:"fieldIndexType"`  // Index type
    CheckDataSource bool   `json:"checkDataSource"` // Check data source
    DataSource      struct {
        Association int    `json:"association"` // Association type
        Table       string `json:"table"`       // Associated table
        Label       string `json:"label"`       // Display field
        Value       string `json:"value"`       // Value field
    } `json:"dataSource"` // Data source configuration
}
```

## 🎨 Template System

### Template Directory Structure

```
server/resource/template/
├── web/
│   ├── api.js.tpl           # Frontend API template
│   ├── form.vue.tpl         # Form page template
│   ├── table.vue.tpl        # List page template
│   └── ...
└── server/
    ├── api.go.tpl           # Backend API template
    ├── model.go.tpl         # Model template
    ├── request.go.tpl       # Request structure template
    ├── router.go.tpl        # Router template
    ├── service.go.tpl       # Service template
    └── ...
```

### Custom Templates

#### Backend Template Example

```go
// model.go.tpl
package {{.PackageName}}

import (
    "github.com/flipped-aurora/gin-vue-admin/server/global"
    {{- if .HasTimer}}
    "time"
    {{- end}}
)

// {{.StructName}}  structure  {{.Description}}
type {{.StructName}} struct {
    global.GVA_MODEL {{- range .Fields}}
    {{- if .PrimaryKey}}
    {{.FieldName}} {{.FieldType}} `json:"{{.FieldJson}}" form:"{{.FieldJson}}" gorm:"primarykey{{- if .Comment}};comment:{{.Comment}}{{- end}}"`
    {{- else}}
    {{.FieldName}} {{.FieldType}} `json:"{{.FieldJson}}" form:"{{.FieldJson}}" gorm:"{{- if .ColumnName}}column:{{.ColumnName}};{{- end}}{{- if .Comment}}comment:{{.Comment}};{{- end}}{{- if .DataType}}type:{{.DataType}};{{- end}}{{- if .DefaultValue}}default:{{.DefaultValue}};{{- end}}"`
    {{- end}}{{- end}}
}

// TableName {{.StructName}} table name
func ({{.StructName}}) TableName() string {
    return "{{.TableName}}"
}
```

#### Frontend Template Example

```vue
<!-- table.vue.tpl -->
<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" class="demo-form-inline" :rules="searchRule" @keyup.enter="onSubmit">
        {{- range .Fields}}
        {{- if .FieldSearchType}}
        <el-form-item label="{{.FieldDesc}}" prop="{{.FieldJson}}">
          {{- if eq .FieldSearchType "LIKE" }}
          <el-input v-model="searchInfo.{{.FieldJson}}" placeholder="Search condition" />
          {{- else if eq .FieldSearchType "BETWEEN" }}
          <template v-if="searchInfo.{{.FieldJson}} && searchInfo.{{.FieldJson}}.length === 2">
            <el-date-picker
              v-model="searchInfo.{{.FieldJson}}"
              type="datetimerange"
              range-separator="to"
              start-placeholder="Start date"
              end-placeholder="End date"
            />
          </template>
          {{- end}}
        </el-form-item>
        {{- end}}
        {{- end}}
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">Search</el-button>
          <el-button icon="refresh" @click="onReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog">Add</el-button>
        <el-button icon="delete" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="onDelete">Delete</el-button>
      </div>
      <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        {{- range .Fields}}
        {{- if .Front}}
        <el-table-column align="left" label="{{.FieldDesc}}" prop="{{.FieldJson}}" width="120" />
        {{- end}}
        {{- end}}
        <el-table-column align="left" label="Actions">
          <template #default="scope">
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)"><icon name="edit" />Edit</el-button>
            <el-button type="primary" link class="table-button" @click="deleteRow(scope.row)"><icon name="delete" />Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>
```

## 🔧 Core Code of the Generator

### Code Generation Service

```go
type AutoCodeService struct{}

// CreateTemp creates code
func (autoCodeService *AutoCodeService) CreateTemp(autoCode system.AutoCodeStruct, ids ...uint) (err error) {
    // 1. Create base directory
    basePath := "autocode_template/"
    if autoCode.AutoMoveFile {
        basePath = ""
    }
    
    // 2. Generate backend code
    for _, value := range autoCode.Fields {
        if value.FieldType == "time.Time" {
            autoCode.HasTimer = true
        }
        if value.FieldSearchType != "" {
            autoCode.NeedSort = true
        }
        if value.DictType != "" {
            autoCode.DictTypes = append(autoCode.DictTypes, value.DictType)
        }
    }
    
    // 3. Parse templates and generate files
    templates := []string{
        "server/api.go.tpl",
        "server/model.go.tpl", 
        "server/request.go.tpl",
        "server/router.go.tpl",
        "server/service.go.tpl",
        "web/api.js.tpl",
        "web/table.vue.tpl",
        "web/form.vue.tpl",
    }
    
    for _, tmpl := range templates {
        if err = autoCodeService.generateFile(tmpl, autoCode, basePath); err != nil {
            return err
        }
    }
    
    // 4. Automatically inject routes and APIs
    if autoCode.AutoCreateApiToSql {
        if err = autoCodeService.AutoCreateApi(&autoCode); err != nil {
            return err
        }
    }
    
    return nil
}

// generateFile generates a single file
func (autoCodeService *AutoCodeService) generateFile(templatePath string, data system.AutoCodeStruct, basePath string) error {
    // Read template file
    templateContent, err := ioutil.ReadFile("resource/template/" + templatePath)
    if err != nil {
        return err
    }
    
    // Parse template
    tmpl, err := template.New("autocode").Parse(string(templateContent))
    if err != nil {
        return err
    }
    
    // Generate target file path
    outputPath := autoCodeService.getOutputPath(templatePath, data, basePath)
    
    // Create directory
    if err = os.MkdirAll(filepath.Dir(outputPath), 0755); err != nil {
        return err
    }
    
    // Generate file
    file, err := os.Create(outputPath)
    if err != nil {
        return err
    }
    defer file.Close()
    
    // Execute template
    return tmpl.Execute(file, data)
}
```

### Automatic Injection Feature

```go
// AutoCreateApi automatically creates API
func (autoCodeService *AutoCodeService) AutoCreateApi(autoCode *system.AutoCodeStruct) error {
    apis := []system.SysApi{
        {
            Path:        "/" + autoCode.Abbreviation + "/create" + autoCode.StructName,
            Description: "Add " + autoCode.Description,
            ApiGroup:    autoCode.Description,
            Method:      "POST",
        },
        {
            Path:        "/" + autoCode.Abbreviation + "/delete" + autoCode.StructName,
            Description: "Delete " + autoCode.Description,
            ApiGroup:    autoCode.Description,
            Method:      "DELETE",
        },
        {
            Path:        "/" + autoCode.Abbreviation + "/delete" + autoCode.StructName + "ByIds",
            Description: "Batch delete " + autoCode.Description,
            ApiGroup:    autoCode.Description,
            Method:      "DELETE",
        },
        {
            Path:        "/" + autoCode.Abbreviation + "/update" + autoCode.StructName,
            Description: "Update " + autoCode.Description,
            ApiGroup:    autoCode.Description,
            Method:      "PUT",
        },
        {
            Path:        "/" + autoCode.Abbreviation + "/find" + autoCode.StructName,
            Description: "Get " + autoCode.Description + " by ID",
            ApiGroup:    autoCode.Description,
            Method:      "GET",
        },
        {
            Path:        "/" + autoCode.Abbreviation + "/get" + autoCode.StructName + "List",
            Description: "Get " + autoCode.Description + " list",
            ApiGroup:    autoCode.Description,
            Method:      "GET",
        },
    }
    
    for _, api := range apis {
        if err := apiService.CreateApi(api); err != nil {
            return err
        }
    }
    
    return nil
}

// AutoCreateMenu automatically creates menu
func (autoCodeService *AutoCodeService) AutoCreateMenu(autoCode *system.AutoCodeStruct) error {
    menu := system.SysBaseMenu{
        ParentId:  "0",
        Path:      autoCode.Abbreviation,
        Name:      autoCode.StructName,
        Component: "view/" + autoCode.PackageName + "/" + autoCode.PackageName + ".vue",
        Sort:      999,
        Meta: system.Meta{
            Title: autoCode.Description,
            Icon:  "setting",
        },
    }
    
    return menuService.AddBaseMenu(menu)
}
```

## 🎯 Advanced Features

### 1. Associated Table Generation

```go
// One-to-many association configuration
type Association struct {
    Type        string `json:"type"`        // Association type: hasOne, hasMany, belongsTo
    ForeignKey  string `json:"foreignKey"`  // Foreign key
    References  string `json:"references"`  // Referenced field
    Table       string `json:"table"`       // Associated table
    StructName  string `json:"structName"`  // Associated structure
}

// Generate association query code
func generateAssociationCode(associations []Association) string {
    var code strings.Builder
    
    for _, assoc := range associations {
        switch assoc.Type {
        case "hasMany":
            code.WriteString(fmt.Sprintf(
                "db.Preload(\"%s\").Find(&result)\n",
                assoc.StructName,
            ))
        case "belongsTo":
            code.WriteString(fmt.Sprintf(
                "db.Preload(\"%s\").Find(&result)\n",
                assoc.StructName,
            ))
        }
    }
    
    return code.String()
}
```

### 2. Dictionary Type Support

```go
// Dictionary field processing
func processDictField(field Field) string {
    if field.DictType != "" {
        return fmt.Sprintf(`
        <el-select v-model="formData.%s" placeholder="Please select %s">
          <el-option
            v-for="item in %sOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>`,
            field.FieldJson,
            field.FieldDesc,
            field.DictType,
        )
    }
    return fmt.Sprintf(`<el-input v-model="formData.%s" placeholder="Please enter %s" />`,
        field.FieldJson, field.FieldDesc)
}
```

### 3. File Upload Field

```go
// File upload field template
const fileUploadTemplate = `
<el-upload
  class="upload-demo"
  :action="path"
  :headers="{ 'x-token': userStore.token }"
  :on-success="handleFileSuccess"
  :before-upload="beforeFileUpload"
>
  <el-button type="primary">Click to upload</el-button>
  <template #tip>
    <div class="el-upload__tip">Only jpg/png files can be uploaded, and the size should not exceed 500kb</div>
  </template>
</el-upload>
`

// Generate file upload handling functions
func generateFileUploadMethods(fields []Field) string {
    var methods strings.Builder
    
    for _, field := range fields {
        if field.FieldType == "file" {
            methods.WriteString(fmt.Sprintf(`
// %s file upload success callback
const handle%sSuccess = (response) => {
  formData.value.%s = response.data.file.url
}

// %s file upload pre-check
const before%sUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2
  
  if (!isJPG) {
    ElMessage.error('Uploaded avatar image can only be in JPG/PNG format!')
  }
  if (!isLt2M) {
    ElMessage.error('Uploaded avatar image size cannot exceed 2MB!')
  }
  return isJPG && isLt2M
}`,
                strings.Title(field.FieldJson),
                field.FieldJson,
                field.FieldDesc,
                strings.Title(field.FieldJson),
            ))
        }
    }
    
    return methods.String()
}
```

## 📊 Generation Statistics

### Code Generation Records

```go
type AutoCodeHistory struct {
    ID            uint      `json:"ID" gorm:"primarykey"`
    CreatedAt     time.Time `json:"CreatedAt"`
    UpdatedAt     time.Time `json:"UpdatedAt"`
    StructName    string    `json:"structName" gorm:"comment:Structure name"`
    TableName     string    `json:"tableName" gorm:"comment:Table name"`
    RequestMeta   string    `json:"requestMeta" gorm:"type:text;comment:Request meta information"`
    AutoCodePath  string    `json:"autoCodePath" gorm:"comment:Automatically generated code path"`
    InjectionMeta string    `json:"injectionMeta" gorm:"type:text;comment:Injection meta information"`
    ApiIDs        string    `json:"apiIDs" gorm:"comment:API table registration content"`
    Flag          int       `json:"flag" gorm:"comment:Indicates the corresponding status 0 represents creation, 1 represents rollback ...."`
}

// Record generation history
func (autoCodeService *AutoCodeService) CreateAutoCodeHistory(meta, path, injectionMeta, apiIDs string, autoCode system.AutoCodeStruct) error {
    return global.GVA_DB.Create(&system.SysAutoCodeHistory{
        RequestMeta:   meta,
        AutoCodePath:  path,
        InjectionMeta: injectionMeta,
        StructName:    autoCode.StructName,
        TableName:     autoCode.TableName,
        ApiIDs:        apiIDs,
        Flag:          0,
    }).Error
}
```

## 🔄 Code Rollback

```go
// RollBack rollback automatically generated code
func (autoCodeService *AutoCodeService) RollBack(id uint) error {
    var history system.SysAutoCodeHistory
    if err := global.GVA_DB.First(&history, id).Error; err != nil {
        return err
    }
    
    // Delete generated files
    var meta system.AutoCodeStruct
    if err := json.Unmarshal([]byte(history.RequestMeta), &meta); err != nil {
        return err
    }
    
    // Delete backend files
    serverFiles := []string{
        fmt.Sprintf("app/%s/model/%s.go", meta.PackageName, meta.PackageName),
        fmt.Sprintf("app/%s/request/%s.go", meta.PackageName, meta.PackageName),
        fmt.Sprintf("app/%s/service/%s.go", meta.PackageName, meta.PackageName),
        fmt.Sprintf("app/%s/api/%s.go", meta.PackageName, meta.PackageName),
        fmt.Sprintf("app/%s/router/%s.go", meta.PackageName, meta.PackageName),
    }
    
    for _, file := range serverFiles {
        if err := os.Remove(file); err != nil && !os.IsNotExist(err) {
            return err
        }
    }
    
    // Delete frontend files
    webFiles := []string{
        fmt.Sprintf("../web/src/api/%s.js", meta.PackageName),
        fmt.Sprintf("../web/src/view/%s/%s.vue", meta.PackageName, meta.PackageName),
        fmt.Sprintf("../web/src/view/%s/%sForm.vue", meta.PackageName, meta.PackageName),
    }
    
    for _, file := range webFiles {
        if err := os.Remove(file); err != nil && !os.IsNotExist(err) {
            return err
        }
    }
    
    // Delete API records
    var apiIDs []uint
    if err := json.Unmarshal([]byte(history.ApiIDs), &apiIDs); err == nil {
        global.GVA_DB.Delete(&system.SysApi{}, apiIDs)
    }
    
    // Update history record status
    return global.GVA_DB.Model(&history).Update("flag", 1).Error
}
```

## 🎨 Frontend Integration

### Code Generator Page

```vue
<template>
  <div class="auto-code">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>Code Generator</span>
        </div>
      </template>
      
      <el-form ref="autoCodeForm" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="Structure Name" prop="structName">
          <el-input v-model="form.structName" placeholder="Please enter structure name" />
        </el-form-item>
        
        <el-form-item label="Table Name" prop="tableName">
          <el-input v-model="form.tableName" placeholder="Please enter table name" />
        </el-form-item>
        
        <el-form-item label="Package Name" prop="packageName">
          <el-input v-model="form.packageName" placeholder="Please enter package name" />
        </el-form-item>
        
        <el-form-item label="Structure Description" prop="description">
          <el-input v-model="form.description" placeholder="Please enter structure description" />
        </el-form-item>
        
        <!-- Field configuration -->
        <el-form-item label="Field Configuration">
          <el-table :data="form.fields" border>
            <el-table-column label="Field Name" prop="fieldName" />
            <el-table-column label="Field Description" prop="fieldDesc" />
            <el-table-column label="Field Type" prop="fieldType" />
            <el-table-column label="Database Type" prop="dataType" />
            <el-table-column label="Actions">
              <template #default="scope">
                <el-button @click="editField(scope.$index)">Edit</el-button>
                <el-button @click="deleteField(scope.$index)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <el-button @click="addField" style="margin-top: 10px;">Add Field</el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="generateCode">Generate Code</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { createTemp } from '@/api/autoCode'
import { ElMessage } from 'element-plus'

const form = reactive({
  structName: '',
  tableName: '',
  packageName: '',
  description: '',
  fields: []
})

const rules = {
  structName: [{ required: true, message: 'Please enter structure name', trigger: 'blur' }],
  tableName: [{ required: true, message: 'Please enter table name', trigger: 'blur' }],
  packageName: [{ required: true, message: 'Please enter package name', trigger: 'blur' }]
}

const generateCode = async () => {
  try {
    const res = await createTemp(form)
    if (res.code === 0) {
      ElMessage.success('Code generated successfully')
    }
  } catch (error) {
    ElMessage.error('Code generation failed')
  }
}
</script>
```

## 🐛 Frequently Asked Questions

### Q: The generated code fails to compile?
A: Check if the field type configuration is correct, ensuring that the Go type and database type match.

### Q: The frontend page displays abnormally?
A: Check the frontend display configuration of the fields, ensuring that the necessary fields are set to be displayed on the frontend.

### Q: How to customize the generation template?
A: Modify the template files in the `server/resource/template/` directory and restart the service to take effect.

### Q: How to add custom logic after generation?
A: Add custom methods on top of the generated code, avoiding direct modification of the core CRUD methods that are generated.