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
    label: "AI-generated illustration · not documentary evidence",
    caption: "A visual reading of stratigraphy and quartz evidence; not a photograph or measured reconstruction of Bosumpra.",
  },
  evidence: {
    material: {
      src: "/media/evidence-material.webp",
      alt: "Interpretive archaeology worktable with quartz flakes and stone tools arranged for material study.",
      label: "AI-generated illustration · not documentary evidence",
      caption: "Material evidence shown as an editorial study scene; object arrangement is illustrative.",
    },
    enquiry: {
      src: "/media/evidence-research.webp",
      alt: "Interpretive archaeological research desk with field notes, sample trays and plant remains under laboratory light.",
      label: "AI-generated illustration · not documentary evidence",
      caption: "A composite research scene representing changing archaeological methods, not an archival photograph.",
    },
    living: {
      src: "/media/evidence-living.webp",
      alt: "Interpretive view of people caring for a green plateau landscape near a sandstone rockshelter.",
      label: "AI-generated illustration · not documentary evidence",
      caption: "A respectful stewardship scene inspired by the Kwahu landscape; not documentary footage of Bosumpra.",
    },
  },
  museum: [
    {
      src: "/media/museum-basement.webp",
      alt: "Concept visualisation of a conservation workspace with collections tables and stone material finishes.",
      label: "AI-generated concept image · not an approved design",
      caption: "Below ground · proposed conservation and collections care.",
    },
    {
      src: "/media/museum-ground.webp",
      alt: "Concept visualisation of a circular museum arrival and exhibition space with warm stone and timber finishes.",
      label: "AI-generated concept image · not an approved design",
      caption: "Ground level · proposed welcome and exhibition encounter.",
    },
    {
      src: "/media/museum-first.webp",
      alt: "Concept visualisation of a museum learning and gathering hall with a radial roof structure.",
      label: "AI-generated concept image · not an approved design",
      caption: "First floor · proposed learning and gathering spaces.",
    },
    {
      src: "/media/museum-second.webp",
      alt: "Concept visualisation of a shaded upper-level terrace overlooking a forested plateau landscape.",
      label: "AI-generated concept image · not an approved design",
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
    label: "AI-generated illustration · not documentary evidence",
    caption: "An illustration of archaeological fieldwork—not a photograph, site record or measured reconstruction of Bosumpra.",
  },
  project: {
    src: "/media/page-project.webp",
    alt: "Concept exterior of a circular stone and timber museum embedded in a green plateau landscape.",
    label: "AI-generated concept image · not an approved design",
    caption: "A concept image of the proposed museum programme—not an approved architectural rendering or evidence of construction status.",
  },
  community: {
    src: "/media/page-community.webp",
    alt: "Interpretive scene of local guides, artisans and learners sharing skills in an outdoor shaded workspace.",
    label: "AI-generated illustration · not documentary evidence",
    caption: "A community-benefit scenario—not a photograph of current participants, employment or promised jobs.",
  },
  invest: {
    src: "/media/page-invest.webp",
    alt: "Interpretive project partnership session overlooking the proposed museum landscape, with physical models and planning materials.",
    label: "AI-generated illustration · not documentary evidence",
    caption: "A partnership-planning scenario—not actual partners, committed funding, approved capital or a financial offer.",
  },
  visit: {
    src: "/media/page-visit.webp",
    alt: "Interpretive guided approach through a lush plateau landscape toward a sandstone rockshelter.",
    label: "AI-generated illustration · not documentary evidence",
    caption: "A future visitor-journey concept—not a photograph of current access, facilities or a verified route to Bosumpra.",
  },
  research: {
    src: "/media/page-research.webp",
    alt: "Interpretive archaeological laboratory scene with sample bags, botanical remains, quartz artefacts and documentation tools.",
    label: "AI-generated illustration · not documentary evidence",
    caption: "A composite research environment—not a photograph of current collections, equipment or facilities.",
  },
  record: {
    src: "/media/page-record.webp",
    alt: "Interpretive project archive desk with architectural drawings, evidence registers, photographs and material samples.",
    label: "AI-generated illustration · not documentary evidence",
    caption: "A proposed record-workspace metaphor. The depicted records are fictional and do not show that project documents exist.",
  },
} satisfies Record<string, VisualAsset>;
