<template>
  <layout>
    <section class="error500">
      <div class="container">
        <div class="maintainance-wrapper">
          <h2 class="title">We are under maintenance</h2>
          <p class="sub-title">Sorry the content you're looking for doesn's exist. <br>Either it was removed, or you
            mistyped the link.</p>
          <button class="btn go-to-homepage" @click="backToHomepage">Go to Homepage</button>
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