import domToImage from 'dom-to-image-more';
import defaultLogoUrl from '../logo-primary.webp?url';
import { pageTitles } from './data/page-titles.js';
import './styles/app.css';

const defaults = {
  textColor: '#008f48',
  fontSize: 56,
  logoWidth: 180,
  imageWidth: 1200,
  imageHeight: 630,
  backgroundColor: '#ffffff',
  shadowColor: '#171717',
  shadowSize: 0,
  titleShadowX: 2,
  titleShadowY: 2,
  titleShadowBlur: 4,
  titleShadowColor: '#171717',
  titleShadowOpacity: 35,
};
const fields = Object.keys(defaults);
const ui = Object.fromEntries(Array.from(document.querySelectorAll('[id]'), element => [element.id, element]));
const editedTitles = new Map();
let logoRatio = 0;
let loadingLogo = false;
let exporting = false;
let layoutIssue = '';

for (const [index, page] of pageTitles.entries()) {
  ui.page.add(new Option(page.route, index));
}

function titleKey() {
  return `${ui.page.value}:${ui.language.value}`;
}

function selectPage() {
  const index = Number(ui.page.value);
  ui.position.value = `${index + 1} de ${pageTitles.length}`;
  ui.previous.disabled = index === 0;
  ui.next.disabled = index === pageTitles.length - 1;
  ui.title.value = editedTitles.get(titleKey()) ?? pageTitles[index][ui.language.value];
  ui.status.textContent = '';
  renderPreview();
}

function resizePreview() {
  const { offsetWidth: width, offsetHeight: height } = ui.canvas;
  const scale = Math.min(1, ui.viewport.clientWidth / width, 640 / height);
  ui.viewport.style.height = `${height * scale}px`;
  ui.scale.style.width = `${width * scale}px`;
  ui.scale.style.transform = `scale(${scale})`;
}

function updateExportButton() {
  ui.export.disabled = Boolean(layoutIssue || loadingLogo || exporting);
}

function renderTitleShadow() {
  const controls = [ui.titleShadowX, ui.titleShadowY, ui.titleShadowBlur, ui.titleShadowOpacity];
  if (!controls.every(field => field.validity.valid) || ui.titleShadowOpacity.valueAsNumber === 0) {
    ui.previewTitle.style.textShadow = 'none';
    return;
  }

  const [x, y, blur, opacity] = controls.map(field => field.valueAsNumber);
  const alpha = Math.round(opacity * 255 / 100).toString(16).padStart(2, '0');
  ui.previewTitle.style.textShadow = `${x}px ${y}px ${blur}px ${ui.titleShadowColor.value}${alpha}`;
}

function renderPreview() {
  ui.canvas.style.backgroundColor = ui.backgroundColor.value;
  const shadowSize = ui.shadowSize.validity.valid ? ui.shadowSize.valueAsNumber : defaults.shadowSize;
  ui.canvas.style.boxShadow = shadowSize ? `inset 0 0 ${shadowSize}px ${ui.shadowColor.value}` : 'none';
  ui.previewTitle.textContent = ui.title.value;
  ui.previewTitle.lang = ui.language.value;
  ui.title.lang = ui.language.value;
  ui.previewTitle.style.color = ui.textColor.value;
  renderTitleShadow();
  const fontSize = ui.fontSize.validity.valid ? ui.fontSize.valueAsNumber : defaults.fontSize;
  ui.previewTitle.style.fontSize = `${fontSize}px`;

  const dimensionsValid = [ui.imageWidth, ui.imageHeight].every(field => field.validity.valid);
  if (dimensionsValid) {
    ui.canvas.style.width = `${ui.imageWidth.valueAsNumber}px`;
    ui.canvas.style.height = `${ui.imageHeight.valueAsNumber}px`;
  }

  const width = ui.canvas.clientWidth;
  const height = ui.canvas.clientHeight;
  const padding = Math.min(32, Math.floor(Math.min(width, height) / 8));
  const logoWidth = ui.logoWidth.validity.valid ? ui.logoWidth.valueAsNumber : defaults.logoWidth;
  ui.canvas.style.setProperty('--image-padding', `${padding}px`);
  ui.logo.style.width = `${logoWidth}px`;
  ui.logo.style.height = `${logoWidth * logoRatio}px`;
  const titleTop = logoRatio ? padding * 2 + ui.logo.offsetHeight : padding;
  ui.previewTitle.style.insetBlockStart = `${titleTop}px`;
  ui.size.textContent = `${width} × ${height} px`;
  resizePreview();

  layoutIssue = '';
  if (!fields.every(key => ui[key].validity.valid)) {
    layoutIssue = 'Introduce números enteros dentro de los límites de cada campo.';
  } else if (!ui.title.value.trim()) {
    layoutIssue = 'Escribe un título para descargar la imagen.';
  } else if (logoRatio && (logoWidth > width - 2 * padding || titleTop >= height - padding)) {
    layoutIssue = 'El logo no cabe junto al título. Reduce el ancho del logo o amplía la imagen.';
  } else if (ui.previewTitle.scrollHeight > ui.previewTitle.clientHeight) {
    layoutIssue = 'El título no cabe. Reduce el tamaño de letra o amplía la imagen.';
  }
  ui.validation.textContent = layoutIssue;
  updateExportButton();
}

