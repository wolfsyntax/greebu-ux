<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  {{ $store.state.roles}}
  <router-view></router-view>
</template>
<script>
export default {
  setup() {
  },
  // compatConfig: { MODE: 3 },
}
</script>
<style scoped>

</style>
