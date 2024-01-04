<template>
    <div id="coming-soon">
      <div class="text-center soon-wrap">
        <h2 class="coming">Coming soon..</h2>
        <p class="ready">Get ready for something exciting!</p>
        <button type="button" @click="$router.push({name: 'home' })" class="btn goto">Go to Homepage</button>
      </div>
    </div>
</template>

<script>

export default {
  props: {
  },
  setup () {
    return {}
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>

</style>
