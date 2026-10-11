export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
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

export function normalizePath(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return pageMetadata[path] ? path : '/';
}