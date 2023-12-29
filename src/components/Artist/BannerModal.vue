<template>
  <div
    class="modal fade"
    id="uploadArtistCoverPhoto"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Upload Cover Photo</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            ref="bannerClose"
          ></button>
        </div>
        <div class="modal-body">
          <div
            class="upload-file-wrapper"
            @dragover="handleDragOverCover"
            @dragleave="handleDragLeaveCover"
            @drop="handleDropCover"
            :class="{ 'drag-over': isDragOver }"
          >
            <input
              type="file"
              ref="bannerInput"
              style="display: none"
              accept=".png,.webp,.svg,.jpeg"
              @change="handleClick"
            />
            <div class="text-center upload-file-content" v-if="uploadBox">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
              >
                <path
                  d="M14.915 14.959C14.915 16.1895 14.502 17.2529 13.6055 18.1582C12.7002 19.0635 11.6367 19.4678 10.4062 19.4678C9.17578 19.4678 8.1123 19.0547 7.20703 18.1582C6.30176 17.2617 5.89746 16.1895 5.89746 14.959C5.89746 13.7285 6.31055 12.665 7.20703 11.7598C8.10352 10.8545 9.17578 10.4502 10.4062 10.4502C11.6367 10.4502 12.7002 10.8633 13.6055 11.7598C14.5107 12.665 14.915 13.7285 14.915 14.959ZM39.0146 23.9766V34.4707H5.89746V29.9619L13.4385 22.5L17.209 26.2705L29.2588 14.2207L39.0146 23.9766ZM41.2295 7.49707H3.69141C3.52441 7.49707 3.27832 7.57617 3.19922 7.74316C3.03223 7.91016 2.95312 8.06836 2.95312 8.23535V36.7559C2.95312 36.9229 3.03223 37.1689 3.19922 37.2481C3.36621 37.415 3.52441 37.4941 3.69141 37.4941H41.2295C41.3965 37.4941 41.6426 37.415 41.7217 37.2481C41.8887 37.0811 41.9678 36.9229 41.9678 36.7559V8.23535C41.9678 8.06836 41.8887 7.82227 41.7217 7.74316C41.6426 7.58496 41.4756 7.49707 41.2295 7.49707ZM45 8.23535V36.7559C45 37.8193 44.6748 38.6367 43.9365 39.375C43.1982 40.1133 42.293 40.4385 41.3174 40.4385H3.69141C2.62793 40.4385 1.81055 40.1133 1.07227 39.375C0.325195 38.6455 0 37.749 0 36.7647V8.23535C0 7.17188 0.325195 6.35449 1.06348 5.61621C1.80176 4.87793 2.70703 4.55273 3.68262 4.55273H41.2207C42.2842 4.55273 43.1016 4.87793 43.8398 5.61621C44.6748 6.2666 45 7.17188 45 8.23535Z"
                  fill="#ABADC6"
                />
              </svg>
              <h5 class="drag-files">Select a file or drag and drop here</h5>
              <p class="image-type">JPG, PNG file size no more than 10MB</p>
              <div class="select-files-wrapper">
                <label
                  for="files"
                  class="btn btn-info"
                  @click="$refs.bannerInput.click()"
                  >Select file</label
                >
              </div>
            </div>

            <div class="uploaded-image-wrapper" v-else>
              <div v-if="showImage">
                <img
                  ref="uploadedImage"
                  class="uploaded-image"
                  :src="banner"
                  alt="banner-modal"
                />
              </div>
              <cropper
                class="cropper"
                ref="cropper"
                :src="preview"
                :stencil-props="{
                  maxAspectRatio: 3.63,
                }"
                maxWidth="1480"
                maxHeight="408"
                minWidth="400"
                minHeight="150"
                @change="change"
                v-if="banner"
              />
              <button class="remove-image" @click="removeBanner">
                <span class="material-symbols-outlined">&#xe5cd;</span>
              </button>
            </div>
          </div>
          <div class="d-flex align-items-center img-dimensions">
            <span class="material-symbols-rounded info">&#xe88e;</span>
            <p class="description">
              Cover photo should be a rectangular .jpg, .jpeg, .png, or .webp
              file, with a minimum size of 400x150 pixels, clear, and under 2MB.
            </p>
          </div>
          <!-- <div>
        <p>Image Width: {{ imageWidth }} pixels</p>
        <p>Image Height: {{ imageHeight }} pixels</p>
      </div> -->
        </div>
        <!-- end of modal-body -->

        <div class="modal-footer justify-content-center">
          <button
            class="btn btn-lg upload-cover-photo"
            @click="getCropImage"
            v-if="preview"
          >
            Generate
          </button>
          <button
            class="btn btn-lg upload-cover-photo"
            @click="uploadCover"
            v-else
          >
            <span v-if="isLoading">
              <i class="busy-cover-photo"></i>
              Set as Cover Photo
            </span>
            <span v-else>Set as Cover Photo</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  setup () {
    return {}
  },
  data: () => ({
    banner: null,
    form: {
      cover_photo: ''
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
    showImage: false
  }),
  props: {
    active: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  mounted () {
    const myModal = document.getElementById('uploadArtistCoverPhoto')

    myModal.addEventListener('hide.bs.modal', () => {
      this.form.cover_photo = ''
      this.banner = null

      this.preview = null
      this.cropImage = null

      this.isLoading = false
      this.isDragOver = false
      this.imageWidth = null
      this.imageHeight = null
      this.imageUrl = null

      this.filename = null
    })
  },
  methods: {
    ...mapActions(['updateBanner']),
    change ({ coordinates, canvas }) {
      // console.log('Cropper: ', coordinates, canvas)
      // this.cropImage = canvas;
    },
    getCropImage (e) {
      // eslint-disable-next-line no-unused-vars
      const { coordinates, canvas, image } = (this.generateImage =
        this.$refs.cropper.getResult())

      this.showImage = true
      this.cropImage = canvas
      this.banner = canvas.toDataURL('image/jpeg/png/svg/webp', 0.9)
      this.preview = null

      this.cropImage.toBlob(async (blob) => {
        this.form.cover_photo = blob
      })
    },
    handleDragOverCover (e) {
      console.log('Handle DragOver: ', e)
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
      this.isDragOver = true
    },
    handleDragLeaveCover (e) {
      e.preventDefault()
      this.isDragOver = false
    },
    isImage (file) {
      return /\.(png|webp|svg|jpeg)$/.test(file.name)
    },
    handleDropCover (e) {
      e.stopPropagation()
      e.preventDefault()
      this.isDragOver = false

      const files = e.dataTransfer.files
      if (files.length !== 1) {
        console.log('Handling Drop')
        return
      }

      const rawFile = files[0] // only use files[0]

      if (!this.isImage(rawFile)) {
        console.log('Not valid image')
        return false
      }

      // this.form.cover_photo = e.target.files[0];
      // this.banner = URL.createObjectURL(e.target.files[0]);
      this.handleCoverImage(files)
    },

    uploadCover () {
      this.isLoading = true

      // eslint-disable-next-line no-var
      var formData = new FormData()
      formData.append('cover_photo', this.form.cover_photo, this.filename)
      this.updateBanner(formData)
        // this.updateBanner(this.form, this.generateImage)
        .then((response) => {
          this.$refs.bannerClose.click()
          this.removeBanner()

          console.log('Closing Banner')
        })
        .catch((error) => {
          console.error('Error uploading cover:', error)
        })
    },

    handleClick (e) {
      const files = e.target.files
      this.handleCoverImage(files)
    },
    handleCoverImage (files) {
      if (files) {
        const rawFile = files[0]
        if (!rawFile) return

        const { name } = rawFile
        this.filename = name

        this.form.cover_photo = rawFile
        this.banner = this.preview = URL.createObjectURL(rawFile)
        // console.log(`top banner image`, this.banner)

        this.uploadBox = false
        // check the image width and height
        const img = new Image()
        img.src = this.banner

        img.onload = () => {
          this.imageWidth = img.width
          this.imageHeight = img.height
          console.log(`Image Width: ${this.imageWidth} pixels`)
          console.log(`Image Height: ${this.imageHeight} pixels`)
        }
      }
    },
    removeBanner () {
      this.form.cover_photo = null
      this.banner = null
      this.cropImage = null
      // eslint-disable-next-line dot-notation
      this.$refs['bannerInput'].value = null
      this.uploadBox = true
      this.showImage = false
    }
  },
  watch: {}
}
</script>

<style scoped>
.edit.btn {
  color: #fff !important;
  font-size: 20px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: 1px;
  padding: 14px 37px;
  background-color: #ff6b00 !important;
  border: 0;
}
</style>
