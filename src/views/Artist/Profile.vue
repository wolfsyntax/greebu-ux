<template>
 
    <BlankHeader />
    <div>
      <section class="profile-details">
        <div class="container">
          <div class="row profile-row">
            <div class="col-3"></div>
            <div class="col-6">

          <div class="back-wrapper">
            <a href="/artist" class="back">
              <span class="material-symbols-outlined">&#xef7d;</span>Back
            </a>
          </div>
          <h2 class="title">Profile Details</h2>
          <p class="sub-heading">Lorem ipsum dolor sit amet consectetur. Nam lacus viverra nec orci arcu id fringilla ultrices.</p>

                                 <!-- DISPLAY MODAL -->
          <div
        ref="modal"
        class="modal fade"
        :class="{ show: active, 'd-block': active }"
        tabindex="-1"
        role="dialog"
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
              <!-- <button type="button"  data-bs-dismiss="modal" aria-label="Close" class="btn-close" data-dismiss="modal" @click="toggle"></button> -->
            </div>
            <div class="modal-body">
              <member-form @modalClose="dismiss" @form="updateMember" v-if="formType === 'members'"/>
              <social-media @modalClose="dismiss" @form="updateSocial" v-else />
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="active" class="modal-backdrop fade show"></div>

      <form @submit.prevent="submit" class="fill-details">

            <div class="form-group upload-img">
              <!-- <label for="fileUpload"></label>
              <input type="file" @input="form.avatar = $event.target.files[0]" accept="image/png, image/webp, image/svg, image/jpeg" />
              <div v-if="errors?.avatar">{{ errors.avatar }}</div>
              <progress v-if="form.progress" :value="form.progress.percentage" max="100">{{ form.progress.percentage }}%</progress> -->

              <label class="label-img">
                <span class="material-symbols-outlined camera-inner">&#xe412;</span>
                <div class="camera">
                  <input type="file" @input="form.avatar = $event.target.files[0]" accept="image/png, image/webp, image/svg, image/jpeg" />
                  <div v-if="errors?.avatar" class="text-danger">{{ errors.avatar }}</div>
                  <progress v-if="form.progress" :value="form.progress.percentage" max="100">{{ form.progress.percentage }}%</progress>
                </div>
                <span class="material-symbols-outlined camera-outer" >&#xE412;</span>
              </label>

              <label for="fileUpload">Upload profile picture</label>
              <!-- see https://stackoverflow.com/questions/2855589/replace-input-type-file-by-an-image#answer-18803568 -->
            </div>

            <div class="form-group typeArtist">
              <label for="typeArtist">Type of the Artist</label>
              <select v-model="form.artist_type" class="form-select">
                <option>Select Artist Type</option>
                <option v-for="artist_type in artistTypes" :key="artist_type.id" :value="artist_type.title">
                  {{ artist_type.title }}
                </option>
              </select>
              <div v-if="errors?.artist_type" class="artist-type-error text-danger"></div>
            </div>
          
            <div class="form-group">
              <label for="artistName">Name of the Artist/Band</label>
              <input type="text" v-model="form.artist_name" placeholder="Name of the Artist/Band" class="form-control artist-name"/>
              <div v-if="errors?.artist_name" class="artist-name-error text-danger"></div>
            </div>
         
            <div class="form-group">
              <label for="genre">Genre</label>
              <multiselect v-model="form.genre" :options="genres" mode="tags" class="genre" placeholder="Please select genres" />
              <div v-if="errors?.genre" class="genre-error text-danger"></div>
            </div>
        
            <div class="row">
              <div class="col-4">
                <div class="form-group">
                <label for="address">Address</label>
                <input type="text" v-model="form.street" placeholder="Street" class="form-control street"/>
                <div v-if="errors?.street" class="street-error text-danger"></div>
              </div>
              </div>

            <div class="col-4">
              <div class="form-group">
                <label for="address" class="hidden">City</label>
                <input type="text" v-model="form.city" placeholder="City" class="form-control city"/>
                <div v-if="errors?.city" class="city-error text-danger"></div>
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="address" class="hidden">Province</label>
                <input type="text" v-model="form.province" placeholder="Province" class="form-control province"/>
                <div v-if="errors?.province" class="province-error text-danger"></div>
              </div>
            </div>
            </div> <!-- end of row -->
         
                                           <!-- Band Members -->

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
                      <vs-avatar v-if="!mem.avatar" circle>
                          <template  #text>
                            {{ mem.avatar_text }}
                          </template>
                        </vs-avatar>
                        <vs-avatar v-else circle>
                          <img @error="replaceByDefault" :src="mem.avatar" alt="" />            
                        </vs-avatar>
                        <div class="member-info">
                          <h6 class="band-name">{{ mem.fullname }}</h6>
                          <p class="band-role">{{ mem.role }}</p>
                        </div>
                     </div>
                       
                        <div class="options">
                          <div class="text-end">
                          <button type="button" @click="removeMember(mem.id)" class="btn btn-danger">
                          <span class="material-symbols-rounded">delete</span>
                          </button>
                          <Link href="">Edit</Link>
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

              <div class="d-flex justify-content-between group-item">
                <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept events?</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                </div>
              </div>
              <div class="d-flex justify-content-between group-item">
                <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept custom song?</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                </div>
              </div>
              <div class="d-flex justify-content-between group-item">
                <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept booking for special occassions?</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                </div>
              </div>
              
              <div class="card mb-3" v-if="artistProfile?.instagram_username">
                <div class="row g-0">
                  <div class="col-md-1">
                    <img src="/assets/social icons/_Instagram.svg" class="img-fluid rounded-start mx-2" alt="Instagram">
                  </div>
                  <div class="col-md-10">
                    <div class="card-body">
                      <h5 class="card-title">Instagram</h5>
                      <p class="card-text"><small class="text-body-secondary">{{ artistProfile?.instagram_username }}</small></p>
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

              <div class="card mb-3" v-if="userInfo?.spotify_profile" style="height: 90px;">
                <div class="row g-0">
                  <div class="col-md-1">
                    <img src="/assets/social icons/_Spotify.svg" class="img-fluid rounded-start mx-2" alt="Spotify">
                  </div>
                  <div class="col-md-10">
                    <div class="card-body">
                      <h5 class="card-title">Spotify</h5>
                      <p class="card-text"><small class="text-body-secondary">{{ userInfo?.spotify_profile }}</small></p>
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
              <div class="card mb-3" v-if="artistProfile?.twitter_username" style="height: 90px;">
                <div class="row g-0">
                  <div class="col-md-1">
                    <img src="/assets/social icons/_Twitter.svg" class="img-fluid rounded-start mx-2" alt="Twitter">
                  </div>
                  <div class="col-md-10">
                    <div class="card-body">
                      <h5 class="card-title">Twitter</h5>
                      <p class="card-text"><small class="text-body-secondary">{{ artistProfile?.twitter_username }}</small></p>
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
                      <!-- About artist - Textarea -->
            <div class="form-group form-about-artist">
                <label for="about-artist">About the Artist</label><br>  
                <textarea v-model="form.bio" class="form-control about-artist"
                placeholder="My name is [Your Name], and I am a [genre/ style] music artist based in [city, country]. I am writing to propose a music collaboration opportunity that I believe would be mutually beneficial and creatively inspiring......">
                </textarea>
                <div v-if="errors?.bio">{{ errors.bio }}</div>
            </div>
          <div class="text-center">
            <button type="submit" class="btn btn-success submit-form">Submit</button>
          </div>
         </form>

      
            <vs-avatar>
              <template #text>
                Lily
              </template>
            </vs-avatar>

            <vs-avatar>
              <img src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg" alt="">
            </vs-avatar>

           </div>
           <div class="col-3"></div>
          </div> <!-- end of row -->
        </div> <!-- end of container -->
      </section>

      <section class="artist-data">
        <div class="container">
          <p>{{ $filters.timeAgo('2019-12-19') }}</p>
          {{  artistProfile  }}
        </div>
      </section>
      
    </div>

