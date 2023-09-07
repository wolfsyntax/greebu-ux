<template>
  <div class="modal fade update-my-account-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" id="accountVerifyEmail">
    <div class="modal-dialog ">
      <div class="modal-content">
        <button class="close-button" data-bs-dismiss="modal" aria-label="Close" ref="modalClose"><span class="material-symbols-rounded">&#xe5cd;</span></button>
        <div class="text-center modal-body">
          <svg class="email-icon" xmlns="http://www.w3.org/2000/svg" width="77" height="76" viewBox="0 0 77 76" fill="none">
            <g clip-path="url(#clip0_5628_93086)">
              <path d="M68.8084 65.4316H8.10727C4.14306 65.4316 0.917969 62.2057 0.917969 58.2414V17.6717C0.917969 13.7075 4.14306 10.4824 8.10727 10.4824H68.8084C72.7726 10.4824 75.9977 13.7075 75.9977 17.6717V58.2423C75.9977 62.2057 72.7726 65.4316 68.8084 65.4316ZM8.10727 13.8185C5.98335 13.8185 4.25484 15.547 4.25484 17.6717V58.2423C4.25484 60.367 5.98335 62.0947 8.10727 62.0947H68.8084C70.9331 62.0947 72.6608 60.367 72.6608 58.2423V17.6717C72.6608 15.5478 70.9331 13.8193 68.8084 13.8193L8.10727 13.8185Z" fill="#8690A2"/>
              <path d="M38.458 41.2697C37.5054 41.2697 36.5527 41.0645 35.6651 40.6549L1.88672 25.0525L3.28654 22.0234L37.0641 37.6258C37.95 38.0346 38.9652 38.0354 39.852 37.6258L73.5578 22.0568L74.9576 25.0859L41.2518 40.654C40.3634 41.0645 39.4115 41.2697 38.458 41.2697Z" fill="#8690A2"/>
            </g>
            <defs><clipPath id="clip0_5628_93086"><rect width="76" height="76" fill="white" transform="translate(0.5)"/></clipPath></defs>
          </svg>

          <h3 class="enter-phone">Please verify your Email</h3>
          <p class="review">Please review your email inbox for the email verification message that has been sent to:</p>
          <h5 class="hidden-phone">{{ user?.email }}</h5>
          <form>
            <div class="button-verify-wrapper">
              <button type="button" class="btn btn-secondary submit">Resend (180s)</button>
            </div>
          </form>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  setup()
  {


    return {}
  },
  data: () => ({

  }),
  mounted()
  {
    
  },
  methods: {
    submit()
    {
      
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
}
</script>

<style lang="scss" scoped></style>