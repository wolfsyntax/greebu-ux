<template>
  <div class="">
   <!-- <drag-drop></drag-drop> -->
   <form class="required-fields" @submit.prevent="submit">
      <div class="upload-file-wrapper" v-if="form.cover">
        <div class="uploaded-image-wrapper" >
          <div>
            <img ref="uploadedImage" class="uploaded-image" :src="form.cover" alt="banner-modal" />
          </div>
          
          <button class="remove-image" @click="removeBanner" >
            <span class="material-symbols-outlined">&#xe5cd;</span> 
          </button>
        </div>
      </div>

      <drag-drop @dragCover="setCover" v-else/>

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
import InfoBlock from '/src/components/Dashboard/Modals/InfoBlock.vue';

export default {
  components:
  {
    DragDrop,
    InfoBlock
  },
  setup()
  {
    return {
      ArtworkImageInfo: "Cover art should be a rectangular .jpg, .jpeg, .png, or .webp file, with a minimum size of 400x150 pixels, clear, and under 2MB."
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