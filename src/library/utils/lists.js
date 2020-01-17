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
    name: 'Find investors',
    modalType: 'invest',
    logo: 'comment-dollar',
    primaryColor: colors.green,
    secondaryColor: colors.goalGreen,
    fieldName: 'Market',
    fieldText: 'Select a market',
    heading: 'Which market is your investment opportunity?',
    adverb: 'for',
  },
  {
    name: 'Find freelancers',
    modalType: 'specialist',
    logo: 'briefcase',
    primaryColor: colors.peach,
    secondaryColor: colors.goalPeach,
    fieldName: 'Specialty',
    fieldText: 'Select a specialty',
    heading: 'Select a freelance category',
    adverb: 'for',
  },
  {
    name: 'Find agencies',
    modalType: 'specialist',
    logo: 'building',
    primaryColor: colors.peach,
    secondaryColor: colors.goalPeach,
    fieldName: 'Specialty',
    fieldText: 'Select a specialty',
    heading: 'Select an agency category',
    adverb: 'for',
  },
  {
    name: 'Get coffee',
    modalType: 'topic',
    logo: 'mug-hot',
    primaryColor: colors.blue,
    secondaryColor: colors.goalBlue,
    fieldName: 'Topic',
    fieldText: 'Select a topic',
    heading: 'Which topic would you like to discuss?',
    adverb: 'in',
  },
  {
    name: 'Find business partners',
    modalType: 'topic',
    logo: 'users',
    primaryColor: colors.blue,
    secondaryColor: colors.goalBlue,
    fieldName: 'Topic',
    fieldText: 'Select a topic',
    heading: 'Which topic are you looking for business partners in?',
    adverb: 'in',
  },
  {
    name: 'Find mentors',
    modalType: 'topic',
    logo: 'user-friends',
    primaryColor: colors.blue,
    secondaryColor: colors.goalBlue,
    fieldName: 'Topic',
    fieldText: 'Select a topic',
    heading: 'Which topic are you looking for a mentor in?',
    adverb: 'in',
  },
  {
    name: 'Network',
    modalType: 'topic',
    logo: 'handshake',
    primaryColor: colors.blue,
    secondaryColor: colors.goalBlue,
    fieldName: 'Topic',
    fieldText: 'Select a topic',
    heading: 'Which topic are you looking to network in?',
    adverb: 'in',
  },
  {
    name: 'Get advice',
    modalType: 'topic',
    logo: 'lightbulb',
    primaryColor: colors.orange,
    secondaryColor: colors.goalOrange,
    fieldName: 'Topic',
    fieldText: 'Select a topic',
    heading: 'Which topic do you need advice about?',
    adverb: 'in',
  },
  {
    name: 'Get feedback',
    modalType: 'topic',
    logo: 'comments',
    primaryColor: colors.orange,
    secondaryColor: colors.goalOrange,
    fieldName: 'Topic',
    fieldText: 'Select a topic',
    heading: 'Which topic best describes your question?',
    adverb: 'in',
  },
];

// export const moneyGoals = ['Find investors'];
// export const helpGoals = ['Find freelancers', 'Find agencies'];
// export const networkGoals = ['Network', 'Get coffee', 'Find a mentor', 'Find business partners'];
// export const answersGoals = ['Get advice', 'Get feedback'];
// export const hireGoals = ['Hire employees', 'Hire for startup'];

