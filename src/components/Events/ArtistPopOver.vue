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
        <button class="btn border-0 follow">Follow</button>
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
        <a
          href="/artists/artist?.id"
          target="_blank"
          class="btn view-profile bg-orange"
          >View Profile</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artist: Object
  },
  data: () => ({}),
  methods: {
  },
  mounted () {}
}
</script>

<style lang="scss" scoped></style>
