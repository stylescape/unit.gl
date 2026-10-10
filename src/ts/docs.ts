/**
 * Documentation Site JavaScript
 * =============================
 *
 * This file contains all JavaScript functionality for the unit.gl docs site.
 * It is separate from the library code and should be loaded after unit.gl.js.
 *
 * @module docs
 * @author Scape Press
 * @link https://unit.gl
 * @since 0.1.0 initial release
 */

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Shorthand for matchMedia queries
 */
function mq(query: string): boolean {
    try {
        return window.matchMedia(query).matches;
    } catch (_) {
        return false;
    }
}

/**
 * Set text content of an element by ID
 */
function setText(id: string, value: string | number): void {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value);
}

/**
 * Format number with specified decimal places
 */
function fmt(n: number, digits = 2): string {
    return (Math.round(n * (10 ** digits)) / (10 ** digits)).toFixed(digits);
}

/**
 * Get viewport dimensions
 */
function getViewport(): { width: number; height: number } {
    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    return { width, height };
}

// ============================================================================
// Theme Toggle (base.html.jinja)
// ============================================================================

/**
 * localStorage access that never throws (blocked storage, sandboxed iframes);
 * a failure only means the preference isn't remembered.
 */
function readStored(key: string): string | null {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function writeStored(key: string, value: string): void {
    try {
        localStorage.setItem(key, value);
    } catch {
        // Preference simply won't persist.
    }
}

/**
 * Marks a stylescape toggle button as pressed: the pressed one renders as a
 * solid `ss-c-button`, the others as outline.
 */
function setPressed(btn: Element, pressed: boolean): void {
    btn.classList.toggle('ss-c-button--solid', pressed);
    btn.classList.toggle('ss-c-button--outline', !pressed);
    btn.setAttribute('aria-pressed', String(pressed));
}

/** Applies the saved or system theme. */
function applyInitialTheme(): void {
    const saved = readStored('theme');
    const theme = saved ?? (mq('(prefers-color-scheme: dark)') ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
}

// This script is a classic <script> in <head>, so this runs before the body
// paints and dark-mode visitors don't see a flash of the light theme.
applyInitialTheme();

function initThemeToggle(): void {
    const themeToggle = document.querySelector<HTMLElement>('[data-toggle="theme"]');
    const html = document.documentElement;
    if (!themeToggle) return;

    const sync = () => themeToggle.setAttribute('aria-pressed', String(html.getAttribute('data-theme') === 'dark'));
    sync();

    themeToggle.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        writeStored('theme', newTheme);
        sync();
    });
}

// ============================================================================
// Active Navigation Link
// ============================================================================

function initActiveNavLink(): void {
    const current = location.pathname.split('/').pop() || 'index.html';
    const link = document.querySelector(`#sidebar .ss-c-nav__link[href="${CSS.escape(current)}"]`);
    link?.classList.add('is-active');
    link?.setAttribute('aria-current', 'page');
}

// ============================================================================
// Mobile Navigation Toggle
// ============================================================================

