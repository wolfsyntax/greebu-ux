<template>
  <div>
    <form class="required-fields" @submit.prevent="submit">

      <div class="upload-audio">
          <div class="text-center upload-file-content" >
            <svg xmlns="http://www.w3.org/2000/svg" width="73" height="74" viewBox="0 0 73 74" fill="none">
            <path d="M26.6035 22.1539V50.8632C25.2924 50.2319 23.8357 49.9563 22.382 50.0645C20.7481 50.1703 19.1812 50.7473 17.8741 51.7243C16.5669 52.7013 15.5767 54.0358 15.0254 55.5633C14.474 57.0909 14.3856 58.7449 14.771 60.3216C15.1564 61.8983 15.9987 63.329 17.1943 64.4374C18.3899 65.5458 19.8866 66.2835 21.5001 66.5598C23.1135 66.836 24.7732 66.6387 26.2749 65.9922C27.7766 65.3456 29.0547 64.278 29.9518 62.9209C30.8488 61.5637 31.3257 59.9762 31.3238 58.3539V32.1162C31.3316 31.8203 31.4266 31.533 31.597 31.2898C31.7674 31.0466 32.0058 30.8581 32.2829 30.7473L53.0844 22.8381C53.2265 22.7782 53.3815 22.755 53.535 22.7708C53.6885 22.7865 53.8355 22.8407 53.9621 22.9281C54.0887 23.0156 54.1908 23.1335 54.2589 23.2707C54.3269 23.408 54.3586 23.5601 54.351 23.7129V40.6724C53.041 40.0377 51.5834 39.762 50.1295 39.8738C47.9619 40.0226 45.937 40.9982 44.4803 42.5955C43.0236 44.1928 42.2486 46.2874 42.3182 48.4392C42.3877 50.5909 43.2965 52.632 44.8534 54.1337C46.4103 55.6353 48.4941 56.4805 50.6668 56.4915C52.926 56.4697 55.084 55.5603 56.667 53.9631C58.2499 52.3659 59.1284 50.2115 59.1094 47.9731V11.0122C59.1103 10.5109 58.9889 10.0168 58.7556 9.57192C58.5223 9.12705 58.184 8.7446 57.7695 8.45711C57.355 8.16963 56.8765 7.98561 56.3748 7.92072C55.8731 7.85582 55.3629 7.91198 54.8878 8.0844L29.6354 17.7811C28.7448 18.1233 27.9791 18.7237 27.4382 19.5038C26.8974 20.2839 26.6065 21.2075 26.6035 22.1539Z" fill="#ABADC6"/>
          </svg>
          
            <h5 class="drag-files">Drag a file here</h5>
              <p class="or">or</p>
              <div class="select-files-wrapper">
              <label for="files" class="btn btn-info">Select file</label>
                <input type="file" 
                class="upload-music"
                id="files" 
                style="display:none;"
                ref="musicInput" 
                accept=".mp3,.mp4" />
            </div>
          
          </div>
        </div>

        <InfoBlock :infoText="ArtworkImageInfo" />

      <div class="float-end action-btn add-space">
        <button type="button" class="btn btn-light close" @click="back">Back</button>
        <button type="submit" class="btn btn-primary next">Next</button>
      </div>
      </form>

  </div>
</template>

<script>
import DragDrop from '/src/components/DragDrop.vue';
import InfoBlock from '../../Dashboard/Modals/InfoBlock.vue';

export default {
  components:
  {
    DragDrop,
    InfoBlock
  },
  setup()
  {
    return {
      ArtworkImageInfo: "Please upload an audio file in .wav or .mp3 format (preferably .wav), with a maximum file size of 200 megabytes."
    }
  },
  data: () => ({
    form: {
      cover_photo: '',
    }
  }),
  methods: {
    submit(){
      this.$emit('next-step');
    },
    back(){
      this.$emit('back-to-song');
    },
    setCover(val)
    {
      this.form.cover_photo = val;
      this.form.cover = URL.createObjectURL(val);
      console.log('Set Cover:: ', val);
    },
    removeBanner()
    {
      this.form.cover = '';
      this.form.cover_photo = '';
    },
  }
}
</script>

<style lang="scss" scoped>

</style>