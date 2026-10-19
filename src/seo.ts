export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
}

export const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title: 'Interactive AI, ML & Cloud Learning Platform | cloudsandai',
    description:
      'Learn AI, machine learning and cloud engineering with free resources and browser-based ML experiments, with practical AI labs on the roadmap.',
    path: '/',
  },
  '/courses': {
    title: 'Optional AI/ML & AI Engineering Programs | cloudsandai',
    description:
      'Explore optional structured 16-week programs in AI/ML Foundations and AI Engineering, alongside their curricula, practical projects and workshop information.',
    path: '/courses',
  },
  '/about': {
    title: 'About cloudsandai | Interactive AI & Cloud Learning',
    description:
      'Discover cloudsandai, an interactive AI and cloud learning platform with free resources and browser-based machine learning experiments, building toward practical engineering experiences.',
    path: '/about',
  },
  '/contact': {
    title: 'Contact cloudsandai | AI & Cloud Learning Platform',
    description:
      'Contact cloudsandai with questions about free learning resources, the AI/ML curriculum, structured programs, or an appointment with Deven.',
    path: '/contact',
  },
  '/resources': {
    title: 'Free AI & Machine Learning Resources | cloudsandai',
    description:
      'Explore free browser-based machine learning experiments in regression, classification and unsupervised learning, with learning pathways for AI, Python, deep learning and cloud engineering.',
    path: '/resources',
  },
  '/labs': {
    title: 'Interactive AI Labs | cloudsandai',
    description:
      'Explore 11 free interactive machine-learning labs on cloudsandai. Experiment with regression, classification, clustering, decision trees, and neural networks.',
    path: '/labs/',
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
  '/resources/k-means-clustering': {
    title: 'K-Means Clustering Interactive Lab | cloudsandai',
    description: 'Explore unsupervised learning with an interactive K-Means lab. Adjust the number of clusters and iterations, watch centroids move, and inspect point assignments.',
    path: '/resources/k-means-clustering',
  },
  '/resources/knn-classification': {
    title: 'K-Nearest Neighbors Interactive Lab | cloudsandai',
    description: 'Explore K-nearest neighbors classification. Adjust k, inspect decision regions, and predict classes for custom feature values.',
    path: '/resources/knn-classification',
  },
  '/resources/naive-bayes': {
    title: 'Gaussian Naive Bayes Interactive Lab | cloudsandai',
    description: 'Explore Gaussian Naive Bayes classification with feature distributions, adjustable variance smoothing, and interactive class predictions.',
    path: '/resources/naive-bayes',
  },
  '/resources/random-forest': {
    title: 'Random Forest Interactive Lab | cloudsandai',
    description: 'Explore random forest classification by adjusting the number of decision trees and comparing predictions across the feature space.',
    path: '/resources/random-forest',
  },
  '/resources/support-vector-machine': {
    title: 'Support Vector Machine Interactive Lab | cloudsandai',
    description: 'Explore a linear support vector machine, inspect its maximum-margin decision regions, and adjust regularization in an interactive lab.',
    path: '/resources/support-vector-machine',
  },
  '/resources/pca': {
    title: 'Principal Component Analysis Interactive Lab | cloudsandai',
    description: 'Explore principal component analysis by projecting standardized feature data and comparing variance explained by each component.',
    path: '/resources/pca',
  },
  '/resources/neural-network': {
    title: 'Neural Network Classification Interactive Lab | cloudsandai',
    description: 'Train a small neural network in your browser, adjust hidden units and training epochs, and inspect its classification regions.',
    path: '/resources/neural-network',
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
  description: 'An interactive AI and cloud learning platform with free resources, browser-based machine learning experiments and practical engineering experiences.',
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