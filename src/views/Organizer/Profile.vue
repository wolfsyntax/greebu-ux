<template>
  <div>
    <div>
      <section class="profile-details" id="organizer-profile">
        <div class="container">
          <div class="row profile-row">
            <div class="col-3"></div>
            <div class="col-6">
              <div class="back-wrapper">
                <router-link to="/dashboard" class="back"><span class="material-symbols-outlined">&#xef7d;</span>Go to Your Dashboard</router-link>
              </div>

              <h2 class="title">Welcome! Let's create your profile as an Event Organizer</h2>

              <p class="sub-heading">Crafting your Creative Identity</p>
              <h3 class="profile-details">Profile Details</h3>

              <div class="onboarding-message" v-if="message">
              <input type="checkbox" id="modal-toggle" class="modal-toggle" checked style="display: none;">
                <div class="modal">
                  <!-- <div class="close-toast">
                   <span class="material-symbols-rounded close-icon" @click="message = ''">&#xe5cd;</span>
                  </div> -->
                  <div class="modal-content">
                    <img src="/assets/artist-account/check-circle.svg" class="check-cirle" alt="check circle">
                    <h3 class="all-set">You're all set!</h3>
                    <p class="message">{{ message }}</p>
                      <label for="modal-toggle" class="close-modal-button" @click="$router.push('/dashboard')">View Profile</label>
                  </div>
                </div>
            </div> 
                        <!-- test compress img -->
                <!-- <div>

                  <input type="file" id="file" @change="onChange" accept="image/png, image/webp, image/svg, image/jpeg" />
                  <img v-if="compressedImageDataUrl" :src="compressedImageDataUrl"
                    style="width: 4rem; height: 4rem; border-radius: 100%"
                    alt="compressed Image">
                  <button class="btn" @click="upload()">Upload</button>

                  <button class="btn" @click="remove()">Remove</button>
                </div> -->

              <form @submit.prevent="submit" class="fill-details" autocomplete="off">
                <!-- Use for profile pic handler -->
                <!-- <avatar @uploader="uploadHandler" /> -->

                <!-- <img :src="parentImageURL" alt="Avatar Image" v-if="parentImageURL" /> -->
                <!-- <img :src="avatar" class="img-fluid" loading="lazy" alt="profile cover" > -->

                <div class="form-group upload-img">
                  <label class="label-img">

                    <img :src="avatar" class="img-fluid default-avatar" alt="default user avatar">

                    <div class="camera">

                      <!-- <input type="file" @input="changeImage" accept="image/png, image/webp, image/svg, image/jpeg" /> -->

                      <button type="button" class="btn btn-success" @click="toggleProfile" data-bs-toggle="modal" data-bs-target="#uploadProfilePhoto">
                        <span class="material-symbols-outlined">&#xE412;</span>
                      </button>

                      <div v-for="err in error?.avatar" :key="err" class="text-danger">{{ err }}</div>
                        <progress v-if="form.progress" :value="form.progress.percentage" max="100">{{ form.progress.percentage }}%</progress>
                      </div>

                      <span class="material-symbols-outlined camera-outer" >&#xE412;</span>
                  </label>

                  <label for="fileUpload" class="description">Upload profile picture</label>
                </div>

                <div v-for="err in error?.avatar" :key="err" class="text-danger">{{ err }}</div>


                <div class="required-fields">
                  <div class="form-group">
                    <label for="organizerName">Name of Organizer</label>
                    <input type="text" v-model="form.organizer_name" placeholder="Name of Organizer" class="form-control organizer-name" required autocomplete="off"/>
                    <div v-if="error?.organizer_name" class="organizer-name-error text-danger"></div>
                  </div>

                  <div class="form-group">
                    <label for="organizerName">Company Name</label>
                    <input type="text" v-model="form.company_name" placeholder="Company Name" class="form-control organizer-name" required autocomplete="off"/>
                    <div v-if="error?.company_name" class="organizer-name-error text-danger"></div>
                  </div>

                  <div class="form-group mb-0">
                    <label for="typeOfEvent">Type of Event</label>
                    <multiselect v-model="formEventTypes" mode="tags" :close-on-select="false" :create-option="true" 
                      :options="async function (query) {
                        return await fetchEventType(query) || eventTypes
                      }" 
                      :searchable="isSearchable" :delay="0" autocomplete="off"
                      ref="multiselect" :filter-results="false" @open="onOpenOption"
                      noOptionsText="Please input event type(s)"
                      class="genre" placeholder="Please select Event Type" 
                    />
                    
                    <br/>
                    
                    <div v-for="err in error?.event_types" :key="err" class="text-danger">{{ err }}</div>
                  </div>

                  <div class="row address">
                    <div class="col-4">
                      <div class="form-group">
                        <label for="address">Address</label>
                        <input type="text" v-model="form.street_address" placeholder="Street" class="form-control street" required @focus="onInputAddress" autocomplete="off"/>
                        <div v-for="err in error?.street_address" :key="err" class="text-danger">{{ err }}</div>
                      </div>
                    </div>

                    <div class="col-4">
                      <div class="form-group">
                        <label for="address" class="hidden">City</label>
                        <input type="text" v-model="form.city" placeholder="City" class="form-control city" @focus="onInputAddress" required autocomplete="off"/>
                        <div v-for="err in error?.city" :key="err" class="text-danger">{{ err }}</div>
                      </div>
                    </div>

                    <div class="col-4">
                      <div class="form-group">
                        <label for="address" class="hidden">Province</label>
                        <input type="text" v-model="form.province" placeholder="Province" class="form-control province" @focus="onInputAddress" required autocomplete="off"/>
                        <div v-for="err in error?.province" :key="err" class="text-danger">{{ err }}</div>
                      </div>
                    </div>
                  </div> <!-- end of row -->
                </div> <!-- end of required-fields class -->

                <!-- Organizer Staff -->
                <div class="band-and-social">                           
                  <div class="form-group">
                    <label for="members">Members of Organizers</label><br>
                    <button type="button" class="btn btn-primary add-member" @click="toggle('organizerStaff')"><span class="material-symbols-rounded">add_box</span>Add Member</button>
                  </div>    

                  <div class="col">
                    <div class="row">
                      <div class="col-12">
                        <ul class="list-group band-members" v-if="members">
                          <transition-group name="fade" tag="div">
                            <li class="list-group-item" v-for="(mem, index) in members" :key="mem.id">
                              <div class="items">
                                <img @error="replaceByDefault" class="avatar" :src="mem.avatar" alt="" />      

                                <div class="member-info">
                                  <h6 class="band-name">{{ mem.member_name }}</h6>
                                  <p class="band-role">{{ mem.role }}</p>
                                </div>
                              </div>

                              <div class="options"> 
                                <div class="d-flex align-items-center text-end">
                                  <button type="button" class="edit-band-member-wrapper" @click="editMember(index)" >
                                    <img src="/assets/artist-account/edit-band-member.svg" class="edit-band-member" alt="edit band member" >
                                  </button>
                                  <button type="button" @click="removeStaff(mem.id)" class="delete-band-member-wrapper">
                                    <img src="/assets/artist-account/delete-band-member.svg" class="delete-band-member" alt="delete band member">
                                  </button>
                                </div>
                              </div>
                            </li>
                          </transition-group>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Social Media Links -->
                  <div class="form-group">
                    <label for="social-media">Social Media Accounts</label><br>  
                    <button type="button" class="btn btn-primary add-social-media" @click="social = { text: '', key: '' }; toggle('organizerLinks')"><span class="material-symbols-rounded">add_link</span>Add Links</button>
                  </div>

                  <transition name="fade" mode="out-in"> 
                    <div class="card mb-3 social-media-account-row" v-if="form.facebook" style="height: 90px;">
                      <div class="row g-0">
                        <div class="col-md-1">
                          <img src="/assets/social icons/_Facebook.svg" class="img-fluid rounded-start mx-2" alt="Facebook">
                        </div>

                        <div class="col-md-10">
                          <div class="card-body">
                            <h5 class="card-title">Facebook</h5>
                            <p class="card-text"><small class="text-body-secondary">{{ form.facebook }}</small></p>
                          </div>
                        </div>

                        <div class="col-md-1">
                          <div class="d-flex align-items-center text-end">
                            <button type="button" class="social-media-account-wrapper" @click="toggle('organizerLinks', true, { key: 'facebook', text: form.facebook })">
                              <img src="/assets/artist-account/edit-band-member.svg" class="social-media-account" alt="edit social media account" />
                            </button>

                            <button type="button" @click="removeSocialMedia('facebook')" class="social-media-account-wrapper">
                              <img src="/assets/artist-account/delete-band-member.svg" class="social-media-account" alt="delete social media account">
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>

                  <transition name="fade" mode="out-in">                
                    <div class="card mb-3 social-media-account-row" v-if="form?.instagram">
                      <div class="row g-0">
                        <div class="col-md-1">
                          <img src="/assets/social icons/_Instagram.svg" class="img-fluid rounded-start mx-2" alt="Instagram">
                        </div>

                        <div class="col-md-10">
                          <div class="card-body">
                            <h5 class="card-title">Instagram</h5>
                            <p class="card-text"><small class="text-body-secondary">{{ form?.instagram }}</small></p>
                          </div>
                        </div>

                        <div class="col-md-1">
                          <div class="d-flex align-items-center text-end">
                            <button type="button" class="social-media-account-wrapper" @click="toggle('organizerLinks', true, { key: 'instagram', text: form.instagram })">
                              <img src="/assets/artist-account/edit-band-member.svg" class="social-media-account" alt="edit social media account" >
                            </button>

                            <button type="button" @click="removeSocialMedia('instagram')" class="social-media-account-wrapper">
                              <img src="/assets/artist-account/delete-band-member.svg" class="social-media-account" alt="delete social media account">
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                  
                  <transition name="fade" mode="out-in">                
                    <div class="card mb-3 social-media-account-row" v-if="form?.threads">
                      <div class="row g-0">
                        <div class="col-md-1">
                          <img src="/assets/social icons/_Threads.svg" class="img-fluid rounded-start mx-2" alt="Threads">
                        </div>

                        <div class="col-md-10">
                          <div class="card-body">
                            <h5 class="card-title">Threads</h5>
                            <p class="card-text"><small class="text-body-secondary">{{ form?.threads }}</small></p>
                          </div>
                        </div>

                        <div class="col-md-1">
                          <div class="d-flex align-items-center text-end">
                            <button type="button" class="social-media-account-wrapper" @click="toggle('organizerLinks', true, { key: 'instagram', text: form.instagram })">
                              <img src="/assets/artist-account/edit-band-member.svg" class="social-media-account" alt="edit social media account" >
                            </button>

                            <button type="button" @click="removeSocialMedia('instagram')" class="social-media-account-wrapper">
                              <img src="/assets/artist-account/delete-band-member.svg" class="social-media-account" alt="delete social media account">
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>

                  <transition name="fade" mode="out-in">
                    <div class="card mb-3 social-media-account-row" v-if="form.twitter" style="height: 90px;">
                      <div class="row g-0">
                        <div class="col-md-1">
                          <img src="/assets/social icons/_X.svg" class="img-fluid rounded-start mx-2" alt="X">
                        </div>

                        <div class="col-md-10">
                          <div class="card-body">
                            <h5 class="card-title">X</h5>
                            <p class="card-text"><small class="text-body-secondary">{{ form.twitter }}</small></p>
                          </div>
                        </div>

                        <div class="col-md-1">
                          <div class="d-flex align-items-center text-end">
                            <button type="button" class="social-media-account-wrapper" @click="toggle('organizerLinks', true, { key: 'twitter', text: form.twitter })">
                              <img src="/assets/artist-account/edit-band-member.svg" class="social-media-account" alt="edit social media account" >
                            </button>
                            <button type="button" @click="removeSocialMedia('twitter')" class="social-media-account-wrapper">
                              <img src="/assets/artist-account/delete-band-member.svg" class="social-media-account" alt="delete social media account">
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>   <!-- end of band-and-social--> 

                <div class="d-flex justify-content-between group-item accept-events">
                  <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to accept proposal from artist?</label>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" v-model="form.accept_proposal" id="flexSwitchCheckDefault">
                  </div>
                </div>

                <div class="d-flex justify-content-between group-item">
                  <label class="form-check-label" for="flexSwitchCheckDefault">Do you want to send proposal to artist?</label>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" v-model="form.send_proposal" id="flexSwitchCheckDefault">
                  </div>
                </div>


                <!-- About artist - Textarea -->
                <div class="form-group form-about-artist">
                  <label for="about-artist">Description</label><br>  
                  <textarea v-model="form.bio" maxlength="500" class="form-control about-artist" 
                    placeholder="">
                  </textarea>

                  <p v-show="form.bio" class="char-count">Maximum 500 characters ({{ remainingChars }} left)</p>
                  <div v-for="err in error?.bio" :key="err" class="text-danger">{{ err }}</div>
                </div>

                <div class="text-center">
                  
                  <button type="submit" class="btn btn-success submit-form" v-if="showSubmitButton">
                    Submit
                  </button> 
                  <button type="button" class="btn btn-success disabled submit-form" v-else>
                    <LoadingIndicator />
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

    <profile-modal 
    @close="toggleProfile"
    @formDataUpdated="handleOrganizerAvatarUpdate"
    page="page1"
     />

    <social-media id="organizerLinks" @form="updateSocial" :media="social" @modalClose="dismiss" />
    <staff-form id="organizerStaff" @form="onStaffSave" @modalClose="dismiss" />


    <!-- <p><b>Account</b> - {{  account }}</p> -->
    <SuccesModal/>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { Modal } from 'bootstrap';
