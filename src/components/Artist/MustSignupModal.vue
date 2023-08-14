<template>
    <div>

    <div v-if="isLoggedIn"></div>
        <div  v-else>
                <!-- Modal -->
            <div class="modal fade" id="mustSignUp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                  <div class="modal-body">
                      <div class="left">
                        <img src="/assets/create-song/cassete-tape.webp"  class="img-fluid" alt="Headphone">
                      </div>
                      <div class="text-center right">
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
  </template>
  
  <script>
  import { mapGetters} from "vuex";

  export default {
    props: {
      
    },
    data() {
          return {
            
         }
    },      
    computed: {
        ...mapGetters(["isLoggedIn"]),
  },
    methods: {
    
      
    },
  };
  </script>
  
  <style>
  /* Styles for your modal */
  </style>
  