export const freelanceList = [
  {
    name: 'Software & Tech',
    topicID: 'freelance_software',
    children: [
      {
        name: 'Web Development',
        topicID: 'freelance_software_webdevelopment',
      },
      {
        name: 'Mobile Apps',
        topicID: 'freelance_software_mobileapps',
      },
      {
        name: 'Game Development',
        topicID: 'freelance_software_gamedevelopment',
      },
      {
        name: 'E-commerce Development',
        topicID: 'freelance_software_ecommercedevelopment',
      },
      {
        name: 'Backend / Database',
        topicID: 'freelance_software_backenddatabase',
      },
      {
        name: 'IT & Networking',
        topicID: 'freelance_software_itnetworking',
      },
      {
        name: 'Data Science & Analytics',
        topicID: 'freelance_software_datascienceanalytics',
      },
      {
        name: 'Other',
        topicID: 'freelance_software_other',
      },
    ],
  },
  {
    name: 'Engineering',
    topicID: 'freelance_engineering',
    children: [
      {
        name: 'Mechanical Engineering',
        topicID: 'freelance_engineering_mechanicalengineering',
      },
      {
        name: 'Electrical Engineering',
        topicID: 'freelance_engineering_electricalengineering',
      },
      {
        name: 'Chemical Engineering',
        topicID: 'freelance_engineering_chemicalengineering',
      },
      {
        name: 'Civil & Structural Engineering',
        topicID: 'freelance_engineering_civilstructuralengineering',
      },
      {
        name: 'Product Design',
        topicID: 'freelance_engineering_productdesign',
      },
      {
        name: '3D Modeling & CAD',
        topicID: 'freelance_engineering_3dmodelingcad',
      },
      {
        name: 'Other',
        topicID: 'freelance_engineering_other',
      },
    ],
  },
  {
    name: 'Graphics & Design',
    topicID: 'freelance_design',
    children: [
      {
        name: 'Logo Design',
        topicID: 'freelance_design_logodesign',
      },
      {
        name: 'Brand Design',
        topicID: 'freelance_design_branddesign',
      },
      {
        name: 'Web & Mobile Design',
        topicID: 'freelance_design_webmobiledesign',
      },
      {
        name: 'Graphic Design',
        topicID: 'freelance_design_graphicdesign',
      },
      {
        name: 'Game Design',
        topicID: 'freelance_design_gamedesign',
      },
      {
        name: 'Photoshop',
        topicID: 'freelance_design_photoshop',
      },
      {
        name: 'Other',
        topicID: 'freelance_design_other',
      },
    ],
  },
  {
    name: 'Music & Audio',
    topicID: 'freelance_musicaudio',
    children: [
      {
        name: 'Voice Over',
        topicID: 'freelance_musicaudio_voiceover',
      },
      {
        name: 'Mixing & Mastering',
        topicID: 'freelance_musicaudio_mixingmastering',
      },
      {
        name: 'Producing',
        topicID: 'freelance_musicaudio_producing',
      },
      {
        name: 'Singer-Songwriter',
        topicID: 'freelance_musicaudio_singersongwriter',
      },
      {
        name: 'Other',
        topicID: 'freelance_musicaudio_other',
      },
    ],
  },
  {
    name: 'Video & Animation',
    topicID: 'freelance_videoanimation',
    children: [
      {
        name: 'Explainer Videos',
        topicID: 'freelance_videoanimation_explainervideos',
      },
      {
        name: 'Video Editing',
        topicID: 'freelance_videoanimation_videoediting',
      },
      {
        name: 'Video Production',
        topicID: 'freelance_videoanimation_videoproduction',
      },
      {
        name: 'Intros & Outros',
        topicID: 'freelance_videoanimation_introsoutros',
      },
      {
        name: 'Animations',
        topicID: 'freelance_videoanimation_animations',
      },
      {
        name: 'Short Video Ads',
        topicID: 'freelance_videoanimation_shortvideoads',
      },
      {
        name: 'Other',
        topicID: 'freelance_videoanimation_other',
      },
    ],
  },
  {
    name: 'Sales & Marketing',
    topicID: 'freelance_salesmarketing',
    children: [
      {
        name: 'Social Media Marketing',
        topicID: 'freelance_salesmarketing_socialmediamarketing',
      },
      {
        name: 'Digital Marketing',
        topicID: 'freelance_salesmarketing_digitalmarketing',
      },
      {
        name: 'Marketing Strategy',
        topicID: 'freelance_salesmarketing_marketingstrategy',
      },
      {
        name: 'E-commerce Sales',
        topicID: 'freelance_salesmarketing_ecommercesales',
      },
      {
        name: 'Lead Generation & Sales',
        topicID: 'freelance_salesmarketing_leadgenerationsales',
      },
      {
        name: 'Other',
        topicID: 'freelance_salesmarketing_other',
      },
    ],
  },
  {
    name: 'Business',
    topicID: 'freelance_business',
    children: [
      {
        name: 'Virtual Assistant',
        topicID: 'freelance_business_virtualassistant',
      },
      {
        name: 'Data Entry',
        topicID: 'freelance_business_dataentry',
      },
      {
        name: 'Accounting',
        topicID: 'freelance_business_accounting',
      },
      {
        name: 'Legal Consulting',
        topicID: 'freelance_business_legalconsulting',
      },
      {
        name: 'Financial Consulting',
        topicID: 'freelance_business_financialconsulting',
      },
      {
        name: 'Business Consulting',
        topicID: 'freelance_business_businessconsulting',
      },
      {
        name: 'Branding Services',
        topicID: 'freelance_business_brandingservices',
      },
      {
        name: 'Project Managament',
        topicID: 'freelance_business_projectmanagement',
      },
      {
        name: 'Marketing Research',
        topicID: 'freelance_business_marketingresearch',
      },
      {
        name: 'Customer Service',
        topicID: 'freelance_business_customerservice',
      },
      {
        name: 'Other',
        topicID: 'freelance_business_other',
      },
    ],
  },
  {
    name: 'Writing',
    topicID: 'freelance_writing',
    children: [
      {
        name: 'Editing & Proofreading',
        topicID: 'freelance_writing_editingproofreading',
      },
      {
        name: 'Content Writing',
        topicID: 'freelance_writing_contentwriting',
      },
      {
        name: 'Ghostwriting',
        topicID: 'freelance_writing_ghostwriting',
      },
      {
        name: 'Business Writing',
        topicID: 'freelance_writing_businesswriting',
      },
      {
        name: 'Creative Writing',
        topicID: 'freelance_writing_creativewriting',
      },
      {
        name: 'Technical Writing',
        topicID: 'freelance_writing_technicalwriting',
      },
      {
        name: 'Other',
        topicID: 'freelance_writing_other',
      },
    ],
  },
];

