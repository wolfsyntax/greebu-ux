<template>
  <div class="border-0" id="card-performer">
    <div class="img-wrap">
        <!-- src="/assets/artist-account/default-cover-photo.webp" -->
      <img
        src="/assets/artist-account/default-cover-photo.webp"
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

      <div>
        <button v-if="isLoggedIn" class="btn border-0 follow">Follow</button>
        <button v-else type="button" class="btn border-0 follow"
            @click="openModal"
            data-bs-toggle="modal" data-bs-target="#mustSignUp">
            Follow
        </button>
      </div>
    </div>

    <div class="about-wrap">
      <p class="bio two-lines">
        I am an indie-country/pop artists who describes her style as a "dreamy
        storytelling."
      </p>
      <div class="follow-wrap">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            <h5>234</h5>
            <h6>Following</h6>
          </div>
          <div class="d-flex align-items-center">
            <h5>84</h5>
            <h6>Followers</h6>
          </div>
        </div>
      </div>

      <div class="others-wrap">
        <div class="d-flex align-items-center">
          <img
            src="/assets/events/link.svg"
            class="img-fluid rounded-circle profile"
            alt="artist avatar"
          />
          <a href="https://open.spotify.com/" target="_blank">spotify.com</a>
        </div>

        <div class="d-flex align-items-center">
          <img
            src="/assets/events/location.svg"
            class="img-fluid rounded-circle profile"
            alt="artist avatar"
          />
          <h6 class="text-truncate location">Naga city, Camarines Sur</h6>
        </div>
      </div>

      <div class="btn-wrap">
        <a v-if="isLoggedIn"
          href="/artists/artist?.id"
          target="_blank"
          class="btn view-profile bg-orange"
          >View Profile</a
        >
        <button v-else type="button" class="btn view-profile bg-orange view-profile-btn"
            @click="openModal"
            data-bs-toggle="modal" data-bs-target="#mustSignUp">
            View Profile
        </button>

      </div>
    </div>
  </div>
</template>

<!-- should be outside the template -->
<MustSignupModal />

<script>
import { mapGetters } from 'vuex'
// eslint-disable-next-line import/no-absolute-path
import MustSignupModal from '/src/components/Artist/MustSignupModal.vue'
import { Modal } from 'bootstrap'

export default {
  components: {
    MustSignupModal
  },
  props: {
    artist: Object
  },
  data: () => ({}),
  methods: {
    openModal () {
      new Modal(document.getElementById('#mustSignUp'), {
        keyboard: false
      }).show()
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style lang="scss" scoped></style>
