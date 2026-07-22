const fs = require('fs');
const path = require('path');

const imgPath = path.join(process.cwd(), 'public', 'emran-hossen-developer-2026.jpg');
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = imgBuffer.toString('base64');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="50%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#d946ef" />
    </linearGradient>
    <clipPath id="avatarCircle">
      <circle cx="256" cy="256" r="236" />
    </clipPath>
  </defs>
  <!-- Outer gradient ring -->
  <circle cx="256" cy="256" r="250" fill="url(#ringGrad)" />
  <!-- Inner circular cropped image -->
  <image href="data:image/jpeg;base64,${base64Img}" x="20" y="20" width="472" height="472" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatarCircle)" />
</svg>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.svg'), svgContent);
console.log('favicon.svg created successfully!');
