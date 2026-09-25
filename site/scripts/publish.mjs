import { copyFileSync, cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(site, '..');
const dist = path.join(site, 'dist');

for (const name of ['assets', 'project-images']) {
  rmSync(path.join(root, name), { recursive: true, force: true });
  cpSync(path.join(dist, name), path.join(root, name), { recursive: true });
}
mkdirSync(path.join(root, 'cv'), { recursive: true });
copyFileSync(path.join(dist, 'cv', 'mycv.pdf'), path.join(root, 'cv', 'mycv.pdf'));
for (const name of ['index.html', 'portrait.jpg', 'favicon.ico']) {
  copyFileSync(path.join(dist, name), path.join(root, name));
}
writeFileSync(path.join(root, '.nojekyll'), '');

for (const [folder, page] of Object.entries({
  about: 'about',
  publications: 'publications',
  projects: 'projects',
  contact: 'about',
  blog: 'about'
})) {
  const destination = path.join(root, folder);
  mkdirSync(destination, { recursive: true });
  writeFileSync(path.join(destination, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/#/${page}"><link rel="canonical" href="https://minsilu.github.io/#/${page}"><title>Redirecting…</title></head><body><p>Redirecting to <a href="/#/${page}">Minsi Lu's website</a>.</p></body></html>\n`);
}

writeFileSync(path.join(root, '404.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page not found | Minsi Lu</title></head><body><h1>Page not found</h1><p><a href="/">Visit the home page</a>.</p><script>if(location.pathname.startsWith('/projects/'))location.replace('/#/projects');</script></body></html>\n`);
