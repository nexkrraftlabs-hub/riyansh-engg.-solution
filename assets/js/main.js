/* ============================================================
   RIYANSH ENGINEERING SOLUTION - JAVASCRIPT
   Features: Sticky Navbar, Mobile Drawer, Accordions, 
   Counter Animation, Product Filters, Scroll Effects
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------
     1. STICKY HEADER SCROLL EFFECT
  ---------------------------------------- */
  const siteHeader = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    if (siteHeader) {
      if (currentScrollY > 60) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ----------------------------------------
     2. MOBILE NAVIGATION DRAWER
  ---------------------------------------- */
  const mobileToggleBtn = document.getElementById('mobileNavToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');

  function openMobileNav() {
    if (mobileNavDrawer && mobileNavBackdrop) {
      mobileNavDrawer.classList.add('active');
      mobileNavBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMobileNav() {
    if (mobileNavDrawer && mobileNavBackdrop) {
      mobileNavDrawer.classList.remove('active');
      mobileNavBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileNav);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMobileNav);
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileNav);

  /* ----------------------------------------
     3. MOBILE ACCORDION (Service Dropdowns)
  ---------------------------------------- */
  const accordionToggles = document.querySelectorAll('.mobile-accordion-toggle');
  accordionToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const panel = this.closest('.mobile-nav-item').querySelector('.mobile-accordion-panel');
      const icon = this.querySelector('i');
      if (panel) {
        panel.classList.toggle('open');
        if (icon) {
          icon.style.transform = panel.classList.contains('open') ? 'rotate(180deg)' : '';
        }
      }
    });
  });

  /* ----------------------------------------
     4. PRODUCT CATEGORY FILTER
  ---------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      const selectedCategory = this.getAttribute('data-filter');

      productCards.forEach(function (card) {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ----------------------------------------
     5. ANIMATED COUNTER (Stats Bar)
  ---------------------------------------- */
  const counters = document.querySelectorAll('.counter-anim');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    counters.forEach(function (counter) {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 2000;
      const step = Math.ceil(target / (duration / 30));
      let current = 0;

      const interval = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        counter.textContent = current + (counter.getAttribute('data-suffix') || '');
      }, 30);
    });
    countersStarted = true;
  }

  /* Intersection Observer for Counter */
  const statsSection = document.querySelector('.stats-counter-bar');
  if (statsSection && counters.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(statsSection);
  }

  /* ----------------------------------------
     6. SCROLL REVEAL ANIMATION
  ---------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ----------------------------------------
     7. ACTIVE NAV LINK (Current Page)
  ---------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .sidebar-menu-list a');
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href === currentPath) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------
     8. SMOOTH SCROLL FOR ANCHOR LINKS
  ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 100;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
        closeMobileNav();
      }
    });
  });

  /* ----------------------------------------
     9. CONTACT FORM SUBMISSION (Demo)
  ---------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      setTimeout(function () {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        submitBtn.style.background = '#16a34a';
        setTimeout(function () {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  /* ----------------------------------------
     10. BACK TO TOP BUTTON
  ---------------------------------------- */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------
     11. FAQ ACCORDION TOGGLE
  ---------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', function () {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('active');
          const answer = item.querySelector('.faq-answer');
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        }
      });
    }
  });

  /* ----------------------------------------
     12. REVIEWS SLIDER (Automatic & Manual)
  ---------------------------------------- */
  const reviewsSliderWrap = document.getElementById('reviewsSliderWrap');
  const reviewsTrack = document.getElementById('reviewsTrack');
  const reviewsPrevBtn = document.getElementById('reviewsPrevBtn');
  const reviewsNextBtn = document.getElementById('reviewsNextBtn');
  const reviewsDotsContainer = document.getElementById('reviewsDots');

  if (reviewsSliderWrap && reviewsTrack) {
    const cards = reviewsTrack.querySelectorAll('.review-card-item');
    let currentIndex = 0;
    let autoPlayTimer = null;
    let isPaused = false;
    const autoPlayDelay = 3800; // 3.8s interval

    function getCardsPerView() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 991) return 2;
      return 3;
    }

    function getMaxIndex() {
      const perView = getCardsPerView();
      return Math.max(0, cards.length - perView);
    }

    function createDots() {
      if (!reviewsDotsContainer) return;
      reviewsDotsContainer.innerHTML = '';
      const maxIdx = getMaxIndex();
      for (let i = 0; i <= maxIdx; i++) {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (i === currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to review slide ' + (i + 1));
        dot.setAttribute('type', 'button');
        dot.addEventListener('click', function () {
          goToSlide(i);
          resetAutoPlay();
        });
        reviewsDotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      if (!reviewsDotsContainer) return;
      const dots = reviewsDotsContainer.querySelectorAll('.slider-dot');
      dots.forEach(function (dot, i) {
        if (i === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function goToSlide(index) {
      const maxIdx = getMaxIndex();
      if (index < 0) {
        currentIndex = maxIdx;
      } else if (index > maxIdx) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      if (cards.length > 0) {
        const cardWidth = cards[0].offsetWidth;
        const computedStyle = window.getComputedStyle(cards[0]);
        const marginRight = parseFloat(computedStyle.marginRight) || 0;
        const offset = currentIndex * (cardWidth + marginRight);
        reviewsTrack.style.transform = 'translateX(-' + offset + 'px)';
      }

      updateDots();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Navigation buttons
    if (reviewsNextBtn) {
      reviewsNextBtn.addEventListener('click', function () {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (reviewsPrevBtn) {
      reviewsPrevBtn.addEventListener('click', function () {
        prevSlide();
        resetAutoPlay();
      });
    }

    // Auto-play
    function startAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(function () {
        if (!isPaused) {
          nextSlide();
        }
      }, autoPlayDelay);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Pause on hover
    reviewsSliderWrap.addEventListener('mouseenter', function () {
      isPaused = true;
    });

    reviewsSliderWrap.addEventListener('mouseleave', function () {
      isPaused = false;
    });

    // Touch Swipe support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    reviewsSliderWrap.addEventListener('touchstart', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
        isPaused = true;
      }
    }, { passive: true });

    reviewsSliderWrap.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].screenX;
        isPaused = false;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          resetAutoPlay();
        }
      }
    }, { passive: true });

    // Keyboard navigation
    reviewsSliderWrap.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoPlay();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoPlay();
      }
    });

    // Window Resize Handling
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        createDots();
        goToSlide(Math.min(currentIndex, getMaxIndex()));
      }, 100);
    });

    // Initialize
    createDots();
    goToSlide(0);
    startAutoPlay();
  }

  /* ----------------------------------------
     13. HERO SECTION IMAGE SLIDER (Automatic & Manual)
  ---------------------------------------- */
  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    const track = heroSlider.querySelector('.hero-slider-track');
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    const dots = heroSlider.querySelectorAll('.hero-dot');
    const totalSlides = slides.length;

    let currentHeroIndex = 0;
    let heroAutoPlayTimer = null;
    let isHeroPaused = false;
    const heroInterval = 4500; // 4.5 seconds

    function updateHeroSlide(index) {
      if (index < 0) {
        currentHeroIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentHeroIndex = 0;
      } else {
        currentHeroIndex = index;
      }

      if (track) {
        track.style.transform = 'translateX(-' + (currentHeroIndex * 100) + '%)';
      }

      slides.forEach(function (slide, i) {
        if (i === currentHeroIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      dots.forEach(function (dot, i) {
        if (i === currentHeroIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function nextHeroSlide() {
      updateHeroSlide(currentHeroIndex + 1);
    }

    function prevHeroSlide() {
      updateHeroSlide(currentHeroIndex - 1);
    }

    function startHeroAutoPlay() {
      stopHeroAutoPlay();
      heroAutoPlayTimer = setInterval(function () {
        if (!isHeroPaused) {
          nextHeroSlide();
        }
      }, heroInterval);
    }

    function stopHeroAutoPlay() {
      if (heroAutoPlayTimer) {
        clearInterval(heroAutoPlayTimer);
        heroAutoPlayTimer = null;
      }
    }

    function resetHeroAutoPlay() {
      startHeroAutoPlay();
    }

    // Navigation buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextHeroSlide();
        resetHeroAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevHeroSlide();
        resetHeroAutoPlay();
      });
    }

    // Dot indicators
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        updateHeroSlide(i);
        resetHeroAutoPlay();
      });
    });

    // Pause on hover
    heroSlider.addEventListener('mouseenter', function () {
      isHeroPaused = true;
    });

    heroSlider.addEventListener('mouseleave', function () {
      isHeroPaused = false;
    });

    // Touch swipe support for Mobile / Tablet
    let heroTouchStartX = 0;
    let heroTouchEndX = 0;

    heroSlider.addEventListener('touchstart', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        heroTouchStartX = e.changedTouches[0].screenX;
        isHeroPaused = true;
      }
    }, { passive: true });

    heroSlider.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        heroTouchEndX = e.changedTouches[0].screenX;
        isHeroPaused = false;
        var diff = heroTouchStartX - heroTouchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            nextHeroSlide();
          } else {
            prevHeroSlide();
          }
          resetHeroAutoPlay();
        }
      }
    }, { passive: true });

    // Initialize
    updateHeroSlide(0);
    startHeroAutoPlay();
  }

});
