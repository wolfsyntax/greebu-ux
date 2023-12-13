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

        <!-- <div class="more-options" @click="toggleMoreOptions(pos)">
          <span class="material-symbols-outlined">more_vert</span>
        </div> -->
        <div class="dropdown-center" id="more-options-wrap">
          <button class="btn btn-secondary dropdown-toggle p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="material-symbols-outlined more-icon">&#xe5d4;</span>
          </button>
          <ul class="dropdown-menu border-0">
            <li>
              <button class="btn p-0 border-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13 3L21 11L19.6667 12.3333L19.0001 11.6667L15 15.6667L14.3333 19L13 20.3333L9.00001 16.3334L4.33334 21L3 19.6667L7.66668 15.0001L3.66667 11L5 9.66668L8.33334 9.00001L12.3334 5L11.6667 4.33334L13 3ZM13.6667 6.33334L9.26297 10.737L6.60248 11.2692L12.7308 17.3975L13.263 14.737L17.6667 10.3333L13.6667 6.33334Z" fill="#B8BBCF"/>
                </svg>
                Pin Post
              </button>
            </li>
            <li>
              <button class="btn p-0 border-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15.7279 9.65686L14.3137 8.24264L5 17.5564V18.9706H6.41421L15.7279 9.65686ZM17.1421 8.24264L18.5563 6.82843L17.1421 5.41422L15.7279 6.82843L17.1421 8.24264ZM7.24264 20.9706H3V16.728L16.435 3.2929C16.8256 2.90237 17.4587 2.90237 17.8492 3.2929L20.6777 6.12132C21.0682 6.51185 21.0682 7.14501 20.6777 7.53554L7.24264 20.9706Z" fill="#B8BBCF"/>
                </svg>
                Edit
              </button>
            </li>
            <li>
              <button class="btn p-0 border-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16.5 6.6H21V8.4H19.2V20.1C19.2 20.5971 18.7971 21 18.3 21H5.7C5.20295 21 4.8 20.5971 4.8 20.1V8.4H3V6.6H7.5V3.9C7.5 3.40295 7.90295 3 8.4 3H15.6C16.0971 3 16.5 3.40295 16.5 3.9V6.6ZM17.4 8.4H6.6V19.2H17.4V8.4ZM9.3 11.1H11.1V16.5H9.3V11.1ZM12.9 11.1H14.7V16.5H12.9V11.1ZM9.3 4.8V6.6H14.7V4.8H9.3Z" fill="#B8BBCF"/>
                </svg>
                Delete
              </button>
            </li>
          </ul>
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