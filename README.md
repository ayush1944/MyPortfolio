# Full-Stack Developer Portfolio
<img width="1200" height="500" alt="Image" src="https://github.com/user-attachments/assets/a2813b3a-a9fa-43e9-ac70-1867bcdf041f" />

A production-ready personal portfolio built to showcase real-world full-stack engineering skills.  
This project goes beyond static UI — it includes a deployed backend, working contact API, email notifications, and clean frontend architecture.

Live Portfolio: https://ayushpal.me  
Backend API: Deployed & running (private)

---

##  Why This Portfolio Exists

This portfolio is designed to demonstrate **ownership of a complete system**, not just frontend visuals.

It shows:
- Real frontend engineering with React
- A live backend handling form submissions
- Email delivery for contact messages
- Environment-based configuration
- Deployment and debugging in production

This is how real applications work.

---


## Key Features

- **Modern UI** – Clean, professional, recruiter-friendly design
- **Fully Responsive** – Works across desktop, tablet, and mobile
- **Dark / Light Mode** – Theme persistence with system preference detection
- **Animated UI** – Framer Motion based transitions and interactions
- **Accessible** – Semantic HTML, keyboard navigation, proper focus handling
- **Performance-Focused** – Built with Vite for fast builds and loading
- **Production Contact Form** – Real backend + email delivery

---

## Backend Capabilities (Important)

The “Get In Touch” section is **fully functional** and backed by a real API.

### Contact Flow
1. User submits the contact form
2. Frontend validates input
3. Request is sent to backend API
4. Message is stored securely
5. Email notification is sent to owner
6. User receives success / error feedback

This is **not a mock or dummy form**.

---

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons

### Backend
- Node.js
- Express
- REST API
- Email service integration
- Environment-based configuration

### Tooling & Deployment
- Git & GitHub
- Netlify (Frontend)
- Cloud-hosted Backend
- Environment variables for secrets
- Production debugging via DevTools

---

## Project Structure

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

## Customization

### Update Content

src/data/projects.js → Projects
src/data/skills.js → Skills
src/components/Hero.jsx → Name & headline
src/components/About.jsx → Personal summary
src/components/Resume.jsx → Education & experience
src/components/Contact.jsx → Contact behavior
Assets
Place assets in public/:
resume.pdf
Project images in public/projects/

Icons in public/icons/
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


## License

- MIT — feel free to fork, adapt, and build your own version.

## 👋 Author
### Ayush Pal
- Full-Stack Developer (MERN / React / Backend APIs)
- Open to remote roles and startup opportunities
