import colors from '../../styles/colors';

export const professionList = ['Engineer', 'Executive', 'Consultant', 'CEO', 'CFO', 'Sales'];
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const years = [
  2019,
  2018,
  2017,
  2016,
  2015,
  2014,
  2013,
  2012,
  2011,
  2010,
  2009,
  2008,
  2007,
  2006,
  2005,
  2004,
  2003,
  2002,
  2001,
  2000,
  1999,
  1998,
  1997,
  1996,
  1995,
  1994,
  1993,
  1992,
  1991,
  1990,
  1989,
  1988,
  1987,
  1986,
  1985,
  1984,
  1983,
  1982,
  1981,
  1980,
  1979,
  1978,
  1977,
  1976,
  1975,
  1974,
  1973,
  1972,
  1971,
  1970,
  1969,
  1968,
  1967,
  1966,
  1965,
  1964,
  1963,
  1962,
  1961,
  1960,
];

export const goalsList = [
  {
    name: 'Find Investors',
    topicID: 'goals_findinvestors',
    icon: 'comment-dollar',
    modalType: 'invest',
    primaryColor: colors.green,
    secondaryColor: colors.goalGreen,
    fieldName: 'Market',
    fieldText: 'Select a market',
    heading: 'Which market is your investment opportunity?',
    adverb: 'for',
  },
  {
    name: 'Find Freelancers',
    topicID: 'goals_findfreelancers',
    icon: 'briefcase',
    modalType: 'specialist',
    primaryColor: colors.peach,
    secondaryColor: colors.goalPeach,
    fieldName: 'Specialty',
    fieldText: 'Select a specialty',
    heading: 'Select a freelance category',
    adverb: 'for',
  },
  {
    name: 'Find Agencies',
    topicID: 'goals_findagencies',
    icon: 'building',
    modalType: 'specialist',
    primaryColor: colors.peach,
    secondaryColor: colors.goalPeach,
    fieldName: 'Specialty',
    fieldText: 'Select a specialty',
    heading: 'Select an agency category',
    adverb: 'for',
  },
  {
    name: 'Get Coffee',
    topicID: 'goals_getcoffee',
    icon: 'mug-hot',
    modalType: 'topic',
    primaryColor: colors.blue,
    secondaryColor: colors.goalBlue,
    fieldName: 'Topic',
    fieldText: 'Select a topic',
    heading: 'Which topic would you like to discuss?',
    adverb: 'to discuss',
  },
  {
    name: 'Find Business Partners',
    topicID: 'goals_findbusinesspartners',
    icon: 'users',
    modalType: 'topic',
    primaryColor: colors.blue,
    secondaryColor: colors.goalBlue,
    fieldName: 'Topic',
    fieldText: 'Select a topic',
    heading: 'Which topic are you looking for business partners in?',
    adverb: 'in',
  },
  {
    name: 'Find Mentors',
    topicID: 'goals_findmentors',
    icon: 'user-friends',
    modalType: 'topic',
    primaryColor: colors.blue,
    secondaryColor: colors.goalBlue,
    fieldName: 'Topic',
    fieldText: 'Select a topic',
    heading: 'Which topic are you looking for a mentor in?',
    adverb: 'in',
  },
  {
    name: 'Network',
    topicID: 'goals_network',
    icon: 'handshake',
    modalType: 'topic',
    primaryColor: colors.blue,
    secondaryColor: colors.goalBlue,
    fieldName: 'Topic',
    fieldText: 'Select a topic',
    heading: 'Which topic are you looking to network in?',
    adverb: 'in',
  },
  {
    name: 'Get Advice',
    topicID: 'goals_getadvice',
    icon: 'lightbulb',
    modalType: 'topic',
    primaryColor: colors.orange,
    secondaryColor: colors.goalOrange,
    fieldName: 'Topic',
    fieldText: 'Select a topic',
    heading: 'Which topic do you need advice about?',
    adverb: 'in',
  },
  {
    name: 'Get Feedback',
    topicID: 'goals_getfeedback',
    icon: 'comments',
    modalType: 'topic',
    primaryColor: colors.orange,
    secondaryColor: colors.goalOrange,
    fieldName: 'Topic',
    fieldText: 'Select a topic',
    heading: 'Which topic best describes your question?',
    adverb: 'in',
  },
];

