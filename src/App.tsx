import { Component, lazy, Suspense, type FormEvent, type ReactNode, useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  FileText,
  MapPin,
  Menu,
  Pause,
  Play,
  Printer,
  Sparkles,
  X,
} from 'lucide-react'
import { Reveal } from './components/Reveal'
import {
  archiveRecord,
  diligenceGates,
  evidenceTimeline,
  governancePrinciples,
  navItems,
  opportunityRows,
  priorities,
  projects,
  researchSources,
  sourceFacts,
  stakeholderPaths,
  storyLayers,
} from './data/siteData'

const HeritageScene = lazy(() => import('./components/HeritageScene').then((module) => ({ default: module.HeritageScene })))

function SceneFallback() {
  return <div className="heritage-scene heritage-scene--fallback" aria-hidden="true" />
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? <SceneFallback /> : this.props.children
  }
}

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <button className={`brand ${compact ? 'brand--compact' : ''}`} onClick={() => scrollToId('home')} aria-label="Return to the top">
      <span className="brand__glyph" aria-hidden="true">
        <span />
      </span>
      <span className="brand__name">
        <strong>ABETIFI</strong>
        {!compact && <small>STONE AGE · COMMUNITY DEVELOPMENT</small>}
      </span>
    </button>
  )
}

type PartnerModalProps = {
  open: boolean
  onClose: () => void
  initialInterest?: string
}

