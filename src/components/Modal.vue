<template>
  <div>
    <p>Test modal<a href="#" @click="modalToggle">now</a></p>
    <div>
      <button type="button" class="btn btn-primary" @click="modalToggle">My Modal</button>
      <div ref="modal" class="modal fade" :class="{ show: active, 'd-block': active }" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modalToggle">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="active" class="modal-backdrop fade show"></div>
    </div>
  </div>
</template>
<script>
export default {
  data()
  {
    return {
      active: false,
    }
  },
  methods: {
    modalToggle()
    {
      const body = document.querySelector("body")
      this.active = !this.active
      this.active ? body.classList.add("modal-open") : body.classList.remove("modal-open")
    },
  },
}
</script>
