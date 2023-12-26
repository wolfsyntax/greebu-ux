<template>
  <div
    class="modal fade"
    id="editBandMembers"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Update Band Members</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            ref="bannerClose"
          ></button>
        </div>
        <div class="modal-body">
          <transition-group name="fade" tag="div">
            <li
              class="list-group-item"
              v-for="(mem, index) in members"
              :key="mem.id"
            >
              <div class="items">
                <img
                  @error="replaceByDefault"
                  class="avatar"
                  :src="mem.avatar"
                  alt=""
                />

                <div class="member-info">
                  <h6 class="band-name">{{ mem.member_name }}</h6>
                  <p class="band-role">{{ mem.role }}</p>
                </div>
              </div>

              <div class="options">
                <div class="d-flex align-items-center text-end">
                  <button
                    type="button"
                    class="edit-band-member-wrapper"
                    @click="toggle('members', true, index)"
                  >
                    <img
                      src="/assets/artist-account/edit-band-member.svg"
                      class="edit-band-member"
                      alt="edit band member"
                    />
                  </button>
                  <button
                    type="button"
                    @click="removeMember(mem.id)"
                    class="delete-band-member-wrapper"
                  >
                    <img
                      src="/assets/artist-account/delete-band-member.svg"
                      class="delete-band-member"
                      alt="delete band member"
                    />
                  </button>
                </div>
              </div>
            </li>
          </transition-group>
          <!-- <member-form @modalClose="dismiss" @form="updateMember" /> -->
          <button
            class="btn add-member"
            @click="
              $emit('addMember');
              $refs.bannerClose.click();
            "
          >
            <span class="material-symbols-outlined">&#xe146;</span>Add Member
          </button>
        </div>
        <div class="modal-footer justify-content-center">
          <button class="btn btn-lg save">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import MemberForm from "/src/views/Artist/Form/AddMember.vue";

export default {
  components: {
    "member-form": MemberForm,
  },
  setup() {
    return {};
  },
  data: () => ({
    visibleMemberOption: null, // Store the ID of the member with visible options
  }),
  computed: {
    ...mapGetters(["userInfo"]),
    ...mapState({
      members: (state) => state.artist.members,
    }),
  },
  methods: {
    ...mapActions([
      "fetchArtistOptions",
      "updateArtistProfile",
      "removeMember",
      "artistOptions",
      "fetchProfile",
      "fetchMember",
    ]),
    toggle(option = "members", isEdit = false, params) {
      this.social = { key: "", text: "" };

      this.$store.commit("SET_MEMBER_INDEX");

      if (isEdit && option === "links") {
        this.social = params;
      } else if (option === "members" && isEdit && params > -1) {
        this.$store.commit("SET_MEMBER_INDEX", params);
      }

      const body = document.querySelector("body");
      this.active = !this.active;
      this.active
        ? body.classList.add("modal-open")
        : body.classList.remove("modal-open");
    },
    updateMember(val) {
      if (val) {
        this.members.push(val);
      }

      this.$store.commit("SET_MEMBER_INDEX");

      this.dismiss();
    },
    showMemberOptions(memberId) {
      if (this.visibleMemberOption === memberId) {
        this.visibleMemberOption = null;
      } else {
        this.visibleMemberOption = memberId;
      }
    },
  },
};
</script>

<style scoped></style>
