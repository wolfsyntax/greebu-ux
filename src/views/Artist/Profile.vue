<template>

  <div>
    <section class="profile-details" id="artist-profile">
      <div class="container">
        <div class="row profile-row">
          <div class="col-3"></div>
          <div class="col-6">
            <div class="back-wrapper">
              <a href="/artist" class="back">
                <span class="material-symbols-outlined">&#xef7d;</span>Back
              </a>
            </div>

            <h2 class="title">Welcome! Let's create your profile as an artist</h2>

            <p class="sub-heading">Let customers and other co-artists know you better!</p>
            <h3 class="profile-details">Profile Details</h3>
              
              <!-- DISPLAY MODAL -->
            <div ref="modal" class="modal fade" :class="{ show: active, 'd-block': active }"
              tabindex="-1" role="dialog"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <h5 class="modal-title">{{ formHeader }}</h5>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col">
                          <span class="sub-heading">{{ formSubHeading }}</span>
                        </div>
                      </div>
                    </div>

                    <span class="material-symbols-rounded close-modal-icon" data-dismiss="modal" @click="toggle">close</span>
                  </div>

                  <div class="modal-body">
                    <member-form @modalClose="dismiss" @form="updateMember" v-if="formType === 'members'"/>
                    <social-media @modalClose="dismiss" @form="updateSocial" v-else />
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="active" class="modal-backdrop fade show"></div>

            <!-- <div class="alert alert-success updated-successfully" role="alert" v-if="message">
              {{ message }}
            </div> -->


            <div v-if="message" class="d-flex justify-content-between toast-artist-details">
              <div class="d-flex accepted-wrapper">
                  <span class="material-symbols-rounded check-circle">&#xe86c;</span>
                <div>
                  <h5 class="accepted">{{ message }}</h5>
                  <p class="description">Lorem ipsum dolor set amet.</p>
                </div>
              </div>
              <div class="close-toast">
                <span class="material-symbols-rounded close-icon" @click="closeToastArtist">&#xe5cd;</span>
              </div>
            </div>


            <form @submit.prevent="submit" class="fill-details">
              <!-- {{ form }} -->

              <div class="form-group upload-img">
                <label class="label-img">
                    <img :src="avatar" class="img-fluid default-avatar" alt="default user avatar">
                    <div class="camera">
                      
                      <!-- <input type="file" ref="file" @change="uploadFile" accept="image/png, image/webp, image/svg, image/jpeg" /> -->
                      
                      
                      <!-- <input type="file" @input="form.avatar = $event.target.files[0]" accept="image/png, image/webp, image/svg, image/jpeg" /> -->
                      <input type="file" @input="changeImage" accept="image/png, image/webp, image/svg, image/jpeg" />
                      <!-- <div v-if="error?.avatar" class="text-danger">{{ error.avatar }}</div> -->
                      <div v-for="err in error?.avatar" :key="err" class="text-danger">{{ err }}</div>
                      <progress v-if="form.progress" :value="form.progress.percentage" max="100">{{ form.progress.percentage }}%</progress>
                    </div>
                    <span class="material-symbols-outlined camera-outer" >&#xE412;</span>
                </label>

                <label for="fileUpload" class="description">Upload profile picture</label>
              </div>

              <div class="required-fields">
                <div class="form-group typeArtist">
                  <label for="typeArtist">Type of the Artist</label>
                  <select v-model="form.artist_type" class="form-select">
                    <option>Select Artist Type</option>
                    <option v-for="artist_type in artistTypes" :key="artist_type.id" :value="artist_type.title">
                      {{ artist_type.title }}
                    </option>
                  </select>

                  <!-- <div v-if="error?.artist_type" class="artist-type-error text-danger"></div> -->
                  <div v-for="err in error?.artist_type" :key="err" class="text-danger">{{ err }}</div>
                </div>

                <div class="form-group">
                  <label for="artistName">Name of the Artist/Band</label>
                  <input type="text" v-model="form.artist_name" placeholder="Name of the Artist/Band" class="form-control artist-name" required/>
                  <div v-if="error?.artist_name" class="artist-name-error text-danger"></div>
                </div>

                <div class="form-group" >
                  <label for="genre">Genre</label>
                  <multiselect v-model="formGenres" mode="tags"
                  :close-on-select="false"
                  :create-option="true" :options="async function(query) {
                    return await fetchGenre(query) || genres
                  }" 
                  :searchable="true" :delay="0" 
                  noOptionsText="Please input genre(s)"
                  class="genre" placeholder="Please select genres" />
                  <!-- <div v-if="errors.genre" class="genre-error text-danger"></div> -->
                  <br/>
                  <!-- <input type="text" v-model="others" @blur="updateGenre" placeholder="Genre" class="form-control province" v-if="hasOthers" required /> -->
                  <div v-for="err in error?.genre" :key="err" class="text-danger">{{ err }}</div>

                  
                </div>

                <div class="row address">
                  <div class="col-4">
                    <div class="form-group">
                      <label for="address">Address</label>
                      <input type="text" v-model="form.street_address" placeholder="Street" class="form-control street" required />
                      <!-- <div v-if="errors.street" class="street-error text-danger"></div> -->
                      <div v-for="err in error?.street_address" :key="err" class="text-danger">{{ err }}</div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="form-group">
                      <label for="address" class="hidden">City</label>
                      <input type="text" v-model="form.city" placeholder="City" class="form-control city" required />
                      <!-- <div v-if="errors.city" class="city-error text-danger"></div> -->
                      <div v-for="err in error?.city" :key="err" class="text-danger">{{ err }}</div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="form-group">
                      <label for="address" class="hidden">Province</label>
                      <input type="text" v-model="form.province" placeholder="Province" class="form-control province" required/>
                      <!-- <div v-if="error?.province" class="province-error text-danger"></div> -->
                      <div v-for="err in error?.province" :key="err" class="text-danger">{{ err }}</div>
                    </div>
                  </div>
                </div> <!-- end of row -->
              </div> <!-- end of required-fields class -->
                <!-- Band Members -->

              <div class="band-and-social">                           
                <div class="form-group">
                  <label for="members">Band Members</label><br>
                  <button type="button" class="btn btn-primary add-member" @click="toggle()"><span class="material-symbols-rounded">add_box</span>Add Member</button>
                </div>    

                <div class="col">
                  <div class="row">
                    <div class="col-12">
                      <ul class="list-group band-members" v-if="members">
                        <li class="list-group-item" v-for="mem in members" :key="mem.id">
                          <div class="items">
                            
                            <img @error="replaceByDefault" class="avatar" :src="mem.avatar" alt="" />      
                            
                            <div class="member-info">
                              <h6 class="band-name">{{ mem.member_name }}</h6>
                              <p class="band-role">{{ mem.role }}</p>
                            </div>
                          </div>

                          <div class="options">
                            <div class="d-flex align-items-center text-end">
                              <button type="button" class="edit-band-member-wrapper">
                                <img src="/assets/artist-account/edit-band-member.svg" class="edit-band-member" alt="edit band member">
                              </button>
                              <button type="button" @click="removeMember(mem.id)" class="delete-band-member-wrapper">
                                <img src="/assets/artist-account/delete-band-member.svg" class="delete-band-member" alt="delete band member">
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Social Media Links -->
                <div class="form-group">
                  <label for="social-media">Social Media Accounts</label><br>  
                  <button type="button" class="btn btn-primary add-social-media" @click="toggle('links')"><span class="material-symbols-rounded">add_link</span>Add Links</button>
                </div>                         

                <div class="card mb-3" v-if="artistProfile?.youtube_channel">
                  <div class="row g-0">
                    <div class="col-md-1">
                      <img src="/assets/social icons/_YouTube.svg" class="img-fluid rounded-start mx-2" alt="YouTube">
                    </div>

                    <div class="col-md-10">
                      <div class="card-body">
                        <h5 class="card-title">YouTube</h5>
                        <p class="card-text"><small class="text-body-secondary">{{ artistProfile?.youtube_channel }}</small></p>
                      </div>
                    </div>

                    <div class="col-md-1">
                      <div class="text-end">
                        <a href="#" @click="removeSocialMedia('youtube')">
                          <span class="material-symbols-rounded">delete</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3" v-if="form?.instagram_username">
                  <div class="row g-0">
                    <div class="col-md-1">
                      <img src="/assets/social icons/_Instagram.svg" class="img-fluid rounded-start mx-2" alt="Instagram">
                    </div>
                  
                    <div class="col-md-10">
                      <div class="card-body">
                        <h5 class="card-title">Instagram</h5>
                        <p class="card-text"><small class="text-body-secondary">{{ form?.instagram_username }}</small></p>
                      </div>
                    </div>

                    <div class="col-md-1">
                      <div class="text-end">
                        <a href="#" @click="removeSocialMedia('instagram')">
                          <span class="material-symbols-rounded">delete</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3" v-if="form.spotify_profile" style="height: 90px;">
                  <div class="row g-0">
                    <div class="col-md-1">
                      <img src="/assets/social icons/_Spotify.svg" class="img-fluid rounded-start mx-2" alt="Spotify">
                    </div>

                    <div class="col-md-10">
                      <div class="card-body">
                        <h5 class="card-title">Spotify</h5>
                        <p class="card-text"><small class="text-body-secondary">{{ form.spotify_profile }}</small></p>
                      </div>
                    </div>

                    <div class="col-md-1">
                      <div class="text-end">
                        <a href="#" @click="removeSocialMedia('spotify')">
                          <span class="material-symbols-rounded">delete</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3" v-if="form.twitter_username" style="height: 90px;">
                  <div class="row g-0">
                    <div class="col-md-1">
                      <img src="/assets/social icons/_Twitter.svg" class="img-fluid rounded-start mx-2" alt="Twitter">
                    </div>

                    <div class="col-md-10">
                      <div class="card-body">
                        <h5 class="card-title">Twitter</h5>
                        <p class="card-text"><small class="text-body-secondary">{{ form.twitter_username }}</small></p>
                      </div>
                    </div>

                    <div class="col-md-1">
                      <div class="text-end">
                        <a href="#" @click="removeSocialMedia('twitter')">
                          <span class="material-symbols-rounded">delete</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3" v-if="form.youtube_channel" style="height: 90px;">
                  <div class="row g-0">
                    <div class="col-md-1">
                      <img src="/assets/social icons/_YouTube.svg" class="img-fluid rounded-start mx-2" alt="YouTube">
                    </div>

                    <div class="col-md-10">
                      <div class="card-body">
                        <h5 class="card-title">YouTube</h5>
                        <p class="card-text"><small class="text-body-secondary">{{ form.youtube_channel }}</small></p>
                      </div>
                    </div>

                    <div class="col-md-1">
                      <div class="text-end">
                        <a href="#" @click="removeSocialMedia('youtube')">
                          <span class="material-symbols-rounded">delete</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>   <!-- end of band-and-social--> 

              <div class="d-flex justify-content-between group-item">
                <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept events?</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" v-model="form.accept_booking" id="flexSwitchCheckDefault">
                </div>
              </div>
              
              <div class="d-flex justify-content-between group-item">
                <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept custom song?</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" v-model="form.accept_request" id="flexSwitchCheckDefault">
                </div>
              </div>

              <div class="d-flex justify-content-between group-item">
                <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept booking for special occassions?</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" v-model="form.accept_proposal" id="flexSwitchCheckDefault">
                </div>
              </div>

              <!-- About artist - Textarea -->
              <div class="form-group form-about-artist">
                <label for="about-artist">About the Artist</label><br>  
                <textarea v-model="form.bio" class="form-control about-artist" 
                  placeholder="My name is [Your Name], and I am a [genre/ style] music artist based in [city, country]. I am writing to propose a music collaboration opportunity that I believe would be mutually beneficial and creatively inspiring......">
                </textarea>

                <!-- <div v-if="errors.bio">{{ error.bio }}</div> -->
                <div v-for="err in error?.bio" :key="err" class="text-danger">{{ err }}</div>
              </div>

              <div class="text-center">
                <!-- <button type="submit" class="btn btn-success submit-form" 
                data-bs-toggle="modal" data-bs-target="#successDetailsModal">Submit</button> -->
                <button type="submit" class="btn btn-success submit-form" 
                >
                <span v-if="isLoading">
                <i class="busy-submitting"></i>Submit</span>
                <span v-else>Submit</span>
              </button>
              </div>
            </form>

              <!-- IF THE FORM IS SUCCESSFUL SHOW THIS MODAL -->

              <!-- Modal -->
            <div class="modal fade" id="successDetailsModal" tabindex="-1" aria-labelledby="successDetailsLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div class="modal-body text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <g clip-path="url(#clip0_4710_61743)"><path d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM20 34L10 24L12.82 21.18L20 28.34L35.18 13.16L38 16L20 34Z" fill="#FF6B00"/></g>
                      <defs><clipPath id="clip0_4710_61743"><rect width="48" height="48" fill="white"/></clipPath></defs>
                    </svg>
                    
                    <h3 class="title">You’re all set!</h3>
                    <p class="content">Lorem ipsum dolor sit amet consectetur. Morbi lacus sit massa ligula nullam in mauris eget metus.</p>
                  </div>

                  <div class="modal-footer">
                    <a href="/artist" class="view-profile">View Your Profile</a>
                  </div>
                </div>
              </div>
            </div> 

          </div>

          <div class="col-3"></div>
        </div> <!-- end of row -->
      </div> <!-- end of container -->
    </section>
  </div>

