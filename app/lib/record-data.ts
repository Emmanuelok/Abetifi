export type EvidenceStatus =
  | "Established"
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
    kind: "Peer-reviewed excavation report",
    href: "https://doi.org/10.1017/S0079497X00020016",
    contribution: "The foundational excavation record and description of the site sequence.",
  },
  {
    id: "smith1975",
    year: "1975",
    author: "A. B. Smith",
    title: "Radiocarbon Dates from Bosumpra Cave, Abetifi, Ghana",
    kind: "Peer-reviewed dating note",
    href: "https://doi.org/10.1017/S0079497X00010975",
    contribution: "The first radiocarbon framework for Bosumpra.",
  },
  {
    id: "oas2015",
    year: "2015",
    author: "S. E. Oas, A. C. D’Andrea & D. J. Watson",
    title: "10,000 year history of plant use at Bosumpra Cave, Ghana",
    kind: "Peer-reviewed archaeobotanical study",
    href: "https://doi.org/10.1007/s00334-015-0514-2",
    contribution: "Long-term plant-use evidence, including incense-tree fruit, oil palm and trace domesticates.",
  },
  {
    id: "watson2017",
    year: "2017",
    author: "D. J. Watson",
    title: "Bosumpra revisited: 12,500 years on the Kwahu Plateau, Ghana",
    kind: "Peer-reviewed site synthesis",
    href: "https://doi.org/10.1080/0067270X.2017.1393925",
    contribution: "The most comprehensive modern synthesis of chronology, stratigraphy, technology and site meaning.",
  },
  {
    id: "gmmb",
    year: "Current",
    author: "Ghana Museums and Monuments Board",
    title: "Legal and administrative framework",
    kind: "National heritage authority",
    href: "https://gmmb.gov.gh/about-us/",
    contribution: "GMMB identifies itself as Ghana’s legal custodian of movable and immovable material cultural heritage.",
  },
  {
    id: "icomos2022",
    year: "2022",
    author: "ICOMOS",
    title: "International Charter for Cultural Heritage Tourism",
    kind: "International professional charter",
    href: "https://openarchive.icomos.org/id/eprint/2806/",
    contribution: "Principles for community participation, heritage protection and responsible tourism management.",
  },
  {
    id: "iccrom",
    year: "Current",
    author: "ICCROM",
    title: "People-Centred Approaches to Conservation",
    kind: "International conservation guidance",
    href: "https://www.iccrom.org/section/people-and-heritage/people-centred-approaches",
    contribution: "Positions people most closely connected to heritage at the core of conservation and management.",
  },
  {
    id: "unesco2030",
    year: "2019",
    author: "UNESCO",
    title: "Culture|2030 Indicators",
    kind: "Sustainable-development measurement framework",
    href: "https://whc.unesco.org/en/culture2030indicators",
    contribution: "A 22-indicator framework for making culture’s contribution to sustainable development measurable.",
  },
] as const;

