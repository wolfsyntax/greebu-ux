<template>
  <div>
    <img :src="imgBlob" alt="image upload" />
    <input type="file" @change="changeImage" />
    <vue-google-autocomplete
      ref="address"
      id="map"
      classname="form-control"
      placeholder="Please type your address"
      v-on:placechanged="getAddressData"
      country="PH"
    >
    </vue-google-autocomplete>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  setup () {
    

    return {}
  },
  components: {
    VueGoogleAutocomplete,
  },
  data: () => ({
    img: '',
    imgBlob: null,
    address: '',
  }),
  mounted() {
    this.$refs.address.focus();
  },
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
    },
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