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

export const integratedProgrammingImplementation: CurriculumModule = {
  number: '',
  title: 'Integrated Programming & Implementation',
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
      topics: ['Pandas', 'Data cleaning', 'Exploratory data analysis', 'Matplotlib', 'Visualization'],
    },
    {
      letter: 'H',
      title: 'Machine Learning Programming',
      topics: ['Translating mathematical equations into code', 'Implementing ML algorithms', 'Training workflows', 'Evaluation', 'Computational experiments'],
    },
  ],
};

export const deepNeuralNetworks: CurriculumModule = {
  number: 'C2',
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
    question: 'What gap do the cloudsandai courses fill?',
    answer:
      'cloudsandai connects programming, mathematics, statistics, machine learning and practical AI application development in a single structured curriculum so learners can understand both the theory and the implementation.',
  },
  {
    question: 'Why choose cloudsandai for AI and ML learning?',
    answer:
      'cloudsandai takes a foundations-first, instructor-led approach. Learners build understanding through code, experiments and guided implementation before moving into practical AI application work.',
  },
  {
    question: 'Who are the cloudsandai courses for?',
    answer:
      'AI/ML Foundations is designed for beginners, engineering students, college learners and anyone starting from zero. AI Engineering is designed for learners with Python proficiency who want to build real AI applications.',
  },
  {
    question: 'What is the difference between AI/ML Foundations and AI Engineering?',
    answer:
      'AI/ML Foundations starts from zero and focuses on Python, mathematics, statistics and ML fundamentals. AI Engineering is a more application-focused track covering LLMs, RAG, APIs, agentic workflows and deployment.',
  },
  {
    question: 'What does AI/ML Foundations include?',
    answer:
      'The course covers Python programming and scientific computing, mathematics for machine learning, probability and statistics, core machine learning concepts, an introduction to deep learning, and a beginner-level capstone project.',
  },
  {
    question: 'What does AI Engineering include?',
    answer:
      'The course focuses on LLM fundamentals, model selection, APIs and FastAPI, retrieval-augmented generation, agentic AI workflows and AWS deployment. It includes three end-to-end projects and is intended for practical AI application builders.',
  },
  {
    question: 'How long are the courses?',
    answer:
      'Both AI/ML Foundations and AI Engineering run for 12 weeks and combine live instructor-led classes with recordings available on the LMS after class.',
  },
  {
    question: 'Do I need a technical background for AI Engineering?',
    answer:
      'Prospective students should have Python programming proficiency and complete a consultation with Deven before admission to discuss technical readiness and learning objectives.',
  },
  {
    question: 'How do I enrol in a cloudsandai course?',
    answer:
      'Contact Deven through the consultation flow, email or LinkedIn. You can ask questions about the curriculum, prerequisites and which learning path fits your goals before enrolling.',
  },
];

export interface CourseCardData {
  id: string;
  title: string;
  label: string;
  description: string;
  summary: string;
  duration: string;
  lectures: string;
  additionalDuration?: string;
  additionalLectures?: string;
  coreAreas: { title: string; description: string }[];
  learningHighlights: string[];
  highlighted: boolean;
  badge?: string;
}

export const courses: CourseCardData[] = [
  {
    id: 'course-1',
    title: 'AI/ML Foundations',
    label: '12 WEEKS · BEGINNERS',
    description:
      'Learn the fundamentals of programming, mathematics and machine learning through intuitive explanations, coding exercises and a beginner-friendly capstone project.',
    summary: 'Python • Math • ML • Capstone',
    duration: '12 weeks',
    lectures: 'Beginner-focused path',
    coreAreas: [
      {
        title: 'Python Programming and Scientific Computing',
        description: 'Python fundamentals, data structures and practical numerical computing with real examples.',
      },
      {
        title: 'Mathematics for Machine Learning',
        description: 'Vectors, matrices, derivatives, gradients and optimization intuition for ML models.',
      },
      {
        title: 'Probability, Statistics and Machine Learning',
        description: 'Understand data, uncertainty, model evaluation and core learning algorithms.',
      },
      {
        title: 'Introduction to Deep Learning',
        description: 'Neurons, layers, activation functions and the intuition behind learning in neural networks.',
      },
      {
        title: 'Capstone Project',
        description: 'Apply your learning to a real dataset and explain your model, results and limitations.',
      },
    ],
    learningHighlights: [
      'Python and scientific computing',
      'Mathematics for ML',
      'Probability and statistics',
      'Machine learning fundamentals',
      'Introduction to deep learning',
      'Capstone project',
    ],
    highlighted: false,
    badge: 'Starts from zero',
  },
  {
    id: 'course-2',
    title: 'AI Engineering',
    label: '12 WEEKS · PYTHON PROFICIENCY',
    description:
      'Learn to build, integrate and deploy modern AI applications using large language models, APIs, open-source models, agentic workflows and cloud infrastructure.',
    summary: 'LLMs • RAG • APIs • Agents • AWS',
    duration: '12 weeks',
    lectures: 'Python proficiency required',
    coreAreas: [
      {
        title: 'LLM Fundamentals',
        description: 'Tokens, context windows, prompting, structured outputs and model evaluation.',
      },
      {
        title: 'Models and Open-Source Ecosystems',
        description: 'Hugging Face, Ollama, local inference and selecting between hosted and local models.',
      },
      {
        title: 'APIs and Application Development',
        description: 'HTTP, JSON, Python backend development and FastAPI-based application design.',
      },
      {
        title: 'Retrieval-Augmented Generation',
        description: 'Document ingestion, embeddings, retrieval and grounded answers with citations.',
      },
      {
        title: 'Agentic AI',
        description: 'Tool calling, state management, bounded execution and human approval flows.',
      },
      {
        title: 'AWS and Deployment',
        description: 'Deploy a lightweight AI application with logging, cost and latency considerations.',
      },
    ],
    learningHighlights: [
      'LLM fundamentals',
      'Local and hosted model workflows',
      'APIs and FastAPI',
      'RAG and grounded QA',
      'Agentic AI workflows',
      'AWS deployment',
    ],
    highlighted: true,
  },
];

export const comparisonRows: { feature: string; course1: string; course2: string }[] = [
  { feature: 'Duration', course1: '12 weeks', course2: '12 weeks' },
  { feature: 'Audience', course1: 'Beginners from zero', course2: 'Python-ready learners' },
  { feature: 'Prerequisites', course1: 'None', course2: 'Python proficiency + consultation' },
  { feature: 'Learning focus', course1: 'AI/ML fundamentals', course2: 'AI application building' },
  { feature: 'Capstone / projects', course1: '1 capstone project', course2: '3 end-to-end projects' },
  { feature: 'Core technologies', course1: 'Python · math · ML', course2: 'LLMs · APIs · RAG · agents · AWS' },
];
