<script setup>
import { computed, ref } from 'vue';
import {
  Menu,
  Sparkles,
  Lock,
  Shield,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Paperclip,
  ScanEye,
  Send,
  X,
  FileCheck2
} from 'lucide-vue-next';
import SmSidebar from '@/components/sm/SmSidebar.vue';
import SmMessage from '@/components/sm/SmMessage.vue';
import { models, scenarioCards } from '@/data/smDemo';
import { useSmChat } from '@/composables/useSmChat';
import { useTheme } from '@/composables/useTheme';
const { theme, toggle } = useTheme();
const {
  dept,
  modelId,
  activeAgent,
  draft,
  attachment,
  busy,
  notice,
  composer,
  chatBody,
  messages,
  history,
  sensitive,
  showNotice,
  reset,
  selectConversation,
  selectAgent,
  send,
  loadScenario,
  applyMasking,
  securityDemo,
  rateAnswer
} = useSmChat();
const sidebarOpen = ref(false);
const bannerVisible = ref(true);
const fileInput = ref(null);
const model = computed(() => models.find((item) => item.id === modelId.value));
function closeSidebar() {
  sidebarOpen.value = false;
}
function newChat() {
  reset();
  closeSidebar();
}
function chooseAgent(agent) {
  selectAgent(agent);
  closeSidebar();
}
function chooseScenario(id) {
  loadScenario(id, model.value.name);
  closeSidebar();
}
function chooseConversation(id) {
  selectConversation(id);
  closeSidebar();
}
function handleEnter(event) {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    send(model.value.name);
  }
}
function attachFile(event) {
  const file = event.target.files?.[0];
  if (file) {
    attachment.value = file.name;
    showNotice('파일명만 첨부했습니다. 내용은 읽거나 서버에 올리지 않습니다.');
  }
  event.target.value = '';
}
</script>
<template>
  <section
    class="sm-portal"
    :class="{ 'sm-portal--dark': theme === 'dark' }"
    aria-label="SM Samsung Gauss Enterprise 데모"
    @keydown.esc="closeSidebar"
  >
    <div class="sm-portal__demo">
      <span>SM · INTERACTIVE WIREFRAME</span>
      <p>UI 데모 · 샘플 답변 / 인증·사내 문서·보안망 연동 없음</p>
    </div>
    <div class="sm-portal__workspace">
      <button
        v-if="sidebarOpen"
        class="sm-portal__overlay"
        aria-label="SM 메뉴 배경 닫기"
        @click="closeSidebar"
      />
      <SmSidebar
        :open="sidebarOpen"
        :dark="theme === 'dark'"
        :dept="dept"
        :active-agent="activeAgent"
        :history="history"
        @close="closeSidebar"
        @reset="newChat"
        @agent="chooseAgent"
        @scenario="chooseScenario"
        @conversation="chooseConversation"
        @theme="toggle"
      />
      <div class="sm-portal__main">
        <header class="sm-portal__header">
          <div class="sm-portal__model">
            <button
              class="sm-icon-button sm-portal__menu"
              aria-label="SM 업무 메뉴 열기"
              :aria-expanded="sidebarOpen"
              aria-controls="sm-sidebar"
              @click="sidebarOpen = !sidebarOpen"
            >
              <Menu :size="20" />
            </button>
            <Sparkles :size="18" />
            <div>
              <label for="sm-model">업무 모델 선택</label>
              <select
                id="sm-model"
                v-model="modelId"
                @change="showNotice('선택한 모델의 UI로 전환했습니다.')"
              >
                <option v-for="item in models" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <span class="sm-portal__model-level">{{ model.level }}</span>
          </div>
          <div class="sm-portal__permissions">
            <div class="sm-portal__dept" role="group" aria-label="부문 권한 시뮬레이션">
              <button
                v-for="item in ['DS', 'DX']"
                :key="item"
                :aria-pressed="dept === item"
                @click="dept = item"
              >
                {{ item }}부문 권한
              </button>
            </div>
            <span class="sm-portal__lock">
              <Lock :size="13" />
              DLP 데모
            </span>
          </div>
        </header>
        <aside v-if="bannerVisible" class="sm-portal__banner">
          <AlertTriangle :size="16" />
          <p>
            <strong>[사내 보안 규정 준수 안내 UI]</strong>
            외부 반출 금지 및 미인가 기밀 입력 주의 안내 영역입니다. 아래 예시는 실제 사내 자료가
            아닌 와이어프레임 샘플입니다.
          </p>
          <button @click="bannerVisible = false">확인</button>
        </aside>
        <div
          ref="chatBody"
          class="sm-portal__chat"
          role="region"
          aria-label="SM 대화 내용"
          tabindex="0"
        >
          <div class="sm-portal__chat-inner">
            <section v-if="!messages.length" class="sm-welcome">
              <header>
                <span class="sm-welcome__badge">
                  <Shield :size="14" />
                  {{ dept }}부문 임직원 전용 보안 AI 환경 · 데모
                </span>
                <h1>
                  안녕하세요,
                  <em>김삼성 프로</em>
                  님.
                  <br />
                  오늘 어떤 업무를 도와드릴까요?
                </h1>
                <p>
                  사내 Confluence, Knox 메일, 기술 표준 문서를 활용하는
                  <br />
                  Samsung Gauss Enterprise의 업무 흐름을 체험해 보세요.
                </p>
              </header>
              <div class="sm-welcome__cards">
                <button
                  v-for="card in scenarioCards"
                  :key="card.id"
                  :disabled="busy"
                  @click="chooseScenario(card.id)"
                >
                  <span>
                    {{ card.category }}
                    <ArrowUpRight :size="16" />
                  </span>
                  <h2>{{ card.title }}</h2>
                  <p>{{ card.description }}</p>
                </button>
              </div>
              <div class="sm-welcome__integrations">
                <span>
                  <CheckCircle2 :size="14" />
                  Confluence 지식 검색 UI
                </span>
                <span>
                  <CheckCircle2 :size="14" />
                  개인정보 마스킹 시연
                </span>
                <span>
                  <CheckCircle2 :size="14" />
                  외부 API 호출 없음
                </span>
              </div>
            </section>
            <section v-else aria-label="질문과 답변">
              <SmMessage
                v-for="message in messages"
                :key="message.id"
                :message="message"
                @notice="showNotice"
                @feedback="rateAnswer"
              />
            </section>
            <div v-if="busy" class="sm-portal__loading" role="status">
              <span class="sm-avatar">G</span>
              <div>
                <span class="sm-portal__dots">
                  <i />
                  <i />
                  <i />
                </span>
                샘플 답변을 준비하고 있습니다…
              </div>
            </div>
          </div>
        </div>
        <footer class="sm-composer">
          <div class="sm-composer__inner">
            <aside v-if="sensitive" class="sm-composer__alert" role="alert">
              <div>
                <Shield :size="17" />
                <p>
                  <strong>[보안 필터 감지 데모]</strong>
                  개인정보 또는 기밀 키워드가 감지되었습니다. 마스킹 후 전송해 주세요.
                </p>
              </div>
              <div>
                <button class="sm-button sm-button--danger" @click="applyMasking">
                  자동 마스킹 적용
                </button>
                <button class="sm-button" @click="draft = ''">입력 취소</button>
              </div>
            </aside>
            <div v-if="attachment" class="sm-composer__attachment">
              <FileCheck2 :size="16" />
              <span>{{ attachment }}</span>
              <small>파일명 첨부 · 업로드 없음</small>
              <button class="sm-icon-button" aria-label="첨부 삭제" @click="attachment = ''">
                <X :size="14" />
              </button>
            </div>
            <form class="sm-composer__box" @submit.prevent="send(model.name)">
              <label class="sm-sr-only" for="sm-prompt">Samsung Gauss 업무 질문</label>
              <textarea
                id="sm-prompt"
                ref="composer"
                v-model="draft"
                maxlength="8000"
                rows="2"
                placeholder="Samsung Gauss에게 업무 질문을 입력하세요… (Shift + Enter로 줄바꿈)"
                @keydown="handleEnter"
              />
              <div class="sm-composer__toolbar">
                <div>
                  <input
                    ref="fileInput"
                    type="file"
                    hidden
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.md,.csv"
                    @change="attachFile"
                  />
                  <button type="button" class="sm-button" @click="fileInput.click()">
                    <Paperclip :size="14" />
                    문서 첨부
                  </button>
                  <button type="button" class="sm-button sm-button--demo" @click="securityDemo">
                    <ScanEye :size="14" />
                    보안 필터 감지 데모
                  </button>
                </div>
                <button
                  type="submit"
                  class="sm-button sm-button--primary"
                  :disabled="busy || !draft.trim()"
                >
                  <span>{{ busy ? '응답 중' : '전송' }}</span>
                  <Send :size="14" />
                </button>
              </div>
            </form>
            <p class="sm-composer__note">
              {{ model.description }} · 입력·대화는 현재 페이지에서만 유지됩니다.
            </p>
          </div>
        </footer>
      </div>
    </div>
    <div v-if="notice" class="sm-portal__toast" role="status">
      <CheckCircle2 :size="16" />
      {{ notice }}
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/sm/portal';
</style>
