<template>
  <div class="managed-subscriptions">
    <div class="content">
      <managed-subscriptions />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import ManagedSubscriptions from './Managed Subscriptions/Index.vue';

export default {
  components: {
    ManagedSubscriptions
  },
  setup()
  {


    return {}
  }
}
</script>

<style lang="scss" scoped></style>