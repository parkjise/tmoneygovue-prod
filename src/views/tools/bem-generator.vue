<script setup>
import { staticDeployment, staticAiStatus } from '@/composables/aiDeployment';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  RefreshCw,
  Code2,
  Square
} from 'lucide-vue-next';
import { useClipboard } from '@/composables/useClipboard';
import { buildBemScss, sampleMarkup, sampleResult } from '@/composables/bemOutput';
import { bemPatterns, bemPatternCategories, createBemPattern } from '@/composables/bemPatterns';
const mode = ref('buttons');
const modes = [
  { id: 'buttons', label: '버튼으로 생성', description: '54가지 패턴 · API 없이 사용' },
  { id: 'ai', label: 'AI로 생성', description: '원본 마크업 분석 · Gemini / OpenAI' }
];
function onModeKey(event) {
  if (busy.value || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const next =
    event.key === 'Home'
      ? 'buttons'
      : event.key === 'End'
        ? 'ai'
        : mode.value === 'buttons'
          ? 'ai'
          : 'buttons';
  mode.value = next;
  event.currentTarget.parentElement.querySelector('#bem-mode-' + next)?.focus();
}
// 탭을 바꿔도 각 방식의 결과와 선택한 코드 형식을 별도로 유지합니다.
const modeOutputs = ref(
  Object.fromEntries(
    modes.map(({ id }) => [
      id,
      {
        result: null,
        resultSource: '',
        generatedModel: '',
        tab: 'html',
        stale: false
      }
    ])
  )
);
function outputField(key) {
  return computed({
    get: () => modeOutputs.value[mode.value][key],
    set: (value) => {
      modeOutputs.value[mode.value][key] = value;
    }
  });
}
const patternQuery = ref('');
const patternCategory = ref('전체');
const patternBlock = ref('');
const patternError = ref('');
const selectedPattern = ref('');
const patternGroups = computed(() =>
  bemPatternCategories
    .map((category) => ({
      category,
      items: bemPatterns.filter(
        (item) =>
          item.category === category &&
          (patternCategory.value === '전체' || item.category === patternCategory.value) &&
          `${item.id} ${item.label} ${item.description}`
            .toLowerCase()
            .includes(patternQuery.value.toLowerCase())
      )
    }))
    .filter((group) => group.items.length)
);
function usePattern(id) {
  if (busy.value) return;
  try {
    const generated = createBemPattern(id, patternBlock.value);
    result.value = generated;
    selectedPattern.value = id;
    resultSource.value = 'preset';
    generatedModel.value = '';
    tab.value = 'html';
    stale.value = false;
    error.value = '';
    patternError.value = '';
  } catch (e) {
    patternError.value = e.message;
  }
}
const provider = ref('gemini');
const providerInfo = {
  gemini: {
    label: 'Gemini',
    key: 'GEMINI_API_KEY',
    model: 'GEMINI_MODEL',
    url: 'https://aistudio.google.com/apikey',
    portal: 'Google AI Studio'
  },
  openai: {
    label: 'OpenAI',
    key: 'OPENAI_API_KEY',
    model: 'OPENAI_MODEL',
    url: 'https://platform.openai.com/api-keys',
    portal: 'OpenAI API Platform'
  }
};
const selectedProvider = computed(() => providerInfo[provider.value]);
const activeStatus = computed(() => status.value?.providers?.[provider.value]);
const markup = ref('');
const blockName = ref('');
const context = ref('');
const busy = ref(false);
const status = ref(null);
const statusError = ref('');
const error = ref('');
const result = outputField('result');
const resultSource = outputField('resultSource');
const generatedModel = outputField('generatedModel');
const tab = outputField('tab');
const stale = outputField('stale');
const { copied, copy } = useClipboard();
let controller, statusController;
const tabs = [
  { id: 'html', label: '변환 HTML' },
  { id: 'scss', label: 'SCSS 뼈대' },
  { id: 'classes', label: '클래스 목록' }
];
const output = computed(() =>
  !result.value
    ? ''
    : tab.value === 'html'
      ? result.value.markup
      : tab.value === 'scss'
        ? buildBemScss(result.value.classes)
        : result.value.classes.map((c) => c.name).join('\n')
);
const valid = computed(
  () =>
    markup.value.trim().length >= 3 &&
    markup.value.length <= 12000 &&
    /<\s*[a-zA-Z][^>]*>/.test(markup.value) &&
    (!blockName.value || /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(blockName.value))
);
const ready = computed(() => activeStatus.value?.configured === true);
async function checkStatus() {
  if (staticDeployment) {
    status.value = staticAiStatus();
    statusError.value = '';
    return;
  }
  statusController?.abort();
  statusController = new AbortController();
  statusError.value = '';
  status.value = null;
  try {
    const response = await fetch('/api/bem/status', { signal: statusController.signal });
    const data = await response.json();
    if (
      !response.ok ||
      typeof data.csrfToken !== 'string' ||
      data.csrfToken.length < 32 ||
      !['gemini', 'openai'].every((name) => typeof data.providers?.[name]?.configured === 'boolean')
    )
      throw new Error();
    status.value = data;
  } catch (e) {
    if (e.name !== 'AbortError')
      statusError.value = 'BEM API에 연결할 수 없습니다. 개발 서버를 재시작한 후 다시 확인하세요.';
  }
}
function edit() {
  if (result.value && resultSource.value !== 'preset') stale.value = true;
}
function loadExample() {
  markup.value = sampleMarkup;
  blockName.value = 'product-card';
  context.value = '';
  edit();
}
function showSample() {
  loadExample();
  result.value = structuredClone(sampleResult);
  resultSource.value = 'sample';
  generatedModel.value = '';
  tab.value = 'html';
  stale.value = false;
  error.value = '';
}
async function generate() {
  if (!valid.value || !ready.value || busy.value) return;
  busy.value = true;
  error.value = '';
  controller = new AbortController();
  const snapshot = {
    input: markup.value,
    blockName: blockName.value,
    context: context.value,
    provider: provider.value
  };
  try {
    const response = await fetch('/api/bem/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-BEM-Token': status.value.csrfToken },
      body: JSON.stringify(snapshot),
      signal: controller.signal
    });
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error('서버 응답을 읽지 못했습니다. 개발 서버 연결을 확인하세요.');
    }
    if (!response.ok) throw new Error(data.error || '생성에 실패했습니다. 다시 시도하세요.');
    if (!data.result?.classes?.length || typeof data.result.markup !== 'string')
      throw new Error('응답 형식을 확인할 수 없습니다. 다시 생성하세요.');
    result.value = data.result;
    resultSource.value = data.provider || snapshot.provider;
    generatedModel.value = data.model;
    stale.value = false;
    tab.value = 'html';
  } catch (e) {
    error.value =
      e.name === 'AbortError'
        ? '요청을 취소했습니다.'
        : e instanceof TypeError
          ? '서버에 연결하지 못했습니다. 네트워크를 확인하세요.'
          : e.message || '서버에 연결하지 못했습니다.';
  } finally {
    busy.value = false;
  }
}
function download() {
  if (!result.value) return;
  const template = /^\s*<template[\s>]/.test(result.value.markup)
    ? result.value.markup
    : `<template>\n${result.value.markup}\n</template>`;
  const text = `<!-- BEM 제안: 적용 전 검토하세요. -->\n${template}\n\n<style lang="scss" scoped>\n${buildBemScss(result.value.classes)}\n</style>\n`;
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download =
    (result.value.classes.find((item) => item.type === 'block')?.name || 'bem-output') + '.vue';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
onMounted(checkStatus);
onUnmounted(() => {
  controller?.abort();
  statusController?.abort();
});
</script>
<template>
  <section class="demo bem-generator">
    <header class="bem-generator__intro">
      <span class="bem-generator__icon"><Sparkles :size="23" /></span>
      <section>
        <h3>버튼으로 만들고, 마크업으로 확장하세요.</h3>
        <p>54가지 로컬 UI 패턴 · HTML / Vue 템플릿 AI 분석 · BEM + SCSS</p>
      </section>
    </header>
    <div class="bem-generator__modes" role="tablist" aria-label="BEM 생성 방식">
      <button
        v-for="item in modes"
        :id="'bem-mode-' + item.id"
        :key="item.id"
        type="button"
        role="tab"
        :aria-selected="mode === item.id"
        :aria-controls="'bem-panel-' + item.id"
        :tabindex="mode === item.id ? 0 : -1"
        :disabled="busy"
        @click="mode = item.id"
        @keydown="onModeKey"
      >
        <strong>{{ item.label }}</strong>
        <small>{{ item.description }}</small>
      </button>
    </div>
    <section
      id="bem-panel-buttons"
      v-show="mode === 'buttons'"
      role="tabpanel"
      aria-labelledby="bem-mode-buttons"
      tabindex="0"
      class="bem-generator__patterns"
    >
      <header class="bem-generator__section-heading">
        <section>
          <h4>자주 쓰는 BEM 패턴 · {{ bemPatterns.length }}종</h4>
          <p>
            버튼을 누르면 HTML · SCSS 뼈대 · 클래스 목록을 즉시 생성합니다. API 키와 인터넷 연결
            없이 사용할 수 있습니다.
          </p>
        </section>
        <span class="bem-generator__type">로컬 생성</span>
      </header>
      <p class="demo__muted">
        card, feature 등은 HTML 태그 이름이 아닌 UI 블록 이름입니다. 원본 마크업 입력과 관계없이
        선택한 패턴의 새 코드를 만듭니다.
      </p>
      <div class="bem-generator__options">
        <label class="demo__field">
          패턴 검색
          <input v-model="patternQuery" type="search" placeholder="card, feature, 폼, 메뉴…" />
        </label>
        <label class="demo__field">
          패턴 블록 이름 (선택)
          <input
            v-model="patternBlock"
            :disabled="busy"
            maxlength="50"
            placeholder="예: service-card · 비우면 패턴 이름 사용"
          />
          <small>이름 입력 후 패턴 버튼을 누르면 적용됩니다.</small>
        </label>
      </div>
      <label class="bem-generator__provider">
        패턴 분류
        <select v-model="patternCategory">
          <option>전체</option>
          <option v-for="category in bemPatternCategories" :key="category">{{ category }}</option>
        </select>
      </label>
      <section
        v-for="group in patternGroups"
        :key="group.category"
        class="bem-generator__pattern-group"
      >
        <h5>{{ group.category }} · {{ group.items.length }}</h5>
        <div class="bem-generator__pattern-buttons">
          <button
            v-for="item in group.items"
            :key="item.id"
            type="button"
            :disabled="busy"
            :aria-pressed="resultSource === 'preset' && selectedPattern === item.id"
            :title="item.description"
            @click="usePattern(item.id)"
          >
            <strong>{{ item.id }}</strong>
            <span>{{ item.label }}</span>
          </button>
        </div>
      </section>
      <p v-if="!patternGroups.length" role="status">
        일치하는 패턴이 없습니다. 검색어나 분류를 바꿔 주세요.
      </p>
      <p v-if="patternError" role="alert" class="demo__error">{{ patternError }}</p>
      <p v-if="resultSource === 'preset'" role="status" class="bem-generator__pattern-status">
        {{ result.summary }}
        <a
          href="#bem-result"
          @click.prevent="$refs.resultPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' })"
        >
          생성된 코드 보기 ↓
        </a>
      </p>
      <details class="bem-generator__setup">
        <summary>BEM 이름 작성법과 사용 순서</summary>
        <ol>
          <li>패턴 버튼을 선택합니다. 필요한 경우 먼저 블록 이름을 지정하세요.</li>
          <li>
            아래 생성 결과에서 HTML, SCSS, 클래스 목록을 선택해 복사하거나 .vue 초안을
            다운로드하세요.
          </li>
          <li>
            <code>card</code>
            는 독립 블록,
            <code>card__title</code>
            은 블록의 요소,
            <code>card__button--primary</code>
            는 버튼의 변형입니다.
          </li>
          <li>
            변형은
            <code>class="card__button card__button--primary"</code>
            처럼 기본 클래스와 함께 사용합니다. 요소를 중첩해도
            <code>card__body__title</code>
            처럼 연결하지 않습니다.
          </li>
          <li>
            스타일, 이미지 경로, 링크, 버튼 이벤트는 프로젝트에 맞게 연결하세요. 아코디언은
            details/summary의 기본 동작을 사용합니다.
          </li>
        </ol>
      </details>
    </section>
    <section
      id="bem-panel-ai"
      v-show="mode === 'ai'"
      role="tabpanel"
      aria-labelledby="bem-mode-ai"
      tabindex="0"
      class="bem-generator__ai"
    >
      <label class="bem-generator__provider">
        AI 공급자
        <select
          v-model="provider"
          aria-label="AI 공급자"
          :disabled="busy"
          @change="
            error = '';
            edit();
          "
        >
          <option value="gemini">Gemini</option>
          <option value="openai">OpenAI (GPT / ChatGPT API)</option>
        </select>
        <small>선택한 API 한 곳으로만 전송합니다.</small>
      </label>
      <aside class="bem-generator__connection" aria-live="polite">
        <section>
          <strong>
            <ShieldCheck :size="15" />
            {{
              staticDeployment
                ? '공개 데모 · AI 서버 미연결'
                : statusError
                  ? '서버 확인 필요'
                  : status === null
                    ? '연결 확인 중…'
                    : ready
                      ? selectedProvider.label + ' API 키 설정됨'
                      : selectedProvider.label + ' API 키 미설정'
            }}
          </strong>
          <p v-if="status">
            {{
              staticDeployment
                ? '패턴 버튼으로 BEM 코드를 바로 생성할 수 있습니다. AI를 이용한 원본 마크업 분석은 로컬 서버에서 이용하세요.'
                : ready
                  ? '서버 모델: ' + activeStatus.model + ' · 키는 브라우저에 전달되지 않습니다.'
                  : '.env.local에 ' +
                    selectedProvider.key +
                    '를 설정하면 실제 생성 버튼이 활성화됩니다.'
            }}
          </p>
          <p v-if="statusError" class="demo__error">{{ statusError }}</p>
        </section>
        <button :disabled="busy" @click="checkStatus">
          <RefreshCw :size="14" />
          설정 확인
        </button>
      </aside>
      <details
        v-if="!staticDeployment"
        class="bem-generator__setup"
        :open="status !== null && !ready"
      >
        <summary>개인 {{ selectedProvider.label }} API 연결 방법</summary>
        <ol>
          <li>
            <a :href="selectedProvider.url" target="_blank" rel="noopener noreferrer">
              {{ selectedProvider.portal }}
            </a>
            에서 API 키를 발급합니다.
          </li>
          <li>
            프로젝트의
            <code>.env.example</code>
            을
            <code>.env.local</code>
            로 복사하고
            <code>{{ selectedProvider.key }}</code>
            에 키를 입력합니다.
          </li>
          <li>
            <code>{{ selectedProvider.model }}</code>
            에 계정에서 사용할 모델 ID를 지정합니다. 설정 후 개발 서버를 재시작하고 ‘설정 확인’을
            누르세요.
          </li>
        </ol>
        <p>
          키는 이 화면이나 채팅에 입력하지 않습니다. 개인용 API는 로컬 컴퓨터에서만 접근할 수
          있습니다.
        </p>
      </details>
      <form class="bem-generator__form" @submit.prevent="generate" @input="edit">
        <header class="bem-generator__section-heading">
          <h4>
            <Code2 :size="16" />
            원본 마크업
          </h4>
          <button type="button" :disabled="busy" @click="loadExample">예시 마크업 넣기</button>
        </header>
        <label class="demo__field">
          HTML / Vue 템플릿
          <textarea
            v-model="markup"
            aria-label="원본 HTML 마크업"
            :disabled="busy"
            rows="13"
            maxlength="12000"
            spellcheck="false"
            placeholder='<article class="card">…</article>'
            required
          />
        </label>
        <footer class="bem-generator__input-caption">
          <span>태그·텍스트·이벤트를 유지하면서 클래스 이름을 제안합니다.</span>
          <span>{{ markup.length.toLocaleString() }} / 12,000</span>
        </footer>
        <div class="bem-generator__options">
          <label class="demo__field">
            블록 이름 (선택)
            <input
              v-model.trim="blockName"
              aria-label="블록 이름 (선택)"
              :disabled="busy"
              maxlength="50"
              pattern="[a-z][a-z0-9]*(-[a-z0-9]+)*"
              placeholder="예: product-card"
            />
            <small>비우면 마크업에 맞춰 제안합니다.</small>
          </label>
          <label class="demo__field">
            추가 조건 (선택)
            <input
              v-model="context"
              :disabled="busy"
              maxlength="2000"
              placeholder="예: 기존 유틸리티 클래스는 유지해줘"
            />
          </label>
        </div>
        <p v-if="staticDeployment" class="bem-generator__notice">
          공개 사이트에서도 위 패턴 버튼으로 BEM 코드를 생성할 수 있습니다. 원본 마크업의 AI
          분석에는 로컬 API 서버가 필요합니다.
        </p>
        <p v-else class="bem-generator__notice">
          ‘{{ selectedProvider.label }}로 생성’을 누르면 입력한 마크업과 조건이
          {{ selectedProvider.label }} API로 전송됩니다. 선택한 계정의 API 사용 한도·과금 설정이
          적용됩니다.
        </p>
        <div class="demo__row">
          <button class="demo__primary" type="submit" :disabled="!valid || !ready || busy">
            <Sparkles :size="15" />
            {{ busy ? 'BEM 이름 생성 중…' : selectedProvider.label + '로 생성' }}
            <ArrowRight v-if="!busy" :size="15" />
          </button>
          <button v-if="busy" type="button" @click="controller?.abort()">
            <Square :size="13" />
            취소
          </button>
          <button type="button" :disabled="busy" @click="showSample">
            샘플 결과 보기 · API 호출 없음
          </button>
        </div>
        <p v-if="error" class="demo__error" role="alert">{{ error }}</p>
        <p v-if="busy" role="status" class="demo__muted">
          입력 구조를 분석하고 있습니다. 최대 45초 정도 소요될 수 있습니다.
        </p>
      </form>
    </section>
    <section
      v-if="result"
      id="bem-result"
      ref="resultPanel"
      class="bem-generator__result"
      aria-label="BEM 생성 결과"
    >
      <header class="bem-generator__section-heading">
        <section>
          <span class="bem-generator__result-label">
            {{
              resultSource === 'preset'
                ? 'LOCAL PATTERN · AI 없이 생성'
                : resultSource === 'sample'
                  ? 'LOCAL SAMPLE · 로컬 샘플'
                  : resultSource.toUpperCase() + ' RESULT · ' + generatedModel
            }}
          </span>
          <h4>{{ result.summary }}</h4>
        </section>
        <button @click="download">.vue 초안 다운로드</button>
      </header>
      <p v-if="stale" role="status" class="bem-generator__stale">
        입력이 변경되었습니다. 아래 결과는 이전 입력 기준입니다.
      </p>
      <nav class="bem-generator__tabs" aria-label="생성 결과 형식">
        <button
          v-for="item in tabs"
          :key="item.id"
          :aria-pressed="tab === item.id"
          @click="tab = item.id"
        >
          {{ item.label }}
        </button>
        <button
          class="bem-generator__copy"
          aria-label="BEM 결과 복사"
          @click="copy(output, tab === 'scss' ? 'SCSS' : 'BEM')"
        >
          <Check v-if="copied" :size="14" />
          <Copy v-else :size="14" />
          {{ copied ? '복사됨 ✓' : '복사' }}
        </button>
      </nav>
      <pre
        class="bem-generator__output"
        tabindex="0"
        aria-label="생성된 코드"
      ><code>{{ output }}</code></pre>
      <p class="demo__muted">
        SCSS는 클래스 구조만 제공하는 뼈대입니다. 결과 코드는 실행하거나 프로젝트 파일에 자동
        적용하지 않습니다.
      </p>
      <section class="demo__scroll">
        <table>
          <caption>클래스 대응표 · {{ result.classes.length }}개</caption>
          <thead>
            <tr>
              <th scope="col">기존 클래스</th>
              <th scope="col">제안 BEM 클래스</th>
              <th scope="col">분류</th>
              <th scope="col">역할</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in result.classes" :key="item.name">
              <td>
                <code>{{ item.original || '새 클래스' }}</code>
              </td>
              <td>
                <code>{{ item.name }}</code>
              </td>
              <td>
                <span class="bem-generator__type">{{ item.type }}</span>
              </td>
              <td>{{ item.description }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <aside class="bem-generator__review">
        <h4>적용 전 확인하세요</h4>
        <p>
          기존 CSS 선택자, JavaScript의 클래스 참조, 동적 :class 조건도 함께 검토하세요. 로컬 패턴은
          새 코드 초안이며, AI 제안은 원본과 구조 및 이벤트를 비교해 주세요.
        </p>
        <ul>
          <li v-for="note in result.notes" :key="note">{{ note }}</li>
        </ul>
      </aside>
    </section>
    <section v-else class="bem-generator__empty">
      <Code2 :size="26" />
      <h4>이름이 정리되면 구조가 보입니다.</h4>
      <p>
        {{
          mode === 'buttons'
            ? '위 패턴 버튼을 누르면 API 없이 BEM 코드가 생성됩니다.'
            : '원본 마크업을 입력해 AI로 분석하거나 샘플 결과를 확인하세요.'
        }}
      </p>
      <code>block → block__element → block__element--modifier</code>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.bem-generator {
  @include custom-scrollbar;
  gap: 24px;
  min-width: 0;
  &__modes {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    padding: 6px;
    background: var(--canvas);
    border: 1px solid var(--border);
    border-radius: 12px;
    button {
      display: grid;
      gap: 6px;
      text-align: left;
      padding: 14px;
      border: 1px solid transparent;
      background: transparent;
      border-radius: 8px;
      @include focus-ring;
      strong {
        font-size: 13px;
      }
      small {
        font-size: 11px;
        color: var(--muted);
      }
      &[aria-selected='true'] {
        background: var(--surface);
        color: var(--primary);
        border-color: var(--primary);
      }
    }
  }
  &__ai {
    display: grid;
    gap: 24px;
    min-width: 0;
  }
  &__patterns {
    display: grid;
    gap: 18px;
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 12px;
    min-width: 0;
    p {
      font-size: 12px;
      color: var(--muted);
      margin-top: 8px;
    }
  }
  &__pattern-group h5 {
    font-size: 12px;
    margin-bottom: 10px;
  }
  &__pattern-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(145px, 100%), 1fr));
    gap: 8px;
    button {
      display: grid;
      text-align: left;
      gap: 4px;
      min-width: 0;
      padding: 10px 12px;
      strong {
        font-size: 12px;
        overflow-wrap: anywhere;
      }
      span {
        font-size: 11px;
        color: var(--muted);
      }
      &[aria-pressed='true'] {
        border-color: var(--primary);
        color: var(--primary);
        background: var(--soft);
      }
    }
  }
  &__pattern-status a {
    display: inline-block;
    margin-left: 8px;
    color: var(--primary);
    text-decoration: underline;
  }
  &__provider {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    small {
      color: var(--muted);
      font-size: 11px;
    }
    select {
      max-width: 100%;
    }
  }
  &__intro {
    display: flex;
    gap: 14px;
    align-items: center;
    h3 {
      font-size: 18px;
      letter-spacing: -0.4px;
    }
    p {
      font-size: 12px;
      color: var(--muted);
      margin-top: 5px;
    }
  }
  &__icon {
    @include flex-center;
    width: 50px;
    height: 50px;
    background: var(--soft);
    color: var(--primary);
    border-radius: 14px;
    flex-shrink: 0;
  }
  &__connection {
    @include flex-between;
    @include card-surface;
    padding: 16px 18px;
    strong {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 12px;
    }
    p {
      font-size: 11px;
      color: var(--muted);
      margin-top: 6px;
    }
    button {
      white-space: nowrap;
      font-size: 11px;
      display: flex;
      gap: 6px;
      align-items: center;
    }
  }
  &__setup {
    font-size: 12px;
    padding: 16px 18px;
    border-radius: 12px;
    background: var(--canvas);
    summary {
      cursor: pointer;
      font-weight: 600;
    }
    ol {
      padding-left: 20px;
      li {
        margin: 8px 0;
      }
    }
    a {
      color: var(--primary);
    }
    p {
      color: var(--muted);
    }
    code {
      overflow-wrap: anywhere;
    }
  }
  &__form {
    display: grid;
    gap: 15px;
    textarea {
      font-family: 'SFMono-Regular', Consolas, monospace;
      font-size: 12px;
      line-height: 1.8;
      resize: vertical;
    }
    button {
      display: inline-flex;
      gap: 7px;
      align-items: center;
    }
    label {
      font-size: 12px;
    }
  }
  &__section-heading {
    @include flex-between;
    align-items: flex-start;
    h4 {
      font-size: 14px;
      display: flex;
      gap: 8px;
      align-items: center;
    }
    button {
      font-size: 11px;
      white-space: nowrap;
    }
    section {
      min-width: 0;
    }
  }
  &__input-caption {
    @include flex-between;
    align-items: flex-start;
    color: var(--caption);
    font-size: 10px;
    span:last-child {
      white-space: nowrap;
    }
  }
  &__options {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 16px;
    small {
      color: var(--caption);
      font-size: 10px;
    }
  }
  &__notice {
    font-size: 11px;
    color: var(--muted);
    padding: 12px 15px;
    border-left: 3px solid var(--primary);
    background: var(--soft);
    border-radius: 0 8px 8px 0;
  }
  &__result {
    scroll-margin-top: 100px;
    display: grid;
    gap: 16px;
    border-top: 1px solid var(--border);
    padding-top: 25px;
    min-width: 0;
  }
  &__result-label {
    display: block;
    font-size: 9px;
    letter-spacing: 1px;
    color: var(--primary);
    margin-bottom: 8px;
  }
  &__tabs {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    button {
      font-size: 11px;
      display: inline-flex;
      gap: 7px;
      align-items: center;
      border: 0;
      &[aria-pressed='true'] {
        color: var(--primary);
        background: var(--soft);
      }
    }
  }
  &__copy {
    margin-left: auto;
  }
  &__output {
    @include custom-scrollbar;
    margin: 0;
    background: var(--code);
    color: #dbeafe;
    white-space: pre;
    overflow: auto;
    border-radius: 12px;
    padding: 24px;
    font-size: 12px;
    line-height: 1.8;
    max-height: 500px;
  }
  &__type {
    color: var(--primary);
    background: var(--soft);
    border-radius: 9999px;
    padding: 3px 9px;
    font-size: 10px;
  }
  table {
    font-size: 12px;
    caption {
      text-align: left;
      color: var(--muted);
      font-size: 11px;
      padding: 10px 0;
    }
    td {
      min-width: 130px;
    }
    td:nth-child(2) {
      min-width: 230px;
    }
  }
  &__review {
    padding: 18px;
    border: 1px solid var(--border);
    border-radius: 12px;
    h4 {
      font-size: 12px;
    }
    p,
    ul {
      font-size: 11px;
      color: var(--muted);
      margin-top: 8px;
    }
    ul {
      padding-left: 18px;
      li + li {
        margin-top: 6px;
      }
    }
  }
  &__stale {
    font-size: 12px;
    color: #a16207;
    background: #f59e0b14;
    border-radius: 8px;
    padding: 12px;
  }
  &__empty {
    display: grid;
    justify-items: center;
    gap: 10px;
    padding: 35px 15px;
    border: 1px dashed var(--border);
    border-radius: 12px;
    text-align: center;
    color: var(--caption);
    h4 {
      color: var(--muted);
      font-size: 14px;
    }
    p,
    code {
      font-size: 11px;
      overflow-wrap: anywhere;
      max-width: 100%;
    }
  }
  @include responsive(mobile) {
    &__intro h3 {
      font-size: 16px;
    }
    &__connection,
    &__section-heading {
      flex-wrap: wrap;
    }
    &__options {
      grid-template-columns: 1fr;
    }
    &__output {
      padding: 16px;
    }
    &__input-caption {
      flex-wrap: wrap;
    }
  }
}
</style>
