# 🚀 Deployment Guide

This guide will help you deploy your portfolio to various platforms and customize it for your needs.

## 📋 Pre-Deployment Checklist

### 1. Personalize Your Content
- [ ] Update `src/components/Hero.jsx` with your name and information
- [ ] Modify `src/data/skills.js` with your actual skills
- [ ] Replace `src/data/projects.js` with your real projects
- [ ] Update `src/components/About.jsx` with your story
- [ ] Customize `src/components/Contact.jsx` with your contact info
- [ ] Add your resume as `public/resume.pdf`

### 2. Add Your Assets
- [ ] Add project screenshots to `public/projects/`
- [ ] Add blog post images to `public/blog/` (if using blog)
- [ ] Create an Open Graph image as `public/og-image.jpg`
- [ ] Update favicon in `public/vite.svg`

### 3. Update Meta Information
- [ ] Modify `index.html` meta tags with your information
- [ ] Update `package.json` name and description
- [ ] Customize `README.md` with your details

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy with default settings

3. **Custom Domain (Optional)**
   - Go to your project dashboard
   - Click "Domains"
   - Add your custom domain

### Option 2: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## ⚙️ Environment Variables

Create a `.env` file for any API keys or configuration:

```env
# Contact form endpoint (if using a service like Formspree)
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id

# Analytics (if using Google Analytics)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Any other API keys
VITE_API_KEY=your-api-key
```

## 🔧 Customization Guide

### Colors and Branding
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
        500: '#your-color',
        600: '#your-darker-color',
      },
    },
  },
},
```

### Fonts
Update `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');
```

### Contact Form Integration

#### Option 1: Formspree
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get the endpoint
3. Update the form action in `Contact.jsx`

#### Option 2: Netlify Forms
1. Add `netlify` attribute to your form
2. Add hidden input: `<input type="hidden" name="form-name" value="contact" />`

#### Option 3: EmailJS
1. Sign up at [emailjs.com](https://emailjs.com)
2. Install EmailJS: `npm install emailjs-com`
3. Integrate with the contact form

## 📊 Analytics Setup

### Google Analytics
1. Create a GA4 property
2. Add tracking ID to environment variables
3. Install gtag: `npm install gtag`
4. Add tracking code to `main.jsx`

### Performance Monitoring
Consider adding:
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for user session recording
- [Hotjar](https://hotjar.com) for user behavior analytics

## 🔍 SEO Optimization

### Sitemap
Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourportfolio.com</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Robots.txt
Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yourportfolio.com/sitemap.xml
```

## 🚀 Performance Tips

1. **Optimize Images**
   - Use WebP format when possible
   - Compress images before uploading
   - Use appropriate sizes for different devices

2. **Bundle Analysis**
   ```bash
   npm install --save-dev vite-bundle-analyzer
   npm run build -- --analyze
   ```

3. **Lighthouse Audit**
   - Run Lighthouse in Chrome DevTools
   - Aim for 90+ scores in all categories

## 🔒 Security

1. **Content Security Policy**
   Add to `index.html`:
   ```html
   <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com;">
   ```

2. **HTTPS**
   - Always use HTTPS in production
   - Most hosting platforms provide this automatically

## 📱 Testing

### Cross-Browser Testing
Test on:
- Chrome, Firefox, Safari, Edge
- Mobile devices (iOS Safari, Chrome Mobile)
- Different screen sizes

### Accessibility Testing
- Use screen readers
- Test keyboard navigation
- Check color contrast ratios
- Validate HTML

## 🎯 Final Steps

1. **Test Everything**
   - All links work
   - Forms submit correctly
   - Images load properly
   - Responsive design works

2. **Performance Check**
   - Run Lighthouse audit
   - Test loading speed
   - Check mobile performance

3. **Go Live!**
   - Share your portfolio
   - Add to your resume
   - Update LinkedIn profile
   - Submit to job applications

## 🆘 Troubleshooting

### Common Issues

**Build Fails**
- Check for TypeScript errors
- Ensure all imports are correct
- Verify environment variables

**Images Not Loading**
- Check file paths
- Ensure images are in public directory
- Verify file extensions

**Routing Issues**
- Configure redirects for SPA
- Check `vercel.json` or `netlify.toml`

**Performance Issues**
- Optimize images
- Enable compression
- Use CDN for assets

---

**Need Help?** Check the main README.md or create an issue in the repository!
