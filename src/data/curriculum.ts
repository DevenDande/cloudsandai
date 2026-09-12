export interface SubTopic {
  name: string;
}

export interface TopicGroup {
  letter: string;
  title: string;
  topics: string[];
}

export interface CurriculumModule {
  number: string;
  title: string;
  groups: TopicGroup[];
}

export const mathFoundations: CurriculumModule = {
  number: '01',
  title: 'Mathematical Foundations for Machine Learning',
  groups: [
    {
      letter: 'A',
      title: 'Solution of Linear Systems',
      topics: [
        'Systems of linear equations',
        'Matrices',
        'Solving systems of linear equations',
      ],
    },
    {
      letter: 'B',
      title: 'Vector Spaces',
      topics: ['Linear independence', 'Basis', 'Rank'],
    },
    {
      letter: 'C',
      title: 'Analytic Geometry',
      topics: [
        'Norms',
        'Inner products',
        'Lengths and distances',
        'Angles and orthogonality',
        'Orthonormal basis',
      ],
    },
    {
      letter: 'D',
      title: 'Matrix Decomposition',
      topics: [
        'Determinant and trace',
        'Eigenvalues and eigenvectors',
        'Cholesky decomposition',
        'Eigen decomposition',
        'Diagonalization',
        'Singular Value Decomposition',
        'Matrix approximation',
      ],
    },
    {
      letter: 'E',
      title: 'Vector Calculus',
      topics: [
        'Differentiation of univariate functions',
        'Partial differentiation',
        'Gradients',
        'Gradients of vector-valued functions',
        'Gradients of matrices',
        'Useful identities for computing gradients',
        'Back propagation',
        'Automatic differentiation',
        'Higher-order derivatives',
        'Linearization',
        'Multivariate Taylor series',
      ],
    },
    {
      letter: 'F',
      title: 'Optimization',
      topics: [
        'Gradient descent',
        'Constrained optimization',
        'Lagrange multipliers',
        'Convex optimization',
        'Learning rate decay',
        'Initialization',
        'Stochastic gradient descent',
        'Hyperparameter tuning',
        'Feature preprocessing',
        'Local optima',
        'Flat regions',
        'Differential curvature',
        'Momentum',
        'AdaGrad',
        'RMSProp',
        'Adam',
      ],
    },
    {
      letter: 'G',
      title: 'Dimensionality Reduction and PCA',
      topics: [
        'Problem setting',
        'Maximum variance perspective',
        'Projection perspective',
        'Eigenvector computation',
        'Low-rank approximation',
        'PCA in high dimensions',
        'Key steps of PCA',
        'Latent variable perspective',
      ],
    },
    {
      letter: 'H',
      title: 'SVM Mathematical Foundations',
      topics: [
        'Mathematical preliminaries for SVM',
        'Karush-Kuhn-Tucker conditions',
        'Primal/dual perspective',
        'Linear SVM',
        'Nonlinear SVM',
        'Kernels',
      ],
    },
  ],
};

