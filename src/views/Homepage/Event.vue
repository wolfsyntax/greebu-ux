<template>
  <layout>

    <section class="events" >
      <div class="container-fluid">
        <div class="container">
          <div class="content">
            <h2 class="top-level-title">Let's make some noise<br> and create unforgettable<br> moments</h2>
            <p class="top-level-sub-title">Custom tunes for any mood, and booking the best artists just<br> got easier with our website!</p>
            <a href="#" class="btn btn-primary find-event-planner">Find Event Planner</a>
          </div>
        </div>
        <div class="hidden-img">
          <img src="/assets/events/events-hidden-bg.webp" class="img-fluid" alt="Send yourself a reminder">
        </div>
      </div>
    </section>
    
    <section class="events-showing">
      <div class="container">

        <div class="text-center" >
          <h3 class="events-showing-title">Events</h3>
          <p class="sub-heading">Collaborate with a professional independent artist to turn your story into one-of-a-kind custom song</p>
        </div>

        <div v-if="userRole === 'organizer'" class="d-flex align-items-center justify-content-between create-event-wrapper">
          <div>

          </div>
          
          <div class="create-event-btn-wrap">
            <button class="d-flex align-items-center btn create-event" @click="toggleCreate">
            <span class="material-symbols-rounded add-circle">&#xe147;</span>
            Create event
          </button>
          </div>
          
        </div>


        <!-- <div class="row top-row">
          <div class="col-6">
            <a href="#" class="btn btn-primary filter"><span class="material-symbols-outlined next">sort</span>Filter</a>
          </div>
          <div class="col-6">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for Events" v-model="search" aria-label="Search for Events" aria-describedby="button-addon2">
              <button class="btn btn-success border-rad" type="button" id="button-addon2" @click="filterEvent">
                <span class="material-symbols-outlined next">search</span>
                </button>
            </div>
          </div>
          <div class="col-4">
            <h5>Type of Event</h5>
            <select class="form-select" aria-label="Default select example" v-model="event_type" >
              <option value="" selected>&emsp;</option>
              <option v-for="(event_type, index) in eventTypes" :key="index" :value="event_type.value">
                {{ event_type.text }}
              </option>
            </select>
          </div>
          <div class="col-4">
            <h5>Location</h5>
            <multiselect v-model="city" mode="single"
              :close-on-select="false"
              @select="filterByCity"
              @deselect="filterByCity"
              :create-option="true" :options="async function (query) {
                await fetchCityList(query)
                return cities;

              }"
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
          <div class="col-4">
            <h5>Cost</h5>
            <select class="form-select" aria-label="Default select example" v-model="eventFilter.cost" @change="fetchEventList">
              <option value="both" selected>&emsp;</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>  -->

        <FilterResults>

          <template #top-filter>
              <div>
                <button class="border-0 d-flex align-items-center btn filter-btn">
                  <span class="material-symbols-rounded sort-icon">&#xe164;</span>
                  Filter
                </button>
              </div>

              <div class="search">
                <input type="text" class="form-control" placeholder="Search events" v-model="search" aria-label="Search events" aria-describedby="button-addon2">
                <button class="btn border-0 search-btn">
                  <span class="material-symbols-rounded search-icon">&#xe8b6;</span>
                </button>
              </div>
          </template>

          <template #bottom-filter>
            <div class="form-group">
              <label>Type of Event</label>
              <select class="form-select" aria-label="Default select example" v-model="event_type" >
                <option value="" selected>&emsp;</option>
                <option v-for="(event_type, index) in eventTypes" :key="index" :value="event_type.value">
                  {{ event_type.text }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Location</label>
              <multiselect v-model="city" mode="single"
              :close-on-select="false"
              @select="filterByCity"
              @deselect="filterByCity"
              :create-option="true" :options="async function (query) {
                await fetchCityList(query)
                return cities;
              }"
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
                <option value="" selected>&emsp;</option>
                <option>This week Events</option>
                <option>Upcoming Events</option>
                <option>Past Events</option>
              </select>
            </div>

          </template>

        </FilterResults>

        <transition v-if="isOngoingLoading && isUpcomingLoading && isPastLoading" class="text-center">
          <div>
            <h3>Please wait!</h3>
            <h5>Retrieving Events...</h5>
          </div>
        </transition>
        <section v-else>

          <h2 class="my-2">This Week Events</h2>
          <transition v-if="!isOngoingLoading">
          <!-- Upcoming Events -->
            <div class="row" v-if="events_ongoing.length">
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3" v-for="(event, index) in events_ongoing" :key="index">
                <event-card :event="event" :pos="index" @show="toggleEvent" />
              </div>
            </div>     

            <div class="row" v-else>
              <div class="col text-center">
                <h3>No Events found!</h3>
              </div>
            </div>
          </transition>

          <h2 class="my-2">Upcoming Events</h2>
          <transition v-if="!isUpcomingLoading">
          <!-- Upcoming Events -->

            <div class="row" v-if="events_upcoming.length">
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3" v-for="(event, index) in events_upcoming" :key="index">
                <event-card :event="event" :pos="index" @show="toggleEvent" />
              </div>
            </div>     

            <div class="row" v-else>
              <div class="col text-center">
                <h3>No Events found!</h3>
              </div>
            </div>
          </transition>

          <h2 class="my-2">Past Events</h2>
          <transition v-if="!isPastLoading">
          <!-- Past Events -->

            <div class="row" v-if="events_past.length">
              <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3" v-for="(event, index) in events_past" :key="index">
                <event-card :event="event" :pos="index" @show="toggleEvent" />
              </div>
            </div>     

            <div class="row" v-else>
              <div class="col text-center">
                <h3>No Events found!</h3>
              </div>
            </div>
          </transition>        

        </section>
      </div>
    </section>
    
    <view-detail v-if="isLoggedIn" />
    <signupmodal v-else />

    <events-modal @close="dismiss"/>
    <event-success />
    <faq />
  </layout>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { Modal, Popover } from 'bootstrap';
