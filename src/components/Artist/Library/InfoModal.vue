<template>
  <div  class="modal fade modal-lg" id="albumSongInfo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header p-0 border-bottom-0">
          <h3 class="modal-title">Song Information</h3>
          <button type="button" class="btn p-0 close-btn" data-bs-dismiss="modal" aria-label="Close" ref="closeModal">
            <span class="material-symbols-rounded close-icon">&#xe5cd;</span>
          </button>
        </div>
        <div class="modal-body p-0">
          <song-info @step="onSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SongInfo from './Details/Song.vue';
import AlbumInfo from './Details/Album.vue';

export default {
  setup () {
    

    return {}
  },
  components:
  {
    SongInfo,  
    AlbumInfo
  },
  props: {
    usage: {
      type: String,
      default: 'song',
      required: true
    },
  },
  mounted()
  {
    const myModal = document.getElementById('albumSongInfo');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      
    });
  },
  methods: {
    onSubmit(val)
    {
      this.$refs.closeModal.click();
      console.log('Submit')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>