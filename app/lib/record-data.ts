export type EvidenceStatus =
  | "Published finding"
  | "Interpretation"
  | "Documented history"
  | "Open question";

export type EvidenceRecord = {
  id: string;
  period: string;
  title: string;
  summary: string;
  domain: "Chronology" | "Technology" | "Foodways" | "Mobility" | "Research" | "Living heritage";
  status: EvidenceStatus;
  sources: string[];
  caution: string;
};

export const evidenceSources = [
  {
    id: "shaw1944",
    year: "1944",
    author: "C. T. Shaw",
    title: "Report on Excavations carried out in the Cave known as ‘Bosumpra’ at Abetifi, Kwahu, Gold Coast Colony",
    kind: "Published excavation report",
    href: "https://doi.org/10.1017/S0079497X00020016",
    contribution: "The foundational excavation record and description of the site sequence.",
    scope: "Bosumpra-specific scholarly evidence.",
    checked: "Bibliographic record checked 7 August 2026",
  },
  {
    id: "smith1975",
    year: "1975",
    author: "A. B. Smith",
    title: "Radiocarbon Dates from Bosumpra Cave, Abetifi, Ghana",
    kind: "Published radiocarbon note",
    href: "https://doi.org/10.1017/S0079497X00010975",
    contribution: "The first radiocarbon framework for Bosumpra.",
    scope: "Bosumpra-specific scholarly evidence.",
    checked: "Bibliographic record checked 7 August 2026",
  },
  {
    id: "oas2015",
    year: "2015",
    author: "S. E. Oas, A. C. D’Andrea & D. J. Watson",
    title: "10,000 year history of plant use at Bosumpra Cave, Ghana",
    kind: "Published archaeobotanical study",
    href: "https://doi.org/10.1007/s00334-015-0514-2",
    contribution: "Long-term plant-use evidence, including incense-tree fruit, oil palm and trace domesticates.",
    scope: "Bosumpra-specific scholarly evidence.",
    checked: "Bibliographic record checked 7 August 2026",
  },
  {
    id: "watson2017",
    year: "2017",
    author: "D. J. Watson",
    title: "Bosumpra revisited: 12,500 years on the Kwahu Plateau, Ghana, as viewed from ‘On top of the hill’",
    kind: "Published site synthesis",
    href: "https://doi.org/10.1080/0067270X.2017.1393925",
    contribution: "A modern synthesis of chronology, stratigraphy, technology and site meaning.",
    scope: "Bosumpra-specific scholarly evidence.",
    checked: "Bibliographic record checked 7 August 2026",
  },
  {
    id: "gmmb",
    year: "Accessed 2026",
    author: "Ghana Museums and Monuments Board",
    title: "Legal and administrative framework",
    kind: "National heritage authority",
    href: "https://gmmb.gov.gh/about-us/",
    contribution: "GMMB’s official page identifies the Board as Ghana’s legal custodian of movable and immovable material cultural heritage.",
    scope: "Official institutional self-description; not evidence of this project’s status, permission or partnership.",
    checked: "Page checked 7 August 2026",
  },
  {
    id: "icomos2022",
    year: "2022",
    author: "ICOMOS",
    title: "International Charter for Cultural Heritage Tourism",
    kind: "International professional charter",
    href: "https://openarchive.icomos.org/id/eprint/2806/",
    contribution: "Principles for community participation, heritage protection and responsible tourism management.",
    scope: "General professional guidance; not evidence of project endorsement, compliance or approval.",
    checked: "Record checked 7 August 2026",
  },
  {
    id: "iccrom",
    year: "Accessed 2026",
    author: "ICCROM",
    title: "People-Centred Approaches to Conservation",
    kind: "International conservation guidance",
    href: "https://www.iccrom.org/section/people-and-heritage/people-centred-approaches",
    contribution: "Positions people most closely connected to heritage at the core of conservation and management.",
    scope: "General conservation guidance; not evidence of project endorsement, compliance or approval.",
    checked: "Page checked 7 August 2026",
  },
  {
    id: "unesco2030",
    year: "2019",
    author: "UNESCO",
    title: "Culture|2030 Indicators",
    kind: "Sustainable-development measurement framework",
    href: "https://whc.unesco.org/en/culture2030indicators",
    contribution: "A 22-indicator framework for making culture’s contribution to sustainable development measurable.",
    scope: "General measurement guidance; not a UNESCO designation, endorsement or project assessment.",
    checked: "Page checked 7 August 2026",
  },
] as const;

export const proposalSources = [
  {
    id: "PROP-MAN-01",
    title: "Supplied project manuscript",
    sourceClass: "Supplied proposal material",
    version: "Document version, date and checksum not verified",
    locator: "Locator not yet verified",
    limitation: "Describes project intentions and narrative claims; it is not evidence of approval, funding, legal status or present delivery status.",
  },
  {
    id: "PROP-ARC-01",
    title: "Supplied 14-sheet architectural concept set",
    sourceClass: "Supplied proposal material",
    version: "Set dated March 2026; revision and checksum not verified",
    locator: "Claim-level sheet locator not yet verified",
    limitation: "Documents a concept package only; it is not an approved, coordinated or construction-ready design.",
  },
  {
    id: "PROP-BOQ-01",
    title: "Supplied preliminary BOQ summary",
    sourceClass: "Supplied proposal material",
    version: "Price-base date, issue status, authorship and checksum not verified",
    locator: "Claim-level page or line locator not yet verified",
    limitation: "Provides transcribed preliminary values only; it is not a final cost plan, funding target, valuation or evidence of secured funds.",
  },
] as const;

