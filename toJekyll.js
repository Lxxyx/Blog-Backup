const fs = require('fs')
const path = require('path')

function walk (dirPath, cb) {
  const dir = fs.readdirSync(dirPath)
  dir.forEach(file => {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      walk(filePath, cb)
      return
    }
    cb(filePath)
  })
}

const dateRe = /\d{4}-\d{2}-\d{2}-/
const codeRe = /(```\w*)\n([^]+?)(```)/g

walk('source/_posts/', filePath => {
  let filename = path.basename(filePath)
  const content = fs.readFileSync(filePath, 'utf-8')
  const newfilename = filename.replace(dateRe, '')
  const newfilePath = filePath.replace(filename, newfilename)
  fs.unlinkSync(filePath)
  fs.writeFileSync(newfilePath, content, 'utf-8')
})
