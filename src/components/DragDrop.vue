<template>
  <div>
    <div
      class="upload-file-wrapper" 
      @dragover="handleDragOverCover"
      @dragleave="handleDragLeaveCover"
      @drop="handleDropCover"
      :class="{ 'drag-over': isDragOver }"
    >
      <input type="file" ref="bannerInput" style="display: none;" accept=".png,.webp,.svg,.jpeg" @change="handleClick"/>
      <div class="text-center upload-file-content" v-if="uploadBox">
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
          <path d="M14.915 14.959C14.915 16.1895 14.502 17.2529 13.6055 18.1582C12.7002 19.0635 11.6367 19.4678 10.4062 19.4678C9.17578 19.4678 8.1123 19.0547 7.20703 18.1582C6.30176 17.2617 5.89746 16.1895 5.89746 14.959C5.89746 13.7285 6.31055 12.665 7.20703 11.7598C8.10352 10.8545 9.17578 10.4502 10.4062 10.4502C11.6367 10.4502 12.7002 10.8633 13.6055 11.7598C14.5107 12.665 14.915 13.7285 14.915 14.959ZM39.0146 23.9766V34.4707H5.89746V29.9619L13.4385 22.5L17.209 26.2705L29.2588 14.2207L39.0146 23.9766ZM41.2295 7.49707H3.69141C3.52441 7.49707 3.27832 7.57617 3.19922 7.74316C3.03223 7.91016 2.95312 8.06836 2.95312 8.23535V36.7559C2.95312 36.9229 3.03223 37.1689 3.19922 37.2481C3.36621 37.415 3.52441 37.4941 3.69141 37.4941H41.2295C41.3965 37.4941 41.6426 37.415 41.7217 37.2481C41.8887 37.0811 41.9678 36.9229 41.9678 36.7559V8.23535C41.9678 8.06836 41.8887 7.82227 41.7217 7.74316C41.6426 7.58496 41.4756 7.49707 41.2295 7.49707ZM45 8.23535V36.7559C45 37.8193 44.6748 38.6367 43.9365 39.375C43.1982 40.1133 42.293 40.4385 41.3174 40.4385H3.69141C2.62793 40.4385 1.81055 40.1133 1.07227 39.375C0.325195 38.6455 0 37.749 0 36.7647V8.23535C0 7.17188 0.325195 6.35449 1.06348 5.61621C1.80176 4.87793 2.70703 4.55273 3.68262 4.55273H41.2207C42.2842 4.55273 43.1016 4.87793 43.8398 5.61621C44.6748 6.2666 45 7.17188 45 8.23535Z" fill="#ABADC6"/>
        </svg>
        <h5 class="drag-files">Drag files here</h5>
        <p class="image-type">JPG, PNG file size no more than 10MB</p>
        <div class="select-files-wrapper">
          <label for="files" class="btn btn-info" @click="$refs.bannerInput.click()">Select file</label>
        </div>
      </div>

      <!-- <div class="uploaded-image-wrapper" v-else>
        <div  v-if="preview">
          <img ref="uploadedImage" class="uploaded-image" :src="preview" alt="banner-modal" />
        </div>
        
        <button class="remove-image" @click="removeBanner" ref="removeBannerImage">
          <span class="material-symbols-outlined">&#xe5cd;</span> 
        </button>
      </div> -->
    </div>

    <!-- <div class="d-flex align-items-center img-dimensions">
      <span class="material-symbols-rounded info">&#xe88e;</span> 
      <p class="description">Cover photo should be a rectangular .jpg, .jpeg, .png, or .webp file, with a minimum size of 400x150 pixels, clear, and under 2MB.</p>
    </div> -->

  </div>
</template>

