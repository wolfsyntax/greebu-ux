<template>
    <div class="modal fade" id="editBandMembers" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Band Members</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="bannerClose" ></button>
          </div>
          <div class="modal-body">
            <div class="band-members-list" v-for="member in members" :key="member.id">
              <div class="d-flex align-items-center justify-content-between member-info-wrapper">
                <div class="d-flex align-items-center member-info">
                  <img :src="member.avatar" alt="Member profile">
                  <div class="member-name">
                    <a class="name">{{ member.member_name }}</a>
                    <p class="role">{{ member.role }}</p>
                  </div>
                </div>
                <div class="more-options">
                  <span class="material-symbols-rounded" @click="showMemberOption">&#xe5d3;</span>
                </div>
              </div>
            </div>

            <div class="hidden-more-options" v-if="hiddenMemberOption">
              <button class="btn">Remove Member</button>
              <button class="btn">Edit</button>
            </div>
    
          </div> 
  
          <div class="modal-footer justify-content-center" >
            <button class="btn btn-lg save">Save</button>
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
      hiddenMemberOption: false,
    }),
    computed: {
    ...mapGetters(["userInfo"]),
    ...mapState({
      members: (state) => state.artist.members,
    }),
  
  },
    methods: {
      showMemberOption(){
        this.hiddenMemberOption = !this.hiddenMemberOption;
      }
 
  
      },

  }
  </script>
  
  <style scoped>
  
  </style>
  