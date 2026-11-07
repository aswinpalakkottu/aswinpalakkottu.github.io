const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.querySelector('.theme-label');

function setTheme(theme) {
  body.dataset.theme = theme;
  const dark = theme === 'dark';
  themeIcon.textContent = dark ? '☀' : '☾';
  themeLabel.textContent = dark ? 'Light mode' : 'Dark mode';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem('aswin-portfolio-theme', theme);
}
const savedTheme = localStorage.getItem('aswin-portfolio-theme');
setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeToggle.addEventListener('click', () => setTheme(body.dataset.theme === 'dark' ? 'light' : 'dark'));

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
  menuToggle.textContent = opened ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

const galleryItems = [...document.querySelectorAll('.gallery-item')];
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
let currentImage = 0;
function showImage(index) {
  currentImage = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentImage];
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = item.querySelector('img').alt;
  lightboxCaption.textContent = item.querySelector('span').textContent;
}
function openLightbox(index) {
  showImage(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
galleryItems.forEach((item, index) => item.addEventListener('click', () => openLightbox(index)));
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => showImage(currentImage - 1));
document.getElementById('lightboxNext').addEventListener('click', () => showImage(currentImage + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showImage(currentImage - 1);
  if (event.key === 'ArrowRight') showImage(currentImage + 1);
});
document.getElementById('year').textContent = new Date().getFullYear();
