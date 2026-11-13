<script setup>
import { ref, computed } from 'vue';
import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
  Plus,
  Bot,
  MessageSquare,
  Users,
  Zap,
  MoreHorizontal,
  Activity,
  Check,
  ExternalLink,
  Sparkles,
  Clock3
} from 'lucide-vue-next';
import ActivityChart from '@/components/common/ActivityChart.vue';
import BaseBadge from '@/components/common/BaseBadge.vue';
import BaseModal from '@/components/common/BaseModal.vue';
const period = ref('week');
const createOpen = ref(false);
const name = ref('');
const agentList = ref([
  {
    id: 1,
    name: 'Customer Support',
    description: '고객 문의를 더 빠르고 정확하게',
    icon: '◈',
    color: '#6366f1',
    runs: '12,486',
    rate: '98.2%',
    status: true
  },
  {
    id: 2,
    name: 'Content Creator',
    description: '아이디어를 매력적인 콘텐츠로',
    icon: '✧',
    color: '#e78cba',
    runs: '8,392',
    rate: '96.8%',
    status: true
  },
  {
    id: 3,
    name: 'Sales Assistant',
    description: '새로운 비즈니스 기회를 발견',
    icon: '↗',
    color: '#e7a95b',
    runs: '6,241',
    rate: '97.4%',
    status: true
  }
]);
const values = computed(() =>
  period.value === 'week'
    ? [28, 35, 31, 51, 46, 65, 53, 70, 65, 85, 76, 92]
    : [22, 40, 32, 56, 50, 42, 63, 58, 78, 67, 87, 98]
);
const stats = computed(() => [
  {
    label: 'Total conversations',
    value: period.value === 'week' ? '24,892' : '98,642',
    change: '+18.6%',
    icon: MessageSquare,
    color: 'violet',
    bars: [30, 45, 35, 58, 43, 70, 53, 78, 65, 88]
  },
  {
    label: 'Active AI agents',
    value: String(agentList.value.filter((a) => a.status).length + 9).padStart(2, '0'),
    change: '+2 agents',
    icon: Bot,
    color: 'blue',
    bars: [35, 35, 48, 48, 60, 60, 65, 65, 88, 88]
  },
  {
    label: 'Total contacts',
    value: '8,549',
    change: '+12.8%',
    icon: Users,
    color: 'orange',
    bars: [20, 34, 40, 31, 50, 65, 55, 70, 72, 90]
  },
  {
    label: 'Automation rate',
    value: '94.2%',
    change: '+5.2%',
    icon: Zap,
    color: 'green',
    bars: [36, 47, 32, 55, 50, 70, 55, 82, 75, 95]
  }
]);
function create() {
  if (!name.value.trim()) return;
  agentList.value.push({
    id: Date.now(),
    name: name.value.trim(),
    description: '새로운 커스텀 에이전트',
    icon: '✦',
    color: '#6366f1',
    runs: '0',
    rate: '—',
    status: true
  });
  name.value = '';
  createOpen.value = false;
}
</script>
<template>
  <section class="dashboard">
    <header class="dashboard__heading">
      <section>
        <div class="dashboard__eyebrow">
          <span />
          YOUR WORKSPACE, AT A GLANCE
        </div>
        <h1>
          조금 더 스마트한 하루를 시작하세요
          <span>✦</span>
        </h1>
        <p>Welcome back, Jise! 오늘의 에이전트와 워크스페이스 현황을 확인하세요.</p>
      </section>
      <div class="dashboard__controls">
        <label>
          <Clock3 :size="14" />
          <select v-model="period" aria-label="통계 기간">
            <option value="week">이번 주</option>
            <option value="month">이번 달</option>
          </select>
        </label>
        <button class="dashboard__primary" @click="createOpen = true">
          <Plus :size="15" />
          새 에이전트
        </button>
      </div>
    </header>
    <article class="dashboard__welcome">
      <section>
        <span class="dashboard__welcome-label">
          <Sparkles :size="13" />
          YOUR NEXT CHAPTER STARTS HERE
        </span>
        <h2>
          아이디어에 집중하세요.
          <br />
          나머지는 Vue가 도와줄게요.
        </h2>
        <p>
          작게 시작하고, 더 크게 만들어 보세요.
          <br />
          실무에 바로 쓰는 Vue 3 패턴과 컴포넌트가 준비되어 있어요.
        </p>
        <RouterLink to="/vue-syntax/conditional">
          레퍼런스 둘러보기
          <ArrowUpRight :size="15" />
        </RouterLink>
      </section>
      <figure class="dashboard__art" aria-label="컴포넌트와 코드를 표현한 일러스트">
        <div class="dashboard__orbit dashboard__orbit--one" />
        <div class="dashboard__orbit dashboard__orbit--two" />
        <div class="dashboard__floating dashboard__floating--code">
          <span>● ● ●</span>
          <code>
            &lt;script setup&gt;
            <br />
            &nbsp;const ideas = ref(∞)
            <br />
            &lt;/script&gt;
          </code>
        </div>
        <div class="dashboard__floating dashboard__floating--vue">
          <svg viewBox="0 0 100 85" role="img" aria-label="Vue 로고">
            <path d="M0 0h20l30 50L80 0h20L50 85Z" fill="#42b883" />
            <path d="M20 0h17l13 22L63 0h17L50 50Z" fill="#35495e" />
          </svg>
        </div>
        <div class="dashboard__floating dashboard__floating--success">
          <span>✓</span>
          Ready to build
          <small>Vue 3 + Composition API</small>
        </div>
        <i class="dashboard__spark dashboard__spark--one">✦</i>
        <i class="dashboard__spark dashboard__spark--two">✧</i>
      </figure>
      <span class="dashboard__welcome-tag">DESIGNED FOR DEVELOPERS ↗</span>
    </article>
    <section class="dashboard__stats" aria-label="주요 통계">
      <article v-for="stat in stats" :key="stat.label" class="dashboard__stat">
        <header>
          <span>{{ stat.label }}</span>
          <span class="dashboard__stat-icon" :class="`dashboard__stat-icon--${stat.color}`">
            <component :is="stat.icon" :size="17" />
          </span>
        </header>
        <strong>{{ stat.value }}</strong>
        <footer>
          <span>
            <ArrowUpRight :size="12" />
            {{ stat.change }}
          </span>
          <small>vs. last period</small>
          <svg viewBox="0 0 90 30" aria-hidden="true">
            <rect
              v-for="(bar, i) in stat.bars"
              :key="i"
              :x="i * 9"
              :y="30 - bar * 0.3"
              width="5"
              :height="bar * 0.3"
              rx="1.5"
              :fill="i > 6 ? '#818cf8' : '#dce0fd'"
            />
          </svg>
        </footer>
      </article>
    </section>
    <section class="dashboard__middle">
      <article class="dashboard__panel dashboard__activity">
        <header class="dashboard__panel-heading">
          <section>
            <h2>
              활동 개요
              <span class="dashboard__tiny-dot" />
            </h2>
            <p>에이전트가 만들어내는 변화를 확인하세요</p>
          </section>
          <select v-model="period" aria-label="차트 기간">
            <option value="week">이번 주</option>
            <option value="month">이번 달</option>
          </select>
        </header>
        <div class="dashboard__activity-stats">
          <strong>
            {{ period === 'week' ? '48,392' : '182,640' }}
            <small>total executions</small>
          </strong>
          <span>
            ↗ 24.8%
            <small>지난 기간 대비</small>
          </span>
          <div class="dashboard__legend">
            <span>이번 기간</span>
            <span>이전 기간</span>
          </div>
        </div>
        <ActivityChart :values="values" :height="215" />
      </article>
      <article class="dashboard__panel dashboard__performance">
        <header class="dashboard__panel-heading">
          <section>
            <h2>워크스페이스 성과</h2>
            <p>작은 자동화가 만드는 큰 차이</p>
          </section>
          <Activity :size="17" />
        </header>
        <figure class="dashboard__donut">
          <svg viewBox="0 0 160 160" role="img" aria-label="자동화 성공률 94.2퍼센트">
            <circle cx="80" cy="80" r="65" fill="none" stroke="var(--soft)" stroke-width="12" />
            <circle
              cx="80"
              cy="80"
              r="65"
              fill="none"
              stroke="#818cf8"
              stroke-width="12"
              stroke-linecap="round"
              stroke-dasharray="385 409"
              transform="rotate(-90 80 80)"
            />
          </svg>
          <figcaption>
            <strong>
              94.2
              <small>%</small>
            </strong>
            <span>성공적으로 완료</span>
          </figcaption>
        </figure>
        <div class="dashboard__performance-row">
          <span>
            <i />
            성공한 실행
          </span>
          <strong>45,585</strong>
        </div>
        <div class="dashboard__performance-row">
          <span>
            <i />
            검토가 필요한 실행
          </span>
          <strong>2,807</strong>
        </div>
        <footer>
          <Check :size="13" />
          지난주보다 5.2% 더 효율적이에요
        </footer>
      </article>
    </section>
    <section class="dashboard__bottom">
      <article class="dashboard__panel dashboard__agents">
        <header class="dashboard__panel-heading">
          <section>
            <h2>
              나의 AI 에이전트
              <small>{{ agentList.length }}</small>
            </h2>
            <p>함께 일하는 가장 든든한 팀원들</p>
          </section>
          <button @click="createOpen = true">
            에이전트 추가
            <Plus :size="13" />
          </button>
        </header>
        <div class="dashboard__table">
          <table>
            <thead>
              <tr>
                <th>에이전트</th>
                <th>상태</th>
                <th>실행 수</th>
                <th>성공률</th>
                <th><span class="dashboard__sr">상세</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="agent in agentList" :key="agent.id">
                <td>
                  <div class="dashboard__agent-name">
                    <span :style="{ background: agent.color + '18', color: agent.color }">
                      {{ agent.icon }}
                    </span>
                    <section>
                      <strong>{{ agent.name }}</strong>
                      <p>{{ agent.description }}</p>
                    </section>
                  </div>
                </td>
                <td>
                  <button
                    class="dashboard__status"
                    :aria-label="agent.name + ' 활성 상태 전환'"
                    @click="agent.status = !agent.status"
                  >
                    <BaseBadge :tone="agent.status ? 'success' : 'warning'">
                      ● {{ agent.status ? 'Active' : 'Paused' }}
                    </BaseBadge>
                  </button>
                </td>
                <td>{{ agent.runs }}</td>
                <td>{{ agent.rate }}</td>
                <td>
                  <RouterLink to="/apps/chat" :aria-label="agent.name + ' 채팅 열기'">
                    <ArrowUpRight :size="16" />
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
      <article class="dashboard__panel dashboard__quick">
        <header class="dashboard__panel-heading">
          <section>
            <h2>빠르게 시작하기</h2>
            <p>오늘은 무엇을 만들어 볼까요?</p>
          </section>
          <Zap :size="17" />
        </header>
        <RouterLink
          v-for="(item, i) in [
            {
              title: 'Vue 기본 문법',
              text: '기초부터 탄탄하게, 6가지 핵심 문법',
              path: '/vue-syntax/conditional',
              icon: '⌘'
            },
            {
              title: '실무 패턴 모음',
              text: '반복되는 고민, 검증된 패턴으로',
              path: '/vue-patterns/async',
              icon: '◈'
            },
            {
              title: 'UI 컴포넌트',
              text: '바로 가져다 쓰는 아름다운 UI',
              path: '/ui-kits/buttons',
              icon: '▦'
            }
          ]"
          :key="item.path"
          :to="item.path"
          class="dashboard__quick-link"
        >
          <span :class="`dashboard__quick-icon--${i}`">{{ item.icon }}</span>
          <section>
            <strong>{{ item.title }}</strong>
            <p>{{ item.text }}</p>
          </section>
          <ArrowRight :size="15" />
        </RouterLink>
        <footer>
          <span>✧</span>
          모든 예제에 소스 코드가 포함되어 있어요.
        </footer>
      </article>
    </section>
    <BaseModal v-model="createOpen" title="새 AI 에이전트">
      <form class="demo" @submit.prevent="create">
        <label class="demo__field">
          에이전트 이름
          <input v-model="name" required maxlength="60" placeholder="예: Research Assistant" />
        </label>
        <p class="demo__muted">이 데모의 에이전트는 현재 세션에서 관리됩니다.</p>
        <button class="demo__primary" type="submit" :disabled="!name.trim()">에이전트 생성</button>
      </form>
    </BaseModal>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.dashboard {
  display: grid;
  gap: 23px;
  &__heading {
    @include flex-between;
    align-items: flex-end;
    h1 {
      font-size: 23px;
      font-weight: 650;
      letter-spacing: -0.9px;
      line-height: 1.5;
      span {
        color: #b8a4e4;
        font-size: 24px;
      }
    }
    p {
      font-size: 11px;
      color: var(--caption);
      margin-top: 7px;
    }
  }
  &__eyebrow {
    font-size: 8px;
    letter-spacing: 1.5px;
    color: var(--muted);
    margin-bottom: 9px;
    display: flex;
    align-items: center;
    gap: 7px;
    span {
      width: 5px;
      height: 5px;
      background: var(--success);
      border-radius: 50%;
    }
  }
  &__controls {
    display: flex;
    gap: 9px;
    flex-shrink: 0;
    label {
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0 10px;
      background: var(--surface);
      color: var(--muted);
    }
    select {
      border: 0;
      padding: 8px 2px;
      font-size: 10px;
    }
    button {
      font-size: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
  &__primary {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
    box-shadow: 0 4px 10px #6366f122;
  }
  &__welcome {
    position: relative;
    overflow: hidden;
    min-height: 230px;
    background: linear-gradient(110deg, #efedff, #f2effc 52%, #e9e8fb);
    border: 1px solid #e6e1fc;
    border-radius: 16px;
    padding: 28px 32px;
    color: #343151;
    display: flex;
    align-items: center;
    section {
      position: relative;
      z-index: 2;
    }
    h2 {
      font-size: 25px;
      letter-spacing: -0.8px;
      line-height: 1.45;
      margin: 10px 0;
    }
    p {
      font-size: 11px;
      color: #85809c;
      line-height: 1.8;
    }
    a {
      display: inline-flex;
      gap: 16px;
      align-items: center;
      background: white;
      border: 1px solid #e1dcf3;
      padding: 8px 13px;
      border-radius: 7px;
      font-size: 10px;
      font-weight: 650;
      margin-top: 15px;
    }
  }
  &__welcome-label {
    font-size: 8px;
    letter-spacing: 1.4px;
    display: flex;
    align-items: center;
    gap: 6px;
    color: #8c7fb3;
  }
  &__welcome-tag {
    position: absolute;
    right: 18px;
    bottom: 14px;
    font-size: 7px;
    letter-spacing: 1.3px;
    color: #a9a0c5;
  }
  &__art {
    position: absolute;
    right: 25px;
    top: 0;
    width: 440px;
    height: 100%;
    margin: 0;
    perspective: 800px;
  }
  &__orbit {
    position: absolute;
    width: 320px;
    height: 320px;
    border: 1px solid #d8d2ef99;
    border-radius: 50%;
    left: 80px;
    top: -10px;
    &--two {
      width: 420px;
      height: 420px;
      left: 30px;
      top: -60px;
    }
  }
  &__floating {
    position: absolute;
    border: 1px solid #fff;
    background: #ffffffda;
    box-shadow: 0 15px 35px #8b7bae20;
    backdrop-filter: blur(8px);
    &--code {
      left: 20px;
      top: 50px;
      transform: rotate(-7deg);
      width: 210px;
      border-radius: 11px;
      padding: 14px;
      span {
        display: block;
        font-size: 7px;
        color: #c4badc;
        margin-bottom: 10px;
      }
      code {
        font-size: 11px;
        color: #9383b5;
        line-height: 1.9;
      }
    }
    &--vue {
      right: 45px;
      top: 42px;
      width: 118px;
      height: 125px;
      transform: rotate(12deg);
      border-radius: 22px;
      display: grid;
      place-items: center;
      svg {
        width: 72px;
      }
    }
    &--success {
      right: 100px;
      bottom: 24px;
      transform: rotate(-5deg);
      padding: 10px 18px 10px 42px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 600;
      span {
        position: absolute;
        left: 12px;
        top: 14px;
        background: #d9f9ec;
        color: #10b981;
        border-radius: 50%;
        padding: 0 4px;
      }
      small {
        display: block;
        color: #b1a7c8;
        font-size: 8px;
        font-weight: 400;
      }
    }
  }
  &__spark {
    position: absolute;
    color: #a290cf;
    font-style: normal;
    &--one {
      left: 0;
      bottom: 32px;
      font-size: 26px;
    }
    &--two {
      right: 9px;
      top: 24px;
      font-size: 38px;
    }
  }
  &__stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }
  &__stat {
    @include card-surface;
    padding: 18px 20px;
    header {
      @include flex-between;
      font-size: 10px;
      color: var(--muted);
    }
    > strong {
      display: block;
      font-size: 27px;
      letter-spacing: -0.7px;
      font-weight: 650;
      margin-top: 8px;
    }
    footer {
      display: flex;
      align-items: flex-end;
      gap: 5px;
      margin-top: 7px;
      position: relative;
      span {
        display: flex;
        align-items: center;
        gap: 2px;
        color: #10b981;
        font-size: 9px;
      }
      small {
        font-size: 8px;
        color: var(--caption);
      }
      > svg:last-child {
        margin-left: auto;
        width: 60px;
        height: 25px;
      }
    }
  }
  &__stat-icon {
    padding: 6px;
    border-radius: 8px;
    display: flex;
    &--violet {
      color: #8170dc;
      background: #f2efff;
    }
    &--blue {
      color: #63a1de;
      background: #edf5ff;
    }
    &--orange {
      color: #df9e54;
      background: #fff5e9;
    }
    &--green {
      color: #51b89c;
      background: #eafaf3;
    }
  }
  &__middle {
    display: grid;
    grid-template-columns: minmax(0, 1.95fr) minmax(260px, 1fr);
    gap: 22px;
  }
  &__panel {
    @include card-surface;
    overflow: hidden;
    padding: 21px 24px;
  }
  &__panel-heading {
    @include flex-between;
    align-items: flex-start;
    h2 {
      font-size: 13px;
      font-weight: 650;
      display: flex;
      align-items: center;
      gap: 7px;
      small {
        font-size: 9px;
        background: var(--soft);
        color: var(--primary);
        padding: 1px 5px;
        border-radius: 4px;
      }
    }
    p {
      font-size: 9px;
      color: var(--caption);
      margin-top: 4px;
    }
    select,
    button {
      font-size: 9px;
      padding: 5px 9px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    > svg {
      color: var(--caption);
    }
  }
  &__tiny-dot {
    background: var(--success);
    border-radius: 50%;
    width: 5px;
    height: 5px;
  }
  &__activity-stats {
    display: flex;
    align-items: center;
    gap: 18px;
    margin: 19px 0 10px;
    strong {
      font-size: 23px;
      font-weight: 650;
      small {
        display: block;
        font-weight: 400;
        font-size: 9px;
        color: var(--caption);
      }
    }
    > span {
      font-size: 10px;
      color: var(--success);
      small {
        display: block;
        font-size: 8px;
        color: var(--caption);
      }
    }
  }
  &__legend {
    margin-left: auto;
    font-size: 8px;
    color: var(--muted);
    display: flex;
    gap: 12px;
    span::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--primary);
      margin-right: 5px;
    }
    span:last-child::before {
      background: #c7b4e9;
    }
  }
  &__donut {
    position: relative;
    width: 168px;
    height: 168px;
    margin: 17px auto 12px;
    svg {
      width: 100%;
    }
    figcaption {
      position: absolute;
      inset: 0;
      @include flex-center;
      flex-direction: column;
      strong {
        font-size: 30px;
        font-weight: 650;
        small {
          font-size: 18px;
        }
      }
      span {
        font-size: 9px;
        color: var(--caption);
      }
    }
  }
  &__performance-row {
    @include flex-between;
    font-size: 10px;
    margin: 9px 0;
    span {
      color: var(--muted);
      display: flex;
      align-items: center;
      gap: 7px;
    }
    i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #818cf8;
    }
    &:last-of-type i {
      background: #e8e6f5;
    }
    strong {
      font-size: 10px;
      font-weight: 600;
    }
  }
  &__performance footer {
    border-top: 1px solid var(--border);
    margin-top: 13px;
    padding-top: 10px;
    font-size: 9px;
    color: var(--success);
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
  }
  &__bottom {
    display: grid;
    grid-template-columns: minmax(0, 1.95fr) minmax(260px, 1fr);
    gap: 22px;
  }
  &__agents {
    padding-bottom: 6px;
  }
  &__table {
    position: relative;
    overflow: auto;
    margin: 17px -24px 0;
    table {
      font-size: 10px;
      white-space: nowrap;
    }
    th {
      font-size: 8px;
      font-weight: 500;
      padding: 9px 20px;
    }
    td {
      padding: 13px 20px;
    }
    tbody tr:last-child td {
      border-bottom: 0;
    }
  }
  &__agent-name {
    display: flex;
    align-items: center;
    gap: 10px;
    > span {
      display: grid;
      place-items: center;
      width: 33px;
      height: 33px;
      border-radius: 9px;
      font-size: 20px;
    }
    strong {
      font-size: 10px;
      font-weight: 600;
    }
    p {
      font-size: 8px;
      color: var(--caption);
      margin-top: 3px;
    }
  }
  &__status {
    padding: 0;
    border: 0;
    background: none;
  }
  &__quick-link {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 15px 0;
    border-bottom: 1px solid var(--border);
    > span {
      display: grid;
      place-items: center;
      width: 33px;
      height: 33px;
      border-radius: 9px;
      background: var(--soft);
      color: #9b87cc;
      font-size: 19px;
    }
    strong {
      font-size: 10px;
      font-weight: 600;
    }
    p {
      font-size: 8px;
      color: var(--caption);
      margin-top: 3px;
    }
    svg {
      margin-left: auto;
      color: var(--caption);
    }
  }
  &__quick-icon--1 {
    background: #eef6ff !important;
    color: #7aa3cd !important;
  }
  &__quick-icon--2 {
    background: #fff5e9 !important;
    color: #d5a36b !important;
  }
  &__quick footer {
    font-size: 8px;
    color: var(--caption);
    display: flex;
    gap: 5px;
    align-items: center;
    padding-top: 13px;
    span {
      color: var(--primary);
      font-size: 15px;
    }
  }
  &__sr {
    left: 0;
    top: 0;
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
  @include responsive(tablet) {
    &__heading {
      align-items: flex-start;
      h1 {
        font-size: 19px;
      }
    }
    &__art {
      right: -50px;
      transform: scale(0.85);
    }
    &__stats {
      grid-template-columns: repeat(2, 1fr);
    }
    &__middle,
    &__bottom {
      grid-template-columns: 1fr 1fr;
    }
    &__legend {
      display: none;
    }
    &__panel {
      padding: 20px;
    }
  }
  @include responsive(mobile) {
    gap: 18px;
    &__heading {
      flex-direction: column;
      gap: 15px;
      h1 {
        font-size: 20px;
      }
    }
    &__welcome {
      padding: 24px;
      min-height: 250px;
      h2 {
        font-size: 24px;
      }
    }
    &__art {
      opacity: 0.25;
      right: -140px;
    }
    &__welcome-tag {
      display: none;
    }
    &__stats {
      gap: 10px;
    }
    &__stat {
      padding: 15px;
      footer {
        flex-wrap: wrap;
        > svg:last-child {
          display: none;
        }
      }
    }
    &__middle,
    &__bottom {
      grid-template-columns: 1fr;
    }
    &__controls {
      width: 100%;
      justify-content: space-between;
    }
    &__panel-heading h2 {
      font-size: 14px;
    }
  }
}
</style>
