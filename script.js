// ============================================
// ChiPo & To – script.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- NAVBAR scroll effect ----------
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Mobile nav toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    navLinks.classList.contains('open')
      ? spans.forEach((s, i) => {
          if (i === 0) s.style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (i === 1) s.style.opacity = '0';
          if (i === 2) s.style.transform = 'rotate(-45deg) translate(5px, -5px)';
        })
      : spans.forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
  });

  // Close nav when any link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle?.querySelectorAll('span');
      spans?.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // ---------- MENU TABS ----------
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById('panel-' + target);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // ---------- SMOOTH SCROLL for footer menu links ----------
  // When clicking footer Nabídka links, also activate correct tab
  const footerLinks = {
    'footer-langos': 'langos',
    'footer-bowl': 'bowl',
    'footer-kumpir': 'kumpir',
    'footer-toast': 'toast',
    'footer-sauce': 'sauce',
  };
  Object.entries(footerLinks).forEach(([id, tab]) => {
    document.getElementById(id)?.addEventListener('click', () => {
      setTimeout(() => {
        document.querySelector(`[data-tab="${tab}"]`)?.click();
      }, 500);
    });
  });

  // ---------- SCROLL REVEAL animations ----------
  const revealElements = document.querySelectorAll(
    '.menu-card, .why-card, .contact-card, .sauce-card, .gallery-item'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    revealObserver.observe(el);
  });

  // ---------- Active nav link on scroll ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinkEls.forEach(link => {
          link.classList.toggle('active-link', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => sectionObserver.observe(s));

  // ---------- Back to top smooth scroll ----------
  backToTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  console.log('🍗 ChiPo & To web loaded!');
});
