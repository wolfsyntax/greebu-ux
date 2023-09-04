<template>
  <div ref="modal" class="modal fade" id="bannerModal" :class="{ show: active, 'd-block': active }" tabindex="-1" role="dialog" >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Upload Cover Photo</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"  @click="$emit('close')" ref="bannerClose" ></button>
        </div>

        <div class="modal-body">
          <input type="file" ref="bannerInput" 
            style="display: none;" accept=".png,.webp,.svg,.jpeg" 
            @change="handleClick"
          />
          <!-- <div 
            @click="$refs.bannerInput.click()"
          >
            <img :src="banner" style="width: 320px;" alt="banner-preview" />
          </div> -->

          <div class="upload-audio">
            <div v-if="form.cover_photo">
              <img :src="banner" alt="banner-modal" style="width: 320px; "/>
              <button @click="removeBanner">Delete</button>
            </div>
            <div class="text-center upload-file-content" v-else >
              
              <svg xmlns="http://www.w3.org/2000/svg" width="73" height="74" viewBox="0 0 73 74" fill="none">
                <path d="M26.6035 22.1539V50.8632C25.2924 50.2319 23.8357 49.9563 22.382 50.0645C20.7481 50.1703 19.1812 50.7473 17.8741 51.7243C16.5669 52.7013 15.5767 54.0358 15.0254 55.5633C14.474 57.0909 14.3856 58.7449 14.771 60.3216C15.1564 61.8983 15.9987 63.329 17.1943 64.4374C18.3899 65.5458 19.8866 66.2835 21.5001 66.5598C23.1135 66.836 24.7732 66.6387 26.2749 65.9922C27.7766 65.3456 29.0547 64.278 29.9518 62.9209C30.8488 61.5637 31.3257 59.9762 31.3238 58.3539V32.1162C31.3316 31.8203 31.4266 31.533 31.597 31.2898C31.7674 31.0466 32.0058 30.8581 32.2829 30.7473L53.0844 22.8381C53.2265 22.7782 53.3815 22.755 53.535 22.7708C53.6885 22.7865 53.8355 22.8407 53.9621 22.9281C54.0887 23.0156 54.1908 23.1335 54.2589 23.2707C54.3269 23.408 54.3586 23.5601 54.351 23.7129V40.6724C53.041 40.0377 51.5834 39.762 50.1295 39.8738C47.9619 40.0226 45.937 40.9982 44.4803 42.5955C43.0236 44.1928 42.2486 46.2874 42.3182 48.4392C42.3877 50.5909 43.2965 52.632 44.8534 54.1337C46.4103 55.6353 48.4941 56.4805 50.6668 56.4915C52.926 56.4697 55.084 55.5603 56.667 53.9631C58.2499 52.3659 59.1284 50.2115 59.1094 47.9731V11.0122C59.1103 10.5109 58.9889 10.0168 58.7556 9.57192C58.5223 9.12705 58.184 8.7446 57.7695 8.45711C57.355 8.16963 56.8765 7.98561 56.3748 7.92072C55.8731 7.85582 55.3629 7.91198 54.8878 8.0844L29.6354 17.7811C28.7448 18.1233 27.9791 18.7237 27.4382 19.5038C26.8974 20.2839 26.6065 21.2075 26.6035 22.1539Z" fill="#ABADC6"/>
              </svg>
              
              <h5 class="drag-files">Drag files here</h5>
              <p class="or">or</p>

              <div class="select-files-wrapper">
                <label for="files" class="btn btn-info" @click="$refs.bannerInput.click()">Select files</label>      
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button class="btn btn-lg edit" @click="uploadCover">Upload Photo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  setup () {
    

    return {}
  },
  data: () => ({
    banner: '/assets/artist-account/default-cover-photo.webp',
    form: {
      cover_photo: '',
    }
  }),
  methods: {
    ...mapActions([
      'updateBanner',
    ]),
    removeBanner()
    {
      this.form.cover_photo = '';
      this.banner = '/assets/artist-account/default-cover-photo.webp';
      this.$refs['bannerInput'].value = null;
    },
    handleDrop(e)
    {
      e.stopPropagation()
      e.preventDefault()

      const files = e.dataTransfer.files
      if (files.length !== 1) {
        console.log('Handling Drop');
        return
      }

      const rawFile = files[0] // only use files[0]

      if (!this.isImage(rawFile)) {
        console.log('Not valid image');
        return false
      }

      this.form.cover_photo = e.target.files[0];
      this.banner = URL.createObjectURL(e.target.files[0]);

    },
    handleDragOver(e)
    {
      console.log('Handle DragOver: ', e)
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    isImage(file)
    {
      return /\.(png|webp|svg|jpeg)$/.test(file.name)
    },
    uploadCover()
    {
      this.updateBanner(this.form).then(response =>
      {
        this.removeBanner();
        this.$refs.bannerClose.click();
      });
    },
    handleClick(e)
    {

      const files = e.target.files;
      const rawFile = files[0];

      if (!rawFile) return;

      this.form.cover_photo = rawFile;
      this.banner = URL.createObjectURL(rawFile);

    },
  },
}
</script>

<style scoped>
.edit.btn {
  color: #FFF !important;
  font-size: 20px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: 1px;
  padding: 14px 37px;
  background-color: #FF6B00 !important;
  border: 0;
}

</style>