export const freelanceList = [
  {
    name: 'Software & Tech',
    topicID: 'freelance_software',
    icon: 'code',
    color: 'peach',
    children: [
      {
        name: 'Web Development',
        topicID: 'freelance_software_webdevelopment',
        color: 'peach',
        icon: 'code',
        parentTopic: {
          topicID: 'freelance_software',
        },
      },
      {
        name: 'Mobile Apps',
        topicID: 'freelance_software_mobileapps',
        color: 'peach',
        icon: 'code',
        parentTopic: {
          topicID: 'freelance_software',
        },
      },
      {
        name: 'Game Development',
        topicID: 'freelance_software_gamedevelopment',
        color: 'peach',
        icon: 'code',
        parentTopic: {
          topicID: 'freelance_software',
        },
      },
      {
        name: 'E-commerce Development',
        topicID: 'freelance_software_ecommercedevelopment',
        color: 'peach',
        icon: 'code',
        parentTopic: {
          topicID: 'freelance_software',
        },
      },
      {
        name: 'Backend / Database',
        topicID: 'freelance_software_backenddatabase',
        color: 'peach',
        icon: 'code',
        parentTopic: {
          topicID: 'freelance_software',
        },
      },
      {
        name: 'IT & Networking',
        topicID: 'freelance_software_itnetworking',
        color: 'peach',
        icon: 'code',
        parentTopic: {
          topicID: 'freelance_software',
        },
      },
      {
        name: 'Data Science & Analytics',
        topicID: 'freelance_software_datascienceanalytics',
        color: 'peach',
        icon: 'code',
        parentTopic: {
          topicID: 'freelance_software',
        },
      },
      {
        name: 'Other',
        topicID: 'freelance_software_other',
        color: 'peach',
        icon: 'code',
        parentTopic: {
          topicID: 'freelance_software',
        },
      },
    ],
  },
  {
    name: 'Engineering',
    topicID: 'freelance_engineering',
    icon: 'drafting-compass',
    color: 'peach',
    children: [
      {
        name: 'Mechanical Engineering',
        topicID: 'freelance_engineering_mechanicalengineering',
        color: 'peach',
        icon: 'drafting-compass',
        parentTopic: {
          topicID: 'freelance_engineering',
        },
      },
      {
        name: 'Electrical Engineering',
        topicID: 'freelance_engineering_electricalengineering',
        color: 'peach',
        icon: 'drafting-compass',
        parentTopic: {
          topicID: 'freelance_engineering',
        },
      },
      {
        name: 'Chemical Engineering',
        topicID: 'freelance_engineering_chemicalengineering',
        color: 'peach',
        icon: 'drafting-compass',
        parentTopic: {
          topicID: 'freelance_engineering',
        },
      },
      {
        name: 'Civil & Structural Engineering',
        topicID: 'freelance_engineering_civilstructuralengineering',
        color: 'peach',
        icon: 'drafting-compass',
        parentTopic: {
          topicID: 'freelance_engineering',
        },
      },
      {
        name: 'Product Design',
        topicID: 'freelance_engineering_productdesign',
        color: 'peach',
        icon: 'drafting-compass',
        parentTopic: {
          topicID: 'freelance_engineering',
        },
      },
      {
        name: '3D Modeling & CAD',
        topicID: 'freelance_engineering_3dmodelingcad',
        color: 'peach',
        icon: 'drafting-compass',
        parentTopic: {
          topicID: 'freelance_engineering',
        },
      },
      {
        name: 'Other',
        topicID: 'freelance_engineering_other',
        color: 'peach',
        icon: 'drafting-compass',
        parentTopic: {
          topicID: 'freelance_engineering',
        },
      },
    ],
  },
  {
    name: 'Graphics & Design',
    topicID: 'freelance_design',
    icon: 'paint-brush',
    color: 'peach',
    children: [
      {
        name: 'Logo Design',
        topicID: 'freelance_design_logodesign',
        color: 'peach',
        icon: 'paint-brush',
        parentTopic: {
          topicID: 'freelance_design',
        },
      },
      {
        name: 'Brand Design',
        topicID: 'freelance_design_branddesign',
        color: 'peach',
        icon: 'paint-brush',
        parentTopic: {
          topicID: 'freelance_design',
        },
      },
      {
        name: 'Web & Mobile Design',
        topicID: 'freelance_design_webmobiledesign',
        color: 'peach',
        icon: 'paint-brush',
        parentTopic: {
          topicID: 'freelance_design',
        },
      },
      {
        name: 'Graphic Design',
        topicID: 'freelance_design_graphicdesign',
        color: 'peach',
        icon: 'paint-brush',
        parentTopic: {
          topicID: 'freelance_design',
        },
      },
      {
        name: 'Game Design',
        topicID: 'freelance_design_gamedesign',
        color: 'peach',
        icon: 'paint-brush',
        parentTopic: {
          topicID: 'freelance_design',
        },
      },
      {
        name: 'Photoshop',
        topicID: 'freelance_design_photoshop',
        color: 'peach',
        icon: 'paint-brush',
        parentTopic: {
          topicID: 'freelance_design',
        },
      },
      {
        name: 'Other',
        topicID: 'freelance_design_other',
        color: 'peach',
        icon: 'paint-brush',
        parentTopic: {
          topicID: 'freelance_design',
        },
      },
    ],
  },
  {
    name: 'Music & Audio',
    topicID: 'freelance_musicaudio',
    icon: 'music',
    color: 'peach',
    children: [
      {
        name: 'Voice Over',
        topicID: 'freelance_musicaudio_voiceover',
        color: 'peach',
        icon: 'music',
        parentTopic: {
          topicID: 'freelance_musicaudio',
        },
      },
      {
        name: 'Mixing & Mastering',
        topicID: 'freelance_musicaudio_mixingmastering',
        color: 'peach',
        icon: 'music',
        parentTopic: {
          topicID: 'freelance_musicaudio',
        },
      },
      {
        name: 'Producing',
        topicID: 'freelance_musicaudio_producing',
        color: 'peach',
        icon: 'music',
        parentTopic: {
          topicID: 'freelance_musicaudio',
        },
      },
      {
        name: 'Singer-Songwriter',
        topicID: 'freelance_musicaudio_singersongwriter',
        color: 'peach',
        icon: 'music',
        parentTopic: {
          topicID: 'freelance_musicaudio',
        },
      },
      {
        name: 'Other',
        topicID: 'freelance_musicaudio_other',
        color: 'peach',
        icon: 'music',
        parentTopic: {
          topicID: 'freelance_musicaudio',
        },
      },
    ],
  },
  {
    name: 'Video & Animation',
    topicID: 'freelance_videoanimation',
    icon: 'film',
    color: 'peach',
    children: [
      {
        name: 'Explainer Videos',
        topicID: 'freelance_videoanimation_explainervideos',
        color: 'peach',
        icon: 'film',
        parentTopic: {
          topicID: 'freelance_videoanimation',
        },
      },
      {
        name: 'Video Editing',
        topicID: 'freelance_videoanimation_videoediting',
        color: 'peach',
        icon: 'film',
        parentTopic: {
          topicID: 'freelance_videoanimation',
        },
      },
      {
        name: 'Video Production',
        topicID: 'freelance_videoanimation_videoproduction',
        color: 'peach',
        icon: 'film',
        parentTopic: {
          topicID: 'freelance_videoanimation',
        },
      },
      {
        name: 'Intros & Outros',
        topicID: 'freelance_videoanimation_introsoutros',
        color: 'peach',
        icon: 'film',
        parentTopic: {
          topicID: 'freelance_videoanimation',
        },
      },
      {
        name: 'Animations',
        topicID: 'freelance_videoanimation_animations',
        color: 'peach',
        icon: 'film',
        parentTopic: {
          topicID: 'freelance_videoanimation',
        },
      },
      {
        name: 'Short Video Ads',
        topicID: 'freelance_videoanimation_shortvideoads',
        color: 'peach',
        icon: 'film',
        parentTopic: {
          topicID: 'freelance_videoanimation',
        },
      },
      {
        name: 'Other',
        topicID: 'freelance_videoanimation_other',
        color: 'peach',
        icon: 'film',
        parentTopic: {
          topicID: 'freelance_videoanimation',
        },
      },
    ],
  },
  {
    name: 'Sales & Marketing',
    topicID: 'freelance_salesmarketing',
    icon: 'comment-dollar',
    color: 'peach',
    children: [
      {
        name: 'Social Media Marketing',
        topicID: 'freelance_salesmarketing_socialmediamarketing',
        color: 'peach',
        icon: 'comment-dollar',
        parentTopic: {
          topicID: 'freelance_salesmarketing',
        },
      },
      {
        name: 'Digital Marketing',
        topicID: 'freelance_salesmarketing_digitalmarketing',
        color: 'peach',
        icon: 'comment-dollar',
        parentTopic: {
          topicID: 'freelance_salesmarketing',
        },
      },
      {
        name: 'Marketing Strategy',
        topicID: 'freelance_salesmarketing_marketingstrategy',
        color: 'peach',
        icon: 'comment-dollar',
        parentTopic: {
          topicID: 'freelance_salesmarketing',
        },
      },
      {
        name: 'E-commerce Sales',
        topicID: 'freelance_salesmarketing_ecommercesales',
        color: 'peach',
        icon: 'comment-dollar',
        parentTopic: {
          topicID: 'freelance_salesmarketing',
        },
      },
      {
        name: 'Lead Generation & Sales',
        topicID: 'freelance_salesmarketing_leadgenerationsales',
        color: 'peach',
        icon: 'comment-dollar',
        parentTopic: {
          topicID: 'freelance_salesmarketing',
        },
      },
      {
        name: 'Other',
        topicID: 'freelance_salesmarketing_other',
        color: 'peach',
        icon: 'comment-dollar',
        parentTopic: {
          topicID: 'freelance_salesmarketing',
        },
      },
    ],
  },
  {
    name: 'Business',
    topicID: 'freelance_business',
    icon: 'user-tie',
    color: 'peach',
    children: [
      {
        name: 'Virtual Assistant',
        topicID: 'freelance_business_virtualassistant',
        color: 'peach',
        icon: 'user-tie',
        parentTopic: {
          topicID: 'freelance_business',
        },
      },
      {
        name: 'Data Entry',
        topicID: 'freelance_business_dataentry',
        color: 'peach',
        icon: 'user-tie',
        parentTopic: {
          topicID: 'freelance_business',
        },
      },
      {
        name: 'Accounting',
        topicID: 'freelance_business_accounting',
        color: 'peach',
        icon: 'user-tie',
        parentTopic: {
          topicID: 'freelance_business',
        },
      },
      {
        name: 'Legal Consulting',
        topicID: 'freelance_business_legalconsulting',
        color: 'peach',
        icon: 'user-tie',
        parentTopic: {
          topicID: 'freelance_business',
        },
      },
      {
        name: 'Financial Consulting',
        topicID: 'freelance_business_financialconsulting',
        color: 'peach',
        icon: 'user-tie',
        parentTopic: {
          topicID: 'freelance_business',
        },
      },
      {
        name: 'Business Consulting',
        topicID: 'freelance_business_businessconsulting',
        color: 'peach',
        icon: 'user-tie',
        parentTopic: {
          topicID: 'freelance_business',
        },
      },
      {
        name: 'Branding Services',
        topicID: 'freelance_business_brandingservices',
        color: 'peach',
        icon: 'user-tie',
        parentTopic: {
          topicID: 'freelance_business',
        },
      },
      {
        name: 'Project Managament',
        topicID: 'freelance_business_projectmanagement',
        color: 'peach',
        icon: 'user-tie',
        parentTopic: {
          topicID: 'freelance_business',
        },
      },
      {
        name: 'Marketing Research',
        topicID: 'freelance_business_marketingresearch',
        color: 'peach',
        icon: 'user-tie',
        parentTopic: {
          topicID: 'freelance_business',
        },
      },
      {
        name: 'Customer Service',
        topicID: 'freelance_business_customerservice',
        color: 'peach',
        icon: 'user-tie',
        parentTopic: {
          topicID: 'freelance_business',
        },
      },
      {
        name: 'Other',
        topicID: 'freelance_business_other',
        color: 'peach',
        icon: 'user-tie',
        parentTopic: {
          topicID: 'freelance_business',
        },
      },
    ],
  },
  {
    name: 'Writing',
    topicID: 'freelance_writing',
    icon: 'feather',
    color: 'peach',
    children: [
      {
        name: 'Editing & Proofreading',
        topicID: 'freelance_writing_editingproofreading',
        color: 'peach',
        icon: 'feather',
        parentTopic: {
          topicID: 'freelance_writing',
        },
      },
      {
        name: 'Content Writing',
        topicID: 'freelance_writing_contentwriting',
        color: 'peach',
        icon: 'feather',
        parentTopic: {
          topicID: 'freelance_writing',
        },
      },
      {
        name: 'Ghostwriting',
        topicID: 'freelance_writing_ghostwriting',
        color: 'peach',
        icon: 'feather',
        parentTopic: {
          topicID: 'freelance_writing',
        },
      },
      {
        name: 'Business Writing',
        topicID: 'freelance_writing_businesswriting',
        color: 'peach',
        icon: 'feather',
        parentTopic: {
          topicID: 'freelance_writing',
        },
      },
      {
        name: 'Creative Writing',
        topicID: 'freelance_writing_creativewriting',
        color: 'peach',
        icon: 'feather',
        parentTopic: {
          topicID: 'freelance_writing',
        },
      },
      {
        name: 'Technical Writing',
        topicID: 'freelance_writing_technicalwriting',
        color: 'peach',
        icon: 'feather',
        parentTopic: {
          topicID: 'freelance_writing',
        },
      },
      {
        name: 'Other',
        topicID: 'freelance_writing_other',
        color: 'peach',
        icon: 'feather',
        parentTopic: {
          topicID: 'freelance_writing',
        },
      },
    ],
  },
];

export const investList = [
  {
    name: 'Startup',
    topicID: 'invest_startup',
    icon: 'rocket',
    color: 'green',
  },
  {
    name: 'Venture Capital',
    topicID: 'invest_venturecapital',
    icon: 'dollar-sign',
    color: 'green',
  },
  {
    name: 'Real Estate',
    topicID: 'invest_realestate',
    icon: 'home',
    color: 'green',
  },
  {
    name: 'Hedge Fund',
    topicID: 'invest_hedgefund',
    icon: 'chart-line',
    color: 'green',
  },
  {
    name: 'Other',
    topicID: 'invest_other',
    icon: 'comment-dollar',
    color: 'green',
  },
];

