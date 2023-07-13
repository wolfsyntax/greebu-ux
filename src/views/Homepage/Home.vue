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
import FeaturedArtists from '/src/Components/Home/FeaturedArtists.vue';

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

  },
  data()
  {
    return {
      plans: [{}]
    }
  }
}
</script>
<style scoped></style>