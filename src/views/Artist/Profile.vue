<template>
  <div>
    <p>{{ $filters.timeAgo('2019-12-19') }}</p>

    
    <div
      ref="modal"
      class="modal fade"
      :class="{ show: active, 'd-block': active }"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="container">
              <div class="row">
                <div class="col">
                  <h5 class="modal-title">{{ formHeader }}</h5>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <span class="text-muted">{{ formSubHeading }}</span>
                </div>
              </div>
            </div>
            <button type="button"  data-bs-dismiss="modal" aria-label="Close" class="btn-close" data-dismiss="modal" @click="toggle"></button>
          </div>
          <div class="modal-body">
            <member-form @modalClose="dismiss" v-if="formType === 'members'"/>
            <social-media @modalClose="dismiss" v-else />
          </div>
        </div>
      </div>
    </div>
  <div v-if="active" class="modal-backdrop fade show"></div>


    <vs-avatar>
      <template #text>
        Lily
      </template>
    </vs-avatar>

    <vs-avatar>
      <img src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg" alt="">
    </vs-avatar>
    <p>
      <font-awesome-icon icon="fa-brands fa-youtube" />
      {{ artistProfile?.youtube_channel }}
      <!-- <Link href="/artist/profile/media/youtube/destroy" method="delete" class="btn btn-danger">Remove</Link> -->
    </p>
    <p>
      <font-awesome-icon icon="fa-brands fa-twitter" />
      {{ artistProfile?.twitter_username }}
      <!-- <Link href="/artist/profile/media/twitter/destroy" method="delete" class="btn btn-danger">Remove</Link> -->
    </p>
    <p>
      <font-awesome-icon icon="fa-brands fa-instagram" />
      {{ artistProfile?.instagram_username }}
      <!-- <Link href="/artist/profile/media/instagram/destroy" method="delete" class="btn btn-danger">Remove</Link> -->
    </p>

    <p>
      <font-awesome-icon icon="fa-brands fa-spotify" />
      {{ userInfo?.spotify_profile }}
      <!-- <Link href="/artist/profile/media/spotify/destroy" method="delete" class="btn btn-danger">Remove</Link> -->
    </p>
    
    <!-- <social-media /> -->
    <form @submit.prevent="submit">
      <div class="container">
        <div class="row">
          <div class="col">
            <input type="file" @input="form.avatar = $event.target.files[0]" accept="image/png, image/webp, image/svg, image/jpeg" />
            <div v-if="errors?.avatar">{{ errors.avatar }}</div>
            <progress v-if="form.progress" :value="form.progress.percentage" max="100">{{ form.progress.percentage }}%</progress>
          </div>
        </div>
        <div class="row my-2">
          <div class="col">
            <select v-model="form.artist_type" class="form-select">
              <option>Select Artist Type</option>
              <option v-for="artist_type in artistTypes" :key="artist_type.id" :value="artist_type.title">
                {{ artist_type.title }}
              </option>
            </select>
            <div v-if="errors?.artist_type">{{ errors.artist_type }}</div>
          </div>
        </div>
        <div class="row my-2">
          <div class="col">
            <input type="text" v-model="form.artist_name" placeholder="Name of the Artist/Band" class="form-control"/>
            <div v-if="errors?.artist_name">{{ errors.artist_name }}</div>
          </div>
        </div>
        <div class="row my-2">
          <div class="col">
            <multiselect v-model="form.genre" :options="genres" mode="tags" class="my-2" placeholder="Please select genres" />
            <div v-if="errors?.genre">{{ errors.genre }}</div>
          </div>
        </div>
        <div class="row my-2">
          <div class="col">
            <input type="text" v-model="form.street" placeholder="Street" class="form-control"/>
            <div v-if="errors?.street">{{ errors.street }}</div>
          </div>
          <div class="col">
            <input type="text" v-model="form.city" placeholder="City" class="form-control"/>
            <div v-if="errors?.city">{{ errors.city }}</div>
          </div>
          <div class="col">
            <input type="text" v-model="form.province" placeholder="Province" class="form-control"/>
            <div v-if="errors?.province">{{ errors.province }}</div>
          </div>
        </div>
        <div class="row py-2">
          <div class="row">
            <div class="col">
              <button type="button" class="btn btn-primary" @click="toggle()">Add Member</button>
              <button type="button" class="btn btn-primary" @click="toggle('links')">Add Links</button>
            </div>
          </div>
        </div>
      </div>
      
      <ul class="list-group" v-if="members">
        <li class="list-group-item" v-for="mem in members" :key="mem.id">
          <b-avatar>
            <template #default>
              <span class="b-avatar-img">
                <img loading="lazy" :src="`/storage/${mem.avatar}`" alt="" v-if="mem.avatar">
                <!-- <font-awesome-icon icon="fa-solid fa-bomb" /> -->
                <span v-else>
                  {{ mem.avatar_text }}
                </span>

              </span>
            </template>
          </b-avatar>
          <h6 class="card-title">{{ mem.fullname }}</h6>
          <p class="card-text">{{ mem.role }}</p>
          <button type="button" @click="removeMember(mem.id)" class="btn btn-danger">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
          <Link href="">Edit</Link>

        </li>

      </ul>


      <textarea v-model="form.bio"></textarea>
      <div v-if="errors?.bio">{{ errors.bio }}</div>
      <button type="button" class="btn btn-primary">Primary</button>
      <button type="submit" class="btn btn-success">Submit</button>
    </form>
    
  </div>
