<template>

<div >

<div class="step-content" v-for="(step, index) in steps" :key="index" :class="{ 'active': index === currentStep }">
<div v-if="index === 2">
<div class="progress">
<div class="progress-bar" :style="{ width: subProgressWidthStory }"></div>
</div>
<div class="d-flex justify-content-center content-sub">
<div v-for="(subStep3, subIndex) in subStepsStory" :key="subIndex" :class="['step-item', { 'active': subIndex === currentSubStepStory }]">
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
<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
<span :style="selectedOccasion ? { color: '#FF6B00' } : {}">{{ selectedOccasion ? selectedOccasion.name : 'Select Occasion' }}</span>
<img :src="expandMore.img" :alt="expandMore.altText">
</button>
<ul class="dropdown-menu">
<li v-for="occasion in songOccasionOptions" :key="occasion.id" @click="selectOccasion(occasion)">
{{ occasion.name }}</li>
</ul>
</div>
</div> 
<div class="form-group">
<label for="language">To whom is the  song for?</label>
<input id="name" type="text" class="form-control" name="name" v-model="song_for" required autocomplete="song-for"  placeholder="e.g Jacob Jones">
</div> 
<div class="form-group">
<label for="language">Where did the song come from?</label>
<input id="name" type="text" class="form-control" name="name" v-model="come_from" required autocomplete="come-from"  placeholder="e.g Jane Cooper">
</div> 
<div class="button-wrapper">
<button type="button" class="btn btn-primary back" @click="previousStep" :disabled="currentStep === 0">Back</button>
<button type="button" class="btn btn-primary next" @click="subNextStepStory" :disabled="!selectedOccasion || (isButtonOccasion)">Next</button>
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
<textarea v-model="your_story" class="form-control"></textarea>
</div> 
<div class="button-wrapper">
<button type="button" class="btn btn-primary back" @click="subPreviousStepStory" :disabled="currentStep === 0">Back</button>
<button type="button" class="btn btn-primary next" @click="nextStep" :disabled="!selectedOccasion || (isButtonOccasion)">Next</button>
<!-- <button type="button" class="btn btn-primary next" @click="nextStep">Next</button> -->
</div>
</form>
</div>
</div>
</div> <!-- end of currentSubStepStory === 1 -->
</div>
</div>
</div>

</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  setup()
  {


    return {}
  },
  data()
  {

  },
  methods: {
    ...mapActions([
      'fetchArtists', 'artistOptions',
    ]),
    submit()
    {

    }
  },
  mounted()
  {

  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
    ...mapState({
      artists: (state) => state.artist.artists,
      artist_types: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
    }),
  },
  watch: {

  }
}
</script>


<style scoped></style>