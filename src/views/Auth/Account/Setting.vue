<template>

  <section class="account-settings">
    <div class="container">

      <div class="user-message">
        <h2 class="title">Welcome, {{ user.first_name }}!</h2>
        <p class="sub-title" v-if="userRole === 'artists'">You are on the Free Plan.</p>
        <p class="sub-title" v-if="userRole === 'organizer'">Manage your account as an Organizer.</p>
        <p class="sub-title" v-if="userRole === 'customers'">Manage your account as a Customer.</p>
      </div>

      <div class="row">
      <div class="col-md-3">
        <div class="sidebar">
          <li class="d-flex align-items-center" 
          v-for="sidebar in sidebarOptions" 
          :key="sidebar.name"
          :class="{ 'active-option': selectedOption === sidebar.name }"
          @click="showSidebarContent(sidebar)">
            <span class="material-symbols-rounded">{{ sidebar.icon }}</span>
            <h5>{{ sidebar.name }}</h5>
          </li>
        </div>
      </div>

      <!-- Sidebar Menus -->
      <div class="col-md-9">
        <my-account v-if="selectedOption === 'My Account'"/>
        <customized-song v-if="selectedOption === 'Customized Songs'"/>
        <my-booking v-if="selectedOption === 'My Bookings'" />
        <collaboration v-if="selectedOption === 'Collaboration'" />
        <my-proposal v-if="selectedOption === 'My Proposal'" />
        <notifications v-if="selectedOption === 'Notifications'" />
        <subscriptions v-if="selectedOption === 'Manage Subscriptions'" />
        <others v-if="selectedOption === 'Others' && [ 'organizer', 'artists', ].includes(userRole)" />
        <request-application v-if="selectedOption === 'Request Application'" />

      </div>
    </div> <!-- end of row -->

    </div>
   </section>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Verify from '@/components/Auth/Verify.vue';
import CustomizedSong from '@/components/Auth/Account/Settings/Menu/CustomizedSong.vue';

import MyAccount from '@/components/Auth/Account/Settings/Menu/MyAccount.vue';
import MyBooking from '@/components/Auth/Account/Settings/Menu/MyBookings.vue';
import Collaboration from '@/components/Auth/Account/Settings/Menu/Collaboration.vue';
import MyProposal from '@/components/Auth/Account/Settings/Menu/MyProposal.vue';
import Notifications from '@/components/Auth/Account/Settings/Menu/Notifications.vue';
import Others from '@/components/Auth/Account/Settings/Menu/Other.vue';

import Subscriptions from '@/components/Auth/Account/Settings/Menu/ManagedSubscriptions.vue';
import RequestApplication from '@/components/Auth/Account/Settings/Menu/RequestApplication.vue';

export default {
  components: {
    MyAccount,
    MyBooking,
    Collaboration,
    MyProposal,
    Notifications,
    Others,
    'verify-card': Verify,
    CustomizedSong,
    MyAccount,
    Subscriptions,
    RequestApplication,
    
  },
  setup () {
    return {
    }
  },
  data()
  {
    return {
      sidebarOptions: [
          { icon: 'account_circle', name: 'My Account'},
          { icon: 'library_music	', name: 'Customized Songs'},
          { icon: 'event_available', name: 'My Bookings'},
          { icon: 'groups', name: 'Collaboration'},
          { icon: 'music_note', name: 'My Proposal'},
          { icon: 'notifications', name: 'Notifications'},
          { icon: 'subscriptions', name: 'Manage Subscriptions'},
          // { icon: 'page_info', name: 'Others' }
      ],
      // selectedOption: 'My Account', // Default selected option 
    }
  },
  methods: {
    ...mapActions(['fetchProfile',]),
    showSidebarContent(option)
    {
      this.$store.commit('setSettingMenu', option.name);
      // this.selectedOption = option.name;
    },      
  },
  created() {
    
  },
  computed: {
    ...mapGetters(["isPhoneVerified", "info", 'myAccount', 'userRole', ]),
    ...mapState({
      user: (state) => state.user,
      selectedOption: state => state.selectedOption
    }),
  },
  mounted()
  {
    
    if (this.userRole === 'artists') { 
      this.sidebarOptions = [
        { icon: 'account_circle', name: 'My Account' },
        { icon: 'library_music	', name: 'Customized Songs' },
        { icon: 'event_available', name: 'My Bookings' },
        { icon: 'groups', name: 'Collaboration' },
        { icon: 'music_note', name: 'My Proposal' },
        { icon: 'notifications', name: 'Notifications' },
        { icon: 'subscriptions', name: 'Manage Subscriptions' },
         { icon: 'page_info', name: 'Others' }
      ];

    } else if (this.userRole === 'organizer') { 

      this.sidebarOptions = [
        { icon: 'account_circle', name: 'My Account' },
        { icon: 'subscriptions', name: 'My Proposal' },
        { icon: 'breaking_news', name: 'Request Application' },
        { icon: 'notifications', name: 'Notifications' },
        { icon: 'page_info', name: 'Others' }
      ];

    } else if (this.userRole === 'service-provider') { 

      this.sidebarOptions = [
        { icon: 'account_circle', name: 'My Account' },
        { icon: 'notifications', name: 'Notifications' },
        { icon: 'subscriptions', name: 'Manage Subscriptions' },
      ];

    } else {

      this.sidebarOptions = [
        { icon: 'account_circle', name: 'My Account' },
        { icon: 'library_music	', name: 'My Songs' },
        { icon: 'event_available', name: 'My Bookings' },
        { icon: 'notifications', name: 'Notifications' }, 
      ];

    }
  },
  watch: {
    selectedOption(val) {
      if (val === 'Others') {
        this.fetchProfile();
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>