</template>
<script>
import Layout from '@/components/Layouts/AuthLayout.vue';
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import MemberForm from './AddMember.vue';
import SocialMediaForm from './SocialMedia.vue';

export default {
  components: {
    layout: Layout,
    'member-form': MemberForm,
    'social-media': SocialMediaForm,
  },
  data()
  {
    return {
      form: {
        artist_type: null,
        artist_name: null,
        genre: null,
        bio: null,
        avatar: null,
        street: null,
        city: null,
        province: null,
      },
      errors: {},
      active: false,
      formType: 'members',
      formHeader: 'Add Member',
      formSubHeading: 'Lorem ipsum',
    }
  },
  setup()
  {
    /**
     * 
     * profile: Object, errors: Object, genres: Object, artist_types: Object, artist_genre: Object, img: String, members: Array
    */
  },
  mounted()
  {
    this.fetchArtistOptions()
  },
  props: {
    // errors: Object,
  },
  methods: {
    ...mapActions([
      'fetchArtistOptions', 'updateArtistProfile', 'removeMember',
    ]),
    ...mapMutations([
      'SET_PROFILE', 'SET_ARTIST', 'SET_MEMBERS',
    ]),
    submit()
    {

      this.updateArtistProfile(this.form).then((response) =>
      {

        const { status } = response;
        if (status === 422) { 
          this.errors = response?.result?.errors || {}
        } else {

          this.$store.commit('SET_ARTIST', response.result?.artist_profile)
          this.$store.commit('SET_PROFILE', response.result?.user_profile)
          this.$store.commit('SET_MEMBERS', response.result?.members)
          this.$store.commit('SET_ARTIST_GENRES', response.result.artist_genres)

        }

      });

    },
    dismiss()
    {
      const body = document.querySelector("body")
      this.active = false
      this.active ? body.classList.add("modal-open") : body.classList.remove("modal-open")
    },
    toggle(option = 'members')
    {
      const body = document.querySelector("body")
      this.active = !this.active
      this.active ? body.classList.add("modal-open") : body.classList.remove("modal-open")

      this.formType = option

      this.formHeader = option === 'members' ? 'Add Member' : 'Add Social Media Account';
      
    },
  },
  computed: {
    ...mapGetters(["userInfo", "token", 'artistProfile']),
    ...mapState({
      artistTypes: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
      members: (state) => state.artist.members,
    }),
  }
}
</script>

<style scoped>
/* @import '@/assets/css/tailwind.css'; */
</style>
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->