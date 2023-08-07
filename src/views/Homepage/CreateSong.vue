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
              <h2>Let's start create your <br>custom song.</h2>
              <p>Please note that the process of creating a customized artist song is a meticulous and detailed one, requiring careful attention to 
                every aspect of the composition, from the lyrics to the melody and instrumentation. As such, we require a minimum of one month to 
                complete each project to ensure that we deliver the highest quality product possible.</p>
                

                <div v-if="isLoggedIn"><a href="/basicinformation" class="btn btn-primary btn-lg get-started">Get Started</a></div>
                <div  v-else><button type="button" class="btn btn-primary btn-lg get-started" data-bs-toggle="modal" data-bs-target="#mustSignUp">
                  Get Started
              </button>

                <!-- Modal -->
            <div class="modal fade" id="mustSignUp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                  <div class="modal-body">
                      <div class="left">
                        <img src="/assets/create-song/cassete-tape.webp"  class="img-fluid" alt="Headphone">
                      </div>
                      <div class="right">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="content-modal">
                          <h2 class="title">You must Sign Up!</h2>
                        <p class="sub-title">Join us today and embark on an exciting journey of music, collaboration. We can't wait to have you on board!</p>
                        <a href="/register" class="btn btn-primary btn-lg signup">Sign Up Now!</a>
                        <div class="more">
                          <p class="account">Already have an Account? <a href="/login" class="login">Log In</a></p>
                        </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div> <!-- end of modal -->

          </div> <!-- end of v-else -->
     


            </div>
          </div>
        </div>


      </div>
    </section>
  </layout>
</template>
<script>
import Layout from '/src/components/Layouts/Layout.vue';
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    layout: Layout,
  },
  setup()
  {

  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    // ...mapGetters(["isLoggedIn", 'userInfo', 'info']),
  },
}
</script>