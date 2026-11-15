const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/data-async-BHNFat2a.js","assets/index-CtpgpxSo.js","assets/index-BzE-D0F1.css","assets/data-async-BTp-jUIc.css","assets/data-cart-Bix5uMKv.js","assets/data-cart-l4VMH538.css","assets/data-debounce-DGe-IKlC.js","assets/data-debounce-C90rJmoL.css","assets/data-search-C301vXpe.js","assets/data-search-DQIWQId7.css","assets/data-sort-CPwMSX39.js","assets/data-sort-CuTw7l_W.css","assets/data-timer-C53jadFu.js","assets/data-timer-D_QdjGX1.css","assets/for-cards-B9k7Jea7.js","assets/for-cards-XX2qaauV.css","assets/for-groups-CG2yxQ1P.js","assets/for-groups-_FeVXVE-.css","assets/for-keys-DI_FNLxF.js","assets/for-keys-BG94b0tA.css","assets/for-nested-D2hRUu2j.js","assets/for-nested-p6gKJ5hv.css","assets/for-options-BprXn2PN.js","assets/for-options-Bc60e7FH.css","assets/for-pages-BwnWF9wm.js","assets/for-pages-C42_rqJp.css","assets/for-table-DAP09b3A.js","assets/for-table-HxQIJht7.css","assets/for-todo-dXBkx4Hd.js","assets/for-todo-Bs_nyqTN.css","assets/form-count-Bc0YUuww.js","assets/form-count-Dt-rchgM.css","assets/form-dependent-D1JtV07f.js","assets/form-dependent-RUwm-KXp.css","assets/form-dynamic-DurGHuM5.js","assets/form-dynamic-DBNbchla.css","assets/form-password-DBnoBPkc.js","assets/form-password-CMetYHoO.css","assets/form-selectall-Cvg068ap.js","assets/form-selectall-bEUwYo80.css","assets/form-validation-BNUWZLSD.js","assets/form-validation-ktpaATEE.css","assets/if-empty-B9W4osuE.js","assets/if-empty-B3ZDBfi1.css","assets/if-error-BgWLVsTy.js","assets/if-error-BEUk27G_.css","assets/if-loading-BdFggIXc.js","assets/if-loading-CR1N7yvT.css","assets/if-login-BB6XtX7S.js","assets/if-login-CbusJvWA.css","assets/if-role-CKPNQMU2.js","assets/if-role-BqFHn-Rc.css","assets/if-show-BTELO0cI.js","assets/if-show-kPRykNrZ.css","assets/if-step-BBfLNzp_.js","assets/if-step-C0-qRwsc.css","assets/if-stock-DvCV7YJl.js","assets/if-stock-gxGz2Z5t.css","assets/ui-accordion-D0nQIl-m.js","assets/ui-accordion-DXyCydUA.css","assets/ui-chips-DBB2CGvY.js","assets/ui-chips-C8wxv7oE.css","assets/ui-counter-CNdFbLlm.js","assets/ui-counter-9pUF3Vm2.css","assets/ui-dropdown-Iyz7kdJ5.js","assets/ui-dropdown-BbUXHBVI.css","assets/ui-like-B9wh4HV6.js","assets/ui-like-B9gyLxXZ.css","assets/ui-modal-B9vtIbfU.js","assets/ui-modal-B6ECwLIJ.css","assets/ui-readmore-B-P1xxks.js","assets/ui-readmore-BJR_D4tI.css","assets/ui-scroll-Cihm11B1.js","assets/ui-scroll-DjqtzP-J.css","assets/ui-tabs-_0w8V-xj.js","assets/ui-tabs-D1cx93uQ.css","assets/ui-toast-DU3QPW16.js","assets/ui-toast-DDZj_b5H.css","assets/ui-toggle-1EAcg1A0.js","assets/ui-toggle-3C4nwMaY.css","assets/ui-tooltip-C5gljIn6.js","assets/ui-tooltip-BZBMlvMj.css"])))=>i.map(i=>d[i]);
import{_ as j,j as h,A as T,a9 as B,aa as G,o as t,a,b as o,e as m,F as c,r as g,u,t as p,w as E,v as J,h as L,m as O,K as Q,f as A,d as P,X as W,g as X,ab as K,ac as r,k as y,I as z}from"./index-CtpgpxSo.js";import{c as Y}from"./practicePreview-Bu5WPp9y.js";import F from"./SyntaxCode-DYMb2raW.js";const Z=`<script setup>
import { ref, onUnmounted } from 'vue';
const loading = ref(false);
const fail = ref(false);
const error = ref('');
const rows = ref([]);
const loaded = ref(false);
let timer;
function load() {
  if (loading.value) return;
  const shouldFail = fail.value;
  loading.value = true;
  error.value = '';
  loaded.value = false;
  rows.value = [];
  timer = setTimeout(() => {
    if (shouldFail) error.value = '조회에 실패했습니다. 다시 시도하세요.';
    else {
      rows.value = ['컴포넌트 설계', '접근성 검토'];
      loaded.value = true;
    }
    loading.value = false;
  }, 650);
}
onUnmounted(() => clearTimeout(timer));
<\/script>
<template>
  <section class="workshop">
    <label>
      <input v-model="fail" :disabled="loading" type="checkbox" />
      실패 테스트
    </label>
    <button :disabled="loading" @click="load">{{ loading ? '조회 중…' : '조회 / 재시도' }}</button>
    <p v-if="loading" role="status">불러오는 중입니다.</p>
    <p v-else-if="error" class="error" role="alert">{{ error }}</p>
    <ul v-else-if="loaded">
      <li v-for="row in rows" :key="row">{{ row }}</li>
    </ul>
    <p v-else>조회 전입니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,nn=`<script setup>
import { ref, computed } from 'vue';
const items = ref([
  { id: 1, name: '키보드', price: 30000, quantity: 1 },
  { id: 2, name: '마우스', price: 18000, quantity: 1 }
]);
function setQuantity(item, event) {
  const number = Number(event.target.value);
  item.quantity = Number.isFinite(number) ? Math.min(5, Math.max(1, Math.trunc(number))) : 1;
  event.target.value = String(item.quantity);
}
const total = computed(() =>
  items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
<\/script>
<template>
  <section class="workshop">
    <label v-for="item in items" :key="item.id">
      {{ item.name }} · {{ item.price.toLocaleString() }}원
      <input
        type="number"
        :value="item.quantity"
        min="1"
        max="5"
        step="1"
        @input="setQuantity(item, $event)"
      />
    </label>
    <output>합계 {{ total.toLocaleString() }}원</output>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,on=`<script setup>
import { ref, computed, watch } from 'vue';
const input = ref('');
const query = ref('');
const waiting = ref(false);
const items = ['Vue Guide', 'Vite Build', 'Vue Router'];
watch(input, (value, _old, onCleanup) => {
  waiting.value = true;
  const timer = setTimeout(() => {
    query.value = value.trim();
    waiting.value = false;
  }, 350);
  onCleanup(() => clearTimeout(timer));
});
const results = computed(() =>
  items.filter((item) => item.toLowerCase().includes(query.value.toLowerCase()))
);
<\/script>
<template>
  <section class="workshop">
    <label>
      검색
      <input v-model="input" placeholder="Vue" />
    </label>
    <p role="status">{{ waiting ? '입력 대기 중…' : results.length + '개 결과' }}</p>
    <ul>
      <li v-for="item in results" :key="item">{{ item }}</li>
    </ul>
    <p v-if="!results.length">검색 결과가 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,rn=`<script setup>
import { ref, computed } from 'vue';
const query = ref('');
const items = [
  { id: 1, name: 'Vue Guide' },
  { id: 2, name: 'Vite Build' },
  { id: 3, name: 'Vue Router' }
];
const filtered = computed(() => {
  const keyword = query.value.trim().toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(keyword));
});
<\/script>
<template>
  <section class="workshop">
    <label>
      검색
      <input v-model="query" placeholder="Vue" />
    </label>
    <p>{{ filtered.length }}개 결과</p>
    <ul v-if="filtered.length">
      <li v-for="item in filtered" :key="item.id">{{ item.name }}</li>
    </ul>
    <p v-else class="muted">검색 결과가 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,en=`<script setup>
import { ref, computed } from 'vue';
const order = ref('asc');
const products = [
  { id: 1, name: '키보드', price: 30000 },
  { id: 2, name: '마우스', price: 18000 },
  { id: 3, name: '모니터', price: 180000 }
];
const sorted = computed(() =>
  [...products].sort((a, b) => (order.value === 'asc' ? a.price - b.price : b.price - a.price))
);
<\/script>
<template>
  <section class="workshop">
    <label>
      정렬
      <select v-model="order">
        <option value="asc">낮은 가격순</option>
        <option value="desc">높은 가격순</option>
      </select>
    </label>
    <ul>
      <li v-for="product in sorted" :key="product.id">
        {{ product.name }} · {{ product.price.toLocaleString() }}원
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,pn=`<script setup>
import { ref, onUnmounted } from 'vue';
const seconds = ref(0);
const running = ref(false);
let timer;
function start() {
  if (running.value) return;
  running.value = true;
  timer = setInterval(() => {
    seconds.value++;
  }, 1000);
}
function pause() {
  clearInterval(timer);
  timer = undefined;
  running.value = false;
}
function reset() {
  pause();
  seconds.value = 0;
}
onUnmounted(pause);
<\/script>
<template>
  <section class="workshop">
    <output aria-live="off">{{ seconds }}초</output>
    <div class="row">
      <button :disabled="running" @click="start">시작</button>
      <button :disabled="!running" @click="pause">일시정지</button>
      <button @click="reset">초기화</button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,tn=`<script setup>
import { ref } from 'vue';
const products = ref([
  { id: 1, name: '키보드', price: 30000 },
  { id: 2, name: '마우스', price: 18000 }
]);
let nextId = 3;
function add() {
  products.value.push({ id: nextId++, name: '새 상품', price: 12000 });
}
<\/script>
<template>
  <section class="workshop">
    <article v-for="product in products" :key="product.id" class="box">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price.toLocaleString() }}원</p>
    </article>
    <button @click="add">상품 추가</button>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,dn=`<script setup>
import { ref } from 'vue';
const days = ref([
  { id: 1, label: '월요일', tasks: ['코드 리뷰', '팀 회의'] },
  { id: 2, label: '화요일', tasks: [] }
]);
<\/script>
<template>
  <section class="workshop">
    <article v-for="day in days" :key="day.id" class="box">
      <h3>{{ day.label }} · {{ day.tasks.length }}개</h3>
      <ul v-if="day.tasks.length">
        <li v-for="(task, index) in day.tasks" :key="day.id + '-' + index">{{ task }}</li>
      </ul>
      <p v-else class="muted">일정이 없습니다.</p>
    </article>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,an=`<script setup>
import { ref } from 'vue';
const people = ref([
  { id: 1, name: '민지' },
  { id: 2, name: '준호' }
]);
function reverse() {
  people.value = [...people.value].reverse();
}
<\/script>
<template>
  <section class="workshop">
    <button @click="reverse">순서 뒤집기</button>
    <ul>
      <li v-for="person in people" :key="person.id">
        #{{ person.id }}
        <input v-model="person.name" :aria-label="person.id + '번 이름'" />
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,sn=`<script setup>
import { ref } from 'vue';
const groups = ref([
  {
    id: 'dev',
    name: '개발',
    children: [
      { id: 'vue', name: 'Vue' },
      { id: 'scss', name: 'SCSS' }
    ]
  },
  { id: 'design', name: '디자인', children: [{ id: 'figma', name: 'Figma' }] }
]);
<\/script>
<template>
  <section class="workshop">
    <section v-for="group in groups" :key="group.id" class="box">
      <h3>{{ group.name }}</h3>
      <ul>
        <li v-for="child in group.children" :key="child.id">{{ child.name }}</li>
      </ul>
    </section>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,ln=`<script setup>
import { ref } from 'vue';
const region = ref('');
const regions = [
  { id: 'seoul', name: '서울' },
  { id: 'busan', name: '부산' },
  { id: 'jeju', name: '제주' }
];
<\/script>
<template>
  <section class="workshop">
    <label>
      지역
      <select v-model="region">
        <option disabled value="">지역 선택</option>
        <option v-for="item in regions" :key="item.id" :value="item.id">{{ item.name }}</option>
      </select>
    </label>
    <p>선택한 지역 ID: {{ region || '없음' }}</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,cn=`<script setup>
import { ref } from 'vue';
const page = ref(1);
const totalPages = 5;
<\/script>
<template>
  <section class="workshop">
    <nav class="row" aria-label="페이지 이동">
      <button
        v-for="number in totalPages"
        :key="number"
        :class="{ active: page === number }"
        :aria-current="page === number ? 'page' : undefined"
        @click="page = number"
      >
        {{ number }}
      </button>
    </nav>
    <p>현재 {{ page }}페이지</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,un=`<script setup>
import { ref } from 'vue';
const orders = ref([
  { id: 1, name: '노트북', done: false },
  { id: 2, name: '마우스', done: true }
]);
<\/script>
<template>
  <section class="workshop">
    <table>
      <caption>주문 목록</caption>
      <thead>
        <tr>
          <th scope="col">주문</th>
          <th scope="col">상태</th>
          <th scope="col">변경</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.name }}</td>
          <td :class="{ active: order.done }">{{ order.done ? '배송 완료' : '준비 중' }}</td>
          <td><button @click="order.done = !order.done">상태 전환</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,bn=`<script setup>
