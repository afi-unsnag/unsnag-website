// Loads shared nav and footer components
// Usage: add <script src="/components/load-components.js" defer></script> to any page
// Place <div id="nav-placeholder"></div> where the nav should go
// Place <div id="footer-placeholder"></div> where the footer should go

(function() {
  function loadComponent(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(r => r.text())
      .then(html => {
        el.outerHTML = html;
        // Re-init mobile menu if nav was loaded
        if (id === 'nav-placeholder') initMobileMenu();
      })
      .catch(() => {
        // Fallback: try relative path for subfolders like /blog/
        const altUrl = url.startsWith('/') ? '..' + url : url;
        fetch(altUrl)
          .then(r => r.text())
          .then(html => {
            el.outerHTML = html;
            if (id === 'nav-placeholder') initMobileMenu();
          });
      });
  }

  function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mobileNav');
    const close = document.getElementById('mobileNavClose');
    if (btn && nav) {
      btn.addEventListener('click', () => nav.classList.add('open'));
    }
    if (close && nav) {
      close.addEventListener('click', () => nav.classList.remove('open'));
    }
  }

  loadComponent('nav-placeholder', '/components/nav.html');
  loadComponent('footer-placeholder', '/components/footer.html');
})();
