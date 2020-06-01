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

// copied from database query (format: children under parent)
export const topicsList = [
  {
    children: [
      {
        name: 'Software',
        topicID: 'topics_technology_software',
        icon: 'bolt',
        topicStory: {
          id: 'ck8u9l5ihzb4h0a78jh4zhg07',
        },
      },
      {
        name: 'Hardware',
        topicID: 'topics_technology_hardware',
        icon: 'bolt',
        topicStory: {
          id: 'ck8u9l5txwnqg0a87o4n8no3o',
        },
      },
      {
        name: 'Semiconductors',
        topicID: 'topics_technology_semiconductors',
        icon: 'bolt',
        topicStory: {
          id: 'ck8u9l670wnqs0a87i31bklaz',
        },
      },
      {
        name: 'Cloud Computing',
        topicID: 'topics_technology_cloudcomputing',
        icon: 'bolt',
        topicStory: {
          id: 'ck8u9l6mrwnr70a877ifh7bk2',
        },
      },
      {
        name: 'Gaming',
        topicID: 'topics_technology_gaming',
        icon: 'bolt',
        topicStory: {
          id: 'ck8u9l75uwnrm0a87ejrpxz7j',
        },
      },
      {
        name: 'VR/AR',
        topicID: 'topics_technology_vrar',
        icon: 'bolt',
        topicStory: {
          id: 'ck8u9l7nkzb5t0a7803p5815l',
        },
      },
      {
        name: 'Crypto',
        topicID: 'topics_technology_crypto',
        icon: 'bolt',
        topicStory: {
          id: 'ck8u9l863wnsd0a87rqmwqtb2',
        },
      },
      {
        name: 'AI',
        topicID: 'topics_technology_ai',
        icon: 'bolt',
        topicStory: {
          id: 'ck8u9l8rmwnsv0a87zwp7agct',
        },
      },
      {
        name: 'Automation',
        topicID: 'topics_technology_automation',
        icon: 'bolt',
        topicStory: {
          id: 'ck8u9l95uwnt70a87j24u3e73',
        },
      },
      {
        name: 'IT & Networking',
        topicID: 'topics_technology_itnetworking',
        icon: 'bolt',
        topicStory: {
          id: 'ck8u9l9plzb710a78nnver5lt',
        },
      },
      {
        name: 'Aerospace & Aviation',
        topicID: 'topics_technology_aerospaceaviation',
        icon: 'bolt',
        topicStory: {
          id: 'ck8u9la4yzb7g0a78mgr151gj',
        },
      },
      {
        name: 'Automotive',
        topicID: 'topics_technology_automotive',
        icon: 'bolt',
        topicStory: {
          id: 'ck8u9laigzb7o0a78chuz0143',
        },
      },
    ],
    name: 'Technology',
    icon: 'bolt',
    topicID: 'topics_technology',
    topicStory: {
      id: 'ck8u9l53bzb430a78fn8zbxip',
    },
  },
  {
    children: [
      {
        name: 'Physics',
        topicID: 'topics_science_physics',
        icon: 'atom',
        topicStory: {
          id: 'ck8u9lbevwnul0a874zyuerof',
        },
      },
      {
        name: 'Biotechnology',
        topicID: 'topics_science_biotechnology',
        icon: 'atom',
        topicStory: {
          id: 'ck8u9lc1yzb8s0a782e9dfnch',
        },
      },
      {
        name: 'Astrophysics',
        topicID: 'topics_science_astrophysics',
        icon: 'atom',
        topicStory: {
          id: 'ck8u9lcr4wnvh0a874znkvovd',
        },
      },
      {
        name: 'Chemistry',
        topicID: 'topics_science_chemistry',
        icon: 'atom',
        topicStory: {
          id: 'ck8u9ld4ozb9h0a78hjkry9cp',
        },
      },
      {
        name: 'Biology',
        topicID: 'topics_science_biology',
        icon: 'atom',
        topicStory: {
          id: 'ck8u9ldopzb9u0a78zs6xo1i7',
        },
      },
      {
        name: 'Anthropology',
        topicID: 'topics_science_anthropology',
        icon: 'atom',
        topicStory: {
          id: 'ck8u9le4uzbaa0a78t6j5ator',
        },
      },
      {
        name: 'Renewable Energy',
        topicID: 'topics_science_renewableenergy',
        icon: 'atom',
        topicStory: {
          id: 'ck8u9lem0wnwn0a87ni3mnpl8',
        },
      },
    ],
    name: 'Science',
    icon: 'atom',
    topicID: 'topics_science',
    topicStory: {
      id: 'ck8u9lb2rzb840a788zexyngq',
    },
  },
  {
    children: [
      {
        name: 'Photography',
        topicID: 'topics_creatives_photography',
        icon: 'palette',
        topicStory: {
          id: 'ck8u9lfpwwnxh0a878aemxcg9',
        },
      },
      {
        name: 'Videography',
        topicID: 'topics_creatives_videography',
        icon: 'palette',
        topicStory: {
          id: 'ck8u9lg43wnxt0a87d6r2c1eu',
        },
      },
      {
        name: 'UI/UX',
        topicID: 'topics_creatives_uiux',
        icon: 'palette',
        topicStory: {
          id: 'ck8u9lgqzzbc00a78sikmhb4e',
        },
      },
      {
        name: 'Graphic Design',
        topicID: 'topics_creatives_graphicdesign',
        icon: 'palette',
        topicStory: {
          id: 'ck8u9lhdlwnyv0a873uw2oz5j',
        },
      },
      {
        name: 'Visual Art',
        topicID: 'topics_creatives_visualart',
        icon: 'palette',
        topicStory: {
          id: 'ck8u9li0uwnzf0a87ofmbk509',
        },
      },
      {
        name: 'Fashion & Apparel',
        topicID: 'topics_creatives_fashionapparel',
        icon: 'palette',
        topicStory: {
          id: 'ck8u9liegzbd70a786ay9uove',
        },
      },
    ],
    name: 'Creatives',
    icon: 'palette',
    topicID: 'topics_creatives',
    topicStory: {
      id: 'ck8u9lf4azbav0a78u2vxmihg',
    },
  },
  {
    children: [
      {
        name: 'Music',
        topicID: 'topics_entertainment_music',
        icon: 'film',
        topicStory: {
          id: 'ck8u9ljluwo0c0a878k4kds1g',
        },
      },
      {
        name: 'Acting',
        topicID: 'topics_entertainment_acting',
        icon: 'film',
        topicStory: {
          id: 'ck8u9lk0bzbeb0a78zvcih915',
        },
      },
      {
        name: 'Comedy',
        topicID: 'topics_entertainment_comedy',
        icon: 'film',
        topicStory: {
          id: 'ck8u9lkn5wo140a87i72tn0lr',
        },
      },
      {
        name: 'Motion Picture',
        topicID: 'topics_entertainment_motionpicture',
        icon: 'film',
        topicStory: {
          id: 'ck8u9ll91wo1k0a8792i00fy3',
        },
      },
      {
        name: 'Writing',
        topicID: 'topics_entertainment_writing',
        icon: 'film',
        topicStory: {
          id: 'ck8u9lln7wo220a87xik2mcqv',
        },
      },
    ],
    name: 'Entertainment',
    icon: 'film',
    topicID: 'topics_entertainment',
    topicStory: {
      id: 'ck8u9lj1wzbdp0a78yhrahgsz',
    },
  },
  {
    children: [
      {
        name: 'Entrepreneurship',
        topicID: 'topics_business_entrepreneurship',
        icon: 'user-tie',
        topicStory: {
          id: 'ck8u9lmfjwo2o0a87p7ftpys8',
        },
      },
      {
        name: 'Small Business',
        topicID: 'topics_business_smallbusiness',
        icon: 'user-tie',
        topicStory: {
          id: 'ck8u9lmxzzbg80a78r7k92mo9',
        },
      },
      {
        name: 'Large Business',
        topicID: 'topics_business_largebusiness',
        icon: 'user-tie',
        topicStory: {
          id: 'ck8u9lnl0zbgr0a78heh6d5ue',
        },
      },
      {
        name: 'Startups',
        topicID: 'topics_business_startups',
        icon: 'user-tie',
        topicStory: {
          id: 'ck8u9lnxqwo3o0a870ln7aq96',
        },
      },
      {
        name: 'HR',
        topicID: 'topics_business_hr',
        icon: 'user-tie',
        topicStory: {
          id: 'ck8u9log8wo430a8703l9k77v',
        },
      },
      {
        name: 'Accounting',
        topicID: 'topics_business_accounting',
        icon: 'user-tie',
        topicStory: {
          id: 'ck8u9loyowo4o0a87movdh5x2',
        },
      },
      {
        name: 'Logistics',
        topicID: 'topics_business_logistics',
        icon: 'user-tie',
        topicStory: {
          id: 'ck8u9lpcuzbhz0a78mrutbvb4',
        },
      },
      {
        name: 'Manufacturing',
        topicID: 'topics_business_manufacturing',
        icon: 'user-tie',
        topicStory: {
          id: 'ck8u9lpr1wo5b0a87gp3c127j',
        },
      },
      {
        name: 'Sales',
        topicID: 'topics_business_sales',
        icon: 'user-tie',
        topicStory: {
          id: 'ck8u9lq5izbio0a78zv9qouec',
        },
      },
      {
        name: 'Operations',
        topicID: 'topics_business_operations',
        icon: 'user-tie',
        topicStory: {
          id: 'ck8u9lquyzbj70a78tdh16nq6',
        },
      },
      {
        name: 'Management',
        topicID: 'topics_business_management',
        icon: 'user-tie',
        topicStory: {
          id: 'ck8u9lreuzbjf0a78gam9y79u',
        },
      },
    ],
    name: 'Business',
    icon: 'user-tie',
    topicID: 'topics_business',
    topicStory: {
      id: 'ck8u9lm15zbfk0a78i7btnzb2',
    },
  },
  {
    children: [
      {
        name: 'Stock Market',
        topicID: 'topics_finance_stockmarket',
        icon: 'chart-line',
        topicStory: {
          id: 'ck8u9lsedwo6q0a87duwrdpqo',
        },
      },
      {
        name: 'Day Trading',
        topicID: 'topics_finance_daytrading',
        icon: 'chart-line',
        topicStory: {
          id: 'ck8u9lsp3zbjw0a78ew98q41o',
        },
      },
      {
        name: 'Wealth Management',
        topicID: 'topics_finance_wealthmanagement',
        icon: 'chart-line',
        topicStory: {
          id: 'ck8u9lt2awo6z0a87stfvothd',
        },
      },
      {
        name: 'Banking',
        topicID: 'topics_finance_banking',
        icon: 'chart-line',
        topicStory: {
          id: 'ck8u9lth1zbk70a78w033yio0',
        },
      },
      {
        name: 'Insurance',
        topicID: 'topics_finance_insurance',
        icon: 'chart-line',
        topicStory: {
          id: 'ck8u9ltvqwo7e0a8723xqmwcl',
        },
      },
    ],
    name: 'Finance & Markets',
    icon: 'chart-line',
    topicID: 'topics_finance',
    topicStory: {
      id: 'ck8u9ls1nwo6g0a87t2si5ygd',
    },
  },
  {
    children: [
      {
        name: 'Social Media Marketing',
        topicID: 'topics_marketing_socialmediamarketing',
        icon: 'hashtag',
        topicStory: {
          id: 'ck8u9lut1zbkn0a78ujfksu1b',
        },
      },
      {
        name: 'Advertising',
        topicID: 'topics_marketing_advertising',
        icon: 'hashtag',
        topicStory: {
          id: 'ck8u9lv79zbkx0a78uw8fg2vu',
        },
      },
      {
        name: 'Branding',
        topicID: 'topics_marketing_branding',
        icon: 'hashtag',
        topicStory: {
          id: 'ck8u9lvkhwo830a870wvxwacu',
        },
      },
    ],
    name: 'Marketing',
    icon: 'hashtag',
    topicID: 'topics_marketing',
    topicStory: {
      id: 'ck8u9luezwo7n0a87xy2ud5w6',
    },
  },
  {
    children: [
      {
        name: 'Fitness',
        topicID: 'topics_health_fitness',
        icon: 'heartbeat',
        topicStory: {
          id: 'ck8u9lwu8wo8j0a87fttcsj6g',
        },
      },
      {
        name: 'Nutrition',
        topicID: 'topics_health_nutrition',
        icon: 'heartbeat',
        topicStory: {
          id: 'ck8u9lx6jwo8t0a87qb1ur9m5',
        },
      },
      {
        name: 'Medicine',
        topicID: 'topics_health_medicine',
        icon: 'heartbeat',
        topicStory: {
          id: 'ck8u9lxp1zblq0a78vnovqvzh',
        },
      },
      {
        name: 'Physical Therapy',
        topicID: 'topics_health_physicaltherapy',
        icon: 'heartbeat',
        topicStory: {
          id: 'ck8u9ly89wo980a87323tc3vt',
        },
      },
    ],
    name: 'Health & Wellness',
    icon: 'heartbeat',
    topicID: 'topics_health',
    topicStory: {
      id: 'ck8u9lwb7zbla0a78lj1rcqqv',
    },
  },
  {
    children: [
      {
        name: 'Social Media',
        topicID: 'topics_content_socialmedia',
        icon: 'thumbs-up',
        topicStory: {
          id: 'ck8u9lz5pwo9l0a8761vi3g9x',
        },
      },
      {
        name: 'Blogging',
        topicID: 'topics_content_blogging',
        icon: 'thumbs-up',
        topicStory: {
          id: 'ck8u9lzjazbmj0a78lgiwsokr',
        },
      },
      {
        name: 'Podcasting',
        topicID: 'topics_content_podcasting',
        icon: 'thumbs-up',
        topicStory: {
          id: 'ck8u9lzybwoa00a874t5m4ytw',
        },
      },
      {
        name: 'YouTube',
        topicID: 'topics_content_youtube',
        icon: 'thumbs-up',
        topicStory: {
          id: 'ck8u9m0c3zbmw0a783ddtrpi5',
        },
      },
      {
        name: 'Streaming',
        topicID: 'topics_content_streaming',
        icon: 'thumbs-up',
        topicStory: {
          id: 'ck8u9m0tvzbn40a78bhy40g3u',
        },
      },
    ],
    name: 'Content Creators',
    icon: 'thumbs-up',
    topicID: 'topics_content',
    topicStory: {
      id: 'ck8u9lyjkzbm40a78ltoak8b6',
    },
  },
  {
    children: [
      {
        name: 'Politics',
        topicID: 'topics_news_politics',
        icon: 'newspaper',
        topicStory: {
          id: 'ck8u9m1tfwoax0a876obiy6aq',
        },
      },
      {
        name: 'Journalism',
        topicID: 'topics_news_journalism',
        icon: 'newspaper',
        topicStory: {
          id: 'ck8u9m29uzbno0a78vzspvldl',
        },
      },
      {
        name: 'Law & Policy',
        topicID: 'topics_news_lawpolicy',
        icon: 'newspaper',
        topicStory: {
          id: 'ck8u9m2xvwobh0a87b4lhzwz4',
        },
      },
    ],
    name: 'News & Politics',
    icon: 'newspaper',
    topicID: 'topics_news',
    topicStory: {
      id: 'ck8u9m1iuwoao0a87tms9z3b6',
    },
  },
  {
    children: [
      {
        name: 'Esports',
        topicID: 'topics_sports_esports',
        icon: 'football-ball',
        topicStory: {
          id: 'ck8u9m7rkwoe20a87oz6ytvf2',
        },
      },
    ],
    name: 'Sports',
    icon: 'football-ball',
    topicID: 'topics_sports',
    topicStory: {
      id: 'ck8u9m3cjwobr0a87dq33jq5l',
    },
  },
  {
    children: [
      {
        name: 'House Flipping',
        topicID: 'topics_realestate_houseflipping',
        icon: 'home',
        topicStory: {
          id: 'ck8u9m8eizbqb0a78cj7hyp3f',
        },
      },
      {
        name: 'Commercial',
        topicID: 'topics_realestate_commercial',
        icon: 'home',
        topicStory: {
          id: 'ck8u9m90xwoeq0a879h2c09je',
        },
      },
      {
        name: 'Multifamily',
        topicID: 'topics_realestate_multifamily',
        icon: 'home',
        topicStory: {
          id: 'ck8u9m9i0zbqr0a78x7qrvvwl',
        },
      },
      {
        name: 'Single Family',
        topicID: 'topics_realestate_singlefamily',
        icon: 'home',
        topicStory: {
          id: 'ck8u9ma6xwof30a870fo81z4i',
        },
      },
      {
        name: 'Realtor',
        topicID: 'topics_realestate_realtor',
        icon: 'home',
        topicStory: {
          id: 'ck8u9malpzbrp0a78le0qu2xo',
        },
      },
    ],
    name: 'Real Estate',
    icon: 'home',
    topicID: 'topics_realestate',
    topicStory: {
      id: 'ck8u9m3uxwoc30a87j9zfzjpw',
    },
  },
  {
    children: [
      {
        name: 'Pre-school',
        topicID: 'topics_education_preschool',
        icon: 'graduation-cap',
        topicStory: {
          id: 'ck8u9mb4mwofg0a873mhglidc',
        },
      },
      {
        name: 'Elementary',
        topicID: 'topics_education_elementary',
        icon: 'graduation-cap',
        topicStory: {
          id: 'ck8u9mbnozbs00a784iksnpke',
        },
      },
      {
        name: 'Middle School',
        topicID: 'topics_education_middleschool',
        icon: 'graduation-cap',
        topicStory: {
          id: 'ck8u9mcd0zbs70a78druvl6va',
        },
      },
      {
        name: 'High School',
        topicID: 'topics_education_highschool',
        icon: 'graduation-cap',
        topicStory: {
          id: 'ck8u9mczpzbse0a78ch6k18zi',
        },
      },
      {
        name: 'Undergraduate',
        topicID: 'topics_education_undergraduate',
        icon: 'graduation-cap',
        topicStory: {
          id: 'ck8u9me5kwofw0a87y4x9uazb',
        },
      },
      {
        name: 'Graduate',
        topicID: 'topics_education_graduate',
        icon: 'graduation-cap',
        topicStory: {
          id: 'ck8u9meqrzbsl0a7868bg8kh0',
        },
      },
      {
        name: 'Doctoral Studies',
        topicID: 'topics_education_doctoralstudies',
        icon: 'graduation-cap',
        topicStory: {
          id: 'ck8u9mgguwog70a87r9i28sc0',
        },
      },
    ],
    name: 'Education',
    icon: 'graduation-cap',
    topicID: 'topics_education',
    topicStory: {
      id: 'ck8u9m4gzwock0a87u4wwt4c6',
    },
  },
  {
    children: [
      {
        name: 'Food & Bev',
        topicID: 'topics_industry_foodbev',
        icon: 'cogs',
        topicStory: {
          id: 'ck8u9m5cywod30a873vb9uj11',
        },
      },
      {
        name: 'E-commerce & Retail',
        topicID: 'topics_industry_ecommerceretail',
        icon: 'cogs',
        topicStory: {
          id: 'ck8u9m5o3zbp80a78n44pygmi',
        },
      },
      {
        name: 'Construction',
        topicID: 'topics_industry_construction',
        icon: 'cogs',
        topicStory: {
          id: 'ck8u9m6a7zbpi0a78890wcsqq',
        },
      },
      {
        name: 'Non-profit',
        topicID: 'topics_industry_nonprofit',
        icon: 'cogs',
        topicStory: {
          id: 'ck8u9m6u9wodp0a87dlan12e7',
        },
      },
      {
        name: 'Travel & Hospitality',
        topicID: 'topics_industry_travelhospitality',
        icon: 'cogs',
        topicStory: {
          id: 'ck8u9m77nzbpt0a78no2ads61',
        },
      },
    ],
    name: 'Industry',
    icon: 'cogs',
    topicID: 'topics_industry',
    topicStory: {
      id: 'ck8u9m4uizboq0a789fed87gl',
    },
  },
];

