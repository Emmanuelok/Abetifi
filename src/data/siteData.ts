import {
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  GraduationCap,
  HandHeart,
  Landmark,
  Leaf,
  MapPinned,
  Microscope,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'

export type DevelopmentProject = {
  id: string
  number: string
  title: string
  summary: string
  stage: 'Discovery' | 'Pre-feasibility' | 'Programme design'
  horizon: string
  pathway: string
  outcomes: string[]
  icon: LucideIcon
  accent: string
}

export type StakeholderPath = {
  id: string
  label: string
  eyebrow: string
  title: string
  description: string
  actions: string[]
  cta: string
  target: string
  icon: LucideIcon
}

export const navItems = [
  { label: 'The story', target: 'story' },
  { label: 'Priorities', target: 'priorities' },
  { label: 'Projects', target: 'portfolio' },
  { label: 'Stakeholders', target: 'stakeholders' },
  { label: 'Investment', target: 'investment' },
]

export const sourceFacts = [
  { value: '1943', label: 'documented excavation began' },
  { value: '≈20k', label: 'quartz artifacts recorded' },
  { value: '1,800 ft', label: 'reported elevation' },
]

export const storyLayers = [
  {
    index: '01',
    label: 'The landscape',
    title: 'A sandstone shelter on Abetifi’s eastern slope',
    body: 'The 1944 field report describes Bosumpra as one of a line of caves and rock shelters in Voltaian sandstone, facing east above the surrounding landscape.',
    detail: 'The report recorded a shelter roughly 60 feet across, with a central depth of about 27 feet from back wall to drip line.',
  },
  {
    index: '02',
    label: 'The evidence',
    title: 'Layers of technology, craft and everyday life',
    body: 'Excavation in August and October 1943 documented pottery, ground-stone tools, ironworking evidence and a dense microlithic quartz industry in distinct layers.',
    detail: 'Nearly 20,000 quartz flakes, implements and cores were recorded from approximately 250 cubic feet of excavated cave earth.',
  },
  {
    index: '03',
    label: 'The responsibility',
    title: 'Heritage that must be re-read with the community',
    body: 'The original publication is an important historical record—not a complete modern assessment. Conservation, access and interpretation now require current research and local custodianship.',
    detail: 'The platform separates documented findings from proposals, and places consent, care and community benefit before visitor growth.',
  },
]

export const evidenceTimeline = [
  {
    date: 'c. 12,500 years ago',
    title: 'Earliest dated activity',
    text: 'Later excavations place the earliest known activity in the mid-eleventh millennium cal BC. This describes periodic use—not proven continuous residence.',
    source: 'Watson, 2017',
  },
  {
    date: '1943–1944',
    title: 'Excavation and first report',
    text: 'Thurstan Shaw carried out two short field campaigns in 1943 and published the first analytical account in 1944.',
    source: 'Shaw, 1944',
  },
  {
    date: '1973–1974',
    title: 'Radiocarbon chronology',
    text: 'Andrew Smith re-excavated the shelter, seeking charcoal and building the first radiocarbon chronology for the sequence.',
    source: 'Smith, 1975',
  },
  {
    date: '2008–2011',
    title: 'A modern reassessment',
    text: 'The Forest Occupations of Ghana Project returned to Bosumpra and connected the shelter to wider landscape and plant-use research.',
    source: 'Oas et al., 2015 · Watson, 2017',
  },
  {
    date: '8 April 2023',
    title: 'Stone Age Park public launch',
    text: 'National media and tourism sources record the launch of Abetifi Stone Age Park as a heritage, museum and ecotourism initiative.',
    source: 'Daily Graphic · Ghana Tourism Authority',
  },
  {
    date: 'The next chapter',
    title: 'Verification before scale',
    text: 'A modern conservation baseline, rights and title review, operating model, community compact and audited project data form the next investor-ready layer.',
    source: 'Development agenda',
  },
]

export const priorities = [
  {
    number: 'I',
    title: 'Protect',
    description: 'Safeguard the cave, its landscape, archaeological evidence and cultural meaning through professional conservation and community protocols.',
    icon: ShieldCheck,
    signals: ['Condition baseline', 'Conservation plan', 'Custodian protocols'],
  },
  {
    number: 'II',
    title: 'Interpret',
    description: 'Turn a specialist record into a living public story through research, digital reconstruction, local knowledge and education.',
    icon: BookOpenText,
    signals: ['Research partnerships', 'Digital archive', 'Schools programme'],
  },
  {
    number: 'III',
    title: 'Prosper',
    description: 'Build locally owned livelihoods around responsible heritage—without trading conservation or community identity for volume.',
    icon: Leaf,
    signals: ['Youth pathways', 'Local enterprise', 'Responsible visits'],
  },
]

export const projects: DevelopmentProject[] = [
  {
    id: 'conservation',
    number: '01',
    title: 'Bosumpra Conservation & Research Programme',
    summary: 'A professional baseline for the site: documentation, condition mapping, archaeological reassessment, risk controls and a long-term conservation framework.',
    stage: 'Discovery',
    horizon: 'Foundational',
    pathway: 'Research funding · technical assistance · heritage grants',
    outcomes: ['Site condition record', 'Community-endorsed access protocol', 'Research and conservation roadmap'],
    icon: Microscope,
    accent: '#c8915a',
  },
  {
    id: 'interpretation',
    number: '02',
    title: 'Heritage Interpretation & Learning Centre',
    summary: 'A low-impact gateway in Abetifi for exhibitions, digital archaeology, school visits, orientation and community-curated storytelling.',
    stage: 'Pre-feasibility',
    horizon: 'Near-term',
    pathway: 'Catalytic capital · programme sponsorship · operating partner',
    outcomes: ['Year-round learning space', 'Protected visitor orientation', 'Local curation and guide base'],
    icon: Landmark,
    accent: '#d9b779',
  },
  {
    id: 'enterprise',
    number: '03',
    title: 'Heritage Skills & Enterprise Lab',
    summary: 'Training and venture support for guides, conservators, researchers, storytellers, makers, hospitality providers and digital creators.',
    stage: 'Programme design',
    horizon: 'Near-term',
    pathway: 'CSR · workforce partnership · donor programme',
    outcomes: ['Youth apprenticeships', 'Micro-enterprise pipeline', 'Local procurement standards'],
    icon: GraduationCap,
    accent: '#87a47c',
  },
  {
    id: 'landscape',
    number: '04',
    title: 'Community Landscape & Trail Network',
    summary: 'A responsible access system joining heritage, ecology and town life through wayfinding, interpretation, safety measures and visitor-capacity controls.',
    stage: 'Discovery',
    horizon: 'Phased',
    pathway: 'Public infrastructure · conservation finance · tourism partnership',
    outcomes: ['Managed access', 'Landscape restoration', 'Distributed local spending'],
    icon: MapPinned,
    accent: '#6c8b74',
  },
  {
    id: 'archive',
    number: '05',
    title: 'Bosumpra Open Knowledge Archive',
    summary: 'A rights-aware digital home for research records, oral histories, object stories, learning materials and future fieldwork outputs.',
    stage: 'Programme design',
    horizon: 'Continuous',
    pathway: 'Academic consortium · digitisation partner · cultural grant',
    outcomes: ['Evidence catalogue', 'Local knowledge permissions', 'Researcher and educator access'],
    icon: BookOpenText,
    accent: '#8aa6a1',
  },
]

export const stakeholderPaths: StakeholderPath[] = [
  {
    id: 'community',
    label: 'Community',
    eyebrow: 'Residents · traditional leadership · local groups',
    title: 'Shape what is protected, shared and built.',
    description: 'Community knowledge, consent and benefit are programme requirements—not consultation at the end. Local voices inform interpretation, access, jobs and safeguards.',
    actions: ['Join a listening session', 'Propose a community priority', 'Register a local service or skill'],
    cta: 'Open the community pathway',
    target: 'community-compact',
    icon: UsersRound,
  },
  {
    id: 'investors',
    label: 'Investors',
    eyebrow: 'Impact capital · operators · sponsors',
    title: 'Back investable work with a protected social licence.',
    description: 'See the opportunity pipeline, delivery gates, return pathways, risk controls and evidence required before capital is accepted.',
    actions: ['Review the opportunity matrix', 'Select a partnership pathway', 'Request the diligence brief'],
    cta: 'Enter the investor room',
    target: 'investment',
    icon: CircleDollarSign,
  },
  {
    id: 'government',
    label: 'Government',
    eyebrow: 'Local · regional · national institutions',
    title: 'Coordinate protection, infrastructure and public value.',
    description: 'A shared delivery frame can align heritage protection, planning, education, public works, tourism, youth development and monitoring.',
    actions: ['Map mandates and approvals', 'Align public investments', 'Nominate a coordination lead'],
    cta: 'View the delivery framework',
    target: 'governance',
    icon: Building2,
  },
  {
    id: 'research',
    label: 'Research',
    eyebrow: 'Archaeologists · universities · museums',
    title: 'Reassess the archive with modern methods and local knowledge.',
    description: 'The programme welcomes ethical, transparent collaboration across archaeology, conservation, geology, heritage science and digital humanities.',
    actions: ['Propose a research question', 'Share a relevant record', 'Join a methods consortium'],
    cta: 'Explore the knowledge agenda',
    target: 'archive',
    icon: Microscope,
  },
  {
    id: 'diaspora',
    label: 'Diaspora',
    eyebrow: 'Kwahu networks · global Ghanaians · friends of Abetifi',
    title: 'Connect expertise and patient support to a shared legacy.',
    description: 'Contribute specialist knowledge, introductions, mentorship and accountable funding to projects selected with the community.',
    actions: ['Offer expertise', 'Sponsor a learning cohort', 'Convene a partner circle'],
    cta: 'Join the partner network',
    target: 'partner',
    icon: HandHeart,
  },
  {
    id: 'visitors',
    label: 'Visitors',
    eyebrow: 'Learners · schools · responsible travellers',
    title: 'Come to learn—within the limits of the place.',
    description: 'Visitor information will follow conservation assessment and local approval. Current access should be confirmed with custodians before travel.',
    actions: ['Read the site story', 'Plan a learning visit', 'Respect the visitor code'],
    cta: 'Read the responsible visit note',
    target: 'visit',
    icon: MapPinned,
  },
]

export const opportunityRows = [
  {
    pathway: 'Catalytic grants',
    bestFor: 'Conservation, research, planning and community capacity',
    value: 'Evidence, readiness and public benefit',
    gate: 'Community mandate + technical scope',
  },
  {
    pathway: 'Programme sponsorship',
    bestFor: 'Learning, apprenticeships, archive and interpretation',
    value: 'Visible, measurable social outcomes',
    gate: 'Safeguards + outcome framework',
  },
  {
    pathway: 'Blended finance',
    bestFor: 'Visitor infrastructure and local enterprise facilities',
    value: 'Patient repayment + place-based impact',
    gate: 'Feasibility + demand + operating model',
  },
  {
    pathway: 'Operating partnership',
    bestFor: 'Hospitality, experiences, mobility and services',
    value: 'Earned income under community standards',
    gate: 'Concession terms + local-benefit covenant',
  },
]

export const diligenceGates = [
  {
    step: '01',
    title: 'Mandate',
    detail: 'Local custodians and affected groups define the non-negotiables and benefit conditions.',
  },
  {
    step: '02',
    title: 'Evidence',
    detail: 'Conservation, demand, delivery and financial assumptions are independently tested.',
  },
  {
    step: '03',
    title: 'Structure',
    detail: 'Roles, capital, ownership, procurement and risk allocation are made explicit.',
  },
  {
    step: '04',
    title: 'Measure',
    detail: 'Cultural, environmental, community and financial performance are reported together.',
  },
]

export const governancePrinciples = [
  {
    title: 'Community consent',
    text: 'Material decisions require documented participation by legitimate local custodians and affected groups.',
    icon: UsersRound,
  },
  {
    title: 'Conservation first',
    text: 'Access and commercial activity stay within limits established by current professional assessment.',
    icon: ShieldCheck,
  },
  {
    title: 'Local value',
    text: 'Jobs, procurement, enterprise and learning opportunities are intentionally retained in the local economy.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Open accountability',
    text: 'Commitments, funding uses, progress, risks and outcomes are reported in forms stakeholders can understand.',
    icon: HandHeart,
  },
]

export const archiveRecord = {
  citation: 'Shaw, C. T. (1944). Report on excavations carried out in the cave known as “Bosumpra” at Abetifi, Kwahu, Gold Coast Colony.',
  publication: 'Proceedings of the Prehistoric Society, 10, 1–67.',
  note: 'The supplied report is the principal historical source for facts presented on this platform. Its terminology, excavation methods and interpretations reflect its period and should be revisited through contemporary research and local knowledge.',
}

export const researchSources = [
  {
    year: '1975',
    title: 'Radiocarbon Dates from Bosumpra Cave',
    author: 'Andrew B. Smith',
    type: 'Chronology',
    url: 'https://www.cambridge.org/core/journals/proceedings-of-the-prehistoric-society/article/radiocarbon-dates-from-bosumpra-cave-abetifi-ghana/F51C7BBA5FEC764EE2266753E32C4303',
  },
  {
    year: '2015',
    title: '10,000 year history of plant use at Bosumpra Cave',
    author: 'Oas, D’Andrea & Watson',
    type: 'Archaeobotany',
    url: 'https://ugspace.ug.edu.gh/items/59c58768-9498-41a0-8563-c819ee4e8ab3',
  },
  {
    year: '2017',
    title: 'Bosumpra revisited: 12,500 years on the Kwahu Plateau',
    author: 'Derek J. Watson',
    type: 'Modern synthesis',
    url: 'https://doi.org/10.1080/0067270X.2017.1393925',
  },
  {
    year: '2023',
    title: 'Abetifi Stone Age Park public launch',
    author: 'Daily Graphic',
    type: 'Current milestone',
    url: 'https://www.graphic.com.gh/news/general-news/president-launches-stone-age-park-at-abetifi.html',
  },
]
