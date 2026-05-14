// =============================================================================
// Sass-true test runner
// =============================================================================
//
// Loads every `*.test.scss` under `src/scss/__tests__/` and feeds the assertion
// output into Mocha so failures bubble up with proper stack traces.

import { globSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runSass } from "sass-true";

const here = dirname(fileURLToPath(import.meta.url));
const testRoot = resolve(here, "../src/scss/__tests__");

// Resolve `pkg:` URLs (matches the build pipeline). When sass-true detects no
// importers, it auto-attaches sass.NodePackageImporter; passing loadPaths is
// enough for `@use "true"` resolution.
const sassOptions = {
    loadPaths: [resolve(here, "../node_modules")],
};

const files = globSync("**/*.test.scss", { cwd: testRoot }).map((rel) =>
    resolve(testRoot, rel),
);

if (files.length === 0) {
    throw new Error(`No test files found under ${testRoot}`);
}

for (const file of files) {
    runSass({ describe, it }, file, sassOptions);
}
