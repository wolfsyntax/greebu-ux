<template>
  <div class="modal fade update-my-account-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    id="currentPasswordModal">
    <div class="modal-dialog ">
      <div class="modal-content">
        <button class="close-button" data-bs-dismiss="modal" aria-label="Close" ref="modalClose">
          <span class="material-symbols-rounded">&#xe5cd;</span>
        </button>
        <div class="text-center modal-body">
          <span class="material-symbols-rounded lock">&#xe897;</span>
          <h3 class="create">Create new password</h3>
          <p class="proceed">To proceed with changing your password, please enter your current password for verification.</p>
          <div v-if="error" class="d-flex align-items-center justify-content-between alert alert-danger alert-dismissible fade show" role="alert">
            <div class="d-flex align-items-center">
              <span class="material-symbols-rounded danger">&#xe000;</span>
            <p class="error">{{ error }}</p>
            </div>
            <span class="material-symbols-rounded close" @click="error = ''" aria-label="Close">&#xe5cd;</span>
          </div>
          <form @submit.prevent="submit">
            <div class="form-group">
              <label for="password">Current password</label>
              <input ref="passwordInput" id="currentPassword" type="password" v-model="form.current_password"
                class="form-control" name="password" required autocomplete="Current Password" 
              />
              <!-- v-model="form.current_password" -->
              <span class="material-symbols-rounded toggle-password"
                :class="{ 'active': showInputPassword }"
                @click="toggleCurrentPasswordVisibility"
              >
                {{ showInputPassword ? "&#xe8f4" : "&#xe8f5" }}
              </span>
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
import { mapState, mapActions } from "vuex";

export default {
  setup()
  {


    return {}
  },
  data: () => ({
    showInputPassword: false,
    error: '',
    form: {
      current_password: '',
    }
  }),
  mounted()
  {
    const myModal = document.getElementById('currentPasswordModal');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      this.showInputPassword = false;
      this.form.current_password = '';
      this.error = '';
    });
  },
  methods: {
    ...mapActions([
      'verifyCurrentPassword',
    ]),
    submit()
    {
      this.verifyCurrentPassword(this.form)
        .then(res =>
        {
          const { status: statusCode, data: { status } } = res;
          if (statusCode === 200 && status === 200) {
            this.$refs.modalClose.click();
            this.$emit('closeModal');

          }

          // document.querySelector("body").classList.remove("modal-open");
        }).catch(err =>
        {
          console.log('Error: ', err)
          const { msg } = err;
          this.error = msg;
        })
    },
    toggleCurrentPasswordVisibility()
    {
      this.showInputPassword = !this.showInputPassword;
      const passwordInput = this.$refs.passwordInput;
      if (passwordInput) {
        passwordInput.type = this.showInputPassword ? "text" : "password";
      }
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
}
</script>

<style scoped>

</style>