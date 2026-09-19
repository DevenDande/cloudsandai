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

export const programmingScientificComputing: CurriculumModule = {
  number: '04',
  title: 'Programming & Scientific Computing',
  groups: [
    {
      letter: 'A',
      title: 'Python Foundations',
      topics: ['Python syntax', 'Variables and data types', 'Conditionals', 'Loops', 'Functions', 'Modules', 'Basic debugging'],
    },
    {
      letter: 'B',
      title: 'Programming Fundamentals',
      topics: ['Problem decomposition', 'Functions', 'Recursion', 'Computational thinking', 'Code organization', 'Basic complexity concepts'],
    },
    {
      letter: 'C',
      title: 'Data Structures',
      topics: ['Lists', 'Tuples', 'Dictionaries', 'Sets', 'Stacks', 'Queues', 'Practical use of data structures'],
    },
    {
      letter: 'D',
      title: 'Algorithms',
      topics: ['Searching', 'Sorting', 'Recursion', 'Algorithmic thinking', 'Big-O / computational complexity', 'Implementation-oriented problem solving'],
    },
    {
      letter: 'E',
      title: 'NumPy & Numerical Computing',
      topics: ['Arrays', 'Vectorization', 'Broadcasting', 'Matrix operations', 'Numerical computation'],
    },
    {
      letter: 'F',
      title: 'Scientific Computing',
      topics: ['Numerical differentiation', 'Numerical integration', 'Simulation', 'Numerical optimization', 'Computational experiments'],
    },
    {
      letter: 'G',
      title: 'Data Handling & Visualization',
      topics: ['Pandas', 'Data cleaning', 'Exploratory data analysis', 'Visualization'],
    },
    {
      letter: 'H',
      title: 'Machine Learning Programming',
      topics: ['Translating mathematical equations into code', 'Implementing ML algorithms', 'Training workflows', 'Evaluation', 'Computational experiments'],
    },
  ],
};

export const deepNeuralNetworks: CurriculumModule = {
  number: '05',
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
  programmingScientificComputing,
];

export const dnnModule: CurriculumModule = deepNeuralNetworks;

export const faqItems: { question: string; answer: string }[] = [
  {
    question: 'What gap do the cloudsandai courses fill?',
    answer:
      'cloudsandai connects mathematical foundations, statistics, programming, scientific computing and machine learning in one structured curriculum, helping learners understand both how AI and ML methods work and why they work.',
  },
  {
    question: 'Why choose cloudsandai for AI and ML learning?',
    answer:
      'cloudsandai takes a foundations-first, instructor-led approach. Concepts are studied alongside computation and implementation so learners can build a connected understanding of mathematics, statistics, programming, machine learning and deep learning.',
  },
  {
    question: 'Who are the cloudsandai courses for?',
    answer:
      'The courses are designed for polytechnic and engineering students, recent graduates, data analysts and data scientists, ML engineers who want to understand the fundamentals, and curious learners irrespective of background.',
  },
  {
    question: 'What does a foundations-first approach to AI and ML mean?',
    answer:
      'It means learning the mathematical, statistical and programming ideas behind machine learning before relying on advanced models. The curriculum connects theory, computation and implementation throughout the learning path.',
  },
  {
    question: 'What does Course 1 include?',
    answer:
      'Course 1 combines Mathematical Foundations for Machine Learning, Introduction to Statistical Methods, Machine Learning, and Programming & Scientific Computing through 8 Programming Sessions. It includes 120 hours and 60 lectures.',
  },
  {
    question: 'What does Course 2 include?',
    answer:
      'Course 2 includes everything in Course 1, plus Deep Neural Networks and 6 additional deep-learning implementation sessions, for 14 Programming Sessions total. It includes 180 hours and 90 lectures.',
  },
  {
    question: 'What topics are covered in the curriculum?',
    answer:
      'The curriculum progresses through programming and scientific computing, mathematics, statistics, machine learning and deep learning. Topics include optimization, PCA, SVMs, regression, classification, ensembles, neural networks, CNNs, sequence models, attention and transformers.',
  },
  {
    question: 'How do I choose between Course 1 and Course 2?',
    answer:
      'Choose Course 1 for the foundations track covering mathematics, statistics, machine learning and programming. Choose Course 2 if you want to continue from Course 1 into Deep Neural Networks and the additional implementation sessions.',
  },
  {
    question: 'How do I enrol in a cloudsandai course?',
    answer:
      'Contact Deven using the enquiry form, email, phone or LinkedIn. You can ask questions about the curriculum and which learning path is right for you before enrolling.',
  },
];

export interface CourseCardData {
  id: string;
  title: string;
  price: string;
  label: string;
  description: string;
  summary: string;
  duration: string;
  lectures: string;
  additionalDuration?: string;
  additionalLectures?: string;
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
      'A structured foundation program where mathematics, statistics, machine learning and programming develop together through computation.',
    summary: '4 Core Areas + 8 Programming Sessions',
    duration: '120 hrs',
    lectures: '60 lectures',
    coreAreas: [
      'Mathematical Foundations for Machine Learning',
      'Introduction to Statistical Methods',
      'Machine Learning',
      'Programming & Scientific Computing',
    ],
    webinars: ['8 Programming & Scientific Computing Sessions'],
    totalWebinars: '8',
    highlighted: false,
  },
  {
    id: 'course-2',
    title: 'Machine Learning + Deep Neural Networks',
    price: '₹20,000',
    label: 'COMPLETE TRACK',
    description:
      'Everything in the Introduction to Machine Learning program, extended with Deep Neural Networks and 6 additional implementation sessions.',
    summary: '5 Core Areas + 14 Programming Sessions',
    duration: '180 hrs',
    lectures: '90 lectures',
    additionalDuration: '60',
    additionalLectures: '30 lectures',
    coreAreas: [
      'Mathematical Foundations for Machine Learning',
      'Introduction to Statistical Methods',
      'Machine Learning',
      'Programming & Scientific Computing',
      'Deep Neural Networks',
    ],
    webinars: ['8 Programming & Scientific Computing Sessions', '6 Deep Learning Implementation Sessions'],
    totalWebinars: '14',
    highlighted: true,
    badge: 'Includes Course 1',
  },
];

export const comparisonRows: { feature: string; course1: string; course2: string }[] = [
  { feature: 'Mathematical Foundations for ML', course1: 'check', course2: 'check' },
  { feature: 'Statistical Methods', course1: 'check', course2: 'check' },
  { feature: 'Machine Learning', course1: 'check', course2: 'check' },
  { feature: 'Programming & Scientific Computing', course1: 'check', course2: 'check' },
  { feature: 'Computational Practice Sessions', course1: '8', course2: '8' },
  { feature: 'Deep Neural Networks', course1: 'dash', course2: 'check' },
  { feature: 'Additional Deep Learning Implementation', course1: 'dash', course2: '6' },
  { feature: 'Total Programming Sessions', course1: '8', course2: '14' },
  { feature: 'Duration', course1: '120 hrs', course2: '180 hrs (additional 60 hrs)' },
  { feature: 'Lectures', course1: '60', course2: '90 (additional 30 lectures)' },
  { feature: 'Price', course1: '₹15,000', course2: '₹20,000' },
];
