<template>
  <layout>
    <router-view></router-view>
  </layout>
  
</template>
<script>
import Layout from '@/components/Layouts/Layout.vue';
export default {
  setup()
  {

  },
  components: {
    layout: Layout,
  }
}
</script>
<style>
@import '@/assets/css/artist-ui.css';
</style>