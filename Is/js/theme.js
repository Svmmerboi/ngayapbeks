/* ════════════════════════════════════════════════
   TEMA
════════════════════════════════════════════════ */
function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}
function updateThemeBtn() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  btn.innerHTML = currentTheme() === 'dark' ? ic('sun', 19) : ic('moon', 18);
}
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem('ngb-theme', t); } catch (e) {}
  updateThemeBtn();
}
function toggleTheme() {
  applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
}

