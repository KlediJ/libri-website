(() => {
  const video = document.getElementById('launch-film');
  if (!video) return;
  const controls = document.querySelector('.film-controls');
  const play = document.getElementById('film-play');
  const sound = document.getElementById('film-sound');
  const captions = document.getElementById('film-captions');
  const status = document.getElementById('film-status');
  const fallback = document.getElementById('film-fallback');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const track = video.textTracks[0];
  let playAttempt = 0;

  const message = text => {
    status.textContent = text;
    status.hidden = !text;
    fallback.hidden = !text;
  };
  const sync = () => {
    const playLabel = video.ended ? 'Replay film' : video.paused ? 'Play film' : 'Pause film';
    play.setAttribute('aria-label', playLabel);
    play.title = playLabel;
    play.dataset.state = video.ended ? 'ended' : video.paused ? 'paused' : 'playing';
    const silent = video.muted || video.volume === 0;
    sound.querySelector('span').textContent = silent ? 'Sound on' : 'Mute';
    sound.setAttribute('aria-label', silent ? 'Replay film with sound' : 'Mute film');
    sound.title = sound.getAttribute('aria-label');
    sound.querySelector('.mute-symbol').setAttribute('d', silent ? 'm16 9 5 6m0-6-5 6' : 'M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14');
    captions.setAttribute('aria-pressed', String(track?.mode === 'showing'));
  };
  const start = async () => {
    const attempt = ++playAttempt;
    try {
      await video.play();
      if (attempt === playAttempt) message('');
    } catch {
      if (attempt === playAttempt) message('Press play to watch.');
    }
    sync();
  };
  play.addEventListener('click', () => {
    if (video.paused || video.ended) {
      if (video.ended) video.currentTime = 0;
      start();
    } else {
      ++playAttempt;
      video.pause();
    }
  });
  sound.addEventListener('click', () => {
    if (video.muted || video.volume === 0) {
      video.muted = false;
      video.volume = 1;
      video.currentTime = 0;
      start();
    } else {
      video.muted = true;
    }
    sync();
  });
  captions.addEventListener('click', () => {
    if (track) track.mode = track.mode === 'showing' ? 'hidden' : 'showing';
    sync();
  });
  ['play', 'pause', 'ended', 'volumechange'].forEach(event => video.addEventListener(event, sync));
  video.textTracks.addEventListener('change', sync);
  const mediaError = () => {
    ++playAttempt;
    message('The film could not load. Open it below to try again.');
    sync();
  };
  video.addEventListener('error', mediaError);
  video.querySelector('source')?.addEventListener('error', mediaError);
  motion.addEventListener('change', () => {
    if (motion.matches) {
      ++playAttempt;
      video.autoplay = false;
      video.pause();
      message('Play when you’re ready.');
    }
  });
  controls.hidden = false;
  video.controls = false;
  video.tabIndex = -1;
  if (track) track.mode = 'hidden';
  sync();
  // Start only after checking the visitor’s motion preference. Native controls
  // and the poster remain usable when JavaScript or autoplay is unavailable.
  if (motion.matches) {
    message('Play when you’re ready.');
  } else {
    video.muted = true;
    video.autoplay = true;
    start();
  }
})();
