const books = [
  { id: 1, title: '时间的纹理', author: '林序', status: '在读', excerpts: 18, updated: '今天 21:18', finish: '', color: '#315f55', accent: '#d39c43' },
  { id: 2, title: '慢阅读手册', author: '许知白', status: '想读', excerpts: 3, updated: '昨天', finish: '', color: '#8c5d4a', accent: '#f1d7a0' },
  { id: 3, title: '纸上远方', author: 'M. Chen', status: '已读', excerpts: 42, updated: '5月6日', finish: '2026-04-28', color: '#27364a', accent: '#a9c8bd' },
  { id: 4, title: 'Thinking Notes', author: 'Ava Moon', status: '在读', excerpts: 11, updated: '5月5日', finish: '', color: '#58633b', accent: '#e4b85a' }
];

const excerpts = [
  { id: 1, book: '时间的纹理', page: 'P.126', text: '真正留下来的知识，往往不是被整理得最漂亮的那一部分，而是能在需要时再次被遇见的那一部分。', tags: ['知识管理', '复盘'], note: '适合作为 Inbox 设计原则。', created: '21:18' },
  { id: 2, book: '纸上远方', page: '位置 842', text: '阅读不是逃离现实，而是让现实拥有更多入口。', tags: ['阅读', 'Kindle'], note: 'Kindle 导入示例。', created: '5月6日' }
];

const inboxItems = [
  { id: 1, state: '待OCR校对', title: '图片摘抄 21:04', desc: '识别到 87 个字，需要确认断句。' },
  { id: 2, state: '待补书籍信息', title: '未命名摘抄', desc: '已保存文字，尚未关联书籍。' },
  { id: 3, state: '未分类', title: 'Kindle 高亮片段', desc: '来自 My Clippings.txt，等待批量导入。' }
];

const icons = {
  archive: '<path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a2 2 0 0 1 2-2h7V5H5a2 2 0 0 0-2 2z"/><path d="M21 18a2 2 0 0 0-2-2h-7V5h7a2 2 0 0 1 2 2z"/>',
  camera: '<path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3z"/><circle cx="12" cy="13" r="3"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="m5.5 4-3 8v6a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-6l-3-8z"/>',
  library: '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  settings: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7.1 4l.1.1a1.7 1.7 0 0 0 1.9.3h.1A1.7 1.7 0 0 0 10 2.9V3a2 2 0 1 1 4 0v-.1a1.7 1.7 0 0 0 1 1.6h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.9 7l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1A1.7 1.7 0 0 0 21.1 10H21a2 2 0 1 1 0 4h.1a1.7 1.7 0 0 0-1.7 1z"/>',
  spark: '<path d="m12 3 1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8z"/><path d="M19 3v4"/><path d="M21 5h-4"/>',
  star: '<path d="m12 2 3 6.2 6.8 1-4.9 4.8 1.2 6.8-6.1-3.2-6.1 3.2 1.2-6.8-4.9-4.8 6.8-1z"/>',
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r=".8"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
};

const state = {
  tab: '书架',
  selectedBookId: 1,
  status: '在读',
  query: '',
  addOpen: false,
  mode: '拍照OCR',
  ocrText: '阅读的意义不在于占有更多句子，而在于让某些句子改变我们看世界的方式。',
  upload: null,
  maskDataUrl: '',
  cropDataUrl: '',
  saved: false
};

const $root = document.querySelector('#root');

function icon(name, size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
}

function cover(book, large = false) {
  return `<div class="cover ${large ? 'cover-large' : ''}" style="--cover:${book.color};--cover-accent:${book.accent}">
    <span class="cover-mark"></span><strong>${book.title}</strong><small>${book.author}</small>
  </div>`;
}

