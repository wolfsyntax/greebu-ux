<template>
  <div class="customized-songs-wrapper my-0" @dblclick="markNotif">
    <div class="event-description">
      <div class="d-flex align-items-center ">
        <img :src="content?.data?.sender_avatar" style="  width: 3rem; height: 3rem; border-radius: 100%; margin-right: 0.5rem;" class="requested-by-image" alt="Submitted by image"> 
        <!-- <span class="material-symbols-sharp dot-icon">&#xe061;</span> -->
        <div class="row">
          <div class="col-12 mb-0 d-flex" v-if="content?.data?.notification_type === 'artist-proposal'">
            <strong>{{ content?.data?.sender_name }}</strong>&nbsp;{{ `${ content?.data?.header } ${content?.data?.misc?.event_name}`}} 
          </div>
          <div class="col-12">
            <span class="text-muted">{{ content?.data?.body }}</span>
          </div>
          <div class="col-12">
            <span class="text-muted">{{ $filters.diffForHumans($moment(content?.data?.time).format('YYYY-MM-DD hh:mm:ss a')) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="details-wrapper">
      <div class="button-wrapper" v-if="content?.data?.can_view">
        <button type="button" class="btn details" @click="toggle">View Details</button>
      </div>
    </div>       
  </div>
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