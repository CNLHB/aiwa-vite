const fs = require('fs')
const path = require('path')
const rewriteImport = require('./rewriteImport')
function parseModule(ctx, url) {
    const prefix = path.resolve(__dirname, '../', 'node_modules', url.replace('/@modules/', ''))
    const mod = require(prefix + '\\' + 'package.json').module
    const p = path.resolve(prefix, mod)
    const ret = fs.readFileSync(p, 'utf-8')
    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(ret)
}

module.exports = parseModule