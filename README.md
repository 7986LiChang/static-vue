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

   