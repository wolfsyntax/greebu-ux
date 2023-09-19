<template>
  <div class="">
    <button class="btn btn-primary btn-lg" @click="toggle()">Upload Song</button>
    <button class="btn btn-primary btn-lg" @click="toggle('album')">Upload Song</button>
    <info-modal :usage="modelType" />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import InfoModal from '@/components/Artist/Library/InfoModal.vue';

import { Modal } from "bootstrap";

export default {
  components: {
    InfoModal,
  },
  data: () => ({
    modalType: 'song',
  }),
  methods: {
    ...mapActions([]),
    ...mapMutations([]),
    toggle(type = 'song')
    {

      this.modelType = type;

      new Modal(document.getElementById('albumSongInfo'), {
        keyboard: false
      }).show();

    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    ...mapGetters(['isLoggedIn',])
  },
  setup () {
    

    return {}
  },
  mounted()
  {

  }
}
</script>

<style>
@import '@/assets/css/artist-ui.css';


.btn.btn-primary {
  background:  #FF6B00;
    color: #FFF;
  border: 2px solid #FFF;
}

.btn:hover {
  background:  #FF6B00;
    color: #FFF;
  border: 2px solid #FFF;
}
</style>
