<template>
  <div>
    <form @submit.prevent="submit">
      <div class="form-group mb-4">
        <label for="songTitle" class="form-label">Title of Song</label>
        <span class="badge float-end">Required</span>
        <input type="text" class="form-control" id="songTitle" v-model="form.song_title" required>
      </div>

      <div class="form-group mb-4">
        <label for="songComposer" class="form-label">Composer</label>
        <span class="badge float-end">Required</span>
        <input type="text" class="form-control" id="songComposer" v-model="form.composer" required>
      </div>

      <div class="form-group mb-4 last-form-group">
        <label for="songGenre" class="form-label">Genre</label>
        <span class="badge float-end">Required</span>
        <select v-model="form.genre" required class="form-select">
          <option selected></option>
          <option v-for="(gen, index) in genres" :key="index" :value="gen">
            {{ gen }}
          </option>
        </select>
      </div>
      
      <div class="float-end action-btn">
        <button type="button" class="btn btn-light close" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary next">Next</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import DragDrop from '/src/components/DragDrop.vue';
export default {
  components:
  {
    DragDrop
  },
  setup () {
    

    return {}
  },
  data: () => ({
    form: {
      song_title: '',
      composer: '',
      genre: '',
    }
  }),
  methods: {
    submit()
    {
      this.$emit('step', {})
    }
  },
  mounted()
  {

  },
  computed: {
    ...mapState({
      ...mapGetters(['isLoggedIn',]),
      genres: (state) => state.artist.genres,
    })
  }
}
</script>

<style lang="scss" scoped>

</style>