async function handleLogoUpload() {
  const file = ui.logoFile.files[0];
  if (!file) return;
  ui.logoFile.value = '';
  if (!/\.(png|svg)$/i.test(file.name) || file.size === 0 || file.size > 5_000_000) {
    ui.status.textContent = 'Selecciona un archivo PNG o SVG de hasta 5 MB.';
    return;
  }

  loadingLogo = true;
  ui.logoFile.disabled = true;
  ui.reset.disabled = true;
  ui.status.textContent = 'Cargando logo…';
  updateExportButton();
  let objectUrl;
  try {
    const isPng = /\.png$/i.test(file.name);
    if (isPng) {
      const signature = new Uint8Array(await file.slice(0, 8).arrayBuffer());
      if (signature.join(',') !== '137,80,78,71,13,10,26,10') throw new Error('PNG inválido');
    } else {
      const svg = new DOMParser().parseFromString(await file.text(), 'image/svg+xml').documentElement;
      if (svg.localName !== 'svg' || svg.namespaceURI !== 'http://www.w3.org/2000/svg') {
        throw new Error('SVG inválido');
      }
    }
    objectUrl = URL.createObjectURL(new Blob([file], { type: isPng ? 'image/png' : 'image/svg+xml' }));
    await loadLogo(objectUrl, !isPng);
    ui.status.textContent = 'Logo cargado.';
  } catch {
    ui.status.textContent = 'No se pudo cargar el logo. Usa un PNG válido o un SVG autónomo.';
  } finally {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    loadingLogo = false;
    ui.logoFile.disabled = false;
    ui.reset.disabled = false;
    renderPreview();
  }
}

async function loadLogo(url, upscale = false) {
  const image = new Image();
  image.src = url;
  await image.decode();
  if (!image.naturalWidth || !image.naturalHeight) throw new Error('Logo sin dimensiones');

  // Incrusta el logo como PNG para que la captura no tenga que resolver su URL.
  const bitmap = document.createElement('canvas');
  const scale = Math.min(upscale ? Infinity : 1, 4096 / Math.max(image.naturalWidth, image.naturalHeight));
  bitmap.width = Math.max(1, Math.round(image.naturalWidth * scale));
  bitmap.height = Math.max(1, Math.round(image.naturalHeight * scale));
  bitmap.getContext('2d').drawImage(image, 0, 0, bitmap.width, bitmap.height);
  ui.logo.src = bitmap.toDataURL('image/png');
  logoRatio = image.naturalHeight / image.naturalWidth;
  ui.logo.hidden = false;
}

async function loadDefaultLogo() {
  loadingLogo = true;
  ui.logoFile.disabled = true;
  ui.reset.disabled = true;
  updateExportButton();
  try {
    await loadLogo(defaultLogoUrl);
  } catch {
    ui.status.textContent = 'No se pudo cargar el logo inicial. Puedes seleccionar otro logo.';
  } finally {
    loadingLogo = false;
    ui.logoFile.disabled = false;
    ui.reset.disabled = false;
    renderPreview();
  }
}

async function exportCurrentImage() {
  if (ui.export.disabled) return;
  exporting = true;
  ui.settings.disabled = true;
  ui.status.textContent = 'Generando PNG…';
  updateExportButton();
  const width = ui.imageWidth.valueAsNumber;
  const height = ui.imageHeight.valueAsNumber;
  const title = ui.previewTitle.textContent;
  const slug = title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  const safeTitle = Array.from(slug).slice(0, 60).join('').replace(/-+$/, '');
  const filename = `${safeTitle || 'imagen'}-${ui.language.value}.png`;

  try {
    if (logoRatio) await ui.logo.decode();
    const png = await domToImage.toPng(ui.canvas, { width, height, scale: 1, pixelRatio: 1 });
    const link = document.createElement('a');
    link.href = png;
    link.download = filename;
    link.click();
    ui.status.textContent = `Descarga iniciada: ${filename}`;
  } catch {
    ui.status.textContent = 'No se pudo generar el PNG. Vuelve a intentarlo con una imagen más pequeña o con otro logo.';
  } finally {
    exporting = false;
    ui.settings.disabled = false;
    updateExportButton();
  }
}

function resetEditorSettings() {
  for (const key of fields) ui[key].value = defaults[key];
  logoRatio = 0;
  ui.logo.hidden = true;
  ui.logo.removeAttribute('src');
  ui.status.textContent = 'Diseño restablecido. Se conservaron los títulos editados.';
  renderPreview();
}

ui.previous.addEventListener('click', () => {
  ui.page.selectedIndex -= 1;
  selectPage();
});
ui.next.addEventListener('click', () => {
  ui.page.selectedIndex += 1;
  selectPage();
});
ui.page.addEventListener('change', selectPage);
ui.language.addEventListener('change', selectPage);
ui.title.addEventListener('input', () => {
  editedTitles.set(titleKey(), ui.title.value);
  renderPreview();
});
for (const key of fields) ui[key].addEventListener('input', renderPreview);
ui.logoFile.addEventListener('change', handleLogoUpload);
ui.export.addEventListener('click', exportCurrentImage);
ui.reset.addEventListener('click', resetEditorSettings);
new ResizeObserver(resizePreview).observe(ui.viewport);
selectPage();
loadDefaultLogo();
