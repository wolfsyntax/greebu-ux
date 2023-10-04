<template>
  <div>
    <div class="customized-songs-wrapper" v-for="(denied, index) in deniedApplication" :key="index">

      <div class="event-description">
        <h5 class="event">{{ denied.event }} <span class="in-progress denied">Denied</span></h5>

        <div class="mb-0 d-flex align-items-center requested-wrapper">
          <img :src=denied.profile_image class="requested-by-image" alt="Requested by image"> 
          <a href="#" class="requested-by">Requested by 
          <span class="name">{{ denied.name }}</span></a> 
          <span class="material-symbols-sharp dot-icon">&#xe061;</span>
          <span class="time">{{ denied.time }} hours ago</span>
        </div>

      </div>

      <div class="details-wrapper">
        <div class="button-wrapper">
          <button type="button" class="btn details" @click="showModal = true">View Details</button>
        </div>
      </div>
    </div>
  </div>
  <request-application-modal :show="showModal" @close-modal="closeModal" @accept-request="onModalAccepted" />
</template>

<script>

import RequestApplicationModal from './RequestApplicationModal.vue';

export default {
  components: {
    RequestApplicationModal
  },
  setup()
  {


    return {}
  },
    data: () => ({
    deniedApplication: [
      { event: 'Birthday Song', profile_image: 'https://lh3.googleusercontent.com/a-/AD_cMMSLi2SfUJdD4SS2bXaL5NxayPEdYmT3NNso4i_pkSNZ=s64-p-k-rw-no', name: 'John Flores', time: 3, },
      { event: 'Wedding Song', profile_image: 'https://lh3.googleusercontent.com/ogw/AGvuzYaE0rvo3xwVU3H4f2K3wcaEYqe9ht06pHbd9Lxh=s32-c-mo', name: 'Dante Magno', time: 12, },
      { event: 'Wedding Song', profile_image: 'https://lh3.googleusercontent.com/ogw/AGvuzYaE0rvo3xwVU3H4f2K3wcaEYqe9ht06pHbd9Lxh=s32-c-mo', name: 'Dante Magno', time: 12, },
    ],
    showModal: false,
    showToast: false
  }),
  methods: {
    closeModal()
    {
      this.showModal = false;
    },
    onModalAccepted()
    {
      this.showToast = true;
      setTimeout(() =>
      {
        this.showToast = false;
      }, 7000);
      this.showModal = false;
    },
  }
}
</script>

<style lang="scss" scoped></style>