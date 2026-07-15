const fs = require('fs');
const content = fs.readFileSync('d:\\Projects\\emran-portfolio\\scratch\\raw_contributions.html', 'utf8');
console.log('File size in chars:', content.length);
console.log('First 500 characters:', content.substring(0, 500));
const index = content.indexOf('data-date');
if (index !== -1) {
  console.log('Found data-date at index:', index);
  console.log('Surrounding content:', content.substring(index - 100, index + 300));
} else {
  console.log('data-date not found in file!');
}