function PartnerModal({ open, onClose, initialInterest = 'Strategic partnership' }: PartnerModalProps) {
  const [draft, setDraft] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) {
      setDraft('')
      setCopied(false)
    }
  }, [open])

  if (!open) return null

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const interest = String(data.get('interest') || initialInterest)
    const body = [
      'ABETIFI PARTNERSHIP BRIEFING NOTE',
      `Interest: ${interest}`,
      '',
      `Name: ${String(data.get('name') || '')}`,
      `Organisation: ${String(data.get('organisation') || '')}`,
      `Email: ${String(data.get('email') || '')}`,
      '',
      'What we would like to explore:',
      String(data.get('message') || ''),
      '',
      'Requested next step: Confirm the appropriate project representative and evidence pack for this enquiry.',
    ].join('\n')
    setDraft(body)
    setCopied(false)
  }

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draft)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="modal-shell" role="dialog" aria-modal="true" aria-labelledby="partner-title">
      <button className="modal-backdrop" onClick={onClose} aria-label="Close partnership form" />
      <div className="modal modal--form">
        <button className="icon-button modal__close" onClick={onClose} aria-label="Close">
          <X size={19} />
        </button>
        <p className="eyebrow">Partnership desk</p>
        <h2 id="partner-title">Start with a serious conversation.</h2>
        <p className="modal__intro">
          Build a private briefing note for the project team. Nothing is transmitted or stored; an official organisation contact channel will be published after community and project confirmation.
        </p>
        {!draft ? <form onSubmit={submit} className="partner-form">
          <div className="form-grid">
            <label>
              <span>Your name</span>
              <input name="name" autoComplete="name" required placeholder="Full name" />
            </label>
            <label>
              <span>Organisation</span>
              <input name="organisation" autoComplete="organization" placeholder="Organisation or network" />
            </label>
          </div>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required placeholder="name@organisation.com" />
          </label>
          <label>
            <span>Area of interest</span>
            <select name="interest" defaultValue={initialInterest}>
              <option>Strategic partnership</option>
              <option>Investment and project finance</option>
              <option>Research and conservation</option>
              <option>Community or diaspora collaboration</option>
              <option>Education and programme sponsorship</option>
              <option>Responsible tourism and operations</option>
            </select>
          </label>
          <label>
            <span>What would you like to explore?</span>
            <textarea name="message" rows={5} required placeholder="Briefly describe your interest, relevant experience and the next conversation you need." />
          </label>
          <button className="button button--primary button--wide" type="submit">
            Generate private briefing note <FileText size={17} />
          </button>
        </form> : (
          <div className="partnership-draft" aria-live="polite">
            <div className="partnership-draft__heading">
              <div><span>YOUR BRIEFING NOTE</span><strong>Ready to copy</strong></div>
              <Check size={18} />
            </div>
            <textarea readOnly value={draft} aria-label="Generated partnership briefing note" />
            <p>Keep this note private until an authorised project contact channel is confirmed.</p>
            <div>
              <button className="button button--primary" type="button" onClick={copyDraft}>
                {copied ? 'Copied' : 'Copy briefing note'} <Copy size={16} />
              </button>
              <button className="button button--quiet" type="button" onClick={() => { setDraft(''); setCopied(false) }}>
                Edit details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

type InvestorBriefProps = {
  open: boolean
  onClose: () => void
  onEnquire: () => void
}

function InvestorBrief({ open, onClose, onEnquire }: InvestorBriefProps) {
  if (!open) return null

  return (
    <div className="modal-shell investor-shell" role="dialog" aria-modal="true" aria-labelledby="investor-brief-title">
      <button className="modal-backdrop" onClick={onClose} aria-label="Close investor brief" />
      <article className="modal modal--brief printable-brief">
        <div className="brief-toolbar no-print">
          <BrandMark compact />
          <div>
            <button className="button button--quiet" onClick={() => window.print()}>
              <Printer size={16} /> Print / save PDF
            </button>
            <button className="icon-button" onClick={onClose} aria-label="Close">
              <X size={19} />
            </button>
          </div>
        </div>
        <header className="brief-header">
          <p className="eyebrow">Investor & partner brief · planning edition</p>
          <h2 id="investor-brief-title">A protected heritage asset. A place-based development portfolio.</h2>
          <p>
            The Abetifi initiative is assembling a phased programme around conservation, interpretation, skills, enterprise and responsible access. Capital is matched to readiness—never used to bypass community mandate or site safeguards.
          </p>
        </header>
        <section className="brief-snapshot">
          <div><span>Place</span><strong>Abetifi, Kwahu, Ghana</strong></div>
          <div><span>Anchor</span><strong>Bosumpra Cave</strong></div>
          <div><span>Portfolio status</span><strong>Discovery to pre-feasibility</strong></div>
          <div><span>Lead proposition</span><strong>Conservation-led local value</strong></div>
        </section>
        <section>
          <div className="brief-section-title"><span>01</span><h3>Opportunity pipeline</h3></div>
          <div className="brief-projects">
            {projects.map((project) => (
              <div key={project.id}>
                <span>{project.stage}</span>
                <h4>{project.title}</h4>
                <p>{project.pathway}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="brief-section-title"><span>02</span><h3>Capital-readiness gates</h3></div>
          <ol className="brief-gates">
            {diligenceGates.map((gate) => (
              <li key={gate.step}><strong>{gate.title}</strong><span>{gate.detail}</span></li>
            ))}
          </ol>
        </section>
        <section className="brief-caution">
          <strong>What this brief is—and is not</strong>
          <p>
            This is a project-development overview, not a securities offer, investment recommendation or statement of approved public access. Budgets, ownership structures, operating rights and return terms follow feasibility, approvals and community agreement.
          </p>
        </section>
        <footer className="brief-footer">
          <div><strong>Next diligence step</strong><span>Choose a project and request its current evidence pack.</span></div>
          <button className="button button--primary no-print" onClick={onEnquire}>Request a briefing <ArrowRight size={17} /></button>
          <span className="print-only">Partnership intake: official organisation channel pending confirmation.</span>
        </footer>
      </article>
    </div>
  )
}

function App() {
  const [webglAvailable] = useState(() => {
    if (typeof document === 'undefined') return false
    try {
      const canvas = document.createElement('canvas')
      return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
      return false
    }
  })
  const [motionEnabled, setMotionEnabled] = useState(
    () => !(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches),
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [activeProject, setActiveProject] = useState(projects[0].id)
  const [activeStakeholder, setActiveStakeholder] = useState(stakeholderPaths[0].id)
  const [partnerOpen, setPartnerOpen] = useState(false)
  const [partnerInterest, setPartnerInterest] = useState('Strategic partnership')
  const [briefOpen, setBriefOpen] = useState(false)

  const selectedProject = projects.find((project) => project.id === activeProject) ?? projects[0]
  const selectedStakeholder = stakeholderPaths.find((path) => path.id === activeStakeholder) ?? stakeholderPaths[0]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 44)
    const targets = ['home', ...navItems.map((item) => item.target), 'governance', 'archive']
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { threshold: [0.18, 0.35, 0.55], rootMargin: '-14% 0px -62% 0px' },
    )

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    targets.forEach((target) => observer.observe(target))
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setPartnerOpen(false)
        setBriefOpen(false)
      }
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [])

  const openPartner = (interest = 'Strategic partnership') => {
    setPartnerInterest(interest)
    setBriefOpen(false)
    setPartnerOpen(true)
  }

  const navigate = (target: string) => {
    setMenuOpen(false)
    scrollToId(target)
  }

  return (
    <div className={`site-shell ${motionEnabled ? '' : 'is-motion-paused'}`}>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <BrandMark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.target}
              className={activeSection === item.target ? 'is-active' : ''}
              onClick={() => navigate(item.target)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="motion-toggle"
            onClick={() => setMotionEnabled((enabled) => !enabled)}
            aria-label={motionEnabled ? 'Pause background motion' : 'Play background motion'}
            aria-pressed={!motionEnabled}
          >
            {motionEnabled ? <Pause size={14} /> : <Play size={14} />}
            <span>{motionEnabled ? 'Pause motion' : 'Play motion'}</span>
          </button>
          <button className="button button--header" onClick={() => openPartner()}>
            Partner with us <ArrowRight size={16} />
          </button>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Open menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <nav aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <button key={item.target} onClick={() => navigate(item.target)}>
                <span>0{index + 1}</span>{item.label}<ArrowRight size={20} />
              </button>
            ))}
          </nav>
          <button className="button button--primary" onClick={() => openPartner()}>Partner with us</button>
        </div>
      )}

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          {webglAvailable ? (
            <SceneBoundary>
              <Suspense fallback={<SceneFallback />}>
                <HeritageScene motionEnabled={motionEnabled} />
              </Suspense>
            </SceneBoundary>
          ) : <SceneFallback />}
          <div className="hero__grain" aria-hidden="true" />
          <div className="hero__content page-grid">
            <div className="hero__eyebrow">
              <span className="live-dot" />
              Community-led heritage and development
              <span className="hero__place"><MapPin size={14} /> Abetifi · Kwahu · Ghana</span>
            </div>
            <div className="hero__copy">
              <p className="hero__kicker">BOSUMPRA CAVE / A LIVING ARCHIVE</p>
              <h1 id="hero-title">
                <span>Protect the story.</span>
                <em>Grow the future.</em>
              </h1>
              <p className="hero__lede">
                A community-led platform turning Abetifi’s archaeological inheritance into a model for conservation, learning, enterprise and responsible partnership.
              </p>
              <div className="hero__actions">
                <button className="button button--primary" onClick={() => scrollToId('story')}>
                  Enter the story <ArrowDown size={17} />
                </button>
                <button className="button button--glass" onClick={() => setBriefOpen(true)}>
                  View investor brief <FileText size={17} />
                </button>
              </div>
            </div>
            <aside className="hero__facts" aria-label="Facts from the 1944 excavation report">
              <p>FROM THE HISTORICAL RECORD</p>
              {sourceFacts.map((fact) => (
                <div key={fact.value}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </div>
              ))}
              <small>Shaw, 1944 · historical figures, not a current site assessment</small>
            </aside>
            <button className="hero__scroll" onClick={() => scrollToId('story')} aria-label="Continue to the story">
              <span>SCROLL TO ENTER</span>
              <i><ArrowDown size={18} /></i>
            </button>
          </div>
          <div className="hero__bottom-line"><span>LANDSCAPE</span><span>EVIDENCE</span><span>COMMUNITY</span><span>FUTURE</span></div>
        </section>

        <section className="story-section section" id="story" aria-labelledby="story-title">
          <div className="section-number" aria-hidden="true">01 / ORIGIN</div>
          <div className="story-intro page-grid">
            <Reveal className="story-intro__label">
              <p className="eyebrow">A place before a project</p>
            </Reveal>
            <Reveal className="story-intro__copy" delay={90}>
              <h2 id="story-title">A deep record, carried by a living community.</h2>
              <p>
                Bosumpra is not an isolated attraction. It sits within Abetifi’s landscape, memory and future. Development starts by understanding that relationship—and protecting it.
              </p>
            </Reveal>
          </div>
          <div className="story-layers page-grid">
            {storyLayers.map((layer, index) => (
              <Reveal className="story-layer" key={layer.index} delay={index * 90}>
                <div className="story-layer__meta"><span>{layer.index}</span><p>{layer.label}</p></div>
                <div className="story-layer__content">
                  <h3>{layer.title}</h3>
                  <p>{layer.body}</p>
                  <small>{layer.detail}</small>
                </div>
                <div className="story-layer__mark" aria-hidden="true"><span /><span /><span /></div>
              </Reveal>
            ))}
          </div>
          <div className="evidence-strip page-grid">
            <Reveal className="evidence-strip__quote">
              <span>THE CENTRAL IDEA</span>
              <blockquote>“The site is not the product. The relationship between heritage, people and place is.”</blockquote>
            </Reveal>
            <Reveal className="evidence-strip__note" delay={100}>
              <Sparkles size={20} />
              <p><strong>Interpretation rule</strong> Historical findings are clearly separated from current proposals and future ambitions.</p>
            </Reveal>
          </div>
          <div className="evidence-timeline page-grid" aria-label="Bosumpra evidence and development timeline">
            <Reveal className="evidence-timeline__intro">
              <p className="eyebrow">Evidence through time</p>
              <h3>12,500 years of periodic use. Eighty years of research. A new development chapter.</h3>
              <p>The chronology combines the supplied 1944 report with later archaeological research and recorded public milestones.</p>
            </Reveal>
            <div className="evidence-timeline__rail">
              {evidenceTimeline.map((item, index) => (
                <Reveal className="timeline-event" key={item.date} delay={index * 65}>
                  <div className="timeline-event__dot" aria-hidden="true"><span /></div>
                  <time>{item.date}</time>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                  <small>{item.source}</small>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="priority-section section" id="priorities" aria-labelledby="priority-title">
          <div className="section-number" aria-hidden="true">02 / PRIORITIES</div>
          <div className="section-heading page-grid">
            <Reveal>
              <p className="eyebrow">The development compact</p>
              <h2 id="priority-title">Three commitments. One standard.</h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="section-heading__lede">Every project must strengthen all three. If it protects the cave but excludes the community—or creates income while weakening the site—it does not proceed.</p>
            </Reveal>
          </div>
          <div className="priority-grid page-grid">
            {priorities.map((priority, index) => {
              const Icon = priority.icon
              return (
                <Reveal className="priority-card" key={priority.title} delay={index * 90}>
                  <div className="priority-card__top"><span>{priority.number}</span><Icon size={23} /></div>
                  <h3>{priority.title}</h3>
                  <p>{priority.description}</p>
                  <ul>{priority.signals.map((signal) => <li key={signal}><Check size={14} />{signal}</li>)}</ul>
                </Reveal>
              )
            })}
          </div>
        </section>

        <section className="portfolio-section section" id="portfolio" aria-labelledby="portfolio-title">
          <div className="section-number" aria-hidden="true">03 / PROJECTS</div>
          <div className="section-heading page-grid">
            <Reveal>
              <p className="eyebrow">Development portfolio</p>
              <h2 id="portfolio-title">From evidence to delivery.</h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="section-heading__lede">Five coordinated workstreams create a route from protection to public value. Stages indicate current development maturity—not approval or guaranteed funding.</p>
            </Reveal>
          </div>
          <div className="project-explorer page-grid">
            <div className="project-list" role="tablist" aria-label="Development projects">
              {projects.map((project) => {
                const Icon = project.icon
                const selected = activeProject === project.id
                return (
                  <button
                    key={project.id}
                    role="tab"
                    aria-selected={selected}
                    className={selected ? 'is-active' : ''}
                    onClick={() => setActiveProject(project.id)}
                  >
                    <span className="project-list__number">{project.number}</span>
                    <span className="project-list__icon"><Icon size={19} /></span>
                    <span className="project-list__name">{project.title}</span>
                    <ChevronRight size={18} />
                  </button>
                )
              })}
            </div>
            <article className="project-detail" role="tabpanel" key={selectedProject.id} style={{ '--project-accent': selectedProject.accent } as React.CSSProperties}>
              <div className="project-detail__glow" aria-hidden="true" />
              <div className="project-detail__meta">
                <span>{selectedProject.stage}</span><span>{selectedProject.horizon}</span>
              </div>
              <p className="eyebrow">PROJECT {selectedProject.number}</p>
              <h3>{selectedProject.title}</h3>
              <p className="project-detail__summary">{selectedProject.summary}</p>
              <div className="project-detail__route">
                <span>PARTNERSHIP PATHWAY</span>
                <strong>{selectedProject.pathway}</strong>
              </div>
              <ul>
                {selectedProject.outcomes.map((outcome) => <li key={outcome}><Check size={15} />{outcome}</li>)}
              </ul>
              <button className="button button--line" onClick={() => openPartner(selectedProject.title)}>
                Discuss this project <ArrowRight size={17} />
              </button>
            </article>
          </div>
        </section>

        <section className="stakeholder-section section" id="stakeholders" aria-labelledby="stakeholder-title">
          <div className="section-number" aria-hidden="true">04 / STAKEHOLDERS</div>
          <div className="section-heading page-grid">
            <Reveal>
              <p className="eyebrow">A platform for every role</p>
              <h2 id="stakeholder-title">Find your way into the work.</h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="section-heading__lede">Different stakeholders need different evidence, responsibilities and decisions. Choose a pathway to see where your participation begins.</p>
            </Reveal>
          </div>
          <div className="stakeholder-panel page-grid">
            <div className="stakeholder-tabs" role="tablist" aria-label="Stakeholder pathways">
              {stakeholderPaths.map((path) => {
                const Icon = path.icon
                return (
                  <button key={path.id} role="tab" aria-selected={activeStakeholder === path.id} className={activeStakeholder === path.id ? 'is-active' : ''} onClick={() => setActiveStakeholder(path.id)}>
                    <Icon size={18} /><span>{path.label}</span>
                  </button>
                )
              })}
            </div>
            <article className="stakeholder-detail" role="tabpanel" key={selectedStakeholder.id}>
              <div className="stakeholder-detail__icon"><selectedStakeholder.icon size={30} /></div>
              <p className="eyebrow">{selectedStakeholder.eyebrow}</p>
              <h3>{selectedStakeholder.title}</h3>
              <p>{selectedStakeholder.description}</p>
              <ol>
                {selectedStakeholder.actions.map((action, index) => <li key={action}><span>0{index + 1}</span>{action}</li>)}
              </ol>
              <button className="button button--line" onClick={() => selectedStakeholder.target === 'investment' ? scrollToId('investment') : openPartner(selectedStakeholder.label)}>
                {selectedStakeholder.cta} <ArrowRight size={17} />
              </button>
            </article>
            <aside className="stakeholder-promise">
              <span>THE SHARED PROMISE</span>
              <p>Participation is meaningful only when it can change a decision.</p>
              <div className="promise-ring" aria-hidden="true"><span>LOCAL</span><span>OPEN</span><span>LASTING</span></div>
            </aside>
          </div>
        </section>

        <section className="investment-section section" id="investment" aria-labelledby="investment-title">
          <div className="investment-backdrop" aria-hidden="true"><span /><span /><span /></div>
          <div className="section-number" aria-hidden="true">05 / INVESTMENT</div>
          <div className="investment-hero page-grid">
            <Reveal>
              <p className="eyebrow">Investor & partner room</p>
              <h2 id="investment-title">Capital follows readiness. Readiness follows trust.</h2>
            </Reveal>
            <Reveal delay={100}>
              <p>
                This is not a race to monetise a cave. It is a disciplined route to finance the systems that protect heritage, create local capability and sustain responsible economic value.
              </p>
              <div className="investment-actions">
                <button className="button button--light" onClick={() => setBriefOpen(true)}>Open investor brief <FileText size={17} /></button>
                <button className="button button--outline-light" onClick={() => openPartner('Investment and project finance')}>Request diligence call <ArrowRight size={17} /></button>
              </div>
            </Reveal>
          </div>
          <div className="opportunity-matrix page-grid">
            <Reveal className="asset-baseline">
              <div className="asset-baseline__status"><span className="live-dot" /> PUBLICLY LAUNCHED INITIATIVE · 2023</div>
              <div className="asset-baseline__copy">
                <div>
                  <p className="eyebrow">The starting asset</p>
                  <h3>An established public story—now requiring investor-grade verification.</h3>
                </div>
                <p>Public and tourism sources record the launch of Abetifi Stone Age Park in April 2023. Before expansion capital, the programme will verify land and operating rights, licences, collections custody, capital already deployed and current performance.</p>
              </div>
              <div className="asset-baseline__checks">
                {['Title and operator', 'Heritage and tourism approvals', 'Audited capex and operations', 'Community benefit terms'].map((item) => <span key={item}><Check size={14} />{item}</span>)}
              </div>
            </Reveal>
            <Reveal className="matrix-card">
              <div className="matrix-card__heading"><span>CAPITAL PATHWAYS</span><p>Match the instrument to the work—not the other way round.</p></div>
              <div className="matrix-table" role="table" aria-label="Capital pathway matrix">
                <div className="matrix-row matrix-row--head" role="row"><span>Pathway</span><span>Best suited to</span><span>Value character</span><span>Entry gate</span></div>
                {opportunityRows.map((row) => (
                  <div className="matrix-row" role="row" key={row.pathway}>
                    <strong>{row.pathway}</strong><span>{row.bestFor}</span><span>{row.value}</span><span>{row.gate}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="diligence page-grid">
            <Reveal className="diligence__intro">
              <p className="eyebrow">The readiness sequence</p>
              <h3>Four gates before scale.</h3>
              <p>Each stage reduces a different class of risk: social, technical, commercial and performance.</p>
            </Reveal>
            <div className="diligence__steps">
              {diligenceGates.map((gate, index) => (
                <Reveal className="diligence-step" key={gate.step} delay={index * 80}>
                  <span>{gate.step}</span><h4>{gate.title}</h4><p>{gate.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="investment-disclaimer page-grid">
            <p><strong>Planning-stage disclosure:</strong> The opportunities shown are development concepts. No return, public approval, operating right, capital requirement or funding commitment is represented as final.</p>
          </div>
        </section>

        <section className="governance-section section" id="governance" aria-labelledby="governance-title">
          <div className="section-number" aria-hidden="true">06 / GOVERNANCE</div>
          <div className="section-heading page-grid">
            <Reveal>
              <p className="eyebrow">The community compact</p>
              <h2 id="governance-title">Safeguards are part of the architecture.</h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="section-heading__lede">Governance will be formalised with legitimate local and institutional partners. These principles define the minimum standard for that work.</p>
            </Reveal>
          </div>
          <div className="governance-grid page-grid" id="community-compact">
            {governancePrinciples.map((principle, index) => {
              const Icon = principle.icon
              return (
                <Reveal className="governance-card" key={principle.title} delay={index * 80}>
                  <span>0{index + 1}</span><Icon size={22} /><h3>{principle.title}</h3><p>{principle.text}</p>
                </Reveal>
              )
            })}
          </div>
          <Reveal className="reporting-preview page-grid">
            <div className="reporting-preview__title">
              <p className="eyebrow">Future public reporting</p>
              <h3>One view of promises, money, work and outcomes.</h3>
            </div>
            <div className="reporting-preview__items">
              {['Funding and uses', 'Conservation condition', 'Local jobs and procurement', 'Project gates and decisions'].map((item, index) => (
                <div key={item}><span>0{index + 1}</span><strong>{item}</strong><small>Reporting framework in development</small></div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="archive-section section" id="archive" aria-labelledby="archive-title">
          <div className="section-number" aria-hidden="true">07 / KNOWLEDGE</div>
          <div className="archive-layout page-grid">
            <Reveal className="archive-visual">
              <div className="archive-visual__rings" aria-hidden="true"><span /><span /><span /><span /></div>
              <div className="archive-visual__stone" aria-hidden="true"><i /><i /><i /></div>
              <div className="archive-visual__label"><span>RECORD 001</span><strong>THE BOSUMPRA REPORT</strong><small>Historical source · 1944</small></div>
            </Reveal>
            <Reveal className="archive-copy" delay={100}>
              <p className="eyebrow">Archive foundation</p>
              <h2 id="archive-title">Begin with the record. Then ask better questions.</h2>
              <p>{archiveRecord.note}</p>
              <blockquote>
                <strong>{archiveRecord.citation}</strong>
                <span>{archiveRecord.publication}</span>
              </blockquote>
              <div className="archive-actions">
                <a className="button button--line" href="https://www.cambridge.org/core/journals/proceedings-of-the-prehistoric-society/article/report-on-excavations-carried-out-in-the-cave-known-as-bosumpra-at-abetifi-kwahu-gold-coast-colony/A8B6F7CB77F806DEED1A5CA7BE5D92E9" target="_blank" rel="noreferrer">
                  View publication record <ExternalLink size={16} />
                </a>
                <button className="text-link" onClick={() => openPartner('Research and conservation')}>Propose a research collaboration <ArrowRight size={16} /></button>
              </div>
            </Reveal>
          </div>
          <div className="research-trail page-grid">
            <div className="research-trail__heading">
              <span>RESEARCH TRAIL</span>
              <p>Selected records behind the chronology and current platform story.</p>
            </div>
            <div className="research-trail__grid">
              {researchSources.map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" key={source.title}>
                  <div><span>{source.year}</span><small>{source.type}</small></div>
                  <h3>{source.title}</h3>
                  <p>{source.author}</p>
                  <ExternalLink size={15} />
                </a>
              ))}
            </div>
          </div>
          <div className="visit-note page-grid" id="visit">
            <MapPin size={21} />
            <div><strong>Planning a visit?</strong><span>Bosumpra is a sensitive heritage place. Current access, route conditions and local permissions should be confirmed before travel.</span></div>
            <button className="button button--quiet" onClick={() => openPartner('Responsible tourism and operations')}>Ask the project team</button>
          </div>
        </section>

        <section className="closing-section section" id="partner" aria-labelledby="closing-title">
          <div className="closing-grid page-grid">
            <Reveal className="closing-copy">
              <p className="eyebrow">The next layer is ours to make</p>
              <h2 id="closing-title">Help build a future worthy of the evidence beneath it.</h2>
              <p>Bring technical depth, patient capital, institutional reach or lived knowledge. The right contribution begins with listening.</p>
              <div>
                <button className="button button--primary" onClick={() => openPartner()}>Start a partnership <ArrowRight size={17} /></button>
                <button className="button button--glass" onClick={() => setBriefOpen(true)}>Review the brief</button>
              </div>
            </Reveal>
            <div className="closing-orbit" aria-hidden="true"><span /><span /><span /><i>ABETIFI</i></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-grid footer-grid">
          <div><BrandMark /><p>Community-led heritage, learning and development in Abetifi, Kwahu.</p></div>
          <div><span>EXPLORE</span>{navItems.map((item) => <button key={item.target} onClick={() => scrollToId(item.target)}>{item.label}</button>)}</div>
          <div><span>CONNECT</span><button onClick={() => openPartner()}>Build a partnership note</button><button onClick={() => setBriefOpen(true)}>Investor brief</button><p className="footer-contact-note">Official organisation contact channel pending confirmation.</p></div>
          <div><span>INTEGRITY</span><p>Historical facts are sourced. Proposals are labelled. Access and investment terms require confirmation.</p></div>
        </div>
        <div className="footer-bottom page-grid"><span>© {new Date().getFullYear()} Abetifi Stone Age Community Development</span><span>Protect the story · Grow the future</span></div>
      </footer>

      <PartnerModal open={partnerOpen} onClose={() => setPartnerOpen(false)} initialInterest={partnerInterest} />
      <InvestorBrief open={briefOpen} onClose={() => setBriefOpen(false)} onEnquire={() => openPartner('Investment and project finance')} />
    </div>
  )
}

export default App
