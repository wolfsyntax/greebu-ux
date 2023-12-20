<template>
    <layout>
  
      <section class="submit-proposal-form">
        <div class="container">
          <div class="justify-content-start back-wrapper">
            <button class="btn d-flex align-items-center back" @click="$router.push('/artists')">
              <span class="material-symbols-outlined back-icon">&#xe5c4;</span>
              Back
            </button>
          </div>
  
          <div class="submit-proposal-wrap">
            <h2 class="top-level-title">Submit a Proposal for collaboration to Artist Name</h2>
            <p class="top-level-sub-title">Lorem ipsum dolor sit amet consectetur. Nascetur enim cras mauris elementum montes ut tristique.</p>
          </div>
  
          <form @submit.prevent="submit" autocomplete="off">
            <div class="artist-details-wrap">
              <h3 class="details">Artist Details</h3>

              <div class="form-group">
                <label for="name">Type of artist</label>
                <select class="form-select">
                    <option value="">Select type of artist</option>
                    <option value="full band">Full Band</option>
                    <option value="acoustic band">Acoustic Band</option>
                    <option value="solo artist">Solo Artist</option>
                    <option value="duo artist">Duo Artist</option>
                </select>
              </div>

              <div class="form-group">
                  <label for="genre">Genre</label>
                  <multiselect v-model="formGenres" mode="tags"
                  :close-on-select="false"
                  :create-option="true" :options="async function(query) {
                    return await fetchGenre(query) || genres
                  }" 
                  :searchable="isSearchable" :delay="0" 
                  autocomplete="off" 
                  ref="multiselect" 
                  :filter-results="false"
                  @open="onOpenOption"
                  
                  noOptionsText="Please input genre(s)"
                  class="genre" placeholder="Please select genres" />
                  <br/>
                </div>

            </div> <!-- end of artist-details-wrap -->


            <div class="artist-details-wrap">

              <h3 class="details">Collaboration Details</h3>

              <div class="form-group">
                <label for="name">Type of collaboration</label>
                <select class="form-select">
                    <option value="">Select type of collaboration</option>
                    <option value="artist only">Artist Only</option>
                    <option value="featured collaboration">Featured collaboration</option>
                </select>
              </div>

              <div class="form-group">
                <label for="name">Collaborating Artist</label>
                <input type="text" class="form-control" name="collab-artist" required autocomplete="off" />
              </div>

              <div class="form-group">
                <label for="name">Number songs or number of set  to be played</label>
                <input type="number" class="form-control" name="song_played" required autocomplete="off" />
              </div>

              <div class="form-group">
                <label for="eventType">Venue Address</label>

                <div class="d-flex justify-content-between venue-sub-groups">
                  <div>
                      <input type="text" class="form-control location-input" placeholder="Village/Subdivision, Barangay" required autocomplete="off"/>
                  </div>

                  <div>
                      <input type="text" class="form-control location-input" placeholder="Town/City" required autocomplete="off"/>
                  </div>

                  <div>
                      <input type="text" class="form-control location-input" placeholder="Province" required autocomplete="off"/>
                  </div>
                </div> 
                <!-- <div v-for="err in error?.street_address" :key="err" class="text-danger">{{ err }}</div> -->
            </div>

            <div class="d-flex align-items-center start-end-wrap">
                <div class="form-group">
                    <label for="eventType">Start Date</label>
                    <input type="date" placeholder="YYYY-MM-DD" class="form-control" required autocomplete="off"/>
                    <!-- <div v-for="err in error?.start_date" :key="err" class="text-danger">{{ err }}</div> -->
                </div>

                <div class="form-group">
                    <label for="eventType">End Date</label>
                    <input type="date" placeholder="YYYY-MM-DD" class="form-control " required autocomplete="off"/>
                    <!-- <div v-for="err in error?.end_date" :key="err" class="text-danger">{{ err }}</div> -->
                </div>
            </div>

            </div> <!-- end of artist-details-wrap -->

            <div class="cover-letter-wrap">
              <h3>Cover letter</h3>
              <div class="form-group form-about-artist">
                <label for="letter">Write your cover letter</label><br>  
                <textarea maxlength="500" class="form-control about-artist" v-model="form.cover_letter"></textarea>
                <p v-show="form.cover_letter" class="char-count">Maximum 500 characters ( {{ remainingChars }} left)</p>
              </div>
              <!-- <div v-for="err in errors?.cover_letter" :key="err" class="text-danger">{{ err }}</div> -->
            </div>
            
            <div class="text-center">

              <button type="submit" class="btn submit-proposal-btn" :disabled="!isValid" v-if="showSubmitProposalBtn">Submit</button>
              <button type="button" class="btn submit-proposal-btn" v-else>
                <LoadingIndicator />
              </button>

            </div>
          </form>
        </div>
      </section>
      <!-- <success-proposal-modal @close="closeModal" /> -->

    </layout>
  </template>
  
  <script>
  import Layout from '/src/components/Layouts/Layout.vue';
  import { mapActions, mapGetters, mapState } from "vuex";
  //import SuccessProposalModal from '/src/components/Auth/Proposal/SuccessProposalModal.vue';
  import { Modal } from 'bootstrap';
  import Multiselect from '@vueform/multiselect';
  import LoadingIndicator from '/src/components/LoadingIndicator.vue';  
  
  export default {
    components: {
      layout: Layout,
      Multiselect,
      LoadingIndicator
    },
    setup() {
  
    },
    data() {
      return {
        showSubmitProposalBtn: true,
        form: {
          genres: '',
          cover_letter: '',
        },
        // errors: [],
        // errorMessage: '',
        // modalObj: null,
        isLoading: false,
        formGenres: [],
        isSearchable: true,
      }
    },
    methods: {
      ...mapActions(['artistOptions']),

      fetchGenre(query)
    {
      if (!query) {
        console.log('Empty Query fetchGenre')
        this.artistOptions()
      }
      return this.formArtistGenres

    },
      onOpenOption(event)
    {
      this.isSearchable = true;
      console.log('Event')
    },
    onInputAddress(event)
    {
      this.isSearchable = false;
    },
    //   ...mapActions(['sendArtistProposal', 'fetchEvent',]),
    //   clearErrorMessage() {
    //     //this.error.song = [];
    //   },
    //   closeModal() {
    //     this.modalObj.hide();
    //     this.$router.push({name: 'events'});
    //   },
    //   submit()
    //   {
    //     this.isLoading = true;
    //     this.$store.commit('SET_PROPOSAL', this.form);
    //     this.sendArtistProposal()
    //       .then(response =>
    //       {
    //         const { status } = response
  
    //         if (status === 201) {
    //           this.modalObj.show();
    //         }
  
    //         console.log('[Response] ProposalForm.vue: ', response);
    //       })
    //       .catch(err =>
    //       {
    //         console.log('Error on proposal: ', err)
    //         const { status, result } = err;
  
    //         if (status === 422) {
    //           const { errors } = result
    //           this.errors = errors;
  
    //           console.log('[Error] Proposal form: ', err);
    //         }
  
    //       });
    //   },
    //   clearErrorMessageAfterDelay() {
    //     setTimeout(() => {
    //       this.clearErrorMessage();
    //       this.defaultFileFormat = true;
    //     }, 10000); 
  
    //     this.defaultFileFormat = false;
    //   },
    //   dismiss(option)
    //   {
    //     console.log('Proposal Modal dismiss: ', option);
  
    //     new Modal(document.getElementById('sentProposalModal'), {
    //       keyboard: false,
    //       backdrop: 'static',
    //     }).show()
    //   },
    },
    computed: {
      ...mapGetters(['formArtistGenres']),
    //   ...mapGetters(['isLoggedIn',]),
    //   ...mapState({
    //     event: state => state.events.event,
    //     members: (state) => state.artist.members,
    //     account: (state) => state.account,
    //     proposal: state => state.artist.proposal,
    //   }),
      remainingChars(){
        return 500 - (this.form.cover_letter ? this.form.cover_letter.length : 0);
      },
    //   isValid()
    //   {
    //     return this.form.total_member > 0 && this.form.cover_letter !== '';
    //   }
    },
    // created() {
    //   console.log('Event ID: ', this.$route.params.eventId);
    //   this.fetchEvent(this.$route.params.eventId)
    //     .catch(res => {
    //       const { status, message, result } = res;
    //       console.log(`Response ${this.$route.params.eventId}: `, status)
    //       if (status === 404 || status === 500) {
    //         this.$router.push({
    //           name: 'page-error-404'
    //         });
  
    //       }
    //     })
    // },
     mounted() {
      this.$refs.multiselect.$el.focus();
      
    //   this.modalObj = new Modal(document.getElementById('sentProposalModal'), {
    //     keyboard: false,
    //     backdrop: 'static',
    //   });    
      
    //   document.getElementById('sentProposalModal')
    //   .addEventListener('hide.bs.modal', () => {
    //     console.log('Close modal for proposal form')
    //   });
  
    //   this.form.total_member = this.members.length;
    //   this.form.event_id = this.event.id;
     },
  }
  </script>
  
  <style>
  @import "@vueform/multiselect/themes/default.css";
  @import '@/assets/css/artist-ui.css';
  .badge {
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.0175rem;
    border-radius: 0.3125rem;
    background: var(--orange);
    border: 0;
    margin: 0 2px;
  }
  </style>
  