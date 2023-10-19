<template>
  <div class="customized-songs">
    <div class="content">
     <customized-song />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import CustomizedSong from './Customized Song/Index.vue';
export default {
  components: {
    CustomizedSong
  },
  setup()
  {


    return {}
  }
}
</script>

<style lang="scss" scoped></style>