import { ref } from 'vue';
const input = ref('');
const tasks = ref([{ id: 1, name: 'Vue 복습' }]);
let nextId = 2;
function add() {
  const name = input.value.trim();
  if (!name) return;
  tasks.value.push({ id: nextId++, name });
  input.value = '';
}
function remove(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
}
<\/script>
<template>
  <section class="workshop">
    <form class="row" @submit.prevent="add">
      <label>
        할 일
        <input v-model="input" placeholder="새 할 일" />
      </label>
      <button type="submit">추가</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}
        <button @click="remove(task.id)">삭제</button>
      </li>
    </ul>
    <p v-if="!tasks.length">할 일이 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,hn=`<script setup>
import { ref, computed } from 'vue';
const bio = ref('');
const limit = 100;
const remaining = computed(() => limit - bio.value.length);
<\/script>
<template>
  <section class="workshop">
    <label>
      소개글
      <textarea v-model="bio" :maxlength="limit" rows="4"></textarea>
    </label>
    <p :class="{ error: remaining === 0 }">
      {{ bio.length }} / {{ limit }}자 · {{ remaining }}자 남음
    </p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,wn=`<script setup>
import { ref, computed, watch } from 'vue';
const city = ref('seoul');
const district = ref('');
const data = { seoul: ['강남구', '마포구'], busan: ['해운대구', '수영구'] };
const districts = computed(() => data[city.value]);
watch(city, () => {
  district.value = '';
});
<\/script>
<template>
  <section class="workshop">
    <label>
      지역
      <select v-model="city">
        <option value="seoul">서울</option>
        <option value="busan">부산</option>
      </select>
    </label>
    <label>
      구·군
      <select v-model="district">
        <option disabled value="">구·군 선택</option>
        <option v-for="name in districts" :key="name" :value="name">{{ name }}</option>
      </select>
    </label>
    <p>{{ district || '구·군을 선택하세요.' }}</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,kn=`<script setup>
import { ref } from 'vue';
const rows = ref([{ id: 1, name: '' }]);
let nextId = 2;
function add() {
  rows.value.push({ id: nextId++, name: '' });
}
function remove(id) {
  if (rows.value.length > 1) rows.value = rows.value.filter((row) => row.id !== id);
}
<\/script>
<template>
  <section class="workshop">
    <div v-for="row in rows" :key="row.id" class="row">
      <label>
        팀원 #{{ row.id }}
        <input v-model="row.name" />
      </label>
      <button :disabled="rows.length === 1" @click="remove(row.id)">행 삭제</button>
    </div>
    <button @click="add">팀원 추가</button>
    <p>총 {{ rows.length }}명</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,xn=`<script setup>
import { ref } from 'vue';
const password = ref('');
const visible = ref(false);
<\/script>
<template>
  <section class="workshop">
    <div class="row">
      <label>
        비밀번호
        <input
          v-model="password"
          :type="visible ? 'text' : 'password'"
          autocomplete="current-password"
        />
      </label>
      <button type="button" :aria-pressed="visible" @click="visible = !visible">
        비밀번호 {{ visible ? '숨기기' : '표시' }}
      </button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,gn=`<script setup>
import { ref, computed } from 'vue';
const options = ['뉴스', '이벤트', '업데이트'];
const selected = ref([]);
const all = computed({
  get: () => selected.value.length === options.length,
  set: (value) => {
    selected.value = value ? [...options] : [];
  }
});
const partial = computed(() => selected.value.length > 0 && !all.value);
<\/script>
<template>
  <section class="workshop">
    <label>
      <input v-model="all" :indeterminate="partial" type="checkbox" />
      전체 선택
    </label>
    <label v-for="option in options" :key="option">
      <input v-model="selected" :value="option" type="checkbox" />
      {{ option }}
    </label>
    <p>{{ selected.length }}개 선택</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,fn=`<script setup>
import { ref, computed } from 'vue';
const email = ref('');
const password = ref('');
const message = ref('');
const valid = computed(
  () => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value) && password.value.length >= 8
);
function submit() {
  if (valid.value) message.value = '입력 검증을 통과했습니다.';
}
<\/script>
<template>
  <section class="workshop">
    <form @submit.prevent="submit">
      <label>
        이메일
        <input v-model.trim="email" type="email" required autocomplete="email" />
      </label>
      <label>
        비밀번호
        <input
          v-model="password"
          type="password"
          minlength="8"
          required
          autocomplete="current-password"
        />
      </label>
      <p class="muted">이메일 형식과 비밀번호 8자 이상이 필요합니다.</p>
      <button :disabled="!valid" type="submit">로그인</button>
    </form>
    <p role="status">{{ message }}</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,vn=`<script setup>
import { ref } from 'vue';
const items = ref([]);
let nextId = 1;
function add() {
  items.value.push({ id: nextId++, name: '새 항목' });
}
<\/script>
<template>
  <section class="workshop">
    <p v-if="items.length === 0" class="muted">등록된 항목이 없습니다.</p>
    <ul v-else>
      <li v-for="item in items" :key="item.id">{{ item.name }} #{{ item.id }}</li>
    </ul>
    <div class="row">
      <button @click="add">항목 추가</button>
      <button :disabled="!items.length" @click="items = []">전체 비우기</button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,mn=`<script setup>
import { ref } from 'vue';
const fail = ref(true);
const error = ref('');
const loaded = ref(false);
function load() {
  error.value = fail.value ? '데이터를 가져오지 못했습니다.' : '';
  loaded.value = !fail.value;
}
<\/script>
<template>
  <section class="workshop">
    <label>
      <input v-model="fail" type="checkbox" />
      실패시키기
    </label>
    <button @click="load">조회</button>
    <section v-if="error" class="box">
      <p class="error" role="alert">{{ error }}</p>
      <button @click="load">재시도</button>
    </section>
    <p v-else-if="loaded">정상적으로 불러왔습니다.</p>
    <p v-else>조회 전입니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,yn=`<script setup>
import { ref, onUnmounted } from 'vue';
const loading = ref(false);
const result = ref('조회 전입니다.');
let timer;
function load() {
  if (loading.value) return;
  loading.value = true;
  timer = setTimeout(() => {
    result.value = '조회가 완료되었습니다.';
    loading.value = false;
  }, 700);
}
onUnmounted(() => clearTimeout(timer));
<\/script>
<template>
  <section class="workshop">
    <button :disabled="loading" @click="load">{{ loading ? '조회 중…' : '조회' }}</button>
    <p v-if="loading" role="status">데이터를 불러오는 중입니다.</p>
    <p v-else>{{ result }}</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,_n=`<script setup>
import { ref } from 'vue';
const loggedIn = ref(false);
<\/script>
<template>
  <section class="workshop">
    <template v-if="loggedIn">
      <p>환영합니다, Vue 개발자님!</p>
      <button @click="loggedIn = false">로그아웃</button>
    </template>
    <template v-else>
      <p>로그인이 필요합니다.</p>
      <button @click="loggedIn = true">로그인</button>
    </template>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,In=`<script setup>
import { ref, computed } from 'vue';
const role = ref('member');
const isAdmin = computed(() => role.value === 'admin');
<\/script>
<template>
  <section class="workshop">
    <label>
      권한
      <select v-model="role">
        <option value="member">일반 사용자</option>
        <option value="admin">관리자</option>
      </select>
    </label>
    <p class="box">일반 메뉴</p>
    <p v-if="isAdmin" class="box active">관리자 전용 메뉴</p>
    <p v-else class="muted">관리 메뉴를 볼 권한이 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,Cn=`<script setup>
import { ref } from 'vue';
const open = ref(false);
const memo = ref('');
<\/script>
<template>
  <section class="workshop">
    <button :aria-expanded="open" @click="open = !open">
      상세 안내 {{ open ? '닫기' : '열기' }}
    </button>
    <section v-show="open" class="box">
      <label>
        메모
        <input v-model="memo" />
      </label>
      <p>{{ memo || '메모를 남길 수 있습니다.' }}</p>
    </section>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,En=`<script setup>
import { ref } from 'vue';
const step = ref(1);
<\/script>
<template>
  <section class="workshop">
    <p>{{ step }} / 3단계</p>
    <section class="box">
      <p v-if="step === 1">약관 확인</p>
      <p v-else-if="step === 2">회원 정보 입력</p>
      <p v-else>가입 내용 확인</p>
    </section>
    <div class="row">
      <button :disabled="step === 1" @click="step = Math.max(1, step - 1)">이전</button>
      <button :disabled="step === 3" @click="step = Math.min(3, step + 1)">다음</button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,Dn=`<script setup>
import { ref } from 'vue';
const stock = ref(3);
function buy() {
  if (stock.value > 0) stock.value--;
}
<\/script>
<template>
  <section class="workshop">
    <p v-if="stock > 0">남은 재고: {{ stock }}</p>
    <p v-else class="error">품절되었습니다.</p>
    <div class="row">
      <button :disabled="stock === 0" @click="buy">구매하기</button>
      <button @click="stock = 3">재고 초기화</button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,Vn=`<script setup>
import { ref, useId } from 'vue';
const openId = ref(null);
const uid = useId();
const items = [
  { id: 1, question: '배송은 얼마나 걸리나요?', answer: '영업일 기준 2~3일입니다.' },
  { id: 2, question: '반품은 어떻게 하나요?', answer: '주문 내역에서 반품을 신청하세요.' }
];
function toggle(id) {
  openId.value = openId.value === id ? null : id;
}
<\/script>
<template>
  <section class="workshop">
    <section v-for="item in items" :key="item.id" class="box">
      <button
        :aria-expanded="openId === item.id"
        :aria-controls="uid + item.id"
        @click="toggle(item.id)"
      >
        {{ item.question }}
      </button>
      <p :id="uid + item.id" v-show="openId === item.id">{{ item.answer }}</p>
    </section>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,qn=`<script setup>
import { ref } from 'vue';
const options = ['Vue', 'SCSS', 'Vite'];
const selected = ref([]);
function toggle(value) {
  selected.value = selected.value.includes(value)
    ? selected.value.filter((item) => item !== value)
    : [...selected.value, value];
}
<\/script>
<template>
  <section class="workshop">
    <div class="row">
      <button
        v-for="option in options"
        :key="option"
        :class="{ active: selected.includes(option) }"
        :aria-pressed="selected.includes(option)"
        @click="toggle(option)"
      >
        {{ option }}
      </button>
    </div>
    <p>{{ selected.join(', ') || '선택 없음' }}</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,Tn=`<script setup>
import { ref } from 'vue';
const quantity = ref(1);
function change(delta) {
  quantity.value = Math.min(5, Math.max(1, quantity.value + delta));
}
<\/script>
<template>
  <section class="workshop">
    <div class="row">
      <button :disabled="quantity === 1" @click="change(-1)">감소</button>
      <output aria-live="polite">{{ quantity }}</output>
      <button :disabled="quantity === 5" @click="change(1)">증가</button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,Ln=`<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const root = ref(null);
const open = ref(false);
const selected = ref('선택 없음');
function choose(value) {
  selected.value = value;
  open.value = false;
}
function outside(event) {
  if (!root.value?.contains(event.target)) open.value = false;
}
onMounted(() => document.addEventListener('pointerdown', outside));
onUnmounted(() => document.removeEventListener('pointerdown', outside));
<\/script>
<template>
  <section class="workshop">
    <div ref="root" class="box" @keydown.esc="open = false">
      <button :aria-expanded="open" @click="open = !open">옵션</button>
      <div v-if="open" class="row">
        <button @click="choose('수정')">수정</button>
        <button @click="choose('복제')">복제</button>
      </div>
    </div>
    <p>{{ selected }}</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,On=`<script setup>
import { ref, computed } from 'vue';
const liked = ref(false);
const baseCount = 12;
const count = computed(() => baseCount + (liked.value ? 1 : 0));
<\/script>
<template>
  <section class="workshop">
    <button :class="{ active: liked }" :aria-pressed="liked" @click="liked = !liked">
      {{ liked ? '좋아요 취소' : '좋아요' }} {{ count }}
    </button>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,An=`<script setup>
import { ref } from 'vue';
const dialog = ref(null);
<\/script>
<template>
  <section class="workshop">
    <button @click="dialog.showModal()">안내 열기</button>
    <dialog ref="dialog" aria-label="안내">
      <h3>안내</h3>
      <p>변경사항을 확인하세요.</p>
      <button autofocus @click="dialog.close()">닫기</button>
    </dialog>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,Pn=`<script setup>
import { ref, computed } from 'vue';
const expanded = ref(false);
const summary = 'Vue는 사용자 인터페이스를 만드는 도구입니다.';
const full =
  summary +
  ' 반응형 상태가 바뀌면 템플릿이 갱신됩니다. 컴포넌트로 기능을 나누고 Composable로 상태 로직을 재사용할 수 있습니다.';
const description = computed(() => (expanded.value ? full : summary));
<\/script>
<template>
  <section class="workshop">
    <p>{{ description }}</p>
    <button :aria-expanded="expanded" @click="expanded = !expanded">
      {{ expanded ? '접기' : '더 보기' }}
    </button>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,Fn=`<script setup>
import { ref } from 'vue';
const panel = ref(null);
function toTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  panel.value?.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
}
<\/script>
<template>
  <section class="workshop">
    <div ref="panel" class="scroll box" tabindex="0" aria-label="연습 목록">
      <p v-for="number in 30" :key="number">{{ number }}번째 항목</p>
    </div>
    <button @click="toTop">목록 맨 위로</button>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,Sn=`<script setup>
import { ref, computed } from 'vue';
const selected = ref('intro');
const tabs = [
  { id: 'intro', label: '소개', content: '서비스를 소개합니다.' },
  { id: 'price', label: '가격', content: '기본 요금은 월 10,000원입니다.' },
  { id: 'review', label: '후기', content: '사용자 후기를 확인하세요.' }
];
const current = computed(() => tabs.find((tab) => tab.id === selected.value));
<\/script>
<template>
  <section class="workshop">
    <nav class="row" aria-label="콘텐츠 선택">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ active: selected === tab.id }"
        :aria-pressed="selected === tab.id"
        @click="selected = tab.id"
      >
        {{ tab.label }}
      </button>
    </nav>
    <section class="box">
      <h3>{{ current.label }}</h3>
      <p>{{ current.content }}</p>
    </section>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,Rn=`<script setup>
