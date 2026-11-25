/* ════════════════════════════════════════════════
   BAGIKAN, LAPOR, RUTE, TOAST
════════════════════════════════════════════════ */
const REPORT_WA = ''; // isi nomor WhatsApp admin format 62812xxxx supaya tombol "Lapor" langsung membuka chat
function itemByKey(enc) { const k = decodeURIComponent(enc); return ITEMS.find(i => itemKey(i) === k); }
let toastTimer = null;
function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}
function copyText(txt) {
  if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(txt).then(() => true).catch(() => false);
  try {
    const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select();
    const ok = document.execCommand && document.execCommand('copy'); document.body.removeChild(ta);
    return Promise.resolve(!!ok);
  } catch (e) { return Promise.resolve(false); }
}
function shareItem(enc) {
  const i = itemByKey(enc); if (!i) return;
  const text = i.name + '\n' + displayLoc(i) + '\n' + mapsUrl(i);
  if (navigator.share) { navigator.share({ title: i.name, text: text }).catch(() => {}); return; }
  copyText(text).then(ok => toast(ok ? 'Info tempat disalin' : 'Gagal menyalin'));
}
function reportItem(enc) {
  const i = itemByKey(enc); if (!i) return;
  const text = 'Lapor data NgayapBeks!\nTempat: ' + i.name + '\nAlamat tercatat: ' + displayLoc(i) + '\nKoreksi: ';
  if (REPORT_WA) { window.open('https://wa.me/' + REPORT_WA + '?text=' + encodeURIComponent(text), '_blank'); return; }
  copyText(text).then(ok => toast(ok ? 'Teks laporan disalin. Tempel ke WhatsApp admin.' : 'Gagal menyalin teks laporan'));
}

const ROUTES = [
  { mode:'kota', title:'Bekasi Selatan sehari', area:'Pekayon & sekitarnya', desc:'Pagi di taman, ngopi, lanjut mal, lalu naik LRT.', stops:['Hutan Kota Patriot Bina Bangsa','Kopi Tuku (Pekayon)','Pakuwon Mall Bekasi','Revo Town Bekasi'] },
  { mode:'kota', title:'Summarecon Bekasi sehari', area:'Bekasi Utara', desc:'Jalan sore di danau, ngopi, lalu makan di mal.', stops:['Danau Summarecon','Kopi Nako (Summarecon)','Summarecon Mal Bekasi'] },
  { mode:'kabupaten', title:'Lippo Cikarang sehari', area:'Cikarang Selatan', desc:'Main air, ngopi, belanja, lalu sore di danau.', stops:['WaterBoom Lippo Cikarang','Mokka Coffee Cabana (Lippo Mall Cikarang)','Lippo Mall Cikarang','Danau Elysium'] },
  { mode:'kabupaten', title:'Tambun sehari', area:'Tambun Selatan', desc:'Museum dekat stasiun, waterpark, lalu ngopi di Grand Wisata.', stops:['Museum Bekasi','Go! Wet Waterpark','The Raffa Cafe And Coffee'] }
];
function routeItems(r) { return r.stops.map(n => ITEMS.find(i => i.name === n)).filter(Boolean); }
function routeMapsUrl(list) {
  const q = x => encodeURIComponent(x.name + ' Bekasi');
  let u = 'https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=' + q(list[0]) + '&destination=' + q(list[list.length - 1]);
  if (list.length > 2) u += '&waypoints=' + list.slice(1, -1).map(x => encodeURIComponent(x.name + ' Bekasi')).join('%7C');
  return u;
}
function saveRoute(idx) {
  const list = routeItems(ROUTES[idx]);
  list.forEach(i => { const k = itemKey(i); if (favs.indexOf(k) < 0) favs.push(k); });
  saveFavs(); renderFav();
  document.querySelectorAll('.fav-btn[data-fav]').forEach(b => { const on = favs.indexOf(decodeURIComponent(b.getAttribute('data-fav'))) > -1; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  toast(list.length + ' tempat masuk Daftar Ngayap');
}
function routesHtml() {
  const cards = ROUTES.map((r, idx) => ({ r, idx, list: routeItems(r) })).filter(x => x.r.mode === currentMode && x.list.length === x.r.stops.length).map(({ r, idx, list }) => `
    <div class="route-card">
      <div class="route-area">${ic('pin', 13)} ${r.area}</div>
      <div class="route-title">${r.title}</div>
      <div class="route-desc">${r.desc}</div>
      <ol class="route-stops">${list.map(i => `<li><span>${esc(i.name)}</span><em>${i.kecs && i.kecs[0] ? kecName(i.kecs[0]) : ''}</em></li>`).join('')}</ol>
      <div class="route-actions">
        <button class="more-btn" onclick="saveRoute(${idx})">${ic('bookmark', 15)} Simpan semua</button>
        <a class="maps-link" href="${routeMapsUrl(list)}" target="_blank" rel="noopener">${ic('map', 15)} Rute di Maps</a>
      </div>
    </div>`).join('');
  if (!cards) return '';
  return `
      <div class="divider"></div>
      <div class="section-label">Rute 1 Hari</div>
      <div class="section-title">Ngayap Tanpa Mikir</div>
      <p class="section-desc">Urutan tempat yang berdekatan, diambil dari data di atas. Simpan semuanya ke Daftar Ngayap dalam satu klik.</p>
      <div class="routes-grid">${cards}</div>`;
}

function toggleNote(btn) {
  const n = btn.previousElementSibling;
  const open = !n.classList.toggle('clamp');
  btn.textContent = open ? 'Ringkas' : 'Selengkapnya';
}

