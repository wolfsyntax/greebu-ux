<template>
    <div class="modal fade" id="changePlanSubscription" data-bs-backdrop="static" data-bs-keyboard="false" 
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
      <div class="modal-dialog modal-lg">
        <div class="modal-content border-0">
          <div class="modal-header p-0 border-0">
            <div>
                <h3 class="mb-0 modal-title">Upgrade to Yearly</h3>
            </div>
            <CloseModalButton />
          </div>
          <div class="modal-body p-0">
                <div class="upgrade-wrap">
                    <p class="question">Are you sure you want to upgrade to the Yearly plan? You will be billed the yearly rate of [Yearly Price].</p>
                    <p class="note">Please note your first charge will occur on October 27,2024</p>
                </div>
          </div>

          <div class="modal-footer p-0 border-0">
            <button type="button" class="btn btn-secondary confirm" @click="confirm">
              <Loading :infoText="buttonName" v-if="isLoading"/>
              <span v-else>{{ buttonName }}</span>
            </button>
            <button type="button" class="btn btn-primary cancel" data-bs-dismiss="modal">Cancel</button>
          </div>

        </div>
      </div>
    </div>
  </template>
  
  <script >
  import { mapActions, mapState } from 'vuex';
  import CloseModalButton from '../../../../../CloseModalButton.vue';
  import Loading from '../../../../../Loading.vue';

export default {
components: {
    CloseModalButton,
    Loading
},  
created () {
},
watch: {
},
props: {
},
data: () => ({
    buttonName: 'Confirm '
}),
methods: {

},
mounted() {
},
computed: {
}
}
</script>
  
<style lang="scss" scoped>

</style>