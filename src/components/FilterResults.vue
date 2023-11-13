<template>
  
  <div id="filter-results">
    <div class="d-flex align-items-center justify-content-between top-filter">
        <slot name="top-filter">Top Filter</slot>
    </div>
    <div class="d-flex align-items-center bottom-filter">
        <slot name="bottom-filter">Bottom Filter</slot> 
    </div> 
 </div>
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
</style>