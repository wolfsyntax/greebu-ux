<template>
  <div class="modal update-my-account-modal" id="currentEmailModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog ">
      <div class="modal-content">
        <button class="close-button" data-bs-dismiss="modal" aria-label="Close" ref="modalClose"><span class="material-symbols-rounded">&#xe5cd;</span></button>
        <div class="modal-body text-center">
          <svg class="email-icon" xmlns="http://www.w3.org/2000/svg" width="77" height="76" viewBox="0 0 77 76" fill="none">
            <g clip-path="url(#clip0_5628_93086)">
              <path d="M68.8084 65.4316H8.10727C4.14306 65.4316 0.917969 62.2057 0.917969 58.2414V17.6717C0.917969 13.7075 4.14306 10.4824 8.10727 10.4824H68.8084C72.7726 10.4824 75.9977 13.7075 75.9977 17.6717V58.2423C75.9977 62.2057 72.7726 65.4316 68.8084 65.4316ZM8.10727 13.8185C5.98335 13.8185 4.25484 15.547 4.25484 17.6717V58.2423C4.25484 60.367 5.98335 62.0947 8.10727 62.0947H68.8084C70.9331 62.0947 72.6608 60.367 72.6608 58.2423V17.6717C72.6608 15.5478 70.9331 13.8193 68.8084 13.8193L8.10727 13.8185Z" fill="#8690A2"/>
              <path d="M38.458 41.2697C37.5054 41.2697 36.5527 41.0645 35.6651 40.6549L1.88672 25.0525L3.28654 22.0234L37.0641 37.6258C37.95 38.0346 38.9652 38.0354 39.852 37.6258L73.5578 22.0568L74.9576 25.0859L41.2518 40.654C40.3634 41.0645 39.4115 41.2697 38.458 41.2697Z" fill="#8690A2"/>
            </g>
            <defs><clipPath id="clip0_5628_93086"><rect width="76" height="76" fill="white" transform="translate(0.5)"/></clipPath></defs>
          </svg>
          
          <h3 class="enter-phone">Enter your Email Address</h3>
          <p class="verification">Enter your current email address for verification.</p>

          <div v-if="error" class="alert alert-danger" role="alert">
            <div class="left">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#EF4444"/>
              </svg>
              <p class="err-msg">{{ error }}</p>
            </div>

            <div class="right">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M4 4L12 12" stroke="#ABADC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <form @submit.prevent="submit">
            <div class="form-group">
              <label for="email">Current Email Address</label>
              <input id="currentEmail" type="email" class="form-control" v-model="email" 
                name="email" required autocomplete="Current Email Address"
              />
              <!-- <div v-if="error" class="text-danger">{{ error }}</div> -->
            </div>
            <div class="button-verify-wrapper">
              <button type="submit" class="btn btn-secondary submit" :disabled="validEmail">Continue</button>
            </div> 
          </form>      
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  setup()
  {


    return {}
  },
  data: () => ({
    email: '',
    error: '',
  }),
  mounted()
  {
    this.email = '';
    this.error = '';
    const myModal = document.getElementById('currentEmailModal');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      this.email = '';
      this.error = '';
    })

  },
  methods: {
    ...mapActions([
      'verifyCurrentEmail',
    ]),
    submit()
    {
      console.log('Current Email')
      this.verifyCurrentEmail({ current_email: this.email })
      .then(res =>
      {
        const { status: statusCode, data: { status } } = res;
        if (statusCode === 200 && status === 200)
        {
          this.$refs.modalClose.click();
          this.$emit('closeModal');
        }
        console.log('\n\nVerify Current Email (response):', res);
        // document.querySelector("body").classList.remove("modal-open");
      }).catch(err =>
      {
        console.log('Error: ', err)
        const { msg } = err;
        this.error = msg;
      })
    },

  },
  computed: {
    validEmail()
    {
      if (this.email === '') return true;
      return (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)));
    }
  }
}
</script>
<style scoped>
  .modal-header {
    border-bottom: none !important;
  }

  .modal.update-my-account-modal .modal-content {
    left: -6rem!important;
  }
  
  .modal.update-my-account-modal .modal-content .modal-body {
    top: -1rem!important;
  }

  .update-my-account-modal {

  }

  .update-my-account-modal .modal-header .btn-close {
    position: absolute;
    
    top: 1.1rem !important;
    right: 1rem !important;
    background-color: transparent;
    border: none !important;
    cursor: pointer;
  }

  .update-my-account-modal .modal-header .btn-close span{
    font-size: 1.2rem;
    padding: 0.33rem;
    border: 1px solid var(--gray6);
    border-radius: 100px;
  }

  .update-my-account-modal .modal-content {
  background-color: var(--white);
  padding: 6rem 6rem 3rem;
  width: 43.125rem;
  margin: 100px auto;
  border-radius: 5px;
  position: relative;
  border-radius: 0.75rem;
  box-shadow: 0px 4px 28px 0px rgba(18, 18, 18, 0.12);
}
</style>
