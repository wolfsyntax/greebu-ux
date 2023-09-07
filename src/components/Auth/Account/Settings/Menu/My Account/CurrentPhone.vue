<template>
  <div class="modal update-my-account-modal" id="currentPhoneModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog ">
      <div class="modal-content">
        <button class="close-button" data-bs-dismiss="modal" aria-label="Close" ref="modalClose"><span class="material-symbols-rounded">&#xe5cd;</span></button>
        <div class="text-center modal-body">
          <svg class="phone-icon" xmlns="http://www.w3.org/2000/svg" width="77" height="76" viewBox="0 0 77 76" fill="none">
            <path d="M53.5266 2.92062C54.4917 2.92062 55.2767 3.70562 55.2767 4.67082V71.244C55.2767 72.2092 54.4917 72.9942 53.5266 72.9942H23.3896C22.4244 72.9942 21.6394 72.2092 21.6394 71.244V4.67082C21.6394 3.70562 22.4244 2.92062 23.3896 2.92062H53.5266ZM53.5266 0.417969H23.3896C21.0404 0.417969 19.1367 2.32249 19.1367 4.67082V71.244C19.1367 73.5931 21.0412 75.4968 23.3896 75.4968H53.5266C55.8757 75.4968 57.7794 73.5923 57.7794 71.244V4.67082C57.7794 2.32249 55.8757 0.417969 53.5266 0.417969Z" fill="#8690A2"/>
            <path d="M27.7598 2.08008C27.7598 4.43591 29.3089 6.36296 31.2018 6.36296H45.7138C47.6067 6.36296 49.1558 4.43591 49.1558 2.08008H27.7598ZM40.8453 4.1723H32.9486C32.7184 4.1723 32.5315 3.98543 32.5315 3.75519C32.5315 3.52494 32.7184 3.33808 32.9486 3.33808H40.8453C41.0756 3.33808 41.2624 3.52494 41.2624 3.75519C41.2624 3.98543 41.0764 4.1723 40.8453 4.1723ZM43.3864 4.33581C43.066 4.33581 42.8057 4.07553 42.8057 3.75519C42.8057 3.43485 43.066 3.17457 43.3864 3.17457C43.7067 3.17457 43.967 3.43485 43.967 3.75519C43.967 4.07553 43.7067 4.33581 43.3864 4.33581Z" fill="#8690A2"/>
          </svg>
          <h3 class="enter-phone">Enter current Phone number</h3>
          <p class="verification">Enter your current phone number for Verification</p>

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
              <label for="phone">Current phone number</label>
              <input id="currentPhoneNumber" type="text"
                class="form-control" name="phone" required v-model="phone"
                autocomplete="Current Phone Number" placeholder="+63" 
              />
              <!-- <div v-for="error in errors?.current_password" :key="error" class="text-danger">{{ error }}</div> -->
            </div>
            <div class="button-verify-wrapper">
              <button type="submit" class="btn btn-secondary submit" >Continue</button>
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
    phone: '',
    error: '',
  }),
  mounted()
  {
    const myModal = document.getElementById('currentPhoneModal');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      this.phone = '';
      this.error = '';
    });
  },
  methods: {
    ...mapActions([
      'verifyCurrentPhone',
    ]),
    close()
    {
      this.$emit('closeModal');
    },
    submit()
    {
      this.verifyCurrentPhone({ current_phone: this.phone })
        .then(res =>
        {
          console.log('\n\nVerify Current Phone: ', res)
          const { status: statusCode, data: { status } } = res;
          if (statusCode === 200 && status === 200) {
            this.$refs.modalClose.click();
            this.$emit('closeModal');
          }
        }).catch(err =>
        {
          console.log('Error: ', err)
          const { msg } = err;
          this.error = msg;
        });
    }
  }
}
</script>

<style lang="scss" scoped></style>