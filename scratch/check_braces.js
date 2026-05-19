const fs = require('fs');
const content = fs.readFileSync('app/globals.css', 'utf8');

let openBraces = 0;
let closeBraces = 0;
let lineNum = 1;
let lastOpenLine = 0;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  if (char === '\n') lineNum++;
  if (char === '{') {
    openBraces++;
    lastOpenLine = lineNum;
  }
  if (char === '}') {
    closeBraces++;
  }
}

console.log('Open braces:', openBraces);
console.log('Close braces:', closeBraces);
console.log('Difference:', openBraces - closeBraces);
