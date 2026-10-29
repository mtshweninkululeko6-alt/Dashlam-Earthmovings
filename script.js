const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

const showPage = (pageId) => {
  pages.forEach((page) => {
    const isActive = page.id === pageId;
    page.classList.toggle('active', isActive);
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${pageId}`;
    link.classList.toggle('active', isActive);
  });

  if (mainNav) {
    mainNav.classList.remove('menu-open');
  }

  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
  }

  const pageName = pageId.charAt(0).toUpperCase() + pageId.slice(1);
  document.title = pageName === 'Home'
    ? 'DASHLAM EARTHMOVING | Your Partner in Earthmoving'
    : `${pageName} | DASHLAM EARTHMOVING`;
};

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;

    event.preventDefault();
    const pageId = targetId.replace('#', '');
    showPage(pageId);
    history.pushState(null, '', targetId);
  });
});

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('menu-open', !expanded);
  });
}

const initialPage = location.hash ? location.hash.replace('#', '') : 'home';
const existingPageIds = Array.from(pages).map((page) => page.id);
showPage(existingPageIds.includes(initialPage) ? initialPage : 'home');

window.addEventListener('hashchange', () => {
  const currentHash = location.hash.replace('#', '');
  if (currentHash && existingPageIds.includes(currentHash)) {
    showPage(currentHash);
  }
});

const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  const playlist = [
    './videos/hero%20(5).mp4',
    './videos/hero.mp4',
    './videos/hero%20(6).mp4',
    './videos/hero%20(4).mp4',
    './videos/hero%20(3).mp4',
  ];
  let currentVideoIndex = 0;

  heroVideo.muted = true;
  heroVideo.addEventListener('ended', () => {
    currentVideoIndex = (currentVideoIndex + 1) % playlist.length;
    heroVideo.src = playlist[currentVideoIndex];
    heroVideo.play().catch(() => {});
  });
  heroVideo.src = playlist[currentVideoIndex];
  heroVideo.load();
  heroVideo.play().catch(() => {});
}