export const statisticalMethods: CurriculumModule = {
  number: '02',
  title: 'Introduction to Statistical Methods',
  groups: [
    {
      letter: 'A',
      title: 'Basic Probability & Statistics',
      topics: [
        'Measures of central tendency',
        'Measures of variability',
        'Basic probability concepts',
        'Axioms of probability',
        'Mutually exclusive events',
        'Independent events',
      ],
    },
    {
      letter: 'B',
      title: 'Conditional Probability & Bayes Theorem',
      topics: [
        'Conditional probability',
        'Independent events',
        'Total probability',
        'Bayes theorem',
        'Introduction to Naïve Bayes',
      ],
    },
    {
      letter: 'C',
      title: 'Probability Distributions',
      topics: [
        'Random variables',
        'Discrete and continuous random variables',
        'Expectation',
        'Mean',
        'Variance',
        'Covariance',
        'Joint distributions',
        'Transformation of random variables',
        'Bernoulli distribution',
        'Binomial distribution',
        'Poisson distribution',
        'Normal/Gaussian distribution',
        't-distribution',
        'F-distribution',
        'Chi-square distribution',
      ],
    },
    {
      letter: 'D',
      title: 'Hypothesis Testing',
      topics: [
        'Random sampling',
        'Stratified sampling',
        'Sampling distributions',
        'Central Limit Theorem',
        'Interval estimation',
        'Confidence level',
        'Testing of hypothesis',
        'Mean-related models',
        'Proportion-related models',
        'ANOVA — single factor',
        'ANOVA — dual factor',
        'Maximum likelihood',
      ],
    },
    {
      letter: 'E',
      title: 'Prediction & Forecasting',
      topics: [
        'Correlation',
        'Regression',
        'Time series analysis',
        'Components of time series data',
        'Moving averages',
        'Weighted moving averages',
        'AR',
        'ARMA',
        'ARIMA',
        'SARIMA',
        'SARIMAX',
        'VAR',
        'VARMAX',
        'Simple exponential smoothing',
      ],
    },
    {
      letter: 'F',
      title: 'Gaussian Mixture Models & Expectation Maximization',
      topics: ['Gaussian Mixture Model', 'Expectation Maximization'],
    },
  ],
};

export const machineLearning: CurriculumModule = {
  number: '03',
  title: 'Machine Learning',
  groups: [
    {
      letter: 'A',
      title: 'Introduction',
      topics: [
        'Introduction to Machine Learning',
        'Types / taxonomy of Machine Learning',
        'Design a learning system',
        'Challenges in Machine Learning',
      ],
    },
    {
      letter: 'B',
      title: 'Machine Learning Workflow',
      topics: [
        'Role of data',
        'Data preprocessing',
        'Data wrangling',
        'Data skewness removal / sampling',
        'Model training',
        'Model testing',
        'Performance metrics',
      ],
    },
    {
      letter: 'C',
      title: 'Linear Models for Regression',
      topics: [
        'Direct solution method',
        'Gradient descent',
        'Batch gradient descent',
        'Stochastic gradient descent',
        'Mini-batch gradient descent',
        'Linear basis function models',
        'Bias-variance decomposition',
      ],
    },
    {
      letter: 'D',
      title: 'Linear Models for Classification',
      topics: [
        'Discriminant functions',
        'Decision theory',
        'Probabilistic discriminative classifiers',
        'Logistic regression',
        'Log-loss function',
        'Gradient descent',
        'Multi-class classification',
      ],
    },
    {
      letter: 'E',
      title: 'Decision Trees',
      topics: [
        'Information theory',
        'Entropy',
        'Entropy-based decision tree construction',
        'Avoiding overfitting',
        'Minimum Description Length',
        'Continuous-valued attributes',
        'Missing attributes',
      ],
    },
    {
      letter: 'F',
      title: 'Instance-Based Learning',
      topics: [
        'k-Nearest Neighbor',
        'Locally Weighted Regression',
        'Radial Basis Functions',
      ],
    },
    {
      letter: 'G',
      title: 'Support Vector Machines',
      topics: [
        'Linearly separable data',
        'Non-linearly separable data',
        'Kernel Trick',
        'Mercer kernels',
        'Applications to structured data',
        'Applications to unstructured data',
      ],
    },
    {
      letter: 'H',
      title: 'Bayesian Learning',
      topics: [
        'MLE hypothesis',
        'MAP hypothesis',
        'Bayes rule',
        'Optimal Bayes classifier',
        'Naïve Bayes classifier',
        'Probabilistic generative classifiers',
        'Bayesian interpretation of linear regression',
      ],
    },
    {
      letter: 'I',
      title: 'Ensemble Learning',
      topics: [
        'Combining classifiers',
        'Bagging',
        'Random Forest',
        'Boosting',
        'AdaBoost',
        'Gradient Boosting',
        'XGBoost',
      ],
    },
    {
      letter: 'J',
      title: 'Unsupervised Learning',
      topics: [
        'K-Means clustering',
        'K-Means variants',
        'Mixture models for probabilistic clustering',
        'Expectation Maximization review',
        'Applications',
      ],
    },
    {
      letter: 'K',
      title: 'ML Model Evaluation',
      topics: [
        'Comparing Machine Learning models',
        'Bias',
        'Fairness',
        'Interpretability',
      ],
    },
  ],
};

