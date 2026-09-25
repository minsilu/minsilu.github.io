import { copyFileSync, cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(site, '..');
const dist = path.join(site, 'dist');

for (const name of ['assets', 'project-images']) {
  rmSync(path.join(root, name), { recursive: true, force: true });
  cpSync(path.join(dist, name), path.join(root, name), { recursive: true });
}
rmSync(path.join(root, 'projects'), { recursive: true, force: true });
cpSync(path.join(dist, 'projects'), path.join(root, 'projects'), { recursive: true });
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
  teaching: 'teaching',
  contact: 'about',
  blog: 'about'
})) {
  const destination = path.join(root, folder);
  mkdirSync(destination, { recursive: true });
  writeFileSync(path.join(destination, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/#/${page}"><link rel="canonical" href="https://minsilu.github.io/#/${page}"><title>Redirecting…</title></head><body><p>Redirecting to <a href="/#/${page}">Minsi Lu's website</a>.</p></body></html>\n`);
}

for (const name of readdirSync(path.join(site, 'src', 'project-content')).filter((name) => name.endsWith('.html') && name !== 'sbdd.html')) {
  const slug = name.slice(0, -5);
  const destination = path.join(root, 'projects', slug);
  mkdirSync(destination, { recursive: true });
  writeFileSync(path.join(destination, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/#/projects/${slug}"><link rel="canonical" href="https://minsilu.github.io/#/projects/${slug}"><title>Redirecting…</title></head><body><p>Redirecting to <a href="/#/projects/${slug}">${slug} project details</a>.</p></body></html>\n`);
}

writeFileSync(path.join(root, '404.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page not found | Minsi Lu</title></head><body><h1>Page not found</h1><p><a href="/">Visit the home page</a>.</p><script>const match=location.pathname.match(/^\\/projects\\/([a-z0-9-]+)/);if(match)location.replace('/#/projects/'+match[1]);</script></body></html>\n`);
