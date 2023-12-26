<template>
  <div
    class="modal fade"
    id="organizerStaff"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div
          class="modal-header border-bottom-0 p-0 d-flex align-items-start justify-content-between"
        >
          <div>
            <h3 class="modal-title" id="staticBackdropLabel">
              Add Organizer Staff
            </h3>
            <p class="mb-0 sub-title">
              Assign additional team members to organize seamlessly.
            </p>
          </div>
          <div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="staffFormDismiss"
            ></button>
            <!-- <CloseModalButton /> -->
          </div>
        </div>
        <div class="modal-body p-0">
          <form @submit.prevent="submit" class="modal-add-member">
            <div class="form-group text-center upload-img">
              <label class="label-img">
                <span
                  class="material-symbols-outlined camera-inner"
                  v-if="!avatar"
                  >&#xe412;</span
                >
                <img
                  :src="avatar"
                  class="img-fluid add-member-default-avatar"
                  alt="default user avatar"
                  v-else
                />
                <div class="camera">
                  <!-- <button type="button" class="btn btn-success" @click="toggleProfile" data-bs-toggle="modal" data-bs-target="#uploadProfilePhoto">
                          <span class="material-symbols-outlined">&#xE412;</span>
                        </button> -->

                  <input
                    type="file"
                    @input="changeImage"
                    class="member-avatar"
                    accept="image/png, image/webp, image/svg, image/jpeg"
                  />
                  <!-- <span v-if="errors?.member_avatar" class="text-danger">{{ errors.member_avatar.shift() }}</span> -->
                </div>

                <span class="material-symbols-outlined camera-outer"
                  >&#xE412;</span
                >
              </label>
            </div>

            <div
              v-for="err in errors?.member_avatar"
              :key="err"
              class="text-danger"
            >
              {{ err }}
            </div>

            <div class="form-group">
              <label for="fileUpload">Name of the Member</label>
              <input
                type="text"
                v-model="form.member_name"
                placeholder="Name of the member"
                class="form-control member-name"
                required
              />
              <div
                v-for="err in errors?.member_name"
                :key="err"
                class="member-name text-danger"
              >
                {{ err }}
              </div>
            </div>

            <div class="form-group form-group-last">
              <label for="fileUpload">Role of Member</label>
              <select v-model="form.role" class="form-select" required>
                <option value="" selected>- Please Select Role -</option>
                <option
                  v-for="(member_role, index) in roles"
                  :key="index"
                  :value="member_role"
                >
                  {{ member_role }}
                </option>
                <option value="others" selected>Others</option>
              </select>

              <br />

              <input
                type="text"
                v-model="other"
                placeholder="Role of Member"
                class="form-control member-name"
                v-if="form.role === 'others'"
                required
              />

              <div v-for="err in errors?.role" :key="err" class="text-danger">
                {{ err }}
              </div>
            </div>

            <div class="col text-center">
              <button
                type="submit"
                class="btn btn-warning add-member"
                v-if="showAddMemBtn"
              >
                Add Member
              </button>
              <button
                type="button"
                class="btn btn-warning disabled add-member"
                v-else
              >
                <LoadingIndicator />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- <profile-modal 
  @close="toggleProfile"
    @formDataUpdated="handleStaffAvatarUpdate"
    page="page3"
     /> -->
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import CloseModalButton from "/src/components/CloseModalButton.vue";
//import ProfileModal from '/src/components/Dashboard/Modals/ProfileModal.vue';
//import { Modal } from "bootstrap";
import LoadingIndicator from "/src/components/LoadingIndicator.vue";

