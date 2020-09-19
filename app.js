const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const index = require('./routes/index')
const parseJs = require('./utils/parseJs')
const parseModule = require('./utils/parseModule')
const compilerSfc = require('./utils/compilerSfc')
const parseCss = require('./utils/parseCss')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(async (ctx, next) => {
        let url = ctx.url
        let query = ctx.query
        if (url.endsWith('.js')) {
            //支持ts等
            parseJs(ctx)
        }else if(url.endsWith('.css')){
            // 你还可以支持less ，sass ，stylus
            parseCss(ctx, url)
        } else if (url.startsWith("/@modules/")) {
            // 这个模块，不是本地文件，而是node_module里查找
            parseModule(ctx, url)
        } else if (url.indexOf('.vue') > -1) {
            // import xx from 'xx.vue'
            // 1. 单文件组件解析
            compilerSfc(ctx, url, query)
        }
        await next();
    }
);
 app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
