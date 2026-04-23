#!/bin/bash

# Create all section directories
mkdir -p src/jinja/sections/{breakpoints,ratio,device,lorem,steps,mixins}

# ============================================================================
# BREAKPOINTS SECTIONS (3 files)
# ============================================================================

cat > 'src/jinja/sections/breakpoints/01-current-viewport.jinja' << 'EOF'
<section>
    <h2>Current Viewport</h2>

    <div class="bp-status">
        <div class="bp-status__item">
            <div class="bp-status__label">Viewport</div>
            <div class="bp-status__value"><span id="bp-width">—</span>px</div>
        </div>
        <div class="bp-status__item">
            <div class="bp-status__label">Active Breakpoint</div>
            <div class="bp-status__value"><span id="bp-active">—</span></div>
        </div>
        <div class="bp-status__item">
            <div class="bp-status__label">Rule</div>
            <div class="bp-status__value"><span id="bp-rule">—</span></div>
        </div>
    </div>

    <p style="margin-top: calc(var(--grid-unit) * 2);">Resize the window to see which breakpoint is active. The
        active row is highlighted.</p>
</section>
EOF

cat > 'src/jinja/sections/breakpoints/02-breakpoint-map.jinja' << 'EOF'
<section>
    <h2>Breakpoint Map</h2>

    <table class="bp-table">
        <thead>
            <tr>
                <th>Key</th>
                <th>Min Width</th>
                <th>Multiple</th>
                <th>Typical Use</th>
            </tr>
        </thead>
        <tbody>
            {% set bps = [
            {"key": "us", "min": 240, "mult": "Q07P 60mm", "desc": "Compact / Fold devices"},
            {"key": "ss", "min": 360, "mult": "Q06P 90mm", "desc": "Phones"},
            {"key": "xs", "min": 540, "mult": "Q05P 135mm", "desc": "Large phones"},
            {"key": "sm", "min": 720, "mult": "Q04P 180mm", "desc": "Tablets"},
            {"key": "md", "min": 1080, "mult": "Q04L 270mm", "desc": "Laptops"},
            {"key": "lg", "min": 1440, "mult": "Q03L 360mm", "desc": "Desktops"},
            {"key": "xl", "min": 2160, "mult": "Q02L 540mm", "desc": "QHD desktops"},
            {"key": "sl", "min": 2880, "mult": "Q01L 720mm", "desc": "4K displays"},
            {"key": "ul", "min": 4320, "mult": "Q00L 1080mm", "desc": "5K+ displays"}
            ] %}

            {% for bp in bps %}
            <tr class="bp-row" data-bp="{{ bp.key }}" data-min="{{ bp.min }}">
                <td><code>{{ bp.key }}</code></td>
                <td><code>{{ bp.min }}px</code></td>
                <td class="bp-mult">{{ bp.mult }}</td>
                <td>{{ bp.desc }}</td>
            </tr>
            {% endfor %}
        </tbody>
    </table>

    <div class="alert alert--tip" style="margin-top: calc(var(--grid-unit) * 3);">
        <div class="alert__title">Q Format Alignment</div>
        <p>All breakpoints are derived from Q format paper sizes × 4 multiplier (1mm = 4px at 96dpi), ensuring
            physical-to-digital consistency.</p>
    </div>
</section>
EOF

cat > 'src/jinja/sections/breakpoints/03-utilities-example.jinja' << 'EOF'
<section>
    <h2>Utilities Example</h2>

    <p>This card uses responsive utility classes to increase padding as the viewport grows:</p>

    <div class="bp-demo-card p_q8 ss_p_q10 sm_p_q12 md_p_q16 lg_p_q24 xl_p_q32">
        <div class="bp-demo-card__title">Responsive padding</div>
        <div class="bp-demo-card__meta">Classes:
            <code>.p_q8 .ss_p_q10 .sm_p_q12 .md_p_q16 .lg_p_q24 .xl_p_q32</code>
        </div>
    </div>
</section>
EOF

# ============================================================================
# RATIO SECTIONS (4 files)
# ============================================================================

cat > 'src/jinja/sections/ratio/01-common-ratios.jinja' << 'EOF'
<section>
    <h2>Common Ratios</h2>
    <p>Standard aspect ratios used in film, photography, print, and digital media.</p>

    <div class="ratio-grid">
        {% set ratios = [
        ('1:1', 'Square', 1, 1),
        ('4:3', 'Classic', 4, 3),
        ('3:2', 'Photo', 3, 2),
        ('16:9', 'Widescreen', 16, 9),
        ('21:9', 'Ultrawide', 21, 9),
        ('9:16', 'Portrait', 9, 16)
        ] %}
        {% for name, desc, w, h in ratios %}
        {{ ratio_card(name, desc, w, h) }}
        {% endfor %}
    </div>
</section>
EOF

cat > 'src/jinja/sections/ratio/02-ratio-reference.jinja' << 'EOF'
<section>
    <h2>Ratio Reference</h2>

    <table class="ratio-table">
        <thead>
            <tr>
                <th>Ratio</th>
                <th>Class</th>
                <th>Decimal</th>
                <th>Common Use</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1:1</td>
                <td><code>.ratio_1x1</code></td>
                <td>1.000</td>
                <td>Social media, thumbnails</td>
            </tr>
            <tr>
                <td>4:3</td>
                <td><code>.ratio_4x3</code></td>
                <td>1.333</td>
                <td>Classic TV, presentations</td>
            </tr>
            <tr>
                <td>3:2</td>
                <td><code>.ratio_3x2</code></td>
                <td>1.500</td>
                <td>35mm photography</td>
            </tr>
            <tr>
                <td>16:9</td>
                <td><code>.ratio_16x9</code></td>
                <td>1.778</td>
                <td>HD video, monitors</td>
            </tr>
            <tr>
                <td>21:9</td>
                <td><code>.ratio_21x9</code></td>
                <td>2.333</td>
                <td>Cinematic, ultrawide</td>
            </tr>
            <tr>
                <td>2:3</td>
                <td><code>.ratio_2x3</code></td>
                <td>0.667</td>
                <td>Portrait photos</td>
            </tr>
            <tr>
                <td>9:16</td>
                <td><code>.ratio_9x16</code></td>
                <td>0.563</td>
                <td>Stories, vertical video</td>
            </tr>
        </tbody>
    </table>
</section>
EOF

