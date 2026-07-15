const fs = require('fs');
const html = fs.readFileSync('d:\\Projects\\emran-portfolio\\scratch\\raw_contributions.html', 'utf8');

// Find all elements resembling table cells for contribution days
// Typically: <td class="ContributionCalendar-day" ... > or similar
const cellRegex = /<td\s+[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
let match;
const parsed = [];

while ((match = cellRegex.exec(html)) !== null) {
  const elementStr = match[0];
  
  // Extract attributes individually
  const dateMatch = elementStr.match(/data-date="([^"]+)"/);
  const levelMatch = elementStr.match(/data-level="([^"]+)"/);
  const idMatch = elementStr.match(/id="([^"]+)"/);
  
  if (dateMatch && levelMatch) {
    parsed.push({
      date: dateMatch[1],
      level: parseInt(levelMatch[1], 10),
      id: idMatch ? idMatch[1] : null
    });
  }
}

console.log('Total cells parsed:', parsed.length);
console.log('Sample cells:', parsed.slice(0, 5));
