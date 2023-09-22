<template>
  <div class="modal fade" id="organizerStaff" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Organizer Staff</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submit" class="modal-add-member">
            <div class="container">
              <div class="row py-2">
                <div class="col">
                  <div class="form-group text-center upload-img">
                    <label class="label-img">
                      <span class="material-symbols-outlined camera-inner" v-if="!avatar">&#xe412;</span>
                      <img :src="avatar" class="img-fluid add-member-default-avatar" alt="default user avatar" v-else>
                      <div class="camera">
                        <input type="file" @input="changeImage" class="member-avatar" accept="image/png, image/webp, image/svg, image/jpeg" />
                        <!-- <span v-if="errors?.member_avatar" class="text-danger">{{ errors.member_avatar.shift() }}</span> -->
                      </div>

                      <span class="material-symbols-outlined camera-outer">&#xE412;</span>
                    </label>
                  </div>

                  <div v-for="err in errors?.member_avatar" :key="err" class="text-danger">{{ err }}</div>
                </div>
              </div>

              <div class="row py-2">
                <div class="col">
                  <div class="form-group">
                    <label for="fileUpload">Name of the Member</label>
                    <input type="text" v-model="form.member_name" placeholder="Name of the member" 
                      class="form-control member-name" required 
                    />
                    <div v-for="err in error?.member_name" :key="err" class="member-name text-danger">{{ err }}</div>
                  </div>
                </div>
              </div>

              <div class="row py-2">
                <div class="col">
                  <div class="form-group">
                    <label for="fileUpload">Role of Member</label>
                    <select v-model="form.role" class="form-select" required>
                      <option value="" selected> - Please Select Role - </option>
                      <option v-for="(member_role, index) in roles" :key="index" :value="member_role">{{ member_role }}</option>
                      <option value="others" selected>Others</option>
                    </select>

                    <br />

                    <input type="text" v-model="other" placeholder="Role of Member" class="form-control member-name" v-if="form.role === 'others'" required />

                    <div v-for="err in errors?.role" :key="err" class="text-danger">{{ err }}</div>
                  </div>
                </div>
              </div>

              <div class="row py-2">
                <div class="col text-center">
                  <button type="submit" class="btn btn-warning add-member">
                    <span>
                      <i class="busy-add-member" v-if="isLoading"></i>Add Member
                    </span>
                  </button>
                </div>
              </div>
            </div>            
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  setup () {
    

    return {}
  },
  data: () => ({
    form: {
      member_avatar: null,
      member_name: '',
      role: null,
    },
    avatar: '',
    other: '',
    errors: {},
    isLoading: false,
  }),
  props: {
    error: {
      type: Array,
      default: [],
      required: true
    },
  },
  computed: {
    ...mapGetters(['profileForm', 'myAccount', 'myAvatar',]),
    ...mapState({
      account: state => state.account,
      eventTypes: state => state.organizer.eventTypes,
      roles: state => state.organizer.staffRoles,
    })
  },
  methods: {
    submit()
    {
      
    },
    changeImage(e)
    {
      this.avatar = URL.createObjectURL(event.target.files[0]);
      this.form.member_avatar = event.target.files[0];
    }
  }
}
</script>

<style lang="scss" scoped>

</style>