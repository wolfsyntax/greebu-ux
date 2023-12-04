<template>
    <!-- Modal -->
<div class="modal fade" id="exampleModalUpdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Update Band Member</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <form @submit.prevent="submit" class="modal-add-member">
       
       <div class="form-group text-center upload-img">
         <label class="label-img">
           <span class="material-symbols-outlined camera-inner" v-if="!avatar">&#xe412;</span>
           <img :src="avatar" class="img-fluid add-member-default-avatar" alt="default user avatar" v-else>
           <div class="camera">
             <input type="file" @input="changeImage" class="member-avatar"
               accept="image/png, image/webp, image/svg, image/jpeg" />
           </div>
           <span class="material-symbols-outlined camera-outer">&#xE412;</span>
         </label>
       </div>
       <div v-for="err in errors?.member_avatar" :key="err" class="text-danger">{{ err }}</div>
  
       <div class="form-group">
         <label for="fileUpload">Name of the Member</label>
         <input type="text" v-model="form.member_name" placeholder="Name of the member"
           class="form-control member-name" required />
         <div v-for="err in error?.member_name" :key="err" class="member-name text-danger">{{ err }}</div>
       </div>
   
       <div class="form-group form-group-last">
         <label for="fileUpload">Role of Member</label>
         <select v-model="form.role" class="form-select" required>
           <option value="" selected> - Please Select Role - </option>
           <option v-for="member_role in roles" :key="member_role.id" :value="member_role.value">{{ member_role.label
           }}</option>
         </select>
         <br />

         <input type="text" v-model="other" placeholder="Role of Member" class="form-control member-name"
           v-if="form.role === 'others'" required />
         <div v-for="err in errors?.role" :key="err" class="text-danger">{{ err }}</div>
       </div>

       <button class="btn btn-warning add-member" @click="updateUserMember"> Update Member</button>
 
</form>
        
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>
  </template>
  
  <script>
  import { mapGetters, mapState, mapActions } from "vuex";

  export default {
    components: {
  },
  props: {
    members: Object
  },
    setup () {
  
      return {
        form: {
        member_avatar: null,
        member_name: '',
        role: null,
      },
      avatar: '',
      other: '',
      errors: {},
      roles: [
        { id: '1', value: 'vocalist', label: 'Vocalist', },
        { id: '2', value: 'drummer', label: 'Drummer', },
        { id: '3', value: 'lead guitarist', label: 'Lead Guitarist' },
        { id: '4', value: 'rhythm guitarist', label: 'Rhythm Guitarist' },
        { id: '5', value: 'bassist', label: 'Bassist', },
        { id: '6', value: 'keyboardist', label: 'Keyboardist', },
        { id: '7', value: 'others', label: 'Others' },
      ],
      isLoading: false,

      }
    },
    data: () => ({
    }),
    computed: {
    ...mapGetters(["userInfo", "memberInfo"]),
    ...mapState({
      artistTypes: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
      members: (state) => state.artist.members,
      member: state => state.artist.member,
      idx: state => state.artist.memIndex
    }),
  },
    methods: {
      ...mapActions([
      'fetchArtistOptions', 'updateArtistProfile', 'removeMember', 'artistOptions', 'fetchProfile', 'fetchMember', 'updateMember'
    ]),


    updateUserMember(){
        this.$emit('updateBandMember', this.form);
    }
    
  
  },
  watch: {
  },

  mounted()
  {

    if (Object.keys(this.member).length > 0) {

      if (!(this.roles.filter(el => el.value.toLocaleLowerCase() === this.member.role.toLocaleLowerCase()).length > 0)) {
        this.other = this.member?.role || '';
      } else {
        this.other = '';
      }

      this.form = {
        member_avatar: this.member?.avatar || '',
        member_name: this.member?.member_name || '',
        role: this.roles.filter(el => el.value.toLocaleLowerCase() === this.member.role.toLocaleLowerCase()).length > 0 ? (this.member?.role.toLowerCase() || '') : 'others',
      };

      this.avatar = this.member?.avatar || '';

    } else {

      this.form = {
        member_avatar: '',
        member_name: '',
        role: '',
      };

      this.avatar = '';
      this.other = '';
    }

  },
  created() {
    

  },

  }
  </script>
  
  <style scoped>
  
  </style>
  