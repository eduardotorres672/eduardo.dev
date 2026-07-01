// Menu overlay (accessible, no inline onclick)
const menuOpenBtn = document.getElementById('menuOpenBtn');
const menuCloseBtn = document.getElementById('menuCloseBtn');
const menuOverlay = document.getElementById('menuOverlay');

function openMenu() {
  menuOverlay.classList.add('open');
  menuOpenBtn.setAttribute('aria-expanded', 'true');
  menuCloseBtn.focus();
}
function closeMenu() {
  menuOverlay.classList.remove('open');
  menuOpenBtn.setAttribute('aria-expanded', 'false');
  menuOpenBtn.focus();
}
menuOpenBtn.addEventListener('click', openMenu);
menuCloseBtn.addEventListener('click', closeMenu);
menuOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOverlay.classList.contains('open')) closeMenu();
});

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }});
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Stagger children in grids
document.querySelectorAll('.proj-grid .proj-card, .proj-grid-3 .proj-card, .tech-grid .tech-icon, .stat-row .stat-box').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
});

// Live local clock (footer)
function updateClock() {
  const el = document.getElementById('localClock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
updateClock();
setInterval(updateClock, 30000);