function initMobileNav(): void {
    const toggle = document.getElementById('nav-mobile-toggle');
    const menu = document.getElementById('nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
        const isOpen = menu.classList.toggle('is-open');
        this.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu on escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    });

    // Close menu when resizing to desktop
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addEventListener('change', (e) => {
        if (e.matches && menu.classList.contains('is-open')) {
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ============================================================================
// Sidebar Navigation Toggle (Mobile)
// ============================================================================

function initSidebarToggle(): void {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', function () {
        const isOpen = sidebar.classList.toggle('is-open');
        this.setAttribute('aria-expanded', String(isOpen));
    });

    // Close sidebar when clicking a link (mobile)
    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 900) {
                sidebar.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close sidebar on escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
            sidebar.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    });

    // Close sidebar when resizing to desktop
    const mediaQuery = window.matchMedia('(min-width: 900px)');
    mediaQuery.addEventListener('change', (e) => {
        if (e.matches && sidebar.classList.contains('is-open')) {
            sidebar.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ============================================================================
// Layers Demo (layers.html.jinja)
// ============================================================================

function initLayersDemo(): void {
    const setLayer = (btn: HTMLElement, visible: boolean): void => {
        document.getElementById('layer-' + btn.dataset.layer)?.classList.toggle('layer-box--hidden', !visible);
        setPressed(btn, visible);
    };

    const layerButtons = document.querySelectorAll<HTMLElement>('button[data-layer]');

    layerButtons.forEach(btn => {
        btn.addEventListener('click', () => setLayer(btn, btn.getAttribute('aria-pressed') !== 'true'));
    });

    document.querySelectorAll<HTMLElement>('button[data-layers]').forEach(btn => {
        btn.addEventListener('click', () => {
            const visible = btn.dataset.layers === 'show';
            layerButtons.forEach(layerBtn => setLayer(layerBtn, visible));
        });
    });
}

// ============================================================================
// Device Detection Demo (device.html.jinja)
// ============================================================================

function initDeviceDemo(): void {
    if (!document.getElementById('dev-width')) return;

    function classifyOrientation(width: number, height: number): string {
        if (mq('(orientation: portrait)')) return 'portrait';
        if (mq('(orientation: landscape)')) return 'landscape';
        return width >= height ? 'landscape' : 'portrait';
    }

    function getColorScheme(): string {
        if (mq('(prefers-color-scheme: dark)')) return 'dark';
        if (mq('(prefers-color-scheme: light)')) return 'light';
        return 'no-preference';
    }

    function getReducedMotion(): string {
        if (mq('(prefers-reduced-motion: reduce)')) return 'reduce';
        if (mq('(prefers-reduced-motion: no-preference)')) return 'no-preference';
        return 'unknown';
    }

    function getPrefersContrast(): string {
        if (mq('(prefers-contrast: more)')) return 'more';
        if (mq('(prefers-contrast: less)')) return 'less';
        if (mq('(prefers-contrast: custom)')) return 'custom';
        if (mq('(prefers-contrast: no-preference)')) return 'no-preference';
        return 'unknown';
    }

    function getForcedColors(): string {
        if (mq('(forced-colors: active)')) return 'active';
        if (mq('(forced-colors: none)')) return 'none';
        return 'unknown';
    }

    function getHover(): string {
        if (mq('(hover: hover)')) return 'hover';
        if (mq('(hover: none)')) return 'none';
        return 'unknown';
    }

    function getPointer(): string {
        if (mq('(pointer: fine)')) return 'fine';
        if (mq('(pointer: coarse)')) return 'coarse';
        if (mq('(pointer: none)')) return 'none';
        return 'unknown';
    }

    function getAnyHover(): string {
        if (mq('(any-hover: hover)')) return 'hover';
        if (mq('(any-hover: none)')) return 'none';
        return 'unknown';
    }

    function getAnyPointer(): string {
        if (mq('(any-pointer: fine)')) return 'fine';
        if (mq('(any-pointer: coarse)')) return 'coarse';
        if (mq('(any-pointer: none)')) return 'none';
        return 'unknown';
    }

    function getColorGamut(): string {
        if (mq('(color-gamut: rec2020)')) return 'rec2020';
        if (mq('(color-gamut: p3)')) return 'p3';
        if (mq('(color-gamut: srgb)')) return 'srgb';
        return 'unknown';
    }

    function getDisplayMode(): string {
        if (mq('(display-mode: fullscreen)')) return 'fullscreen';
        if (mq('(display-mode: standalone)')) return 'standalone';
        if (mq('(display-mode: minimal-ui)')) return 'minimal-ui';
        if (mq('(display-mode: browser)')) return 'browser';
        return 'unknown';
    }

    function getReducedTransparency(): string {
        if (mq('(prefers-reduced-transparency: reduce)')) return 'reduce';
        if (mq('(prefers-reduced-transparency: no-preference)')) return 'no-preference';
        return 'unknown';
    }

    function getReducedData(): string {
        if (mq('(prefers-reduced-data: reduce)')) return 'reduce';
        if (mq('(prefers-reduced-data: no-preference)')) return 'no-preference';
        return 'unknown';
    }

    function scoreDeviceMatch(
        { width, dpr }: { width: number; dpr: number },
        row: HTMLElement
    ): { match: boolean; label: string } {
        const min = Number(row.dataset.min || '0');
        const max = Number(row.dataset.max || '0');
        const targetDpr = Number(row.dataset.dpr || '1');

        const inRange = width >= min && width <= max;
        const dprDelta = Math.abs((dpr || 1) - targetDpr);
        const dprOk = dprDelta <= 0.6;

        if (!inRange) return { match: false, label: '—' };
        if (!dprOk) return { match: true, label: 'width' };
        return { match: true, label: 'width + dpr' };
    }

    function updateUI(): void {
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

        const filterEl = document.getElementById('dev-filter') as HTMLInputElement | null;
        const filterValue = String(filterEl?.value || '').trim().toLowerCase();

        let matches = 0;
        document.querySelectorAll<HTMLElement>('tr[data-key]').forEach(row => {
            const key = String(row.dataset.key || '').toLowerCase();
            const visible = !filterValue || key.includes(filterValue);
            row.hidden = !visible;

            const badge = row.querySelector('[data-role="match"]');
            if (!visible) {
                row.classList.remove('is-active');
                if (badge) badge.textContent = '—';
                return;
            }

            const result = scoreDeviceMatch({ width, dpr }, row);
            row.classList.toggle('is-active', result.match);
            if (badge) badge.textContent = result.label;
            if (result.match) matches += 1;
        });

        setText('dev-matches', matches);
    }

    window.addEventListener('resize', updateUI);
    window.addEventListener('orientationchange', updateUI);

    const filterEl = document.getElementById('dev-filter');
    if (filterEl) filterEl.addEventListener('input', updateUI);

    updateUI();
}

// ============================================================================
// Q Scale Demo (scale.html.jinja)
// ============================================================================

function initQScaleDemo(): void {
    const rootEl = document.getElementById('qs-root');
    if (!rootEl) return;

    // The root font-size is fluid, so q(1) in px changes with the viewport
    const update = () => {
        const value = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
        rootEl.textContent = Number.isFinite(value) ? String(Math.round(value * 100) / 100) : '16';
    };

    update();
    window.addEventListener('resize', update);
}

// ============================================================================
// Density Demo (density.html.jinja)
// ============================================================================

function initDensityDemo(): void {
    if (!document.getElementById('current-dpr')) return;

    function updateDeviceInfo(): void {
        const dpr = window.devicePixelRatio || 1;
        const dpi = Math.round(dpr * 96);

        setText('current-dpr', dpr.toFixed(2) + '×');
        setText('current-dpi', dpi + 'dpi');

        // Determine bucket
        let bucket = 'mdpi';
        if (dpr >= 4) bucket = 'xxxhdpi';
        else if (dpr >= 3) bucket = 'xxhdpi';
        else if (dpr >= 2) bucket = 'xhdpi';
        else if (dpr >= 1.5) bucket = 'hdpi';
        else if (dpr < 1) bucket = 'ldpi';

        setText('current-bucket', bucket);
    }

    function updateCalculator(): void {
        const input = document.getElementById('calc-q') as HTMLInputElement | null;
        const q = parseFloat(input?.value || '0') || 0;
        const mm = q * 0.25;
        const inches = mm / 25.4;
        const pt = (mm * 72) / 25.4;
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

    // Initialize
    updateDeviceInfo();
    updateCalculator();

    // Update on DPR change
    if (window.matchMedia) {
        const checkDPR = (): void => {
            const mqQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
            mqQuery.addEventListener('change', () => {
                updateDeviceInfo();
                checkDPR();
            }, { once: true });
        };
        checkDPR();
    }
}

// ============================================================================
// Breakpoints (canonical 9-step scale)
// ============================================================================

/**
 * Canonical 9-step breakpoint scale (mirrors `$breakpoints` in SCSS).
 * Sorted descending so `find(width >= bp.min)` returns the largest match.
 */
const BREAKPOINTS: ReadonlyArray<{ key: string; min: number }> = [
    { key: 'ul', min: 4320 },
    { key: 'sl', min: 2880 },
    { key: 'xl', min: 2160 },
    { key: 'lg', min: 1440 },
    { key: 'md', min: 1080 },
    { key: 'sm', min: 720 },
    { key: 'xs', min: 540 },
    { key: 'ss', min: 360 },
    { key: 'us', min: 250 },
];

function getActiveBreakpoint(width: number): { key: string; min: number } {
    // Below the smallest breakpoint only the unprefixed base styles apply
    return BREAKPOINTS.find(bp => width >= bp.min) || { key: 'base', min: 0 };
}

/**
 * Updates the current-breakpoint indicator in the top nav (if present).
 * Runs on every page that includes the nav partial.
 */
function initNavBreakpointIndicator(): void {
    const keyEl = document.getElementById('nav-bp-key');
    const widthEl = document.getElementById('nav-bp-width');
    if (!keyEl || !widthEl) return;

    const update = (): void => {
        const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const active = getActiveBreakpoint(width);
        keyEl.textContent = active.key;
        widthEl.textContent = `${width}px`;
    };

    window.addEventListener('resize', update);
    update();
}

/**
 * Updates the q(1) pixel-value indicator in the top nav (if present).
 * `q(n) = n * 0.0625rem`, so q(1) in px = rootFontSize * 0.0625. The value
 * may shift on resize if fluid typography scales the root font size.
 */
function initNavQIndicator(): void {
    const qEl = document.getElementById('nav-q-px');
    if (!qEl) return;

    const update = (): void => {
        const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const qPx = rootPx * 0.0625;
        qEl.textContent = `${fmt(qPx, 3)}px`;
    };

    window.addEventListener('resize', update);
    update();
}

// ============================================================================
// Breakpoints Demo (breakpoints.html.jinja)
// ============================================================================

function initBreakpointsDemo(): void {
    if (!document.getElementById('bp-width')) return;

    function updateBreakpointUI(): void {
        const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const active = getActiveBreakpoint(width);

        setText('bp-width', String(width));
        setText('bp-active', active.key);
        setText('bp-rule', active.min ? `(min-width: ${active.min}px)` : 'none (base styles)');

        document.querySelectorAll<HTMLElement>('tr[data-bp]').forEach(row => {
            row.classList.toggle('is-active', row.dataset.bp === active.key);
        });
    }

    window.addEventListener('resize', updateBreakpointUI);
    updateBreakpointUI();
}

// ============================================================================
// Paper Demo (paper.html.jinja)
// ============================================================================

function initPaperDemo(): void {
    const select = document.getElementById('paper-format') as HTMLSelectElement | null;
    const preview = document.getElementById('paper-preview') as HTMLElement | null;
    const container = document.getElementById('paper-preview-container') as HTMLElement | null;
    const title = document.getElementById('paper-title');
    const outW = document.getElementById('paper-w');
    const outH = document.getElementById('paper-h');
    const code = document.getElementById('paper-code');
    const codeOr = document.getElementById('paper-code-or');
    const scaleDisplay = document.getElementById('scale-display');

    if (!select || !preview) return;

    let orientation = 'portrait';

    // One drawing scale for every format, so sizes stay comparable: the
    // largest format on offer fills the preview area.
    const maxRefSize = Math.max(
        ...Array.from(select.options, opt => Math.max(Number(opt.dataset.w) || 0, Number(opt.dataset.h) || 0)),
        1
    );
    const maxPreviewPx = 400;
    const mmPerCssPx = 25.4 / 96;

    // Largest sheet size that fits the preview area (narrower on phones)
    function previewPx(): number {
        const fit = container ? Math.min(container.clientWidth, container.clientHeight) : 0;
        return fit > 0 ? Math.min(fit, maxPreviewPx) : maxPreviewPx;
    }

    function currentDims(): { key: string; w: number; h: number } {
        const opt = select?.selectedOptions?.[0];
        if (!opt) return { key: 'q04', w: 180, h: 270 };

        const key = opt.value;
        const w = Number((opt as HTMLOptionElement).dataset.w);
        const h = Number((opt as HTMLOptionElement).dataset.h);
        return { key, w, h };
    }

    function apply(): void {
        if (!preview || !select || !container) return;

        const { key, w, h } = currentDims();
        const pw = orientation === 'landscape' ? h : w;
        const ph = orientation === 'landscape' ? w : h;

        const scale = previewPx() / maxRefSize; // px per mm
        const scaledW = pw * scale;
        const scaledH = ph * scale;

        // Apply actual pixel dimensions
        preview.style.width = `${scaledW}px`;
        preview.style.height = `${scaledH}px`;
        preview.style.aspectRatio = 'auto';

        // Real-world drawing scale: 1 CSS px is 25.4/96 mm
        const displayScale = (1 / (scale * mmPerCssPx)).toFixed(1);
        if (scaleDisplay) scaleDisplay.textContent = `Scale: 1:${displayScale}`;

        if (title) title.textContent = key;
        if (outW) outW.textContent = String(pw);
        if (outH) outH.textContent = String(ph);
        // Keys such as q00+ are not valid bare Sass identifiers
        if (code) code.textContent = /^[a-z0-9_]+$/i.test(key) ? key : `"${key}"`;
        if (codeOr) codeOr.textContent = orientation;
    }

    const orientButtons = document.querySelectorAll<HTMLElement>('button[data-orient]');
    orientButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            orientation = btn.dataset.orient || 'portrait';
            orientButtons.forEach(b => setPressed(b, b === btn));
            apply();
        });
    });

    select.addEventListener('change', apply);
    window.addEventListener('resize', apply);
    apply();

    // Comparison stacks - render sheets at relative scale
    function renderComparisonStacks(): void {
        const scaleFactor = 0.5; // pixels per mm

        document.querySelectorAll<HTMLElement>('.comparison-sheet').forEach(sheet => {
            const w = Number(sheet.dataset.w || 0);
            const h = Number(sheet.dataset.h || 0);
            sheet.style.width = `${w * scaleFactor}px`;
            sheet.style.height = `${h * scaleFactor}px`;
        });
    }

    renderComparisonStacks();
}

