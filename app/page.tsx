'use client';
/* eslint-disable @next/next/no-html-link-for-pages */

import { CSSProperties, useEffect, useRef, useState } from 'react';
import ProjectVisual from './components/ProjectVisual';
import { additionalServices } from './support/services';
import { socialWorkflows } from './workflow/processes';

const services = [
  { number: '01', title: 'Social Media Management', copy: 'Strategy, content planning, design, publishing, and performance reviews.' },
  { number: '02', title: 'Market & Competitor Research', copy: 'Audience insights, competitor comparisons, positioning gaps, and practical recommendations.' },
  { number: '03', title: 'Email & Calendar Management', copy: 'A calmer inbox, reliable scheduling, thoughtful replies, and cleaner daily priorities.' },
  { number: '04', title: 'Web Development', copy: 'Clear, responsive portfolio and landing pages that turn expertise into an easy next step.' },
];

const capabilities = [
  ['Instagram account analysis & audit', 'I review your account to identify strengths, gaps, and opportunities to improve content performance and audience engagement.'],
  ['Instagram content planning & creation', 'I plan and create strategic content tailored to your audience, supporting engagement, consistency, and brand visibility.'],
  ['Instagram feed design & layout development', 'I design a cohesive feed system that aligns with your brand identity and creates a visually consistent profile.'],
  ['Instagram performance analysis', 'I evaluate Instagram insights and turn content performance data into practical recommendations for improvement.'],
];

const process = [
  ['Listen', 'Understand the brand, offer, audience, priorities, and current workflow.'],
  ['Find the gap', 'Audit the content or system and identify the highest-value improvements.'],
  ['Build the plan', 'Define the direction, deliverables, sequence, and approval points.'],
  ['Create & refine', 'Produce the work, organize feedback, and improve using evidence.'],
];

const toolGroups = [
  ['Organization', ['Google Docs', 'Sheets', 'Slides', 'Drive', 'Microsoft Office', 'Notion']],
  ['Social + creative', ['Meta', 'Canva', 'Figma', 'Photoshop', 'CapCut', 'Buffer', 'Instagram', 'TikTok', 'Pinterest', 'YouTube', 'Trello']],
  ['Communication', ['Zoom', 'Google Meet', 'WhatsApp', 'Gmail', 'Google Calendar']],
  ['Research + AI', ['ChatGPT', 'Claude', 'Perplexity', 'Gemini', 'n8n']],
];

function EntryLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`entry-label ${light ? 'entry-label-light' : ''}`}><i />{children}</div>;
}

