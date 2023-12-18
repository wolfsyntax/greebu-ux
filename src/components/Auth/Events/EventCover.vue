<template>
<div>

  <form @submit.prevent="submit">
         
         <div class="upload-file-wrapper" v-if="cover">
           <div class="uploaded-image-wrapper" >
             <div>
               <img ref="uploadedImage" class="uploaded-image" :src="cover" alt="banner-modal" />
             </div>
             
             <button class="remove-image" @click="removeBanner" >
               <span class="material-symbols-outlined">&#xe5cd;</span> 
             </button>
           </div>
         </div>
       <!-- <drag-drop @dragCover="setCover" v-else/> -->
       
       <drag-drop @dragCover="setCover" @show-buttons="showBtnDiv" v-else/>
 
       <div class="text-end action-btn-wrap" v-if="showBtn">
         <button type="button" class="btn cancel" data-bs-dismiss="modal">Cancel</button>
 
         <button type="submit" class="btn next" v-if="showNextButton">Next</button>
         <button type="submit" class="btn next" v-else><LoadingIndicator /></button>
       </div>
 
     </form> 

</div>   
 
</template>

<script>
import DragDrop from '/src/components/DragDrop.vue';
import LoadingIndicator from "/src/components/LoadingIndicator.vue";
import { mapActions, mapGetters, mapState } from 'vuex';
import Compressor from 'compressorjs';

export default {
  components: {
    DragDrop,
    LoadingIndicator
  },
  props: {
    accessType: {
      type: String,
      default: 'create',
      required: false,
    },
    showBtn: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    return {}
  },
  data: () => ({
    cover: '',
    showBtn: false,
    showNextButton: true,
  }),

  computed: {
    ...mapGetters([
      'eventCover',
    ]),
    ...mapState({
      form: state => state.events.form,
    }),
  },
  methods: {
    ...mapActions([
      'fetchEventOptions', 'createEvent', 'verifyEvent',
    ]),
    showBtnDiv(){
      this.showBtn = true;
      console.log('show div', this.showBtn);
    },
    setCover(val) {
  if (val) {
    const compressor = new Compressor(val, {
      quality: 0.6,
      success: (result) => {
        const formData = new FormData();
        formData.append('files', result, result.name);

        this.form.cover_photo = result;
        
        this.form.cover = URL.createObjectURL(result);
        
        console.log('Set Cover:: ', this.form.cover);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
},

    removeBanner()
    {
      this.form.cover = '';
      this.form.cover_photo = '';
      this.cover = '';
      // this.error.cover_photo = '';
      this.showBtn = false;
    },
    submit()
    {
       this.$emit('next-step');
       this.$emit('next');
       this.showBtn = false;
       this.showNextButton = false;
    }
  },
  watch: {
    form: {
      handler(val)
      {
        console.log('[FormModal.vue] Form data updated: ', val)
        this.isComplete = false;
        if (
          val.event_type !== '' && val.event_name !== '' &&
          val.street_address !== '' && val.barangay !== '' &&
          val.city !== '' && val.province !== '' && val.description !== '' &&
          val.start_date !== '' && val.start_time !== '' && 
          val.end_date !== '' && val.end_time !== '' && val.cover_photo !== ''
        ) this.isComplete = true;

        if (val.start_date !== '' && val.start_time !== '' &&
          val.end_date !== '' && val.end_time !== '') {
          this.errorTime = '';

          if (!this.$moment(this.eventEnd).isAfter(this.eventStart)) { 
            this.errorTime = `The end date and time must be a date after or equal to ${this.eventStart}.`;
          }
        } else if (val.start_date === '' && val.end_date === ''){
          this.form.start_date = this.$moment().add(5, 'days').format('YYYY-MM-DD');
          this.form.end_date = this.$moment().add(5, 'days').format('YYYY-MM-DD');
        }

        
        if (this.accessType !== 'create') {
          this.form.cover = val.cover_photo;
          
          this.cover = (typeof val.cover_photo === 'string') ? val.cover_photo : val?.cover_photo ? URL.createObjectURL(val.cover_photo): '';
        } else {
          // this.cover = val.cover_photo ? URL.createObjectURL(val.cover_photo) : '';
          const pattern = new RegExp(
            '^([a-zA-Z]+:\\/\\/)?' + // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
              '(\\#[-a-z\\d_]*)?$', // fragment locator
            'i'
          );

          if (pattern.test(val.cover_photo)) {
            this.cover = val.cover_photo;
          } else if (val.cover_photo === '') {
            this.cover = '';
          } else {
            this.cover = URL.createObjectURL(val.cover_photo);
          }
        }

      },
      deep:true,
    },
    eventTypes: {
      handler(val)
      {

        if(val) this.form.event_type = val[0];
      },
      deep: true,
    }
  }
}
</script>

<style scoped>
</style>