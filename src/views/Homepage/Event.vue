<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <layout>
    <section class="events">
      <div class="container-fluid">
        <div class="container">
          <div class="content">
            <h2 class="top-level-title">
              Let's make some noise<br />
              and create unforgettable<br />
              moments
            </h2>
            <p class="top-level-sub-title">
              Custom tunes for any mood, and booking the best artists just<br />
              got easier with our website!
            </p>
            <a href="#" class="btn btn-primary find-event-planner"
              >Find Event Planner</a
            >
          </div>
        </div>
        <div class="hidden-img">
          <img
            src="/assets/events/events-hidden-bg.webp"
            class="img-fluid"
            alt="Send yourself a reminder"
          />
        </div>
      </div>
    </section>

    <section class="events-showing">
      <div class="container">
        <div class="text-center">
          <h3 class="events-showing-title">Events</h3>
          <p class="sub-heading">Where memories are made. Discover, explore, experience: Live events at you fingertips.
          </p>
        </div>

        <div
          v-if="userRole === 'organizer'"
          class="d-flex align-items-center justify-content-between create-event-wrapper"
        >
          <div></div>

          <div class="create-event-btn-wrap">
            <button
              class="d-flex align-items-center btn create-event"
              @click="toggleCreate"
            >
              <span class="material-symbols-rounded add-circle">&#xe147;</span>
              Create event
            </button>
          </div>
        </div>

        <FilterResults>
          <template #top-filter>
            <div>
              <button class="border-0 d-flex align-items-center btn filter-btn">
                <span class="material-symbols-rounded sort-icon">&#xe164;</span>
                Filter
              </button>
            </div>

            <div class="search">
              <input
                type="text"
                class="form-control"
                placeholder="Search events"
                v-model="search"
                aria-label="Search events"
                aria-describedby="button-addon2"
              />
              <button class="btn border-0 search-btn">
                <span class="material-symbols-rounded search-icon"
                  >&#xe8b6;</span
                >
              </button>
            </div>
          </template>

          <template #bottom-filter>
            <div class="form-group">
              <label>Type of Event</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="event_type"
              >
                <option value="" selected>Select a type of event</option>
                <option
                  v-for="(event_type, index) in eventTypes"
                  :key="index"
                  :value="event_type.value"
                >
                  {{ event_type.text }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Location</label>
              <multiselect
                v-model="city"
                mode="single"
                placeholder="Select a Location"
                :close-on-select="false"
                @select="filterByCity"
                @deselect="filterByCity"
                :create-option="true"
                :options="
                  async function (query) {
                    await fetchCityList(query);
                    return cities;
                  }
                "
                :searchable="true"
                :delay="0"
                autocomplete="off"
                ref="multiselect"
                :filter-results="false"
                label="text"
                noOptionsText="Please input town/city name"
                class="form-select"
              />
            </div>

            <div class="form-group">
              <label>Event date</label>
              <select class="form-select" aria-label="Default select example">
                <option value="" selected>Select an event date</option>
                <option>This Month Events</option>
                <option>Upcoming Events</option>
                <option>Past Events</option>
              </select>
            </div>
          </template>
        </FilterResults>

        <div
          v-if="isOngoingLoading && isUpcomingLoading && isPastLoading"
          class="text-center"
        >
          <BirdLoader />
        </div>

        <div v-else class="events-section">
          <h3 class="even-type-title">This Month Events</h3>
          <div v-if="!isOngoingLoading">
            <div class="row" v-if="events_ongoing.length">
              <div
                class="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3"
                v-for="(event, index) in events_ongoing"
                :key="index"
              >
                <event-card
                  :event="event"
                  :pos="index"
                  @show="toggleEvent"
                  group="ongoing"
                />
              </div>
              <div class="float-end pagination-wrap">
                <nav aria-label="...">
                  <ul class="pagination">
                    <li class="page-item back-wrap">
                      <button
                        class="page-link"
                        :disabled="ongoingPagination.page === 1"
                        @click="nextOngoingEvent()"
                      >
                        <span
                          class="page-link material-symbols-rounded back-icon"
                          >&#xe5cb;</span
                        >
                      </button>
                    </li>
                    <li class="page-item left-num-wrap">
                      <button
                        class="page-link left-num"
                        @click="selectPage(ongoingPagination.page)"
                      >
                        {{ ongoingPagination?.page }}
                      </button>
                    </li>
                    <li class="page-item active of-wrap" aria-current="page">
                      <span class="page-link of">of</span>
                    </li>
                    <li class="page-item right-num-wrap">
                      <button
                        class="page-link right-num"
                        @click="selectPage(ongoingPagination.last_page)"
                      >
                        {{ ongoingPagination?.last_page }}
                      </button>
                    </li>
                    <li class="page-item next-wrap">
                      <button
                        class="page-link"
                        :disabled="
                          ongoingPagination.last_page === ongoingPagination.page
                        "
                        @click="nextOngoingEvent()"
                      >
                        <span
                          class="page-link material-symbols-rounded next-icon"
                          >&#xe5cc;</span
                        >
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              <!-- end of pagination-wrap -->
            </div>

            <div class="text-center" v-else>
              <NoEvent />
            </div>
          </div>

          <h3 class="even-type-title">Upcoming Events</h3>
          <div v-if="!isUpcomingLoading">
            <div class="row" v-if="events_upcoming.length">
              <div
                class="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3"
                v-for="(event, index) in events_upcoming"
                :key="index"
              >
                <event-card
                  :event="event"
                  :pos="index"
                  @show="toggleEvent"
                  group="upcoming"
                />
              </div>
              <div class="float-end pagination-wrap">
                <nav aria-label="...">
                  <ul class="pagination">
                    <li class="page-item back-wrap">
                      <button
                        class="page-link"
                        :disabled="upcomingPagination.page === 1"
                        @click="prevUpcomingEvent()"
                      >
                        <span
                          class="page-link material-symbols-rounded back-icon"
                          >&#xe5cb;</span
                        >
                      </button>
                    </li>
                    <li class="page-item left-num-wrap">
                      <button
                        class="page-link left-num"
                        @click="selectPage(upcomingPagination.page, 'upcoming')"
                      >
                        {{ upcomingPagination?.page }}
                      </button>
                    </li>
                    <li class="page-item active of-wrap" aria-current="page">
                      <span class="page-link of">of</span>
                    </li>
                    <li class="page-item right-num-wrap">
                      <button
                        class="page-link right-num"
                        @click="
                          selectPage(upcomingPagination.last_page, 'upcoming')
                        "
                      >
                        {{ upcomingPagination?.last_page }}
                      </button>
                    </li>
                    <li class="page-item next-wrap">
                      <button
                        class="page-link"
                        :disabled="
                          upcomingPagination.last_page ===
                          upcomingPagination.page
                        "
                        @click="nextUpcomingEvent()"
                      >
                        <span
                          class="page-link material-symbols-rounded next-icon"
                          >&#xe5cc;</span
                        >
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              <!-- end of pagination-wrap -->
            </div>

            <div class="text-center" v-else>
              <NoEvent />
            </div>
          </div>

          <h3 class="even-type-title">Past Events</h3>
          <div v-if="!isPastLoading">
            <div class="row" v-if="events_past.length">
              <div
                class="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3"
                v-for="(event, index) in events_past"
                :key="index"
              >
                <event-card
                  :event="event"
                  :pos="index"
                  @show="toggleEvent"
                  group="past"
                />
              </div>
              <div class="float-end pagination-wrap">
                <nav aria-label="...">
                  <ul class="pagination">
                    <li class="page-item back-wrap">
                      <button
                        class="page-link"
                        :disabled="pastPagination.page === 1"
                        @click="prevPastEvent()"
                      >
                        <span
                          class="page-link material-symbols-rounded back-icon"
                          >&#xe5cb;</span
                        >
                      </button>
                    </li>
                    <li class="page-item left-num-wrap">
                      <button
                        class="page-link left-num"
                        @click="selectPage(pastPagination.page, 'past')"
                      >
                        {{ pastPagination?.page }}
                      </button>
                    </li>
                    <li class="page-item active of-wrap" aria-current="page">
                      <span class="page-link of">of</span>
                    </li>
                    <li class="page-item right-num-wrap">
                      <button
                        class="page-link right-num"
                        @click="selectPage(pastPagination.last_page, 'past')"
                      >
                        {{ pastPagination?.last_page }}
                      </button>
                    </li>
                    <li class="page-item next-wrap">
                      <button
                        class="page-link"
                        :disabled="
                          pastPagination.last_page === pastPagination.page
                        "
                        @click="nextPastEvent()"
                      >
                        <span
                          class="page-link material-symbols-rounded next-icon"
                          >&#xe5cc;</span
                        >
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              <!-- end of pagination-wrap -->
            </div>

            <div class="text-center" v-else>
              <NoEvent />
            </div>
          </div>
        </div>
      </div>
    </section>

    <view-detail v-if="isLoggedIn" />
    <signupmodal v-else />

    <events-modal @close="dismiss" />
    <event-success />
    <faq />
    <ArtistPopOver @open-modal="openModalSignUp" />
  </layout>
</template>
<script>
// eslint-disable-next-line quotes
import { mapGetters, mapState, mapActions, mapMutations } from "vuex"
// eslint-disable-next-line quotes
import { Modal } from "bootstrap"
import Multiselect from '@vueform/multiselect'

// eslint-disable-next-line import/no-absolute-path
import Layout from '/src/components/Layouts/Layout.vue'
// eslint-disable-next-line import/no-absolute-path
import Faq from '/src/components/Home/FAQ.vue'
// eslint-disable-next-line import/no-absolute-path
import MustSignupModal from '/src/components/Artist/MustSignupModal.vue'
// eslint-disable-next-line import/no-absolute-path
import EventsModal from '/src/components/Auth/Events/Modal.vue'
// eslint-disable-next-line import/no-absolute-path
import ViewDetail from '/src/components/Events/ViewEventDetailsModal.vue'
// eslint-disable-next-line import/no-absolute-path
import EventSuccess from '/src/components/Auth/Events/SuccessModal.vue'
// eslint-disable-next-line import/no-absolute-path
import EventCard from '/src/components/Events/Card.vue'
// eslint-disable-next-line import/no-absolute-path
import FilterResults from '/src/components/FilterResults.vue'
// eslint-disable-next-line import/no-absolute-path
import NoEvent from '/src/components/Events/NoEvent.vue'
// eslint-disable-next-line import/no-absolute-path
import BirdLoader from '/src/components/BirdLoader.vue'
// eslint-disable-next-line import/no-absolute-path
import ArtistPopOver from '/src/components/Events/ArtistPopOver.vue'

export default {
  metaInfo: {
    title: 'Default Title',
    titleTemplate: '%s | Geebu'
  },
  components: {
    layout: Layout,
    faq: Faq,
    signupmodal: MustSignupModal,
    EventsModal,
    ViewDetail,
    EventSuccess,
    Multiselect,
    EventCard,
    FilterResults,
    NoEvent,
    BirdLoader,
    ArtistPopOver
  },
  setup () {},
  data: () => ({
    isLoading: false,
    isOngoingLoading: false,
    isUpcomingLoading: false,
    isPastLoading: false,
    city: '',
    event_type: '',
    search: ''
  }),
  computed: {
    ...mapGetters(['isLoggedIn', 'userInfo', 'info', 'userRole']),
    ...mapState({
      events_past: (state) => state.events.pastListEvents,
      events_ongoing: (state) => state.events.ongoingListEvents,
      events_upcoming: (state) => state.events.upcomingListEvents,
      eventFilter: (state) => state.events.eventFilter,
      ongoingPagination: (state) => state.events.ongoingPagination,
      upcomingPagination: (state) => state.events.upcomingPagination,
      pastPagination: (state) => state.events.pastPagination,
      cities: (state) =>
        state.cities.map(function (city) {
          return city
        }),
      eventTypes: (state) =>
        state.events.event_types.map(function (obj) {
          const words = obj.split(' ')
          return {
            value: obj,
            text: words
              .map((word) => {
                return word[0].toUpperCase() + word.substring(1)
              })
              .join(' ')
          }
        })
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
    // const popoverTriggerList = document.querySelectorAll('span[data-bs-toggle="popover"]');
    // const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl));

    console.log('Window Hostname: ', window.location.hostname)
    this.fetchEventOptions().then((res) => this.RESET_EVENT_FILTER())
    this.fetchCityList()

    // var counter = 0
    this.isLoading = true

    this.isOngoingLoading = true
    this.isUpcomingLoading = true
    this.isPastLoading = true

    this.setUpcomingPagination()
    this.setOngoingPagination()
    this.setPastPagination()

    this.pastEvents()
      .then((res) => {
        this.isPastLoading = false
      })
      .catch((onError) => {
        console.log('Past Events [error]: ', onError)
      })
      .finally((onfinally) => {
        this.isPastLoading = false
      })

    this.upcomingEvents()
      .then((res) => {
        this.isUpcomingLoading = false
      })
      .catch((onError) => {
        console.log('Upcoming Events [error]: ', onError)
      })
      .finally((onfinally) => {
        this.isUpcomingLoading = false
      })

    this.ongoingEvents()
      .then((res) => {
        this.isOngoingLoading = false
      })
      .catch((onError) => console.log('Ongoing Events [error]: ', onError))
      .finally((onfinally) => {
        this.isOngoingLoading = false
      })

    console.log('Ongoing [DONE]: ', this.isOngoingLoading)
    console.log('Past [DONE]: ', this.isPastLoading)
    console.log('Upcoming [DONE]: ', this.isUpcomingLoading)
    // this.fetchEventList()
    //   .then(res =>
    //   {
    //     console.log('Events: ', res);

    //   })
    //   .finally(onfinally => this.isLoading = false);
  },
  methods: {
    ...mapActions([
      'fetchEventOptions',
      'fetchEventList',
      'fetchCityList',
      'pastEvents',
      'upcomingEvents',
      'ongoingEvents'
    ]),
    ...mapMutations([
      'RESET_EVENT_FILTER',
      'setPastPage',
      'setOngoingPage',
      'setUpcomingPage',
      'setUpcomingPagination',
      'setOngoingPagination',
      'setPastPagination',
      'prevUpcomingPage',
      'prevOngoingPage',
      'prevPastPage',
      'nextUpcomingPage',
      'nextOngoingPage',
      'nextPastPage'
    ]),
    openModalSignUp () {
      new Modal(document.getElementById('#mustSignUp'), {
        keyboard: false
      }).show()
    },
    selectPage (page, type = 'ongoing') {
      if (type === 'ongoing') {
        console.log('Specify Ongoing Event: ', page)
        this.setOngoingPage(page)

        this.ongoingEvents()
          .then((res) => {
            this.isOngoingLoading = false
          })
          .catch((onError) => {
            console.log('Ongoing Events [error]: ', onError)
          })
          .finally((onfinally) => {
            this.isOngoingLoading = false
          })
      }

      if (type === 'upcoming') {
        console.log('Specify Upcoming Event: ', page)
        this.setUpcomingPage(page)

        this.upcomingEvents()
          .then((res) => {
            this.isUpcomingLoading = false
          })
          .catch((onError) => {
            console.log('Upcoming Events [error]: ', onError)
          })
          .finally((onfinally) => {
            this.isUpcomingLoading = false
          })
      }

      if (type === 'past') {
        console.log('Specify Past Event: ', page)
        this.setOngoingPage(page)

        this.pastEvents()
          .then((res) => {
            this.isPastLoading = false
          })
          .catch((onError) => {
            console.log('Past Events [error]: ', onError)
          })
          .finally((onfinally) => {
            this.isPastLoading = false
          })
      }
    },
    toggleEvent () {
      if (this.isLoggedIn) {
        new Modal(document.getElementById('eventDetailsModal'), {
          keyboard: false,
          backdrop: 'false'
        }).show()
      } else {
        new Modal(document.getElementById('mustSignUp'), {
          keyboard: false,
          backdrop: 'static'
        }).show()
      }
    },
    openModal (data) {
      this.$root.$emit('bv::show::modal', '#mustSignUp')
    },
    toggleCreate () {
      this.fetchEventOptions()

      new Modal(document.getElementById('createEventModal'), {
        keyboard: false,
        backdrop: 'static'
      }).show()
    },
    dismiss (option) {
      console.log('Event Modal dismiss: ', option)

      if (option === 'success') {
        new Modal(document.getElementById('eventsCreatedModal'), {
          keyboard: false,
          backdrop: 'static'
        }).show()
      }
      this.isOngoingLoading = true
      this.isUpcomingLoading = true
      this.isPastLoading = true

      this.pastEvents()
        .then((res) => {
          this.isPastLoading = false
        })
        .catch((onError) => {
          console.log('Past Events [error]: ', onError)
        })
        .finally((onfinally) => {
          this.isPastLoading = false
        })

      this.upcomingEvents()
        .then((res) => {
          this.isUpcomingLoading = false
        })
        .catch((onError) => {
          console.log('Upcoming Events [error]: ', onError)
        })
        .finally((onfinally) => {
          this.isUpcomingLoading = false
        })

      this.ongoingEvents()
        .then((res) => {
          this.isOngoingLoading = false
        })
        .catch((onError) => console.log('Ongoing Events [error]: ', onError))
        .finally((onfinally) => {
          this.isOngoingLoading = false
        })

      // console.log('Dismiss option: ', option);
      // if (option === 'skip')
      // {
      //   new Modal(document.getElementById('eventsModal'), {
      //     keyboard: false,
      //     backdrop: 'static',
      //   }).hide();
      // }
    },
    // openModal(data){
    //     this.$root.$emit("bv::show::modal", "#mustSignUp");
    //   },
    openEventDetailsModal () {
      this.$root.$emit('bv::show::modal', '#eventDetailsModal')
    },
    filterEvent () {
      this.$store.commit('SET_EVENT_FILTER', {
        search: this.search,
        city: this.city,
        event_type: this.event_type
      })
      // this.fetchEventList()
      this.isOngoingLoading = true
      this.isUpcomingLoading = true
      this.isPastLoading = true

      this.pastEvents()
        .then((res) => {
          this.isPastLoading = false
        })
        .catch((onError) => {
          console.log('Past Events [error]: ', onError)
        })
        .finally((onfinally) => {
          this.isPastLoading = false
        })

      this.upcomingEvents()
        .then((res) => {
          this.isUpcomingLoading = false
        })
        .catch((onError) => {
          console.log('Upcoming Events [error]: ', onError)
        })
        .finally((onfinally) => {
          this.isUpcomingLoading = false
        })

      this.ongoingEvents()
        .then((res) => {
          this.isOngoingLoading = false
        })
        .catch((onError) => console.log('Ongoing Events [error]: ', onError))
        .finally((onfinally) => {
          this.isOngoingLoading = false
        })
    },
    filterByCity () {
      this.$store.commit('SET_EVENT_FILTER', {
        search: this.search,
        city: this.city,
        event_type: this.event_type
      })
      // this.fetchEventList()
      this.isOngoingLoading = true
      this.isUpcomingLoading = true
      this.isPastLoading = true

      this.pastEvents()
        .then((res) => {
          this.isPastLoading = false
        })
        .catch((onError) => {
          console.log('Past Events [error]: ', onError)
        })
        .finally((onfinally) => {
          this.isPastLoading = false
        })

      this.upcomingEvents()
        .then((res) => {
          this.isUpcomingLoading = false
        })
        .catch((onError) => {
          console.log('Upcoming Events [error]: ', onError)
        })
        .finally((onfinally) => {
          this.isUpcomingLoading = false
        })

      this.ongoingEvents()
        .then((res) => {
          this.isOngoingLoading = false
        })
        .catch((onError) => console.log('Ongoing Events [error]: ', onError))
        .finally((onfinally) => {
          this.isOngoingLoading = false
        })
    },
    nextPastEvent () {
      this.nextPastPage()
      this.pastEvents()
        .then((res) => {
          this.isPastLoading = false
        })
        .catch((onError) => {
          console.log('Past Events [error]: ', onError)
        })
        .finally((onfinally) => {
          this.isPastLoading = false
        })
    },
    prevPastEvent () {
      this.prevPastPage()
      this.pastEvents()
        .then((res) => {
          this.isPastLoading = false
        })
        .catch((onError) => {
          console.log('Past Events [error]: ', onError)
        })
        .finally((onfinally) => {
          this.isPastLoading = false
        })
    },
    nextOngoingEvent () {
      this.nextOngoingPage()

      this.ongoingEvents()
        .then((res) => {
          this.isOngoingLoading = false
        })
        .catch((onError) => {
          console.log('Ongoing Events [error]: ', onError)
        })
        .finally((onfinally) => {
          this.isOngoingLoading = false
        })
    },
    prevOngoingEvent () {
      this.prevOngoingPage()

      this.ongoingEvents()
        .then((res) => {
          this.isOngoingLoading = false
        })
        .catch((onError) => {
          console.log('Ongoing Events [error]: ', onError)
        })
        .finally((onfinally) => {
          this.isOngoingLoading = false
        })
    },
    nextUpcomingEvent () {
      this.nextUpcomingPage()

      this.upcomingEvents()
        .then((res) => {
          this.isUpcomingLoading = false
        })
        .catch((onError) => {
          console.log('Upcoming Events [error]: ', onError)
        })
        .finally((onfinally) => {
          this.isUpcomingLoading = false
        })
    },
    prevUpcomingEvent () {
      this.prevUpcomingPage()
      // console.log(this.upcomingPagination.page)
      this.upcomingEvents()
        .then((res) => {
          this.isUpcomingLoading = false
        })
        .catch((onError) => {
          console.log('Upcoming Events [error]: ', onError)
        })
        .finally((onfinally) => {
          this.isUpcomingLoading = false
        })
    }
  },
  watch: {
    city: {
      handler (val) {
        console.log(`Clear City ${val}`)
        if (val === null || val === '') {
          this.$store.commit('SET_EVENT_FILTER', {
            search: this.search,
            city: '',
            event_type: this.event_type
          })
          // this.fetchEventList()
          this.isOngoingLoading = true
          this.isUpcomingLoading = true
          this.isPastLoading = true

          this.pastEvents().finally(
            (onfinally) => (this.isPastLoading = false)
          )
          this.upcomingEvents().finally(
            (onfinally) => (this.isUpcomingLoading = false)
          )
          this.ongoingEvents().finally(
            (onfinally) => (this.isOngoingLoading = false)
          )
        }
      },
      deep: true
    },
    search: {
      handler (val) {
        this.$store.commit('SET_EVENT_FILTER', {
          search: val,
          city: '',
          event_type: this.event_type
        })
        // this.fetchEventList()
        this.isOngoingLoading = true
        this.isUpcomingLoading = true
        this.isPastLoading = true

        this.pastEvents().finally((onfinally) => (this.isPastLoading = false))
        this.upcomingEvents().finally(
          (onfinally) => (this.isUpcomingLoading = false)
        )
        this.ongoingEvents().finally(
          (onfinally) => (this.isOngoingLoading = false)
        )
      },
      deep: true
    },
    event_type: {
      handler (val) {
        this.$store.commit('SET_EVENT_FILTER', {
          search: this.search,
          city: this.city,
          event_type: val
        })
        // this.fetchEventList()
        this.isOngoingLoading = true
        this.isUpcomingLoading = true
        this.isPastLoading = true

        this.pastEvents().finally((onfinally) => (this.isPastLoading = false))
        this.upcomingEvents().finally(
          (onfinally) => (this.isUpcomingLoading = false)
        )
        this.ongoingEvents().finally(
          (onfinally) => (this.isOngoingLoading = false)
        )
      },
      deep: true
    },
    eventFilter: {
      handler (val) {
        // this.isLoading = true;
        // this.fetchEventList()
        //   .then(res => this.isLoading = false);
        // this.isOngoingLoading = true;
        // this.isUpcomingLoading = true;
        // this.isPastLoading = true;
        // this.pastEvents().finally(onfinally => this.isPastLoading = false);
        // this.upcomingEvents().finally(onfinally => this.isUpcomingLoading = false);
        // this.ongoingEvents().finally(onfinally => this.isOngoingLoading = false);
      },
      deep: true
    }
  }
}
</script>
