<template>
  <div class="border-0" id="card-performer">
    <div class="img-wrap">
        <!-- src="/assets/artist-account/default-cover-photo.webp" -->
      <img
        :src="artist?.cover_photo || '/assets/artist-account/default-cover-photo.webp'"
        class="cover"
        alt="artist cover image"
      />
      <div class="profile-wrap">
        <img
          :src="artist?.avatar"
          class="img-fluid rounded-circle profile"
          alt="artist avatar"
        />
      </div>
    </div>

    <div class="d-flex align-items-start justify-content-between details-wrap">
      <div>
        <h4 class="text-capitalize">{{ artist?.name }}</h4>
        <h5 class="mb-0">{{ artist?.artist_type }}</h5>
      </div>

      <!-- <div>
        <button v-if="isLoggedIn" class="btn border-0 follow">Follow</button>
        <button v-else type="button" class="btn border-0 follow"
            @click="$emit('open-modal')"
            data-bs-toggle="modal" data-bs-target="#mustSignUp">
            Follow
        </button>
      </div> -->
    </div>

    <div class="about-wrap">
      <p class="bio two-lines">
        {{ artist?.bio || 'I am an indie-country/pop artists who describes her style as a "dreamy storytelling.'}}
      </p>
      <div class="follow-wrap">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            <h5>0</h5>
            <h6>Following</h6>
          </div>
          <div class="d-flex align-items-center">
            <h5>0</h5>
            <h6>Followers</h6>
          </div>
        </div>
      </div>

      <div class="others-wrap">
        <div class="d-flex align-items-center social-media-wrap">
            <a v-if="artist?.spotify" :href="artist?.spotify" target="_blank">
              <img
                src="/assets/artist-account/spotify-icon-gray.svg"
                class="img-fluid rounded-circle"
                alt="spotify icon"
              />
            </a>
            <a v-if="artist?.facebook" :href="artist?.facebook" target="_blank">
              <img
                src="/assets/social icons/facebook-gray.svg"
                class="img-fluid rounded-circle"
                alt="facebook icon"
              />
            </a>
            <a v-if="artist?.twitter" :href="artist?.twitter" target="_blank">
              <img
                src="/assets/artist-account/twitter-icon-gray.svg"
                class="img-fluid rounded-circle"
                alt="twitter icon"
              />
            </a>
            <a v-if="artist?.instagram" :href="artist?.instagram" target="_blank">
              <img
                src="/assets/artist-account/instagram-icon-gray.svg"
                class="img-fluid rounded-circle"
                alt="instagram icon"
              />
            </a>
            <a v-if="artist?.youtube" :href="artist?.youtube" target="_blank">
              <img
                src="/assets/artist-account/youtube-icon-gray.svg"
                class="img-fluid rounded-circle"
                alt="youtube icon"
              />
            </a>
        </div>
        <div class="d-flex align-items-center">
          <img
            src="/assets/events/location.svg"
            class="img-fluid rounded-circle address"
            alt="artist avatar"
          />
          <h6 class="text-truncate location">{{ artist?.street_address + ', ' + artist?.city + ', ' + artist?.province }}</h6>
        </div>
      </div>

      <div class="btn-wrap">
        <a v-if="isLoggedIn"
          :href="'/artists/' + artist?.artist_id"
          target="_blank"
          class="btn view-profile bg-orange"
          >View Profile</a
        >
        <button v-else type="button" class="btn view-profile bg-orange view-profile-btn"
            @click="$emit('open-modal')"
            data-bs-toggle="modal" data-bs-target="#mustSignUp">
            View Profile
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  props: {
    artist: Object
  },
  data: () => ({}),
  methods: {
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style lang="scss" scoped></style>
