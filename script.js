/**
 * afterglow — Premium Web Music Player
 * Full audio engine, favorites library, view management, and workable controls
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // TRACK DATABASE (From Figma Mockups)
  // =========================================================================
  const TRACKS = [
    {
      id: 1,
      title: 'Weightless',
      artist: 'Noah Sol',
      album: 'Midnight Tapes',
      year: '2026',
      durationStr: '3:48',
      genre: 'LO-FI / AMBIENT',
      category: 'music',
      cover: 'assets/cover_1_weightless.png',
      largeCover: 'assets/cover_weightless_large.png',
      audioSrc: 'assets/audio/weightless.mp3',
      description: 'For the moments between everything. Soft keys, slow rhythms, and nowhere else to be.'
    },
    {
      id: 2,
      title: 'City After Rain',
      artist: 'Yuna & the Moon',
      album: 'Neon Echoes',
      year: '2026',
      durationStr: '2:56',
      genre: 'CHILLHOP',
      category: 'music',
      cover: 'assets/cover_2_city_rain.png',
      largeCover: 'assets/cover_2_city_rain.png',
      audioSrc: 'assets/audio/city_rain.mp3',
      description: 'Distant neon reflections on glistening pavement, paired with warm Rhodes chords and soothing rain.'
    },
    {
      id: 3,
      title: 'Soft Focus',
      artist: 'Arlo Parks',
      album: 'Daydreams',
      year: '2026',
      durationStr: '4:12',
      genre: 'INDIE SOUL',
      category: 'music',
      cover: 'assets/cover_3_soft_focus.png',
      largeCover: 'assets/cover_3_soft_focus.png',
      audioSrc: 'assets/audio/soft_focus.mp3',
      description: 'Gentle acoustic flutter and warm vintage analog textures crafted for mindful deep work sessions.'
    },
    {
      id: 4,
      title: 'Blue Hour',
      artist: 'Kairo',
      album: 'Coastal Solitude',
      year: '2026',
      durationStr: '5:21',
      genre: 'AMBIENT',
      category: 'music',
      cover: 'assets/cover_4_blue_hour.png',
      largeCover: 'assets/cover_4_blue_hour.png',
      audioSrc: 'assets/audio/blue_hour.mp3',
      description: 'Lighthouse beams sweeping across twilight waters. Deep atmospheric downtempo synth washes.'
    },
    {
      id: 5,
      title: 'Somewhere Slow',
      artist: 'Haru',
      album: 'Midnight Study',
      year: '2026',
      durationStr: '3:16',
      genre: 'JAZZ HOP',
      category: 'music',
      cover: 'assets/cover_5_somewhere_slow.png',
      largeCover: 'assets/cover_5_somewhere_slow.png',
      audioSrc: 'assets/audio/somewhere_slow.mp3',
      description: 'A quiet study desk by the window with rain outside, warm vinyl crackle, and nostalgic jazz guitar.'
    },
    {
      id: 6,
      title: 'Lunar Drift',
      artist: 'Pale Cinema',
      album: 'Neon Dunes',
      year: '2026',
      durationStr: '4:08',
      genre: 'ELECTRONIC',
      category: 'music',
      cover: 'assets/cover_6_lunar_drift.png',
      largeCover: 'assets/cover_6_lunar_drift.png',
      audioSrc: 'assets/audio/lunar_drift.mp3',
      description: 'Hypnotic space electronic arpeggios cruising through starlit mountain valleys and pink moonbeams.'
    },
    {
      id: 7,
      title: 'The art of doing less',
      artist: 'The Slowdown · Ep. 128',
      album: 'Deep Essays',
      year: '2026',
      durationStr: '42 min',
      genre: 'PODCAST',
      category: 'podcast',
      cover: 'assets/thumb_doing_less.png',
      largeCover: 'assets/thumb_doing_less.png',
      audioSrc: 'assets/audio/doing_less.mp3',
      description: 'An inquiry into doing less with greater intention, minimalism, and mental tranquility.'
    },
    {
      id: 8,
      title: 'Why we look at the stars',
      artist: 'Orbital Conversations · Ep. 64',
      album: 'Cosmic Watch',
      year: '2026',
      durationStr: '56 min',
      genre: 'PODCAST',
      category: 'podcast',
      cover: 'assets/thumb_stars.png',
      largeCover: 'assets/thumb_stars.png',
      audioSrc: 'assets/audio/stars.mp3',
      description: 'Exploring human wonder, cosmic perspectives, and how nocturnal quietude grounds consciousness.'
    },
    {
      id: 9,
      title: 'Tokyo rooftop sessions',
      artist: 'Chillhop Radio',
      album: 'Live Broadcasts',
      year: '2026',
      durationStr: '1 hr 24 min',
      genre: 'YOUTUBE AUDIO',
      category: 'youtube',
      cover: 'assets/thumb_tokyo.png',
      largeCover: 'assets/thumb_tokyo.png',
      audioSrc: 'assets/audio/tokyo.mp3',
      description: 'Sunset over Shibuya rooftops, ambient city chatter, and warm vinyl lo-fi beats.'
    },
    {
      id: 10,
      title: 'A quiet place to think',
      artist: 'The Ambient Room',
      album: 'Solo Runs',
      year: '2026',
      durationStr: '2 hr 10 min',
      genre: 'YOUTUBE AUDIO',
      category: 'ambient',
      cover: 'assets/thumb_quiet_place.png',
      largeCover: 'assets/thumb_quiet_place.png',
      audioSrc: 'assets/audio/quiet_place.mp3',
      description: 'Binaural rain on Japanese shoji paper screens and quiet bamboo garden audio.'
    }
  ];

  // Wallpapers list for background switching
  const WALLPAPERS = [
    { name: 'Moonlit Lake & Cabin', url: 'assets/moonlit_lake_wallpaper.jpg' },
    { name: 'Starlit Balcony Rooftop', url: 'assets/starlit_rooftop_wallpaper.jpg' },
    { name: 'Rainy City Alley', url: 'assets/cover_2_city_rain.png' },
    { name: 'Somewhere Slow Study Room', url: 'assets/cover_5_somewhere_slow.png' }
  ];
  let currentWallpaperIndex = 0;

  // =========================================================================
  // DOM REFERENCES
  // =========================================================================
  const audio = document.getElementById('audio-player');
  const toastEl = document.getElementById('app-toast');

  // Views & Navigation
  const viewDiscovery = document.getElementById('view-discovery');
  const viewNowPlaying = document.getElementById('view-now-playing');
  const navDiscover = document.getElementById('nav-discover');
  const navLibrary = document.getElementById('nav-library');
  const libraryCountBadge = document.getElementById('library-count-badge');
  const btnBackDiscovery = document.getElementById('btn-back-discovery');
  const btnExpandView = document.getElementById('btn-expand-view');
  const btnNpFullscreen = document.getElementById('btn-np-fullscreen');
  const playerTrackExpand = document.getElementById('player-track-expand');
  const brandLogo = document.getElementById('brand-logo');
  const lockBgSwitch = document.getElementById('lock-bg-switch');
  const btnChangeBg = document.getElementById('btn-change-bg');

  // Library Drawer Modal
  const libraryModal = document.getElementById('library-modal');
  const libraryBackdrop = document.getElementById('library-modal-backdrop');
  const btnCloseLibrary = document.getElementById('btn-close-library');
  const librarySongsList = document.getElementById('library-songs-list');
  const drawerCountPill = document.getElementById('drawer-count-pill');

  // Dock Player Elements
  const dockCover = document.getElementById('dock-cover');
  const dockTitle = document.getElementById('dock-title');
  const dockArtist = document.getElementById('dock-artist');
  const dockHeart = document.getElementById('dock-heart');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const iconPlay = btnPlayPause.querySelector('.icon-play');
  const iconPause = btnPlayPause.querySelector('.icon-pause');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnRewind10 = document.getElementById('btn-rewind-10');
  const btnForward10 = document.getElementById('btn-forward-10');
  const btnShuffle = document.getElementById('btn-shuffle');
  const btnRepeat = document.getElementById('btn-repeat');
  const seekBar = document.getElementById('seek-bar');
  const seekFill = document.getElementById('seek-fill');
  const seekThumb = document.getElementById('seek-thumb');
  const currentTimeEl = document.getElementById('current-time');
  const totalTimeEl = document.getElementById('total-time');

  // Bitrate & Volume
  const btnBitrate = document.getElementById('btn-bitrate');
  const bitrateMenu = document.getElementById('bitrate-menu');
  const currentBitrate = document.getElementById('current-bitrate');
  const btnVolume = document.getElementById('btn-volume');
  const iconVolHigh = btnVolume.querySelector('.icon-vol-high');
  const iconVolMute = btnVolume.querySelector('.icon-vol-mute');
  const volumeBar = document.getElementById('volume-bar');
  const volumeFill = document.getElementById('volume-fill');

  // Now Playing View Elements
  const npMainCover = document.getElementById('np-main-cover');
  const npGenreText = document.getElementById('np-genre-text');
  const npTitle = document.getElementById('np-title');
  const npArtist = document.getElementById('np-artist');
  const npMeta = document.getElementById('np-meta');
  const npDesc = document.getElementById('np-desc');
  const btnSaveLibrary = document.getElementById('btn-save-library');
  const saveLibraryText = document.getElementById('save-library-text');
  const upnextCard = document.getElementById('upnext-card');
  const upnextThumb = document.getElementById('upnext-thumb');
  const upnextTitle = document.getElementById('upnext-title');
  const upnextArtist = document.getElementById('upnext-artist');

  // Search & Filters
  const searchInput = document.getElementById('track-search');
  const btnFocusSearch = document.getElementById('btn-focus-search');
  const filterPills = document.querySelectorAll('.filter-pill');
  const btnRandomMood = document.getElementById('btn-random-mood');
  const scrollLeftBtn = document.getElementById('scroll-left');
  const scrollRightBtn = document.getElementById('scroll-right');
  const moodCarousel = document.getElementById('mood-carousel');
  const scrollLongerLeft = document.getElementById('scroll-longer-left');
  const scrollLongerRight = document.getElementById('scroll-longer-right');
  const longformGrid = document.getElementById('longform-grid');
  const btnViewAllMood = document.getElementById('btn-view-all-mood');
  const btnViewAllLonger = document.getElementById('btn-view-all-longer');

  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  let currentTrackIndex = 0;
  let isPlaying = false;
  let isShuffle = false;
  let isRepeat = false;
  let isMuted = false;
  let lastVolume = 0.8;
  let isSeeking = false;
  let isBgLocked = true;

  // Persisted Favorites
  let savedFavorites = new Set([1]); // default track 1 saved
  try {
    const stored = localStorage.getItem('afterglow_favorites');
    if (stored) {
      savedFavorites = new Set(JSON.parse(stored));
    }
  } catch (e) {
    console.warn('Storage unavailable:', e);
  }

  // =========================================================================
  // TOAST NOTIFICATIONS
  // =========================================================================
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2400);
  }

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  function init() {
    loadTrack(0, false);
    audio.volume = 0.8;
    updateVolumeUI(0.8);
    updateFavoritesUI();
    renderLibraryDrawer();
  }

  // =========================================================================
  // LOAD & PLAY TRACK
  // =========================================================================
  function loadTrack(index, autoPlay = true) {
    currentTrackIndex = (index + TRACKS.length) % TRACKS.length;
    const track = TRACKS[currentTrackIndex];

    audio.src = track.audioSrc;
    audio.load();

    // Update Bottom Dock
    dockCover.src = track.cover;
    dockTitle.textContent = track.title;
    dockArtist.textContent = `${track.artist} · ${track.album}`;

    // Update Now Playing Screen
    npMainCover.src = track.largeCover || track.cover;
    npGenreText.textContent = track.genre;
    npTitle.textContent = track.title;
    npArtist.textContent = track.artist;
    npMeta.textContent = `${track.album} · ${track.year} · ${track.durationStr}`;
    npDesc.textContent = track.description;

    // Update Up Next Card (Next in queue)
    const nextIndex = (currentTrackIndex + 1) % TRACKS.length;
    const nextTrack = TRACKS[nextIndex];
    upnextThumb.src = nextTrack.cover;
    upnextTitle.textContent = nextTrack.title;
    upnextArtist.textContent = `${nextTrack.artist} · ${nextTrack.durationStr}`;

    // Highlight active card on discovery view
    document.querySelectorAll('.music-card').forEach(card => {
      const cardId = parseInt(card.dataset.id, 10);
      const isActive = (cardId === track.id);
      card.classList.toggle('active', isActive);
      const badge = card.querySelector('.card-badge');
      if (badge) {
        badge.style.display = isActive ? 'inline-flex' : 'none';
      }
    });

    totalTimeEl.textContent = track.durationStr;
    currentTimeEl.textContent = '0:00';
    seekFill.style.width = '0%';
    seekThumb.style.left = '0%';

    updateFavoritesUI();

    if (autoPlay) {
      playAudio();
    }
  }

  function playAudio() {
    audio.play()
      .then(() => {
        isPlaying = true;
        btnPlayPause.classList.add('playing');
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
      })
      .catch(err => {
        console.warn('Playback blocked / autoplay restriction:', err);
      });
  }

  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    btnPlayPause.classList.remove('playing');
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
  }

  function togglePlayPause() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  function nextTrack() {
    if (isShuffle) {
      let randIndex;
      do {
        randIndex = Math.floor(Math.random() * TRACKS.length);
      } while (randIndex === currentTrackIndex && TRACKS.length > 1);
      loadTrack(randIndex, true);
    } else {
      loadTrack(currentTrackIndex + 1, true);
    }
  }

  function prevTrack() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
    } else {
      loadTrack(currentTrackIndex - 1, true);
    }
  }

  // =========================================================================
  // SEEKING & TIME UPDATE
  // =========================================================================
  audio.addEventListener('timeupdate', () => {
    if (isSeeking || isNaN(audio.duration)) return;

    const current = audio.currentTime;
    const duration = audio.duration || 1;
    const percent = (current / duration) * 100;

    seekFill.style.width = `${percent}%`;
    seekThumb.style.left = `${percent}%`;
    currentTimeEl.textContent = formatTime(current);
  });

  audio.addEventListener('loadedmetadata', () => {
    if (!isNaN(audio.duration) && audio.duration > 0) {
      totalTimeEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('ended', () => {
    if (isRepeat) {
      audio.currentTime = 0;
      playAudio();
    } else {
      nextTrack();
    }
  });

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function handleSeek(e) {
    const rect = seekBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekFill.style.width = `${pos * 100}%`;
    seekThumb.style.left = `${pos * 100}%`;

    if (!isNaN(audio.duration)) {
      audio.currentTime = pos * audio.duration;
      currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  }

  seekBar.addEventListener('mousedown', (e) => {
    isSeeking = true;
    handleSeek(e);

    const onMouseMove = (moveEvent) => handleSeek(moveEvent);
    const onMouseUp = () => {
      isSeeking = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // -10s and +10s Skip Buttons
  btnRewind10.addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
    showToast('Rewound 10 seconds');
  });

  btnForward10.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration || 1000, audio.currentTime + 10);
    showToast('Skipped forward 10 seconds');
  });

  // =========================================================================
  // VOLUME CONTROL
  // =========================================================================
  function updateVolumeUI(val) {
    const pct = Math.max(0, Math.min(1, val));
    volumeFill.style.width = `${pct * 100}%`;

    if (pct === 0) {
      iconVolHigh.style.display = 'none';
      iconVolMute.style.display = 'block';
    } else {
      iconVolHigh.style.display = 'block';
      iconVolMute.style.display = 'none';
    }
  }

  function handleVolume(e) {
    const rect = volumeBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.volume = pos;
    lastVolume = pos;
    isMuted = pos === 0;
    updateVolumeUI(pos);
  }

  volumeBar.addEventListener('mousedown', (e) => {
    handleVolume(e);
    const onMouseMove = (moveEvent) => handleVolume(moveEvent);
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  btnVolume.addEventListener('click', () => {
    if (isMuted || audio.volume === 0) {
      audio.volume = lastVolume > 0 ? lastVolume : 0.8;
      isMuted = false;
      updateVolumeUI(audio.volume);
      showToast('Sound unmuted');
    } else {
      lastVolume = audio.volume;
      audio.volume = 0;
      isMuted = true;
      updateVolumeUI(0);
      showToast('Sound muted');
    }
  });

  // =========================================================================
  // WORKABLE FAVORITES / "SAVE TO LIBRARY" SYSTEM
  // =========================================================================
  function toggleFavoriteCurrentTrack() {
    const track = TRACKS[currentTrackIndex];
    if (savedFavorites.has(track.id)) {
      savedFavorites.delete(track.id);
      showToast(`Removed "${track.title}" from your library`);
    } else {
      savedFavorites.add(track.id);
      showToast(`Saved "${track.title}" to your library! ♥`);
    }

    try {
      localStorage.setItem('afterglow_favorites', JSON.stringify([...savedFavorites]));
    } catch (e) {}

    updateFavoritesUI();
    renderLibraryDrawer();
  }

  function updateFavoritesUI() {
    const track = TRACKS[currentTrackIndex];
    const isLiked = savedFavorites.has(track.id);

    dockHeart.classList.toggle('liked', isLiked);
    btnSaveLibrary.classList.toggle('liked', isLiked);

    if (saveLibraryText) {
      saveLibraryText.textContent = isLiked ? 'Saved to library' : 'Save to library';
    }

    // Update Header Badge Count
    if (libraryCountBadge) {
      libraryCountBadge.textContent = savedFavorites.size;
    }
    if (drawerCountPill) {
      drawerCountPill.textContent = `${savedFavorites.size} song${savedFavorites.size === 1 ? '' : 's'}`;
    }
  }

  dockHeart.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavoriteCurrentTrack();
  });

  btnSaveLibrary.addEventListener('click', toggleFavoriteCurrentTrack);

  // Render songs inside "Your Library" drawer
  function renderLibraryDrawer() {
    if (!librarySongsList) return;
    librarySongsList.innerHTML = '';

    if (savedFavorites.size === 0) {
      librarySongsList.innerHTML = `
        <div class="empty-library-msg">
          <p>You haven't saved any songs yet.</p>
          <p style="font-size:12px; margin-top:8px;">Click the heart icon or "Save to library" on any track to add your favorites here!</p>
        </div>
      `;
      return;
    }

    TRACKS.forEach(track => {
      if (savedFavorites.has(track.id)) {
        const item = document.createElement('div');
        item.className = 'fav-item-card';
        item.innerHTML = `
          <img src="${track.cover}" alt="${track.title}" class="fav-item-thumb">
          <div class="fav-item-info">
            <h4 class="fav-item-title">${track.title}</h4>
            <p class="fav-item-artist">${track.artist} · ${track.durationStr}</p>
          </div>
          <button class="btn-fav-play" title="Play track" data-id="${track.id}">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
          </button>
          <button class="btn-fav-remove" title="Remove from library" data-id="${track.id}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        `;

        // Play button
        item.querySelector('.btn-fav-play').addEventListener('click', () => {
          const idx = TRACKS.findIndex(t => t.id === track.id);
          if (idx !== -1) {
            loadTrack(idx, true);
            closeLibraryModal();
            showToast(`Now playing "${track.title}"`);
          }
        });

        // Remove button
        item.querySelector('.btn-fav-remove').addEventListener('click', (e) => {
          e.stopPropagation();
          savedFavorites.delete(track.id);
          try {
            localStorage.setItem('afterglow_favorites', JSON.stringify([...savedFavorites]));
          } catch (e) {}
          updateFavoritesUI();
          renderLibraryDrawer();
          showToast(`Removed "${track.title}" from library`);
        });

        librarySongsList.appendChild(item);
      }
    });
  }

  // Open & Close Library Drawer
  function openLibraryModal() {
    renderLibraryDrawer();
    libraryModal.classList.add('open');
  }

  function closeLibraryModal() {
    libraryModal.classList.remove('open');
  }

  navLibrary.addEventListener('click', openLibraryModal);
  btnCloseLibrary.addEventListener('click', closeLibraryModal);
  libraryBackdrop.addEventListener('click', closeLibraryModal);

  // =========================================================================
  // VIEW SWITCHING (Discovery vs Now Playing)
  // =========================================================================
  function showNowPlaying() {
    viewDiscovery.classList.remove('active-view');
    viewNowPlaying.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Switched to Now Playing view');
  }

  function showDiscovery() {
    viewNowPlaying.classList.remove('active-view');
    viewDiscovery.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  btnExpandView.addEventListener('click', () => {
    if (viewNowPlaying.classList.contains('active-view')) {
      showDiscovery();
    } else {
      showNowPlaying();
    }
  });

  btnNpFullscreen.addEventListener('click', showDiscovery);
  playerTrackExpand.addEventListener('click', showNowPlaying);
  btnBackDiscovery.addEventListener('click', showDiscovery);
  brandLogo.addEventListener('click', showDiscovery);
  navDiscover.addEventListener('click', showDiscovery);

  // Up Next Card click skips to next track
  upnextCard.addEventListener('click', () => {
    nextTrack();
    showToast(`Skipped to "${TRACKS[currentTrackIndex].title}"`);
  });

  // =========================================================================
  // WORKABLE BACKGROUND SWITCHER & LOCK TOGGLE
  // =========================================================================
  lockBgSwitch.addEventListener('change', (e) => {
    isBgLocked = e.target.checked;
    showToast(isBgLocked ? 'Background locked to theme' : 'Background dynamic switching enabled');
  });

  btnChangeBg.addEventListener('click', () => {
    currentWallpaperIndex = (currentWallpaperIndex + 1) % WALLPAPERS.length;
    const wp = WALLPAPERS[currentWallpaperIndex];
    viewNowPlaying.style.backgroundImage = `
      radial-gradient(ellipse at 50% 25%, rgba(13, 17, 34, 0.25) 0%, rgba(7, 10, 20, 0.85) 65%, rgba(5, 7, 16, 0.98) 100%),
      url('${wp.url}')
    `;
    showToast(`Atmosphere: ${wp.name}`);
  });

  // Bitrate Selector Dropdown
  btnBitrate.addEventListener('click', (e) => {
    e.stopPropagation();
    bitrateMenu.classList.toggle('open');
  });

  document.querySelectorAll('.bitrate-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.bitrate-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const quality = item.dataset.quality;
      currentBitrate.textContent = quality;
      bitrateMenu.classList.remove('open');
      showToast(`Audio streaming set to ${quality}`);
    });
  });

  document.addEventListener('click', () => {
    bitrateMenu.classList.remove('open');
  });

  // =========================================================================
  // CARD CLICKS & CAROUSELS
  // =========================================================================
  // Row 1 Music Cards
  document.querySelectorAll('.music-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id, 10);
      const index = TRACKS.findIndex(t => t.id === id);
      if (index !== -1) {
        if (index === currentTrackIndex && isPlaying) {
          togglePlayPause();
        } else {
          loadTrack(index, true);
          showToast(`Playing "${TRACKS[index].title}"`);
        }
      }
    });
  });

  // Row 2 Longform Cards
  document.querySelectorAll('.longform-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id, 10);
      const index = TRACKS.findIndex(t => t.id === id);
      if (index !== -1) {
        loadTrack(index, true);
        showToast(`Playing "${TRACKS[index].title}"`);
      }
    });
  });

  // Horizontal Scroll Arrows
  if (scrollLeftBtn && scrollRightBtn && moodCarousel) {
    scrollLeftBtn.addEventListener('click', () => {
      moodCarousel.scrollBy({ left: -260, behavior: 'smooth' });
    });
    scrollRightBtn.addEventListener('click', () => {
      moodCarousel.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }

  if (scrollLongerLeft && scrollLongerRight && longformGrid) {
    scrollLongerLeft.addEventListener('click', () => {
      longformGrid.scrollBy({ left: -280, behavior: 'smooth' });
    });
    scrollLongerRight.addEventListener('click', () => {
      longformGrid.scrollBy({ left: 280, behavior: 'smooth' });
    });
  }

  // View All buttons
  let isMoodExpanded = false;
  btnViewAllMood.addEventListener('click', () => {
    isMoodExpanded = !isMoodExpanded;
    moodCarousel.style.gridTemplateColumns = isMoodExpanded ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)';
    btnViewAllMood.textContent = isMoodExpanded ? 'Collapse' : 'View all';
  });

  let isLongerExpanded = false;
  btnViewAllLonger.addEventListener('click', () => {
    isLongerExpanded = !isLongerExpanded;
    longformGrid.style.gridTemplateColumns = isLongerExpanded ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)';
    btnViewAllLonger.textContent = isLongerExpanded ? 'Collapse' : 'View all';
  });

  // Randomize Mood
  btnRandomMood.addEventListener('click', () => {
    const diceIcon = btnRandomMood.querySelector('.dice-icon');
    if (diceIcon) {
      diceIcon.style.transform = 'rotate(360deg)';
      setTimeout(() => { diceIcon.style.transform = ''; }, 400);
    }

    const randomIndex = Math.floor(Math.random() * 6);
    loadTrack(randomIndex, true);
    showToast(`Random mood picked: "${TRACKS[randomIndex].title}"`);
  });

  // Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;
      applyFilter(filter);
      showToast(`Filter: ${pill.textContent}`);
    });
  });

  function applyFilter(filter) {
    document.querySelectorAll('.music-card').forEach(card => {
      const id = parseInt(card.dataset.id, 10);
      const track = TRACKS.find(t => t.id === id);
      if (!track) return;
      card.style.display = (filter === 'all' || track.category === filter) ? 'block' : 'none';
    });
  }

  // Live Track Search
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    document.querySelectorAll('.music-card').forEach(card => {
      const id = parseInt(card.dataset.id, 10);
      const track = TRACKS.find(t => t.id === id);
      if (!track) return;

      const match =
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.genre.toLowerCase().includes(query);

      card.style.display = match ? 'block' : 'none';
    });

    document.querySelectorAll('.longform-card').forEach(card => {
      const id = parseInt(card.dataset.id, 10);
      const track = TRACKS.find(t => t.id === id);
      if (!track) return;

      const match =
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.genre.toLowerCase().includes(query);

      card.style.display = match ? 'flex' : 'none';
    });
  });

  btnFocusSearch.addEventListener('click', () => {
    searchInput.focus();
  });

  // Controls
  btnPlayPause.addEventListener('click', togglePlayPause);
  btnNext.addEventListener('click', nextTrack);
  btnPrev.addEventListener('click', prevTrack);

  btnShuffle.addEventListener('click', () => {
    isShuffle = !isShuffle;
    btnShuffle.classList.toggle('active', isShuffle);
    showToast(isShuffle ? 'Shuffle enabled' : 'Shuffle disabled');
  });

  btnRepeat.addEventListener('click', () => {
    isRepeat = !isRepeat;
    btnRepeat.classList.toggle('active', isRepeat);
    showToast(isRepeat ? 'Repeat: 1 track' : 'Repeat: All queue');
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target === searchInput) {
      if (e.key === 'Escape') searchInput.blur();
      return;
    }

    switch (e.key) {
      case ' ':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'ArrowRight':
        e.preventDefault();
        audio.currentTime = Math.min(audio.duration || 1000, audio.currentTime + 5);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - 5);
        break;
      case 'ArrowUp':
        e.preventDefault();
        audio.volume = Math.min(1, audio.volume + 0.1);
        updateVolumeUI(audio.volume);
        break;
      case 'ArrowDown':
        e.preventDefault();
        audio.volume = Math.max(0, audio.volume - 0.1);
        updateVolumeUI(audio.volume);
        break;
      case 'm':
      case 'M':
        btnVolume.click();
        break;
      case 'f':
      case 'F':
        btnExpandView.click();
        break;
      case 's':
      case 'S':
        btnShuffle.click();
        break;
      case 'r':
      case 'R':
        btnRepeat.click();
        break;
      case 'k':
      case 'K':
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          searchInput.focus();
        }
        break;
      case '/':
        e.preventDefault();
        searchInput.focus();
        break;
    }
  });

  // Boot app
  init();
});
