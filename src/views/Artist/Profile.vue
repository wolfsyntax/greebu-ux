<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <section class="profile-details" id="artist-profile">
      <div class="container">
        <div class="row profile-row">
          <div class="col-3"></div>
          <div class="col-6">
            <div class="back-wrapper">
              <router-link to="/dashboard" class="back"
                ><span class="material-symbols-outlined">&#xef7d;</span>Go to
                Your Dashboard</router-link
              >
            </div>

            <h2 class="title">
              Welcome! Let's create your profile as an artist
            </h2>

            <p class="sub-heading">Crafting your Creative Identity</p>
            <h3 class="profile-details">Profile Details</h3>

            <!-- DISPLAY MODAL for Add Member and Add Social Media Accounts -->

            <div
              ref="modal"
              class="modal fade"
              id="add-artist-details"
              :class="{ show: active, 'd-block': active }"
              tabindex="-1"
              role="dialog"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div
                    class="modal-header d-flex align-items-start justify-content-between p-0"
                  >
                    <div>
                      <h5 class="modal-title">{{ formHeader }}</h5>
                      <p class="mb-0 modal-sub-heading">{{ formSubHeading }}</p>
                    </div>
                    <div>
                      <button class="btn p-0 border-0">
                        <span
                          class="material-symbols-rounded close-modal-icon"
                          data-dismiss="modal"
                          @click="toggle"
                          >&#xe5c9;</span
                        >
                      </button>
                    </div>
                  </div>
                  <div class="modal-body p-0">
                    <member-form
                      @modalClose="dismiss"
                      @form="updateMember"
                      v-if="formType === 'members'"
                    />
                    <social-media
                      @modalClose="dismiss"
                      @form="updateSocial"
                      :media="social"
                      v-if="formType === 'links'"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="active" class="modal-backdrop fade show"></div>

            <div class="onboarding-message" v-if="message">
              <input
                type="checkbox"
                id="modal-toggle"
                class="modal-toggle"
                checked
                style="display: none"
              />
              <div class="modal">
                <div class="modal-content">
                  <img
                    src="/assets/artist-account/check-circle.svg"
                    class="check-cirle"
                    alt="check circle"
                  />
                  <h3 class="all-set">You're all set!</h3>
                  <p class="message">{{ message }}</p>
                  <label
                    for="modal-toggle"
                    class="close-modal-button"
                    @click="$router.push('/dashboard')"
                    >View Profile</label
                  >
                </div>
              </div>
            </div>

            <form
              @submit.prevent="submit"
              class="fill-details"
              autocomplete="off"
            >
              <!-- {{ form }} -->

              <div class="form-group upload-img">
                <label class="label-img">
                  <img
                    :src="avatar"
                    class="img-fluid default-avatar"
                    alt="default user avatar"
                  />
                  <div class="camera">
                    <!-- <input type="file" ref="file" @change="uploadFile" accept="image/png, image/webp, image/svg, image/jpeg" /> -->

                    <!-- <input type="file" @input="form.avatar = $event.target.files[0]" accept="image/png, image/webp, image/svg, image/jpeg" /> -->
                    <!-- <input type="file" @input="changeImage" accept="image/png, image/webp, image/svg, image/jpeg" /> -->

                    <!-- <input type="file" @input="changeImage" accept="image/*" /> -->

                    <button
                      type="button"
                      class="btn btn-success"
                      @click="toggleProfile"
                      data-bs-toggle="modal"
                      data-bs-target="#uploadProfilePhoto"
                    >
                      <span class="material-symbols-outlined">&#xE412;</span>
                    </button>

                    <!-- <div v-if="error?.avatar" class="text-danger">{{ error.avatar }}</div> -->
                    <div
                      v-for="err in error?.avatar"
                      :key="err"
                      class="text-danger"
                    >
                      {{ err }}
                    </div>
                    <progress
                      v-if="form.progress"
                      :value="form.progress.percentage"
                      max="100"
                    >
                      {{ form.progress.percentage }}%
                    </progress>
                  </div>
                  <span class="material-symbols-outlined camera-outer"
                    >&#xE412;</span
                  >
                </label>

                <label for="fileUpload" class="description"
                  >Upload profile picture</label
                >
              </div>
              <div v-for="err in error?.avatar" :key="err" class="text-danger">
                {{ err }}
              </div>

              <div class="required-fields">
                <div class="form-group typeArtist">
                  <label for="artistType">Type of artist</label>
                  <select
                    v-model="selectedArtistType"
                    class="form-select"
                    aria-label="Default select example"
                    value="Select Type of Artist"
                  >
                    <option value="Select Type of Artist" selected>
                      <!-- Select an artist type -->
                    </option>
                    <option
                      v-for="(type, index) in artistTypes"
                      :key="index"
                      :value="type.value"
                    >
                      {{ type.label }}
                    </option>
                  </select>
                </div>

                <div class="form-group categoryArtist">
                  <label for="artistCategory">Artist category</label>
                  <select
                    v-model="selectedArtistCategory"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <!-- <option value="" selected disabled>
                  Select an Artist category
                </option> -->
                    <option v-if="!selectedArtistCategoryVisible">
                      Select type of artist first
                    </option>
                    <optgroup v-if="selectedArtistCategoryVisible">
                      <option
                        v-for="(category, index) in artistCategories[
                          selectedArtistType
                        ]"
                        :key="index"
                      >
                        {{ category }}
                      </option>
                    </optgroup>
                  </select>
                </div>
                <!-- <div class="form-group typeArtist">
                  <label for="typeArtist">Type of the Artist</label>
                  <select v-model="form.artist_type" class="form-select">
                    <option>Select Artist Type</option>
                    <option
                      v-for="artist_type in artistTypes"
                      :key="artist_type.id"
                      :value="artist_type.title"
                    >
                      {{ artist_type.title }}
                    </option>
                  </select>

                  <div
                    v-for="err in error?.artist_type"
                    :key="err"
                    class="text-danger"
                  >
                    {{ err }}
                  </div>
                </div> -->
                <!-- <div class="form-group categoryArtist">
                  <label for="categoryArtist">Artist Category</label>
                  <select v-model="form.artist_category" class="form-select">
                    <option>Select Artist Category</option>
                    <option
                      v-for="artist_category in artistCategory"
                      :key="artist_category.id"
                      :value="artist_category.title"
                    >
                      {{ artist_category.title }}
                    </option>
                  </select>

                  <div
                    v-for="err in error?.artist_category"
                    :key="err"
                    class="text-danger"
                  >
                    {{ err }}
                  </div>
                </div> -->

                <div class="form-group">
                  <label for="artistName">Name of the Artist/Band</label>
                  <input
                    type="text"
                    v-model="form.artist_name"
                    placeholder="Name of the Artist/Band"
                    class="form-control artist-name"
                    required
                    autocomplete="off"
                  />
                  <!-- <div v-if="error?.artist_name" class="artist-name-error text-danger"></div> -->
                  <div
                    v-for="err in error?.artist_name"
                    :key="err"
                    class="text-danger"
                  >
                    {{ err }}
                  </div>
                </div>

                <div class="form-group mb-0">
                  <label for="genre">Genre</label>
                  <multiselect
                    v-model="formGenres"
                    mode="tags"
                    :close-on-select="false"
                    :create-option="true"
                    :options="
                      async function (query) {
                        return (await fetchGenre(query)) || genres;
                      }
                    "
                    :searchable="isSearchable"
                    :delay="0"
                    autocomplete="off"
                    ref="multiselect"
                    :filter-results="false"
                    @open="onOpenOption"
                    noOptionsText="Please input genre(s)"
                    class="genre"
                    placeholder="Please select genres"
                  />
                  <br />
                  <!-- <input type="text" v-model="others" @blur="updateGenre" placeholder="Genre" class="form-control province" v-if="hasOthers" required /> -->
                  <div
                    v-for="err in error?.genre"
                    :key="err"
                    class="text-danger"
                  >
                    {{ err }}
                  </div>
                </div>

                <!-- <div class="row">
                  <div class="col-4">
                    <div class="form-group">
                      <label for="address">Address</label>
                      <input type="text" v-model="form.street_address" placeholder="Street" class="form-control street" required @focus="onInputAddress" autocomplete="off"/>
                      <div v-for="err in error?.street_address" :key="err" class="text-danger">{{ err }}</div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="form-group">
                      <label for="address" class="hidden">City</label>
                      <input type="text" v-model="form.city" placeholder="City" class="form-control city" @focus="onInputAddress" required autocomplete="off"/>
                      <div v-for="err in error?.city" :key="err" class="text-danger">{{ err }}</div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="form-group">
                      <label for="address" class="hidden">Province</label>
                      <input type="text" v-model="form.province" placeholder="Province" class="form-control province" @focus="onInputAddress" required autocomplete="off"/>
                      <div v-for="err in error?.province" :key="err" class="text-danger">{{ err }}</div>
                    </div>
                  </div>
                </div>  -->

                <div class="address-wrap">
                  <div class="form-group">
                    <label for="address">Address</label>
                    <div class="d-flex align-items-center group-wrap">
                      <input
                        type="text"
                        v-model="form.street_address"
                        placeholder="Street"
                        class="form-control street"
                        required
                        @focus="onInputAddress"
                        autocomplete="off"
                      />
                      <div
                        v-for="err in error?.street_address"
                        :key="err"
                        class="text-danger"
                      >
                        {{ err }}
                      </div>

                      <input
                        type="text"
                        v-model="form.city"
                        placeholder="City"
                        class="form-control city"
                        @focus="onInputAddress"
                        required
                        autocomplete="off"
                      />
                      <div
                        v-for="err in error?.city"
                        :key="err"
                        class="text-danger"
                      >
                        {{ err }}
                      </div>

                      <input
                        type="text"
                        v-model="form.province"
                        placeholder="Province"
                        class="form-control province"
                        @focus="onInputAddress"
                        required
                        autocomplete="off"
                      />
                      <div
                        v-for="err in error?.province"
                        :key="err"
                        class="text-danger"
                      >
                        {{ err }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end of required-fields class -->
              <!-- Band Members -->

              <div class="band-and-social">
                <div class="form-group">
                  <label for="members">Band Members</label><br />
                  <button
                    type="button"
                    class="btn btn-primary add-member"
                    @click="toggle('members', false, -1)"
                  >
                    <span class="material-symbols-rounded">add_box</span>
                    Add Member
                  </button>
                </div>

                <div class="col">
                  <div class="row">
                    <div class="col-12">
                      <ul class="list-group band-members" v-if="members">
                        <transition-group name="fade" tag="div">
                          <li
                            class="list-group-item"
                            v-for="(mem, index) in members"
                            :key="mem.id"
                          >
                            <div class="items">
                              <img
                                @error="replaceByDefault"
                                class="avatar"
                                :src="mem.avatar"
                                alt=""
                              />

                              <div class="member-info">
                                <h6 class="band-name">{{ mem.member_name }}</h6>
                                <p class="band-role">{{ mem.role }}</p>
                              </div>
                            </div>

                            <div class="options">
                              <div class="d-flex align-items-center text-end">
                                <button
                                  type="button"
                                  class="edit-band-member-wrapper"
                                  @click="toggle('members', true, index)"
                                >
                                  <img
                                    src="/assets/artist-account/edit-band-member.svg"
                                    class="edit-band-member"
                                    alt="edit band member"
                                  />
                                </button>
                                <button
                                  type="button"
                                  @click="removeMember(mem.id)"
                                  class="delete-band-member-wrapper"
                                >
                                  <img
                                    src="/assets/artist-account/delete-band-member.svg"
                                    class="delete-band-member"
                                    alt="delete band member"
                                  />
                                </button>
                              </div>
                            </div>
                          </li>
                        </transition-group>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Social Media Links -->
                <div class="form-group">
                  <label for="social-media">Social Media Accounts</label><br />
                  <button
                    type="button"
                    class="btn btn-primary add-social-media"
                    @click="toggle('links', false, { key: '', text: '' })"
                  >
                    <span class="material-symbols-rounded">add_link</span>Add
                    Links
                  </button>
                </div>

                <transition name="fade" mode="out-in">
                  <div
                    class="card mb-3 social-media-account-row"
                    v-if="form?.instagram"
                  >
                    <div class="row g-0">
                      <div class="col-md-1">
                        <img
                          src="/assets/social icons/_Instagram.svg"
                          class="img-fluid rounded-start mx-2"
                          alt="Instagram"
                        />
                      </div>

                      <div class="col-md-10">
                        <div class="card-body">
                          <h5 class="card-title">Instagram</h5>
                          <p class="card-text">
                            <small class="text-body-secondary">{{
                              form?.instagram
                            }}</small>
                          </p>
                        </div>
                      </div>

                      <div class="col-md-1">
                        <div class="d-flex align-items-center text-end">
                          <button
                            type="button"
                            class="social-media-account-wrapper"
                            @click="
                              toggle('links', true, {
                                key: 'instagram',
                                text: form.instagram,
                              })
                            "
                          >
                            <img
                              src="/assets/artist-account/edit-band-member.svg"
                              class="social-media-account"
                              alt="edit social media account"
                            />
                          </button>
                          <button
                            type="button"
                            @click="removeSocialMedia('instagram')"
                            class="social-media-account-wrapper"
                          >
                            <img
                              src="/assets/artist-account/delete-band-member.svg"
                              class="social-media-account"
                              alt="delete social media account"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
                <transition name="fade" mode="out-in">
                  <div
                    class="card mb-3 social-media-account-row"
                    v-if="form.spotify"
                    style="height: 90px"
                  >
                    <div class="row g-0">
                      <div class="col-md-1">
                        <img
                          src="/assets/social icons/_Spotify.svg"
                          class="img-fluid rounded-start mx-2"
                          alt="Spotify"
                        />
                      </div>

                      <div class="col-md-10">
                        <div class="card-body">
                          <h5 class="card-title">Spotify</h5>
                          <p class="card-text">
                            <small class="text-body-secondary">{{
                              form.spotify
                            }}</small>
                          </p>
                        </div>
                      </div>

                      <div class="col-md-1">
                        <div class="d-flex align-items-center text-end">
                          <button
                            type="button"
                            class="social-media-account-wrapper"
                            @click="
                              toggle('links', true, {
                                key: 'spotify',
                                text: form.spotify,
                              })
                            "
                          >
                            <img
                              src="/assets/artist-account/edit-band-member.svg"
                              class="social-media-account"
                              alt="edit social media account"
                            />
                          </button>
                          <button
                            type="button"
                            @click="removeSocialMedia('spotify')"
                            class="social-media-account-wrapper"
                          >
                            <img
                              src="/assets/artist-account/delete-band-member.svg"
                              class="social-media-account"
                              alt="delete social media account"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
                <transition name="fade" mode="out-in">
                  <div
                    class="card mb-3 social-media-account-row"
                    v-if="form.twitter"
                    style="height: 90px"
                  >
                    <div class="row g-0">
                      <div class="col-md-1">
                        <img
                          src="/assets/social icons/_X.svg"
                          class="img-fluid rounded-start mx-2"
                          alt="X"
                        />
                      </div>

                      <div class="col-md-10">
                        <div class="card-body">
                          <h5 class="card-title">X</h5>
                          <p class="card-text">
                            <small class="text-body-secondary">{{
                              form.twitter
                            }}</small>
                          </p>
                        </div>
                      </div>

                      <div class="col-md-1">
                        <div class="d-flex align-items-center text-end">
                          <button
                            type="button"
                            class="social-media-account-wrapper"
                            @click="
                              toggle('links', true, {
                                key: 'twitter',
                                text: form.twitter,
                              })
                            "
                          >
                            <img
                              src="/assets/artist-account/edit-band-member.svg"
                              class="social-media-account"
                              alt="edit social media account"
                            />
                          </button>
                          <button
                            type="button"
                            @click="removeSocialMedia('twitter')"
                            class="social-media-account-wrapper"
                          >
                            <img
                              src="/assets/artist-account/delete-band-member.svg"
                              class="social-media-account"
                              alt="delete social media account"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
                <transition name="fade" mode="out-in">
                  <div
                    class="card mb-3 social-media-account-row"
                    v-if="form.youtube"
                    style="height: 90px"
                  >
                    <div class="row g-0">
                      <div class="col-md-1">
                        <img
                          src="/assets/social icons/_YouTube.svg"
                          class="img-fluid rounded-start mx-2"
                          alt="YouTube"
                        />
                      </div>

                      <div class="col-md-10">
                        <div class="card-body">
                          <h5 class="card-title">YouTube</h5>
                          <p class="card-text">
                            <small class="text-body-secondary">{{
                              form.youtube
                            }}</small>
                          </p>
                        </div>
                      </div>

                      <div class="col-md-1">
                        <div class="d-flex align-items-center text-end">
                          <button
                            type="button"
                            class="social-media-account-wrapper"
                            @click="
                              toggle('links', true, {
                                key: 'youtube',
                                text: form.youtube,
                              })
                            "
                          >
                            <img
                              src="/assets/artist-account/edit-band-member.svg"
                              class="social-media-account"
                              alt="edit social media account"
                            />
                          </button>
                          <button
                            type="button"
                            @click="removeSocialMedia('youtube')"
                            class="social-media-account-wrapper"
                          >
                            <img
                              src="/assets/artist-account/delete-band-member.svg"
                              class="social-media-account"
                              alt="delete social media account"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
              <!-- end of band-and-social-->

              <div
                class="d-flex justify-content-between group-item accept-events"
              >
                <label class="form-check-label" for="flexSwitchCheckDefault"
                  >Do you want to accept events?</label
                >
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    v-model="form.accept_booking"
                    id="flexSwitchCheckDefault"
                  />
                </div>
              </div>

              <div class="d-flex justify-content-between group-item">
                <label class="form-check-label" for="flexSwitchCheckDefault"
                  >Do you want to accept custom song?</label
                >
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    v-model="form.accept_request"
                    id="flexSwitchCheckDefault"
                  />
                </div>
              </div>

              <div class="d-flex justify-content-between group-item">
                <label class="form-check-label" for="flexSwitchCheckDefault"
                  >Do you want to accept booking for special occassions?</label
                >
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    v-model="form.accept_proposal"
                    id="flexSwitchCheckDefault"
                  />
                </div>
              </div>

              <!-- About artist - Textarea -->
              <div class="form-group form-about-artist">
                <label for="about-artist">About the Artist</label><br />
                <textarea
                  v-model="form.bio"
                  maxlength="500"
                  class="form-control about-artist"
                  placeholder="My name is [Your Name], and I am a [genre/ style] music artist based in [city, country]. I am writing to propose a music collaboration opportunity that I believe would be mutually beneficial and creatively inspiring......"
                >
                </textarea>
                <p v-show="form.bio" class="char-count">
                  Maximum 500 characters ({{ remainingChars }} left)
                </p>
                <div v-for="err in error?.bio" :key="err" class="text-danger">
                  {{ err }}
                </div>
              </div>

              <div class="song-preview">
                <h5 class="title">Upload a Song for Preview</h5>
                <p class="description">
                  When you upload a song, it will be showcased on the platform
                  as a your voice sample allowing listeners to have a preview
                  listen.
                </p>

                <div class="form-group">
                  <label for="songTitle">Title of the song</label>
                  <input
                    type="text"
                    v-model="form.song_title"
                    name="songTitle"
                    class="form-control"
                    required
                  />

                  <div
                    v-for="err in error?.song_title"
                    :key="err"
                    class="text-danger"
                  >
                    {{ err }}
                  </div>
                </div>

                <div
                  class="upload-audio"
                  v-if="uploadDragSongBox"
                  @dragover="handleDragOverSong"
                  @dragleave="handleDragLeaveSong"
                  @drop="handleDropSong"
                  :class="{ 'drag-over': isDragOver }"
                >
                  <div class="text-center upload-file-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="73"
                      height="74"
                      viewBox="0 0 73 74"
                      fill="none"
                    >
                      <path
                        d="M26.6035 22.1539V50.8632C25.2924 50.2319 23.8357 49.9563 22.382 50.0645C20.7481 50.1703 19.1812 50.7473 17.8741 51.7243C16.5669 52.7013 15.5767 54.0358 15.0254 55.5633C14.474 57.0909 14.3856 58.7449 14.771 60.3216C15.1564 61.8983 15.9987 63.329 17.1943 64.4374C18.3899 65.5458 19.8866 66.2835 21.5001 66.5598C23.1135 66.836 24.7732 66.6387 26.2749 65.9922C27.7766 65.3456 29.0547 64.278 29.9518 62.9209C30.8488 61.5637 31.3257 59.9762 31.3238 58.3539V32.1162C31.3316 31.8203 31.4266 31.533 31.597 31.2898C31.7674 31.0466 32.0058 30.8581 32.2829 30.7473L53.0844 22.8381C53.2265 22.7782 53.3815 22.755 53.535 22.7708C53.6885 22.7865 53.8355 22.8407 53.9621 22.9281C54.0887 23.0156 54.1908 23.1335 54.2589 23.2707C54.3269 23.408 54.3586 23.5601 54.351 23.7129V40.6724C53.041 40.0377 51.5834 39.762 50.1295 39.8738C47.9619 40.0226 45.937 40.9982 44.4803 42.5955C43.0236 44.1928 42.2486 46.2874 42.3182 48.4392C42.3877 50.5909 43.2965 52.632 44.8534 54.1337C46.4103 55.6353 48.4941 56.4805 50.6668 56.4915C52.926 56.4697 55.084 55.5603 56.667 53.9631C58.2499 52.3659 59.1284 50.2115 59.1094 47.9731V11.0122C59.1103 10.5109 58.9889 10.0168 58.7556 9.57192C58.5223 9.12705 58.184 8.7446 57.7695 8.45711C57.355 8.16963 56.8765 7.98561 56.3748 7.92072C55.8731 7.85582 55.3629 7.91198 54.8878 8.0844L29.6354 17.7811C28.7448 18.1233 27.9791 18.7237 27.4382 19.5038C26.8974 20.2839 26.6065 21.2075 26.6035 22.1539Z"
                        fill="#ABADC6"
                      />
                    </svg>

                    <h5 class="drag-files">Drag a file here</h5>
                    <p class="or">or</p>
                    <div class="select-files-wrapper">
                      <label for="files" class="btn btn-info"
                        >Select file</label
                      >
                      <input
                        type="file"
                        class="upload-music"
                        id="files"
                        style="display: none"
                        ref="musicInput"
                        @change="handleMusicUpload"
                        accept=".mp3,.mp4"
                      />
                    </div>
                  </div>
                </div>

                <!-- Uploaded music -->

                <transition name="fade" mode="out-in">
                  <div v-if="uploadedSongWrapper" class="uploaded-song-wrapper">
                    <audio
                      controls
                      class="audio-controls-wrapper"
                      ref="audioPlayer"
                    >
                      <source :src="uploadedMusic" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <div
                      class="d-flex align-items-center justify-content-between song-wrapper"
                    >
                      <div class="d-flex align-items-start song-title-wrapper">
                        <img
                          src="/assets/artist-account/mp3-icon.svg"
                          alt="Music icon"
                        />
                        <div>
                          <h5 class="song-title">{{ songTitle }}</h5>
                          <!-- <h5 class="song-title">{{ form.song_title }}</h5> -->

                          <p class="preview">
                            <span class="badge file-size"
                              >{{ fileSize }}KB</span
                            >
                          </p>
                        </div>
                      </div>
                      <div
                        v-if="compressing"
                        class="d-flex align-items-center loading-wrap"
                      >
                        <div class="spinner"></div>
                        <h5 class="mb-0 uploading">Uploading</h5>
                      </div>
                      <div
                        class="d-flex align-items-center remove-music-wrapper"
                      >
                        <img
                          :src="playIcon"
                          @click="togglePlay()"
                          alt="Music icon"
                        />
                        <img
                          src="/assets/artist-account/remove-song-icon.svg"
                          @click="removeMusic"
                          alt="Music icon"
                        />
                      </div>
                    </div>
                  </div>
                </transition>
                <div
                  v-if="defaultFileFormat"
                  class="d-flex align-items-center audio-file-format"
                >
                  <span class="material-symbols-outlined info">&#xe88e;</span>
                  <p class="max-file-size">
                    Please upload an MP3 or MP4 audio file with a maximum size
                    of 10MB.
                  </p>
                </div>

                <div
                  v-for="err in error?.song"
                  :key="err"
                  class="d-flex align-items-center audio-file-format errorMessage"
                >
                  <span class="material-symbols-outlined info">&#xe88e;</span>
                  <p class="max-file-size">{{ err }}</p>
                </div>
              </div>
              <!-- end of song-preview -->

              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-success submit-form"
                  v-if="showSubmitButton"
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="btn btn-success disabled submit-form"
                  v-else
                >
                  <LoadingIndicator />
                </button>
              </div>
            </form>
          </div>

          <div class="col-3"></div>
        </div>
        <!-- end of row -->
      </div>
      <!-- end of container -->
    </section>
    <SuccesModal />
    <profile-modal
      @close="toggleProfile"
      @formDataUpdated="handleArtistAvatarUpdate"
      page="page2"
    />
  </div>
</template>
<script>
// import Layout from '/src/components/Layouts/ArtistLayout.vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
// eslint-disable-next-line import/no-absolute-path
import MemberForm from '/src/views/Artist/Form/AddMember.vue'
// eslint-disable-next-line import/no-absolute-path
import BlankHeader from '@/components/Home/BlankHeader.vue'
import Multiselect from '@vueform/multiselect'
// eslint-disable-next-line import/no-absolute-path
import SocialMediaForm from '/src/views/Artist/Form/SocialMedia.vue'
// eslint-disable-next-line import/no-absolute-path
import ProfileModal from '/src/components/Dashboard/Modals/ProfileModal.vue'
// eslint-disable-next-line import/no-absolute-path
import LoadingIndicator from '/src/components/LoadingIndicator.vue'
// eslint-disable-next-line import/no-absolute-path
import { gzip } from 'pako'
// eslint-disable-next-line import/no-absolute-path
import SuccesModal from '/src/components/SuccessModal.vue'

export default {
  components: {
    // layout: Layout,
    'member-form': MemberForm,
    'social-media': SocialMediaForm,
    // eslint-disable-next-line vue/no-unused-components
    BlankHeader,
    Multiselect,
    ProfileModal,
    LoadingIndicator,
    SuccesModal,
    // eslint-disable-next-line vue/no-unused-components
    gzip
  },
  data () {
    return {
      selectedArtistType: '',
      selectedArtistCategory: '',
      artistTypes: [
        { label: 'Visual Artists', value: 'visual' },
        { label: 'Performing Artists', value: 'performing' },
        { label: 'Literary Artists', value: 'literary' },
        { label: 'Digital Artists', value: 'digital' }
      ],
      artistCategories: {
        visual: ['Painter', 'Sculptors', 'Photographers', 'Mural painter'],
        performing: [
          'Disk Jockey',
          'Solo artist',
          'Band',
          'Guitarist',
          'Vocalist',
          'Bassist',
          'Drummer',
          'Keyboardist',
          'Dancers',
          'Actors',
          'Spoken Word Artists',
          'Host',
          'Cosplayers'
        ],
        literary: ['Writers', 'Poets'],
        digital: [
          'Graphics Designers',
          'Animators',
          'Content writer',
          'Copywriters',
          'Content creator'
        ]
      },
      showSubmitButton: true,
      form: {
        artist_type: null,
        artist_category: null,
        artist_name: null,
        genres: [],
        bio: null,
        avatar: null,
        street_address: null,
        city: null,
        province: null,
        youtube: null,
        twitter: null,
        instagram: null,
        spotify: null,
        accept_request: false,
        accept_booking: false,
        accept_proposal: false,
        audio: null,
        song_title: null,
        song_genre: null
      },
      hasOthers: false,
      // others: '',
      formGenres: [],
      songGenres: [],
      avatar: '/assets/artist-account/new.svg', // null
      options: ['list', 'of', 'options'],
      // members: [],
      // errors: {},
      active: false,
      formType: '',
      formHeader: 'Add Member',
      formSubHeading:
        'Lorem ipsum dolor sit amet consectetur. Nam lacus viverra nec orci arcu id fringilla ultrices.',
      uploadedMusic: null,
      uploadedSongWrapper: false,
      songTitle: 'My Awesome Song.mp3',
      fileSize: '', // Store file size here
      metadata: {},
      fileInfo: null,
      errorMessage: '',
      defaultFileFormat: true,
      isDragOver: false,
      uploadDragSongBox: true,
      // For update social media link
      social: {
        text: null,
        key: null
      },
      playIcon: '/assets/play-circle.svg',
      memberIndex: -1,
      isSearchable: true,

      validImage: false,
      validAudio: false,

      audioMagic: '',
      imageMagic: '',
      avatarMagic: '',
      tempMagic: '',
      targetMagic: '',
      audioSize: 0,
      invalidAudio: false,

      parentAvatar: '',

      compressing: false
    }
  },
  setup () {
    /**
     *
     * profile: Object, errors: Object, genres: Object, artist_types: Object, artist_genre: Object, img: String, members: Array
     */
  },
  beforeCreate () {
    this.form = {
      artist_type: null,
      artist_name: null,
      genres: [],
      bio: null,
      avatar: null,
      street_address: null,
      city: null,
      province: null,
      youtube: null,
      twitter: null,
      instagram: null,
      spotify: null,
      accept_request: false,
      accept_booking: false,
      accept_proposal: false,
      song: null,
      song_title: null,
      song_genre: null

      // isDragOver: false
    }

    this.validImage = false
    this.validAudio = false
    this.audioSize = 0
    this.invalidAudio = false

    this.social = {
      text: '',
      key: ''
    }

    // this.memberIndex = -1;
    this.$store.commit('SET_MEMBER_INDEX')
    console.log('-Before Create-')
  },
  created () {
    this.$store.commit('SET_MEMBER_INDEX')
    console.log('Fetch Profile (created)')
    this.fetchProfile().then((res) => {
      const {
        // eslint-disable-next-line no-unused-vars
        status: statusCode,
        data: {
          result: { genres }
        }
      } = res

      this.form.genres = genres
    })
  },
  mounted () {
    const success = (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      console.log('My Geo-Location: ', latitude, longitude)
      // Do something with the position
    }

    // eslint-disable-next-line n/handle-callback-err
    const error = (err) => {
      console.log('On Error Geo-Location', error)
    }

    if (navigator.geolocation) {
      // This will open permission popup
      navigator.geolocation.getCurrentPosition(success, error)
    }
    // eslint-disable-next-line no-undef
    if (this.artist_type) payload.artist_type = this.artist_type

    this.audioMagic = ''
    this.imageMagic = ''
    this.tempMagic = ''
    this.targetMagic = ''

    console.log('--- Mounted ---')
    this.$store.commit('SET_MEMBER_INDEX')
    this.$refs.multiselect.$el.focus()

    console.log('Ref[multiselect]: ', this.$refs.multiselect)

    // this.$echo.private(`profile.${this.userInfo?.id}`)
    //   .listen(`.update-member`, (e) =>
    //   {
    //     console.log('Member via Pusher [Artist/Profile]: ', e);
    //     const { response: { members } } = e;
    //     if (members) this.SET_MEMBERS(members);

    //   })

    //   /*
    //     1. artistOptions:
    //     - artist types (artist_types)
    //     - genres (genre list)

    //     2. fetchProfile
    //     - account
    //     - genre
    //     - members
    //     - profile
    //   */

    this.form = this.myAccount
    this.form.avatar = ''
    this.uploadedMusic = this.myAccount.song || ''
    this.songTitle = this.myAccount?.song_title || ''

    this.avatar = this.myAvatar || '/assets/artist-account/new.svg'
    this.avatarMagic = this.myAvatar || '/assets/artist-account/new.svg'
    this.formGenres = this.myAccount?.genres || []
    // eslint-disable-next-line no-unneeded-ternary
    this.uploadedSongWrapper = this.uploadedMusic !== '' ? true : false
    this.uploadDragSongBox = !this.uploadedSongWrapper
    if (this.uploadedSongWrapper) {
      this.audioSize = 10000000 // 65536000
    }

    console.log(
      '\n\n-----------------------------------\n1. Form: ',
      this.form,
      `\n2. Uploaded Music [${this.songTitle}]: `,
      this.uploadedMusic,
      '\n3. Avatar: ',
      this.avatar,
      '\n4. Song: ',
      this.song,
      '\n5. Band Genre: ',
      this.formGenres
    )
    console.log('--- End Mounted ---')
  },
  props: {
    hasNoError: {
      type: Boolean,
      default: false,
      required: true
    },
    formData: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        artist_type: null,
        artist_category: null,
        artist_name: null,
        genres: [],
        bio: null,
        avatar: null,
        street_address: null,
        city: null,
        province: null,
        youtube: null,
        twitter: null,
        instagram: null,
        spotify: null,
        accept_request: false,
        accept_booking: false,
        accept_proposal: false,
        song: null,
        song_title: null,
        song_genre: null
      },
      required: true
    },
    error: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
      required: true
    },
    message: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    ...mapActions([
      'fetchArtistOptions',
      'updateArtistProfile',
      'removeMember',
      /* 'removeSocialMedia', */ 'artistOptions',
      'fetchProfile',
      'fetchMember'
    ]),
    ...mapMutations(['SET_PROFILE', 'SET_ARTIST', 'SET_MEMBERS']),
    handleArtistAvatarUpdate (blob) {
      if (blob instanceof Blob) {
        this.parentAvatar = URL.createObjectURL(blob)
        this.avatar = this.parentAvatar
        console.log('set image', this.avatar)
      } else {
        this.avatar = ''
      }
    },
    fileCheck (file) {
      // magicAudio
      const fileReader = new FileReader()
      const self = this
      this.tempMagic = ''

      fileReader.readAsArrayBuffer(file)
      fileReader.onloadend = function (e) {
        const fileContent = fileReader.result
        const compressedContent = gzip(fileContent, { to: 'string' })

        // size after compression in kilobytes
        console.log(
          'Compressed Audio File Size:',
          (compressedContent.length / 1024).toFixed(2),
          'KB'
        )

        const arr = new Uint8Array(e.target.result).subarray(0, 4)

        let header = ''
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16)
        }

        self.tempMagic = header
      }
    },
    changeImage (event) {
      const file = event.target.files[0]
      this.targetMagic = 'image'
      this.avatarMagic = file
      // this.avatar = URL.createObjectURL(file);

      // this.form.avatar = file;

      // const { type } = file;

      // switch (type) {
      //   case 'image/png':
      //   case 'image/webp':
      //   case 'image/svg':
      //   case 'image/jpeg':
      //     this.validImage = true;
      //     this.form.avatar = file;

      //     break;
      //   default:

      //     this.validImage = false;
      //     this.avatar = this.account?.avatar || this.profile?.avatar || '/assets/artist-account/new.svg';

      //     //return false;
      // }
      if (file) {
        this.fileCheck(file)
      }
      // return this.validImage;
      console.log('Change Image: ', event.target.files[0])
    },
    onOpenOption (event) {
      this.isSearchable = true
      console.log('Event')
    },
    onInputAddress (event) {
      this.isSearchable = false
    },
    submit () {
      this.showSubmitButton = false
      this.form.genres = this.formGenres

      if (typeof this.form.avatar === 'string') this.form.avatar = ''
      if (typeof this.form.song === 'string') this.form.song = ''

      this.$emit('form', this.form)

      this.fetchProfile().then((res) => {
        const {
          // eslint-disable-next-line no-unused-vars
          status: statusCode,
          data: {
            result: { genres }
          }
        } = res

        this.form.genres = genres
        this.showSubmitButton = true
      })

      // eslint-disable-next-line spaced-comment
      //this.$router.push('/artist');
    },
    removeSocialMedia (key) {
      switch (key) {
        case 'youtube':
          this.form.youtube = ''
          break
        case 'instagram':
          this.form.instagram = ''
          break
        case 'twitter':
          this.form.twitter = ''
          break
        case 'spotify':
          this.form.spotify = ''
          break
        default:
      }
    },
    dismiss () {
      const body = document.querySelector('body')
      this.active = false
      this.active
        ? body.classList.add('modal-open')
        : body.classList.remove('modal-open')
      this.social.key = ''
      this.social.text = ''

      this.$store.commit('SET_MEMBER_INDEX', -1)
    },
    toggle (option = 'members', isEdit = false, params) {
      this.social = { key: '', text: '' }

      this.$store.commit('SET_MEMBER_INDEX')

      if (isEdit && option === 'links') {
        this.social = params
      } else if (option === 'members' && isEdit && params > -1) {
        this.$store.commit('SET_MEMBER_INDEX', params)
      }

      const body = document.querySelector('body')
      this.active = !this.active
      this.active
        ? body.classList.add('modal-open')
        : body.classList.remove('modal-open')

      this.formType = option
      if (!isEdit)
        // eslint-disable-next-line curly
        this.formHeader =
          option === 'members' ? 'Add Member' : 'Add Social Media Account'
      // eslint-disable-next-line curly
      else {
        this.formHeader =
          option === 'members' ? 'Edit Member' : 'Edit Social Media Account'
      }
    },
    replaceByDefault (e) {
      e.target.src =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&usqp=CAU'
    },
    updateSocial (key, val) {
      val = val.replace('https://www.', '')
      val = val.replace('https://', '')
      val = val.replace('www.', '')

      val = `https://www.${val}`

      switch (key) {
        case 'youtube':
          this.form.youtube = val

          this.social.key = key
          this.social.text = val

          break
        case 'instagram':
          this.form.instagram = val

          this.social.key = key
          this.social.text = val

          break
        case 'twitter':
          this.form.twitter = val

          this.social.key = key
          this.social.text = val

          break
        case 'spotify':
          this.form.spotify = val

          this.social.key = key
          this.social.text = val

          break
        default:
          this.social.key = ''
          this.social.text = ''
      }
    },
    updateMember (val) {
      if (val) {
        this.members.push(val)
        // eslint-disable-next-line no-undef
        new Modal(document.getElementById('profileSuccessModal'), {
          keyboard: false,
          backdrop: 'static'
        }).show()
      }
      // this.$store.commit('SET_MEMBER_INDEX');

      this.dismiss()
    },
    fetchGenre (query) {
      if (!query) {
        console.log('Empty Query fetchGenre')
        this.artistOptions()
      }

      return this.formArtistGenres
    },
    handleMusicUpload (event) {
      const file = event.target.files[0]

      this.compressing = true
      //  size before compression in megabytes
      console.log(
        'Original Audio File Size:',
        (file.size / 1024).toFixed(2),
        'KB'
      )

      // const reader = new FileReader();

      //   reader.onload = () => {
      //     const fileContent = reader.result;

      //     // Compress the file content using pako
      //     const compressedContent = pako.gzip(fileContent, { to: 'string' });

      //     // Log the size after compression in kilobytes
      //     console.log('Compressed Audio File Size:', (compressedContent.length / 1024).toFixed(2), 'KB');

      //     // Set compressing to false after 3 seconds
      //     setTimeout(() => {
      //       this.compressing = false;
      //     }, 1000);
      //   };
      //  reader.readAsBinaryString(file);

      console.log('Handle Music Upload: ', file)
      this.targetMagic = 'audio'
      // eslint-disable-next-line spaced-comment
      //this.fileCheck(file);
      if (file) this.fileCheck(file)

      const { type, name, size } = file

      // eslint-disable-next-line vue/no-mutating-props
      this.error.song = []

      this.validAudio = false

      this.audioSize = size

      if (
        type === 'audio/mpeg' &&
        (name.endsWith('.mp3') || name.endsWith('.mp4'))
      ) {
        this.validAudio = true
        this.invalidAudio = false
      } else {
        this.invalidAudio = true

        this.uploadedMusic = URL.createObjectURL(file)
        this.songTitle = file.name.replace(/\.[^/.]+$/, '')

        const sizeInBytes = file.size
        const sizeInKilobytes = Math.floor(sizeInBytes / 1024)

        this.fileSize = sizeInKilobytes
        this.uploadDragSongBox = false
        this.uploadedSongWrapper = true

        // eslint-disable-next-line vue/no-mutating-props
        this.error.song = ['The Song should be in a mp3 or mp4 format.']
      }

      this.handleFiles(file)
    },
    handleFiles (file) {
      if (file) {
        // Check if the file is an MP3 file
        if (file.type === 'audio/mpeg') {
          const sizeInBytes = file.size
          const sizeInKilobytes = Math.floor(sizeInBytes / 1024)

          //  this.fileSize = sizeInKilobytes;
          if (sizeInBytes <= 10000000) {
            this.uploadedMusic = URL.createObjectURL(file)
            // eslint-disable-next-line spaced-comment
            this.songTitle = file.name //.replace(/\.[^/.]+$/, '')
            this.form.song = file
            this.fileSize = sizeInKilobytes
            this.errorMessage = ''
            this.uploadDragSongBox = false
            this.uploadedSongWrapper = true
            this.defaultFileFormat = false
            setTimeout(() => {
              this.compressing = false
            }, 5000)

            // check if metadata exists

            //     const fileReader = new FileReader();
            // fileReader.onloadend = (e) => {
            //   const arr = new Uint8Array(e.target.result).subarray(0, 4);

            //   const buffer = fileReader.result;
            //   const view = new DataView(buffer);
            //     // Check for ID3v2 tag (common for MP3 files)
            //   if (
            //     view.getUint8(0) === 73 &&  // I
            //     view.getUint8(1) === 68 &&  // D
            //     view.getUint8(2) === 51     // 3
            //   ) {
            //     // Extract metadata (this is a simplified example)
            //     const title = String.fromCharCode(view.getUint8(6), view.getUint8(7));
            //     const artist = String.fromCharCode(view.getUint8(30), view.getUint8(31));
            //     const album = String.fromCharCode(view.getUint8(63), view.getUint8(64));
            //     const genre = String.fromCharCode(view.getUint8(90));
            //     const date = String.fromCharCode(view.getUint8(93), view.getUint8(94));

            //     // Store metadata
            //     this.metadata.title = title;
            //     this.metadata.artist = artist;
            //     this.metadata.album = album;
            //     this.metadata.genre = genre;
            //     this.metadata.date = date;

            //     if (!this.hasCompleteMetadata) {
            //       this.error.song = ['Missing metadata fields. Please check the file.'];
            //       event.target.value = null;
            //       this.clearErrorMessageAfterDelay();
            //     }} else {
            //       this.error.song = ['File format not supported or no metadata found.'];
            //     event.target.value = null;
            //     this.clearErrorMessageAfterDelay();
            //   }
            // }
            // fileReader.readAsArrayBuffer(file);
          } else {
            // eslint-disable-next-line vue/no-mutating-props
            this.error.song = [
              'File size exceeds 10MB. Please upload a smaller MP3 or MP4 file.'
            ]
            event.target.value = null
            this.clearErrorMessageAfterDelay()
          }
        } else {
          // eslint-disable-next-line vue/no-mutating-props
          this.error.song = ['Please upload an MP3 or MP4 file.']
          event.target.value = null
          this.clearErrorMessageAfterDelay()
        }
      }
    },
    clearErrorMessage () {
      // eslint-disable-next-line vue/no-mutating-props
      this.error.song = []
    },
    clearErrorMessageAfterDelay () {
      setTimeout(() => {
        this.clearErrorMessage()
        this.defaultFileFormat = true
      }, 10000000) // 10000
      this.defaultFileFormat = false
    },
    removeMusic () {
      this.metadata = {}
      this.validAudio = false
      this.audioMagic = ''

      // eslint-disable-next-line vue/no-mutating-props
      this.error.song = []
      this.uploadedMusic = ''
      this.songTitle = ''
      this.uploadDragSongBox = true
      this.uploadedSongWrapper = false
      this.defaultFileFormat = true
      this.$refs.audioPlayer.pause()
      this.playIcon = '/assets/play-circle.svg'
    },
    togglePlay () {
      if (this.$refs.audioPlayer.paused) {
        this.playIcon = '/assets/stop-circle.svg'
        this.$refs.audioPlayer.play()
      } else {
        this.$refs.audioPlayer.pause()
        this.playIcon = '/assets/play-circle.svg'
      }
    },
    handleDragOverSong (event) {
      event.preventDefault()
      this.isDragOver = true
      this.compressing = true
    },
    handleDragLeaveSong (event) {
      event.preventDefault()
      this.isDragOver = false
    },
    handleDropSong (event) {
      event.preventDefault()
      const file = event.dataTransfer.files[0]
      this.handleFiles(file)
      this.isDragOver = false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'token',
      'artistProfile',
      'artistGenre',
      'myAccount',
      'formArtistGenres',
      'myAvatar'
    ]),
    ...mapState({
      artistTypes: (state) => state.artist.artist_types,
      // artistCategory: (state) => state.artist.artist_category,
      genres: (state) => state.artist.genres,
      members: (state) => state.artist.members,
      account: (state) => state.account,
      profile: (state) => state.profile,
      member: (state) => state.artist.member,
      mx: (state) => state.artist.memberIndex
    }),
    selectedArtistCategoryVisible () {
      return (
        this.selectedArtistType &&
        this.artistCategories[this.selectedArtistType]
      )
    },
    remainingChars () {
      return 500 - (this.form.bio ? this.form.bio.length : 0)
    },
    checkImage () {
      let flagImage = true

      if (!this.validImage && this.imageMagic !== '') {
        return false
      }

      if (typeof this.form.avatar === 'string') {
        return true
      }

      if (typeof this.form.avatar === 'object') {
        flagImage = this.validImage
      }

      return this.validImage && flagImage
    },
    checkAudio () {
      let flagAudio = true

      if (!this.validAudio && this.audioMagic !== '') {
        // eslint-disable-next-line vue/no-mutating-props, vue/no-side-effects-in-computed-properties
        this.error.song = [
          // 'The Song should be in a mp3 format.',
          'The Song should be in a mp3 or mp4 format.'
        ]
        return false
      }

      if (this.audioSize > 10000000) {
        // eslint-disable-next-line vue/no-mutating-props, vue/no-side-effects-in-computed-properties
        this.error.song = [
          'The Song maximum file size to upload is 10MB (10000 KB). Try to compress it to make it under 10MB.'
        ]
        return false
      }

      if (this.uploadedMusic !== '') {
        return true
      }

      if (typeof this.form.song === 'string' && this.uploadedMusic !== '') {
        return true
      }

      if (typeof this.form.song === 'object') {
        flagAudio = this.validAudio
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties, no-unneeded-ternary
        this.validAudio = this.audioSize <= 10000000 ? true : false
        console.log(`Form Song [${this.audioSize}]: `, this.validAudio)
      }

      return this.validAudio && flagAudio
    },
    hasCompleteMetadata () {
      // Check if any of the metadata fields are missing
      return (
        this.metadata.title !== undefined &&
        this.metadata.artist !== undefined &&
        this.metadata.album !== undefined &&
        this.metadata.genre !== undefined &&
        this.metadata.date !== undefined
      )
    }
  },
  watch: {
    tempMagic (val) {
      console.log('Magic Mime: ', val)
      if (this.targetMagic === 'audio' && val !== '') {
        this.audioMagic = val
        // eslint-disable-next-line no-unneeded-ternary
        this.validAudio = val === '4944334' || val === '00018' ? true : false
      } else if (this.targetMagic === 'image' && val !== '') {
        this.imageMagic = val

        switch (val) {
          case '89504e47': // png
          case 'ffd8ffe0': // jpg, jpeg, jps, jiff
          case '52494646': // webp
          case '3c737667': // svg
            this.validImage = true
            this.avatar = URL.createObjectURL(this.avatarMagic)
            this.form.avatar = this.avatarMagic
            console.log('Accepted Image: ', this.avatar)
            break
          default:
            // this.form.avatar = this.account?.avatar || this.profile?.avatar || '';
            // this.avatar = this.account?.avatar || this.profile?.avatar || '/assets/artist-account/new.svg';
            console.log(
              'Rejected Image: ',
              this.account,
              this.avatar,
              this.form.avatar
            )
            this.validImage = false
            break
        }
      }
    },
    account (val) {
      this.form = val
      this.form.avatar = ''
      this.uploadedMusic = val?.song || ''
      this.songTitle = val?.song_title || ''

      // eslint-disable-next-line no-undef
      if (this.artist_type) payload.artist_type = this.artist_type

      this.avatar =
        this.account?.avatar ||
        this.profile?.avatar ||
        '/assets/artist-account/new.svg'
      this.formGenres = val?.genres || []
    }
  }
}
</script>

<style>
@import "@vueform/multiselect/themes/default.css";
@import "@/assets/css/artist-ui.css";

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