function StickyNote({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <aside className={`sticky-note ${className}`}><span className="tape" />{children}</aside>;
}

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [barVisible, setBarVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [compactNav, setCompactNav] = useState(false);
  const lastScroll = useRef(0);
  const ticking = useRef(false);
  const compactNavRef = useRef(false);
  const projectTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress = max > 0 ? y / max : 0;
        setProgress(nextProgress);
        document.documentElement.style.setProperty('--scroll-progress', `${nextProgress}`);
        const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 700;
        const delta = y - lastScroll.current;
        const movingUp = delta < -12;
        const movingDown = delta > 12;
        if (nearEnd || (y > window.innerHeight * .55 && movingUp)) setBarVisible(true);
        if (!nearEnd && (movingDown || y < window.innerHeight * .55)) setBarVisible(false);
        document.body.classList.toggle('scrolled', y > 90);
        const aboutSection = document.getElementById('about');
        const isPastAbout = aboutSection ? aboutSection.getBoundingClientRect().bottom <= 52 : false;
        if (isPastAbout !== compactNavRef.current) {
          compactNavRef.current = isPastAbout;
          setCompactNav(isPastAbout);
          setMenuOpen(false);
        }
        lastScroll.current = y;
        ticking.current = false;
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: .12 });

    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const scrollProjects = (direction: -1 | 1) => {
    const track = projectTrackRef.current;
    if (!track) return;
    track.scrollBy({ left: track.clientWidth * .72 * direction, behavior: 'smooth' });
  };

  return (
    <>
      <aside className="notebook-rail" aria-label={`Page progress ${Math.round(progress * 100)}%`}>
        <div className="rail-fill" />
        <div className="rings" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => <span className={`ring ${progress * 14 >= index ? 'ring-active' : ''}`} key={index} />)}
        </div>
      </aside>

      <header className={`site-header ${compactNav ? 'site-header-compact' : ''}`}>
        <div className="announcement">
          <span className="status-dot" />
          <strong>Currently open for coaching brands</strong>
          <span className="announcement-chip">REMOTE SUPPORT · UTC+7</span>
          <a href="mailto:mrdesign.ai@gmail.com">start a conversation <span>→</span></a>
        </div>
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="wordmark" href="#top" onClick={closeMenu}>mrdesign.ai</a>
          <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#work" onClick={closeMenu}>Work</a>
            <a href="#support" onClick={closeMenu}>Support</a>
            <a href="#about" onClick={closeMenu}>About</a>
          </div>
          <div className="nav-proof"><b>10+</b> projects · <b>20+</b> visual pieces</div>
          <a className="button button-small nav-cta" href="mailto:mrdesign.ai@gmail.com">Let&apos;s connect <span>→</span></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /><span /></button>
        </nav>
        <button className={`compact-menu-button ${menuOpen ? 'is-open' : ''}`} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="compact-navigation" aria-label="Toggle compact navigation"><span /><span /><span /></button>
        <div id="compact-navigation" className={`compact-menu ${menuOpen ? 'compact-menu-open' : ''}`}>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#support" onClick={closeMenu}>Support</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="compact-menu-contact" href="mailto:mrdesign.ai@gmail.com" onClick={closeMenu}>Let&apos;s connect <span>→</span></a>
        </div>
      </header>

      <main id="top">
        <section id="about" className="page-section about-section about-opening reveal">
          <EntryLabel>ENTRY 01, ABOUT ME · WHO I AM &amp; WHO I HELP</EntryLabel>
          <div className="about-grid">
            <div className="about-copy">
              <span className="about-kicker">HI, I&apos;M MOHAMAD · YOUR CREATIVE OPERATIONS PARTNER</span>
              <h1>I turn a coach&apos;s expertise into content people can <mark>understand, trust, and act on.</mark></h1>
              <p className="about-lead">A Social Media Manager and Virtual Assistant passionate about helping business and mindset coaches show up online with intention, so their expertise reaches the clients who need it most.</p>
              <p>I&apos;m a detail-oriented, design-driven operator who learns the brand and offer before creating anything. That understanding becomes clearer content, cohesive visuals, and organized support that helps a coach show up consistently.</p>
              <div className="about-actions">
                <a className="button" href="#work">View selected work <span>→</span></a>
                <a className="text-link" href="#services">See how I can help ↓</a>
              </div>
              <div className="skill-stamps"><span>CONTENT STRATEGY</span><span>BRAND DESIGN</span><span>AI-POWERED WORKFLOW</span><span>ORGANIZED EXECUTION</span></div>
            </div>
            <figure className="portrait-card">
              <span className="portrait-tape" />
              <img src="/mohamad-portrait.png" alt="Mohamad Rohmanudin outdoors reading a newspaper" />
              <figcaption><strong>MOHAMAD ROHMANUDIN</strong><span>VA + SOCIAL MEDIA MANAGER</span></figcaption>
            </figure>
          </div>
          <StickyNote>strategy first.<br />then make it clear →</StickyNote>
        </section>

        <section className="kinetic-ribbon" aria-label="Services highlight">
          <div className="ticker-track">
            {[0, 1].map((group) => <div className="ticker-group" key={group} aria-hidden={group === 1}>
              <span>CONTENT STRATEGY</span><b>·</b><span className="crossed">POST AND HOPE</span><b>·</b><span>FEED DESIGN</span><b>·</b><span>ORGANIZED SUPPORT</span><b>·</b><span>ONE-TIME PROJECT SUPPORT</span><b>·</b><span>SOCIAL MEDIA MANAGEMENT</span><b>·</b>
            </div>)}
          </div>
        </section>

        <section id="services" className="page-section section-space reveal">
          <EntryLabel>ENTRY 02, SERVICES · WHAT I CAN TAKE OFF YOUR PLATE</EntryLabel>
          <h2>The support behind a consistent coaching brand.</h2>
          <p className="section-intro">Choose focused project support or ongoing help across content, research, operations, and launches.</p>
          <div className="service-card ruled-card">
            {services.map((service) => <article className="service-item" key={service.title}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <a href="#contact" aria-label={`Discuss ${service.title}`}>Let&apos;s discuss it <span>↗</span></a>
            </article>)}
          </div>
          <StickyNote>what I can take<br />off your plate ↓</StickyNote>
        </section>

        <section id="social-media" className="dark-section reveal">
          <div className="dark-inner">
            <EntryLabel light>ENTRY 03, SOCIAL MEDIA WORKFLOW</EntryLabel>
            <h2>Four connected processes, <em>one clear social media system.</em></h2>
            <p className="dark-intro">From the first audit to the performance review, every step supports clearer content, stronger brand consistency, and better decisions.</p>
            <div className="capability-list">
              {capabilities.map(([title, copy], index) => <article key={title}>
                <span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><i>→</i>
              </article>)}
            </div>
            <p className="hand-note">strategy first. pretty second. both matter.</p>
            <StickyNote className="note-dark">make every post<br />earn its place →</StickyNote>
          </div>
        </section>

        <section id="work" className="page-section section-space reveal">
          <EntryLabel>ENTRY 03·B, INSIDE THE SOCIAL MEDIA WORKFLOW</EntryLabel>
          <div className="section-heading-row">
            <h2>Four process covers. Open one to see what happens inside.</h2>
            <p>Each guide breaks one part of the workflow into its objective, working steps, deliverables, quality checks, and final outcome.</p>
          </div>
          <div className="project-carousel-controls" aria-label="Workflow card controls">
            <button className="project-arrow" type="button" onClick={() => scrollProjects(-1)} aria-label="Previous processes">←</button>
            <button className="project-arrow" type="button" onClick={() => scrollProjects(1)} aria-label="Next processes">→</button>
            <span>DRAG OR USE ARROWS</span>
          </div>
          <div className="project-track workflow-track" ref={projectTrackRef}>
            {socialWorkflows.map((workflow) => <article className="project-card workflow-cover" key={workflow.slug}>
              <div className="project-meta"><span>PROCESS {workflow.number}</span><b>OPEN GUIDE</b></div>
              <div className="workflow-cover-visual">
                {workflow.coverVideo
                  ? <video className="workflow-cover-video" src={workflow.coverVideo} autoPlay muted loop playsInline preload="metadata" aria-label={`${workflow.title} preview`} />
                  : workflow.coverImage
                    ? <img className="workflow-cover-image" src={workflow.coverImage} alt={`${workflow.title} preview`} />
                  : <ProjectVisual type={workflow.type} />}
                <span className="workflow-cover-title">{workflow.shortTitle}</span>
              </div>
              <div className="project-copy">
                <span className="project-category">SOCIAL MEDIA WORKFLOW</span>
                <h3>{workflow.title}</h3>
                <a className="project-detail-link" href={`/workflow/${workflow.slug}`}>Look inside <span>→</span></a>
              </div>
            </article>)}
          </div>
          <div className="work-more-row">
            <p>Want to see the workflow applied? The project library includes six concept case studies with their thinking and deliverables.</p>
            <a className="button" href="/work">Browse project examples <span>→</span></a>
          </div>
          <StickyNote>pick a cover.<br />see the method →</StickyNote>
        </section>

        <section id="process" className="process-wrap reveal">
          <div className="page-section process-section">
            <EntryLabel>MY SOCIAL MEDIA PROCESS</EntryLabel>
            <h2>From expertise to execution, in four steps.</h2>
            <div className="process-card ruled-card">
              {process.map(([title, copy], index) => <article key={title}>
                <span className="process-index">0{index + 1}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>)}
              <p className="hand-note process-note">no guesswork. clear checkpoints. useful work.</p>
            </div>
            <StickyNote>clarity before<br />creation →</StickyNote>
          </div>
        </section>

        <section id="support" className="page-section section-space operations-section reveal">
          <EntryLabel>ENTRY 04, ADDITIONAL SUPPORT</EntryLabel>
          <h2>Three more ways I can make the work lighter.</h2>
          <div className="operations-grid">
            {additionalServices.map((service, index) => <article key={service.title} style={{ '--tilt': `${index % 2 ? 1 : -1}deg` } as CSSProperties}>
              <span className="mini-tape" />
              <b>0{index + 1}</b><h3>{service.title}</h3><p>{service.summary}</p>
              <a className="support-card-link" href={`/support/${service.slug}`}>View more <span>→</span></a>
            </article>)}
          </div>
          <StickyNote>less chaos,<br />more coaching.</StickyNote>
        </section>

        <section className="tools-section reveal">
          <div className="page-section tools-inner">
          <EntryLabel>WORKING TOOLKIT</EntryLabel>
            <div className="section-heading-row">
              <h2>The tools are useful. The workflow is the value.</h2>
              <p>I use familiar platforms and practical AI workflows to keep ideas, approvals, files, and delivery moving.</p>
            </div>
            <div className="tool-groups">
              {toolGroups.map(([group, tools]) => <article key={group as string}>
                <h3>{group as string}</h3>
                <div>{(tools as string[]).map((tool) => <span key={tool}>{tool}</span>)}</div>
              </article>)}
            </div>
            <StickyNote>systems make<br />consistency easier.</StickyNote>
          </div>
        </section>

        <section className="reference-strip reveal"><span>REFERENCES AVAILABLE ON REQUEST</span><i>·</i><span>REAL TESTIMONIALS WILL LIVE HERE</span><i>·</i><span>NO MADE-UP PRAISE</span></section>

        <section id="contact" className="contact-section reveal">
          <div className="contact-inner">
            <EntryLabel light>FINAL ENTRY, HELLO</EntryLabel>
            <span className="stamp closing-stamp">VIRTUAL ASSISTANT + SOCIAL MEDIA MANAGER FOR COACHES</span>
            <h2>Your expertise deserves content that reaches the <span>right people.</span></h2>
            <p><strong>Ready to make showing up feel lighter?</strong> Tell me what you&apos;re building, what keeps getting delayed, and where you need a thoughtful extra pair of hands.</p>
            <div className="contact-actions">
              <a className="button contact-button" href="mailto:mrdesign.ai@gmail.com?subject=Let%27s%20work%20together">Start a conversation <span>→</span></a>
              <a href="https://instagram.com/mrdesign.ai" target="_blank" rel="noreferrer">Instagram <b>@mrdesign.ai</b> ↗</a>
              <a href="#work">Review <b>selected work</b> ↑</a>
            </div>
            <div className="closing-proof">
              <span><strong>10+</strong> practice projects</span>
              <span><strong>20+</strong> visual pieces</span>
              <span><strong>UTC+7</strong> remote support</span>
            </div>
            <StickyNote className="contact-note">one thoughtful message<br />can start the work →</StickyNote>
            <footer><a href="#top">mrdesign.ai</a><span>© 2026 Mohamad Rohmanudin</span><a href="#top">Back to top ↑</a></footer>
          </div>
        </section>
      </main>

      <aside className={`bottom-bar ${barVisible && !menuOpen ? 'bottom-bar-visible' : ''}`} aria-hidden={!barVisible}>
        <div><strong>Available for social media & VA support</strong><span>Strategy · design · organized execution</span></div>
        <a className="button bottom-button" href="mailto:mrdesign.ai@gmail.com">Let&apos;s work together <span>→</span></a>
      </aside>
    </>
  );
}
