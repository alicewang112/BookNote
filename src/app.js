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

const seedInboxItems = [
  { id: 1, state: '待补书籍信息', title: '图片摘抄 21:04', desc: '已保存纸质书图片，等待补充书籍信息。' },
  { id: 2, state: '待补书籍信息', title: '未命名摘抄', desc: '已保存文字，尚未关联书籍。' },
  { id: 3, state: '未分类', title: 'Kindle 高亮片段', desc: '来自 My Clippings.txt，等待批量导入。' }
];

const appVersion = 'v0.4';
const storageKey = 'booknote.notes.v1';
let inboxItems = loadSavedNotes();

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
  mode: '拍照存图',
  excerptText: '',
  noteText: '',
  upload: null,
  uploadStatus: '',
  maskDataUrl: '',
  cropDataUrl: '',
  organizeItemId: null,
  selectedOrganizeBookId: books[0].id,
  saved: false
};

const $root = document.querySelector('#root');

function icon(name, size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
}

function loadSavedNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return Array.isArray(saved) && saved.length ? saved : seedInboxItems;
  } catch {
    return seedInboxItems;
  }
}

function persistNotes() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(inboxItems));
    return true;
  } catch {
    return false;
  }
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
  const archivedItems = inboxItems.filter((item) => item.state === '已归档' && item.bookId === book.id);
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
      ${archivedItems.map((item) => `<article class="quote-card archived-quote">
        <div class="quote-top"><span>${item.image ? '图片摘抄' : '文字摘抄'}</span><button aria-label="收藏">${icon('star', 16)}</button></div>
        ${item.image ? `<img class="inbox-thumb" src="${item.image}" alt="${item.title}">` : ''}
        ${item.text ? `<p>${item.text}</p>` : ''}
        ${item.note ? `<div class="tag-row"><span>${item.note}</span></div>` : ''}
      </article>`).join('')}
    </div>
  </section>`;
}

function inboxScreen() {
  const activeItems = inboxItems.filter((item) => item.state !== '已归档');
  return `<main class="screen-content">
    <header class="topbar compact"><div><h1>Inbox</h1><p>先保存，之后再整理。</p></div><span class="count-dot">${activeItems.length}</span></header>
    <div class="inbox-summary">
      ${['未分类', '待补书籍信息', '图片摘抄'].map((item) => {
        const count = item === '图片摘抄' ? activeItems.filter((x) => x.image).length : activeItems.filter((x) => x.state === item).length;
        return `<div><strong>${count}</strong><span>${item}</span></div>`;
      }).join('')}
    </div>
    <section class="inbox-list">
      ${activeItems.length ? activeItems.map((item) => `<article class="inbox-item"><span>${item.state}</span><h2>${item.title}</h2><p>${item.desc}</p>${item.image ? `<img class="inbox-thumb" src="${item.image}" alt="${item.title}">` : ''}${item.text ? `<blockquote>${item.text}</blockquote>` : ''}<button data-organize="${item.id}">整理 ${icon('chevron', 16)}</button></article>`).join('') : `<article class="empty-inbox">${icon('check', 22)}<h2>Inbox 已清空</h2><p>新的图片或文字摘抄会先出现在这里。</p></article>`}
    </section>
  </main>`;
}

function settingsScreen() {
  return `<main class="screen-content">
    <header class="topbar compact"><div><h1>设置</h1><p>导出、保存与同步偏好。</p></div></header>
    <section class="settings-list">
      <button>${icon('download', 19)} 数据导出 <span>Markdown / JSON</span></button>
      <button>${icon('image', 19)} 图片摘抄 <span>本地保存</span></button>
      <button>${icon('archive', 19)} 同步功能 <span>未来可选</span></button>
      <button class="version-row">${icon('book', 19)} 版本 <span>${appVersion}</span></button>
    </section>
  </main>`;
}

function addSheet() {
  if (!state.addOpen) return '';
  const modes = [
    ['拍照存图', 'camera'],
    ['上传图片', 'image'],
    ['粘贴文字', 'file']
  ];
  const body = state.mode === '粘贴文字'
    ? textEntry()
    : `<section class="capture-card">
        ${state.upload ? imageRegionEditor() : uploadPrompt()}
        <label>摘抄说明<textarea data-action="note">${state.noteText}</textarea></label>
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