export const evidenceRecords: EvidenceRecord[] = [
  {
    id: "date-earliest",
    period: "10,439–9,825 cal BC",
    title: "Earliest published AMS determination",
    summary: "A calibrated AMS determination places human activity at Bosumpra in the mid-11th millennium BC.",
    domain: "Chronology",
    status: "Published finding",
    sources: ["watson2017"],
    caution: "A dated context records activity; it does not prove uninterrupted occupation.",
  },
  {
    id: "early-ceramics",
    period: "Early Holocene",
    title: "An unusually early ceramic association",
    summary: "Ceramic material occurs in early associated contexts and has prompted debate about the timing of pottery in West Africa.",
    domain: "Technology",
    status: "Interpretation",
    sources: ["watson2017"],
    caution: "The association requires careful stratigraphic interpretation and should not be presented as settled fact.",
  },
  {
    id: "oil-palm",
    period: "7,573–7,447 cal BC",
    title: "Oil palm directly dated",
    summary: "Directly dated oil-palm endocarp demonstrates early Holocene use of a plant that later became increasingly prominent.",
    domain: "Foodways",
    status: "Published finding",
    sources: ["oas2015", "watson2017"],
    caution: "Presence demonstrates use, not a specific cultivation system.",
  },
  {
    id: "canarium",
    period: "5,326–5,216 cal BC",
    title: "Incense-tree fruit in the long record",
    summary: "Canarium schweinfurthii was a major preserved plant resource through much of the early and middle Holocene sequence.",
    domain: "Foodways",
    status: "Published finding",
    sources: ["oas2015"],
    caution: "Possible management is a research interpretation, not direct proof of cultivation.",
  },
  {
    id: "plant-transition",
    period: "Middle–late Holocene",
    title: "A gradual change in plant use",
    summary: "The assemblage shows incense-tree fruit declining in relative importance as oil palm becomes more prominent over time.",
    domain: "Foodways",
    status: "Published finding",
    sources: ["oas2015"],
    caution: "The trend is long-term and should not be reduced to one sudden economic transition.",
  },
  {
    id: "domesticates",
    period: "Later Holocene",
    title: "Trace cowpea and pearl millet",
    summary: "Small quantities of cowpea and pearl millet are consistent with contact or exchange with food-producing communities; the finds do not establish cultivation at Bosumpra.",
    domain: "Foodways",
    status: "Interpretation",
    sources: ["oas2015", "watson2017"],
    caution: "The cowpea association is not a direct date, pearl millet is conservatively placed later, and the reported early Phase I millet was treated as intrusive by the authors.",
  },
  {
    id: "quartz",
    period: "Long duration",
    title: "Quartz-working and specialised tools",
    summary: "Quartz reduction, geometric microliths, ground-stone tools and later technologies document changing technical choices.",
    domain: "Technology",
    status: "Published finding",
    sources: ["shaw1944", "watson2017"],
    caution: "Tool categories span different contexts and should not be treated as one unchanging industry.",
  },
  {
    id: "greenstone",
    period: "Holocene",
    title: "Where did the greenstone come from?",
    summary: "Greenstone artefacts and production waste raise research questions about raw-material sources, movement and relationships beyond the rockshelter.",
    domain: "Mobility",
    status: "Open question",
    sources: ["watson2017"],
    caution: "Watson (2017), citing Shaw (1944), reports the nearest known greenstone source about 16 km southeast near Nkawkaw. No sourcing study cited here establishes the artefacts’ provenance, acquisition route or exchange system.",
  },
  {
    id: "technology-overlap",
    period: "Late 1st millennium BC–17th c. AD",
    title: "Stone, pottery and metal overlap",
    summary: "The sequence resists a simple stage model: technologies and economic strategies changed through long periods of overlap.",
    domain: "Technology",
    status: "Published finding",
    sources: ["watson2017"],
    caution: "Labels such as ‘Stone Age’ are useful public shorthand but cannot represent the full sequence.",
  },
  {
    id: "shaw-fieldwork",
    period: "1940/1943; report published 1944",
    title: "Shaw’s excavation and published report",
    summary: "Published sources differ on the excavation year: Smith (1975) states 1940 and Watson (2017) gives 1943. Shaw’s report appeared in 1944 and established the first detailed published sequence.",
    domain: "Research",
    status: "Documented history",
    sources: ["shaw1944", "smith1975", "watson2017"],
    caution: "Modern interpretation must account for the methods and recording standards of the period.",
  },
  {
    id: "smith-fieldwork",
    period: "1973–1974",
    title: "The first radiocarbon framework",
    summary: "Andrew B. Smith’s trench and samples added chronological control and an early account of plant remains.",
    domain: "Research",
    status: "Documented history",
    sources: ["smith1975", "oas2015"],
    caution: "Later work refined both chronology and interpretation.",
  },
  {
    id: "fogp",
    period: "2008–2011",
    title: "Modern re-excavation and synthesis",
    summary: "The Forest Occupations of Ghana Project expanded the stratigraphic, dating and contextual evidence through new units and analyses.",
    domain: "Research",
    status: "Documented history",
    sources: ["oas2015", "watson2017"],
    caution: "The published record remains the authority for detailed claims.",
  },
  {
    id: "living-place",
    period: "Published historical record",
    title: "Documented religious history",
    summary: "Published sources document a former association with the deity Pra and later Christian use at the rockshelter.",
    domain: "Living heritage",
    status: "Documented history",
    sources: ["shaw1944", "watson2017"],
    caution: "The publications do not substitute for current consultation. Present-day meanings, custodians and protocols must be confirmed with rights-holders.",
  },
  {
    id: "seasonality",
    period: "Across the sequence",
    title: "How continuous was shelter use?",
    summary: "The intensity, seasonality and purpose of activity likely changed substantially across the long sequence.",
    domain: "Chronology",
    status: "Open question",
    sources: ["oas2015", "watson2017"],
    caution: "‘12,000 years of activity’ must never be rewritten as continuous residence.",
  },
];

