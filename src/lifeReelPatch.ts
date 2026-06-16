import asset01 from './lifeAsset01';
import asset03 from './lifeAsset03';
import asset04 from './lifeAsset04';
import asset05 from './lifeAsset05';
import asset06 from './lifeAsset06';

type ReelSource = {
  src?: string;
  width?: number;
  height?: number;
};

const ORIGINAL_SOURCES: ReelSource[] = [
  { src: asset01, width: 2048, height: 1148 },
  {},
  { src: asset03, width: 2048, height: 1149 },
  { src: asset04, width: 2048, height: 1149 },
  { src: asset05, width: 960, height: 720 },
  { src: asset06, width: 2048, height: 1149 },
];

function injectLifeReelStyle() {
  if (document.getElementById('life-reel-original-aspect-style')) return;

  const style = document.createElement('style');
  style.id = 'life-reel-original-aspect-style';
  style.textContent = `
    .life-reel-frame,
    .life-reel-frame[data-shape="wide"],
    .life-reel-frame[data-shape="panorama"],
    .life-reel-frame[data-shape="square"],
    .life-reel-frame[data-shape="portrait"] {
      width: var(--life-frame-width, 560px) !important;
      height: var(--life-frame-height, 315px) !important;
      aspect-ratio: auto !important;
      max-height: none !important;
      background: rgba(4, 9, 14, .78) !important;
    }

    .life-reel-frame-bg {
      display: none !important;
    }

    .life-reel-frame-main {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      object-position: center center !important;
      transform: none !important;
    }

    .life-reel-frame[data-offset="0"] {
      transform: translate(-50%, -50%) translateY(-8px) scale(1) !important;
    }

    .life-reel-frame[data-offset="1"] {
      transform: translate(-50%, -50%) translateX(400px) translateY(14px) scale(.76) !important;
    }

    .life-reel-frame[data-offset="-1"] {
      transform: translate(-50%, -50%) translateX(-380px) translateY(20px) scale(.74) !important;
    }

    .life-reel-frame[data-offset="2"] {
      transform: translate(-50%, -50%) translateX(680px) translateY(32px) scale(.54) !important;
    }

    .life-reel-frame[data-offset="-2"] {
      transform: translate(-50%, -50%) translateX(-640px) translateY(38px) scale(.52) !important;
    }

    @media (max-width: 1280px) {
      .life-reel-frame[data-offset="1"] {
        transform: translate(-50%, -50%) translateX(310px) translateY(12px) scale(.70) !important;
      }

      .life-reel-frame[data-offset="-1"] {
        transform: translate(-50%, -50%) translateX(-295px) translateY(18px) scale(.68) !important;
      }
    }

    @media (max-width: 900px) {
      .life-reel-frame[data-offset="1"] {
        transform: translate(-50%, -50%) translateX(185px) scale(.66) !important;
      }

      .life-reel-frame[data-offset="-1"] {
        transform: translate(-50%, -50%) translateX(-185px) scale(.66) !important;
      }
    }
  `;

  document.head.appendChild(style);
}

function sizeFrame(frame: HTMLElement, source: ReelSource, image: HTMLImageElement) {
  const viewportWidth = window.innerWidth;
  const maxWidth = viewportWidth <= 900
    ? Math.min(540, viewportWidth * 0.78)
    : viewportWidth <= 1280
      ? Math.min(470, viewportWidth * 0.41)
      : Math.min(560, viewportWidth * 0.43);

  const sourceWidth = source.width || image.naturalWidth;
  const sourceHeight = source.height || image.naturalHeight;
  if (!sourceWidth || !sourceHeight) return;

  const ratio = sourceWidth / sourceHeight;
  const idealHeight = viewportWidth <= 900 ? 250 : viewportWidth <= 1280 ? 285 : 315;
  const width = Math.min(maxWidth, idealHeight * ratio);
  const height = width / ratio;

  frame.style.setProperty('--life-frame-width', `${Math.round(width)}px`);
  frame.style.setProperty('--life-frame-height', `${Math.round(height)}px`);
  frame.dataset.originalAspectApplied = 'true';
}

function fitLifeReelFrames() {
  injectLifeReelStyle();

  document.querySelectorAll<HTMLElement>('.life-reel-frame').forEach((frame) => {
    const index = Number(frame.dataset.index);
    const source = ORIGINAL_SOURCES[index] || {};
    const image = frame.querySelector<HTMLImageElement>('.life-reel-frame-main');
    const background = frame.querySelector<HTMLImageElement>('.life-reel-frame-bg');
    if (!image) return;

    if (source.src && image.src !== source.src) {
      image.src = source.src;
      if (background) background.src = source.src;
    }

    if (source.width && source.height) {
      sizeFrame(frame, source, image);
      return;
    }

    const applyLoadedSize = () => sizeFrame(frame, source, image);
    if (image.complete && image.naturalWidth) applyLoadedSize();
    image.addEventListener('load', applyLoadedSize, { once: true });
  });
}

function scheduleLifeReelFit() {
  window.setTimeout(fitLifeReelFrames, 80);
  window.setTimeout(fitLifeReelFrames, 260);
  window.setTimeout(fitLifeReelFrames, 620);
}

window.addEventListener('load', () => {
  let attempts = 0;
  const timer = window.setInterval(() => {
    fitLifeReelFrames();
    attempts += 1;
    if (attempts >= 24) window.clearInterval(timer);
  }, 250);
});

document.addEventListener('click', scheduleLifeReelFit, true);
window.addEventListener('resize', scheduleLifeReelFit);

export {};
