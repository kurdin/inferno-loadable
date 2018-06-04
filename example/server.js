import express from 'express';
import path from 'path';
import Loadable from '../src';
import { getBundles } from '../src/webpack'
import App from './components/App';
import { renderToStaticMarkup } from 'inferno-server';

const stats = require('./dist/inferno-loadable.json');
const app = express();

app.get('/', (req, res) => {
  let modules = [];
  let html = renderToStaticMarkup(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <App/>
    </Loadable.Capture>
  );

  let bundles = getBundles(stats, modules);

  let styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
  let scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My App</title>
        ${styles.map(style => {
          return `<link href="/dist/${style.file}" rel="stylesheet"/>`;
        }).join('\n')}
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="/dist/main.js"></script>
        ${scripts.map(script => {
          return `<script src="/dist/${script.file}"></script>`
        }).join('\n')}
        <script>window.main();</script>
      </body>
    </html>
  `);
});

app.use('/dist', express.static(path.join(__dirname, 'dist')));

Loadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
  });
}).catch(err => {
  console.log(err);
});
