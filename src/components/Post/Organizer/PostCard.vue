<template>
    <div class="card" >
      <div class="card-header">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center user-posted-info">
            <img :src="profileImage" loading="lazy" alt="member profile">
            <div class="group-posted">
              <a href="#" class="name">Corona event organizer</a>
              <p class="ago">2 hours ago</p>
            </div>
          </div>
  
          <div class="more-options">
            <span class="material-symbols-outlined">more_vert</span>
          </div>
        </div>
  
        <!-- <div v-if="activePost === pos" class="show-more-options">
          <div class="more-options-list-wrapper">
            <div v-for="(option, indexOption) in postMoreOptions" :key="indexOption" class="d-flex align-items-center more-options-list" @click="handleOptionClick(option, pos)">
              <img :src="option.icon" :alt="option.label">
              <h5>{{ pos === 0 && option.label === "Pin Post" && pinnedPost ? "Unpin Post" : option.label }}</h5>
            </div>
          </div>
        </div> -->

      </div>

      <div class="card-body">
        <p class="mb-3">Travel and you will born for a second time️️</p> 
        <div class="uploaded-one">
            <img :src="postImage" class="image-landscape-medium" alt="Uploaded Image">    
        </div>
          
        <!-- <p class="mb-3">{{ post?.content }}&emsp;{{ $moment(post.created_at).format('YYYY-MM-DD hh:mm:ss a') }}</p> 
  
        <div class="row posted-file" >
        
  
          <div v-for="(file, fileIndex) in post?.files?.slice(0, 4)" :key="fileIndex"
            :class="{
              'uploaded-one': post.files.length === 1,
              'uploaded-two': post.files.length === 2,
              'uploaded-three-top': post.files.length === 3 && fileIndex === 0,
              'uploaded-three-left': post.files.length === 3 && fileIndex === 1,
              'uploaded-three-right': post.files.length === 3 && fileIndex === 2,
              'uploaded-four': post.files.length >= 4,
            }" 
            @click=""
          >
            <template v-if="file.type.startsWith('video/')">
              <video controls class="video-landscape-medium">
                <source :src="file.url"  type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </template>
  
            <template v-else-if="file.type.startsWith('image/')">
              <img :src="file.url" class="image-landscape-medium" alt="Uploaded Image">     
            </template>
          </div>
  
  
  
        </div>  -->
  
         
      </div> <!-- end of card-body -->
  
      <div class="card-footer d-flex align-items-center justify-content-between">
        <div class="d-flex post-actions">
          <div class="post-icon">
            <span class="material-symbols-outlined">favorite</span>
            <p>Like</p>
          </div>
  
          <div class="post-icon">
            <span class="material-symbols-outlined">chat_bubble</span>
            <p>Comment</p>
          </div>
        </div>
  
        <div class="comments">
          <p>No comments yet</p>
        </div>
      </div>
  
      <!-- <audio v-if="post.music" controls>
        <source :src="post.music" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio> -->
    </div> <!-- end of card-->

    
    
  </template>
  
  <script>
  import { mapGetters, mapState, mapActions } from "vuex";
  export default {
    props: {
      pos: { 
        type: Number,
        required: true
      },
      post: { 
        type: Object,
        default: {},
        required: true
      },
    },
    setup () {
      
  
      return {
        postImage: '/assets/organizer-account/post-img.webp',
        profileImage: '/assets/organizer-account/profile-img.webp',
      }
    },
    computed: {
      ...mapGetters(["userInfo", 'myAvatar', 'isComplete',]),
      ...mapState({
        account: state => state.account,
      }),
    },
    data: () => ({
      activePost: null,
    }),
    methods: {
      
    },
    watch: {
 
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>