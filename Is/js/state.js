/* ════════════════════════════════════════════════
   STATE
════════════════════════════════════════════════ */
let currentMode = 'kota';
let currentRegion = 'semua';
let scope = 'wilayah';
let tTab = 'semua';
let selKec = null;
let ibTab = 'semua';
let hsTab = 'rs';
const LIMIT = 6;
let cat = 'semua', q = '', expanded = {}, onlyVer = false;
const kopiTags = new Set();
let favs = [];
const IBADAH_JSON = 'data/ibadah.json';

const TRANSIT_TABS = [
  { key:'semua',    label:'Semua' },
  { key:'stasiun',  label:'Stasiun' },
  { key:'halte',    label:'Halte' },
  { key:'nonhalte', label:'Non-Halte' }
];
const IBADAH_TABS = [
  { key:'semua',     label:'Semua' },
  { key:'islam',     label:'Islam' },
  { key:'kristen',   label:'Kristen' },
  { key:'katolik',   label:'Katolik' },
  { key:'hindu',     label:'Hindu' },
  { key:'buddha',    label:'Buddha' },
  { key:'khonghucu', label:'Khonghucu' }
];
const EMPTY_MSG = {
  transit:   'Belum ada data transportasi terverifikasi di cakupan ini.',
  stasiun:   'Belum ada stasiun di cakupan ini. Pilih wilayah Semua untuk melihat yang terdekat.',
  halte:     'Belum ada halte terverifikasi di cakupan ini.',
  nonhalte:  'Belum ada titik non-halte terverifikasi di cakupan ini.',
  mall:      'Belum ada mal terverifikasi di cakupan ini.',
  wisata:    'Belum ada wisata terverifikasi di cakupan ini.',
  kopi:      'Belum ada kafe tercatat di cakupan ini. Bukan berarti tidak ada, hanya belum tercatat.',
  rs:        'Belum ada rumah sakit terverifikasi di cakupan ini.',
  klinik:    'Klinik dan puskesmas belum dimasukkan karena belum ada data yang terverifikasi.',
  pendidikan:'Belum ada kampus terverifikasi di cakupan ini. Data Kota Bekasi belum dikumpulkan.'
};
function ibadahEmptyMsg() {
  const t = IBADAH_TABS.find(x => x.key === ibTab);
  return `Belum ada rumah ibadah ${t && t.key !== 'semua' ? t.label + ' ' : ''}terverifikasi di cakupan ini. Bukan berarti tidak ada, hanya belum tercatat.`;
}

/* ════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════ */
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function kecName(id) {
  for (const m of Object.keys(CARTO)) {
    const t = CARTO[m].tiles.find(x => x.id === id);
    if (t) return t.name;
  }
  return id;
}
function modeOfKec(id) {
  return CARTO.kota.tiles.some(t => t.id === id) ? 'Kota Bekasi' : 'Kab. Bekasi';
}
function regionOfKec(id) {
  const regs = DATA[currentMode].regions;
  return Object.keys(regs).find(k => regs[k].kecs.includes(id)) || null;
}
const MODE_RE = /cikarang|jababeka|kab\.? bekasi|tambun|cibitung|deltamas|babelan|muaragembong/i;
function itemInMode(i) {
  if (i.kecs && i.kecs.length) return i.kecs.some(k => CARTO[currentMode].tiles.some(t => t.id === k));
  return (MODE_RE.test(i.name + ' ' + i.loc + ' ' + i.note) ? 'kabupaten' : 'kota') === currentMode;
}
function scopeMatch(i) {
  if (selKec) return i.kecs.includes(selKec);
  if (currentRegion === 'semua') return itemInMode(i);
  const r = DATA[currentMode].regions[currentRegion];
  return !!r && i.kecs.some(k => r.kecs.includes(k));
}
function filterItems(type) {
  return ITEMS.filter(i => i.type === type && scopeMatch(i) && matchQ(i));
}
function ibadahByAgama(a) {
  return ITEMS.filter(i => i.type === 'ibadah' && (a === 'semua' || i.agama === a) && scopeMatch(i) && matchQ(i));
}
function ibadahCurrent() {
  return ibadahByAgama(ibTab).sort((a, b) => a.name.localeCompare(b.name, 'id'));
}
function countsFor(kecId) {
  const c = { stasiun:0, mall:0, ibadah:0, wisata:0, kesehatan:0 };
  ITEMS.forEach(i => {
    if (!i.kecs.includes(kecId)) return;
    const k = (i.type === 'rs' || i.type === 'klinik') ? 'kesehatan' : i.type;
    if (c[k] !== undefined) c[k]++;
  });
  return c;
}
function kecLabelHtml(kecs, kel) {
  if (!kecs || !kecs.length) return `<div class="loc-chip unk">${ic('pin', 13)}Kecamatan belum diketahui</div>`;
  if (kecs.length > 1) return `<div class="loc-chip multi">${ic('pin', 13)}Lintas / dekat batas: ${kecs.map(kecName).join(' · ')}</div>`;
  const id = kecs[0];
  return `<div class="loc-chip">${ic('pin', 13)}Kec. ${kecName(id)} · ${modeOfKec(id)}${kel ? ` · Kel./Desa ${esc(kel)}` : ''}</div>`;
}

/* ════════════════════════════════════════════════
   IBADAH JSON LOADER
════════════════════════════════════════════════ */
function loadIbadah() {
  fetch(IBADAH_JSON, { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(rows => {
      rows.forEach(r => {
        ITEMS.push(B(r.a, r.j, r.nm, r.al, r.kl || null, r.n || '', r.kc ? [r.kc] : []));
      });
      refreshMapData();
    })
    .catch(() => {});
}

