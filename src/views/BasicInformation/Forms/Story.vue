<template>
  <div>

    <div class="step-content active">
      <div class="progress">
        <div class="progress-bar" :style="{ width: subProgressWidthStory }"></div>
      </div>

      <div class="d-flex justify-content-center content-sub">
        <div v-for="(subStep3, subIndex) in subStepsStory" :key="subIndex"
          :class="['step-item', { 'active': subIndex === currentSubStepStory }]">
          <div class="substep-title">{{ subStep3.title }}</div>
        </div>
      </div>

      <!-- STORY SubSteps -->
      <div v-if="currentSubStepStory === 0">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Occasion Details</h2>
            <form @submit.prevent="submit">
              <div class="form-group">
                <label for="language">What is the song for?</label>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <span :style="purpose ? { color: '#121212' } : {}">{{ purpose ? purpose?.name : 'Select Occasion' }}</span>
                    <img :src="expandMore.img" :alt="expandMore.altText">
                  </button>

                  <ul class="dropdown-menu">
                    <li v-for="occasion in purposes" :key="occasion.id" @click="selectOccasion(occasion)">{{ occasion.name
                    }}</li>
                  </ul>
                </div>
              </div>

              <div class="form-group">
                <label for="language">To whom is the song for?</label>
                <input id="name" type="text" class="form-control" name="name" v-model="form.receiver" required
                  autocomplete="song-for" placeholder="e.g Jacob Jones">
              </div>

              <div class="form-group">
                <label for="language">Where did the song come from?</label>
                <input id="name" type="text" class="form-control" name="name" v-model="form.sender" required
                  autocomplete="come-from" placeholder="e.g Jane Cooper">
              </div>

              <div class="button-wrapper">
                <button type="button" class="btn btn-primary back" @click="previousStep"
                  :disabled="page === 0">Back</button>
                <button type="button" class="btn btn-primary next" @click="subNextStepStory"
                  :disabled="!purpose || (isButtonOccasion)">Next</button>
                <!-- <button type="button" class="btn btn-primary next" @click="subNextStepStory">Next</button> -->
              </div>
            </form>
          </div>
        </div>
      </div>

      <div v-if="currentSubStepStory === 1">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title your-story">Tell us your story</h2>
            <p class="card-text">In this section, you’ll provide your artist with all the inspiration they’ll need to craft your custom song.</p>
            <form @submit.prevent="submit">
              <div class="form-group">
                <label for="story">Write your Story</label>
                <textarea v-model="form.user_story" class="form-control"></textarea>
              </div>
              <!-- {{ !form.user_story }} -->
              <div class="button-wrapper">
                <button type="button" class="btn btn-primary back" @click="subPreviousStepStory"
                  :disabled="currentStep === 0">Back</button>
                <button type="submit" class="btn btn-primary next" :disabled="!form.user_story">Next</button>
              </div>
            </form>
          </div>
        </div>
      </div> <!-- end of currentSubStepStory === 1 -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  setup() {

    return {}
  },
  data() {
    return {
      currentSubStepStory: 0,
      expandMore: {
        img: '/assets/expand-more.svg',
        altText: 'expand icon to see list of items in the dropdown menu'
      },
      subStepsStory: [
        { title: 'Occasion details' },
        { title: 'Your story' },
      ],
      songOccasionOptions: [
        { id: 1, name: 'Birthday' },
        { id: 2, name: 'Graduation' },
        { id: 3, name: 'Wedding' }
      ],
      // form: {
      //   purpose: null,
      //   receiver: null,
      //   sender: null,
      //   user_story: null,
      // }
    }
  },
  props: {
    page: {
      type: Number,
      default: 0,
      required: true
    },
  },
  methods: {
    ...mapActions([
      'songStepThree',
    ]),
    submit() {
      this.$emit('step', 3);
      // this.songStepThree(this.form)
      //   .then(response => {
      //     const { status: statusCode } = response
      //     console.log('Step Three response: ', response);
      //     if (statusCode === 200) {
      //       this.$emit('step', 3);
      //     }
      //   })
    },
    previousStep() {
      console.log('Story Previous Step')
      this.$emit('step', 1)
    },
    subNextStepStory() {
      if (this.currentSubStepStory < this.subStepsStory.length - 1) {
        this.currentSubStepStory++;
      }
    },
    subPreviousStepStory() {
      if (this.currentSubStepStory > 0) {
        this.currentSubStepStory--;
      }
    },
    selectOccasion(occasion) {
      console.log('Song Purpose: ', occasion);
      // this.form.purpose = occasion;
      this.$store.commit('SET_SONG_PURPOSE', occasion)
    },
  },
  mounted() {

  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
    ...mapState({
      purpose: state => state.songs.song_purpose,
      purposes: (state) => state.songs.purposes,
      form: state => state.songs.song,
    }),
    subProgressWidthStory() {
      return ((this.currentSubStepStory + 1) / this.subStepsStory.length) * 100 + '%';
    },
    isButtonOccasion() {
      return this.form.receiver === '' || this.form.sender === '';
    },
  },
  watch: {

  }
}
</script>


<style scoped></style>