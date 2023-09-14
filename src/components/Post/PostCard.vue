<template>
  <div class="card" >
    <div class="card-header">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center user-posted-info">
          <img :src="`${post?.avatar || 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-4_o6xjze.png'}`" 
            loading="lazy" alt="member profile">
          <div class="group-posted">
            <a href="#" class="name">{{ post.creator ?? 'Geebu' }}</a>
            <p class="ago">{{ $filters.diffForHumans($moment(post?.created_at).format('YYYY-MM-DD hh:mm:ss a')) }}</p>
          </div>
        </div>

        <div class="more-options" @click="toggleMoreOptions(pos)">
          <span class="material-symbols-outlined">more_vert</span>
        </div>
      </div>

      <div v-if="activePost === pos" class="show-more-options">
        <div class="more-options-list-wrapper">
          <div v-for="(option, indexOption) in postMoreOptions" :key="indexOption" class="d-flex align-items-center more-options-list" @click="handleOptionClick(option, pos)">
            <img :src="option.icon" :alt="option.label">
            <h5>{{ pos === 0 && option.label === "Pin Post" && pinnedPost ? "Unpin Post" : option.label }}</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="card-body">
      <p class="mb-3">{{ post?.content }}&emsp;{{ $moment(post.created_at).format('YYYY-MM-DD hh:mm:ss a') }}</p> 

      <div class="row posted-file" >
        <!-- v-if="post.files.length > 0"
          post.files.slice(0, 4) -->
        <!-- <div
          :class="{
            'four-more-uploaded': true,
            'uploaded-one': post.files.length === 1,
            'uploaded-two': post.files.length === 2,
            'uploaded-three': post.files.length === 3,
          }"
          v-for="(file, fileIndex) in post.files.slice(0, 4)" :key="fileIndex">
          <template v-if="file.type.startsWith('video/')"> -->

          <!-- :class="getFileClass(fileIndex)" -->

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

        <!-- <span v-if="fileIndex === 3" class="file-count">
          {{ post.files.length > 4 ? '+' + (post.files.length - 4) : '' }}
        </span> -->

      </div> <!-- end of row -->

        <!-- <div class="four-more-uploaded" v-for="file in post">
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

      <span v-if="file === 3" class="file-count">
        {{ post.files.length > 4 ? '+' + (post.files.length - 4) : '' }}
      </span>
      </div> -->
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

    <audio v-if="post.music" controls>
      <source :src="post.music" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
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
    

    return {}
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
  data: () => ({
    activePost: null,
  }),
  methods: {
    toggleMoreOptions(index)
    {
      // Toggle the active submission index
      if (this.activePost === index) {
        this.activePost = null; // Close the menu if it's already open for this submission
      } else {
        this.activePost = index; // Open the menu for the clicked submission
      }
    },
    handleOptionClick(option, index)
    {
      // add your logic here to perform actions based on the selected option

      if (option.label === "Pin Post" || option.label === "Unpin Post") {
        this.togglePinned(index); // Toggle the pinned status
        const pinnedPost = this.posts.splice(index, 1)[0]; // Remove the post from its current position
        this.posts.unshift(pinnedPost); // Add it back to the top

        //this.isPinnedPost = true;
        this.activePost = null;
      } else if (option.label === "Edit") {
        console.log("Edit: ");
      } else if (option.label === "Delete") {
        this.moreOptions = false;
        console.log("Deleted: ");
        this.deletePost(index);
      }
    },
  },
  watch: {
    post: {
      handler(post)
      {
        // console.log('Watch posts: ', posts);
        // this.$forceUpdate();
        setInterval(() =>
        {
          // this.post.timeAgo = this.$filters.diffForHumans(this.$moment(post.created_at).format('YYYY-MM-DD hh:mm:ss a'));
          this.post.timeAgo = this.$filters.diffForHumans(new Date(post.created_at));
          this.$forceUpdate();
        }, 1000);
        // this.post.timeAgo = this.$filters.diffForHumans(this.$moment(post.created_at).format('YYYY-MM-DD hh:mm:ss a'));//this.formattedTime(submission.submittedTime);
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>