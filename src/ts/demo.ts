/**
 * Demo Site JavaScript
 * ====================
 *
 * This file contains all JavaScript functionality for the unit.gl demo/docs site.
 * It is separate from the library code and should be loaded after unit.gl.js.
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

function initThemeToggle(): void {
    const themeToggle = document.querySelector('[data-toggle="theme"]');
    const html = document.documentElement;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        html.setAttribute('data-theme', 'dark');
    }

    themeToggle?.addEventListener('click', function () {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ============================================================================
// Grid Toggle (base.html.jinja)
// ============================================================================

function initGridToggle(): void {
    document.querySelectorAll('.grid-controls button').forEach(btn => {
        btn.addEventListener('click', function (this: HTMLButtonElement) {
            const gridType = this.dataset.toggle;
            const grid = document.querySelector(`[data-grid="${gridType}"]`);
            if (grid) {
                grid.classList.toggle('active');
                this.classList.toggle('active');
            }
        });
    });
}

// ============================================================================
// Mobile Navigation Toggle
// ============================================================================

function initMobileNav(): void {
    const toggle = document.getElementById('nav-mobile-toggle');
    const menu = document.getElementById('nav-menu');
    const navWrapper = document.querySelector('.nav-wrapper');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
        const isOpen = menu.classList.toggle('is-open');
        navWrapper?.classList.toggle('nav-open', isOpen);
        this.setAttribute('aria-expanded', String(isOpen));

        // Prevent body scroll when menu is open
        document.body.classList.toggle('nav-open', isOpen);
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-open');
            navWrapper?.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        });
    });

    // Close menu on escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
            menu.classList.remove('is-open');
            navWrapper?.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
            toggle.focus();
        }
    });

    // Close menu when resizing to desktop
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

// ============================================================================
// Dropdown Menu (base.html.jinja)
// ============================================================================

function initDropdown(): void {
    const dropdown = document.getElementById('nav-dropdown');
    const toggle = dropdown?.querySelector('.nav__dropdown-toggle') as HTMLElement | null;

    toggle?.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = dropdown!.classList.toggle('open');
        this.setAttribute('aria-expanded', String(isOpen));
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (dropdown && !dropdown.contains(e.target as Node)) {
            dropdown.classList.remove('open');
            toggle?.setAttribute('aria-expanded', 'false');
        }
    });

    // Close dropdown when pressing Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && dropdown?.classList.contains('open')) {
            dropdown.classList.remove('open');
            toggle?.setAttribute('aria-expanded', 'false');
            toggle?.focus();
        }
    });
}

// ============================================================================
// Layers Demo (layers.html.jinja)
// ============================================================================

function initLayersDemo(): void {
    // Expose functions globally for onclick handlers
    (window as any).toggleLayer = function (id: string): void {
        const layer = document.getElementById('layer-' + id);
        const btn = document.getElementById('btn-' + id);

        layer?.classList.toggle('layer-box--hidden');
        btn?.classList.toggle('layer-btn--active');
    };

    (window as any).showAll = function (): void {
        document.querySelectorAll('.layer-box').forEach(el => {
            el.classList.remove('layer-box--hidden');
        });
        document.querySelectorAll('.layer-btn').forEach(el => {
            if (el.id.startsWith('btn-')) {
                el.classList.add('layer-btn--active');
            }
        });
    };

    (window as any).hideAll = function (): void {
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

// ============================================================================
// Device Detection Demo (test_device.html.jinja)
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
        document.querySelectorAll<HTMLElement>('.device-row').forEach(row => {
            const key = String(row.dataset.key || '').toLowerCase();
            const visible = !filterValue || key.includes(filterValue);
            row.classList.toggle('is-filtered', !visible);

            const badge = row.querySelector('[data-role="match"]');
            if (!visible) {
                row.classList.remove('is-match');
                if (badge) badge.textContent = '—';
                return;
            }

            const result = scoreDeviceMatch({ width, dpr }, row);
            row.classList.toggle('is-match', result.match);
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
// Q Scale Demo (test_qscale.html.jinja)
// ============================================================================

function initQScaleDemo(): void {
    if (!document.getElementById('qs-root')) return;

    const qSteps = [0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96, 112, 128, 144, 160, 192, 224, 256];
    const slider = document.getElementById('qs-range') as HTMLInputElement | null;

    function rootPx(): number {
        const raw = getComputedStyle(document.documentElement).fontSize;
        const value = Number.parseFloat(raw);
        return Number.isFinite(value) ? value : 16;
    }

    function toPx(step: number): number {
        return (step * rootPx()) / 16;
    }

    function toRem(step: number): number {
        return step / 16;
    }

    function setStep(step: number): void {
        const stepNum = Number(step);
        const px = toPx(stepNum);
        const rem = toRem(stepNum);

        setText('qs-root', fmt(rootPx(), 2));
        setText('qs-step', stepNum);
        setText('qs-px', fmt(px, 2));
        setText('qs-rem', fmt(rem, 4));

        const className = `.p_q${stepNum}`;
        const classEl = document.getElementById('qs-class');
        if (classEl) classEl.textContent = className;

        // Visual: box size responds to the step
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

        // Update slider position
        if (slider) {
            const sliderIndex = qSteps.indexOf(stepNum);
            if (sliderIndex >= 0) {
                slider.value = String(sliderIndex);
            }
        }

        // UI state - update chip active states
        document.querySelectorAll<HTMLElement>('.qscale-chip').forEach(btn => {
            btn.classList.toggle('active', Number(btn.dataset.step) === stepNum);
        });
    }

    // Slider event listener
    if (slider) {
        slider.addEventListener('input', (e) => {
            const index = parseInt((e.target as HTMLInputElement).value);
            if (index >= 0 && index < qSteps.length) {
                setStep(qSteps[index]);
            }
        });
    }

    // Chip click handlers (for chips defined in template)
    document.querySelectorAll<HTMLElement>('.qscale-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const step = parseInt(chip.dataset.step || '16');
            setStep(step);
        });
    });

    // Initialize chips dynamically if container exists
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

    // Grid visualization for qscale page
    function createQScaleGrid(canvasId: string, scale: number, className: string): void {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        canvas.innerHTML = '';
        const width = canvas.offsetWidth;

        for (let x = scale; x < width; x += scale) {
            const line = document.createElement('div');
            line.className = 'grid-line ' + className;

            // Mark LCM alignment points
            if (x % 20 === 0) {
                line.classList.add('lcm');
            }

            line.style.left = x + 'px';
            canvas.appendChild(line);
        }
    }

    // Initialize grids if they exist on this page
    createQScaleGrid('qs-type-grid', 4, 'type');
    createQScaleGrid('qs-line-grid', 5, 'line-scale');

    // Combined grid showing only LCM points
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

    // Initial render
    setStep(16);
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
// Breakpoints Demo (test_breakpoints.html.jinja)
// ============================================================================

function initBreakpointsDemo(): void {
    if (!document.getElementById('bp-width')) return;

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

    function updateBreakpointUI(): void {
        const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const active = breakpoints.find(bp => width >= bp.min) || breakpoints[breakpoints.length - 1];

        setText('bp-width', String(width));
        setText('bp-active', active.key);
        setText('bp-rule', `(min-width: ${active.min}px)`);

        document.querySelectorAll<HTMLElement>('.bp-row').forEach(row => {
            row.classList.toggle('active', row.dataset.bp === active.key);
        });
    }

    window.addEventListener('resize', updateBreakpointUI);
    updateBreakpointUI();
}

// ============================================================================
// Paper Demo (test_paper.html.jinja)
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

    // Reference size for scaling (A0 is the largest common format)
    const maxRefSize = 1189; // A0 height in mm
    const containerMaxPx = 400; // Max pixel size for preview

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

        // Calculate scale factor based on container size
        const maxDim = Math.max(pw, ph);
        const scale = containerMaxPx / maxRefSize;
        const scaledW = pw * scale;
        const scaledH = ph * scale;

        // Apply actual pixel dimensions
        preview.style.width = `${scaledW}px`;
        preview.style.height = `${scaledH}px`;
        preview.style.aspectRatio = 'auto';

        // Update scale indicator
        const displayScale = (maxRefSize / maxDim).toFixed(1);
        if (scaleDisplay) scaleDisplay.textContent = `Scale: 1:${displayScale}`;

        if (title) title.textContent = key;
        if (outW) outW.textContent = String(pw);
        if (outH) outH.textContent = String(ph);
        if (code) code.textContent = key;
        if (codeOr) codeOr.textContent = orientation;
    }

    document.querySelectorAll<HTMLElement>('.paper-orient__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            orientation = btn.dataset.orient || 'portrait';
            document.querySelectorAll('.paper-orient__btn').forEach(b => b.classList.toggle('active', b === btn));
            apply();
        });
    });

    select.addEventListener('change', apply);
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
// Baseline Grid Demo (guide_baseline.html.jinja)
// ============================================================================

function initBaselineDemo(): void {
    // Expose toggle function globally
    (window as any).toggleBaseline = function (): void {
        document.querySelectorAll('.guide--baseline, .guide--baseline_custom').forEach(el => {
            el.classList.toggle('guide--baseline--hidden');
        });
    };
}

// ============================================================================
// Hybrid Scale Demo (test_hybrid_scale.html.jinja)
// ============================================================================

function initHybridScaleDemo(): void {
    const slider = document.getElementById('scaleSlider') as HTMLInputElement | null;
    const sliderValue = document.getElementById('sliderValue');
    const chips = document.querySelectorAll<HTMLElement>('.chip');
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
        const isAligned = typeVal % 20 === 0 && lineVal % 20 === 0;

        // Update slider
        slider!.value = String(value);
        if (sliderValue) sliderValue.textContent = String(value);

        // Update chips
        chips.forEach(chip => {
            chip.classList.toggle('active', parseInt(chip.dataset.value || '0') === value);
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
            if (typeVal === lineVal && typeVal % 20 === 0) {
                lcmAligned.textContent = '✓ Perfect Alignment';
                lcmAligned.classList.add('aligned');
            } else {
                lcmAligned.textContent = 'Next: ' + lcmVal + 'Q';
                lcmAligned.classList.remove('aligned');
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
        createGrid('type-grid-canvas', 4, 'type-line', false);
        createGrid('line-grid-canvas', 5, 'line-line', false);
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
// Initialize All Demos
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
    // Core functionality (always runs)
    initThemeToggle();
    initGridToggle();
    initMobileNav();
    initDropdown();

    // Page-specific demos (only run if relevant elements exist)
    initLayersDemo();
    initDeviceDemo();
    initQScaleDemo();
    initDensityDemo();
    initBreakpointsDemo();
    initPaperDemo();
    initBaselineDemo();
    initHybridScaleDemo();
});
