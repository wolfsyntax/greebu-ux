<template>
  <layout>
    <feature />
    <featuredartists />
    <pricing :pricing="plans"/>
    <reminder />
    <faq />
  </layout>
</template>
<script>
import Layout from '/src/components/Layouts/Layout.vue';
import Feature from '/src/components/Home/Feature.vue';
import Pricing from '/src/components/Home/Pricing.vue';
import Reminder from '/src/components/Home/Reminder.vue';
import Faq from '/src/components/Home/FAQ.vue';
import FeaturedArtists from '/src/components/Home/FeaturedArtists.vue';
import { useHead } from '@vueuse/head'
export default {
  components: {
    layout: Layout,
    feature: Feature,
    pricing: Pricing,
    faq: Faq,
    reminder: Reminder,
    featuredartists: FeaturedArtists,
  },
  setup()
  {
    // useHead({
    //   title: 'Home',
    //   meta: [
    //     {
    //       name: `description`,
    //       content: 'this about about page',
    //     },
    //     ],
     
    // })
  },
  data()
  {
    return {
      plans: [{}]
    }
  },
  head() {
    return {
      title: 'Welcome to Geebu',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Experience the Ultimate Fusion of Creativity and Entertainment with Geebu Create Your Custom Song.',
        },
      ],
    }
  },
}
</script>
<style scoped></style>