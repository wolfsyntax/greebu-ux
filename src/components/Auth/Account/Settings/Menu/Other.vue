<template>
  <div class="others">
    <div class="content">
      <others />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Others from './Artist Other Settings/Index.vue';
export default {
  components: {
    Others
  },
  setup()
  {


    return {}
  }
}
</script>

<style lang="scss" scoped></style>