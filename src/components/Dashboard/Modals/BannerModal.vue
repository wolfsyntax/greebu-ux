<template>
  <div class="modal fade" id="uploadArtistCoverPhoto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Upload Cover Photo</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="bannerClose" @click="removeBanner"></button>
        </div>
        <div class="modal-body">
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
            </div>

            <div class="uploaded-image-wrapper" v-else>
              <example-wrapper class="manipulate-image-example">
                <cropper class="coordinates-cropper" 
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
                    aspectRatio: 20 / 7, 
                  }"
                  image-restriction="stencil"
                  @change="updateSize"
                  :resize-image="{
                    adjustStencil: false
                  }"
                  v-if="banner"
                 
                />

                <!-- minAspectRatio: 16/8, // for upload event
		            maxAspectRatio: 4/8 -->

                <vertical-buttons>
                  <square-button title="Zoom In" @click="zoom(2)">
                    <span class="material-symbols-rounded zoom-in">&#xe8ff;</span>
                  </square-button>

                  <square-button title="Zoom Out" @click="zoom(0.5)">
                    <span class="material-symbols-rounded zoom-out">&#xe900;</span>
                  </square-button>
                </vertical-buttons>

                <div class="size-info" v-if="size.width && size.height">
                  <div>Width: {{ size.width }}px</div>
                  <div>Height: {{ size.height }}px</div>
                </div>
              </example-wrapper>

              <Reposition />

              <button class="remove-image" @click="removeBanner">
                <span class="material-symbols-outlined">&#xe5cd;</span> 
              </button>
            </div>
          </div> 
        </div> <!-- end of modal-body -->

        <div class="modal-footer justify-content-center">

          <button type="submit" class="btn btn-lg upload-cover-photo" @click="getCropImage" v-if="showCoverButton">Set as Cover Photo</button>
          <button type="button" class="btn btn-lg upload-cover-photo" v-else><LoadingIndicator /></button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import ExampleWrapper from '/src/components/Cropper/ExampleWrapper.vue';
import VerticalButtons from '/src/components/Cropper/VerticalButtons.vue';
import SquareButton from '/src/components/Cropper/SquareButton.vue';
import Compressor from 'compressorjs'; 
import LoadingIndicator from "/src/components/LoadingIndicator.vue";
import Reposition from "/src/components/Dashboard/Modals/Reposition.vue";

export default { 
  components: {
    ExampleWrapper,
		VerticalButtons,
		SquareButton,
    LoadingIndicator,
    Reposition
  },
  setup () {
    return {
      size: {
				width: null,
				height: null,
			},
    }
  },
  data: () => ({
    showCoverButton: true,
    banner: null,
    form: {
      cover_photo: '',
    },
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
  }),
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
  computed: {
    ...mapGetters(['userRole',]),
    ...mapState({

    })
  },
  mounted()
  {
    const myModal = document.getElementById('uploadArtistCoverPhoto');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      this.form.cover_photo = '';
      this.banner = null;

      this.preview = null;
      this.cropImage = null;

      this.isLoading = false;
      this.isDragOver = false;
      this.imageWidth = null;
      this.imageHeight = null;
      this.imageUrl = null;

      this.filename = null;

    });
  },
  methods: {
    ...mapActions([
      'updateBanner',
    ]),
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
    change({ coordinates, canvas })
    {
      // console.log('Cropper: ', coordinates, canvas)
      // this.cropImage = canvas;

    },
    

    getCropImage(compressedImage) {
      this.showCoverButton = false;
      const { coordinates, canvas, image } = this.$refs.cropper.getResult();

      this.showImage = true;
      this.cropImage = canvas;
      this.preview = null;

      this.cropImage.toBlob(async blob => {
        const formData = new FormData();
        formData.append('cover_photo', blob, this.filename);

        this.updateBanner(formData);

        this.$refs.bannerClose.click();
        this.removeBanner();
        console.log(`Closing Banner`);
        this.showCoverButton = true;
      });
    },

    // compressAndUploadImage(files) {

    //   const maxSizeBytes = 1024 * 1024; // 1 MB
    //   const mediumSizeBytes = 500 * 1024; // 500 KB
    //   const largeSizeBytes = 1500 * 1024; // 1.5 MB
    //   const skipCompressionSizeBytes = 100 * 1024; // 100 KB

    //   let quality;

    //   if (files.size < skipCompressionSizeBytes) {
    //     // If the file size is less than 100KB, skip compression
    //     quality = 1; // Set to 1 to keep original quality
    //   } else if (files.size < mediumSizeBytes) {
    //     quality = 0.8;
    //   } else if (files.size < maxSizeBytes) {
    //     quality = 0.2;
    //   } else if (files.size <= largeSizeBytes) {
    //     quality = 0.4;
    //   } else {
    //     quality = 0.2;
    //   }

    //   //let updateCoverImage = this.updateBanner;

    //   new Compressor(files, {
    //    // quality: 0.2, // Adjust the compression quality as needed, 0.6 or 0.8
    //    quality: quality,

    //     success: (compressedFile) => {
    //       const formData = new FormData();
    //       formData.append('cover_photo', compressedFile);
    //       this.updateBanner(formData);

    //       this.$refs.bannerClose.click();
    //       this.removeBanner();
    //       console.log(`Closing Banner`);


    //     },
    //     error(err) {
    //       console.error('Image compression failed:', err.message);
    //     },
    //   });
    // },

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

    handleClick(e) {
      const files = e.target.files;
      this.handleCoverImage(files, this.getCropImage);
    },
    handleCoverImage(files, callback) {
      if (!files) {
        return;
      }

      const rawFile = files[0];
      if (!rawFile) {
        return;
      }

      const { name } = rawFile;
      this.filename = name;
      this.form.cover_photo = rawFile;
      this.banner = this.preview = URL.createObjectURL(rawFile);
      this.uploadBox = false;

      new Compressor(rawFile, {
        quality: 0.6,
        success(result) {
          const formData = new FormData();
          formData.append('files', result, result.name);

          // axios.post('/path/to/upload', formData)
          //   .then(() => {
          //     console.log('Upload success');
          //     callback(result);
          //   })
          //   .catch((error) => {
          //     console.error('Upload error:', error);
          //   });
        },
        error(err) {
          console.log(err.message);
        },
      });
    },
    removeBanner()
    {
      this.form.cover_photo = null;
      this.banner = null;
      this.cropImage = null;
      this.$refs['bannerInput'].value = null;
      this.uploadBox = true;
      this.showImage = false;
    },

	},
  watch: {
}
}
</script>

<style scoped>

.upload-file-wrapper:hover .drag-mouse-wrap{
  /* display: none; */
  transition: 1s;
}
#uploadArtistCoverPhoto .upload-file-wrapper .uploaded-image-wrapper{
  height: 14.3rem;
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
</style>
