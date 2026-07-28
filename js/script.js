/* SAHNEY PAGRI HOUSE — shared vanilla JavaScript */
(() => {
  'use strict';

  const config = window.SITE_CONFIG || {};
  const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

  const whatsappURL = (message) => `https://wa.me/${config.whatsappRaw || ''}?text=${encodeURIComponent(message)}`;

  function populateBusinessDetails() {
    $$('[data-config]').forEach((element) => {
      const key = element.dataset.config;
      if (Object.prototype.hasOwnProperty.call(config, key)) element.textContent = config[key];
    });

    const links = {
      phone: `tel:+${config.phoneRaw || ''}`,
      whatsapp: whatsappURL(`Hello ${config.businessName || 'SAHNEY PAGRI HOUSE'}, I want to enquire about your collection.`),
      email: `mailto:${config.email || ''}`,
      maps: config.mapsLink,
      instagram: config.instagramLink,
      facebook: config.facebookLink,
      youtube: config.youtubeLink
    };

    $$('[data-link]').forEach((element) => {
      const href = links[element.dataset.link];
      if (href) element.href = href;
    });

    $$('[data-whatsapp-message]').forEach((element) => {
      const message = element.dataset.whatsappMessage || `Hello ${config.businessName || 'SAHNEY PAGRI HOUSE'}, I want to enquire about your collection.`;
      element.href = whatsappURL(message);
    });

    $$('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });
  }

  function enhanceWhatsAppCalls() {
    const iconSVG = `
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M16.05 3.2A12.55 12.55 0 0 0 5.2 22.04L3.5 28.8l6.93-1.62A12.55 12.55 0 1 0 16.05 3.2Zm0 22.85c-1.97 0-3.88-.56-5.52-1.63l-.39-.25-4.11.96 1.01-4-.26-.41a10.26 10.26 0 1 1 9.27 5.33Zm5.63-7.7c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.15-.2.31-.8 1-.98 1.2-.18.21-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.54.16-.18.21-.31.31-.52.1-.2.05-.38-.03-.54-.08-.15-.7-1.67-.95-2.29-.25-.6-.5-.52-.7-.53h-.59c-.2 0-.54.08-.82.38-.28.31-1.08 1.06-1.08 2.58 0 1.52 1.1 2.99 1.26 3.2.15.2 2.17 3.31 5.25 4.64.74.32 1.31.51 1.76.65.74.23 1.41.2 1.94.12.59-.09 1.82-.75 2.08-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.59-.36Z"/>
      </svg>`;

    $$('.floating-whatsapp').forEach((button) => {
      button.classList.add('whatsapp-attractor');
      button.innerHTML = `
        <span class="wa-icon-shell">${iconSVG}</span>
        <span class="wa-attractor-copy">
          <small><i aria-hidden="true"></i> Quick reply available</small>
          <strong>Chat on WhatsApp</strong>
          <em>${escapeHTML(config.whatsappDisplay || '+91 9317681313')}</em>
        </span>
        <span class="wa-attractor-arrow" aria-hidden="true">→</span>`;
      button.setAttribute('aria-label', `Chat with ${config.businessName || 'SAHNEY PAGRI HOUSE'} on WhatsApp at ${config.whatsappDisplay || '+91 9317681313'}`);
    });

    $$('.whatsapp-mini').forEach((button) => {
      button.classList.add('whatsapp-mini-gold');
      button.innerHTML = iconSVG;
    });

    $$('.mobile-action-bar [data-whatsapp-message]').forEach((button) => {
      button.classList.add('mobile-whatsapp-action');
      button.innerHTML = `
        <span class="mobile-wa-icon">${iconSVG}</span>
        <span class="mobile-wa-copy"><strong>WhatsApp</strong><span>Tap to chat now</span></span>`;
      button.setAttribute('aria-label', `Chat on WhatsApp at ${config.whatsappDisplay || '+91 9317681313'}`);
    });
  }

  function injectStructuredData() {
    const pageUrl = `${config.canonicalBase || 'https://www.example.com/'}${location.pathname.split('/').pop() || 'index.html'}`;
    const data = {
      '@context': 'https://schema.org',
      '@type': ['ClothingStore', 'LocalBusiness'],
      name: config.businessName,
      description: 'Premium turban fabrics, wedding pagris, Rajasthani safas, groom accessories, kurta-pajama fabrics and colour-matching assistance in Hoshiarpur, Punjab.',
      url: pageUrl,
      image: `${config.canonicalBase || 'https://www.example.com/'}assets/images/owner-shop.webp`,
      telephone: config.phoneDisplay,
      email: config.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.address,
        addressLocality: 'Hoshiarpur',
        addressRegion: 'Punjab',
        addressCountry: 'IN'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: config.phoneDisplay,
        contactType: 'customer service',
        availableLanguage: ['English', 'Punjabi', 'Hindi']
      },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '10:00',
        closes: '20:30'
      }],
      sameAs: [config.instagramLink, config.facebookLink, config.youtubeLink].filter(Boolean)
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }



  function initShopStatus() {
    const statusLabels = $$('[data-shop-status]');
    const statusWraps = $$('[data-shop-status-wrap]');
    if (!statusLabels.length) return;

    const update = () => {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
      }).formatToParts(new Date());
      const hour = Number(parts.find((part) => part.type === 'hour')?.value || 0);
      const minute = Number(parts.find((part) => part.type === 'minute')?.value || 0);
      const currentMinutes = (hour * 60) + minute;
      const open = currentMinutes >= 600 && currentMinutes < 1230;
      const label = open ? 'Open Now' : 'Closed Now · Opens 10:00 AM';

      statusLabels.forEach((element) => { element.textContent = label; });
      statusWraps.forEach((element) => element.classList.toggle('is-closed', !open));
    };

    update();
    window.setInterval(update, 60000);
  }

  function initNavigation() {
    const header = $('[data-header]');
    const toggle = $('[data-nav-toggle]');
    const nav = $('[data-nav]');
    if (!toggle || !nav) return;

    const closeNav = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    };

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      if (open) $('a', nav)?.focus();
    });
    nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeNav(); });
    document.addEventListener('click', (event) => {
      if (nav.classList.contains('is-open') && !nav.contains(event.target) && !toggle.contains(event.target)) closeNav();
    });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeNav(); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 860) closeNav(); }, { passive: true });

    const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  function initReveals() {
    const elements = $$('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    elements.forEach((element) => observer.observe(element));
  }

  function initHeroSlideshow() {
    const slider = $('[data-hero-slideshow]');
    if (!slider) return;

    const slides = $$('[data-hero-slide]', slider);
    const dots = $$('[data-hero-dot]', slider);
    const previous = $('[data-hero-prev]', slider);
    const next = $('[data-hero-next]', slider);
    if (slides.length < 2) return;

    let index = 0;
    let timer = 0;
    let hasPainted = false;
    const delay = 5200;

    const preloadNext = (nextIndex) => {
      const image = $('img', slides[(nextIndex + slides.length) % slides.length]);
      if (image?.loading === 'lazy') image.loading = 'eager';
    };

    const show = (nextIndex, restart = true) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-current', String(active));
      });
      if (hasPainted) preloadNext(index + 1);
      hasPainted = true;
      if (restart) start();
    };

    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };

    const start = () => {
      stop();
      if (!reducedMotion && !document.hidden) {
        timer = window.setInterval(() => show(index + 1, false), delay);
      }
    };

    previous?.addEventListener('click', () => show(index - 1));
    next?.addEventListener('click', () => show(index + 1));
    dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => show(dotIndex)));

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', (event) => {
      if (!slider.contains(event.relatedTarget)) start();
    });
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

    let touchStartX = 0;
    slider.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });
    slider.addEventListener('touchend', (event) => {
      const touchEndX = event.changedTouches[0]?.clientX || 0;
      const distance = touchEndX - touchStartX;
      if (Math.abs(distance) > 45) show(index + (distance < 0 ? 1 : -1));
    }, { passive: true });

    show(0);
    window.setTimeout(() => preloadNext(1), 1800);
  }



  function initSeasonSalePopup() {
    const popup = $('[data-season-sale-popup]');
    if (!popup) return;
    const closeButton = $('[data-sale-close]', popup);
    let dismissed = false;

    const hidePopup = () => {
      if (dismissed) return;
      dismissed = true;
      popup.classList.add('is-hiding');
      popup.classList.remove('is-visible');
      window.setTimeout(() => { popup.setAttribute('hidden', ''); }, 420);
    };

    popup.removeAttribute('hidden');
    window.requestAnimationFrame(() => popup.classList.add('is-visible'));
    const timer = window.setTimeout(hidePopup, 15000);
    closeButton?.addEventListener('click', (event) => {
      event.preventDefault();
      window.clearTimeout(timer);
      hidePopup();
    });
  }

  function initColourShowcase() {
    const widget = $('[data-colour-showcase]');
    if (!widget) return;
    const stage = $('[data-colour-stage]', widget);
    const name = $('[data-colour-name]', widget);
    const button = $('[data-colour-whatsapp]', widget);
    const selectColour = (swatch) => {
      const colour = swatch.dataset.colour;
      const label = swatch.dataset.label;
      $$('.colour-swatch', widget).forEach((item) => item.classList.toggle('active', item === swatch));
      stage?.style.setProperty('--selected-colour', colour);
      stage?.classList.toggle('light-colour', swatch.dataset.text === 'dark');
      if (name) name.textContent = label;
      if (button) {
        button.href = whatsappURL(`Hello ${config.businessName}, I want to ask about ${label} turban fabric. Please check the available qualities and closest shades.`);
        button.textContent = `Ask for ${label} on WhatsApp`;
      }
    };
    $$('.colour-swatch', widget).forEach((swatch) => swatch.addEventListener('click', () => selectColour(swatch)));
    const initial = $('.colour-swatch.active', widget) || $('.colour-swatch', widget);
    if (initial) selectColour(initial);
  }

  function initTestimonials() {
    const slider = $('[data-testimonials]');
    if (!slider) return;
    const slides = $$('[data-testimonial]', slider);
    const dots = $$('[data-testimonial-dot]', slider);
    if (!slides.length) return;
    let index = 0;
    let timer;
    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    };
    $('[data-testimonial-prev]', slider)?.addEventListener('click', () => show(index - 1));
    $('[data-testimonial-next]', slider)?.addEventListener('click', () => show(index + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    const start = () => {
      if (!reducedMotion && slides.length > 1) timer = window.setInterval(() => show(index + 1), 6500);
    };
    const stop = () => window.clearInterval(timer);
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', start);
    show(0);
    start();
  }

  const colourClass = (name) => `dot-${String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

  function getFocusable(container) {
    return $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', container)
      .filter((element) => !element.hasAttribute('hidden'));
  }

  function openOverlay(overlay, trigger) {
    overlay.dataset.returnFocus = trigger ? 'true' : 'false';
    overlay._returnFocus = trigger || document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    const first = getFocusable(overlay)[0];
    first?.focus();
  }

  function closeOverlay(overlay) {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    overlay._returnFocus?.focus?.();
  }

  function trapOverlayFocus(overlay, event) {
    if (event.key !== 'Tab') return;
    const focusable = getFocusable(overlay);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }

  function initProducts() {
    const grid = $('[data-products-grid]');
    if (!grid) return;
    const search = $('[data-product-search]');
    const category = $('[data-category-filter]');
    const occasion = $('[data-occasion-filter]');
    const colour = $('[data-colour-filter]');
    const resultCount = $('[data-result-count]');
    const clearButton = $('[data-clear-filters]');
    const filterPanel = $('[data-product-filters]');
    const filterToggle = $('[data-filter-toggle]');
    const modal = $('[data-product-modal]');

    const unique = (values) => [...new Set(values.flat().filter(Boolean))].sort((a, b) => a.localeCompare(b));
    const setOptions = (select, values, label) => {
      if (!select) return;
      select.innerHTML = `<option value="">${escapeHTML(label)}</option>${values.map((value) => `<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`).join('')}`;
    };
    setOptions(category, unique(products.map((product) => product.category)), 'All categories');
    setOptions(occasion, unique(products.map((product) => product.occasion)), 'All occasions');
    setOptions(colour, unique(products.map((product) => product.colors)), 'All colours');

    const params = new URLSearchParams(location.search);
    if (category && params.get('category')) category.value = params.get('category');
    if (occasion && params.get('occasion')) occasion.value = params.get('occasion');
    if (colour && params.get('color')) colour.value = params.get('color');

    const cardHTML = (product) => {
      const dots = product.colors.slice(0, 5).map((name) => `<span class="colour-dot ${colourClass(name)}" title="${escapeHTML(name)}"></span>`).join('');
      const message = `Hello ${config.businessName}, I want to enquire about “${product.name}”. Please share available colours, qualities and availability.`;
      return `<article class="product-card reveal is-visible" data-product-id="${escapeHTML(product.id)}">
        <div class="product-image-wrap">
          <img src="${escapeHTML(product.image)}" width="900" height="900" loading="lazy" alt="${escapeHTML(product.alt)}">
          <span class="product-category">${escapeHTML(product.category)}</span>
        </div>
        <div class="product-body">
          <h3>${escapeHTML(product.name)}</h3>
          <p>${escapeHTML(product.summary)}</p>
          <div class="product-meta">
            <span><strong>Suitable for:</strong> ${escapeHTML(product.occasion.join(', '))}</span>
            <span class="colour-dots"><strong>Colours:</strong> ${dots}<span>${escapeHTML(product.colors.slice(0, 3).join(', '))}</span></span>
          </div>
          <div class="product-actions">
            <button class="btn btn-outline btn-sm" type="button" data-view-product="${escapeHTML(product.id)}">View Details</button>
            <a class="btn btn-blue btn-sm" href="${whatsappURL(message)}" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>
          </div>
        </div>
      </article>`;
    };

    const render = () => {
      const term = (search?.value || '').trim().toLowerCase();
      const filtered = products.filter((product) => {
        const haystack = [product.name, product.category, product.summary, product.details, product.colors.join(' '), product.occasion.join(' ')].join(' ').toLowerCase();
        return (!term || haystack.includes(term)) &&
          (!category?.value || product.category === category.value) &&
          (!occasion?.value || product.occasion.includes(occasion.value)) &&
          (!colour?.value || product.colors.includes(colour.value));
      });
      grid.innerHTML = filtered.length ? filtered.map(cardHTML).join('') : '<div class="no-results"><h3>No matching products found</h3><p>Try clearing a filter or send your exact requirement on WhatsApp.</p></div>';
      if (resultCount) resultCount.textContent = `${filtered.length} product${filtered.length === 1 ? '' : 's'} shown`;
    };

    [search, category, occasion, colour].filter(Boolean).forEach((control) => control.addEventListener(control === search ? 'input' : 'change', render));
    clearButton?.addEventListener('click', () => {
      if (search) search.value = '';
      if (category) category.value = '';
      if (occasion) occasion.value = '';
      if (colour) colour.value = '';
      history.replaceState({}, '', location.pathname);
      render();
    });
    filterToggle?.addEventListener('click', () => {
      const open = filterPanel?.classList.toggle('is-open');
      filterToggle.setAttribute('aria-expanded', String(Boolean(open)));
      filterToggle.textContent = open ? 'Hide Product Filters' : 'Show Product Filters';
    });

    const fillModal = (product, trigger) => {
      if (!modal || !product) return;
      const image = $('[data-modal-image]', modal);
      if (image) { image.src = product.image; image.alt = product.alt; }
      $('[data-modal-category]', modal).textContent = product.category;
      $('[data-modal-title]', modal).textContent = product.name;
      $('[data-modal-summary]', modal).textContent = product.details;
      $('[data-modal-material]', modal).textContent = product.material;
      $('[data-modal-use]', modal).textContent = product.recommended;
      $('[data-modal-colours]', modal).textContent = `${product.colors.join(', ')}. Please confirm current stock and the closest physical shade before finalising.`;
      const enquiry = $('[data-modal-whatsapp]', modal);
      if (enquiry) enquiry.href = whatsappURL(`Hello ${config.businessName}, I want details about “${product.name}”. Please share available colours, fabric/accessory details and availability.`);
      openOverlay(modal, trigger);
    };

    grid.addEventListener('click', (event) => {
      const button = event.target.closest('[data-view-product]');
      if (!button) return;
      fillModal(products.find((product) => product.id === button.dataset.viewProduct), button);
    });
    modal?.addEventListener('click', (event) => {
      if (event.target === modal || event.target.closest('[data-modal-close]')) closeOverlay(modal);
    });
    modal?.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeOverlay(modal);
      trapOverlayFocus(modal, event);
    });
    render();
  }

  function initContactForm() {
    const form = $('[data-contact-form]');
    if (!form) return;
    const status = $('[data-form-status]', form);
    const requiredNames = ['name', 'phone', 'requirement', 'occasion', 'preferredColour', 'message'];
    const showError = (name, message) => {
      const field = form.elements[name];
      const error = $(`[data-error-for="${name}"]`, form);
      if (field) field.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (error) error.textContent = message;
    };
    const validate = () => {
      let valid = true;
      requiredNames.forEach((name) => {
        const field = form.elements[name];
        const value = String(field?.value || '').trim();
        const message = value ? '' : 'This field is required.';
        showError(name, message);
        if (message) valid = false;
      });
      const phone = String(form.elements.phone?.value || '').replace(/\D/g, '');
      if (phone && phone.length < 7) { showError('phone', 'Enter a valid phone number.'); valid = false; }
      return valid;
    };
    $$('input, select, textarea', form).forEach((field) => field.addEventListener('input', () => showError(field.name, '')));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validate()) {
        status.textContent = 'Please correct the highlighted fields.';
        status.className = 'form-status error';
        $('[aria-invalid="true"]', form)?.focus();
        return;
      }
      const data = new FormData(form);
      const lines = [
        `Hello ${config.businessName}, I want to make an enquiry.`,
        `Name: ${data.get('name')}`,
        `Phone: ${data.get('phone')}`,
        `Product requirement: ${data.get('requirement')}`,
        `Occasion: ${data.get('occasion')}`,
        `Preferred colour: ${data.get('preferredColour')}`,
        `Event/Wedding date: ${data.get('eventDate') || 'Not provided'}`,
        `Message: ${data.get('message')}`
      ];
      status.textContent = 'Your details are ready. Opening WhatsApp…';
      status.className = 'form-status success';
      window.open(whatsappURL(lines.join('\n')), '_blank', 'noopener,noreferrer');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    populateBusinessDetails();
    enhanceWhatsAppCalls();
    initShopStatus();
    injectStructuredData();
    initNavigation();
    initReveals();
    initHeroSlideshow();
    initSeasonSalePopup();
    initColourShowcase();
    initTestimonials();
    initProducts();
    initContactForm();
  });
})();
