/* ════════════════════════════════════════════════
   MAIN RENDER
════════════════════════════════════════════════ */
function highlightLoc(h) {
  return h.loc
    ? `<div class="loc-chip">${ic('pin', 13)}${h.loc}</div>`
    : `<div class="loc-chip unk">${ic('pin', 13)}Kecamatan belum terverifikasi</div>`;
}

function regionBarHtml() {
  const d = DATA[currentMode];
  const chips = ['semua'].concat(d.tabs).map(k => {
    const lab = k === 'semua' ? 'Semua' : d.labels[k];
    const dot = k === 'semua' ? '' : `<i class="lg-dot" style="background:${REGION_COLOR[k]}"></i>`;
    return `<button class="region-chip ${k === currentRegion ? 'active' : ''}" onclick="setRegion('${k}')" aria-pressed="${k === currentRegion}">${dot}${lab}</button>`;
  }).join('');
  return `<div class="region-bar"><div class="region-chips">${chips}</div><button class="link-btn" onclick="copyLink()">${ic('share', 14)} Salin tautan tampilan</button></div>`;
}
function aboutHtml(r) {
  return `
      <div class="divider"></div>
      <div class="section-label">Tentang wilayah</div>
      <div class="section-title">Tentang ${r.tag}</div>
      <p class="section-desc">Profil singkat dan makanan khasnya. Tiap kartu mencantumkan kecamatan dan kelurahannya.</p>
      <div class="about-sub">Yang membuatnya khas</div>
      <div class="cards-grid">
        ${r.highlights.map(h => `
          <div class="card">
            <span class="card-icon">${ic(h.icon, 24)}</span>
            <div class="card-title">${h.title}</div>
            ${highlightLoc(h)}
            <div class="card-body">${h.body || ''}</div>
          </div>`).join('')}
      </div>
      <div class="about-sub">Kuliner khas</div>
      <div class="culinary-grid">
        ${r.food.map(f => `
          <div class="food-card">
            <span class="food-emoji">${ic(f.emoji, 26)}</span>
            <div class="food-name">${f.name}</div>
            <div class="food-desc">${f.desc}</div>
          </div>`).join('')}
      </div>`;
}
function renderContent() {
  expanded = {};
  const r = currentRegion !== 'semua' ? DATA[currentMode].regions[currentRegion] : null;
  const modeLabel = currentMode === 'kota' ? 'Kota Bekasi' : 'Kabupaten Bekasi';
  document.getElementById('mainContent').innerHTML = `
    <div>
      <div class="map-section">
        <div class="section-label">Jelajahi</div>
        <div class="section-title">Jelajahi ${r ? r.tag : modeLabel}</div>
        ${regionBarHtml()}
        ${r ? `<div class="region-banner ${r.colorClass}">
          <div class="banner-accent"></div>
          <div class="banner-tag">${r.tag}</div>
          <div class="banner-heading">${r.heading}</div>
          <div class="banner-desc">${r.desc}</div>
        </div>${buildKelBlock(r)}` : `<p class="section-desc">Pilih wilayah atau klik kecamatan di peta untuk memfilter, lalu pilih kategori. Pilih satu wilayah untuk melihat profil dan kuliner khasnya.</p>`}
        <div class="split split-${currentMode}">
          <div id="mapBox" class="split-map">${buildCartogram()}</div>
          <div class="data-section split-data" id="dataBox">${buildDataInner()}</div>
        </div>
      </div>
      ${routesHtml()}
      ${r ? aboutHtml(r) : ''}
    </div>`;
}

/* ════════════════════════════════════════════════
   TAUTAN TAMPILAN (hash di URL)
════════════════════════════════════════════════ */
function writeHash() {
  try {
    const p = new URLSearchParams();
    if (currentMode !== 'kota') p.set('m', currentMode);
    if (currentRegion !== 'semua') p.set('r', currentRegion);
    if (selKec) p.set('k', selKec);
    if (cat !== 'semua') p.set('c', cat);
    if (q) p.set('q', q);
    if (onlyVer) p.set('v', '1');
    if (kopiTags.size) p.set('t', Array.from(kopiTags).join(','));
    const h = p.toString();
    history.replaceState(null, '', h ? '#' + h : location.pathname + location.search);
  } catch (e) {}
}
function readHash() {
  try {
    const p = new URLSearchParams(location.hash.slice(1));
    const m = p.get('m'); if (m && DATA[m]) currentMode = m;
    const r = p.get('r'); if (r && DATA[currentMode].tabs.indexOf(r) > -1) currentRegion = r;
    const k = p.get('k'); if (k && CARTO[currentMode].tiles.some(t => t.id === k)) selKec = k;
    const c = p.get('c'); if (c && CATS.some(x => x.key === c)) cat = c;
    q = (p.get('q') || '').slice(0, 80);
    onlyVer = p.get('v') === '1';
    (p.get('t') || '').split(',').forEach(t => { if (KOPI_TAGS.some(x => x.k === t)) kopiTags.add(t); });
    document.getElementById('btnKota').classList.toggle('active', currentMode === 'kota');
    document.getElementById('btnKab').classList.toggle('active', currentMode === 'kabupaten');
  } catch (e) {}
}
function copyLink() {
  writeHash();
  copyText(location.href).then(ok => toast(ok ? 'Tautan tampilan disalin' : 'Gagal menyalin tautan'));
}

// Init
updateThemeBtn();
readHash();
renderHero();
renderContent();
initFav();
loadIbadah();