function homeScreen() {
  const selected = books.find((book) => book.id === state.selectedBookId) || books[0];
  const filtered = books.filter((book) => {
    const matchesStatus = state.status === '全部' || book.status === state.status;
    const matchesQuery = `${book.title}${book.author}`.toLowerCase().includes(state.query.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return `<main class="screen-content">
    <header class="topbar">
      <div><h1>BookNote</h1><p>拍照、导入、稍后整理。</p></div>
      <button class="icon-button" data-action="open-add" aria-label="新增摘抄" title="新增摘抄">${icon('plus', 21)}</button>
    </header>
    <label class="search-box">${icon('search', 18)}<input data-action="query" value="${state.query}" placeholder="搜索书名或作者"></label>
    <div class="status-tabs" role="tablist" aria-label="阅读状态">
      ${['全部', '想读', '在读', '已读'].map((item) => `<button class="${state.status === item ? 'active' : ''}" data-status="${item}">${item}</button>`).join('')}
    </div>
    <section class="shelf-strip" aria-label="封面墙">
      ${books.map((book) => `<button class="${selected.id === book.id ? 'active' : ''}" data-book="${book.id}">${cover(book, true)}</button>`).join('')}
    </section>
    <section class="section-block">
      <div class="section-head"><h2>最近更新</h2><span>${filtered.length} 本</span></div>
      <div class="book-list">
        ${filtered.map((book) => `<button class="book-row ${selected.id === book.id ? 'selected' : ''}" data-book="${book.id}">
          ${cover(book)}
          <span class="book-copy"><strong>${book.title}</strong><small>${book.author} · ${book.excerpts} 条摘抄</small></span>
          <span class="book-meta"><em>${book.status}</em><small>${book.updated}</small></span>
          ${icon('chevron', 18)}
        </button>`).join('')}
      </div>
    </section>
    ${bookDetail(selected)}
  </main>`;
}

function bookDetail(book) {
  return `<section class="detail-panel">
    <div class="detail-hero">
      ${cover(book, true)}
      <div>
        <span class="quiet-label">书籍详情</span>
        <h2>${book.title}</h2>
        <p>${book.author} · ${book.status}</p>
        <div class="detail-stats"><span>${book.excerpts} 条摘抄</span><span>${book.finish || '未完成'}</span></div>
      </div>
    </div>
    <div class="quote-list">
      ${excerpts.map((item) => `<article class="quote-card">
        <div class="quote-top"><span>${item.page}</span><button aria-label="收藏">${icon('star', 16)}</button></div>
        <p>${item.text}</p>
        <div class="tag-row">${item.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
      </article>`).join('')}
    </div>
  </section>`;
}

function inboxScreen() {
  return `<main class="screen-content">
    <header class="topbar compact"><div><h1>Inbox</h1><p>先保存，之后再整理。</p></div><span class="count-dot">${inboxItems.length}</span></header>
    <div class="inbox-summary">
      ${['未分类', '待补书籍信息', '待OCR校对'].map((item) => `<div><strong>${inboxItems.filter((x) => x.state === item).length}</strong><span>${item}</span></div>`).join('')}
    </div>
    <section class="inbox-list">
      ${inboxItems.map((item) => `<article class="inbox-item"><span>${item.state}</span><h2>${item.title}</h2><p>${item.desc}</p><button>整理 ${icon('chevron', 16)}</button></article>`).join('')}
    </section>
  </main>`;
}

function settingsScreen() {
  return `<main class="screen-content">
    <header class="topbar compact"><div><h1>设置</h1><p>导出、OCR 与同步偏好。</p></div></header>
    <section class="settings-list">
      <button>${icon('download', 19)} 数据导出 <span>Markdown / JSON</span></button>
      <button>${icon('spark', 19)} OCR语言 <span>中文 + 英文</span></button>
      <button>${icon('archive', 19)} 同步功能 <span>未来可选</span></button>
    </section>
  </main>`;
}

function addSheet() {
  if (!state.addOpen) return '';
  const modes = [
    ['拍照OCR', 'camera'],
    ['上传图片', 'image'],
    ['Kindle导入', 'upload']
  ];
  const body = state.mode === 'Kindle导入'
    ? `<section class="import-card">${icon('file', 26)}<h3>导入 My Clippings.txt</h3><p>自动解析书名、作者、位置和高亮内容，按书籍分类后批量保存。</p><button>${icon('upload', 17)} 选择文件</button></section>`
    : `<section class="ocr-card">
        <input class="file-input" id="note-image-input" data-action="image-file" type="file" accept="image/*" ${state.mode === '拍照OCR' ? 'capture="environment"' : ''}>
        ${state.upload ? imageRegionEditor() : uploadPrompt()}
        <label>OCR识别<textarea data-action="ocr">${state.ocrText}</textarea></label>
        <div class="form-row"><label>页码<input value="P.128"></label><label>标签<input value="阅读, 方法"></label></div>
        <label>感想<input value="这句适合放进回顾清单。"></label>
      </section>`;

  return `<div class="sheet-backdrop" role="dialog" aria-modal="true">
    <div class="add-sheet">
      <div class="sheet-handle"></div>
      <header class="sheet-header">
        <div><h2>新增摘抄</h2><p>拍照即保存，也可以先放进 Inbox。</p></div>
        <button class="icon-button" data-action="close-add" aria-label="关闭" title="关闭">${icon('x', 20)}</button>
      </header>
      <div class="mode-grid">
        ${modes.map(([label, iconName]) => `<button class="${state.mode === label ? 'active' : ''}" data-mode="${label}">${icon(iconName, 19)}${label}</button>`).join('')}
      </div>
      ${body}
      <button class="save-button ${state.saved ? 'saved' : ''}" data-action="save">${state.saved ? icon('check', 18) : icon('plus', 18)}${state.saved ? '已保存到 Inbox' : '保存摘抄'}</button>
    </div>
  </div>`;
}

function uploadPrompt() {
  return `<label class="image-placeholder upload-drop" for="note-image-input">
    ${icon(state.mode === '拍照OCR' ? 'camera' : 'image', 24)}
    <span>${state.mode === '拍照OCR' ? '拍照选择纸质书页面' : '从相册上传摘抄图片'}</span>
    <small>选择后可用手指涂抹需要 OCR 的文字区域</small>
  </label>`;
}

function imageRegionEditor() {
  return `<div class="region-editor">
    <div class="region-head">
      <div><strong>${state.upload.name}</strong><span>${state.upload.width} x ${state.upload.height}</span></div>
      <label for="note-image-input">${icon('image', 16)} 换图</label>
    </div>
    <div class="region-stage" data-region-canvas>
      <canvas data-canvas="image"></canvas>
      <canvas data-canvas="mask"></canvas>
    </div>
    <div class="brush-toolbar">
      <button type="button" data-action="use-selection">${icon('spark', 16)} 识别选区</button>
      <button type="button" data-action="clear-selection">清除涂抹</button>
      <button type="button" data-action="use-full-image">整张图片</button>
    </div>
    <p class="region-hint">用手指涂抹文字区域。当前版本会先裁出选区预览，下一步接 OCR 引擎后就只识别这部分。</p>
    ${state.cropDataUrl ? `<div class="crop-preview"><span>选区预览</span><img src="${state.cropDataUrl}" alt="OCR选区预览"></div>` : ''}
  </div>`;
}

function bottomNav() {
  const items = [
    ['书架', 'home'],
    ['Inbox', 'inbox'],
    ['新增', 'plus', true],
    ['设置', 'settings']
  ];
  return `<nav class="bottom-nav" aria-label="主导航">
    ${items.map(([id, iconName, add]) => `<button class="${state.tab === id ? 'active' : ''} ${add ? 'add' : ''}" data-nav="${id}">${icon(iconName, add ? 24 : 20)}<span>${id}</span></button>`).join('')}
  </nav>`;
}

function desktopContext() {
  return `<aside class="desktop-context">
    <div class="brand-lockup">${icon('library', 28)}<span>摘书</span></div>
    <h2>把阅读摘抄变成一个低维护的个人知识库。</h2>
    <p>纸质书拍照 OCR、Kindle Clippings 导入、Inbox 暂存和书架归档，全部围绕“先保存，后整理”。</p>
    <div class="context-steps"><span>${icon('camera', 17)} 拍照OCR</span><span>${icon('book', 17)} 自动归档</span><span>${icon('tag', 17)} 标签回顾</span></div>
  </aside>`;
}

function render() {
  const screen = state.tab === 'Inbox' ? inboxScreen() : state.tab === '设置' ? settingsScreen() : homeScreen();
  $root.innerHTML = `<div class="app-canvas">${desktopContext()}<div class="phone-shell">${screen}${bottomNav()}</div>${addSheet()}</div>`;
  mountRegionCanvas();
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  const { action, status, book, mode, nav } = target.dataset;
  if (action === 'open-add' || nav === '新增') state.addOpen = true;
  if (action === 'close-add') state.addOpen = false;
  if (action === 'clear-selection') {
    state.maskDataUrl = '';
    state.cropDataUrl = '';
    render();
    return;
  }
  if (action === 'use-selection') {
    cropSelectedRegion(false);
    return;
  }
  if (action === 'use-full-image') {
    cropSelectedRegion(true);
    return;
  }
  if (action === 'save') {
    state.saved = true;
    render();
    window.setTimeout(() => {
      state.saved = false;
      state.addOpen = false;
      state.tab = 'Inbox';
      render();
    }, 850);
    return;
  }
  if (status) state.status = status;
  if (book) state.selectedBookId = Number(book);
  if (mode) state.mode = mode;
  if (nav && nav !== '新增') state.tab = nav;
  render();
});

document.addEventListener('change', (event) => {
  if (event.target.dataset.action !== 'image-file' || !event.target.files?.[0]) return;
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const image = new Image();
    image.addEventListener('load', () => {
      state.upload = {
        name: file.name || '摘抄图片',
        dataUrl: reader.result,
        width: image.naturalWidth,
        height: image.naturalHeight
      };
      state.maskDataUrl = '';
      state.cropDataUrl = '';
      state.ocrText = '已选择图片。请涂抹需要识别的文字区域，然后点“识别选区”。';
      render();
    });
    image.src = reader.result;
  });
  reader.readAsDataURL(file);
});

document.addEventListener('input', (event) => {
  if (event.target.dataset.action === 'query') state.query = event.target.value;
  if (event.target.dataset.action === 'ocr') state.ocrText = event.target.value;
  render();
  const selector = event.target.dataset.action === 'query' ? '[data-action="query"]' : '[data-action="ocr"]';
  const next = document.querySelector(selector);
  if (next) {
    next.focus();
    next.setSelectionRange(event.target.selectionStart, event.target.selectionEnd);
  }
});

render();

function mountRegionCanvas() {
  const host = document.querySelector('[data-region-canvas]');
  if (!host || !state.upload) return;

  const imageCanvas = host.querySelector('[data-canvas="image"]');
  const maskCanvas = host.querySelector('[data-canvas="mask"]');
  const displayWidth = Math.min(360, host.clientWidth || 320);
  const displayHeight = Math.max(160, Math.round(displayWidth * (state.upload.height / state.upload.width)));
  imageCanvas.width = displayWidth;
  imageCanvas.height = displayHeight;
  maskCanvas.width = displayWidth;
  maskCanvas.height = displayHeight;

  const imageContext = imageCanvas.getContext('2d');
  const maskContext = maskCanvas.getContext('2d');
  const image = new Image();

  image.addEventListener('load', () => {
    imageContext.clearRect(0, 0, displayWidth, displayHeight);
    imageContext.drawImage(image, 0, 0, displayWidth, displayHeight);
    maskContext.clearRect(0, 0, displayWidth, displayHeight);
    if (!state.maskDataUrl) return;
    const mask = new Image();
    mask.addEventListener('load', () => {
      maskContext.drawImage(mask, 0, 0, displayWidth, displayHeight);
    });
    mask.src = state.maskDataUrl;
  });
  image.src = state.upload.dataUrl;

  let drawing = false;
  const draw = (event) => {
    if (!drawing) return;
    const point = canvasPoint(maskCanvas, event);
    maskContext.lineWidth = 28;
    maskContext.lineCap = 'round';
    maskContext.lineJoin = 'round';
    maskContext.strokeStyle = 'rgba(213, 156, 60, 0.48)';
    maskContext.lineTo(point.x, point.y);
    maskContext.stroke();
  };

  maskCanvas.addEventListener('pointerdown', (event) => {
    drawing = true;
    maskCanvas.setPointerCapture(event.pointerId);
    const point = canvasPoint(maskCanvas, event);
    maskContext.beginPath();
    maskContext.moveTo(point.x, point.y);
    draw(event);
  });

  maskCanvas.addEventListener('pointermove', draw);
  maskCanvas.addEventListener('pointerup', () => {
    drawing = false;
    state.maskDataUrl = maskCanvas.toDataURL('image/png');
  });
  maskCanvas.addEventListener('pointercancel', () => {
    drawing = false;
    state.maskDataUrl = maskCanvas.toDataURL('image/png');
  });
}

function canvasPoint(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * canvas.width,
    y: ((event.clientY - rect.top) / rect.height) * canvas.height
  };
}

