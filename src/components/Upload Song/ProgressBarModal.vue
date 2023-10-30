<template>
  <div class="modal" id="showProgressBar" tabindex="-1" aria-labelledby="showProgressBarLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header mb-0 p-0">
          <!-- <h5 class="modal-title" id="showProgressBarLabel">Uploading your song...</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cancelUpload"></button> -->
        </div>
        <div class="modal-body">

          <div class="text-center progress-wrap">

            <div class="details-wrap">
            <h3>Uploading your song...</h3>
            <p class="mb-0">Please wait, your song is currently uploading</p>
          </div>

            <div class="progress">
            <div class="progress-bar" role="progressbar" 
            :style="{ width: uploadProgress + '%' }" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">{{ uploadProgress }}%</div>
          </div>

          </div>

        </div>
        <div class="modal-footer m-auto">
          <button type="button" class="btn cancel" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
          <!-- <button type="button" class="btn cancel" data-bs-dismiss="modal" @click="cancelUpload">Cancel</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['uploadProgress'],
  methods: {
    cancelUpload() {
      this.$emit('cancel-upload');
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
