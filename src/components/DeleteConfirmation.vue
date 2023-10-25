<template>
  <div class="modal fade" id="deleteConfirmation" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
          <button type="button" class="btn ms-auto p-0 cancel-btn" data-bs-dismiss="modal" aria-label="Close">
            <span class="material-symbols-rounded cancel-icon">&#xe5c9;</span>
          </button>

        </div>

        <div class="modal-body">

          <div class="text-start message-wrap">
            <h3>Delete event</h3>
            <p class="mb-0">You are about to delete this event. Are you sure you want to delete?</p>
          </div>

        </div>

        <div class="modal-footer">
          <!-- <button type="button" class="btn btn-secondary delete" @click="confirm">Delete</button> -->
          <button type="button" class="btn btn-secondary delete" @click="confirm">
            <LoadingVue :infoText="buttonName" v-if="isLoading"/>
            <span v-else>{{ buttonName }}</span>
          </button>
          <button type="button" ref="cancelDelete" class="btn btn-primary cancel" data-bs-dismiss="modal" @click="cancel">Cancel</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script >
import { mapActions, mapState } from 'vuex';
import LoadingVue from './Loading.vue';

export default {
  components: {
    LoadingVue
  },  
  created () {
  },
  watch: {
  },
  props: {
  },
  data: () => ({
    buttonName: 'Delete',
    isLoading: false,
    modal: null,
  }),
  methods: {
    ...mapActions(['removeEvent', ]),
    confirm() {
      console.log('Delete confirmation modal id ', this.event_id)
      this.removeEvent()
        .finally(res => {
          this.$refs.cancelDelete.click();
          this.$emit('confirm');
        });
        this.isLoading = true;
    },
    cancel() {
      // this.$emit('cancel')
      this.$refs.cancelDelete.click();
    }
  },
  mounted() {

    // this.modal = document.getElementById('deleteConfirmation');

    // this.modal.addEventListener('hide.bs.modal', () => {
    //   console.log('Hide delete confirmation');
    // }).addEventListener('shown.bs.modal', () => {
    //   console.log('Show delete confirmation');
    // });

  },
  computed: {
    ...mapState({
      event_id: state => state.events.eventId,
    })
  }
}
</script>

<style lang="scss" scoped>

</style>