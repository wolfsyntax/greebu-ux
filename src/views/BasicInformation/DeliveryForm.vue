<template>
    <layout>
    <div>
        <section class="delivery-date">
          <div class="container">
            <div class="row">
              <div class="col-md-6 offset-md-3">
                <div class="card">
                <div class="card-body">
                <h2 class="card-title">Select a delivery date</h2>
                <p class="card-text delivery-subtitle">Rest assured that the songs will be delivered by the end of the day.</p>
                <form @submit.prevent="submit">
                    <div v-for="option in delivery" :key="option.id" 
                    :class="['form-check', { 'selected': option.id === selectedOption }]"
                    :style="{ marginBottom: isLastFormCheck(index) ? '6rem!important' : '1.12rem' }">
                    <div class="delivery-wrapper">
                        <input class="form-check-input" type="radio" :name="'flexRadioDefault' + option.id" 
                        :id="'flexRadioDefault' + option.id" :checked="option.id === selectedOption" @change="selectOption(option.id)">
                    <label class="form-check-label" :for="'flexRadioDefault' + option.id">
                        <div class="option-wrapper">
                            <h4>{{ option.title }}</h4>
                            <p class="sub-content" v-if="option.id === selectedOption">{{ option.subTitle }}</p>
                        </div>
                        <div class="price-wrapper">
                            <p class="price">+ ₱ {{ option.price }}</p>
                        </div>
                    </label>
                    </div>
                    </div>
                    <div class="button-wrapper">
                    <button type="button" class="btn btn-primary back" @click="backToBasicInfo">Back</button>
                    <button type="button" class="btn btn-primary next" @click="submitDeliveryDate">Continue</button>
                    </div>
                </form>


                </div>
            </div>
          </div>
        </div>
        </div>
        </section>
    </div>

    </layout>
  </template>
  <script>
  import Layout from '/src/components/Layouts/Layout.vue';
  
  export default {
   components: {
      layout: Layout,
    },
    setup() {
      
    },
    data() {
    return {
      delivery: [
        {
          id: 1,
          title: '6-day delivery (Standard)',
          subTitle: 'The countdown of delivery days will commence once the Artist has confirmed their acceptance of the Custom Song request',
          price: 0
        },
        {
          id: 2,
          title: '5-day delivery',
          subTitle: 'The countdown of delivery days will commence once the Artist has confirmed their acceptance of the Custom Song request',
          price: 500
        },
        {
          id: 3,
          title: '3-day delivery',
          subTitle: 'The countdown of delivery days will commence once the Artist has confirmed their acceptance of the Custom Song request',
          price: 1000
        }
      ],
      selectedOption: 1
    }
  },
  methods: {
    submit() {
      // Handle form submission
    },
    selectOption(optionId) {
      this.selectedOption = optionId;
    },
    isLastFormCheck(index) {
      return index === this.delivery.length - 1;
    },
    backToBasicInfo() {
        window.location.href = '/basicinformation';
    },
    submitDeliveryDate(){
      window.location.href = '/ordersummary';
    }
  }
  }
  </script>

<style>
</style>