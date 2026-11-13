<script setup>
import PeopleDirectory from '@/components/examples/PeopleDirectory.vue';
</script>
<template>
  <section class="demo">
    <PeopleDirectory mode="contacts" />
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
