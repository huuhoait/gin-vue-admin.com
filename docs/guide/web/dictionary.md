# Dictionary Function

> Dictionary is a key-value pair stored in the backend database, finding the corresponding text display content through the dictionary's value
> Enter data in dictionary management

Specific entry video reference https://www.bilibili.com/video/BV1kv4y1g7nT?p=12&vd_source=f2640257c21e3b547a790461ed94875e

## Dictionary Methods

```js

import { getDict } from '@/utils/dictionary'
// getDict method can find the corresponding dictionary content array based on the dictionary type entered in the dictionary, enabling series of dictionary operations in the frontend
// For example:

const sexDict = await getDict("sex")
// res is the returned dictionary array 
// [{value:0,lable:"Male"},{value:1,lable:"Female"}]

import { showDictLabel } from '@/utils/dictionary'
// showDictLabel method can match the corresponding dictionary label based on the dictionary entered in the dictionary and the passed value
// For example:

const label = showDictLabel(sexDict,0)
// label is the returned content
// Male

// Or directly use {{showDictLabel(sexDict,0)}} in html part to get the text Male

```
