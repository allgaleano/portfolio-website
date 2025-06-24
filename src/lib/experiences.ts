export interface ExperienceEntry {
  id: number;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  type: string;
}

/**
 * Formats a date string according to the specified locale
 */
export function formatDate(dateString: string, lang: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long' 
  };
  
  return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', options);
}

/**
 * Checks if a position is currently active
 */
export function isCurrent(endDate: string): boolean {
  const currentTerms = ['present', 'presente', 'actual'];
  if (currentTerms.includes(endDate.toLowerCase())) {
    return true;
  }
  
  try {
    return new Date(endDate) > new Date();
  } catch {
    return false;
  }
}

/**
 * Calculates the duration between two dates
 */
export function calculateDuration(startDate: string, endDate: string, lang: string): string {
  const start = new Date(startDate);
  const end = isCurrent(endDate) ? new Date() : new Date(endDate);
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (lang === 'es') {
    if (years === 0) {
      return `${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'año' : 'años'}`;
    } else {
      return `${years} ${years === 1 ? 'año' : 'años'} ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
    }
  } else {
    if (years === 0) {
      return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    } else {
      return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    }
  }
}

/**
 * Sorts experiences by start date (most recent first)
 */
export function sortExperiencesByDate(experiences: any[]): any[] {
  return experiences.sort((a, b) => {
    return new Date(b.data.startDate).getTime() - new Date(a.data.startDate).getTime();
  });
}

/**
 * Groups experiences by year
 */
export function groupExperiencesByYear(experiences: any[]): Record<number, any[]> {
  return experiences.reduce((groups, experience) => {
    const year = new Date(experience.data.startDate).getFullYear();
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(experience);
    return groups;
  }, {} as Record<number, any[]>);
}