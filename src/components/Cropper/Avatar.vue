<template>
  <div>
    <div v-if="!showImage">
      <Cropper class="circle-example"
        :src="avatar"
        :stencil-component="stencil"
        ref="avatarCropper"
      />

      <input type="file" @input="changeImage" accept="image/png, image/webp, image/svg, image/jpeg" />
      <button class="btn btn-lg upload-cover-photo" @click="getCropImage" >Generate</button>
    </div>
    <div v-else>
      <img :src="avatar" alt="profile pic" />
      <button type="button" class="" @click="removeImage">Remove</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { Cropper } from 'vue-advanced-cropper';
import CircleStencil from '/src/components/Cropper/CircleStencil.vue';

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
      showImage: false,
    };
	},
  mounted() {

  },
  methods: {
    ...mapActions([
      'updateAvatar',
    ]),
    removeImage() {
      this.showImage = false;
      this.avatar = this.attachment = null;
      this.$emit('uploader', null);
    },
    changeImage(e) {
      const file = e.target.files[0];

      this.avatar = URL.createObjectURL(file);
      this.attachment = file;

      this.$emit('uploader', file);

      // File upload for avatar
      // this.updateAvatar({avatar: file})
      //   .then(res => {
      //     const { data: { result: {profile} }} = res;

      //     this.$emit('uploader', file);
      //   });
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