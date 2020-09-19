const router = require('koa-router')()
const replaceSendHtml = require('../utils/replaceSendHtml')

router.get('/', async (ctx, next) => {
  replaceSendHtml(ctx)

})
router.get('/index.html', async (ctx, next) => {
  replaceSendHtml(ctx)
})
// router.get('/favicon.ico', async (ctx, next) => {
//   let content = fs.readFileSync('./favicon.ico')
//   ctx.type="image/x-icon"
//   ctx.body = content
// })
module.exports = router
