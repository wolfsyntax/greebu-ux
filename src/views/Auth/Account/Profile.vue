<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <artist-profile
      @form="submit"
      :error="errors"
      :message="message"
      :hasNoError="isValid"
      :formData="form"
      v-if="userRole === 'artists'"
    />
    <organizer-profile
      @form="submit"
      :error="errors"
      :message="message"
      :hasNoError="isValid"
      v-else-if="userRole === 'organizer'"
    />
    <provider-profile
      @form="submit"
      :error="errors"
      v-else-if="userRole === 'service-provider'"
    />
    <customer-profile
      @form="submit"
      :error="errors"
      v-else-if="userRole === 'customers'"
    />
    <p v-else>No Profile Exists</p>
  </div>
</template>

<script>
import ArtistProfile from '@/views/Artist/Profile.vue'
import CustomerProfile from '@/views/Customer/Profile.vue'
import OrganizerProfile from '@/views/Organizer/Profile.vue'
import ProviderProfile from '@/views/Services/Profile.vue'

import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    ArtistProfile,
    CustomerProfile,
    OrganizerProfile,
    ProviderProfile
  },
  setup () {
    return {}
  },
  data: () => ({
    form: {},
    errors: [],
    message: ''
  }),
  methods: {
    ...mapActions(['accountProfile']),
    ...mapMutations([
      'SET_ACCOUNT',
      'SET_PROFILE',
      'SET_AUTH',
      'SET_ARTIST_GENRES',
      'SET_MEMBERS'
    ]),
    submit (value) {
      console.log(`Account Profile for [${this.userRole}] to send: `, value)
      this.form = value

      this.accountProfile(value).then((response) => {
        console.log('Account Profile response: ', response)
        this.errors = []

        const {
          status: statusCode,
          data: { status, result }
        } = response

        if (statusCode === 200 && status === 200) {
          console.log('Success Result: ', result)

          // this.message = 'Updated successfully';
          window.scrollBy(-10000, -10000)
          this.$forceUpdate()
          // this.$router.push('/artist');

          setTimeout(() => {
            this.message = 'Personal information updated successfully.'
            setTimeout(() => {
              this.message = ''
            }, 100000)
          }, 500)
        } else {
          console.log('Error Result: ', result)

          this.isValid = false
          const { errors } = result
          if (errors) this.errors = errors

          this.message = ''
          window.scrollBy(-10000, -10000)
          this.$forceUpdate()
        }
      })
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'info', 'token', 'isLoggedIn', 'userRole']),
    ...mapState({
      users: (state) => state.user
    })
  }
}
</script>

<style lang="scss" scoped></style>
