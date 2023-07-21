<template>
    <div>
      <section class="phone-verification">
        <div class="container">
            <div class="check-message">
                <div class="card">
                    <div class="card-header">
                        <a href="/register">
                            <span class="material-symbols-outlined">&#xe5c4;</span>
                        </a>
                    </div>
                    <div class="card-body text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none">
                        <path d="M53.0259 2.92014C53.9911 2.92014 54.7761 3.70514 54.7761 4.67033V71.2435C54.7761 72.2087 53.9911 72.9937 53.0259 72.9937H22.889C21.9238 72.9937 21.1388 72.2087 21.1388 71.2435V4.67033C21.1388 3.70514 21.9238 2.92014 22.889 2.92014H53.0259ZM53.0259 0.41748H22.889C20.5398 0.41748 18.6361 2.322 18.6361 4.67033V71.2435C18.6361 73.5926 20.5406 75.4963 22.889 75.4963H53.0259C55.3751 75.4963 57.2788 73.5918 57.2788 71.2435V4.67033C57.2788 2.322 55.3751 0.41748 53.0259 0.41748Z" fill="#8690A2"/>
                        <path d="M27.2594 2.0791C27.2594 4.43494 28.8085 6.36198 30.7014 6.36198H45.2135C47.1063 6.36198 48.6554 4.43494 48.6554 2.0791H27.2594ZM40.345 4.17132H32.4482C32.218 4.17132 32.0311 3.98446 32.0311 3.75421C32.0311 3.52397 32.218 3.3371 32.4482 3.3371H40.345C40.5752 3.3371 40.7621 3.52397 40.7621 3.75421C40.7621 3.98446 40.576 4.17132 40.345 4.17132ZM42.886 4.33483C42.5656 4.33483 42.3054 4.07455 42.3054 3.75421C42.3054 3.43387 42.5656 3.1736 42.886 3.1736C43.2063 3.1736 43.4666 3.43387 43.4666 3.75421C43.4666 4.07455 43.2063 4.33483 42.886 4.33483Z" fill="#8690A2"/>
                        </svg>
                        <h5 class="card-title">Check your text messages</h5>
                        <p class="card-text">Enter verification code we sent to</p>
                        <p class="phone-number">+639xxxxxxxxx</p>
                        <div class="phone-screen">
                          <input
                          v-for="(code, index) in codes"
                          :key="index"
                          type="text"
                          class="verification-box"
                          maxlength="1"
                          v-model="codes[index]"
                          @input="handleInput(index)"
                          @keydown="handleKeyDown($event, index)"
                          ref="inputs"
                        >
                        </div>
                        <p class="resend-code">Resend Code (59s)</p>
                        <div class="btn-wrapper">
                            <button type="button" class="btn btn-primary next">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data()
    {
      return {
        codes: ['', '', '', '', '', ''],
      }
    },
    methods: {
      handleInput(index) {
      if (this.codes[index].length === 1) {
        // Move to the next input field when the current one has a single character
        if (index < this.codes.length - 1) {
          this.$refs.inputs[index + 1].focus();
        }
      }
    },
    handleKeyDown(event, index) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57) {
        // Prevent input if it's not a number or the Backspace key
        if (charCode !== 8) {
          event.preventDefault();
        }
      } else if (charCode === 8 && index > 0 && !this.codes[index]) {
        // Handle Backspace key to clear the current input and move focus to the previous input
        this.$refs.inputs[index - 1].focus();
        this.codes[index - 1] = '';
      }
    },
  },
  
  };
  </script>
  
  <style scoped></style>