function textEntry() {
  return `<section class="capture-card">
    <div class="paste-card">${icon('file', 26)}<h3>粘贴 Kindle 摘抄</h3><p>从 Kindle 或微信读书复制文字，直接粘贴保存，之后再整理书籍和标签。</p></div>
    <label>摘抄内容<textarea class="text-entry" data-action="excerpt" placeholder="把要保存的文字粘贴到这里">${state.excerptText}</textarea></label>
    <div class="form-row"><label>页码/位置<input value="位置 128"></label><label>标签<input value="Kindle, 摘抄"></label></div>
    <label>感想<input value="${state.noteText || ''}" placeholder="可选"></label>
  </section>`;
}

function uploadPrompt() {
  return `<label class="image-placeholder upload-drop">
    ${fileInput()}
    ${icon(state.mode === '拍照存图' ? 'camera' : 'image', 24)}
    <span>${state.mode === '拍照存图' ? '拍照保存纸质书页面' : '从相册上传摘抄图片'}</span>
    <small>${state.uploadStatus || '先保存原图，之后整理时再补文字。'}</small>
  </label>`;
}

function fileInput() {
  return `<input class="file-input" data-action="image-file" type="file" accept="image/*" ${state.mode === '拍照存图' ? 'capture="environment"' : ''} onchange="window.bookNoteHandleImageFile(this.files && this.files[0])">`;
}

function imageRegionEditor() {
  return `<div class="region-editor">
    <div class="region-head">
      <div><strong>${state.upload.name}</strong><span>${state.upload.width} x ${state.upload.height}</span></div>
      <label>${fileInput()}${icon('image', 16)} 换图</label>
    </div>
    <div class="region-stage" data-region-canvas>
      <canvas data-canvas="image"></canvas>
      <canvas data-canvas="mask"></canvas>
    </div>
    <div class="brush-toolbar">
      <button type="button" data-action="use-selection">${icon('spark', 16)} 保存选区</button>
      <button type="button" data-action="clear-selection">清除涂抹</button>
      <button type="button" data-action="use-full-image">整张图片</button>
    </div>
    <p class="region-hint">可以直接保存整张图，也可以涂抹摘抄区域后保存选区，减少之后回看时的干扰。</p>
    ${state.cropDataUrl ? `<div class="crop-preview"><span>将保存此图片</span><img src="${state.cropDataUrl}" alt="摘抄图片预览"></div>` : ''}
  </div>`;
}

function organizeSheet() {
  if (!state.organizeItemId) return '';
  const item = inboxItems.find((entry) => entry.id === state.organizeItemId);
  if (!item) return '';
  const selectedBook = books.find((book) => book.id === state.selectedOrganizeBookId) || books[0];

  return `<div class="sheet-backdrop" role="dialog" aria-modal="true">
    <div class="add-sheet organize-sheet">
      <div class="sheet-handle"></div>
      <header class="sheet-header">
        <div><h2>整理到书籍</h2><p>选择一本书，摘抄会从 Inbox 移到书籍详情。</p></div>
        <button class="icon-button" data-action="close-organize" aria-label="关闭" title="关闭">${icon('x', 20)}</button>
      </header>
      <article class="organize-preview">
        <span>${item.image ? '图片摘抄' : '文字摘抄'}</span>
        <h3>${item.title}</h3>
        ${item.image ? `<img src="${item.image}" alt="${item.title}">` : ''}
        ${item.text ? `<blockquote>${item.text}</blockquote>` : ''}
      </article>
      <section class="book-picker" aria-label="选择书籍">
        ${books.map((book) => `<button class="${book.id === selectedBook.id ? 'selected' : ''}" data-pick-book="${book.id}">
          ${cover(book)}
          <span><strong>${book.title}</strong><small>${book.author} · ${book.status}</small></span>
          ${book.id === selectedBook.id ? icon('check', 18) : icon('chevron', 18)}
        </button>`).join('')}
      </section>
      <button class="save-button" data-action="confirm-organize">${icon('check', 18)} 归档到《${selectedBook.title}》</button>
    </div>
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
    <p>纸质书直接存图、Kindle 摘抄手动粘贴、Inbox 暂存和书架归档，全部围绕“先保存，后整理”。</p>
    <div class="context-steps"><span>${icon('camera', 17)} 拍照存图</span><span>${icon('book', 17)} 自动归档</span><span>${icon('tag', 17)} 标签回顾</span></div>
  </aside>`;
}

