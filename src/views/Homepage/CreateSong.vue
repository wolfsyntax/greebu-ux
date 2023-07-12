<template>
  <layout>
    <section class="create-song">
      <div class="container">
        <div class="row">
          <div class="col-lg-5 col-xl-5 col-xxl- 6">
              <img src="/assets/create-song/mp3-transparent.webp" class="" alt="Transparent mp3">
          </div>
          <div class="col-lg-7 col-xl-7 col-xxl- 6">
            <div class="content text-center">
              <h2>Let's start create your custom song.</h2>
              <p>Please note that the process of creating a customized artist song is a meticulous and detailed one, requiring careful attention to 
                every aspect of the composition, from the lyrics to the melody and instrumentation. As such, we require a minimum of one month to 
                complete each project to ensure that we deliver the highest quality product possible.</p>
                <a href="/basicinformation" class="btn btn-primary btn-lg">Get Started</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </layout>
</template>
<script>
import Layout from '@/components/Layouts/Layout.vue';

export default {
  components: {
    layout: Layout,

  },
  setup()
  {

  },
}
</script>