function cropSelectedRegion(useFullImage) {
  if (!state.upload) return;
  const imageCanvas = document.querySelector('[data-canvas="image"]');
  const maskCanvas = document.querySelector('[data-canvas="mask"]');
  if (!imageCanvas || !maskCanvas) return;

  const box = useFullImage ? { x: 0, y: 0, width: imageCanvas.width, height: imageCanvas.height } : selectedBox(maskCanvas);
  if (!box) {
    state.ocrText = '还没有涂抹 OCR 区域。请用手指划过需要识别的文字。';
    render();
    return;
  }

  const padding = 10;
  const x = Math.max(0, box.x - padding);
  const y = Math.max(0, box.y - padding);
  const width = Math.min(imageCanvas.width - x, box.width + padding * 2);
  const height = Math.min(imageCanvas.height - y, box.height + padding * 2);
  const crop = document.createElement('canvas');
  crop.width = width;
  crop.height = height;
  crop.getContext('2d').drawImage(imageCanvas, x, y, width, height, 0, 0, width, height);
  state.cropDataUrl = crop.toDataURL('image/png');
  state.ocrText = useFullImage
    ? '已选择整张图片作为 OCR 范围。下一步接入 OCR 后会自动填入识别文字。'
    : '已生成涂抹区域的 OCR 预览。下一步接入 OCR 后会只识别这个区域。';
  render();
}

function selectedBox(canvas) {
  const context = canvas.getContext('2d');
  const { width, height } = canvas;
  const data = context.getImageData(0, 0, width, height).data;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 8) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < minX || maxY < minY) return null;
  return { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}
