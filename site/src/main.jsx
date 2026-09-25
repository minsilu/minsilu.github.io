import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const routes = ['about', 'publications', 'projects'];
const external = { target: '_blank', rel: 'noopener noreferrer' };

const publications = [
  {
    title: 'DrugCLIP: Contrastive Protein-Molecule Representation Learning for Virtual Screening',
    authors: 'Bowen Gao, Bo Qiang, Haichuan Tan, Yinjun Jia, Minsi Ren, Minsi Lu, Jingjing Liu, Wei-Ying Ma, Yanyan Lan',
    venue: 'NeurIPS 2023',
    url: 'https://proceedings.neurips.cc/paper_files/paper/2023/hash/8bd31288ad8e9a31d519fdeede7ee47d-Abstract-Conference.html'
  },
  {
    title: 'Enhancing Hi-C contact matrices for loop detection with Capricorn, a multi-view diffusion model',
    authors: 'Tangqi Fang, Yifeng Liu, Addie Woicik, Minsi Lu, Anupama Jha, Xiao Wang, Gang Li, Borislav Hristov, Zixuan Liu, Hanwen Xu, William S Noble, Sheng Wang',
    venue: 'Bioinformatics 2024',
    url: 'https://www.biorxiv.org/content/10.1101/2023.10.25.564065v2.abstract'
  }
];

const projects = [
  {
    area: 'Information retrieval',
    title: 'Adaptive vector search for mass spectrometry',
    description: 'A biology-informed approximate nearest neighbor system for peptide identification, combining mass-aware storage with graph search. The original project reports a 13× speedup over MSFragger at a 500 Da tolerance.',
    image: '/project-images/deepsearch.png',
    imageAlt: 'DeepSearch system diagram'
  },
  {
    area: 'Representation learning',
    title: 'DrugCLIP',
    description: 'Contrastive protein–molecule representations that frame virtual screening as large-scale retrieval and support zero-shot search.',
    image: '/project-images/drugclip.png',
    imageAlt: 'DrugCLIP framework diagram',
    link: publications[0].url,
    linkLabel: 'Paper'
  },
  {
    area: 'Generative models',
    title: 'Capricorn',
    description: 'A multi-view diffusion model that enhances low-resolution Hi-C contact matrices to help detect chromatin loops.',
    image: '/project-images/capricorn.png',
    imageAlt: 'Capricorn model diagram',
    link: publications[1].url,
    linkLabel: 'Paper'
  },
  {
    area: 'LLM systems',
    title: 'WildChat-MCP',
    description: 'An MCP-based analysis framework for exploring more than 1.4 million conversations through structured, read-only tools.',
    image: '/project-images/wildchat.png',
    imageAlt: 'WildChat-MCP architecture',
    link: 'https://github.com/minsilu/WildChat-MCP',
    linkLabel: 'Code'
  },
  {
    area: 'Graph learning',
    title: 'Multiomics integration',
    description: 'Graph representation learning that brings distinct biological data modalities into a shared latent space.',
    image: '/project-images/glue.png',
    imageAlt: 'Multiomics graph learning diagram'
  },
  {
    area: 'Graph learning',
    title: 'Graph regularization for target discovery',
    description: 'Structural interaction networks used as a graph regularization prior for unsupervised target discovery.',
    image: '/project-images/ppi.png',
    imageAlt: 'Graph regularization diagram'
  }
];