export const investList = [
  {
    name: 'Startup',
    topicID: 'invest_startup',
  },
  {
    name: 'Venture Capital',
    topicID: 'invest_venturecapital',
  },
  {
    name: 'Real Estate',
    topicID: 'invest_realestate',
  },
  {
    name: 'Hedge Fund',
    topicID: 'invest_hedgefund',
  },
  {
    name: 'Other',
    topicID: 'invest_other',
  },
];

// copied in from database
export const topicsList = [
  {
    name: 'Technology',
    topicID: 'topics_technology',
    children: [
      {
        name: 'Software',
        topicID: 'topics_technology_software',
      },
      {
        name: 'Hardware',
        topicID: 'topics_technology_hardware',
      },
      {
        name: 'Semiconductors',
        topicID: 'topics_technology_semiconductors',
      },
      {
        name: 'Cloud Computing',
        topicID: 'topics_technology_cloudcomputing',
      },
      {
        name: 'Gaming',
        topicID: 'topics_technology_gaming',
      },
      {
        name: 'VR/AR',
        topicID: 'topics_technology_vrar',
      },
      {
        name: 'Crypto',
        topicID: 'topics_technology_crypto',
      },
      {
        name: 'AI',
        topicID: 'topics_technology_ai',
      },
      {
        name: 'Automation',
        topicID: 'topics_technology_automation',
      },
      {
        name: 'IT & Networking',
        topicID: 'topics_technology_itnetworking',
      },
      {
        name: 'Aerospace & Aviation',
        topicID: 'topics_technology_aerospaceaviation',
      },
      {
        name: 'Automotive',
        topicID: 'topics_technology_automotive',
      },
    ],
  },
  {
    name: 'Science',
    topicID: 'topics_science',
    children: [
      {
        name: 'Physics',
        topicID: 'topics_science_physics',
      },
      {
        name: 'Biotechnology',
        topicID: 'topics_science_biotechnology',
      },
      {
        name: 'Astrophysics',
        topicID: 'topics_science_astrophysics',
      },
      {
        name: 'Chemistry',
        topicID: 'topics_science_chemistry',
      },
      {
        name: 'Biology',
        topicID: 'topics_science_biology',
      },
      {
        name: 'Anthropology',
        topicID: 'topics_science_anthropology',
      },
      {
        name: 'Renewable Energy',
        topicID: 'topics_science_renewableenergy',
      },
    ],
  },
  {
    name: 'Creatives',
    topicID: 'topics_creatives',
    children: [
      {
        name: 'Photography',
        topicID: 'topics_creatives_photography',
      },
      {
        name: 'Videography',
        topicID: 'topics_creatives_videography',
      },
      {
        name: 'UI/UX',
        topicID: 'topics_creatives_uiux',
      },
      {
        name: 'Graphic Design',
        topicID: 'topics_creatives_graphicdesign',
      },
      {
        name: 'Visual Art',
        topicID: 'topics_creatives_visualart',
      },
      {
        name: 'Fashion & Apparel',
        topicID: 'topics_creatives_fashionapparel',
      },
    ],
  },
  {
    name: 'Entertainment',
    topicID: 'topics_entertainment',
    children: [
      {
        name: 'Music',
        topicID: 'topics_entertainment_music',
      },
      {
        name: 'Acting',
        topicID: 'topics_entertainment_acting',
      },
      {
        name: 'Comedy',
        topicID: 'topics_entertainment_comedy',
      },
      {
        name: 'Motion Picture',
        topicID: 'topics_entertainment_motionpicture',
      },
      {
        name: 'Writing',
        topicID: 'topics_entertainment_writing',
      },
    ],
  },
  {
    name: 'Business',
    topicID: 'topics_business',
    children: [
      {
        name: 'Entrepreneurship',
        topicID: 'topics_business_entrepreneurship',
      },
      {
        name: 'Small Business',
        topicID: 'topics_business_smallbusiness',
      },
      {
        name: 'Large Business',
        topicID: 'topics_business_largebusiness',
      },
      {
        name: 'Startups',
        topicID: 'topics_business_startups',
      },
      {
        name: 'HR',
        topicID: 'topics_business_hr',
      },
      {
        name: 'Accounting',
        topicID: 'topics_business_accounting',
      },
      {
        name: 'Logistics',
        topicID: 'topics_business_logistics',
      },
      {
        name: 'Manufacturing',
        topicID: 'topics_business_manufacturing',
      },
      {
        name: 'Sales',
        topicID: 'topics_business_sales',
      },
      {
        name: 'Operations',
        topicID: 'topics_business_operations',
      },
      {
        name: 'Management',
        topicID: 'topics_business_management',
      },
    ],
  },
  {
    name: 'Finance & Markets',
    topicID: 'topics_finance',
    children: [
      {
        name: 'Stock Market',
        topicID: 'topics_finance_stockmarket',
      },
      {
        name: 'Day Trading',
        topicID: 'topics_finance_daytrading',
      },
      {
        name: 'Wealth Management',
        topicID: 'topics_finance_management',
      },
      {
        name: 'Banking',
        topicID: 'topics_finance_banking',
      },
      {
        name: 'Insurance',
        topicID: 'topics_finance_insurance',
      },
    ],
  },
  {
    name: 'Marketing',
    topicID: 'topics_marketing',
    children: [
      {
        name: 'Social Media Marketing',
        topicID: 'topics_marketing_socialmediamarketing',
      },
      {
        name: 'Advertising',
        topicID: 'topics_marketing_advertising',
      },
      {
        name: 'Branding',
        topicID: 'topics_marketing_branding',
      },
    ],
  },
  {
    name: 'Health & Wellness',
    topicID: 'topics_health',
    children: [
      {
        name: 'Fitness',
        topicID: 'topics_health_fitness',
      },
      {
        name: 'Nutrition',
        topicID: 'topics_health_nutrition',
      },
      {
        name: 'Medicine',
        topicID: 'topics_health_medicine',
      },
      {
        name: 'Physical Therapy',
        topicID: 'topics_health_physicaltherapy',
      },
    ],
  },
  {
    name: 'Content Creators',
    topicID: 'topics_content',
    children: [
      {
        name: 'Social Media',
        topicID: 'topics_content_socialmedia',
      },
      {
        name: 'Blogging',
        topicID: 'topics_content_blogging',
      },
      {
        name: 'Podcasting',
        topicID: 'topics_content_podcasting',
      },
      {
        name: 'YouTube',
        topicID: 'topics_content_youtube',
      },
      {
        name: 'Streaming',
        topicID: 'topics_content_streaming',
      },
    ],
  },
  {
    name: 'News & Politics',
    topicID: 'topics_news',
    children: [
      {
        name: 'Politics',
        topicID: 'topics_news_politics',
      },
      {
        name: 'Journalism',
        topicID: 'topics_news_journalism',
      },
      {
        name: 'Law & Policy',
        topicID: 'topics_news_lawpolicy',
      },
    ],
  },
  {
    name: 'Sports',
    topicID: 'topics_sports',
    children: [],
  },
  {
    name: 'Real Estate',
    topicID: 'topics_realestate',
    children: [],
  },
  {
    name: 'Education',
    topicID: 'topics_education',
    children: [],
  },
  {
    name: 'Industry',
    topicID: 'topics_industry',
    children: [
      {
        name: 'Food & Bev',
        topicID: 'topics_industry_foodbev',
      },
      {
        name: 'E-commerce & Retail',
        topicID: 'topics_industry_ecommerceretail',
      },
      {
        name: 'Construction',
        topicID: 'topics_industry_construction',
      },
      {
        name: 'Non-profit',
        topicID: 'topics_industry_non-profit',
      },
      {
        name: 'Travel & Hospitality',
        topicID: 'topics_industry_travelhospitality',
      },
    ],
  },
];