export type DeliveryGateCode =
  | "G01"
  | "G02"
  | "G03"
  | "G04"
  | "G05"
  | "G06"
  | "G07"
  | "G08"
  | "G09"
  | "G10"
  | "G11"
  | "G12"
  | "G13"
  | "G14"
  | "G15"
  | "G16"
  | "G17"
  | "G18";

export type DeliveryGate = {
  code: DeliveryGateCode;
  id: string;
  group: "Authority" | "Conservation" | "Design" | "Economics" | "Delivery" | "Impact";
  title: string;
  requirement: string;
  evidence: string;
  packStatus: "Partial source material supplied" | "Evidence required" | "Independent confirmation";
};

export const developmentGateDefinition =
  "A proposed development review gate is a checkpoint created for this website to show what should be resolved before a project decision advances. Each gate names the question to settle, the evidence to review and the present evidence status. These gates are not statutory approvals, an adopted project process or proof that any requirement has been met.";

export const developmentGateSourceBoundary =
  "This is a website-authored diligence checkpoint. It is not a statutory approval, an adopted stage gate or evidence that the requirement is complete. The status describes material visible in this public pack, not the project’s actual legal or delivery status.";

export const deliveryGates: DeliveryGate[] = [
  { code: "G01", id: "legal-entity", group: "Authority", title: "Legal entity and decision rights", requirement: "Confirm the accountable owner, board powers, delegated authorities and signatories.", evidence: "Registration, constitution, board register and authority matrix", packStatus: "Evidence required" },
  { code: "G02", id: "custodians", group: "Authority", title: "Cultural and community mandate", requirement: "Document the roles and consent pathways of traditional leadership, custodians, community groups and public bodies.", evidence: "Endorsed governance compact, meeting record and grievance route", packStatus: "Evidence required" },
  { code: "G03", id: "land", group: "Authority", title: "Land and surveyed boundary", requirement: "Verify title, tenure, encumbrances, permitted use and the relationship between the project land and protected heritage.", evidence: "Title search, cadastral survey and legal opinion", packStatus: "Independent confirmation" },
  { code: "G04", id: "heritage-status", group: "Conservation", title: "Heritage status and permissions", requirement: "Confirm national inventory/listing status and the approvals required from GMMB and other competent authorities.", evidence: "Written status confirmation and approvals pathway", packStatus: "Evidence required" },
  { code: "G05", id: "condition", group: "Conservation", title: "Condition and significance baseline", requirement: "Record fabric, deposits, hydrology, vegetation, threats, documented values and any present-day relationships confirmed through consultation before intervention.", evidence: "Signed conservation baseline with mapped sensitivities", packStatus: "Evidence required" },
  { code: "G06", id: "management-plan", group: "Conservation", title: "Conservation management plan", requirement: "Define no-go areas, monitoring, maintenance, visitor carrying limits, emergency response and change control.", evidence: "Approved management plan and monitoring schedule", packStatus: "Evidence required" },
  { code: "G07", id: "collections", group: "Conservation", title: "Collections custody and rights", requirement: "Clarify ownership, custody, loan conditions, inventory, conservation, display, research and digital rights.", evidence: "Collections inventory, MoU and rights register", packStatus: "Evidence required" },
  { code: "G08", id: "design", group: "Design", title: "Coordinated professional design", requirement: "Coordinate architecture with structure, services, fire, accessibility, landscape, operations and exhibition requirements.", evidence: "Issued multidisciplinary design package and design-responsibility matrix", packStatus: "Partial source material supplied" },
  { code: "G09", id: "safety", group: "Design", title: "Life safety and universal access", requirement: "Design safe evacuation, inclusive routes, sanitary facilities, safeguarding and emergency access.", evidence: "Code review, fire strategy, access audit and emergency plan", packStatus: "Evidence required" },
  { code: "G10", id: "environment", group: "Design", title: "Environment and infrastructure", requirement: "Test water, wastewater, energy, erosion, biodiversity, waste and construction impacts across the lifecycle.", evidence: "Environmental screening/assessment and engineered infrastructure plan", packStatus: "Evidence required" },
  { code: "G11", id: "cost", group: "Economics", title: "Independent cost plan", requirement: "Remeasure scope and include escalation, contingency, taxes, fees, exhibitions, external works and pre-opening costs.", evidence: "Signed cost plan with price base, assumptions and reconciliation", packStatus: "Evidence required" },
  { code: "G12", id: "demand", group: "Economics", title: "Demand and visitor model", requirement: "Test realistic visitor segments, seasonality, access constraints, pricing and conversion assumptions.", evidence: "Demand study with scenarios and evidence trail", packStatus: "Evidence required" },
  { code: "G13", id: "operations", group: "Economics", title: "Operating model", requirement: "Define staffing, conservation, maintenance, security, utilities, programmes, marketing and lifecycle renewal.", evidence: "Five-year operating plan and cash-flow scenarios", packStatus: "Evidence required" },
  { code: "G14", id: "funding", group: "Economics", title: "Capital and funding structure", requirement: "Separate confirmed funds, funding gap, restricted grants, sponsorship, philanthropy and any repayable finance.", evidence: "Sources-and-uses schedule and approved fundraising case", packStatus: "Evidence required" },
  { code: "G15", id: "procurement", group: "Delivery", title: "Procurement and integrity controls", requirement: "Set procurement routes, conflicts policy, tender records, change control, audit and transparent reporting.", evidence: "Approved procurement plan and integrity protocol", packStatus: "Evidence required" },
  { code: "G16", id: "programme", group: "Delivery", title: "Integrated delivery programme", requirement: "Link approvals, conservation, design, procurement, construction, exhibitions, recruitment, testing and opening.", evidence: "Logic-linked programme with dependencies, owners and contingencies", packStatus: "Evidence required" },
  { code: "G17", id: "community-benefit", group: "Impact", title: "Community benefit and supplier plan", requirement: "Translate participation into fair training, jobs, contracts, enterprise support and public reporting.", evidence: "Targets, baseline, selection rules and benefit dashboard", packStatus: "Evidence required" },
  { code: "G18", id: "measurement", group: "Impact", title: "Public-value measurement", requirement: "Measure heritage condition, learning, livelihoods, voice, environment and institutional capability.", evidence: "Baseline, indicator dictionary, data owners and reporting cadence", packStatus: "Evidence required" },
];

