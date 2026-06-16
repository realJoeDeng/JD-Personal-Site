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
      width: min(var(--life-frame-width, 540px), 42vw) !important;
      height: auto !important;
      aspect-ratio: var(--life-frame-ratio, 16 / 9) !important;
      max-height: 68vh !important;
      background: rgba(4, 9, 14, .72) !important;
    }
    .life-reel-frame-bg { display: none !important; }
    .life-reel-frame-main {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      object-position: center center !important;
      transform: none !important;
    }
    .life-reel-frame[data-offset="0"] {
      transform: translate(-50%,-50%) translateY(-8px) scale(1.04) !important;
    }
    .life-reel-frame[data-offset="1"] {
      transform: translate(-50%,-50%) translateX(390px) translateY(14px) scale(.78) !important;
    }
    .life-reel-frame[data-offset="-1"] {
      transform: translate(-50%,-50%) translateX(-370px) translateY(20px) scale(.76) !important;
    }
    .life-reel-frame[data-offset="2"] {
      transform: translate(-50%,-50%) translateX(680px) translateY(32px) scale(.56) !important;
    }
    .life-reel-frame[data-offset="-2"] {
      transform: translate(-50%,-50%) translateX(-640px) translateY(38px) scale(.54) !important;
    }
    @media (max-width: 1280px) {
      .life-reel-frame,
      .life-reel-frame[data-shape] {
        width: min(var(--life-frame-width, 460px), 40vw) !important;
      }
      .life-reel-frame[data-offset="1"] {
        transform: translate(-50%,-50%) translateX(310px) translateY(12px) scale(.72) !important;
      }
      .life-reel-frame[data-offset="-1"] {
        transform: translate(-50%,-50%) translateX(-295px) translateY(18px) scale(.70) !important;
      }
    }
    @media (max-width: 900px) {
      .life-reel-frame,
      .life-reel-frame[data-shape] {
        width: min(var(--life-frame-width, 540px), 76vw) !important;
        max-height: 38vh !important;
      }
      .life-reel-frame[data-offset="1"] {
        transform: translate(-50%,-50%) translateX(185px) scale(.68) !important;
      }
      .life-reel-frame[data-offset="-1"] {
        transform: translate(-50%,-50%) translateX(-185px) scale(.68) !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function fitLifeReelFrames() {
  injectLifeReelStyle();
  document.querySelectorAll<HTMLElement>('.life-reel-frame').forEach((frame) => {
    const image = frame.querySelector<HTMLImageElement>('.life-reel-frame-main');
    if (!image) return;

    const applyRatio = () => {
      if (!image.naturalWidth || !image.naturalHeight) return;
      const ratio = image.naturalWidth / image.naturalHeight;
      frame.style.setProperty('--life-frame-ratio', `${image.naturalWidth} / ${image.naturalHeight}`);
      const preferredWidth = Math.max(440, Math.min(580, Math.round(310 * ratio)));
      frame.style.setProperty('--life-frame-width', `${preferredWidth}px`);
      frame.dataset.originalAspectApplied = 'true';
    };

    if (image.complete) applyRatio();
    image.addEventListener('load', applyRatio, { once: true });
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
