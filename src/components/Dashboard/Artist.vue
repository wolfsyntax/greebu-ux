<template>
  <div>
    <!-- <CreatePostModal @submitData="handleSubmittedData" /> -->
    <section class="artist-profile">
      <div class="container">
        <div class="profile-page tx-13">
          <div class="row">
            <div class="col-12 grid-margin">
              <div class="profile-header">
                <!-- <input type="file" ref="bannerInput" @input="changeBanner" style="display: none;" accept=".png, .webp, .svg, .jpeg" /> -->

                <div class="cover" >
                  <div class="gray-shade" ></div>
                  <figure >
                    <img :src="bannerImage" class="img-fluid" alt="profile cover" >
                  </figure>

                  <!-- <div class="cover-photo-camera" @click="$refs.bannerInput.click()">
                    <button type="submit" class="btn btn-success">
                      <span class="material-symbols-outlined">&#xE412;</span>
                    </button>
                  </div> -->
                  <div class="cover-photo-camera" >
                    <button type="submit" class="btn btn-success" @click="toggle" data-bs-toggle="modal" data-bs-target="#uploadArtistCoverPhoto">
                      <span class="material-symbols-outlined">&#xE412;</span>
                    </button>
                  </div>

                  <div class="row cover-body d-flex justify-content-between align-items-center">
                    <div class="col-9">
                      <div class="profile-info">
                        <div class="position-relative">
                          <img class="profile-pic" :src="`${myAvatar || 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg'}`" alt="profile">
                        </div>

                        <div class="profile-wrapper">
                          <div class="name-artist">
                            <h3 class="profile-name">{{ account.artist_name || 'Geebu' }}</h3>
                            <h5 class="type-of-artist">{{ account.artist_type || 'Full Band' }}</h5>
                          </div>
                          
                          <div class="music-genre">
                            <h5 class="title">Genres:</h5>
                            <span class="badge" v-for="genre in account?.genres?.filter(val => val !== 'Others')" :key="genre">{{ genre }}</span>
                            <span class="badge" v-if="custom_genre">{{ custom_genre }}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-3">
                      <div class="d-none d-md-block text-end edit">
                        <router-link to="/account/profile" class="btn btn-primary btn-lg">Edit Profile</router-link>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="header-links">
                  <ul class="nav">
                    <li class="nav-item" v-for="item in navItems" :key="item">
                      <a class="nav-link" :class="{ active: item === activeItem }" @click="setActiveItem(item)">
                        {{ item }}
                        <!-- This badge will show if the number of songs, videos, and photos in the tab is more than zero -->
                        <span v-if="shouldShowBadge(item)" :class="['badge', item === activeItem ? 'orange-badge' : 'text-bg-secondary']">{{ getCount(item) }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="row profile-body" v-if="activeItem === 'Post'">
            <!-- left wrapper start -->
            <div class="d-none d-md-block col-md-4 col-xl-3 left-wrapper">
              <div class="card artist-info">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <h5 class="card-title mb-0">Information</h5>
                    <div class="edit">
                      <a href="/account/profile">Edit</a>
                    </div>
                  </div>

                  <h5 class="about">About</h5>
                  <p class="description">{{ account.bio }}</p>

                  <div class="mt-3 social-media">
                    <img src="/assets/artist-account/type-of-artist-icon-gray.svg" loading="lazy" alt="artist type icon">
                    <p>{{ account?.artist_name }}</p>
                  </div>

                  <div v-if="spotify" class="mt-3 social-media" >
                    <img src="/assets/artist-account/spotify-icon-gray.svg" loading="lazy" alt="spotify icon">
                    <p style="text-transform: lowercase;">{{ spotify }}</p>
                  </div>

                  <div v-if="youtube" class="mt-3 social-media" >
                    <img src="/assets/artist-account/youtube-icon-gray.svg" loading="lazy" alt="youtube icon">
                    <p style="text-transform: lowercase;">{{ youtube }}</p>
                  </div>

                  <div v-if="twitter" class="mt-3 social-media" >
                    <img src="/assets/artist-account/twitter-icon-gray.svg" loading="lazy" alt="twitter icon">
                    <p style="text-transform: lowercase;">{{ twitter }}</p>
                  </div>

                  <div v-if="instagram" class="mt-3 social-media" >
                    <img src="/assets/artist-account/instagram-icon-gray.svg" loading="lazy" alt="instagram icon">
                    <p style="text-transform: lowercase;">{{ instagram }}</p>
                  </div>
                </div>
              </div>

              <div class="card band-members">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-between header">
                    <div class="d-flex title">
                      <img src="/assets/artist-account/band-members-icon.svg" loading="lazy" alt="band members icon">
                      <h5 class="card-title mb-0">Band Members</h5>
                    </div>

                    <div class="see-all">
                      <a href="#" data-bs-toggle="modal" data-bs-target="#editBandMembers">Edit</a>
                    </div>
                  </div>

                  <!-- Band Members list -->
                  <div class="members-list" v-for="member in members" :key="member.id">
                    <div class="member-profile">
                      <img :src="member.avatar" loading="lazy" alt="member profile" />
                      <div class="member-info">
                        <a href="#">{{ member.member_name }}</a>
                        <p>{{ member.role }}</p>
                      </div>
                    </div>
                  </div>   
                </div>  <!-- end of card-body -->     
              </div>     
              <EditBandMembers /> 
            </div>

            <!-- left wrapper end -->
            <!-- middle wrapper start -->
            <div class="col-md-8 col-xl-6 middle-wrapper">

              <post />
              <!-- Artist Posts -->
            </div><!-- middle wrapper end -->

            <!-- right wrapper start -->
            <div class="d-none d-xl-block col-xl-3 right-wrapper">
              <div class="row">
                <div class="col-md-12 grid-margin">
                  <div class="card past-events">
                    <div class="card-body">
                      <div class="d-flex align-items-center justify-content-between header">
                        <div class="d-flex title">
                          <span class="material-symbols-outlined">event_available</span>
                          <h5 class="card-title mb-0">Past Events</h5>
                        </div>

                        <div class="see-all"><a href="">See all</a></div>
                      </div>

                      <!-- zero state screen  -->
                      <div class="text-center no-events-posted">
                        <svg class="no-events-posted-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="34" viewBox="0 0 35 34" fill="none">
                          <path d="M9.75448 13.5349H8.26494C7.078 13.5349 6.11206 14.5005 6.11206 15.6878V17.1773C6.11206 18.3646 7.078 19.3302 8.26494 19.3302H9.75448C10.9414 19.3302 11.9074 18.3643 11.9074 17.1767V15.6878C11.9074 14.5012 10.9414 13.5349 9.75448 13.5349ZM10.581 17.1773C10.581 17.6336 10.2101 18.0046 9.75482 18.0046H8.26528C7.81002 18.0046 7.43942 17.6336 7.43942 17.1773V15.6878C7.43942 15.2325 7.80968 14.8619 8.26528 14.8619H9.75482C10.2101 14.8619 10.581 15.2322 10.581 15.6878V17.1773Z" fill="#B8BBCF"/>
                          <path d="M26.921 17.177V15.6878C26.921 14.5012 25.9548 13.5349 24.7675 13.5349H23.2786C22.0913 13.5349 21.1257 14.5005 21.1257 15.6878V17.1773C21.1257 18.3646 22.0913 19.3302 23.2786 19.3302H24.7675C25.9548 19.3306 26.921 18.3646 26.921 17.177ZM22.4524 17.1773V15.6878C22.4524 15.2325 22.823 14.8619 23.2786 14.8619H24.7675C25.2238 14.8619 25.5944 15.2322 25.5944 15.6878V17.1773C25.5944 17.6336 25.2238 18.0046 24.7675 18.0046H23.2786C22.823 18.0046 22.4524 17.6336 22.4524 17.1773Z" fill="#B8BBCF"/>
                          <path d="M17.2617 20.7097H15.7715C14.5849 20.7097 13.6193 21.6757 13.6193 22.8629V24.3532C13.6189 25.5398 14.5845 26.505 15.7715 26.505H17.2617C18.4493 26.505 19.4149 25.5398 19.4149 24.3532V22.8629C19.4149 21.6757 18.4493 20.7097 17.2617 20.7097ZM18.0872 24.3532C18.0872 24.8081 17.7166 25.1783 17.2617 25.1783H15.7715C15.3165 25.1783 14.9463 24.8081 14.9463 24.3532V22.8629C14.9463 22.4073 15.3162 22.0361 15.7715 22.0361H17.2617C17.7166 22.0361 18.0872 22.4073 18.0872 22.8629V24.3532Z" fill="#B8BBCF"/>
                          <path d="M17.2617 13.5349H15.7715C14.5849 13.5349 13.6193 14.5005 13.6193 15.6878V17.1773C13.6189 18.3646 14.5845 19.3302 15.7715 19.3302H17.2617C18.4493 19.3302 19.4149 18.3643 19.4149 17.1767V15.6878C19.4149 14.5012 18.4493 13.5349 17.2617 13.5349ZM18.0872 17.1773C18.0872 17.6336 17.7166 18.0046 17.2617 18.0046H15.7715C15.3165 18.0046 14.9463 17.6336 14.9463 17.1773V15.6878C14.9463 15.2325 15.3162 14.8619 15.7715 14.8619H17.2617C17.7166 14.8619 18.0872 15.2322 18.0872 15.6878V17.1773Z" fill="#B8BBCF"/>
                          <path d="M9.75448 20.7097H8.26494C7.078 20.7097 6.11206 21.6757 6.11206 22.8629V24.3532C6.11206 25.5398 7.078 26.505 8.26494 26.505H9.75448C10.9414 26.505 11.9074 25.5398 11.9074 24.3532V22.8629C11.9074 21.6757 10.9414 20.7097 9.75448 20.7097ZM10.581 24.3532C10.581 24.8081 10.2101 25.1783 9.75482 25.1783H8.26528C7.81002 25.1783 7.43942 24.8081 7.43942 24.3532V22.8629C7.43942 22.4073 7.80968 22.0361 8.26528 22.0361H9.75482C10.2101 22.0361 10.581 22.4073 10.581 22.8629V24.3532Z" fill="#B8BBCF"/>
                          <path d="M33.5392 30.919C32.7371 30.118 32.2768 29.0065 32.2768 27.8723V24.7885C32.2768 24.0632 32.0989 23.3798 31.7885 22.775V5.89399H31.7878C31.7878 4.36263 30.5421 3.11721 29.0114 3.11721H24.8464V1.03403C24.8464 0.650508 24.5363 0.340088 24.1518 0.340088C23.7686 0.340088 23.4578 0.650508 23.4578 1.03437V3.11687H10.9628V1.03437C10.9632 0.650508 10.6528 0.340088 10.2686 0.340088C9.88471 0.340088 9.57463 0.650508 9.57463 1.03437V3.11687H4.02107C2.49039 3.11687 1.24463 4.36229 1.24463 5.89365V28.1069C1.24463 29.6386 2.49039 30.8836 4.02107 30.8836H22.1744C22.1631 30.8949 22.1529 30.9078 22.1417 30.919C21.9306 31.1308 21.8663 31.4494 21.9806 31.7251C22.0951 32.0016 22.3654 32.1821 22.6643 32.1821H26.3611C26.3611 32.9967 27.0241 33.6608 27.8401 33.6608C28.6554 33.6608 29.3191 32.9974 29.3191 32.1821H33.0159C33.3148 32.1821 33.5851 32.0022 33.6993 31.7251C33.8132 31.4491 33.7503 31.1315 33.5392 30.919ZM2.63319 5.89297C2.63319 5.12831 3.25539 4.50543 4.02175 4.50543H9.57463V5.89365C8.80895 5.89365 8.18675 6.51687 8.18675 7.28187C8.18675 8.04687 8.80895 8.67043 9.57463 8.67043C10.3406 8.67043 10.9632 8.04721 10.9632 7.28187V4.50509H23.4582V5.89331C22.6925 5.89331 22.0696 6.51653 22.0696 7.28153C22.0696 8.04653 22.6925 8.67009 23.4582 8.67009C24.2245 8.67009 24.8467 8.04687 24.8467 7.28153V4.50475H29.0117C29.7784 4.50475 30.4003 5.12763 30.4003 5.89297V10.058H2.63319V5.89297ZM23.4041 27.8733C23.4041 28.4316 23.2919 28.9834 23.0828 29.4954H4.02175C3.25539 29.4954 2.63319 28.8725 2.63319 28.1072V11.4472H30.4V21.1712C29.6754 20.6571 28.7931 20.3525 27.8408 20.3525C25.3945 20.3525 23.4041 22.3428 23.4041 24.7891V27.8733ZM24.1406 30.7034C24.6206 29.8446 24.8831 28.8657 24.8831 27.8729V24.7891C24.8831 23.1575 26.2091 21.8318 27.8408 21.8318C29.4718 21.8318 30.7978 23.1575 30.7978 24.7891V27.8729C30.7978 28.8657 31.0599 29.8446 31.5403 30.7034H24.1406Z" fill="#B8BBCF"/>
                        </svg>
                        <h5 class="no-events-posted-title">No events posted</h5>
                      </div>
                    </div>  <!-- end of card-body -->     
                  </div>  
                </div>
                <!-- right wrapper bottom start -->
                <div class="col-md-12 grid-margin">
                  <div class="card original-songs">
                    <div class="card-body">
                      <div class="d-flex align-items-center justify-content-between header">
                        <div class="d-flex title">
                          <span class="material-symbols-outlined">album</span>
                          <h5 class="card-title mb-0">Original Songs</h5>
                        </div>

                        <div class="see-all"><a href="">See all</a></div>
                      </div>

                      <div class="text-center no-original-songs">
                        <svg class="no-original-songs-icon" xmlns="http://www.w3.org/2000/svg" width="35" height="34" viewBox="0 0 35 34" fill="none">
                          <path d="M26.4501 4.5H15.3307C13.9249 4.5 12.7808 5.60806 12.7808 6.96996V21.7916C12.0864 21.3371 11.2505 21.0718 10.3516 21.0718C7.95193 21.0718 6 22.9622 6 25.2855C6 27.6096 7.95193 29.5 10.3516 29.5C12.7505 29.5 14.7024 27.6096 14.7024 25.2855V12.3126H27.0784V18.508C26.384 18.0535 25.5477 17.7878 24.6484 17.7878C22.2495 17.7878 20.2976 19.6782 20.2976 22.0023C20.2976 24.3256 22.2495 26.216 24.6484 26.216C27.0481 26.216 29 24.3256 29 22.0023V6.96996C29.0004 5.60806 27.8563 4.5 26.4501 4.5ZM10.3516 27.6393C9.01186 27.6393 7.92157 26.5834 7.92157 25.2859C7.92157 23.9887 9.01186 22.9332 10.3516 22.9332C11.6909 22.9332 12.7808 23.9887 12.7808 25.2859C12.7812 26.5834 11.6913 27.6393 10.3516 27.6393ZM14.7028 10.4516V6.96996C14.7028 6.63423 14.9845 6.36103 15.3311 6.36103H26.4505C26.7971 6.36103 27.0792 6.63386 27.0792 6.96996V10.4516H14.7028ZM24.6488 24.3554C23.3095 24.3554 22.2196 23.2998 22.2196 22.0026C22.2196 20.7051 23.3095 19.6492 24.6488 19.6492C25.9885 19.6492 27.0788 20.7051 27.0788 22.0026C27.0788 23.2998 25.9885 24.3554 24.6488 24.3554Z" fill="#B8BBCF"/>
                        </svg>

                        <h5 class="no-original-songs-title">No songs posted</h5>
                      </div>

                      <!-- Song list -->
                    </div>  <!-- end of card-body -->     
                  </div> 
                </div>
              </div>
            </div>
            <!-- right wrapper end -->
          </div>

          <!-- About tab -->
          <div class="row about-tab" v-if="activeItem === 'About'">
            <div class="col-7">
              <h3 class="overview">Overview</h3>
              <p class="content">{{ account.bio }} </p>
              <h5 class="capacity">Our capacity:</h5>  
              <ol type="1" class="capacity-list">
                <li v-for="(capacity, index) in artistCapacity" :key="index">{{ capacity }}</li>
              </ol> 

              <div class="genres">
                <h4>Genres</h4>
                <div class="genres-list">
                  <span class="badge" v-for="genre in account?.genres?.filter(val => val !== 'Others')" :key="genre">{{ genre }}</span>
                  <span class="badge" v-if="custom_genre">{{ custom_genre }}</span>
                </div>
              </div>
            </div>

            <div class="col-5">
              <div class="social-media">
                <h4>Social Media</h4>
                <ul>
                  <li><img src="/assets/artist-account/type-of-artist-icon-gray.svg" alt="artist type icon">{{ account?.artist_name }}</li>
                  <li v-if="spotify"><img src="/assets/artist-account/spotify-icon-gray.svg" alt="spotify icon">{{ spotify }}</li>
                  <li v-if="youtube"><img src="/assets/artist-account/youtube-icon-gray.svg" alt="youtube icon">{{ youtube }}</li>
                  <li v-if="twitter"><img src="/assets/artist-account/twitter-icon-gray.svg" alt="twitter icon">{{ twitter }}</li>
                  <li v-if="instagram"><img src="/assets/artist-account/instagram-icon-gray.svg" alt="instagram icon">{{ instagram }}</li>
                </ul>
              </div>

              <div class="ratings">
                <h4>Ratings</h4>
                <div class="ratings-wrapper">
                  <span class="material-symbols-rounded">star</span>
                  <p>{{ artistRatings }}<span class="reviews">({{ artistReviews }} reviews)</span></p>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="band-members">
                <h4>Band Members</h4>
                <div class="card" v-for="member in members" :key="member.id">
                  <img :src="member.avatar" class="card-img-top" loading="lazy" alt="band member">
                  <div class="card-body">
                    <h5 class="card-title">{{ member.member_name }}</h5>
                    <p class="card-text">{{ member.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row songs-tab" v-if="activeItem === 'Songs'">
            <div class="col-12">

              <!-- zero state screen   -->
              <div class="text-center no-songs">
                <svg xmlns="http://www.w3.org/2000/svg" width="101" height="102" viewBox="0 0 101 102" fill="none">
                  <path d="M74.0209 16.7444H44.7986C41.104 16.7444 38.0972 19.7809 38.0972 23.5131V64.1305C36.2721 62.8851 34.0754 62.1578 31.713 62.1578C25.4066 62.1578 20.2768 67.3384 20.2768 73.7053C20.2768 80.0741 25.4066 85.2547 31.713 85.2547C38.0174 85.2547 43.1472 80.0741 43.1472 73.7053V38.1542H75.6722V55.1321C73.8472 53.8867 71.6494 53.1584 69.286 53.1584C62.9816 53.1584 57.8518 58.339 57.8518 64.7078C57.8518 71.0747 62.9816 76.2553 69.286 76.2553C75.5924 76.2553 80.7222 71.0747 80.7222 64.7078V23.5131C80.7232 19.7809 77.7165 16.7444 74.0209 16.7444ZM31.713 80.1557C28.1921 80.1557 25.3268 77.262 25.3268 73.7063C25.3268 70.1516 28.1921 67.2589 31.713 67.2589C35.2328 67.2589 38.0972 70.1516 38.0972 73.7063C38.0982 77.262 35.2339 80.1557 31.713 80.1557ZM43.1482 33.0542V23.5131C43.1482 22.5931 43.8885 21.8444 44.7996 21.8444H74.0219C74.9329 21.8444 75.6743 22.592 75.6743 23.5131V33.0542H43.1482ZM69.287 71.1563C65.7672 71.1563 62.9028 68.2636 62.9028 64.7089C62.9028 61.1531 65.7672 58.2594 69.287 58.2594C72.8079 58.2594 75.6732 61.1531 75.6732 64.7089C75.6732 68.2636 72.8079 71.1563 69.287 71.1563Z" fill="#B8BBCF"/>
                </svg>

                <div class="description-wrapper">
                  <h3 class="title">No Songs found?</h3>
                  <p class="sub-title">It looks like you havent uploaded any songs yet? Use the button below to create your first song to start your Geebu journey!</p>
                </div>

                <button type="button" class="btn upload-songs">Upload Songs</button>
              </div>
            </div>
          </div> <!-- end of songs-tab -->

          <div class="row videos-tab" v-if="activeItem === 'Videos'">
            <div class="col-12">

            <!-- zero state screen   -->
              <div class="text-center no-videos">
                <svg xmlns="http://www.w3.org/2000/svg" width="103" height="102" viewBox="0 0 103 102" fill="none">
                  <path d="M26.9764 10.1892C19.3528 10.1892 13.1255 16.3949 13.1255 23.9851C13.1255 27.5992 14.5477 30.8872 16.8499 33.3527C11.7704 33.42 7.63989 37.578 7.63989 42.6489V73.0981C7.63989 78.2105 11.8371 82.3985 16.9737 82.3985H21.241V87.6846C21.241 88.6574 21.756 89.4639 22.2617 89.942C22.7674 90.4201 23.3019 90.698 23.8622 90.9213C24.9829 91.3679 26.2558 91.5647 27.654 91.5647H52.3306C53.7287 91.5647 55.0017 91.3679 56.1223 90.9213C56.6826 90.6979 57.2171 90.4201 57.7228 89.942C58.2285 89.4639 58.7435 88.6574 58.7435 87.6846V82.3985H63.013C68.1496 82.3985 72.3468 78.2105 72.3468 73.0981V71.1569L92.5324 76.781C92.8632 76.8731 93.211 76.8879 93.5485 76.8241C93.8861 76.7603 94.2042 76.6197 94.478 76.4132C94.7518 76.2068 94.9739 75.9401 95.1269 75.6341C95.2799 75.3281 95.3596 74.991 95.3599 74.6492V41.0977C95.3601 40.5143 95.129 39.9543 94.7167 39.5393C94.3045 39.1244 93.7443 38.888 93.1578 38.8814C92.9465 38.8792 92.7359 38.9069 92.5324 38.9637L72.3468 44.5878V42.6488C72.3468 37.5364 68.1496 33.3462 63.013 33.3462H57.0843C58.6424 31.3782 59.5839 28.9065 59.5839 26.2208C59.5839 19.8637 54.3602 14.6564 47.9742 14.6564C44.6682 14.6564 41.6832 16.0594 39.5655 18.2873C37.3793 13.5245 32.5597 10.1892 26.9764 10.1892ZM26.9764 14.6218C32.1893 14.6218 36.3732 18.7857 36.3732 23.9851C36.3732 29.1844 32.1893 33.3462 26.9764 33.3462C21.7635 33.3462 17.5796 29.1844 17.5796 23.9851C17.5796 18.7857 21.7635 14.6218 26.9764 14.6218ZM47.9742 19.0889C51.9495 19.0889 55.1277 22.2545 55.1277 26.2208C55.1277 30.1871 51.9495 33.3462 47.9742 33.3462C43.9989 33.3462 40.8207 30.1871 40.8207 26.2208C40.8207 22.2545 43.9989 19.0889 47.9742 19.0889ZM38.0692 32.1937C38.314 32.5942 38.5782 32.9793 38.8684 33.3462H37.105C37.4468 32.9795 37.7685 32.5955 38.0692 32.1937ZM16.9737 37.7787H63.013C65.7556 37.7787 67.897 39.9107 67.897 42.6489V73.0981C67.897 75.8362 65.7556 77.966 63.013 77.966H16.9737C14.2311 77.966 12.0896 75.8362 12.0896 73.0981V42.6489C12.0896 39.9107 14.2311 37.7787 16.9737 37.7787ZM90.9059 44.018V71.7267L72.3468 66.5576V49.1871L90.9059 44.018ZM25.6973 82.3985H54.2894V86.8354C53.8672 86.9799 53.1741 87.1386 52.3306 87.1386H27.654C26.8105 87.1386 26.1196 86.9799 25.6973 86.8354L25.6973 82.3985Z" fill="#B8BBCF"/>
                </svg>

                <div class="description-wrapper">
                  <h3 class="title">No Videos Uploaded</h3>
                  <p class="sub-title">It looks like you havent uploaded any videos yet? Use the button below to create your first song to start your Geebu journey!</p>
                </div>

                <button type="button" class="btn upload-video">Upload Video</button>
              </div>
            </div>
          </div> <!-- end of videos-tab -->

          <div class="row photos-tab" v-if="activeItem === 'Photos'">
            <div class="col-12">
            <!-- zero state screen   -->
              <div class="text-center no-photos">
                <svg xmlns="http://www.w3.org/2000/svg" width="103" height="102" viewBox="0 0 103 102" fill="none">
                  <path d="M88.7299 29.172H80.4679L79.4479 21.93C79.0399 18.972 77.5099 16.32 75.1639 14.484C72.8179 12.648 69.8599 11.934 66.9019 12.342L12.7399 19.89C6.6199 20.706 2.3359 26.418 3.1519 32.538L8.2519 70.278C9.0679 75.888 13.8619 79.968 19.3699 79.968C19.8799 79.968 20.3899 79.968 20.8999 79.866L23.0419 79.56C23.5519 85.272 28.3459 89.76 34.1599 89.76H88.8319C94.9519 89.76 100.052 84.762 100.052 78.54V40.392C99.9499 34.272 94.9519 29.172 88.7299 29.172ZM93.8299 40.392V72.42L77.7139 53.958C75.0619 50.898 70.1659 50.898 67.5139 53.958L53.6419 69.87L48.6439 64.362C46.0939 61.608 41.7079 61.608 39.2599 64.362L29.0599 75.48V40.392C29.0599 37.638 31.3039 35.292 34.1599 35.292H88.8319C91.5859 35.292 93.8299 37.638 93.8299 40.392ZM22.9399 40.392V73.236L20.0839 73.644C17.3299 74.052 14.7799 72.114 14.3719 69.258L9.16991 31.62C8.76191 28.866 10.6999 26.316 13.5559 25.908L67.7179 18.462C67.9219 18.462 68.2279 18.462 68.4319 18.462C70.8799 18.462 73.1239 20.298 73.4299 22.848L74.3479 29.274H34.1599C27.9379 29.172 22.9399 34.272 22.9399 40.392Z" fill="#B8BBCF"/>
                  <path d="M43.85 54.876C47.23 54.876 49.97 52.136 49.97 48.756C49.97 45.376 47.23 42.636 43.85 42.636C40.47 42.636 37.73 45.376 37.73 48.756C37.73 52.136 40.47 54.876 43.85 54.876Z" fill="#B8BBCF"/>
                </svg>
              
                <div class="description-wrapper">
                  <h3 class="title">No Photos Uploaded</h3>
                  <p class="sub-title">It looks like you haven’t uploaded any photos yet? Use the button below to create your first song to start your Geebu journey!</p>
                </div>

                <button type="button" class="btn upload-photos">Upload Photos</button>
              </div>
            </div>
          </div> <!-- end of photos-tab -->

          <div class="row profile-body" v-if="activeItem === 'Events'"><h2>Events</h2></div>

          <div class="row profile-body" v-if="activeItem === 'Reviews'"><h2>Reviews</h2></div>
        </div>
      </div>
    </section>
    <banner-modal @close="toggle" :active="isActive" />
  </div>
<!-- 
    <pre> <b>Profile</b> {{  $store.state.profile  }} <br></pre>
  <pre> <b>Account</b> {{ $store.state.account }}</pre> -->

</template>


<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
// import CreatePostModal from '/src/components/Artist/CreatePostModal.vue';
import BannerModal from './Modals/BannerModal.vue';
import Post from '/src/components/Post/Index.vue';
import EditBandMembers from "../Artist/EditBandMembers.vue";
import { Modal } from 'bootstrap';

export default {
  setup () {
    

    return {}
  },
  components: {
    // CreatePostModal,
    EditBandMembers,
    BannerModal,
    Post,
  },
  data: () => ({
    bannerImage: '/assets/artist-account/default-cover-photo.webp',
    navItems: [
      'Post',
      'About',
      'Songs',
      'Videos',
      'Photos',
    ],
    activeItem: 'Post',
    songs: [
      'https://res.cloudinary.com/daorvtlls/video/upload/v1686647605/Nirvana_-_Smells_like_teen_spirit_zs8yo4.mp3',
      'https://res.cloudinary.com/daorvtlls/video/upload/v1686647605/Nirvana_-_Smells_like_teen_spirit_zs8yo4.mp3',
    ],
    videos: ['https://video.wixstatic.com/video/8fd47a_61de9ebf0ad64f0fa93d72e4279551f7/1080p/mp4/file.mp4'],
    photos: ['/assets/home/birthdays.webp', '/assets/home/birthdays.webp', '/assets/home/birthdays.webp', '/assets/home/birthdays.webp', '/assets/home/birthdays.webp'],
    aboutArtist: 'Lorem ipsum dolor sit amet consectetur. Consectetur justo ornare et netus adipiscing nisi nisl tellus a. Venenatis sed augue ultricies vulputate in. Eu risus neque nisl libero eget in molestie felis sem. Pharetra sagittis eget ipsum pulvinar aliquet libero amet accumsan auctor.',
    artistCapacity: ['Mobile apps design', 'Website design & development', 'Packaging', 'Brand identity', 'Print design'],
    artistGenres: ['Reggae', 'Metal', 'Hip-hop/Rap', 'Country Acoustic', 'Electronic', 'Rock'],
    artistSocialMedia: [
      { img: '/src/assets/artist-account/spotify-icon-gray.svg', name: 'IDLEPITCH' },
      { img: '/src/assets/artist-account/youtube-icon-gray.svg', name: 'youtube.com/@idlepitch' }
    ],
    artistRatings: '4.95',
    artistReviews: '234',
    bandMembers: [
      { img: 'src/assets/artist-account/band-member-1.webp', name: 'John Doe', role: 'Vocalist' }, { img: 'src/assets/artist-account/band-member-2.webp', name: 'Jose Diaz', role: 'Guitarist' },
      { img: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686649329/trending-bicolano-artist-5_lxhfkw.png', name: 'John Doe', role: 'Vocalist' }, { img: 'src/assets/artist-account/band-member-2.webp', name: 'Jose Diaz', role: 'Guitarist' },
      { img: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg', name: 'Michelle Rose', role: 'Songwriter' },
    ],
    // isModalVisible: false,
    modalVisible: false,
    editingIndex: -1,

    submissions: [], // Array to store create post submissions
    times: [],
    activeModal: false,
    activeSubmission: null, // Index of the currently active submission
    postMoreoptions: [
        { label: "Pin Post", icon: "/assets/pin-post.svg" },
        { label: "Edit", icon: "/assets/edit-post.svg" },
        { label: "Delete", icon: "/assets/delete-post.svg" },
      ],
    isPinnedPost: false,
    pinnedPost: false, // Pinned status
    isActive: false,
  }),
  mounted()
  {

    this.fetchProfile()
      .then(res =>
      {
        console.log('Fetch Profile [ArtistLayout]: ', res)
      }).catch(err =>
      {
        console.log('Fetch Profile Error [ArtistLayout]: ', err)
      })

    this.artistOptions()
      .then(res =>
      {
        console.log('Artist Options [ArtistLayout] ', res)
      });

    this.bannerImage = this.profile.cover_photo || this.account?.cover_photo || '/assets/artist-account/default-cover-photo.webp';

  },
  methods: {
    ...mapActions([
      'fetchArtistOptions', 'fetchProfile', 'artistOptions',
    ]),
    toggle()
    {
      // this.$root.$emit("bv::show::modal", "#uploadArtistCoverPhoto");
      // new Modal(document.getElementById('uploadArtistCoverPhoto'), {
      //   keyboard: false
      // }).show();
      this.isActive = !this.isActive;
    },
    openCreatePostModal(data)
    {
      this.$root.$emit("bv::show::modal", "#artistPost");
      // const body = document.querySelector("body");

      // this.active = !this.active;
      // this.active ? body.classList.add("modal-open") : body.classList.remove("modal-open")

    },
    openEditBandMembersModal(data)
    {
      this.$root.$emit("bv::show::modal", "#editBandMembers");
      // const body = document.querySelector("body");

      // this.active = !this.active;
      // this.active ? body.classList.add("modal-open") : body.classList.remove("modal-open")

    },
    setActiveItem(item)
    {
      this.activeItem = item;
    },
    shouldShowBadge(item)
    {
      return item === 'Post' && this.submissions.length > 0 ||
        item === 'Songs' && this.songs.length > 0 ||
        item === 'Videos' && this.videos.length > 0 ||
        item === 'Photos' && this.photos.length > 0;
    },
    getCount(item)
    {
      switch (item) {
        case 'Post':
          return this.submissions.length;
        case 'Songs':
          return this.songs.length;
        case 'Videos':
          return this.videos.length;
        case 'Photos':
          return this.photos.length;
        default:
          return 0;
      }
    },
    handleSubmittedData(data)
    {
      const submittedTime = new Date();
      this.submissions.unshift(data);
      this.times.unshift(submittedTime);

    },
    formattedTime(submittedTime)
    {
      if (!submittedTime) {
        return "";
      }

      const currentTime = new Date();
      const timeDifference = Math.floor((currentTime - submittedTime) / 1000);

      if (timeDifference < 5) {
        return "Just now";
      } else if (timeDifference < 60) {
        return `${timeDifference}s ago`;
      } else if (timeDifference < 3600) {
        return `${Math.floor(timeDifference / 60)} min ago`;
      } else if (timeDifference < 86400) {
        return `${Math.floor(timeDifference / 3600)} hr ago`;
      } else {
        return `${Math.floor(timeDifference / 86400)} days ago`;
      }
    },
    toggleMoreOptions(index) {
      // Toggle the active submission index
      if (this.activeSubmission === index) {
        this.activeSubmission = null; // Close the menu if it's already open for this submission
      } else {
        this.activeSubmission = index; // Open the menu for the clicked submission
      }
    },
    handleOptionClick(option, index){
      // add your logic here to perform actions based on the selected option
   
        if (option.label === "Pin Post" || option.label === "Unpin Post") {
        this.togglePinned(index); // Toggle the pinned status
        const pinnedPost = this.submissions.splice(index, 1)[0]; // Remove the post from its current position
        this.submissions.unshift(pinnedPost); // Add it back to the top

        //this.isPinnedPost = true;
        this.activeSubmission = null;
      }else if(option.label === "Edit"){
        console.log("Edit: ");
      }else if(option.label === "Delete") {
        this.moreOptions = false;
        console.log("Deleted: ");
        this.deletePost(index);
      }
    },
    togglePinned(index) {
      // Toggle the pinned status
      this.pinnedPost = !this.pinnedPost;
      this.isPinnedPost = !this.isPinnedPost;
    },
    deletePost(index){
      this.submissions.splice(index, 1);
      this.activeSubmission = null;
    },
  
    // togglePinned(index) {
    //   if (this.isPinnedPost(index)) {
    //     const pinnedIndex = this.pinnedPosts.indexOf(index);
    //     if (pinnedIndex !== -1) {
    //       this.pinnedPosts.splice(pinnedIndex, 1);
    //     }
    //   } else {
    //     this.pinnedPosts.push(index);
    //     const pinnedPost = this.submissions.splice(index, 1)[0];
    //     this.submissions.unshift(pinnedPost);
    //   }
    // },
    // isPinnedPost(index) {
    //   // Check if the post at the given index is pinned
    //   return this.pinnedPosts.includes(index);
    // },
  },
  watch: {
    profile: {
      handler(res)
      {
        console.log('Profile object updated: ', res)
        this.bannerImage = res?.cover_photo || this.account.cover_photo || '/assets/artist-account/default-cover-photo.webp';
        // this.myAvatar = res?.avatar || this.account.avatar || 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465790/cld-sample.jpg';

      },
      deep: true,
    },
    submissions: {
      handler(submissions)
      {
        submissions.forEach(submission =>
        {
          submission.formattedTime = this.formattedTime(submission.submittedTime);
        });
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["userInfo", "token", 'myAvatar', 'instagram', 'youtube', 'twitter', 'spotify', 'isComplete',]),
    ...mapState({
      users: (state) => state.user,
      profile: (state) => state.profile,
      role: (state) => state.role,
      artist: (state) => state.artist.artist,
      members: (state) => state.artist.members,
      account: (state) => state.account,
      custom_genre: (state) => state.custom_genre,
      genres: (state) => state.artist.genres,
    }),
  
  }
}
</script>
<style>
@import '@/assets/css/artist-ui.css';


</style>
