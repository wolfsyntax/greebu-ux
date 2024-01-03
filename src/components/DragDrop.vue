<template>
  <div id="event-cover-wrap">
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

        <h5 class="drag-files">Drag image here</h5>
        <p class="or">or use the 'Browse' button to upload</p>

        <div class="select-files-wrapper">
          <label for="files" class="btn btn-info" @click="$refs.bannerInput.click()">Browse</label>
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
              aspectRatio: 16 / 9,
            }"
            image-restriction="stencil"
            @change="updateSize"
            :resize-image="{
                    adjustStencil: false
                  }"
          />

          <vertical-buttons>
            <square-button title="Zoom In" @click="zoom(2)">
              <span class="material-symbols-rounded zoom-in">&#xe8ff;</span>
            </square-button>

            <square-button title="Zoom Out" @click="zoom(0.5)">
              <span class="material-symbols-rounded zoom-out">&#xe900;</span>
            </square-button>
          </vertical-buttons>

        </example-wrapper>

        <Reposition />

        <button class="remove-image" type="button" @click="removeBanner">
          <span class="material-symbols-outlined">&#xe5cd;</span>
        </button>
      </div>
    </div>

    <div class="text-center">

      <button class="btn btn-lg upload-event-photo" type="button" @click="getCropImage" v-if="preview">Set as Event Photo</button>
      <button class="btn btn-lg upload-event-photo" type="button" v-if="showLoadingIndicator"><LoadingIndicator /></button>

    </div>

  </div>
</template>

<script>

// eslint-disable-next-line import/no-absolute-path
import ExampleWrapper from '/src/components/Cropper/ExampleWrapper.vue'
// eslint-disable-next-line import/no-absolute-path
import SquareButton from '/src/components/Cropper/SquareButton.vue'
// eslint-disable-next-line import/no-absolute-path
import VerticalButtons from '/src/components/Cropper/VerticalButtons.vue'
// eslint-disable-next-line import/no-absolute-path, quotes
import Reposition from "/src/components/Dashboard/Modals/Reposition.vue"
// eslint-disable-next-line import/no-absolute-path, quotes
import LoadingIndicator from "/src/components/LoadingIndicator.vue"

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
        height: null
      }
    }
  },
  data: () => ({
    showLoadingIndicator: false,
    isDragOver: false,
    uploadBox: true,
    showImage: false,
    validImage: false,
    banner: '',
    preview: '',
    cropImage: '',
    magicCode: '',
    targetFile: null
  }),
  mounted () {
    console.log('\n\nBanner Content: ', this.banner)
    this.preview = this.banner
  },
  methods: {
    // emitEvent(){
    //   this.$emit('childButtonClick');
    //   this.getCropImage();
    // },
    getCropImage (compressedImage) {
      // eslint-disable-next-line no-unused-vars
      const { coordinates, canvas, image } = this.$refs.cropper.getResult()
      this.showLoadingIndicator = true
      this.showImage = true
      this.cropImage = canvas
      this.preview = null

      this.cropImage.toBlob(async blob => {
        this.$emit('dragCover', blob)
      })
    },
    boundaries ({ cropper, imageSize }) {
      return {
        width: cropper.clientWidth,
        height: cropper.clientHeight
      }
    },
    updateSize ({ coordinates }) {
      this.size.width = Math.round(coordinates.width)
      this.size.height = Math.round(coordinates.height)
    },
    zoom (factor) {
      this.$refs.cropper.zoom(factor)
    },

    fillArea ({ boundaries }) {
      return {
        width: boundaries.width,
        height: boundaries.height
      }
    },
    change ({ coordinates, canvas }) {
      // console.log('Cropper: ', coordinates, canvas)
      // this.cropImage = canvas;

    },
    fileCheck (file) {
      if (file) {
        // eslint-disable-next-line no-var
        var fileReader = new FileReader()
        // eslint-disable-next-line no-var
        var self = this
        this.magicCode = ''

        this.targetFile = file
        console.log('Target File: ', file)
        fileReader.readAsArrayBuffer(file)
        fileReader.onloadend = function (e) {
          // eslint-disable-next-line no-var
          var arr = (new Uint8Array(e.target.result)).subarray(0, 4)

          // eslint-disable-next-line no-var
          var header = ''
          // eslint-disable-next-line no-var
          for (var i = 0; i < arr.length; i++) {
            header += arr[i].toString(16)
          }

          self.magicCode = header
        }
      }
    },
    isImage (file) {
      return /\.(png|webp|svg|jpeg)$/.test(file.name)
    },
    handleCoverImage (files) {
      if (files) {
        const { name } = files
        this.filename = name

        // this.$emit('dragCover', files);

        // console.log('Handle Cover Image:: ', files);

        this.preview = URL.createObjectURL(files)

        this.uploadBox = false
        // check the image width and height
        const img = new Image()
        img.src = this.preview

        img.onload = () => {
          // this.imageWidth = img.width;
          // this.imageHeight = img.height;
          // console.log(`Image Width: ${this.imageWidth} pixels`);
          // console.log(`Image Height: ${this.imageHeight} pixels`);
        }
      }
    },
    handleDragOverCover (e) {
      e.stopPropagation()
      e.preventDefault()

      e.dataTransfer.dropEffect = 'copy'

      this.isDragOver = true
    },
    handleDragLeaveCover (e) {
      e.preventDefault()
      this.isDragOver = false
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

      // const rawFile = files[0] // only use files[0]

      // if (!this.isImage(rawFile)) {
      //   console.log('Not valid image');
      //   return false
      // }

      this.fileCheck(files[0])
      // this.handleCoverImage(files);
    },
    handleClick (e) {
      const files = e.target.files
      this.fileCheck(files[0])
      // this.handleCoverImage(files);
    },
    removeBanner () {
      console.log('removing banner...')

      this.preview = null
      this.cropImage = null
      // eslint-disable-next-line dot-notation
      this.$refs['bannerInput'].value = null
      this.uploadBox = true
      this.showImage = false

      this.size = {
        width: null,
        height: null
      }

      this.$emit('dragCover', null)
    }
  },
  watch: {
    magicCode (val) {
      switch (val) {
        case '89504e47': // png
        case 'ffd8ffe0': // jpg, jpeg, jps, jiff
        case '52494646': // webp
        case '3c737667': // svg

          this.validImage = true
          this.handleCoverImage(this.targetFile)
          break
        default:
          this.validImage = false
          break
      }
    }
  }
}
</script>

