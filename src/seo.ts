export interface PageMetadata {
  title: string;
  description: string;
  path: string;
}

export const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title: 'cloudsandai | AI & Machine Learning Courses in Nagpur',
    description:
      'cloudsandai offers AI and machine learning courses and classes in Nagpur, covering mathematics, Python, ML and deep learning.',
    path: '/',
  },
  '/courses': {
    title: 'AI & Machine Learning Courses in Nagpur | cloudsandai',
    description:
      'Explore the cloudsandai Machine Learning course in Nagpur, with Python for Machine Learning, scientific computing, integrated implementation and deep learning.',
    path: '/courses',
  },
  '/about': {
    title: 'About cloudsandai | AI/ML Education in Nagpur',
    description:
      'Learn about cloudsandai, an AI and machine learning education initiative in Nagpur with a foundations-first curriculum in mathematics, Python, ML and deep learning.',
    path: '/about',
  },
  '/contact': {
    title: 'Contact cloudsandai | AI/ML Courses in Nagpur',
    description:
      'Contact cloudsandai about AI and machine learning courses in Nagpur, including mathematics, Python, ML and deep learning programs.',
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