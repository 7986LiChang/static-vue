# vue+webpack

### 【20190329】初始化

- [webpack初始化教程](https://zhuanlan.zhihu.com/p/34504414)

#### 具体过程：

#### 一、安装webpack

1. 安装`webpack@3.10.0`， `webpack-dev-server@2.10.1`。

   带参数`--save-dev`表示本地安装

   ```javascript
   npm install webpack@3.10.0 --save-dev
   npm install webpack-dev-server@2.10.1 --save-dev
   ```



#### 二、新建src目录

1. 在src目录下新建`main.js`作为入口文件，新建`util.js`作为业务文件

- 修改`util.js`

  ```javascript
  function init(){
      var app = new Vue({
          el: '#app',
          data: {
              message: '初始化！'
          }
      })
  }
  
  module.exports = {
      init: init
  }
  ```

- 修改`main.js`

  ```javascript
  const util = require('./util')
  
  util.init();
  ```



#### 三、新建配置文件

1. 在根目录下新建配置文件`webpack.config.js`

   ```javascript
   const path = require('path');
   module.exports = {
       entry: './src/main.js', // 入口文件的配置项
       output:{ // 出口文件的配置项
           path: path.resolve(__dirname, './dist'), // 打包的路径文职
           publicPath: "/dist",
           filename: 'bundle.js' // 打包的文件名称
       }
   };
   ```

   其中设置入口文件为`src`目录下的`main.js`，出口文件为`dist`目录下的`bundle.js`文件。（打包完成后会新建dist目录，其下也会新增bundle.js文件）

   

#### 四、新建入口页面index.html

1. 在根目录下新建文件`index.html`

   ```html
   <!doctype html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport"
             content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="ie=edge">
       <title>从开始到放弃</title>
       <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
   </head>
   <body>
       <div id="app">
           {{ message }}
       </div>
   <!-- 项目打包生成的文件路径 -->
   <script src="/dist/bundle.js"></script>
   </body>
   </html>
   ```

   其中引入`vue`，同时引入打包后的入口`js`文件`bundle.js`



#### 五、设置打包命令

1. 修改`package.json`文件

   ```javascript
   "scripts": {
       "test": "webpack-dev-server --open --hot --progress",
       "build": "webpack --progress --hide-modules"
     }
   ```

- 运行 `npm run test`：启动工程。

- 运行 `npm run build` : 打包。结果：生成dist目录，里面是打包的文件`bundle.js`

  **特别注意：通过`webpack-dev-server`对原始文件作出的改动进行实时编译，实时编译后的文件都保存到了内存中，再目标文件（`bundle.js`）中看不到打包结果**

  | webpack打包参数 | 说明 |
  | ------ | ------ |
  | `--progress` | 显示打包进度 |
  | `--hot` | 标识热启动，源文件发生变化时实时打包 |
  | `--open` | 打包完成后，自动打开启动页 |



#### 六、加载CSS/SCSS

webpack默认只支持js模块化，如果要把scss等样式文件也当成模块，需要加载对应的loader解析器

1. 安装`node-sass`、`css-loader`、`sass-loader`、`style-loader`

   ```javascript
   npm install node-sass@4.9.3 --save-dev
   npm install css-loader@0.28.8 --save-dev
   npm install sass-loader@6.0.6 --save-dev
   npm install style-loader@0.19.1 --save-dev
   ```

2. 在webpack.config.js中进行配置

   在module.exports中添加：

   ```javascript
   module: {
           rules: [
               {
                   test: /\.css$/,
                   use: ['style-loader','css-loader']
               },
               {
                   test: /\.scss$/,
                   use: ['style-loader','css-loader', 'sass-loader']
               },
               {
                   test: /\.sass$/,
                   use: ['style-loader','css-loader', 'sass-loader?indentedSyntax']
               }
           ]
       }
   ```

# 学习记录

> 路径计划：
>
> - [ ] 【20190401】模板语法、条件语句、循环语句、计算属性
> - [ ] 【20190402】监听属性、样式绑定、事件处理器
> - [ ] 【20190403】表单、组件、自定义指令、路由
> - [ ] 【20190404】过渡&动画、混入、Ajax、响应接口
> - [ ] 【20190405】vue-cli命令行工具使用，快读搭建大型单页应用，todo



### 【20190401】模板语法

- 每个 Vue 应用都需要通过实例化 Vue 来实现。

- 核心：将实例属性响应式地与dom中元素绑定。实现数据与视图的独立。有点像模板语法。

  ```
  var vm = new Vue({
          el: '#vue_det',
          data: {
              site: "菜鸟教程",
              url: "www.runoob.com",
              alexa: "10000"
          },
          methods: {
              details: function() {
                  return  this.site + " - 学的不仅是技术，更是梦想！";
              }
          }
      })
  ```

  其中：

   - data用于定义属性
   - methods用于定义函数

 - vue是**响应式**的，当一个vue实例被创建时，会向Vue的响应式系统中加入其data对象所能找到的全部属性。当这些属性值发生改变时，html视图就会产生相应变化。

   data属性的取用：

   - `vm.site`

   - 在dom中，直接通过模板方式使用。

     ```html
     <div id="app">
         {{ message }}
     </div>
     ```

#### 一、模板语法

> Vue.js 的核心是一个允许你采用简洁的模板语法来声明式的将数据渲染进 DOM 的系统。

#### 插值

##### 文本

使用 `{{ ... }}` 插值



##### Html

使用`v-html`指令

```javascript
<div id="app">
    {{ message }}
    <div v-html="messageHtml"></div>
</div>

let app = new Vue({
        el: '#app',  //绑定的元素
        data: {
            message: '初始化！',
            messageHtml: `<span>好的，201904001</span>`
        }
    });
```



##### 属性

HTML属性中的值使用`v-bind`指令。

可用于切换class样式。



##### 指令

带有`v-` 前缀的特殊属性。可以在表达式的值改变时，将某些行为应用到DOM上。



##### 参数

参数在指令后面以冒号指明。`v-bind`响应地更新HTML属性。

`v-bind:href="url"`使用data属性中的url作为href属性值。



##### 修饰符

修饰符是以半角句号 **.** 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，**.prevent** 修饰符告诉 **v-on** 指令对于触发的事件调用 **event.preventDefault()**：



##### 用户输入

`v-model`指令，可以用来在`input、select、text、radio`等表单控件元素上创建**双向数据绑定**。可以用data中属性值初始化元素，根据表单输入的值，会在同步更新data中的值。



##### 过滤器

`filters`，由"管道符"指定，可以将一些常见文本格式化。

使用方式：

```javascript
//在两个大括号中
{{ message | dateFormat}}

//在v-bind指令中
<div v-bind:id="rawId | formatId（arg1, arg2）"></div>
```

过滤器函数可以接受参数，默认第一个参数是管道前的值。

在Vue实例中添加filters属性，才能让过滤器生效。



##### 缩写

- v-bind html属性 缩写：使用" : "

- v-on 事件绑定 缩写：使用“ @ ”

```html
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>

<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```

#### 二、总结

| 指令、Vue实例属性 | 说明介绍 |
| --------- | -------- |
| el | 绑定Vue实例的dom元素 |
| data           | 基础数据 |
| methods        | 基本函数 |
| filters | 过滤器 |
| v-bind | html属性，例如`v-bind:title, v-bind:href`。缩写用“：”，`:title, :href` |
| v-model | `input、select、text、radio`等用户输入的表单元素上，数据双向绑定 |
| v-on | 绑定事件。例如`v-on:click`缩写用“@”，`@:click` |

   