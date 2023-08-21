<template>
    <div class="request-song-modal" v-if="show">
        <div class="modal-content">
            <div class="d-flex justify-content-between title-wrapper">
                <div>
                    <h3 class="title">Requested Song</h3>
                    <p class="sub-title">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div>
                    <button @click="$emit('close-modal')" class="close-button">
                 <span class="material-symbols-rounded">&#xe5cd;</span>
                </button>
                </div>
            </div> <!-- end of title-wrapper -->

            <div class="text-center modal-body">
                <div class="d-flex align-items-center justify-content-between action-wrapper">
                    <div class="d-flex align-items-center">
                        <img src="/assets/artist-account/band-member-2.webp" class="customer-image" alt="Requester image">
                        <div>
                             <h5 class="name">Alvin Makahiya</h5>
                            <p class="username">User12345</p>
                        </div>
                    </div>

                    <div class="d-flex align-items-center">
                        <button class="btn decline">Decline</button>
                        <button class="btn accept">Acccept</button>
                    </div>
                </div> <!-- end of action-wrapper -->
                <div class="d-flex align-items-center note-wrapper">
                    <span class="material-symbols-rounded info-icon">&#xe88e;</span>
                    <p class="note">Clients will only pay if the requested customized song is accepted.</p>
                </div>

                <div class="story-wrapper">
                    <h4 class="title">Story Details</h4>
                    <p class="message">I hope this letter finds you in good health and high spirits. I am writing to you as a passionate event 
                        organizer who has been captivated by your exceptional talent and musical prowess. It is with great excitement that 
                        I present to you a proposal for an upcoming event, [Event Name], where we would be honored to have you as the headline artist.</p>
                    <p class="message">I hope this letter finds you in good health and high spirits. I am writing to you as a passionate event 
                    organizer who has been captivated by your exceptional talent and musical prowess. It is with great excitement that 
                    I present to you a proposal for an upcoming event, [Event Name], where we would be honored to have you as the headline artist.</p>
                </div>

                <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
                    <div>
                        <h5>What is the song for?</h5>
                        <p>Birthday</p>
                    </div>
                    <div>
                        <h5>To whom is the song for?</h5>
                        <p>Jane Cooper</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
                    <div>
                        <h5>Genre</h5>
                        <p>Rock</p>
                    </div>
                    <div>
                        <h5>Type  of Song (Mood)</h5>
                        <p>Romance</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
                    <div>
                        <h5>Language</h5>
                        <p>English</p>
                    </div>
                    <div>
                        <h5>Duration of Song?</h5>
                        <p>5 minutes</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between action-wrapper song-info-wrapper">
                    <div>
                        <h5>Delivery Date</h5>
                        <p class="d-flex align-items-center"><span class="material-symbols-rounded date">&#xebcc;</span>June 12,2023</p>
                    </div>
                    <div class="hidden-song-info">
                        <h5>Delivery Date</h5>
                        <p>June 12,2023</p>
                    </div>
                </div>

            </div> <!-- end of modal-body -->


        </div>
    </div>
  </template>
  
  <script>

  export default {
    props: {
      show: Boolean
    },
    data() {
          return {
         }
    },      
    computed: {
  },
    methods: {
    
    },
  };
  </script>
  
  <style>
  /* Styles for your modal */
  </style>
  