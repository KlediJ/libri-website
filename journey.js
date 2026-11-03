(() => {
  if (!('IntersectionObserver' in window)) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = [...document.querySelectorAll('.journey-scene')].map(element => ({
    element,
    media: element.querySelector('.journey-media'),
    video: element.querySelector('.journey-animation'),
    images: [...element.querySelectorAll('.journey-still img')],
    toggle: element.querySelector('.journey-toggle'),
    mode: element.querySelector('.journey-mode'),
    expand: element.querySelector('.journey-expand'),
    still: motion.matches,
    paused: false,
    failed: false,
    playingRequest: 0,
    ratio: 0
  }));
  let active = null;
  const sync = scene => {
    const label = scene.video.paused ? 'Play animation' : 'Pause animation';
    scene.toggle.querySelector('.journey-toggle-label').textContent = label;
    scene.toggle.querySelector('.journey-toggle-icon').textContent = scene.video.paused ? '▷' : 'Ⅱ';
    scene.toggle.setAttribute('aria-label', label + ': ' + scene.element.querySelector('h3').textContent);
    scene.mode.textContent = scene.still ? 'View animation' : 'View still';
    scene.mode.hidden = scene.still || scene.failed;
    scene.element.dataset.view = scene.still ? 'still' : 'animation';
    scene.expand.hidden = scene.still || scene.video.hidden;
  };
  const stop = scene => {
    ++scene.playingRequest;
    scene.video.pause();
    sync(scene);
  };
  const showStill = scene => {
    stop(scene);
    scene.still = true;
    scene.video.hidden = true;
    scene.media.classList.remove('motion-ready');
    scene.images.forEach(image => { image.hidden = false; });
    sync(scene);
  };
  const showVideo = scene => {
    if (scene.still || scene.failed) return;
    scene.video.hidden = false;
    scene.images.forEach(image => { image.hidden = true; });
    sync(scene);
  };
  const start = async scene => {
    if (scene.failed) return;
    scenes.forEach(other => { if (other !== scene) stop(other); });
    document.getElementById('launch-film')?.pause();
    active = scene;
    scene.still = false;
    scene.media.classList.add('motion-ready');
    if (!scene.video.getAttribute('src')) scene.video.src = scene.video.dataset.src;
    if (scene.video.readyState >= 2) showVideo(scene);
    const request = ++scene.playingRequest;
    try {
      await scene.video.play();
      if (request !== scene.playingRequest) return;
      showVideo(scene);
    } catch {
      if (request !== scene.playingRequest) return;
      // Keep a readable result if the browser blocks automatic playback.
      scene.paused = true;
      showStill(scene);
    }
    sync(scene);
  };
  const update = () => {
    if (document.hidden) { scenes.forEach(stop); return; }
    const candidate = scenes.filter(s => s.ratio >= .45 && !s.still && !s.paused && !s.failed)
      .sort((a,b) => b.ratio - a.ratio)[0];
    if (active && (active.ratio < .2 || active !== candidate)) stop(active);
    if (candidate && candidate.video.paused) start(candidate);
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const scene = scenes.find(s => s.media === entry.target);
      if (scene) scene.ratio = entry.intersectionRatio;
    });
    update();
  }, { threshold:[0,.2,.45,.65,.85,1] });
  scenes.forEach(scene => {
    scene.element.querySelector('.journey-animation-controls').hidden = false;
    if (!scene.still) scene.media.classList.add('motion-ready');
    scene.video.addEventListener('loadeddata', () => showVideo(scene));
    ['play','pause'].forEach(event => scene.video.addEventListener(event, () => sync(scene)));
    scene.video.addEventListener('error', () => {
      scene.failed = true;
      showStill(scene);
      scene.toggle.querySelector('.journey-toggle-label').textContent = 'Animation unavailable';
      scene.toggle.disabled = true;
      scene.mode.hidden = true;
    });
    scene.toggle.addEventListener('click', () => {
      if (!scene.video.paused) {
        scene.paused = true;
        stop(scene);
      } else {
        scene.paused = false;
        start(scene);
      }
    });
    scene.mode.addEventListener('click', () => {
      if (scene.still) {
        scene.paused = false;
        start(scene);
      } else {
        scene.paused = true;
        showStill(scene);
      }
    });
    scene.expand.addEventListener('click', async () => {
      try {
        scene.video.controls = true;
        if (scene.video.requestFullscreen) await scene.video.requestFullscreen();
        else if (scene.video.webkitEnterFullscreen) scene.video.webkitEnterFullscreen();
        else scene.video.controls = false;
      } catch { scene.video.controls = false; }
    });
    scene.video.addEventListener('webkitendfullscreen', () => { scene.video.controls = false; });
    observer.observe(scene.media);
    sync(scene);
  });
  document.addEventListener('fullscreenchange', () => {
    scenes.forEach(scene => { if (document.fullscreenElement !== scene.video) scene.video.controls = false; });
  });
  document.addEventListener('visibilitychange', update);
  motion.addEventListener('change', () => {
    if (motion.matches) scenes.forEach(scene => { scene.paused = true; showStill(scene); });
  });
})();
