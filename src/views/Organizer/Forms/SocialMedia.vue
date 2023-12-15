<template>
  <div class="modal fade" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog" >
      <div class="modal-content">
        <div class="modal-header border-bottom-0 p-0 d-flex align-items-start justify-content-between">
          <div>
            <h5 class="modal-title">Add Social Media Account</h5>             
            <p class="mb-0 sub-title">Lorem ipsum dolor sit amet consectetur. Nam lacus viverra nec orci arcu id fringilla ultrices.</p>
          </div>
          <div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="modalClose"></button>
            <!-- <CloseModalButton /> -->
          </div>
        </div>

        <div class="modal-body p-0">
          <form @submit.prevent="submit" class="modal-add-social-media" >
            
              <div class="form-group">
                <label for="social-media">Select Social Media Account</label>
                <select v-model="media_type" class="form-select">
                  <option value="" selected>Please Select</option>
                  <option v-for="media in social_media" :key="media.id" :value="media.value">{{ media.label }}</option>
                </select>
                <span v-if="errors?.media_type" class="text-danger">{{ errors.media_type }}</span>
              </div>
            
              <div class="form-group form-group-last">
                <label for="social-media">URL</label>
                <input type="text" v-model="url" :disabled="media_flag" class="form-control"/>
                <span v-if="errors?.url" class="text-danger">{{ errors.url }}</span>
              </div>             
          
            <div class="text-center">

              <button type="submit" :disabled="!(validType && validUrl)" class="btn btn-success add-social-media" v-if="showAddBtn">Add</button>
              <button type="submit" class="btn btn-success add-social-media" v-else><LoadingIndicator /></button>

            </div>     
           
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import CloseModalButton from '/src/components/CloseModalButton.vue';
import LoadingIndicator from '/src/components/LoadingIndicator.vue';

export default {
  components: {
    CloseModalButton,
    LoadingIndicator
  },
  setup()
  {


    return {}
  },
  data: () => ({
    showAddBtn: true,
    social_media: [
      { id: 1, value: 'instagram', label: 'Instagram', },
      { id: 2, value: 'twitter', label: 'X Formerly Twitter', },
      { id: 3, value: 'facebook', label: 'Facebook' },
      { id: 3, value: 'threads', label: 'Threads' },
    ],
    media_type: null,
    url: null,
    regex_rules: '',
    validUrl: false,
    validType: false,
    media_flag: true,
    errors: {},
  }),
  props: {
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
            this.validUrl = true;
          } else if (/^(?:(?:http|https):\/\/)?(?:www.)?(threads.net)\/@(\w+)/.test(this.url) && nv === 'threads') {
            this.validUrl = true;
          } else if (/^(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)$/.test(this.url) && nv === 'facebook') {
            this.validUrl = true;
          } else if (/^(?:(?:http|https):\/\/)?(?:www.)?((twitter.com|x.com)\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))$/.test(this.url) && nv === 'twitter') {
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
        this.validUrl = true;
        this.validType = this.media_type ? true : false;
      } else if (/^(?:(?:http|https):\/\/)?(?:www.)?(threads.net)\/@(\w+)/.test(nv) && this.media_type === 'threads') {
        this.validUrl = true;
        this.validType = this.media_type ? true : false;
      } else if (/^(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)$/.test(nv) && this.media_type === 'facebook') {
        this.validUrl = true;
        this.validType = this.media_type ? true : false;
      } else if (/^(?:(?:http|https):\/\/)?(?:www.)?((twitter.com|x.com)\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))$/.test(nv) && this.media_type === 'twitter') {
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
    console.log('Created [media]: ', this.media);
  },
  methods: {
    ...mapActions([
      'addSocialMedia'
    ]),
    submit()
    {
      this.showAddBtn = false;
      console.log('Social media add: ', this.media_type, this.url);

      this.$emit('form', this.media_type, this.url)
      // this.$emit('modalClose');
      this.$refs.modalClose.click();
      this.showAddBtn = true;
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


<style>
@import '@/assets/css/artist-ui.css';

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>