// ============================================================================
// Hybrid Scale Demo (scale.html.jinja)
// ============================================================================

function initHybridScaleDemo(): void {
    const slider = document.getElementById('scaleSlider') as HTMLInputElement | null;
    const sliderValue = document.getElementById('sliderValue');
    const chips = document.querySelectorAll<HTMLElement>('button[data-value]');
    const previewBox = document.getElementById('previewBox');

    if (!slider) return;

    // Metric elements
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

    function updateScale(value: number): void {
        const typeVal = value * 4;
        const lineVal = value * 5;
        const lcmVal = Math.ceil(Math.max(typeVal, lineVal) / 20) * 20;

        // Update slider
        slider!.value = String(value);
        if (sliderValue) sliderValue.textContent = String(value);

        // Update chips
        chips.forEach(chip => {
            setPressed(chip, parseInt(chip.dataset.value || '0') === value);
        });

        // Update metrics
        if (typeQ) typeQ.textContent = typeVal + 'Q';
        if (typePx) typePx.textContent = typeVal + 'px';
        if (typeMm) typeMm.textContent = (typeVal / 4).toFixed(1) + 'mm';
        if (typeRem) typeRem.textContent = (typeVal / 16).toFixed(3) + 'rem';

        if (lineQ) lineQ.textContent = lineVal + 'Q';
        if (linePx) linePx.textContent = lineVal + 'px';
        if (lineMm) lineMm.textContent = (lineVal / 4).toFixed(2) + 'mm';
        if (lineRem) lineRem.textContent = (lineVal / 16).toFixed(3) + 'rem';

        if (lcmValue) lcmValue.textContent = lcmVal + 'Q';
        if (lcmMultiple) lcmMultiple.textContent = (lcmVal / 20) + '× LCM';

        if (lcmAligned) {
            // The line value (always the larger) sits exactly on the 20Q grid
            if (lcmVal === lineVal) {
                lcmAligned.textContent = '✓ Perfect Alignment';
                lcmAligned.classList.add('ss-c-text-success');
            } else {
                lcmAligned.textContent = 'Next: ' + lcmVal + 'Q';
                lcmAligned.classList.remove('ss-c-text-success');
            }
        }

        // Update preview box
        if (previewBox) {
            const size = Math.min(Math.max(typeVal * 2, 40), 200);
            previewBox.style.width = size + 'px';
            previewBox.style.height = size + 'px';
        }
    }

    // Event listeners
    slider.addEventListener('input', (e) => updateScale(parseInt((e.target as HTMLInputElement).value)));

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            updateScale(parseInt(chip.dataset.value || '4'));
        });
    });

    // Initialize
    updateScale(4);

    // Grid visualization
    function createGrid(canvasId: string, scale: number, className: string, showLCM = false): void {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

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

    function createCombinedGrid(canvasId: string): void {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        canvas.innerHTML = '';
        const width = canvas.offsetWidth;

        // Add LCM lines (20Q intervals)
        for (let x = 20; x < width; x += 20) {
            const line = document.createElement('div');
            line.className = 'grid-line lcm';
            line.style.left = x + 'px';
            canvas.appendChild(line);
        }
    }

    // Initialize grid visualizations if containers exist
    function initGrids(): void {
        createGrid('type-grid-canvas', 4, 'type', false);
        createGrid('line-grid-canvas', 5, 'line-scale', false);
        createCombinedGrid('combined-grid-canvas');
    }

    initGrids();

    // Redraw grids on window resize
    let resizeTimeout: ReturnType<typeof setTimeout>;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initGrids, 150);
    });
}

