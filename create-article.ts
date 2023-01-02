import cp from 'node:child_process'
import fs from 'fs-extra'
import path from 'path'

const currentYear = new Date().getFullYear()
const filename = process.argv[2]
const posts = path.resolve(__dirname, './source/_posts')
const targetDir = path.resolve(posts, `${currentYear}`)

fs.ensureDirSync(targetDir)

if (!filename) {
  throw new Error('需要传入博客名')
}

cp.execSync(`hexo n '${filename}'`)

const mdName = filename.replace(/_/g, '-') + '.md'
const md = path.resolve(posts, mdName)
const targetMD = path.resolve(targetDir, mdName)

fs.moveSync(md, targetMD)

console.log()
console.log('---------------------')
console.log(`生成成功`)
console.log('---------------------')
console.log()
