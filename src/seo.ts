export interface PageMetadata {
  title: string;
  description: string;
  path: string;
}

export const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title: 'cloudsandai by Deven Dande | AI/ML Classes in Nagpur',
    description:
      'Looking for AI/ML classes in Nagpur? Learn machine learning, deep learning, Python and mathematics with Deven Dande at cloudsandai (Clouds and AI).',
    path: '/',
  },
  '/courses': {
    title: 'AI & Machine Learning Courses in Nagpur | cloudsandai',
    description:
      'Explore instructor-led AI and machine learning courses in Nagpur with Deven Dande. Learn mathematics, Python, scientific computing, machine learning and deep learning.',
    path: '/courses',
  },
  '/about': {
    title: 'About Deven Dande and cloudsandai | Nagpur',
    description:
      'Meet Deven Dande, founder and AI/ML instructor at cloudsandai (Clouds and AI), offering foundations-first machine learning education in Nagpur.',
    path: '/about',
  },
  '/contact': {
    title: 'Contact cloudsandai | AI/ML Courses in Nagpur',
    description:
      'Contact Deven Dande at cloudsandai to ask about AI and machine learning classes in Nagpur, course options, mathematics, Python or deep learning.',
    path: '/contact',
  },
  '/articles': {
    title: 'Articles | cloudsandai',
    description:
      'Explore articles on machine learning, artificial intelligence, mathematics and learning at cloudsandai.',
    path: '/articles',
  },
  '/resources': {
    title: 'Resources | cloudsandai',
    description:
      'Explore practical machine learning and artificial intelligence learning resources from cloudsandai.',
    path: '/resources',
  },
};

export function normalizePath(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return pageMetadata[path] ? path : '/';
}