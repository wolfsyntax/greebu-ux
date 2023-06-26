<template>
  <div>
    <p>{{ $filters.timeAgo('2019-12-19') }}</p>
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
      {{ userInfo?.youtube_channel }}
      <!-- <Link href="/artist/profile/media/youtube/destroy" method="delete" class="btn btn-danger">Remove</Link> -->
    </p>
    <p>
      <font-awesome-icon icon="fa-brands fa-twitter" />
      {{ userInfo?.twitter_username }}
      <!-- <Link href="/artist/profile/media/twitter/destroy" method="delete" class="btn btn-danger">Remove</Link> -->
    </p>
    <p>
      <font-awesome-icon icon="fa-brands fa-instagram" />
      {{ userInfo?.instagram_username }}
      <!-- <Link href="/artist/profile/media/instagram/destroy" method="delete" class="btn btn-danger">Remove</Link> -->
    </p>

    <p>
      <font-awesome-icon icon="fa-brands fa-spotify" />
      {{ userInfo?.spotify_profile }}
      <!-- <Link href="/artist/profile/media/spotify/destroy" method="delete" class="btn btn-danger">Remove</Link> -->
    </p>
    
    <!-- <social-media /> -->
    <form @submit.prevent="submit">
      
      <input type="file" @input="form.avatar = $event.target.files[0]"
        accept="image/png, image/webp, image/svg, image/jpeg" />
      <div v-if="errors?.avatar">{{ errors.avatar }}</div>

      <progress v-if="form.progress" :value="form.progress.percentage" max="100">{{ form.progress.percentage
      }}%</progress>

      <select v-model="form.artist_type">
        <option>Select Artist Type</option>
        <option v-for="artist_type in artistTypes" :key="artist_type.id" :value="artist_type.title">
          {{ artist_type.title }}
        </option>
      </select>
      <div v-if="errors?.artist_type">{{ errors.artist_type }}</div>
      
      <input type="text" v-model="form.artist_name" placeholder="Name of the Artist/Band" />
      <div v-if="errors?.artist_name">{{ errors.artist_name }}</div>

      <multiselect v-model="form.genre" :options="genres" mode="tags" class="my-2" placeholder="Please select genres" />
      <div v-if="errors?.genre">{{ errors.genre }}</div>

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
          <Link :href="`/artist/profile/member/${mem.id}`" method="delete" class="btn btn-danger">
          <font-awesome-icon icon="fa-solid fa-trash" />
          </Link>
          <Link href="">Edit</Link>

        </li>

      </ul>

      <member-form />
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
      },
      errors: {},
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
      'fetchArtistOptions', 'updateArtistProfile'
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

    }
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
    ...mapState({
      artistTypes: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
      members: (state) => state.artist.members,
    }),
  }
}
</script>

<style scoped>
@import '@/assets/css/tailwind.css';
</style>
<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->