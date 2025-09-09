# Export Template
<br/>
<img src="/web/export-excel.png"/>

## Terminology

- Business Database: Note: Need to configure multiple databases in db-list in advance. If not configured, need to configure and restart the service before use. If unable to select, please set disabled:false in config.yaml and select the target database for import/export.
- Template Name: Chinese mark of the template, mainly used for user memory.
- Table Name: The table that needs to export data, just enter the table name.
- Template ID: Unique identifier of the template, used to distinguish different templates. Passed as `templateId` parameter when using export component.
- Join Conditions: Multiple joins can be added here, parameters to select and write are: join method [inner, left, right], join table, join condition.
- Template Information: Receives a json string here to configure the exported table headers, format as follows:

```json
    {
        "table_column": "exported_chinese_name_column",
    }
```

Example (xxx.xxx indicates json mode)

```json
    {
        "id": "ID",
        "name": "Name",
        "age": "Age",
        "info.id": "User Info Group ID"
    }
```
- Default Export Count: Default number of exported records, if not filled defaults to full export, actual use is subject to ExportExcel's limit parameter.
- Default Sort Condition: Default sort condition, if not filled defaults to no sorting, actual use is subject to ExportExcel's order parameter.
- Export Conditions: Multiple conditions can be added here, each needs to fill in: `key in json`, `corresponding table column`, `condition`.


## Component Usage

Then add the following components in the `<script>` tag of the page you need to export

```javascript
// Export component
import ExportExcel from '@/components/exportExcel/exportExcel.vue'
// Import component
import ImportExcel from '@/components/exportExcel/importExcel.vue'
// Export template component
import ExportTemplate from '@/components/exportExcel/exportTemplate.vue'

```

Then use it in `<template>`

```html

<!-- 导出组件-->
<ExportExcel templateId="api" :condition="你的查询条件对象" :limit="10" :offset="10" order="id desc"/>

<!-- 导入组件 handleSuccess为导入成功后的回调函数-->
<ImportExcel templateId="api" @on-success="handleSuccess"/>

<!-- 导出模板-->
<ExportTemplate templateId="api" />

```

### 入参解释
```javascript
    condition: {  // 可以传入查询条件 根据模板中配置的查询条件映射关系进行有条件导出
        type: Object,
        default: () => ({})
    }
    limit: {   // 可以限制条目 根据模板中可以配置默认的条目限制 此处入参的优先级高于模板中的配置
        type: Number,
        default: 0
    }
    offset: {  // 可以限制偏移量 根据模板中可以配置默认的偏移量 此处入参的优先级高于模板中的配置
        type: Number,
        default: 0
    }
    order: {  // 可以限制排序 根据模板中可以配置默认的排序 此处入参的优先级高于模板中的配置 
        type: String,
        default: ''
    }
    onSuccess: { // 导入成功后的回调函数
        type: Function,
        default: () => {}
    }
```


此标签会产生一个按钮，点击即可导出对应表，后续会更新导出条件，敬请期待。
