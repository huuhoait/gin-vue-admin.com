# MCP AI Assistant Integration

**Revolutionary AI development experience!** Through MCP (Model Context Protocol), AI editing tools can deeply understand the GVA project structure, achieving intelligent code generation and project management.

:::warning Version Requirements
Using MCP functionality requires GVA version **≥ 2.8.4**, please ensure your project version meets the requirements.
:::

Try to use claude > gemini > gpt = kimi models for better results

## ✨ Core Features

- 🚀 **Intelligent Code Generation**: AI automatically creates complete CRUD templates
- 🔍 **Intelligent File Search**: Automatically locate related files and provide precise modification suggestions  
- 🎯 **Automated Workflow**: One-click generation of API interfaces and menu configuration
- 🧠 **Context Understanding**: AI deeply understands project architecture, providing more accurate code linkage

## 🛠️ AI Editor Configuration

### Supported AI Editors
- Trae (try to use trae.ai international version)
- Cursor
- Claude Code
- Windsurf
- Codebubby
- Other AI editors that support MCP protocol

### Configuration Steps

#### Step 1: Start GVA Project
Ensure your GVA project is running, MCP service will automatically start at `http://127.0.0.1:8888/sse`

#### Step 2: Configure AI Editor
Add the following MCP configuration in your AI editor's configuration file:

```json
{
  "mcpServers": {
    "GVA Helper": {
      "url": "http://127.0.0.1:8888/sse"
    }
  }
}
```

<img src="/mcp/ai-config-demo.svg" alt="AI编辑器MCP配置示例" style="width: 100%; max-width: 800px; margin: 20px 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"/>

#### 第三步：重启编辑器
保存配置后重启你的AI编辑工具，等待MCP连接建立，MCP状态显示绿色即表示连接成功

### 🚀 AI助手新能力

配置完成后，AI助手将获得以下超能力：

- 🧠 **深度理解项目**：自动识别GVA项目结构和代码模式
- 🎯 **智能代码生成**：根据需求自动生成完整的功能模块
- 🔍 **精准文件定位**：快速找到相关文件并提供修改建议
- 📱 **全栈开发**：同时处理前端、后端、数据库的代码生成
- 🎨 **UI自动化**：自动配置路由、菜单和权限系统

### 使用示例

只需要告诉AI："我想创建一个用户管理模块"，AI就会：
- 📋 自动生成用户表结构
- 🔧 创建完整的CRUD API
- 🎨 生成前端管理页面
- 📱 配置菜单和路由
- 🔐 设置权限控制

## 🎓 开发者培训资源

## 授权用户内部培训文档【公开】

[MCP内部培训文档](https://flipped-aurora.feishu.cn/docx/DWvvdLVfvoZajJxwDR1cDThhnAh?from=from_copylink)

## 视频教程

[点击观看](https://www.bilibili.com/video/BV1cNJgzbEHT)

## 配置文件说明

```yaml
mcp:
    name: GVA_MCP  # MCP服务名称
    version: v1.0.0 # 版本号
    sse_path: /sse # SSE路径
    message_path: /message # 消息路径
    url_prefix: '' # URL前缀
```

## 自动填写页面参数示例

<img src="/mcp/image.png"/>

点击生成后后端会获得MCP模板

在模板的handle函数中书写业务逻辑即可实现一个简单的mcp工具

<img src="/mcp/image2.png"/>

## 调试工具展示

<img src="/mcp/image3.png"/>

<img src="/mcp/image4.png"/>

<img src="/mcp/image5.png"/>
