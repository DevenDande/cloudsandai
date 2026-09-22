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
      'Explore cloudsandai AI and machine learning courses in Nagpur, from mathematics and Python foundations to ML and deep learning.',
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
};

export function normalizePath(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return pageMetadata[path] ? path : '/';
}