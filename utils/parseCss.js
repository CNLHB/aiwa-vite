const path = require('path');
const fs = require('fs');

function parseCss(ctx, url) {
    const p = path.resolve(__dirname, "../", url.slice(1))
    const file = fs.readFileSync(p, 'utf-8')
    const content = `
      const css =  "${file.replace(/(\s|[\r\n])/g, '')}"
      const link = document.createElement('style')
      link.setAttribute('type', 'text/css')
      document.head.appendChild(link)
      link.innerHTML = css
    `
    ctx.type = 'application/javascript'
    ctx.body = content
}

module.exports = parseCss