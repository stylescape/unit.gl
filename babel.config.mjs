// babel.config.js (ES Modules Format)
// Babel configuration for compiling JavaScript code

export const presets = [
    [
        '@babel/preset-env',
        {
            // Enables transformation of ES6+ syntax to ES5
          loose: true, // Enable "loose" transformations for any plugins in this preset that allow them
          bugfixes: true, // Enable bugfixes that allow Babel to produce smaller output in some cases
        //   modules: true // Preserve ES modules. Set to false to not transform modules, or specify a module type
          modules: false // Preserve ES modules. Set to false to not transform modules, or specify a module type
        }
    ]
];
