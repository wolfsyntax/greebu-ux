<template>
  <layout>
    <section class="error404">
      <div class="container-fluid">
        <div class="container">
          <div class="not-found-bg">
            <div class="not-found-wrapper">
              <h2 class="title">Page not found</h2>
              <p class="sub-title">Sorry the content you're looking for doesn't exist. <br>Either it was removed, or you
                mistyped the link.</p>
              <button class="btn go-to-homepage" @click="backToHomepage">Go to Homepage</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </layout>
</template>
<script>
import Layout from '/src/components/Layouts/Layout.vue';

export default {
  components: {
    layout: Layout,
  },
  setup() {

  },
  methods: {
    backToHomepage() {
      this.$router.push("/");
    }
  }
}
</script>