<template>
  <div class="request-application-wrap">
    <div class="content">
        <request-application />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import RequestApplication from './Request Application/Index.vue';
export default {
  components: {
    RequestApplication
  },
  setup()
  {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>