// export const topicsList = [
//   {
//     topic: 'Technology',
//     subTopics: [
//       'Software',
//       'Hardware',
//       'Semiconductors',
//       'Cloud Computing',
//       'Gaming',
//       'AR/VR',
//       'Crypto',
//       'AI',
//       'Automation',
//       'IT & Networking',
//       'Aerospace & Aviation',
//       'Automotive',
//     ],
//   },
//   {
//     topic: 'Science',
//     subTopics: ['Physics', 'Chemistry', 'Biology', 'Biotechnology', 'Anthropology', 'Renewable Energy', 'Astrophysics'],
//   },

//   {
//     topic: 'Creatives',
//     subTopics: ['Photography', 'Graphic Design', 'UI/UX', 'Videography', 'Fashion & Apparel', 'Makeup & Beauty', 'Visual Art'],
//   },
//   {
//     topic: 'Entertainment',
//     subTopics: ['Music', 'Acting', 'Comedy', 'Motion Pictures', 'Writing', 'Streaming Services'],
//   },
//   {
//     topic: 'Business',
//     subTopics: [
//       'Entreprenuership',
//       'Small Business',
//       'Large Business',
//       'Startup',
//       'HR',
//       'Management',
//       'Sales',
//       'Operation',
//       'Manufacturing',
//     ],
//   },
//   {
//     topic: 'Finance & Markets',
//     subTopics: ['Banking', 'Stock Market', 'Insurance', 'Wealth Management', 'Day Trading'],
//   },
//   {
//     topic: 'Marketing',
//     subTopics: ['Advertising', 'Social Media Marketing', 'Branding'],
//   },
//   {
//     topic: 'Health & Wellness',
//     subTopics: ['Fitness', 'Nutrition', 'Medicine', 'Physical Therapy'],
//   },
//   {
//     topic: 'Content Creators',
//     subTopics: ['Social Media', 'Blogging', 'Podcasting', 'YouTube', 'Streaming'],
//   },
//   {
//     topic: 'News & Politics',
//     subTopics: ['Politics', 'Journalism', 'Law & Policy'],
//   },
//   {
//     topic: 'Food Services',
//     subTopics: [],
//   },
//   {
//     topic: 'Sports',
//     subTopics: [],
//   },
//   {
//     topic: 'Real Estate',
//     subTopics: [],
//   },
//   {
//     topic: 'Education',
//     subTopics: [],
//   },
//   {
//     topic: 'Industry',
//     subTopics: ['E-commerce & Retail', 'Travel & Hospitality', 'Non-profit', 'Construction'],
//   },
// ];

