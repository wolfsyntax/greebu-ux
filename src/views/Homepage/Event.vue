<template>
  <layout>
    <!-- Static icon font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />

    <section class="events">
      <div class="container-fluid">
        <div class="container">
          <div class="content">
            <h2>Let's make some noise<br> and create unforgettable<br> moments</h2>
            <p>Custom tunes for any mood, and booking the best artists just<br> got easier with our website!</p>
            <a href="#" class="btn btn-primary">Find Event Planner</a>
          </div>
        </div>
        <div class="hidden-img">
          <img src="@/assets/events/events-hidden-bg.webp" class="img-fluid" alt="Send yourself a reminder">
        </div>
      </div>
    </section>
    <section class="events-showing">
      <div class="container">
        <h3>Events</h3>
        <p class="sub-heading">Collaborate with a professional independent artist to turn your story into one-of-a-kind custom song</p>
        <div class="row top-row">
          <div class="col-6">
            <a href="#" class="btn btn-primary filter"><i class="material-icons"><span class="material-symbols-outlined next">sort</span></i>Filter</a>
          </div>
          <div class="col-6">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for Events" aria-label="Search for Events" aria-describedby="button-addon2">
              <button class="btn btn-success border-rad" type="button" id="button-addon2">
                <i class="material-icons"><span class="material-symbols-outlined next">search</span></i>
              </button>
            </div>
          </div>
          <div class="col-4">
            <h5>Type of Event</h5>
            <select class="form-select" aria-label="Default select example">
              <option selected>Music Festival Events</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-4">
            <h5>Location</h5>
            <select class="form-select" aria-label="Default select example">
              <option selected>Naga City</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-4">
            <h5>Cost</h5>
            <select class="form-select" aria-label="Default select example">
              <option selected>Free</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div> <!-- end of row -->

                                                             <!-- Upcoming Events -->
        <div class="row">
          <div class="col-4" v-for="(event, index) in events">
            <div class="card">
              <div class="bg-wrapper">
                <img :src="event.image" class="img-fluid card-bg" loading="lazy" alt="Event image">
                <div class="organized-by">
                <img :src="event.organizerImage" class="float-start" alt="Organized by logo">
                <div>
                  <h5>{{ event.organizer }}</h5>
                  <p>Organized by</p>
                </div>
              </div>
              </div> <!-- end of bg-wrapper -->
              <div class="card-body">
                <h5 class="card-title">{{ event.name }} 
                  <span v-if="event.cost" class="badge free">Free</span>
                  <span v-else class="badge paid">Paid</span>
                </h5>
                <p class="card-text">{{ event.description }}</p>
                <p class="location">
                  <i class="material-icons"><span class="material-symbols-outlined">location_on</span></i>
                  <span class="text">{{ event.location }}</span>
                </p>
                <p class="date">
                  <i class="material-icons"><span class="material-symbols-outlined">calendar_month</span></i>
                  <span class="orange-text">{{ event.date }}</span>
                </p>
                <p class="time">
                  <i class="material-icons"><span class="material-symbols-outlined">schedule</span></i>
                  <span class="orange-text">{{ event.time }}</span>
                </p>
                <a href="#" class="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
        </div>                                                   

      </div>
    </section>
    <faq />
  </layout>
</template>
<script>
import Layout from '@/components/Layouts/Layout.vue';
import Faq from '@/components/Home/FAQ.vue';