export const riskScreening = [
  { area: "Heritage", risk: "Visitor growth or construction damages deposits, fabric or living values.", response: "Condition baseline, no-go zones, carrying limits, monitoring and stop-work authority.", evidence: "Conservation management plan" },
  { area: "Legitimacy", risk: "Decisions advance without credible rights-holder and community participation.", response: "Defined representation, consent points, accessible records and remedy channels.", evidence: "Governance and community compact" },
  { area: "Design", risk: "The architectural concept advances before safety, collections and operations are coordinated.", response: "Stage-gate reviews and a multidisciplinary design-responsibility matrix.", evidence: "Coordinated issued design" },
  { area: "Cost", risk: "Fundraising or procurement relies on an incomplete preliminary estimate.", response: "Independent remeasurement, full-scope reconciliation and scenario contingency.", evidence: "Signed cost plan" },
  { area: "Operations", risk: "A building is funded without the people and recurring resources required to run it.", response: "Five-year operating model, lifecycle plan and pre-opening budget.", evidence: "Approved operating plan" },
  { area: "Benefits", risk: "Local opportunity remains rhetorical or is captured by a narrow group.", response: "Transparent eligibility, supplier development, disaggregated targets and public reporting.", evidence: "Benefit-sharing framework" },
  { area: "Information", risk: "Interpretation overstates evidence or reuses protected material without rights.", response: "Claim-level citations, status labels, rights register and documented editorial review.", evidence: "Evidence and rights register" },
  { area: "Visitor safety", risk: "People travel before access, guides, facilities or emergency arrangements are confirmed.", response: "Publish only verified visitor information and require pre-arranged group confirmation.", evidence: "Visitor operations and emergency plan" },
] as const;

