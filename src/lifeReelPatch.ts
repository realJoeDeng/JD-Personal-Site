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
      width: min(560px, 43vw) !important;
      height: auto !important;
      aspect-ratio: 16 / 9 !important;
      max-height: none !important;
      background: rgba(4, 9, 14, .78) !important;
    }
    .life-reel-frame-bg { display: none !important; }
    .life-reel-frame-main {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      object-position: center center !important;
      transform: none !important;
    }
    .life-reel-frame[data-offset="0"] {
      transform: translate(-50%,-50%) translateY(-8px) scale(1.04) !important;
    }
    .life-reel-frame[data-offset="1"] {
      transform: translate(-50%,-50%) translateX(410px) translateY(14px) scale(.76) !important;
    }
    .life-reel-frame[data-offset="-1"] {
      transform: translate(-50%,-50%) translateX(-390px) translateY(20px) scale(.74) !important;
    }
    .life-reel-frame[data-offset="2"] {
      transform: translate(-50%,-50%) translateX(700px) translateY(32px) scale(.54) !important;
    }
    .life-reel-frame[data-offset="-2"] {
      transform: translate(-50%,-50%) translateX(-660px) translateY(38px) scale(.52) !important;
    }
    @media (max-width: 1280px) {
      .life-reel-frame,
      .life-reel-frame[data-shape] {
        width: min(470px, 41vw) !important;
        aspect-ratio: 16 / 9 !important;
      }
      .life-reel-frame[data-offset="1"] {
        transform: translate(-50%,-50%) translateX(320px) translateY(12px) scale(.70) !important;
      }
      .life-reel-frame[data-offset="-1"] {
        transform: translate(-50%,-50%) translateX(-305px) translateY(18px) scale(.68) !important;
      }
    }
    @media (max-width: 900px) {
      .life-reel-frame,
      .life-reel-frame[data-shape] {
        width: min(540px, 78vw) !important;
        aspect-ratio: 16 / 9 !important;
      }
      .life-reel-frame[data-offset="1"] {
        transform: translate(-50%,-50%) translateX(190px) scale(.66) !important;
      }
      .life-reel-frame[data-offset="-1"] {
        transform: translate(-50%,-50%) translateX(-190px) scale(.66) !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function fitLifeReelFrames() {
  injectLifeReelStyle();
  document.querySelectorAll<HTMLElement>('.life-reel-frame').forEach((frame) => {
    frame.style.setProperty('--life-frame-ratio', '16 / 9');
    frame.style.setProperty('--life-frame-width', '560px');
    frame.dataset.originalAspectApplied = 'true';
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
