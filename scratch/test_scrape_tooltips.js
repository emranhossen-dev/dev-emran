const http = require('https');

http.get('https://github.com/users/emranhossen-dev/contributions', (res) => {
  let html = '';
  res.on('data', (chunk) => { html += chunk; });
  res.on('end', () => {
    // Find all table td or rect matching data-date
    // Example: <td ... data-date="2025-08-10" data-level="1" id="contribution-day-0-0">
    const dayRegex = /<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"[^>]*id="([^"]+)"/g;
    let match;
    const daysMap = {};
    while ((match = dayRegex.exec(html)) !== null) {
      const date = match[1];
      const level = parseInt(match[2], 10);
      const id = match[3];
      daysMap[id] = { date, level, count: 0 };
    }
    
    // Find tool-tips
    // Example: <tool-tip for="contribution-day-0-0">1 contribution on Sunday, August 10, 2025</tool-tip>
    const tooltipRegex = /<tool-tip for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
    let tooltipMatch;
    let tooltipCount = 0;
    while ((tooltipMatch = tooltipRegex.exec(html)) !== null) {
      const id = tooltipMatch[1];
      const text = tooltipMatch[2].trim();
      if (daysMap[id]) {
        tooltipCount++;
        // Parse count from text, e.g. "1 contribution", "No contributions", "12 contributions"
        const countMatch = text.match(/^(\d+|No)\s+contribution/);
        if (countMatch) {
          const countStr = countMatch[1];
          daysMap[id].count = countStr === 'No' ? 0 : parseInt(countStr, 10);
        }
      }
    }
    
    const parsedDays = Object.values(daysMap);
    console.log('Parsed Days from td + tool-tip:', parsedDays.length);
    console.log('Tooltip matches linked:', tooltipCount);
    if (parsedDays.length > 0) {
      console.log('Sample days with counts:', parsedDays.filter(d => d.count > 0).slice(0, 5));
    }
  });
});