export const evidenceRecords: EvidenceRecord[] = [
  {
    id: "date-earliest",
    period: "10,439–9,825 cal BC",
    title: "Earliest robust dated activity",
    summary: "A calibrated AMS determination places human activity at Bosumpra in the mid-11th millennium BC.",
    domain: "Chronology",
    status: "Established",
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
    status: "Established",
    sources: ["oas2015", "watson2017"],
    caution: "Presence demonstrates use, not a specific cultivation system.",
  },
  {
    id: "canarium",
    period: "5,326–5,216 cal BC",
    title: "Incense-tree fruit in the long record",
    summary: "Canarium schweinfurthii was a major preserved plant resource through much of the early and middle Holocene sequence.",
    domain: "Foodways",
    status: "Established",
    sources: ["oas2015"],
    caution: "Possible management is a research interpretation, not direct proof of cultivation.",
  },
  {
    id: "plant-transition",
    period: "Middle–late Holocene",
    title: "A gradual change in plant use",
    summary: "The assemblage shows incense-tree fruit declining in relative importance as oil palm becomes more prominent over time.",
    domain: "Foodways",
    status: "Established",
    sources: ["oas2015"],
    caution: "The trend is long-term and should not be reduced to one sudden economic transition.",
  },
  {
    id: "domesticates",
    period: "c. 1,907–1,696 cal BC",
    title: "Trace cowpea and pearl millet",
    summary: "Small quantities of domesticates indicate contact with food-producing economies and a more connected regional landscape.",
    domain: "Foodways",
    status: "Interpretation",
    sources: ["oas2015", "watson2017"],
    caution: "The evidence does not establish that farming occurred at the rockshelter itself.",
  },
  {
    id: "quartz",
    period: "Long duration",
    title: "Quartz-working and specialised tools",
    summary: "Quartz reduction, geometric microliths, ground-stone tools and later technologies document changing technical choices.",
    domain: "Technology",
    status: "Established",
    sources: ["shaw1944", "watson2017"],
    caution: "Tool categories span different contexts and should not be treated as one unchanging industry.",
  },
  {
    id: "greenstone",
    period: "Holocene",
    title: "Materials connect the plateau outward",
    summary: "Non-local materials, including greenstone, raise questions about mobility, exchange and relationships beyond Abetifi.",
    domain: "Mobility",
    status: "Interpretation",
    sources: ["watson2017"],
    caution: "Material origin can suggest connection but does not by itself identify a trade route or social system.",
  },
  {
    id: "technology-overlap",
    period: "Late 1st millennium BC–17th c. AD",
    title: "Stone, pottery and metal overlap",
    summary: "The sequence resists a simple stage model: technologies and economic strategies changed through long periods of overlap.",
    domain: "Technology",
    status: "Established",
    sources: ["watson2017"],
    caution: "Labels such as ‘Stone Age’ are useful public shorthand but cannot represent the full sequence.",
  },
  {
    id: "shaw-fieldwork",
    period: "1943",
    title: "Shaw’s pioneering excavation",
    summary: "Thurstan Shaw’s work established the first detailed archaeological sequence and brought Bosumpra into wider scholarship.",
    domain: "Research",
    status: "Documented history",
    sources: ["shaw1944"],
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
    period: "Recent history–present",
    title: "A living landscape, not only an archaeological site",
    summary: "Recent shrine and Christian use form part of the site’s layered history and contemporary community relationships.",
    domain: "Living heritage",
    status: "Established",
    sources: ["shaw1944", "watson2017", "iccrom"],
    caution: "Current meanings and protocols must be defined with today’s rights-holders and custodians.",
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

export type DeliveryGate = {
  id: string;
  group: "Authority" | "Conservation" | "Design" | "Economics" | "Delivery" | "Impact";
  title: string;
  requirement: string;
  evidence: string;
  packStatus: "Concept documented" | "Evidence required" | "Independent confirmation";
};

export const deliveryGates: DeliveryGate[] = [
  { id: "legal-entity", group: "Authority", title: "Legal entity and decision rights", requirement: "Confirm the accountable owner, board powers, delegated authorities and signatories.", evidence: "Registration, constitution, board register and authority matrix", packStatus: "Evidence required" },
  { id: "custodians", group: "Authority", title: "Cultural and community mandate", requirement: "Document the roles and consent pathways of traditional leadership, custodians, community groups and public bodies.", evidence: "Endorsed governance compact, meeting record and grievance route", packStatus: "Evidence required" },
  { id: "land", group: "Authority", title: "Land and surveyed boundary", requirement: "Verify title, tenure, encumbrances, permitted use and the relationship between the project land and protected heritage.", evidence: "Title search, cadastral survey and legal opinion", packStatus: "Independent confirmation" },
  { id: "heritage-status", group: "Conservation", title: "Heritage status and permissions", requirement: "Confirm national inventory/listing status and the approvals required from GMMB and other competent authorities.", evidence: "Written status confirmation and approvals pathway", packStatus: "Evidence required" },
  { id: "condition", group: "Conservation", title: "Condition and significance baseline", requirement: "Record fabric, deposits, hydrology, vegetation, threats, values and living relationships before intervention.", evidence: "Signed conservation baseline with mapped sensitivities", packStatus: "Evidence required" },
  { id: "management-plan", group: "Conservation", title: "Conservation management plan", requirement: "Define no-go areas, monitoring, maintenance, visitor carrying limits, emergency response and change control.", evidence: "Approved management plan and monitoring schedule", packStatus: "Evidence required" },
  { id: "collections", group: "Conservation", title: "Collections custody and rights", requirement: "Clarify ownership, custody, loan conditions, inventory, conservation, display, research and digital rights.", evidence: "Collections inventory, MoU and rights register", packStatus: "Evidence required" },
  { id: "design", group: "Design", title: "Coordinated professional design", requirement: "Coordinate architecture with structure, services, fire, accessibility, landscape, operations and exhibition requirements.", evidence: "Issued multidisciplinary design package and design-responsibility matrix", packStatus: "Concept documented" },
  { id: "safety", group: "Design", title: "Life safety and universal access", requirement: "Design safe evacuation, inclusive routes, sanitary facilities, safeguarding and emergency access.", evidence: "Code review, fire strategy, access audit and emergency plan", packStatus: "Evidence required" },
  { id: "environment", group: "Design", title: "Environment and infrastructure", requirement: "Test water, wastewater, energy, erosion, biodiversity, waste and construction impacts across the lifecycle.", evidence: "Environmental screening/assessment and engineered infrastructure plan", packStatus: "Evidence required" },
  { id: "cost", group: "Economics", title: "Independent cost plan", requirement: "Remeasure scope and include escalation, contingency, taxes, fees, exhibitions, external works and pre-opening costs.", evidence: "Signed cost plan with price base, assumptions and reconciliation", packStatus: "Concept documented" },
  { id: "demand", group: "Economics", title: "Demand and visitor model", requirement: "Test realistic visitor segments, seasonality, access constraints, pricing and conversion assumptions.", evidence: "Demand study with scenarios and evidence trail", packStatus: "Evidence required" },
  { id: "operations", group: "Economics", title: "Operating model", requirement: "Define staffing, conservation, maintenance, security, utilities, programmes, marketing and lifecycle renewal.", evidence: "Five-year operating plan and cash-flow scenarios", packStatus: "Evidence required" },
  { id: "funding", group: "Economics", title: "Capital and funding structure", requirement: "Separate confirmed funds, funding gap, restricted grants, sponsorship, philanthropy and any repayable finance.", evidence: "Sources-and-uses schedule and approved fundraising case", packStatus: "Evidence required" },
  { id: "procurement", group: "Delivery", title: "Procurement and integrity controls", requirement: "Set procurement routes, conflicts policy, tender records, change control, audit and transparent reporting.", evidence: "Approved procurement plan and integrity protocol", packStatus: "Evidence required" },
  { id: "programme", group: "Delivery", title: "Integrated delivery programme", requirement: "Link approvals, conservation, design, procurement, construction, exhibitions, recruitment, testing and opening.", evidence: "Logic-linked programme with dependencies, owners and contingencies", packStatus: "Concept documented" },
  { id: "community-benefit", group: "Impact", title: "Community benefit and supplier plan", requirement: "Translate participation into fair training, jobs, contracts, enterprise support and public reporting.", evidence: "Targets, baseline, selection rules and benefit dashboard", packStatus: "Evidence required" },
  { id: "measurement", group: "Impact", title: "Public-value measurement", requirement: "Measure heritage condition, learning, livelihoods, voice, environment and institutional capability.", evidence: "Baseline, indicator dictionary, data owners and reporting cadence", packStatus: "Evidence required" },
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
    outcome: "Shape benefits, safeguards and accessible opportunity.",
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
    outcome: "Define authority, protocols and living-heritage boundaries.",
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
    outcome: "Create a lawful, coordinated and accountable delivery pathway.",
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
    outcome: "Build traceable knowledge and responsible learning.",
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
    outcome: "Support verified milestones with clear public value.",
    actions: [
      "Select a defined layer: protect, design, build, interpret, operate or share value.",
      "Require the relevant diligence gate evidence before commitment.",
      "Agree use restrictions, reporting, safeguards and change control.",
      "Fund capability and operations alongside visible capital items.",
    ],
  },
  {
    id: "technical",
    label: "Technical or delivery partner",
    outcome: "Convert concept ambition into coordinated, maintainable systems.",
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
  { title: "Learning", measure: "School access, teacher support, research outputs and archive use", principle: "Turn evidence into shared capability" },
  { title: "Livelihoods", measure: "Local jobs, training, supplier spend, enterprise survival and progression", principle: "Measure who benefits and how" },
  { title: "Environment", measure: "Erosion, vegetation, water, waste, energy and visitor pressure", principle: "Manage culture and nature as one system" },
  { title: "Institution", measure: "Governance, finance, maintenance, data quality and reporting cadence", principle: "Build the capacity to sustain the place" },
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
    title: "Read layers, not isolated objects",
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
    title: "Small remains reveal large choices",
    question: "How can fruit stones survive for millennia?",
    explanation: "Charred or durable plant parts can be recovered, identified and counted. Their changing proportions help researchers study food use, but presence alone does not prove cultivation.",
    activity: "Sort a sample dataset by plant, phase and count, then write one supported conclusion and one question.",
  },
  {
    id: "technology",
    title: "Technology does not move in a straight line",
    question: "Why can stone, pottery and metal overlap?",
    explanation: "People select materials for availability, skill, function and meaning. A newer technology does not automatically or immediately replace an older one.",
    activity: "List modern technologies that coexist and use the comparison to critique a simple progress ladder.",
  },
  {
    id: "living-heritage",
    title: "A site can hold several kinds of value",
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
    activity: "Evidence detective: match each clue to what it can—and cannot—tell us.",
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
    question: "What does the earliest robust date establish?",
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