// copied from database query (format: children under parent)
export const topicsList = [
  {
    children: [
      {
        name: 'Software',
        topicID: 'topics_technology_software',
        icon: 'bolt',
        color: 'yellow',
        image:
          'https://images.unsplash.com/photo-1515524738708-327f6b0037a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'Game Dev',
        topicID: 'topics_technology_gamedev',
        icon: 'bolt',
        color: 'yellow',
        image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'Web Dev',
        topicID: 'topics_technology_webdev',
        icon: 'bolt',
        color: 'yellow',
        image:
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'Mobile Dev',
        topicID: 'topics_technology_mobiledev',
        icon: 'bolt',
        color: 'yellow',
        image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'Backend Dev',
        topicID: 'topics_technology_backenddev',
        icon: 'bolt',
        color: 'yellow',
        image:
          'https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'Electronics',
        topicID: 'topics_technology_electronics',
        icon: 'bolt',
        color: 'yellow',
        image:
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'Hardware',
        topicID: 'topics_technology_hardware',
        icon: 'bolt',
        color: 'yellow',
        image:
          'https://images.unsplash.com/photo-1537151377170-9c19a791bbea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'Semiconductors',
        topicID: 'topics_technology_semiconductors',
        icon: 'bolt',
        color: 'yellow',
        image:
          'https://images.unsplash.com/photo-1568209865332-a15790aed756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'Cloud Computing',
        topicID: 'topics_technology_cloudcomputing',
        icon: 'bolt',
        color: 'yellow',
        image: 'https://images.unsplash.com/photo-1564457461758-8ff96e439e83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'VR/AR',
        topicID: 'topics_technology_vrar',
        icon: 'bolt',
        color: 'yellow',
        image:
          'https://images.unsplash.com/photo-1538388149542-5e24932d11a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'Crypto',
        topicID: 'topics_technology_crypto',
        icon: 'bolt',
        color: 'yellow',
        image:
          'https://images.unsplash.com/photo-1591994843349-f415893b3a6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'AI',
        topicID: 'topics_technology_ai',
        icon: 'bolt',
        color: 'yellow',
        image:
          'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'Automation',
        topicID: 'topics_technology_automation',
        icon: 'bolt',
        color: 'yellow',
        image: 'https://images.unsplash.com/photo-1553678324-f84674bd7b24?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'IT & Networking',
        topicID: 'topics_technology_itnetworking',
        icon: 'bolt',
        color: 'yellow',
        image:
          'https://images.unsplash.com/flagged/photo-1579274216947-86eaa4b00475?ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'Aerospace & Aviation',
        topicID: 'topics_technology_aerospaceaviation',
        icon: 'bolt',
        color: 'yellow',
        image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
      {
        name: 'Automotive',
        topicID: 'topics_technology_automotive',
        icon: 'bolt',
        color: 'yellow',
        image:
          'https://images.unsplash.com/photo-1564988190258-6814018f66ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_technology',
        },
      },
    ],
    name: 'Technology',
    topicID: 'topics_technology',
    icon: 'bolt',
    color: 'yellow',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    children: [
      {
        name: 'Physics',
        topicID: 'topics_science_physics',
        icon: 'atom',
        color: 'purple',
        image: 'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
        parentTopic: {
          topicID: 'topics_science',
        },
      },
      {
        name: 'Biotechnology',
        topicID: 'topics_science_biotechnology',
        icon: 'atom',
        color: 'purple',
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        parentTopic: {
          topicID: 'topics_science',
        },
      },
      {
        name: 'Astrophysics',
        topicID: 'topics_science_astrophysics',
        icon: 'atom',
        color: 'purple',
        image:
          'https://images.unsplash.com/photo-1562571046-d34f606e7693?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_science',
        },
      },
      {
        name: 'Chemistry',
        topicID: 'topics_science_chemistry',
        icon: 'atom',
        color: 'purple',
        image:
          'https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80',
        parentTopic: {
          topicID: 'topics_science',
        },
      },
      {
        name: 'Biology',
        topicID: 'topics_science_biology',
        icon: 'atom',
        color: 'purple',
        image:
          'https://images.unsplash.com/photo-1532153470116-e8c2088b8ac1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_science',
        },
      },
      {
        name: 'Anthropology',
        topicID: 'topics_science_anthropology',
        icon: 'atom',
        color: 'purple',
        image:
          'https://images.unsplash.com/photo-1527922751658-fdc12370761e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_science',
        },
      },
      {
        name: 'Renewable Energy',
        topicID: 'topics_science_renewableenergy',
        icon: 'atom',
        color: 'purple',
        image:
          'https://images.unsplash.com/photo-1508791290064-c27cc1ef7a9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
        parentTopic: {
          topicID: 'topics_science',
        },
      },
    ],
    name: 'Science',
    topicID: 'topics_science',
    icon: 'atom',
    color: 'purple',
    image:
      'https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    children: [
      {
        name: 'Photography',
        topicID: 'topics_creatives_photography',
        icon: 'palette',
        color: 'green',
        image:
          'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_creatives',
        },
      },
      {
        name: 'Videography',
        topicID: 'topics_creatives_videography',
        icon: 'palette',
        color: 'green',
        image:
          'https://images.unsplash.com/photo-1493094614670-f6784185cde0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1339&q=80',
        parentTopic: {
          topicID: 'topics_creatives',
        },
      },
      {
        name: 'UI/UX',
        topicID: 'topics_creatives_uiux',
        icon: 'palette',
        color: 'green',
        image: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1377&q=80',
        parentTopic: {
          topicID: 'topics_creatives',
        },
      },
      {
        name: 'Graphic Design',
        topicID: 'topics_creatives_graphicdesign',
        icon: 'palette',
        color: 'green',
        image: 'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
        parentTopic: {
          topicID: 'topics_creatives',
        },
      },
      {
        name: 'Visual Art',
        topicID: 'topics_creatives_visualart',
        icon: 'palette',
        color: 'green',
        image:
          'https://images.unsplash.com/photo-1551609622-111c80785bdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_creatives',
        },
      },
      {
        name: 'Fashion & Apparel',
        topicID: 'topics_creatives_fashionapparel',
        icon: 'palette',
        color: 'green',
        image:
          'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        parentTopic: {
          topicID: 'topics_creatives',
        },
      },
    ],
    name: 'Creatives',
    topicID: 'topics_creatives',
    icon: 'palette',
    color: 'green',
    image: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    children: [
      {
        name: 'Music',
        topicID: 'topics_entertainment_music',
        icon: 'film',
        color: 'orange',
        image:
          'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_entertainment',
        },
      },
      {
        name: 'Acting',
        topicID: 'topics_entertainment_acting',
        icon: 'film',
        color: 'orange',
        image: 'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_entertainment',
        },
      },
      {
        name: 'Comedy',
        topicID: 'topics_entertainment_comedy',
        icon: 'film',
        color: 'orange',
        image: 'https://images.unsplash.com/photo-1581222963431-00ab5d117de8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        parentTopic: {
          topicID: 'topics_entertainment',
        },
      },
      {
        name: 'Motion Picture',
        topicID: 'topics_entertainment_motionpicture',
        icon: 'film',
        color: 'orange',
        image:
          'https://images.unsplash.com/photo-1557407616-bdd0735cef37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_entertainment',
        },
      },
      {
        name: 'Writing',
        topicID: 'topics_entertainment_writing',
        icon: 'film',
        color: 'orange',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1266&q=80',
        parentTopic: {
          topicID: 'topics_entertainment',
        },
      },
      {
        name: 'Gaming',
        topicID: 'topics_entertainment_gaming',
        icon: 'film',
        color: 'orange',
        image:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
        parentTopic: {
          topicID: 'topics_entertainment',
        },
      },
    ],
    name: 'Entertainment',
    topicID: 'topics_entertainment',
    icon: 'film',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    children: [
      {
        name: 'Entrepreneurship',
        topicID: 'topics_business_entrepreneurship',
        icon: 'user-tie',
        color: 'black',
        image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_business',
        },
      },
      {
        name: 'Small Business',
        topicID: 'topics_business_smallbusiness',
        icon: 'user-tie',
        color: 'black',
        image:
          'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_business',
        },
      },
      {
        name: 'Large Business',
        topicID: 'topics_business_largebusiness',
        icon: 'user-tie',
        color: 'black',
        image:
          'https://images.unsplash.com/photo-1478186014654-5a7e3898daa5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_business',
        },
      },
      {
        name: 'Startups',
        topicID: 'topics_business_startups',
        icon: 'user-tie',
        color: 'black',
        image:
          'https://images.unsplash.com/photo-1589561253898-768105ca91a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
        parentTopic: {
          topicID: 'topics_business',
        },
      },
      {
        name: 'HR',
        topicID: 'topics_business_hr',
        icon: 'user-tie',
        color: 'black',
        image: 'https://images.unsplash.com/photo-1568598035424-7070b67317d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
        parentTopic: {
          topicID: 'topics_business',
        },
      },
      {
        name: 'Accounting',
        topicID: 'topics_business_accounting',
        icon: 'user-tie',
        color: 'black',
        image:
          'https://images.unsplash.com/photo-1563198804-b144dfc1661c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1341&q=80',
        parentTopic: {
          topicID: 'topics_business',
        },
      },
      {
        name: 'Logistics',
        topicID: 'topics_business_logistics',
        icon: 'user-tie',
        color: 'black',
        image: 'https://images.unsplash.com/photo-1494961104209-3c223057bd26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1292&q=80',
        parentTopic: {
          topicID: 'topics_business',
        },
      },
      {
        name: 'Manufacturing',
        topicID: 'topics_business_manufacturing',
        icon: 'user-tie',
        color: 'black',
        image:
          'https://images.unsplash.com/photo-1585201731775-0597e1be4bfb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80',
        parentTopic: {
          topicID: 'topics_business',
        },
      },
      {
        name: 'Sales',
        topicID: 'topics_business_sales',
        icon: 'user-tie',
        color: 'black',
        image: 'https://images.unsplash.com/photo-1585562125287-d748f3097a8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_business',
        },
      },
      {
        name: 'Operations',
        topicID: 'topics_business_operations',
        icon: 'user-tie',
        color: 'black',
        image:
          'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
        parentTopic: {
          topicID: 'topics_business',
        },
      },
      {
        name: 'Management',
        topicID: 'topics_business_management',
        icon: 'user-tie',
        color: 'black',
        image: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
        parentTopic: {
          topicID: 'topics_business',
        },
      },
    ],
    name: 'Business',
    topicID: 'topics_business',
    icon: 'user-tie',
    color: 'black',
    image:
      'https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    children: [
      {
        name: 'Stock Market',
        topicID: 'topics_finance_stockmarket',
        icon: 'chart-line',
        color: 'green',
        image:
          'https://images.unsplash.com/photo-1585504256855-6718f7a693ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_finance',
        },
      },
      {
        name: 'Day Trading',
        topicID: 'topics_finance_daytrading',
        icon: 'chart-line',
        color: 'green',
        image:
          'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_finance',
        },
      },
      {
        name: 'Wealth Management',
        topicID: 'topics_finance_wealthmanagement',
        icon: 'chart-line',
        color: 'green',
        image: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1266&q=80',
        parentTopic: {
          topicID: 'topics_finance',
        },
      },
      {
        name: 'Banking',
        topicID: 'topics_finance_banking',
        icon: 'chart-line',
        color: 'green',
        image:
          'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1295&q=80',
        parentTopic: {
          topicID: 'topics_finance',
        },
      },
      {
        name: 'Insurance',
        topicID: 'topics_finance_insurance',
        icon: 'chart-line',
        color: 'green',
        image:
          'https://images.unsplash.com/photo-1525466760727-1d8be8721154?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_finance',
        },
      },
    ],
    name: 'Finance & Markets',
    topicID: 'topics_finance',
    icon: 'chart-line',
    color: 'green',
    image:
      'https://images.unsplash.com/photo-1586021280718-53fbadcb65a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
  },
  {
    children: [
      {
        name: 'Social Media Marketing',
        topicID: 'topics_marketing_socialmediamarketing',
        icon: 'hashtag',
        color: 'twitterBlue',
        image:
          'https://images.unsplash.com/photo-1554177255-61502b352de3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_marketing',
        },
      },
      {
        name: 'Advertising',
        topicID: 'topics_marketing_advertising',
        icon: 'hashtag',
        color: 'twitterBlue',
        image:
          'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80',
        parentTopic: {
          topicID: 'topics_marketing',
        },
      },
      {
        name: 'Branding',
        topicID: 'topics_marketing_branding',
        icon: 'hashtag',
        color: 'twitterBlue',
        image:
          'https://images.unsplash.com/photo-1508599589920-14cfa1c1fe4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1292&q=80',
        parentTopic: {
          topicID: 'topics_marketing',
        },
      },
    ],
    name: 'Marketing',
    topicID: 'topics_marketing',
    icon: 'hashtag',
    color: 'twitterBlue',
    image:
      'https://images.unsplash.com/photo-1514580426463-fd77dc4d0672?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=630&q=80',
  },
  {
    children: [
      {
        name: 'Fitness',
        topicID: 'topics_health_fitness',
        icon: 'heartbeat',
        color: 'red',
        image:
          'https://images.unsplash.com/photo-1539798488725-7387f3229c49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
        parentTopic: {
          topicID: 'topics_health',
        },
      },
      {
        name: 'Nutrition',
        topicID: 'topics_health_nutrition',
        icon: 'heartbeat',
        color: 'red',
        image:
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_health',
        },
      },
      {
        name: 'Running',
        topicID: 'topics_health_running',
        icon: 'heartbeat',
        color: 'red',
        image:
          'https://images.unsplash.com/photo-1547483238-f400e65ccd56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_health',
        },
      },
      {
        name: 'Crossfit',
        topicID: 'topics_health_crossfit',
        icon: 'heartbeat',
        color: 'red',
        image:
          'https://images.unsplash.com/photo-1578762560042-46ad127c95ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_health',
        },
      },
      {
        name: 'Weight Lifting',
        topicID: 'topics_health_weightlifting',
        icon: 'heartbeat',
        color: 'red',
        image:
          'https://images.unsplash.com/photo-1583248839364-bd7430a3cd83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
        parentTopic: {
          topicID: 'topics_health',
        },
      },
      {
        name: 'Medicine',
        topicID: 'topics_health_medicine',
        icon: 'heartbeat',
        color: 'red',
        image:
          'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=677&q=80',
        parentTopic: {
          topicID: 'topics_health',
        },
      },
      {
        name: 'Physical Therapy',
        topicID: 'topics_health_physicaltherapy',
        icon: 'heartbeat',
        color: 'red',
        image:
          'https://images.unsplash.com/photo-1581090122319-8fab9528eaaa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_health',
        },
      },
    ],
    name: 'Health & Wellness',
    topicID: 'topics_health',
    icon: 'heartbeat',
    color: 'red',
    image: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    children: [
      {
        name: 'Social Media',
        topicID: 'topics_content_socialmedia',
        icon: 'thumbs-up',
        color: 'blue',
        image:
          'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
        parentTopic: {
          topicID: 'topics_content',
        },
      },
      {
        name: 'Blogging',
        topicID: 'topics_content_blogging',
        icon: 'thumbs-up',
        color: 'blue',
        image: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_content',
        },
      },
      {
        name: 'Podcasting',
        topicID: 'topics_content_podcasting',
        icon: 'thumbs-up',
        color: 'blue',
        image:
          'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_content',
        },
      },
      {
        name: 'YouTube',
        topicID: 'topics_content_youtube',
        icon: 'thumbs-up',
        color: 'blue',
        image:
          'https://images.unsplash.com/photo-1551817958-11e0f7bbea9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_content',
        },
      },
      {
        name: 'Streaming',
        topicID: 'topics_content_streaming',
        icon: 'thumbs-up',
        color: 'blue',
        image:
          'https://images.unsplash.com/photo-1584839401450-accbe1a8ef7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_content',
        },
      },
    ],
    name: 'Content Creators',
    topicID: 'topics_content',
    icon: 'thumbs-up',
    color: 'blue',
    image:
      'https://images.unsplash.com/photo-1558975285-193b2c315c2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  },
  {
    children: [
      {
        name: 'Politics',
        topicID: 'topics_news_politics',
        icon: 'newspaper',
        color: 'gray100',
        image:
          'https://images.unsplash.com/photo-1534293230397-c067fc201ab8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_news',
        },
      },
      {
        name: 'Journalism',
        topicID: 'topics_news_journalism',
        icon: 'newspaper',
        color: 'gray100',
        image:
          'https://images.unsplash.com/photo-1498644035638-2c3357894b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_news',
        },
      },
      {
        name: 'Law & Policy',
        topicID: 'topics_news_lawpolicy',
        icon: 'newspaper',
        color: 'gray100',
        image:
          'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_news',
        },
      },
    ],
    name: 'News & Politics',
    topicID: 'topics_news',
    icon: 'newspaper',
    color: 'gray100',
    image:
      'https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
  },
  {
    children: [
      {
        name: 'Esports',
        topicID: 'topics_sports_esports',
        icon: 'football-ball',
        color: 'orange',
        image:
          'https://images.unsplash.com/photo-1558742569-fe6d39d05837?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_sports',
        },
      },
      {
        name: 'Football',
        topicID: 'topics_sports_football',
        icon: 'football-ball',
        color: 'orange',
        image:
          'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1226&q=80',
        parentTopic: {
          topicID: 'topics_sports',
        },
      },
      {
        name: 'Basketball',
        topicID: 'topics_sports_basketball',
        icon: 'football-ball',
        color: 'orange',
        image:
          'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_sports',
        },
      },
      {
        name: 'Baseball',
        topicID: 'topics_sports_baseball',
        icon: 'football-ball',
        color: 'orange',
        image:
          'https://images.unsplash.com/photo-1554591203-d6433caa8495?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_sports',
        },
      },
      {
        name: 'Softball',
        topicID: 'topics_sports_softball',
        icon: 'football-ball',
        color: 'orange',
        image:
          'https://images.unsplash.com/photo-1482632322416-218f4e111f73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_sports',
        },
      },
      {
        name: 'Lacrosse',
        topicID: 'topics_sports_lacrosse',
        icon: 'football-ball',
        color: 'orange',
        image:
          'https://images.unsplash.com/photo-1542203058806-6c509a67ead2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_sports',
        },
      },
      {
        name: 'Auto Racing',
        topicID: 'topics_sports_autoracing',
        icon: 'football-ball',
        color: 'orange',
        image:
          'https://images.unsplash.com/photo-1583949646527-db4aa9388fd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
        parentTopic: {
          topicID: 'topics_sports',
        },
      },
      {
        name: 'Hockey',
        topicID: 'topics_sports_hockey',
        icon: 'football-ball',
        color: 'orange',
        image: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        parentTopic: {
          topicID: 'topics_sports',
        },
      },
      {
        name: 'Golf',
        topicID: 'topics_sports_golf',
        icon: 'football-ball',
        color: 'orange',
        image:
          'https://images.unsplash.com/photo-1576220258822-153014832245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1364&q=80',
        parentTopic: {
          topicID: 'topics_sports',
        },
      },
      {
        name: 'MMA',
        topicID: 'topics_sports_mma',
        icon: 'football-ball',
        color: 'orange',
        image: 'https://images.unsplash.com/photo-1569514195436-85d36b8d0f47?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_sports',
        },
      },
    ],
    name: 'Sports',
    topicID: 'topics_sports',
    icon: 'football-ball',
    color: 'orange',
    image:
      'https://images.unsplash.com/photo-1590872406632-4436a940273e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
  },
  {
    children: [
      {
        name: 'House Flipping',
        topicID: 'topics_realestate_houseflipping',
        icon: 'home',
        color: 'blue',
        image:
          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80',
        parentTopic: {
          topicID: 'topics_realestate',
        },
      },
      {
        name: 'Commercial',
        topicID: 'topics_realestate_commercial',
        icon: 'home',
        color: 'blue',
        image:
          'https://images.unsplash.com/photo-1586800112082-37ff5b5cd73c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_realestate',
        },
      },
      {
        name: 'Multifamily',
        topicID: 'topics_realestate_multifamily',
        icon: 'home',
        color: 'blue',
        image:
          'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=614&q=80',
        parentTopic: {
          topicID: 'topics_realestate',
        },
      },
      {
        name: 'Single Family',
        topicID: 'topics_realestate_singlefamily',
        icon: 'home',
        color: 'blue',
        image:
          'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_realestate',
        },
      },
      {
        name: 'Realtor',
        topicID: 'topics_realestate_realtor',
        icon: 'home',
        color: 'blue',
        image:
          'https://images.unsplash.com/photo-1547866751-446296f133ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80',
        parentTopic: {
          topicID: 'topics_realestate',
        },
      },
    ],
    name: 'Real Estate',
    topicID: 'topics_realestate',
    icon: 'home',
    color: 'blue',
    image:
      'https://images.unsplash.com/flagged/photo-1558954157-aa76c0d246c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
  },
  {
    children: [
      {
        name: 'Pre-school',
        topicID: 'topics_education_preschool',
        icon: 'graduation-cap',
        color: 'black',
        image: 'https://images.unsplash.com/photo-1587586062323-836089e60d52?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_education',
        },
      },
      {
        name: 'Elementary',
        topicID: 'topics_education_elementary',
        icon: 'graduation-cap',
        color: 'black',
        image:
          'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
        parentTopic: {
          topicID: 'topics_education',
        },
      },
      {
        name: 'Middle School',
        topicID: 'topics_education_middleschool',
        icon: 'graduation-cap',
        color: 'black',
        image:
          'https://images.unsplash.com/photo-1533756102515-155e3863ee1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_education',
        },
      },
      {
        name: 'High School',
        topicID: 'topics_education_highschool',
        icon: 'graduation-cap',
        color: 'black',
        image:
          'https://images.unsplash.com/photo-1559443065-db5f9290a1a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_education',
        },
      },
      {
        name: 'Undergraduate',
        topicID: 'topics_education_undergraduate',
        icon: 'graduation-cap',
        color: 'black',
        image:
          'https://images.unsplash.com/photo-1567923227475-692076a6e26e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_education',
        },
      },
      {
        name: 'Graduate',
        topicID: 'topics_education_graduate',
        icon: 'graduation-cap',
        color: 'black',
        image:
          'https://images.unsplash.com/photo-1551728339-499b333c5c43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_education',
        },
      },
      {
        name: 'Doctoral Studies',
        topicID: 'topics_education_doctoralstudies',
        icon: 'graduation-cap',
        color: 'black',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        parentTopic: {
          topicID: 'topics_education',
        },
      },
    ],
    name: 'Education',
    topicID: 'topics_education',
    icon: 'graduation-cap',
    color: 'black',
    image:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  },
  {
    children: [
      {
        name: 'Food & Bev',
        topicID: 'topics_industry_foodbev',
        icon: 'cogs',
        color: 'purple',
        image:
          'https://images.unsplash.com/photo-1541544348958-c19138585962?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_industry',
        },
      },
      {
        name: 'E-commerce & Retail',
        topicID: 'topics_industry_ecommerceretail',
        icon: 'cogs',
        color: 'purple',
        image:
          'https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_industry',
        },
      },
      {
        name: 'Construction',
        topicID: 'topics_industry_construction',
        icon: 'cogs',
        color: 'purple',
        image:
          'https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
        parentTopic: {
          topicID: 'topics_industry',
        },
      },
      {
        name: 'Non-profit',
        topicID: 'topics_industry_nonprofit',
        icon: 'cogs',
        color: 'purple',
        image:
          'https://images.unsplash.com/photo-1526137844794-45f1041f397a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        parentTopic: {
          topicID: 'topics_industry',
        },
      },
      {
        name: 'Travel & Hospitality',
        topicID: 'topics_industry_travelhospitality',
        icon: 'cogs',
        color: 'purple',
        image: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=787&q=80',
        parentTopic: {
          topicID: 'topics_industry',
        },
      },
    ],
    name: 'Industry',
    topicID: 'topics_industry',
    icon: 'cogs',
    color: 'purple',
    image:
      'https://images.unsplash.com/photo-1560574188-6a6774965120?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
];

