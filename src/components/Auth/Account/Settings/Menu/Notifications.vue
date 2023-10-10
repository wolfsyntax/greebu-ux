<template>
  <div>
    <div class="content">
      <h3>Notifications</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  setup()
  {


    return {}
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    ...mapActions(['fetchNotifications',]),
  },
  mounted() {

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