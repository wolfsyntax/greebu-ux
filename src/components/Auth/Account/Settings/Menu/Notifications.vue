<template>
  <div class="notifications-wrap">
    <div class="content">

      <div class="d-flex align-items-center justify-content-between notif-title-wrap">
        <div>
          <h3 class="title">Notifications</h3>
        </div>
       
        <div class="dropdown-center">
          <button class="btn p-0 more-wrap" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="material-symbols-rounded more-icon">&#xe5d3;</span>
          </button>
          <ul class="dropdown-menu">
            <li><button class="btn p-0" @click="markAllNotificationAsRead('profile')">Clear all notifications</button></li>
            <!-- <li><button class="btn p-0" @click="markAllNotificationAsRead('profile')">Mark all as read</button></li> -->
          </ul>
        </div>
      

      </div>

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
    },
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