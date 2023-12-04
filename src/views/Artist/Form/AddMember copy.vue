<template>
  <div>
    <form @submit.prevent="submit" class="modal-add-member">
      
            <!-- see https://stackoverflow.com/questions/2855589/replace-input-type-file-by-an-image#answer-18803568 -->

            <!-- <div class="form-group text-center upload-img">
              <label class="label-img">
                <span class="material-symbols-outlined camera-inner" v-if="!avatar">&#xe412;</span>
                <img :src="avatar" class="img-fluid add-member-default-avatar" alt="default user avatar" v-else>
                <div class="camera">
                  <input type="file" @input="changeImage" class="member-avatar"
                    accept="image/png, image/webp, image/svg, image/jpeg" />
                </div>
                <span class="material-symbols-outlined camera-outer">&#xE412;</span>
              </label>
            </div>
            <div v-for="err in errors?.member_avatar" :key="err" class="text-danger">{{ err }}</div> -->

            <button type="button" class="btn" @click="testAvatarForm">Test</button>

            <!-- =========================================================================== -->

            <div
          class="upload-file-wrapper" 
          @dragover="handleDragOverCover"
          @dragleave="handleDragLeaveCover"
          @drop="handleDropCover"
          :class="{ 'drag-over': isDragOver }"
          >                   
          <input type="file" ref="bannerInput" style="display: none;" accept="image/*" @change="handleClick"/>
          <div class="text-center upload-file-content" v-if="uploadBox">
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
            <path d="M14.915 14.959C14.915 16.1895 14.502 17.2529 13.6055 18.1582C12.7002 19.0635 11.6367 19.4678 10.4062 19.4678C9.17578 19.4678 8.1123 19.0547 7.20703 18.1582C6.30176 17.2617 5.89746 16.1895 5.89746 14.959C5.89746 13.7285 6.31055 12.665 7.20703 11.7598C8.10352 10.8545 9.17578 10.4502 10.4062 10.4502C11.6367 10.4502 12.7002 10.8633 13.6055 11.7598C14.5107 12.665 14.915 13.7285 14.915 14.959ZM39.0146 23.9766V34.4707H5.89746V29.9619L13.4385 22.5L17.209 26.2705L29.2588 14.2207L39.0146 23.9766ZM41.2295 7.49707H3.69141C3.52441 7.49707 3.27832 7.57617 3.19922 7.74316C3.03223 7.91016 2.95312 8.06836 2.95312 8.23535V36.7559C2.95312 36.9229 3.03223 37.1689 3.19922 37.2481C3.36621 37.415 3.52441 37.4941 3.69141 37.4941H41.2295C41.3965 37.4941 41.6426 37.415 41.7217 37.2481C41.8887 37.0811 41.9678 36.9229 41.9678 36.7559V8.23535C41.9678 8.06836 41.8887 7.82227 41.7217 7.74316C41.6426 7.58496 41.4756 7.49707 41.2295 7.49707ZM45 8.23535V36.7559C45 37.8193 44.6748 38.6367 43.9365 39.375C43.1982 40.1133 42.293 40.4385 41.3174 40.4385H3.69141C2.62793 40.4385 1.81055 40.1133 1.07227 39.375C0.325195 38.6455 0 37.749 0 36.7647V8.23535C0 7.17188 0.325195 6.35449 1.06348 5.61621C1.80176 4.87793 2.70703 4.55273 3.68262 4.55273H41.2207C42.2842 4.55273 43.1016 4.87793 43.8398 5.61621C44.6748 6.2666 45 7.17188 45 8.23535Z" fill="#ABADC6"/>
            </svg>
              <h5 class="drag-files">Select a file or drag and drop here</h5>
              <p class="image-type">Upload images under 2MB.</p>
              <div class="select-files-wrapper">
                <label for="files" class="btn btn-info" @click="$refs.bannerInput.click()">Select file</label>      
              </div>

              <!-- <div class="form-group text-center upload-img">
              <label class="label-img">
                <span class="material-symbols-outlined camera-inner" v-if="!avatar">&#xe412;</span>
                <img :src="avatar" class="img-fluid add-member-default-avatar" alt="default user avatar" v-else>
                <div class="camera">
                  <input type="file" @input="changeImage" class="member-avatar"
                    accept="image/png, image/webp, image/svg, image/jpeg" />
                </div>
                <span class="material-symbols-outlined camera-outer">&#xE412;</span>
              </label>
            </div>
            <div v-for="err in errors?.member_avatar" :key="err" class="text-danger">{{ err }}</div> -->

            <img :src="avatar" class="img-fluid add-member-default-avatar" alt="default user avatar">
            </div>

            <div class="uploaded-image-wrapper" v-else>
              <div  v-if="showImage">
                
                <img ref="uploadedImage" class="uploaded-image" :src="avatar" alt="banner-modal" />
              </div>
              <example-wrapper
                class="manipulate-image-example" >

                <cropper
                  class="coordinates-cropper"
                  ref="cropper" 
                  :src="preview"
                  :stencil-size="fillArea"
                  :default-boundaries="boundaries"
                  :transitions="true"
                  :stencil-props="{
                    handlers: {},
                    movable: false,
                    scalable: false,
                    resizable: false,
		                aspectRatio: 1,
                  }"
                  @change="updateSize"
                 
                  :resize-image="{
                    adjustStencil: false
                  }"
                  image-restriction="stencil"
                  v-if="avatar"
                />
                <vertical-buttons>
                  <square-button title="Zoom In" @click="zoom(2)">
                    <!-- <img src="/assets/vue-cropper/zoom-in.svg" /> -->
                    <span class="material-symbols-rounded zoom-in">&#xe8ff;</span>
                  </square-button>
                <square-button title="Zoom Out" @click="zoom(0.5)">
                  <span class="material-symbols-rounded zoom-out">&#xe900;</span>
                    <!-- <img src="/assets/vue-cropper/zoom-out.svg" /> -->
                  </square-button>
              </vertical-buttons>

              <div class="size-info" v-if="size.width && size.height">
                <div>Width: {{ size.width }}px</div>
                <div>Height: {{ size.height }}px</div>
              </div>
            </example-wrapper>  

            <div class="d-flex align-items-center drag-mouse-wrap">
                <img src="/assets/vue-cropper/drag-icon.svg" class="drag-cursor" />
                <h4 class="mb-0 drag">Drag to reposition</h4>
            </div>

              <button class="remove-image" @click="removeBanner">
                <span class="material-symbols-outlined">&#xe5cd;</span> 
              </button>
          </div>
      </div> 

      <div>
        <button type="button" class="btn btn-lg upload-cover-photo" @click="getCropImage" v-if="preview">Set as profile picture</button>
            <button type="button" class="btn btn-lg upload-cover-photo" @click="getCropImage" v-else>
              <span v-if="isLoading">
                  <i class="busy-cover-photo"></i>
                  Setting as profile picture
                </span>
              <span v-else>Set as profile picture</span>
            </button>
      </div>

     <!-- =========================================================================== -->

       
            <div class="form-group">
              <label for="fileUpload">Name of the Member</label>
              <input type="text" v-model="form.member_name" placeholder="Name of the member"
                class="form-control member-name" required />
              <div v-for="err in error?.member_name" :key="err" class="member-name text-danger">{{ err }}</div>
            </div>
        
            <div class="form-group form-group-last">

              <label for="fileUpload">Role of Member</label>
              <select v-model="form.role" class="form-select" required>
                <option value="" selected> - Please Select Role - </option>
                <option v-for="member_role in roles" :key="member_role.id" :value="member_role.value">{{ member_role.label
                }}</option>
              </select>
              <br />

              <input type="text" v-model="other" placeholder="Role of Member" class="form-control member-name"
                v-if="form.role === 'others'" required />
              <div v-for="err in errors?.role" :key="err" class="text-danger">{{ err }}</div>
            </div>
      
          <div class="text-center">
            <button type="submit" class="btn btn-warning add-member">
              <span v-if="isLoading">
                <i class="busy-add-member"></i>Add Member
              </span>
              <span v-else>
                Add Member
              </span>
            </button>
          </div>
      
    </form>
  </div>
