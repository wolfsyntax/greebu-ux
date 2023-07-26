<template>
  <div class="step1">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title step1-title">Basic Information</h2>
        <p class="card-text">Lorem ipsum dolor sit amet consectetur. Nec augue ultrices sit ultricies enim tellus tempus in.</p>
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="name" class="form-label">First Name</label>
            <input id="name" type="text" class="form-control" name="name" v-model="form.first_name" required autocomplete="first-name" placeholder="Please type your First name">
          </div>

          <div class="form-group">
            <label for="name">Last Name</label>
            <input id="name" type="text" class="form-control" name="name" v-model="form.last_name" required autocomplete="last-name" placeholder="Please type your Last name">
          </div>
          
          <div class="form-group">
            <label for="email">Email Address</label>
            <input id="email" type="email" class="form-control" name="email"  v-model="form.email" required autocomplete="email"  @input="validateEmail" placeholder="Please type your Email Address">
          </div>

          <div class="button-wrapper">
            <button type="button" class="btn btn-primary back" @click="previous" :disabled="page === 0">Back</button>
            <button type="submit" class="btn btn-primary next" :disabled="isButtonInfo">Next</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  setup () {
    

    return {}
  },
  data()
  {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
      },
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
      
    ]),
    submit()
    {
      this.$emit('step', 1)
      this.$emit('stepData', this.form)
    }, 
    previous()
    {
      this.$emit('step', 0);
    },
    validateEmail ()
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
    isButtonInfo()
    {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      var result = (
        this.form.first_name === '' ||
        this.form.last_name === '' ||
        !emailRegex.test(this.form.email)
      );

      console.log('Button Info: ', result)
      return result;

    },
  },
  watch: {

  }
}
</script>

<style scoped>

</style>