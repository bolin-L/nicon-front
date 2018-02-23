# icon-front

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# QA
### iView组件库的使用
工程引入iview组件库的使用方式
通过按需加载方式引用，但是由于iView组件的名称与hmtl内置标签命名冲突，所以使用别名方式引入
```apple js
import {Input as IInput} from 'iview'

export default Base.extend({
    data () {
        return {
            value: ''
        }
    },
    components: {IInput}
})
```
```html
<div class="repo-create">
    here is repo create
    <i-input v-model="value" placeholder="请输入..."></i-input>
</div>
```
据说vue2.0对引入了虚拟DOM之后，对组件标签区分大小写，实践证明不行，以下是源码
```js
/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}
```

样式的全局引用
```css
import 'iview/dist/styles/iview.css'
```
关于Vue的组件命名规则参考[聊聊 Vue 组件命名那些事](https://cnodejs.org/topic/5816aabdcf18d0333412d323)


### 自动化脚本
```js
// 拷贝lib/icon/fonts下的字体文件到res/fonts中,
// 最终把res发布到服务器
npm run sync 


// 新建组件模版文件夹
npm run ui
// 参数
    // --page  页面名称,默认common
    // --name  组件名称

```
