const fs = require('fs');
const html = fs.readFileSync('d:\\Projects\\emran-portfolio\\scratch\\raw_contributions.html', 'utf8');

// Parse cells
const cellRegex = /<td\s+[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
let match;
const daysMap = {};

while ((match = cellRegex.exec(html)) !== null) {
  const elementStr = match[0];
  const dateMatch = elementStr.match(/data-date="([^"]+)"/);
  const levelMatch = elementStr.match(/data-level="([^"]+)"/);
  const idMatch = elementStr.match(/id="([^"]+)"/);
  
  if (dateMatch && levelMatch && idMatch) {
    const id = idMatch[1];
    daysMap[id] = {
      date: dateMatch[1],
      level: parseInt(levelMatch[1], 10),
      count: 0
    };
  }
}

// Parse tooltips
const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
let tooltipMatch;
let linkedCount = 0;

while ((tooltipMatch = tooltipRegex.exec(html)) !== null) {
  const id = tooltipMatch[1];
  const text = tooltipMatch[2].trim();
  
  if (daysMap[id]) {
    linkedCount++;
    const countMatch = text.match(/^(\d+|No)\s+contribution/);
    if (countMatch) {
      const countStr = countMatch[1];
      daysMap[id].count = countStr === 'No' ? 0 : parseInt(countStr, 10);
    }
  }
}

const parsedDays = Object.values(daysMap);
console.log('Total parsed cells:', parsedDays.length);
console.log('Linked tooltips:', linkedCount);
console.log('First 5 non-zero count items:', parsedDays.filter(d => d.count > 0).slice(0, 5));
