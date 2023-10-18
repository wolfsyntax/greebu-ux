<template>
  <div class="others">

    <div class="content" v-if="userRole === 'artists'">
      <div class="title-wrapper">
        <h3 class="title">Other Settings</h3>
      </div>
      <div class="accept-send-proposal-wrap">
        <div class="d-flex align-items-center toggle-switch-wrap">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="accept_proposal">
          </div>
          <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept events?</label>
        </div>

        <div class="d-flex align-items-center toggle-switch-wrap">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="accept_request">
          </div>
          <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept custom song?</label>
        </div>

        <div class="d-flex align-items-center toggle-switch-wrap">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="accept_booking">
          </div>
          <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept booking for special occasions?</label>
        </div>
      </div>      
    </div>
    <div class="content" v-else-if="userRole === 'organizer'">
      <div class="title-wrapper">
        <h3 class="title">Other Settings</h3>
      </div>

      <div class="accept-send-proposal-wrap">
        <div class="d-flex align-items-center toggle-switch-wrap">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="accept_proposal">
          </div>
          <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept proposal from artist?</label>
        </div>

        <div class="d-flex align-items-center toggle-switch-wrap">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="send_proposal">
          </div>
          <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to send proposal to artist?</label>
        </div>

      </div>  
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Others from './Artist Other Settings/Index.vue';
export default {
  components: {
    Others
  },
  setup()
  {


    return {}
  },
  data: () => ({
    accept_proposal: false,
    accept_request: false,
    accept_booking: false,
    send_proposal: false,
    isLoaded: false,
  }),
  methods: {
    ...mapActions(['otherSettings', 'fetchProfile', ]),
  },
  mounted() {
    
    if (!this.isLoaded) {
      var x = null;
      if (this.userRole === 'artists') {
        console.log('Artist Account: ', this.myAccount)
        this.accept_request = this.myAccount?.accept_request || false;
        this.accept_booking = this.myAccount?.accept_booking || false;
      } else this.send_proposal = this.myAccount?.send_proposal || false;

      this.accept_proposal = this.myAccount?.accept_proposal;
      this.isLoaded = true;
    }
  },
  computed: {
    ...mapGetters(['myAccount', ]),
    ...mapState({
      userRole: state => state.role,
    })
  },
  watch: {
    accept_proposal: {
      handler(cur, prev) {
        if (cur !== prev && this.isLoaded) this.otherSettings({ accept_proposal: cur ? true : false });
      },
      deep: true,
    },
    accept_request: {
      handler(cur, prev) {
        if (cur !== prev && this.isLoaded) this.otherSettings({ accept_request: cur ? true : false });
      },
      deep: true,
    },
    accept_booking: {
      handler(cur, prev) {
        if (cur !== prev && this.isLoaded) this.otherSettings({ accept_booking: cur });
      },
      deep: true,
    },
    send_proposal: {
      handler(cur, prev) {
        if (cur !== prev && this.isLoaded) this.otherSettings({ send_proposal: cur });
      },
      deep: true,
    },
  }
}
</script>

<style lang="scss" scoped></style>