cat > 'src/jinja/sections/ratio/03-use-cases.jinja' << 'EOF'
<section>
    <h2>Use Cases</h2>
    <p>Practical applications for common aspect ratios.</p>

    <div class="use-case-grid">
        <div class="use-case">
            <div class="use-case__box" style="aspect-ratio: 1/1;"></div>
            <div class="use-case__label">Instagram Post</div>
            <div class="use-case__ratio">1:1</div>
        </div>
        <div class="use-case">
            <div class="use-case__box" style="aspect-ratio: 16/9;"></div>
            <div class="use-case__label">YouTube Thumbnail</div>
            <div class="use-case__ratio">16:9</div>
        </div>
        <div class="use-case">
            <div class="use-case__box" style="aspect-ratio: 9/16;"></div>
            <div class="use-case__label">TikTok / Reels</div>
            <div class="use-case__ratio">9:16</div>
        </div>
        <div class="use-case">
            <div class="use-case__box" style="aspect-ratio: 4/5;"></div>
            <div class="use-case__label">Instagram Portrait</div>
            <div class="use-case__ratio">4:5</div>
        </div>
        <div class="use-case">
            <div class="use-case__box" style="aspect-ratio: 3/2;"></div>
            <div class="use-case__label">DSLR Photo</div>
            <div class="use-case__ratio">3:2</div>
        </div>
        <div class="use-case">
            <div class="use-case__box" style="aspect-ratio: 2.35/1;"></div>
            <div class="use-case__label">Cinemascope</div>
            <div class="use-case__ratio">2.35:1</div>
        </div>
    </div>
</section>
EOF

cat > 'src/jinja/sections/ratio/04-usage.jinja' << 'EOF'
<section>
    <h2>Usage</h2>

    <div class="code-block"><span class="comment">&lt;!-- Apply ratio class to container --&gt;</span>
        &lt;div class="<span class="class">ratio_16x9</span>"&gt;
        &lt;img src="video-thumb.jpg" alt="Video"&gt;
        &lt;/div&gt;

        <span class="comment">&lt;!-- With responsive images --&gt;</span>
        &lt;div class="<span class="class">ratio_4x3</span>"&gt;
        &lt;picture&gt;
        &lt;source srcset="large.webp" media="(min-width: 1024px)"&gt;
        &lt;img src="small.jpg" alt="Photo"&gt;
        &lt;/picture&gt;
        &lt;/div&gt;

        <span class="comment">&lt;!-- Video embed --&gt;</span>
        &lt;div class="<span class="class">ratio_16x9</span>"&gt;
        &lt;iframe src="https://youtube.com/embed/..."&gt;&lt;/iframe&gt;
        &lt;/div&gt;
    </div>

    <h3>SCSS Usage</h3>

    <div class="code-block"><span class="comment">// Using ratio variables</span>
        @use "unit.gl" as *;

        .hero-image {
        aspect-ratio: $ratio-16x9;
        }

        .profile-avatar {
        aspect-ratio: $ratio-1x1;
        border-radius: 50%;
        }

        <span class="comment">// Custom ratio with math</span>
        .golden-container {
        aspect-ratio: 1 / 1.618; <span class="comment">// Golden ratio</span>
        }
    </div>
</section>
EOF

# ============================================================================
# DEVICE SECTIONS (4 files)
# ============================================================================

cat > 'src/jinja/sections/device/01-current-environment.jinja' << 'EOF'
<section>
    <h2>Current Environment</h2>

    <div class="device-status">
        <div class="device-status__item">
            <div class="device-status__label">Viewport</div>
            <div class="device-status__value"><span id="dev-width">—</span>×<span id="dev-height">—</span>px</div>
        </div>
        <div class="device-status__item">
            <div class="device-status__label">Device Pixel Ratio</div>
            <div class="device-status__value"><span id="dev-dpr">—</span></div>
        </div>
        <div class="device-status__item">
            <div class="device-status__label">Orientation</div>
            <div class="device-status__value"><span id="dev-orientation">—</span></div>
        </div>
        <div class="device-status__item">
            <div class="device-status__label">Touch Points</div>
            <div class="device-status__value"><span id="dev-touch">—</span></div>
        </div>
    </div>
</section>
EOF

cat > 'src/jinja/sections/device/02-media-features.jinja' << 'EOF'
<section>
    <h2>Media Features</h2>

    <div class="device-features">
        <div class="device-features__col">
            <h3>Interaction</h3>
            <ul class="device-feature-list">
                <li><span class="device-feature-list__key">hover</span><span id="mf-hover"
                        class="device-feature-list__value">—</span></li>
                <li><span class="device-feature-list__key">pointer</span><span id="mf-pointer"
                        class="device-feature-list__value">—</span></li>
                <li><span class="device-feature-list__key">any-hover</span><span id="mf-any-hover"
                        class="device-feature-list__value">—</span></li>
                <li><span class="device-feature-list__key">any-pointer</span><span id="mf-any-pointer"
                        class="device-feature-list__value">—</span></li>
            </ul>
        </div>

        <div class="device-features__col">
            <h3>Preferences</h3>
            <ul class="device-feature-list">
                <li><span class="device-feature-list__key">prefers-color-scheme</span><span id="mf-scheme"
                        class="device-feature-list__value">—</span></li>
                <li><span class="device-feature-list__key">prefers-reduced-motion</span><span id="mf-motion"
                        class="device-feature-list__value">—</span></li>
                <li><span class="device-feature-list__key">prefers-contrast</span><span id="mf-contrast"
                        class="device-feature-list__value">—</span></li>
                <li><span class="device-feature-list__key">forced-colors</span><span id="mf-forced"
                        class="device-feature-list__value">—</span></li>
            </ul>
        </div>

        <div class="device-features__col">
            <h3>Display</h3>
            <ul class="device-feature-list">
                <li><span class="device-feature-list__key">color-gamut</span><span id="mf-gamut"
                        class="device-feature-list__value">—</span></li>
                <li><span class="device-feature-list__key">display-mode</span><span id="mf-display"
                        class="device-feature-list__value">—</span></li>
                <li><span class="device-feature-list__key">prefers-reduced-transparency</span><span
                        id="mf-transparency" class="device-feature-list__value">—</span></li>
                <li><span class="device-feature-list__key">prefers-reduced-data</span><span id="mf-data"
                        class="device-feature-list__value">—</span></li>
            </ul>
        </div>
    </div>

    <div class="alert alert--tip device-tip">
        <div class="alert__title">Tip</div>
        <p>Use these media features to progressively enhance: fewer effects under reduced motion, higher contrast
            tokens when requested, and touch-first UI when pointers are coarse.</p>
    </div>
