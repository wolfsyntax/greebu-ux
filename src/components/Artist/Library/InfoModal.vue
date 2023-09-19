<template>
  <div  class="modal fade modal-lg" id="albumSongInfo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content p-5 float-end">
        <div class="modal-header border-bottom-0">
          <h3 class="modal-title">Song Information</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="closeModal"></button>
        </div>
        <div class="modal-body">
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