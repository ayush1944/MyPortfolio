export const projects = [
  {
    id: 1,
    title: "NakliZon",
    description:
      "Built a full-stack e-commerce platform with authentication, payments, and an admin dashboard.",
    highlights: [
      "JWT-based authentication and role-based access",
      "Stripe payment integration",
      "Admin dashboard for product and order management"
    ],
    image: "/projects/naklizon.png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT"],
    githubUrl: "https://github.com/ayush1944/NakliZon",
    liveUrl: "https://nakli-zon-9oup.vercel.app/",
    featured: true,
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Kabutar.io",
    description:
      "A real-time collaboration and project management platform for teams.",
    highlights: [
      "Live collaboration using Socket.io",
      "Secure authentication and user roles",
      "Scalable APIs for tasks and projects"
    ],
    image: "/projects/kabutar.png",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Axios", "Tailwind CSS"],
    githubUrl: "https://github.com/ayush1944/Kabutar",
    liveUrl: "https://kabutar-beta.vercel.app",
    featured: true,
    category: "Full Stack"
  },
  {
    id: 3,
    title: "Perfintra",
    description:
      "A personal finance management app to track expenses and visualize spending.",
    highlights: [
      "Expense tracking and budgeting features",
      "Backend APIs and data modeling",
      "Interactive dashboards with charts"
    ],
    image: "/projects/perfintra.png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Chart.js"],
    githubUrl: "https://github.com/ayush1944/Perfintra",
    liveUrl: "https://perfintra-beta.vercel.app/",
    featured: false,
    category: "Full Stack"
  },
  {
    id: 4,
    title: "Chota Link",
    description:
      "A URL shortening and link management platform with analytics.",
    highlights: [
      "Short URL generation and redirects",
      "JWT-based authentication",
      "Dashboard for managing and tracking links"
    ],
    image: "/projects/chotalink.png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    githubUrl: "https://github.com/ayush1944/ChotaLink",
    liveUrl: "https://chota-link-nwgu.vercel.app/",
    featured: true,
    category: "Full Stack"
  },
  {
    id: 5,
    title: "Weather App",
    description:
      "A frontend weather app fetching real-time data from external APIs.",
    highlights: [
      "API integration with OpenWeatherMap",
      "Error handling and loading states",
      "Responsive UI with vanilla JS"
    ],
    image: "/projects/weather.png",
    technologies: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
    githubUrl: "https://github.com/ayush1944/WeatherApp",
    liveUrl: "https://ayush1944.github.io/WeatherApp/",
    featured: false,
    category: "Frontend"
  },
  {
    id: 6,
    title: "Indian Premier League",
    description:
      "An interactive frontend application for IPL fans.",
    highlights: [
      "Smooth animations using GSAP",
      "Vanilla JavaScript frontend logic",
      "Focus on UX and performance"
    ],
    image: "/projects/ipl.png",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
    githubUrl: "https://github.com/ayush1944/IPL",
    liveUrl: "https://ayush1944.github.io/IPL/",
    featured: false,
    category: "Frontend"
  }
];

export const projectCategories = ["All", "Full Stack", "Frontend", "Backend"];