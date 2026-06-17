function injectLifeTransitionStyle() {
  if (document.getElementById('life-transition-ghost-fix')) return;

  const style = document.createElement('style');
  style.id = 'life-transition-ghost-fix';
  style.textContent = `
    #life > div {
      isolation: isolate;
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
    const containerRect = container.getBoundingClientRect();
    const lifeRect = life.getBoundingClientRect();
    const lifeStart = container.scrollTop + lifeRect.top - containerRect.top;
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
