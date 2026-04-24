const fs = require('fs');
const path = require('path');

const cssFiles = [];

function findCSS(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findCSS(fullPath);
    } else if (fullPath.endsWith('.css') && !fullPath.includes('index.css') && !fullPath.includes('App.css')) {
      cssFiles.push(fullPath);
    }
  }
}

findCSS('./frontend/src');

const replacements = [
  // Colors
  { regex: /color:\s*#f4f4f5;?/g, replacement: 'color: var(--text-primary);' },
  { regex: /color:\s*#a1a1aa;?/g, replacement: 'color: var(--text-secondary);' },
  { regex: /color:\s*#52525b;?/g, replacement: 'color: var(--text-muted);' },
  { regex: /color:\s*#71717a;?/g, replacement: 'color: var(--text-muted);' }, 
  { regex: /color:\s*#fca5a5;?/g, replacement: 'color: var(--text-error);' },
  { regex: /color:\s*#ef4444;?/g, replacement: 'color: var(--text-error);' }, 
  
  // Font sizes
  { regex: /font-size:\s*2\.5rem;?/g, replacement: 'font-size: var(--font-size-h1);' },
  { regex: /font-size:\s*2\.25rem;?/g, replacement: 'font-size: var(--font-size-h1);' },
  { regex: /font-size:\s*2rem;?/g, replacement: 'font-size: var(--font-size-h1);' },
  { regex: /font-size:\s*1\.75rem;?/g, replacement: 'font-size: var(--font-size-h2);' },
  { regex: /font-size:\s*1\.5rem;?/g, replacement: 'font-size: var(--font-size-h2);' },
  { regex: /font-size:\s*1\.375rem;?/g, replacement: 'font-size: var(--font-size-h1-mobile);' }, 
  { regex: /font-size:\s*1\.25rem;?/g, replacement: 'font-size: var(--font-size-h3);' },
  { regex: /font-size:\s*1\.125rem;?/g, replacement: 'font-size: var(--font-size-h3);' },
  { regex: /font-size:\s*1rem;?/g, replacement: 'font-size: var(--font-size-base);' },
  { regex: /font-size:\s*0\.9375rem;?/g, replacement: 'font-size: var(--font-size-sm);' },
  { regex: /font-size:\s*0\.875rem;?/g, replacement: 'font-size: var(--font-size-sm);' },
  { regex: /font-size:\s*0\.8125rem;?/g, replacement: 'font-size: var(--font-size-xs);' },
  { regex: /font-size:\s*0\.75rem;?/g, replacement: 'font-size: var(--font-size-tiny);' },
  
  // Font weights
  { regex: /font-weight:\s*400;?/g, replacement: 'font-weight: var(--font-weight-normal);' },
  { regex: /font-weight:\s*500;?/g, replacement: 'font-weight: var(--font-weight-medium);' },
  { regex: /font-weight:\s*600;?/g, replacement: 'font-weight: var(--font-weight-semibold);' },
  { regex: /font-weight:\s*700;?/g, replacement: 'font-weight: var(--font-weight-bold);' },
  { regex: /font-weight:\s*normal;?/g, replacement: 'font-weight: var(--font-weight-normal);' },
  { regex: /font-weight:\s*bold;?/g, replacement: 'font-weight: var(--font-weight-bold);' },
];

for (const file of cssFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  for (const { regex, replacement } of replacements) {
    content = content.replace(regex, replacement);
  }
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
console.log('Done.');
