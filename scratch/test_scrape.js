const http = require('https');

http.get('https://github.com/users/emranhossen-dev/contributions', (res) => {
  let html = '';
  res.on('data', (chunk) => { html += chunk; });
  res.on('end', () => {
    const regex = /(?:data-date="([^"]+)"[^>]*data-level="([^"]+)"|data-level="([^"]+)"[^>]*data-date="([^"]+)")/g;
    let match;
    const items = [];
    while ((match = regex.exec(html)) !== null) {
      const date = match[1] || match[4];
      const level = match[2] || match[3];
      items.push({ date, level });
    }
    console.log('Total items found:', items.length);
    if (items.length > 0) {
      console.log('First 5 items:', items.slice(0, 5));
      console.log('Last 5 items:', items.slice(-5));
    }
    
    // Also let's extract tooltips or contribution counts
    // GitHub tooltips are often in the form: <tool-tip ...>X contributions on Month Day, Year</tool-tip>
    // or inside <span class="sr-only">X contributions on ...</span>
    const countRegex = /(\d+|No) contribution/g;
    const counts = html.match(countRegex);
    console.log('Counts found:', counts ? counts.length : 0);
  });
});
