<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <i class="fa fa-codepen fa-lg"></i>
          </a>
        </div>
      </div>
    </nav>
    <stepper v-model="steps">
      <div class="jumbotron" slot="test">
        <h1>Stepper!</h1>
      </div>s
    </stepper>

    <img :src="imgBlob" alt="image upload" />
    <input type="file" aria-label="" @change="changeImage" />
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
import VueGoogleAutocomplete from 'vue-google-autocomplete'
// eslint-disable-next-line import/no-absolute-path
import Stepper from '/src/components/Stepper.vue'

export default {
  setup () {
    return {}
  },
  components: {
    VueGoogleAutocomplete,
    Stepper
  },
  data: () => ({
    img: '',
    imgBlob: null,
    address: '',
    steps: [
      { label: 'step1' },
      { label: 'step2' },
      { label: 'step3' },
      { label: 'step4' },
      { label: 'step5' }
    ]
  }),
  mounted () {
    this.$refs.address.focus()
  },
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData
    },
    changeImage (e) {
      const file = URL.createObjectURL(event.target.files[0])
      this.imgBlob = file
      console.log('Image: ', file)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