// export const freelanceList = [
//   {
//     category: 'Software & Tech',
//     logo: 'code',
//     list: [
//       'Web Development',
//       'Mobile Apps',
//       'Game Development',
//       'E-Commerce Development',
//       'Backend / Database',
//       'IT & Networking',
//       'Data Science & Analytics',
//       'Other',
//     ],
//   },
//   {
//     category: 'Engineering',
//     logo: 'drafting-compass',
//     list: [
//       'Mechanical Engineering',
//       'Electrical Engineering',
//       'Chemical Engineering',
//       'Civil & Structural Engineering',
//       'Product Design',
//       '3D Modeling & CAD',
//       'Other',
//     ],
//   },
//   {
//     category: 'Graphics & Design',
//     logo: 'paint-brush',
//     list: ['Logo Design', 'Brand Design', 'Web & Mobile Design', 'Graphic Design', 'Game Design', 'Photoshop', 'Other'],
//   },
//   {
//     category: 'Music & Audio',
//     logo: 'music',
//     list: ['Voice Over', 'Mixing & Mastering', 'Producers', 'Singer-Songwriters', 'Other'],
//   },
//   {
//     category: 'Video & Animation',
//     logo: 'film',
//     list: ['Explainer Videos', 'Video Editing', 'Video Production', 'Intros & Outros', 'Animations', 'Short Video Ads', 'Other'],
//   },
//   {
//     category: 'Sales & Marketing',
//     logo: 'comment-dollar',
//     list: [
//       'Social Media Marketing',
//       'Digital Marketing',
//       'Marketing Strategy',
//       'E-Commerce Sales',
//       'Lead Generation & Sales',
//       'Other',
//     ],
//   },
//   {
//     category: 'Business',
//     logo: 'user-tie',
//     list: [
//       'Virtual Assistant',
//       'Data Entry',
//       'Accounting',
//       'Legal Consulting',
//       'Financial Consulting',
//       'Business Consulting',
//       'Branding Services',
//       'Project Management',
//       'Market Research',
//       'Customer Service',
//       'Other',
//     ],
//   },
//   {
//     category: 'Writing',
//     logo: 'feather',
//     list: [
//       'Editing & Proofreading',
//       'Content Writing',
//       'Ghostwriting',
//       'Business Writing',
//       'Creative Writing',
//       'Technical Writing',
//       'Other',
//     ],
//   },
// ];