export const deepNeuralNetworks: CurriculumModule = {
  number: '04',
  title: 'Deep Neural Networks',
  groups: [
    {
      letter: '01',
      title: 'Fundamentals of Neural Networks',
      topics: [
        'Supervised learning',
        'Unsupervised learning',
        'Semi-supervised learning',
        'Reinforcement learning',
        'Why Deep Learning?',
        'Applications of Deep Learning',
        'Biological neuron vs artificial neuron',
        'Connectionism model',
        'Perceptron',
        'Perceptron learning algorithm',
        'XOR problem',
        'Multilayer Perceptron',
        'MLP as classifiers',
        'Universal approximators',
        'Depth and width',
      ],
    },
    {
      letter: '02',
      title: 'Deep Feedforward Neural Networks',
      topics: [
        'Forward propagation',
        'Backward propagation',
        'Training DNNs using Gradient Descent',
        'Computational graphs',
        'Activation functions',
        'Softmax regression',
        'Impact of depth in DNN',
      ],
    },
    {
      letter: '03',
      title: 'Optimization of Deep Models',
      topics: [
        'Saddle points',
        'Plateau',
        'Non-convex optimization intuition',
        'Optimization algorithms',
        'Momentum-based algorithms',
        'Adaptive learning-rate algorithms',
      ],
    },
    {
      letter: '04',
      title: 'Regularization for Deep Models',
      topics: [
        'Model selection',
        'Underfitting',
        'Overfitting',
        'L1 regularization',
        'L2 regularization',
        'Dropout',
        'Vanishing gradients',
        'Exploding gradients',
        'Covariate shift',
        'Parameter initialization',
        'Batch normalization',
      ],
    },
    {
      letter: '05',
      title: 'Convolutional Networks',
      topics: [
        'Convolutions for images',
        'Learning a kernel',
        'Padding',
        'Stride',
        'Channels',
        'Pooling',
        'Designing CNNs',
        'Popular CNN architectures',
        'Transfer learning',
        'Applications of CNNs',
      ],
    },
    {
      letter: '06',
      title: 'Sequence Models',
      topics: [
        'Recurrent Neural Networks',
        'Backpropagation Through Time',
        'Exploding gradients',
        'Vanishing gradients',
        'Gates',
        'Popular RNN architectures',
        'Applications of RNNs',
        'GRU',
        'LSTM',
        'BiLSTM',
      ],
    },
    {
      letter: '07',
      title: 'Attention Mechanism',
      topics: [
        'Attention pooling',
        'Attention scoring functions',
        'Multi-head attention',
        'Self-attention',
        'Positional encoding',
        'Transformer architecture',
        'Applications of Transformers',
      ],
    },
    {
      letter: '08',
      title: 'Neural Network Search',
      topics: ['Search space', 'Search algorithms', 'Evaluation strategy'],
    },
    {
      letter: '09',
      title: 'Time Series Modelling and Forecasting',
      topics: [
        'Univariate CNN models',
        'Multivariate CNN models',
        'Multi-step CNN models',
        'Univariate LSTM models',
        'Multivariate LSTM models',
        'Multi-step LSTM models',
      ],
    },
    {
      letter: '10',
      title: 'Other Learning Techniques',
      topics: ['Federated learning', 'Meta learning', 'Online / incremental learning'],
    },
  ],
};

export const course1Modules: CurriculumModule[] = [
  mathFoundations,
  statisticalMethods,
  machineLearning,
];

export const dnnModule: CurriculumModule = deepNeuralNetworks;

