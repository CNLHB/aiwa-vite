
function insertCss(content){
    const cssCon = `
      const link = document.createElement('style')
      link.setAttribute('type', 'text/css')
      document.head.appendChild(link)
      link.innerHTML = '${content.replace(/(\s|[\r\n])/g, '')}'
    `
    return cssCon
}
module.exports = insertCss