// 不是/ ./ ../开头的，我们认为你是来源自node_modules里面的
// 我们就要去node_module里找
// vite原理，  拦截网络请求
//  待会我们去看下vite的源码，看下热更新的实现
import { createApp } from 'vue'
// console.log(createApp)
import App from './App.vue'

 import './index.css'

createApp(App).mount('#app')


// 响应式+虚拟dom+模板编译+组件化

// @todo
// 1. 支持npm包的import
// import xx from 'vue'替换成 import xx from '/@moduels/vue'
// koa监听得到/modules/开头的网络请求，就去node_module里查找
// 2. 支持.vue单文件组件的解析
// .vue文件浏览器是不认识的 对吧。浏览器import的时候只认识js
// .vue单文佳年组建，拆成script， template
// template=> render函数 拼成一个对象
// script.render = render
// 3、 支持import css
// 比如热更新等 。ts支持等