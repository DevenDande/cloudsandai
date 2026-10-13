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
      title: 'Vectors and Matrices',
      topics: [
        'Vectors and vector operations',
        'Matrices',
        'Matrix multiplication',
        'Dot products',
      ],
    },
    {
      letter: 'B',
      title: 'Distance and Similarity',
      topics: [
        'Norms and distances',
        'Inner products and similarity',
      ],
    },
    {
      letter: 'C',
      title: 'Derivatives and Gradients',
      topics: [
        'Derivatives',
        'Partial differentiation',
        'Gradients',
        'Chain rule',
      ],
    },
    {
      letter: 'D',
      title: 'Optimization',
      topics: [
        'Loss functions',
        'Gradient descent',
        'Stochastic gradient descent',
        'Learning rate',
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
      title: 'Descriptive Statistics',
      topics: [
        'Mean and median',
        'Variance and standard deviation',
      ],
    },
    {
      letter: 'B',
      title: 'Probability and Bayes Rule',
      topics: [
        'Basic probability',
        'Conditional probability',
        'Independent events',
        'Bayes rule',
      ],
    },
    {
      letter: 'C',
      title: 'Random Variables and Distributions',
      topics: [
        'Random variables',
        'Expectation',
        'Variance',
        'Covariance',
        'Bernoulli distribution',
        'Gaussian distribution',
      ],
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

export const introToDeepLearning: CurriculumModule = {
  number: '04',
  title: 'Introduction to Deep Learning',
  groups: [
    {
      letter: 'A',
      title: 'Neural Network Fundamentals',
      topics: [
        'Neurons, layers and weights',
        'Forward propagation',
        'Activation and loss functions',
        'Gradient descent and backpropagation (introduction)',
        'Overfitting and regularization',
        'Common applications of deep learning',
      ],
    },
  ],
};

export const course1Modules: CurriculumModule[] = [
  mathFoundations,
  statisticalMethods,
  machineLearning,
  introToDeepLearning,
];

export const aiEngineeringCoreAreas = [
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
];

export const aiEngineeringProjects = [
  {
    number: 'Project 1 · Knowledge-Grounded AI',
    title: 'Knowledge-Grounded AI',
    summary:
      'Build a knowledge-grounded application using a document intelligence assistant as the core example. Customize the use case from an instructor-approved brief.',
    coreExample: 'Document Intelligence Assistant',
    alternativeApplications: [
      'Academic handbook assistant',
      'Technical documentation assistant',
      'Company policy assistant',
    ],
    capabilities: [
      'RAG, document ingestion and text chunking',
      'Embeddings and relevant information retrieval',
      'LLM integration and source-grounded responses',
      'A working application interface or API',
    ],
    deliverables: [
      'Working application',
      'Source code',
      'Documentation',
      'Basic evaluation of answer quality and retrieval performance',
    ],
  },
  {
    number: 'Project 2 · Multimodal AI',
    title: 'Multimodal AI',
    summary:
      'Build a practical application integrating suitable audio, text or vision models. The speech and translation assistant is the core example; select a realistic, instructor-approved use case.',
    coreExample: 'Speech and Translation Assistant',
    alternativeApplications: [
      'Lecture companion',
      'Meeting summarizer',
      'Image-and-text understanding application',
    ],
    capabilities: [
      'Integrating suitable audio, text or vision models',
      'Processing model inputs and outputs in an application',
      'Backend integration and a user-facing interface',
      'Basic testing of application outputs',
    ],
    deliverables: [
      'Working application',
      'Source code',
      'Documentation',
      'Demonstration of the complete multimodal application workflow',
    ],
  },
  {
    number: 'Project 3 · Agentic AI',
    title: 'Agentic AI',
    summary:
      'Build a controlled, multi-step agent using a booking workflow agent as the core example. Customize the use case from an instructor-approved brief.',
    coreExample: 'Booking Workflow Agent',
    alternativeApplications: [
      'Customer-support triage',
      'Order-status assistant',
      'Appointment scheduling agent',
    ],
    capabilities: [
      'Tool calling and structured outputs',
      'APIs and multi-step workflow execution',
      'Validation, state management and error handling',
      'Human approval before consequential actions',
    ],
    deliverables: [
      'Working application',
      'Source code',
      'Documentation',
      'Demonstration of the complete agentic workflow',
    ],
  },
];

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
      'The course focuses on LLM fundamentals, model selection, APIs and FastAPI, retrieval-augmented generation, agentic AI workflows and AWS deployment. Every student completes all three guided, assessed project categories, choosing one instructor-approved application from each.',
  },
  {
    question: 'How long are the courses?',
    answer:
      'Both AI/ML Foundations and AI Engineering run for 16 weeks and combine live instructor-led classes with recordings uploaded to the LMS after class.',
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
    label: '16 WEEKS · BEGINNERS',
    description:
      'Build a strong foundation in Python, mathematics, probability, statistics, machine learning and introductory deep learning through code, experimentation and a guided capstone project.',
    summary: 'Python • Math • ML • Capstone',
    duration: '16 weeks',
    lectures: 'Beginner-focused path',
    coreAreas: [
      {
        title: 'Python Programming and Scientific Computing',
        description: 'Python fundamentals, data structures and numerical computing with real examples and datasets.',
      },
      {
        title: 'Mathematics, Probability and Statistics',
        description: 'Vectors, gradients, optimization, uncertainty and the ideas needed to understand ML models.',
      },
      {
        title: 'Core Machine Learning and Model Evaluation',
        description: 'Understand supervised learning, training workflows, evaluation and model limitations.',
      },
      {
        title: 'Introduction to Deep Learning',
        description: 'Neural networks, activation functions and the intuition behind learning in deep models.',
      },
      {
        title: 'Guided Capstone Project',
        description: 'Apply your learning to a real dataset, explain the model and discuss its strengths and limitations.',
      },
    ],
    learningHighlights: [
      'Build predictive models',
      'Analyze real datasets',
      'Train your first neural network',
      'One guided capstone project',
    ],
    highlighted: false,
    badge: 'Starts from zero',
  },
  {
    id: 'course-2',
    title: 'AI Engineering',
    label: '16 WEEKS · PYTHON PROFICIENCY',
    description:
      'Learn to integrate modern AI models, APIs, tools and cloud infrastructure to build useful AI applications across three guided and assessed projects.',
    summary: 'LLMs • RAG • APIs • Agents • AWS',
    duration: '16 weeks',
    lectures: 'Python proficiency required',
    coreAreas: aiEngineeringCoreAreas,
    learningHighlights: [
      'Knowledge-Grounded AI',
      'Multimodal AI',
      'Agentic AI',
      'Guided and assessed project work',
    ],
    highlighted: true,
  },
];

export const comparisonRows: { feature: string; course1: string; course2: string }[] = [
  { feature: 'Duration', course1: '16 weeks', course2: '16 weeks' },
  { feature: 'Audience', course1: 'Beginners from zero', course2: 'Python-ready learners' },
  { feature: 'Prerequisites', course1: 'None', course2: 'Python proficiency + consultation' },
  { feature: 'Learning focus', course1: 'AI/ML fundamentals', course2: 'AI application building' },
  { feature: 'Capstone / projects', course1: '1 capstone project', course2: '3 end-to-end projects' },
  { feature: 'Core technologies', course1: 'Python · math · ML', course2: 'LLMs · APIs · RAG · agents · AWS' },
];
