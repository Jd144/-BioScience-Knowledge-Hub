import { BiotechNewsArticle } from '../types/index.ts';

export const BIOTECH_NEWS: BiotechNewsArticle[] = [
  {
    id: 'news-dcgi-biosimilar-01',
    title: 'CDSCO Approves Indigenous Recombinant Monoclonal Antibody for Age-Related Macular Degeneration',
    slug: 'cdsco-approves-indigenous-ranibizumab-biosimilar',
    category: 'Regulatory & DCGI/FDA',
    summary: 'The Central Drugs Standard Control Organisation (CDSCO) has granted market authorization for an indigenous ranibizumab biosimilar, substantially reducing therapeutic costs for retinal neovascular disorders.',
    content: [
      'The Subject Expert Committee (SEC) of CDSCO reviewed Phase III multicentric clinical trial comparative data demonstrating pharmacokinetic and clinical equivalence to the innovator product Lucentis.',
      'Manufactured using recombinant Pichia pastoris expression systems with high-yield downstream tangential flow purification, the drug marks another major milestone for Indian biopharmaceutical process engineering.',
      'Industry experts note that localized production will reduce treatment expenses by over 60%, making critical ophthalmic biologics accessible to wider patient demographics.'
    ],
    sourceOutlet: 'CDSCO SEC Recommendations / Press Information Bureau (PIB) Science Desk',
    sourceUrl: 'https://cdsco.gov.in',
    publishedDate: '2026-03-27',
    isVerified: true,
    keyTakeaways: [
      'Biosimilar approval achieved using Pichia pastoris yeast expression system',
      'Phase III clinical trials demonstrated equivalent efficacy and safety in macular edema',
      'Marks a >60% projected reduction in per-injection therapeutic costs'
    ]
  },
  {
    id: 'news-bioeconomy-report-02',
    title: 'India BioEconomy Report 2026: Bio-Industrial Manufacturing and Diagnostics Surge',
    slug: 'india-bioeconomy-report-2026-milestone',
    category: 'Industry & Biopharma',
    summary: 'The Biotechnology Industry Research Assistance Council (BIRAC) reports robust double-digit growth in national biomanufacturing capacity, propelled by biosimilars, green bioplastics, and point-of-care molecular diagnostics.',
    content: [
      'According to the latest sector analysis released at Global Bio-India, the national bioeconomy has reached over $130 billion, with biopharma contributing the largest share (52%), followed by bio-agriculture and bio-industrial manufacturing.',
      'The growth is bolstered by the BioE3 (Biotechnology for Economy, Environment and Employment) Policy, which supports green synthesis, synthetic biology hubs, and carbon-smart microbial platforms.',
      'Over 8,500 active biotechnology startups are currently registered, with significant clusters expanding across Bengaluru, Hyderabad, Pune, NCR, and Ahmedabad.'
    ],
    sourceOutlet: 'BIRAC / Department of Biotechnology (DBT)',
    sourceUrl: 'https://birac.nic.in',
    publishedDate: '2026-03-24',
    isVerified: true,
    keyTakeaways: [
      'Indian Bioeconomy reaches $130+ Billion valuation milestone',
      'BioE3 policy catalyzing investment in synthetic biology & microbial biomanufacturing',
      'Startup count exceeds 8,500 bio-enterprises across Tier-1 and Tier-2 research hubs'
    ]
  },
  {
    id: 'news-crispr-somatic-03',
    title: 'ICMR Releases Updated National Guidelines for Somatic Cell Gene Therapy Clinical Trials',
    slug: 'icmr-somatic-cell-gene-therapy-guidelines-update',
    category: 'Regulatory & DCGI/FDA',
    summary: 'The Indian Council of Medical Research (ICMR) and DBT have updated the national framework governing in vivo and ex vivo CRISPR-Cas9 genome editing trials for sickle cell disease and beta-thalassemia.',
    content: [
      'The revised guidelines delineate stringent risk assessment protocols for off-target cleavage, insertional oncogenesis, and viral vector titer validation.',
      'Mandatory registration with the National Bioethics Committee and the Institutional Committee for Stem Cell Research (IC-SCR) is reiterated, maintaining a strict global prohibition on germline genetic modification.',
      'The framework includes expedited review pathways for academic investigational new drug (IND) applications targeting rare monogenic hemoglobinopathies.'
    ],
    sourceOutlet: 'ICMR Ethical Guidelines Bulletin / DBT Biosafety Portal',
    sourceUrl: 'https://main.icmr.nic.in',
    publishedDate: '2026-03-18',
    isVerified: true,
    keyTakeaways: [
      'Stringent NGS off-target detection required before clinical candidate progression',
      'Strict prohibition on germline gene editing upheld',
      'Fast-track institutional ethics review for hemoglobinopathy somatic trials'
    ]
  },
  {
    id: 'news-genome-edited-mustard-04',
    title: 'Field Trial Evaluation of Low-Glucosinolate Genome-Edited Mustard Yields Promising Results',
    slug: 'genome-edited-brassica-field-trials-update',
    category: 'Agri-Biotech',
    summary: 'ICAR-National Institute for Plant Biotechnology (NIPB) researchers report significant reduction of glucosinolate levels in mustard seeds via targeted CRISPR-Cas9 mutagenesis of transporter genes without compromising plant defense against pests.',
    content: [
      'Wild Brassica juncea varieties contain high seed glucosinolate levels, rendering the oil pungent and seed meal unpalatable to livestock in higher quantities.',
      'By knocking out specific GTR (Glucosinolate Transporter) alleles using non-transgenic SDN-1/SDN-2 genome editing protocols exempted under MoEFCC guidelines, researchers concentrated defensive glucosinolates in vegetative leaves while keeping seeds sweet and low-toxin.',
      'Multi-location agronomic trials in Rajasthan, Punjab, and Haryana showed standard yield metrics with enhanced meal nutrition.'
    ],
    sourceOutlet: 'ICAR-NIPB Research Bulletin / MoEFCC Biosafety Clearance Notice',
    sourceUrl: 'https://nipb.icar.gov.in',
    publishedDate: '2026-03-12',
    isVerified: true,
    keyTakeaways: [
      'Targeted knockout of GTR transporter genes redirects defense compounds to leaves',
      'Seed meal becomes rich protein feed for cattle without antinutritional glucosinolates',
      'Compliant with India SDN-1 non-transgenic biosafety regulatory exemptions'
    ]
  }
];
