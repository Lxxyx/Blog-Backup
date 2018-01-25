const fs = require('fs');
const childProcess = require('child_process');
const path = require('path');

const filename = process.argv[2];
const posts = path.resolve(__dirname, './source/_posts/');
const targetDir = path.resolve(__dirname, './source/_posts/2018/');

if (!filename) {
  throw new Error('需要传入博客名');
}

childProcess.execSync(`hexo n '${filename}'`);

const md = path.resolve(posts, `${filename}.md`);
const targetMD = path.resolve(targetDir, `${filename}.md`);

fs.copyFileSync(md, targetMD);
fs.unlinkSync(md);

console.log();
console.log('---------------------');
console.log(`生成成功`);
console.log('---------------------');
console.log();
