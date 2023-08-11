<template>
  <div>
    <blank-header />
    <!-- <slot /> -->
    <router-view />
  </div>
</template>

<script>
import BlankHeader from "@/components/Home/BlankHeader.vue";

export default {
  components: {
    BlankHeader,
  },
  watch: {
  },
  props: {
  },
  methods: {
  },
  created () {
  },
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>