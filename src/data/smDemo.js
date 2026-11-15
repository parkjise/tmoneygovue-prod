// 이 모듈은 화면 시연 전용입니다. API, 사내 인증, DLP 서버를 호출하지 않습니다.
export const models = [
  {
    id: 'language',
    name: 'Samsung Gauss Language (Pro)',
    level: '대외비 처리 UI',
    description: '문서 요약 · 메일 작성 · 사내 지식 검색'
  },
  {
    id: 'code',
    name: 'Samsung Gauss Code (Assistant)',
    level: '소스코드 보안 UI',
    description: '코드 리뷰 · 단위 테스트 · 취약점 점검'
  },
  {
    id: 'ds',
    name: 'DS-GPT (반도체 공정 특화)',
    level: 'DS 전용 UI',
    description: '반도체 공정 · 기술 문서 분석'
  }
];
export const agents = [
  {
    id: 'meeting',
    icon: 'FileText',
    title: '회의록 요약 및 Action Item',
    description: '녹취록 / 메모 핵심 정리',
    prompt:
      '[회의록 요약 요청]\n아래 회의 내용을 1) 핵심 결정사항, 2) 부서별 Action Item, 3) 향후 일정 순으로 정리해줘:\n- '
  },
  {
    id: 'code',
    icon: 'ShieldCheck',
    title: '코드 리뷰 및 보안 취약점 점검',
    description: 'Gauss Code 기반 정적 분석',
    prompt:
      '[코드 보안 및 성능 리뷰]\n아래 코드에서 보안 취약점(SQLi, XSS 등)과 메모리 누수 가능성을 점검해줘:\n```\n// 코드를 붙여넣으세요\n```'
  },
  {
    id: 'email',
    icon: 'Mail',
    title: '영문 / 한글 비즈니스 메일 작성',
    description: '글로벌 법인 · 파트너사 커뮤니케이션',
    prompt:
      '[비즈니스 영문 메일 작성]\n수신자: 해외 파트너사 PM\n핵심 내용: 차주 화요일 온라인 기술 미팅 일정 제안 및 사전 아젠다 공유'
  },
  {
    id: 'hr',
    icon: 'Building2',
    title: '사내 규정 / 복지 Q&A',
    description: '인사 · 총무 · 경비처리 위키',
    prompt: '[사내 규정 문의]\n육아휴직 신청 절차와 복직 시 연차 산정 기준이 궁금합니다.'
  },
  {
    id: 'ds',
    icon: 'Cpu',
    title: '반도체 / DS 기술 문서 번역',
    description: '공정 · 설계 전문 용어 특화',
    prompt:
      '[DS 기술 문서 영한 번역]\n다음 반도체 공정 스펙 문서를 표준 기술 용어를 적용해 한국어로 번역해줘:\n- '
  }
];
export const scenarioCards = [
  {
    id: 'hbm',
    category: 'DS 기술 분석',
    title: '차세대 HBM 패키징 수율 이슈 요약 및 보고서 초안',
    description:
      '주간 공정 회의록을 바탕으로 병목 원인과 개선 Action Item을 임원 보고용으로 정리합니다.'
  },
  {
    id: 'security_code',
    category: 'Gauss Code',
    title: '사내 MES 연동 API 코드 보안 취약점 점검',
    description: 'Java / Spring Boot 코드의 SQL Injection과 권한 우회를 점검하는 답변을 확인합니다.'
  },
  {
    id: 'welfare',
    category: '사내 위키 RAG',
    title: '미주 법인(DSA) 장기 출장 경비 및 체재비 규정',
    description: '출장 관리 지침을 검색하고 숙박 상한액과 정산 절차를 안내하는 흐름을 확인합니다.'
  },
  {
    id: 'global_mail',
    category: '비즈니스 커뮤니케이션',
    title: '해외 주요 고객사 샘플 납품 일정 조율 영문 메일',
    description: '납품 일정 변경 사유를 전문적인 톤으로 설명하고 대안 일정을 제안합니다.'
  }
];
// 정규식 기반 UI 시연입니다. 실제 개인정보 판별 또는 보안 정책을 대체하지 않습니다.
export function hasSensitivePattern(text) {
  return /\d{6}\s*[-–]\s*\d{7}|01[016789][-\s]?\d{3,4}[-\s]?\d{4}|1급\s*기밀|대외비원본|주민번호/.test(
    text
  );
}
export function maskSensitiveText(text) {
  return text
    .replace(/\d{6}\s*[-–]\s*\d{7}/g, '[주민등록번호 마스킹]')
    .replace(/01[016789][-\s]?\d{3,4}[-\s]?\d{4}/g, '[연락처 마스킹]')
    .replace(/1급\s*기밀(?:_[가-힣A-Za-z0-9]+)*|대외비원본|주민번호/g, '[기밀정보 마스킹]');
}