// export const investmentMarkets = ['Startup', 'Venture Capital', 'Real Estate', 'Hedge Fund', 'Other'];

const industriesOld = [
  // 'Tech',
  // 'Arts',
  'Entertainment',
  'Banking',
  'Consulting',
  // 'Creatives',
  'Media & Journalism',
  'Music',
  'VC & Investment',
  'Fashion',
  'Education & Academia',
  'Government & Politics',
  'Sales',
  // 'Marketing',
  'PR',
  // 'Advertising',
  'Real Estate',
  'Insurance',
  'Law & Policy',
  'Counselling',
  'Medicine & Health',
  'Police & Military',
  'Construction',
  'Food & Beverage',
  'Travel & Hospitality',
  'Manufacturing',
  'Other',
  // // expanded list
  'Accounting',
  // 'Airlines/Aviation',
  // 'Alternative Dispute Resolution',
  // 'Alternative Medicine',
  // 'Animation',
  // 'Apparel & Fashion',
  'Architecture & Planning',
  'Arts and Crafts',
  'Automotive',
  'Aviation & Aerospace',
  // 'Banking',
  'Biotechnology',
  // 'Broadcast Media',
  // 'Building Materials',
  // 'Business Supplies and Equipment',
  // 'Capital Markets',
  // 'Chemicals',
  // 'Civic & Social Organization',
  'Civil Engineering',
  'Software & Technology',
  'Gaming',
  // 'Commercial Real Estate',
  // 'Computer & Network Security',
  // 'Computer Games',
  // 'Computer Hardware',
  // 'Computer Networking',
  // 'Computer Software',
  // 'Construction',
  // 'Consumer Electronics',
  // 'Consumer Goods',
  // 'Consumer Services',
  // 'Cosmetics',
  // 'Dairy',
  // 'Defense & Space',
  // 'Design',
  // 'Education Management',
  // 'E-Learning',
  // 'Electrical/Electronic Manufacturing',
  // 'Entertainment',
  // 'Environmental Services',
  // 'Events Services',
  // 'Executive Office',
  // 'Facilities Services',
  'Farming',
  'Financial Services',
  // 'Fine Art',
  // 'Fishery',
  // 'Food & Beverages',
  // 'Food Production',
  // 'Fund-Raising',
  // 'Furniture',
  'Gambling & Casinos',
  // 'Glass',
  // 'Ceramics & Concrete',
  // 'Government Administration',
  // 'Government Relations',
  'Graphic Design',
  // 'Health',
  'Wellness and Fitness',
  // 'Higher Education',
  // 'Hospital & Health Care',
  // 'Hospitality',
  'Human Resources',
  // 'Import and Export',
  // 'Individual & Family Services',
  'Industrial Automation',
  // 'Information Services',
  // 'Information Technology and Services',
  // 'Insurance',
  // 'International Affairs',
  // 'International Trade and Development',
  // 'Internet',
  // 'Investment Banking',
  // 'Investment Management',
  // 'Judiciary',
  // 'Law Enforcement',
  // 'Law Practice',
  // 'Legal Services',
  // 'Legislative Office',
  // 'Leisure',
  // 'Travel & Tourism',
  // 'Libraries',
  'Logistics and Supply Chain',
  // 'Luxury Goods & Jewelry',
  // 'Machinery',
  // 'Management Consulting',
  // 'Maritime',
  // 'Market Research',
  'Marketing and Advertising',
  // 'Mechanical or Industrial Engineering',
  // 'Media Production',
  // 'Medical Devices',
  // 'Medical Practice',
  // 'Mental Health Care',
  // 'Military',
  // 'Mining & Metals',
  'Motion Pictures and Film',
  // 'Museums and Institutions',
  // 'Music',
  // 'Nanotechnology',
  // 'Newspapers',
  // 'Non-Profit Organization Management',
  'Oil & Energy',
  // 'Online Media',
  // 'Outsourcing/Offshoring',
  // 'Package/Freight Delivery',
  // 'Packaging and Containers',
  // 'Paper & Forest Products',
  // 'Performing Arts',
  // 'Pharmaceuticals',
  // 'Philanthropy',
  'Photography',
  // 'Plastics',
  // 'Political Organization',
  // 'Primary/Secondary Education',
  // 'Printing',
  // 'Professional Training & Coaching',
  // 'Program Development',
  // 'Public Policy',
  // 'Public Relations and Communications',
  // 'Public Safety',
  // 'Publishing',
  // 'Railroad Manufacture',
  // 'Ranching',
  // 'Real Estate',
  // 'Recreational Facilities and Services',
  // 'Religious Institutions',
  // 'Renewables & Environment',
  // 'Research',
  // 'Restaurants',
  'Retail',
  // 'Security and Investigations',
  // 'Semiconductors',
  // 'Shipbuilding',
  // 'Sporting Goods',
  'Sports',
  'Staffing and Recruiting',
  // 'Supermarkets',
  'Telecommunications',
  'Textiles',
  // 'Think Tanks',
  // 'Tobacco',
  // 'Translation and Localization',
  // 'Transportation/Trucking/Railroad',
  // 'Utilities',
  // 'Venture Capital & Private Equity',
  'Veterinary',
  // 'Warehousing',
  // 'Wholesale',
  // 'Wine and Spirits',
  // 'Wireless',
  'Writing and Editing',
];

// export const industryList = industries.sort();
