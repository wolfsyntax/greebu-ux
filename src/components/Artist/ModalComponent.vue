<template>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <slot></slot>
        
        <button @click="closeModal">Close Modal</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showModal: Boolean,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style>
  /* Styles for your modal */
  </style>
  