</section>
EOF

cat > 'src/jinja/sections/device/03-device-profiles.jinja' << 'EOF'
<section>
    <h2>Device Profiles (<code>$devices</code> map)</h2>

    <p class="device-muted">This list is a curated set from the SCSS map in <code>src/scss/maps/_device.scss</code>.
        Matching is approximate: width range + DPR similarity.</p>

    <div class="device-controls">
        <label class="device-search" for="dev-filter">
            <span class="device-search__label">Filter</span>
            <input id="dev-filter" class="device-search__input" type="search"
                placeholder="iphone_x, ipad_pro, galaxy_fold…" autocomplete="off" />
        </label>

        <div class="device-match">
            <div class="device-match__label">Matches</div>
            <div class="device-match__value"><span id="dev-matches">—</span></div>
        </div>
    </div>

    {% set devices = [
    {"key": "galaxy_fold", "min": 280, "max": 653, "dpr": 3.0, "type": "phone"},
    {"key": "iphone_5", "min": 320, "max": 568, "dpr": 2.0, "type": "phone"},
    {"key": "iphone_6", "min": 375, "max": 667, "dpr": 2.0, "type": "phone"},
    {"key": "iphone_8", "min": 375, "max": 667, "dpr": 2.0, "type": "phone"},
    {"key": "iphone_x", "min": 375, "max": 812, "dpr": 3.0, "type": "phone"},
    {"key": "iphone_11", "min": 414, "max": 896, "dpr": 2.0, "type": "phone"},
    {"key": "iphone_12", "min": 390, "max": 844, "dpr": 3.0, "type": "phone"},
    {"key": "iphone_13", "min": 428, "max": 926, "dpr": 3.0, "type": "phone"},
    {"key": "samsung_s10", "min": 360, "max": 760, "dpr": 3.0, "type": "phone"},
    {"key": "samsung_s20", "min": 320, "max": 720, "dpr": 4.0, "type": "phone"},
    {"key": "samsung_s21", "min": 320, "max": 780, "dpr": 3.0, "type": "phone"},
    {"key": "google_pixel", "min": 411, "max": 731, "dpr": 2.6, "type": "phone"},
    {"key": "google_pixel_5", "min": 393, "max": 851, "dpr": 3.0, "type": "phone"},
    {"key": "surface_duo", "min": 540, "max": 720, "dpr": 2.5, "type": "phone"},

    {"key": "ipad", "min": 768, "max": 1024, "dpr": 2.0, "type": "tablet"},
    {"key": "ipad_mini", "min": 768, "max": 1024, "dpr": 2.0, "type": "tablet"},
    {"key": "ipad_air", "min": 820, "max": 1180, "dpr": 2.0, "type": "tablet"},
    {"key": "ipad_pro", "min": 1024, "max": 1366, "dpr": 2.0, "type": "tablet"},
    {"key": "surface_pro", "min": 768, "max": 1366, "dpr": 2.0, "type": "tablet"},

    {"key": "macbook_air", "min": 1440, "max": 2560, "dpr": 2.0, "type": "desktop"},
    {"key": "macbook_pro", "min": 1680, "max": 3072, "dpr": 2.0, "type": "desktop"},
    {"key": "imac", "min": 1920, "max": 5120, "dpr": 2.0, "type": "desktop"},
    {"key": "dell_xps", "min": 1920, "max": 3840, "dpr": 2.0, "type": "desktop"}
    ] %}

    <table class="device-table">
        <thead>
            <tr>
                <th>Key</th>
                <th>Min</th>
                <th>Max</th>
                <th>DPR</th>
                <th>Type</th>
                <th>Match</th>
            </tr>
        </thead>
        <tbody>
            {% for d in devices %}
            <tr class="device-row" data-key="{{ d.key }}" data-min="{{ d.min }}" data-max="{{ d.max }}"
                data-dpr="{{ d.dpr }}" data-type="{{ d.type }}">
                <td><code>{{ d.key }}</code></td>
                <td><code>{{ d.min }}px</code></td>
                <td><code>{{ d.max }}px</code></td>
                <td><code>{{ d.dpr }}</code></td>
                <td>{{ d.type }}</td>
                <td><span class="device-badge" data-role="match">—</span></td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
</section>
EOF

cat > 'src/jinja/sections/device/04-scss-usage.jinja' << 'EOF'
<section>
    <h2>SCSS Usage</h2>

    <div class="code-block">
        <pre><code>@use "unit.gl" as *;

// Target a specific device profile from $devices
@include device_media_query("galaxy_fold") {
  .panel { padding: q(10); }
}
</code></pre>
    </div>

    <p class="device-muted">Profile keys are underscored (for example <code>iphone_x</code>, <code>ipad_pro</code>,
        <code>macbook_pro</code>).
    </p>
</section>
EOF

# ============================================================================
# LOREM SECTIONS (4 files)
# ============================================================================

cat > 'src/jinja/sections/lorem/01-long-form-text.jinja' << 'EOF'
<section>
    <h2>Long-Form Text</h2>

    <div class="prose">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida augue lorem, eget feugiat magna
            posuere et. Praesent eget augue consequat, pulvinar massa vitae, luctus neque. Vivamus sed metus libero.
            Cras egestas ornare mauris ac lacinia. Ut venenatis ante ut augue consectetur lacinia.</p>

        <p>Vestibulum eget finibus quam, id imperdiet libero. Etiam laoreet luctus justo, nec congue purus consequat sit
            amet. Nulla maximus orci a commodo viverra. Vivamus ultrices erat et est rhoncus aliquet ut non massa.
            Quisque id sagittis purus. Proin non volutpat nisl, vitae egestas nisi.</p>

        <p>Pellentesque placerat pellentesque dolor, vel eleifend magna maximus quis. Etiam euismod, augue vel pharetra
            volutpat, arcu justo gravida orci, non maximus dolor lectus non sapien. Phasellus vitae gravida elit, at
            rhoncus orci.</p>

        <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec non
            malesuada nibh, ut fermentum eros. Ut libero arcu, aliquam ut justo eu, condimentum posuere erat. Duis ac
            mauris vulputate, tempor neque non, posuere orci.</p>
    </div>