// automatically create the allTopics array from topicsList and freelanceList
const allTopicsArray = [];

let i = 0;
for (i = 0; i < topicsList.length; i++) {
  const { name, topicID, icon, color, image, parentTopic, children } = topicsList[i]; // get main topic
  // add the parent object
  allTopicsArray.push({ name, topicID, icon, color, image, parentTopic });
  // add the children
  allTopicsArray.push(...children);
}

let j = 0;
for (j = 0; j < freelanceList.length; j++) {
  const { name, topicID, icon, color, parentTopic, children } = freelanceList[j]; // get main topic
  // add the parent object
  allTopicsArray.push({ name, topicID, icon, color, parentTopic });
  // add the children
  allTopicsArray.push(...children);
}

let k = 0;
for (k = 0; k < investList.length; k++) {
  const { name, topicID, icon, color } = investList[k]; // get main topic
  // add the parent object
  allTopicsArray.push({ name, topicID, icon, color });
}

export const allTopics = [...allTopicsArray];

// export const allTopics = [
//   {
//     name: 'Software',
//     topicID: 'topics_technology_software',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/466ENaLuhLY',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Game Dev',
//     topicID: 'topics_technology_gamedev',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/XC3fq-ffXRI',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Web Dev',
//     topicID: 'topics_technology_webdev',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/OqtafYT5kTw',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Mobile Dev',
//     topicID: 'topics_technology_mobiledev',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/89xuP-XmyrA',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Backend Dev',
//     topicID: 'topics_technology_backenddev',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/1K6IQsQbizI',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Electronics',
//     topicID: 'topics_technology_electronics',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/SYTO3xs06fU',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Hardware',
//     topicID: 'topics_technology_hardware',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/ogxlyCA1BQc',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Semiconductors',
//     topicID: 'topics_technology_semiconductors',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/c3ZWXOv1Ndc',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Cloud Computing',
//     topicID: 'topics_technology_cloudcomputing',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/aWslrFhs1w4',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'VR/AR',
//     topicID: 'topics_technology_vrar',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/IMUwe-p1yqs',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Crypto',
//     topicID: 'topics_technology_crypto',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/aX1hN4uNd-I',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'AI',
//     topicID: 'topics_technology_ai',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/U3sOwViXhkY',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Automation',
//     topicID: 'topics_technology_automation',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/GpNOhig3LSU',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'IT & Networking',
//     topicID: 'topics_technology_itnetworking',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/zFYUsLk_50Y',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Aerospace & Aviation',
//     topicID: 'topics_technology_aerospaceaviation',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/Ptd-iTdrCJM',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Automotive',
//     topicID: 'topics_technology_automotive',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/Lz53HpZkt_Q',
//     parentTopic: {
//       topicID: 'topics_technology',
//     },
//   },
//   {
//     name: 'Technology',
//     topicID: 'topics_technology',
//     icon: 'bolt',
//     color: 'yellow',
//     image: 'https://unsplash.com/photos/iar-afB0QQw',
//   },
//   {
//     name: 'Physics',
//     topicID: 'topics_science_physics',
//     icon: 'atom',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/Y31Z6Mf7rys',
//     parentTopic: {
//       topicID: 'topics_science',
//     },
//   },
//   {
//     name: 'Biotechnology',
//     topicID: 'topics_science_biotechnology',
//     icon: 'atom',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/L7en7Lb-Ovc',
//     parentTopic: {
//       topicID: 'topics_science',
//     },
//   },
//   {
//     name: 'Astrophysics',
//     topicID: 'topics_science_astrophysics',
//     icon: 'atom',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/n00dm9FBwrs',
//     parentTopic: {
//       topicID: 'topics_science',
//     },
//   },
//   {
//     name: 'Chemistry',
//     topicID: 'topics_science_chemistry',
//     icon: 'atom',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/yS3XM9qx3hQ',
//     parentTopic: {
//       topicID: 'topics_science',
//     },
//   },
//   {
//     name: 'Biology',
//     topicID: 'topics_science_biology',
//     icon: 'atom',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/biVuafyC8oI',
//     parentTopic: {
//       topicID: 'topics_science',
//     },
//   },
//   {
//     name: 'Anthropology',
//     topicID: 'topics_science_anthropology',
//     icon: 'atom',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/ZZV1FOGaQ8s',
//     parentTopic: {
//       topicID: 'topics_science',
//     },
//   },
//   {
//     name: 'Renewable Energy',
//     topicID: 'topics_science_renewableenergy',
//     icon: 'atom',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/eIBTh5DXW9w',
//     parentTopic: {
//       topicID: 'topics_science',
//     },
//   },
//   {
//     name: 'Science',
//     topicID: 'topics_science',
//     icon: 'atom',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/OgvqXGL7XO4',
//   },
//   {
//     name: 'Photography',
//     topicID: 'topics_creatives_photography',
//     icon: 'palette',
//     color: 'green',
//     image: 'https://unsplash.com/photos/2Wv9VnwzeeI',
//     parentTopic: {
//       topicID: 'topics_creatives',
//     },
//   },
//   {
//     name: 'Videography',
//     topicID: 'topics_creatives_videography',
//     icon: 'palette',
//     color: 'green',
//     image: 'https://unsplash.com/photos/hlKw49XvyRU',
//     parentTopic: {
//       topicID: 'topics_creatives',
//     },
//   },
//   {
//     name: 'UI/UX',
//     topicID: 'topics_creatives_uiux',
//     icon: 'palette',
//     color: 'green',
//     image: 'https://unsplash.com/photos/cZr2sgaxy3Q',
//     parentTopic: {
//       topicID: 'topics_creatives',
//     },
//   },
//   {
//     name: 'Graphic Design',
//     topicID: 'topics_creatives_graphicdesign',
//     icon: 'palette',
//     color: 'green',
//     image: 'https://unsplash.com/photos/muOHbrFGEQY',
//     parentTopic: {
//       topicID: 'topics_creatives',
//     },
//   },
//   {
//     name: 'Visual Art',
//     topicID: 'topics_creatives_visualart',
//     icon: 'palette',
//     color: 'green',
//     image: 'https://unsplash.com/photos/MigkcNowxQk',
//     parentTopic: {
//       topicID: 'topics_creatives',
//     },
//   },
//   {
//     name: 'Fashion & Apparel',
//     topicID: 'topics_creatives_fashionapparel',
//     icon: 'palette',
//     color: 'green',
//     image: '',
//     parentTopic: {
//       topicID: 'topics_creatives',
//     },
//   },
//   {
//     name: 'Creatives',
//     topicID: 'topics_creatives',
//     icon: 'palette',
//     color: 'green',
//     image: 'https://unsplash.com/photos/5E5N49RWtbA',
//   },
//   {
//     name: 'Music',
//     topicID: 'topics_entertainment_music',
//     icon: 'film',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/1oKxSKSOowE',
//     parentTopic: {
//       topicID: 'topics_entertainment',
//     },
//   },
//   {
//     name: 'Acting',
//     topicID: 'topics_entertainment_acting',
//     icon: 'film',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/Hn3S90f6aak',
//     parentTopic: {
//       topicID: 'topics_entertainment',
//     },
//   },
//   {
//     name: 'Comedy',
//     topicID: 'topics_entertainment_comedy',
//     icon: 'film',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/9oFQ_CCCBa0',
//     parentTopic: {
//       topicID: 'topics_entertainment',
//     },
//   },
//   {
//     name: 'Motion Picture',
//     topicID: 'topics_entertainment_motionpicture',
//     icon: 'film',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/j6PStH6cuRY',
//     parentTopic: {
//       topicID: 'topics_entertainment',
//     },
//   },
//   {
//     name: 'Writing',
//     topicID: 'topics_entertainment_writing',
//     icon: 'film',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/y02jEX_B0O0',
//     parentTopic: {
//       topicID: 'topics_entertainment',
//     },
//   },
//   {
//     name: 'Gaming',
//     topicID: 'topics_entertainment_gaming',
//     icon: 'film',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/m3hn2Kn5Bns',
//     parentTopic: {
//       topicID: 'topics_entertainment',
//     },
//   },
//   {
//     name: 'Entertainment',
//     topicID: 'topics_entertainment',
//     icon: 'film',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/9lTUAlNB87M',
//   },
//   {
//     name: 'Entrepreneurship',
//     topicID: 'topics_business_entrepreneurship',
//     icon: 'user-tie',
//     color: 'black',
//     image: 'https://unsplash.com/photos/jw3GOzxiSkw',
//     parentTopic: {
//       topicID: 'topics_business',
//     },
//   },
//   {
//     name: 'Small Business',
//     topicID: 'topics_business_smallbusiness',
//     icon: 'user-tie',
//     color: 'black',
//     image: 'https://unsplash.com/photos/qvWnGmoTbik',
//     parentTopic: {
//       topicID: 'topics_business',
//     },
//   },
//   {
//     name: 'Large Business',
//     topicID: 'topics_business_largebusiness',
//     icon: 'user-tie',
//     color: 'black',
//     image: 'https://unsplash.com/photos/Iboom5tbfvs',
//     parentTopic: {
//       topicID: 'topics_business',
//     },
//   },
//   {
//     name: 'Startups',
//     topicID: 'topics_business_startups',
//     icon: 'user-tie',
//     color: 'black',
//     image: 'https://unsplash.com/photos/Y_LgXwQEx2c',
//     parentTopic: {
//       topicID: 'topics_business',
//     },
//   },
//   {
//     name: 'HR',
//     topicID: 'topics_business_hr',
//     icon: 'user-tie',
//     color: 'black',
//     image: 'https://unsplash.com/photos/kOuCX7fh50U',
//     parentTopic: {
//       topicID: 'topics_business',
//     },
//   },
//   {
//     name: 'Accounting',
//     topicID: 'topics_business_accounting',
//     icon: 'user-tie',
//     color: 'black',
//     image: 'https://unsplash.com/photos/kAJLRQwt5yY',
//     parentTopic: {
//       topicID: 'topics_business',
//     },
//   },
//   {
//     name: 'Logistics',
//     topicID: 'topics_business_logistics',
//     icon: 'user-tie',
//     color: 'black',
//     image: 'https://unsplash.com/photos/uBe2mknURG4',
//     parentTopic: {
//       topicID: 'topics_business',
//     },
//   },
//   {
//     name: 'Manufacturing',
//     topicID: 'topics_business_manufacturing',
//     icon: 'user-tie',
//     color: 'black',
//     image: 'https://unsplash.com/photos/xoxnfVIE7Qw',
//     parentTopic: {
//       topicID: 'topics_business',
//     },
//   },
//   {
//     name: 'Sales',
//     topicID: 'topics_business_sales',
//     icon: 'user-tie',
//     color: 'black',
//     image: 'https://unsplash.com/photos/VrJnsLH2nOY',
//     parentTopic: {
//       topicID: 'topics_business',
//     },
//   },
//   {
//     name: 'Operations',
//     topicID: 'topics_business_operations',
//     icon: 'user-tie',
//     color: 'black',
//     image: 'https://unsplash.com/photos/gcsNOsPEXfs',
//     parentTopic: {
//       topicID: 'topics_business',
//     },
//   },
//   {
//     name: 'Management',
//     topicID: 'topics_business_management',
//     icon: 'user-tie',
//     color: 'black',
//     image: 'https://unsplash.com/photos/5aiRb5f464A',
//     parentTopic: {
//       topicID: 'topics_business',
//     },
//   },
//   {
//     name: 'Business',
//     topicID: 'topics_business',
//     icon: 'user-tie',
//     color: 'black',
//     image: 'https://unsplash.com/photos/ZGjbiukp_-A',
//   },
//   {
//     name: 'Stock Market',
//     topicID: 'topics_finance_stockmarket',
//     icon: 'chart-line',
//     color: 'green',
//     image: 'https://unsplash.com/photos/9lI7KVWXVX0',
//     parentTopic: {
//       topicID: 'topics_finance',
//     },
//   },
//   {
//     name: 'Day Trading',
//     topicID: 'topics_finance_daytrading',
//     icon: 'chart-line',
//     color: 'green',
//     image: 'https://unsplash.com/photos/N__BnvQ_w18',
//     parentTopic: {
//       topicID: 'topics_finance',
//     },
//   },
//   {
//     name: 'Wealth Management',
//     topicID: 'topics_finance_wealthmanagement',
//     icon: 'chart-line',
//     color: 'green',
//     image: 'https://unsplash.com/photos/cEukkv42O40',
//     parentTopic: {
//       topicID: 'topics_finance',
//     },
//   },
//   {
//     name: 'Banking',
//     topicID: 'topics_finance_banking',
//     icon: 'chart-line',
//     color: 'green',
//     image: 'https://unsplash.com/photos/lhltMGdohc8',
//     parentTopic: {
//       topicID: 'topics_finance',
//     },
//   },
//   {
//     name: 'Insurance',
//     topicID: 'topics_finance_insurance',
//     icon: 'chart-line',
//     color: 'green',
//     image: 'https://unsplash.com/photos/oRYOOjvPq8E',
//     parentTopic: {
//       topicID: 'topics_finance',
//     },
//   },
//   {
//     name: 'Finance & Markets',
//     topicID: 'topics_finance',
//     icon: 'chart-line',
//     color: 'green',
//     image: 'https://unsplash.com/photos/1M4wYTqVD4o',
//   },
//   {
//     name: 'Social Media Marketing',
//     topicID: 'topics_marketing_socialmediamarketing',
//     icon: 'hashtag',
//     color: 'twitterBlue',
//     image: 'https://unsplash.com/photos/xv7-GlvBLFw',
//     parentTopic: {
//       topicID: 'topics_marketing',
//     },
//   },
//   {
//     name: 'Advertising',
//     topicID: 'topics_marketing_advertising',
//     icon: 'hashtag',
//     color: 'twitterBlue',
//     image: 'https://unsplash.com/photos/5r5554u-mHo',
//     parentTopic: {
//       topicID: 'topics_marketing',
//     },
//   },
//   {
//     name: 'Branding',
//     topicID: 'topics_marketing_branding',
//     icon: 'hashtag',
//     color: 'twitterBlue',
//     image: 'https://unsplash.com/photos/wwqRpSNBPq4',
//     parentTopic: {
//       topicID: 'topics_marketing',
//     },
//   },
//   {
//     name: 'Marketing',
//     topicID: 'topics_marketing',
//     icon: 'hashtag',
//     color: 'twitterBlue',
//     image: 'https://unsplash.com/photos/bLY5JqP_Ldw',
//   },
//   {
//     name: 'Fitness',
//     topicID: 'topics_health_fitness',
//     icon: 'heartbeat',
//     color: 'red',
//     image: 'https://unsplash.com/photos/lTkF2Tdx9uI',
//     parentTopic: {
//       topicID: 'topics_health',
//     },
//   },
//   {
//     name: 'Nutrition',
//     topicID: 'topics_health_nutrition',
//     icon: 'heartbeat',
//     color: 'red',
//     image: 'https://unsplash.com/photos/4_jhDO54BYg',
//     parentTopic: {
//       topicID: 'topics_health',
//     },
//   },
//   {
//     name: 'Running',
//     topicID: 'topics_health_running',
//     icon: 'heartbeat',
//     color: 'red',
//     image: 'https://unsplash.com/photos/QVD3Xht9txA',
//     parentTopic: {
//       topicID: 'topics_health',
//     },
//   },
//   {
//     name: 'Crossfit',
//     topicID: 'topics_health_crossfit',
//     icon: 'heartbeat',
//     color: 'red',
//     image: 'https://unsplash.com/photos/WIPIAJW2-P8',
//     parentTopic: {
//       topicID: 'topics_health',
//     },
//   },
//   {
//     name: 'Weight Lifting',
//     topicID: 'topics_health_weightlifting',
//     icon: 'heartbeat',
//     color: 'red',
//     image: 'https://unsplash.com/photos/79nVN_Cmj3o',
//     parentTopic: {
//       topicID: 'topics_health',
//     },
//   },
//   {
//     name: 'Medicine',
//     topicID: 'topics_health_medicine',
//     icon: 'heartbeat',
//     color: 'red',
//     image: 'https://unsplash.com/photos/kfJkpeI6Lgc',
//     parentTopic: {
//       topicID: 'topics_health',
//     },
//   },
//   {
//     name: 'Physical Therapy',
//     topicID: 'topics_health_physicaltherapy',
//     icon: 'heartbeat',
//     color: 'red',
//     image: 'https://unsplash.com/photos/o6jUolZ7QJk',
//     parentTopic: {
//       topicID: 'topics_health',
//     },
//   },
//   {
//     name: 'Health & Wellness',
//     topicID: 'topics_health',
//     icon: 'heartbeat',
//     color: 'red',
//     image: 'https://unsplash.com/photos/vnpTRdmtQ30',
//   },
//   {
//     name: 'Social Media',
//     topicID: 'topics_content_socialmedia',
//     icon: 'thumbs-up',
//     color: 'blue',
//     image: 'https://unsplash.com/photos/CNbRsQj8mHQ',
//     parentTopic: {
//       topicID: 'topics_content',
//     },
//   },
//   {
//     name: 'Blogging',
//     topicID: 'topics_content_blogging',
//     icon: 'thumbs-up',
//     color: 'blue',
//     image: 'https://unsplash.com/photos/3GZNPBLImWc',
//     parentTopic: {
//       topicID: 'topics_content',
//     },
//   },
//   {
//     name: 'Podcasting',
//     topicID: 'topics_content_podcasting',
//     icon: 'thumbs-up',
//     color: 'blue',
//     image: 'https://unsplash.com/photos/OaPksPcVp50',
//     parentTopic: {
//       topicID: 'topics_content',
//     },
//   },
//   {
//     name: 'YouTube',
//     topicID: 'topics_content_youtube',
//     icon: 'thumbs-up',
//     color: 'blue',
//     image: 'https://unsplash.com/photos/7y-Fr59_MmI',
//     parentTopic: {
//       topicID: 'topics_content',
//     },
//   },
//   {
//     name: 'Streaming',
//     topicID: 'topics_content_streaming',
//     icon: 'thumbs-up',
//     color: 'blue',
//     image: 'https://unsplash.com/photos/dvrh7Hpuyp4',
//     parentTopic: {
//       topicID: 'topics_content',
//     },
//   },
//   {
//     name: 'Content Creators',
//     topicID: 'topics_content',
//     icon: 'thumbs-up',
//     color: 'blue',
//     image: 'https://unsplash.com/photos/0eo4e1eh13I',
//   },
//   {
//     name: 'Politics',
//     topicID: 'topics_news_politics',
//     icon: 'newspaper',
//     color: 'gray100',
//     image: 'https://unsplash.com/photos/v0OWc_skg0g',
//     parentTopic: {
//       topicID: 'topics_news',
//     },
//   },
//   {
//     name: 'Journalism',
//     topicID: 'topics_news_journalism',
//     icon: 'newspaper',
//     color: 'gray100',
//     image: 'https://unsplash.com/photos/zAi2Is48-MA',
//     parentTopic: {
//       topicID: 'topics_news',
//     },
//   },
//   {
//     name: 'Law & Policy',
//     topicID: 'topics_news_lawpolicy',
//     icon: 'newspaper',
//     color: 'gray100',
//     image: 'https://unsplash.com/photos/L4YGuSg0fxs',
//     parentTopic: {
//       topicID: 'topics_news',
//     },
//   },
//   {
//     name: 'News & Politics',
//     topicID: 'topics_news',
//     icon: 'newspaper',
//     color: 'gray100',
//     image: 'https://unsplash.com/photos/Mwuod2cm8g4',
//   },
//   {
//     name: 'Esports',
//     topicID: 'topics_sports_esports',
//     icon: 'football-ball',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/tBG35b1ju2U',
//     parentTopic: {
//       topicID: 'topics_sports',
//     },
//   },
//   {
//     name: 'Football',
//     topicID: 'topics_sports_football',
//     icon: 'football-ball',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/-nATH0CrkMU',
//     parentTopic: {
//       topicID: 'topics_sports',
//     },
//   },
//   {
//     name: 'Basketball',
//     topicID: 'topics_sports_basketball',
//     icon: 'football-ball',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/nM2WEy42Npg',
//     parentTopic: {
//       topicID: 'topics_sports',
//     },
//   },
//   {
//     name: 'Baseball',
//     topicID: 'topics_sports_baseball',
//     icon: 'football-ball',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/FobzAZJGM9M',
//     parentTopic: {
//       topicID: 'topics_sports',
//     },
//   },
//   {
//     name: 'Softball',
//     topicID: 'topics_sports_softball',
//     icon: 'football-ball',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/zoWzrCPCa5U',
//     parentTopic: {
//       topicID: 'topics_sports',
//     },
//   },
//   {
//     name: 'Lacrosse',
//     topicID: 'topics_sports_lacrosse',
//     icon: 'football-ball',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/O8-sO2GdTMo',
//     parentTopic: {
//       topicID: 'topics_sports',
//     },
//   },
//   {
//     name: 'Auto Racing',
//     topicID: 'topics_sports_autoracing',
//     icon: 'football-ball',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/bbYQYZ0Xt_M',
//     parentTopic: {
//       topicID: 'topics_sports',
//     },
//   },
//   {
//     name: 'Hockey',
//     topicID: 'topics_sports_hockey',
//     icon: 'football-ball',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/5oZ9uVx7buc',
//     parentTopic: {
//       topicID: 'topics_sports',
//     },
//   },
//   {
//     name: 'Golf',
//     topicID: 'topics_sports_golf',
//     icon: 'football-ball',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/wn35CKouahQ',
//     parentTopic: {
//       topicID: 'topics_sports',
//     },
//   },
//   {
//     name: 'MMA',
//     topicID: 'topics_sports_mma',
//     icon: 'football-ball',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/I6xpuYm_byM',
//     parentTopic: {
//       topicID: 'topics_sports',
//     },
//   },
//   {
//     name: 'Sports',
//     topicID: 'topics_sports',
//     icon: 'football-ball',
//     color: 'orange',
//     image: 'https://unsplash.com/photos/zmN2bVDFvQ0',
//   },
//   {
//     name: 'House Flipping',
//     topicID: 'topics_realestate_houseflipping',
//     icon: 'home',
//     color: 'blue',
//     image: 'https://unsplash.com/photos/rgJ1J8SDEAY',
//     parentTopic: {
//       topicID: 'topics_realestate',
//     },
//   },
//   {
//     name: 'Commercial',
//     topicID: 'topics_realestate_commercial',
//     icon: 'home',
//     color: 'blue',
//     image: 'https://unsplash.com/photos/PQUOhz2MOWw',
//     parentTopic: {
//       topicID: 'topics_realestate',
//     },
//   },
//   {
//     name: 'Multifamily',
//     topicID: 'topics_realestate_multifamily',
//     icon: 'home',
//     color: 'blue',
//     image: 'https://unsplash.com/photos/WCgioEcEVNc',
//     parentTopic: {
//       topicID: 'topics_realestate',
//     },
//   },
//   {
//     name: 'Single Family',
//     topicID: 'topics_realestate_singlefamily',
//     icon: 'home',
//     color: 'blue',
//     image: 'https://unsplash.com/photos/561igiTyvSk',
//     parentTopic: {
//       topicID: 'topics_realestate',
//     },
//   },
//   {
//     name: 'Realtor',
//     topicID: 'topics_realestate_realtor',
//     icon: 'home',
//     color: 'blue',
//     image: 'https://unsplash.com/photos/tPX992SVljo',
//     parentTopic: {
//       topicID: 'topics_realestate',
//     },
//   },
//   {
//     name: 'Real Estate',
//     topicID: 'topics_realestate',
//     icon: 'home',
//     color: 'blue',
//     image: 'https://unsplash.com/photos/QHDFm084RNk',
//   },
//   {
//     name: 'Pre-school',
//     topicID: 'topics_education_preschool',
//     icon: 'graduation-cap',
//     color: 'black',
//     image: 'https://unsplash.com/photos/YZOVz5f3SBo',
//     parentTopic: {
//       topicID: 'topics_education',
//     },
//   },
//   {
//     name: 'Elementary',
//     topicID: 'topics_education_elementary',
//     icon: 'graduation-cap',
//     color: 'black',
//     image: 'https://unsplash.com/photos/WE_Kv_ZB1l0',
//     parentTopic: {
//       topicID: 'topics_education',
//     },
//   },
//   {
//     name: 'Middle School',
//     topicID: 'topics_education_middleschool',
//     icon: 'graduation-cap',
//     color: 'black',
//     image: 'https://unsplash.com/photos/7DMkvNblkpw',
//     parentTopic: {
//       topicID: 'topics_education',
//     },
//   },
//   {
//     name: 'High School',
//     topicID: 'topics_education_highschool',
//     icon: 'graduation-cap',
//     color: 'black',
//     image: 'https://unsplash.com/photos/JkA4jNmx7mY',
//     parentTopic: {
//       topicID: 'topics_education',
//     },
//   },
//   {
//     name: 'Undergraduate',
//     topicID: 'topics_education_undergraduate',
//     icon: 'graduation-cap',
//     color: 'black',
//     image: 'https://unsplash.com/photos/yL6CrMggt8g',
//     parentTopic: {
//       topicID: 'topics_education',
//     },
//   },
//   {
//     name: 'Graduate',
//     topicID: 'topics_education_graduate',
//     icon: 'graduation-cap',
//     color: 'black',
//     image: 'https://unsplash.com/photos/0oa1jhDLevQ',
//     parentTopic: {
//       topicID: 'topics_education',
//     },
//   },
//   {
//     name: 'Doctoral Studies',
//     topicID: 'topics_education_doctoralstudies',
//     icon: 'graduation-cap',
//     color: 'black',
//     image: 'https://unsplash.com/photos/s9CC2SKySJM',
//     parentTopic: {
//       topicID: 'topics_education',
//     },
//   },
//   {
//     name: 'Education',
//     topicID: 'topics_education',
//     icon: 'graduation-cap',
//     color: 'black',
//     image: 'https://unsplash.com/photos/HH4WBGNyltc',
//   },
//   {
//     name: 'Food & Bev',
//     topicID: 'topics_industry_foodbev',
//     icon: 'cogs',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/wrPxb-FDp1c',
//     parentTopic: {
//       topicID: 'topics_industry',
//     },
//   },
//   {
//     name: 'E-commerce & Retail',
//     topicID: 'topics_industry_ecommerceretail',
//     icon: 'cogs',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/F1I4IN86NiE',
//     parentTopic: {
//       topicID: 'topics_industry',
//     },
//   },
//   {
//     name: 'Construction',
//     topicID: 'topics_industry_construction',
//     icon: 'cogs',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/ESZRBtkQ_f8',
//     parentTopic: {
//       topicID: 'topics_industry',
//     },
//   },
//   {
//     name: 'Non-profit',
//     topicID: 'topics_industry_nonprofit',
//     icon: 'cogs',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/uXvUpHY5o_4',
//     parentTopic: {
//       topicID: 'topics_industry',
//     },
//   },
//   {
//     name: 'Travel & Hospitality',
//     topicID: 'topics_industry_travelhospitality',
//     icon: 'cogs',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/uE2T1tCFsn8',
//     parentTopic: {
//       topicID: 'topics_industry',
//     },
//   },
//   {
//     name: 'Industry',
//     topicID: 'topics_industry',
//     icon: 'cogs',
//     color: 'purple',
//     image: 'https://unsplash.com/photos/-fGqsewtsJY',
//   },
//   // invest topics
//   {
//     name: 'Startup',
//     topicID: 'invest_startup',
//     icon: 'rocket',
//     color: 'green',
//   },
//   {
//     name: 'Venture Capital',
//     topicID: 'invest_venturecapital',
//     icon: 'dollar-sign',
//     color: 'green',
//   },
//   {
//     name: 'Real Estate',
//     topicID: 'invest_realestate',
//     icon: 'home',
//     color: 'green',
//   },
//   {
//     name: 'Hedge Fund',
//     topicID: 'invest_hedgefund',
//     icon: 'chart-line',
//     color: 'green',
//   },
//   {
//     name: 'Other',
//     topicID: 'invest_other',
//     icon: 'comment-dollar',
//     color: 'green',
//   },
//   // freelance list
//   {
//     name: 'Software & Tech',
//     topicID: 'freelance_software',
//     icon: 'code',
//     color: 'peach',
//   },
//   {
//     name: 'Web Development',
//     topicID: 'freelance_software_webdevelopment',
//     color: 'peach',
//     icon: 'code',
//     parentTopic: {
//       topicID: 'freelance_software',
//     },
//   },
//   {
//     name: 'Mobile Apps',
//     topicID: 'freelance_software_mobileapps',
//     color: 'peach',
//     icon: 'code',
//     parentTopic: {
//       topicID: 'freelance_software',
//     },
//   },
//   {
//     name: 'Game Development',
//     topicID: 'freelance_software_gamedevelopment',
//     color: 'peach',
//     icon: 'code',
//     parentTopic: {
//       topicID: 'freelance_software',
//     },
//   },
//   {
//     name: 'E-commerce Development',
//     topicID: 'freelance_software_ecommercedevelopment',
//     color: 'peach',
//     icon: 'code',
//     parentTopic: {
//       topicID: 'freelance_software',
//     },
//   },
//   {
//     name: 'Backend / Database',
//     topicID: 'freelance_software_backenddatabase',
//     color: 'peach',
//     icon: 'code',
//     parentTopic: {
//       topicID: 'freelance_software',
//     },
//   },
//   {
//     name: 'IT & Networking',
//     topicID: 'freelance_software_itnetworking',
//     color: 'peach',
//     icon: 'code',
//     parentTopic: {
//       topicID: 'freelance_software',
//     },
//   },
//   {
//     name: 'Data Science & Analytics',
//     topicID: 'freelance_software_datascienceanalytics',
//     color: 'peach',
//     icon: 'code',
//     parentTopic: {
//       topicID: 'freelance_software',
//     },
//   },
//   {
//     name: 'Other',
//     topicID: 'freelance_software_other',
//     color: 'peach',
//     icon: 'code',
//     parentTopic: {
//       topicID: 'freelance_software',
//     },
//   },