import { ref, onUnmounted } from 'vue';
const visible = ref(false);
let timer;
function notify() {
  clearTimeout(timer);
  visible.value = true;
  timer = setTimeout(() => {
    visible.value = false;
  }, 2000);
}
onUnmounted(() => clearTimeout(timer));
<\/script>
<template>
  <section class="workshop">
    <button @click="notify">저장</button>
    <p v-if="visible" class="box active" role="status">저장되었습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,Mn=`<script setup>
import { ref } from 'vue';
const enabled = ref(false);
<\/script>
<template>
  <section class="workshop">
    <button :class="{ active: enabled }" :aria-pressed="enabled" @click="enabled = !enabled">
      알림 {{ enabled ? '켜짐' : '꺼짐' }}
    </button>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,Un=`<script setup>
import { ref, computed, useId } from 'vue';
const hovered = ref(false);
const focused = ref(false);
const visible = computed(() => hovered.value || focused.value);
const tooltipId = useId();
<\/script>
<template>
  <section class="workshop">
    <button
      :aria-describedby="visible ? tooltipId : undefined"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @focus="focused = true"
      @blur="focused = false"
    >
      배송 도움말
    </button>
    <p v-if="visible" :id="tooltipId" class="box" role="tooltip">영업일 기준으로 계산합니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`,R=JSON.parse('[{"id":"if-login","title":"로그인 여부에 따라 화면 나누기","category":"if · 조건부 렌더링","level":"입문","question":"로그인 버튼을 누르면 환영 문구와 로그아웃 버튼이 나타나고, 로그아웃하면 원래 안내로 돌아오게 만드세요.","html":"<section class=\\"workshop\\">\\n  <p>로그인이 필요합니다.</p>\\n  <button type=\\"button\\">로그인</button>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/if-login.vue","steps":["loggedIn은 로그인 상태를 담는 ref이며 처음에는 false입니다. 로그인 화면과 환영 화면 중 어느 쪽을 보여줄지 결정하는 스위치라고 생각하세요.","v-if=\\"loggedIn\\"은 값이 true일 때만 환영 영역을 만듭니다. 바로 다음 v-else는 반대 경우인 로그인 안내를 담당하므로 두 화면이 동시에 나타나지 않습니다.","버튼을 누르면 상태를 true 또는 false로 바꿉니다. 템플릿은 ref를 자동으로 풀어주므로 .value 없이 대입해도 Vue가 상태 변경을 감지하고 화면을 다시 그립니다."],"pitfall":"v-else는 v-if 바로 다음에 놓아야 합니다. 이 예제는 화면 분기 연습이며 실제 로그인 인증·권한 검증은 서버에서 처리해야 합니다.","checks":["처음에는 로그인 안내만 표시","로그인 후 환영 문구 표시","로그아웃 후 처음 화면으로 복귀"]},{"id":"if-loading","title":"로딩 중 버튼과 안내 제어","category":"if · 조건부 렌더링","level":"입문","question":"조회 버튼을 누르면 0.7초 동안 로딩 문구를 표시하고 중복 클릭을 막으세요. 완료 뒤에는 결과를 보여주세요.","html":"<section class=\\"workshop\\">\\n  <button type=\\"button\\">조회</button>\\n  <p>조회 전입니다.</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/if-loading.vue","steps":["loading은 작업 진행 여부, result는 완료 후 보여줄 문구입니다. 서로 다른 역할의 상태를 분리하면 로딩 표시가 결과 데이터를 덮어쓰는 일을 줄일 수 있습니다.","조회가 시작될 때 loading을 true로 바꾸고 버튼의 disabled와 v-if에 함께 연결합니다. 한 상태를 여러 UI에서 읽으면 버튼과 안내가 항상 같은 진행 상황을 보여줍니다.","setTimeout은 서버 대기 시간을 흉내 냅니다. 완료 콜백에서 결과를 바꾸고 loading을 false로 돌립니다. 화면을 떠날 때는 onUnmounted에서 타이머를 제거합니다."],"pitfall":"버튼 비활성화와 별개로 load 함수도 loading을 검사합니다. 실제 API에서는 try/catch/finally로 성공·실패 모두에서 로딩을 종료하세요.","checks":["클릭 직후 로딩 표시","로딩 중 재클릭 불가","완료 후 결과 문구 표시"]},{"id":"if-empty","title":"목록이 없을 때 빈 상태 안내","category":"if · 조건부 렌더링","level":"입문","question":"목록이 비어 있으면 안내와 추가 버튼을 보여주고, 항목을 추가하면 목록 화면으로 전환하세요.","html":"<section class=\\"workshop\\">\\n  <p class=\\"muted\\">등록된 항목이 없습니다.</p>\\n  <button type=\\"button\\">항목 추가</button>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/if-empty.vue","steps":["items를 빈 배열로 시작하면 아직 데이터가 없는 상태를 명확히 표현할 수 있습니다. 문자열이나 null 대신 배열로 통일하면 length와 v-for를 안전하게 사용할 수 있습니다.","items.length가 0일 때만 빈 상태 안내를 표시합니다. 항목이 하나라도 생기면 v-else 영역으로 전환되므로 빈 안내와 실제 목록이 겹치지 않습니다.","추가는 push로 배열을 변경하고, 전체 비우기는 새 빈 배열을 대입합니다. Vue 3는 두 방식 모두 추적하므로 별도로 DOM을 직접 지울 필요가 없습니다."],"pitfall":"빈 배열 자체는 JavaScript에서 참입니다. v-if=\\"items\\"가 아니라 items.length를 검사해야 비어 있는지 알 수 있습니다.","checks":["초기 빈 상태 표시","추가 후 목록 표시","전체 비우기 후 빈 안내 복구"]},{"id":"if-error","title":"오류 안내와 재시도 화면","category":"if · 조건부 렌더링","level":"기본","question":"실패를 선택해 조회하면 오류 메시지와 재시도 버튼을 보여주세요. 실패를 해제하고 다시 시도하면 정상 결과로 돌아와야 합니다.","html":"<section class=\\"workshop\\">\\n  <label><input type=\\"checkbox\\" /> 실패시키기</label><button type=\\"button\\">조회</button>\\n  <p>조회 전입니다.</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/if-error.vue","steps":["fail은 테스트에서 성공과 실패를 고르는 값이고, error는 사용자에게 보여줄 오류 문자열입니다. loaded는 조회 성공 여부로, 아직 조회하지 않은 상태와 성공한 상태를 구분합니다.","v-if로 오류를 먼저 검사하고, 오류가 없을 때만 v-else-if에서 성공 상태를 검사합니다. 마지막 v-else가 초기 화면이 되므로 세 상태가 섞이지 않습니다.","조회와 재시도 버튼은 같은 load 함수를 호출합니다. 재시도는 특별한 데이터 로직이 아니라 이전 오류를 갱신하고 같은 작업을 다시 실행하는 흐름입니다."],"pitfall":"실제 네트워크 요청에서는 이전 오류를 먼저 비우고 새 요청 결과로 갱신하세요. 예제의 fail은 화면 연습용이며 실제 장애를 재현하는 API 호출은 하지 않습니다.","checks":["실패 상태에서 오류 표시","재시도 버튼 제공","실패 해제 후 정상 안내"]},{"id":"if-stock","title":"재고에 따른 구매 가능 상태","category":"if · 조건부 렌더링","level":"입문","question":"재고가 0이면 품절 문구와 비활성 구매 버튼을 보여주고, 구매할 때마다 재고를 한 개 줄이세요.","html":"<section class=\\"workshop\\">\\n  <p>남은 재고: 3</p>\\n  <button type=\\"button\\">구매하기</button>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/if-stock.vue","steps":["stock을 숫자 ref로 만들고 3에서 시작합니다. 재고 수량이라는 실제 데이터를 기준으로 화면을 결정하면 별도의 품절 상태를 중복 관리할 필요가 없습니다.","stock > 0이면 남은 수량을 보여주고 그렇지 않으면 품절 안내를 보여줍니다. 구매 버튼의 disabled도 같은 재고 상태를 기준으로 계산합니다.","buy 함수 안에서도 0보다 큰지 검사한 뒤 감소시킵니다. UI 제어와 데이터 방어를 함께 두면 다른 코드에서 함수를 호출해도 재고가 음수가 되지 않습니다."],"pitfall":"실제 구매 시 재고 확인과 차감은 서버에서 원자적으로 처리해야 합니다. 화면의 수량 검사만으로 동시 구매 문제를 막을 수는 없습니다.","checks":["3번 구매하면 품절","품절 뒤 구매 버튼 비활성","초기화하면 재구매 가능"]},{"id":"if-role","title":"권한별 관리 메뉴 표시","category":"if · 조건부 렌더링","level":"기본","question":"사용자 권한을 바꾸면 일반 메뉴는 모두에게, 관리 메뉴는 관리자에게만 보이도록 만드세요.","html":"<section class=\\"workshop\\">\\n  <label\\n    >권한<select>\\n      <option>일반 사용자</option>\\n      <option>관리자</option>\\n    </select></label\\n  >\\n  <p class=\\"box\\">일반 메뉴</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/if-role.vue","steps":["role에는 화면에서 선택한 권한의 식별값을 저장합니다. 사용자에게 보이는 한국어 이름과 데이터에 쓰는 member/admin 값을 나누면 표시 문구를 바꿔도 조건식은 유지됩니다.","isAdmin은 role에서 계산되는 값이므로 computed로 만듭니다. 별도 ref로 저장하고 매번 동기화하기보다 원본 상태 하나에서 파생시키는 것이 단순합니다.","선택값이 바뀌면 computed가 재계산되고 v-if가 관리 메뉴의 DOM을 추가하거나 제거합니다. 일반 메뉴는 조건 밖에 두어 어떤 권한에서도 보이게 합니다."],"pitfall":"관리 메뉴를 숨기는 것은 사용성 처리입니다. 실제 관리 API와 데이터 접근 권한은 서버가 별도로 검증해야 합니다.","checks":["일반 사용자에게 일반 메뉴만 표시","관리자 선택 시 관리 메뉴 추가","권한 변경 즉시 화면 반영"]},{"id":"if-step","title":"가입 단계를 조건으로 전환","category":"if · 조건부 렌더링","level":"기본","question":"이전·다음 버튼으로 1~3단계를 이동하고, 현재 단계의 내용만 표시하세요.","html":"<section class=\\"workshop\\">\\n  <p>1 / 3단계</p>\\n  <section class=\\"box\\">약관 확인</section>\\n  <button type=\\"button\\">이전</button><button type=\\"button\\">다음</button>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/if-step.vue","steps":["step은 현재 단계 번호이고 1부터 시작합니다. 여러 boolean을 만들지 않고 하나의 번호로 관리하면 두 단계가 동시에 켜지는 조합을 피할 수 있습니다.","v-if와 v-else-if로 첫째·둘째 단계를 구분하고 마지막 단계는 v-else로 표시합니다. 현재 단계 번호와 화면 내용이 같은 상태값을 참조합니다.","이동 버튼은 Math.max와 Math.min으로 범위를 제한합니다. 처음·마지막 단계에서는 disabled도 적용해 가능한 이동 방향을 사용자에게 알려줍니다."],"pitfall":"실제 가입 폼에서는 다음 단계로 이동하기 전에 현재 단계의 유효성을 검사하세요. v-if로 제거되는 자식의 로컬 상태는 부모에 올려야 유지됩니다.","checks":["1단계에서 이전 불가","다음으로 3단계까지 이동","3단계에서 다음 불가"]},{"id":"if-show","title":"상세 안내를 DOM 유지하며 토글","category":"if · 조건부 렌더링","level":"입문","question":"안내를 열고 닫되 입력한 메모와 DOM이 유지되도록 v-show로 구현하세요.","html":"<section class=\\"workshop\\">\\n  <button type=\\"button\\">상세 안내 열기</button>\\n  <section class=\\"box\\">\\n    <p>메모를 남길 수 있습니다.</p>\\n    <input aria-label=\\"메모\\" />\\n  </section>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/if-show.vue","steps":["open은 표시 여부를, memo는 입력한 내용을 담당합니다. 표시 상태와 입력 데이터를 분리하면 패널을 감추더라도 사용자가 작성한 내용은 유지됩니다.","v-show는 요소를 제거하지 않고 display를 바꿉니다. 자주 열고 닫는 단순 영역이라면 매번 DOM을 다시 만드는 대신 이 방식이 적합할 수 있습니다.","버튼은 open을 반전시키고 aria-expanded도 같은 값으로 바꿉니다. 시각적인 열림 상태와 보조 기술에 알려주는 상태가 함께 갱신됩니다."],"pitfall":"v-show는 초기부터 DOM을 만듭니다. 아주 무거운 영역이나 권한에 따라 아예 만들지 말아야 하는 영역에는 v-if가 더 적절할 수 있습니다.","checks":["버튼으로 안내 열기","메모 입력 뒤 닫았다 열어도 유지","aria-expanded와 표시 상태 일치"]},{"id":"for-todo","title":"할 일 목록 추가와 삭제","category":"for · 반복문","level":"입문","question":"입력한 할 일을 목록에 추가하고 선택한 항목만 삭제하세요. 빈 입력은 추가하지 마세요.","html":"<section class=\\"workshop\\">\\n  <label>할 일<input placeholder=\\"새 할 일\\" /></label><button type=\\"button\\">추가</button>\\n  <ul>\\n    <li>Vue 복습 <button type=\\"button\\">삭제</button></li>\\n  </ul>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/for-todo.vue","steps":["tasks는 id와 name을 가진 객체 배열입니다. 화면에 표시할 이름과 항목을 구별할 ID를 따로 두면 같은 이름의 할 일이 있어도 정확한 항목을 찾을 수 있습니다.","v-for는 배열 항목마다 li를 만들고 :key에는 task.id를 사용합니다. form의 submit을 처리하므로 버튼 클릭과 Enter 입력이 같은 add 함수를 실행합니다.","추가 시 trim으로 빈 입력을 걸러내고 새로운 ID를 부여합니다. 삭제는 전달받은 ID와 다른 항목만 filter로 남겨 원하지 않는 행을 건드리지 않습니다."],"pitfall":"배열의 index를 삭제 ID처럼 사용하면 정렬이나 필터링 뒤 다른 항목을 지울 수 있습니다. 화면 순서가 아니라 고유 ID를 전달하세요.","checks":["빈 입력 추가 차단","같은 이름도 별도 ID로 추가","해당 ID의 할 일만 삭제"]},{"id":"for-cards","title":"상품 배열로 카드 반복하기","category":"for · 반복문","level":"입문","question":"서로 다른 상품명과 가격이 들어 있는 배열을 카드 목록으로 표시하고, 버튼으로 상품 한 개를 더 추가하세요.","html":"<section class=\\"workshop\\">\\n  <div class=\\"box\\">\\n    <h3>키보드</h3>\\n    <p>30,000원</p>\\n  </div>\\n  <button type=\\"button\\">상품 추가</button>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/for-cards.vue","steps":["상품 하나를 하나의 객체로 표현하고 여러 상품을 배열에 담습니다. 이 구조는 API 응답을 목록으로 보여줄 때도 동일하게 사용할 수 있습니다.","카드 HTML을 상품 개수만큼 손으로 복사하지 않고 v-for로 반복합니다. 제목과 가격은 현재 반복 중인 product에서 읽으므로 각 카드에 서로 다른 값이 들어갑니다.","toLocaleString은 숫자를 읽기 좋은 형식으로 표시할 뿐 원본 price를 바꾸지 않습니다. 새 상품을 push하면 반응형 배열 변경을 따라 카드도 추가됩니다."],"pitfall":"계산에 사용할 가격은 숫자로 보관하세요. 30,000원처럼 표시용 문자열을 데이터에 넣으면 합계와 정렬 처리가 복잡해집니다.","checks":["처음 두 상품 표시","가격에 천 단위 구분","추가한 상품 카드 표시"]},{"id":"for-keys","title":"순서를 바꿔도 입력값 유지하기","category":"for · 반복문","level":"기본","question":"행 순서를 뒤집어도 각 사람의 이름 입력값이 해당 ID와 함께 유지되게 하세요.","html":"<section class=\\"workshop\\">\\n  <button type=\\"button\\">순서 뒤집기</button>\\n  <ul>\\n    <li>#1 <input aria-label=\\"1번 이름\\" value=\\"민지\\" /></li>\\n    <li>#2 <input aria-label=\\"2번 이름\\" value=\\"준호\\" /></li>\\n  </ul>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/for-keys.vue","steps":["각 사람의 id는 순서가 바뀌어도 변하지 않는 식별자입니다. v-model은 해당 객체의 name에 연결되어 입력한 내용이 데이터에 저장됩니다.","Vue는 :key=\\"person.id\\"를 보고 기존 DOM과 데이터를 연결합니다. 배열 index를 key로 쓰면 위치를 항목의 정체성처럼 다루게 되어 복잡한 자식 상태에서 혼동이 생길 수 있습니다.","reverse는 배열 순서를 바꾸므로 복사한 배열에서 실행합니다. 각 객체의 id와 name은 그대로이고 배치만 바뀌기 때문에 입력한 이름도 올바른 사람을 따라갑니다."],"pitfall":"key는 같은 반복 목록 안에서 유일해야 합니다. 이름처럼 사용자가 바꿀 수 있는 값이나 중복 가능한 값을 key로 삼지 마세요.","checks":["한 사람 이름 수정","순서 뒤집기","수정한 이름이 같은 ID와 함께 이동"]},{"id":"for-nested","title":"중첩 카테고리 메뉴 만들기","category":"for · 반복문","level":"기본","question":"카테고리별 하위 메뉴를 두 단계 반복문으로 표시하세요. 항목 ID는 각 반복 범위에서 고유하게 연결하세요.","html":"<section class=\\"workshop\\">\\n  <section class=\\"box\\">\\n    <h3>개발</h3>\\n    <ul>\\n      <li>Vue</li>\\n      <li>SCSS</li>\\n    </ul>\\n  </section>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/for-nested.vue","steps":["groups의 각 항목에는 children 배열이 들어 있습니다. 메뉴의 계층을 데이터 구조에 그대로 담으면 카테고리가 늘어나도 템플릿 구조를 수정하지 않아도 됩니다.","바깥 v-for는 카테고리 섹션을 만들고 안쪽 v-for는 현재 group.children만 반복합니다. 안쪽 변수가 어느 부모의 목록을 읽는지 확인하는 것이 핵심입니다.","각 반복에 해당 항목의 id를 key로 부여합니다. 바깥 key와 안쪽 key는 각각의 형제 목록을 구분하므로 서로 다른 수준의 ID를 섞어 쓸 필요는 없습니다."],"pitfall":"children이 누락될 수 있는 API라면 데이터를 받을 때 빈 배열로 정규화하세요. 계층이 무한히 깊어지면 재귀 컴포넌트 설계를 고려할 수 있습니다.","checks":["두 카테고리 표시","각 카테고리에 맞는 하위 메뉴 표시","중첩 반복마다 고유 key 사용"]},{"id":"for-options","title":"배열로 셀렉트 옵션 만들기","category":"for · 반복문","level":"입문","question":"지역 배열로 option을 만들고, 선택한 지역 ID를 화면에 표시하세요. 선택 전에는 안내 문구가 보여야 합니다.","html":"<section class=\\"workshop\\">\\n  <label\\n    >지역<select>\\n      <option value=\\"\\">지역 선택</option>\\n      <option value=\\"seoul\\">서울</option>\\n    </select></label\\n  >\\n  <p>선택한 지역 ID: 없음</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/for-options.vue","steps":["region은 선택된 값이고 regions는 선택 가능한 목록입니다. 처음 선택값을 빈 문자열로 두면 value가 빈 옵션을 초기 안내로 사용할 수 있습니다.","v-for로 option을 만들고 :value에 item.id를 넣습니다. 사용자는 서울이라는 이름을 보지만 프로그램은 seoul이라는 안정적인 식별값을 받습니다.","select에 v-model을 연결하면 선택할 때마다 region이 바뀝니다. 같은 상태값을 출력문에서도 읽으므로 별도로 change 이벤트를 작성할 필요가 없습니다."],"pitfall":"option의 value를 생략하면 표시 텍스트가 값으로 사용될 수 있습니다. API에 전달할 코드가 있다면 value를 명시하세요.","checks":["초기 지역 선택 안내","지역 변경 가능","화면에 선택 ID 표시"]},{"id":"for-pages","title":"숫자 반복으로 페이지 버튼 만들기","category":"for · 반복문","level":"기본","question":"1~5 페이지 버튼을 반복문으로 만들고, 현재 페이지 버튼에만 강조 스타일과 aria-current를 적용하세요.","html":"<section class=\\"workshop\\">\\n  <nav class=\\"row\\" aria-label=\\"페이지 이동\\">\\n    <button type=\\"button\\">1</button><button type=\\"button\\">2</button\\n    ><button type=\\"button\\">3</button>\\n  </nav>\\n  <p>현재 1페이지</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/for-pages.vue","steps":["Vue의 v-for는 배열뿐 아니라 양의 정수도 반복할 수 있습니다. totalPages가 5이면 number는 1부터 5까지 만들어지므로 페이지 번호를 생성하기 편합니다.","page는 현재 선택한 페이지 번호입니다. 버튼을 누르면 그 버튼의 number를 page에 대입하여 상태를 갱신합니다.","class 바인딩과 aria-current가 모두 page === number를 검사합니다. 색상으로 보이는 선택 상태와 보조 기술이 읽는 현재 페이지 정보가 같은 기준을 사용합니다."],"pitfall":"이 예제는 페이지 선택 UI를 연습합니다. 실제 목록에서는 페이지 변경에 맞춰 데이터를 잘라 보여주거나 API를 다시 요청해야 합니다.","checks":["페이지 버튼 5개","클릭한 번호로 상태 변경","강조 버튼은 항상 하나"]},{"id":"for-groups","title":"날짜별 일정 그룹 표시","category":"for · 반복문","level":"기본","question":"날짜마다 일정 개수를 표시하고 해당 날짜의 일정만 하위 목록에 보여주세요. 일정이 없는 날은 안내를 표시하세요.","html":"<section class=\\"workshop\\">\\n  <article class=\\"box\\">\\n    <h3>월요일 · 2개</h3>\\n    <ul>\\n      <li>코드 리뷰</li>\\n      <li>팀 회의</li>\\n    </ul>\\n  </article>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/for-groups.vue","steps":["days는 날짜별로 tasks 배열을 가진 데이터입니다. 제목의 일정 개수도 같은 tasks.length에서 계산해 목록과 숫자가 어긋나지 않게 합니다.","바깥 반복문이 날짜 카드를 만들고 안쪽 반복문이 해당 날짜의 일정을 표시합니다. v-if는 ul에, v-for는 li에 두어 같은 요소에서 조건과 반복이 충돌하지 않게 합니다.","일정 배열이 비어 있으면 v-else에서 안내를 보여줍니다. 이처럼 반복과 조건을 함께 사용하면 데이터가 없거나 많은 경우를 한 템플릿에서 처리할 수 있습니다."],"pitfall":"여기서는 일정 순서가 고정된 단순 문자열 목록이라 index를 사용합니다. 일정 편집·삭제·정렬이 추가되면 일정 객체에 고유 ID를 부여하세요.","checks":["날짜별 일정 개수 표시","월요일에 두 일정 표시","빈 날짜에 안내 표시"]},{"id":"for-table","title":"테이블 행과 상태 뱃지 반복","category":"for · 반복문","level":"기본","question":"주문 배열을 테이블로 표시하고, 배송 완료 행의 상태에만 강조 스타일을 적용하세요.","html":"<section class=\\"workshop\\">\\n  <table>\\n    <thead>\\n      <tr>\\n        <th scope=\\"col\\">주문</th>\\n        <th scope=\\"col\\">상태</th>\\n      </tr>\\n    </thead>\\n    <tbody>\\n      <tr>\\n        <td>노트북</td>\\n        <td>준비 중</td>\\n      </tr>\\n    </tbody>\\n  </table>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/for-table.vue","steps":["orders에는 주문 이름과 완료 여부를 함께 보관합니다. 같은 행의 이름·상태·버튼이 하나의 order 객체를 바라보므로 어떤 주문을 수정하는지 분명합니다.","tbody 안의 tr에 v-for를 사용하면 주문 수만큼 행이 만들어집니다. key는 주문 ID이고, 테이블의 th와 scope로 열의 의미도 함께 제공합니다.","상태 셀의 문구와 class를 order.done에서 계산합니다. 버튼에서 done을 반전시키면 텍스트와 색상이 동시에 갱신되어 따로 DOM을 조작할 필요가 없습니다."],"pitfall":"색상만으로 상태를 전달하지 말고 배송 완료/준비 중처럼 텍스트도 제공하세요. 실제 서버 갱신이 필요한 서비스에서는 실패 시 되돌리기도 설계해야 합니다.","checks":["주문마다 한 행 표시","완료 행 상태 강조","상태 전환 시 문구와 색상 함께 변경"]},{"id":"ui-toggle","title":"선택 버튼의 스타일 토글","category":"UI 인터랙션","level":"입문","question":"알림 설정 버튼을 누를 때마다 켜짐·꺼짐 문구와 강조 스타일이 함께 바뀌게 하세요.","html":"<section class=\\"workshop\\">\\n  <button type=\\"button\\">알림 꺼짐</button>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/ui-toggle.vue","steps":["enabled는 알림 설정이 켜져 있는지를 나타내는 boolean입니다. 처음 false이므로 꺼짐 문구가 보입니다.","클릭 시 !enabled로 값을 반전합니다. 같은 이벤트를 여러 번 실행해도 true와 false 사이에서만 움직여 상태가 단순합니다.","객체 형식 :class는 enabled가 true일 때만 active 클래스를 추가합니다. aria-pressed도 함께 연결해 버튼의 선택 상태를 보조 기술에 전달합니다."],"pitfall":"클래스를 element.classList로 직접 바꾸기보다 상태에서 파생시키세요. 직접 DOM을 바꾸면 Vue의 다음 렌더링과 상태가 어긋날 수 있습니다.","checks":["클릭하면 켜짐","다시 클릭하면 꺼짐","강조 스타일과 문구 일치"]},{"id":"ui-tabs","title":"탭 버튼으로 내용 전환","category":"UI 인터랙션","level":"기본","question":"소개·가격·후기 버튼 중 선택한 하나만 강조하고, 해당하는 본문만 표시하세요.","html":"<section class=\\"workshop\\">\\n  <nav class=\\"row\\" aria-label=\\"콘텐츠 선택\\">\\n    <button type=\\"button\\">소개</button><button type=\\"button\\">가격</button\\n    ><button type=\\"button\\">후기</button>\\n  </nav>\\n  <section class=\\"box\\">서비스를 소개합니다.</section>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/ui-tabs.vue","steps":["selected에는 현재 선택한 탭의 ID 하나만 저장합니다. tabs 배열에는 각 버튼의 이름과 본문을 같이 두어 두 목록을 따로 관리하지 않습니다.","버튼 목록은 v-for로 만들고 클릭한 tab.id를 selected에 저장합니다. 조건식 selected === tab.id가 강조와 눌림 상태를 결정하므로 선택 버튼이 하나로 유지됩니다.","current는 선택 ID에 해당하는 객체를 찾는 computed입니다. 템플릿은 current의 제목과 본문을 읽으므로 새로운 탭을 추가해도 선택 로직을 복사할 필요가 없습니다."],"pitfall":"이 예제는 aria-pressed 버튼 모음입니다. role=\\"tab\\"을 사용하는 정식 탭 UI로 확장하면 방향키 이동과 roving tabindex도 함께 구현하세요.","checks":["초기에 소개 선택","가격 클릭 시 가격 본문","선택 강조가 하나만 유지"]},{"id":"ui-accordion","title":"하나씩 열리는 아코디언","category":"UI 인터랙션","level":"기본","question":"질문을 누르면 답변을 펼치고, 다른 질문을 누르면 이전 답변을 닫으세요. 열린 질문을 다시 누르면 모두 닫혀야 합니다.","html":"<section class=\\"workshop\\">\\n  <section class=\\"box\\">\\n    <button type=\\"button\\">배송은 얼마나 걸리나요?</button>\\n    <p>영업일 기준 2~3일입니다.</p>\\n  </section>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/ui-accordion.vue","steps":["여러 개의 boolean 대신 openId 하나로 열린 질문을 기록합니다. null이면 모두 닫힘, 숫자 ID이면 그 질문만 열림을 뜻합니다.","toggle은 이미 열린 ID를 다시 눌렀는지 검사합니다. 같으면 null로 닫고 다르면 새 ID로 바꾸므로 언제나 최대 한 개의 답변만 표시됩니다.","답변의 표시 조건과 버튼의 aria-expanded를 같은 식으로 작성합니다. useId로 만든 접두어와 item.id를 결합해 여러 아코디언이 있어도 연결 ID가 겹치지 않게 합니다."],"pitfall":"여러 답변을 동시에 열어야 한다면 ID 하나 대신 Set이나 ID 배열을 사용해야 합니다. 요구사항에 맞는 상태 구조를 먼저 정하세요.","checks":["첫 질문 열기","두 번째 열면 첫 번째 닫힘","같은 질문 재클릭 시 닫힘"]},{"id":"ui-modal","title":"네이티브 dialog 모달 열고 닫기","category":"UI 인터랙션","level":"기본","question":"열기 버튼으로 모달을 표시하고 닫기 버튼 또는 Escape로 닫을 수 있게 만드세요.","html":"<section class=\\"workshop\\">\\n  <button type=\\"button\\">안내 열기</button>\\n  <dialog open aria-label=\\"안내\\">\\n    <h3>안내</h3>\\n    <p>변경사항을 확인하세요.</p>\\n    <button type=\\"button\\">닫기</button>\\n  </dialog>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/ui-modal.vue","steps":["dialog ref에는 HTMLDialogElement가 연결됩니다. 일반 데이터 ref와 달리 template ref는 실제 DOM 요소의 메서드를 호출할 필요가 있을 때 사용합니다.","showModal()은 dialog를 최상위 모달로 열어 배경과 구분하고 네이티브 모달의 키보드 동작을 제공합니다. 단순히 open 속성만 붙인 경우와 동작이 다릅니다.","닫기 버튼에서 close()를 호출합니다. autofocus로 처음 포커스 받을 버튼을 정하고 aria-label로 대화상자의 이름을 제공해 목적을 알 수 있게 합니다."],"pitfall":"Escape 닫기는 네이티브 dialog가 처리합니다. 모달 안에 폼이 있다면 확인·취소에 따라 데이터를 언제 저장할지도 별도로 설계하세요.","checks":["열기 버튼으로 모달 표시","닫기로 복귀","Escape로 닫기 가능"]},{"id":"ui-dropdown","title":"옵션 메뉴와 바깥 클릭 닫기","category":"UI 인터랙션","level":"실무","question":"메뉴 버튼으로 옵션을 열고, 항목을 선택하거나 메뉴 바깥을 누르면 닫히게 하세요.","html":"<section class=\\"workshop\\">\\n  <div class=\\"box\\">\\n    <button type=\\"button\\">옵션</button>\\n    <div><button type=\\"button\\">수정</button><button type=\\"button\\">복제</button></div>\\n  </div>\\n  <p>선택 없음</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/ui-dropdown.vue","steps":["root는 메뉴 전체를 감싸는 DOM, open은 펼침 상태, selected는 마지막 선택값입니다. 바깥 클릭을 판별하려면 기준이 되는 DOM 범위를 정해야 합니다.","document의 pointerdown에서 event.target이 root 내부에 포함되는지 검사합니다. 내부 버튼을 누를 때는 닫지 않고 바깥을 누를 때만 open을 false로 바꿉니다.","항목 선택은 결과를 저장하고 메뉴를 닫습니다. onMounted에서 등록한 전역 이벤트는 onUnmounted에서 동일한 함수로 제거해 화면 이동 뒤에도 핸들러가 남지 않게 합니다."],"pitfall":"이 예제는 일반 버튼 목록입니다. role=\\"menu\\"를 쓰는 애플리케이션 메뉴로 확장한다면 항목 포커스 이동과 방향키 처리도 함께 제공해야 합니다.","checks":["버튼으로 메뉴 토글","항목 선택 후 닫힘","바깥 클릭과 Escape로 닫힘"]},{"id":"ui-tooltip","title":"마우스와 키보드로 여는 툴팁","category":"UI 인터랙션","level":"기본","question":"도움말 버튼에 마우스를 올리거나 키보드 포커스를 두면 설명을 표시하고, 벗어나면 숨기세요.","html":"<section class=\\"workshop\\">\\n  <button type=\\"button\\">배송 도움말</button>\\n  <p class=\\"box\\">영업일 기준으로 계산합니다.</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/ui-tooltip.vue","steps":["hovered와 focused를 따로 두어 마우스와 키보드 상태를 독립적으로 기록합니다. visible은 두 상태 중 하나라도 true이면 설명을 표시합니다.","mouseenter/mouseleave는 마우스 진입과 이탈을, focus/blur는 키보드 포커스 진입과 이탈을 반영합니다. 마우스만 처리하면 키보드 사용자가 설명을 보지 못할 수 있습니다.","도움말이 보일 때 aria-describedby로 버튼과 설명을 연결합니다. 설명 ID에는 useId를 사용해 같은 컴포넌트를 여러 번 넣어도 중복되지 않도록 합니다."],"pitfall":"필수 정보는 툴팁 안에만 숨기지 마세요. 링크나 입력처럼 상호작용해야 하는 콘텐츠는 툴팁보다 펼침 패널이나 팝오버가 적절합니다.","checks":["마우스 진입 시 표시","키보드 Tab 포커스에서도 표시","두 상태가 모두 해제되면 숨김"]},{"id":"ui-toast","title":"자동으로 닫히는 토스트","category":"UI 인터랙션","level":"기본","question":"저장 버튼을 누르면 안내를 2초 동안 표시하세요. 연속 클릭하면 마지막 클릭부터 2초가 지나야 사라지게 만드세요.","html":"<section class=\\"workshop\\">\\n  <button type=\\"button\\">저장</button>\\n  <p class=\\"box\\">저장되었습니다.</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/ui-toast.vue","steps":["visible은 토스트 표시 여부이고 timer는 닫기 예약을 식별합니다. timer는 화면에 표시하지 않으므로 ref가 아닌 일반 변수로 두어도 됩니다.","notify가 호출되면 이전 timer를 먼저 취소합니다. 그다음 토스트를 보여주고 새 2초 타이머를 등록하므로 연속 클릭해도 가장 최근 요청의 시간이 기준이 됩니다.","role=\\"status\\"로 상태 메시지임을 전달합니다. 컴포넌트가 사라질 때도 timer를 지워 불필요한 콜백이 남지 않게 합니다."],"pitfall":"이 예제는 화면 안내이며 실제 저장 API를 호출하지 않습니다. 실제 서비스에서는 저장이 성공한 뒤 토스트를 띄우세요.","checks":["저장 클릭 시 표시","연속 클릭 시 시간 재시작","마지막 클릭 2초 후 숨김"]},{"id":"ui-counter","title":"최솟값과 최댓값이 있는 수량 버튼","category":"UI 인터랙션","level":"입문","question":"수량을 1~5 사이에서만 변경하도록 만들고, 경계에 도달하면 해당 방향 버튼을 비활성화하세요.","html":"<section class=\\"workshop\\">\\n  <div class=\\"row\\">\\n    <button type=\\"button\\">감소</button><output>1</output\\n    ><button type=\\"button\\">증가</button>\\n  </div>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/ui-counter.vue","steps":["quantity를 1로 시작하고 버튼에서 전달할 변화량을 -1 또는 1로 정합니다. 하나의 change 함수가 두 방향을 모두 처리합니다.","Math.max로 최솟값 1을 보장하고 Math.min으로 최댓값 5를 보장합니다. 이벤트가 어떤 경로로 호출되어도 상태가 허용 범위를 벗어나지 않습니다.","버튼 disabled는 사용자가 더 이동할 수 없는 방향을 알려줍니다. output의 aria-live로 값 변경이 조용히 전달되도록 합니다."],"pitfall":"상태 제한은 함수에서, 조작 가능 여부는 UI에서 각각 처리하세요. disabled만으로 데이터를 보호한다고 생각하지 않는 것이 좋습니다.","checks":["최소 수량 1","최대 수량 5","경계의 버튼 비활성"]},{"id":"ui-like","title":"좋아요 상태와 개수 연동","category":"UI 인터랙션","level":"입문","question":"좋아요를 누르면 개수가 1 늘고 취소하면 원래 수로 돌아오게 하세요. 중복 클릭으로 계속 증가하면 안 됩니다.","html":"<section class=\\"workshop\\">\\n  <button type=\\"button\\">좋아요 12</button>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/ui-like.vue","steps":["liked는 현재 사용자가 좋아요를 눌렀는지만 기록합니다. baseCount는 다른 사용자들의 기존 개수로 보고 12로 고정합니다.","count는 baseCount에 내 선택을 더한 computed입니다. 매번 숫자를 더하고 빼는 대신 상태에서 계산하면 취소·재선택 시 숫자가 누적되는 실수를 줄입니다.","버튼 클릭은 liked만 반전시킵니다. 문구·색상·aria-pressed·개수는 모두 이 상태를 읽어 동시에 변경됩니다."],"pitfall":"실제 서비스에서는 서버가 돌려준 최신 개수와 사용자 선택을 동기화해야 합니다. 이 예제의 숫자는 화면 상태 연습용입니다.","checks":["처음 12","선택하면 13","취소하면 12"]},{"id":"ui-chips","title":"여러 필터 칩 선택하기","category":"UI 인터랙션","level":"기본","question":"기술 태그를 여러 개 선택하거나 해제할 수 있게 만들고 선택된 태그 이름을 표시하세요.","html":"<section class=\\"workshop\\">\\n  <div class=\\"row\\">\\n    <button type=\\"button\\">Vue</button><button type=\\"button\\">SCSS</button\\n    ><button type=\\"button\\">Vite</button>\\n  </div>\\n  <p>선택 없음</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/ui-chips.vue","steps":["selected를 배열로 만들면 여러 선택값을 함께 보관할 수 있습니다. options는 가능한 전체 항목이고 selected는 그중 사용자가 고른 항목입니다.","toggle은 includes로 이미 선택한 항목인지 검사합니다. 선택되어 있으면 filter로 제거하고, 선택되지 않았으면 새 배열의 끝에 추가합니다.","버튼 강조와 aria-pressed도 includes를 사용합니다. 출력은 join으로 이름을 연결하고 빈 배열이면 안내 문구를 표시합니다."],"pitfall":"한 개만 선택해야 하는 UI라면 배열보다 단일 ID가 간단합니다. 다중 선택 요구와 단일 선택 요구를 먼저 구분하세요.","checks":["여러 태그 동시 선택","같은 태그 재클릭 시 해제","전체 해제 시 안내"]},{"id":"ui-readmore","title":"긴 설명 더 보기와 접기","category":"UI 인터랙션","level":"입문","question":"처음에는 짧은 설명만 보여주고 더 보기를 누르면 전체 설명으로 바꾸세요.","html":"<section class=\\"workshop\\">\\n  <p>Vue는 사용자 인터페이스를 만드는 도구입니다.</p>\\n  <button type=\\"button\\">더 보기</button>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/ui-readmore.vue","steps":["expanded는 전체 내용을 볼지 결정하는 상태입니다. summary와 full을 따로 두어 요약 문구를 임의의 글자 수로 자르지 않고 의도한 문장으로 제공할 수 있습니다.","description computed에서 expanded에 따라 반환할 문자열을 선택합니다. 템플릿에는 계산 과정 대신 description만 남겨 읽기 쉽게 만듭니다.","버튼은 상태를 반전시키며 접기/더 보기 문구와 aria-expanded를 동시에 변경합니다. 사용자는 현재 가능한 동작을 버튼 이름으로 알 수 있습니다."],"pitfall":"짧게 잘라도 되는 일반 텍스트 예제입니다. 링크나 입력이 들어 있는 복잡한 콘텐츠는 문자열로 합치기보다 별도 영역을 v-show/v-if로 제어하세요.","checks":["처음 요약 표시","더 보기 후 전체 내용","접기 후 요약 복귀"]},{"id":"ui-scroll","title":"목록 위로 이동하기","category":"UI 인터랙션","level":"기본","question":"긴 목록 내부를 스크롤한 뒤 버튼을 누르면 목록의 맨 위로 부드럽게 이동하게 만드세요.","html":"<section class=\\"workshop\\">\\n  <div class=\\"scroll box\\">\\n    <p>1번째 항목</p>\\n    <p>2번째 항목</p>\\n    <p>3번째 항목</p>\\n  </div>\\n  <button type=\\"button\\">목록 맨 위로</button>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/ui-scroll.vue","steps":["panel ref를 실제 스크롤 컨테이너에 연결합니다. 페이지 전체가 아니라 목록 내부만 움직여야 하므로 window가 아닌 이 요소의 scrollTo를 호출합니다.","top: 0은 컨테이너의 최상단 위치입니다. behavior: smooth로 이동 과정을 보여주되 사용자가 움직임 줄이기를 설정했다면 auto를 사용합니다.","30개 항목은 숫자 v-for로 생성하고 목록에는 tabindex와 aria-label을 제공합니다. 키보드 사용자도 목록에 진입해 스크롤할 수 있습니다."],"pitfall":"스크롤 컨테이너에 높이 제한과 overflow가 없으면 내부 스크롤이 생기지 않습니다. CSS의 max-height와 overflow 설정을 함께 확인하세요.","checks":["목록 내부만 스크롤","버튼으로 맨 위 이동","움직임 줄이기 설정 반영"]},{"id":"form-validation","title":"로그인 폼 유효성 검사","category":"폼 · 입력","level":"기본","question":"이메일 형식과 비밀번호 길이를 검사하고, 두 조건이 맞을 때만 제출 버튼을 활성화하세요.","html":"<section class=\\"workshop\\">\\n  <form>\\n    <label>이메일<input type=\\"email\\" /></label\\n    ><label>비밀번호<input type=\\"password\\" /></label><button type=\\"submit\\">로그인</button>\\n  </form>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/form-validation.vue","steps":["email과 password를 별도 ref에 저장합니다. 이메일에는 trim을 적용하지만 비밀번호는 사용자가 입력한 공백도 의미가 있을 수 있어 임의로 제거하지 않습니다.","valid는 이메일의 기본 형식과 비밀번호 길이를 동시에 검사하는 computed입니다. 두 값 중 하나만 바뀌어도 다시 계산되므로 버튼 상태를 별도로 갱신할 필요가 없습니다.","submit.prevent로 기본 페이지 이동을 막고 함수 안에서도 valid를 검사합니다. 이 예제는 입력 검증 통과 문구만 보여주며 인증 요청은 수행하지 않습니다."],"pitfall":"간단한 이메일 정규식은 모든 유효 주소를 완벽하게 검증하지 않습니다. 비밀번호 정책과 인증은 서버의 실제 요구사항에 맞춰 적용하세요.","checks":["빈 폼 제출 불가","이메일과 8자 비밀번호 입력","검증 통과 문구 표시"]},{"id":"form-count","title":"글자 수와 남은 입력 길이","category":"폼 · 입력","level":"입문","question":"소개글의 현재 글자 수와 남은 수를 실시간으로 표시하고 100자를 넘지 않게 하세요.","html":"<section class=\\"workshop\\">\\n  <label>소개글<textarea maxlength=\\"100\\"></textarea></label>\\n  <p>0 / 100자 · 100자 남음</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/form-count.vue","steps":["bio는 입력한 문자열이고 limit은 허용 길이입니다. limit을 한 곳에 정의해 maxlength와 안내 숫자가 다른 기준을 사용하지 않게 합니다.","v-model이 입력마다 bio를 갱신합니다. 현재 길이는 bio.length로 읽고 remaining은 최대 길이에서 현재 길이를 빼는 computed로 계산합니다.","남은 길이가 0이면 안내를 강조합니다. maxlength는 브라우저에서 입력 길이를 제한하고 표시 정보는 같은 상태를 기반으로 갱신됩니다."],"pitfall":"JavaScript length와 maxlength는 UTF-16 코드 단위를 기준으로 하므로 일부 이모지는 2 이상으로 계산됩니다. 서비스의 글자 수 정책과 서버 검증을 맞추세요.","checks":["입력할 때 개수 갱신","남은 수 감소","100자 도달 시 제한"]},{"id":"form-password","title":"비밀번호 표시 전환","category":"폼 · 입력","level":"입문","question":"비밀번호 값을 유지하면서 표시·숨기기 버튼으로 입력 type만 전환하세요.","html":"<section class=\\"workshop\\">\\n  <div class=\\"row\\">\\n    <label>비밀번호<input type=\\"password\\" /></label\\n    ><button type=\\"button\\">비밀번호 표시</button>\\n  </div>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/form-password.vue","steps":["password와 visible을 나누어 저장합니다. 실제 입력값은 password에 그대로 두고 visible은 보이는 방식만 제어합니다.","type을 조건부로 text 또는 password에 바인딩합니다. 입력 요소 두 개를 번갈아 만드는 방식보다 한 요소의 표시 속성만 바꾸면 값과 포커스 관리가 단순합니다.","표시 버튼에는 type=\\"button\\"을 지정합니다. 나중에 이 UI를 form 안에 넣어도 버튼 클릭이 폼 제출로 해석되지 않도록 하기 위해서입니다."],"pitfall":"입력 type을 password로 해도 값이 암호화되어 저장되는 것은 아닙니다. 비밀번호를 localStorage나 로그에 남기지 마세요.","checks":["처음 입력이 가려짐","표시 시 입력값 그대로 확인","숨기면 다시 가려짐"]},{"id":"form-dependent","title":"지역에 따라 하위 선택지 변경","category":"폼 · 입력","level":"기본","question":"시·도를 바꾸면 구·군 목록을 바꾸고 이전에 선택한 하위 값은 초기화하세요.","html":"<section class=\\"workshop\\">\\n  <label\\n    >지역<select>\\n      <option>서울</option>\\n      <option>부산</option>\\n    </select></label\\n  ><label\\n    >구·군<select>\\n      <option>강남구</option>\\n    </select></label\\n  >\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/form-dependent.vue","steps":["city는 상위 선택값, district는 하위 선택값입니다. data 객체에서 city 코드로 해당 지역의 하위 목록을 찾도록 구성합니다.","districts computed가 현재 도시의 목록을 반환합니다. 상위 선택이 바뀌면 option 목록도 자동으로 바뀌므로 DOM 옵션을 직접 지우고 추가하지 않아도 됩니다.","watch(city)는 도시 변경에 따른 부수 효과로 district를 비웁니다. 이 초기화가 없으면 서울의 강남구를 선택한 채 도시만 부산으로 바꾸는 잘못된 조합이 남을 수 있습니다."],"pitfall":"파생 목록은 computed, 이전 선택을 초기화하는 동작은 watch로 분리하세요. 두 기능의 역할을 구분하면 상태 흐름을 읽기 쉽습니다.","checks":["서울의 구 목록 표시","부산으로 바꾸면 하위 선택 초기화","부산의 구만 선택 가능"]},{"id":"form-selectall","title":"전체 선택과 일부 선택 표시","category":"폼 · 입력","level":"실무","question":"개별 체크박스와 전체 선택을 동기화하고, 일부만 선택하면 전체 선택 박스에 중간 상태를 표시하세요.","html":"<section class=\\"workshop\\">\\n  <label><input type=\\"checkbox\\" />전체 선택</label\\n  ><label><input type=\\"checkbox\\" />뉴스</label\\n  ><label><input type=\\"checkbox\\" />이벤트</label>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/form-selectall.vue","steps":["개별 체크박스는 selected 배열을 공유하고 각자의 value를 가집니다. 선택하면 해당 값이 배열에 들어가고 해제하면 빠집니다.","전체 선택용 computed는 getter와 setter를 모두 가집니다. getter는 모두 선택했는지 읽고 setter는 사용자가 전체 체크박스를 조작할 때 배열 전체를 채우거나 비웁니다.","partial은 하나 이상 선택했지만 전체는 아닌 상태입니다. indeterminate는 체크박스의 DOM 속성이므로 :indeterminate로 바인딩해 일부 선택을 시각적으로 구분합니다."],"pitfall":"옵션이 동적으로 삭제되거나 필터링되면 selected의 오래된 값도 정리해야 합니다. 이 예제는 옵션 목록이 고정되어 개수 비교를 사용합니다.","checks":["전체 선택 시 3개 선택","하나 해제하면 중간 상태","전체 해제 시 0개"]},{"id":"form-dynamic","title":"입력 행 추가와 삭제","category":"폼 · 입력","level":"실무","question":"팀원 이름 입력 행을 추가·삭제하고, 적어도 한 행은 남기세요. 삭제해도 다른 행의 입력값이 섞이지 않아야 합니다.","html":"<section class=\\"workshop\\">\\n  <div class=\\"row\\">\\n    <label>팀원 이름<input /></label><button type=\\"button\\">행 삭제</button>\\n  </div>\\n  <button type=\\"button\\">팀원 추가</button>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/form-dynamic.vue","steps":["각 입력 행을 id와 name을 가진 객체로 만듭니다. nextId는 새 행을 추가할 때만 증가하므로 삭제한 ID를 다른 행에 다시 배정하지 않습니다.","v-for와 :key=\\"row.id\\"로 행을 렌더링하고 입력은 row.name에 연결합니다. 이렇게 하면 중간 행을 지워도 남은 입력값은 각 객체와 함께 유지됩니다.","삭제 함수는 행이 둘 이상일 때만 실행합니다. 버튼에도 같은 조건의 disabled를 적용해 사용자에게 최소 한 행을 남기는 규칙을 보여줍니다."],"pitfall":"실제 동적 폼에서는 검증 오류도 행의 ID를 기준으로 관리하는 편이 안전합니다. index 기반 오류 배열은 중간 행 삭제 시 어긋날 수 있습니다.","checks":["행 추가 후 별도 입력","중간 행만 삭제","한 행 남으면 삭제 불가"]},{"id":"data-search","title":"검색어로 목록 필터링","category":"데이터 · 실무","level":"기본","question":"대소문자와 앞뒤 공백을 무시해 이름을 검색하고, 결과가 없으면 안내를 보여주세요.","html":"<section class=\\"workshop\\">\\n  <label>검색<input placeholder=\\"Vue\\" /></label>\\n  <ul>\\n    <li>Vue Guide</li>\\n    <li>Vite Build</li>\\n  </ul>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/data-search.vue","steps":["query만 사용자가 바꾸는 반응형 값이고 원본 items는 고정 목록입니다. filtered를 따로 수정하는 대신 원본과 검색어에서 계산하면 데이터가 불필요하게 복제되지 않습니다.","computed에서 검색어의 앞뒤 공백을 제거하고 소문자로 통일합니다. 항목 이름도 같은 방식으로 소문자로 바꿔 비교해야 대소문자 차이를 무시할 수 있습니다.","결과 개수와 목록은 같은 filtered를 사용합니다. 검색어가 비면 includes(빈 문자열)가 true가 되어 전체 목록이 돌아오고 결과가 없으면 빈 상태 안내가 나타납니다."],"pitfall":"검색 결과를 원본 items에 덮어쓰면 지워진 항목을 다시 찾기 어렵습니다. 원본 목록과 표시용 필터 결과를 분리하세요.","checks":["vue와 Vue가 같은 결과","공백 입력은 전체 목록","없는 단어는 빈 안내"]},{"id":"data-sort","title":"가격순 정렬과 원본 보존","category":"데이터 · 실무","level":"기본","question":"오름차순·내림차순 선택에 따라 상품 가격을 정렬하되 원본 상품 배열을 직접 바꾸지 마세요.","html":"<section class=\\"workshop\\">\\n  <label\\n    >정렬<select>\\n      <option>낮은 가격순</option>\\n      <option>높은 가격순</option>\\n    </select></label\\n  >\\n  <ul>\\n    <li>키보드 · 30000원</li>\\n    <li>마우스 · 18000원</li>\\n  </ul>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/data-sort.vue","steps":["order는 정렬 방향을 나타내는 코드입니다. products는 정렬하기 전 원본 목록으로 유지하고 sorted computed가 화면에 보여줄 순서를 만듭니다.","sort는 배열 자체를 변경하므로 [...products]로 복사한 뒤 호출합니다. 파생 값을 계산하는 과정에서 원본을 바꾸지 않으면 다른 기능이 같은 데이터를 사용할 때 부작용을 줄일 수 있습니다.","가격 오름차순은 a.price - b.price, 내림차순은 반대입니다. 숫자 비교 함수를 생략하면 문자열 기준 정렬이 될 수 있으므로 가격에는 비교 함수를 명시합니다."],"pitfall":"정렬된 목록에도 고유 ID를 key로 사용하세요. 위치 index를 key로 사용하면 정렬 전후 자식 컴포넌트의 상태가 잘못 연결될 수 있습니다.","checks":["낮은 가격순으로 시작","높은 가격순으로 변경","표시 금액은 숫자 기반"]},{"id":"data-cart","title":"수량 변경에 따른 장바구니 합계","category":"데이터 · 실무","level":"기본","question":"각 상품 수량을 1~5 사이에서 바꾸면 총액이 즉시 다시 계산되도록 만드세요.","html":"<section class=\\"workshop\\">\\n  <label>키보드 · 30000원<input type=\\"number\\" value=\\"1\\" min=\\"1\\" max=\\"5\\" /></label>\\n  <p>합계 30,000원</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/data-cart.vue","steps":["items에는 단가와 수량을 함께 저장합니다. total을 별도 ref로 저장하면 수량이 바뀔 때마다 직접 맞춰야 하므로 computed를 사용합니다.","reduce는 0에서 시작해 각 상품의 단가 × 수량을 누적합니다. 상품이 늘거나 수량이 변경되어도 같은 계산식으로 총액을 구할 수 있습니다.","입력값은 문자열일 수 있어 Number로 변환하고 유한한 숫자인지 검사합니다. 소수는 정수로 정리하고 1~5 범위로 제한한 뒤 데이터와 입력 표시를 함께 맞춥니다."],"pitfall":"min/max 속성만으로 모든 입력 경로의 값을 신뢰하지 마세요. 실제 주문 금액·할인·재고는 서버에서 다시 계산하고 검증해야 합니다.","checks":["초기 합계 48,000원","수량 변경 즉시 합계 갱신","수량은 정수 1~5로 유지"]},{"id":"data-debounce","title":"입력이 멈춘 뒤 검색 실행","category":"데이터 · 실무","level":"실무","question":"입력이 멈춘 뒤 350ms 후에 검색 결과를 갱신하세요. 새 입력이 들어오면 이전 대기 작업을 취소해야 합니다.","html":"<section class=\\"workshop\\">\\n  <label>검색<input placeholder=\\"Vue\\" /></label>\\n  <p>검색 결과가 여기에 표시됩니다.</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/data-debounce.vue","steps":["input은 입력창의 즉시 값이고 query는 실제 검색에 적용한 값입니다. 둘을 분리해야 타이핑 중에도 입력창은 자연스럽게 반응하면서 검색 반영만 늦출 수 있습니다.","watch는 input이 바뀔 때마다 350ms 타이머를 시작합니다. 그 전에 다시 입력되면 onCleanup이 이전 타이머를 지우고 마지막 값의 타이머만 남깁니다.","타이머가 끝나면 query를 갱신하고 waiting을 false로 바꿉니다. results computed는 input이 아니라 query를 읽으므로 마지막 입력이 확정된 시점에만 목록이 바뀝니다."],"pitfall":"실제 API 검색에서는 타이머 취소뿐 아니라 이미 시작한 요청의 취소나 최신 응답 확인도 필요합니다. 디바운스만으로 응답 순서 문제까지 해결되지는 않습니다.","checks":["빠르게 입력해도 마지막 값 반영","대기 중 안내 표시","350ms 뒤 결과 갱신"]},{"id":"data-async","title":"비동기 조회 상태 분리하기","category":"데이터 · 실무","level":"실무","question":"조회 전·로딩·성공·실패를 구분해 보여주고 실패 테스트 후 정상 재시도가 가능하게 만드세요.","html":"<section class=\\"workshop\\">\\n  <label><input type=\\"checkbox\\" />실패 테스트</label><button type=\\"button\\">조회</button>\\n  <p>조회 전입니다.</p>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/data-async.vue","steps":["loading·error·loaded·rows를 역할에 따라 나눕니다. 배열이 비었다는 사실만으로는 조회 전인지, 성공했지만 결과가 없는지, 실패했는지 구분할 수 없습니다.","load가 시작될 때 이전 오류와 결과를 정리하고 요청 시작 시점의 fail을 복사합니다. 대기 중 다른 상태가 바뀌더라도 진행 중인 작업의 조건이 뒤늦게 바뀌지 않게 합니다.","조건부 렌더링은 로딩 → 오류 → 성공 → 초기 순서로 검사합니다. 이 예제는 setTimeout으로 서버 응답을 흉내 내며 종료 시 타이머를 제거합니다."],"pitfall":"실제 fetch에서는 response.ok 확인과 try/catch/finally, AbortController 정리가 필요합니다. 이 예제는 외부 네트워크 없이 UI 상태 전환을 배우는 용도입니다.","checks":["로딩 중 중복 조회 차단","실패 테스트 후 오류 표시","실패 해제 후 정상 재시도"]},{"id":"data-timer","title":"자동 카운트와 생명주기 정리","category":"데이터 · 실무","level":"실무","question":"시작·일시정지·초기화가 가능한 초 카운터를 만들고, 화면을 떠나면 타이머를 정리하세요.","html":"<section class=\\"workshop\\">\\n  <output>0초</output>\\n  <div class=\\"row\\">\\n    <button type=\\"button\\">시작</button><button type=\\"button\\">일시정지</button\\n    ><button type=\\"button\\">초기화</button>\\n  </div>\\n</section>","css":".workshop {\\n  display: grid;\\n  gap: 14px;\\n  padding: 20px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 12px;\\n}\\n.workshop .row {\\n  display: flex;\\n  flex-wrap: wrap;\\n  align-items: center;\\n  gap: 10px;\\n}\\n.workshop .box {\\n  padding: 14px;\\n  border: 1px solid var(--border, #d5d9e2);\\n  border-radius: 8px;\\n}\\n.workshop .active {\\n  color: var(--primary, #6254e7);\\n  background: var(--soft, #efedff);\\n  border-color: currentColor;\\n}\\n.workshop .muted {\\n  color: var(--muted, #6b7280);\\n}\\n.workshop .error {\\n  color: #c24141;\\n}\\n.workshop label {\\n  display: grid;\\n  gap: 6px;\\n}\\n.workshop input,\\n.workshop select,\\n.workshop textarea {\\n  max-width: 100%;\\n  min-width: 0;\\n}\\n.workshop ul,\\n.workshop ol {\\n  padding-left: 22px;\\n}\\n.workshop li {\\n  margin: 7px 0;\\n}\\n.workshop button {\\n  cursor: pointer;\\n}\\n.workshop button:disabled {\\n  cursor: default;\\n  opacity: 0.5;\\n}\\n.workshop .bar {\\n  height: 10px;\\n  background: var(--soft, #efedff);\\n  border-radius: 5px;\\n}\\n.workshop dialog {\\n  padding: 24px;\\n  border: 1px solid #cbd5e1;\\n  border-radius: 12px;\\n  background: var(--surface, #fff);\\n  color: var(--text, #111827);\\n  max-width: min(90vw, 420px);\\n}\\n.workshop dialog::backdrop {\\n  background: #0008;\\n}\\n.workshop .scroll {\\n  max-height: 180px;\\n  overflow: auto;\\n}\\n.workshop table {\\n  width: 100%;\\n  border-collapse: collapse;\\n}\\n.workshop td,\\n.workshop th {\\n  padding: 10px;\\n  text-align: left;\\n  border-bottom: 1px solid var(--border, #d5d9e2);\\n}","sourceFile":"/src/components/practice/data-timer.vue","steps":["seconds는 표시할 시간이고 running은 타이머가 동작 중인지 나타냅니다. timer는 setInterval을 중지하기 위한 식별자라 일반 변수로 관리합니다.","start 함수는 이미 실행 중이면 바로 종료합니다. 이 검사 없이 반복 시작하면 여러 interval이 동시에 돌아 카운트가 비정상적으로 빨라질 수 있습니다.","pause는 interval을 제거하고 running을 false로 바꿉니다. reset은 pause를 재사용한 뒤 시간을 0으로 돌리고, onUnmounted에서도 pause를 호출해 화면 밖 작업을 남기지 않습니다."],"pitfall":"setInterval은 정확한 시계가 아니며 백그라운드 탭에서 지연될 수 있습니다. 정확한 경과 시간이 필요하면 시작 시각과 현재 시각의 차이로 계산하세요.","checks":["시작 후 초 증가","일시정지하면 유지","초기화 후 0초와 정지 상태"]}]'),b=R,S=[...new Set(R.map(D=>D.category))],Nn={class:"practice"},$n={class:"practice__intro"},Hn={class:"practice__categories","aria-label":"문제 분야 요약"},jn={class:"practice__total"},Bn={class:"practice__layout"},Gn={class:"practice__catalog","aria-label":"실무 문제 목록"},Jn={class:"practice__muted"},Qn={"aria-label":"문제 선택"},Wn=["aria-current","onClick"],Xn=["aria-label"],Kn={class:"practice__heading"},zn={class:"practice__question"},Yn={class:"practice__preview","aria-label":"화면보기"},Zn={class:"practice__preview-heading"},no=["aria-expanded"],oo={key:0,id:"practice-preview"},ro={class:"practice__preview-tabs","aria-label":"미리보기 화면 선택"},eo=["aria-pressed"],po=["aria-pressed"],to=["srcdoc"],ao={class:"practice__live","aria-label":"완성 화면 미리보기"},so={class:"practice__starter","aria-label":"문제 HTML과 CSS"},io=["aria-expanded"],lo={key:0,id:"practice-answer",class:"practice__solution","aria-label":"정답과 상세 해설"},co={class:"practice__steps"},uo={class:"practice__note"},bo={class:"practice__note"},ho={class:"practice__actions"},wo=["disabled"],ko=["disabled"],xo={key:1,class:"practice__empty",role:"status"},go={__name:"exercises",setup(D){const i=h(b[0].id),f=h("전체"),v=h("전체"),_=h(""),w=h(!1),k=h(!0),x=h("html"),{theme:V}=z(),d=y(()=>b.find(s=>s.id===i.value)),M=y(()=>Y(d.value.html,d.value.css,V.value==="dark")),l=y(()=>b.filter(s=>(f.value==="전체"||s.category===f.value)&&(v.value==="전체"||s.level===v.value)&&`${s.title} ${s.question} ${s.category}`.toLowerCase().includes(_.value.trim().toLowerCase())));T(l,s=>{s.length&&!s.some(n=>n.id===i.value)&&(i.value=s[0].id)}),T(i,()=>{w.value=!1,k.value=!0,x.value="html"});const U=Object.assign({"/src/components/practice/data-async.vue":Z,"/src/components/practice/data-cart.vue":nn,"/src/components/practice/data-debounce.vue":on,"/src/components/practice/data-search.vue":rn,"/src/components/practice/data-sort.vue":en,"/src/components/practice/data-timer.vue":pn,"/src/components/practice/for-cards.vue":tn,"/src/components/practice/for-groups.vue":dn,"/src/components/practice/for-keys.vue":an,"/src/components/practice/for-nested.vue":sn,"/src/components/practice/for-options.vue":ln,"/src/components/practice/for-pages.vue":cn,"/src/components/practice/for-table.vue":un,"/src/components/practice/for-todo.vue":bn,"/src/components/practice/form-count.vue":hn,"/src/components/practice/form-dependent.vue":wn,"/src/components/practice/form-dynamic.vue":kn,"/src/components/practice/form-password.vue":xn,"/src/components/practice/form-selectall.vue":gn,"/src/components/practice/form-validation.vue":fn,"/src/components/practice/if-empty.vue":vn,"/src/components/practice/if-error.vue":mn,"/src/components/practice/if-loading.vue":yn,"/src/components/practice/if-login.vue":_n,"/src/components/practice/if-role.vue":In,"/src/components/practice/if-show.vue":Cn,"/src/components/practice/if-step.vue":En,"/src/components/practice/if-stock.vue":Dn,"/src/components/practice/ui-accordion.vue":Vn,"/src/components/practice/ui-chips.vue":qn,"/src/components/practice/ui-counter.vue":Tn,"/src/components/practice/ui-dropdown.vue":Ln,"/src/components/practice/ui-like.vue":On,"/src/components/practice/ui-modal.vue":An,"/src/components/practice/ui-readmore.vue":Pn,"/src/components/practice/ui-scroll.vue":Fn,"/src/components/practice/ui-tabs.vue":Sn,"/src/components/practice/ui-toast.vue":Rn,"/src/components/practice/ui-toggle.vue":Mn,"/src/components/practice/ui-tooltip.vue":Un}),N=Object.assign({"/src/components/practice/data-async.vue":()=>r(()=>import("./data-async-BHNFat2a.js"),__vite__mapDeps([0,1,2,3])),"/src/components/practice/data-cart.vue":()=>r(()=>import("./data-cart-Bix5uMKv.js"),__vite__mapDeps([4,1,2,5])),"/src/components/practice/data-debounce.vue":()=>r(()=>import("./data-debounce-DGe-IKlC.js"),__vite__mapDeps([6,1,2,7])),"/src/components/practice/data-search.vue":()=>r(()=>import("./data-search-C301vXpe.js"),__vite__mapDeps([8,1,2,9])),"/src/components/practice/data-sort.vue":()=>r(()=>import("./data-sort-CPwMSX39.js"),__vite__mapDeps([10,1,2,11])),"/src/components/practice/data-timer.vue":()=>r(()=>import("./data-timer-C53jadFu.js"),__vite__mapDeps([12,1,2,13])),"/src/components/practice/for-cards.vue":()=>r(()=>import("./for-cards-B9k7Jea7.js"),__vite__mapDeps([14,1,2,15])),"/src/components/practice/for-groups.vue":()=>r(()=>import("./for-groups-CG2yxQ1P.js"),__vite__mapDeps([16,1,2,17])),"/src/components/practice/for-keys.vue":()=>r(()=>import("./for-keys-DI_FNLxF.js"),__vite__mapDeps([18,1,2,19])),"/src/components/practice/for-nested.vue":()=>r(()=>import("./for-nested-D2hRUu2j.js"),__vite__mapDeps([20,1,2,21])),"/src/components/practice/for-options.vue":()=>r(()=>import("./for-options-BprXn2PN.js"),__vite__mapDeps([22,1,2,23])),"/src/components/practice/for-pages.vue":()=>r(()=>import("./for-pages-BwnWF9wm.js"),__vite__mapDeps([24,1,2,25])),"/src/components/practice/for-table.vue":()=>r(()=>import("./for-table-DAP09b3A.js"),__vite__mapDeps([26,1,2,27])),"/src/components/practice/for-todo.vue":()=>r(()=>import("./for-todo-dXBkx4Hd.js"),__vite__mapDeps([28,1,2,29])),"/src/components/practice/form-count.vue":()=>r(()=>import("./form-count-Bc0YUuww.js"),__vite__mapDeps([30,1,2,31])),"/src/components/practice/form-dependent.vue":()=>r(()=>import("./form-dependent-D1JtV07f.js"),__vite__mapDeps([32,1,2,33])),"/src/components/practice/form-dynamic.vue":()=>r(()=>import("./form-dynamic-DurGHuM5.js"),__vite__mapDeps([34,1,2,35])),"/src/components/practice/form-password.vue":()=>r(()=>import("./form-password-DBnoBPkc.js"),__vite__mapDeps([36,1,2,37])),"/src/components/practice/form-selectall.vue":()=>r(()=>import("./form-selectall-Cvg068ap.js"),__vite__mapDeps([38,1,2,39])),"/src/components/practice/form-validation.vue":()=>r(()=>import("./form-validation-BNUWZLSD.js"),__vite__mapDeps([40,1,2,41])),"/src/components/practice/if-empty.vue":()=>r(()=>import("./if-empty-B9W4osuE.js"),__vite__mapDeps([42,1,2,43])),"/src/components/practice/if-error.vue":()=>r(()=>import("./if-error-BgWLVsTy.js"),__vite__mapDeps([44,1,2,45])),"/src/components/practice/if-loading.vue":()=>r(()=>import("./if-loading-BdFggIXc.js"),__vite__mapDeps([46,1,2,47])),"/src/components/practice/if-login.vue":()=>r(()=>import("./if-login-BB6XtX7S.js"),__vite__mapDeps([48,1,2,49])),"/src/components/practice/if-role.vue":()=>r(()=>import("./if-role-CKPNQMU2.js"),__vite__mapDeps([50,1,2,51])),"/src/components/practice/if-show.vue":()=>r(()=>import("./if-show-BTELO0cI.js"),__vite__mapDeps([52,1,2,53])),"/src/components/practice/if-step.vue":()=>r(()=>import("./if-step-BBfLNzp_.js"),__vite__mapDeps([54,1,2,55])),"/src/components/practice/if-stock.vue":()=>r(()=>import("./if-stock-DvCV7YJl.js"),__vite__mapDeps([56,1,2,57])),"/src/components/practice/ui-accordion.vue":()=>r(()=>import("./ui-accordion-D0nQIl-m.js"),__vite__mapDeps([58,1,2,59])),"/src/components/practice/ui-chips.vue":()=>r(()=>import("./ui-chips-DBB2CGvY.js"),__vite__mapDeps([60,1,2,61])),"/src/components/practice/ui-counter.vue":()=>r(()=>import("./ui-counter-CNdFbLlm.js"),__vite__mapDeps([62,1,2,63])),"/src/components/practice/ui-dropdown.vue":()=>r(()=>import("./ui-dropdown-Iyz7kdJ5.js"),__vite__mapDeps([64,1,2,65])),"/src/components/practice/ui-like.vue":()=>r(()=>import("./ui-like-B9wh4HV6.js"),__vite__mapDeps([66,1,2,67])),"/src/components/practice/ui-modal.vue":()=>r(()=>import("./ui-modal-B9vtIbfU.js"),__vite__mapDeps([68,1,2,69])),"/src/components/practice/ui-readmore.vue":()=>r(()=>import("./ui-readmore-B-P1xxks.js"),__vite__mapDeps([70,1,2,71])),"/src/components/practice/ui-scroll.vue":()=>r(()=>import("./ui-scroll-Cihm11B1.js"),__vite__mapDeps([72,1,2,73])),"/src/components/practice/ui-tabs.vue":()=>r(()=>import("./ui-tabs-_0w8V-xj.js"),__vite__mapDeps([74,1,2,75])),"/src/components/practice/ui-toast.vue":()=>r(()=>import("./ui-toast-DU3QPW16.js"),__vite__mapDeps([76,1,2,77])),"/src/components/practice/ui-toggle.vue":()=>r(()=>import("./ui-toggle-1EAcg1A0.js"),__vite__mapDeps([78,1,2,79])),"/src/components/practice/ui-tooltip.vue":()=>r(()=>import("./ui-tooltip-C5gljIn6.js"),__vite__mapDeps([80,1,2,81]))}),$=Object.fromEntries(b.map(s=>[s.id,B(G(N[s.sourceFile]))])),H=y(()=>({["practice/"+d.value.id+".vue"]:U[d.value.sourceFile]})),I=y(()=>l.value.findIndex(s=>s.id===i.value));function q(s){const n=l.value[I.value+s];n&&(i.value=n.id)}return(s,n)=>(t(),a("section",Nn,[o("header",$n,[n[10]||(n[10]=o("span",{class:"practice__eyebrow"},"QUESTION & ANSWER · VUE 3",-1)),n[11]||(n[11]=o("h1",null,[m(" Vue 실무예제 "),o("small",null,"문제 → 정답 → 상세 해설")],-1)),n[12]||(n[12]=o("p",null," 화면보기에서 HTML·CSS 문제 화면과 완성된 Vue 동작을 비교해 보세요. 정답을 열면 전체 Vue 코드와 단계별 설명을 확인할 수 있습니다. ",-1)),o("div",Hn,[(t(!0),a(c,null,g(u(S),e=>(t(),a("span",{key:e},[m(p(e)+" ",1),o("strong",null,p(u(b).filter(C=>C.category===e).length),1)]))),128))]),o("p",jn," 총 "+p(u(b).length)+"문제 · 조건문부터 실제 UI 상태 관리까지 ",1)]),o("div",Bn,[o("aside",Gn,[o("label",null,[n[13]||(n[13]=m(" 문제 검색 ",-1)),E(o("input",{"onUpdate:modelValue":n[0]||(n[0]=e=>_.value=e),type:"search",placeholder:"if, for, 모달, 검색…"},null,512),[[J,_.value]])]),o("label",null,[n[15]||(n[15]=m(" 분야 ",-1)),E(o("select",{"onUpdate:modelValue":n[1]||(n[1]=e=>f.value=e)},[n[14]||(n[14]=o("option",null,"전체",-1)),(t(!0),a(c,null,g(u(S),e=>(t(),a("option",{key:e},p(e),1))),128))],512),[[L,f.value]])]),o("label",null,[n[17]||(n[17]=m(" 난이도 ",-1)),E(o("select",{"onUpdate:modelValue":n[2]||(n[2]=e=>v.value=e)},[...n[16]||(n[16]=[o("option",null,"전체",-1),o("option",null,"입문",-1),o("option",null,"기본",-1),o("option",null,"실무",-1)])],512),[[L,v.value]])]),o("p",Jn,p(l.value.length)+"개 문제",1),o("nav",Qn,[(t(!0),a(c,null,g(l.value,e=>(t(),a("button",{key:e.id,type:"button","aria-current":i.value===e.id?"true":void 0,onClick:C=>i.value=e.id},[o("small",null,p(e.category)+" · "+p(e.level),1),o("strong",null,p(u(b).indexOf(e)+1)+". "+p(e.title),1)],8,Wn))),128))])]),l.value.length?(t(),a("article",{key:0,class:"practice__problem","aria-label":d.value.title},[o("header",Kn,[o("span",null," 문제 "+p(u(b).indexOf(d.value)+1)+" · "+p(d.value.category)+" · "+p(d.value.level),1),o("h2",null,p(d.value.title),1)]),o("section",zn,[n[18]||(n[18]=o("h3",null,"문제",-1)),o("p",null,p(d.value.question),1),n[19]||(n[19]=o("h4",null,"만들어야 할 동작",-1)),o("ul",null,[(t(!0),a(c,null,g(d.value.checks,e=>(t(),a("li",{key:e},p(e),1))),128))])]),o("section",Yn,[o("header",Zn,[n[20]||(n[20]=o("h3",null,"화면보기",-1)),o("button",{type:"button","aria-expanded":k.value,"aria-controls":"practice-preview",onClick:n[3]||(n[3]=e=>k.value=!k.value)},p(k.value?"화면 접기":"화면보기"),9,no)]),k.value?(t(),a("div",oo,[o("nav",ro,[o("button",{type:"button","aria-pressed":x.value==="html",onClick:n[4]||(n[4]=e=>x.value="html")}," 문제 화면 · HTML/CSS ",8,eo),o("button",{type:"button","aria-pressed":x.value==="complete",onClick:n[5]||(n[5]=e=>x.value="complete")}," 완성 화면 · Vue 동작 ",8,po)]),x.value==="html"?(t(),a(c,{key:0},[n[21]||(n[21]=o("p",{class:"practice__muted"}," 주어진 HTML·CSS를 그대로 표시한 화면입니다. Vue 이벤트는 아직 연결되지 않았습니다. ",-1)),(t(),a("iframe",{key:d.value.id+u(V),class:"practice__frame",title:"문제 화면 미리보기",srcdoc:M.value,sandbox:"",referrerpolicy:"no-referrer"},null,8,to))],64)):(t(),a(c,{key:1},[n[22]||(n[22]=o("p",{class:"practice__muted"}," 목표로 하는 완성 화면입니다. 버튼과 입력창을 직접 조작해 동작을 확인하세요. 정답 코드는 아래에서 따로 열 수 있습니다. ",-1)),o("div",ao,[(t(),O(Q(u($)[d.value.id]),{key:d.value.id}))])],64))])):A("",!0)]),o("section",so,[n[23]||(n[23]=o("h3",null,"주어진 HTML",-1)),n[24]||(n[24]=o("p",{class:"practice__muted"}," 아직 Vue 동작이 없는 정적 마크업입니다. 필요한 상태, 이벤트, 화면 조건을 먼저 생각해 보세요. ",-1)),P(F,{code:d.value.html,language:"html",label:"문제 HTML",class:"practice__code"},null,8,["code"]),n[25]||(n[25]=o("h3",null,"주어진 CSS",-1)),P(F,{code:d.value.css,language:"css",label:"문제 CSS",class:"practice__code"},null,8,["code"])]),o("button",{class:"practice__answer-toggle",type:"button","aria-expanded":w.value,"aria-controls":"practice-answer",onClick:n[6]||(n[6]=e=>w.value=!w.value)},p(w.value?"정답과 해설 닫기 ↑":"정답과 해설 보기 ↓"),9,io),w.value?(t(),a("section",lo,[n[30]||(n[30]=o("header",null,[o("span",{class:"practice__eyebrow"},"ANSWER & EXPLANATION"),o("h3",null,"정답을 이해하는 순서"),o("p",null,"코드를 그대로 외우기보다 상태가 어떻게 바뀌고 화면이 무엇을 읽는지 따라가 보세요.")],-1)),o("ol",co,[(t(!0),a(c,null,g(d.value.steps,(e,C)=>(t(),a("li",{key:e},[o("strong",null,"단계 "+p(C+1),1),o("p",null,p(e),1)]))),128))]),o("aside",uo,[n[26]||(n[26]=o("h4",null,"자주 헷갈리는 점",-1)),o("p",null,p(d.value.pitfall),1)]),n[31]||(n[31]=W('<details class="practice__note practice__glossary" data-v-5afa848f><summary data-v-5afa848f>처음 보는 Vue 문법, 간단히 이해하기</summary><dl data-v-5afa848f><dt data-v-5afa848f>ref · .value</dt><dd data-v-5afa848f> 화면과 연결할 값을 담습니다. script 안에서는 .value로 읽고 바꾸고, template에서는 이름만 사용합니다. </dd><dt data-v-5afa848f>computed</dt><dd data-v-5afa848f> 기존 값에서 계산하는 결과입니다. 수량이 바뀌면 합계도 다시 계산되는 식으로, 원본 상태와 결과를 따로 맞출 필요가 없습니다. </dd><dt data-v-5afa848f>watch</dt><dd data-v-5afa848f> 어떤 값이 바뀌었을 때 실행할 일을 정합니다. 지역이 바뀌면 하위 선택을 비우는 것처럼 상태 변경에 따른 작업을 처리합니다. </dd><dt data-v-5afa848f>v-if · v-show</dt><dd data-v-5afa848f> v-if는 조건에 따라 HTML 요소를 만들거나 제거합니다. v-show는 요소를 남긴 채 보이기만 전환합니다. </dd><dt data-v-5afa848f>v-for · :key</dt><dd data-v-5afa848f> 배열의 각 항목으로 같은 구조를 반복합니다. key는 순서가 바뀌어도 같은 항목을 알아볼 수 있게 하는 이름표입니다. </dd><dt data-v-5afa848f>v-model</dt><dd data-v-5afa848f> 입력창의 값과 Vue 상태를 연결합니다. 사용자가 입력하면 상태가 바뀌고, 코드에서 상태를 바꾸면 입력창도 갱신됩니다. </dd><dt data-v-5afa848f>@click · :disabled · :class</dt><dd data-v-5afa848f> @는 이벤트가 발생했을 때 실행할 일입니다. :는 속성 값을 고정된 글자가 아니라 현재 Vue 상태로 계산하겠다는 뜻입니다. </dd><dt data-v-5afa848f>onUnmounted</dt><dd data-v-5afa848f> 컴포넌트가 화면에서 제거될 때 실행합니다. 타이머나 전역 이벤트처럼 자동으로 사라지지 않는 작업을 정리합니다. </dd></dl></details>',1)),(t(),O(K,{key:d.value.id,title:"정답 · 전체 Vue 코드",description:"script setup · template · scoped SCSS가 포함된 완성 파일입니다.",files:H.value,"initially-expanded":!0},{default:X(()=>[...n[27]||(n[27]=[o("p",{class:"practice__muted"}," 문제 위의 ‘화면보기 → 완성 화면 · Vue 동작’에서 실행 결과를 확인하세요. ",-1)])]),_:1},8,["files"])),o("aside",bo,[n[28]||(n[28]=o("h4",null,"이렇게 확인해 보세요",-1)),o("ol",null,[(t(!0),a(c,null,g(d.value.checks,e=>(t(),a("li",{key:e},p(e),1))),128))]),n[29]||(n[29]=o("p",null,"위 화면보기에서 결과를 확인한 뒤 전체 코드를 복사해 내 프로젝트에서 바꿔 보세요.",-1))])])):A("",!0),o("footer",ho,[o("button",{type:"button",disabled:I.value<=0,onClick:n[7]||(n[7]=e=>q(-1))},"← 이전 문제",8,wo),o("span",null,p(I.value+1)+" / "+p(l.value.length),1),o("button",{type:"button",disabled:I.value>=l.value.length-1,onClick:n[8]||(n[8]=e=>q(1))}," 다음 문제 → ",8,ko)])],8,Xn)):(t(),a("section",xo,[n[32]||(n[32]=o("h2",null,"검색 결과가 없습니다.",-1)),n[33]||(n[33]=o("p",null,"검색어·분야·난이도를 바꿔 주세요.",-1)),o("button",{onClick:n[9]||(n[9]=e=>{_.value="",f.value="전체",v.value="전체"})}," 전체 문제 보기 ")]))])]))}},yo=j(go,[["__scopeId","data-v-5afa848f"]]);export{yo as default};
