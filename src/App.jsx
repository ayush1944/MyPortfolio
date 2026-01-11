import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./components/ui/Toast";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <div className="min-h-screen font-Ubuntu bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden relative">
            <Navbar />

            {/* Content Container */}
            <main id="main-content" role="main">
              <Hero />
              <About />
              <TechStack />
              <Projects />
              {/* <Blog /> */}
              <Resume />
              <Contact />
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
