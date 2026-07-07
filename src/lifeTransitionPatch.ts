function injectLifeTransitionStyle() {
  if (document.getElementById('life-transition-ghost-fix')) return;

  const style = document.createElement('style');
  style.id = 'life-transition-ghost-fix';
  style.textContent = `
    #life {
      contain: layout paint style;
    }

    #life > div {
      isolation: isolate;
      contain: paint;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }

    #life > div > .absolute.inset-0 {
      will-change: opacity, transform;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }

    #life img {
      backface-visibility: hidden;
    }

    #life[data-life-opening-hidden="true"] > div > :first-child {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }
  `;

  document.head.appendChild(style);
}

function bindLifeTransitionFix() {
  injectLifeTransitionStyle();

  const container = document.querySelector<HTMLElement>('[data-scroll-container]');
  const life = document.getElementById('life');
  if (!container || !life) return;

  const update = () => {
    const lifeStart = life.offsetTop;
    const scrollRange = Math.max(1, life.offsetHeight - container.clientHeight);
    const progress = (container.scrollTop - lifeStart) / scrollRange;

    life.dataset.lifeOpeningHidden = progress >= 0.1 ? 'true' : 'false';
  };

  if (container.dataset.lifeTransitionFixBound !== 'true') {
    container.dataset.lifeTransitionFixBound = 'true';

    let raf = 0;
    container.addEventListener('scroll', () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    }, { passive: true });
  }

  update();
}

function scheduleLifeTransitionFix() {
  window.setTimeout(bindLifeTransitionFix, 80);
  window.setTimeout(bindLifeTransitionFix, 260);
  window.setTimeout(bindLifeTransitionFix, 620);
}

window.addEventListener('load', () => {
  let attempts = 0;
  const timer = window.setInterval(() => {
    bindLifeTransitionFix();
    attempts += 1;
    if (attempts >= 24) window.clearInterval(timer);
  }, 250);
});

window.addEventListener('resize', scheduleLifeTransitionFix);
document.addEventListener('click', scheduleLifeTransitionFix, true);

export {};
