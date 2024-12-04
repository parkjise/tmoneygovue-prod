<template>
  <div>
    <div>
      <h4>
        POSTS 목록 페이지
        <button @click="onClcikRefresh">새로고침</button>
        &nbsp;&nbsp;
        <button @click="onClickCreate">새글작성</button>
      </h4>
    </div>

    <!-- -->
    <view-list
      :items="state.posts"
      :isLoadingPostItems="postStore.isLodingPosts"
      :donePostItems="postStore.isDonePosts"
      :onClickMoreBtn_="actionMore"
      :onClickEditBtn_="actionEdit"
      :onClickReadBtn_="actionRead"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { cloneDeep } from 'lodash-es';

import ViewList from '@/views/sample/components/ViewList.vue';
import { usePostStore } from '@/service/sample/postsModule';
import { logger } from '@/utils/logger';
import type { PostInfoModel } from '@/service/sample/model/postModel';

interface stateType {
  posts: PostInfoModel[];
}

/* request, prepare, on, cb, action */
const router = useRouter();
const route = useRoute();
const postStore = usePostStore();
const state: stateType = reactive({ posts: [] });

async function requestApiHttpPosts() {
  const resResult = await postStore.setHttpPostsAction();
  if (resResult) {
    prepareData();
  }
}

function prepareData() {
  const items = postStore.getPosts;
  if (items.length > 0) {
    const posts_ = cloneDeep(items);
    /*
          데이터 가공 영역
        */
    state.posts = posts_;
  }
}

async function actionMore() {
  logger.debug('postsList actionMore');
}
function actionEdit() {
  logger.debug('postsList actionEdit');
}
/**
 * router를 사용해서 값 전달을 할때는 아래의 방식중에 사용한다
 * 1. query (http get 방식으로 전달. ex. /posts-detail?id=1)
 * 2. url 방식 (url에 포함되어 전달. ex. /posts-detail/1)
 * 3. pinin store를 사용하여 전달
 * 4. state 방식 (ex. router.push({name: 'posts-detail', state: {testValue: id}});). 받을때는 history.state로 받는다
 *
 * params를 사용하는것은 안티패턴으로 지양한다(https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22)
 */
function actionRead(id: string) {
  alert('read ' + id);
  router.push({
    name: 'posts-detail',
    state: { testValue: id }
  });
}

function onClcikRefresh() {
  requestApiHttpPosts();
}

function onClickCreate() {
  router.push({
    path: '/posts-create',
    query: { ...route.query }
  });
}

onMounted(() => {
  logger.debug('mounted postsList');
  requestApiHttpPosts();
  logger.debug('process.env.TEST_VALUE1', import.meta.env.VITE_TEST_VALUE1);
});
onUnmounted(() => {
  logger.debug('unmounted postsList');
});
</script>
