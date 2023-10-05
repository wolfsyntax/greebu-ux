<template>
  <layout>

    <section class="events">
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

        <div class="text-center">
          <h3 class="events-showing-title">Events</h3>
          <p class="sub-heading">Collaborate with a professional independent artist to turn your story into one-of-a-kind custom song</p>
        </div>

        <div v-if="userRole === 'organizer'" class="d-flex align-items-center justify-content-between create-event-wrapper">
          <div>

          </div>
          
          <div>
            <button class="d-flex align-items-center btn create-event" @click="toggleCreate">
            <span class="material-symbols-rounded add-circle">&#xe147;</span>
            Create event
          </button>
          </div>
        </div>


        <div class="row top-row">
          <div class="col-6">
            <a href="#" class="btn btn-primary filter"><span class="material-symbols-outlined next">sort</span>Filter</a>
          </div>
          <div class="col-6">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for Events" v-model="eventFilter.search" aria-label="Search for Events" aria-describedby="button-addon2">
              <button class="btn btn-success border-rad" type="button" id="button-addon2" @click="fetchEventList">
                <span class="material-symbols-outlined next">search</span>
                </button>
            </div>
          </div>
          <div class="col-4">
            <h5>Type of Event</h5>
            <select class="form-select" aria-label="Default select example" v-model="eventFilter.event_type" >
              <option value="" selected>&emsp;</option>
              <option v-for="(event_type, index) in eventTypes" :key="index" :value="event_type.value">
                {{ event_type.text }}
              </option>
            </select>
          </div>
          <div class="col-4">
            <h5>Location</h5>
            <multiselect v-model="eventFilter.city" mode="single"
              :close-on-select="false"
              :create-option="true" :options="async function (query) {
                await fetchCityList(query)
                return cities;

              }"
              searchable="true"  
              :delay="0" 
              autocomplete="off" 
              ref="multiselect" 
              :filter-results="false"
              label="text"
              noOptionsText="Please input town/city name"
              class="form-select"
            />
            
          </div>
          <!-- <div class="col-4">
            <h5>Cost</h5>
            <select class="form-select" aria-label="Default select example" v-model="eventFilter.cost" @change="fetchEventList">
              <option value="both" selected>&emsp;</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div> -->
        </div> <!-- end of row -->

        <!-- Upcoming Events -->
        <div class="row" v-if="events.length">
          <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3" v-for="(event, index) in events" :key="index">
            <div class="card">

              <div class="bg-wrapper">
                <img :src="event.cover_photo" class="img-fluid card-bg" loading="lazy" alt="Event image">
                <div class="d-flex align-items-start organized-by">
                  <img :src="event.organizer_avatar" class="float-start" alt="Organized by logo">
                  <div>
                    <h5>{{ event.organizer_name }}</h5>
                    <p class="mb-0">Organized by</p>
                  </div>
                </div>
              </div> <!-- end of bg-wrapper -->

              <div class="card-body">

                <div class="event-title-wrap">
                  <h5 class="card-title">{{ event.event_name }} </h5>
                  <p class="mb-0 card-text">{{ event.description }}</p>
                </div>

                <div class="place-time-wrap">

                  <div class="location">
                  <span class="material-symbols-outlined">&#xe0c8;</span>
                  <p>{{ event.location }}</p>
                </div>
                <div class="date">
                  <span class="material-symbols-outlined">&#xebcc;</span>
                  <p>{{ $moment(`${event.start_date}`).format('MMMM Do, YYYY') }} - {{ $moment(`${event.end_date}`).format('MMMM Do, YYYY') }}</p>
                </div>
                <div class="time">
                  <span class="material-symbols-outlined">&#xe8b5;</span>
                  <p>{{ $moment(`${$moment().format('YYYY-MM-DD')} ${event.start_time}`).format('h:mm a') }} - {{ $moment(`${$moment().format('YYYY-MM-DD')} ${event.end_time}`).format('h:mm a') }}</p>
                </div>

                </div>

                <div class="seeking-for" v-if="(userRole === 'artists' || userRole === 'organizer') && event.look_types.length > 0" >
                  <h6 class="title">Seeking for</h6>
                  <span class="badge type-artist" v-for="(look, index) in event.look_types" :key="index">{{ look }}</span>
                </div>
                <div class="seeking-for" v-if="(userRole === 'artists' || userRole === 'organizer') && event.look_types.length === 0" >
                  <h6 class="title" style="opacity: 0;">Seeking for</h6>
                  <span class="badge type-artist" style="opacity: 0;">acoustic band</span>
                </div>
                
                <div v-if="isLoggedIn">
                  <button class="btn btn-primary view-details" data-bs-toggle="modal" data-bs-target="#eventDetailsModal">View Details</button>
                  <viewEventDetails />
                </div>
                <div v-else>
                  <button class="btn btn-primary view-details" data-bs-toggle="modal" data-bs-target="#mustSignUp">View Details</button>
                <signupmodal />
                </div>

                <button class="btn btn-primary send-proposal" @click="$router.push('/proposal')" v-if="userRole === 'artists'" >Send Proposal</button>
              </div>
            </div>
          </div>
        </div>     

        <div class="row" v-else>
          <div class="col text-center">
            <h3>No Events found!</h3>
          </div>
        </div>

      </div>
    </section>
    <signupmodal />
    <events-modal @close="dismiss"/>
    <event-success />
    <faq />
  </layout>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { Modal } from 'bootstrap';
import Multiselect from '@vueform/multiselect';

import Layout from '/src/components/Layouts/Layout.vue';
import Faq from '/src/components/Home/FAQ.vue';
import MustSignupModal from '/src/components/Artist/MustSignupModal.vue';
import EventsModal from '/src/components/Auth/Events/Modal.vue';
import ViewEventDetailsModal from '/src/components/Events/ViewEventDetailsModal.vue';
import EventSuccess from '/src/components/Auth/Events/SuccessModal.vue';

export default {
  components: {
    layout: Layout,
    faq: Faq,
    signupmodal: MustSignupModal,
    EventsModal,
    viewEventDetails: ViewEventDetailsModal,
    EventSuccess,
    Multiselect,
  },
  setup()
  {

  },
  data()
  {
    return {
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", 'userInfo', 'info', 'userRole']),
    ...mapState({
      events: state => state.events.events,
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
    
    this.fetchEventOptions().then(res => this.RESET_EVENT_FILTER())
    this.fetchCityList();
    this.fetchEventList()
      .then(res =>
      {
        console.log('Events: ', res);
      })
  },
  methods: {
    ...mapActions([
      'fetchEventOptions', 'fetchEventList', 'fetchCityList',
    ]),
    ...mapMutations([
      'RESET_EVENT_FILTER'
    ]),
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

  },
  watch: {
    eventFilter: {
      handler(val)
      {
        this.fetchEventList()
      },
      deep: true,
    }
  }
}
</script>