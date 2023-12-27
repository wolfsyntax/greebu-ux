<template>
  <div>
    <input type="radio" aria-label="Monthly subscription" v-model="plan" value="monthly" />
    <input type="radio" aria-label="Yearly subscription" v-model="plan" value="yearly" />
    <button type="button">Continue</button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  setup () {
    return {}
  },
  data: () => ({
    plan: 'monthly',
    pricing: {
      monthly: 100,
      yearly: 1000
    }
  }),
  methods: {
    ...mapActions([]),
    ...mapMutations(['setSubscription'])
  },
  watch: {
    plan: {
      handler (val) {
        if (val) {
          this.setSubscription({})
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
