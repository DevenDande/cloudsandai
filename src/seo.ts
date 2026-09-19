export interface PageMetadata {
  title: string;
  description: string;
  path: string;
}

export const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title: 'cloudsandai — Machine Learning & Deep Learning Courses',
    description:
      'Learn mathematics, statistics, programming, machine learning and deep learning through a structured, instructor-led curriculum.',
    path: '/',
  },
  '/courses': {
    title: 'Machine Learning & Deep Learning Courses | cloudsandai',
    description:
      'Explore cloudsandai courses in machine learning, mathematics, statistics, programming, scientific computing and deep neural networks.',
    path: '/courses',
  },
  '/about': {
    title: 'About cloudsandai | Foundations-First AI/ML Learning',
    description:
      'Learn about cloudsandai, its foundations-first teaching approach, and instructor Deven Dande.',
    path: '/about',
  },
  '/contact': {
    title: 'Contact cloudsandai | Course Enquiries',
    description:
      'Contact Deven Dande with questions about cloudsandai machine learning and deep learning courses.',
    path: '/contact',
  },
};

export function normalizePath(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return pageMetadata[path] ? path : '/';
}