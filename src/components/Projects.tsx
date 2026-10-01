import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import './Projects.css';

const pad = (value: number) => String(value).padStart(2, '0');
const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

function ProjectButtons({ project, onSelect }: { project: Project; onSelect: (project: Project) => void }) {
  return <div className="showcase-buttons">
    {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live Website <ArrowUpRight size={17} aria-hidden="true" /></a>}
    {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>}
    <button onClick={() => onSelect(project)}>Case study <ArrowUpRight size={17} aria-hidden="true" /></button>
  </div>;
}

function ProjectNumber({ index, animate = true }: { index: number; animate?: boolean }) {
  return <div className="showcase-number" aria-label={`Project ${index + 1} of ${projects.length}`}>
    <span className="showcase-number-window" aria-hidden="true">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span key={index} initial={{ y: animate ? '70%' : 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: animate ? '-70%' : 0, opacity: 0 }} transition={transition}>{pad(index + 1)}</motion.span>
      </AnimatePresence>
    </span><span aria-hidden="true">/ {pad(projects.length)}</span>
  </div>;
}

function ProjectInfo({ project, animate }: { project: Project; animate: boolean }) {
  return <motion.div className="showcase-copy" initial={animate ? { opacity: 0, y: 20 } : false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={transition}>
    <p className="showcase-category">{project.category}</p>
    <h3>{project.title}</h3>
    <p className="showcase-description">{project.description}</p>
    <div className="showcase-tags" aria-label="Technologies">{project.technologies.map((tech, index) => <motion.span key={tech} initial={animate ? { opacity: 0, y: 6 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3, delay: animate ? .12 + index * .055 : 0 }}>{tech}</motion.span>)}</div>
  </motion.div>;
}

function ProjectPreview({ project, onSelect, animate, eager = false }: { project: Project; onSelect: (project: Project) => void; animate: boolean; eager?: boolean }) {
  return <div className="showcase-preview" style={{ '--project-color': project.color } as CSSProperties}>
    <div className="showcase-browser-bar" aria-hidden="true"><span><i /><i /><i /></span><span>{project.id} / preview</span><ArrowUpRight size={15} /></div>
    <div className="showcase-image-stage">
      <AnimatePresence initial={false}>
        <motion.div className={`showcase-image-layer${project.live ? ' is-live' : ''}`} key={project.id} initial={animate ? { opacity: 0, scale: .96, y: 18 } : false} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .97, y: -12 }} transition={{ ...transition, duration: .6 }}>
          {project.live ? <iframe src={project.live} title={`${project.title} live preview`} loading={eager ? 'eager' : 'lazy'} /> : project.image ? <img src={project.image} alt={`${project.title} — illustrative interface preview`} loading={eager ? 'eager' : 'lazy'} width="1000" height="700" /> : <div className="showcase-image-placeholder"><span>{project.category}</span><strong>{project.title}</strong></div>}
        </motion.div>
      </AnimatePresence>
      {!project.live && <button type="button" className="showcase-preview-overlay" onClick={() => onSelect(project)}>View Project <ArrowUpRight size={17} aria-hidden="true" /></button>}
    </div>
    <div className="showcase-preview-footer"><span>{project.live ? 'Live preview' : 'Illustrative preview'}</span><span>Web application</span></div>
  </div>;
}

function StickyShowcase({ onSelect }: { onSelect: (project: Project) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Scroll remains entirely native. Only project boundaries trigger a React update.
  useEffect(() => {
    const element = track.current!;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const style = getComputedStyle(element);
      const step = parseFloat(style.getPropertyValue('--project-step'));
      const top = parseFloat(style.getPropertyValue('--project-top'));
      const next = Math.max(0, Math.min(projects.length - 1, Math.floor((top - element.getBoundingClientRect().top) / step)));
      setActive(previous => previous === next ? previous : next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const size = new ResizeObserver(schedule);
    size.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    measure();
    return () => { cancelAnimationFrame(frame); size.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  const jumpTo = (index: number) => {
    const element = track.current!;
    const style = getComputedStyle(element);
    const y = window.scrollY + element.getBoundingClientRect().top - parseFloat(style.getPropertyValue('--project-top')) + (index + .4) * parseFloat(style.getPropertyValue('--project-step'));
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  const project = projects[active];
  return <div ref={track} className="showcase-track" style={{ '--project-count': projects.length } as CSSProperties}>
    <div className="showcase-sticky">
      <div className="showcase-toolbar"><span className="eyebrow">Selected work / 2026</span><a href="#services" className="showcase-skip">Continue past projects <ArrowDown size={14} aria-hidden="true" /></a></div>
      <article className="showcase-layout" aria-label={`Featured project: ${project.title}`}>
        <div className="showcase-information">
          <ProjectNumber index={active} />
          <div className="showcase-copy-stage"><AnimatePresence initial={false}><ProjectInfo key={project.id} project={project} animate /></AnimatePresence></div>
          <ProjectButtons project={project} onSelect={onSelect} />
        </div>
        <ProjectPreview project={project} onSelect={onSelect} animate eager />
      </article>
      <div className="showcase-bottom"><div className="showcase-progress" aria-label="Choose a project">{projects.map((p, i) => <button key={p.id} onClick={() => jumpTo(i)} aria-label={`Show project ${i + 1}: ${p.title}`} aria-current={active === i ? 'step' : undefined}><span className="progress-track"><span className={i <= active ? 'filled' : ''} /></span><span>{pad(i + 1)}</span></button>)}</div><span className="showcase-scroll-hint">Scroll to explore <ArrowDown size={14} aria-hidden="true" /></span></div>
    </div>
  </div>;
}

export default function Projects({ onSelect }: { onSelect: (project: Project) => void }) {
  const reducedMotion = useReducedMotion();
  return <section className="wrap section projects-section" id="projects" aria-labelledby="projects-heading">
    <div className="projects-heading"><span className="eyebrow">/04 · Selected projects</span><h2 id="projects-heading">Things I’ve <span>Built.</span></h2><p>A selection of web applications and AI-powered products I’ve designed and developed.</p></div>
    {!reducedMotion ? <StickyShowcase onSelect={onSelect} /> : <div className="showcase-flow">{projects.map((project, index) => <motion.article key={project.id} className="showcase-flow-project" initial={false} aria-labelledby={`title-${project.id}`}>
      <ProjectNumber index={index} animate={!reducedMotion} />
      <div id={`title-${project.id}`}><ProjectInfo project={project} animate={false} /></div>
      <ProjectPreview project={project} onSelect={onSelect} animate={false} />
      <ProjectButtons project={project} onSelect={onSelect} />
    </motion.article>)}</div>}
  </section>;
}
