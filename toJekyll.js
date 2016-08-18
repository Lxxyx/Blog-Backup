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

const dateRe = /date:\s{1}\d{4}-\d{2}-\d{2}/
const codeRe = /(```\w*)\n([^]+?)(```)/g

walk('source/_posts/', filePath => {
  let content = fs.readFileSync(filePath, 'utf-8')
  if (!codeRe.exec(content)) {
    console.log(filePath);
  }
  // let filename = path.basename(filePath)
  // const date = dateRe.exec(content)[0].replace('date: ', '')
  // const newfilename = `${date}-${filename}`
  // const newfilePath = filePath.replace(filename, newfilename)
  // content = `---\nlayout: post\n${content}`
  // fs.unlinkSync(filePath)
  // fs.writeFileSync(newfilePath, content, 'utf-8')
  // console.log(filePath);
})
