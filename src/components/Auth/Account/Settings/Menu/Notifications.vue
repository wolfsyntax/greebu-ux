<template>
  <div>
    <div class="content px-0">
      <h3 class="mx-3">Notifications</h3>
      <button @click="markAllNotificationAsRead('profile')">Clear</button>
      <notification-card v-for="(notification, index) in notifications" :key="index" :content="notification" @openProposal="toggleProposal" />
      <request-proposal :show="Object.keys(proposal).length > 0" @close-modal="closeModal" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import NotificationCard from '/src/components/Auth/Account/Settings/Menu/Notification/Card.vue';
import RequestProposal from '/src/components/Auth/Account/Settings/Menu/Request Application/RequestApplicationModal.vue';

export default {
  components: {
    NotificationCard,
    RequestProposal,
  },
  data () {
    return {
      proposal: {}
    }
  },
  setup()
  {


    return {}
  },
  computed: {
    ...mapGetters(['userInfo']),
    ...mapState({
      notifications: state => state.notifications.notifications,
    })
  },
  methods: {
    ...mapActions(['fetchNotifications', 'markAllNotificationAsRead', ]),
    toggleProposal (proposal) {
      console.log('Proposal ID: ', proposal)
      this.$store.dispatch('getArtistProposal', proposal)
        .then(res => {
          this.proposal = proposal;
        });
    },
    closeModal() {
      this.$store.commit('setProposal');
      this.proposal = {};
    }
  },
  mounted() {

    this.proposal = {};

    this.fetchNotifications()
      .then(res => {
        console.log('Fetch Notification: ', res);
      })
      
    this.$echo.private(`profile.${this.userInfo?.id}`)
      .listen(`.notification-created`, (e) => {
        console.log('New Notification arrived.')
        this.fetchNotifications()
          .then(res => {
            console.log('[Pusher] Fetch Notification: ', res);
          })
      });
  }
}
</script>

<style lang="scss" scoped></style>