export const stakeholderRoutes = [
  {
    id: "community",
    label: "Community member or enterprise",
    outcome: "Community benefit, safeguards and accessible opportunity.",
    actions: [
      "Identify the heritage values, places and practices that must be protected.",
      "Map local skills, suppliers and enterprises against future work packages.",
      "Agree transparent eligibility, complaints and benefit-reporting rules.",
      "Nominate representatives for design, conservation and visitor-protocol reviews.",
    ],
  },
  {
    id: "custodian",
    label: "Traditional or cultural custodian",
    outcome: "Authority, protocols and living-heritage boundaries.",
    actions: [
      "Document decision rights and required consent points.",
      "Define protocols for sacred areas, photography, interpretation and research.",
      "Review the relationship between archaeological and contemporary meanings.",
      "Establish a process for correction, conflict resolution and periodic review.",
    ],
  },
  {
    id: "public",
    label: "Public institution",
    outcome: "Lawful, coordinated and accountable delivery arrangements.",
    actions: [
      "Confirm heritage status, land, planning and regulatory requirements.",
      "Nominate institutional leads and publish an approvals map.",
      "Coordinate access, sanitation, safety, environment and local-enterprise support.",
      "Align indicators with district, national and Culture|2030 reporting.",
    ],
  },
  {
    id: "research",
    label: "Research or education partner",
    outcome: "Research documentation and responsible education.",
    actions: [
      "Define the question, methods, permissions, rights and community value.",
      "Connect objects and claims to provenance, context and source records.",
      "Plan accessible outputs for schools, guides and public interpretation.",
      "Deposit approved records through a sustainable archive workflow.",
    ],
  },
  {
    id: "funding",
    label: "Funder or sponsor",
    outcome: "Milestone-based funding with defined public value.",
    actions: [
      "Specify the proposed funding scope: conservation, design, construction, interpretation, operations or community benefit.",
      "Require the relevant diligence gate evidence before commitment.",
      "Agree use restrictions, reporting, safeguards and change control.",
      "Fund capability and operations alongside visible capital items.",
    ],
  },
  {
    id: "technical",
    label: "Technical or delivery partner",
    outcome: "Technical coordination and maintainable systems.",
    actions: [
      "Declare scope, interfaces, assumptions and professional responsibility.",
      "Test decisions against conservation significance and operating capacity.",
      "Build whole-life cost, access, safety and climate resilience into design.",
      "Transfer skills and document decisions for the owner and community.",
    ],
  },
  {
    id: "visit",
    label: "Visitor or group organiser",
    outcome: "Prepare a respectful visit request without assuming access.",
    actions: [
      "Confirm current opening status and an accountable local contact.",
      "State group size, purpose, ages, access needs and preferred date.",
      "Ask about guides, weather, facilities, photography and sensitive areas.",
      "Choose local services where verified and follow all site protocols.",
    ],
  },
] as const;

export const visitProfiles = [
  {
    id: "general",
    label: "First encounter",
    audience: "Families and general visitors",
    focus: ["Landscape orientation", "Guided shelter encounter", "Evidence highlights", "Local food and enterprise"],
  },
  {
    id: "school",
    label: "Learning day",
    audience: "Schools and youth groups",
    focus: ["Curriculum link", "Supervision and safeguarding", "Hands-on interpretation", "Teacher materials"],
  },
  {
    id: "research",
    label: "Evidence intensive",
    audience: "Universities and researchers",
    focus: ["Research purpose", "Permissions and ethics", "Methods briefing", "Collections and archive questions"],
  },
  {
    id: "institution",
    label: "Institutional delegation",
    audience: "Government, funders and partners",
    focus: ["Governance", "Conservation status", "Project diligence", "Community and implementation meetings"],
  },
] as const;

export const visitConfirmations = [
  "Current opening status and official contact",
  "Guide requirement, group-size limit and permitted route",
  "Road, weather and site-access conditions",
  "Mobility, washroom, rest-area and emergency access",
  "Photography, worship and culturally sensitive-area protocols",
  "School supervision, safeguarding and consent requirements",
  "Fees, payment method and what the fee supports",
  "Verified map pin, arrival point and local transport arrangement",
] as const;

export const impactDimensions = [
  { title: "Heritage", measure: "Condition, threats, conservation actions, incidents and compliance", principle: "Protect significance before increasing use" },
  { title: "People", measure: "Participation, representation, complaints, remedy and satisfaction", principle: "Put rights-holders at the centre of governance" },
  { title: "Learning", measure: "School access, teacher support, research outputs and archive use", principle: "Support access to research and education" },
  { title: "Livelihoods", measure: "Local jobs, training, supplier spend, enterprise survival and progression", principle: "Measure who benefits and how" },
  { title: "Environment", measure: "Erosion, vegetation, water, waste, energy and visitor pressure", principle: "Integrate cultural and environmental management" },
  { title: "Institution", measure: "Governance, finance, maintenance, data quality and reporting cadence", principle: "Maintain institutional capacity" },
] as const;

export const glossary = [
  ["AMS dating", "Accelerator mass spectrometry dating: a method used to date small samples of carbon-bearing material."],
  ["Cal BC", "A calibrated calendar-date range expressed as years before the Common Era."],
  ["Context", "The recorded location and relationship of material within an archaeological deposit."],
  ["Endocarp", "The hard inner layer of a fruit, often preserving as an identifiable archaeological plant remain."],
  ["Geometric microlith", "A small, deliberately shaped stone tool form; its function depends on context and use-wear evidence."],
  ["Later Stone Age", "A broad archaeological label used for varied African technological and economic traditions; it is not one uniform culture."],
  ["Provenance", "The documented origin and ownership/custody history of an object or record."],
  ["Rockshelter", "A naturally sheltered space beneath an overhanging rock face; Bosumpra is more precisely described this way than as a deep cave."],
  ["Stratigraphy", "The sequence and relationships of deposits used to interpret change through time."],
  ["Significance", "The evidence-based cultural, historical, social, scientific or spiritual values that conservation seeks to sustain."],
  ["Carrying limit", "A management threshold for use or visitation set to protect heritage, safety and experience."],
  ["Living heritage", "Heritage whose values and practices remain connected to contemporary communities and rights-holders."],
] as const;

