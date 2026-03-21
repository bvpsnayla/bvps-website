# GitHub Pages Deployment Guide

## Quick Start (5 minutes)

### Step 1: Initialize Git
```bash
git init
git add .
git commit -m "Initial commit - school website"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create repository named: `school-website` (or your choice)
3. Copy the repository URL

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR-USERNAME/school-website.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Select **Source: Deploy from a branch**
4. Select **Branch: main** and **Folder: / (root)**
5. Click **Save**
6. Wait 1-2 minutes for deployment

### Step 5: Access Your Website
Your site will be live at:
```
https://YOUR-USERNAME.github.io/school-website/
```

---

## Detailed Setup Instructions

### Prerequisites
- GitHub account (free at github.com)
- Git installed on your computer
- Code editor (VS Code recommended)
- All files from this project

### File Structure Required
```
school-website/
├── index.html
├── about.html
├── academics.html
├── faculties.html
├── gallery.html
├── news.html
├── css/styles.css
├── js/scripts.js
├── assets/images/
│   ├── campus.jpg
│   ├── teacher1.jpg
│   ├── event1.jpg
│   └── ... (all images)
└── README.md
```

### Configure Your Domain (Optional)

#### Use GitHub Pages Domain (Free)
`https://username.github.io/school-website/`

#### Use Custom Domain (Paid)
1. Purchase domain (godaddy.com, namecheap.com, etc.)
2. Go to Settings → Pages → Custom Domain
3. Enter your domain: `example.com`
4. Update DNS records at your domain registrar
5. Point to: `username.github.io`

See: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

---

## Troubleshooting

### Site Not Loading
- **Check:** Settings → Pages → Source is set correctly
- **Wait:** GitHub may take 1-2 minutes to deploy
- **Verify:** Branch is `main` and folder is `/ (root)`

### Images Not Showing
- **Check:** Image paths use relative paths: `assets/images/photo.jpg`
- **Verify:** All images exist in `assets/images/` folder
- **Common Issue:** Wrong paths like `/assets/images/` won't work

### Links Not Working
- **Check:** All links are relative: `about.html` (NOT `/about.html`)
- **Verify:** No absolute paths in HTML files
- **Test:** Navigation works on all pages

### CSS/JS Not Loading
- **Check:** Links in HTML: `<link href="css/styles.css">`
- **Verify:** Files exist at `css/styles.css` and `js/scripts.js`
- **Browser Console:** Check for 404 errors (Press F12)

### Site Shows Old Content
- **Clear Cache:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- **Check:** Latest commit pushed to GitHub
- **Wait:** Rebuilds take 1-2 minutes

---

## Updating Content

### To Add News Articles
Edit `news.html`:
1. Find `<section class="news-sec">`
2. Copy a news card block
3. Update image, text, date, category
4. Save and push to GitHub

### To Add Gallery Photos
Edit `gallery.html`:
1. Add new images to `assets/images/`
2. Copy gallery item block
3. Update src, category, caption
4. Save and push to GitHub

### To Update Teacher Profiles
Edit `faculties.html`:
1. Update teacher image paths
2. Update data attributes (name, role, subject, etc.)
3. Save and push to GitHub

### General Updates
1. Edit HTML file
2. Save changes
3. Run: `git add .`
4. Run: `git commit -m "Update description"`
5. Run: `git push`
6. Changes live in 1-2 minutes

---

## Performance Optimization

### Image Optimization
Compress images before uploading:
- Use: tinypng.com or imageoptim.com
- Target: 100-300KB per image
- Format: JPG for photos, PNG for graphics

### CSS/JS Minification
For production, minify files:
```bash
# Using online tools:
cssminifier.com
jsminifier.com
```

### Caching Headers
GitHub Pages automatically sets proper caching headers.
No configuration needed.

---

## Advanced: Custom GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## Monitoring & Analytics (Optional)

Add Google Analytics:
1. Sign up at: analytics.google.com
2. Create property for your domain
3. Copy tracking code
4. Add before `</head>` in all HTML files:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## Security Checklist

- [ ] Remove sensitive information from code
- [ ] Don't commit `.env` files
- [ ] Use HTTPS (GitHub Pages enables by default)
- [ ] Regular backups of content
- [ ] Monitor GitHub notifications

---

## Support Links

- GitHub Pages Docs: https://pages.github.com/
- GitHub Help: https://docs.github.com/en/pages
- Troubleshooting: https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages

---

## Success Checklist

- [ ] All 6 HTML pages created
- [ ] CSS and JS consolidated
- [ ] All images in assets folder
- [ ] All links working
- [ ] Repository created on GitHub
- [ ] Pages enabled in Settings
- [ ] Site deployed and live
- [ ] Custom domain configured (optional)
- [ ] Analytics set up (optional)

---

**Your website is now live and ready for the world!** 🎉
