<template>
  <div>
    <img :src="imgBlob" alt="image upload" />
    <input type="file" @change="changeImage" />
  </div>
</template>

<script>
export default {
  setup () {
    

    return {}
  },
  data: () => ({
    img: '',
    imgBlob: null,
  }),
  methods: {
    changeImage(e) {
      const file = URL.createObjectURL(event.target.files[0]);
      this.imgBlob = file;
      console.log('Image: ', file);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>