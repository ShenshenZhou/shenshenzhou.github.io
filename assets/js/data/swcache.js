---
layout: compress

# The list to be cached by PWA
---

const resource = [

  /* --- CSS --- */
  '{{ "/assets/css/style.css" | relative_url }}',

  /* --- JavaScripts --- */
  {% assign js_path = "/assets/js" | relative_url %}
  '{{ js_path }}/dist/home.min.js',
  '{{ js_path }}/dist/page.min.js',
  '{{ js_path }}/dist/post.min.js',
  '{{ js_path }}/dist/categories.min.js',
  '{{ js_path }}/data/search.json',
  '{{ "/app.js" | relative_url }}',
  '{{ "/sw.js" | relative_url }}',

  /* --- HTML --- */
  '{{ "/index.html" | relative_url }}',
  '{{ "/404.html" | relative_url }}',
  {% for tab in site.tabs %}
    '{{ tab.url | relative_url }}',
  {% endfor %}

  /* --- Favicons --- */
  {% assign favicon_path = "/assets/img/favicons" | relative_url %}

  '{{ favicon_path }}/android-chrome-192x192.png',
  '{{ favicon_path }}/android-chrome-512x512.png',
  '{{ favicon_path }}/apple-touch-icon.png',
  '{{ favicon_path }}/favicon-16x16.png',
  '{{ favicon_path }}/favicon-32x32.png',
  '{{ favicon_path }}/favicon.ico',
  '{{ favicon_path }}/mstile-150x150.png',
  '{{ favicon_path }}/site.webmanifest',
  '{{ favicon_path }}/browserconfig.xml'

];

