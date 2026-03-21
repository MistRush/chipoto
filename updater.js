const fs = require('fs');

const htmlPath = 'c:/Users/mirek/Desktop/AntiGravity/Chipoto/index.html';
const cssPath = 'c:/Users/mirek/Desktop/AntiGravity/Chipoto/style.css';

let html = fs.readFileSync(htmlPath, 'utf-8');

// Remove badges
html = html.replace(/\s*<div class="combo-badge">.*?<\/div>/g, '');
html = html.replace(/\s*<span class="vega-badge">.*?<\/span>/g, '');

// Move price next to h3
// Pattern explanation:
// $1 = <div class="menu-card-body">\s*<h3>
// $2 = Title
// $3 = </h3>\s*<p class="ingredients">...</p>
// $4 = <span class="price">...</span>
const pattern = /(<div class="menu-card-body">\s*<h3>)(.*?)(<\/h3>\s*<p class="ingredients">.*?<\/p>)\s*<div class="menu-card-footer">\s*(<span class="price">.*?<\/span>)\s*<\/div>/gs;

html = html.replace(pattern, '$1$2 $4$3');

fs.writeFileSync(htmlPath, html, 'utf-8');

let css = fs.readFileSync(cssPath, 'utf-8');

const oldCss = `.menu-card-body h3 {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 1.3rem;
  color: var(--white);
  margin-bottom: 8px;
}`;

const newCss = `.menu-card-body h3 {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 1.3rem;
  color: var(--white);
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}`;

css = css.replace(oldCss, newCss);

fs.writeFileSync(cssPath, css, 'utf-8');
console.log("Done execution");
