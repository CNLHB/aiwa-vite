const path = require('path');
const compilerSfc = require('@vue/compiler-sfc')
const fs = require('fs');
const compilerDom = require('@vue/compiler-dom')
const rewriteImport = require('./rewriteImport')
const insertCss = require('./insertCss')
function compiler(ctx, url, query) {
    const p = path.resolve(__dirname, '../', url.split('?')[0].slice(1))
    // 解析单文佳年组建，需要官方的库
    const {descriptor} = compilerSfc.parse(fs.readFileSync(p, 'utf-8'))
    let styleContent = ''
    if (descriptor.styles.length>0){
        descriptor.styles.forEach(item=>{
            styleContent+=item.content
        })
    }
    if (!query.type) {
        // js内容
        ctx.type = 'application/javascript'
        ctx.body = `
${rewriteImport(descriptor.script.content.replace('export default ', 'const __script = '))}
import {render as __render} from "${url}?type=template"
${insertCss(styleContent)}
__script.render = __render
export default __script
      `
    } else if ((query.type == "template")) {
        // 解析我们的template 编程render函数
        const template = descriptor.template
        const render = compilerDom.compile(template.content, {mode: "module"}).code
        ctx.type = 'application/javascript'
        ctx.body = rewriteImport(render)
    }
}

module.exports = compiler