<script>
export default {
  setup () {
    

    return {}
  },
  data: () => ({
    isDragOver: false,
    uploadBox: true,
    showImage: false,
    validImage: false,
    // banner: '',
    preview: '',
    cropImage: '',
    magicCode: '',
    targetFile: null,
  }),
  props: {
    banner: { 
      type: String,
      default: '',
      required: true
    },
  },
  mounted()
  {
    console.log('\n\nBanner Content: ', this.banner);
    this.preview = this.banner;
  },
  methods: {
    fileCheck(file)
    {
      if (file) {
        var fileReader = new FileReader();
        var self = this;
        this.magicCode = '';

        this.targetFile = file;
        console.log('Target File: ', file);
        fileReader.readAsArrayBuffer(file);
        fileReader.onloadend = function (e)
        {

          var arr = (new Uint8Array(e.target.result)).subarray(0, 4);

          var header = "";
          for (var i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
          }

          self.magicCode = header;
        };

      }

    },
    isImage(file)
    {
      return /\.(png|webp|svg|jpeg)$/.test(file.name)
    },
    handleCoverImage(files)
    {
     
      if (files) {
        
        const { name } = files;
        this.filename = name;

        this.$emit('dragCover', files);

        console.log('Handle Cover Image:: ', files);

        this.preview = URL.createObjectURL(files);

        this.uploadBox = false;
        // check the image width and height
        const img = new Image();
        img.src = this.preview;

        img.onload = () =>
        {
          // this.imageWidth = img.width;
          // this.imageHeight = img.height;
          // console.log(`Image Width: ${this.imageWidth} pixels`);
          // console.log(`Image Height: ${this.imageHeight} pixels`);
        };

      }
    },
    handleDragOverCover(e)
    {

      e.stopPropagation();
      e.preventDefault();

      e.dataTransfer.dropEffect = 'copy';

      this.isDragOver = true;

    },
    handleDragLeaveCover(e)
    {
      e.preventDefault();
      this.isDragOver = false;
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

      // const rawFile = files[0] // only use files[0]
      
      // if (!this.isImage(rawFile)) {
      //   console.log('Not valid image');
      //   return false
      // }

      this.fileCheck(files[0]);
      // this.handleCoverImage(files);

    },
    handleClick(e)
    {
      
      const files = e.target.files;
      this.fileCheck(files[0]);
      // this.handleCoverImage(files);
    },
    removeBanner()
    {
      this.preview = null;
      this.cropImage = null;
      this.$refs['bannerInput'].value = null;
      this.uploadBox = true;
      this.showImage = false;
    },
  },
  watch: {
    magicCode(val)
    {
      switch (val) {
        case '89504e47': // png
        case 'ffd8ffe0': // jpg, jpeg, jps, jiff
        case '52494646': // webp
        case '3c737667': // svg
          
          this.validImage = true;
          this.handleCoverImage(this.targetFile);
          
          // this.form.avatar = this.avatarMagic;

          break;
        default:
          this.validImage = false;
          break;
      }      
    }
  }
}
</script>

<style scoped>
.upload-file-wrapper .upload-file-content{
    border-radius: 0.25rem;
    background: #EFEFFC;
    padding: 2rem 0;
}

.upload-file-wrapper .upload-file-content svg {
  margin-bottom: 1.5rem;
}

.upload-file-wrapper .upload-file-content .drag-files {
  color: var(--black-color);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.upload-file-wrapper .upload-file-content .image-type{
  color: rgba(0, 0, 0, 0.40);
  font-size: 0.75rem;
  font-weight: 400;
  margin-bottom: 1.25rem;
}

.upload-file-content  .select-files-wrapper label {
  color: var(--orange);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: transparent;
  padding: 0.75rem 1rem;
  border-radius: 0.3125rem;
  border: 1px solid var(--orange);
}

.upload-file-content  .select-files-wrapper label:hover{
    background-color: var(--orange);
    color: var(--white);
}

.upload-file-wrapper .uploaded-image-wrapper .uploaded-image{
  height: 21.313rem;
  width: 100%;
  border-radius: 0.25rem;
  position: relative;
  -o-object-fit: cover;
  object-fit: cover;
  backface-visibility: hidden;
}

.upload-file-wrapper .uploaded-image-wrapper .remove-image{
  margin: 0;
  position: absolute;
  top: 7%;
  left: 91%;
  border: 0;
  background-color: transparent;
}

.upload-file-wrapper .uploaded-image-wrapper .remove-image span{
  cursor: pointer;
  color: var(--white);
  margin: 0;
  position: absolute;
  top: 3%;
  left: 89.5%;
  background: #00000075;
  border-radius: 100px;
  padding: 2px;
  font-size: 16px;
  border: 0.1px solid #ffffff91;
}

.upload-file-wrapper .uploaded-image-wrapper .remove-image:hover span{
  border: 0.1px solid var(--white);
}

.modal-footer, #editBandMembers .modal-footer{
  border: 0;
}

 .modal-footer .upload-cover-photo, #editBandMembers .modal-footer .save{
  color: var(--white);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025rem;
  padding: 0.75rem 8.63rem;
  background-color: #FF6B00;
}

.modal-footer .upload-cover-photo:hover, #editBandMembers .modal-footer .save:hover{
  background-color: #ED6300;
}
</style>