<template>
  <layout>
    <router-view></router-view>
  </layout>
  
  <!-- <router-view></router-view> -->
  <slot />
</template>
<script>
import Layout from '/src/components/Layouts/Layout.vue';
export default {
  setup()
  {

  },
}
</script>

<!-- <style>
@import '@/assets/css/artist-ui.css';
</style> -->