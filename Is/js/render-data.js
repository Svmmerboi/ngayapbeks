/* ════════════════════════════════════════════════
   DATA BLOCKS
════════════════════════════════════════════════ */
function itemKey(i) { return i.type + '|' + i.name; }
function encKey(k) { return encodeURIComponent(k).replace(/'/g, '%27'); }
function displayLoc(i) {
  return (i.loc || '').replace(/\s*\([^)]*belum (?:terverifikasi|diverifikasi)[^)]*\)/gi, '').trim();
}
function checkHint(i) {
  const parts = [];
  if (!i.kecs || !i.kecs.length) parts.push('Kecamatan belum terverifikasi');
  const m = (i.loc || '').match(/\(([^)]*belum (?:terverifikasi|diverifikasi)[^)]*)\)/i);
  if (m) parts.push(m[1].charAt(0).toUpperCase() + m[1].slice(1));
  if (/perkiraan|perlu cek/i.test((i.loc || '') + ' ' + (i.note || ''))) parts.push('Sebagian data berupa perkiraan');
  return parts.join('; ') || 'Data belum sepenuhnya terverifikasi';
}
function mapsUrl(i) {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(i.name + ' ' + displayLoc(i) + ' Bekasi');
}
function itemCard(i) {
  const k = encKey(itemKey(i));
  const on = favs.indexOf(itemKey(i)) > -1;
  const long = (i.note || '').length > 95;
  const need = !isVerified(i);
  return `
    <div class="t-item">
      <div class="t-item-top">
        <div class="t-name">${esc(i.name)}${NEW_SET.has(itemKey(i)) ? '<span class="new-pill">Baru</span>' : ''}${need ? `<span class="check-pill" title="${esc(checkHint(i))}" tabindex="0">Perlu cek</span>` : ''}</div>
        <span class="t-badge ${i.badge}">${esc(i.badgeText)}</span>
      </div>
      ${kecLabelHtml(i.kecs, i.kel)}
      <div class="t-loc">${esc(displayLoc(i))}</div>
      <div class="t-note ${long ? 'clamp' : ''}">${esc(i.note)}</div>
      ${long ? `<button class="t-more" onclick="toggleNote(this)">Selengkapnya</button>` : ''}
      <div class="t-actions">
        <a class="maps-link" href="${mapsUrl(i)}" target="_blank" rel="noopener">${ic('map', 15)} Buka di Maps</a>
        <span class="act-r">
          <span class="menu-wrap">
            <button class="fav-btn" onclick="toggleMenu(event, this)" aria-label="Aksi lain" aria-haspopup="true" title="Aksi lain">${ic('more', 16)}</button>
            <span class="mini-menu" hidden>
              <button onclick="shareItem('${k}')">${ic('share', 14)} Bagikan</button>
              <button onclick="reportItem('${k}')">${ic('flag', 14)} Lapor data salah</button>
            </span>
          </span>
          <button class="fav-btn ${on ? 'on' : ''}" data-fav="${k}" onclick="toggleFav('${k}')" aria-pressed="${on}" aria-label="Simpan ke Daftar Ngayap" title="Simpan ke Daftar Ngayap">${ic('bookmark', 17)}</button>
        </span>
      </div>
    </div>`;
}
function closeMenus() { document.querySelectorAll('.mini-menu').forEach(m => m.hidden = true); }
function toggleMenu(e, btn) {
  e.stopPropagation();
  const m = btn.nextElementSibling, wasHidden = m.hidden;
  closeMenus(); m.hidden = !wasHidden;
}
document.addEventListener('click', closeMenus);

