<template>
  <div>
    <form @submit.prevent="submit">
      <div class="upload-file-wrapper" v-if="cover">
        <div class="uploaded-image-wrapper">
          <div>
            <img
              ref="uploadedImage"
              class="uploaded-image"
              :src="cover"
              alt="banner-modal"
            />
          </div>

          <button type="button" class="remove-image" @click="removeBanner">
            <span class="material-symbols-outlined">&#xe5cd;</span>
          </button>
        </div>
      </div>

      <drag-drop @dragCover="setCover" v-else />

      <div class="text-end action-btn-wrap" v-if="showGroupBtn">
        <button type="button" class="btn cancel" data-bs-dismiss="modal">
          Cancel
        </button>

        <button
          type="submit"
          class="btn next"
          :disabled="isButtonDisabled"
          v-if="enableNextButton"
        >
          Next
        </button>
        <button type="button" class="btn disabled next" v-else>
          <LoadingIndicator />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-absolute-path
import DragDrop from '/src/components/DragDrop.vue'
// eslint-disable-next-line import/no-absolute-path
import Compressor from 'compressorjs'
import { mapActions, mapGetters, mapState } from 'vuex'
// eslint-disable-next-line import/no-absolute-path
import LoadingIndicator from '/src/components/LoadingIndicator.vue'

export default {
  components: {
    DragDrop,
    LoadingIndicator
  },
  props: {
    accessType: {
      type: String,
      default: 'create',
      required: false
    }
  },
  setup () {
    return {
      showGroupBtn: true
    }
  },
  data: () => ({
    cover: '',
    enableNextButton: true
  }),

  computed: {
    ...mapGetters(['eventCover']),
    ...mapState({
      form: (state) => state.events.form
    }),
    isButtonDisabled () {
      return this.cover === ''
    }
  },
  mounted () {
    if (this.form.cover) this.cover = this.form.cover
  },
  methods: {
    ...mapActions(['fetchEventOptions', 'createEvent', 'verifyEvent']),
    toggleShowBtn () {
      this.$emit('toggle-show-btn')
    },
    setCover (val, files) {
      if (val) {
        const maxSizeBytes = 1024 * 1024 // 1 MB
        const mediumSizeBytes = 500 * 1024 // 500 KB
        const largeSizeBytes = 1500 * 1024 // 1.5 MB
        const skipCompressionSizeBytes = 100 * 1024 // 100 KB

        // eslint-disable-next-line semi
        let quality;

        if (files.size < skipCompressionSizeBytes) {
          // If the file size is less than 100KB, skip compression
          quality = 1 // Set to 1 to keep original quality
        } else if (files.size < mediumSizeBytes) {
          quality = 0.8
        } else if (files.size < maxSizeBytes) {
          quality = 0.2
        } else if (files.size <= largeSizeBytes) {
          quality = 0.4
        } else {
          quality = 0.2
        }
        // eslint-disable-next-line no-unused-vars
        const compressor = new Compressor(val, {
          quality,
          success: (result) => {
            const formData = new FormData()
            formData.append('files', result, result.name)

            this.form.cover_photo = result

            this.form.cover = URL.createObjectURL(result)

            console.log('Set Cover:: ', this.form.cover)
          },
          error: (err) => {
            console.log(err.message)
          }
        })
      }
    },
    removeBanner () {
      this.form.cover = ''
      this.form.cover_photo = ''
      this.cover = ''
    },
    submit () {
      this.$emit('next-step')
      this.$emit('next')
      this.enableNextButton = false
    }
  },
  watch: {
    showGroupBtn (newVal) {
      console.log('showBtn updated:', newVal)
    },
    form: {
      handler (val) {
        console.log('[FormModal.vue] Form data updated: ', val)
        this.isComplete = false
        if (
          val.event_type !== '' &&
          val.event_name !== '' &&
          val.street_address !== '' &&
          val.barangay !== '' &&
          val.city !== '' &&
          val.province !== '' &&
          val.description !== '' &&
          val.start_date !== '' &&
          val.start_time !== '' &&
          val.end_date !== '' &&
          val.end_time !== '' &&
          val.cover_photo !== ''
        )
          // eslint-disable-next-line curly
          this.isComplete = true

        if (
          val.start_date !== '' &&
          val.start_time !== '' &&
          val.end_date !== '' &&
          val.end_time !== ''
        ) {
          this.errorTime = ''

          if (!this.$moment(this.eventEnd).isAfter(this.eventStart)) {
            this.errorTime = `The end date and time must be a date after or equal to ${this.eventStart}.`
          }
        } else if (val.start_date === '' && val.end_date === '') {
          this.form.start_date = this.$moment()
            .format('YYYY-MM-DD')
          this.form.end_date = this.$moment()
            .format('YYYY-MM-DD')
        }

        if (this.accessType !== 'create') {
          this.form.cover = val.cover_photo

          this.cover =
            typeof val.cover_photo === 'string'
              ? val.cover_photo
              : val?.cover_photo
                ? URL.createObjectURL(val.cover_photo)
                : ''
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
          )

          if (pattern.test(val.cover_photo)) {
            this.cover = val.cover_photo
          } else if (val.cover_photo === '') {
            this.cover = ''
          } else {
            this.cover = URL.createObjectURL(val.cover_photo)
          }
        }
      },
      deep: true
    },
    eventTypes: {
      handler (val) {
        if (val) this.form.event_type = val[0]
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
