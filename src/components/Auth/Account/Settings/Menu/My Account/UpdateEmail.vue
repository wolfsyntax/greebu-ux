<template>
  <div class="modal fade update-my-account-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" id="updateEmail">
    <div class="modal-dialog">
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

          <h3 class="enter-phone">Change your Email Address</h3>
          <p class="verification">Please provide your new email address.</p>

          <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#EF4444"/>
            </svg>
            {{ error }}
            <svg xmlns="http://www.w3.org/2000/svg" style="right:20px; top: 20px; position: absolute;" width="16" height="16" viewBox="0 0 16 16" fill="none" @click="error = ''" aria-label="Close">
              <path d="M4 12L12 4M4 4L12 12" stroke="#ABADC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <form @submit.prevent="submit">
            <div class="form-group">
              <label for="email">New Email Address</label>
              <input id="newEmail" type="email" class="form-control" v-model="form.email"
                name="email" required autocomplete="Current Email Address"
              />
            </div>

            <div class="button-verify-wrapper">
              <button type="submit" class="btn btn-secondary submit" :disabled="validEmail" >Submit</button>
            </div>
          </form>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Modal } from 'bootstrap';
export default {
  setup()
  {


    return {}
  },
  data: () => ({
    error: '',
    form: {
      email: '',
    },
  }),
  mounted()
  {
    const myModal = document.getElementById('updateEmail');

    myModal.addEventListener('hide.bs.modal', () =>
    {
      this.form.email = '';
      this.error = '';
    });    
  },
  methods: {
    ...mapActions([
      'updateEmail',
    ]),
    submit()
    {
      this.updateEmail(this.form)
        .then(res =>
        {
          const { status: statusCode, data: { status } } = res;
          if (statusCode === 200 && status === 200) {
            this.$nextTick(() =>
            {
              this.$refs.modalClose.click();
              this.$emit('closeModal');

            })
          }
          console.log('Update Email response: ', res);

        }).catch(err =>
        {
          console.log('Error: ', err)
          const { msg } = err;
          this.error = msg;
        })
    }
  },
  computed: {
    validEmail()
    {
      if (this.email === '') return true;
      return (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.form.email)));
    }
  }
}
</script>

<style lang="scss" scoped></style>