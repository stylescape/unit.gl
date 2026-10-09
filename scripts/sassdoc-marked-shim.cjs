// Preloaded by `npm run docs:scss`.
//
// sassdoc-extras (latest is 3.0.0) calls `marked(str)`, but since marked 4
// the module is a namespace object, not a function. package.json overrides
// marked to a patched 14.x for security fixes, so adapt the API here instead
// of downgrading to a vulnerable release.

const Module = require("module");

const load = Module._load;

Module._load = function (request, ...rest) {
    const loaded = load.call(this, request, ...rest);
    if (request === "marked" && typeof loaded !== "function") {
        return Object.assign((source) => loaded.marked.parse(source), loaded);
    }
    return loaded;
};