</section>
EOF

cat > 'src/jinja/sections/lorem/02-quotation.jinja' << 'EOF'
<section>
    <h2>Quotation</h2>

    <div class="text-sample text-sample--quote">
        <blockquote>"The grid system is an aid, not a guarantee. It permits a number of possible uses and each designer
            can look for a solution appropriate to his personal style."</blockquote>
        <cite>— Josef Müller-Brockmann</cite>
    </div>

    <div class="text-sample text-sample--quote">
        <blockquote>"Typography is what language looks like."</blockquote>
        <cite>— Ellen Lupton</cite>
    </div>
</section>
EOF

cat > 'src/jinja/sections/lorem/03-line-height-comparison.jinja' << 'EOF'
<section>
    <h2>Line Height Comparison</h2>

    <div class="type-comparison">
        <div class="type-column">
            <h4>Tight Leading (1.4)</h4>
            <p style="line-height: 1.4;">Praesent tempor lorem quis viverra hendrerit. Nullam maximus semper
                scelerisque. Suspendisse et mauris vitae enim pellentesque tristique. Nunc odio mi, porta eget quam non,
                iaculis maximus nunc.</p>
        </div>
        <div class="type-column">
            <h4>Comfortable Leading (1.75)</h4>
            <p style="line-height: 1.75;">Praesent tempor lorem quis viverra hendrerit. Nullam maximus semper
                scelerisque. Suspendisse et mauris vitae enim pellentesque tristique. Nunc odio mi, porta eget quam non,
                iaculis maximus nunc.</p>
        </div>
    </div>

    <div class="type-comparison">
        <div class="type-column">
            <h4>45 Characters</h4>
            <p style="max-width: 45ch;">Duis tristique urna lorem, ut porta dolor ultricies a. Sed eu consectetur mi, a
                maximus turpis.</p>
        </div>
        <div class="type-column">
            <h4>75 Characters</h4>
            <p style="max-width: 75ch;">Duis tristique urna lorem, ut porta dolor ultricies a. Sed eu consectetur mi, a
                maximus turpis. Aenean interdum, velit semper facilisis tincidunt.</p>
        </div>
    </div>
</section>
EOF

cat > 'src/jinja/sections/lorem/04-rhythm-test.jinja' << 'EOF'
<section class="guide--baseline">
    <h2>Rhythm Test</h2>
    <p>This section has the baseline grid enabled. Observe how text aligns to the vertical rhythm.</p>

    <div class="prose">
        <p>Vestibulum tincidunt dui nec bibendum eleifend. Quisque rutrum, turpis ac fringilla tincidunt, felis sapien
            faucibus diam, eleifend tristique nisl augue sed odio. Fusce sollicitudin libero lacinia sapien porta
            elementum.</p>

        <p>Donec id mauris auctor, rutrum metus laoreet, tincidunt nisl. Duis pulvinar rhoncus euismod. Suspendisse
            condimentum augue vel pretium pharetra. Aliquam id vehicula dolor.</p>

        <p>Vestibulum eu malesuada orci, accumsan faucibus lectus. In a ultricies nisi, non suscipit metus. Aliquam
            aliquam ante finibus libero lobortis, eget ornare ex pharetra.</p>
    </div>
</section>
EOF

# ============================================================================
# STEPS SECTIONS (6 files)
# ============================================================================

cat > 'src/jinja/sections/steps/01-overview.jinja' << 'EOF'
<section>
    <h2>Overview</h2>
    <p>The 9-step scale provides a consistent vocabulary for expressing progressive values throughout unit.gl. Rather than arbitrary names or magic numbers, every map uses the same semantic keys:</p>

    <div class="step-overview">
        <div class="step-scale">
            {% set steps = [
                {"key": "us", "name": "Ultra Small", "position": 1},
                {"key": "ss", "name": "Super Small", "position": 2},
                {"key": "xs", "name": "Extra Small", "position": 3},
                {"key": "sm", "name": "Small", "position": 4},
                {"key": "md", "name": "Medium", "position": 5},
                {"key": "lg", "name": "Large", "position": 6},
                {"key": "xl", "name": "Extra Large", "position": 7},
                {"key": "sl", "name": "Super Large", "position": 8},
                {"key": "ul", "name": "Ultra Large", "position": 9}
            ] %}
            {% for step in steps %}
            <div class="step-item" data-step="{{ step.key }}">
                <div class="step-key"><code>{{ step.key }}</code></div>
                <div class="step-name">{{ step.name }}</div>
                <div class="step-position">Step {{ step.position }}</div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>
EOF

cat > 'src/jinja/sections/steps/02-naming-convention.jinja' << 'EOF'
<section>
    <h2>Naming Convention</h2>

    <p>The naming follows a symmetric pattern around the center (<code>md</code>):</p>

    <table class="step-table">
        <thead>
            <tr>
                <th>Key</th>
                <th>Full Name</th>
                <th>Pattern</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>us</code></td>
                <td>Ultra Small</td>
                <td>u + s</td>
                <td>Smallest tier, compact contexts</td>
            </tr>
            <tr>
                <td><code>ss</code></td>
                <td>Super Small</td>
                <td>s + s</td>
                <td>Very small, constrained contexts</td>
            </tr>
            <tr>
                <td><code>xs</code></td>
                <td>Extra Small</td>
                <td>x + s</td>
                <td>Below small threshold</td>
            </tr>
            <tr>
                <td><code>sm</code></td>
                <td>Small</td>
                <td>sm</td>
                <td>Small but comfortable</td>
            </tr>
            <tr class="step-center">
                <td><code>md</code></td>
                <td>Medium</td>
                <td>md</td>
                <td>Default / baseline value</td>
            </tr>
            <tr>
                <td><code>lg</code></td>
                <td>Large</td>
                <td>lg</td>
                <td>Above default, spacious</td>
            </tr>
            <tr>
                <td><code>xl</code></td>
                <td>Extra Large</td>
                <td>x + l</td>
                <td>Above large threshold</td>
            </tr>
            <tr>
                <td><code>sl</code></td>
                <td>Super Large</td>
                <td>s + l</td>
                <td>Very large, expansive contexts</td>
            </tr>
            <tr>
                <td><code>ul</code></td>
                <td>Ultra Large</td>
                <td>u + l</td>
                <td>Largest tier, maximum scale</td>
            </tr>
        </tbody>
    </table>

    <div class="alert alert--tip">
        <div class="alert__title">Symmetry</div>
        <p>Notice how <code>us</code>/<code>ul</code>, <code>ss</code>/<code>sl</code>, <code>xs</code>/<code>xl</code>, and <code>sm</code>/<code>lg</code> mirror each other around <code>md</code>. This makes the scale intuitive and predictable.</p>
    </div>
