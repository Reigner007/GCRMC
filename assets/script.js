// ═══════════════════════════════════════════
//  GCRMC — script.js
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  // ── Dynamic year in footer ──
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Navbar: scroll shadow + active link ──
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link tracking
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) link.classList.add('active');
    });

    // Back to top visibility
    const btn = document.getElementById('back-to-top');
    if (btn) {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile menu toggle ──
  const hamburger = document.getElementById('hamburger');
  const mobileLinks = document.getElementById('nav-links');

  if (hamburger && mobileLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    mobileLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        mobileLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Smooth scroll for all anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll reveal ──
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Back to top ──
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

    // ── Registration Form with Formspree ──
  const form = document.getElementById('register-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (form && submitBtn) {

    // Handle form submission (loading state)
    form.addEventListener('submit', function () {
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
      if (formStatus) formStatus.textContent = '';
    });

    // Handle success state when returning from Formspree
    function handleFormSuccess() {
      const urlParams = new URLSearchParams(window.location.search);
      
      if (urlParams.get('success') === 'true') {
        // Hide the form
        form.style.display = 'none';

        // Show success message
        if (formStatus) {
          formStatus.innerHTML = `
            ✅ <strong>Registration Successful!</strong><br><br>
            Thank you! We have received your registration.<br>
            A team member will contact you soon.
          `;
          formStatus.style.display = 'block';
          formStatus.style.color = 'var(--green)';
          formStatus.style.padding = '25px';
          formStatus.style.background = 'var(--green-light)';
          formStatus.style.borderRadius = 'var(--radius-md)';
          formStatus.style.textAlign = 'center';
          formStatus.style.marginTop = '20px';
        }

        // Clean the URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    // Run success check when page loads
    handleFormSuccess();

    // Optional: Reset form when user clicks browser back button
    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        form.reset();
        form.style.display = 'block';
        if (formStatus) formStatus.style.display = 'none';
      }
    });
  }

  // ── Denomination CTA tag ──
  const denomCta = document.querySelector('.denom-tag--cta');
  if (denomCta) {
    denomCta.addEventListener('click', () => {
      const registerSection = document.getElementById('register');
      if (registerSection) {
        const offset = 68;
        const top = registerSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        setTimeout(() => {
          const denomInput = document.getElementById('denomination');
          if (denomInput) {
            denomInput.focus();
            denomInput.style.borderColor = '#2a8b57';
            denomInput.style.boxShadow = '0 0 0 3px rgba(42,139,87,0.2)';
            setTimeout(() => {
              denomInput.style.borderColor = '';
              denomInput.style.boxShadow = '';
            }, 2500);
          }
        }, 700);
      }
    });
  }

});