// --- Translations ---
const translations = {
  en: {
    results: 'RESULTS',
    settings: 'SETTINGS',
    go: 'GO',
    connections: 'Connections:',
    multi: 'Multi',
    single: 'Single',
    ping: 'Ping',
    download: 'Download',
    upload: 'Upload',
    changeServer: 'Change Server',
    contact: 'Contact',
    language: 'Language',
    mbps: 'Mbps',
    provider: 'Converge ICT Solutions Inc.',
    city: 'Caloocan',
    globe: 'Globe',
  },
  es: {
    results: 'RESULTADOS',
    settings: 'AJUSTES',
    go: 'INICIAR',
    connections: 'Conexiones:',
    multi: 'Múltiple',
    single: 'Único',
    ping: 'Ping',
    download: 'Descarga',
    upload: 'Subida',
    changeServer: 'Cambiar Servidor',
    contact: 'Contacto',
    language: 'Idioma',
    mbps: 'Mbps',
    provider: 'Converge ICT Solutions Inc.',
    city: 'Caloocan',
    globe: 'Globe',
  },
  fr: {
    results: 'RÉSULTATS',
    settings: 'PARAMÈTRES',
    go: 'DÉMARRER',
    connections: 'Connexions :',
    multi: 'Multiple',
    single: 'Unique',
    ping: 'Ping',
    download: 'Téléchargement',
    upload: 'Téléversement',
    changeServer: 'Changer de serveur',
    contact: 'Contact',
    language: 'Langue',
    mbps: 'Mbps',
    provider: 'Converge ICT Solutions Inc.',
    city: 'Caloocan',
    globe: 'Globe',
  },
  de: {
    results: 'ERGEBNISSE',
    settings: 'EINSTELLUNGEN',
    go: 'START',
    connections: 'Verbindungen:',
    multi: 'Mehrfach',
    single: 'Einzeln',
    ping: 'Ping',
    download: 'Download',
    upload: 'Upload',
    changeServer: 'Server wechseln',
    contact: 'Kontakt',
    language: 'Sprache',
    mbps: 'Mbps',
    provider: 'Converge ICT Solutions Inc.',
    city: 'Caloocan',
    globe: 'Globe',
  },
  zh: {
    results: '结果',
    settings: '设置',
    go: '开始',
    connections: '连接：',
    multi: '多路',
    single: '单路',
    ping: '延迟',
    download: '下载',
    upload: '上传',
    changeServer: '更换服务器',
    contact: '联系',
    language: '语言',
    mbps: '兆比特/秒',
    provider: 'Converge ICT Solutions Inc.',
    city: 'Caloocan',
    globe: 'Globe',
  },
};

let currentLang = 'en';

function t(key) {
  return translations[currentLang][key] || key;
}

// --- UI Rendering Functions ---
function renderSpeedtest() {
  document.getElementById('app').innerHTML = `
    <div class="main-container">
      <div class="top-links">
        <span class="top-link"><span>&#128202;</span>${t('results')}</span>
        <span class="top-link"><span>&#9881;</span>${t('settings')}</span>
      </div>
      <div class="circle-go">
        <button class="go-btn" id="goBtn">${t('go')}</button>
      </div>
      <div class="server-info">
        <div>${t('globe')} <span style="font-size:0.9em;color:#888;">180.190.109.181</span></div>
        <div class="server-row">
          <span class="server-label">${t('provider')}</span>
          <span style="color:rgb(176, 176, 176);">${t('city')}</span>
          <span class="server-link" id="changeServer">${t('changeServer')}</span>
        </div>
      </div>
      <div class="results" id="results">
        <div class="result-box">
          <div class="result-label">${t('ping')}</div>
          <div class="result-value" id="pingValue">-</div>
        </div>
        <div class="result-box">
          <div class="result-label">${t('download')}</div>
          <div class="result-value" id="downloadValue">-</div>
        </div>
        <div class="result-box">
          <div class="result-label">${t('upload')}</div>
          <div class="result-value" id="uploadValue">-</div>
        </div>
      </div>
      <div class="connections">
        ${t('connections')}
        <span class="conn-toggle">
          <button class="conn-btn active" id="multiBtn">${t('multi')}</button>
          <button class="conn-btn" id="singleBtn">${t('single')}</button>
        </span>
      </div>
    </div>
  `;
  document.getElementById('goBtn').onclick = () => runSpeedtest();
  document.getElementById('multiBtn').onclick = () => setConnectionMode('multi');
  document.getElementById('singleBtn').onclick = () => setConnectionMode('single');
  document.getElementById('changeServer').onclick = () => alert('Server selection not implemented.');
  // Update footer language label if present
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.previousSibling.textContent = t('language') + ':';
    // Update contact label if present
    const footer = langSelect.closest('footer');
    if (footer) {
      footer.querySelector('span').childNodes[0].textContent = t('contact') + ': ';
    }
  }
}

// --- Connection Toggle ---
let connectionMode = 'multi';
function setConnectionMode(mode) {
  connectionMode = mode;
  document.getElementById('multiBtn').classList.toggle('active', mode === 'multi');
  document.getElementById('singleBtn').classList.toggle('active', mode === 'single');
}

// --- Speedtest Logic ---
async function pingTest() {
  const url = "https://www.google.com/images/phd/px.gif";
  const start = performance.now();
  try {
    await fetch(url + "?cache=" + Math.random(), {cache: 'no-store'});
  } catch {}
  const end = performance.now();
  return (end - start).toFixed(0);
}

async function downloadTest() {
  const fileSize = 5 * 1024 * 1024; // 5MB
  const url = "https://speed.hetzner.de/5MB.bin";
  const start = performance.now();
  try {
    await fetch(url + "?cache=" + Math.random(), {cache: 'no-store'});
  } catch {}
  const end = performance.now();
  const duration = (end - start) / 1000;
  const speedMbps = ((fileSize * 8) / duration / 1e6);
  return speedMbps;
}

async function uploadTest() {
  const fileSize = 2 * 1024 * 1024; // 2MB
  const url = "https://httpbin.org/post";
  const data = new Uint8Array(fileSize);
  const start = performance.now();
  try {
    await fetch(url, { method: "POST", body: data });
  } catch {}
  const end = performance.now();
  const duration = (end - start) / 1000;
  const speedMbps = ((fileSize * 8) / duration / 1e6);
  return speedMbps;
}

async function runSpeedtest() {
  const goBtn = document.getElementById('goBtn');
  goBtn.disabled = true;
  goBtn.textContent = '...';
  // Reset
  document.getElementById('pingValue').textContent = '-';
  document.getElementById('downloadValue').textContent = '-';
  document.getElementById('uploadValue').textContent = '-';
  // Ping
  let ping = await pingTest();
  document.getElementById('pingValue').textContent = ping + ' ms';
  // Download
  let download = await downloadTest();
  document.getElementById('downloadValue').textContent = download.toFixed(1) + ' ' + t('mbps');
  // Upload
  let upload = await uploadTest();
  document.getElementById('uploadValue').textContent = upload.toFixed(1) + ' ' + t('mbps');
  // Done
  goBtn.disabled = false;
  goBtn.textContent = t('go');
}

// --- Language Change Handler ---
window.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener('change', (e) => {
      currentLang = langSelect.value;
      renderSpeedtest();
    });
  }
});

// --- Init ---
renderSpeedtest(); 