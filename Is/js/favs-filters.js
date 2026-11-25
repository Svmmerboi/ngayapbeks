/* ════════════════════════════════════════════════
   DAFTAR NGAYAP (favorit, disimpan di browser)
════════════════════════════════════════════════ */
function loadFavs() {
  try { const v = JSON.parse(localStorage.getItem('ngb-favs') || '[]'); favs = Array.isArray(v) ? v : []; } catch (e) { favs = []; }
}
function saveFavs() { try { localStorage.setItem('ngb-favs', JSON.stringify(favs)); } catch (e) {} }
function favItems() { return favs.map(k => ITEMS.find(i => itemKey(i) === k)).filter(Boolean); }
function toggleFav(enc) {
  const k = decodeURIComponent(enc);
  const at = favs.indexOf(k);
  if (at > -1) favs.splice(at, 1); else favs.push(k);
  saveFavs();
  document.querySelectorAll('[data-fav="' + enc + '"]').forEach(b => {
    const on = favs.indexOf(k) > -1;
    b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
  });
  renderFav();
}
function shareText() {
  const rows = favItems().map((i, n) => `${n + 1}. ${i.name} - ${displayLoc(i)}\n${mapsUrl(i)}`);
  return 'Daftar Ngayap-ku (NgayapBeks!):\n\n' + rows.join('\n\n');
}
function renderFav() {
  const list = favItems();
  const fab = document.getElementById('favFab');
  if (!fab) return;
  fab.querySelector('.fav-count').textContent = favs.length;
  const body = document.getElementById('favBody');
  body.innerHTML = list.length ? list.map(i => `
    <div class="fav-row">
      <div class="fav-row-main">
        <div class="fav-row-name">${esc(i.name)}</div>
        <div class="fav-row-loc">${esc(i.loc)}</div>
        <a class="maps-link" href="${mapsUrl(i)}" target="_blank" rel="noopener">${ic('map', 14)} Buka di Maps</a>
      </div>
      <button class="fav-btn on" onclick="toggleFav('${encKey(itemKey(i))}')" aria-label="Hapus dari daftar">${ic('trash', 16)}</button>
    </div>`).join('')
    : `<div class="t-empty">Belum ada tempat tersimpan. Tekan ikon bookmark di kartu mana pun untuk menyimpannya di sini.</div>`;
  document.getElementById('favShare').href = 'https://wa.me/?text=' + encodeURIComponent(shareText());
  document.getElementById('favActions').style.display = list.length ? 'flex' : 'none';
}
function clearFavs() { favs = []; saveFavs(); document.querySelectorAll('.fav-btn.on[data-fav]').forEach(b => { b.classList.remove('on'); b.setAttribute('aria-pressed', false); }); renderFav(); }
function openFav() { renderFav(); document.getElementById('favPanel').hidden = false; }
function closeFav() { document.getElementById('favPanel').hidden = true; }
function initFav() {
  loadFavs();
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button class="fav-fab" id="favFab" onclick="openFav()" aria-label="Buka Daftar Ngayap">${ic('bookmark', 18)}<span>Daftar Ngayap</span><span class="fav-count">0</span></button>
    <div class="fav-panel" id="favPanel" hidden>
      <div class="fav-overlay" onclick="closeFav()"></div>
      <aside class="fav-drawer" role="dialog" aria-label="Daftar Ngayap">
        <div class="fav-head"><div class="fav-title">${ic('bookmark', 18)} Daftar Ngayap</div><button class="fav-close" onclick="closeFav()" aria-label="Tutup">${ic('x', 18)}</button></div>
        <div class="fav-body" id="favBody"></div>
        <div class="fav-actions" id="favActions">
          <a class="more-btn" id="favShare" href="#" target="_blank" rel="noopener">${ic('share', 15)} Bagikan ke WhatsApp</a>
          <button class="fav-clear" onclick="clearFavs()">${ic('trash', 14)} Kosongkan</button>
        </div>
      </aside>
    </div>`;
  document.body.appendChild(wrap);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFav(); });
  renderFav();
}
const KOPI_TAGS = [
  { k:'wifi',    label:'Wi-Fi',             re:/wi-?fi/i },
  { k:'colokan', label:'Colokan',           re:/colokan|stopkontak/i },
  { k:'wfc',     label:'Cocok WFC',         re:/wfc|work from|coworking|ruang rapat|ruang meeting|meeting/i },
  { k:'outdoor', label:'Area outdoor',      re:/outdoor|taman|rooftop/i },
  { k:'live',    label:'Live music',        re:/live music/i },
  { k:'malam',   label:'Buka sampai malam', fn: i => endHour(i) >= 23 }
];
function endHour(i) {
  let mx = 0, m; const re = /(\d{1,2})\.(\d{2})\s*[–-]\s*(\d{1,2})\.(\d{2})/g;
  while ((m = re.exec(i.note || ''))) { const e = +m[3]; if (e > mx) mx = e; }
  return mx;
}
function tagsOf(i) {
  if (i.type !== 'kopi') return [];
  if (!i._t) i._t = KOPI_TAGS.filter(t => t.fn ? t.fn(i) : t.re.test((i.note || '') + ' ' + (i.loc || ''))).map(t => t.k);
  return i._t;
}
function toggleTag(k) { if (kopiTags.has(k)) kopiTags.delete(k); else kopiTags.add(k); refreshCat(); writeHash(); }
function kopiTagsHtml() {
  const base = ITEMS.filter(i => i.type === 'kopi' && scopeMatch(i) && (!onlyVer || isVerified(i)));
  const btns = KOPI_TAGS.map(t => {
    const n = base.filter(i => tagsOf(i).indexOf(t.k) > -1).length;
    if (!n && !kopiTags.has(t.k)) return '';
    return `<button class="tag-chip ${kopiTags.has(t.k) ? 'on' : ''}" onclick="toggleTag('${t.k}')" aria-pressed="${kopiTags.has(t.k)}">${t.label}<span>${n}</span></button>`;
  }).join('');
  return btns ? `<div class="tag-row"><span class="tag-label">Cocok untuk</span>${btns}</div>` : '';
}
function isVerified(i) {
  return !!(i.kecs && i.kecs.length) && !/belum terverifikasi|belum diverifikasi|perkiraan|perlu cek/i.test(i.loc + ' ' + i.note);
}
function matchQ(i) {
  if (onlyVer && !isVerified(i)) return false;
  if (i.type === 'kopi' && kopiTags.size) { const tg = tagsOf(i); for (const t of kopiTags) if (tg.indexOf(t) < 0) return false; }
  if (!q) return true;
  const t = (i.name + ' ' + i.loc + ' ' + i.note + ' ' + (i.kel || '') + ' ' + i.badgeText).toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every(w => t.includes(w));
}
function emptyHtml(key) {
  if (q) return `<div class="t-empty">Tidak ada hasil untuk &ldquo;${esc(q)}&rdquo; di cakupan ini. Coba kata lain atau pilih wilayah Semua.</div>`;
  return `<div class="t-empty">${key.indexOf('ib-') === 0 ? ibadahEmptyMsg() : EMPTY_MSG[key]}</div>`;
}
function cardsHtml(items, key) {
  if (!items.length) return emptyHtml(key);
  const lim = (expanded[key] || q) ? items.length : (cat === 'semua' ? 3 : LIMIT);
  let h = items.slice(0, lim).map(itemCard).join('');
  if (items.length > lim) h += `<div class="more-row"><button class="more-btn" onclick="${cat === 'semua' ? `goCat('${catOfKey(key)}')` : `expand('${key}')`}">Lihat semua (${items.length}) ${ic('chev', 14)}</button></div>`;
  return h;
}
function listHtml(items, emptyKey) { return cardsHtml(items, emptyKey); }
function catOfKey(k) {
  if (k.indexOf('ib-') === 0) return 'ibadah';
  return { transit:'transit', stasiun:'transit', halte:'transit', nonhalte:'transit', mall:'mall', rs:'kesehatan', klinik:'kesehatan', pendidikan:'pendidikan', wisata:'wisata', kopi:'kopi' }[k] || 'semua';
}
function goCat(k) { setCat(k); const el = document.getElementById('catChips'); if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' }); }
function expand(key) { expanded[key] = true; redrawData(); }
function redrawData() { document.getElementById('dataBox').innerHTML = buildDataInner(); }

const CATS = [
  { key:'semua',     label:'Semua',            icon:'sparkle' },
  { key:'transit',   label:'Transportasi',     icon:'train' },
  { key:'mall',      label:'Mal',              icon:'bag' },
  { key:'ibadah',    label:'Rumah Ibadah',     icon:'worship' },
  { key:'kesehatan', label:'Kesehatan',        icon:'hospital' },
  { key:'pendidikan',label:'Pendidikan',       icon:'cap' },
  { key:'wisata',    label:'Wisata',           icon:'tree' },
  { key:'kopi',      label:'Kopi & Nongkrong', icon:'coffee' }
];
function catCount(k) {
  if (k === 'semua') return CATS.filter(c => c.key !== 'semua').reduce((n, c) => n + catCount(c.key), 0);
  if (k === 'ibadah') return ITEMS.filter(i => i.type === 'ibadah' && scopeMatch(i) && matchQ(i)).length;
  const m = { transit:['stasiun','halte','nonhalte'], mall:['mall'], kesehatan:['rs','klinik'], pendidikan:['pendidikan'], wisata:['wisata'], kopi:['kopi'] };
  return m[k].reduce((n, t) => n + filterItems(t).length, 0);
}
function catChipsHtml() {
  return CATS.map(c =>
    `<button class="cat-chip ${c.key===cat?'active':''}" onclick="setCat('${c.key}')" aria-pressed="${c.key===cat}">${ic(c.icon, 16)}<span>${c.label}</span><span class="t-count">${catCount(c.key)}</span></button>`
  ).join('');
}
function catBarHtml() {
  return `<div class="cat-bar">
    <div class="cat-chips" id="catChips">${catChipsHtml()}</div>
    <button class="ver-toggle ${onlyVer?'on':''}" onclick="setVer(!onlyVer)" aria-pressed="${onlyVer}" title="Sembunyikan entri yang alamat atau kecamatannya belum terverifikasi">${ic('check', 15)}<span>Hanya terverifikasi</span></button>
    <label class="q-box">${ic('search', 16)}<input type="search" class="q-input" placeholder="Cari nama atau lokasi" value="${esc(q)}" oninput="setQ(this.value)" aria-label="Cari nama atau lokasi"></label>
  </div>`;
}
function setCat(k) {
  cat = k; redrawData();
  const mb = document.getElementById('mapBox'); if (mb) mb.innerHTML = buildCartogram();
  writeHash();
}
function refreshCat() {
  expanded = {};
  document.getElementById('catChips').innerHTML = catChipsHtml();
  document.getElementById('catWrap').innerHTML = buildBlocks();
}
function setQ(v) { q = v.trim(); refreshCat(); writeHash(); }
function setVer(v) { onlyVer = v; redrawData(); writeHash(); }

function ibadahTabsHtml() { return subTabsHtml(IBADAH_TABS, ibTab, k => ibadahByAgama(k).length, 'setIbTab'); }
function ibadahListHtml() {
  return cardsHtml(ibadahCurrent(), 'ib-' + ibTab);
}
function setIbTab(a) {
  ibTab = a;
  document.getElementById('ibTabs').innerHTML = ibadahTabsHtml();
  document.getElementById('ibList').innerHTML = ibadahListHtml();
  document.getElementById('ibTotal').textContent = ibadahCurrent().length;
}

const HS_TABS = [ { key:'rs', label:'Rumah Sakit' }, { key:'klinik', label:'Klinik & Puskesmas' } ];
function hsTabsHtml() { return subTabsHtml(HS_TABS, hsTab, k => filterItems(k).length, 'setHsTab'); }
function transitItems(t) { return t === 'semua' ? ['stasiun','halte','nonhalte'].flatMap(x => filterItems(x)) : filterItems(t); }
function ensureTab(cur, defs, count) {
  const vis = defs.filter(d => d.key === 'semua' || count(d.key) > 0);
  return vis.some(d => d.key === cur) ? cur : (vis[0] ? vis[0].key : cur);
}
function subTabsHtml(defs, cur, count, fn) {
  const vis = defs.filter(d => d.key === 'semua' || count(d.key) > 0);
  if (vis.length < (defs[0].key === 'semua' ? 3 : 2)) return '';
  return vis.map(t => `<button class="t-tab ${t.key===cur?'active':''}" onclick="${fn}('${t.key}')">${t.label}<span class="t-count">${count(t.key)}</span></button>`).join('');
}
function setHsTab(k) {
  hsTab = k;
  document.getElementById('hsTabs').innerHTML = hsTabsHtml();
  document.getElementById('hsList').innerHTML = listHtml(filterItems(hsTab), hsTab);
}

function buildBlocks() {
  tTab = ensureTab(tTab, TRANSIT_TABS, k => transitItems(k).length);
  ibTab = ensureTab(ibTab, IBADAH_TABS, k => ibadahByAgama(k).length);
  hsTab = ensureTab(hsTab, HS_TABS, k => filterItems(k).length);
  const tabs = subTabsHtml(TRANSIT_TABS, tTab, k => transitItems(k).length, 'setTTab');
  const malls  = filterItems('mall');
  const wisata = filterItems('wisata');
  const kopi   = filterItems('kopi');
  const edu    = filterItems('pendidikan');
  return `<div class="cat-wrap" data-active="${cat}">
    <div class="block${catCount('transit')===0?' is-empty':''}" data-cat="transit">
      <div class="block-title">${ic('train',19)} Transportasi Umum</div>
      <div class="block-sub">Stasiun kereta, halte resmi, dan titik non-halte (terminal, angkot, titik henti tanpa bangunan).</div>
      <div class="transit-tabs">${tabs}</div>
      <div class="t-list">${listHtml(transitItems(tTab), tTab === 'semua' ? 'transit' : tTab)}</div>
    </div>

    <div class="block${catCount('mall')===0?' is-empty':''}" data-cat="mall">
      <div class="block-title">${ic('bag',19)} Mal &amp; Pusat Belanja <span class="t-count">${malls.length}</span></div>
      <div class="block-sub">Alamat dan kecamatan mengikuti sumber yang tersedia; beberapa mal berada dekat batas kecamatan.</div>
      <div class="t-list">${listHtml(malls, 'mall')}</div>
    </div>

    <div class="block${catCount('ibadah')===0?' is-empty':''}" data-cat="ibadah">
      <div class="block-title">${ic('worship',19)} Rumah Ibadah <span class="t-count" id="ibTotal">${ibadahCurrent().length}</span></div>
      <div class="block-sub">Masjid, gereja, pura, vihara, dan klenteng yang alamatnya bisa diverifikasi. Daftar belum lengkap.</div>
      <div class="transit-tabs" id="ibTabs">${ibadahTabsHtml()}</div>
      <div class="t-list" id="ibList">${ibadahListHtml()}</div>
    </div>

    <div class="block${catCount('kesehatan')===0?' is-empty':''}" data-cat="kesehatan">
      <div class="block-title">${ic('hospital',19)} Rumah Sakit &amp; Klinik</div>
      <div class="block-sub">Hanya yang alamat dan kecamatannya bisa dipastikan. Klinik dan puskesmas belum dimasukkan. Cek langsung untuk IGD, jam, dan BPJS.</div>
      <div class="transit-tabs" id="hsTabs">${hsTabsHtml()}</div>
      <div class="t-list" id="hsList">${listHtml(filterItems(hsTab), hsTab)}</div>
    </div>

    <div class="block${catCount('pendidikan')===0?' is-empty':''}" data-cat="pendidikan">
      <div class="block-title">${ic('cap',19)} Pendidikan <span class="t-count">${edu.length}</span></div>
      <div class="block-sub">Kampus dan perguruan tinggi yang alamatnya bisa diverifikasi. Baru mencakup Kab. Bekasi.</div>
      <div class="t-list">${listHtml(edu, 'pendidikan')}</div>
    </div>

    <div class="block${catCount('wisata')===0?' is-empty':''}" data-cat="wisata">
      <div class="block-title">${ic('tree',19)} Tempat Wisata <span class="t-count">${wisata.length}</span></div>
      <div class="block-sub">Taman, waterpark, danau, wisata religi, dan alam yang tercatat di sumber terverifikasi.</div>
      <div class="t-list">${listHtml(wisata, 'wisata')}</div>
    </div>

    <div class="block${catCount('kopi')===0?' is-empty':''}" data-cat="kopi">
      <div class="block-title">${ic('coffee',19)} Coffeeshop &amp; Spot Nongkrong <span class="t-count">${kopi.length}</span></div>
      <div class="block-sub">Dari artikel rekomendasi; alamat dan jam disalin dari sumber dan bisa sudah berubah. Cek Instagram atau Maps sebelum berangkat.</div>
      ${(cat === 'kopi' || kopiTags.size) ? kopiTagsHtml() : ''}
      <div class="t-list">${listHtml(kopi, 'kopi')}</div>
    </div>
    </div>`;
}

function buildDataInner() {
  const r = DATA[currentMode].regions[currentRegion];
  const scopeLabel = selKec ? kecName(selKec) : (currentRegion !== 'semua' && r ? r.tag : (currentMode === 'kota' ? 'Kota Bekasi' : 'Kabupaten Bekasi'));

  const scopeRow = `<div class="scope-row">${selKec ? `<button class="filter-chip" onclick="clearKec()">Kecamatan: ${kecName(selKec)} ${ic('x', 12)}</button>` : ''}</div>`;



  return `
    <div class="data-head">
      <div>
        <div class="data-head-title">Data Wilayah · ${scopeLabel}</div>
        <div class="data-head-sub">Pilih kategori, lalu cari atau simpan tempat favorit.</div>
      </div>
      ${scopeRow}
    </div>

    ${catBarHtml()}
    <div id="catWrap">${buildBlocks()}</div>

    <details class="t-foot"><summary>Sumber &amp; catatan data</summary><p><b>Catatan data:</b> rumah sakit Kota Bekasi dari Perwali/JDIH Bekasi, BPK Jabar, HelloSehat, Halodoc, Alodokter, Kumparan, dan daftar rekanan Prudential. Tambahan Kab. Bekasi (Okt 2026) dari Industry.co.id, Popbela, Antara, Liputan6, Untar, Tirto, GNFI, Mamikos, Moladin, Popmama, Orami, Auto2000, dan Tripadvisor. Disusun dari liputan Republika, Bisnis.com, Kontan, Investortrust, Antara, Liputan6, Popmama, NU Online, CNBC Indonesia, Tirto, Metro TV, Jakarta Post, riset Terminal Induk Bekasi, serta Wikipedia/OSM. Daftar 56 kelurahan dari data BPS Kota Bekasi dan Perda Kota Bekasi No. 04/2004. Rumah ibadah baru mencakup entri yang bisa diverifikasi; kecamatan yang diberi label "belum terverifikasi" atau "perlu cek" belum dikonfirmasi. Coffee shop dan kafe disalin dari artikel rekomendasi (Dealls, JawaPos, Shopee, Popmama, Orami, Tripadvisor) dan belum dicek langsung ke lokasi. Jam buka, tarif, trayek, dan status koridor bisa berubah, jadi cek Dishub, KAI Commuter, LRT Jabodebek, atau pengelola tempat sebelum berangkat. Nama tiap halte Trans Patriot (34) dan BISKITA (47) belum dicantumkan lengkap karena belum ada daftar resmi yang terverifikasi. Bekasi Cyber Park, Bekasi Junction, dan beberapa mal kecil belum dimasukkan karena kecamatannya belum terverifikasi.</p><p><b>Rumah ibadah:</b> Masjid dan mushala, gereja Kristen dan Katolik, pura, vihara, serta klenteng. Daftar ini belum lengkap: hanya entri yang bisa diverifikasi yang ditampilkan. Sebagai gambaran, statistik 2022 (dikutip Jakarta Post) mencatat sekitar 2,2 juta Muslim, 106 ribu Protestan, dan 28,8 ribu Katolik di Kota Bekasi, dan data SIMAS Kemenag 2019 mencatat 594 masjid dan 382 mushala, yang menurut peneliti kemungkinan lebih sedikit dari kenyataan. Untuk Kab. Bekasi: liputan Tirto (2019) menyebut belum ada pura di kabupaten ini (sekitar 7.000 umat Hindu beribadah ke Kota Bekasi), jadi tab Hindu di Kab. Bekasi kosong sampai ada data yang terverifikasi.</p></details>`;
}

function setTTab(t) { tTab = t; redrawData(); }

function refreshMapData() {
  expanded = {};
  document.getElementById('mapBox').innerHTML = buildCartogram();
  document.getElementById('dataBox').innerHTML = buildDataInner();
}