</section>
EOF

cat > 'src/jinja/sections/steps/03-usage-in-maps.jinja' << 'EOF'
<section>
    <h2>Usage in Maps</h2>

    <p>The 9-step keys are used consistently across unit.gl:</p>

    <div class="usage-grid">
        <div class="usage-card">
            <h3>Breakpoints</h3>
            <p>Viewport width thresholds for responsive design.</p>
            <code>$breakpoints: (us: 240px, ss: 360px, ...)</code>
            <a href="breakpoints.html" class="usage-link">View Breakpoints →</a>
        </div>

        <div class="usage-card">
            <h3>Container Widths</h3>
            <p>Maximum widths for layout containers.</p>
            <code>$containers: (us: 100%, ss: 100%, ...)</code>
        </div>

        <div class="usage-card">
            <h3>Spacing Scale</h3>
            <p>Margin and padding multipliers.</p>
            <code>$spacing: (us: 4px, ss: 8px, ...)</code>
        </div>

        <div class="usage-card">
            <h3>Type Scale</h3>
            <p>Font sizes for responsive typography.</p>
            <code>$type-scale: (us: 12px, ss: 14px, ...)</code>
        </div>

        <div class="usage-card">
            <h3>Icon Sizes</h3>
            <p>Standard icon dimensions.</p>
            <code>$icon-sizes: (us: 12px, ss: 16px, ...)</code>
        </div>

        <div class="usage-card">
            <h3>Border Radius</h3>
            <p>Corner rounding scales.</p>
            <code>$radii: (us: 2px, ss: 4px, ...)</code>
        </div>
    </div>
</section>
EOF

cat > 'src/jinja/sections/steps/04-q-format-alignment.jinja' << 'EOF'
<section>
    <h2>Q Format Alignment</h2>

    <p>When used for breakpoints, the 9 steps align with Q format paper sizes. The <strong>P</strong> (Portrait) and <strong>L</strong> (Landscape) designations indicate orientation:</p>

    <table class="step-table">
        <thead>
            <tr>
                <th>Step</th>
                <th>Q Format</th>
                <th>Physical Size</th>
                <th>Pixel Value</th>
                <th>Typical Device</th>
            </tr>
        </thead>
        <tbody>
            {% set qformats = [
                {"key": "us", "format": "Q07P", "mm": "60mm", "px": "240px", "device": "Compact / Fold"},
                {"key": "ss", "format": "Q06P", "mm": "90mm", "px": "360px", "device": "Phones"},
                {"key": "xs", "format": "Q05P", "mm": "135mm", "px": "540px", "device": "Large phones"},
                {"key": "sm", "format": "Q04P", "mm": "180mm", "px": "720px", "device": "Tablets"},
                {"key": "md", "format": "Q04L", "mm": "270mm", "px": "1080px", "device": "Laptops"},
                {"key": "lg", "format": "Q03L", "mm": "360mm", "px": "1440px", "device": "Desktops"},
                {"key": "xl", "format": "Q02L", "mm": "540mm", "px": "2160px", "device": "QHD displays"},
                {"key": "sl", "format": "Q01L", "mm": "720mm", "px": "2880px", "device": "4K displays"},
                {"key": "ul", "format": "Q00L", "mm": "1080mm", "px": "4320px", "device": "5K+ displays"}
            ] %}
            {% for q in qformats %}
            <tr>
                <td><code>{{ q.key }}</code></td>
                <td><code>{{ q.format }}</code></td>
                <td>{{ q.mm }}</td>
                <td><code>{{ q.px }}</code></td>
                <td>{{ q.device }}</td>
            </tr>
            {% endfor %}
        </tbody>
    </table>

    <div class="alert alert--info">
        <div class="alert__title">Physical-to-Digital</div>
        <p>All pixel values are derived from physical millimeters using the 4× multiplier (1mm = 4px at 96dpi). This ensures consistency between print and digital design.</p>
    </div>
</section>
EOF

cat > 'src/jinja/sections/steps/05-scss-api.jinja' << 'EOF'
<section>
    <h2>SCSS API</h2>

    <h3>Step Keys List</h3>
    <p>Access all step keys as a list:</p>

    <pre><code class="language-scss">@use "unit.gl" as unit;

// Get all step keys
$steps: (us, ss, xs, sm, md, lg, xl, sl, ul);

// Loop through steps
@each $step in $steps {
    .size-#{$step} {
        // Generate classes for each step
    }
}</code></pre>

    <h3>Map Access</h3>
    <p>Access values from any step-based map:</p>

    <pre><code class="language-scss">@use "sass:map";
@use "unit.gl" as unit;

// Get a specific breakpoint
$tablet-bp: map.get(unit.$breakpoints, sm); // 720px

// Get a specific spacing value
$large-space: map.get(unit.$spacing, lg);

// Use in media queries
@media (min-width: map.get(unit.$breakpoints, md)) {
    // Laptop and up styles
}</code></pre>

    <h3>Responsive Utilities</h3>
    <p>Generate responsive variants using step prefixes:</p>

    <pre><code class="language-scss">// Output: .us_hidden, .ss_hidden, .xs_hidden, etc.
@each $step in $steps {
    .#{$step}_hidden {
        @media (min-width: map.get($breakpoints, $step)) {
            display: none;
        }
    }
}</code></pre>
</section>
EOF

cat > 'src/jinja/sections/steps/06-design-rationale.jinja' << 'EOF'
<section>
    <h2>Design Rationale</h2>

    <div class="rationale-grid">
        <div class="rationale-item">
            <h3>9 Steps, Not 5</h3>
            <p>Traditional frameworks use 5 breakpoints (xs, sm, md, lg, xl). Our 9-step system adds finer granularity for modern device diversity—from foldables to 5K displays.</p>
        </div>

        <div class="rationale-item">
            <h3>Semantic, Not Numeric</h3>
            <p>Using <code>sm</code> instead of <code>576px</code> decouples intent from implementation. Values can change; semantics remain stable.</p>
        </div>

        <div class="rationale-item">
            <h3>Consistent Vocabulary</h3>
            <p>The same keys work for breakpoints, spacing, typography, and any tiered scale. Learn once, apply everywhere.</p>
        </div>

        <div class="rationale-item">
            <h3>Physical Foundation</h3>
            <p>Q format alignment bridges physical and digital design, ensuring proportions feel natural across media.</p>
        </div>
    </div>