// ============================================================================
// Keyboard access to scrollable code samples
// ============================================================================

/**
 * Code blocks that scroll horizontally need a tab stop, so keyboard users can
 * scroll them (axe `scrollable-region-focusable`). Whether a block scrolls
 * depends on the viewport, so this runs on load and on resize.
 */
function initScrollableCodeBlocks(): void {
    const update = (): void => {
        document.querySelectorAll<HTMLElement>('pre, .ss-c-code-block').forEach((el) => {
            const scrolls = el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
            if (scrolls && !el.hasAttribute('tabindex')) {
                el.setAttribute('tabindex', '0');
                el.dataset.autoTabindex = '';
            } else if (!scrolls && 'autoTabindex' in el.dataset) {
                el.removeAttribute('tabindex');
                delete el.dataset.autoTabindex;
            }
        });
    };
    update();
    let timer: ReturnType<typeof setTimeout>;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(update, 150);
    });
}

// ============================================================================
// Initialize All Demos
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
    // Core functionality (always runs)
    initThemeToggle();
    // Grid toggle handled by GridManager in unit.gl.js (avoids double-toggle)
    initActiveNavLink();
    initMobileNav();
    initSidebarToggle();
    initNavBreakpointIndicator();
    initNavQIndicator();
    initScrollableCodeBlocks();

    // Page-specific demos (only run if relevant elements exist)
    initLayersDemo();
    initDeviceDemo();
    initQScaleDemo();
    initDensityDemo();
    initBreakpointsDemo();
    initPaperDemo();
    initHybridScaleDemo();
});
