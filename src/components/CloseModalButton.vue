<template>
    <button type="button" class="btn ms-auto border-0 p-0" id="closeModalButton" data-bs-dismiss="modal" aria-label="Close">
        <span class="material-symbols-rounded cancel-icon">&#xe5c9;</span>
    </button>
  </template>
  
  <script >
  import { mapActions, mapState } from 'vuex';
  
export default {
props: {
},
data: () => ({
    
}),
methods: {

},
mounted() {
},
}
</script>
  
<style lang="scss" scoped>
#closeModalButton .cancel-icon {
    font-size: 24px;
    color: var(--gray6);
    font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 48;
}
#closeModalButton:hover .cancel-icon {
    color: var(--orange);
    font-variation-settings: 'FILL' 1,'wght' 800,'GRAD' 0,'opsz' 48;
    transition: all .7s;
}
@media (min-width: 992px) and (max-width: 1399.98px) {
    #closeModalButton .cancel-icon {
    font-size: 20px;
}
}
</style>