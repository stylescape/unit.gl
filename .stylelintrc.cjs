// =============================================================================
// Stylelint configuration for unit.gl
// =============================================================================
//
// Enforces modern Sass module system, modular naming, and prevents legacy
// global Sass functions from creeping back in.

/** @type {import('stylelint').Config} */
module.exports = {
    extends: [
        "stylelint-config-standard-scss",
    ],
    plugins: [
        "stylelint-order",
    ],
    ignoreFiles: [
        "dist/**/*",
        "node_modules/**/*",
        "src/scss/dev/**/*",
        "src/scss/doc/**/*",
        "src/scss/__tests__/**/*",
        "src/scss/test.scss",
    ],
    rules: {
        // ----- Modern @use only -------------------------------------------------
        "scss/load-no-partial-leading-underscore": true,
        "scss/at-use-no-redundant-alias": true,
        "scss/no-global-function-names": true,

        // ----- Naming -----------------------------------------------------------
        // Allow Sass identifiers to use either kebab-case or snake_case during
        // the migration window. Tighten to one in the next major.
        "scss/dollar-variable-pattern": "^[a-z_][a-z0-9_-]*$",
        "scss/at-mixin-pattern": "^[a-z_][a-z0-9_-]*$",
        "scss/at-function-pattern": "^[a-z_][a-z0-9_-]*$",
        "scss/percent-placeholder-pattern": "^[a-z_][a-z0-9_-]*$",

        // CSS class naming: project uses snake_case + `--` BEM-ish modifiers.
        "selector-class-pattern": [
            "^-?[a-z][a-z0-9]*(?:[_-]+[a-z0-9]+)*(?:--[a-z0-9]+(?:[_-]+[a-z0-9]+)*)?$",
            { resolveNestedSelectors: true, message: "Class names must be lowercase, snake_case or kebab-case, with optional `--modifier` suffix." },
        ],

        // ----- Quality ----------------------------------------------------------
        "max-nesting-depth": [3, { ignore: ["pseudo-classes", "blockless-at-rules"] }],
        "no-duplicate-selectors": true,
        "declaration-block-no-shorthand-property-overrides": true,

        // ----- Relaxations specific to this codebase ----------------------------
        // Generated utility classes intentionally repeat declarations; we permit
        // them across rules. Ordering enforced via stylelint-order.
        "no-descending-specificity": null,
        "alpha-value-notation": null,
        "color-function-notation": null,
        "selector-not-notation": null,

        // SassDoc uses `///` triple-slash blocks at column 0; allow.
        "scss/comment-no-empty": null,

        // The codebase predates many cosmetic conventions; relax for now and
        // tighten incrementally with auto-fix in dedicated PRs.
        "at-rule-empty-line-before": null,
        "rule-empty-line-before": null,
        "comment-empty-line-before": null,
        "declaration-empty-line-before": null,
        "scss/double-slash-comment-empty-line-before": null,
        "scss/dollar-variable-empty-line-before": null,
        "scss/at-if-no-null": null,
        "scss/operator-no-newline-after": null,
        "scss/operator-no-unspaced": null,
        "scss/no-global-function-names": true,
        "no-empty-source": null,
        "value-keyword-case": null,
        "function-no-unknown": null,
        "no-invalid-position-at-import-rule": null,
        "media-feature-range-notation": null,
        "media-feature-name-no-unknown": [
            true,
            { ignoreMediaFeatureNames: ["min-device-pixel-ratio", "max-device-pixel-ratio"] },
        ],
        "declaration-block-no-duplicate-properties": [
            true,
            { ignore: ["consecutive-duplicates"] },
        ],
        // Sass interpolation in `@container#{$name}` confuses the at-rule
        // parser; allow.
        "scss/at-rule-no-unknown": [
            true,
            { ignoreAtRules: ["container"] },
        ],

        // ----- Order ------------------------------------------------------------
        // `order/order` was too aggressive against existing helpers that mix
        // local `$variables` and `@if` early-return guards inside functions.
        // Disable for now; revisit per-file with auto-fix.
        "order/order": null,
    },
};
