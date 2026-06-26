/**
 * Mrunali Patil Portfolio — Creative Edition
 * script.js — All interactions + animations
 */

document.addEventListener('DOMContentLoaded', () => {

  // ══════════════════════════════════════════════════
  // 1. HEADER SCROLL EFFECT
  // ══════════════════════════════════════════════════
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ══════════════════════════════════════════════════
  // 2. MOBILE NAV TOGGLE
  // ══════════════════════════════════════════════════
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');
  const toggleIcon = navToggle.querySelector('i');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleIcon.className = 'fa-solid fa-bars-staggered';
    });
  });

  // ══════════════════════════════════════════════════
  // 3. SCROLL SPY — ACTIVE NAV LINK
  // ══════════════════════════════════════════════════
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    let current = 'home';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 130) {
        current = sec.getAttribute('id');
      }
    });
    allNavLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // ══════════════════════════════════════════════════
  // 4. FADE-UP REVEAL ON SCROLL
  // ══════════════════════════════════════════════════
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings inside the same parent slightly
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 60 * (Array.from(entry.target.parentNode.children).indexOf(entry.target) % 5));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ══════════════════════════════════════════════════
  // 5. PROJECT CARD FILTERING
  // ══════════════════════════════════════════════════
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projCards   = document.querySelectorAll('.proj-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(14px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }
      });
    });
  });

  // ══════════════════════════════════════════════════
  // 6. SKILL BAR ANIMATION
  // ══════════════════════════════════════════════════
  const skillSection = document.getElementById('skills');
  const skillBars    = document.querySelectorAll('.skill-bar-fill');
  let skillsAnimated = false;

  const skillObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !skillsAnimated) {
      skillBars.forEach(bar => { bar.style.width = bar.dataset.width; });
      skillsAnimated = true;
      skillObserver.unobserve(skillSection);
    }
  }, { threshold: 0.15 });

  if (skillSection) skillObserver.observe(skillSection);

  // ══════════════════════════════════════════════════
  // 7. STATS COUNTER
  // ══════════════════════════════════════════════════
  const statsGrid  = document.querySelector('.stats-row');
  const statNums   = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statNums.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const step   = Math.max(1, Math.ceil(target / 40));
        let current  = 0;
        const timer  = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + '+';
          if (current >= target) clearInterval(timer);
        }, 40);
      });
      statsAnimated = true;
      statsObserver.unobserve(statsGrid);
    }
  }, { threshold: 0.2 });

  if (statsGrid) statsObserver.observe(statsGrid);

  // ══════════════════════════════════════════════════
  // 8. CERTIFICATE LIGHTBOX
  // ══════════════════════════════════════════════════
  const modal      = document.getElementById('cert-modal');
  const modalImg   = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.btn-view-cert').forEach(btn => {
    btn.addEventListener('click', () => {
      modalImg.src        = btn.dataset.src;
      modalTitle.textContent = btn.dataset.title;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { modalImg.src = ''; }, 300);
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ══════════════════════════════════════════════════
  // 9. CONTACT FORM
  // ══════════════════════════════════════════════════
  const form    = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  const formBtn = document.getElementById('form-btn');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name    = document.getElementById('c-name').value.trim();
      const email   = document.getElementById('c-email').value.trim();
      const subject = document.getElementById('c-subject').value.trim();
      const message = document.getElementById('c-message').value.trim();

      if (!name || !email || !subject || !message) {
        showMsg('Please fill in all fields before sending.', 'error');
        return;
      }

      const prev = formBtn.innerHTML;
      formBtn.disabled = true;
      formBtn.innerHTML = 'Sending… <i class="fa-solid fa-spinner fa-spin"></i>';

      setTimeout(() => {
        form.reset();
        formBtn.disabled = false;
        formBtn.innerHTML = prev;
        showMsg('✓ Message ready! Your mail app will open now.', 'success');

        const recipient = 'mrunalipatil9650@gmail.com';
        const sub = encodeURIComponent(`[Portfolio] ${subject}`);
        const body = encodeURIComponent(
          `Hi Mrunali,\n\nYou received a message from your portfolio:\n\nName: ${name}\nEmail: ${email}\n\n${message}\n\n— ${name}`
        );
        window.location.href = `mailto:${recipient}?subject=${sub}&body=${body}`;
      }, 900);
    });
  }

  function showMsg(text, type) {
    formMsg.textContent  = text;
    formMsg.className    = `form-msg ${type}`;
    setTimeout(() => { formMsg.className = 'form-msg'; formMsg.textContent = ''; }, 6000);
  }

});
