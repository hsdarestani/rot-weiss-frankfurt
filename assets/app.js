const header = document.querySelector('[data-header]');
const progressBar = document.querySelector('.page-progress span');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const backToTop = document.querySelector('[data-back-to-top]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const updateScrollState = () => {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? scrollTop / scrollable : 0;

  header?.classList.toggle('is-scrolled', scrollTop > 36);
  if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
};

updateScrollState();
window.addEventListener('scroll', updateScrollState, { passive: true });

const setMenuState = (open) => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('.sr-only').textContent = open ? 'Menü schließen' : 'Menü öffnen';
  mobileMenu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
};

menuToggle?.addEventListener('click', () => {
  setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuState(false);
});

const revealItems = document.querySelectorAll('[data-reveal]');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px' },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    revealObserver.observe(item);
  });
}

const heroVisual = document.querySelector('[data-hero-visual]');
if (heroVisual && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroVisual.style.transform = `perspective(1100px) rotateY(${x * 3.8}deg) rotateX(${y * -3.8}deg)`;
  });

  heroVisual.addEventListener('pointerleave', () => {
    heroVisual.style.transform = '';
  });
}

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
