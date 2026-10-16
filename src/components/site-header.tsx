export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="navbar">
        <a className="wordmark" href="#main-content" aria-label="GT3 Studio home">
          <span className="wordmark-mark" aria-hidden="true">G</span>
          <span>GT3 <span className="wordmark-light">STUDIO</span></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#exterior">Exterior</a>
          <a href="#performance">Performance</a>
          <a href="#interior">Interior</a>
        </nav>
        <a className="header-link" href="#collection">Explore <span aria-hidden="true">↗</span></a>
      </header>
    </>
  );
}
