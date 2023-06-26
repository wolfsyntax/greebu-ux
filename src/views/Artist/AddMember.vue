<template>
  <div>
    <form @submit.prevent="submit">
      <input type="file" @input="form.member_avatar = $event.target.files[0]" accept="image/png, image/webp, image/svg, image/jpeg"/>
      <div v-if="errors?.member_avatar">{{ errors.member_avatar }}</div>

      <input type="text" v-model="form.member_name" placeholder="Name of the member" />
      <div v-if="errors?.member_name">{{ errors.member_name }}</div>

      <select v-model="form.role" class="form-select">
          <option value="" selected> - Please Select Role - </option>
          <option v-for="member_role in roles" :key="member_role.id" :value="member_role.value">{{ member_role.label }}</option>
      </select>
      <div v-if="errors?.role">{{ errors.role }}</div>
      <button type="submit">Add Member</button>
    </form>
  </div>
</template>
<script>
import Layout from '@/components/Layouts/ArtistLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    layout: Layout,
  },
  data()
  {
    return {
      form: {
        member_avatar: null,
        member_name: '',
        role: null,
      },
      errors: {},
      roles: [
        { id: '1', value: 'vocalist', label: 'Vocalist', },
        { id: '2', value: 'drummer', label: 'Drummer', },
        { id: '3', value: 'lead guitarist', label: 'Lead Guitarist' },
        { id: '4', value: 'rhythm guitarist', label: 'Rhythm Guitarist' },
        { id: '5', value: 'bassist', label: 'Bassist', },
        { id: '6', value: 'keyboardist', label: 'Keyboardist', },
        { id: '7', value: 'others', label: 'Others' },
      ],
    }
  },
  setup()
  {
    
  },
  props: {
    
  },
  methods: {
    ...mapActions([
      'addMember'
    ]),
    submit()
    { 
      this.addMember(this.form).then((response) =>
      {
        
        const { status } = response;
        if (status === 422) {
          this.errors = response?.result?.errors || {}
        } else {
          this.$store.commit('SET_MEMBERS', response.result?.members)
        }

      });
    }
  },
  computed: {
    ...mapState({
      artistTypes: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
      members: (state) => state.artist.members,
    }),
  }
}
</script>
<style scoped></style>