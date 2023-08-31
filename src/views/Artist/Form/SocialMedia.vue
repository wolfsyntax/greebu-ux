<template>
  <div>
    <form @submit.prevent="submit()" class="modal-add-social-media">
      <div class="container">
        <div class="row py-2">
          <div class="col">
            <div class="form-group">
              <label for="social-media">Select Social Media Account</label>
              <select v-model="media_type" class="form-select">
              <option value="" selected>Please Select</option>
              <option v-for="media in social_media" :key="media.id" :value="media.value">{{ media.label }}</option>
            </select>
            <span v-if="errors?.media_type" class="text-danger">{{ errors.media_type }}</span>
            </div>
          </div>
        </div>

        <div class="row py-2">
          <div class="col">
            <div class="form-group">
              <label for="social-media">URL</label>
            <input type="text" v-model="url" :disabled="media_flag" class="form-control"/>
            <span v-if="errors?.url" class="text-danger">{{ errors.url}}</span>
          </div>
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            <button type="submit" :disabled="!(validType && validUrl)" class="btn btn-success add-social-media">Add</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Layout from '/src/components/Layouts/AuthLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    layout: Layout,
  },
  data()
  {
    return {
      social_media: [
        { id: 1, value: 'instagram', label: 'Instagram', },
        { id: 2, value: 'twitter', label: 'Twitter', },
        { id: 3, value: 'youtube', label: 'Youtube' },
        { id: 4, value: 'spotify', label: 'Spotify' },
      ],
      media_type: null,
      url: null,
      regex_rules: '',
      validUrl: false,
      validType: false,
      media_flag: true,
      errors: {},
    }
  },
  setup()
  {

  },
  props: {
    error: {
      type: Array,
      default: [],
      required: true
    },
    media: {
      type: Object,
      default: {
        key: '', text: '',
      },
      required: true
    },
  },
  watch: {
    media(n, o)
    {
      this.media_type = n.key ?? '';
      this.url = n.text ?? '';
      this.errors = {};
    },
    media_type(nv, ov)
    {

      if (nv) {
        this.validType = true;
        this.validUrl = false;
        this.media_flag = false;
        if (this.url) {

          if (/^(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/.test(this.url) && nv === 'instagram') {
            // console.log('Valid IG Url: ', this.url)
            this.validUrl = true;
          } else if (/^(https?:\/\/open.spotify.com\/(track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))$/.test(this.url) && nv === 'spotify') {
            // console.log('Valid Spotify profile: ', this.url)
            this.validUrl = true;
          } else if (/^http(s)?:\/\/(www|m)\.youtube\.com\/((channel|c)\/)?(?!feed|user\/|watch\?)([a-zA-Z0-9-_.])*.*$/.test(this.url) && nv === 'youtube') {
            // console.log('Valid YouTube URL: ', this.url)
            this.validUrl = true;
          } else if (/^(?:(?:http|https):\/\/)?(?:www.)?(twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))$/.test(this.url) && nv === 'twitter') {
            // console.log('Valid Twitter Profile: ', this.url)
            this.validUrl = true;
          } else {
            this.validType = false;

          }
        }

      } else {
        this.validType = false;
        this.media_flag = true;
      }

      if (!this.validUrl && this.url !== '' && this.media_type !== '') {
        this.errors['url'] = (`${this.media_type.charAt(0).toUpperCase()}${this.media_type.slice(1)}`) + ' url is invalid format.';
      } else this.errors['url'] = '';
    },
    url(nv, ov)
    {
      this.errors['url'] = '';
      this.validUrl = false;

      if (/^(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/.test(nv) && this.media_type === 'instagram') {
        // console.log('Valid IG Url: ', this.url)
        this.validUrl = true;
        this.validType = this.media_type ? true : false;
      } else if (/^(https?:\/\/open.spotify.com\/(track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))$/.test(nv) && this.media_type === 'spotify') {
        // console.log('Valid Spotify profile: ', this.url)
        this.validUrl = true;
        this.validType = this.media_type ? true : false;
      } else if (/^http(s)?:\/\/(www|m)\.youtube\.com\/((channel|c)\/)?(?!feed|user\/|watch\?)([a-zA-Z0-9-_.])*.*$/.test(nv) && this.media_type === 'youtube') {
        // console.log('Valid YouTube URL: ', this.url)
        this.validUrl = true;
        this.validType = this.media_type ? true : false;
      } else if (/^(?:(?:http|https):\/\/)?(?:www.)?(twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))$/.test(nv) && this.media_type === 'twitter') {
        // console.log('Valid Twitter Profile: ', this.url)
        this.validUrl = true;
        this.validType = this.media_type ? true : false;
      }

      if (!this.validUrl && this.media_type === '' && this.url === '') {
        this.errors.url = '';
      } else if (ov !== '' && nv === '') {
        this.errors.url = (`${this.media_type.charAt(0).toUpperCase()}${this.media_type.slice(1)}`) + ' url is required.';
      } else if (!this.validUrl && this.url !== '' && this.media_type !== '') { 
        this.errors.url = (`${this.media_type.charAt(0).toUpperCase()}${this.media_type.slice(1)}`) + ' url is invalid format.';
      } else {
        this.errors.url = '';
      }

    }
  },
  created()
  {

    this.media_type = this.media.key;
    this.url = this.media.text;
    this.errors = {};

  },
  methods: {
    ...mapActions([
      'addSocialMedia'
    ]),
    submit()
    {
      this.$emit('modalClose');
      
      this.$emit('form', this.media_type, this.url)

      // this.addSocialMedia({
      //   url: this.url,
      //   media_type: this.media_type,
      // }).then(response =>
      // {
        
      // }).catch(err =>
      // {
      //   // this.$vs.notification({
      //   //   color: 'danger',
      //   //   position: 'top-right',
      //   //   title: 'Server Status',
      //   //   text: `${err.message}`
      //   // })
      // });
      // this.signin(this.form).then((response) =>
      // {

      //   const { status } = response;

      //   var user = this.$store.state.user;
      //   var role = this.$store.state.role;

      //   if (role === 'artists') {
      //     this.$router.push("/artist");
      //   }

      // });

    }
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
    ...mapState({
      users: (state) => state.user,
    }),
  }
}
</script>
<style scoped></style>
