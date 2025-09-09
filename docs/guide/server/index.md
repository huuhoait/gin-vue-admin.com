# Backend Knowledge Base

## Backend Directory Structure


> **server folder is a Golang backend project, requires Golang basics and Gin framework basics**

## Server Project Structure

```shell
├── api
│   └── v1
├── config
├── core
├── docs
├── global
├── initialize
│   └── internal
├── middleware
├── model
│   ├── request
│   └── response
├── packfile
├── resource
│   ├── excel
│   ├── page
│   └── template
├── router
├── service
├── source
└── utils
    ├── timer
    └── upload
```

| Folder       | Description                    | Details                        |
| ------------ | ----------------------- | --------------------------- |
| `api`        | API layer                   | API layer |
| `--v1`       | v1 version interfaces              | v1 version interfaces                  |
| `config`     | Configuration package                  | Configuration structs corresponding to config.yaml |
| `core`       | Core files                | Initialization of core components (zap, viper, server) |
| `docs`       | Swagger documentation directory         | Swagger documentation directory |
| `global`     | Global objects                | Global objects |
| `initialize` | Initialization | Initialization of router, redis, gorm, validator, timer |
| `--internal` | Internal initialization functions | Custom gorm logger, functions in this folder can only be called by `initialize` layer |
| `middleware` | Middleware layer | Used to store `gin` middleware code |
| `model`      | Model layer                  | Models corresponding to data tables              |
| `--request`  | Input parameter structs              | Receive data sent from frontend to backend.  |
| `--response` | Output parameter structs              | Data structs returned to frontend      |
| `packfile`   | Static file packaging            | Static file packaging |
| `resource`   | Static resource folder          | Responsible for storing static files                |
| `--excel` | Excel import/export default path | Excel import/export default path |
| `--page` | Form generator | Form generator packaged dist |
| `--template` | Template | Template folder, stores code generator templates |
| `router`     | Route layer                  | Route layer |
| `service`    | Service layer               | Stores business logic |
| `source` | Source layer | Stores initialization data functions |
| `utils`      | Utility package                  | Utility function encapsulation            |
| `--timer` | Timer | Timer interface encapsulation |
| `--upload`      | OSS                  | OSS interface encapsulation        |
