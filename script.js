(() => {
  const config = window.SAHNEY_SITE || {};
  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-header nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menu.classList.toggle('open', open);
      nav.classList.toggle('open', open);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menu.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      nav.classList.remove('open');
    }));
  }

  document.querySelectorAll('[data-shop-phone]').forEach((item) => {
    item.textContent = config.phoneDisplay || item.textContent;
    if (item.tagName === 'A' && config.phoneRaw) item.href = 'tel:+' + config.phoneRaw;
  });
  document.querySelectorAll('[data-shop-address]').forEach((item) => item.textContent = config.address || item.textContent);
  document.querySelectorAll('[data-shop-map]').forEach((item) => { if (config.mapsUrl) item.href = config.mapsUrl; });
  document.querySelectorAll('[data-wa-message]').forEach((item) => {
    const message = item.getAttribute('data-wa-message') || '';
    if (config.phoneRaw) item.href = 'https://wa.me/' + config.phoneRaw + '?text=' + encodeURIComponent(message);
  });

  const oldFloatingButton = document.querySelector('.floating-whatsapp');
  const quickActions = document.createElement('nav');
  const whatsappHref = 'https://wa.me/' + config.phoneRaw + '?text=' + encodeURIComponent('Hello Sahney Pagri House, I want to make an enquiry.');
  quickActions.className = 'quick-actions';
  quickActions.setAttribute('aria-label', 'Quick contact actions');
  quickActions.innerHTML = `
    <a class="quick-action quick-action-whatsapp" href="${whatsappHref}" target="_blank" rel="noreferrer" aria-label="Enquire on WhatsApp">
      <span class="quick-action-label">WhatsApp</span><span class="quick-action-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2a9 9 0 0 0-7.65 13.75L3 21l5.38-1.3A9 9 0 1 0 12 2Zm0 16.2c-1.2 0-2.37-.3-3.4-.86l-.4-.22-3.1.75.78-3-.25-.42A7.2 7.2 0 1 1 12 18.2Zm4-5.36c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.5.11-.15.22-.57.71-.7.86-.13.15-.26.17-.48.06-.22-.11-.94-.35-1.79-1.1a6.7 6.7 0 0 1-1.24-1.54c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38h-.42c-.15 0-.39.06-.59.28-.2.22-.77.75-.77 1.84 0 1.08.79 2.13.9 2.28.11.15 1.56 2.38 3.78 3.34.53.23.94.36 1.26.46.53.17 1.01.14 1.39.09.42-.06 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.06-.1-.2-.15-.42-.26Z" /></svg></span>
    </a>
    <a class="quick-action quick-action-call" href="tel:+${config.phoneRaw}" aria-label="Call Sahney Pagri House at ${config.phoneDisplay}">
      <span class="quick-action-label">Call shop</span><span class="quick-action-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z" /></svg></span>
    </a>
    <a class="quick-action quick-action-location" href="${config.mapsUrl}" target="_blank" rel="noreferrer" aria-label="Open Sahney Pagri House location in Maps">
      <span class="quick-action-label">Shop location</span><span class="quick-action-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" /></svg></span>
    </a>`;
  document.body.appendChild(quickActions);
  oldFloatingButton?.remove();

  const form = document.querySelector('#whatsapp-enquiry');
  if (form) form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const message = ['Hello Sahney Pagri House, I want to make an enquiry.', 'Name: ' + data.get('name'), 'Phone: ' + data.get('phone'), 'Requirement: ' + data.get('requirement'), 'Occasion: ' + data.get('occasion'), 'Preferred colour: ' + data.get('colour'), 'Details: ' + data.get('message')].join('\n');
    window.open('https://wa.me/' + config.phoneRaw + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  });

  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach((item) => item.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    reveals.forEach((item) => observer.observe(item));
  }
})();
