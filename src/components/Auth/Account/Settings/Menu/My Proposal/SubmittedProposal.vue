<template>
  <div v-for="(proposal, index) in proposals" :key="index">
    <event-card :proposal="proposal" @view="toggleProposal" />
    <view-proposal-modal :show="showModal" :option="optionType"
      @close-modal="closeModal" @accept-request="onModalAccepted" 
    />
    <!-- <div class="customized-songs-wrapper" v-for="(request, index) in requestedSongs" :key="index">

      <div class="d-flex align-items-center justify-content-between event-description">

        <div class="left-wrap">
            <h5 class="event">{{ request.event }} <span class="in-progress">In Progress</span></h5>
          <div class="d-flex align-items-center requested-wrapper">
            <img :src=request.profile_image class="requested-by-image" alt="Requested by image"> 
            <a href="#" class="requested-by">Requested by <span class="name">{{ request.name }}</span></a> <span class="time">{{ request.time }} hours ago</span>
          </div>

          <div class="d-flex">
            <span class="material-symbols-rounded info-icon">&#xe88e;</span>
            <p class="note">Clients will only pay if the requested customized song is already been accepted by chosen Artist.</p>
          </div>
        </div>

        <div class="details-wrapper">
          <div class="button-wrapper">
            <button type="button" class="btn details" @click="showModal = true">View Details</button>
            <view-proposal-modal :show="showModal" 
              @close-modal="closeModal" @accept-request="onModalAccepted" 
            />
            <button type="button" class="btn upload">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_5729_89038)"><path d="M7.49984 13.3333H12.4998V8.33333H15.8332L9.99984 2.5L4.1665 8.33333H7.49984V13.3333ZM4.1665 15H15.8332V16.6667H4.1665V15Z" fill="white"/>
                </g>
                <defs><clipPath id="clip0_5729_89038"><rect width="20" height="20" fill="white"/></clipPath></defs>
              </svg>
              Upload
            </button>
          </div>
        </div>

      </div>

    </div> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import EventCard from './EventCardProposal.vue';
import ViewProposalModal from './ViewProposalModal.vue';
import RequestModal from '/src/components/Auth/Account/Settings/Menu/Request Application/RequestApplicationModal.vue';
export default {
  components: {
    ViewProposalModal,
    EventCard,
    RequestModal,
  },
  setup()
  {


    return {}
  },
  data: () => ({
    requestedSongs: [
      { event: 'Birthday Song', profile_image: 'https://lh3.googleusercontent.com/a-/AD_cMMSLi2SfUJdD4SS2bXaL5NxayPEdYmT3NNso4i_pkSNZ=s64-p-k-rw-no', name: 'John Flores', time: 3, },
      { event: 'Wedding Song', profile_image: 'https://lh3.googleusercontent.com/ogw/AGvuzYaE0rvo3xwVU3H4f2K3wcaEYqe9ht06pHbd9Lxh=s32-c-mo', name: 'Dante Magno', time: 12, },
      { event: 'Wedding Song', profile_image: 'https://lh3.googleusercontent.com/ogw/AGvuzYaE0rvo3xwVU3H4f2K3wcaEYqe9ht06pHbd9Lxh=s32-c-mo', name: 'Dante Magno', time: 12, },
    ],
    showModal: false,
    showToast: false,
    showProposalModal: false,
    optionType: 'pending'
  }),
  computed: {
    ...mapState({
      proposals: state => state.artistProposal.pendingProposals,
    })
  },
  mounted() {
    if (this.proposals.length === 0) {
      this.fetchMyProposals();
    }
  },
  methods: {
    ...mapActions(['fetchMyProposals', ]),
    toggleProposal(proposal) {
      console.log('Toggle Proposal: ', proposal)
      
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
  }
}
</script>

<style lang="scss" scoped></style>