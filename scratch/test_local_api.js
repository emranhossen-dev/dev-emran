const http = require('http');

http.get('http://localhost:3000/api/github-contributions', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Status code:', res.statusCode);
      console.log('Keys:', Object.keys(json));
      if (json.contributions) {
        console.log('Total contributions:', json.total);
        console.log('Parsed items count:', json.contributions.length);
        console.log('First 5 items:', json.contributions.slice(0, 5));
        console.log('Sample item with counts:', json.contributions.filter(d => d.count > 0).slice(0, 5));
      } else {
        console.log('Response:', json);
      }
    } catch (e) {
      console.log('Error parsing JSON:', e.message);
      console.log('Raw data received:', data.substring(0, 1000));
    }
  });
}).on('error', (err) => {
  console.log('Request error:', err.message);
});