//   {
//     name: 'Engineering',
//     topicID: 'freelance_engineering',
//     icon: 'drafting-compass',
//     color: 'peach',
//   },
//   {
//     name: 'Mechanical Engineering',
//     topicID: 'freelance_engineering_mechanicalengineering',
//     color: 'peach',
//     icon: 'drafting-compass',
//     parentTopic: {
//       topicID: 'freelance_engineering',
//     },
//   },
//   {
//     name: 'Electrical Engineering',
//     topicID: 'freelance_engineering_electricalengineering',
//     color: 'peach',
//     icon: 'drafting-compass',
//     parentTopic: {
//       topicID: 'freelance_engineering',
//     },
//   },
//   {
//     name: 'Chemical Engineering',
//     topicID: 'freelance_engineering_chemicalengineering',
//     color: 'peach',
//     icon: 'drafting-compass',
//     parentTopic: {
//       topicID: 'freelance_engineering',
//     },
//   },
//   {
//     name: 'Civil & Structural Engineering',
//     topicID: 'freelance_engineering_civilstructuralengineering',
//     color: 'peach',
//     icon: 'drafting-compass',
//     parentTopic: {
//       topicID: 'freelance_engineering',
//     },
//   },
//   {
//     name: 'Product Design',
//     topicID: 'freelance_engineering_productdesign',
//     color: 'peach',
//     icon: 'drafting-compass',
//     parentTopic: {
//       topicID: 'freelance_engineering',
//     },
//   },
//   {
//     name: '3D Modeling & CAD',
//     topicID: 'freelance_engineering_3dmodelingcad',
//     color: 'peach',
//     icon: 'drafting-compass',
//     parentTopic: {
//       topicID: 'freelance_engineering',
//     },
//   },
//   {
//     name: 'Other',
//     topicID: 'freelance_engineering_other',
//     color: 'peach',
//     icon: 'drafting-compass',
//     parentTopic: {
//       topicID: 'freelance_engineering',
//     },
//   },

