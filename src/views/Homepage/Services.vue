<template>
  <layout>
    <section class="services">
      <div class="container-fluid">
        <div class="row">
          <div class="col-4">
            <div class="hidden-img1">
              <img src="@/assets/services/show-img-bottom-top-1.webp" class="img-fluid" alt="Other services">
            </div>
          </div>
          <div class="col-4">
            <div class="hidden-img2">
              <img src="@/assets/services/show-img-bottom-top-2.webp" class="img-fluid" alt="Other services">
            </div>
          </div>
          <div class="col-4">
            <div class="hidden-img3">
              <img src="@/assets/services/show-img-bottom-top-3.webp" class="img-fluid" alt="Other services">
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="content">
                <h2>Professional Sounds, Lights<br> and other services needs</h2>
                <p class="sub-heading">Lorem ipsum dolor sit amet consectetur. Tellus ornare<br> placerat urna nec consectetur commodo et.</p>
            </div>
          </div>

          </div>
      </div>
    </section>
    <reminder />
    <faq />
  </layout>
</template>
<script>
import Layout from '@/components/Layouts/Layout.vue';
import Reminder from '@/components/Home/Reminder.vue';
import Faq from '@/components/Home/FAQ.vue';

export default {
  components: {
    layout: Layout,
    faq: Faq,
    reminder: Reminder
  },
  setup()
  {

  },
}
</script>