<style scoped>

#event-cover-wrap{}
#event-cover-wrap .upload-file-wrapper{
  border-radius: 0.5rem;
  border: 1px dashed #B8BBCF;
  height: 14.3rem!important;
  position: relative;
}
#event-cover-wrap svg{
  width: 4.5rem;
  height: 4.5rem;
  margin-bottom: 0.5rem;
}
#event-cover-wrap .upload-file-content{
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#event-cover-wrap .drag-files,
#event-cover-wrap .or{
  color: #8690A2;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.04rem;
  margin-bottom: 0.5rem;
}
#event-cover-wrap .btn-info{
  color: #FF6B00;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 100%; /* 0.875rem */
  letter-spacing: 0.04375rem;
  padding: 0.75rem 1.34rem;
  border-radius: 0.75rem;
  border: 0.646px solid #FF6B00;
  background-color: white;
}
#event-cover-wrap .example-wrapper{
  width: 100%!important;
  height: 14.3rem!important;
  cursor: move;
}

/* Cropper */

#event-cover-wrap .vue-advanced-cropper > *{
  width: 100%!important;
  height: 14.3rem!important;
  cursor: move;
}
#event-cover-wrap .drag-mouse-wrap{
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  gap: 0.25rem;
  border-radius: 0.375rem;
  background: rgba(0, 0, 0, 0.60);
  padding: 0.62rem 0.78rem;
}
#event-cover-wrap .drag-mouse-wrap .drag-cursor{
  width: 1.00725rem;
  height: 1rem;
}
#event-cover-wrap .drag-mouse-wrap .drag{
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
}

#event-cover-wrap .vertical-buttons {
    position: absolute;
    display: flex;
    gap: 0.5rem;
    top: 2%;
    left: 2%;
}

#event-cover-wrap .upload-event-photo{
    color: var(--white);
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: -0.025rem;
    padding: 0.75rem 4.63rem;
    background-color: var(--orange);
    margin-bottom: 1.5rem;
    text-align: center;
}

/* MEDIA QUERIES */

/* Large (lg) and Extra large (xl) */
@media (min-width: 992px) and (max-width: 1399.98px) {
  #event-cover-wrap .example-wrapper{
    height: 12.3rem!important;
}
  #event-cover-wrap .upload-file-wrapper{
    height: 12.3rem!important;
  }
  #event-cover-wrap svg{
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 0.3rem;
}
#event-cover-wrap .drag-files,
#event-cover-wrap .or{
  font-size: 0.87rem;
  margin-bottom: 0.3rem;
}
#event-cover-wrap .btn-info{
  font-size: 0.75rem;
  padding: 0.5rem 0.9rem;
}
#event-cover-wrap .upload-event-photo{
    font-size: 0.87rem;
    letter-spacing: -0.025rem;
    padding: 0.5rem 3.63rem;
    margin-bottom: 1rem;
}

  #event-cover-wrap .vue-advanced-cropper > *{
  height: 12.3rem!important;
}

}

</style>
