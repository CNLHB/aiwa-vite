# aiwa-vite
> 基于koa自己实现迷你版vite  
## vite原理
+ 开启服务,拦截网络请求
+ vite重度依赖module sciprt的特性
+ module sciprt允许在浏览器中直接运行原生支持模块
```html
<script type="module">
    // index.js可以通过export导出模块，也可以在其中继续使用import加载其他依赖 
    import App from  './index.js'
</script>
<script type="module" src="/src/main.js"></script>
```
+ 有了浏览器的原生支持，vite就可以开启服务，监听文件变动，等待请求，在接受到请求时，再对请求内容进行解析，返回浏览器可执行内容，
省去了对全部文件打包编译的过程，所以启动非常快。也做到了按需编译。

### 1、初始化模板
+ 准备html模板
```html
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>aiwa_vite</title>
    <script>
        window.addEventListener('error', function(e){
            console.log(e)
        })
    </script>
</head>

<body>
    <div id="app">
    </div>
    <script>
        window.onload = function(){
            var image = new Image();
            image.src = '/images/timg.jpg'
        }
    </script>
    <script type="module" src="/src/main.js"></script>
</body>
</html>
```
+ 分析入口文件main.js

  + ```js
    import { createApp } from 'vue'
    import App from './App.vue'
    import './index.css'
    createApp(App).mount('#app')
    ```

  + 检查import导入的内容

  + 如果// 不是/ ./ ../开头的，我们认为你是来源自node_modules里面的，我们就要去node_module里找

  + 替换from 后面跟随的内容

+ 支持npm包的import

  + import xx from 'vue'替换成 import xx from '/@moduels/vue'
  +  koa监听得到/modules/开头的网络请求，就去node_module里查找

+  支持.vue单文件组件的解析

  +  .vue文件浏览器是不认识的。浏览器import的时候只认识js
  + .vue单文件进行编译，拆成script， template
  + template=> render函数 拼成一个对象
  +  script.render = render

+ 支持import css

  + 拦截.css请求
  + 创建style元素，插入到head中,待优化

+ 未完待续~~~

  + 热更新、ts支持等




@todo看vite的源码，看下热更新的实现

@vue3 响应式+虚拟dom+模板编译+组件化


