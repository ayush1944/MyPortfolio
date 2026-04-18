const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06]" style={{ background: 'var(--color-bg)' }}>
      <div className="container-custom py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs tracking-wide text-muted">
          Ayush Pal © {year}
        </p>
        <p className="font-mono text-xs tracking-wide text-muted">
          Built with React + Vite
        </p>
      </div>
    </footer>
  );
};

export default Footer;
