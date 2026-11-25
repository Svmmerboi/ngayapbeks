/* ════════════════════════════════════════════════
   NAV / HERO
════════════════════════════════════════════════ */
function switchMode(mode) {
  currentMode = mode; currentRegion = 'semua'; selKec = null;
  document.getElementById('btnKota').classList.toggle('active', mode === 'kota');
  document.getElementById('btnKab').classList.toggle('active', mode === 'kabupaten');
  renderHero(); renderContent(); writeHash();
}
function switchRegion(region) {
  currentRegion = region;
  selKec = null;
  renderTabs(); renderContent();
}
function renderTabs() { /* navigasi wilayah dipindah ke chip di bagian Jelajahi */ }
function renderHero() {
  const h = DATA[currentMode].hero;
  document.getElementById('heroEyebrow').textContent = h.eyebrow;
  document.getElementById('heroTitle').innerHTML = h.title;
  document.getElementById('heroSubtitle').textContent = h.subtitle;
  document.getElementById('heroStats').innerHTML = h.stats.map(s =>
    `<span class="stat-chip"><b>${s.val}</b> ${s.label}</span>`
  ).join('');
}

/* ════════════════════════════════════════════════
   KELURAHAN BLOCK
════════════════════════════════════════════════ */
function buildKelBlock(r) {
  if (currentMode !== 'kota') {
    return `<details class="kel-block">
      <summary class="kel-block-title">Desa / Kelurahan</summary>
      <div class="kel-empty">Daftar desa dan kelurahan Kabupaten Bekasi belum dimasukkan karena belum diverifikasi.</div>
    </details>`;
  }
  const total = r.kecs.reduce((n, k) => n + (KELURAHAN[k] ? KELURAHAN[k].length : 0), 0);
  const rows = r.kecs.map(k => {
    const list = KELURAHAN[k] || [];
    return `<div class="kel-row">
      <div class="kel-row-head"><b>Kec. ${kecName(k)}</b><span class="t-count">${list.length} kelurahan</span></div>
      <div class="kec-tags">${list.map(x => `<span class="kec-tag kel">${x}</span>`).join('')}</div>
    </div>`;
  }).join('');
  return `<details class="kel-block">
    <summary class="kel-block-title">Kelurahan di ${r.tag} (${total})</summary>
    ${rows}
  </details>`;
}

/* ════════════════════════════════════════════════
   CARTOGRAM
════════════════════════════════════════════════ */
function catTypes(k) {
  return { transit:['stasiun','halte','nonhalte'], mall:['mall'], ibadah:['ibadah'], kesehatan:['rs','klinik'], pendidikan:['pendidikan'], wisata:['wisata'], kopi:['kopi'] }[k] || null;
}
function countFor(id, k) {
  const ts = catTypes(k);
  return ITEMS.filter(i => i.kecs.includes(id) && (!ts || ts.indexOf(i.type) > -1)).length;
}
function buildCartogram() {
  const m = CARTO[currentMode];
  const regs = DATA[currentMode].regions;
  const rows = Math.max(...m.tiles.map(t => t.y)) + 1;
  const cdef = CATS.find(c => c.key === cat) || CATS[0];
  const counts = {}; m.tiles.forEach(t => counts[t.id] = countFor(t.id, cat));
  const mx = Math.max(1, ...Object.values(counts));
  const hasReg = currentRegion !== 'semua';
  const tiles = m.tiles.map(t => {
    const rk = regionOfKec(t.id);
    const inRegion = hasReg && rk === currentRegion;
    const color = rk ? REGION_COLOR[rk] : '#3A5069';
    const n = counts[t.id];
    const sub = rk ? regs[rk].tag : 'Belum ada tab wilayah';
    return `
      <button class="cg-tile ${inRegion?'in-region':''} ${selKec===t.id?'sel':''}"
        style="grid-column:${t.x+1};grid-row:${t.y+1};--c:${color};--lvl:${(n/mx).toFixed(2)}"
        onclick="selectKec('${t.id}')" aria-pressed="${selKec===t.id}" aria-label="${t.name}, ${n} tempat">
        <div>
          <div class="cg-name">${t.name}</div>
          <div class="cg-sub">${sub}</div>
        </div>
        <div class="cg-counts"><span class="${n ? '' : 'zero'}">${ic(cdef.icon, 12)} ${n}</span></div>
      </button>`;
  }).join('');
  const reset = (selKec || hasReg) ? `<button class="link-btn" onclick="resetSel()">${ic('x', 13)} Reset pilihan</button>` : '';
  return `
    <div class="map-shell">
      <div class="map-top">
        <div class="compass"><b>${ic('arrowup', 14)}</b> Utara · ${m.title}</div>
        ${reset}
      </div>
      <div class="cg ${hasReg ? 'has-region' : ''}" style="--cols:${m.cols};grid-template-rows:repeat(${rows},auto)">${tiles}</div>
      <div class="map-legend2"><span>Sedikit</span><i class="lg-bar"></i><span>Banyak</span><em>${cat === 'semua' ? 'semua kategori' : cdef.label}</em></div>
      <div class="map-note">Peta skematik, bukan skala. Klik petak untuk memfilter data.</div>
    </div>
    <div class="kec-info-panel" id="kecInfoPanel">${buildKecInfo()}</div>`;
}

function buildKecInfo() {
  if (!selKec) {
    return `<h4 style="color:var(--muted);font-weight:400">Pilih kecamatan di peta</h4>
            <p>Klik satu petak untuk memfilter stasiun, halte, mal, rumah ibadah, dan wisata di kecamatan tersebut.</p>`;
  }
  const c = countsFor(selKec);
  const rk = regionOfKec(selKec);
  const regs = DATA[currentMode].regions;
  const total = ITEMS.filter(i => i.kecs.includes(selKec)).length;
  const tags = [
    `${c.stasiun} stasiun`, `${c.mall} mal`, `${c.ibadah} rumah ibadah`, `${c.wisata} wisata`, `${c.kesehatan} rumah sakit`,
    rk ? `Tab ${regs[rk].tag}` : 'Belum ada tab wilayah'
  ];
  const kel = KELURAHAN[selKec];
  const kelHtml = kel
    ? `<div class="kec-sub-label">${kel.length} kelurahan</div>
       <div class="kec-tags">${kel.map(x => `<span class="kec-tag kel">${x}</span>`).join('')}</div>`
    : `<div class="kec-sub-label">Desa / kelurahan</div>
       <p>Daftar desa/kelurahan kecamatan ini belum dimasukkan.</p>`;
  return `<h4>${kecName(selKec)} · ${modeOfKec(selKec)}</h4>
          <p>${total ? `${total} entri terverifikasi tercatat untuk kecamatan ini.` : 'Belum ada entri terverifikasi untuk kecamatan ini; bukan berarti tidak ada, hanya belum tercatat.'}</p>
          <div class="kec-tags">${tags.map(t => `<span class="kec-tag">${t}</span>`).join('')}</div>
          ${kelHtml}`;
}

function selectKec(id) {
  if (selKec === id) { selKec = null; refreshMapData(); writeHash(); return; }
  selKec = id;
  const rk = regionOfKec(id);
  if (rk && rk !== currentRegion) { currentRegion = rk; renderContent(); }
  else if (!rk && currentRegion !== 'semua') { currentRegion = 'semua'; renderContent(); }
  else refreshMapData();
  writeHash();
}
function setRegion(k) { currentRegion = k; selKec = null; renderContent(); writeHash(); }
function resetSel() { currentRegion = 'semua'; selKec = null; renderContent(); writeHash(); }
function clearKec() { selKec = null; refreshMapData(); writeHash(); }

