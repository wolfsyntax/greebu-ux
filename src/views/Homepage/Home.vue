<template>
  <layout>
    <feature />
    <featuredartists />
    <pricing :pricing="plans" />
    <reminder />
    <faq />
  </layout>
</template>
<script>
import Layout from "/src/components/Layouts/Layout.vue";
import Feature from "/src/components/Home/Feature.vue";
import Pricing from "/src/components/Home/Pricing.vue";
import Reminder from "/src/components/Home/Reminder.vue";
import Faq from "/src/components/Home/FAQ.vue";
import FeaturedArtists from "/src/components/Home/FeaturedArtists.vue";
import { useHead } from "@vueuse/head";
export default {
  components: {
    layout: Layout,
    feature: Feature,
    pricing: Pricing,
    faq: Faq,
    reminder: Reminder,
    featuredartists: FeaturedArtists,
  },
  setup() {
    useHead({
      // Can be static or computed
      title: "Want to know how to find the perfect #GeebuArtist?",
      meta: [
        {
          property: "og:title",
          content: "Geebu",
        },
        {
          property: "og:description",
          content:
            "Experience the Ultimate Fusion of Creativity and Entertainment with Geebu Create Your Custom Song. Visit our website.",
        },
        // {
        //   property: 'og:image',
        //   content: 'https://develop.geebu.ph/assets/home/home-slider-1.webp',
        // },
        { name: "description", content: "Welcome to Geebu." },
        { name: "keywords", content: "Geebu, Artist, Create a song" },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: "Geebu",
        },
        {
          name: "twitter:description",
          content:
            "Experience the Ultimate Fusion of Creativity and Entertainment with Geebu Create Your Custom Song. Visit our website.",
        },
        {
          name: "twitter:image",
          content: "https://develop.geebu.ph/assets/geebu-logo.svg",
        },
      ],
      script: [{ innerHTML: "console.log('Welcome to Geebu')" }],
    });
  },
  data() {
    return {
      plans: [{}],
    };
  },
};
</script>
<style scoped></style>
