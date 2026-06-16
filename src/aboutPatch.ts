import chunk0 from './aboutImageChunk0';
import chunk1 from './aboutImageChunk1';
import chunk2 from './aboutImageChunk2';
import chunk3 from './aboutImageChunk3';
import chunk4 from './aboutImageChunk4';
import chunk5 from './aboutImageChunk5';

const ABOUT_IMAGE_DATA = `data:image/webp;base64,${chunk0}${chunk1}${chunk2}${chunk3}${chunk4}${chunk5}`;

function applyAboutPatch() {
  const about = document.getElementById('about');
  if (!about) return;

  const directChildren = Array.from(about.children).filter(
    (node): node is HTMLElement => node instanceof HTMLElement,
  );
  const pageOne = directChildren.find(
    (node) => node.classList.contains('relative') && Boolean(node.querySelector('h2')),
  );
  const pageTwo = directChildren.find(
    (node) => node.classList.contains('relative') && Boolean(node.querySelector('h3')),
  );

  if (pageTwo) {
    pageTwo.style.display = 'none';
    pageTwo.setAttribute('aria-hidden', 'true');
  }

  about.style.minHeight = '100vh';
  about.style.height = 'auto';
  if (!pageOne) return;

  const desktop = window.innerWidth >= 768;
  const compact = desktop && window.innerHeight < 820;

  pageOne.style.minHeight = desktop ? '100vh' : 'auto';
  pageOne.style.paddingTop = desktop ? (compact ? '52px' : '72px') : '72px';
  pageOne.style.paddingBottom = desktop ? (compact ? '36px' : '56px') : '72px';

  const heading = pageOne.querySelector('h2') as HTMLElement | null;
  if (heading) {
    heading.style.marginBottom = compact ? '18px' : '26px';
    if (compact) heading.style.fontSize = '2.45rem';
  }

  const grid = pageOne.querySelector('.grid') as HTMLElement | null;
  if (grid) {
    grid.style.gridTemplateColumns = desktop
      ? 'minmax(0,1.22fr) minmax(290px,.78fr)'
      : '1fr';
    grid.style.columnGap = compact ? '32px' : '48px';
    grid.style.rowGap = '28px';
    grid.style.alignItems = 'center';
  }

  const intro = about.querySelector('p.whitespace-pre-line') as HTMLElement | null;
  if (intro) {
    intro.style.fontSize = desktop ? (compact ? '14px' : '15.5px') : '15px';
    intro.style.lineHeight = desktop ? (compact ? '1.52' : '1.62') : '1.68';
    intro.style.maxWidth = 'none';
  }

  const image = pageOne.querySelector(
    'img[alt="Financial analysis workspace"], img[alt="Joe Deng with Hamburger in the park"]',
  ) as HTMLImageElement | null;
  if (!image) return;

  if (image.src !== ABOUT_IMAGE_DATA) image.src = ABOUT_IMAGE_DATA;
  image.alt = 'Joe Deng with Hamburger in the park';
  image.style.objectFit = 'cover';
  image.style.objectPosition = 'center center';

  const frame = image.parentElement as HTMLElement | null;
  if (!frame) return;

  frame.style.width = '100%';
  frame.style.maxWidth = compact ? '330px' : '390px';
  frame.style.minHeight = '0';
  frame.style.height = 'auto';
  frame.style.aspectRatio = '2 / 3';
  frame.style.justifySelf = desktop ? 'end' : 'center';

  const caption = frame.querySelector('.left-7.bottom-7.right-7') as HTMLElement | null;
  if (caption) caption.style.display = 'none';

  const overlays = Array.from(frame.children).filter(
    (element) => element !== image,
  ) as HTMLElement[];
  if (overlays[0]) overlays[0].style.opacity = '0.08';
}

function scheduleAboutPatch() {
  window.setTimeout(applyAboutPatch, 80);
  window.setTimeout(applyAboutPatch, 260);
  window.setTimeout(applyAboutPatch, 620);
}

window.addEventListener('load', () => {
  let attempts = 0;
  const timer = window.setInterval(() => {
    applyAboutPatch();
    attempts += 1;
    if (attempts >= 24) window.clearInterval(timer);
  }, 250);
});

document.addEventListener('click', scheduleAboutPatch, true);
window.addEventListener('resize', scheduleAboutPatch);

export {};
