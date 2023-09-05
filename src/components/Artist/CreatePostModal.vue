<template>
    <div>
                
                                                         <!-- Modal -->
    <div class="modal fade " id="artistPost"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" 
      data-bs-backdrop="static" data-bs-keyboard="false">
                    <div class="modal-dialog modal-lg" >                   
                        <div class="modal-content" v-if="selectedItem === null || selectedItem === 'photo' || selectedItem === 'music'">
                        <div class="modal-header">
                          <h2 class="modal-title" id="artistPostLabel">Create Post</h2>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div class="d-flex align-items-center artist-image">
                            <img src="https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg" alt="profile">
                            <h3 class="band-name">Idlepitch</h3>
                          </div>

                          <form @submit.prevent="submitForm">
                            <div class="form-group"> 
                            
                              <textarea class="form-control" v-model="formData.message" placeholder="Write something..."></textarea>
                            </div>
                                                            <!-- PHOTO/VIDEO SELECTED -->
                                                         
                             <div v-if="selectedItem === 'photo'" class="upload-file-wrapper">
                                <div v-if="selectFile" class="text-center upload-file-content">
                                 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                                    <path d="M14.915 14.959C14.915 16.1895 14.502 17.2529 13.6055 18.1582C12.7002 19.0635 11.6367 19.4678 10.4062 19.4678C9.17578 19.4678 8.1123 19.0547 7.20703 18.1582C6.30176 17.2617 5.89746 16.1895 5.89746 14.959C5.89746 13.7285 6.31055 12.665 7.20703 11.7598C8.10352 10.8545 9.17578 10.4502 10.4062 10.4502C11.6367 10.4502 12.7002 10.8633 13.6055 11.7598C14.5107 12.665 14.915 13.7285 14.915 14.959ZM39.0146 23.9766V34.4707H5.89746V29.9619L13.4385 22.5L17.209 26.2705L29.2588 14.2207L39.0146 23.9766ZM41.2295 7.49707H3.69141C3.52441 7.49707 3.27832 7.57617 3.19922 7.74316C3.03223 7.91016 2.95312 8.06836 2.95312 8.23535V36.7559C2.95312 36.9229 3.03223 37.1689 3.19922 37.2481C3.36621 37.415 3.52441 37.4941 3.69141 37.4941H41.2295C41.3965 37.4941 41.6426 37.415 41.7217 37.2481C41.8887 37.0811 41.9678 36.9229 41.9678 36.7559V8.23535C41.9678 8.06836 41.8887 7.82227 41.7217 7.74316C41.6426 7.58496 41.4756 7.49707 41.2295 7.49707ZM45 8.23535V36.7559C45 37.8193 44.6748 38.6367 43.9365 39.375C43.1982 40.1133 42.293 40.4385 41.3174 40.4385H3.69141C2.62793 40.4385 1.81055 40.1133 1.07227 39.375C0.325195 38.6455 0 37.749 0 36.7647V8.23535C0 7.17188 0.325195 6.35449 1.06348 5.61621C1.80176 4.87793 2.70703 4.55273 3.68262 4.55273H41.2207C42.2842 4.55273 43.1016 4.87793 43.8398 5.61621C44.6748 6.2666 45 7.17188 45 8.23535Z" fill="#ABADC6"/>
                                    </svg>
                                    <h3 class="title">Select a file or drag and drop here</h3>
                                    <p class="limit">JPG, PNG file size no more than 10MB</p>
                                    <div class="upload-wrapper">
                                        <label for="fileInput" class="btn btn-info" @click="uploadFiles">SELECT FILE</label>
                                        <!-- <input type="file" id="inputField" style="display:none"> -->
                                        <input type="file" id="fileInput" ref="fileInput" @change="handleFileUpload" 
                                        style="display: none" accept="image/*,video/*" class="file-input" multiple>
                                    </div>
                                </div>
                                <div v-else class="uploaded-wrapper">
                                                                            <!-- Uploaded images -->

                                        <div class="row">
                                          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

                                          <div class="col-6 uploaded-images" v-for="(file, index) in displayedFiles" :key="index">

                                            <!-- <div v-if="index !== 2">
                                               <img :src="file.name" alt="Uploaded Image">  
                                                <div>
                                                <video v-if="image.uploadedVideo" controls width="400">
                                                <source :src="image.uploadedVideoUrl" type="video/mp4">
                                                Your browser does not support the video tag.
                                              </video>
                                              </div> 
                                            
                                            <span class="material-symbols-outlined remove-img" @click="removeImage(index)">&#xe5cd;</span> 
                                            </div> -->
                                            <div v-if="index !== 2">
                                              <template v-if="file.type.startsWith('video/')">
                                                <video controls width="400">
                                                  <source :src="file.url" type="video/mp4">
                                                  Your browser does not support the video tag.
                                                </video>
                                                <span class="material-symbols-outlined remove-img" @click="removeFile(index)">&#xe5cd;</span>
                                            </template>
                                            <template v-else-if="file.type.startsWith('image/')">
                                              <img :src="file.url" alt="Uploaded Image">
                                              <span class="material-symbols-outlined remove-img" @click="removeFile(index)">&#xe5cd;</span> 
                                            </template>
                                            </div>
                                               
                                            <div v-else class="image-container">
                                               <!-- <img :src="image" alt="total number of images"> 
                                              
                                              <span class="material-symbols-outlined remove-img" @click="removeImage(index)">&#xe5cd;</span> 
                                              <span v-if="additionalFilesCount > 0"  class="image-count">+{{ additionalFilesCount }}</span> -->
                                              <template v-if="file.type.startsWith('video/')">
                                                <video controls width="400">
                                                  <source :src="file.url" type="video/mp4">
                                                  Your browser does not support the video tag.
                                                </video>
                                                <span class="material-symbols-outlined remove-img" @click="removeFile(index)">&#xe5cd;</span>
                                                <span v-if="additionalFilesCount > 0"  class="image-count">+{{ additionalFilesCount }}</span> 
                                            </template>
                                            <template v-else-if="file.type.startsWith('image/')">
                                              <img :src="file.url" alt="Uploaded Image">
                                              <span class="material-symbols-outlined remove-img" @click="removeFile(index)">&#xe5cd;</span> 
                                              <span v-if="additionalFilesCount > 0"  class="image-count">+{{ additionalFilesCount }}</span> 
                                            </template>

                                            </div>

                                          </div>

                         

                                            <!-- Display the uploaded videos and images -->
                                            <!-- <div class="col-6 uploaded-images" v-if="uploadedFiles.length > 0">
                                              <div v-for="(file, index) in displayedFiles" :key="index">
                                                <template v-if="file.type.startsWith('video/')">
                                                  <video controls width="400">
                                                    <source :src="file.url" type="video/mp4">
                                                    Your browser does not support the video tag.
                                                  </video>
                                                </template>
                                                <template v-else-if="file.type.startsWith('image/')">
                                                  <img :src="file.url" alt="Uploaded Image">
                                                </template>
                                              </div>
                                            </div> -->

                                          



                                          <div class="col-6 text-center uploaded-images">
                                            <div class="upload-more" @click="uploadImage">
                                              <span class="material-symbols-outlined add-photo-icon">&#xe43e;</span>
                                              <h3 class="add-more">Add more photos/videos</h3> 
                                              <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none" accept="image/*,video/*" multiple>
                                            </div>
                                          </div>

                                        </div>
                                        <!-- <button @click="removeAllImages">Remove All Images</button> -->
                                  </div>
                             </div>

                                                             <!-- MUSIC SELECTED -->
                                         
                            <div v-if="selectedItem === 'music'" class="upload-file-wrapper">
                                <div class="text-center upload-file-content">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="59" viewBox="0 0 45 59" fill="none"><g clip-path="url(#clip0_3478_73591)">
                                        <path d="M12.6421 14.5686V42.8936C11.3772 42.2708 9.972 41.9989 8.56965 42.1056C6.99351 42.21 5.4819 42.7793 4.22095 43.7432C2.96001 44.7072 2.00479 46.0238 1.47291 47.5309C0.941039 49.038 0.855731 50.6698 1.22749 52.2255C1.59926 53.7811 2.41186 55.1926 3.56524 56.2862C4.71862 57.3797 6.16243 58.1076 7.71887 58.3801C9.27531 58.6527 10.8764 58.458 12.3251 57.8201C13.7737 57.1822 15.0067 56.1289 15.872 54.79C16.7374 53.451 17.1975 51.8847 17.1956 50.2841V24.3976C17.2031 24.1056 17.2947 23.8222 17.4591 23.5822C17.6235 23.3423 17.8535 23.1562 18.1209 23.047L38.1876 15.2436C38.3246 15.1845 38.4741 15.1616 38.6222 15.1772C38.7703 15.1927 38.9121 15.2461 39.0342 15.3324C39.1564 15.4187 39.2549 15.535 39.3205 15.6704C39.3861 15.8059 39.4167 15.956 39.4094 16.1067V32.8392C38.1457 32.213 36.7395 31.941 35.337 32.0513C33.246 32.1981 31.2926 33.1606 29.8874 34.7366C28.4821 36.3125 27.7345 38.3791 27.8016 40.502C27.8687 42.625 28.7454 44.6388 30.2473 46.1204C31.7492 47.6019 33.7594 48.4358 35.8554 48.4467C38.0347 48.4251 40.1165 47.5279 41.6436 45.9521C43.1706 44.3763 44.018 42.2507 43.9997 40.0422V3.57598C44.0005 3.08136 43.8835 2.59385 43.6584 2.15494C43.4334 1.71602 43.107 1.3387 42.7071 1.05505C42.3073 0.771414 41.8457 0.589858 41.3617 0.525834C40.8777 0.46181 40.3856 0.517212 39.9273 0.687328L15.5668 10.2542C14.7077 10.5919 13.969 11.1843 13.4473 11.9539C12.9255 12.7236 12.6449 13.6348 12.6421 14.5686Z" fill="#ABADC6"/>
                                    </g><defs><clipPath id="clip0_3478_73591"><rect width="45" height="58" fill="white" transform="translate(0 0.5)"/></clipPath></defs></svg>
                                    <h3 class="title">Select a file or drag and drop here</h3>
                                    <p class="limit">MP3 file size no more than 10MB</p>
                                    <div class="upload-wrapper">
                                      <label for="files" class="btn btn-info">SELECT FILE</label>
                                        <input type="file" 
                                        class="upload-music"
                                        id="files" 
                                        style="display:none;"
                                        ref="musicInput" 
                                        @change="handleMusicUpload" 
                                        accept="audio/*" />
                                    </div>
                                </div>
                             </div>
                                                        <!-- Uploaded music -->
                             <div v-if="uploadedMusic" class="uploaded-song-wrapper">
                                    
                                      <audio controls class="audio-controls-wrapper">
                                        <source :src="uploadedMusic" type="audio/mpeg">
                                        Your browser does not support the audio element.
                                      </audio>
                                      <div class="d-flex align-items-center song-wrapper">
                                        <div>
                                          <img src="/assets/artist-account/mp3-icon.svg" alt="Music icon">
                                        </div>
                                        <div>
                                          <h5 class="song-title">{{ songTitle }}</h5>
                                          <p class="preview">Preview</p>
                                        </div>
                                      </div>
                                      <div class="d-flex align-items-center remove-music-wrapper">
                                        <span class="badge file-size">{{ fileSize }} KB</span>
                                        <span class="material-symbols-outlined remove-music" @click="removeMusic">&#xe5cd;</span>
                                      </div>  
                                   
                                </div>

                            <h3 class="add-post">Add to your post</h3>
                            <div class="d-flex align-items-center manage-to-post">

                              <div class="d-flex align-items-center feeling">
                                <button type="button" class="btn d-flex align-items-center" @click="toggleContent('feeling')">
                                  <span :class="{ 'material-symbols-rounded post-icon': true, 'selected': selectedItem === 'feeling' }">&#xe813;</span>
                                  <span :class="{ 'selected': selectedItem === 'feeling' }">Feeling</span>
                                </button>
                              </div>

                              <div class="d-flex align-items-center photo-video">
                                <button type="button" class="btn d-flex align-items-center" @click="toggleContent('photo')">
                                  <span :class="{ 'material-symbols-rounded post-icon': true, 'selected': selectedItem === 'photo' }">&#xe3f4;</span>
                                  <span :class="{ 'selected': selectedItem === 'photo' }">Photo/Video</span>
                                </button>
                              </div>

                              <div class="d-flex align-items-center music">
                                <button type="button" class="btn d-flex align-items-center" @click="toggleContent('music')">
                                <span :class="{ 'material-symbols-rounded post-icon': true, 'selected': selectedItem === 'music' }">&#xe030;</span>
                                <span :class="{ 'selected': selectedItem === 'music' }">Music</span>
                              </button>
                              </div>                            
                            </div>

                            <div class="text-center button-wrapper">
                              <button type="submit" class="btn" data-bs-dismiss="modal">
                                <span v-if="isLoading">
                              <i class="busy-submitting-post"></i>Post</span>
                              <span v-else>Post</span>
                              </button>
                            </div>

                          </form>

                        </div> <!-- end of modal-body-->
                      </div> <!-- end of modal content -->

                                                                  <!-- FEELING IS SELECTED -->

                      <div class="modal-content" v-else-if="selectedItem === 'feeling'">
                        <div class="modal-header">
                          <h2 class="modal-title" id="artistPostLabel">
                            <span class="material-symbols-rounded back-to-post" @click="toggleContent('feeling')">arrow_back</span>Feelings</h2>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal()"></button>
                        </div>
                        <div class="modal-body">

                          <div class="search-container">
                          <input type="text" class="search-input" placeholder="Search emoji">
                          <span class="material-symbols-rounded">Search</span>
                        </div>

                        <div class="d-flex align-items-center icons-list">
                          <div class="left-icon">
                            <img src="/assets/artist-account/emojis/happy.svg" class="img-fluid">Happy
                          </div>
                          <div class="right-icon">
                            <img src="/assets/artist-account/emojis/sad.svg" class="img-fluid">Sad
                          </div>
                        </div>
                        <div class="d-flex align-items-center icons-list">
                          <div class="left-icon">
                            <img src="/assets/artist-account/emojis/blessed.svg" class="img-fluid">Blessed
                          </div>
                          <div class="right-icon">
                            <img src="/assets/artist-account/emojis/thankful.svg" class="img-fluid">Thankful
                          </div>
                        </div>
                        <div class="d-flex align-items-center icons-list">
                          <div class="left-icon">
                            <img src="/assets/artist-account/emojis/loved.svg" class="img-fluid">Loved
                          </div>
                          <div class="right-icon">
                            <img src="/assets/artist-account/emojis/inlove.svg" class="img-fluid">Inlove
                          </div>
                        </div>
                        <div class="d-flex align-items-center icons-list">
                          <div class="left-icon">
                            <img src="/assets/artist-account/emojis/lovely.svg" class="img-fluid">Lovely
                          </div>
                          <div class="right-icon">
                            <img src="/assets/artist-account/emojis/grateful.svg" class="img-fluid">Grateful
                          </div>
                        </div>
                        <div class="d-flex align-items-center icons-list">
                          <div class="left-icon">
                            <img src="/assets/artist-account/emojis/excited.svg" class="img-fluid">Excited
                          </div>
                          <div class="right-icon">
                            <img src="/assets/artist-account/emojis/fantastic.svg" class="img-fluid">Fantastic
                          </div>
                        </div>
                        <div class="d-flex align-items-center icons-list">
                          <div class="left-icon">
                            <img src="/assets/artist-account/emojis/crazy.svg" class="img-fluid">Crazy
                          </div>
                          <div class="right-icon">
                            <img src="/assets/artist-account/emojis/cool.svg" class="img-fluid">Cool
                          </div>
                        </div>
                        <div class="d-flex align-items-center icons-list">
                          <div class="left-icon">
                            <img src="/assets/artist-account/emojis/blissful.svg" class="img-fluid">Blissful
                          </div>
                          <div class="right-icon">
                            <img src="/assets/artist-account/emojis/positive.svg" class="img-fluid">Positive
                          </div>
                        </div>
                        <div class="text-center button-wrapper">
                              <button type="submit" class="btn"  @click="showCreatePost = true">Done</button>
                            </div>

                        </div> <!-- end of modal-body-->
                      </div> <!-- end of modal-cotent -->


                    </div> <!-- end of modal-dialog -->

                  </div> <!-- end of artistPost -->


    </div>
  </template>
  
  <script>
  import { mapGetters} from "vuex";

  export default {
    props: {
      //timestamp: Number
    },
    data() {
          return {
            formData: {
            message: '',
            },

            selectedItem: null,
            selectFile: true,

            songTitle: 'Song title. mp3',
            fileSize: '',
  
            isLoading: false,

            uploadedFiles: [],
            errorMessage: null,
        
         }
    },      
    computed: {
        ...mapGetters(["isLoggedIn"]),
      displayedFiles() {
        return this.uploadedFiles.slice(0, 3);
    },
    additionalFilesCount() {
      return Math.max(this.uploadedFiles.length - 3, 0);
    }
  },
  watch: {
    submittedTime() {
      this.timeDifference = Math.floor((new Date() - this.submittedTime) / 1000);
    }
  },
    methods: {
      submitForm(){
        console.log('Message mo:', this.formData.message, this.uploadedFiles);
        this.isLoading = true;
        this.$emit('submitData', {
          message: this.formData.message,
          files: this.uploadedFiles,
          music: this.uploadedMusic,
          loading: this.isLoading = false
        });
        this.formData.message = '';
        this.uploadedFiles = '';
        this.uploadedMusic = '';
        // this.selectedItem = null;
        this.selectFile = true;
      },
      toggleContent(item) {
      if (this.selectedItem === item) {
        this.selectedItem = null;
      } else {
        this.selectedItem = item;
      }
    },
    closeModal() {
      this.selectedItem = false;
    },
    uploadImage() {
      // Trigger the hidden file input
      this.$refs.fileInput.click();
    },
    // handleImageUpload(event) {

    //   const files = event.target.files;
    //   this.selectFile = false;

    //   // video
    //   this.errorMessage = null;
    //   this.uploadedVideo = null;
    //   this.selectedVideo = event.target.files[0];

    //   for (const file of files) {
    //     if (this.uploadedImages.length >= 50) {
    //       console.log('Maximum limit reached.');
    //       return;
    //     }
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       this.uploadedImages.push(e.target.result);
    //       // Save the images URLs in localStorage
    //       localStorage.setItem('uploadedImages', JSON.stringify(this.uploadedImages));
    //     };
    //     reader.readAsDataURL(file);
    //   }

    //   if (this.selectedVideo) {
    //     // Simulate a successful upload (no actual upload to the server in this example)
    //     this.uploadedVideo = this.selectedVideo.name;
    //     this.uploadedVideoUrl = URL.createObjectURL(this.selectedVideo);
    //     this.selectedVideo = null;
    //   } else {
    //     // Handle no file selected error
    //     this.errorMessage = 'Please select a video to upload.';
    //   }

    // },

    handleFileUpload(event) {
      this.selectFile = null;
      this.errorMessage = null;
      this.uploadedFiles = [];
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.uploadedFiles.push({
          name: files[i].name,
          type: files[i].type,
          url: URL.createObjectURL(files[i]),
        });
      }
    },
    uploadFiles() {
      if (this.uploadedFiles.length > 0) {
        // Simulate a successful upload (no actual upload to the server in this example)
        this.uploadedFiles = [];
        this.selectFile = null;
      } else {
        // Handle no files selected error
        this.errorMessage = 'Please select files to upload.';
      }
    },





    removeFile(index) {
      this.uploadedFiles.splice(index, 1);
            if(this.uploadedFiles == 0){
        this.selectFile = true;
      }
      // Update localStorage after removing image
      // localStorage.setItem('uploadedImages', JSON.stringify(this.uploadedFiles));
      // if(this.uploadedFiles == 0){
      //   this.selectFile = true;
      // }
    },
    handleMusicUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadedMusic = URL.createObjectURL(file);
        this.songTitle = file.name.replace(/\.[^/.]+$/, '');

                // Calculate and format file size
        const sizeInBytes = file.size;
        const sizeInKilobytes = Math.floor(sizeInBytes / 1024);
        this.fileSize = sizeInKilobytes;
      }
    },
    // uploadMusic() {
    //   if (this.uploadedMusic) {
    //     localStorage.setItem('uploadedMusic', this.uploadedMusic);
    //     alert('Music uploaded successfully.');
    //   }
    // },
    removeMusic() {
      this.uploadedMusic = null;
      localStorage.removeItem('uploadedMusic');
      this.songTitle = '';
      this.fileSize = ''; 
    },
    
  },
  // created() {
  //   const storedImages = localStorage.getItem('uploadedImages');
  //   if (storedImages) {
  //     this.uploadedImages = JSON.parse(storedImages);
  //   }
  // }

  }
  </script>
  
  <style>
  </style>
  