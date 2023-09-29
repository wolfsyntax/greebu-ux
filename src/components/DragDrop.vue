<template>
  <div>
    <div
      id="drag-file-component-wrap"
      class="upload-file-wrapper" 
      @dragover="handleDragOverCover"
      @dragleave="handleDragLeaveCover"
      @drop="handleDropCover"
      :class="{ 'drag-over': isDragOver }"
    >
      <input type="file" ref="bannerInput" style="display: none;" accept=".png,.webp,.svg,.jpeg" @change="handleClick"/>
      <div class="text-center upload-file-content" v-if="uploadBox">
        <span class="material-symbols-rounded">&#xe3f4;</span>
        <h5 class="drag-file">Drag a file here</h5>
        <p class="file-type">JPG, PNG file size no more than 10MB</p>
        <div class="select-files-wrapper">
          <label for="files" class="btn select-file-btn" @click="$refs.bannerInput.click()">Select a file</label>
        </div>
      </div>

      <div class="uploaded-image-wrapper" v-else>
        <div  v-if="banner">
          <img ref="uploadedImage" class="uploaded-image" :src="banner" alt="banner-modal" />
        </div>
        
        <button class="remove-image" @click="removeBanner">
          <span class="material-symbols-outlined">&#xe5cd;</span> 
        </button>
      </div>
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
    banner: '',
    preview: '',
    cropImage: '',
    magicCode: '',
    targetFile: null,
  }),
  methods: {
    fileCheck(file)
    {
      var fileReader = new FileReader();
      var self = this;
      this.magicCode = '';
      
      this.targetFile = file;

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

        this.banner = this.preview = URL.createObjectURL(files);

        this.uploadBox = false;
        // check the image width and height
        const img = new Image();
        img.src = this.banner;

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
      this.banner = null;
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
</style>