<template>
    <div class="modal fade" id="paymentHistory" data-bs-backdrop="static" data-bs-keyboard="false" 
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Payment History</h3>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
            <button type="button" class="btn ms-auto border-0 p-0 cancel-btn" data-bs-dismiss="modal" aria-label="Close">
              <span class="material-symbols-rounded cancel-icon">&#xe5c9;</span>
            </button>
  
          </div>
  
          <div class="modal-body">
  
            <div class="d-flex align-items-center justify-content-between search-download-wrap">
                <div class="position-relative d-flex align-items-center search-container" >
                    <button class="btn p-0 border-0 d-flex align-items-center">
                        <span class="material-symbols-rounded search-icon">&#xe8b6;</span>
                    </button>
                    <input type="text" class="search-input" placeholder="Search by amount, payment method...">
                </div>

                <div>
                    <button class=" d-flex align-items-center border-0 download-btn">
                        <span class="material-symbols-outlined download-icon">&#xe2c0;</span>
                        Download
                    </button>
                </div>
            </div>

            <table class="table">
                <thead class="tr-top-wrap">
                    <tr>
                    <th scope="col">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault"></label>
                      </div>
                    </th>
                    <th scope="col">PAYMENT ID</th>
                    <th scope="col">SUBSCRIPTION</th>
                    <th scope="col">PAYMENT DATE</th>
                    <th scope="col">AMOUNT</th>
                    <th scope="col">P. METHOD</th>
                    <th scope="col">NEXT PAYMENT</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault"></label>
                          </div>
                        </th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Mark</td>
                        <td>
                          <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <span class="material-symbols-rounded">&#xe5d4;</span>
                            </button>
                            <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Action</a></li>
                              <li><a class="dropdown-item" href="#">Another action</a></li>
                              <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                          </div>

                        </td>
                    </tr>
                </tbody>
            </table>

          </div>
  
  
        </div>
      </div>
    </div>
  </template>
  
  <script >
  import { mapActions, mapState } from 'vuex';
  
  export default {
    components: {
      
    },  
    created () {
    },
    watch: {
    },
    props: {
    },
    data: () => ({

    }),
    methods: {
      
    
    },
    mounted() {
  
    },
    computed: {
    
    }
  }
  </script>
  
  <style lang="scss" scoped>

  </style>