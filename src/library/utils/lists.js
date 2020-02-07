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
    adverb: 'to discuss',
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

export const freelanceList = [
  {
    name: 'Software & Tech',
    topicID: 'freelance_software',
    icon: 'code',
    color: colors.peach,
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
    icon: 'drafting-compass',
    color: colors.peach,
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
    icon: 'paint-brush',
    color: colors.peach,
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
    icon: 'music',
    color: colors.peach,
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
    icon: 'film',
    color: colors.peach,
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
    icon: 'comment-dollar',
    color: colors.peach,
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
    icon: 'user-tie',
    color: colors.peach,
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
    icon: 'feather',
    color: colors.peach,
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
    icon: 'rocket',
    color: colors.green,
  },
  {
    name: 'Venture Capital',
    topicID: 'invest_venturecapital',
    icon: 'dollar-sign',
    color: colors.green,
  },
  {
    name: 'Real Estate',
    topicID: 'invest_realestate',
    icon: 'home',
    color: colors.green,
  },
  {
    name: 'Hedge Fund',
    topicID: 'invest_hedgefund',
    icon: 'chart-line',
    color: colors.green,
  },
  {
    name: 'Other',
    topicID: 'invest_other',
    icon: 'comment-dollar',
    color: colors.green,
  },
];

// copied in from database
export const topicsList = [
  {
    name: 'Technology',
    topicID: 'topics_technology',
    icon: 'bolt',
    color: colors.yellow,
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
    icon: 'atom',
    color: colors.purple,
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
    icon: 'palette',
    color: colors.green,
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
    icon: 'film',
    color: colors.orange,
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
    icon: 'user-tie',
    color: colors.blueGray,
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
    icon: 'chart-line',
    color: colors.green,
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
        topicID: 'topics_finance_wealthmanagement',
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
    icon: 'hashtag',
    color: colors.twitterBlue,
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
    icon: 'heartbeat',
    color: colors.red,
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
    icon: 'thumbs-up',
    color: colors.blue,
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
    icon: 'newspaper',
    color: colors.blueGray,
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
    icon: 'football-ball',
    color: colors.brown,
    children: [],
  },
  {
    name: 'Real Estate',
    topicID: 'topics_realestate',
    icon: 'home',
    color: colors.orange,
    children: [],
  },
  {
    name: 'Education',
    topicID: 'topics_education',
    icon: 'graduation-cap',
    color: colors.black,
    children: [],
  },
  {
    name: 'Industry',
    topicID: 'topics_industry',
    icon: 'cogs',
    color: colors.purple,
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
        topicID: 'topics_industry_nonprofit',
      },
      {
        name: 'Travel & Hospitality',
        topicID: 'topics_industry_travelhospitality',
      },
    ],
  },
];

// queried and copied straihgt from database - used for getTopicFromID utility function
export const allTopics = [
  {
    name: 'Technology',
    topicID: 'topics_technology',
  },
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
  {
    name: 'Science',
    topicID: 'topics_science',
  },
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
  {
    name: 'Creatives',
    topicID: 'topics_creatives',
  },
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
  {
    name: 'Entertainment',
    topicID: 'topics_entertainment',
  },
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
  {
    name: 'Business',
    topicID: 'topics_business',
  },
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
  {
    name: 'Finance & Markets',
    topicID: 'topics_finance',
  },
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
    topicID: 'topics_business_wealthmanagement',
  },
  {
    name: 'Banking',
    topicID: 'topics_finance_banking',
  },
  {
    name: 'Insurance',
    topicID: 'topics_finance_insurance',
  },
  {
    name: 'Marketing',
    topicID: 'topics_marketing',
  },
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
  {
    name: 'Health & Wellness',
    topicID: 'topics_health',
  },
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
  {
    name: 'Content Creators',
    topicID: 'topics_content',
  },
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
  {
    name: 'News & Politics',
    topicID: 'topics_news',
  },
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
  {
    name: 'Sports',
    topicID: 'topics_sports',
  },
  {
    name: 'Real Estate',
    topicID: 'topics_realestate',
  },
  {
    name: 'Education',
    topicID: 'topics_education',
  },
  {
    name: 'Industry',
    topicID: 'topics_industry',
  },
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
    topicID: 'topics_industry_nonprofit',
  },
  {
    name: 'Travel & Hospitality',
    topicID: 'topics_industry_travelhospitality',
  },
  {
    name: 'Software & Tech',
    topicID: 'freelance_software',
  },
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
  {
    name: 'Engineering',
    topicID: 'freelance_engineering',
  },
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
  {
    name: 'Graphics & Design',
    topicID: 'freelance_design',
  },
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
  {
    name: 'Music & Audio',
    topicID: 'freelance_musicaudio',
  },
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
  {
    name: 'Video & Animation',
    topicID: 'freelance_videoanimation',
  },
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
  {
    name: 'Sales & Marketing',
    topicID: 'freelance_salesmarketing',
  },
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
  {
    name: 'Business',
    topicID: 'freelance_business',
  },
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
  {
    name: 'Writing',
    topicID: 'freelance_writing',
  },
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
