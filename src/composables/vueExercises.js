// 정답은 기존에 실행 중인 Vue 예제의 실제 소스입니다. 사용자 입력은 실행하지 않습니다.
const blank = (target, label, hint, explanation) => ({ target, label, hint, explanation });
const exercise = (id, title, level, path, question, checks, blanks) => ({
  id,
  title,
  level,
  path,
  question,
  checks,
  blanks
});
export const vueExercises = [
  exercise(
    'conditional',
    '회원 상태에 맞는 안내 표시',
    '입문',
    '/vue-syntax/conditional',
    '활성 회원과 승인 대기 회원에게 다른 안내를 보여주세요. 자주 토글하는 안내는 DOM을 유지하도록 처리하세요.',
    [
      '활성 회원: 활성 안내만 표시',
      '대기 회원: 승인 대기 안내 표시',
      '표시 전환을 눌러도 v-show 대상 DOM은 유지'
    ],
    [
      blank(
        `v-if="status === 'active'"`,
        '활성 회원 조건',
        '조건이 false이면 요소 자체가 제거되는 지시자입니다.',
        'v-if는 조건에 맞을 때만 DOM을 생성합니다. 이어지는 v-else-if/v-else는 인접해야 합니다.'
      ),
      blank(
        `v-else-if="status === 'pending'"`,
        '대기 회원 분기',
        '앞 조건이 거짓일 때 다음 조건을 검사합니다.',
        'v-else-if로 같은 상태값의 다른 경우를 처리합니다.'
      ),
      blank(
        'v-show="visible"',
        'DOM을 유지하는 표시 전환',
        'CSS display를 전환하는 지시자입니다.',
        '자주 표시 상태가 바뀌는 요소는 v-show를 사용할 수 있습니다.'
      )
    ]
  ),
  exercise(
    'lists',
    '할 일 검색과 안정적인 목록 키',
    '입문',
    '/vue-syntax/lists',
    '할 일 이름을 검색하고, 필터링 전후에도 각 항목의 정체성이 유지되도록 고유 ID를 연결하세요.',
    [
      'API 검색 시 API 연결만 표시',
      '없는 검색어는 빈 결과 안내',
      'key는 배열 index 대신 task.id 사용'
    ],
    [
      blank(
        'computed',
        '필터링 결과를 만드는 Vue API',
        '반응형 의존성에 따라 파생 값을 계산합니다.',
        'computed는 query와 tasks가 변경되면 필터링 결과를 다시 계산합니다.'
      ),
      blank(
        ':key="task.id"',
        '반복 항목의 키 바인딩',
        '콜론으로 key를 동적으로 바인딩합니다.',
        '항목별 고유 ID를 key로 사용하면 필터링과 재정렬 시 상태가 잘못 재사용되는 것을 막습니다.'
      )
    ]
  ),
  exercise(
    'binding',
    '이름과 나이 입력값 정리',
    '입문',
    '/vue-syntax/binding',
    '이름 앞뒤 공백을 제거하고 나이는 숫자로 저장하세요. 소개는 입력 중이 아니라 change 시점에 반영하세요.',
    [
      '이름 앞뒤 공백 제거',
      '나이 입력 후 typeof age가 number',
      '소개 수정 후 포커스를 이동하면 반영'
    ],
    [
      blank(
        'v-model.trim="name"',
        '이름 양방향 바인딩',
        'v-model에 공백 제거 수식어를 붙입니다.',
        '.trim은 문자열 앞뒤 공백을 정리합니다.'
      ),
      blank(
        'v-model.number="age"',
        '숫자형 나이 바인딩',
        'v-model에 숫자 변환 수식어를 붙입니다.',
        '.number는 숫자로 변환할 수 있는 입력을 숫자로 저장합니다. 빈 값 등의 검증은 별도로 필요합니다.'
      ),
      blank(
        'v-model.lazy="bio"',
        '소개 변경 시점',
        'input 대신 change 이벤트에 동기화하는 수식어입니다.',
        '.lazy는 입력할 때마다 갱신하지 않고 change 이벤트가 발생할 때 상태를 갱신합니다.'
      )
    ]
  ),
  exercise(
    'events',
    '이벤트 전파와 새로고침 제어',
    '입문',
    '/vue-syntax/events',
    '자식 버튼을 눌러도 부모의 클릭 기록이 남지 않게 하고, 폼 전송 시 새로고침을 막으세요.',
    [
      '자식 버튼 클릭 시 자식 로그만 추가',
      '폼 버튼 클릭 시 페이지 유지',
      'Enter 입력 시 메시지 기록'
    ],
    [
      blank(
        '@click.stop',
        '자식 클릭 이벤트 수식어',
        '이벤트가 상위 요소로 전달되는 것을 멈춥니다.',
        '.stop은 stopPropagation을 호출해 이벤트 버블링을 차단합니다.'
      ),
      blank(
        '@submit.prevent',
        '폼 제출 이벤트 수식어',
        '브라우저 기본 동작을 취소합니다.',
        '.prevent는 preventDefault를 호출해 기본 폼 이동을 막습니다.'
      ),
      blank(
        '@keyup.enter',
        'Enter 키 입력 이벤트',
        'keyup에 특정 키를 나타내는 수식어를 붙입니다.',
        '.enter로 Enter 키를 눌렀을 때만 핸들러를 실행합니다.'
      )
    ]
  ),
  exercise(
    'reactivity',
    '주문 금액과 중첩 상태 감지',
    '기본',
    '/vue-syntax/reactivity',
    '수량 × 단가 + 배송비를 반응형으로 계산하고, 중첩 상품 설정의 변경도 감지하세요.',
    [
      '수량 2·단가 15000·배송비 3000이면 33000원',
      '수량을 바꾸면 총액 갱신',
      '배송비를 바꾸면 변경 기록 추가'
    ],
    [
      blank(
        'quantity.value * product.price + product.options.shipping',
        '총 주문 금액 계산식',
        'ref에는 .value가 필요하고 reactive 객체는 속성에 직접 접근합니다.',
        'script에서 ref 값은 .value로 읽습니다. 파생 금액은 computed로 계산합니다.'
      ),
      blank(
        '{ deep: true }',
        '중첩 객체 감시 옵션',
        '깊은 속성의 변경을 관찰하는 watch 옵션입니다.',
        'reactive 객체를 직접 watch하면 기본적으로 깊게 감시합니다. 이 예제는 deep: true를 명시해 의도를 드러냅니다.'
      )
    ]
  ),
  exercise(
    'communication',
    '부모와 자식 컴포넌트 연결',
    '기본',
    '/vue-syntax/communication',
    'ProfileEditor의 입력값을 부모 name과 동기화하고, 저장 이벤트로 부모에게 결과를 전달하세요.',
    [
      '자식 이름 수정 시 부모 상태도 갱신',
      '저장 버튼 클릭 시 저장 완료 표시',
      '이름 길이가 scoped slot에 반영'
    ],
    [
      blank(
        'v-model="name"',
        '자식과 부모의 양방향 연결',
        '사용자 컴포넌트에도 v-model을 사용할 수 있습니다.',
        '자식의 defineModel과 부모의 v-model이 연결되어 이름을 함께 관리합니다.'
      ),
      blank(
        '@save=',
        '저장 이벤트 리스너 접두어',
        'Vue 이벤트 리스너 축약 기호와 이벤트 이름을 쓰고 =까지 입력하세요.',
        '자식은 emit으로 save를 알리고 부모는 @save에서 전달값을 처리합니다.'
      )
    ]
  ),
  exercise(
    'async',
    'API 실패 처리와 요청 취소',
    '실무',
    '/vue-patterns/async',
    '재요청 시 이전 요청을 취소하고, HTTP 오류를 처리하며, 컴포넌트가 사라지면 진행 중 요청을 정리하세요.',
    [
      '처음 열면 사람 목록 로딩',
      '실패 응답 테스트 선택 후 재시도하면 오류 안내',
      '실패 해제 후 재시도하면 복구'
    ],
    [
      blank(
        'controller?.abort()',
        '기존 요청 취소',
        'AbortController 인스턴스의 취소 메서드를 호출합니다.',
        '이전 요청을 취소해 중복 요청과 불필요한 응답 처리를 줄입니다.'
      ),
      blank(
        '!response.ok',
        'HTTP 오류 판별 조건',
        'fetch는 HTTP 404/500만으로 reject되지 않습니다.',
        'response.ok가 false이면 직접 오류를 던져 catch에서 처리합니다.'
      ),
      blank(
        'onUnmounted',
        '화면 종료 시 정리할 생명주기 API',
        '컴포넌트가 제거될 때 실행되는 훅입니다.',
        'onUnmounted에서 요청을 취소해 제거된 화면의 작업을 정리합니다.'
      )
    ]
  ),
  exercise(
    'debounce',
    '검색 입력을 350ms 늦추기',
    '실무',
    '/vue-patterns/debounce',
    '입력이 멈춘 뒤 350ms 후에만 검색어를 적용하고, 새 입력이 들어오면 이전 타이머를 취소하세요.',
    [
      '빠르게 Vue를 입력하면 마지막 입력만 반영',
      '입력 중 대기 상태 표시',
      '검색과 분류를 동시에 적용'
    ],
    [
      blank(
        'setTimeout',
        '지연 실행 함수',
        '일정 시간이 지난 후 한 번 실행합니다.',
        'setTimeout으로 마지막 입력 후 검색어를 적용합니다.'
      ),
      blank(
        'onCleanup(() => clearTimeout(timer))',
        '이전 타이머 정리',
        'watch의 세 번째 콜백 인자로 정리 함수를 등록합니다.',
        'watch가 다시 실행되거나 중지될 때 이전 타이머를 제거해 중복 반영을 막습니다.'
      )
    ]
  ),
  exercise(
    'composables',
    '모달 상태를 Composable로 분리',
    '기본',
    '/vue-patterns/composables',
    '재사용 가능한 모달의 열림 상태와 열기 함수를 꺼내고, 상태를 실제 BaseModal과 연결하세요.',
    [
      'useModal 열기 버튼으로 모달 표시',
      '닫은 뒤 다시 열기 가능',
      '확인 모달의 취소와 확인 결과가 다르게 표시'
    ],
    [
      blank(
        'const { isOpen, open } = useModal();',
        'Composable 상태와 함수 가져오기',
        '구조 분해로 두 값을 꺼내세요. const 선언 전체를 작성합니다.',
        'useModal은 반응형 상태와 조작 함수를 묶어 UI에서 재사용할 수 있게 합니다.'
      ),
      blank(
        'v-model="isOpen"',
        'BaseModal 열림 상태 연결',
        '부모의 열림 상태를 자식 모달에 양방향으로 연결합니다.',
        '모달 내부 닫기 동작도 부모 isOpen에 반영됩니다.'
      )
    ]
  ),
  exercise(
    'dynamic-form',
    '동적 팀원 폼의 전체 검증',
    '실무',
    '/vue-patterns/dynamic-form',
    '팀원이 한 명 이상이고 모든 이름·이메일에 오류가 없을 때만 저장할 수 있게 만드세요.',
    [
      '필드가 비어 있으면 저장 불가',
      '팀원을 추가하면 새 필드도 검증',
      '전체 필드가 유효할 때 팀 저장 활성화'
    ],
    [
      blank(
        'rows.value.length > 0 && errors.value.every((e) => !e.name && !e.email)',
        '전체 폼 유효성 조건',
        '빈 배열에서 every는 true이므로 행 개수도 검사하세요.',
        'every로 모든 오류가 없는지 확인하고, 빈 폼이 통과하지 않도록 길이 조건을 함께 둡니다.'
      ),
      blank(
        ':disabled="!valid"',
        '저장 버튼 비활성 조건',
        'valid가 false일 때 disabled를 true로 바인딩합니다.',
        'UI 버튼 상태와 유효성 계산을 연결합니다. 실제 서버에서도 검증해야 합니다.'
      )
    ]
  ),
  exercise(
    'infinite',
    '무한 스크롤 중복 호출 방지',
    '실무',
    '/vue-patterns/infinite',
    '로딩 중이거나 모든 항목을 불러왔다면 요청을 막고, 화면 종료 시 Observer와 타이머를 정리하세요.',
    ['더 보기마다 8개 추가', '최대 40개 후 종료 안내', '로딩 중 버튼 비활성화'],
    [
      blank(
        'if (loading.value || finished.value) return;',
        '추가 로딩을 막는 조기 반환',
        '둘 중 하나라도 true이면 함수를 종료합니다.',
        'loading과 finished를 함께 확인해 중복 요청과 종료 뒤 요청을 막습니다.'
      ),
      blank(
        'observer?.disconnect()',
        'Observer 정리',
        '관찰하던 모든 요소의 감시를 중단합니다.',
        '컴포넌트가 제거되면 IntersectionObserver 연결과 타이머를 함께 해제해야 합니다.'
      )
    ]
  ),
  exercise(
    'selection',
    '전체 선택과 일괄 삭제',
    '실무',
    '/vue-patterns/selection',
    '전체 선택 체크박스를 양방향 computed로 만들고, 선택한 ID에 해당하는 행만 삭제하세요.',
    [
      '전체 선택하면 모든 행 체크',
      '일부만 선택하면 중간 상태 표시',
      '선택 삭제 시 선택된 행만 제거'
    ],
    [
      blank(
        'rows.value.length > 0 && rows.value.every((r) => selected.value.includes(r.id))',
        '전체 선택 getter 조건',
        '빈 목록은 전체 선택으로 표시하지 않고 every로 각 ID를 확인합니다.',
        '실제 행 ID가 모두 선택되어 있는지 확인해야 전체 선택 상태를 정확하게 계산합니다.'
      ),
      blank(
        'rows.value.filter((r) => !selected.value.includes(r.id))',
        '삭제 후 남길 행 계산',
        '선택 ID 목록에 없는 행만 남깁니다.',
        'filter로 새 배열을 만들고 삭제 뒤 selected도 비워 오래된 선택값을 정리합니다.'
      )
    ]
  )
];
// 공백 차이는 허용하되 문자열 안의 공백은 유지합니다. 코드를 실행하는 채점이 아닙니다.
export function normalizeExerciseAnswer(code) {
  const value = String(code).trim();
  const directive = /^([:@][\w.:-]+|v-[\w.:-]+)\s*=\s*(["'])([\s\S]*)\2$/.exec(value);
  if (directive) return directive[1] + '=' + normalizeExerciseAnswer(directive[3]);
  return value
    .trim()
    .replace(/(["'])(?:\\.|(?!\1)[^\\])*?\1|\s+/g, (token) => {
      if (/^\s+$/.test(token)) return '';
      if (!token.includes('\\')) return JSON.stringify(token.slice(1, -1));
      return token;
    })
    .replace(/;$/, '');
}
export function checkExercise(exercise, answers) {
  return exercise.blanks.map((field, index) => ({
    label: field.label,
    correct: normalizeExerciseAnswer(answers[index] || '') === normalizeExerciseAnswer(field.target)
  }));
}
export function questionSource(exercise, source) {
  let output = source;
  exercise.blanks.forEach((field, index) => {
    if (!output.includes(field.target))
      throw new Error(`문제 ${exercise.id}의 빈칸 ${index + 1}을 찾지 못했습니다.`);
    // 동일 표현이 import와 본문에 반복되면 모두 같은 번호로 표시합니다.
    output = output.split(field.target).join(`/* 빈칸 ${index + 1} */`);
  });
  return output;
}
