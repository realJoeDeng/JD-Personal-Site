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

function fitLifeReelFrames() {
  injectLifeReelStyle();

  const viewportWidth = window.innerWidth;
  const maxWidth = viewportWidth <= 900
    ? Math.min(540, viewportWidth * 0.78)
    : viewportWidth <= 1280
      ? Math.min(470, viewportWidth * 0.41)
      : Math.min(560, viewportWidth * 0.43);

  document.querySelectorAll<HTMLElement>('.life-reel-frame').forEach((frame) => {
    const image = frame.querySelector<HTMLImageElement>('.life-reel-frame-main');
    if (!image) return;

    const applyOriginalRatio = () => {
      if (!image.naturalWidth || !image.naturalHeight) return;

      const ratio = image.naturalWidth / image.naturalHeight;
      const idealHeight = viewportWidth <= 900 ? 250 : viewportWidth <= 1280 ? 285 : 315;
      const naturalWidth = idealHeight * ratio;
      const width = Math.min(maxWidth, naturalWidth);
      const height = width / ratio;

      frame.style.setProperty('--life-frame-width', `${Math.round(width)}px`);
      frame.style.setProperty('--life-frame-height', `${Math.round(height)}px`);
      frame.dataset.originalAspectApplied = 'true';
    };

    if (image.complete) applyOriginalRatio();
    image.addEventListener('load', applyOriginalRatio, { once: true });
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
