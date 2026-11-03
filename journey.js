(() => {
  const dialog = document.getElementById('journey-player');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const video = document.getElementById('journey-video');
  const title = document.getElementById('journey-player-title');
  const description = document.getElementById('journey-player-description');
  const toggle = document.getElementById('journey-toggle');
  const status = document.getElementById('journey-player-status');
  const direct = document.getElementById('journey-open-file');
  let opener;
  let previousOverflow = '';
  let attempt = 0;
  const message = text => {
    status.textContent = text;
    status.hidden = !text;
  };
  const sync = () => {
    toggle.textContent = video.ended ? 'Replay' : video.paused ? 'Play' : 'Pause';
  };
  const play = async () => {
    const current = ++attempt;
    try {
      await video.play();
      if (current === attempt && dialog.open) message('');
    } catch {
      if (current === attempt && dialog.open) message('Press Play to try again, or choose Open video.');
    }
    sync();
  };
  document.querySelectorAll('.journey-watch').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
      title.textContent = document.getElementById(link.dataset.scene + '-title').textContent;
      description.textContent = 'Libri 2.0 preview. Silent clip. ' + link.dataset.disclosure;
      video.setAttribute('aria-label', title.textContent + ' Silent Libri 2.0 demonstration.');
      video.poster = link.dataset.poster;
      video.src = link.href;
      direct.href = link.href;
      message('');
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      play();
    });
  });
  document.getElementById('journey-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    ++attempt;
    video.pause();
    video.removeAttribute('src');
    video.load();
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll:true });
  });
  toggle.addEventListener('click', () => {
    if (video.paused || video.ended) {
      if (video.ended) video.currentTime = 0;
      play();
    } else {
      ++attempt;
      video.pause();
    }
  });
  ['play', 'pause', 'ended'].forEach(event => video.addEventListener(event, sync));
  video.addEventListener('error', () => {
    if (!dialog.open) return;
    ++attempt;
    message('This clip could not load. Choose Open video to try it directly.');
  });
  document.getElementById('journey-fullscreen').addEventListener('click', async () => {
    try {
      if (video.requestFullscreen) await video.requestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
      else message('Choose Open video for your device’s full-size player.');
    } catch {
      message('Choose Open video for your device’s full-size player.');
    }
  });
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', event => {
    if (event.matches && dialog.open) {
      ++attempt;
      video.pause();
      message('Paused for reduced motion. Press Play whenever you’re ready.');
    }
  });
})();
