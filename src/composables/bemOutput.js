// Shared, pure helpers. No API credentials or network calls belong in this module.
export const BEM_NAME =
  /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?(?:--[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$/;
export function buildBemScss(classes) {
  const groups = new Map();
  for (const item of classes) {
    if (!BEM_NAME.test(item.name)) continue;
    const block = item.name.split('__')[0].split('--')[0];
    if (!groups.has(block)) groups.set(block, []);
    groups.get(block).push(item);
  }
  return [...groups]
    .map(([block, items]) => {
      const clean = (text) => String(text).replace(/[\r\n\u2028\u2029]/g, ' ');
      const root = items.find((item) => item.name === block);
      const children = items
        .filter((item) => item.name !== block)
        .map(
          (item) => `  // ${clean(item.description)}\n  &${item.name.slice(block.length)} {\n  }`
        )
        .join('\n\n');
      return `// ${root ? clean(root.description) : '독립 컴포넌트'}\n.${block} {\n${children ? children + '\n' : ''}}`;
    })
    .join('\n\n');
}
export const sampleMarkup = `<article class="card featured">
  <header class="header">
    <h2 class="title">추천 상품</h2>
    <span class="badge">NEW</span>
  </header>
  <p class="description">편안한 워크스페이스를 위한 선택</p>
  <button class="button" type="button">자세히 보기</button>
</article>`;
export const sampleResult = {
  summary:
    '상품 카드 구조를 하나의 product-card 블록과 역할별 요소, featured 변형으로 정리했습니다.',
  classes: [
    { name: 'product-card', type: 'block', description: '독립적인 상품 카드', original: 'card' },
    {
      name: 'product-card--featured',
      type: 'modifier',
      description: '추천 상품 상태. product-card와 함께 사용',
      original: 'featured'
    },
    {
      name: 'product-card__header',
      type: 'element',
      description: '카드 상단 영역',
      original: 'header'
    },
    { name: 'product-card__title', type: 'element', description: '상품 제목', original: 'title' },
    {
      name: 'product-card__badge',
      type: 'element',
      description: '상품 상태 뱃지',
      original: 'badge'
    },
    {
      name: 'product-card__description',
      type: 'element',
      description: '상품 설명',
      original: 'description'
    },
    {
      name: 'product-card__button',
      type: 'element',
      description: '상세 보기 액션',
      original: 'button'
    }
  ],
  markup: `<article class="product-card product-card--featured">
  <header class="product-card__header">
    <h2 class="product-card__title">추천 상품</h2>
    <span class="product-card__badge">NEW</span>
  </header>
  <p class="product-card__description">편안한 워크스페이스를 위한 선택</p>
  <button class="product-card__button" type="button">자세히 보기</button>
</article>`,
  notes: [
    '미리 작성된 로컬 샘플입니다. 입력한 마크업을 AI로 분석한 결과가 아닙니다.',
    '기존 CSS 선택자와 JavaScript의 클래스 참조도 변경된 이름에 맞춰 검토하세요.'
  ]
};