</template>
<script>
// import Layout from '/src/components/Layouts/ArtistLayout.vue';
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import MemberForm from './AddMember.vue';
import SocialMediaForm from './SocialMedia.vue';
import BlankHeader from "@/components/Home/BlankHeader.vue";

export default {
  components: {
    // layout: Layout,
    'member-form': MemberForm,
    'social-media': SocialMediaForm,
    BlankHeader
  },
  data()
  {
    return {
      form: {
        artist_type: null,
        artist_name: null,
        genre: null,
        bio: null,
        avatar: null,
        street: null,
        city: null,
        province: null,
      },
      errors: {},
      active: false,
      formType: 'members',
      formHeader: 'Add Member',
      formSubHeading: 'Lorem ipsum dolor sit amet consectetur. Nam lacus viverra nec orci arcu id fringilla ultrices.',
    }
  },
  setup()
  {
    /**
     * 
     * profile: Object, errors: Object, genres: Object, artist_types: Object, artist_genre: Object, img: String, members: Array
    */
  },
  mounted()
  {
    this.fetchArtistOptions()
      .catch(err => {
      //   this.$vs.notification({
      //     color: 'danger',
      //     position: 'top-right',
      //     title: 'Server Status',
      //     text: `${err.message}`
      //   })
      });

    this.form = {
      artist_type: this.artistProfile?.artist_type?.title,
      artist_name: this.artistProfile?.profile?.business_name,
      genre: this.artistGenre,
      bio: this.account?.bio,
      avatar: this.account?.avatar,
      street: this.account?.street_address,
      city: this.account?.city,
      province: this.account?.province,
      youtube_channel: this.account?.youtube_channel,
      twitter_username: this.account?.twitter_username,
      spotify_profile: this.account?.spotify_profile,
      instagram_username: this.account?.instagram_username,
    };
  },
  methods: {
    ...mapActions([
      'fetchArtistOptions', 'updateArtistProfile', 'removeMember', 'removeSocialMedia',
    ]),
    ...mapMutations([
      'SET_PROFILE', 'SET_ARTIST', 'SET_MEMBERS',
    ]),
    submit()
    {

      this.updateArtistProfile(this.form).then((response) =>
      {

        const { status, message } = response;

        if (status === 422) { 
          this.errors = response?.result?.errors || {}
          // this.$vs.notification({
          //   color: 'danger',
          //   position: 'top-right',
          //   title: 'Artist Profile',
          //   text: `Invalid data`
          // })
        } else {

          // this.$vs.notification({
          //   color: 'success',
          //   position: 'top-right',
          //   title: 'Artist Profile',
          //   text: `${message}`
          // })

          this.$store.commit('SET_ARTIST', response.result?.artist_profile)
          this.$store.commit('SET_PROFILE', response.result?.user_profile)
          this.$store.commit('SET_MEMBERS', response.result?.members)
          this.$store.commit('SET_ARTIST_GENRES', response.result.artist_genres)

        }

      }).catch(err =>
      {
        // this.$vs.notification({
        //   color: 'danger',
        //   position: 'top-right',
        //   title: 'Server Status',
        //   text: `${err.message}`
        // })
      });

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
    updateSocial(val)
    {
      console.log('Update Social: ', val)
    },
    updateMember(val)
    {
      console.log('Update Member: ', val)
    }
  },
  computed: {
    ...mapGetters(["userInfo", "token", 'artistProfile', 'artistGenre']),
    ...mapState({
      artistTypes: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
      members: (state) => state.artist.members,
      account: (state) => state.account,
    }),
  }
}
</script>

<style>
@import '@/assets/css/artist-ui.css';
</style>