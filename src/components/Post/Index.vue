<template>
  <div>
    <div class="row post">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="write-something">
              <img :src="`${account?.avatar || 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-4_o6xjze.png'}`" 
                loading="lazy" alt="member profile" />

              <!-- Button trigger modal -->
              <button type="button" class="btn btn-primary"  
                @click="openCreatePostModal" 
              >
                Write something...
              </button>
            </div>

            <div class="post-features">
              <div class="post-icon">
                <span class="material-symbols-outlined">&#xe813;</span>
                <button type="button" class="btn btn-primary features-button" data-bs-toggle="modal" data-bs-target="#artistPost">
                  Feeling
                </button>
              </div>

              <div class="post-icon">
                <span class="material-symbols-outlined">&#xe3f4;</span>
                <button type="button" class="btn btn-primary features-button" data-bs-toggle="modal" data-bs-target="#artistPost">
                  Photo/Video
                </button>
              </div>

              <!-- @click="toggleContent('music')" -->
              <div class="post-icon">
                <span class="material-symbols-outlined">&#xe030;</span>
                <button type="button" class="btn btn-primary features-button" data-bs-toggle="modal" data-bs-target="#artistPost">
                  Music
                </button>
              </div>
            </div>
          </div> <!-- end of card-body -->
        </div>
      </div>    
    </div> <!-- end of row post -->

    <!-- Test upload front-end -->
    <div v-if="isPinnedPost" class="d-flex align-items-center pinned-post">
      <img src="/assets/pin-post.svg" alt="Pinned post">
      <h5>Pinned post</h5>
    </div>

    <div class="row artist-post">
      <div class="col-md-12">
        <transition-group name="fade" tag="div">
          <div v-for="(post, index) in posts" :key="index">
            <card-post :post="post" :pos="index"/>
          </div>
          <!-- <card-post v-for="(submission, index) in posts" :key="index" :post="submission" /> -->
        </transition-group>
      </div>
    </div> <!-- end of row -->

    <!-- Zero state screen -->
    <transition-group name="fade" tag="div">
      <div class="row artist-post" v-if="posts.length == 0">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body text-center no-post">
              <svg class="no-post-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M48 62C48.6 62 49 61.6 49 61V15.4L54.7 9.7C55.1 9.3 55.1 8.7 54.7 8.3L48.7 2.3C48.3 1.9 47.7 1.9 47.3 2.3L41.6 8H19.2C18.9 8 18.7 8.1 18.5 8.3L9.3 17.6C9.1 17.7 9 18 9 18.3V61C9 61.6 9.4 62 10 62H48ZM23.6 29.9L27.3 33.6L21.8 35.5L23.6 29.9ZM42 10.4L43.6 12L26.2 29.6L24.6 28C26.4 26 32.8 19.6 42 10.4ZM45 7.4L49.6 12L48 13.6L45.9 11.5C45.9 11.4 45.8 11.3 45.7 11.2C45.6 11.1 45.5 11.1 45.4 11L43.4 9L45 7.4ZM27.6 31L45 13.5L46.6 15.1L29.1 32.6L27.6 31ZM48 4.4L52.6 9L51 10.6L46.4 6L48 4.4ZM11 18.7L19.6 10H39.5C36.5 12.9 33.6 15.9 30.6 18.9C29.1 20.4 27.6 21.9 26.1 23.4C25.4 24.1 24.7 24.9 23.9 25.6C23.3 26.2 22.3 26.9 22.1 27.7C21.5 29.4 21 31.1 20.4 32.7C20.1 33.6 18.2 37.2 19.6 37.9C20.7 38.5 24 36.7 25.1 36.3C26.5 35.8 27.9 35.4 29.3 34.9C29.4 34.9 29.4 34.8 29.5 34.8C29.6 34.8 29.6 34.7 29.7 34.7L47 17.4V60H11V18.7Z" fill="#B8BBCF"/>
              </svg> 
              <h5 class="no-post-title">No post yet</h5>
            </div>
          </div>
        </div>
      </div> <!-- end of Zero state screen -->
    </transition-group>

    <create-post @submitData="handleSubmittedData" />

  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import CreatePost from '@/components/Post/CreatePost.vue';
import CardPost from './PostCard.vue';

import { Modal } from "bootstrap";

export default {
  components: {
    CreatePost,
    CardPost,
  },
  data()
  {
    return {
      submissions: [],
      // form: {

      // },
      errors: {},
      isPinnedPost: false,
    }
  },
  setup()
  {

  },
  props: {

  },
  mounted()
  {

    console.log('Post mounted list');

    this.fetchPosts()
      .then(response =>
      {
        console.log('Fetch response: ', response);       
        console.log('Post: ', this.posts) 
      });

    this.$echo.private('sync-data')
      .listen('.post-created', function (data)
      {
        console.log('Sync Post [created]: ', data);
        const { posts } = data;
        this.posts = posts;
      });

    this.$echo.private(`profile.${this.userInfo?.id}`)
      .listen(`.post-created`, (e) =>
      {
        console.log('Post component: ', e);

        const { posts, post } = e;
        this.posts.unshift(post);

      })
  },
  methods: {
    ...mapActions([
      'fetchPosts',
    ]),
    openCreatePostModal()
    {
      new Modal(document.getElementById('artistPost'), {
        keyboard: false
      }).show();
    },
    // formattedTime(submittedTime)
    // {
    //   if (!submittedTime) {
    //     return "";
    //   }

    //   const currentTime = new Date();
    //   const timeDifference = Math.floor((currentTime - submittedTime) / 1000);

    //   if (timeDifference < 5) {
    //     return "Just now";
    //   } else if (timeDifference < 60) {
    //     return `${timeDifference}s ago`;
    //   } else if (timeDifference < 3600) {
    //     return `${Math.floor(timeDifference / 60)} min ago`;
    //   } else if (timeDifference < 86400) {
    //     return `${Math.floor(timeDifference / 3600)} hr ago`;
    //   } else {
    //     return `${Math.floor(timeDifference / 86400)} days ago`;
    //   }
    // },
    // toggleMoreOptions(index)
    // {
    //   // Toggle the active submission index
    //   if (this.activeSubmission === index) {
    //     this.activeSubmission = null; // Close the menu if it's already open for this submission
    //   } else {
    //     this.activeSubmission = index; // Open the menu for the clicked submission
    //   }
    // },
    handleSubmittedData(data)
    {
      // const submittedTime = new Date();
      // this.submissions.unshift(data);
      // this.times.unshift(submittedTime);
      // this.posts.unshift(data);
      this.fetchPosts();
    },
  },
  computed: {
    ...mapGetters(["userInfo", 'myAvatar', 'isComplete',]),
    ...mapState({
      account: state => state.account,
      postMoreOptions: state => state.posts.postMoreOptions,
      posts: state => state.posts.posts,
      profile: state => state.profile,
      role: (state) => state.role,
    }),
  },
  // watch: {
  //   posts: {
  //     handler(posts)
  //     {
  //       // console.log('Watch posts: ', posts);
  //       posts.forEach(post =>
  //       {
  //         post.createdAt = this.$filters.diffForHumans(this.$moment(post.created_at).format('YYYY-MM-DD hh:mm:ss a'));//this.formattedTime(submission.submittedTime);
  //       });
  //     },
  //     deep: true
  //   }
  // }
}
</script>
<style scoped></style>