</template>
<script>
import Layout from '@/components/Layouts/ArtistLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";

import ExampleWrapper from '/src/components/Cropper/ExampleWrapper.vue';
import VerticalButtons from '/src/components/Cropper/VerticalButtons.vue';
import SquareButton from '/src/components/Cropper/SquareButton.vue';

import Compressor from 'compressorjs';   

export default {
  components: {
    layout: Layout,
    ExampleWrapper,
		VerticalButtons,
		SquareButton,
  },
  // ---------------------------------------------------- //
  props: {
    active: { 
      type: Boolean,
      default: false,
      required: true
    },
    image: {
			type: Object
		},
		coordinates: {
			type: Object,
		},
		transitions: {
			type: Object,
		},
		stencilCoordinates: {
			type: Object,
		},
    page: String,
  },
  // ---------------------------------------------------- //
  data() {
    return {
      // ---------------------------------------------------- //

      img: 'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=991&q=80',
      size: {
				width: null,
				height: null,
			},
      avatar: null, // null
      uploadBox: true,
      cropImage: null,
      isLoading: false,
      isDragOver: false,
      imageWidth: null,
      imageHeight: null,
      imageUrl: null,
      filename: null,
      preview: '',
      showImage: false,

      // ---------------------------------------------------- //

      form: {
        member_avatar: null,
        member_name: '',
        role: null,
      },
    //  avatar: '',
      other: '',
      errors: {},
      roles: [
        { id: '1', value: 'vocalist', label: 'Vocalist', },
        { id: '2', value: 'drummer', label: 'Drummer', },
        { id: '3', value: 'lead guitarist', label: 'Lead Guitarist' },
        { id: '4', value: 'rhythm guitarist', label: 'Rhythm Guitarist' },
        { id: '5', value: 'bassist', label: 'Bassist', },
        { id: '6', value: 'keyboardist', label: 'Keyboardist', },
        { id: '7', value: 'others', label: 'Others' },
      ],
      isLoading: false,
    }
  },
  setup() {

  },
  props: {
    error: {
      type: Array,
      default: [],
      required: true
    },
  },
  watch: {
    idx(val)
    {
      if (val > -1) {

        if (!(this.roles.filter(el => el.value.toLocaleLowerCase() === this.members[val].role?.toLocaleLowerCase()).length > 0)) {
          this.other = this.members[val]?.role || '';
        } else {
          this.other = '';
        }

        this.form = {
          member_avatar: this.members[val]?.avatar || '',
          member_name: this.members[val]?.member_name || '',
          role: this.roles.filter(el => el.value.toLocaleLowerCase() === this.members[val].role.toLocaleLowerCase()).length > 0 ? (this.members[val]?.role.toLowerCase() || '') : 'others',
        }

        this.avatar = this.members[val]?.avatar;

      }
    }
  },

  mounted()
  {

  // ---------------------------------------------------- //

    const myModal = document.getElementById('add-artist-details');

    // ---------------------------------------------------- //

    if (Object.keys(this.member).length > 0) {

      if (!(this.roles.filter(el => el.value.toLocaleLowerCase() === this.member.role.toLocaleLowerCase()).length > 0)) {
        this.other = this.member?.role || '';
      } else {
        this.other = '';
      }

      this.form = {
        member_avatar: this.member?.avatar || '',
        member_name: this.member?.member_name || '',
        role: this.roles.filter(el => el.value.toLocaleLowerCase() === this.member.role.toLocaleLowerCase()).length > 0 ? (this.member?.role.toLowerCase() || '') : 'others',
      };

      this.avatar = this.member?.avatar || '';

    } else {

      this.form = {
        member_avatar: '',
        member_name: '',
        role: '',
      };

      this.avatar = '';
      this.other = '';
    }

  },
  created() {
    
    if (Object.keys(this.member).length > 0) {

      if (!(this.roles.filter(el => el.value.toLocaleLowerCase() === this.member.role.toLocaleLowerCase()).length > 0)) {
        this.other = this.member?.role || '';
      } else {
        this.other = '';
      }

      this.form = {
        member_avatar: this.member?.avatar || '',
        member_name: this.member?.member_name || '',
        role: this.roles.filter(el => el.value.toLocaleLowerCase() === this.member.role.toLocaleLowerCase()).length > 0 ? (this.member?.role.toLowerCase() || '') : 'others',
      };

      this.avatar = this.member?.avatar || '';

    } else {

      this.form = {
        member_avatar: '',
        member_name: '',
        role: '',
      };

      this.other = '';
      this.avatar = '';
    }

  },
  methods: {
    ...mapActions([
      'addMember', 'fetchMember', 'updateMember',
    ]),

    // ---------------------------------------------------- //

    boundaries({ cropper, imageSize }) {
			return {
				width: cropper.clientWidth,
				height: cropper.clientHeight,
			};
		},
    updateSize({ coordinates }) {
			this.size.width = Math.round(coordinates.width);
			this.size.height = Math.round(coordinates.height);
		},
		zoom(factor) {
			this.$refs.cropper.zoom(factor);
		},
		
    fillArea({ boundaries }) {
      return {
        width: boundaries.width,
        height: boundaries.height,
      };
    },
    getCropImage(e)
    {
      const { coordinates, canvas, image } = this.generateImage = this.$refs.cropper.getResult();

      this.showImage = true;
      this.cropImage = canvas;
      //this.banner = canvas.toDataURL();
      this.preview = null;
      
      this.cropImage.toBlob(async blob =>
      {
        this.form.member_avatar = blob;

        const files =  this.form.member_avatar;
        if (files) {
           this.compressAndUploadImage(files);
          // this.form.member_avatar = this.compressAndUploadImage(files);
        } else {
          console.error('No image to upload.');
        }
        this.removeBanner();
        console.log(`Closing Banner`);

      });

    },
    handleDragOverCover(e)
    {
      console.log('Handle DragOver: ', e)
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy';
      this.isDragOver = true;
    },
    handleDragLeaveCover(e) {
      e.preventDefault();
      this.isDragOver = false; 
    },
    isImage(file)
    {
      return /\.(png|webp|svg|jpeg)$/.test(file.name)
    },
    handleDropCover(e)
    {
      e.stopPropagation()
      e.preventDefault()
      this.isDragOver = false;

      const files = e.dataTransfer.files
      if (files.length !== 1) {
        console.log('Handling Drop');
        return
      }

      const rawFile = files[0] // only use files[0]

      if (!this.isImage(rawFile)) {
        console.log('Not valid image');
        return false
      }
      this.handleCoverImage(files);
    },

    uploadCover()
    {
    },

    compressAndUploadImage(files) {

      const maxSizeBytes = 1024 * 1024; // 1 MB
      const mediumSizeBytes = 500 * 1024; // 500 KB
      const largeSizeBytes = 1500 * 1024; // 1.5 MB
      const skipCompressionSizeBytes = 100 * 1024; // 100 KB

      let quality;

      if (files.size < skipCompressionSizeBytes) {
        // If the file size is less than 100KB, skip compression
        quality = 1; // Set to 1 to keep original quality
      } else if (files.size < mediumSizeBytes) {
        quality = 0.8;
      } else if (files.size < maxSizeBytes) {
        quality = 0.2;
      } else if (files.size <= largeSizeBytes) {
        quality = 0.4;
      } else {
        quality = 0.2;
      }
      new Compressor(files, {
          quality: quality,
          success: (compressedFile) => {
            const formData = new FormData();
            formData.append('member_avatar', compressedFile);

            // Update the form's avatar property
            // Note: Use this.$set only if 'form' is a nested object and you need reactivity
            this.$set(this.form, 'member_avatar', compressedFile);

          // this.form.member_avatar = compressedFile;

            //this.submit(this.form, 'member_avatar', formData);

           // this.addMember(this.form, 'member_avatar', compressedFile);

            // Add your logic for cropping the image here
            console.log('Cropping image...');
            console.log('Avatar crop:', this.form.member_avatar);



            // Uncomment the following line if you have a 'submit' method
            // this.submit(formData, this.form);

            this.removeBanner();
            console.log('Closing Banner');

          },
          error(err) {
            console.error('Image compression failed:', err.message);
          },
          });

      },

      handleClick(e) {
        const files = e.target.files;
        this.handleCoverImage(files);
      },
    handleCoverImage(files){
      
      if(files){
        const rawFile = files[0];

          if (!rawFile) return;
          const { name } = rawFile;
          this.filename = name;
          this.form.member_avatar = rawFile;
          this.avatar = this.preview = URL.createObjectURL(rawFile);

        this.uploadBox = false;
        // check the image width and height
        const img = new Image();
        img.src = this.avatar;

        img.onload = () => {
          this.imageWidth = img.width;
          this.imageHeight = img.height;
          console.log(`Image Width: ${this.imageWidth} pixels`);
          console.log(`Image Height: ${this.imageHeight} pixels`);
          
        };

      
        this.compressAndUploadImage(files);
     
      }

    },
    removeBanner()
    {
      this.form.member_avatar = null;
      this.avatar = null;
      this.cropImage = null;
      this.$refs['bannerInput'].value = null;
      this.uploadBox = true;
      this.showImage = false;
    },

    // ---------------------------------------------------- //

    changeImage(event) {
      this.avatar = URL.createObjectURL(event.target.files[0]);
      this.form.member_avatar = event.target.files[0];
     // console.log('ChangeImage avatar: ', this.form.member_avatar);
      // this.compressAndUploadImage(files);


    },
    testAvatarForm(){
      console.log('ChangeImage avatar: ', this.form.member_avatar);
      console.log('Avatar: ', this.avatar);
      console.log('Member name: ', this.form.member_name);
    },
    submit() {
      // this.compressAndUploadImage(files);
      this.isLoading = true;

      if (typeof this.form.member_avatar === 'string') {
        this.form.member_avatar = '';
      } 

      if (Object.keys(this.member).length > 0) {

        var id = this.member.id;

        console.log('Edit Form: ', this.form);
        
        this.updateMember({
          memId: id, form: {
            member_avatar: this.form.member_avatar,
            member_name: this.form.member_name,
            role: this.form.role === 'others' ? this.other : this.form.role,
        } }).then((response) =>
        {
          console.log('Update Member: ', response);
          const { status } = response;
          if (status === 422) {
            this.errors = response?.result?.errors || {}
          } else {
            
            // this.$store.commit('SET_MEMBERS', response.result?.members)

            // this.form = {
            //   member_avatar: null,
            //   member_name: '',
            //   role: null,
            // }

            // this.other = '';
            // this.avatar = '';
            this.$store.commit('SET_MEMBER_INDEX', -1);
            this.$emit('modalClose')
            this.isLoading = false;
          }

        })
        .catch(err =>
        {
          console.log('Err: ', err)
        });

      } else {

        if (this.form.role === 'others') {
          this.form.role = this.other
        }
        // this.$emit('form', this.form);     
        this.addMember(this.form).then((response) =>
        {
          console.log('Add member response: ', response)
          const { status } = response;
          if (status === 422) {
            this.errors = response?.result?.errors || {}
          } else {
            this.$store.commit('SET_MEMBERS', response.result?.members)

            this.form = {
              member_avatar: null,
              member_name: '',
              role: null,
            }

            this.other = '';
            this.avatar = '';
                    
            this.$store.commit('SET_MEMBER_INDEX', -1);

            this.$emit('modalClose')
            this.isLoading = false;
          }

        })
          .catch(err =>
          {
            console.log('Err: ', err)
          });

      }

    },
  },
  computed: {
    ...mapGetters(["memberInfo", ]),
    ...mapState({
      artistTypes: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
      members: (state) => state.artist.members,
      member: state => state.artist.member,
      idx: state => state.artist.memIndex
    }),
  }
}
</script>
<style>
@import '@/assets/css/artist-ui.css';

/* ========================================== */

#uploadProfilePhoto .upload-file-wrapper .uploaded-image-wrapper{
  height: 32.25rem; 
}
.cropper {
  height: inherit!important;
  cursor: move;
}
.manipulate-image-example .coordinates-cropper {
  /* max-height: 500px; */
  background: black;
}
.manipulate-image-example .size-info {
  color: white;
  position: absolute;
  font-size: 10px;
  right: 10px;
  bottom: 10px;
  opacity: 0.5;
}
.circle-cropper {
  width: 100%;
  background: #222;
}
.circle-cropper__preview {
  border: solid 1px rgba(255, 255, 255, 0.15);
}

/* ========================================== */

</style>