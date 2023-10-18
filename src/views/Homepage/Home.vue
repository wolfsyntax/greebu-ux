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
    useHead({
      // Can be static or computed
      title: 'Home',
      meta: [
        {
          // hid: 'og-title',
          property: 'og:title', 
          content: 'Geebu',
        },
        {
          // hid: 'og-description',
          property: 'og:description', 
          content: 'Experience the Ultimate Fusion of Creativity and Entertainment with Geebu Create Your Custom Song, Tailored Exclusively for Your Special Event or Party.',
        },
        {
          // hid: 'og-image',
          property: 'og:image',
          content: 'https://develop.geebu.ph/assets/home/home-slider-1.webp',
        },
        {
          // hid: 'og-type',
          property: 'og:type',
          content: 'website',
        },
        // {
        //   // hid: 'og-image-type',
        //   property: 'og:image:type',
        //   content: 'image/webp',
        // },
        // {
        //   // hid: 'og-image-width',
        //   property: 'og:image:width',
        //   content: '1024',
        // },
        // {
        //   // hid: 'og-image-height',
        //   property: 'og:image:height',
        //   content: '1024',
        // },
        {
          // hid: 'twitter-card',
          name: 'twitter:card',
          content: 'summary',
        },
        {
          // hid: 'twitter-title',
          name: 'twitter:title',
          content: 'Geebu',
        },
        {
          // hid: 'twitter-description',
          name: 'twitter:description',
          content: 'Experience the Ultimate Fusion of Creativity and Entertainment with Geebu Create Your Custom Song, Tailored Exclusively for Your Special Event or Party.',
        },
        {
          // hid: 'twitter-image',
          name: 'twitter:image',
          content: 'https://develop.geebu.ph/assets/geebu-logo.svg',
        },
        {
          // hid: 'twitter-url',
          name: 'twitter:url',
          content: 'https://develop.geebu.ph',
        },
      ],
     
    })
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