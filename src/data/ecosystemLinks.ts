/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Ecosystem Navigation & Cross-Platform Integration
 * Connects BioScience Hub with BioScience Mastery.
 */

export const BIOSCIENCE_MASTERY_URLS = {
  HOME: 'https://biosciencemasterycom.vercel.app/en',
  EXAMS_PORTAL: 'https://biosciencemasterycom.vercel.app/en/exams',
  GAT_B_COURSE: 'https://biosciencemasterycom.vercel.app/en/courses/gat-b',
  APPROACH: 'https://biosciencemasterycom.vercel.app/en#approach',
};

/**
 * Returns the verified route on BioScience Mastery for the 6 supported exams.
 * If an exam-specific course route does not yet exist on Mastery,
 * it safely falls back to the official Mastery exam portal (/en/exams).
 */
export function getMasteryExamPrepUrl(examCodeOrSlug: string): {
  url: string;
  isSpecificRoute: boolean;
  examName: string;
} {
  const normalized = (examCodeOrSlug || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (normalized.includes('gatb') || normalized === 'gatb') {
    return {
      url: BIOSCIENCE_MASTERY_URLS.GAT_B_COURSE,
      isSpecificRoute: true,
      examName: 'GAT-B',
    };
  }

  if (normalized.includes('dbtjrf') || normalized.includes('bet')) {
    return {
      url: BIOSCIENCE_MASTERY_URLS.EXAMS_PORTAL,
      isSpecificRoute: false,
      examName: 'DBT-JRF / BET',
    };
  }

  if (normalized.includes('gate') || normalized.includes('gatebt')) {
    return {
      url: BIOSCIENCE_MASTERY_URLS.EXAMS_PORTAL,
      isSpecificRoute: false,
      examName: 'GATE Biotechnology',
    };
  }

  if (normalized.includes('iitjam') || normalized.includes('jam')) {
    return {
      url: BIOSCIENCE_MASTERY_URLS.EXAMS_PORTAL,
      isSpecificRoute: false,
      examName: 'IIT JAM Biotechnology',
    };
  }

  if (normalized.includes('cuet') || normalized.includes('cuetpg')) {
    return {
      url: BIOSCIENCE_MASTERY_URLS.EXAMS_PORTAL,
      isSpecificRoute: false,
      examName: 'CUET-PG Life Sciences',
    };
  }

  if (normalized.includes('csir') || normalized.includes('csirnet') || normalized.includes('net')) {
    return {
      url: BIOSCIENCE_MASTERY_URLS.EXAMS_PORTAL,
      isSpecificRoute: false,
      examName: 'CSIR-NET Life Sciences',
    };
  }

  // Default fallback
  return {
    url: BIOSCIENCE_MASTERY_URLS.EXAMS_PORTAL,
    isSpecificRoute: false,
    examName: 'All 6 National Examinations',
  };
}