export const learningMethods = [
  {
    id: "stratigraphy",
    title: "Stratigraphic context",
    question: "How do archaeologists connect material to time?",
    explanation: "The position and relationship of deposits provide the context needed to interpret an object. Disturbance, later digging and mixed deposits can weaken an association.",
    activity: "Give learners six fictional layers and ask them to identify which claims are secure, uncertain or impossible without more information.",
  },
  {
    id: "dating",
    title: "A date belongs to a sample and context",
    question: "What does a calibrated radiocarbon range mean?",
    explanation: "Radiocarbon analysis estimates the age of carbon-bearing material. Calibration converts the result into a calendar-date probability range; it does not directly date every object in the layer.",
    activity: "Compare three sample ranges and discuss why a range is more honest than one exact year.",
  },
  {
    id: "plants",
    title: "Archaeobotanical evidence",
    question: "How can fruit stones survive for millennia?",
    explanation: "Charred or durable plant parts can be recovered, identified and counted. Their changing proportions help researchers study food use, but presence alone does not prove cultivation.",
    activity: "Sort a sample dataset by plant, phase and count, then write one supported conclusion and one question.",
  },
  {
    id: "technology",
    title: "Overlapping technologies",
    question: "Why can stone, pottery and metal overlap?",
    explanation: "People select materials for availability, skill, function and meaning. A newer technology does not automatically or immediately replace an older one.",
    activity: "List modern technologies that coexist and use the comparison to critique a simple progress ladder.",
  },
  {
    id: "living-heritage",
    title: "Archaeological and contemporary values",
    question: "Who has authority to explain a living place?",
    explanation: "Published research is essential for archaeological claims, while present-day cultural and spiritual meanings must be developed with the people and custodians connected to the place.",
    activity: "Map researchers, custodians, residents, visitors and public institutions to the decisions each should help make.",
  },
] as const;

export const learningLevels = [
  {
    id: "primary",
    label: "Primary",
    objective: "Notice how objects, plants and places can carry evidence about the past.",
    activity: "Match each example to the claim it supports and record its interpretation limit.",
    assessment: "Draw a three-layer site and label one careful claim from each layer.",
  },
  {
    id: "jhs",
    label: "Junior high",
    objective: "Explain how context, dating and comparison support archaeological interpretation.",
    activity: "Build an evidence-status table for five Bosumpra claims.",
    assessment: "Write a short paragraph separating evidence from interpretation.",
  },
  {
    id: "shs",
    label: "Senior high",
    objective: "Evaluate competing interpretations of technology, foodways and regional interaction.",
    activity: "Analyse a simplified plant-use dataset and challenge a claim of sudden change.",
    assessment: "Produce a source-cited interpretation with one limitation and one research question.",
  },
  {
    id: "tertiary",
    label: "Tertiary / professional",
    objective: "Connect archaeological evidence with conservation, governance and public interpretation.",
    activity: "Audit one proposed public claim for provenance, uncertainty, rights and management implications.",
    assessment: "Prepare a one-page evidence note and stakeholder review plan.",
  },
] as const;

export const knowledgeCheck = [
  {
    question: "What does the earliest published AMS determination establish?",
    options: [
      "Activity in a dated context",
      "Continuous residence for 12,000 years",
      "The exact year the shelter was first used",
    ],
    answer: 0,
    explanation: "The date supports human activity in a context; it does not establish uninterrupted residence or one exact calendar year.",
  },
  {
    question: "What can oil-palm endocarp directly demonstrate?",
    options: [
      "A specific farming system",
      "Use of oil-palm fruit",
      "Permanent settlement at the shelter",
    ],
    answer: 1,
    explanation: "The plant remain demonstrates use. Cultivation, settlement and management require additional evidence.",
  },
  {
    question: "Why are evidence-status labels useful?",
    options: [
      "They make every claim equally certain",
      "They distinguish support, interpretation, proposal and open questions",
      "They replace citations",
    ],
    answer: 1,
    explanation: "A status label communicates the strength and type of a claim, while citations remain necessary.",
  },
  {
    question: "Who should define current cultural protocols?",
    options: [
      "Visitors alone",
      "Only the oldest publication",
      "Present-day rights-holders and custodians with relevant authorities",
    ],
    answer: 2,
    explanation: "Current protocols must be developed with people and institutions that hold legitimate responsibilities today.",
  },
] as const;

export type DocumentStatus =
  | "Supplied source reference available"
  | "Not evidenced in supplied material"
  | "Independent confirmation required";

export type DocumentRecord = {
  id: string;
  category: DeliveryGate["group"];
  title: string;
  purpose: string;
  ownerRole: string;
  linkedGate: string;
  status: DocumentStatus;
};