// copied from database query (format: flat list of all topics)
export const allTopics = [
  {
    name: 'Technology',
    topicID: 'topics_technology',
    topicStory: {
      id: 'ck8u9l53bzb430a78fn8zbxip',
      preview:
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    },
    parentTopic: null,
  },
  {
    name: 'Software',
    topicID: 'topics_technology_software',
    topicStory: {
      id: 'ck8u9l5ihzb4h0a78jh4zhg07',
      preview:
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    },
    parentTopic: {
      name: 'Technology',
      topicID: 'topics_technology',
      topicStory: {
        id: 'ck8u9l53bzb430a78fn8zbxip',
        preview: null,
      },
    },
  },
  {
    name: 'Hardware',
    topicID: 'topics_technology_hardware',
    topicStory: {
      id: 'ck8u9l5txwnqg0a87o4n8no3o',
      preview:
        'https://images.unsplash.com/photo-1555589228-135c25ae8cf5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    },
    parentTopic: {
      name: 'Technology',
      topicID: 'topics_technology',
      topicStory: {
        id: 'ck8u9l53bzb430a78fn8zbxip',
        preview: null,
      },
    },
  },
  {
    name: 'Semiconductors',
    topicID: 'topics_technology_semiconductors',
    topicStory: {
      id: 'ck8u9l670wnqs0a87i31bklaz',
      preview:
        'https://images.unsplash.com/photo-1568209865332-a15790aed756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    },
    parentTopic: {
      name: 'Technology',
      topicID: 'topics_technology',
      topicStory: {
        id: 'ck8u9l53bzb430a78fn8zbxip',
        preview: null,
      },
    },
  },
  {
    name: 'Cloud Computing',
    topicID: 'topics_technology_cloudcomputing',
    topicStory: {
      id: 'ck8u9l6mrwnr70a877ifh7bk2',
      preview:
        'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    },
    parentTopic: {
      name: 'Technology',
      topicID: 'topics_technology',
      topicStory: {
        id: 'ck8u9l53bzb430a78fn8zbxip',
        preview: null,
      },
    },
  },
  {
    name: 'Gaming',
    topicID: 'topics_technology_gaming',
    topicStory: {
      id: 'ck8u9l75uwnrm0a87ejrpxz7j',
      preview:
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    },
    parentTopic: {
      name: 'Technology',
      topicID: 'topics_technology',
      topicStory: {
        id: 'ck8u9l53bzb430a78fn8zbxip',
        preview: null,
      },
    },
  },
  {
    name: 'VR/AR',
    topicID: 'topics_technology_vrar',
    topicStory: {
      id: 'ck8u9l7nkzb5t0a7803p5815l',
      preview:
        'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    },
    parentTopic: {
      name: 'Technology',
      topicID: 'topics_technology',
      topicStory: {
        id: 'ck8u9l53bzb430a78fn8zbxip',
        preview: null,
      },
    },
  },
  {
    name: 'Crypto',
    topicID: 'topics_technology_crypto',
    topicStory: {
      id: 'ck8u9l863wnsd0a87rqmwqtb2',
      preview:
        'https://images.unsplash.com/photo-1518483239595-6f1f9e80b7c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    },
    parentTopic: {
      name: 'Technology',
      topicID: 'topics_technology',
      topicStory: {
        id: 'ck8u9l53bzb430a78fn8zbxip',
        preview: null,
      },
    },
  },
  {
    name: 'AI',
    topicID: 'topics_technology_ai',
    topicStory: {
      id: 'ck8u9l8rmwnsv0a87zwp7agct',
      preview: null,
    },
    parentTopic: {
      name: 'Technology',
      topicID: 'topics_technology',
      topicStory: {
        id: 'ck8u9l53bzb430a78fn8zbxip',
        preview: null,
      },
    },
  },
  {
    name: 'Automation',
    topicID: 'topics_technology_automation',
    topicStory: {
      id: 'ck8u9l95uwnt70a87j24u3e73',
      preview: null,
    },
    parentTopic: {
      name: 'Technology',
      topicID: 'topics_technology',
      topicStory: {
        id: 'ck8u9l53bzb430a78fn8zbxip',
        preview: null,
      },
    },
  },
  {
    name: 'IT & Networking',
    topicID: 'topics_technology_itnetworking',
    topicStory: {
      id: 'ck8u9l9plzb710a78nnver5lt',
      preview: null,
    },
    parentTopic: {
      name: 'Technology',
      topicID: 'topics_technology',
      topicStory: {
        id: 'ck8u9l53bzb430a78fn8zbxip',
        preview: null,
      },
    },
  },
  {
    name: 'Aerospace & Aviation',
    topicID: 'topics_technology_aerospaceaviation',
    topicStory: {
      id: 'ck8u9la4yzb7g0a78mgr151gj',
      preview: null,
    },
    parentTopic: {
      name: 'Technology',
      topicID: 'topics_technology',
      topicStory: {
        id: 'ck8u9l53bzb430a78fn8zbxip',
        preview: null,
      },
    },
  },
  {
    name: 'Automotive',
    topicID: 'topics_technology_automotive',
    topicStory: {
      id: 'ck8u9laigzb7o0a78chuz0143',
      preview: null,
    },
    parentTopic: {
      name: 'Technology',
      topicID: 'topics_technology',
      topicStory: {
        id: 'ck8u9l53bzb430a78fn8zbxip',
        preview: null,
      },
    },
  },
  {
    name: 'Science',
    topicID: 'topics_science',
    topicStory: {
      id: 'ck8u9lb2rzb840a788zexyngq',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Physics',
    topicID: 'topics_science_physics',
    topicStory: {
      id: 'ck8u9lbevwnul0a874zyuerof',
      preview: null,
    },
    parentTopic: {
      name: 'Science',
      topicID: 'topics_science',
      topicStory: {
        id: 'ck8u9lb2rzb840a788zexyngq',
        preview: null,
      },
    },
  },
  {
    name: 'Biotechnology',
    topicID: 'topics_science_biotechnology',
    topicStory: {
      id: 'ck8u9lc1yzb8s0a782e9dfnch',
      preview:
        'https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    },
    parentTopic: {
      name: 'Science',
      topicID: 'topics_science',
      topicStory: {
        id: 'ck8u9lb2rzb840a788zexyngq',
        preview: null,
      },
    },
  },
  {
    name: 'Astrophysics',
    topicID: 'topics_science_astrophysics',
    topicStory: {
      id: 'ck8u9lcr4wnvh0a874znkvovd',
      preview: null,
    },
    parentTopic: {
      name: 'Science',
      topicID: 'topics_science',
      topicStory: {
        id: 'ck8u9lb2rzb840a788zexyngq',
        preview: null,
      },
    },
  },
  {
    name: 'Chemistry',
    topicID: 'topics_science_chemistry',
    topicStory: {
      id: 'ck8u9ld4ozb9h0a78hjkry9cp',
      preview: null,
    },
    parentTopic: {
      name: 'Science',
      topicID: 'topics_science',
      topicStory: {
        id: 'ck8u9lb2rzb840a788zexyngq',
        preview: null,
      },
    },
  },
  {
    name: 'Biology',
    topicID: 'topics_science_biology',
    topicStory: {
      id: 'ck8u9ldopzb9u0a78zs6xo1i7',
      preview: null,
    },
    parentTopic: {
      name: 'Science',
      topicID: 'topics_science',
      topicStory: {
        id: 'ck8u9lb2rzb840a788zexyngq',
        preview: null,
      },
    },
  },
  {
    name: 'Anthropology',
    topicID: 'topics_science_anthropology',
    topicStory: {
      id: 'ck8u9le4uzbaa0a78t6j5ator',
      preview: null,
    },
    parentTopic: {
      name: 'Science',
      topicID: 'topics_science',
      topicStory: {
        id: 'ck8u9lb2rzb840a788zexyngq',
        preview: null,
      },
    },
  },
  {
    name: 'Renewable Energy',
    topicID: 'topics_science_renewableenergy',
    topicStory: {
      id: 'ck8u9lem0wnwn0a87ni3mnpl8',
      preview: null,
    },
    parentTopic: {
      name: 'Science',
      topicID: 'topics_science',
      topicStory: {
        id: 'ck8u9lb2rzb840a788zexyngq',
        preview: null,
      },
    },
  },
  {
    name: 'Creatives',
    topicID: 'topics_creatives',
    topicStory: {
      id: 'ck8u9lf4azbav0a78u2vxmihg',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Photography',
    topicID: 'topics_creatives_photography',
    topicStory: {
      id: 'ck8u9lfpwwnxh0a878aemxcg9',
      preview: null,
    },
    parentTopic: {
      name: 'Creatives',
      topicID: 'topics_creatives',
      topicStory: {
        id: 'ck8u9lf4azbav0a78u2vxmihg',
        preview: null,
      },
    },
  },
  {
    name: 'Videography',
    topicID: 'topics_creatives_videography',
    topicStory: {
      id: 'ck8u9lg43wnxt0a87d6r2c1eu',
      preview: null,
    },
    parentTopic: {
      name: 'Creatives',
      topicID: 'topics_creatives',
      topicStory: {
        id: 'ck8u9lf4azbav0a78u2vxmihg',
        preview: null,
      },
    },
  },
  {
    name: 'UI/UX',
    topicID: 'topics_creatives_uiux',
    topicStory: {
      id: 'ck8u9lgqzzbc00a78sikmhb4e',
      preview: null,
    },
    parentTopic: {
      name: 'Creatives',
      topicID: 'topics_creatives',
      topicStory: {
        id: 'ck8u9lf4azbav0a78u2vxmihg',
        preview: null,
      },
    },
  },
  {
    name: 'Graphic Design',
    topicID: 'topics_creatives_graphicdesign',
    topicStory: {
      id: 'ck8u9lhdlwnyv0a873uw2oz5j',
      preview: null,
    },
    parentTopic: {
      name: 'Creatives',
      topicID: 'topics_creatives',
      topicStory: {
        id: 'ck8u9lf4azbav0a78u2vxmihg',
        preview: null,
      },
    },
  },
  {
    name: 'Visual Art',
    topicID: 'topics_creatives_visualart',
    topicStory: {
      id: 'ck8u9li0uwnzf0a87ofmbk509',
      preview: null,
    },
    parentTopic: {
      name: 'Creatives',
      topicID: 'topics_creatives',
      topicStory: {
        id: 'ck8u9lf4azbav0a78u2vxmihg',
        preview: null,
      },
    },
  },
  {
    name: 'Fashion & Apparel',
    topicID: 'topics_creatives_fashionapparel',
    topicStory: {
      id: 'ck8u9liegzbd70a786ay9uove',
      preview: null,
    },
    parentTopic: {
      name: 'Creatives',
      topicID: 'topics_creatives',
      topicStory: {
        id: 'ck8u9lf4azbav0a78u2vxmihg',
        preview: null,
      },
    },
  },
  {
    name: 'Entertainment',
    topicID: 'topics_entertainment',
    topicStory: {
      id: 'ck8u9lj1wzbdp0a78yhrahgsz',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Music',
    topicID: 'topics_entertainment_music',
    topicStory: {
      id: 'ck8u9ljluwo0c0a878k4kds1g',
      preview:
        'https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    },
    parentTopic: {
      name: 'Entertainment',
      topicID: 'topics_entertainment',
      topicStory: {
        id: 'ck8u9lj1wzbdp0a78yhrahgsz',
        preview: null,
      },
    },
  },
  {
    name: 'Acting',
    topicID: 'topics_entertainment_acting',
    topicStory: {
      id: 'ck8u9lk0bzbeb0a78zvcih915',
      preview: null,
    },
    parentTopic: {
      name: 'Entertainment',
      topicID: 'topics_entertainment',
      topicStory: {
        id: 'ck8u9lj1wzbdp0a78yhrahgsz',
        preview: null,
      },
    },
  },
  {
    name: 'Comedy',
    topicID: 'topics_entertainment_comedy',
    topicStory: {
      id: 'ck8u9lkn5wo140a87i72tn0lr',
      preview: null,
    },
    parentTopic: {
      name: 'Entertainment',
      topicID: 'topics_entertainment',
      topicStory: {
        id: 'ck8u9lj1wzbdp0a78yhrahgsz',
        preview: null,
      },
    },
  },
  {
    name: 'Motion Picture',
    topicID: 'topics_entertainment_motionpicture',
    topicStory: {
      id: 'ck8u9ll91wo1k0a8792i00fy3',
      preview: null,
    },
    parentTopic: {
      name: 'Entertainment',
      topicID: 'topics_entertainment',
      topicStory: {
        id: 'ck8u9lj1wzbdp0a78yhrahgsz',
        preview: null,
      },
    },
  },
  {
    name: 'Writing',
    topicID: 'topics_entertainment_writing',
    topicStory: {
      id: 'ck8u9lln7wo220a87xik2mcqv',
      preview: null,
    },
    parentTopic: {
      name: 'Entertainment',
      topicID: 'topics_entertainment',
      topicStory: {
        id: 'ck8u9lj1wzbdp0a78yhrahgsz',
        preview: null,
      },
    },
  },
  {
    name: 'Business',
    topicID: 'topics_business',
    topicStory: {
      id: 'ck8u9lm15zbfk0a78i7btnzb2',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Entrepreneurship',
    topicID: 'topics_business_entrepreneurship',
    topicStory: {
      id: 'ck8u9lmfjwo2o0a87p7ftpys8',
      preview:
        'https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/2454369/2454369-1570728539101-7603d182f4c11.jpg',
    },
    parentTopic: {
      name: 'Business',
      topicID: 'topics_business',
      topicStory: {
        id: 'ck8u9lm15zbfk0a78i7btnzb2',
        preview: null,
      },
    },
  },
  {
    name: 'Small Business',
    topicID: 'topics_business_smallbusiness',
    topicStory: {
      id: 'ck8u9lmxzzbg80a78r7k92mo9',
      preview: null,
    },
    parentTopic: {
      name: 'Business',
      topicID: 'topics_business',
      topicStory: {
        id: 'ck8u9lm15zbfk0a78i7btnzb2',
        preview: null,
      },
    },
  },
  {
    name: 'Large Business',
    topicID: 'topics_business_largebusiness',
    topicStory: {
      id: 'ck8u9lnl0zbgr0a78heh6d5ue',
      preview: null,
    },
    parentTopic: {
      name: 'Business',
      topicID: 'topics_business',
      topicStory: {
        id: 'ck8u9lm15zbfk0a78i7btnzb2',
        preview: null,
      },
    },
  },
  {
    name: 'Startups',
    topicID: 'topics_business_startups',
    topicStory: {
      id: 'ck8u9lnxqwo3o0a870ln7aq96',
      preview: null,
    },
    parentTopic: {
      name: 'Business',
      topicID: 'topics_business',
      topicStory: {
        id: 'ck8u9lm15zbfk0a78i7btnzb2',
        preview: null,
      },
    },
  },
  {
    name: 'HR',
    topicID: 'topics_business_hr',
    topicStory: {
      id: 'ck8u9log8wo430a8703l9k77v',
      preview: null,
    },
    parentTopic: {
      name: 'Business',
      topicID: 'topics_business',
      topicStory: {
        id: 'ck8u9lm15zbfk0a78i7btnzb2',
        preview: null,
      },
    },
  },
  {
    name: 'Accounting',
    topicID: 'topics_business_accounting',
    topicStory: {
      id: 'ck8u9loyowo4o0a87movdh5x2',
      preview: null,
    },
    parentTopic: {
      name: 'Business',
      topicID: 'topics_business',
      topicStory: {
        id: 'ck8u9lm15zbfk0a78i7btnzb2',
        preview: null,
      },
    },
  },
  {
    name: 'Logistics',
    topicID: 'topics_business_logistics',
    topicStory: {
      id: 'ck8u9lpcuzbhz0a78mrutbvb4',
      preview: null,
    },
    parentTopic: {
      name: 'Business',
      topicID: 'topics_business',
      topicStory: {
        id: 'ck8u9lm15zbfk0a78i7btnzb2',
        preview: null,
      },
    },
  },
  {
    name: 'Manufacturing',
    topicID: 'topics_business_manufacturing',
    topicStory: {
      id: 'ck8u9lpr1wo5b0a87gp3c127j',
      preview: null,
    },
    parentTopic: {
      name: 'Business',
      topicID: 'topics_business',
      topicStory: {
        id: 'ck8u9lm15zbfk0a78i7btnzb2',
        preview: null,
      },
    },
  },
  {
    name: 'Sales',
    topicID: 'topics_business_sales',
    topicStory: {
      id: 'ck8u9lq5izbio0a78zv9qouec',
      preview: null,
    },
    parentTopic: {
      name: 'Business',
      topicID: 'topics_business',
      topicStory: {
        id: 'ck8u9lm15zbfk0a78i7btnzb2',
        preview: null,
      },
    },
  },
  {
    name: 'Operations',
    topicID: 'topics_business_operations',
    topicStory: {
      id: 'ck8u9lquyzbj70a78tdh16nq6',
      preview: null,
    },
    parentTopic: {
      name: 'Business',
      topicID: 'topics_business',
      topicStory: {
        id: 'ck8u9lm15zbfk0a78i7btnzb2',
        preview: null,
      },
    },
  },
  {
    name: 'Management',
    topicID: 'topics_business_management',
    topicStory: {
      id: 'ck8u9lreuzbjf0a78gam9y79u',
      preview: null,
    },
    parentTopic: {
      name: 'Business',
      topicID: 'topics_business',
      topicStory: {
        id: 'ck8u9lm15zbfk0a78i7btnzb2',
        preview: null,
      },
    },
  },
  {
    name: 'Finance & Markets',
    topicID: 'topics_finance',
    topicStory: {
      id: 'ck8u9ls1nwo6g0a87t2si5ygd',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Stock Market',
    topicID: 'topics_finance_stockmarket',
    topicStory: {
      id: 'ck8u9lsedwo6q0a87duwrdpqo',
      preview:
        'https://images.unsplash.com/photo-1468254095679-bbcba94a7066?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    },
    parentTopic: {
      name: 'Finance & Markets',
      topicID: 'topics_finance',
      topicStory: {
        id: 'ck8u9ls1nwo6g0a87t2si5ygd',
        preview: null,
      },
    },
  },
  {
    name: 'Day Trading',
    topicID: 'topics_finance_daytrading',
    topicStory: {
      id: 'ck8u9lsp3zbjw0a78ew98q41o',
      preview: null,
    },
    parentTopic: {
      name: 'Finance & Markets',
      topicID: 'topics_finance',
      topicStory: {
        id: 'ck8u9ls1nwo6g0a87t2si5ygd',
        preview: null,
      },
    },
  },
  {
    name: 'Wealth Management',
    topicID: 'topics_finance_wealthmanagement',
    topicStory: {
      id: 'ck8u9lt2awo6z0a87stfvothd',
      preview: null,
    },
    parentTopic: {
      name: 'Finance & Markets',
      topicID: 'topics_finance',
      topicStory: {
        id: 'ck8u9ls1nwo6g0a87t2si5ygd',
        preview: null,
      },
    },
  },
  {
    name: 'Banking',
    topicID: 'topics_finance_banking',
    topicStory: {
      id: 'ck8u9lth1zbk70a78w033yio0',
      preview: null,
    },
    parentTopic: {
      name: 'Finance & Markets',
      topicID: 'topics_finance',
      topicStory: {
        id: 'ck8u9ls1nwo6g0a87t2si5ygd',
        preview: null,
      },
    },
  },
  {
    name: 'Insurance',
    topicID: 'topics_finance_insurance',
    topicStory: {
      id: 'ck8u9ltvqwo7e0a8723xqmwcl',
      preview: null,
    },
    parentTopic: {
      name: 'Finance & Markets',
      topicID: 'topics_finance',
      topicStory: {
        id: 'ck8u9ls1nwo6g0a87t2si5ygd',
        preview: null,
      },
    },
  },
  {
    name: 'Marketing',
    topicID: 'topics_marketing',
    topicStory: {
      id: 'ck8u9luezwo7n0a87xy2ud5w6',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Social Media Marketing',
    topicID: 'topics_marketing_socialmediamarketing',
    topicStory: {
      id: 'ck8u9lut1zbkn0a78ujfksu1b',
      preview: null,
    },
    parentTopic: {
      name: 'Marketing',
      topicID: 'topics_marketing',
      topicStory: {
        id: 'ck8u9luezwo7n0a87xy2ud5w6',
        preview: null,
      },
    },
  },
  {
    name: 'Advertising',
    topicID: 'topics_marketing_advertising',
    topicStory: {
      id: 'ck8u9lv79zbkx0a78uw8fg2vu',
      preview: null,
    },
    parentTopic: {
      name: 'Marketing',
      topicID: 'topics_marketing',
      topicStory: {
        id: 'ck8u9luezwo7n0a87xy2ud5w6',
        preview: null,
      },
    },
  },
  {
    name: 'Branding',
    topicID: 'topics_marketing_branding',
    topicStory: {
      id: 'ck8u9lvkhwo830a870wvxwacu',
      preview: null,
    },
    parentTopic: {
      name: 'Marketing',
      topicID: 'topics_marketing',
      topicStory: {
        id: 'ck8u9luezwo7n0a87xy2ud5w6',
        preview: null,
      },
    },
  },
  {
    name: 'Health & Wellness',
    topicID: 'topics_health',
    topicStory: {
      id: 'ck8u9lwb7zbla0a78lj1rcqqv',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Fitness',
    topicID: 'topics_health_fitness',
    topicStory: {
      id: 'ck8u9lwu8wo8j0a87fttcsj6g',
      preview: null,
    },
    parentTopic: {
      name: 'Health & Wellness',
      topicID: 'topics_health',
      topicStory: {
        id: 'ck8u9lwb7zbla0a78lj1rcqqv',
        preview: null,
      },
    },
  },
  {
    name: 'Nutrition',
    topicID: 'topics_health_nutrition',
    topicStory: {
      id: 'ck8u9lx6jwo8t0a87qb1ur9m5',
      preview: null,
    },
    parentTopic: {
      name: 'Health & Wellness',
      topicID: 'topics_health',
      topicStory: {
        id: 'ck8u9lwb7zbla0a78lj1rcqqv',
        preview: null,
      },
    },
  },
  {
    name: 'Medicine',
    topicID: 'topics_health_medicine',
    topicStory: {
      id: 'ck8u9lxp1zblq0a78vnovqvzh',
      preview: null,
    },
    parentTopic: {
      name: 'Health & Wellness',
      topicID: 'topics_health',
      topicStory: {
        id: 'ck8u9lwb7zbla0a78lj1rcqqv',
        preview: null,
      },
    },
  },
  {
    name: 'Physical Therapy',
    topicID: 'topics_health_physicaltherapy',
    topicStory: {
      id: 'ck8u9ly89wo980a87323tc3vt',
      preview: null,
    },
    parentTopic: {
      name: 'Health & Wellness',
      topicID: 'topics_health',
      topicStory: {
        id: 'ck8u9lwb7zbla0a78lj1rcqqv',
        preview: null,
      },
    },
  },
  {
    name: 'Content Creators',
    topicID: 'topics_content',
    topicStory: {
      id: 'ck8u9lyjkzbm40a78ltoak8b6',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Social Media',
    topicID: 'topics_content_socialmedia',
    topicStory: {
      id: 'ck8u9lz5pwo9l0a8761vi3g9x',
      preview: null,
    },
    parentTopic: {
      name: 'Content Creators',
      topicID: 'topics_content',
      topicStory: {
        id: 'ck8u9lyjkzbm40a78ltoak8b6',
        preview: null,
      },
    },
  },
  {
    name: 'Blogging',
    topicID: 'topics_content_blogging',
    topicStory: {
      id: 'ck8u9lzjazbmj0a78lgiwsokr',
      preview: null,
    },
    parentTopic: {
      name: 'Content Creators',
      topicID: 'topics_content',
      topicStory: {
        id: 'ck8u9lyjkzbm40a78ltoak8b6',
        preview: null,
      },
    },
  },
  {
    name: 'Podcasting',
    topicID: 'topics_content_podcasting',
    topicStory: {
      id: 'ck8u9lzybwoa00a874t5m4ytw',
      preview: null,
    },
    parentTopic: {
      name: 'Content Creators',
      topicID: 'topics_content',
      topicStory: {
        id: 'ck8u9lyjkzbm40a78ltoak8b6',
        preview: null,
      },
    },
  },
  {
    name: 'YouTube',
    topicID: 'topics_content_youtube',
    topicStory: {
      id: 'ck8u9m0c3zbmw0a783ddtrpi5',
      preview: null,
    },
    parentTopic: {
      name: 'Content Creators',
      topicID: 'topics_content',
      topicStory: {
        id: 'ck8u9lyjkzbm40a78ltoak8b6',
        preview: null,
      },
    },
  },
  {
    name: 'Streaming',
    topicID: 'topics_content_streaming',
    topicStory: {
      id: 'ck8u9m0tvzbn40a78bhy40g3u',
      preview: null,
    },
    parentTopic: {
      name: 'Content Creators',
      topicID: 'topics_content',
      topicStory: {
        id: 'ck8u9lyjkzbm40a78ltoak8b6',
        preview: null,
      },
    },
  },
  {
    name: 'News & Politics',
    topicID: 'topics_news',
    topicStory: {
      id: 'ck8u9m1iuwoao0a87tms9z3b6',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Politics',
    topicID: 'topics_news_politics',
    topicStory: {
      id: 'ck8u9m1tfwoax0a876obiy6aq',
      preview: null,
    },
    parentTopic: {
      name: 'News & Politics',
      topicID: 'topics_news',
      topicStory: {
        id: 'ck8u9m1iuwoao0a87tms9z3b6',
        preview: null,
      },
    },
  },
  {
    name: 'Journalism',
    topicID: 'topics_news_journalism',
    topicStory: {
      id: 'ck8u9m29uzbno0a78vzspvldl',
      preview: null,
    },
    parentTopic: {
      name: 'News & Politics',
      topicID: 'topics_news',
      topicStory: {
        id: 'ck8u9m1iuwoao0a87tms9z3b6',
        preview: null,
      },
    },
  },
  {
    name: 'Law & Policy',
    topicID: 'topics_news_lawpolicy',
    topicStory: {
      id: 'ck8u9m2xvwobh0a87b4lhzwz4',
      preview: null,
    },
    parentTopic: {
      name: 'News & Politics',
      topicID: 'topics_news',
      topicStory: {
        id: 'ck8u9m1iuwoao0a87tms9z3b6',
        preview: null,
      },
    },
  },
  {
    name: 'Sports',
    topicID: 'topics_sports',
    topicStory: {
      id: 'ck8u9m3cjwobr0a87dq33jq5l',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Real Estate',
    topicID: 'topics_realestate',
    topicStory: {
      id: 'ck8u9m3uxwoc30a87j9zfzjpw',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Education',
    topicID: 'topics_education',
    topicStory: {
      id: 'ck8u9m4gzwock0a87u4wwt4c6',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Industry',
    topicID: 'topics_industry',
    topicStory: {
      id: 'ck8u9m4uizboq0a789fed87gl',
      preview: null,
    },
    parentTopic: null,
  },
  {
    name: 'Food & Bev',
    topicID: 'topics_industry_foodbev',
    topicStory: {
      id: 'ck8u9m5cywod30a873vb9uj11',
      preview: null,
    },
    parentTopic: {
      name: 'Industry',
      topicID: 'topics_industry',
      topicStory: {
        id: 'ck8u9m4uizboq0a789fed87gl',
        preview: null,
      },
    },
  },
  {
    name: 'E-commerce & Retail',
    topicID: 'topics_industry_ecommerceretail',
    topicStory: {
      id: 'ck8u9m5o3zbp80a78n44pygmi',
      preview: null,
    },
    parentTopic: {
      name: 'Industry',
      topicID: 'topics_industry',
      topicStory: {
        id: 'ck8u9m4uizboq0a789fed87gl',
        preview: null,
      },
    },
  },
  {
    name: 'Construction',
    topicID: 'topics_industry_construction',
    topicStory: {
      id: 'ck8u9m6a7zbpi0a78890wcsqq',
      preview: null,
    },
    parentTopic: {
      name: 'Industry',
      topicID: 'topics_industry',
      topicStory: {
        id: 'ck8u9m4uizboq0a789fed87gl',
        preview: null,
      },
    },
  },
  {
    name: 'Non-profit',
    topicID: 'topics_industry_nonprofit',
    topicStory: {
      id: 'ck8u9m6u9wodp0a87dlan12e7',
      preview: null,
    },
    parentTopic: {
      name: 'Industry',
      topicID: 'topics_industry',
      topicStory: {
        id: 'ck8u9m4uizboq0a789fed87gl',
        preview: null,
      },
    },
  },
  {
    name: 'Travel & Hospitality',
    topicID: 'topics_industry_travelhospitality',
    topicStory: {
      id: 'ck8u9m77nzbpt0a78no2ads61',
      preview: null,
    },
    parentTopic: {
      name: 'Industry',
      topicID: 'topics_industry',
      topicStory: {
        id: 'ck8u9m4uizboq0a789fed87gl',
        preview: null,
      },
    },
  },
  {
    name: 'Software & Tech',
    topicID: 'freelance_software',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Web Development',
    topicID: 'freelance_software_webdevelopment',
    topicStory: null,
    parentTopic: {
      name: 'Software & Tech',
      topicID: 'freelance_software',
      topicStory: null,
    },
  },
  {
    name: 'Mobile Apps',
    topicID: 'freelance_software_mobileapps',
    topicStory: null,
    parentTopic: {
      name: 'Software & Tech',
      topicID: 'freelance_software',
      topicStory: null,
    },
  },
  {
    name: 'Game Development',
    topicID: 'freelance_software_gamedevelopment',
    topicStory: null,
    parentTopic: {
      name: 'Software & Tech',
      topicID: 'freelance_software',
      topicStory: null,
    },
  },
  {
    name: 'E-commerce Development',
    topicID: 'freelance_software_ecommercedevelopment',
    topicStory: null,
    parentTopic: {
      name: 'Software & Tech',
      topicID: 'freelance_software',
      topicStory: null,
    },
  },
  {
    name: 'Backend / Database',
    topicID: 'freelance_software_backenddatabase',
    topicStory: null,
    parentTopic: {
      name: 'Software & Tech',
      topicID: 'freelance_software',
      topicStory: null,
    },
  },
  {
    name: 'IT & Networking',
    topicID: 'freelance_software_itnetworking',
    topicStory: null,
    parentTopic: {
      name: 'Software & Tech',
      topicID: 'freelance_software',
      topicStory: null,
    },
  },
  {
    name: 'Data Science & Analytics',
    topicID: 'freelance_software_datascienceanalytics',
    topicStory: null,
    parentTopic: {
      name: 'Software & Tech',
      topicID: 'freelance_software',
      topicStory: null,
    },
  },
  {
    name: 'Other',
    topicID: 'freelance_software_other',
    topicStory: null,
    parentTopic: {
      name: 'Software & Tech',
      topicID: 'freelance_software',
      topicStory: null,
    },
  },
  {
    name: 'Engineering',
    topicID: 'freelance_engineering',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Mechanical Engineering',
    topicID: 'freelance_engineering_mechanicalengineering',
    topicStory: null,
    parentTopic: {
      name: 'Engineering',
      topicID: 'freelance_engineering',
      topicStory: null,
    },
  },
  {
    name: 'Electrical Engineering',
    topicID: 'freelance_engineering_electricalengineering',
    topicStory: null,
    parentTopic: {
      name: 'Engineering',
      topicID: 'freelance_engineering',
      topicStory: null,
    },
  },
  {
    name: 'Chemical Engineering',
    topicID: 'freelance_engineering_chemicalengineering',
    topicStory: null,
    parentTopic: {
      name: 'Engineering',
      topicID: 'freelance_engineering',
      topicStory: null,
    },
  },
  {
    name: 'Civil & Structural Engineering',
    topicID: 'freelance_engineering_civilstructuralengineering',
    topicStory: null,
    parentTopic: {
      name: 'Engineering',
      topicID: 'freelance_engineering',
      topicStory: null,
    },
  },
  {
    name: 'Product Design',
    topicID: 'freelance_engineering_productdesign',
    topicStory: null,
    parentTopic: {
      name: 'Engineering',
      topicID: 'freelance_engineering',
      topicStory: null,
    },
  },
  {
    name: '3D Modeling & CAD',
    topicID: 'freelance_engineering_3dmodelingcad',
    topicStory: null,
    parentTopic: {
      name: 'Engineering',
      topicID: 'freelance_engineering',
      topicStory: null,
    },
  },
  {
    name: 'Other',
    topicID: 'freelance_engineering_other',
    topicStory: null,
    parentTopic: {
      name: 'Engineering',
      topicID: 'freelance_engineering',
      topicStory: null,
    },
  },
  {
    name: 'Graphics & Design',
    topicID: 'freelance_design',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Logo Design',
    topicID: 'freelance_design_logodesign',
    topicStory: null,
    parentTopic: {
      name: 'Graphics & Design',
      topicID: 'freelance_design',
      topicStory: null,
    },
  },
  {
    name: 'Brand Design',
    topicID: 'freelance_design_branddesign',
    topicStory: null,
    parentTopic: {
      name: 'Graphics & Design',
      topicID: 'freelance_design',
      topicStory: null,
    },
  },
  {
    name: 'Web & Mobile Design',
    topicID: 'freelance_design_webmobiledesign',
    topicStory: null,
    parentTopic: {
      name: 'Graphics & Design',
      topicID: 'freelance_design',
      topicStory: null,
    },
  },
  {
    name: 'Graphic Design',
    topicID: 'freelance_design_graphicdesign',
    topicStory: null,
    parentTopic: {
      name: 'Graphics & Design',
      topicID: 'freelance_design',
      topicStory: null,
    },
  },
  {
    name: 'Game Design',
    topicID: 'freelance_design_gamedesign',
    topicStory: null,
    parentTopic: {
      name: 'Graphics & Design',
      topicID: 'freelance_design',
      topicStory: null,
    },
  },
  {
    name: 'Photoshop',
    topicID: 'freelance_design_photoshop',
    topicStory: null,
    parentTopic: {
      name: 'Graphics & Design',
      topicID: 'freelance_design',
      topicStory: null,
    },
  },
  {
    name: 'Other',
    topicID: 'freelance_design_other',
    topicStory: null,
    parentTopic: {
      name: 'Graphics & Design',
      topicID: 'freelance_design',
      topicStory: null,
    },
  },
  {
    name: 'Music & Audio',
    topicID: 'freelance_musicaudio',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Voice Over',
    topicID: 'freelance_musicaudio_voiceover',
    topicStory: null,
    parentTopic: {
      name: 'Music & Audio',
      topicID: 'freelance_musicaudio',
      topicStory: null,
    },
  },
  {
    name: 'Mixing & Mastering',
    topicID: 'freelance_musicaudio_mixingmastering',
    topicStory: null,
    parentTopic: {
      name: 'Music & Audio',
      topicID: 'freelance_musicaudio',
      topicStory: null,
    },
  },
  {
    name: 'Producing',
    topicID: 'freelance_musicaudio_producing',
    topicStory: null,
    parentTopic: {
      name: 'Music & Audio',
      topicID: 'freelance_musicaudio',
      topicStory: null,
    },
  },
  {
    name: 'Singer-Songwriter',
    topicID: 'freelance_musicaudio_singersongwriter',
    topicStory: null,
    parentTopic: {
      name: 'Music & Audio',
      topicID: 'freelance_musicaudio',
      topicStory: null,
    },
  },
  {
    name: 'Other',
    topicID: 'freelance_musicaudio_other',
    topicStory: null,
    parentTopic: {
      name: 'Music & Audio',
      topicID: 'freelance_musicaudio',
      topicStory: null,
    },
  },
  {
    name: 'Video & Animation',
    topicID: 'freelance_videoanimation',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Explainer Videos',
    topicID: 'freelance_videoanimation_explainervideos',
    topicStory: null,
    parentTopic: {
      name: 'Video & Animation',
      topicID: 'freelance_videoanimation',
      topicStory: null,
    },
  },
  {
    name: 'Video Editing',
    topicID: 'freelance_videoanimation_videoediting',
    topicStory: null,
    parentTopic: {
      name: 'Video & Animation',
      topicID: 'freelance_videoanimation',
      topicStory: null,
    },
  },
  {
    name: 'Video Production',
    topicID: 'freelance_videoanimation_videoproduction',
    topicStory: null,
    parentTopic: {
      name: 'Video & Animation',
      topicID: 'freelance_videoanimation',
      topicStory: null,
    },
  },
  {
    name: 'Intros & Outros',
    topicID: 'freelance_videoanimation_introsoutros',
    topicStory: null,
    parentTopic: {
      name: 'Video & Animation',
      topicID: 'freelance_videoanimation',
      topicStory: null,
    },
  },
  {
    name: 'Animations',
    topicID: 'freelance_videoanimation_animations',
    topicStory: null,
    parentTopic: {
      name: 'Video & Animation',
      topicID: 'freelance_videoanimation',
      topicStory: null,
    },
  },
  {
    name: 'Short Video Ads',
    topicID: 'freelance_videoanimation_shortvideoads',
    topicStory: null,
    parentTopic: {
      name: 'Video & Animation',
      topicID: 'freelance_videoanimation',
      topicStory: null,
    },
  },
  {
    name: 'Other',
    topicID: 'freelance_videoanimation_other',
    topicStory: null,
    parentTopic: {
      name: 'Video & Animation',
      topicID: 'freelance_videoanimation',
      topicStory: null,
    },
  },
  {
    name: 'Sales & Marketing',
    topicID: 'freelance_salesmarketing',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Social Media Marketing',
    topicID: 'freelance_salesmarketing_socialmediamarketing',
    topicStory: null,
    parentTopic: {
      name: 'Sales & Marketing',
      topicID: 'freelance_salesmarketing',
      topicStory: null,
    },
  },
  {
    name: 'Digital Marketing',
    topicID: 'freelance_salesmarketing_digitalmarketing',
    topicStory: null,
    parentTopic: {
      name: 'Sales & Marketing',
      topicID: 'freelance_salesmarketing',
      topicStory: null,
    },
  },
  {
    name: 'Marketing Strategy',
    topicID: 'freelance_salesmarketing_marketingstrategy',
    topicStory: null,
    parentTopic: {
      name: 'Sales & Marketing',
      topicID: 'freelance_salesmarketing',
      topicStory: null,
    },
  },
  {
    name: 'E-commerce Sales',
    topicID: 'freelance_salesmarketing_ecommercesales',
    topicStory: null,
    parentTopic: {
      name: 'Sales & Marketing',
      topicID: 'freelance_salesmarketing',
      topicStory: null,
    },
  },
  {
    name: 'Lead Generation & Sales',
    topicID: 'freelance_salesmarketing_leadgenerationsales',
    topicStory: null,
    parentTopic: {
      name: 'Sales & Marketing',
      topicID: 'freelance_salesmarketing',
      topicStory: null,
    },
  },
  {
    name: 'Other',
    topicID: 'freelance_salesmarketing_other',
    topicStory: null,
    parentTopic: {
      name: 'Sales & Marketing',
      topicID: 'freelance_salesmarketing',
      topicStory: null,
    },
  },
  {
    name: 'Business',
    topicID: 'freelance_business',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Virtual Assistant',
    topicID: 'freelance_business_virtualassistant',
    topicStory: null,
    parentTopic: {
      name: 'Business',
      topicID: 'freelance_business',
      topicStory: null,
    },
  },
  {
    name: 'Data Entry',
    topicID: 'freelance_business_dataentry',
    topicStory: null,
    parentTopic: {
      name: 'Business',
      topicID: 'freelance_business',
      topicStory: null,
    },
  },
  {
    name: 'Accounting',
    topicID: 'freelance_business_accounting',
    topicStory: null,
    parentTopic: {
      name: 'Business',
      topicID: 'freelance_business',
      topicStory: null,
    },
  },
  {
    name: 'Legal Consulting',
    topicID: 'freelance_business_legalconsulting',
    topicStory: null,
    parentTopic: {
      name: 'Business',
      topicID: 'freelance_business',
      topicStory: null,
    },
  },
  {
    name: 'Financial Consulting',
    topicID: 'freelance_business_financialconsulting',
    topicStory: null,
    parentTopic: {
      name: 'Business',
      topicID: 'freelance_business',
      topicStory: null,
    },
  },
  {
    name: 'Business Consulting',
    topicID: 'freelance_business_businessconsulting',
    topicStory: null,
    parentTopic: {
      name: 'Business',
      topicID: 'freelance_business',
      topicStory: null,
    },
  },
  {
    name: 'Branding Services',
    topicID: 'freelance_business_brandingservices',
    topicStory: null,
    parentTopic: {
      name: 'Business',
      topicID: 'freelance_business',
      topicStory: null,
    },
  },
  {
    name: 'Project Managament',
    topicID: 'freelance_business_projectmanagement',
    topicStory: null,
    parentTopic: {
      name: 'Business',
      topicID: 'freelance_business',
      topicStory: null,
    },
  },
  {
    name: 'Marketing Research',
    topicID: 'freelance_business_marketingresearch',
    topicStory: null,
    parentTopic: {
      name: 'Business',
      topicID: 'freelance_business',
      topicStory: null,
    },
  },
  {
    name: 'Customer Service',
    topicID: 'freelance_business_customerservice',
    topicStory: null,
    parentTopic: {
      name: 'Business',
      topicID: 'freelance_business',
      topicStory: null,
    },
  },
  {
    name: 'Other',
    topicID: 'freelance_business_other',
    topicStory: null,
    parentTopic: {
      name: 'Business',
      topicID: 'freelance_business',
      topicStory: null,
    },
  },
  {
    name: 'Writing',
    topicID: 'freelance_writing',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Editing & Proofreading',
    topicID: 'freelance_writing_editingproofreading',
    topicStory: null,
    parentTopic: {
      name: 'Writing',
      topicID: 'freelance_writing',
      topicStory: null,
    },
  },
  {
    name: 'Content Writing',
    topicID: 'freelance_writing_contentwriting',
    topicStory: null,
    parentTopic: {
      name: 'Writing',
      topicID: 'freelance_writing',
      topicStory: null,
    },
  },
  {
    name: 'Ghostwriting',
    topicID: 'freelance_writing_ghostwriting',
    topicStory: null,
    parentTopic: {
      name: 'Writing',
      topicID: 'freelance_writing',
      topicStory: null,
    },
  },
  {
    name: 'Business Writing',
    topicID: 'freelance_writing_businesswriting',
    topicStory: null,
    parentTopic: {
      name: 'Writing',
      topicID: 'freelance_writing',
      topicStory: null,
    },
  },
  {
    name: 'Creative Writing',
    topicID: 'freelance_writing_creativewriting',
    topicStory: null,
    parentTopic: {
      name: 'Writing',
      topicID: 'freelance_writing',
      topicStory: null,
    },
  },
  {
    name: 'Technical Writing',
    topicID: 'freelance_writing_technicalwriting',
    topicStory: null,
    parentTopic: {
      name: 'Writing',
      topicID: 'freelance_writing',
      topicStory: null,
    },
  },
  {
    name: 'Other',
    topicID: 'freelance_writing_other',
    topicStory: null,
    parentTopic: {
      name: 'Writing',
      topicID: 'freelance_writing',
      topicStory: null,
    },
  },
  {
    name: 'Startups',
    topicID: 'invest_startup',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Venture Capital',
    topicID: 'invest_venturecapital',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Real Estate',
    topicID: 'invest_realestate',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Hedge Funds',
    topicID: 'invest_hedgefund',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Other',
    topicID: 'invest_other',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Find Investors',
    topicID: 'goals_findinvestors',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Find Freelancers',
    topicID: 'goals_findfreelancers',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Find Agencies',
    topicID: 'goals_findagencies',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Get Coffee',
    topicID: 'goals_getcoffee',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Find Business Partners',
    topicID: 'goals_findbusinesspartners',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Find Mentors',
    topicID: 'goals_findmentors',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Network',
    topicID: 'goals_network',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Get Advice',
    topicID: 'goals_getadvice',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Get Feedback',
    topicID: 'goals_getfeedback',
    topicStory: null,
    parentTopic: null,
  },
  {
    name: 'Esports',
    topicID: 'topics_sports_esports',
    topicStory: {
      id: 'ck8u9m7rkwoe20a87oz6ytvf2',
      preview: null,
    },
    parentTopic: {
      name: 'Sports',
      topicID: 'topics_sports',
      topicStory: {
        id: 'ck8u9m3cjwobr0a87dq33jq5l',
        preview: null,
      },
    },
  },
  {
    name: 'House Flipping',
    topicID: 'topics_realestate_houseflipping',
    topicStory: {
      id: 'ck8u9m8eizbqb0a78cj7hyp3f',
      preview: null,
    },
    parentTopic: {
      name: 'Real Estate',
      topicID: 'topics_realestate',
      topicStory: {
        id: 'ck8u9m3uxwoc30a87j9zfzjpw',
        preview: null,
      },
    },
  },
  {
    name: 'Commercial',
    topicID: 'topics_realestate_commercial',
    topicStory: {
      id: 'ck8u9m90xwoeq0a879h2c09je',
      preview: null,
    },
    parentTopic: {
      name: 'Real Estate',
      topicID: 'topics_realestate',
      topicStory: {
        id: 'ck8u9m3uxwoc30a87j9zfzjpw',
        preview: null,
      },
    },
  },
  {
    name: 'Multifamily',
    topicID: 'topics_realestate_multifamily',
    topicStory: {
      id: 'ck8u9m9i0zbqr0a78x7qrvvwl',
      preview: null,
    },
    parentTopic: {
      name: 'Real Estate',
      topicID: 'topics_realestate',
      topicStory: {
        id: 'ck8u9m3uxwoc30a87j9zfzjpw',
        preview: null,
      },
    },
  },
  {
    name: 'Single Family',
    topicID: 'topics_realestate_singlefamily',
    topicStory: {
      id: 'ck8u9ma6xwof30a870fo81z4i',
      preview: null,
    },
    parentTopic: {
      name: 'Real Estate',
      topicID: 'topics_realestate',
      topicStory: {
        id: 'ck8u9m3uxwoc30a87j9zfzjpw',
        preview: null,
      },
    },
  },
  {
    name: 'Realtor',
    topicID: 'topics_realestate_realtor',
    topicStory: {
      id: 'ck8u9malpzbrp0a78le0qu2xo',
      preview: null,
    },
    parentTopic: {
      name: 'Real Estate',
      topicID: 'topics_realestate',
      topicStory: {
        id: 'ck8u9m3uxwoc30a87j9zfzjpw',
        preview: null,
      },
    },
  },
  {
    name: 'Pre-school',
    topicID: 'topics_education_preschool',
    topicStory: {
      id: 'ck8u9mb4mwofg0a873mhglidc',
      preview: null,
    },
    parentTopic: {
      name: 'Education',
      topicID: 'topics_education',
      topicStory: {
        id: 'ck8u9m4gzwock0a87u4wwt4c6',
        preview: null,
      },
    },
  },
  {
    name: 'Elementary',
    topicID: 'topics_education_elementary',
    topicStory: {
      id: 'ck8u9mbnozbs00a784iksnpke',
      preview: null,
    },
    parentTopic: {
      name: 'Education',
      topicID: 'topics_education',
      topicStory: {
        id: 'ck8u9m4gzwock0a87u4wwt4c6',
        preview: null,
      },
    },
  },
  {
    name: 'Middle School',
    topicID: 'topics_education_middleschool',
    topicStory: {
      id: 'ck8u9mcd0zbs70a78druvl6va',
      preview: null,
    },
    parentTopic: {
      name: 'Education',
      topicID: 'topics_education',
      topicStory: {
        id: 'ck8u9m4gzwock0a87u4wwt4c6',
        preview: null,
      },
    },
  },
  {
    name: 'High School',
    topicID: 'topics_education_highschool',
    topicStory: {
      id: 'ck8u9mczpzbse0a78ch6k18zi',
      preview: null,
    },
    parentTopic: {
      name: 'Education',
      topicID: 'topics_education',
      topicStory: {
        id: 'ck8u9m4gzwock0a87u4wwt4c6',
        preview: null,
      },
    },
  },
  {
    name: 'Undergraduate',
    topicID: 'topics_education_undergraduate',
    topicStory: {
      id: 'ck8u9me5kwofw0a87y4x9uazb',
      preview: null,
    },
    parentTopic: {
      name: 'Education',
      topicID: 'topics_education',
      topicStory: {
        id: 'ck8u9m4gzwock0a87u4wwt4c6',
        preview: null,
      },
    },
  },
  {
    name: 'Graduate',
    topicID: 'topics_education_graduate',
    topicStory: {
      id: 'ck8u9meqrzbsl0a7868bg8kh0',
      preview: null,
    },
    parentTopic: {
      name: 'Education',
      topicID: 'topics_education',
      topicStory: {
        id: 'ck8u9m4gzwock0a87u4wwt4c6',
        preview: null,
      },
    },
  },
  {
    name: 'Doctoral Studies',
    topicID: 'topics_education_doctoralstudies',
    topicStory: {
      id: 'ck8u9mgguwog70a87r9i28sc0',
      preview: null,
    },
    parentTopic: {
      name: 'Education',
      topicID: 'topics_education',
      topicStory: {
        id: 'ck8u9m4gzwock0a87u4wwt4c6',
        preview: null,
      },
    },
  },
];

// same as topicsList but no children (and added color)
export const mainTopicsList = [
  {
    name: 'Technology',
    icon: 'bolt',
    color: colors.yellow,
    topicID: 'topics_technology',
    topicStory: {
      id: 'ck8u9l53bzb430a78fn8zbxip',
    },
  },
  {
    name: 'Science',
    icon: 'atom',
    color: colors.purple,
    topicID: 'topics_science',
    topicStory: {
      id: 'ck8u9lb2rzb840a788zexyngq',
    },
  },
  {
    name: 'Creatives',
    icon: 'palette',
    color: colors.green,
    topicID: 'topics_creatives',
    topicStory: {
      id: 'ck8u9lf4azbav0a78u2vxmihg',
    },
  },
  {
    name: 'Entertainment',
    icon: 'film',
    color: colors.orange,
    topicID: 'topics_entertainment',
    topicStory: {
      id: 'ck8u9lj1wzbdp0a78yhrahgsz',
    },
  },
  {
    name: 'Business',
    color: colors.black,
    icon: 'user-tie',
    topicID: 'topics_business',
    topicStory: {
      id: 'ck8u9lm15zbfk0a78i7btnzb2',
    },
  },
  {
    name: 'Finance & Markets',
    icon: 'chart-line',
    color: colors.green,
    topicID: 'topics_finance',
    topicStory: {
      id: 'ck8u9ls1nwo6g0a87t2si5ygd',
    },
  },
  {
    name: 'Marketing',
    icon: 'hashtag',
    color: colors.twitterBlue,
    topicID: 'topics_marketing',
    topicStory: {
      id: 'ck8u9luezwo7n0a87xy2ud5w6',
    },
  },
  {
    name: 'Health & Wellness',
    icon: 'heartbeat',
    color: colors.red,
    topicID: 'topics_health',
    topicStory: {
      id: 'ck8u9lwb7zbla0a78lj1rcqqv',
    },
  },
  {
    name: 'Content Creators',
    icon: 'thumbs-up',
    color: colors.blue,
    topicID: 'topics_content',
    topicStory: {
      id: 'ck8u9lyjkzbm40a78ltoak8b6',
    },
  },
  {
    name: 'News & Politics',
    icon: 'newspaper',
    color: colors.gray100,
    topicID: 'topics_news',
    topicStory: {
      id: 'ck8u9m1iuwoao0a87tms9z3b6',
    },
  },
  {
    name: 'Sports',
    icon: 'football-ball',
    color: colors.orange,
    topicID: 'topics_sports',
    topicStory: {
      id: 'ck8u9m3cjwobr0a87dq33jq5l',
    },
  },
  {
    name: 'Real Estate',
    icon: 'home',
    color: colors.blue,
    topicID: 'topics_realestate',
    topicStory: {
      id: 'ck8u9m3uxwoc30a87j9zfzjpw',
    },
  },
  {
    name: 'Education',
    icon: 'graduation-cap',
    color: colors.black,
    topicID: 'topics_education',
    topicStory: {
      id: 'ck8u9m4gzwock0a87u4wwt4c6',
    },
  },
  {
    name: 'Industry',
    icon: 'cogs',
    color: colors.purple,
    topicID: 'topics_industry',
    topicStory: {
      id: 'ck8u9m4uizboq0a789fed87gl',
    },
  },
];