export default {
  components: {
    CloseModalButton,
    LoadingIndicator,
    //ProfileModal
  },
  setup() {
    return {};
  },
  data: () => ({
    showAddMemBtn: true,
    form: {
      member_avatar: "",
      member_name: "",
      role: "",
    },
    avatar: "",
    other: "",
    errors: {},
    parentAvatar: "",
  }),
  props: {
    // error: {
    //   type: Array,
    //   default: [],
    //   required: true
    // },
  },
  computed: {
    ...mapGetters(["profileForm", "myAccount", "myAvatar", "getStaff"]),
    ...mapState({
      account: (state) => state.account,
      eventTypes: (state) => state.organizer.eventTypes,
      roles: (state) => state.organizer.staffRoles,
      pos: (state) => state.organizer.staffIndex,
      member: (state) => state.organizer.staffFilter,
      role: (state) => state.organizer.staffRole,
    }),
  },
  unmounted() {
    console.log("\n\nUnmount Staff Form\n");
  },
  mounted() {
    const myModal = document.getElementById("organizerStaff");

    myModal.addEventListener("hide.bs.modal", () => {
      this.form = {
        member_avatar: "",
        member_name: "",
        role: "",
      };

      this.avatar = "";
      this.other = "";
      this.errors = {};

      this.fetchStaff();
      this.SET_STAFF_FILTER();
    });
  },
  methods: {
    ...mapActions(["addStaff", "fetchStaff", "editStaff"]),
    ...mapMutations(["SET_STAFF_FILTER"]),
    handleStaffAvatarUpdate(blob) {
      if (blob instanceof Blob) {
        this.parentAvatar = URL.createObjectURL(blob);
        this.avatar = this.parentAvatar;
        console.log("set image", this.avatar);

        // this.form.member_avatar = this.avatar;
      } else {
        this.avatar = "";
      }
    },

    submit() {
      this.showAddMemBtn = false;
      if (Object.keys(this.member).length > 0) {
        if (this.other !== "" && this.form.role === "others") {
          this.form.role = this.other;
        }

        if (typeof this.form.member_avatar === "string") {
          this.form.member_avatar = "";
        }

        this.editStaff(this.form)
          .then((response) => {
            this.$emit("form", this.form);
            this.$refs.staffFormDismiss.click();
            this.showAddMemBtn = true;
          })
          .catch((err) => {
            const { status, message, result } = err;
            if (result.hasOwnProperty("errors")) this.errors = result.errors;
          });
      } else {
        if (this.other !== "") {
          this.form.role = this.other;
        }

        this.addStaff(this.form)
          .then((response) => {
            this.$emit("form", this.form);
            this.$refs.staffFormDismiss.click();
            this.showAddMemBtn = true;
          })
          .catch((err) => {
            const { status, message, result } = err;
            if (result.hasOwnProperty("errors")) this.errors = result.errors;
          });
      }
    },
    changeImage(e) {
      const file = event.target.files[0];
      if (file) {
        this.avatar = URL.createObjectURL(file);
        this.form.member_avatar = file;
      }
    },
  },
  watch: {
    form(val) {
      if (val) {
        if (val.role !== "others") this.other = "";
      }
    },
    member(cur, prev) {
      if (Object.keys(cur).length > 0) {
        const { avatar, id, member_name, role } = cur;

        this.form = {
          id,
          member_avatar: avatar || "",
          member_name,
          role:
            this.roles.filter(
              (el) => el.toLocaleLowerCase() === cur.role.toLocaleLowerCase()
            ).length > 0
              ? cur.role.toLowerCase() || ""
              : "others",
        };

        this.avatar = avatar || "";
        this.other = role;

        if (this.form.role !== "others") {
          this.form.role = role;
        }
        console.log("Staff Form: ", this.form);
      }
      // if (Object.keys(this.member).length > 0) {

      //   var member_role = this.roles.filter(el => el.toLocaleLowerCase() === this.member.role.toLocaleLowerCase()).length > 0
      //     ? (this.member?.role.toLowerCase() || '')
      //     : 'others';

      //   if (member_role === 'others') {

      //     this.other = this.role;
      //     this.form.role = 'others';

      //   }

      // }
    },
  },
};
</script>

<style lang="scss" scoped></style>