export const documentRegister: DocumentRecord[] = [
  { id: "GOV-01", category: "Authority", title: "Legal entity record", purpose: "Establish the accountable project entity and its current standing.", ownerRole: "Proposed company-secretary function", linkedGate: "legal-entity", status: "Not evidenced in supplied material" },
  { id: "GOV-02", category: "Authority", title: "Decision-authority schedule", purpose: "Define reserved matters, delegations and authorised signatories.", ownerRole: "Proposed governance lead", linkedGate: "legal-entity", status: "Not evidenced in supplied material" },
  { id: "GOV-03", category: "Authority", title: "Community governance compact", purpose: "Record representation, consent points, review procedures and remedy.", ownerRole: "Proposed community-governance lead", linkedGate: "custodians", status: "Not evidenced in supplied material" },
  { id: "LND-01", category: "Authority", title: "Land title search", purpose: "Verify title, tenure, encumbrances and permitted use.", ownerRole: "Proposed independent legal adviser", linkedGate: "land", status: "Independent confirmation required" },
  { id: "LND-02", category: "Authority", title: "Cadastral and heritage boundary survey", purpose: "Fix the relationship between project land, access and sensitive heritage areas.", ownerRole: "Proposed licensed surveyor", linkedGate: "land", status: "Independent confirmation required" },
  { id: "HER-01", category: "Conservation", title: "Heritage status confirmation", purpose: "Record the applicable national inventory, protection and permission position.", ownerRole: "Proposed heritage-authority liaison", linkedGate: "heritage-status", status: "Not evidenced in supplied material" },
  { id: "HER-02", category: "Conservation", title: "Condition and significance baseline", purpose: "Document fabric, deposits, threats, values and mapped sensitivities.", ownerRole: "Proposed conservation lead", linkedGate: "condition", status: "Not evidenced in supplied material" },
  { id: "HER-03", category: "Conservation", title: "Conservation management plan", purpose: "Set conservation policy, monitoring, limits, maintenance and change control.", ownerRole: "Proposed conservation lead", linkedGate: "management-plan", status: "Not evidenced in supplied material" },
  { id: "COL-01", category: "Conservation", title: "Collections and rights register", purpose: "Record custody, provenance, loan, display, research and reproduction rights.", ownerRole: "Proposed collections lead", linkedGate: "collections", status: "Not evidenced in supplied material" },
  { id: "DES-01", category: "Design", title: "Concept design package", purpose: "Describe the proposed spatial and architectural programme.", ownerRole: "Role stated in supplied drawing set", linkedGate: "design", status: "Supplied source reference available" },
  { id: "DES-02", category: "Design", title: "Multidisciplinary design brief", purpose: "Coordinate structure, services, access, fire, landscape, exhibitions and operations.", ownerRole: "Proposed project-management function", linkedGate: "design", status: "Not evidenced in supplied material" },
  { id: "SAF-01", category: "Design", title: "Life-safety and access strategy", purpose: "Set evacuation, fire, universal access, safeguarding and emergency requirements.", ownerRole: "Proposed professional design team", linkedGate: "safety", status: "Not evidenced in supplied material" },
  { id: "ENV-01", category: "Design", title: "Environmental and infrastructure assessment", purpose: "Assess water, wastewater, energy, erosion, biodiversity, waste and construction effects.", ownerRole: "Proposed environmental lead", linkedGate: "environment", status: "Not evidenced in supplied material" },
  { id: "FIN-01", category: "Economics", title: "Preliminary BOQ summary", purpose: "Provide the documented starting estimate for independent review.", ownerRole: "Attribution requires confirmation", linkedGate: "cost", status: "Supplied source reference available" },
  { id: "FIN-02", category: "Economics", title: "Independent cost plan", purpose: "Remeasure full scope and state fees, taxes, escalation, contingency and price basis.", ownerRole: "Proposed independent cost adviser", linkedGate: "cost", status: "Not evidenced in supplied material" },
  { id: "OPS-01", category: "Economics", title: "Demand and access study", purpose: "Test visitor segments, seasonality, access limits, pricing and conversion assumptions.", ownerRole: "Proposed visitor-economy adviser", linkedGate: "demand", status: "Not evidenced in supplied material" },
  { id: "OPS-02", category: "Economics", title: "Five-year operating plan", purpose: "Set staffing, maintenance, conservation, security, programmes and renewal costs.", ownerRole: "Proposed operations lead", linkedGate: "operations", status: "Not evidenced in supplied material" },
  { id: "FND-01", category: "Economics", title: "Sources-and-uses schedule", purpose: "Separate confirmed resources, restrictions, funding gap and proposed financing.", ownerRole: "Proposed finance lead", linkedGate: "funding", status: "Not evidenced in supplied material" },
  { id: "DEL-01", category: "Delivery", title: "Procurement and integrity plan", purpose: "Define routes, tender records, conflicts, approvals, audit and change control.", ownerRole: "Proposed procurement lead", linkedGate: "procurement", status: "Not evidenced in supplied material" },
  { id: "DEL-02", category: "Delivery", title: "Integrated delivery programme", purpose: "Link permissions, design, procurement, construction, fit-out, recruitment and opening.", ownerRole: "Proposed project-management function", linkedGate: "programme", status: "Not evidenced in supplied material" },
  { id: "IMP-01", category: "Impact", title: "Community benefit and supplier plan", purpose: "Set transparent eligibility, training, employment, procurement and reporting targets.", ownerRole: "Proposed community-benefit lead", linkedGate: "community-benefit", status: "Not evidenced in supplied material" },
  { id: "IMP-02", category: "Impact", title: "Public-value measurement plan", purpose: "Define baselines, indicators, data owners, safeguards and reporting cadence.", ownerRole: "Proposed monitoring and evaluation lead", linkedGate: "measurement", status: "Not evidenced in supplied material" },
];

