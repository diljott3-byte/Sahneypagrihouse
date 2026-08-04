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
