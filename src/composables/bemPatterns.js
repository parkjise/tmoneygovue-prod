// API 없이 브라우저에서 생성하는 BEM 패턴. HTML은 실행하지 않고 코드로만 표시합니다.
const node = (tag, element, content = '', attrs = {}) => ({ tag, element, content, attrs });
const title = (text) => node('h2', 'title', text);
const text = (value) => node('p', 'description', value);
const button = (label, modifier = '') =>
  node('button', 'button' + modifier, label, { type: 'button' });
const link = (label) => node('a', 'link', label, { href: '#content' });
const input = (type = 'text') => node('input', 'input', '', { type, 'aria-label': '입력값' });
const item = (value) => node('li', 'item', value);
const list = (...values) => node('ul', 'list', values.map(item));
const image = () => node('img', 'image', '', { src: '/images/example.jpg', alt: '예시 이미지' });
const pattern = (id, label, category, tag, children, description) => ({
  id,
  label,
  category,
  description,
  tree: node(tag, '', children)
});
export const bemPatterns = [
  pattern(
    'card',
    '카드',
    '콘텐츠',
    'article',
    [
      image(),
      node('div', 'body', [
        title('카드 제목'),
        text('카드의 주요 내용을 설명합니다.'),
        button('자세히 보기')
      ])
    ],
    '이미지와 본문, 액션으로 구성된 카드'
  ),
  pattern(
    'feature',
    '기능 소개',
    '콘텐츠',
    'section',
    [
      node('span', 'icon', '✦', { 'aria-hidden': 'true' }),
      title('핵심 기능'),
      text('이 기능으로 해결할 수 있는 문제를 소개합니다.'),
      link('기능 살펴보기')
    ],
    '서비스의 특징과 이점 소개'
  ),
  pattern(
    'hero',
    '히어로',
    '레이아웃',
    'section',
    [
      node('div', 'content', [
        node('p', 'eyebrow', '새로운 시작'),
        title('서비스의 핵심 메시지'),
        text('사용자를 위한 가치를 전달합니다.'),
        button('시작하기', '--primary')
      ]),
      image()
    ],
    '페이지 첫 화면의 주요 메시지'
  ),
  pattern(
    'header',
    '헤더',
    '레이아웃',
    'header',
    [
      node('a', 'logo', '브랜드', { href: '/' }),
      node('nav', 'nav', [link('서비스'), link('소개')], { 'aria-label': '주 메뉴' }),
      button('로그인')
    ],
    '브랜드와 주 내비게이션'
  ),
  pattern(
    'footer',
    '푸터',
    '레이아웃',
    'footer',
    [
      node('strong', 'brand', '브랜드'),
      node('nav', 'nav', [link('이용약관'), link('개인정보처리방침')], {
        'aria-label': '정책 메뉴'
      }),
      node('small', 'copyright', '© 브랜드. All rights reserved.')
    ],
    '정책 링크와 저작권 정보'
  ),
  pattern(
    'sidebar',
    '사이드바',
    '레이아웃',
    'aside',
    [
      title('워크스페이스'),
      node('nav', 'nav', [list('대시보드', '프로젝트', '설정')], { 'aria-label': '사이드 메뉴' })
    ],
    '보조 메뉴와 작업 영역'
  ),
  pattern(
    'container',
    '컨테이너',
    '레이아웃',
    'div',
    [
      node('header', 'header', [title('영역 제목')]),
      node('div', 'content', [text('본문 콘텐츠')]),
      node('footer', 'footer', [button('확인')])
    ],
    '최대 너비와 여백을 관리하는 영역'
  ),
  pattern(
    'section',
    '섹션',
    '레이아웃',
    'section',
    [
      node('header', 'header', [title('섹션 제목'), text('섹션 설명')]),
      node('div', 'body', [text('섹션 콘텐츠')])
    ],
    '제목과 본문을 갖는 구획'
  ),
  pattern(
    'grid',
    '그리드',
    '레이아웃',
    'section',
    [
      title('콘텐츠 모음'),
      node('div', 'items', [
        node('article', 'item', [text('첫 번째 콘텐츠')]),
        node('article', 'item', [text('두 번째 콘텐츠')])
      ])
    ],
    '반복 콘텐츠의 격자 배치'
  ),
  pattern(
    'split-layout',
    '분할 레이아웃',
    '레이아웃',
    'div',
    [
      node('section', 'main', [title('주 콘텐츠'), text('본문 영역')]),
      node('aside', 'aside', [text('보조 정보')])
    ],
    '본문과 보조 영역의 분할'
  ),
  pattern(
    'nav',
    '내비게이션',
    '탐색',
    'nav',
    [
      node('ul', 'list', [
        node('li', 'item', [
          node('a', 'link--active', '홈', { href: '/', 'aria-current': 'page' })
        ]),
        node('li', 'item', [link('서비스')])
      ])
    ],
    '현재 위치가 표시되는 메뉴'
  ),
  pattern(
    'breadcrumb',
    '브레드크럼',
    '탐색',
    'nav',
    [
      node('ol', 'list', [
        node('li', 'item', [link('홈')]),
        node('li', 'item', '현재 페이지', { 'aria-current': 'page' })
      ])
    ],
    '페이지 계층과 현재 위치'
  ),
  pattern(
    'pagination',
    '페이지 이동',
    '탐색',
    'nav',
    [
      button('이전'),
      node('a', 'page--current', '1', { href: '?page=1', 'aria-current': 'page' }),
      node('a', 'page', '2', { href: '?page=2' }),
      button('다음')
    ],
    '여러 페이지로 나눈 목록 탐색'
  ),
  pattern(
    'tabs',
    '탭 링크',
    '탐색',
    'nav',
    [
      node('a', 'tab--active', '개요', { href: '#overview', 'aria-current': 'location' }),
      node('a', 'tab', '상세', { href: '#details' })
    ],
    '문서 내 영역으로 이동하는 탭 형태 링크'
  ),
  pattern(
    'toolbar',
    '툴바',
    '탐색',
    'div',
    [
      node('div', 'start', [button('추가'), button('수정')]),
      node('div', 'end', [button('내보내기')])
    ],
    '관련 액션을 묶는 도구 모음'
  ),
  pattern(
    'search',
    '검색',
    '폼',
    'form',
    [
      node('label', 'label', ['검색어', input('search')]),
      node('button', 'submit', '검색', { type: 'submit' })
    ],
    '검색어 입력과 제출'
  ),
  pattern(
    'form',
    '입력 폼',
    '폼',
    'form',
    [
      title('문의하기'),
      node('label', 'field', ['이름', input()]),
      node('label', 'field', ['이메일', input('email')]),
      node('button', 'submit', '보내기', { type: 'submit' })
    ],
    '레이블이 연결된 기본 입력 폼'
  ),
  pattern(
    'form-field',
    '입력 필드',
    '폼',
    'div',
    [node('label', 'label', ['이름', input()]), node('p', 'help', '실명을 입력해 주세요.')],
    '입력과 도움말을 묶는 필드'
  ),
  pattern(
    'select-field',
    '선택 필드',
    '폼',
    'div',
    [
      node('label', 'label', [
        '분류',
        node('select', 'select', [
          node('option', 'option', '일반', { value: 'general' }),
          node('option', 'option', '문의', { value: 'question' })
        ])
      ])
    ],
    '옵션을 고르는 셀렉트'
  ),
  pattern(
    'checkbox',
    '체크박스',
    '폼',
    'label',
    [input('checkbox'), node('span', 'label', '알림 수신에 동의합니다.')],
    '여러 항목을 선택하는 입력'
  ),
  pattern(
    'radio-group',
    '라디오 그룹',
    '폼',
    'fieldset',
    [
      node('legend', 'legend', '배송 방법'),
      node('label', 'option', [
        node('input', 'input', '', { type: 'radio', name: 'delivery', value: 'normal' }),
        '일반 배송'
      ]),
      node('label', 'option', [
        node('input', 'input', '', { type: 'radio', name: 'delivery', value: 'express' }),
        '빠른 배송'
      ])
    ],
    '하나의 옵션만 선택하는 그룹'
  ),
  pattern(
    'textarea-field',
    '긴 글 입력',
    '폼',
    'div',
    [
      node('label', 'label', [
        '내용',
        node('textarea', 'textarea', '', { rows: '5', placeholder: '문의 내용을 입력해 주세요.' })
      ]),
      text('최대 1,000자까지 작성할 수 있습니다.')
    ],
    '긴 텍스트를 입력하는 필드'
  ),
  pattern(
    'file-upload',
    '파일 업로드',
    '폼',
    'div',
    [node('label', 'label', ['첨부 파일', input('file')]), text('업로드할 파일을 선택하세요.')],
    '파일 선택 입력 영역'
  ),
  pattern(
    'login-form',
    '로그인 폼',
    '폼',
    'form',
    [
      title('로그인'),
      node('label', 'field', ['이메일', input('email')]),
      node('label', 'field', ['비밀번호', input('password')]),
      node('button', 'submit', '로그인', { type: 'submit' }),
      link('비밀번호 찾기')
    ],
    '계정 인증 입력 구조'
  ),
  pattern(
    'button-group',
    '버튼 그룹',
    '폼',
    'div',
    [button('취소', '--secondary'), button('저장', '--primary')],
    '우선순위가 다른 액션 버튼'
  ),
  pattern(
    'article',
    '아티클',
    '콘텐츠',
    'article',
    [
      node('header', 'header', [
        title('아티클 제목'),
        node('time', 'date', '2026년 11월 14일', { datetime: '2026-11-14' })
      ]),
      node('div', 'body', [text('아티클 본문입니다.')]),
      node('footer', 'footer', [text('작성자: 편집팀')])
    ],
    '제목과 메타 정보를 갖는 글'
  ),
  pattern(
    'media',
    '미디어 객체',
    '콘텐츠',
    'article',
    [image(), node('div', 'body', [title('미디어 제목'), text('이미지 옆에 배치하는 본문')])],
    '썸네일과 본문 조합'
  ),
  pattern(
    'profile',
    '프로필',
    '콘텐츠',
    'article',
    [
      image(),
      title('사용자 이름'),
      node('p', 'role', '프론트엔드 개발자'),
      text('사용자 소개'),
      button('프로필 보기')
    ],
    '사용자 소개 카드'
  ),
  pattern(
    'avatar',
    '아바타',
    '콘텐츠',
    'span',
    [node('span', 'initials', 'JS'), node('span', 'status--online', '온라인')],
    '사용자 이니셜과 접속 상태'
  ),
  pattern(
    'badge',
    '뱃지',
    '콘텐츠',
    'span',
    [node('span', 'label', '새 소식'), node('span', 'count', '3')],
    '짧은 상태나 개수 표시'
  ),
  pattern(
    'tag',
    '태그',
    '콘텐츠',
    'span',
    [node('span', 'label', 'Vue'), button('태그 삭제')],
    '키워드와 제거 버튼'
  ),
  pattern(
    'stat',
    '통계 카드',
    '데이터',
    'article',
    [
      title('이번 달 매출'),
      node('p', 'value', '1,250,000원'),
      node('span', 'trend--up', '지난달 대비 12% 증가')
    ],
    '지표와 변화 추이'
  ),
  pattern(
    'data-table',
    '데이터 테이블',
    '데이터',
    'table',
    [
      node('caption', 'caption', '주문 목록'),
      node('thead', 'head', [
        node('tr', 'row', [
          node('th', 'heading', '주문명', { scope: 'col' }),
          node('th', 'heading', '상태', { scope: 'col' })
        ])
      ]),
      node('tbody', 'body', [
        node('tr', 'row', [node('td', 'cell', '노트북'), node('td', 'cell', '배송 중')])
      ])
    ],
    '헤더와 본문이 있는 표'
  ),
  pattern(
    'description-list',
    '정보 목록',
    '데이터',
    'dl',
    [
      node('div', 'item', [node('dt', 'term', '주문번호'), node('dd', 'value', 'ORDER-001')]),
      node('div', 'item', [node('dt', 'term', '배송 상태'), node('dd', 'value', '준비 중')])
    ],
    '항목 이름과 값의 대응 목록'
  ),
  pattern(
    'timeline',
    '타임라인',
    '데이터',
    'ol',
    [
      node('li', 'item', [
        node('time', 'time', '09:00'),
        title('주문 접수'),
        text('주문이 접수되었습니다.')
      ]),
      node('li', 'item', [node('time', 'time', '10:00'), title('준비 중')])
    ],
    '시간순 이벤트 흐름'
  ),
  pattern(
    'stepper',
    '진행 단계',
    '데이터',
    'ol',
    [
      node('li', 'step--complete', '1. 정보 입력'),
      node('li', 'step--current', '2. 내용 확인', { 'aria-current': 'step' }),
      node('li', 'step', '3. 완료')
    ],
    '여러 단계의 현재 진행 위치'
  ),
  pattern(
    'progress',
    '진행률',
    '데이터',
    'div',
    [
      node('label', 'label', [
        '업로드 진행률',
        node('progress', 'bar', '60%', { value: '60', max: '100' })
      ]),
      node('span', 'value', '60%')
    ],
    '완료 비율을 표시하는 진행 막대'
  ),
  pattern(
    'product-card',
    '상품 카드',
    '커머스',
    'article',
    [
      image(),
      node('div', 'body', [
        title('상품 이름'),
        text('상품의 주요 특징'),
        node('strong', 'price', '29,000원'),
        button('장바구니 담기')
      ])
    ],
    '상품 이미지와 가격, 구매 액션'
  ),
  pattern(
    'pricing',
    '요금제',
    '커머스',
    'article',
    [
      title('프로 요금제'),
      node('p', 'price', '월 19,000원'),
      list('프로젝트 10개', '팀원 5명', '우선 지원'),
      button('선택하기', '--primary')
    ],
    '요금과 제공 기능 비교 카드'
  ),
  pattern(
    'cart-item',
    '장바구니 항목',
    '커머스',
    'article',
    [
      image(),
      node('div', 'body', [
        title('상품 이름'),
        node('label', 'quantity', [
          '수량',
          node('input', 'input', '', { type: 'number', min: '1', value: '1' })
        ]),
        node('strong', 'price', '29,000원')
      ]),
      button('삭제')
    ],
    '상품 수량과 금액 표시'
  ),
  pattern(
    'order-summary',
    '주문 요약',
    '커머스',
    'section',
    [
      title('주문 요약'),
      node('dl', 'list', [
        node('dt', 'term', '상품 금액'),
        node('dd', 'value', '29,000원'),
        node('dt', 'term', '배송비'),
        node('dd', 'value', '3,000원')
      ]),
      node('strong', 'total', '총 32,000원'),
      button('주문하기')
    ],
    '결제 전 금액 합계'
  ),
  pattern(
    'review',
    '리뷰',
    '커머스',
    'article',
    [
      node('header', 'header', [
        node('strong', 'author', '구매자'),
        node('span', 'rating', '별점 5점 중 4점')
      ]),
      text('사용하기 편리하고 만족스럽습니다.'),
      button('도움이 돼요')
    ],
    '작성자와 평점을 갖는 후기'
  ),
  pattern(
    'alert',
    '알림 배너',
    '피드백',
    'aside',
    [node('strong', 'title', '안내'), text('변경된 내용을 확인해 주세요.'), button('닫기')],
    '중요한 안내 메시지'
  ),
  pattern(
    'toast',
    '토스트',
    '피드백',
    'div',
    [node('p', 'message', '저장되었습니다.'), button('닫기')],
    '일시적으로 표시하는 처리 결과'
  ),
  pattern(
    'modal',
    '모달',
    '피드백',
    'dialog',
    [
      node('header', 'header', [title('변경사항 확인'), button('닫기')]),
      node('div', 'body', [text('변경사항을 저장하시겠습니까?')]),
      node('footer', 'footer', [button('취소'), button('저장', '--primary')])
    ],
    '별도 창으로 표시하는 확인 영역'
  ),
  pattern(
    'accordion',
    '아코디언',
    '피드백',
    'details',
    [
      node('summary', 'trigger', '자세한 내용 보기'),
      node('div', 'content', [text('펼쳐진 상세 내용입니다.')])
    ],
    '네이티브 details로 여닫는 콘텐츠'
  ),
  pattern(
    'empty-state',
    '빈 상태',
    '피드백',
    'section',
    [
      node('span', 'icon', '◇', { 'aria-hidden': 'true' }),
      title('아직 항목이 없습니다.'),
      text('첫 번째 항목을 추가해 보세요.'),
      button('항목 추가')
    ],
    '데이터가 없을 때의 안내'
  ),
  pattern(
    'error-state',
    '오류 상태',
    '피드백',
    'section',
    [
      title('불러오지 못했습니다.'),
      text('연결을 확인하고 다시 시도해 주세요.'),
      button('다시 시도')
    ],
    '실패 안내와 재시도 액션'
  ),
  pattern(
    'faq',
    '자주 묻는 질문',
    '콘텐츠',
    'section',
    [
      title('자주 묻는 질문'),
      node('details', 'item', [
        node('summary', 'question', '어떻게 시작하나요?'),
        node('p', 'answer', '회원가입 후 프로젝트를 생성하세요.')
      ]),
      node('details', 'item', [
        node('summary', 'question', '요금은 어디서 확인하나요?'),
        node('p', 'answer', '요금제 페이지에서 확인할 수 있습니다.')
      ])
    ],
    '질문과 펼쳐지는 답변'
  ),
  pattern(
    'testimonial',
    '고객 추천사',
    '콘텐츠',
    'figure',
    [
      node('blockquote', 'quote', [text('팀의 작업 속도가 훨씬 빨라졌습니다.')]),
      node('figcaption', 'author', '김개발 · 프론트엔드 개발자')
    ],
    '인용문과 출처'
  ),
  pattern(
    'banner',
    '프로모션 배너',
    '콘텐츠',
    'aside',
    [
      title('새로운 기능을 만나보세요'),
      text('더 편리해진 서비스를 확인하세요.'),
      link('업데이트 보기'),
      button('닫기')
    ],
    '이벤트와 업데이트 홍보'
  ),
  pattern(
    'comment',
    '댓글',
    '콘텐츠',
    'article',
    [
      node('header', 'header', [
        node('strong', 'author', '작성자'),
        node('time', 'time', '방금 전')
      ]),
      text('좋은 정보 감사합니다.'),
      node('footer', 'actions', [button('답글'), button('좋아요')])
    ],
    '작성자와 본문, 댓글 액션'
  ),
  pattern(
    'chat-message',
    '채팅 메시지',
    '콘텐츠',
    'article',
    [
      node('strong', 'sender', '상담원'),
      node('p', 'bubble--incoming', '안녕하세요. 무엇을 도와드릴까요?'),
      node('time', 'time', '오전 10:30')
    ],
    '발신자와 말풍선 구조'
  ),
  pattern(
    'notification',
    '알림 항목',
    '콘텐츠',
    'article',
    [
      node('span', 'indicator--unread', '읽지 않음'),
      title('새 댓글이 도착했습니다.'),
      text('프로젝트에 새 댓글이 등록되었습니다.'),
      node('time', 'time', '5분 전'),
      button('확인')
    ],
    '읽음 상태를 갖는 알림 항목'
  )
];
export const bemPatternCategories = [...new Set(bemPatterns.map((p) => p.category))];
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
  );
