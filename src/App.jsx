import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './components/ui/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import StarField from './components/StarField';
import Preloader from './components/Preloader';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          {/* Preloader — shows on every page load */}
          {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

          {/* StarField: fixed background canvas, sits behind all page content */}
          <StarField />

          {/* Main layout — transparent so StarField is visible through hero */}
          <div
            className="min-h-screen font-sans overflow-x-hidden relative"
            style={{ color: 'var(--color-ink)' }}
          >
            <CustomCursor />
            <Navbar />
            <main id="main-content" role="main">
              <Hero />
              <About />
              <TechStack />
              <Projects />
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
