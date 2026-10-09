import { defineConfig } from 'tsup';

export default defineConfig([
    // Main library build (ESM + CJS)
    {
        entry: { 'index': 'src/ts/index.ts' },
        format: ['esm', 'cjs'],
        // tsup's declaration build sets `baseUrl`, which TypeScript 6 rejects
        // as deprecated unless told otherwise. Comments are kept so the
        // published types carry their JSDoc.
        dts: { compilerOptions: { ignoreDeprecations: '6.0', removeComments: false } },
        outDir: 'dist/js',
        outExtension({ format }) {
            return {
                js: format === 'esm' ? '.mjs' : '.cjs',
            };
        },
        target: 'es2020',
        splitting: false,
        sourcemap: true,
        clean: false,
        minify: false,
    },
    // Browser bundle for documentation demos
    {
        entry: {
            'unit.gl': 'src/ts/index.ts',
            'unit.gl.docs': 'src/ts/docs.ts',
        },
        format: ['esm'],
        outDir: 'dist/js',
        outExtension() {
            return { js: '.js' };
        },
        target: 'es2020',
        splitting: false,
        sourcemap: true,
        clean: false,
        minify: false,
    },
]);
