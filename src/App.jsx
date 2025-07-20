import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './components/ui/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import CustomCursor from './components/ui/CustomCursor';
import PageTransition, { useSmoothTransition } from './components/effects/PageTransition';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { isTransitioning, triggerTransition } = useSmoothTransition();

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden relative">
  <CustomCursor />
  <PageTransition
    isTransitioning={isTransitioning}
    onComplete={() => console.log('Transition complete')}
  />
  <Navbar />

  {/* Content Container */}
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <main id="main-content" role="main">
      <Hero />
      <About />
      <TechStack />
      <Projects />
      {/* <Blog /> */}
      <Resume />
      <Contact />
    </main>
  </div>

  <Footer />
</div>

        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
