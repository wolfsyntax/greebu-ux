<template>
  <div>
    <form @submit.prevent="submit" class="modal-add-member">
      <div class="container">
        <div class="row py-2">
          <div class="col">
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
  },
  watch: {
    idx(val)
    {
      if (val > -1) {

        if (!(this.roles.filter(el => el.value.toLocaleLowerCase() === this.members[val].role?.toLocaleLowerCase()).length > 0)) {
          this.other = this.members[val]?.role || '';
        } else {
          this.other = '';
        }

        this.form = {
          member_avatar: this.members[val]?.avatar || '',
          member_name: this.members[val]?.member_name || '',
          role: this.roles.filter(el => el.value.toLocaleLowerCase() === this.members[val].role.toLocaleLowerCase()).length > 0 ? (this.members[val]?.role.toLowerCase() || '') : 'others',
        }

        this.avatar = this.members[val]?.avatar;

      }
    }
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

      this.other = '';
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

      if (typeof this.form.member_avatar === 'string') {
        this.form.member_avatar = '';
      } 

      if (Object.keys(this.member).length > 0) {

        var id = this.member.id;

        console.log('Edit Form: ', this.form);
        
        this.updateMember({
          memId: id, form: {
            member_avatar: this.form.member_avatar,
            member_name: this.form.member_name,
            role: this.form.role === 'others' ? this.other : this.form.role,
        } }).then((response) =>
        {
          console.log('Update Member: ', response);
          const { status } = response;
          if (status === 422) {
            this.errors = response?.result?.errors || {}
          } else {
            
            // this.$store.commit('SET_MEMBERS', response.result?.members)

            // this.form = {
            //   member_avatar: null,
            //   member_name: '',
            //   role: null,
            // }

            // this.other = '';
            // this.avatar = '';
            this.$store.commit('SET_MEMBER_INDEX', -1);
            this.$emit('modalClose')
            this.isLoading = false;
          }

        })
        .catch(err =>
        {
          console.log('Err: ', err)
        });

      } else {

        if (this.form.role === 'others') {
          this.form.role = this.other
        }
        // this.$emit('form', this.form);     
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
            }

            this.other = '';
            this.avatar = '';
                    
            this.$store.commit('SET_MEMBER_INDEX', -1);

            this.$emit('modalClose')
            this.isLoading = false;
          }

        })
          .catch(err =>
          {
            console.log('Err: ', err)
          });

      }

    },
  },
  computed: {
    ...mapGetters(["memberInfo", ]),
    ...mapState({
      artistTypes: (state) => state.artist.artist_types,
      genres: (state) => state.artist.genres,
      members: (state) => state.artist.members,
      member: state => state.artist.member,
      idx: state => state.artist.memIndex
    }),
  }
}
</script>
<style>
@import '@/assets/css/artist-ui.css';

</style>