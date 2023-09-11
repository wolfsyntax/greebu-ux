<template>
  <div class="modal fade update-my-account-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    id="updatePassword">
    <div class="modal-dialog ">
      <div class="modal-content">
        <button class="close-button" data-bs-dismiss="modal" aria-label="Close" ref="modalClose"><span
            class="material-symbols-rounded">&#xe5cd;</span></button>
        <div class="text-center modal-body">
          <span class="material-symbols-rounded lock">&#xe897;</span>
          <h3 class="create">Create new password</h3>
          <p class="proceed">Your new password must be different from previous used passwords</p>

          <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#EF4444"/>
            </svg>
            <span v-for="(err,index) in error?.password" :key="index">{{ err }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" style="right:20px; top: 20px; position: absolute;" width="16" height="16" viewBox="0 0 16 16" fill="none" @click="error = ''" aria-label="Close">
              <path d="M4 12L12 4M4 4L12 12" stroke="#ABADC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <form @submit.prevent="submit">
            <div class="form-group new-password">
              <label for="password">New Password</label>
              <input ref="newPasswordInput" id="password" type="password" v-model="form.password"
                class="form-control" name="password" required autocomplete="New Password" 
              />

              <span class="material-symbols-rounded toggle-password"
                :class="{ 'active': showInputNewPassword }"
                @click="toggleNewPasswordVisibility"
              >
                {{ showInputNewPassword ? "&#xe8f4" : "&#xe8f5" }}
              </span>
            </div>

            <div class="form-group">
              <label for="password">Confirm Password</label>
              <input ref="passwordInput" id="passwordConfirmation" type="password" v-model="form.password_confirmation"
                class="form-control" name="password" required autocomplete="Confirm password" 
              />
              <!-- v-model="form.password_confirmation" -->
              <span class="material-symbols-rounded toggle-password" 
                :class="{ 'active': showInputConfirmPassword }"
                @click="toggleShowConfirmPasswordVisibility"
              >
                {{ showInputConfirmPassword ? "&#xe8f4" : "&#xe8f5" }}
              </span>
              <!-- <div v-for="error in errors?.password_confirmation" :key="error" class="text-danger">{{ error }}</div> -->
            </div>

            <div class="button-verify-wrapper">
              <button type="submit" class="btn btn-secondary submit update-password" >Update Password</button>
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
    form: {
      password: '',
      password_confirmation: '',
    },
    error: null,
    showInputConfirmPassword: false,
    showInputNewPassword: false,
  }),
  mounted()
  {
    const myModal = document.getElementById('updatePassword');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      this.form = {
        password: '',
        password_confirmation: '',
      };

      this.error = null;
    });
  },
  methods: {
    ...mapActions([
      'updatePassword',
    ]),
    submit()
    {
      this.updatePassword(this.form)
        .then(res =>
        {
          const { status: statusCode, data: { status, message, result } } = res;
          if (statusCode === 200 && status === 200) {
            
            this.$refs.modalClose.click();
            this.$emit('closeModal');
          }

        }).catch(err =>
        {
          console.log('Error: ', err)
          const { data } = err;
          this.error = data;
        })
    },
    toggleShowConfirmPasswordVisibility()
    {
      this.showInputConfirmPassword = !this.showInputConfirmPassword;
      const passwordInput = this.$refs.passwordInput;
      if (passwordInput) {
        passwordInput.type = this.showInputConfirmPassword ? "text" : "password";
      }
    },
    toggleNewPasswordVisibility()
    {
      this.showInputNewPassword = !this.showInputNewPassword;
      const newPasswordInput = this.$refs.newPasswordInput;
      if (newPasswordInput) {
        newPasswordInput.type = this.showInputNewPassword ? "text" : "password";
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

<style lang="scss" scoped></style>