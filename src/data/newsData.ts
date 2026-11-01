import { BiotechNewsArticle } from '../types/index.ts';

export const BIOTECH_NEWS: BiotechNewsArticle[] = [
  {
    id: 'news-dcgi-biosimilar-01',
    title: 'CDSCO SEC Reviews Recombinant Ranibizumab Biosimilar Filing (Secondary Review)',
    slug: 'cdsco-approves-indigenous-ranibizumab-biosimilar',
    category: 'Regulatory & DCGI/FDA',
    summary: 'The Central Drugs Standard Control Organisation (CDSCO) Subject Expert Committee considered evaluation data for ranibizumab biosimilar submissions aimed at reducing therapeutic costs for retinal neovascularization.',
    content: [
      'Evaluation was based on Phase III comparative pharmacokinetic and clinical equivalence to reference ranibizumab.',
      'Manufactured using recombinant yeast (Pichia pastoris) expression systems with downstream tangential flow ultrafiltration.',
      'NOTE: This record is summarized from general regulatory filings and press coverage. Direct deep Gazette notification link is not archived; marked as UNVERIFIED.',
    ],
    sourceOutlet: 'CDSCO Subject Expert Committee Recommendations / General Industry Press',
    sourceUrl: 'https://cdsco.gov.in',
    publishedDate: '2026-03-27',
    isVerified: false,
    keyTakeaways: [
      'Status: UNVERIFIED (General portal citation only; specific deep URL awaiting official archive)',
      'Biosimilar evaluation using Pichia pastoris expression system',
      'Aims at expanding accessibility for age-related macular degeneration biologics'
    ]
  },
  {
    id: 'news-bioeconomy-report-02',
    title: 'India BioEconomy Review: Bio-Industrial Manufacturing & Biopharma Overview',
    slug: 'india-bioeconomy-report-2026-milestone',
    category: 'Industry & Biopharma',
    summary: 'Biotechnology Industry Research Assistance Council (BIRAC) sectoral overviews highlight national expansion in biomanufacturing, recombinant therapeutics, and industrial biotechnology clusters.',
    content: [
      'Sectoral reviews presented at national bio-summits outline substantial growth across biopharmaceuticals, green biomanufacturing, and bio-agriculture.',
      'Supported by the BioE3 (Biotechnology for Economy, Environment and Employment) national initiative promoting sustainable synthetic biology hubs.',
      'NOTE: Referenced to BIRAC corporate portal overview. Direct publication PDF link is in curation; marked as UNVERIFIED.',
    ],
    sourceOutlet: 'BIRAC / Department of Biotechnology (General Portal)',
    sourceUrl: 'https://birac.nic.in',
    publishedDate: '2026-03-24',
    isVerified: false,
    keyTakeaways: [
      'Status: UNVERIFIED (Referenced to general BIRAC portal; detailed report link pending)',
      'BioE3 framework supporting biomanufacturing and synthetic biology infrastructure',
      'Biopharma continues to represent the largest segment of biotechnology output'
    ]
  },
  {
    id: 'news-crispr-somatic-03',
    title: 'ICMR / DBT Somatic Cell Gene Therapy Clinical Guidelines Framework',
    slug: 'icmr-somatic-cell-gene-therapy-guidelines-update',
    category: 'Regulatory & DCGI/FDA',
    summary: 'National regulatory guidelines delineate protocols governing in vivo and ex vivo somatic genome editing trials, while maintaining strict prohibitions on germline modifications.',
    content: [
      'Guidelines specify requirements for rigorous NGS off-target detection, insertional mutagenesis risk screening, and vector safety profiling.',
      'Reiterates mandatory institutional oversight via Institutional Committee for Stem Cell Research (IC-SCR) and national bioethics committees.',
      'NOTE: Referenced to ICMR portal. Full gazette notification reference is in archival verification; marked as UNVERIFIED.',
    ],
    sourceOutlet: 'ICMR Guidelines Section (General Portal)',
    sourceUrl: 'https://main.icmr.nic.in',
    publishedDate: '2026-03-18',
    isVerified: false,
    keyTakeaways: [
      'Status: UNVERIFIED (Institutional portal reference; specific guideline circular undergoing verification)',
      'Stringent pre-clinical NGS validation required for somatic cell gene therapy',
      'Absolute prohibition on human germline genetic modification reaffirmed'
    ]
  },
  {
    id: 'news-genome-edited-mustard-04',
    title: 'ICAR Genome-Edited Low-Glucosinolate Mustard Research Developments',
    slug: 'genome-edited-brassica-field-trials-update',
    category: 'Agri-Biotech',
    summary: 'Agricultural researchers report targeted mutagenesis of glucosinolate transporter (GTR) genes in mustard to reduce seed glucosinolate levels while preserving vegetative defense.',
    content: [
      'Wild Brassica juncea produces high seed glucosinolates, which impart pungency and restrict livestock meal usage.',
      'Targeted knockout of GTR transporter alleles via non-transgenic genome editing redirects defensive glucosinolates to foliage.',
      'NOTE: Referenced to ICAR-NIPB research domain; individual multi-location trial gazette link is in verification; marked as UNVERIFIED.',
    ],
    sourceOutlet: 'ICAR-NIPB Research Portal (General Institutional Reference)',
    sourceUrl: 'https://nipb.icar.gov.in',
    publishedDate: '2026-03-12',
    isVerified: false,
    keyTakeaways: [
      'Status: UNVERIFIED (General research institute reference; multi-center trial report pending archive link)',
      'Targeted GTR transporter modification lowers seed meal anti-nutritional compounds',
      'Complies with national non-transgenic SDN-1/SDN-2 biosafety guidelines'
    ]
  }
];
