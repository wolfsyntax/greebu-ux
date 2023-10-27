<template>
  <div class="">
   
   <form class="required-fields" @submit.prevent="submit">

  <div
      id="drag-file-component-wrap"
    >
    <input type="file" ref="FileInput" style="display: none;" accept=".pdf, .doc, .docx" @change="handleFileUpload" />
      <div class="text-center upload-file-content"> <!-- v-if="!uploadedFile && !bigFile && !invalidFileType"-->
        <span class="material-symbols-rounded" >&#xe9fc;</span>
        <h5 class="drag-file">Drag a file here</h5>
        <p class="file-type">PDF, WORD file size no more than 10MB</p>
        <div class="select-files-wrapper">
          <label for="files" class="btn select-file-btn" @click="$refs.FileInput.click()">Select a file</label>
        </div>
      </div>
    </div>

    <div class="d-flex align-items-center justify-content-between" id="file-output-box" v-if="uploadedFile && !bigFile && !invalidFileType">
      <div class="d-flex align-items-center file-details-wrap">
        <div>
          <span class="material-symbols-rounded file-icon">&#xe226;</span>
        </div>
        <div class="text-start">
          <h5 class="file-name">{{ uploadedFile.name }}</h5>
          <p class="mb-0 file-size"><span>{{ uploadedFile.sizeInKB }}KB</span></p>
        </div>
      </div>
      <div>
        <div class="text-end">
          <button class="btn p-0" @click="removeFile">
            <span class="material-symbols-rounded close-icon">&#xe5c9;</span>
          </button>
        </div>
      </div>
    </div>

    <div class="d-flex align-items-center justify-content-between" id="file-output-box-error" v-if="bigFile || invalidFileType">
      <div class="d-flex align-items-center error-wrap">
        <span class="material-symbols-rounded info-class">&#xe88e;</span>
        <p class="mb-0 error-msg">File size should be no more than 10MB and the file must be a PDF or Word document.</p>
      </div>
      <div>
        <div class="text-end">
          <button class="btn p-0 d-flex align-items-center justify-content-center" @click="removeFile">
            <span class="material-symbols-rounded close-icon">&#xe5c9;</span>
          </button>
        </div>
      </div>
    </div>

    <InfoBlock :infoText="lyricsInfo" />

      <div class="float-end action-btn add-space">
        <button type="button" class="btn btn-light close" @click="back">Back</button>
        <button type="submit" class="btn btn-primary next" @click="openModal" data-bs-target="showProgressBar">
          <LoadingVue :infoText="buttonName" v-if="isLoading"/>
            <span v-else>{{ buttonName }}</span>
        </button>
      </div>
    </form>

    <progress-bar-modal :uploadProgress="uploadProgress" @cancel-upload="cancelUpload"></progress-bar-modal>

  </div>
</template>

<script>
import InfoBlock from '../../Dashboard/Modals/InfoBlock.vue';
import Loading from '../../Loading.vue';
import ProgressBarModal from '/src/components/Upload Song/ProgressBarModal.vue'
import { Modal } from 'bootstrap';

export default {
  components:{
    InfoBlock,
    Loading,
    ProgressBarModal
  },
  setup()
  {
    return{
    }
  },
  data: () => ({
    uploadedFile: null,
      bigFile: false,
      invalidFileType: false,
      isLoading: false,
      buttonName: 'Submit',
      lyricsInfo: 'Please upload the lyrics in a single text block without including the vocalists name, and refrain from adding blank lines except between verses or the chorus.',
     
      uploadProgress: 0,
      isUploading: false,
  }),
  methods: {
    // submit(){
    //   this.$emit('next-step');
    // },
    back(){
      this.$emit('back-to-song');
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      
      if (file) {
        if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          // Check if the file size is less than or equal to 10MB (10 * 1024 * 1024 bytes)
          if (file.size <= 10 * 1024 * 1024) {
            this.uploadedFile = {
              name: file.name,
              sizeInKB: (file.size / 1024).toFixed(2)
            };
             // Clear error flags when a correct file is uploaded
            this.bigFile = false;
            this.invalidFileType = false;
          } else {
            this.bigFile = true;
          }
        } else {
          this.invalidFileType = true;
        }
      }
    },
    removeFile() {
      this.uploadedFile = null;
      this.bigFile = false;
      this.invalidFileType = false;
      // Clear the file input (if needed)
      this.$refs.FileInput.value = '';
    },
    openModal() {
      this.uploadProgress = 0;
      this.isUploading = true;
      this.simulateUpload();

      new Modal(document.getElementById('showProgressBar'), {
        keyboard: false,
        backdrop: 'static',
      }).show();

    },
    cancelUpload() {
      this.isUploading = false;
    },
    simulateUpload() {
      const interval = setInterval(() => {
        if (this.uploadProgress < 100) {
          this.uploadProgress += 10;
        } else {
          clearInterval(interval);
          this.isUploading = false;
        }
      }, 1000);
    },
  
  }
}
</script>

<style lang="scss" scoped>

</style>