//   {
//     name: 'Graphics & Design',
//     topicID: 'freelance_design',
//     icon: 'paint-brush',
//     color: 'peach',
//   },
//   {
//     name: 'Logo Design',
//     topicID: 'freelance_design_logodesign',
//     color: 'peach',
//     icon: 'paint-brush',
//     parentTopic: {
//       topicID: 'freelance_design',
//     },
//   },
//   {
//     name: 'Brand Design',
//     topicID: 'freelance_design_branddesign',
//     color: 'peach',
//     icon: 'paint-brush',
//     parentTopic: {
//       topicID: 'freelance_design',
//     },
//   },
//   {
//     name: 'Web & Mobile Design',
//     topicID: 'freelance_design_webmobiledesign',
//     color: 'peach',
//     icon: 'paint-brush',
//     parentTopic: {
//       topicID: 'freelance_design',
//     },
//   },
//   {
//     name: 'Graphic Design',
//     topicID: 'freelance_design_graphicdesign',
//     color: 'peach',
//     icon: 'paint-brush',
//     parentTopic: {
//       topicID: 'freelance_design',
//     },
//   },
//   {
//     name: 'Game Design',
//     topicID: 'freelance_design_gamedesign',
//     color: 'peach',
//     icon: 'paint-brush',
//     parentTopic: {
//       topicID: 'freelance_design',
//     },
//   },
//   {
//     name: 'Photoshop',
//     topicID: 'freelance_design_photoshop',
//     color: 'peach',
//     icon: 'paint-brush',
//     parentTopic: {
//       topicID: 'freelance_design',
//     },
//   },
//   {
//     name: 'Other',
//     topicID: 'freelance_design_other',
//     color: 'peach',
//     icon: 'paint-brush',
//     parentTopic: {
//       topicID: 'freelance_design',
//     },
//   },

