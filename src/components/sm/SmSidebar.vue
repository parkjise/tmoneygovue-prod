<script setup>
import {
  FileText,
  ShieldCheck,
  Mail,
  Building2,
  Cpu,
  Plus,
  MessageSquare,
  Moon,
  Sun,
  Lock,
  X
} from 'lucide-vue-next';
import { agents, scenarioCards } from '@/data/smDemo';
defineProps({
  open: Boolean,
  dark: Boolean,
  dept: { type: String, required: true },
  activeAgent: String,
  history: { type: Array, required: true }
});
const emit = defineEmits(['close', 'reset', 'agent', 'scenario', 'conversation', 'theme']);
const icons = { FileText, ShieldCheck, Mail, Building2, Cpu };
</script>
<template>
  <aside
    id="sm-sidebar"
    class="sm-sidebar"
    :class="{ 'sm-sidebar--open': open }"
    aria-label="SM 업무 에이전트"
  >
    <header class="sm-sidebar__brand">
      <span class="sm-avatar">S</span>
      <div>
        <strong>
          SAMSUNG
          <small>Gauss</small>
        </strong>
        <p>Enterprise AI Assistant v2.4</p>
      </div>
      <button
        class="sm-icon-button sm-sidebar__close"
        aria-label="SM 메뉴 닫기"
        @click="emit('close')"
      >
        <X :size="18" />
      </button>
    </header>
    <div class="sm-sidebar__new">
      <button class="sm-button sm-button--primary" @click="emit('reset')">
        <Plus :size="16" />
        새 대화 시작 (New Chat)
      </button>
    </div>
    <div class="sm-sidebar__scroll">
      <section>
        <h2>
          사내 특화 에이전트
          <span>템플릿</span>
        </h2>
        <button
          v-for="agent in agents"
          :key="agent.id"
          class="sm-sidebar__agent"
          :class="{ 'is-active': activeAgent === agent.id }"
          :aria-pressed="activeAgent === agent.id"
          @click="emit('agent', agent)"
        >
          <span class="sm-sidebar__agent-icon">
            <component :is="icons[agent.icon]" :size="17" />
          </span>
          <span>
            <strong>{{ agent.title }}</strong>
            <small>{{ agent.description }}</small>
          </span>
        </button>
      </section>
      <section>
        <h2>
          최근 대화 내역
          <span>현재 화면</span>
        </h2>
        <button
          v-for="item in history"
          :key="item.id"
          class="sm-sidebar__history"
          @click="emit('conversation', item.id)"
        >
          <MessageSquare :size="14" />
          <span>{{ item.title }}</span>
        </button>
        <p v-if="!history.length" class="sm-sidebar__empty">
          새 대화를 시작하면 여기에 표시됩니다.
        </p>
      </section>
      <section>
        <h2>
          샘플 대화
          <span>4가지 시나리오</span>
        </h2>
        <button
          v-for="card in scenarioCards"
          :key="card.id"
          class="sm-sidebar__history"
          @click="emit('scenario', card.id)"
        >
          <MessageSquare :size="14" />
          <span>{{ card.title }}</span>
        </button>
      </section>
    </div>
    <footer class="sm-sidebar__footer">
      <div class="sm-sidebar__security">
        <Lock :size="14" />
        <strong>On-Premise 보안망</strong>
        <span>UI 데모</span>
      </div>
      <div class="sm-sidebar__profile">
        <span class="sm-avatar sm-avatar--muted">김삼</span>
        <div>
          <strong>김삼성 프로 (Knox 인증 UI)</strong>
          <p>{{ dept === 'DS' ? 'DS부문 메모리사업부' : 'DX부문 MX사업부' }}</p>
        </div>
        <button
          class="sm-icon-button"
          :aria-label="dark ? 'SM 라이트 모드' : 'SM 다크 모드'"
          @click="emit('theme')"
        >
          <Sun v-if="dark" :size="17" />
          <Moon v-else :size="17" />
        </button>
      </div>
    </footer>
  </aside>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/sm/mixins' as sm;
.sm-sidebar {
  width: 274px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--sm-surface);
  border-right: 1px solid var(--sm-border);
  min-height: 0;
  &__brand {
    @include sm.row(10px);
    padding: 21px 16px;
    border-bottom: 1px solid var(--sm-border);
    strong {
      font-size: 15px;
      letter-spacing: -0.4px;
    }
    small {
      font-size: 11px;
      padding: 3px 5px;
      border-radius: 4px;
      background: var(--sm-soft);
      color: var(--sm-accent);
    }
    p {
      margin: 4px 0 0;
      font-size: 10px;
      color: var(--sm-muted);
    }
  }
  &__close {
    display: none !important;
  }
  &__new {
    padding: 14px 12px;
    button {
      width: 100%;
    }
  }
  &__scroll {
    overflow-y: auto;
    flex: 1;
    min-height: 0;
    padding: 0 12px 20px;
    section + section {
      margin-top: 24px;
    }
    h2 {
      @include sm.row;
      justify-content: space-between;
      margin: 6px 7px 10px;
      font-size: 11px;
      color: var(--sm-muted);
      span {
        font-size: 10px;
        font-weight: 400;
      }
    }
  }
  &__agent {
    @include sm.row(10px);
    @include sm.flat-button;
    width: 100%;
    text-align: left;
    padding: 10px 8px;
    margin: 2px 0;
    &.is-active {
      background: var(--sm-soft);
    }
    > span:last-child {
      min-width: 0;
    }
    strong {
      display: block;
      font-size: 12px;
      line-height: 1.6;
    }
    small {
      display: block;
      color: var(--sm-muted);
      font-size: 10px;
    }
  }
  &__agent-icon {
    @include sm.center;
    color: var(--sm-accent);
    background: var(--sm-soft);
    width: 30px;
    height: 30px;
    border-radius: 8px;
    flex-shrink: 0;
  }
  &__history {
    @include sm.row(8px);
    @include sm.flat-button;
    width: 100%;
    text-align: left;
    padding: 9px 8px;
    font-size: 11px;
    color: var(--sm-muted);
    svg {
      flex-shrink: 0;
    }
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  &__empty {
    font-size: 11px;
    color: var(--sm-muted);
    padding: 0 8px;
    line-height: 1.7;
  }
  &__footer {
    padding: 12px;
    border-top: 1px solid var(--sm-border);
    background: var(--sm-canvas);
  }
  &__security {
    @include sm.panel(9px);
    @include sm.row(7px);
    padding: 10px;
    font-size: 10px;
    svg {
      color: #15966b;
    }
    span {
      margin-left: auto;
      color: var(--sm-accent);
    }
  }
  &__profile {
    @include sm.row(8px);
    margin-top: 12px;
    strong {
      font-size: 10px;
    }
    p {
      margin: 4px 0 0;
      color: var(--sm-muted);
      font-size: 10px;
    }
    button {
      margin-left: auto;
    }
  }
  @include sm.compact {
    display: none;
    width: min(290px, 87%);
    &--open {
      display: flex;
      position: absolute;
      inset: 0 auto 0 0;
      z-index: 5;
      box-shadow: 12px 0 30px #0002;
    }
    &__close {
      display: flex !important;
      margin-left: auto;
    }
  }
}
</style>
