# 🚀 Modern Developer Portfolio

A modern, responsive, and feature-rich portfolio website built for Full Stack Developers specializing in the MERN stack. Perfect for showcasing your skills, projects, and attracting remote job opportunities.

<img width="1470" height="804" alt="Image" src="https://github.com/user-attachments/assets/c8e55f56-b568-431c-9bde-ad85bc5ecabb" />

## ✨ Features

- **Modern Design**: Clean, minimal, and professional aesthetic
- **Fully Responsive**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Performance Focused**: Built with Vite for fast loading and development
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

### 🎨 **Advanced Animation Features:**
- ✅ **Unique custom cursor** with smooth animations and hover effects
- ✅ **GSAP-powered floating elements** with interactive hover states
- ✅ **Canvas-based animated backgrounds** with particle systems
- ✅ **Advanced Framer Motion effects** with reveal animations
- ✅ **Smooth scroll animations** with magnetic hover effects
- ✅ **Performance optimized** animations without heavy libraries
- ✅ **Text reveal effects** and stagger animations

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + GSAP
- **Icons**: Lucide React
- **Canvas**: HTML5 Canvas for particle effects
- **Performance**: Optimized with custom hooks and lazy loading
- **Deployment**: Ready for Vercel/Netlify

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── About.jsx       # About section
│   ├── Blog.jsx        # Blog/Articles section
│   ├── Contact.jsx     # Contact form and info
│   ├── Footer.jsx      # Footer component
│   ├── Hero.jsx        # Hero/Landing section
│   ├── Navbar.jsx      # Navigation bar
│   ├── Projects.jsx    # Projects showcase
│   ├── ProjectCard.jsx # Individual project card
│   ├── Resume.jsx      # Resume section
│   └── TechStack.jsx   # Skills and technologies
├── contexts/           # React contexts
│   └── ThemeContext.jsx # Dark/light theme management
├── data/              # Static data
│   ├── blog.js        # Blog posts data
│   ├── projects.js    # Projects data
│   └── skills.js      # Skills and technologies
├── utils/             # Utility functions
│   ├── animations.js  # Framer Motion variants
│   └── validation.js  # Form validation helpers
├── App.jsx           # Main app component
├── index.css         # Global styles and Tailwind imports
└── main.jsx          # React entry point
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MyPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 🎨 Customization

### Personal Information
Update the following files with your information:

1. **src/data/skills.js** - Add your technical skills
2. **src/data/projects.js** - Showcase your projects
3. **src/data/blog.js** - Add your blog posts (optional)
4. **src/components/Hero.jsx** - Update name and tagline
5. **src/components/About.jsx** - Write your personal story
6. **src/components/Resume.jsx** - Add your experience and education
7. **src/components/Contact.jsx** - Update contact information

### Styling
- Colors: Modify `tailwind.config.js` for custom color schemes
- Fonts: Update Google Fonts import in `src/index.css`
- Animations: Customize in `src/utils/animations.js`

### Assets
Add your files to the `public/` directory:
- `resume.pdf` - Your resume file
- `og-image.jpg` - Open Graph image
- Project images in `public/projects/`
- Blog images in `public/blog/`

## 📱 Sections Overview

### 🏠 Hero Section
- Eye-catching introduction
- Call-to-action buttons
- Social media links
- Animated scroll indicator

### 👨‍💻 About Section
- Personal story and background
- Key highlights and values
- Professional statistics
- Skills overview

### 🛠️ Tech Stack
- Interactive skills showcase
- Filterable by category
- Skill level indicators
- MERN stack highlight

### 💼 Projects
- Featured projects section
- Filterable project gallery
- Live demo and GitHub links
- Technology tags

### 📝 Blog (Optional)
- Featured articles
- Recent posts grid
- Placeholder for AI-generated content
- Category filtering

### 📄 Resume
- Downloadable resume
- Experience timeline
- Education and certifications
- Key skills summary

### 📞 Contact
- Contact form with validation
- Contact information
- Social media links
- Success/error handling
