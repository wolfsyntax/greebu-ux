<template>
  <div
    class="d-flex justify-content-between"
    id="showToastMsg"

  >
    <div class="d-flex accepted-wrapper">
      <span class="material-symbols-rounded check-circle">&#xe86c;</span>
      <div>
        <h5 class="accepted">{{ message }}</h5>
        <p class="description">{{ description }}</p>
      </div>
    </div>

    <div class="close-toast">
      <span class="material-symbols-rounded close-icon" @click="$emit('hide-toast')"
        >&#xe5cd;</span
      >
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    message: String,
    description: String
  },
  data () {
    return {
      // showToast: true
    }
  },
  computed: {},
  methods: {
  }
}
</script>

<style>
/* Styles for your modal */
</style>
