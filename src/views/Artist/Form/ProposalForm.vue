<template>
  <layout>

    <section class="artist-proposal-form">
      <div class="container">
        <div class="justify-content-start back-wrapper">
          <button class="btn d-flex align-items-center back" @click="$router.push('/events')">
            <span class="material-symbols-outlined back-icon">&#xe5c4;</span>
            Back
          </button>
        </div>

        <div class="submit-proposal-wrap">
          <h2 class="top-level-title">Submit a porposal to {{  event.organizer_name }}</h2>
          <p class="top-level-sub-title">Lorem ipsum dolor sit amet consectetur. Nascetur enim cras mauris elementum montes ut tristique.</p>
        </div>

        <form @submit.prevent="submit" autocomplete="off">
          <div class="artist-details-wrap">
            <h3 class="title">Artist Details</h3>
            <div class="form-group">
              <label for="name">Name of the artist/Band</label>
              <p v-html="account.artist_name"></p>
            </div>
            
            <div class="form-group">
              <label for="name">Genre/ Type of music</label>
              <p>
                <span class="badge " v-for="(pr, index) in account.genres" :key="index">{{ pr }}</span>
              </p>
            </div>

            <div class="form-group">
              <label for="name">Number of members</label>
              <input type="number" class="form-control" required autocomplete="off" min="1" v-model="form.total_member" />
              <div v-for="err in errors?.total_member" :key="err" class="text-danger">{{ err }}</div>
            </div>
          </div>
          
          <div class="cover-letter-wrap">
            <h3>Cover letter</h3>
            <div class="form-group form-about-artist">
              <label for="letter">Write your cover letter</label><br>  
              <textarea maxlength="500" class="form-control about-artist" v-model="form.cover_letter"></textarea>
              <p v-show="form.cover_letter" class="char-count">Maximum 500 characters ( {{ remainingChars }} left)</p>
            </div>
            <div v-for="err in errors?.cover_letter" :key="err" class="text-danger">{{ err }}</div>
          </div>
          
          <div class="text-center">
            <button class="btn submit-proposal-btn" :disabled="!isValid">Submit</button>
          </div>
        </form>
      </div>
    </section>

    <div class="modal fade" id="sentProposalModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

          <div class="modal-body text-center p-0">

            <img src="/assets/artist-account/check-circle.svg" class="check-cirle" alt="check circle">
            <h3 class="event-created">Your proposal has been sent!</h3>
            <p class="message">We will notify you when the event organizer has accepted your proposal.</p>
            <button class="bnt close-modal-button" data-bs-dismiss="modal">Done</button>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '/src/components/Layouts/Layout.vue';
import { mapActions, mapGetters, mapState } from "vuex";
import { Modal } from 'bootstrap';

export default {
  components: {
    layout: Layout
  },
  data() {
    return {
      form: {
        total_member: 0,
        cover_letter: '',
        event_id: '',
      },
      errors: [],
      errorMessage: '',
    }
  },
  methods: {
    ...mapActions(['sendArtistProposal']),
    clearErrorMessage() {
      //this.error.song = [];
    },
    submit()
    {

      this.$store.commit('SET_PROPOSAL', this.form);
      this.sendArtistProposal()
        .then(response =>
        {
          const { status } = response

          if (status === 201) {
            
            new Modal(document.getElementById('sentProposalModal'), {
              keyboard: false,
              backdrop: 'static',
            }).show();            

          }

          console.log('[Response] ProposalForm.vue: ', response);
        })
        .catch(err =>
        {
          console.log('Error on proposal: ', err)
          const { status, result } = err;

          if (status === 422) {
            const { errors } = result
            this.errors = errors;

            console.log('[Error] Proposal form: ', err);
          }

        });
    },
    clearErrorMessageAfterDelay() {
      setTimeout(() => {
        this.clearErrorMessage();
        this.defaultFileFormat = true;
      }, 10000); 

      this.defaultFileFormat = false;
    },
  },
  computed: {
    ...mapGetters(['isLoggedIn',]),
    ...mapState({
      event: state => state.events.event,
      members: (state) => state.artist.members,
      account: (state) => state.account,
      proposal: state => state.artist.proposal,
    }),
    remainingChars(){
      return 500 - (this.form.cover_letter ? this.form.cover_letter.length : 0);
    },
    isValid()
    {
      return this.form.total_member > 0 && this.form.cover_letter !== '';
    }
  },
  mounted() {
    this.form.total_member = this.members.length;
    this.form.event_id = this.event.id;
  },
}
</script>

<style>
@import '@/assets/css/artist-ui.css';
.badge {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.0175rem;
  border-radius: 0.3125rem;
  background: var(--orange);
  border: 0;
  /* margin: 3.5rem auto; */
  margin: 0 2px;
  --bs-badge-padding-x: 0.65em;
    --bs-badge-padding-y: 0.35em;
    --bs-badge-font-size: 0.75em;
    --bs-badge-font-weight: 700;
    --bs-badge-color: #fff;
    --bs-badge-border-radius: var(--bs-border-radius);
    display: inline-block;
    padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
    font-size: var(--bs-badge-font-size);
    font-weight: var(--bs-badge-font-weight);
    line-height: 1;
    color: var(--bs-badge-color);
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: var(--bs-badge-border-radius);
}
</style>
