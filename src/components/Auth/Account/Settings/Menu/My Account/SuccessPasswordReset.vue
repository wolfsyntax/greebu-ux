<template>
  <div class="modal update-my-account-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" id="accountSuccessUpdatePassword">
    <div class="modal-dialog">
      <div class="modal-content">
        <button class="close-button" data-bs-dismiss="modal" aria-label="Close" style="display: none;" ref="modalClose">
          <span class="material-symbols-rounded">&#xe5cd;</span>
        </button>
        <div class="modal-body text-center ">
          <svg class="check" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <g clip-path="url(#clip0_5610_68856)">
                <path d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM20 34L10 24L12.82 21.18L20 28.34L35.18 13.16L38 16L20 34Z" fill="#FF6B00"/>
              </g>
              <defs><clipPath id="clip0_5610_68856"><rect width="48" height="48" fill="white"/></clipPath></defs>
            </svg>

            <h3 class="create">Reset Password!</h3>
            <p class="proceed">Your password has been changed successfully. You can now use your new password to log in to your account!</p>
            <div class="button-verify-wrapper">
              <button type="button" class="btn btn-secondary submit update-password" @click="loginWithNewPass">Log in</button>
            </div>
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
  mounted()
  {
    const myModal = document.getElementById('accountSuccessUpdatePassword');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      this.$store.commit('CLEAR_STATE');
      this.$router.push('/login');
    });
  },
  methods: {
    ...mapActions([
      'signout',
    ]),
    async loginWithNewPass()
    {
      const self = this;

      await this.signout()
        .then(response =>
        {

          this.$refs.modalClose.click();

        }).catch(err =>
        {

        })

    }
  }
}
</script>

<style lang="scss" scoped></style>