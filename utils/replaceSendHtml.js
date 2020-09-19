
const fs = require('fs')
const path = require('path')

const replaceSendHtml=(ctx)=>{
    let content = fs.readFileSync('./index.html', 'utf-8')
    content = content.replace('<script', `
      <script>
        // 注入一个socket客户端
        // 后端的文件变了，通知前端去更新
        window.process = {
          env: {NODE_EV:'dev'}
        }
      </script>
      <script
    
    `)
    ctx.type="text/html"
    ctx.body = content
}
module.exports = replaceSendHtml