export default {
  components: {
    layout: Layout,
    faq: Faq
  },
  setup()
  {

  },
  data()
  {
    return {
      events: [
        {
          id: 1,
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687423572/available-event-bg-1_p0gkss.webp',
          name: 'Sneaker Con Bay Area',
          description: 'Lorem ipsum dolor sit amet consectetur. Sit suscipit natoque molestie nulla orci. Quam bibendum euismod consequat facilisis. Sit suscipit natoque molestie nulla orci',
          location: 'Naga City, Cam. Sur Philippines',
          date: 'Saturday, June 12,2023',
          time: '8:00pm - 12:00 pm',
          cost: true,
          typeOfEvent: ['Music Festival Events', 'Concert'],
          organizer: 'KC Event Organizer',
          organizerImage: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687491614/organized-by-logo_ybzrzs.svg'
        },
        {
          id: 2,
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687423571/available-event-bg-2_glbbpx.webp',
          name: 'SM City Naga',
          description: 'Sziget is a massive island festival in Budapest. Today, it’s one of Europe’s biggest and best music festivals.',
          location: 'Naga City, Cam. Sur Philippines',
          date: 'Saturday, June 12,2023',
          time: '8:00pm - 12:00 pm',
          cost: false,
          typeOfEvent: ['Music Festival Events', 'Concert'],
          organizer: 'Naga LGU',
          organizerImage: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687754799/diamond_tnvz7y.webp'
        },
        {
          id: 3,
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687423572/available-event-bg-3_c1uxu3.webp',
          name: 'Legazpi Sawangan Park',
          description: 'Coachella is a common household name in music events. This is perhaps the most famous festival in the world, and also one of the greatest events',
          location: 'Naga City, Cam. Sur Philippines',
          date: 'Saturday, June 12,2023',
          time: '8:00pm - 12:00 pm',
          cost: false,
          typeOfEvent: ['Music Festival Events', 'Concert'],
          organizer: 'Facade Hotel',
          organizerImage: 'https://yt3.ggpht.com/yti/AHyvSCDjcNUmq7Ei-mklDFbjyPOH83Rgwhzg9eoFXRAgXA=s88-c-k-c0x00ffffff-no-rj-mo'
        },
        {
          id: 4,
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465779/samples/cloudinary-group.jpg',
          name: 'SM City Legazpi',
          description: 'Lorem ipsum dolor sit amet consectetur. Sit suscipit natoque molestie nulla orci. Quam bibendum euismod consequat facilisis...',
          location: 'Naga City, Cam. Sur Philippines',
          date: 'Saturday, June 12,2023',
          time: '8:00pm - 12:00 pm',
          cost: false,
          typeOfEvent: ['Music Festival Events', 'Concert'],
          organizer: 'KC Event Organizer',
          organizerImage: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687491614/organized-by-logo_ybzrzs.svg'
        },
        {
          id: 5,
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687423571/available-event-bg-2_glbbpx.webp',
          name: 'Albay Astrodome',
          description: 'Lorem ipsum dolor sit amet consectetur. Sit suscipit natoque molestie nulla orci. Quam bibendum euismod consequat facilisis...',
          location: 'Naga City, Cam. Sur Philippines',
          date: 'Saturday, June 12,2023',
          time: '8:00pm - 12:00 pm',
          cost: false,
          typeOfEvent: ['Music Festival Events', 'Concert'],
          organizer: 'KC Event Organizer',
          organizerImage: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687491614/organized-by-logo_ybzrzs.svg'
        },
        {
          id: 6,
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687423572/available-event-bg-3_c1uxu3.webp',
          name: 'Bagasbas Beach',
          description: 'Lorem ipsum dolor sit amet consectetur. Sit suscipit natoque molestie nulla orci. Quam bibendum euismod consequat facilisis...',
          location: 'Naga City, Cam. Sur Philippines',
          date: 'Saturday, June 12,2023',
          time: '8:00pm - 12:00 pm',
          cost: true,
          typeOfEvent: ['Music Festival Events', 'Concert'],
          organizer: 'KC Event Organizer',
          organizerImage: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687491614/organized-by-logo_ybzrzs.svg'
        },
        {
          id: 7,
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1686465779/samples/cloudinary-group.jpg',
          name: 'SM City Legazpi',
          description: 'Lorem ipsum dolor sit amet consectetur. Sit suscipit natoque molestie nulla orci. Quam bibendum euismod consequat facilisis...',
          location: 'Naga City, Cam. Sur Philippines',
          date: 'Saturday, June 12,2023',
          time: '8:00pm - 12:00 pm',
          cost: false,
          typeOfEvent: ['Music Festival Events', 'Concert'],
          organizer: 'KC Event Organizer',
          organizerImage: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687491614/organized-by-logo_ybzrzs.svg'
        },
        {
          id: 8,
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687423571/available-event-bg-2_glbbpx.webp',
          name: 'Albay Astrodome',
          description: 'Lorem ipsum dolor sit amet consectetur. Sit suscipit natoque molestie nulla orci. Quam bibendum euismod consequat facilisis...',
          location: 'Naga City, Cam. Sur Philippines',
          date: 'Saturday, June 12,2023',
          time: '8:00pm - 12:00 pm',
          cost: false,
          typeOfEvent: ['Music Festival Events', 'Concert'],
          organizer: 'KC Event Organizer',
          organizerImage: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687491614/organized-by-logo_ybzrzs.svg'
        },
        {
          id: 9,
          image: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687423572/available-event-bg-3_c1uxu3.webp',
          name: 'Bagasbas Beach',
          description: 'Lorem ipsum dolor sit amet consectetur. Sit suscipit natoque molestie nulla orci. Quam bibendum euismod consequat facilisis...',
          location: 'Naga City, Cam. Sur Philippines',
          date: 'Saturday, June 12,2023',
          time: '8:00pm - 12:00 pm',
          cost: true,
          typeOfEvent: ['Music Festival Events', 'Concert'],
          organizer: 'KC Event Organizer',
          organizerImage: 'https://res.cloudinary.com/daorvtlls/image/upload/v1687491614/organized-by-logo_ybzrzs.svg'
        }
      ]

    }
  }
}
</script>