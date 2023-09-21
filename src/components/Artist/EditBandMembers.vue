<template>
    <div class="modal fade" id="editBandMembers" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Band Members</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="bannerClose" ></button>
          </div>
          <div class="modal-body">
            <transition-group name="fade" tag="div">
            <div class="band-members-list" v-for="member in members" :key="member.id">
              <div class="d-flex align-items-center justify-content-between member-info-wrapper">
                <div class="d-flex align-items-center member-info">
                  <img :src="member.avatar" alt="Member profile">
                  <div class="member-name">
                    <a href="#" class="name">{{ member.member_name }}</a>
                    <p class="role">{{ member.role }}</p>
                  </div>
                </div>
                <div class="more-options">
                  <span class="material-symbols-rounded" @click="showMemberOptions(member.id)">&#xe5d3;</span>
                </div>
                  <div class="hidden-more-options" 
                  v-if="visibleMemberOption === member.id">
                    <button class="btn" @click="removeMember(member.id)">Remove Member</button>
                    <button class="btn" @click="toggle('members', true, index)">Edit Member</button>
                  </div>
              </div>
            </div>
          </transition-group>
            <button class="btn add-member"  @click="toggle('members', false, -1)"><span class="material-symbols-outlined">&#xe146;</span>Add Member</button>
          </div> 
          <!-- <member-form @modalClose="dismiss" @form="updateMember" /> -->
          <div class="modal-footer justify-content-center" >
            <button class="btn btn-lg save">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapState, mapActions } from "vuex";
  import MemberForm from '/src/views/Artist/Form/AddMember.vue';

  export default {
    components: {
    'member-form': MemberForm,
  },
    setup () {
  
      return {}
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
      'fetchArtistOptions', 'updateArtistProfile', 'removeMember', 'artistOptions', 'fetchProfile', 'fetchMember',
    ]),
      toggle(option = 'members', isEdit = false, params)
    {

      this.social = { key: '', text: '' };

      this.$store.commit('SET_MEMBER_INDEX');
      
      if (isEdit && option === 'links') {
        this.social = params;
      } else if (option === 'members' && isEdit && params > -1) {
        this.$store.commit('SET_MEMBER_INDEX', params);
      } 

      const body = document.querySelector("body")
      this.active = !this.active
      this.active ? body.classList.add("modal-open") : body.classList.remove("modal-open")
      
    },
    updateMember(val)
    {
      if (val) {
        this.members.push(val);
      }

      this.$stor.commit('SET_MEMBER_INDEX');

      this.dismiss()
    },
    showMemberOptions(memberId){
        if(this.visibleMemberOption === memberId){
          this.visibleMemberOption = null;
        }else{
          this.visibleMemberOption = memberId;
        }
      },
  
  },

  }
  </script>
  
  <style scoped>
  
  </style>
  