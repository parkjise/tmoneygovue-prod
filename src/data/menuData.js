export const sidebarLinks = [
  {
    title: 'Tmoney 가이드',
    href: 'https://parkjise.github.io/tmoneygopublish-spa-pub/#/tmoney/Spa/DET/DET003.vue'
  }
];

export const menuGroups = [
  {
    title: 'BEM Generator',
    icon: 'CodeXml',
    direct: true,
    children: [
      {
        path: '/tools/bem-generator',
        title: 'BEM Generator',
        description: 'Gemini / OpenAI API · HTML 마크업 클래스 변환',
        folder: 'tools',
        slug: 'bem-generator',
        badge: 'AI API'
      }
    ]
  },
  {
    title: 'Vue.js 기본 문법',
    icon: 'CodeXml',
    children: [
      {
        path: '/vue-syntax/conditional',
        title: '조건부 렌더링',
        description: 'v-if · v-show',
        folder: 'vue-syntax',
        slug: 'conditional'
      },
      {
        path: '/vue-syntax/lists',
        title: '리스트 렌더링',
        description: 'v-for · :key',
        folder: 'vue-syntax',
        slug: 'lists'
      },
      {
        path: '/vue-syntax/binding',
        title: '데이터 바인딩',
        description: 'v-bind · v-model',
        folder: 'vue-syntax',
        slug: 'binding'
      },
      {
        path: '/vue-syntax/events',
        title: '이벤트 핸들링',
        description: 'v-on · modifiers',
        folder: 'vue-syntax',
        slug: 'events'
      },
      {
        path: '/vue-syntax/reactivity',
        title: '반응형 핵심',
        description: 'ref · computed · watch',
        folder: 'vue-syntax',
        slug: 'reactivity'
      },
      {
        path: '/vue-syntax/communication',
        title: '컴포넌트 통신',
        description: 'Props · Emits · Slots',
        folder: 'vue-syntax',
        slug: 'communication'
      }
    ]
  },
  {
    title: 'Vue.js 실무 패턴',
    icon: 'Workflow',
    children: [
      {
        path: '/vue-patterns/async',
        title: '비동기 API 통신',
        description: 'Loading · Error · Retry',
        folder: 'vue-patterns',
        slug: 'async'
      },
      {
        path: '/vue-patterns/debounce',
        title: '실시간 검색 & 디바운스',
        description: 'watch · cleanup',
        folder: 'vue-patterns',
        slug: 'debounce'
      },
      {
        path: '/vue-patterns/composables',
        title: '커스텀 Composable',
        description: 'useModal · useToast · useConfirm',
        folder: 'vue-patterns',
        slug: 'composables'
      },
      {
        path: '/vue-patterns/dynamic-form',
        title: '동적 폼 & 유효성 검사',
        description: '배열 폼 · validation',
        folder: 'vue-patterns',
        slug: 'dynamic-form'
      },
      {
        path: '/vue-patterns/infinite',
        title: '무한 스크롤',
        description: 'IntersectionObserver',
        folder: 'vue-patterns',
        slug: 'infinite'
      },
      {
        path: '/vue-patterns/selection',
        title: '전체 선택 & 일괄 처리',
        description: 'computed getter / setter',
        folder: 'vue-patterns',
        slug: 'selection'
      }
    ]
  },
  {
    title: 'SCSS 실무 가이드',
    icon: 'Palette',
    children: [
      {
        path: '/scss/mixins-source',
        title: '공통 Mixin 소스',
        description: '@/assets/styles/mixins · _mixins.scss',
        folder: 'scss',
        slug: 'mixins-source',
        sourceFile: '/src/assets/styles/_mixins.scss'
      },
      {
        path: '/scss/practice-source',
        title: 'Practice 모듈 소스',
        description: '@/assets/styles/practice · 토큰 / 함수 / 믹스인',
        folder: 'scss',
        slug: 'practice-source',
        sourceFile: '/src/assets/styles/practice/_index.scss'
      },
      {
        path: '/scss/practice-tokens',
        title: 'Tokens 소스',
        description: "@forward 'tokens' · _tokens.scss",
        folder: 'scss',
        slug: 'practice-tokens',
        sourceFile: '/src/assets/styles/practice/_tokens.scss'
      },
      {
        path: '/scss/practice-functions',
        title: 'Functions 소스',
        description: "@forward 'functions' · _functions.scss",
        folder: 'scss',
        slug: 'practice-functions',
        sourceFile: '/src/assets/styles/practice/_functions.scss'
      },
      {
        path: '/scss/practice-mixins',
        title: 'Practice Mixins 소스',
        description: "@forward 'mixins' · _mixins.scss",
        folder: 'scss',
        slug: 'practice-mixins',
        sourceFile: '/src/assets/styles/practice/_mixins.scss'
      },
      {
        path: '/scss/tokens',
        title: '변수 & 디자인 토큰',
        description: '$변수 · CSS Custom Properties',
        folder: 'scss',
        slug: 'tokens'
      },
      {
        path: '/scss/mixins',
        title: 'Mixin 실무 패턴',
        description: '@mixin · @include · @content',
        folder: 'scss',
        slug: 'mixins'
      },
      {
        path: '/scss/responsive',
        title: '반응형 & 브레이크포인트',
        description: 'Media Query · Container Query',
        folder: 'scss',
        slug: 'responsive'
      },
      {
        path: '/scss/typography',
        title: '타이포그래피 & 말줄임',
        description: 'rem() · clamp() · line-clamp',
        folder: 'scss',
        slug: 'typography'
      },
      {
        path: '/scss/layout',
        title: 'Flex & Grid 레이아웃',
        description: 'auto-fit · minmax · 간격',
        folder: 'scss',
        slug: 'layout'
      },
      {
        path: '/scss/states',
        title: '상태 & 인터랙션',
        description: 'BEM · focus-visible · reduced-motion',
        folder: 'scss',
        slug: 'states'
      },
      {
        path: '/scss/loops',
        title: 'Map & 반복문',
        description: '@each · @for · 클래스 생성',
        folder: 'scss',
        slug: 'loops'
      },
      {
        path: '/scss/modules',
        title: '모듈 & 함수 설계',
        description: '@use · @forward · @function',
        folder: 'scss',
        slug: 'modules'
      }
    ]
  },
  {
    title: 'General',
    icon: 'LayoutDashboard',
    children: [
      {
        path: '/dashboard/default',
        title: 'Overview',
        description: 'AI 에이전트 & CRM',
        folder: 'dashboard',
        slug: 'default'
      },
      {
        path: '/dashboard/ecommerce',
        title: 'E-Commerce',
        description: '매출 대시보드',
        folder: 'dashboard',
        slug: 'ecommerce'
      },
      {
        path: '/dashboard/analytics',
        title: 'Analytics',
        description: '방문 · 전환 분석',
        folder: 'dashboard',
        slug: 'analytics'
      },
      {
        path: '/dashboard/widgets',
        title: 'General Widgets',
        description: 'KPI 통계 카드',
        folder: 'dashboard',
        slug: 'widgets'
      },
      {
        path: '/dashboard/charts',
        title: 'Chart Widgets',
        description: 'Vue SVG 차트',
        folder: 'dashboard',
        slug: 'charts'
      }
    ]
  },
  {
    title: 'Applications',
    icon: 'Layers',
    children: [
      {
        path: '/tools/ai-assistant',
        title: 'AI Q&A',
        description: 'Gemini / OpenAI · 질문과 후속 대화',
        folder: 'tools',
        slug: 'ai-assistant',
        badge: 'AI Chat',
        pageDescription: '궁금한 것을 질문하고, 개인 Gemini / OpenAI API로 대화를 이어가세요.'
      },
      {
        path: '/apps/bookmark',
        title: 'Bookmark',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'bookmark'
      },
      {
        path: '/apps/kanban',
        title: 'Kanban Board',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'kanban'
      },
      {
        path: '/apps/files',
        title: 'File Manager',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'files'
      },
      {
        path: '/apps/projects',
        title: 'Project List',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'projects'
      },
      {
        path: '/apps/new-project',
        title: 'Create New Project',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'new-project'
      },
      {
        path: '/apps/products',
        title: 'Product List',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'products'
      },
      {
        path: '/apps/product-detail',
        title: 'Product Detail',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'product-detail'
      },
      {
        path: '/apps/cart',
        title: 'Cart',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'cart'
      },
      {
        path: '/apps/checkout',
        title: 'Checkout',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'checkout'
      },
      {
        path: '/apps/invoice',
        title: 'Invoice',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'invoice'
      },
      {
        path: '/apps/email',
        title: 'Email',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'email'
      },
      {
        path: '/apps/chat',
        title: 'AI Chat',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'chat'
      },
      {
        path: '/apps/users',
        title: 'Users',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'users'
      },
      {
        path: '/apps/contacts',
        title: 'Contacts',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'contacts'
      },
      {
        path: '/apps/tasks',
        title: 'Tasks',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'tasks'
      },
      {
        path: '/apps/calendar',
        title: 'Calendar',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'calendar'
      },
      {
        path: '/apps/todo',
        title: 'To-Do',
        description: '실제로 동작하는 미니 앱',
        folder: 'apps',
        slug: 'todo'
      }
    ]
  },
  {
    title: 'UI Kits & Bonus UI',
    icon: 'Component',
    children: [
      {
        path: '/ui-kits/typography',
        title: 'Typography',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'typography'
      },
      {
        path: '/ui-kits/avatars',
        title: 'Avatars',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'avatars'
      },
      {
        path: '/ui-kits/helpers',
        title: 'Helpers',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'helpers'
      },
      {
        path: '/ui-kits/grid',
        title: 'Grid',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'grid'
      },
      {
        path: '/ui-kits/tags',
        title: 'Tag & Pills',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'tags'
      },
      {
        path: '/ui-kits/progress',
        title: 'Progress',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'progress'
      },
      {
        path: '/ui-kits/modal',
        title: 'Modal',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'modal'
      },
      {
        path: '/ui-kits/alert',
        title: 'Alert',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'alert'
      },
      {
        path: '/ui-kits/popover',
        title: 'Popover',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'popover'
      },
      {
        path: '/ui-kits/tooltip',
        title: 'Tooltip',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'tooltip'
      },
      {
        path: '/ui-kits/dropdown',
        title: 'Dropdown',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'dropdown'
      },
      {
        path: '/ui-kits/accordion',
        title: 'Accordion',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'accordion'
      },
      {
        path: '/ui-kits/tabs',
        title: 'Tabs',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'tabs'
      },
      {
        path: '/ui-kits/lists',
        title: 'Lists',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'lists'
      },
      {
        path: '/ui-kits/tree',
        title: 'Tree View',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'tree'
      },
      {
        path: '/ui-kits/rating',
        title: 'Rating',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'rating'
      },
      {
        path: '/ui-kits/dropzone',
        title: 'Dropzone',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'dropzone'
      },
      {
        path: '/ui-kits/sweetalert',
        title: 'SweetAlert',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'sweetalert'
      },
      {
        path: '/ui-kits/carousel',
        title: 'Carousel',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'carousel'
      },
      {
        path: '/ui-kits/ribbon',
        title: 'Ribbon',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'ribbon'
      },
      {
        path: '/ui-kits/pagination',
        title: 'Pagination',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'pagination'
      },
      {
        path: '/ui-kits/breadcrumb',
        title: 'Breadcrumb',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'breadcrumb'
      },
      {
        path: '/ui-kits/icons',
        title: 'Icons',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'icons'
      },
      {
        path: '/ui-kits/buttons',
        title: 'Buttons',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'buttons'
      },
      {
        path: '/ui-kits/charts',
        title: 'Charts',
        description: '재사용 가능한 Vue 컴포넌트',
        folder: 'ui-kits',
        slug: 'charts'
      }
    ]
  },
  {
    title: 'Forms & Tables',
    icon: 'Table2',
    children: [
      {
        path: '/forms-tables/controls',
        title: 'Form Controls',
        description: '실무 데이터 처리',
        folder: 'forms-tables',
        slug: 'controls'
      },
      {
        path: '/forms-tables/validation',
        title: 'Form Validation',
        description: '실무 데이터 처리',
        folder: 'forms-tables',
        slug: 'validation'
      },
      {
        path: '/forms-tables/wizard',
        title: 'Form Wizard',
        description: '실무 데이터 처리',
        folder: 'forms-tables',
        slug: 'wizard'
      },
      {
        path: '/forms-tables/basic',
        title: 'Basic Tables',
        description: '실무 데이터 처리',
        folder: 'forms-tables',
        slug: 'basic'
      },
      {
        path: '/forms-tables/data',
        title: 'Data Tables',
        description: '실무 데이터 처리',
        folder: 'forms-tables',
        slug: 'data'
      }
    ]
  }
];
export const menuItems = menuGroups.flatMap((group) => group.children);
