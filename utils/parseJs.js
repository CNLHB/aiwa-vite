const fs = require('fs');
const path = require('path');
const rewriteImport = require('./rewriteImport');
function parseJs(ctx) {
    let content = fs.readFileSync(path.resolve(__dirname, "../", ctx.url.slice(1)), 'utf-8')
    content = rewriteImport(content)
    ctx.type = "application/javascript"
    ctx.body = content
}


module.exports = parseJs