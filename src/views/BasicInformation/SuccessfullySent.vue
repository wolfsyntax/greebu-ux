<template>
    <layout>
    <div>
        <section class="successfully-sent">
          <div class="container">
            <div class="message">
                <svg xmlns="http://www.w3.org/2000/svg" width="185" height="184" viewBox="0 0 185 184" fill="none">
                <path d="M69.5 92L84.8333 107.333L115.5 76.6667M161.5 92C161.5 130.108 130.608 161 92.5 161C54.3924 161 23.5 130.108 23.5 92C23.5 53.8924 54.3924 23 92.5 23C130.608 23 161.5 53.8924 161.5 92Z" stroke="#FF6B00" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h2 class="title">Success!</h2>
                <p class="content">Your request has been sent and is awaiting approval of your choosen Artist. The site administrator will notify you once your request has been approved.</p>
            </div>
        </div>
        </section>
    </div>

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
    data() {
    return {
    }
  },
  methods: {

  }
  }
  </script>

<style>
</style>