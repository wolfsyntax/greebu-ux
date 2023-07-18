<template>
  <div>
    <Layout>
      <div class="px-4 py-6 sm:px-0">
        <div class="row">
          <h3>My Profile</h3>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-12">
              <h5>Personal Details</h5>
            </div>
          </div>

          <form class="" @submit.prevent="submit">

            <div class="row d-flex justify-content-center">
              <div class="col-12">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <input type="file" @input="form.avatar = $event.target.files[0]" accept="image/png, image/webp, image/svg, image/jpeg"/>
                    <div v-if="errors?.avatar">{{ errors.avatar }}</div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="form-group">
                      <label for="firstName">First name</label>
                      <input type="text" class="form-control" id="firstName" aria-describedby="First name"
                        v-model="form.first_name" autocomplete="off" placeholder="First name">
                      <small v-if="errors.first_name" class="text-danger">{{ errors.first_name.shift() }}</small>
                    </div>
                  </div>

                  <div class="col-12 col-md-6">
                    <div class="form-group">
                      <label for="lastName">Last name</label>
                      <input type="text" class="form-control" id="lastName" aria-describedby="Last name"
                        v-model="form.last_name" autocomplete="off" placeholder="Last name">
                      <small v-if="errors.last_name" class="text-danger">{{ errors.last_name.shift() }}</small>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 col-md-4">
                    <div class="form-group">
                      <label for="email">Username</label>
                      <input type="text" class="form-control" id="username" aria-describedby="Username"
                        v-model="form.username" autocomplete="off" placeholder="Username">
                      <small v-if="errors.username" class="text-danger">{{ errors.username.shift() }}</small>
                    </div>
                  </div>

                  <div class="col-12 col-md-4">
                    <div class="form-group">
                      <label for="username">Email</label>
                      <input type="email" class="form-control" id="email" aria-describedby="Email"
                        v-model="form.email" autocomplete="email" placeholder="Email">
                      <small v-if="errors.email" class="text-danger">{{ errors.email.shift() }}</small>
                    </div>
                  </div>

                  <div class="col-12 col-md-4">
                    <div class="form-group">
                      <label for="email">Phone</label>
                      <input type="text" class="form-control" id="phone" aria-describedby="Phone"
                        v-model="form.phone" autocomplete="phone" placeholder="Phone">
                      <small v-if="errors.phone" class="text-danger">{{ errors.phone.shift() }}</small>
                    </div>
                  </div>

                </div>

                <div class="row mt-5">
                  <div class="col-12">
                    <h5>Password</h5>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-12 col-md-4">
                    <div class="form-group">
                      <label for="currentPassword">Current Password</label>
                      <input type="password" class="form-control" id="currentPassword" aria-describedby="Current Password"
                        v-model="form.current_password" autocomplete="current-password"
                        placeholder="Current Password">
                      <small v-if="errors.current_password" class="text-danger">{{ errors.current_password.shift() }}</small>
                    </div>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-12 col-md-4">
                    <div class="form-group">
                      <label for="newPassword">New Password</label>
                      <input type="password" class="form-control" id="newPassword" aria-describedby="New Password"
                        v-model="form.password" autocomplete="new-password" placeholder="New Password" />
                      <small v-if="errors.password" class="text-danger">{{ errors.password.shift() }}</small>
                    </div>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-12 col-md-4">
                    <div class="form-group">
                      <label for="confirmPassword">Confirm Password</label>
                      <input type="password" class="form-control" id="confirmPassword" aria-describedby="Confirm Password"
                        autocomplete="new-password" v-model="form.password_confirmation"
                        placeholder="Confirm Password">
                      <small id="emailHelp" class="form-text text-muted"></small>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div class="row my-3">
              <div class="col-12 col-md-4">
                <div class="form-group">
                  <button type="submit" class="btn btn-success">Update Profile</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>

  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  watch: {

  },
  data()
  {
    return {
      form: {
        avatar: null,
        first_name: null,
        last_name: null,
        email: null,
        username: null,
        phone: null,
        password: null,
        current_password: null,
        password_confirmation: null,
      },
      errors: {},
    }
  },
  props: {

  },
  mounted()
  {
    this.form = this.profileForm
  },
  methods: {
    ...mapActions([
      'updateUserProfile',
    ]),
    submit()
    {

      if (this.form.avatar === null) delete this.form.avatar;

      this.updateUserProfile(this.form)
        .then(response =>
        {
          const { status, result, message } = response;
          if (status === 422)
          {
            this.errors = result.errors
            // this.$vs.notification({
            //   color: 'danger',
            //   position: 'top-right',
            //   title: 'Customer Profile',
            //   text: `${message}`
            // })
          } else {

            // this.$vs.notification({
            //   color: 'success',
            //   position: 'top-right',
            //   title: 'Customer Profile',
            //   text: `${message}`
            // })
          }
          
        })
        .catch(err =>
        {
          console.log('Err: ', err)
          // this.$vs.notification({
          //   color: 'danger',
          //   position: 'top-right',
          //   title: 'Server Status',
          //   text: `${err.message}`
          // })
        })
    }
  },
  computed: {
    ...mapGetters(["profileForm"]),
    ...mapState({}),
  }
}
</script>