function getRoute() {
  const route = window.location.hash.replace(/^#\/?/, '').split('/')[0].toLowerCase();
  return routes.includes(route) ? route : 'about';
}

function Icon({ name }) {
  const paths = {
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    school: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c3.7 2.7 8.3 2.7 12 0v-5" /></>,
    mail: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7" /></>,
    moon: <path d="M20.3 15.8A8.7 8.7 0 0 1 8.2 3.7 8.8 8.8 0 1 0 20.3 15.8Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>
  };
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Profile() {
  return <aside className="profile" aria-label="Profile">
    <img className="portrait" src="/portrait.jpg" alt="Minsi Lu" />
    <h2>Minsi Lu</h2>
    <p className="profile-summary">AI · <a href="https://scholar.google.com/citations?view_op=search_authors&hl=en&mauthors=label:software_performance" {...external}>Software Performance</a> · <a href="https://scholar.google.com/citations?view_op=search_authors&hl=en&mauthors=label:ai_agent" {...external}>AI Agent</a> · <a href="https://scholar.google.com/citations?view_op=search_authors&hl=en&mauthors=label:machine_learning" {...external}>Machine Learning</a></p>
    <ul className="profile-links">
      <li><Icon name="pin" /><span>Waterloo, Ontario</span></li>
      <li><Icon name="school" /><span>University of Waterloo</span></li>
      <li><Icon name="mail" /><a href="mailto:minsilu0330@gmail.com">Email</a></li>
      <li><Icon name="link" /><a href="https://scholar.google.com/citations?user=KBhKa_4AAAAJ" {...external}>Google Scholar</a></li>
      <li><Icon name="link" /><a href="https://github.com/minsilu" {...external}>GitHub</a></li>
      <li><Icon name="link" /><a href="https://linkedin.com/in/minsi-lu-72957b263" {...external}>LinkedIn</a></li>
    </ul>
  </aside>;
}

function About() {
  return <article className="content prose">
    <p className="eyebrow">About</p>
    <h1>AI for software quality and performance</h1>
    <p>Hello! I’m Minsi Lu. I study the quality, performance, and energy consumption of AI-generated software, as well as AI agents and machine learning.</p>
    <p>I am a PhD student in Electrical and Computer Engineering at the <a href="https://uwaterloo.ca/" {...external}>University of Waterloo</a>, advised by Prof. <a href="https://ece.uwaterloo.ca/~wshang/" {...external}>Weiyi Shang</a>.</p>
    <p>I am also a research intern at <a href="https://www.era-environmental.com/" {...external}>ERA Environmental Software Solutions</a>, where I work on automated test generation.</p>
    <h2>Research interests</h2>
    <ul>
      <li>Quality, performance, and energy consumption of AI-generated software.</li>
      <li>AI agents.</li>
      <li>Machine learning.</li>
    </ul>
    <h2>Research experience</h2>
    <div className="experience">
      <div><span className="date">Current</span><p><strong>University of Waterloo</strong><br />PhD research with Prof. <a href="https://ece.uwaterloo.ca/~wshang/" {...external}>Weiyi Shang</a> on AI-generated software and software performance.</p></div>
      <div><span className="date">Current</span><p><strong><a href="https://www.era-environmental.com/" {...external}>ERA Environmental Software Solutions</a></strong><br />Research internship focused on automated test generation.</p></div>
      <div><span className="date">2025</span><p><strong>University of Waterloo</strong><br />Index optimization for DeepSearch under the supervision of Prof. <a href="https://cs.uwaterloo.ca/~mli/" {...external}>Ming Li</a>.</p></div>
      <div><span className="date">2023</span><p><strong>University of Washington</strong><br />Hi-C resolution enhancement with Prof. <a href="https://noble.gs.washington.edu/~wnoble/" {...external}>William Stafford Noble</a> and Prof. <a href="https://homes.cs.washington.edu/~swang/" {...external}>Sheng Wang</a>.</p></div>
      <div><span className="date">2023</span><p><strong>Tsinghua AIR</strong><br />Protein–molecule representation learning with Prof. <a href="https://air.tsinghua.edu.cn/en/info/1046/1195.htm" {...external}>Yanyan Lan</a>.</p></div>
    </div>
    <p className="next-links"><a href="#/publications">Publications <Icon name="arrow" /></a><a href="#/projects">Projects <Icon name="arrow" /></a><a href="/cv/mycv.pdf" target="_blank" rel="noopener noreferrer">CV (PDF) <Icon name="arrow" /></a></p>
  </article>;
}

function Publications() {
  return <section className="content">
    <p className="eyebrow">Research</p>
    <h1>Publications</h1>
    <p className="section-intro">Selected publications. A complete list is available on <a href="https://scholar.google.com/citations?user=KBhKa_4AAAAJ" {...external}>Google Scholar</a>.</p>
    <div className="publication-list">{publications.map((paper) => <article className="publication" key={paper.title}>
      <span className="venue">{paper.venue}</span>
      <h2><a href={paper.url} {...external}>{paper.title}</a></h2>
      <p>{paper.authors}</p>
      <a className="text-link" href={paper.url} {...external}>Read paper <Icon name="arrow" /></a>
    </article>)}</div>
  </section>;
}

function Projects() {
  return <section className="content">
    <p className="eyebrow">Selected work</p>
    <h1>Projects</h1>
    <p className="section-intro">A focused selection of research projects across retrieval, multimodal learning, and computational biology.</p>
    <div className="project-grid">{projects.map((project) => <article className="project-card" key={project.title}>
      <img src={project.image} alt={project.imageAlt} loading="lazy" />
      <div className="project-copy"><span className="venue">{project.area}</span><h2>{project.title}</h2><p>{project.description}</p>
      {project.link && <a className="text-link" href={project.link} {...external}>{project.linkLabel} <Icon name="arrow" /></a>}</div>
    </article>)}</div>
  </section>;
}

function App() {
  const [route, setRoute] = useState(getRoute);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  useEffect(() => {
    document.title = `${route[0].toUpperCase()}${route.slice(1)} | Minsi Lu`;
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }, [route]);

  return <div className="app-shell">
    <header className="site-header"><div className="header-inner">
      <a className="brand" href="#/about">Minsi Lu</a>
      <nav aria-label="Main navigation">
        <a href="#/about" aria-current={route === 'about' ? 'page' : undefined}>About</a>
        <a href="#/publications" aria-current={route === 'publications' ? 'page' : undefined}>Publications</a>
        <a href="#/projects" aria-current={route === 'projects' ? 'page' : undefined}>Projects</a>
        <a href="/cv/mycv.pdf" target="_blank" rel="noopener noreferrer">CV</a>
      </nav>
      <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}><Icon name={theme === 'light' ? 'moon' : 'sun'} /></button>
    </div></header>
    <div className="layout"><Profile /><main id="main-content">{route === 'about' ? <About /> : route === 'publications' ? <Publications /> : <Projects />}</main></div>
    <footer className="site-footer"><div>© {new Date().getFullYear()} Minsi Lu</div><div><a href="mailto:minsilu0330@gmail.com">Email</a><span aria-hidden="true">·</span><a href="https://github.com/minsilu" {...external}>GitHub</a></div></footer>
  </div>;
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
if (import.meta.hot) import.meta.hot.dispose(() => root.unmount());
