<template>
  <div>
    <Cropper class="circle-example"
      :src="avatar"
      :stencil-component="stencil"
      ref="avatarCropper"
    />

    <input type="file" @input="changeImage" accept="image/png, image/webp, image/svg, image/jpeg" />
    <button class="btn btn-lg upload-cover-photo" @click="getCropImage" v-if="preview">Generate</button>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
import CircleStencil from './CircleStencil.vue';

export default {
	name: 'CircleExample',
	components: {
    Cropper,
	},
  setup(){},
	data() {
    return {
      stencil: CircleStencil,
      attachment: '/assets/handler.svg',
      avatar: '',
      cropImage: null,
      preview: true,
    };
	},
  mounted() {

  },
  methods: {
    changeImage(e) {
      const file = e.target.files[0];
      console.log('Change Image: ', file);
      this.avatar = URL.createObjectURL(file);
      this.attachment = file;

    },
    getCropImage() {
      const { coordinates, canvas, image } = this.$refs.avatarCropper.getResult();

      this.showImage = true;
      this.cropImage = canvas;
      this.avatar = canvas.toDataURL();
      this.preview = this.avatar;
      
      this.cropImage.toBlob(async blob =>
      {
        this.attachment = blob;
      });


    }
  }
};
</script>

<style scoped>
.circle-example {
  background: black;
}
</style>