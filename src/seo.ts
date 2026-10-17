export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
}

export const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title: 'Free AI & Machine Learning Resources | cloudsandai',
    description:
      'Explore free AI and machine learning tutorials and interactive labs. Paid 16-week programs offer guided learning, practical projects and AWS deployment.',
    path: '/',
  },
  '/courses': {
    title: 'Structured AI & Machine Learning Programs | cloudsandai',
    description:
      'Explore cloudsandai’s paid 16-week AI/ML Foundations and AI Engineering programs, with guided curricula, practical projects, workshops and limited-seat cohorts.',
    path: '/courses',
  },
  '/about': {
    title: 'About cloudsandai | AI, ML & Cloud Learning',
    description:
      'Learn about Deven Dande, the instructor behind cloudsandai, and his approach to teaching Python, machine learning, deep learning and applied AI.',
    path: '/about',
  },
  '/contact': {
    title: 'Contact cloudsandai | AI & Cloud Learning',
    description:
      'Contact cloudsandai with questions about free learning resources, the AI/ML curriculum, structured programs, or an appointment with Deven.',
    path: '/contact',
  },
  '/resources': {
    title: 'AI & Machine Learning Learning Resources | cloudsandai',
    description:
      'Explore free interactive regression and classification labs, plus learning pathways for Python, deep learning, generative AI, AWS and cloud engineering.',
    path: '/resources',
  },
  '/labs': {
    title: 'Interactive AI & Cloud Engineering Labs | cloudsandai',
    description:
      'Explore free machine learning labs and the planned vision for advanced AI simulations, model-training experiments and AWS/cloud engineering labs. Subscription access is coming soon.',
    path: '/labs',
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
  worksFor: { '@id': 'https://cloudsandai.com/#organization' },
};

const website = {
  '@type': 'WebSite',
  '@id': 'https://cloudsandai.com/#website',
  url: 'https://cloudsandai.com/',
  name: 'cloudsandai',
  description: 'Free AI and machine learning resources, with structured AI engineering programs that include AWS cloud deployment.',
  publisher: { '@id': 'https://cloudsandai.com/#organization' },
  inLanguage: 'en',
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
  if (path === '/articles') return '/resources';
  return pageMetadata[path] ? path : '/';
}