"use strict";
function mq(query) {
    try {
        return window.matchMedia(query).matches;
    }
    catch (_) {
        return false;
    }
}
function setText(id, value) {
    const el = document.getElementById(id);
    if (el)
        el.textContent = String(value);
}
function fmt(n, digits = 2) {
    return (Math.round(n * (10 ** digits)) / (10 ** digits)).toFixed(digits);
}
function getViewport() {
    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    return { width, height };
}
function initThemeToggle() {
    const themeToggle = document.querySelector('[data-toggle="theme"]');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }
    else if (systemPrefersDark) {
        html.setAttribute('data-theme', 'dark');
    }
    themeToggle?.addEventListener('click', function () {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}
function initGridToggle() {
    document.querySelectorAll('.grid-controls button').forEach(btn => {
        btn.addEventListener('click', function () {
            const gridType = this.dataset.toggle;
            const grid = document.querySelector(`[data-grid="${gridType}"]`);
            if (grid) {
                grid.classList.toggle('active');
                this.classList.toggle('active');
            }
        });
    });
}
function initMobileNav() {
    const toggle = document.getElementById('nav-mobile-toggle');
    const menu = document.getElementById('nav-menu');
    const navWrapper = document.querySelector('.nav-wrapper');
    if (!toggle || !menu)
        return;
    toggle.addEventListener('click', function () {
        const isOpen = menu.classList.toggle('is-open');
        navWrapper?.classList.toggle('nav-open', isOpen);
        this.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('nav-open', isOpen);
    });
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-open');
            navWrapper?.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        });
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
            menu.classList.remove('is-open');
            navWrapper?.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
            toggle.focus();
        }
    });
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addEventListener('change', (e) => {
        if (e.matches && menu.classList.contains('is-open')) {
            menu.classList.remove('is-open');
            navWrapper?.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        }
    });
}
function initSidebarToggle() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (!toggle || !sidebar)
        return;
    toggle.addEventListener('click', function () {
        const isOpen = sidebar.classList.toggle('is-open');
        this.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('sidebar-open', isOpen);
    });
    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 900) {
                sidebar.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('sidebar-open');
            }
        });
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
            sidebar.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('sidebar-open');
            toggle.focus();
        }
    });
    const mediaQuery = window.matchMedia('(min-width: 900px)');
    mediaQuery.addEventListener('change', (e) => {
        if (e.matches && sidebar.classList.contains('is-open')) {
            sidebar.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('sidebar-open');
        }
    });
}
function initLayersDemo() {
    window.toggleLayer = function (id) {
        const layer = document.getElementById('layer-' + id);
        const btn = document.getElementById('btn-' + id);
        layer?.classList.toggle('layer-box--hidden');
        btn?.classList.toggle('layer-btn--active');
    };
    window.showAll = function () {
        document.querySelectorAll('.layer-box').forEach(el => {
            el.classList.remove('layer-box--hidden');
        });
        document.querySelectorAll('.layer-btn').forEach(el => {
            if (el.id.startsWith('btn-')) {
                el.classList.add('layer-btn--active');
            }
        });
    };
    window.hideAll = function () {
        document.querySelectorAll('.layer-box').forEach(el => {
            el.classList.add('layer-box--hidden');
        });
        document.querySelectorAll('.layer-btn').forEach(el => {
            if (el.id.startsWith('btn-')) {
                el.classList.remove('layer-btn--active');
            }
        });
    };
}
function initDeviceDemo() {
    if (!document.getElementById('dev-width'))
        return;
    function classifyOrientation(width, height) {
        if (mq('(orientation: portrait)'))
            return 'portrait';
        if (mq('(orientation: landscape)'))
            return 'landscape';
        return width >= height ? 'landscape' : 'portrait';
    }
    function getColorScheme() {
        if (mq('(prefers-color-scheme: dark)'))
            return 'dark';
        if (mq('(prefers-color-scheme: light)'))
            return 'light';
        return 'no-preference';
    }
    function getReducedMotion() {
        if (mq('(prefers-reduced-motion: reduce)'))
            return 'reduce';
        if (mq('(prefers-reduced-motion: no-preference)'))
            return 'no-preference';
        return 'unknown';
    }
    function getPrefersContrast() {
        if (mq('(prefers-contrast: more)'))
            return 'more';
        if (mq('(prefers-contrast: less)'))
            return 'less';
        if (mq('(prefers-contrast: custom)'))
            return 'custom';
        if (mq('(prefers-contrast: no-preference)'))
            return 'no-preference';
        return 'unknown';
    }
    function getForcedColors() {
        if (mq('(forced-colors: active)'))
            return 'active';
        if (mq('(forced-colors: none)'))
            return 'none';
        return 'unknown';
    }
    function getHover() {
        if (mq('(hover: hover)'))
            return 'hover';
        if (mq('(hover: none)'))
            return 'none';
        return 'unknown';
    }
    function getPointer() {
        if (mq('(pointer: fine)'))
            return 'fine';
        if (mq('(pointer: coarse)'))
            return 'coarse';
        if (mq('(pointer: none)'))
            return 'none';
        return 'unknown';
    }
    function getAnyHover() {
        if (mq('(any-hover: hover)'))
            return 'hover';
        if (mq('(any-hover: none)'))
            return 'none';
        return 'unknown';
    }
    function getAnyPointer() {
        if (mq('(any-pointer: fine)'))
            return 'fine';
        if (mq('(any-pointer: coarse)'))
            return 'coarse';
        if (mq('(any-pointer: none)'))
            return 'none';
        return 'unknown';
    }
    function getColorGamut() {
        if (mq('(color-gamut: rec2020)'))
            return 'rec2020';
        if (mq('(color-gamut: p3)'))
            return 'p3';
        if (mq('(color-gamut: srgb)'))
            return 'srgb';
        return 'unknown';
    }
    function getDisplayMode() {
        if (mq('(display-mode: fullscreen)'))
            return 'fullscreen';
        if (mq('(display-mode: standalone)'))
            return 'standalone';
        if (mq('(display-mode: minimal-ui)'))
            return 'minimal-ui';
        if (mq('(display-mode: browser)'))
            return 'browser';
        return 'unknown';
    }
    function getReducedTransparency() {
        if (mq('(prefers-reduced-transparency: reduce)'))
            return 'reduce';
        if (mq('(prefers-reduced-transparency: no-preference)'))
            return 'no-preference';
        return 'unknown';
    }
    function getReducedData() {
        if (mq('(prefers-reduced-data: reduce)'))
            return 'reduce';
        if (mq('(prefers-reduced-data: no-preference)'))
            return 'no-preference';
        return 'unknown';
    }
    function scoreDeviceMatch({ width, dpr }, row) {
        const min = Number(row.dataset.min || '0');
        const max = Number(row.dataset.max || '0');
        const targetDpr = Number(row.dataset.dpr || '1');
        const inRange = width >= min && width <= max;
        const dprDelta = Math.abs((dpr || 1) - targetDpr);
        const dprOk = dprDelta <= 0.6;
        if (!inRange)
            return { match: false, label: '—' };
        if (!dprOk)
            return { match: true, label: 'width' };
        return { match: true, label: 'width + dpr' };
    }
    function updateUI() {
        const { width, height } = getViewport();
        const dpr = Number(window.devicePixelRatio || 1);
        setText('dev-width', width);
        setText('dev-height', height);
        setText('dev-dpr', dpr.toFixed(2));
        setText('dev-orientation', classifyOrientation(width, height));
        setText('dev-touch', (navigator.maxTouchPoints || 0));
        setText('mf-hover', getHover());
        setText('mf-pointer', getPointer());
        setText('mf-any-hover', getAnyHover());
        setText('mf-any-pointer', getAnyPointer());
        setText('mf-scheme', getColorScheme());
        setText('mf-motion', getReducedMotion());
        setText('mf-contrast', getPrefersContrast());
        setText('mf-forced', getForcedColors());
        setText('mf-gamut', getColorGamut());
        setText('mf-display', getDisplayMode());
        setText('mf-transparency', getReducedTransparency());
        setText('mf-data', getReducedData());
        const filterEl = document.getElementById('dev-filter');
        const filterValue = String(filterEl?.value || '').trim().toLowerCase();
        let matches = 0;
        document.querySelectorAll('.device-row').forEach(row => {
            const key = String(row.dataset.key || '').toLowerCase();
            const visible = !filterValue || key.includes(filterValue);
            row.classList.toggle('is-filtered', !visible);
            const badge = row.querySelector('[data-role="match"]');
            if (!visible) {
                row.classList.remove('is-match');
                if (badge)
                    badge.textContent = '—';
                return;
            }
            const result = scoreDeviceMatch({ width, dpr }, row);
            row.classList.toggle('is-match', result.match);
            if (badge)
                badge.textContent = result.label;
            if (result.match)
                matches += 1;
        });
        setText('dev-matches', matches);
    }
    window.addEventListener('resize', updateUI);
    window.addEventListener('orientationchange', updateUI);
    const filterEl = document.getElementById('dev-filter');
    if (filterEl)
        filterEl.addEventListener('input', updateUI);
    updateUI();
}
function initQScaleDemo() {
    if (!document.getElementById('qs-root'))
        return;
    const qSteps = [0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96, 112, 128, 144, 160, 192, 224, 256];
    const slider = document.getElementById('qs-range');
    function rootPx() {
        const raw = getComputedStyle(document.documentElement).fontSize;
        const value = Number.parseFloat(raw);
        return Number.isFinite(value) ? value : 16;
    }
    function toPx(step) {
        return (step * rootPx()) / 16;
    }
    function toRem(step) {
        return step / 16;
    }
    function setStep(step) {
        const stepNum = Number(step);
        const px = toPx(stepNum);
        const rem = toRem(stepNum);
        setText('qs-root', fmt(rootPx(), 2));
        setText('qs-step', stepNum);
        setText('qs-px', fmt(px, 2));
        setText('qs-rem', fmt(rem, 4));
        const className = `.p_q${stepNum}`;
        const classEl = document.getElementById('qs-class');
        if (classEl)
            classEl.textContent = className;
        const size = Math.max(8, px);
        const pad = Math.max(2, px / 4);
        const gap = Math.max(2, px / 6);
        const box = document.getElementById('qs-box');
        if (box) {
            box.style.width = `${size}px`;
            box.style.height = `${size}px`;
            box.style.padding = `${pad}px`;
            box.style.gap = `${gap}px`;
        }
        setText('qs-w', `${fmt(size, 0)}px`);
        setText('qs-h', `${fmt(size, 0)}px`);
        setText('qs-pad', `${fmt(pad, 0)}px`);
        setText('qs-gap', `${fmt(gap, 0)}px`);
        setText('qs-u-step', stepNum);
        setText('qs-u-step2', stepNum);
        setText('qs-u-step3', stepNum);
        setText('qs-u-step4', stepNum);
        setText('qs-u-step5', stepNum);
        if (slider) {
            const sliderIndex = qSteps.indexOf(stepNum);
            if (sliderIndex >= 0) {
                slider.value = String(sliderIndex);
            }
        }
        document.querySelectorAll('.qscale-chip').forEach(btn => {
            btn.classList.toggle('active', Number(btn.dataset.step) === stepNum);
        });
    }
    if (slider) {
        slider.addEventListener('input', (e) => {
            const index = parseInt(e.target.value);
            if (index >= 0 && index < qSteps.length) {
                setStep(qSteps[index]);
            }
        });
    }
    document.querySelectorAll('.qscale-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const step = parseInt(chip.dataset.step || '16');
            setStep(step);
        });
    });
    const chipRow = document.getElementById('qscale-chip-row');
    if (chipRow) {
        qSteps.forEach(step => {
            const btn = document.createElement('button');
            btn.className = 'qscale-chip' + (step === 16 ? ' active' : '');
            btn.textContent = String(step);
            btn.dataset.step = String(step);
            btn.addEventListener('click', () => setStep(step));
            chipRow.appendChild(btn);
        });
    }
    function createQScaleGrid(canvasId, scale, className) {
        const canvas = document.getElementById(canvasId);
        if (!canvas)
            return;
        canvas.innerHTML = '';
        const width = canvas.offsetWidth;
        for (let x = scale; x < width; x += scale) {
            const line = document.createElement('div');
            line.className = 'grid-line ' + className;
            if (x % 20 === 0) {
                line.classList.add('lcm');
            }
            line.style.left = x + 'px';
            canvas.appendChild(line);
        }
    }
    createQScaleGrid('qs-type-grid', 4, 'type');
    createQScaleGrid('qs-line-grid', 5, 'line-scale');
    const combinedCanvas = document.getElementById('qs-combined-grid');
    if (combinedCanvas) {
        combinedCanvas.innerHTML = '';
        const width = combinedCanvas.offsetWidth;
        for (let x = 20; x < width; x += 20) {
            const line = document.createElement('div');
            line.className = 'grid-line lcm';
            line.style.left = x + 'px';
            combinedCanvas.appendChild(line);
        }
    }
    setStep(16);
}
function initDensityDemo() {
    if (!document.getElementById('current-dpr'))
        return;
    function updateDeviceInfo() {
        const dpr = window.devicePixelRatio || 1;
        const dpi = Math.round(dpr * 96);
        setText('current-dpr', dpr.toFixed(2) + '×');
        setText('current-dpi', dpi + 'dpi');
        let bucket = 'mdpi';
        if (dpr >= 4)
            bucket = 'xxxhdpi';
        else if (dpr >= 3)
            bucket = 'xxhdpi';
        else if (dpr >= 2)
            bucket = 'xhdpi';
        else if (dpr >= 1.5)
            bucket = 'hdpi';
        else if (dpr < 1)
            bucket = 'ldpi';
        setText('current-bucket', bucket);
    }
    function updateCalculator() {
        const input = document.getElementById('calc-q');
        const q = parseFloat(input?.value || '0') || 0;
        const mm = q * 0.25;
        const inches = mm / 25.4;
        const pt = mm / 0.3528;
        const rem = q * 0.0625;
        setText('calc-mm', mm.toFixed(2) + 'mm');
        setText('calc-in', inches.toFixed(3) + 'in');
        setText('calc-pt', pt.toFixed(2) + 'pt');
        setText('calc-rem', rem.toFixed(4) + 'rem');
        setText('calc-px1', q + 'px');
        setText('calc-px2', (q * 2) + 'px');
        setText('calc-px3', (q * 3) + 'px');
    }
    const calcInput = document.getElementById('calc-q');
    calcInput?.addEventListener('input', updateCalculator);
    updateDeviceInfo();
    updateCalculator();
    if (window.matchMedia) {
        const checkDPR = () => {
            const mqQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
            mqQuery.addEventListener('change', () => {
                updateDeviceInfo();
                checkDPR();
            }, { once: true });
        };
        checkDPR();
    }
}
function initBreakpointsDemo() {
    if (!document.getElementById('bp-width'))
        return;
    const breakpoints = [
        { key: 'ul', min: 4320 },
        { key: 'xl', min: 2880 },
        { key: 'lg', min: 2160 },
        { key: 'md', min: 1440 },
        { key: 'sm', min: 720 },
        { key: 'xs', min: 540 },
        { key: 'ss', min: 360 },
        { key: 'us', min: 240 },
    ];
    function updateBreakpointUI() {
        const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const active = breakpoints.find(bp => width >= bp.min) || breakpoints[breakpoints.length - 1];
        setText('bp-width', String(width));
        setText('bp-active', active.key);
        setText('bp-rule', `(min-width: ${active.min}px)`);
        document.querySelectorAll('.bp-row').forEach(row => {
            row.classList.toggle('active', row.dataset.bp === active.key);
        });
    }
    window.addEventListener('resize', updateBreakpointUI);
    updateBreakpointUI();
}
function initPaperDemo() {
    const select = document.getElementById('paper-format');
    const preview = document.getElementById('paper-preview');
    const container = document.getElementById('paper-preview-container');
    const title = document.getElementById('paper-title');
    const outW = document.getElementById('paper-w');
    const outH = document.getElementById('paper-h');
    const code = document.getElementById('paper-code');
    const codeOr = document.getElementById('paper-code-or');
    const scaleDisplay = document.getElementById('scale-display');
    if (!select || !preview)
        return;
    let orientation = 'portrait';
    const maxRefSize = 1189;
    const containerMaxPx = 400;
    function currentDims() {
        const opt = select?.selectedOptions?.[0];
        if (!opt)
            return { key: 'q04', w: 180, h: 270 };
        const key = opt.value;
        const w = Number(opt.dataset.w);
        const h = Number(opt.dataset.h);
        return { key, w, h };
    }
    function apply() {
        if (!preview || !select || !container)
            return;
        const { key, w, h } = currentDims();
        const pw = orientation === 'landscape' ? h : w;
        const ph = orientation === 'landscape' ? w : h;
        const maxDim = Math.max(pw, ph);
        const scale = containerMaxPx / maxRefSize;
        const scaledW = pw * scale;
        const scaledH = ph * scale;
        preview.style.width = `${scaledW}px`;
        preview.style.height = `${scaledH}px`;
        preview.style.aspectRatio = 'auto';
        const displayScale = (maxRefSize / maxDim).toFixed(1);
        if (scaleDisplay)
            scaleDisplay.textContent = `Scale: 1:${displayScale}`;
        if (title)
            title.textContent = key;
        if (outW)
            outW.textContent = String(pw);
        if (outH)
            outH.textContent = String(ph);
        if (code)
            code.textContent = key;
        if (codeOr)
            codeOr.textContent = orientation;
    }
    document.querySelectorAll('.paper-orient__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            orientation = btn.dataset.orient || 'portrait';
            document.querySelectorAll('.paper-orient__btn').forEach(b => b.classList.toggle('active', b === btn));
            apply();
        });
    });
    select.addEventListener('change', apply);
    apply();
    function renderComparisonStacks() {
        const scaleFactor = 0.5;
        document.querySelectorAll('.comparison-sheet').forEach(sheet => {
            const w = Number(sheet.dataset.w || 0);
            const h = Number(sheet.dataset.h || 0);
            sheet.style.width = `${w * scaleFactor}px`;
            sheet.style.height = `${h * scaleFactor}px`;
        });
    }
    renderComparisonStacks();
}
function initBaselineDemo() {
    window.toggleBaseline = function () {
        document.querySelectorAll('.guide--baseline, .guide--baseline_custom').forEach(el => {
            el.classList.toggle('guide--baseline--hidden');
        });
    };
}
function initHybridScaleDemo() {
    const slider = document.getElementById('scaleSlider');
    const sliderValue = document.getElementById('sliderValue');
    const chips = document.querySelectorAll('.chip');
    const previewBox = document.getElementById('previewBox');
    if (!slider)
        return;
    const typeQ = document.getElementById('typeQ');
    const typePx = document.getElementById('typePx');
    const typeMm = document.getElementById('typeMm');
    const typeRem = document.getElementById('typeRem');
    const lineQ = document.getElementById('lineQ');
    const linePx = document.getElementById('linePx');
    const lineMm = document.getElementById('lineMm');
    const lineRem = document.getElementById('lineRem');
    const lcmValue = document.getElementById('lcmValue');
    const lcmMultiple = document.getElementById('lcmMultiple');
    const lcmAligned = document.getElementById('lcmAligned');
    function updateScale(value) {
        const typeVal = value * 4;
        const lineVal = value * 5;
        const lcmVal = Math.ceil(Math.max(typeVal, lineVal) / 20) * 20;
        const isAligned = typeVal % 20 === 0 && lineVal % 20 === 0;
        slider.value = String(value);
        if (sliderValue)
            sliderValue.textContent = String(value);
        chips.forEach(chip => {
            chip.classList.toggle('active', parseInt(chip.dataset.value || '0') === value);
        });
        if (typeQ)
            typeQ.textContent = typeVal + 'Q';
        if (typePx)
            typePx.textContent = typeVal + 'px';
        if (typeMm)
            typeMm.textContent = (typeVal / 4).toFixed(1) + 'mm';
        if (typeRem)
            typeRem.textContent = (typeVal / 16).toFixed(3) + 'rem';
        if (lineQ)
            lineQ.textContent = lineVal + 'Q';
        if (linePx)
            linePx.textContent = lineVal + 'px';
        if (lineMm)
            lineMm.textContent = (lineVal / 4).toFixed(2) + 'mm';
        if (lineRem)
            lineRem.textContent = (lineVal / 16).toFixed(3) + 'rem';
        if (lcmValue)
            lcmValue.textContent = lcmVal + 'Q';
        if (lcmMultiple)
            lcmMultiple.textContent = (lcmVal / 20) + '× LCM';
        if (lcmAligned) {
            if (typeVal === lineVal && typeVal % 20 === 0) {
                lcmAligned.textContent = '✓ Perfect Alignment';
                lcmAligned.classList.add('aligned');
            }
            else {
                lcmAligned.textContent = 'Next: ' + lcmVal + 'Q';
                lcmAligned.classList.remove('aligned');
            }
        }
        if (previewBox) {
            const size = Math.min(Math.max(typeVal * 2, 40), 200);
            previewBox.style.width = size + 'px';
            previewBox.style.height = size + 'px';
        }
    }
    slider.addEventListener('input', (e) => updateScale(parseInt(e.target.value)));
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            updateScale(parseInt(chip.dataset.value || '4'));
        });
    });
    updateScale(4);
    function createGrid(canvasId, scale, className, showLCM = false) {
        const canvas = document.getElementById(canvasId);
        if (!canvas)
            return;
        canvas.innerHTML = '';
        const width = canvas.offsetWidth;
        for (let x = scale; x < width; x += scale) {
            const line = document.createElement('div');
            line.className = 'grid-line ' + className;
            if (showLCM && x % 20 === 0) {
                line.classList.add('lcm');
            }
            line.style.left = x + 'px';
            canvas.appendChild(line);
        }
    }
    function createCombinedGrid(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas)
            return;
        canvas.innerHTML = '';
        const width = canvas.offsetWidth;
        for (let x = 20; x < width; x += 20) {
            const line = document.createElement('div');
            line.className = 'grid-line lcm';
            line.style.left = x + 'px';
            canvas.appendChild(line);
        }
    }
    function initGrids() {
        createGrid('type-grid-canvas', 4, 'type-line', false);
        createGrid('line-grid-canvas', 5, 'line-line', false);
        createCombinedGrid('combined-grid-canvas');
    }
    initGrids();
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initGrids, 150);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initGridToggle();
    initMobileNav();
    initSidebarToggle();
    initLayersDemo();
    initDeviceDemo();
    initQScaleDemo();
    initDensityDemo();
    initBreakpointsDemo();
    initPaperDemo();
    initBaselineDemo();
    initHybridScaleDemo();
});
//# sourceMappingURL=docs.js.map