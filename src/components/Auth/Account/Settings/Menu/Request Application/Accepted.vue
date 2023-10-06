<template>
  <div>
    <div class="" v-for="( accepted, index) in acceptedProposal" :key="index">
      <request-card :pending="accepted" @request-toggle="toggle" :cardType="'accepted'"/>
      <!-- <div class="event-description">
        <h5 class="event">{{  accepted.event_name }} <span class="in-progress">Ongoing</span></h5>

        <div class="mb-0 d-flex align-items-center requested-wrapper">
          <img :src= accepted.artist_avatar class="requested-by-image" alt="Requested by image"> 
          <a href="#" class="requested-by">Requested by 
          <span class="name">{{  accepted.artist_name }}</span></a> 
          <span class="material-symbols-sharp dot-icon">&#xe061;</span>
          <span class="time">{{  accepted?.accepted_at }} hours ago</span>
        </div>

      </div>

      <div class="details-wrapper">
        <div class="button-wrapper">
          <button type="button" class="btn details" @click="showModal = true">View Details</button>
        </div>
      </div> -->
    </div>
    <h5 v-if="acceptedProposal.length === 0" class="text-center">No Accepted Proposal found!</h5>
    <request-application-modal :show="showModal" @close-modal="closeModal" @accept-request="onModalAccepted" />
  </div>
  
</template>

<script>
import { mapActions, mapState } from 'vuex';
import RequestApplicationModal from './RequestApplicationModal.vue';
import RequestCard from './Card.vue';

export default {
  components: {
    RequestApplicationModal,
    RequestCard,
  },
  setup()
  {


    return {}
  },
    data: () => ({
      acceptedApplication: [
      { event: 'Birthday Song', profile_image: 'https://lh3.googleusercontent.com/a-/AD_cMMSLi2SfUJdD4SS2bXaL5NxayPEdYmT3NNso4i_pkSNZ=s64-p-k-rw-no', name: 'John Flores', time: 3, },
      { event: 'Wedding Song', profile_image: 'https://lh3.googleusercontent.com/ogw/AGvuzYaE0rvo3xwVU3H4f2K3wcaEYqe9ht06pHbd9Lxh=s32-c-mo', name: 'Dante Magno', time: 12, },
      { event: 'Wedding Song', profile_image: 'https://lh3.googleusercontent.com/ogw/AGvuzYaE0rvo3xwVU3H4f2K3wcaEYqe9ht06pHbd9Lxh=s32-c-mo', name: 'Dante Magno', time: 12, },
    ],
    showModal: false,
    showToast: false
  }),
 computed: {
    ...mapState({
      acceptedProposal: state => state.organizer.acceptedProposals,
    })
  },
  methods: {
    toggle()
    {
      this.showModal = true;
    },
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
  },
  mounted() {

  },
}
</script>

<style lang="scss" scoped></style>