<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Verify Your Email Address</div>

            <div class="card-body">
              <div class="alert alert-success" role="alert" v-if="isResent">
                A fresh verification link has been sent to your email address.
              </div>

              <p>Before proceeding, please check your email for a verification link.</p>
              <p>If you did not receive the email,</p>
              
              <form class="d-inline" @submit.prevent="resendLink()">
                @csrf
                <button type="submit" class="btn btn-link p-0 m-0 align-baseline">click here to request another</button>.
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    

    return {}
  },
  data: () => ({
    isResent: false,
  }),
  mounted() {
    
  },
  methods: {
    resendLink()
    {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>