function render() {
  const screen = state.tab === 'Inbox' ? inboxScreen() : state.tab === '设置' ? settingsScreen() : homeScreen();
  $root.innerHTML = `<div class="app-canvas">${desktopContext()}<div class="phone-shell">${screen}${bottomNav()}</div>${addSheet()}${organizeSheet()}</div>`;
  mountRegionCanvas();
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  const { action, status, book, mode, nav, organize, pickBook } = target.dataset;
  if (action === 'open-add' || nav === '新增') state.addOpen = true;
  if (action === 'close-add') state.addOpen = false;
  if (action === 'close-organize') {
    state.organizeItemId = null;
    render();
    return;
  }
  if (action === 'confirm-organize') {
    confirmOrganize();
    return;
  }
  if (organize) {
    state.organizeItemId = Number(organize);
    state.selectedOrganizeBookId = books[0].id;
    render();
    return;
  }
  if (pickBook) {
    state.selectedOrganizeBookId = Number(pickBook);
    render();
    return;
  }
  if (action === 'clear-selection') {
    state.maskDataUrl = '';
    state.cropDataUrl = '';
    render();
    return;
  }
  if (action === 'use-selection') {
    cropSelectedRegion(false).then(() => render());
    return;
  }
  if (action === 'use-full-image') {
    cropSelectedRegion(true).then(() => render());
    return;
  }
  if (action === 'save') {
    saveCurrentEntry();
    return;
  }
  if (status) state.status = status;
  if (book) state.selectedBookId = Number(book);
  if (mode) {
    state.mode = mode;
    state.upload = null;
    state.uploadStatus = '';
    state.maskDataUrl = '';
    state.cropDataUrl = '';
    state.excerptText = '';
    state.noteText = '';
  }
  if (nav && nav !== '新增') state.tab = nav;
  render();
});

window.bookNoteHandleImageFile = (file) => {
  if (!file) return;
  state.upload = null;
  state.uploadStatus = `正在读取 ${file.name || '图片'}...`;
  state.maskDataUrl = '';
  state.cropDataUrl = '';
  render();

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
      state.uploadStatus = '';
      state.maskDataUrl = '';
      state.cropDataUrl = '';
      state.noteText = '已选择图片。可直接保存整张图，或涂抹区域后点“保存选区”。';
      render();
    });
    image.addEventListener('error', () => {
      state.uploadStatus = '这张图片暂时无法预览，请换成 JPG 或 PNG 后再试。';
      state.noteText = state.uploadStatus;
      render();
    });
    image.src = reader.result;
  });
  reader.addEventListener('error', () => {
    state.uploadStatus = '图片读取失败，请重新选择。';
    state.noteText = state.uploadStatus;
    render();
  });
  reader.readAsDataURL(file);
};

