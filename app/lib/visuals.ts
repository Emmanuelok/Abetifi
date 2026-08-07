export type VisualAsset = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  credit?: string;
};

export const landingVisuals = {
  deepTime: {
    src: "/media/deep-time-stratigraphy.webp",
    alt: "Interpretive close view of an archaeological excavation profile with quartz evidence embedded in layered earth.",
    label: "Original interpretive visualisation",
    caption: "A visual reading of stratigraphy and quartz evidence; not a photograph or measured reconstruction of Bosumpra.",
  },
  evidence: {
    material: {
      src: "/media/evidence-material.webp",
      alt: "Interpretive archaeology worktable with quartz flakes and stone tools arranged for material study.",
      label: "Original interpretive visualisation",
      caption: "Material evidence shown as an editorial study scene; object arrangement is illustrative.",
    },
    enquiry: {
      src: "/media/evidence-research.webp",
      alt: "Interpretive archaeological research desk with field notes, sample trays and plant remains under laboratory light.",
      label: "Original interpretive visualisation",
      caption: "A composite research scene representing changing archaeological methods, not an archival photograph.",
    },
    living: {
      src: "/media/evidence-living.webp",
      alt: "Interpretive view of people caring for a green plateau landscape near a sandstone rockshelter.",
      label: "Original interpretive visualisation",
      caption: "A respectful stewardship scene inspired by the Kwahu landscape; not documentary footage of Bosumpra.",
    },
  },
  museum: [
    {
      src: "/media/museum-basement.webp",
      alt: "Concept visualisation of a conservation workspace with collections tables and stone material finishes.",
      label: "Concept visualisation",
      caption: "Below ground · proposed conservation and collections care.",
    },
    {
      src: "/media/museum-ground.webp",
      alt: "Concept visualisation of a circular museum arrival and exhibition space with warm stone and timber finishes.",
      label: "Concept visualisation",
      caption: "Ground level · proposed welcome and exhibition encounter.",
    },
    {
      src: "/media/museum-first.webp",
      alt: "Concept visualisation of a museum learning and gathering hall with a radial roof structure.",
      label: "Concept visualisation",
      caption: "First floor · proposed learning and gathering spaces.",
    },
    {
      src: "/media/museum-second.webp",
      alt: "Concept visualisation of a shaded upper-level terrace overlooking a forested plateau landscape.",
      label: "Concept visualisation",
      caption: "Second floor · proposed hospitality and outlook.",
    },
  ],
} satisfies {
  deepTime: VisualAsset;
  evidence: Record<string, VisualAsset>;
  museum: VisualAsset[];
};

export const pageVisuals = {
  heritage: {
    src: "/media/page-heritage.webp",
    alt: "Interpretive archaeological excavation scene showing a careful stratigraphic investigation in a sandstone shelter.",
    label: "Original interpretive visualisation",
    caption: "The archaeological process is visualised here; this is not a documentary image of an excavation at Bosumpra.",
  },
  project: {
    src: "/media/page-project.webp",
    alt: "Concept exterior of a circular stone and timber museum embedded in a green plateau landscape.",
    label: "Concept visualisation",
    caption: "An atmospheric interpretation of the proposed programme, subject to design, cost, conservation and approval gates.",
  },
  community: {
    src: "/media/page-community.webp",
    alt: "Interpretive scene of local guides, artisans and learners sharing skills in an outdoor shaded workspace.",
    label: "Original interpretive visualisation",
    caption: "A community-benefit scenario, not a photograph of current employment or a promise of future jobs.",
  },
  invest: {
    src: "/media/page-invest.webp",
    alt: "Interpretive project partnership session overlooking the proposed museum landscape, with physical models and planning materials.",
    label: "Original interpretive visualisation",
    caption: "A partnership-planning scenario; it does not depict committed funders, approved capital or a financial offer.",
  },
  visit: {
    src: "/media/page-visit.webp",
    alt: "Interpretive guided approach through a lush plateau landscape toward a sandstone rockshelter.",
    label: "Original interpretive visualisation",
    caption: "A future visitor-journey concept inspired by the Kwahu landscape; current access arrangements remain unverified.",
  },
  research: {
    src: "/media/page-research.webp",
    alt: "Interpretive archaeological laboratory scene with sample bags, botanical remains, quartz artefacts and documentation tools.",
    label: "Original interpretive visualisation",
    caption: "A composite research environment, not a photograph of the current collections or facilities.",
  },
  record: {
    src: "/media/page-record.webp",
    alt: "Interpretive project archive desk with architectural drawings, evidence registers, photographs and material samples.",
    label: "Original interpretive visualisation",
    caption: "A visual metaphor for controlled project records; generated text and document details are not evidence.",
  },
} satisfies Record<string, VisualAsset>;