const voidTags = new Set(['input', 'img', 'br', 'hr']);
export function createBemPattern(id, customName = '') {
  const preset = bemPatterns.find((p) => p.id === id);
  if (!preset) throw new Error('패턴을 선택해 주세요.');
  const block = customName.trim() || preset.id;
  if (block.length > 50 || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(block))
    throw new Error(
      '블록 이름은 영문 소문자로 시작하고 소문자·숫자·하이픈으로 50자 이내로 입력하세요.'
    );
  const classes = new Map();
  function register(name, description) {
    if (!classes.has(name))
      classes.set(name, {
        name,
        original: '',
        type: name.includes('--') ? 'modifier' : name.includes('__') ? 'element' : 'block',
        description
      });
  }
  function render(value, depth = 0) {
    const indent = '  '.repeat(depth);
    if (typeof value === 'string') return indent + escape(value);
    const baseElement = value.element.split('--')[0];
    const base = block + (baseElement ? '__' + baseElement : '');
    const name = block + (value.element ? '__' + value.element : '');
    register(base, baseElement ? `${preset.label}의 ${baseElement} 요소` : preset.description);
    if (name !== base)
      register(name, `${base}의 ${value.element.split('--')[1]} 변형 · 기본 클래스와 함께 사용`);
    const attrs = Object.entries(value.attrs)
      .map(([key, val]) => ` ${key}="${escape(val)}"`)
      .join('');
    const open = `${indent}<${value.tag} class="${base}${name !== base ? ' ' + name : ''}"${attrs}>`;
    if (voidTags.has(value.tag)) return open;
    if (!Array.isArray(value.content)) return open + escape(value.content) + `</${value.tag}>`;
    return (
      open +
      '\n' +
      value.content.map((child) => render(child, depth + 1)).join('\n') +
      `\n${indent}</${value.tag}>`
    );
  }
  return {
    markup: render(preset.tree),
    classes: [...classes.values()],
    summary: `${preset.label} · ${block} 블록을 로컬에서 생성했습니다.`,
    notes: [
      '미리 정의한 UI 패턴입니다. 입력한 원본 마크업을 분석하거나 변환한 결과가 아닙니다.',
      'block__element는 중첩 깊이와 무관하게 한 블록을 기준으로 작성합니다. --modifier는 기본 클래스와 함께 사용합니다.',
      'SCSS는 구조만 제공하므로 스타일을 추가하세요. 링크 주소, 이미지 경로, 문구를 프로젝트에 맞게 바꾸세요.',
      '버튼 이벤트, 폼 검증과 전송, dialog 열기·닫기 등 동작은 프로젝트에서 연결하세요. 여러 폼을 조합하면 radio name도 구분하세요.'
    ]
  };
}
