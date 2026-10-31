(() => {
  const video = document.getElementById('launch-film');
  if (!video) return;
  const controls = document.querySelector('.film-controls');
  const play = document.getElementById('film-play');
  const sound = document.getElementById('film-sound');
  const captions = document.getElementById('film-captions');
  const status = document.getElementById('film-status');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const track = video.textTracks[0];
  let playAttempt = 0;

  const message = text => {
    status.textContent = text;
    status.hidden = !text;
  };
  const sync = () => {
    play.textContent = video.ended ? 'Replay film' : video.paused ? 'Play film' : 'Pause film';
    sound.textContent = video.muted || video.volume === 0 ? 'Sound on · replay' : 'Mute';
    captions.setAttribute('aria-pressed', String(track?.mode === 'showing'));
  };
  const start = async () => {
    const attempt = ++playAttempt;
    try {
      await video.play();
      if (attempt === playAttempt) message('');
    } catch {
      if (attempt === playAttempt) message('Press Play film to watch, or open the film using the link below.');
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
    message('The film could not load. Try the Open film link below.');
    sync();
  };
  video.addEventListener('error', mediaError);
  video.querySelector('source')?.addEventListener('error', mediaError);
  motion.addEventListener('change', () => {
    if (motion.matches) {
      ++playAttempt;
      video.autoplay = false;
      video.pause();
      message('Motion is reduced. Play the film whenever you’re ready.');
    }
  });
  controls.hidden = false;
  if (track) track.mode = 'showing';
  sync();
  // Start only after checking the visitor’s motion preference. Native controls
  // and the poster remain usable when JavaScript or autoplay is unavailable.
  if (motion.matches) {
    message('Motion is reduced. Play the film whenever you’re ready.');
  } else {
    video.muted = true;
    video.autoplay = true;
    start();
  }
})();