//   {
//     name: 'Music & Audio',
//     topicID: 'freelance_musicaudio',
//     icon: 'music',
//     color: 'peach',
//   },
//   {
//     name: 'Voice Over',
//     topicID: 'freelance_musicaudio_voiceover',
//     color: 'peach',
//     icon: 'music',
//     parentTopic: {
//       topicID: 'freelance_musicaudio',
//     },
//   },
//   {
//     name: 'Mixing & Mastering',
//     topicID: 'freelance_musicaudio_mixingmastering',
//     color: 'peach',
//     icon: 'music',
//     parentTopic: {
//       topicID: 'freelance_musicaudio',
//     },
//   },
//   {
//     name: 'Producing',
//     topicID: 'freelance_musicaudio_producing',
//     color: 'peach',
//     icon: 'music',
//     parentTopic: {
//       topicID: 'freelance_musicaudio',
//     },
//   },
//   {
//     name: 'Singer-Songwriter',
//     topicID: 'freelance_musicaudio_singersongwriter',
//     color: 'peach',
//     icon: 'music',
//     parentTopic: {
//       topicID: 'freelance_musicaudio',
//     },
//   },
//   {
//     name: 'Other',
//     topicID: 'freelance_musicaudio_other',
//     color: 'peach',
//     icon: 'music',
//     parentTopic: {
//       topicID: 'freelance_musicaudio',
//     },
//   },