</template>
<script>
// import Layout from '/src/components/Layouts/ArtistLayout.vue';
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import MemberForm from '/src/views/Artist/Form/AddMember.vue';
import SocialMediaForm from '/src/views/Artist/Form/SocialMedia.vue';
import BlankHeader from "@/components/Home/BlankHeader.vue";
import Multiselect from '@vueform/multiselect'

export default {
  components: {
    // layout: Layout,
    'member-form': MemberForm,
    'social-media': SocialMediaForm,
    BlankHeader,
    Multiselect,
  },
  data()
  {
    return {
      form: {
        artist_type: null,
        artist_name: null,
        genres: [],
        bio: null,
        avatar: null,
        street_address: null,
        city: null,
        province: null,
        youtube_channel: null,
        twitter_username: null,
        instagram_username: null,
        spotify_profile: null,
        accept_request: false,
        accept_booking: false,
        accept_proposal: false,
      },
      hasOthers: false,
      // others: '',
      formGenres: [],
      avatar: '/assets/artist-account/new.svg',
      options: ['list', 'of', 'options'],
      // members: [],
      //errors: {},
      active: false,
      formType: 'members',
      formHeader: 'Add Member',
      formSubHeading: 'Lorem ipsum dolor sit amet consectetur. Nam lacus viverra nec orci arcu id fringilla ultrices.',
      isLoading: false,
    }
  },
  setup()
  {
    /**
     * 
     * profile: Object, errors: Object, genres: Object, artist_types: Object, artist_genre: Object, img: String, members: Array
    */
  },
  beforeCreate() {
    this.form = {
      artist_type: null,
      artist_name: null,
      genres: [],
      bio: null,
      avatar: null,
      street_address: null,
      city: null,
      province: null,
      youtube_channel: null,
      twitter_username: null,
      instagram_username: null,
      spotify_profile: null,
      accept_request: false,
      accept_booking: false,
      accept_proposal: false,
    };

    console.log('-Before Create-')
  },
  created() {

  },
  mounted()
  {
    console.log('--- Mounted ---')

    // this.fetchProfile()
    //   .then(res =>
    //   {
    //     console.log('Fetch Profile [AccountLayout]: ', res)
    //   }).catch(err =>
    //   {
    //     console.log('Fetch Profile Error [AccountLayout]: ', err)
    //   })

    // this.artistOptions()
    //   .then(res =>
    //   {
    //     console.log('Artist Options [AccountLayout] ', res)
    //   });

    // this.fetchArtistOptions().then(response =>
    // {

    //   /*
    //     1. artistOptions:
    //     - artist types (artist_types)
    //     - genres (genre list)

    //     2. fetchProfile
    //     - account
    //     - genre
    //     - members
    //     - profile
    //   */

    //   this.form = this.myAccount;
    //   this.avatar = this.myAccount?.avatar || '/assets/artist-account/new.svg'
    //   this.formGenres = this.myAccount?.genres || [];
    //   var temp = this.fetchGenre
    //   console.log('Genre: ', this.formGenres);

    // })

    this.form = this.myAccount;
    this.avatar = this.myAccount?.avatar || '/assets/artist-account/new.svg'
    this.formGenres = this.myAccount?.genres || [];

    console.log('--- End Mounted ---')

  },
  props: {
    error: {
      type: Array,
      default: [],
      required: true
    },
    message: {
      type: String,
      default: '',
      required: false,
    }
  },
  methods: {
    ...mapActions([
      'fetchArtistOptions', 'updateArtistProfile', 'removeMember', /*'removeSocialMedia',*/ 'artistOptions', 'fetchProfile',
    ]),
    ...mapMutations([
      'SET_PROFILE', 'SET_ARTIST', 'SET_MEMBERS',
    ]),
    changeImage(event){
      this.avatar = URL.createObjectURL(event.target.files[0]);
      this.form.avatar = event.target.files[0];
    },
    submit()
    {

      this.form.genres = this.formGenres;

      if (typeof this.form.avatar === 'string') this.form.avatar = '';

      this.$emit('form', this.form)
      this.isLoading = true;
      
      this.fetchProfile().then(res =>
      {
        const { status: statusCode, data: { result: { genres } } } = res

        this.form.genres = genres
        this.isLoading = false;

      });

      console.log('Artist Profile [form]: ', this.form)
      //this.$router.push('/artist');
    },
    removeSocialMedia(key)
    {

      switch (key) {
        case 'youtube':
          this.form.youtube_channel = '';
          break;
        case 'instagram':
          this.form.instagram_username = '';
          break;
        case 'twitter':
          this.form.twitter_username = '';
          break;
        case 'spotify':
          this.form.spotify_profile = '';
          break;
        default:

      }
    },
    dismiss()
    {
      const body = document.querySelector("body")
      this.active = false
      this.active ? body.classList.add("modal-open") : body.classList.remove("modal-open")
    },
    toggle(option = 'members')
    {
      const body = document.querySelector("body")
      this.active = !this.active
      this.active ? body.classList.add("modal-open") : body.classList.remove("modal-open")

      this.formType = option

      this.formHeader = option === 'members' ? 'Add Member' : 'Add Social Media Account';
      
    },
    replaceByDefault(e) 
    {
      e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&usqp=CAU';
    },
    updateSocial(key, val)
    {

      switch (key) {
        case 'youtube':
          this.form.youtube_channel = val;
          break;
        case 'instagram':
          this.form.instagram_username = val;
          break;
        case 'twitter':
          this.form.twitter_username = val;
          break;
        case 'spotify':
          this.form.spotify_profile = val;
          break;
        default:
            
      }
      
      console.log('Update Social: ', val)
    },
    updateMember(val)
    {
      this.member.push(val);
      this.dismiss()
    },
    closeToastArtist(){
      this.message = false;
    },
    fetchGenre(query)
    {
      if (!query) {
        console.log('Empty Query fetchGenre')
        this.artistOptions()
      }
      // return query ? this.genres : this.cGenre
      return this.formArtistGenres

    },
  },
  computed: {
    ...mapGetters(["userInfo", "token", 'artistProfile', 'artistGenre', 'myAccount', 'formArtistGenres',]),
    ...mapState({
      artistTypes: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
      members: (state) => state.artist.members,
      account: (state) => state.account,
    }),
    // cGenre()
    // {
    //     const self = this;
    //     if (this.formGenres && this.genres) {
    //       var gen = this.formGenres?.filter(function (el)
    //         {
    //           return !self.genres.includes(el);
    //         })

    //       return gen?.concat(this.genres);
    //     }
        
    //     if (!this.genres) {
    //       this.artistOptions();
    //     }
        
    //     return this.genres;
    // },

  },
  watch: {

  }
}
</script>

<style>
@import "@vueform/multiselect/themes/default.css";
@import '@/assets/css/artist-ui.css';

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

</style>