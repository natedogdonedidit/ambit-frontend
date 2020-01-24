import gql from 'graphql-tag';
import { ListPosts } from 'library/queries/_fragments';

// QUERY NAME MUST MATCH TOPICID!!!!!

// TECHNOLOGY
const TOPICS_TECHNOLOGY = gql`
  query TOPICS_TECHNOLOGY($cursor: String) {
    postsTopic(topicID: "topics_technology", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_TECHNOLOGY_SOFTWARE = gql`
  query TOPICS_TECHNOLOGY_SOFTWARE($cursor: String) {
    postsTopic(topicID: "topics_technology_software", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_TECHNOLOGY_HARDWARE = gql`
  query TOPICS_TECHNOLOGY_HARDWARE($cursor: String) {
    postsTopic(topicID: "topics_technology_hardware", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_TECHNOLOGY_SEMICONDUCTORS = gql`
  query TOPICS_TECHNOLOGY_SEMICONDUCTORS($cursor: String) {
    postsTopic(topicID: "topics_technology_semiconductors", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_TECHNOLOGY_CLOUDCOMPUTING = gql`
  query TOPICS_TECHNOLOGY_CLOUDCOMPUTING($cursor: String) {
    postsTopic(topicID: "topics_technology_cloudcomputing", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_TECHNOLOGY_GAMING = gql`
  query TOPICS_TECHNOLOGY_GAMING($cursor: String) {
    postsTopic(topicID: "topics_technology_gaming", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_TECHNOLOGY_VRAR = gql`
  query TOPICS_TECHNOLOGY_VRAR($cursor: String) {
    postsTopic(topicID: "topics_technology_vrar", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_TECHNOLOGY_CRYPTO = gql`
  query TOPICS_TECHNOLOGY_CRYPTO($cursor: String) {
    postsTopic(topicID: "topics_technology_crypto", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_TECHNOLOGY_AI = gql`
  query TOPICS_TECHNOLOGY_AI($cursor: String) {
    postsTopic(topicID: "topics_technology_ai", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_TECHNOLOGY_AUTOMATION = gql`
  query TOPICS_TECHNOLOGY_AUTOMATION($cursor: String) {
    postsTopic(topicID: "topics_technology_automation", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_TECHNOLOGY_ITNETWORKING = gql`
  query TOPICS_TECHNOLOGY_ITNETWORKING($cursor: String) {
    postsTopic(topicID: "topics_technology_itnetworking", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_TECHNOLOGY_AEROSPACEAVIATION = gql`
  query TOPICS_TECHNOLOGY_AEROSPACEAVIATION($cursor: String) {
    postsTopic(topicID: "topics_technology_aerospaceaviation", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_TECHNOLOGY_AUTOMOTIVE = gql`
  query TOPICS_TECHNOLOGY_AUTOMOTIVE($cursor: String) {
    postsTopic(topicID: "topics_technology_automotive", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// SCIENCE
const TOPICS_SCIENCE = gql`
  query TOPICS_SCIENCE($cursor: String) {
    postsTopic(topicID: "topics_science", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_SCIENCE_PHYSICS = gql`
  query TOPICS_SCIENCE_PHYSICS($cursor: String) {
    postsTopic(topicID: "topics_science_physics", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_SCIENCE_BIOTECHNOLOGY = gql`
  query TOPICS_SCIENCE_BIOTECHNOLOGY($cursor: String) {
    postsTopic(topicID: "topics_science_biotechnology", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_SCIENCE_ASTROPHYSICS = gql`
  query TOPICS_SCIENCE_ASTROPHYSICS($cursor: String) {
    postsTopic(topicID: "topics_science_astrophysics", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_SCIENCE_CHEMISTRY = gql`
  query TOPICS_SCIENCE_CHEMISTRY($cursor: String) {
    postsTopic(topicID: "topics_science_chemistry", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_SCIENCE_BIOLOGY = gql`
  query TOPICS_SCIENCE_BIOLOGY($cursor: String) {
    postsTopic(topicID: "topics_science_biology", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_SCIENCE_ANTHROPOLOGY = gql`
  query TOPICS_SCIENCE_ANTHROPOLOGY($cursor: String) {
    postsTopic(topicID: "topics_science_anthropology", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

const TOPICS_SCIENCE_RENEWABLEENERGY = gql`
  query TOPICS_SCIENCE_RENEWABLEENERGY($cursor: String) {
    postsTopic(topicID: "topics_science_renewableenergy", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// CREATIVES
const TOPICS_CREATIVES = gql`
  query TOPICS_CREATIVES($cursor: String) {
    postsTopic(topicID: "topics_creatives", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_CREATIVES_PHOTOGRAPHY = gql`
  query TOPICS_CREATIVES_PHOTOGRAPHY($cursor: String) {
    postsTopic(topicID: "topics_creatives_photography", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_CREATIVES_VIDEOGRAPHY = gql`
  query TOPICS_CREATIVES_VIDEOGRAPHY($cursor: String) {
    postsTopic(topicID: "topics_creatives_videography", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_CREATIVES_UIUX = gql`
  query TOPICS_CREATIVES_UIUX($cursor: String) {
    postsTopic(topicID: "topics_creatives_uiux", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_CREATIVES_GRAPHICDESIGN = gql`
  query TOPICS_CREATIVES_GRAPHICDESIGN($cursor: String) {
    postsTopic(topicID: "topics_creatives_graphicdesign", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_CREATIVES_VISUALART = gql`
  query TOPICS_CREATIVES_VISUALART($cursor: String) {
    postsTopic(topicID: "topics_creatives_visualart", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_CREATIVES_FASHIONAPPAREL = gql`
  query TOPICS_CREATIVES_FASHIONAPPAREL($cursor: String) {
    postsTopic(topicID: "topics_creatives_fashionapparel", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// ENTERTAINMENT
const TOPICS_ENTERTAINMENT = gql`
  query TOPICS_ENTERTAINMENT($cursor: String) {
    postsTopic(topicID: "topics_entertainment", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_ENTERTAINMENT_MUSIC = gql`
  query TOPICS_ENTERTAINMENT_MUSIC($cursor: String) {
    postsTopic(topicID: "topics_entertainment_music", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_ENTERTAINMENT_ACTING = gql`
  query TOPICS_ENTERTAINMENT_ACTING($cursor: String) {
    postsTopic(topicID: "topics_entertainment_acting", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_ENTERTAINMENT_COMEDY = gql`
  query TOPICS_ENTERTAINMENT_COMEDY($cursor: String) {
    postsTopic(topicID: "topics_entertainment_comedy", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_ENTERTAINMENT_MOTIONPICTURE = gql`
  query TOPICS_ENTERTAINMENT_MOTIONPICTURE($cursor: String) {
    postsTopic(topicID: "topics_entertainment_motionpicture", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_ENTERTAINMENT_WRITING = gql`
  query TOPICS_ENTERTAINMENT_WRITING($cursor: String) {
    postsTopic(topicID: "topics_entertainment_writing", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// BUSINESS
const TOPICS_BUSINESS = gql`
  query TOPICS_BUSINESS($cursor: String) {
    postsTopic(topicID: "topics_business", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_BUSINESS_ENTREPRENEURSHIP = gql`
  query TOPICS_BUSINESS_ENTREPRENEURSHIP($cursor: String) {
    postsTopic(topicID: "topics_business_entrepreneurship", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_BUSINESS_SMALLBUSINESS = gql`
  query TOPICS_BUSINESS_SMALLBUSINESS($cursor: String) {
    postsTopic(topicID: "topics_business_smallbusiness", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_BUSINESS_LARGEBUSINESS = gql`
  query TOPICS_BUSINESS_LARGEBUSINESS($cursor: String) {
    postsTopic(topicID: "topics_business_largebusiness", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_BUSINESS_STARTUPS = gql`
  query TOPICS_BUSINESS_STARTUPS($cursor: String) {
    postsTopic(topicID: "topics_business_startups", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_BUSINESS_HR = gql`
  query TOPICS_BUSINESS_HR($cursor: String) {
    postsTopic(topicID: "topics_business_hr", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_BUSINESS_ACCOUNTING = gql`
  query TOPICS_BUSINESS_ACCOUNTING($cursor: String) {
    postsTopic(topicID: "topics_business_accounting", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_BUSINESS_LOGISTICS = gql`
  query TOPICS_BUSINESS_LOGISTICS($cursor: String) {
    postsTopic(topicID: "topics_business_logistics", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_BUSINESS_MANUFACTURING = gql`
  query TOPICS_BUSINESS_MANUFACTURING($cursor: String) {
    postsTopic(topicID: "topics_business_manufacturing", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_BUSINESS_SALES = gql`
  query TOPICS_BUSINESS_SALES($cursor: String) {
    postsTopic(topicID: "topics_business_sales", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_BUSINESS_OPERATIONS = gql`
  query TOPICS_BUSINESS_OPERATIONS($cursor: String) {
    postsTopic(topicID: "topics_business_operations", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_BUSINESS_MANAGEMENT = gql`
  query TOPICS_BUSINESS_MANAGEMENT($cursor: String) {
    postsTopic(topicID: "topics_business_management", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// FINANCE
const TOPICS_FINANCE = gql`
  query TOPICS_FINANCE($cursor: String) {
    postsTopic(topicID: "topics_finance", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_FINANCE_STOCKMARKET = gql`
  query TOPICS_FINANCE_STOCKMARKET($cursor: String) {
    postsTopic(topicID: "topics_finance_stockmarket", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_FINANCE_DAYTRADING = gql`
  query TOPICS_FINANCE_DAYTRADING($cursor: String) {
    postsTopic(topicID: "topics_finance_daytrading", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_FINANCE_WEALTHMANAGEMENT = gql`
  query TOPICS_FINANCE_WEALTHMANAGEMENT($cursor: String) {
    postsTopic(topicID: "topics_finance_wealthmanagement", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_FINANCE_BANKING = gql`
  query TOPICS_FINANCE_BANKING($cursor: String) {
    postsTopic(topicID: "topics_finance_banking", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_FINANCE_INSURANCE = gql`
  query TOPICS_FINANCE_INSURANCE($cursor: String) {
    postsTopic(topicID: "topics_finance_insurance", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// MARKETING
const TOPICS_MARKETING = gql`
  query TOPICS_MARKETING($cursor: String) {
    postsTopic(topicID: "topics_marketing", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_MARKETING_SOCIALMEDIAMARKETING = gql`
  query TOPICS_MARKETING_SOCIALMEDIAMARKETING($cursor: String) {
    postsTopic(topicID: "topics_marketing_socialmediamarketing", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_MARKETING_ADVERTISING = gql`
  query TOPICS_MARKETING_ADVERTISING($cursor: String) {
    postsTopic(topicID: "topics_marketing_advertising", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_MARKETING_BRANDING = gql`
  query TOPICS_MARKETING_BRANDING($cursor: String) {
    postsTopic(topicID: "topics_marketing_branding", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// HEALTH & WELLNESS
const TOPICS_HEALTH = gql`
  query TOPICS_HEALTH($cursor: String) {
    postsTopic(topicID: "topics_health", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_HEALTH_FITNESS = gql`
  query TOPICS_HEALTH_FITNESS($cursor: String) {
    postsTopic(topicID: "topics_health_fitness", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_HEALTH_NUTRITION = gql`
  query TOPICS_HEALTH_NUTRITION($cursor: String) {
    postsTopic(topicID: "topics_health_nutrition", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_HEALTH_MEDICINE = gql`
  query TOPICS_HEALTH_MEDICINE($cursor: String) {
    postsTopic(topicID: "topics_health_medicine", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_HEALTH_PHYSICALTHERAPY = gql`
  query TOPICS_HEALTH_PHYSICALTHERAPY($cursor: String) {
    postsTopic(topicID: "topics_health_physicaltherapy", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// CONTENT CREATORS
const TOPICS_CONTENT = gql`
  query TOPICS_CONTENT($cursor: String) {
    postsTopic(topicID: "topics_content", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_CONTENT_SOCIALMEDIA = gql`
  query TOPICS_CONTENT_SOCIALMEDIA($cursor: String) {
    postsTopic(topicID: "topics_content_socialmedia", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_CONTENT_BLOGGING = gql`
  query TOPICS_CONTENT_BLOGGING($cursor: String) {
    postsTopic(topicID: "topics_content_blogging", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_CONTENT_PODCASTING = gql`
  query TOPICS_CONTENT_PODCASTING($cursor: String) {
    postsTopic(topicID: "topics_content_podcasting", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_CONTENT_YOUTUBE = gql`
  query TOPICS_CONTENT_YOUTUBE($cursor: String) {
    postsTopic(topicID: "topics_content_youtube", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_CONTENT_STREAMING = gql`
  query TOPICS_CONTENT_STREAMING($cursor: String) {
    postsTopic(topicID: "topics_content_streaming", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// NEWS & POLITICS
const TOPICS_NEWS = gql`
  query TOPICS_NEWS($cursor: String) {
    postsTopic(topicID: "topics_news", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_NEWS_POLITICS = gql`
  query TOPICS_NEWS_POLITICS($cursor: String) {
    postsTopic(topicID: "topics_news_politics", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_NEWS_JOURNALISM = gql`
  query TOPICS_NEWS_JOURNALISM($cursor: String) {
    postsTopic(topicID: "topics_news_journalism", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_NEWS_LAWPOLICY = gql`
  query TOPICS_NEWS_LAWPOLICY($cursor: String) {
    postsTopic(topicID: "topics_news_lawpolicy", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// SPORTS
const TOPICS_SPORTS = gql`
  query TOPICS_SPORTS($cursor: String) {
    postsTopic(topicID: "topics_sports", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// REAL ESTATE
const TOPICS_REALESTATE = gql`
  query TOPICS_REALESTATE($cursor: String) {
    postsTopic(topicID: "topics_realestate", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// EDUCATION
const TOPICS_EDUCATION = gql`
  query TOPICS_EDUCATION($cursor: String) {
    postsTopic(topicID: "topics_education", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

// INDUSTRY
const TOPICS_INDUSTRY = gql`
  query TOPICS_INDUSTRY($cursor: String) {
    postsTopic(topicID: "topics_industry", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_INDUSTRY_FOODBEV = gql`
  query TOPICS_INDUSTRY_FOODBEV($cursor: String) {
    postsTopic(topicID: "topics_industry_foodbev", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_INDUSTRY_ECOMMERCERETAIL = gql`
  query TOPICS_INDUSTRY_ECOMMERCERETAIL($cursor: String) {
    postsTopic(topicID: "topics_industry_ecommerceretail", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_INDUSTRY_CONSTRUCTION = gql`
  query TOPICS_INDUSTRY_CONSTRUCTION($cursor: String) {
    postsTopic(topicID: "topics_industry_construction", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_INDUSTRY_NONPROFIT = gql`
  query TOPICS_INDUSTRY_NONPROFIT($cursor: String) {
    postsTopic(topicID: "topics_industry_nonprofit", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;
const TOPICS_INDUSTRY_TRAVELHOSPITALITY = gql`
  query TOPICS_INDUSTRY_TRAVELHOSPITALITY($cursor: String) {
    postsTopic(topicID: "topics_industry_travelhospitality", after: $cursor) {
      edges {
        node {
          ...ListPosts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ListPosts}
`;

export default {
  // technology
  TOPICS_TECHNOLOGY,
  TOPICS_TECHNOLOGY_SOFTWARE,
  TOPICS_TECHNOLOGY_HARDWARE,
  TOPICS_TECHNOLOGY_SEMICONDUCTORS,
  TOPICS_TECHNOLOGY_CLOUDCOMPUTING,
  TOPICS_TECHNOLOGY_GAMING,
  TOPICS_TECHNOLOGY_VRAR,
  TOPICS_TECHNOLOGY_CRYPTO,
  TOPICS_TECHNOLOGY_AI,
  TOPICS_TECHNOLOGY_AUTOMATION,
  TOPICS_TECHNOLOGY_ITNETWORKING,
  TOPICS_TECHNOLOGY_AEROSPACEAVIATION,
  TOPICS_TECHNOLOGY_AUTOMOTIVE,
  // science
  TOPICS_SCIENCE,
  TOPICS_SCIENCE_PHYSICS,
  TOPICS_SCIENCE_BIOTECHNOLOGY,
  TOPICS_SCIENCE_ASTROPHYSICS,
  TOPICS_SCIENCE_CHEMISTRY,
  TOPICS_SCIENCE_BIOLOGY,
  TOPICS_SCIENCE_ANTHROPOLOGY,
  TOPICS_SCIENCE_RENEWABLEENERGY,
  // creatives
  TOPICS_CREATIVES,
  TOPICS_CREATIVES_PHOTOGRAPHY,
  TOPICS_CREATIVES_VIDEOGRAPHY,
  TOPICS_CREATIVES_UIUX,
  TOPICS_CREATIVES_GRAPHICDESIGN,
  TOPICS_CREATIVES_VISUALART,
  TOPICS_CREATIVES_FASHIONAPPAREL,
  // entertainment
  TOPICS_ENTERTAINMENT,
  TOPICS_ENTERTAINMENT_MUSIC,
  TOPICS_ENTERTAINMENT_ACTING,
  TOPICS_ENTERTAINMENT_COMEDY,
  TOPICS_ENTERTAINMENT_MOTIONPICTURE,
  TOPICS_ENTERTAINMENT_WRITING,
  // business
  TOPICS_BUSINESS,
  TOPICS_BUSINESS_ENTREPRENEURSHIP,
  TOPICS_BUSINESS_SMALLBUSINESS,
  TOPICS_BUSINESS_LARGEBUSINESS,
  TOPICS_BUSINESS_STARTUPS,
  TOPICS_BUSINESS_HR,
  TOPICS_BUSINESS_ACCOUNTING,
  TOPICS_BUSINESS_LOGISTICS,
  TOPICS_BUSINESS_MANUFACTURING,
  TOPICS_BUSINESS_SALES,
  TOPICS_BUSINESS_OPERATIONS,
  TOPICS_BUSINESS_MANAGEMENT,
  // finance
  TOPICS_FINANCE,
  TOPICS_FINANCE_STOCKMARKET,
  TOPICS_FINANCE_DAYTRADING,
  TOPICS_FINANCE_WEALTHMANAGEMENT,
  TOPICS_FINANCE_BANKING,
  TOPICS_FINANCE_INSURANCE,
  // marketing
  TOPICS_MARKETING,
  TOPICS_MARKETING_SOCIALMEDIAMARKETING,
  TOPICS_MARKETING_ADVERTISING,
  TOPICS_MARKETING_BRANDING,
  // health & wellness
  TOPICS_HEALTH,
  TOPICS_HEALTH_FITNESS,
  TOPICS_HEALTH_NUTRITION,
  TOPICS_HEALTH_MEDICINE,
  TOPICS_HEALTH_PHYSICALTHERAPY,
  // content creators
  TOPICS_CONTENT,
  TOPICS_CONTENT_SOCIALMEDIA,
  TOPICS_CONTENT_BLOGGING,
  TOPICS_CONTENT_PODCASTING,
  TOPICS_CONTENT_YOUTUBE,
  TOPICS_CONTENT_STREAMING,
  // news & politics
  TOPICS_NEWS,
  TOPICS_NEWS_POLITICS,
  TOPICS_NEWS_JOURNALISM,
  TOPICS_NEWS_LAWPOLICY,
  // sports
  TOPICS_SPORTS,
  // real estate
  TOPICS_REALESTATE,
  // education
  TOPICS_EDUCATION,
  // industry
  TOPICS_INDUSTRY,
  TOPICS_INDUSTRY_FOODBEV,
  TOPICS_INDUSTRY_ECOMMERCERETAIL,
  TOPICS_INDUSTRY_CONSTRUCTION,
  TOPICS_INDUSTRY_NONPROFIT,
  TOPICS_INDUSTRY_TRAVELHOSPITALITY,
};