//   {
//     name: 'Video & Animation',
//     topicID: 'freelance_videoanimation',
//     icon: 'film',
//     color: 'peach',
//   },
//   {
//     name: 'Explainer Videos',
//     topicID: 'freelance_videoanimation_explainervideos',
//     color: 'peach',
//     icon: 'film',
//     parentTopic: {
//       topicID: 'freelance_videoanimation',
//     },
//   },
//   {
//     name: 'Video Editing',
//     topicID: 'freelance_videoanimation_videoediting',
//     color: 'peach',
//     icon: 'film',
//     parentTopic: {
//       topicID: 'freelance_videoanimation',
//     },
//   },
//   {
//     name: 'Video Production',
//     topicID: 'freelance_videoanimation_videoproduction',
//     color: 'peach',
//     icon: 'film',
//     parentTopic: {
//       topicID: 'freelance_videoanimation',
//     },
//   },
//   {
//     name: 'Intros & Outros',
//     topicID: 'freelance_videoanimation_introsoutros',
//     color: 'peach',
//     icon: 'film',
//     parentTopic: {
//       topicID: 'freelance_videoanimation',
//     },
//   },
//   {
//     name: 'Animations',
//     topicID: 'freelance_videoanimation_animations',
//     color: 'peach',
//     icon: 'film',
//     parentTopic: {
//       topicID: 'freelance_videoanimation',
//     },
//   },
//   {
//     name: 'Short Video Ads',
//     topicID: 'freelance_videoanimation_shortvideoads',
//     color: 'peach',
//     icon: 'film',
//     parentTopic: {
//       topicID: 'freelance_videoanimation',
//     },
//   },
//   {
//     name: 'Other',
//     topicID: 'freelance_videoanimation_other',
//     color: 'peach',
//     icon: 'film',
//     parentTopic: {
//       topicID: 'freelance_videoanimation',
//     },
//   },

//   {
//     name: 'Sales & Marketing',
//     topicID: 'freelance_salesmarketing',
//     icon: 'comment-dollar',
//     color: 'peach',
//   },
//   {
//     name: 'Social Media Marketing',
//     topicID: 'freelance_salesmarketing_socialmediamarketing',
//     color: 'peach',
//     icon: 'comment-dollar',
//     parentTopic: {
//       topicID: 'freelance_salesmarketing',
//     },
//   },
//   {
//     name: 'Digital Marketing',
//     topicID: 'freelance_salesmarketing_digitalmarketing',
//     color: 'peach',
//     icon: 'comment-dollar',
//     parentTopic: {
//       topicID: 'freelance_salesmarketing',
//     },
//   },
//   {
//     name: 'Marketing Strategy',
//     topicID: 'freelance_salesmarketing_marketingstrategy',
//     color: 'peach',
//     icon: 'comment-dollar',
//     parentTopic: {
//       topicID: 'freelance_salesmarketing',
//     },
//   },
//   {
//     name: 'E-commerce Sales',
//     topicID: 'freelance_salesmarketing_ecommercesales',
//     color: 'peach',
//     icon: 'comment-dollar',
//     parentTopic: {
//       topicID: 'freelance_salesmarketing',
//     },
//   },
//   {
//     name: 'Lead Generation & Sales',
//     topicID: 'freelance_salesmarketing_leadgenerationsales',
//     color: 'peach',
//     icon: 'comment-dollar',
//     parentTopic: {
//       topicID: 'freelance_salesmarketing',
//     },
//   },
//   {
//     name: 'Other',
//     topicID: 'freelance_salesmarketing_other',
//     color: 'peach',
//     icon: 'comment-dollar',
//     parentTopic: {
//       topicID: 'freelance_salesmarketing',
//     },
//   },

//   {
//     name: 'Business',
//     topicID: 'freelance_business',
//     icon: 'user-tie',
//     color: 'peach',
//   },
//   {
//     name: 'Virtual Assistant',
//     topicID: 'freelance_business_virtualassistant',
//     color: 'peach',
//     icon: 'user-tie',
//     parentTopic: {
//       topicID: 'freelance_business',
//     },
//   },
//   {
//     name: 'Data Entry',
//     topicID: 'freelance_business_dataentry',
//     color: 'peach',
//     icon: 'user-tie',
//     parentTopic: {
//       topicID: 'freelance_business',
//     },
//   },
//   {
//     name: 'Accounting',
//     topicID: 'freelance_business_accounting',
//     color: 'peach',
//     icon: 'user-tie',
//     parentTopic: {
//       topicID: 'freelance_business',
//     },
//   },
//   {
//     name: 'Legal Consulting',
//     topicID: 'freelance_business_legalconsulting',
//     color: 'peach',
//     icon: 'user-tie',
//     parentTopic: {
//       topicID: 'freelance_business',
//     },
//   },
//   {
//     name: 'Financial Consulting',
//     topicID: 'freelance_business_financialconsulting',
//     color: 'peach',
//     icon: 'user-tie',
//     parentTopic: {
//       topicID: 'freelance_business',
//     },
//   },
//   {
//     name: 'Business Consulting',
//     topicID: 'freelance_business_businessconsulting',
//     color: 'peach',
//     icon: 'user-tie',
//     parentTopic: {
//       topicID: 'freelance_business',
//     },
//   },
//   {
//     name: 'Branding Services',
//     topicID: 'freelance_business_brandingservices',
//     color: 'peach',
//     icon: 'user-tie',
//     parentTopic: {
//       topicID: 'freelance_business',
//     },
//   },
//   {
//     name: 'Project Managament',
//     topicID: 'freelance_business_projectmanagement',
//     color: 'peach',
//     icon: 'user-tie',
//     parentTopic: {
//       topicID: 'freelance_business',
//     },
//   },
//   {
//     name: 'Marketing Research',
//     topicID: 'freelance_business_marketingresearch',
//     color: 'peach',
//     icon: 'user-tie',
//     parentTopic: {
//       topicID: 'freelance_business',
//     },
//   },
//   {
//     name: 'Customer Service',
//     topicID: 'freelance_business_customerservice',
//     color: 'peach',
//     icon: 'user-tie',
//     parentTopic: {
//       topicID: 'freelance_business',
//     },
//   },
//   {
//     name: 'Other',
//     topicID: 'freelance_business_other',
//     color: 'peach',
//     icon: 'user-tie',
//     parentTopic: {
//       topicID: 'freelance_business',
//     },
//   },

//   {
//     name: 'Writing',
//     topicID: 'freelance_writing',
//     icon: 'feather',
//     color: 'peach',
//   },
//   {
//     name: 'Editing & Proofreading',
//     topicID: 'freelance_writing_editingproofreading',
//     color: 'peach',
//     icon: 'feather',
//     parentTopic: {
//       topicID: 'freelance_writing',
//     },
//   },
//   {
//     name: 'Content Writing',
//     topicID: 'freelance_writing_contentwriting',
//     color: 'peach',
//     icon: 'feather',
//     parentTopic: {
//       topicID: 'freelance_writing',
//     },
//   },
//   {
//     name: 'Ghostwriting',
//     topicID: 'freelance_writing_ghostwriting',
//     color: 'peach',
//     icon: 'feather',
//     parentTopic: {
//       topicID: 'freelance_writing',
//     },
//   },
//   {
//     name: 'Business Writing',
//     topicID: 'freelance_writing_businesswriting',
//     color: 'peach',
//     icon: 'feather',
//     parentTopic: {
//       topicID: 'freelance_writing',
//     },
//   },
//   {
//     name: 'Creative Writing',
//     topicID: 'freelance_writing_creativewriting',
//     color: 'peach',
//     icon: 'feather',
//     parentTopic: {
//       topicID: 'freelance_writing',
//     },
//   },
//   {
//     name: 'Technical Writing',
//     topicID: 'freelance_writing_technicalwriting',
//     color: 'peach',
//     icon: 'feather',
//     parentTopic: {
//       topicID: 'freelance_writing',
//     },
//   },
//   {
//     name: 'Other',
//     topicID: 'freelance_writing_other',
//     color: 'peach',
//     icon: 'feather',
//     parentTopic: {
//       topicID: 'freelance_writing',
//     },
//   },
// ];

// same as topicsList but no children (and added color)
export const mainTopicsList = [
  {
    name: 'Technology',
    icon: 'bolt',
    color: 'yellow',
    topicID: 'topics_technology',
  },
  {
    name: 'Science',
    icon: 'atom',
    color: 'purple',
    topicID: 'topics_science',
  },
  {
    name: 'Creatives',
    icon: 'palette',
    color: 'green',
    topicID: 'topics_creatives',
  },
  {
    name: 'Entertainment',
    icon: 'film',
    color: 'orange',
    topicID: 'topics_entertainment',
  },
  {
    name: 'Business',
    color: 'black',
    icon: 'user-tie',
    topicID: 'topics_business',
  },
  {
    name: 'Finance & Markets',
    icon: 'chart-line',
    color: 'green',
    topicID: 'topics_finance',
  },
  {
    name: 'Marketing',
    icon: 'hashtag',
    color: 'twitterBlue',
    topicID: 'topics_marketing',
  },
  {
    name: 'Health & Wellness',
    icon: 'heartbeat',
    color: 'red',
    topicID: 'topics_health',
  },
  {
    name: 'Content Creators',
    icon: 'thumbs-up',
    color: 'blue',
    topicID: 'topics_content',
  },
  {
    name: 'News & Politics',
    icon: 'newspaper',
    color: 'gray100',
    topicID: 'topics_news',
  },
  {
    name: 'Sports',
    icon: 'football-ball',
    color: 'orange',
    topicID: 'topics_sports',
  },
  {
    name: 'Real Estate',
    icon: 'home',
    color: 'blue',
    topicID: 'topics_realestate',
  },
  {
    name: 'Education',
    icon: 'graduation-cap',
    color: 'black',
    topicID: 'topics_education',
  },
  {
    name: 'Industry',
    icon: 'cogs',
    color: 'purple',
    topicID: 'topics_industry',
  },
];
