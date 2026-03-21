# Bal Vikas Senior Secondary School - Website

A clean, production-ready, and GitHub-deployable website for Bal Vikas Senior Secondary School.

## Project Structure

```
/
├── index.html              # Home page
├── about.html              # About page
├── academics.html          # Academics & programs
├── faculties.html          # Faculty directory
├── gallery.html            # Photo gallery with filtering
├── news.html               # News & updates with filtering
├── css/
│   └── styles.css         # Consolidated CSS (all styling)
├── js/
│   └── scripts.js         # Consolidated JavaScript (all functionality)
├── assets/
│   ├── images/            # Place your images here
│   ├── logo/              # Logo files
│   └── icons/             # Icon assets
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## Features

- **Responsive Design** - Mobile-first, works on all devices
- **Clean Code Structure** - Separated HTML, CSS, and JavaScript
- **Gallery with Filtering** - Category-based photo filtering
- **News Filtering** - News by category with date badges
- **Faculty Profiles** - Interactive staff directory with profiles
- **Modern UI** - Professional design with smooth animations
- **No Duplicates** - Single consolidated CSS and JS files
- **GitHub Pages Ready** - Uses relative paths for deployment

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd school-website
```

### 2. Add Images
Place your images in the `assets/images/` folder:
- Campus photos: `assets/images/campus.jpg`
- Teacher photos: `assets/images/teacher1.jpg`, `teacher2.jpg`, etc.
- Gallery images: `assets/images/event1.jpg`, `sports1.jpg`, etc.
- News images: `assets/images/news1.jpg`, `news2.jpg`, etc.

### 3. Update Content
Edit the HTML files to:
- Update school information
- Add real images
- Modify teacher names and details
- Update news and events

### 4. Deploy to GitHub Pages

#### Option 1: Using GitHub Pages Settings
1. Push files to GitHub
2. Go to Settings → Pages
3. Set source to main branch (root folder)
4. Site will be live at: `https://username.github.io/repo-name`

#### Option 2: Using gh-pages Branch
```bash
git checkout -b gh-pages
git push origin gh-pages
```

Then in GitHub Settings → Pages, select `gh-pages` as source.

## File Organization

### CSS (`css/styles.css`)
- Root variables for colors, spacing, and shadows
- Universal styles and resets
- Component styles
- Responsive layouts
- Animations

### JavaScript (`js/scripts.js`)
- Gallery filtering
- Lightbox functionality
- News filtering
- Faculty profile modal
- Animation triggers

### HTML Files
- Clean semantic HTML5
- Consistent navigation across all pages
- Bootstrap 5 for responsive grid
- Font Awesome icons

## Navigation

All pages include:
- **Topbar** - Contact info
- **Navigation** - Links to all pages
- **Active States** - Current page highlighted
- **Footer** - Links and contact info

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
  --navy: #174256;
  --gold: #d97706;
  --blue: #2f80ed;
  /* ... more colors ... */
}
```

### Fonts
Currently using:
- **Heading Font:** Playfair Display (Google Fonts)
- **Body Font:** DM Sans (Google Fonts)

### Images
Update image paths in HTML to point to your `assets/images/` folder.

## Features in Detail

### Gallery (gallery.html)
- Filter by: All, Events, Sports, Cultural, Academic, Facilities
- Click images to open lightbox
- Responsive grid layout

### News (news.html)
- Filter by: All, Academic, Sports, Events, Achievement
- Date badges on each article
- Category tags

### Faculty (faculties.html)
- Staff directory with photos
- Click to view full profile
- Organized by role (Admin, Teaching, Support)

### Responsive Breakpoints
- Mobile: 320px and up
- Tablet: 768px and up (md)
- Desktop: 1024px and up (lg)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Tips

1. **Optimize Images** - Use compressed JPG/PNG
2. **Lazy Loading** - Consider adding lazy loading for gallery
3. **Caching** - GitHub Pages handles caching automatically
4. **Minification** - Use CSS/JS minifiers for production

## Known Limitations

- Uses placeholder images - replace with real photos
- No database - static content only
- No search functionality
- No user authentication

## Future Enhancements

- Add search functionality
- Student/parent portal
- Online admissions form
- Blog system
- Event calendar
- Testimonials section

## Support & Maintenance

For issues or improvements:
1. Check file paths (use relative paths)
2. Verify image locations in `assets/images/`
3. Test on multiple browsers
4. Check console for JavaScript errors

## License

This website template is provided as-is for Bal Vikas Senior Secondary School.

## Contact

**School Name:** Bal Vikas Senior Secondary School
**Location:** Sar Ki Dhani, Nayla, Jaipur – 303012
**Phone:** +91 9783318862 / +91 9887295816
**Email:** bvpsnayla@gmail.com

---

**Last Updated:** 2025
**Version:** 1.0 - Production Ready