export const programmeSequence = [
  { id: "P1", workstream: "Authority", entry: "Accountable entity and rights-holders identified", decision: "Approve governance and authority pathway", output: "Governance compact and authority schedule", dependsOn: "None" },
  { id: "P2", workstream: "Conservation", entry: "P1 authority pathway documented", decision: "Approve significance, safeguards and intervention limits", output: "Condition baseline and conservation plan", dependsOn: "P1" },
  { id: "P3", workstream: "Design", entry: "P2 sensitivities and limits issued", decision: "Approve coordinated design for statutory review", output: "Multidisciplinary design package", dependsOn: "P2" },
  { id: "P4", workstream: "Economics", entry: "P3 scope and operating requirements coordinated", decision: "Approve independently reviewed affordability case", output: "Cost, demand, operating and funding plans", dependsOn: "P3" },
  { id: "P5", workstream: "Delivery", entry: "P1–P4 decisions and permissions complete", decision: "Authorise procurement and implementation", output: "Procurement plan and integrated programme", dependsOn: "P1–P4" },
  { id: "P6", workstream: "Impact", entry: "Community benefit commitments agreed before procurement", decision: "Approve baselines, targets and reporting responsibilities", output: "Benefit and public-value plans", dependsOn: "P1–P5" },
] as const;

export const decisionRegister = [
  { id: "D-01", decision: "Confirm the accountable project entity and reserved matters.", ownerRole: "Proposed board / company-secretary function", prerequisites: "Current registration and governing instrument", requiredRecord: "GOV-01, GOV-02", status: "Not evidenced in supplied material" },
  { id: "D-02", decision: "Confirm cultural authority, representation and consent points.", ownerRole: "Rights-holders and proposed project governance", prerequisites: "Documented consultation and representative mandate", requiredRecord: "GOV-03", status: "Not evidenced in supplied material" },
  { id: "D-03", decision: "Confirm land, access and heritage boundaries.", ownerRole: "Landholders and competent authorities", prerequisites: "Independent searches and surveyed plan", requiredRecord: "LND-01, LND-02", status: "Not evidenced in supplied material" },
  { id: "D-04", decision: "Approve conservation significance and intervention limits.", ownerRole: "Heritage authority and proposed conservation lead", prerequisites: "Status confirmation and condition baseline", requiredRecord: "HER-01, HER-02", status: "Not evidenced in supplied material" },
  { id: "D-05", decision: "Approve the conservation management framework.", ownerRole: "Heritage authority, custodians and proposed governance body", prerequisites: "D-02 to D-04", requiredRecord: "HER-03, COL-01", status: "Not evidenced in supplied material" },
  { id: "D-06", decision: "Approve coordinated design for statutory review.", ownerRole: "Proposed governance body and competent authorities", prerequisites: "D-05 and completed multidisciplinary review", requiredRecord: "DES-02, SAF-01, ENV-01", status: "Not evidenced in supplied material" },
  { id: "D-07", decision: "Approve the affordability and operating case.", ownerRole: "Proposed governance body and independent advisers", prerequisites: "Coordinated scope, demand evidence and operating assumptions", requiredRecord: "FIN-02, OPS-01, OPS-02, FND-01", status: "Not evidenced in supplied material" },
  { id: "D-08", decision: "Authorise procurement.", ownerRole: "Proposed governance body", prerequisites: "Permissions, funding plan, design and cost approval", requiredRecord: "DEL-01, DEL-02", status: "Not evidenced in supplied material" },
  { id: "D-09", decision: "Approve community benefit commitments and monitoring.", ownerRole: "Proposed community and project-governance bodies", prerequisites: "Baseline and transparent selection rules", requiredRecord: "IMP-01, IMP-02", status: "Not evidenced in supplied material" },
  { id: "D-10", decision: "Authorise public opening.", ownerRole: "Competent authorities and future operator", prerequisites: "Commissioning, licensing, staffing, safety and visitor protocols", requiredRecord: "Completion and operating records", status: "Not evidenced in supplied material" },
] as const;

export const decisionRights = [
  { matter: "Heritage significance and intervention", recommends: "Conservation lead", consults: "Custodians, researchers and community representatives", approves: "Competent heritage authority", evidence: "Condition baseline and conservation plan" },
  { matter: "Land, access and boundaries", recommends: "Independent legal and survey advisers", consults: "Landholders, custodians and district authorities", approves: "Legally authorised parties", evidence: "Title search, legal opinion and survey" },
  { matter: "Cultural protocol and interpretation", recommends: "Custodians and editorial lead", consults: "Community representatives and researchers", approves: "Mandated cultural governance body", evidence: "Protocol and approved interpretation record" },
  { matter: "Design and construction", recommends: "Lead designer and project manager", consults: "Conservation, operations, access and community leads", approves: "Project board and competent authorities", evidence: "Coordinated design and statutory approvals" },
  { matter: "Procurement and contract award", recommends: "Procurement panel", consults: "Finance, technical and integrity advisers", approves: "Authorised board or delegated committee", evidence: "Tender record, evaluation and conflicts declarations" },
  { matter: "Opening and visitor operations", recommends: "Operator and project manager", consults: "Safety, heritage, guide and community leads", approves: "Competent authorities and project board", evidence: "Licences, commissioning, emergency and operating plans" },
] as const;