import Multiselect from '@vueform/multiselect';

import Layout from '/src/components/Layouts/Layout.vue';
import Faq from '/src/components/Home/FAQ.vue';
import MustSignupModal from '/src/components/Artist/MustSignupModal.vue';
import EventsModal from '/src/components/Auth/Events/Modal.vue';
import ViewDetail from '/src/components/Events/ViewEventDetailsModal.vue';
import EventSuccess from '/src/components/Auth/Events/SuccessModal.vue';
import EventCard from '/src/components/Events/Card.vue';
import FilterResults from "/src/components/FilterResults.vue";

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
    FilterResults
  },
  setup()
  {

  },
  data: () => ({
    isLoading: false,
    isOngoingLoading: false,
    isUpcomingLoading: false,
    isPastLoading: false,
    city: '',
    event_type: '',
    search: '',
  }),
  computed: {
    ...mapGetters(["isLoggedIn", 'userInfo', 'info', 'userRole']),
    ...mapState({
      events_past: state => state.events.pastListEvents,
      events_ongoing: state => state.events.ongoingListEvents,
      events_upcoming: state => state.events.upcomingListEvents,
      eventFilter: state => state.events.eventFilter,
      cities: state => state.cities.map(function (city)
      {
        return city.name;
      }),
      eventTypes: state => state.events.event_types.map(function (obj)
      {
        var words = obj.split(" ")
        return {
          value: obj,
          text: words.map((word) =>
          {
            return word[0].toUpperCase() + word.substring(1);
          }).join(" "),
        }
      }),
    })
  },
  mounted()
  {

    // const popoverTriggerList = document.querySelectorAll('span[data-bs-toggle="popover"]');
    // const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl));

    console.log('Window Hostname: ', window.location.hostname)
    this.fetchEventOptions().then(res => this.RESET_EVENT_FILTER())
    this.fetchCityList();

    var counter = 0;
    this.isLoading = true;

    this.isOngoingLoading = true;
    this.isUpcomingLoading = true;
    this.isPastLoading = true;

    this.pastEvents().finally(onfinally => this.isPastLoading = false);
    this.upcomingEvents().finally(onfinally => this.isUpcomingLoading = false);    
    this.ongoingEvents().finally(onfinally => this.isOngoingLoading = false);
    console.log('Ongoing [DONE]: ', this.isOngoingLoading);
    console.log('Past [DONE]: ', this.isPastLoading);
    console.log('Upcoming [DONE]: ', this.isUpcomingLoading);
    // this.fetchEventList()
    //   .then(res =>
    //   {
    //     console.log('Events: ', res);
        
    //   })
    //   .finally(onfinally => this.isLoading = false);
  },
  methods: {
    ...mapActions([
      'fetchEventOptions', 'fetchEventList', 'fetchCityList', 'pastEvents', 'upcomingEvents', 'ongoingEvents',
    ]),
    ...mapMutations([
      'RESET_EVENT_FILTER'
    ]),
    toggleEvent(pos)
    {
      if (this.isLoggedIn) {

        new Modal(document.getElementById('eventDetailsModal'), {
          keyboard: false,
          backdrop: 'false',
        }).show();

      } else {

        new Modal(document.getElementById('mustSignUp'), {
          keyboard: false,
          backdrop: 'static',
        }).show();

      }
    },
    openModal(data){
        this.$root.$emit("bv::show::modal", "#mustSignUp");
    },
    toggleCreate()
    {
      this.fetchEventOptions()

      new Modal(document.getElementById('createEventModal'), {
        keyboard: false,
        backdrop: 'static',
      }).show();
    },
    dismiss(option)
    {
      console.log('Event Modal dismiss: ', option);
      
      if (option === 'success') {
        new Modal(document.getElementById('eventsCreatedModal'), {
          keyboard: false,
          backdrop: 'static',
        }).show()
      }
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
    openEventDetailsModal(data){
        this.$root.$emit("bv::show::modal", "#eventDetailsModal");
    },
    filterEvent() {
      this.$store.commit('SET_EVENT_FILTER', {search: this.search, city: this.city, event_type: this.event_type});
      this.fetchEventList()
    },
    filterByCity() {      
      this.$store.commit('SET_EVENT_FILTER', {search: this.search, city: this.city, event_type: this.event_type });
      this.fetchEventList()
    }
  },
  watch: {
    city: {
      handler(val) {
        console.log(`Clear City ${val}`)
        if (val === null || val === '') {

          this.$store.commit('SET_EVENT_FILTER', {search: this.search, city: '', event_type: this.event_type });
          // this.fetchEventList()
          this.isOngoingLoading = true;
          this.isUpcomingLoading = true;
          this.isPastLoading = true;

          this.pastEvents().finally(onfinally => this.isPastLoading = false);
          this.upcomingEvents().finally(onfinally => this.isUpcomingLoading = false);    
          this.ongoingEvents().finally(onfinally => this.isOngoingLoading = false);

        }
      },
      deep: true
    },
    search: {
      handler(val) {
        
        this.$store.commit('SET_EVENT_FILTER', {search: val, city: '', event_type: this.event_type });
        // this.fetchEventList()
        this.isOngoingLoading = true;
        this.isUpcomingLoading = true;
        this.isPastLoading = true;

        this.pastEvents().finally(onfinally => this.isPastLoading = false);
        this.upcomingEvents().finally(onfinally => this.isUpcomingLoading = false);    
        this.ongoingEvents().finally(onfinally => this.isOngoingLoading = false);

        
      },
      deep: true
    },
    event_type: {
      handler(val) {
        this.$store.commit('SET_EVENT_FILTER', {search: this.search, city: this.city, event_type: val });
        // this.fetchEventList()
        this.isOngoingLoading = true;
        this.isUpcomingLoading = true;
        this.isPastLoading = true;

        this.pastEvents().finally(onfinally => this.isPastLoading = false);
        this.upcomingEvents().finally(onfinally => this.isUpcomingLoading = false);    
        this.ongoingEvents().finally(onfinally => this.isOngoingLoading = false);

      },
      deep: true
    },
    eventFilter: {
      handler(val)
      {
        // this.isLoading = true;
        // this.fetchEventList()
        //   .then(res => this.isLoading = false);
        
        this.isOngoingLoading = true;
        this.isUpcomingLoading = true;
        this.isPastLoading = true;

        // this.pastEvents().finally(onfinally => this.isPastLoading = false);
        // this.upcomingEvents().finally(onfinally => this.isUpcomingLoading = false);    
        // this.ongoingEvents().finally(onfinally => this.isOngoingLoading = false);

      },
      deep: true,
    }
  }
}
</script>