document.addEventListener('input', (event) => {
  if (event.target.dataset.action === 'query') state.query = event.target.value;
  if (event.target.dataset.action === 'excerpt') state.excerptText = event.target.value;
  if (event.target.dataset.action === 'note') state.noteText = event.target.value;
  render();
  const selector = `[data-action="${event.target.dataset.action}"]`;
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
  const hostWidth = host.clientWidth || 320;
  const displayWidth = Math.round(hostWidth);
  const displayHeight = Math.max(120, Math.round(displayWidth * (state.upload.height / state.upload.width)));
  host.style.aspectRatio = `${state.upload.width} / ${state.upload.height}`;
  imageCanvas.width = displayWidth;
  imageCanvas.height = displayHeight;
  maskCanvas.width = displayWidth;
  maskCanvas.height = displayHeight;
  imageCanvas.style.width = `${displayWidth}px`;
  imageCanvas.style.height = `${displayHeight}px`;
  maskCanvas.style.width = `${displayWidth}px`;
  maskCanvas.style.height = `${displayHeight}px`;

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

async function cropSelectedRegion(useFullImage) {
  if (!state.upload) return;
  const imageCanvas = document.querySelector('[data-canvas="image"]');
  const maskCanvas = document.querySelector('[data-canvas="mask"]');
  if (!imageCanvas || !maskCanvas) return;

  const box = useFullImage ? { x: 0, y: 0, width: imageCanvas.width, height: imageCanvas.height } : selectedBox(maskCanvas);
  if (!box) {
    state.noteText = '还没有涂抹选区。请用手指划过要保存的图片区域。';
    render();
    return;
  }

  const padding = 10;
  const x = Math.max(0, box.x - padding);
  const y = Math.max(0, box.y - padding);
  const width = Math.min(imageCanvas.width - x, box.width + padding * 2);
  const height = Math.min(imageCanvas.height - y, box.height + padding * 2);
  const scaleX = state.upload.width / imageCanvas.width;
  const scaleY = state.upload.height / imageCanvas.height;
  const sourceX = Math.round(x * scaleX);
  const sourceY = Math.round(y * scaleY);
  const sourceWidth = Math.round(width * scaleX);
  const sourceHeight = Math.round(height * scaleY);
  const crop = document.createElement('canvas');
  crop.width = sourceWidth;
  crop.height = sourceHeight;
  const source = await loadImage(state.upload.dataUrl);
  crop.getContext('2d').drawImage(source, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
  state.cropDataUrl = crop.toDataURL('image/png');
  return state.cropDataUrl;
}

function saveCurrentEntry() {
  const isText = state.mode === '粘贴文字';
  const image = state.cropDataUrl || state.upload?.dataUrl || '';
  const text = state.excerptText.trim();

  if (!isText && !image) {
    state.uploadStatus = '请先拍照或上传一张图片。';
    render();
    return;
  }

  if (isText && !text) {
    state.excerptText = '请先粘贴要保存的文字。';
    render();
    return;
  }

  const now = new Date();
  const item = {
    id: Date.now(),
    state: isText ? '未分类' : '待补书籍信息',
    title: isText ? `文字摘抄 ${timeLabel(now)}` : `图片摘抄 ${timeLabel(now)}`,
    desc: isText ? '来自手动粘贴，等待关联书籍。' : '已保存图片，等待补充书籍信息。',
    image,
    text,
    note: state.noteText,
    createdAt: now.toISOString()
  };

  inboxItems = [item, ...inboxItems];
  const persisted = persistNotes();
  if (!persisted) {
    inboxItems = inboxItems.filter((savedItem) => savedItem.id !== item.id);
    state.noteText = '保存失败：浏览器本地空间可能不足。可以先保存选区，或换一张更小的图片。';
    render();
    return;
  }
  state.saved = true;
  render();
  window.setTimeout(() => {
    state.saved = false;
    state.addOpen = false;
    state.tab = 'Inbox';
    state.upload = null;
    state.uploadStatus = '';
    state.maskDataUrl = '';
    state.cropDataUrl = '';
    state.excerptText = '';
    state.noteText = '';
    render();
  }, 650);
}

function confirmOrganize() {
  const item = inboxItems.find((entry) => entry.id === state.organizeItemId);
  const book = books.find((entry) => entry.id === state.selectedOrganizeBookId);
  if (!item || !book) return;

  inboxItems = inboxItems.map((entry) => {
    if (entry.id !== item.id) return entry;
    return {
      ...entry,
      state: '已归档',
      bookId: book.id,
      bookTitle: book.title,
      desc: `已归档到《${book.title}》。`,
      organizedAt: new Date().toISOString()
    };
  });

  if (!persistNotes()) {
    inboxItems = loadSavedNotes();
    state.organizeItemId = null;
    render();
    return;
  }

  state.organizeItemId = null;
  state.selectedBookId = book.id;
  state.tab = '书架';
  render();
}

function timeLabel(date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', reject);
    image.src = src;
  });
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
