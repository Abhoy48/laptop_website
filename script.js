/**
 * GearVault India — script.js
 * Minimal, performance-focused JavaScript
 * No frameworks. Vanilla JS only.
 */

(function () {
  'use strict';

  /* ============================================================
     1. MOBILE NAV TOGGLE
     ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close nav on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }

  /* ============================================================
     2. SMOOTH SCROLL for anchor links
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = document.querySelector('.site-header')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ============================================================
     3. SCROLL-TRIGGERED FADE-IN ANIMATIONS (IntersectionObserver)
     ============================================================ */
  if ('IntersectionObserver' in window) {
    // Add fade-in class to all laptop cards & sections
    const targets = document.querySelectorAll(
      '.laptop-card, .summary-card, .faq-item, #comparison, #buying-guide'
    );
    targets.forEach(function (el) {
      el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // fire only once
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     4. ACTIVE NAV LINK ON SCROLL (Highlight current section)
     ============================================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  function highlightNavLink() {
    const scrollY = window.scrollY;
    const headerH = document.querySelector('.site-header')?.offsetHeight || 70;

    sections.forEach(function (section) {
      const top    = section.offsetTop - headerH - 20;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  /* ============================================================
     5. STICKY HEADER SHADOW on Scroll
     ============================================================ */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        siteHeader.style.boxShadow = '0 2px 20px rgba(0,0,0,0.12)';
      } else {
        siteHeader.style.boxShadow = '';
      }
    }, { passive: true });
  }

  /* ============================================================
     6. COMPARISON TABLE — HIGHLIGHT ON HOVER (already CSS)
        Extra: add row click to navigate to card
     ============================================================ */
  const tableRows = document.querySelectorAll('.compare-table tbody tr');
  tableRows.forEach(function (row) {
    const anchor = row.querySelector('a');
    if (anchor) {
      row.style.cursor = 'pointer';
      row.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') return; // don't intercept link clicks
        anchor.click();
      });
    }
  });

  /* ============================================================
     7. BACK TO TOP SMOOTH
     ============================================================ */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     8. GOOGLE ADS LAZY INIT (placeholder — uncomment when ready)
     ============================================================ */
  /*
  window.addEventListener('load', function () {
    if (window.adsbygoogle) {
      (adsbygoogle = window.adsbygoogle || []).push({});
    }
  });
  */

  /* ============================================================
     9. PRICE FRESHNESS NOTICE (auto-update "Last checked" date)
     ============================================================ */
  const lastUpdated = document.querySelector('.section-intro');
  if (lastUpdated && lastUpdated.textContent.includes('Last updated')) {
    const now = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dateStr = months[now.getMonth()] + ' ' + now.getFullYear();
    lastUpdated.textContent = lastUpdated.textContent.replace(/Last updated .+$/, 'Last updated ' + dateStr);
  }

  /* ============================================================
     10. AFFILIATE LINK TRACKING (placeholder for GTM / GA4)
     ============================================================ */
  document.querySelectorAll('a[rel*="sponsored"]').forEach(function (link) {
    link.addEventListener('click', function () {
      const label = this.closest('.laptop-card')?.querySelector('.laptop-name')?.textContent || 'unknown';
      // Replace with your GA4 / GTM event call:
      // gtag('event', 'affiliate_click', { laptop: label, destination: this.href });
      console.log('[Affiliate Click]', label, '→', this.href);
    });
  });

  console.log('%c⚡ GearVault India loaded', 'color:#1a56db;font-weight:bold;font-size:14px');

})();
