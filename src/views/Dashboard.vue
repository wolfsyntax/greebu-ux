<template>
  <layout>
    <artist-dashboard v-if="userRole === 'artists'"/>
    <organizer-dashboard v-else-if="userRole === 'organizer'"/>
    <provider-dashboard v-else-if="userRole === 'service-provider'"/>
    <customer-dashboard v-else-if="userRole === 'customers'"/>
    
    <div v-else>
      No Profile Exists
    </div>

  </layout>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

import ArtistDashboard from '@/components/Dashboard/Artist.vue';
import OrganizerDashboard from '@/components/Dashboard/Organizer.vue';
import ProviderDashboard from '@/components/Dashboard/ServiceProvider.vue';
import CustomerDashboard from '@/components/Dashboard/Customer.vue';

import Layout from '/src/components/Layouts/Layout.vue';
export default {
  components: {
    ArtistDashboard,
    OrganizerDashboard,
    ProviderDashboard,
    CustomerDashboard,
    Layout,
  },
  setup()
  {

  },
  data: () => ({}),
  computed: {
    ...mapGetters(["userInfo", 'info', 'isLoggedIn', 'userRole',]),
    ...mapState({
      users: (state) => state.user,
    }),
  },
  watch: {

  },
  methods: {

  },

}
</script>