</section>
EOF

# ============================================================================
# MIXINS SECTIONS (6 files)
# ============================================================================

cat > 'src/jinja/sections/mixins/01-responsive-breakpoints.jinja' << 'EOF'
<section>
    <h2>Responsive Breakpoints</h2>
    <p>Mobile-first breakpoint mixins using the device map.</p>

    <h3>view()</h3>
    <p>Apply styles at a specific breakpoint and above.</p>

    <div class="api-signature">@include view($breakpoint) { ... }</div>

    <div class="api-params">
        <div class="api-param">
            <span class="api-param__name">$breakpoint</span>
            <span class="api-param__type">String</span>
            <span class="api-param__desc">Breakpoint name from $device_map</span>
        </div>
    </div>

    <h4>Available Breakpoints</h4>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Min Width</th>
                <th>Q Format</th>
                <th>Typical Devices</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>us</code></td>
                <td>240px</td>
                <td>Q07 Portrait (60mm)</td>
                <td>Compact/fold devices</td>
            </tr>
            <tr>
                <td><code>ss</code></td>
                <td>360px</td>
                <td>Q06 Portrait (90mm)</td>
                <td>Phones</td>
            </tr>
            <tr>
                <td><code>xs</code></td>
                <td>540px</td>
                <td>Q05 Portrait (135mm)</td>
                <td>Large phones</td>
            </tr>
            <tr>
                <td><code>sm</code></td>
                <td>720px</td>
                <td>Q04 Portrait (180mm)</td>
                <td>Tablets</td>
            </tr>
            <tr>
                <td><code>md</code></td>
                <td>1440px</td>
                <td>Q03 Landscape (360mm)</td>
                <td>Laptops</td>
            </tr>
            <tr>
                <td><code>lg</code></td>
                <td>2160px</td>
                <td>Q02 Landscape (540mm)</td>
                <td>QHD desktops</td>
            </tr>
            <tr>
                <td><code>xl</code></td>
                <td>2880px</td>
                <td>Q01 Landscape (720mm)</td>
                <td>4K displays</td>
            </tr>
            <tr>
                <td><code>ul</code></td>
                <td>4320px</td>
                <td>Q00 Landscape (1080mm)</td>
                <td>5K+ displays</td>
            </tr>
        </tbody>
    </table>

    <h4>Examples</h4>
    <div class="code-block">.container {
        padding: q(16);

        @include view(md) {
        padding: q(24);
        }

        @include view(lg) {
        padding: q(32);
        max-width: 1200px;
        margin: 0 auto;
        }
        }

        .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: q(16);

        @include view(sm) {
        grid-template-columns: repeat(2, 1fr);
        }

        @include view(lg) {
        grid-template-columns: repeat(4, 1fr);
        gap: q(24);
        }
        }</div>

    <h3>view_only()</h3>
    <p>Apply styles only at a specific breakpoint range.</p>

    <div class="api-signature">@include view_only($breakpoint) { ... }</div>

    <div class="code-block">.element {
        <span class="comment">// Only applies between md and lg breakpoints</span>
        @include view_only(md) {
        display: none;
        }
        }
    </div>

    <h3>view_max()</h3>
    <p>Apply styles below a specific breakpoint.</p>

    <div class="api-signature">@include view_max($breakpoint) { ... }</div>

    <div class="code-block">.sidebar {
        <span class="comment">// Hide on mobile, show on desktop</span>
        @include view_max(lg) {
        display: none;
        }
        }
    </div>
</section>
EOF

cat > 'src/jinja/sections/mixins/02-aspect-ratio-mixins.jinja' << 'EOF'
<section>
    <h2>Aspect Ratio Mixins</h2>
    <p>Apply aspect ratios to containers.</p>

    <h3>ratio()</h3>
    <p>Sets an aspect ratio on an element using the modern <code>aspect-ratio</code> property.</p>

    <div class="api-signature">@include ratio($width, $height)</div>

    <div class="api-params">
        <div class="api-param">
            <span class="api-param__name">$width</span>
            <span class="api-param__type">Number</span>
            <span class="api-param__desc">Width portion of the ratio</span>
        </div>
        <div class="api-param">
            <span class="api-param__name">$height</span>
            <span class="api-param__type">Number</span>
            <span class="api-param__desc">Height portion of the ratio</span>
        </div>
    </div>

    <div class="code-block">.video-container {
        @include ratio(16, 9);
        <span class="comment">// Output: aspect-ratio: 16 / 9;</span>
        }

        .square {
        @include ratio(1, 1);
        }

        .photo {
        @include ratio(4, 3);
        }
    </div>

    <h3>ratio_name()</h3>
    <p>Apply a named aspect ratio from the ratio map.</p>

    <div class="api-signature">@include ratio_name($name)</div>

    <h4>Available Ratios</h4>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Ratio</th>
                <th>Use Case</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>square</code></td>
                <td>1:1</td>
                <td>Avatars, icons</td>
            </tr>
            <tr>
                <td><code>photo</code></td>
                <td>4:3</td>
                <td>Traditional photography</td>
            </tr>
            <tr>
                <td><code>landscape</code></td>
                <td>3:2</td>
                <td>35mm film</td>
            </tr>
            <tr>
                <td><code>wide</code></td>
                <td>16:9</td>
                <td>Video, presentations</td>
            </tr>
            <tr>
                <td><code>ultrawide</code></td>
                <td>21:9</td>
                <td>Cinematic content</td>
            </tr>
            <tr>
                <td><code>golden</code></td>
                <td>1.618:1</td>
                <td>Golden ratio</td>
            </tr>
            <tr>
                <td><code>a_series</code></td>
                <td>1:√2</td>
                <td>A4, A3 paper</td>
            </tr>
            <tr>
                <td><code>portrait</code></td>
                <td>2:3</td>
                <td>Portrait photos</td>
            </tr>
        </tbody>
    </table>

    <div class="code-block">.card-image {
        @include ratio_name("photo");
        }

        .video-embed {
        @include ratio_name("wide");
        }

        .golden-section {
        @include ratio_name("golden");
        }</div>

    <h3>ratio_padding()</h3>
    <p>Legacy padding-based aspect ratio (for broader browser support).</p>

    <div class="api-signature">@include ratio_padding($width, $height)</div>

    <div class="code-block">.legacy-container {
        @include ratio_padding(16, 9);
        <span class="comment">// Output:</span>
        <span class="comment">// position: relative;</span>
        <span class="comment">// &::before {</span>
        <span class="comment">// content: "";</span>
        <span class="comment">// display: block;</span>
        <span class="comment">// padding-top: 56.25%;</span>
        <span class="comment">// }</span>
        }
    </div>
