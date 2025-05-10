import fs from 'fs-extra';
import nunjucks from 'nunjucks';
import path from 'path';
import { compile } from 'sass';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const HTML_SRC = path.join(__dirname, 'exe/pages');
const HTML_DATA = path.join(__dirname, 'exe/data');
const HTML_OUT = path.join(__dirname, 'dist');
const SCSS_IN = path.join(__dirname, 'src/scss/index.scss');
const SCSS_OUT = path.join(__dirname, 'dist/css/style.css');

nunjucks.configure(path.join(__dirname, 'exe'), { autoescape: true });

export async function renderHTML() {
  const files = (await fs.readdir(HTML_SRC)).filter(f => f.endsWith('.html.jinja'));

  for (const file of files) {
    const name = path.basename(file, '.html.jinja');
    const templatePath = path.join(HTML_SRC, file);
    const dataPath = path.join(HTML_DATA, `${name}.json`);
    const outPath = path.join(HTML_OUT, `${name}.html`);

    const data = await fs.exists(dataPath)
      ? JSON.parse(await fs.readFile(dataPath, 'utf8'))
      : {};

    const rendered = nunjucks.render(templatePath, data);
    await fs.outputFile(outPath, rendered);
    console.log(`✔ Rendered ${file}`);
  }
}

export async function compileSCSS() {
  const result = compile(SCSS_IN, {
    style: 'expanded',
    loadPaths: ['src/scss'],
  });
  await fs.outputFile(SCSS_OUT, result.css);
  console.log('✔ Compiled SCSS');
}

export async function buildAll() {
  await renderHTML();
  await compileSCSS();
}
