export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
}

export const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title: 'AI/ML Learning in Nagpur | cloudsandai by Deven Dande',
    description:
      'Learn AI/ML with Deven Dande at cloudsandai. Explore beginner foundations and practical AI engineering with LLMs, RAG, APIs and agentic AI.',
    path: '/',
  },
  '/courses': {
    title: 'AI/ML Courses in Nagpur | cloudsandai',
    description:
      'Explore 16-week AI/ML Foundations and AI Engineering courses by Deven Dande, with live classes, LMS recordings, an ML capstone and three guided AI projects.',
    path: '/courses',
  },
  '/about': {
    title: 'Deven Dande | AI/ML Instructor at cloudsandai',
    description:
      'Learn about Deven Dande, the instructor behind cloudsandai, and his approach to teaching Python, machine learning, deep learning and applied AI.',
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
  '/resources/simple-linear-regression': {
    title: 'Simple Linear Regression Interactive Lab | cloudsandai',
    description:
      'See how a line learns from data. Adjust slope and bias, inspect prediction errors, and step through gradient descent in this hands-on simple linear regression lab.',
    path: '/resources/simple-linear-regression',
    ogImage: '/og-simple-linear-regression.png',
    ogImageAlt: 'A fitted blue regression line through data points, with dashed residuals showing prediction errors.',
  },
  '/resources/multiple-linear-regression': {
    title: 'Multiple Linear Regression Interactive Lab | cloudsandai',
    description:
      'See how four features combine to predict a home price. Adjust coefficients, standardize inputs, and watch gradient descent improve predictions in this interactive multiple linear regression lab.',
    path: '/resources/multiple-linear-regression',
    ogImage: '/og-multiple-linear-regression.png',
    ogImageAlt: 'Four home features contribute to a prediction, shown beside a plot comparing predicted and actual prices.',
  },
  '/resources/logistic-classification': {
    title: 'Binary Classification with Logistic Regression | cloudsandai',
    description:
      'Explore how logistic regression estimates class probabilities, draws a decision boundary, and turns probabilities into predictions using a threshold in this interactive classification lab.',
    path: '/resources/logistic-classification',
    ogImage: '/og-logistic-classification.png',
    ogImageAlt: 'Two classes of observations separated by a logistic regression decision boundary.',
  },
  '/resources/decision-tree-classification': {
    title: 'Decision Tree Classification Interactive Lab | cloudsandai',
    description:
      'Explore interpretable decision tree rules, compare Gini impurity with entropy, and visualize how tree depth shapes nonlinear classification regions in this hands-on lab.',
    path: '/resources/decision-tree-classification',
    ogImage: '/og-decision-tree-classification.png',
    ogImageAlt: 'Two class clusters divided into rectangular decision regions by a decision tree.',
  },
};

const organization = {
  '@type': 'EducationalOrganization',
  '@id': 'https://cloudsandai.com/#organization',
  name: 'cloudsandai',
  alternateName: 'Clouds and AI',
  url: 'https://cloudsandai.com/',
  logo: 'https://cloudsandai.com/logo_cropped.png',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nagpur',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/cloudsandai',
    'https://www.instagram.com/cloudsandaidotcom',
    'https://www.youtube.com/@cloudsandai',
  ],
};

const instructor = {
  '@type': 'Person',
  '@id': 'https://cloudsandai.com/#deven-dande',
  name: 'Deven Dande',
  jobTitle: 'AI/ML Instructor',
  url: 'https://cloudsandai.com/about',
  sameAs: 'https://www.linkedin.com/in/devendande',
  worksFor: { '@id': 'https://cloudsandai.com/#organization' },
};

const website = {
  '@type': 'WebSite',
  '@id': 'https://cloudsandai.com/#website',
  url: 'https://cloudsandai.com/',
  name: 'cloudsandai',
  publisher: { '@id': 'https://cloudsandai.com/#organization' },
  inLanguage: 'en-IN',
};

export function getStructuredData(path: string) {
  if (path === '/') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        { ...organization, founder: { '@id': instructor['@id'] } },
        website,
        instructor,
      ],
    };
  }

  if (path === '/courses') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        website,
        {
          '@type': 'ItemList',
          '@id': 'https://cloudsandai.com/courses#course-list',
          name: 'AI/ML courses at cloudsandai',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'AI/ML Foundations',
              url: 'https://cloudsandai.com/courses#course-1',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'AI Engineering',
              url: 'https://cloudsandai.com/courses#course-2',
            },
          ],
        },
      ],
    };
  }

  if (path === '/about') {
    return {
      '@context': 'https://schema.org',
      '@graph': [organization, instructor],
    };
  }

  return null;
}

export function normalizePath(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return pageMetadata[path] ? path : '/';
}