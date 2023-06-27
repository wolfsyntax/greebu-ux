<template>
  <layout>
    <feature />
    <featured-artists />
    <pricing :pricing="plans"/>
    <reminder />
    <faq />
  </layout>
</template>
<script>
import Layout from '@/components/Layouts/Layout.vue';
import Feature from '@/components/Home/Feature.vue';
import Pricing from '@/components/Home/Pricing.vue';
import Reminder from '@/components/Home/Reminder.vue';
import Faq from '@/components/Home/FAQ.vue';
import FeaturedArtists from '@/Components/Home/FeaturedArtists.vue';

export default {
  components: {
    layout: Layout,
    feature: Feature,
    pricing: Pricing,
    faq: Faq,
    reminder: Reminder,
    FeaturedArtists: FeaturedArtists,
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