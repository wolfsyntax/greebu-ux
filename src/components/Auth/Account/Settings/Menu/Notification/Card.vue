<template>
  <transition-group name="fade" tag="div">

  <div class="customized-songs-wrapper" @dblclick="markNotif">
    
    <div class="d-flex align-items-center justify-content-between event-description">

      <div class="left-wrap">

        <div class="d-flex align-items-start sender-wrap">
          <div>
            <img :src="content?.data?.sender_avatar" class="sender-img" alt="Submitted by image"> 
          </div>

        <div class="sender-details-wrap">
          <div class="sender-msg-wrap" v-if="content?.data?.notification_type === 'artist-proposal'">
            <p class="two-lines sender-msg">
              <span class="sender-name">{{ content?.data?.sender_name }}</span>&nbsp;{{ `${ content?.data?.header } ${content?.data?.misc?.event_name}`}} 
            </p>
              <!-- Show this if the artist declined your proposal -->
            <!-- <p class="two-lines msg">Congratulations! Now, it's time to finalize the details with the artist for your upcoming event.</p> -->

             <!-- Show this if the artist accepted your proposal -->
            <!-- <p class="two-lines msg">Don't worry, you can explore other talented artists for your event. We're here to help you find the perfect match!</p> -->

             <!-- Show this if the artist submitted a proposal for your event -->
            <p class="two-lines msg">{{ content?.data?.body }}</p>

          </div>
          
            <div class="details-wrap" v-if="content?.data?.can_view">
              <button type="button" class="btn p-0 details" @click="toggle">View Details</button>
            </div>
          
        </div>

      </div>

      </div>

      <div class="details-wrapper">
        <div class="remove-notif-wrap">
          <button class="btn p-0 float-end">
            <span class="material-symbols-rounded remove-icon">&#xe5cd;</span>
          </button>
        </div>

        <div class="date-time-wrap">
          <span class="float-end date-time">{{ $filters.diffForHumans($moment(content?.data?.time).format('YYYY-MM-DD hh:mm:ss a')) }}</span>
        </div>

      </div>

    </div> <!-- end of event-description -->

  </div>
    
  </transition-group>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    content: { 
      type: Object,
      default: {},
      required: true
    },
  },
  setup () {
    

    return {}
  },
  methods: {
    ...mapActions(['markNotificationAsRead']),
    markNotif() {

      this.$store.commit('SET_NOTIFICATION', this.content)

      this.markNotificationAsRead('profile')
        .then(res => {
          console.log('Mark Notification: ', res)
        })
    },
    toggle() {
      console.log('Proposal: ', this.content?.data)
      if (this.notification_type === 'artist-proposal') {
        console.log('Clear proposal container')
        this.$store.commit('setProposal');
        this.$emit('openProposal', this.content.data.misc.id);
        console.log('Artist Proposal: ', this.content.data.misc.id)
      }

    },
  },
  data: () => ({
    notification_type: '',
  }),
  mounted() {
    this.$store.commit('setProposal');
    this.notification_type = this.content?.data?.notification_type;
    console.log('Notification Type: ', this.notification_type)
  }
}
</script>

<style lang="scss" scoped>

</style>