</section>
EOF

cat > 'src/jinja/sections/mixins/03-guide-mixins.jinja' << 'EOF'
<section>
    <h2>Guide Mixins</h2>
    <p>Visual guides for development and layout debugging.</p>

    <h3>guide_baseline()</h3>
    <p>Adds a baseline grid overlay for vertical rhythm debugging.</p>

    <div class="api-signature">@include guide_baseline($size: q(8), $color: rgba(0, 0, 255, 0.1))</div>

    <div class="api-params">
        <div class="api-param">
            <span class="api-param__name">$size</span>
            <span class="api-param__type">Length</span>
            <span class="api-param__desc">Grid line spacing (default: q(8))</span>
        </div>
        <div class="api-param">
            <span class="api-param__name">$color</span>
            <span class="api-param__type">Color</span>
            <span class="api-param__desc">Guide line color (default: semi-transparent blue)</span>
        </div>
    </div>

    <div class="code-block"><span class="comment">// Apply to body for full-page baseline grid</span>
        body {
        @include guide_baseline(q(8), rgba(255, 0, 0, 0.1));
        }

        <span class="comment">// Apply to specific container</span>
        .content {
        @include guide_baseline(q(16));
        }
    </div>

    <h3>guide_columns()</h3>
    <p>Overlays a column grid for layout debugging.</p>

    <div class="api-signature">@include guide_columns($columns: 12, $gutter: q(16), $color: rgba(255, 0, 0, 0.1))</div>

    <div class="code-block">.container {
        @include guide_columns(12, q(24));
        }</div>

    <h3>guide_margin()</h3>
    <p>Highlights margin areas.</p>

    <div class="api-signature">@include guide_margin($size: q(16), $color: rgba(255, 165, 0, 0.2))</div>

    <div class="code-block">.page {
        @include guide_margin(q(32));
        }</div>
</section>
EOF

cat > 'src/jinja/sections/mixins/04-display-layout-mixins.jinja' << 'EOF'
<section>
    <h2>Display & Layout Mixins</h2>

    <h3>flex_center()</h3>
    <p>Centers content using flexbox.</p>

    <div class="api-signature">@include flex_center($direction: row)</div>

    <div class="code-block">.centered {
        @include flex_center();
        <span class="comment">// Output:</span>
        <span class="comment">// display: flex;</span>
        <span class="comment">// justify-content: center;</span>
        <span class="comment">// align-items: center;</span>
        }

        .vertical-center {
        @include flex_center(column);
        }
    </div>

    <h3>absolute_fill()</h3>
    <p>Makes an element fill its positioned parent.</p>

    <div class="api-signature">@include absolute_fill()</div>

    <div class="code-block">.overlay {
        @include absolute_fill();
        <span class="comment">// Output:</span>
        <span class="comment">// position: absolute;</span>
        <span class="comment">// top: 0;</span>
        <span class="comment">// right: 0;</span>
        <span class="comment">// bottom: 0;</span>
        <span class="comment">// left: 0;</span>
        }
    </div>

    <h3>truncate()</h3>
    <p>Truncates text with an ellipsis.</p>

    <div class="api-signature">@include truncate($lines: 1)</div>

    <div class="code-block">.single-line {
        @include truncate();
        <span class="comment">// Single line with ellipsis</span>
        }

        .multi-line {
        @include truncate(3);
        <span class="comment">// Max 3 lines, then ellipsis</span>
        }
    </div>

    <h3>sr_only()</h3>
    <p>Hides element visually while keeping it accessible to screen readers.</p>

    <div class="api-signature">@include sr_only()</div>

    <div class="code-block">.skip-link {
        @include sr_only();

        &:focus {
        <span class="comment">// Make visible when focused</span>
        position: static;
        width: auto;
        height: auto;
        }
        }
    </div>
</section>
EOF

cat > 'src/jinja/sections/mixins/05-device-format-mixins.jinja' << 'EOF'
<section>
    <h2>Device & Format Mixins</h2>

    <h3>format()</h3>
    <p>Applies dimensions from a page/print format.</p>

    <div class="api-signature">@include format($size, $orientation: portrait)</div>

    <h4>Available Formats</h4>
    <table class="table">
        <thead>
            <tr>
                <th>Size</th>
                <th>Dimensions (portrait)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>a3</td>
                <td>297mm × 420mm</td>
            </tr>
            <tr>
                <td>a4</td>
                <td>210mm × 297mm</td>
            </tr>
            <tr>
                <td>a5</td>
                <td>148mm × 210mm</td>
            </tr>
            <tr>
                <td>letter</td>
                <td>216mm × 279mm</td>
            </tr>
            <tr>
                <td>legal</td>
                <td>216mm × 356mm</td>
            </tr>
        </tbody>
    </table>

    <div class="code-block">.print-preview {
        @include format(a4, portrait);
        }

        .landscape-doc {
        @include format(letter, landscape);
        }</div>

    <h3>device()</h3>
    <p>Applies dimensions from a device preset.</p>

    <div class="api-signature">@include device($name)</div>

    <div class="code-block">.iphone-frame {
        @include device("iphone-14-pro");
        }

        .macbook-frame {
        @include device("macbook-pro-14");
        }</div>
</section>
EOF

