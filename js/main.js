/* =============================================
   AERODROME CONSULTING — MAIN JS
   ============================================= */

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Sticky header
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.service-card, .credential-block, .process-step, .about-card, .about-accreditations, .about-text'
).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Contact form — demo handler (wire to backend / Formspree / Netlify)
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const valid = form.checkValidity();
  if (!valid) {
    form.reportValidity();
    return;
  }
  // Simulate send — replace with real fetch() to your endpoint
  const btn = form.querySelector('[type=submit]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    successMsg.hidden = false;
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 900);
});