import Compressor from 'compressorjs';
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import SocialMedia from "./Forms/SocialMedia.vue";
import StaffForm from './Forms/StaffForm.vue';
import Avatar from '/src/components/Cropper/Avatar.vue';
import ProfileModal from '/src/components/Dashboard/Modals/ProfileModal.vue';
import LoadingIndicator from "/src/components/LoadingIndicator.vue";
import SuccesModal from "/src/components/SuccessModal.vue";

export default {
  setup()
  {

  },
  components: {
    StaffForm, 
    SocialMedia,
    Multiselect,
    Avatar,
    ProfileModal,
    LoadingIndicator,
    SuccesModal
  },
  data: () => ({
    // form: {
    //   avatar: '',
    //   organizer_name: '',
    //   progress: null,
    //   event_types: [],
    //   street_address: '',
    //   city: '',
    //   province: '',
    //   bio: '',
    //   facebook: '',
    //   twitter: '',
    //   instagram: '',
    //   threads: '',
    //   accept_proposal: false,
    //   send_proposal: false,
    // },
    showSubmitButton: true,
    avatar: null, // null  // /assets/artist-account/new.svg
    isSearchable: true,
    social: {
      text: null,
      key: null,
    },
    formEventTypes: [],
    validImage: false,
    imageMagic: '',
    avatarMagic: '',
    tempMagic: '',
    targetMagic: '',
    triggerType: '',

    file: null,
    compressedImageDataUrl: null,
    parentAvatar: '',
   // bannerImage: '/assets/organizer-account/default-cover-photo.webp',
  }),
  props: {
    hasNoError: {
      type: Boolean,
      default: false,
      required: true
    },
    error: {
      type: Object,
      default: {},
      required: true
    },
    message: {
      type: String,
      default: '',
      required: false,
    }
  },
  mounted()
  {

    const success = (position) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log('My Geo-Location: ', latitude, longitude);
      // Do something with the position
    };

    const error = (err) => {
      console.log('On Error Geo-Location', error)
    };

    if (navigator.geolocation) {
      // This will open permission popup
      navigator.geolocation.getCurrentPosition(success, error);
    }
    
    this.triggerType = '';
    if (this.userRole === 'organizer') {
      console.log('User role: ', this.userRole)
      this.fetchOrganizerOptions()
        .then(res =>
        {
          console.log('Fetch Organizer Options: ', res);
        });
    }
    // this.form.avatar = '';

    this.fetchProfile();
    console.log('My Account Info: ', this.account)
    // this.form = this.myAccount;

    this.SET_STAFF_FILTER();

    this.avatar = this.myAvatar || '/assets/artist-account/new.svg';
    this.avatarMagic = this.avatar;

    this.formEventTypes = this.myAccount?.event_types || [];

    // this.bannerImage = this.profile.cover_photo || this.account?.cover_photo || '/assets/organizer-account/default-cover-photo.webp';

    this.avatar = this.form.avatar || this.account?.avatar || '/assets/artist-account/new.svg';

  },
  methods: {
    ...mapActions([
      'fetchOrganizerOptions', 'fetchProfile', 'removeStaff',
    ]),
    ...mapMutations(['SET_STAFF_FILTER']),
    uploadHandler(content) {
      console.log('Avatar Uploader: ', content);
    },
    handleOrganizerAvatarUpdate(blob) {
      if (blob instanceof Blob) {
        this.parentAvatar = URL.createObjectURL(blob);
        this.avatar = this.parentAvatar;
        console.log('Organizer set image', this.avatar);
      } else {
         this.avatar = '';
      }
    },
    replaceByDefault(e) 
    {
      e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&usqp=CAU';
    },
    dismiss(trigger)
    {
      if (trigger === 'social') {
        this.social.key = '';
        this.social.text = '';
      }
    },
    onStaffSave(staff)
    {
      console.log('\n\non save staff\n');
      this.SET_STAFF_FILTER();

      new Modal(document.getElementById('profileSuccessModal'), {
        keyboard: false,
        backdrop: 'static',
      }).show();
    },
    editMember(index = -1)
    {

      this.SET_STAFF_FILTER(index);

      new Modal(document.getElementById('organizerStaff'), {
        keyboard: false,
        backdrop: 'static',
      }).show();
      
    },
    updateSocial(key, val)
    {

      val = val.replace('https://www.', '');
      val = val.replace('https://', '');
      val = val.replace('www.', '');

      val = `https://www.${val}`;

      switch (key) {
        case 'facebook':
          this.form.facebook = val;

          this.social.key = key;
          this.social.text = val;

          break;
        case 'instagram':
          this.form.instagram = val;

          this.social.key = key;
          this.social.text = val;

          break;
        case 'twitter':
          this.form.twitter = val;

          this.social.key = key;
          this.social.text = val;

          break;
        case 'threads':
          this.form.threads = val;

          this.social.key = key;
          this.social.text = val;

          break;
        default:

          this.social.key = '';
          this.social.text = '';
          break;
      }

    },
    onInputAddress()
    {
      
    },
    onOpenOption()
    {

    },
    fetchEventType(query)
    {
      if (!query) {
        console.log('fetchEventType-fetchOrganizerOptions: ', this.eventTypes)
        this.fetchOrganizerOptions();
      }

      return this.eventTypes;
    },
    handleFiles(file)
    {

    },
    removeSocialMedia(key)
    {

      if (key === 'facebook') this.form.facebook = '';
      if (key === 'twitter') this.form.twitter = '';
      if (key === 'instagram') this.form.instagram = '';
      if (key === 'threads') this.form.threads = '';

    },
    toggle(id = 'organizerLinks', flag = false, options = {key: '', text: ''})
    {
      new Modal(document.getElementById(id), {
        keyboard: false,
        backdrop: 'static',
      }).show();

      this.triggerType = 'staff';

      if (id === 'organizerLinks' && flag === true)
      {
        this.triggerType = 'media';
        this.social = options
      }
    },
    submit()
    {
      this.showSubmitButton = false;
      this.form.event_types = this.formEventTypes;

      if (typeof this.form.avatar === 'string') this.form.avatar = '';
      
      this.$emit('form', this.form)

      if (this.hasNoError) { 
        this.fetchProfile().then(res =>
        {
          const { status: statusCode, data: { result: { event_types } } } = res

          if (statusCode === 200) {
            this.form.event_types = event_types
          }

          this.showSubmitButton = true;

        });
      }
    },
    fileCheck(file)
    {
      // magicAudio
      var fileReader = new FileReader();
      var self = this;
      this.tempMagic = '';

      fileReader.readAsArrayBuffer(file);
      fileReader.onloadend = function (e)
      {

        var arr = (new Uint8Array(e.target.result)).subarray(0, 4);

        var header = "";
        for (var i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }

        self.tempMagic = header;
      };

    },
    changeImage(e) {
      const file = e.target.files[0];

      new Compressor(file, { 
        quality: 0.2, // Compression ratio 83.90%
        success: (result) => {
          const compressedFile = new File([result], result.name, {
            type: result.type,
          });
         this.targetMagic = 'image';
         this.avatarMagic = file;
          if (file) {
            this.fileCheck(file);
          }
        },
      });
    },

//     onChange(e) {
//   this.file = e.target.files[0];
//   console.log('file', this.file);

//   console.log('original file: ', this.file);

//   new Compressor(this.file, {
//     quality: 0.2, // Compression ratio 83.90%
//     success(result) {
//       const compressedFile = new File([result], result.name, {
//         type: result.type,
//       });

//       // Convert the compressed image to a data URL
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.compressedImageDataUrl = reader.result;
//         console.log('compressed image: ', this.compressedImageDataUrl);

//         const img = new Image();
//         img.onload = () => {
//           console.log('Image is loaded successfully.');
//         };
//         img.onerror = (error) => {
//           console.error('Error loading image:', error);
//         };
//         img.src = this.compressedImageDataUrl;
//       };
//       reader.readAsDataURL(compressedFile);
//     },
//     error(err) {
//       console.error('Compression error:', err.message);
//     },
//   });
// },


    upload(){

      // console.log('original file: ', this.file);

      // if(this.isLt2MB(this.file)){
      //   this.uploadWithoutCompressing(this.file);
      //   return;
      // }
      // new Compressor(this.file, {
      //   quality: 0.2, //Compression ratio 83.90%
      //   success(result){
      //     const myFile = new File([result], result.name, {
      //       type: result.type
      //     })
      //     console.log('compressed: ', myFile);

      //     let fd = new FormData();
      //     fd.append('file', myFile)
      //   }
      // })
    },
    // remove(){

    // },
    // uploadWithoutCompressing(file){
    //   console.log('original: ', file);
    // },
    // isLt2MB(file){
    //   return file.size / 1024 / 1024 < 2; // if less than 2mb
    // }

  },
  computed: {
    ...mapGetters(['profileForm', 'myAccount', 'myAvatar', 'userRole',]),
    ...mapState({
      account: state => state.account,
      eventTypes: state => state.organizer.eventTypes,
      memberIndex: state => state.organizer.staffIndex,
      members: state => state.organizer.staff,
      form: state => state.organizer.form,
    }),
    remainingChars()
    {
      return 500 - (this.form.bio ? this.form.bio.length : 0);
    },
    checkImage()
    {
      var flagImage = true;

      if (!this.validImage && this.imageMagic !== '') {
        return false;
      }

      if (typeof this.form.avatar === 'string') {
        return true;
      }

      if (typeof this.form.avatar === 'object') {
        flagImage = this.validImage
      }

      return this.validImage && flagImage;
    },
  },
  watch: {

    account(val)
    {

      this.form = val;
      // this.form.avatar = '';

      // this.avatar = this.account?.avatar || this.profile?.avatar || '/assets/artist-account/new.svg';
      //this.handleFormDataUpdate = this.account?.avatar || this.profile?.avatar || null;

      this.avatar = this.account?.avatar || this.profile?.avatar || '/assets/artist-account/new.svg';
      this.formEventTypes = val.event_types || [];

    },
    tempMagic(val)
    {
      console.log('Magic Mime: ', val);

      if (this.targetMagic === 'image' && val !== '') {
        this.imageMagic = val;

        switch (val) {
          case '89504e47': // png
          case 'ffd8ffe0': // jpg, jpeg, jps, jiff
          case '52494646': // webp
          case '3c737667': // svg
            this.validImage = true;
             this.avatar = URL.createObjectURL(this.avatarMagic);
            //this.handleFormDataUpdate = URL.createObjectURL(this.avatarMagic);
            this.form.avatar = this.avatarMagic;
            
            break;
          default:

            // this.form.avatar = this.account?.avatar || this.profile?.avatar || '';
            // this.avatar = this.account?.avatar || this.profile?.avatar || '/assets/artist-account/new.svg';
            console.log('Rejected Image: ', this.account, this.avatar, this.form.avatar);
            this.validImage = false;
            break;
        }

      }
    },
    profile: {
      handler(res)
      {
        this.avatar = res?.avatar || this.account.avatar || '/assets/artist-account/new.svg';
      },
      deep: true,
    },
  }
}
</script>