cat > 'src/jinja/sections/mixins/06-utility-generation.jinja' << 'EOF'
<section>
    <h2>Utility Generation</h2>
    <p>Mixins for generating utility classes (used internally by utility classes module).</p>

    <h3>generate_spacing_utilities()</h3>
    <p>Generates padding and margin utilities for a scale.</p>

    <div class="api-signature">@include generate_spacing_utilities($scale: $q_steps, $prefix: "")</div>

    <div class="code-block"><span class="comment">// Generate utilities for all q-steps</span>
        @include generate_spacing_utilities();

        <span class="comment">// Generates classes like:</span>
        <span class="comment">// .p_q0, .p_q1, .p_q2, .p_q4...</span>
        <span class="comment">// .m_q0, .m_q1, .m_q2, .m_q4...</span>
        <span class="comment">// .pt_q8, .pb_q8, .pl_q8, .pr_q8...</span>
    </div>

    <h3>generate_size_utilities()</h3>
    <p>Generates width and height utilities.</p>

    <div class="api-signature">@include generate_size_utilities($scale: $q_steps)</div>

    <h3>generate_responsive_utilities()</h3>
    <p>Generates responsive variants for all utility classes.</p>

    <div class="api-signature">@include generate_responsive_utilities()</div>

    <div class="code-block"><span class="comment">// Generates responsive prefixed classes:</span>
        <span class="comment">// .sm\:p_q16, .md\:p_q16, .lg\:p_q16...</span>
        <span class="comment">// .sm\:w_q64, .md\:w_q64, .lg\:w_q64...</span>
    </div>
</section>
EOF

# ============================================================================
# UPDATE MAIN TEMPLATE FILES
# ============================================================================

# breakpoints.html.jinja
cat > 'src/jinja/breakpoints.html.jinja' << 'EOF'
{% extends "base.html.jinja" %}

{%- block title %}Breakpoints — unit.gl{%- endblock %}

{%- block header %}
<p class="eyebrow">Guides</p>
<h1>Breakpoints</h1>
<p class="lead">A quick, interactive view of unit.gl's <code>$breakpoints</code> map. All values are derived from Q
    format paper sizes (mm × 4).</p>
{%- endblock %}

{%- block content %}

<div class="page--breakpoints">
{% include "sections/breakpoints/01-current-viewport.jinja" %}
{% include "sections/breakpoints/02-breakpoint-map.jinja" %}
{% include "sections/breakpoints/03-utilities-example.jinja" %}
</div>

{%- endblock %}
EOF

# ratio.html.jinja
cat > 'src/jinja/ratio.html.jinja' << 'EOF'
{% extends "base.html.jinja" %}
{% from "partials/components.html.jinja" import ratio_card, table, code_block %}

{%- block title %}Aspect Ratios — unit.gl{%- endblock %}

{%- block header %}
<p class="eyebrow">Documentation</p>
<h1>Aspect Ratios</h1>
<p class="lead">Predefined aspect ratio classes for images, video, and responsive containers.</p>
{%- endblock %}

{%- block content %}

{% include "sections/ratio/01-common-ratios.jinja" %}
{% include "sections/ratio/02-ratio-reference.jinja" %}
{% include "sections/ratio/03-use-cases.jinja" %}
{% include "sections/ratio/04-usage.jinja" %}

{%- endblock %}
EOF

# device.html.jinja
cat > 'src/jinja/device.html.jinja' << 'EOF'
{% extends "base.html.jinja" %}

{%- block title %}Device Explorer — unit.gl{%- endblock %}

{%- block header %}
<p class="eyebrow">Guides</p>
<h1>Device Explorer</h1>
<p class="lead">Inspect environment media features and match them against unit.gl's <code>$devices</code> profile map.
</p>
{%- endblock %}

{%- block content %}

<div class="page--device">
{% include "sections/device/01-current-environment.jinja" %}
{% include "sections/device/02-media-features.jinja" %}
{% include "sections/device/03-device-profiles.jinja" %}
{% include "sections/device/04-scss-usage.jinja" %}
</div>

{%- endblock %}
EOF

# lorem.html.jinja
cat > 'src/jinja/lorem.html.jinja' << 'EOF'
{% extends "base.html.jinja" %}

{%- block title %}Typography Sample — unit.gl{%- endblock %}

{%- block header %}
<p class="eyebrow">Documentation</p>
<h1>Typography Sample</h1>
<p class="lead">Extended text samples demonstrating typographic rhythm and readability.</p>
{%- endblock %}

{%- block content %}

{% include "sections/lorem/01-long-form-text.jinja" %}
{% include "sections/lorem/02-quotation.jinja" %}
{% include "sections/lorem/03-line-height-comparison.jinja" %}
{% include "sections/lorem/04-rhythm-test.jinja" %}

{%- endblock %}
EOF

# steps.html.jinja
cat > 'src/jinja/steps.html.jinja' << 'EOF'
{% extends "base.html.jinja" %}

{%- block title %}Step System — unit.gl{%- endblock %}

{%- block header %}
<p class="eyebrow">Core Concepts</p>
<h1>9-Step Scale</h1>
<p class="lead">A universal naming system for responsive and tiered values across unit.gl. From ultra-small (us) to ultra-large (ul), these 9 steps provide consistent semantic keys for breakpoints, spacing, typography, and more.</p>
{%- endblock %}

{%- block content %}

<div class="page--steps">
{% include "sections/steps/01-overview.jinja" %}
{% include "sections/steps/02-naming-convention.jinja" %}
{% include "sections/steps/03-usage-in-maps.jinja" %}
{% include "sections/steps/04-q-format-alignment.jinja" %}
{% include "sections/steps/05-scss-api.jinja" %}
{% include "sections/steps/06-design-rationale.jinja" %}
</div>

{%- endblock %}
EOF

# mixins.html.jinja
cat > 'src/jinja/mixins.html.jinja' << 'EOF'
{% extends "base.html.jinja" %}

{%- block title %}Mixins Reference — unit.gl{%- endblock %}

{%- block header %}
<p class="eyebrow">API Reference</p>
<h1>Mixins</h1>
<p class="lead">Reusable SCSS mixins for responsive design, ratios, guides, and common patterns.</p>
{%- endblock %}

{%- block content %}

{% include "sections/mixins/01-responsive-breakpoints.jinja" %}
{% include "sections/mixins/02-aspect-ratio-mixins.jinja" %}
{% include "sections/mixins/03-guide-mixins.jinja" %}
{% include "sections/mixins/04-display-layout-mixins.jinja" %}
{% include "sections/mixins/05-device-format-mixins.jinja" %}
{% include "sections/mixins/06-utility-generation.jinja" %}

{%- endblock %}
EOF

echo "✓ All section files created and templates updated!"
