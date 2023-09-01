<template>
  <div>
    <form @submit.prevent="submit" class="modal-add-member">
      <div class="container">
        <div class="row py-2">
          <div class="col">
            <!-- <input type="file" @input="form.member_avatar = $event.target.files[0]" class="member-avatar" accept="image/png, image/webp, image/svg, image/jpeg"/>
            <span v-if="errors?.member_avatar" class="text-danger">{{ errors.member_avatar }}</span> -->

            <div class="form-group text-center upload-img">
              <label class="label-img">
                <span class="material-symbols-outlined camera-inner" v-if="!avatar">&#xe412;</span>
                <img :src="avatar" class="img-fluid add-member-default-avatar" alt="default user avatar" v-else>
                <div class="camera">
                  <input type="file" @input="changeImage" class="member-avatar"
                    accept="image/png, image/webp, image/svg, image/jpeg" />
                  <!-- <span v-if="errors?.member_avatar" class="text-danger">{{ errors.member_avatar.shift() }}</span> -->
                </div>
                <span class="material-symbols-outlined camera-outer">&#xE412;</span>
              </label>
              <!-- see https://stackoverflow.com/questions/2855589/replace-input-type-file-by-an-image#answer-18803568 -->
            </div>
            <div v-for="err in errors?.member_avatar" :key="err" class="text-danger">{{ err }}</div>
          </div>
        </div>

        <div class="row py-2">
          <div class="col">
            <div class="form-group">
              <label for="fileUpload">Name of the Member</label>
              <input type="text" v-model="form.member_name" placeholder="Name of the member"
                class="form-control member-name" required />
              <!-- <span v-if="errors?.member_name" class="member-name text-danger">errors.member_name.shift()</span> -->
              <!-- <div v-for="err in errors?.member_name" :key="err" class="text-danger">{{ err }}</div> -->
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
                <option v-for="member_role in roles" :key="member_role.id" :value="member_role.value">{{ member_role.label
                }}</option>
              </select>
              <br />

              <input type="text" v-model="other" placeholder="Role of Member" class="form-control member-name"
                v-if="form.role === 'others'" required />
              <!-- <span v-if="errors?.role" class="role-error text-danger">{{ errors.role.shift() }}</span> -->
              <div v-for="err in errors?.role" :key="err" class="text-danger">{{ err }}</div>
            </div>
          </div>
        </div>
        <div class="row py-2">
          <div class="col text-center">
            <button type="submit" class="btn btn-warning add-member">
              <span v-if="isLoading">
                <i class="busy-add-member"></i>Add Member
              </span>
              <span v-else>
                Add Member
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Layout from '@/components/Layouts/ArtistLayout.vue';
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    layout: Layout,
  },
  data() {
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
  setup() {

  },
  props: {
    error: {
      type: Array,
      default: [],
      required: true
    },
    memberIndex: {
      type: Number,
      default: -1,
      required: false,
    }
  },
  watch: {

  },
  mounted()
  {
    // this.form = {
    //   member_avatar: '',
    //   member_name: '',
    //   role: '',
    // };

    if (this.memberIndex > -1) {

      this.form = {
        member_avatar: this.members[this.memberIndex]?.avatar || '',
        member_name: this.members[this.memberIndex]?.member_name || '',
        role: this.members[this.memberIndex]?.role.toLowerCase() || '',
      };

      this.avatar = this.members[this.memberIndex]?.avatar || '';

      console.log('Member Info (mounted): ', this.form)
    } else {

      this.form = {
        member_avatar: '',
        member_name: '',
        role: '',
      };

      this.avatar = '';
    }

  },
  created() {
    
    if (this.memberIndex > -1) {

      this.form = {
        member_avatar: this.members[this.memberIndex]?.avatar || '',
        member_name: this.members[this.memberIndex]?.member_name || '',
        role: this.members[this.memberIndex]?.role.toLowerCase() || '',
      };

      this.avatar = this.members[this.memberIndex]?.avatar || '';

      console.log('Member Info (before update): ', this.form)
    } else {

      this.form = {
        member_avatar: '',
        member_name: '',
        role: '',
      };

      this.avatar = '';
    }

  },
  methods: {
    ...mapActions([
      'addMember', 'fetchMember', 'updateMember',
    ]),
    changeImage(event) {
      this.avatar = URL.createObjectURL(event.target.files[0]);
      this.form.member_avatar = event.target.files[0];
    },
    submit() {
      this.isLoading = true;
      
      if (this.form.role === 'others') {
        this.form.role = this.other
      }

      if (typeof this.form.member_avatar === 'string') {
        this.form.member_avatar = '';
      } 

      if (this.memberIndex > -1) {

        this.updateMember({ memId: this.members[this.memberIndex].id, form: this.form }).then((response) =>
        {
          console.log('Update Member: ', response);
          const { status } = response;
          if (status === 422) {
            this.errors = response?.result?.errors || {}
          } else {
            this.$store.commit('SET_MEMBERS', response.result?.members)

            // this.form = {
            //   member_avatar: null,
            //   member_name: '',
            //   role: null,
            // };

            // this.avatar = '';
            
            this.$emit('modalClose')
            this.isLoading = false;
          }

        })
        .catch(err =>
        {
          console.log('Err: ', err)
        });
          console.log('Update Member here')
        
      } else {
        this.addMember(this.form).then((response) =>
        {
          console.log('Add member response: ', response)
          const { status } = response;
          if (status === 422) {
            this.errors = response?.result?.errors || {}
          } else {
            this.$store.commit('SET_MEMBERS', response.result?.members)

            this.form = {
              member_avatar: null,
              member_name: '',
              role: null,
            };

            this.$emit('modalClose')
            this.isLoading = false;
          }

        })
          .catch(err =>
          {
            console.log('Err: ', err)
          });

      }

      this.$emit('form', this.form);
    },
  },
  computed: {
    ...mapState({
      artistTypes: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
      members: (state) => state.artist.members,
      member: state => state.artist.member
    }),
  }
}
</script>
<style>
@import '@/assets/css/artist-ui.css';

</style>