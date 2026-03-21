import re

html_path = 'c:/Users/mirek/Desktop/AntiGravity/Chipoto/index.html'
css_path = 'c:/Users/mirek/Desktop/AntiGravity/Chipoto/style.css'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Remove badges
badges = [
    r'\s*<div class="combo-badge">.*?</div>',
    r'\s*<span class="vega-badge">.*?</span>'
]
for b in badges:
    html = re.sub(b, '', html)

# Move price next to h3
pattern = r'(<div class="menu-card-body">\s*<h3>)(.*?)(</h3>\s*<p class="ingredients">.*?</p>)\s*<div class="menu-card-footer">\s*(<span class="price">.*?</span>)\s*</div>'
html = re.sub(pattern, r'\1\2 \4\3', html, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

# Update CSS
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

old_h3_css = """.menu-card-body h3 {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 1.3rem;
  color: var(--white);
  margin-bottom: 8px;
}"""

new_h3_css = """.menu-card-body h3 {
  font-family: 'Neue Montreal', sans-serif;
  font-size: 1.3rem;
  color: var(--white);
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}"""

css = css.replace(old_h3_css, new_h3_css)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Done")
