// ===========================
// NAVBAR SCROLL
// ===========================
const navbar = document.getElementById('navbar');
let lastScrollY = 0;
let ticking = false;

const updateNavbar = () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  ticking = false;
};

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}, { passive: true });

// ===========================
// HAMBURGER / MOBILE MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = isOpen ? '' : 'hidden';

  const spans = hamburger.querySelectorAll('span');
  if (!isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===========================
// SCROLL REVEAL
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

// Add reveal class to target elements
const revealTargets = [
  '.show-item',
  '.release-card',
  '.bio',
  '.members',
  '.band-photo-placeholder',
  '.contact-email',
  '.social-icons',
  '.section-title',
  '.spotify-embed',
  '.contacto-sub',
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
    revealObserver.observe(el);
  });
});

// ===========================
// ACTIVE NAV LINK
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');
const linkMap = new Map();

navLinkEls.forEach(link => {
  linkMap.set(link.getAttribute('href'), link);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      const hash = `#${id}`;
      navLinkEls.forEach(link => {
        const isActive = link.getAttribute('href') === hash;
        link.style.color = isActive ? 'var(--white)' : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// ===========================
// LAZY LOAD BACKGROUND IMAGES
// ===========================
const bgSections = {
  '#shows': 'fondo2.png',
  '#musica': 'fondo3.png',
  '#contacto': 'fondo4.png'
};

const bgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('bg-loaded')) {
      const imageUrl = bgSections[`#${entry.target.id}`];
      
      if (imageUrl) {
        // Preload the image
        const img = new Image();
        img.onload = () => {
          entry.target.classList.add('bg-loaded');
        };
        img.onerror = () => {
          console.warn(`Failed to load background: ${imageUrl}`);
          entry.target.classList.add('bg-loaded'); // Still add class to prevent retry
        };
        img.src = imageUrl;
      }
      
      bgObserver.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '100px' // Start loading 100px before entering viewport
});

// Observe sections that need lazy-loaded backgrounds
Object.keys(bgSections).forEach(selector => {
  const element = document.querySelector(selector);
  if (element) {
    bgObserver.observe(element);
  }
});
