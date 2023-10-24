<template>
  <div class="modal fade" id="deleteConfirmation" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Delete event</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          You are about to delete this event. Are you sure you want to delete?
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="confirm">Delete</button>
          <button type="button" ref="cancelDelete" class="btn btn-primary" data-bs-dismiss="modal" @click="cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { mapActions, mapState } from 'vuex';

export default {
  created () {
  },
  watch: {
  },
  props: {
  },
  data: () => ({
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