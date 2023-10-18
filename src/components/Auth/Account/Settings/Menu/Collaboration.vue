<template>
  <div class="collaboration">
    <div class="content">
      <collaboration />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Collaboration from './Collaboration/Index.vue'

export default {
  components: {
    Collaboration
  },
  setup()
  {


    return {}
  }
}
</script>

<style lang="scss" scoped></style>