export const faqItems: { question: string; answer: string }[] = [
  {
    question: 'What does Course 1 include?',
    answer:
      'Course 1 combines Mathematical Foundations for Machine Learning, Introduction to Statistical Methods and Machine Learning, along with 8 Python + Coding webinars.',
  },
  {
    question: 'What does Course 2 include?',
    answer:
      'Course 2 includes everything in Course 1, plus Deep Neural Networks and 6 additional webinars.',
  },
  {
    question: 'How many webinars are included?',
    answer:
      'Course 1 includes 8 Python + Coding webinars. Course 2 includes those 8 webinars plus 6 additional webinars, for a total of 14.',
  },
  {
    question: 'What topics are covered in the mathematics component?',
    answer:
      'The mathematics component covers linear systems, vector spaces, analytic geometry, matrix decomposition, vector calculus, optimization, PCA and mathematical foundations of SVMs.',
  },
  {
    question: 'What statistical topics are covered?',
    answer:
      'The statistics component covers probability, conditional probability and Bayes theorem, probability distributions, hypothesis testing, estimation, ANOVA, maximum likelihood, correlation, regression, time-series analysis, Gaussian Mixture Models and Expectation Maximization.',
  },
  {
    question: 'What machine learning topics are covered?',
    answer:
      'The ML curriculum covers the ML workflow, regression, classification, logistic regression, decision trees, instance-based learning, SVMs, Bayesian learning, ensemble learning, unsupervised learning and model evaluation.',
  },
  {
    question: 'What is covered in Deep Neural Networks?',
    answer:
      'The DNN component covers neural-network fundamentals, feedforward networks, optimization, regularization, CNNs, sequence models, attention, transformers, neural architecture search, time-series modelling and forecasting, federated learning, meta learning and online learning.',
  },
  {
    question: 'How do I enroll?',
    answer:
      'Contact Deven directly using the email address or phone number on the website.',
  },
  {
    question: 'Can I contact Deven before enrolling?',
    answer: 'Yes. Use the contact form, email, phone or LinkedIn.',
  },
];

export interface CourseCardData {
  id: string;
  title: string;
  price: string;
  label: string;
  description: string;
  summary: string;
  coreAreas: string[];
  webinars: string[];
  totalWebinars: string;
  highlighted: boolean;
  badge?: string;
}

export const courses: CourseCardData[] = [
  {
    id: 'course-1',
    title: 'Introduction to Machine Learning',
    price: '₹15,000',
    label: 'FOUNDATION TRACK',
    description:
      'A structured program covering mathematical foundations, statistical methods, machine learning, and dedicated Python + coding webinars.',
    summary: '3 Core Areas + 8 Webinars',
    coreAreas: [
      'Mathematical Foundations for Machine Learning',
      'Introduction to Statistical Methods',
      'Machine Learning',
    ],
    webinars: ['8 Python + Coding Webinars'],
    totalWebinars: '8',
    highlighted: false,
  },
  {
    id: 'course-2',
    title: 'Machine Learning + Deep Neural Networks',
    price: '₹20,000',
    label: 'COMPLETE TRACK',
    description:
      'Everything in the Introduction to Machine Learning program, extended with a full Deep Neural Networks curriculum and 6 additional webinars.',
    summary: '4 Core Areas + 14 Webinars',
    coreAreas: [
      'Mathematical Foundations for Machine Learning',
      'Introduction to Statistical Methods',
      'Machine Learning',
      'Deep Neural Networks',
    ],
    webinars: ['8 Python + Coding Webinars', '6 Additional Webinars'],
    totalWebinars: '14',
    highlighted: true,
    badge: 'Includes Course 1',
  },
];

export const comparisonRows: { feature: string; course1: string; course2: string }[] = [
  { feature: 'Mathematical Foundations for ML', course1: 'check', course2: 'check' },
  { feature: 'Statistical Methods', course1: 'check', course2: 'check' },
  { feature: 'Machine Learning', course1: 'check', course2: 'check' },
  { feature: 'Python + Coding', course1: 'check', course2: 'check' },
  { feature: 'Python + Coding Webinars', course1: '8', course2: '8' },
  { feature: 'Deep Neural Networks', course1: 'dash', course2: 'check' },
  { feature: 'Additional Webinars', course1: 'dash', course2: '6' },
  { feature: 'Total Webinars', course1: '8', course2: '14' },
  { feature: 'Price', course1: '₹15,000', course2: '₹20,000' },
];
