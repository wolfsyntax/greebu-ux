<template>
    <ul>
      <li v-for="(menu, index) in menus" :key="index">
        {{ menu?.name }}
        <tree-item :menus="menu.children"/>
        <!-- <tree-item :menus="menu.children" v-if="menu.hasOwnProperty('children')" /> -->
      </li>
    </ul>
  </template>
  
  <script>
  // import TreeItem from './TreeItem.vue';
  
  export default {
    props: {
      menus: {
        type: Array,
        required: true,
      }
    },
    setup () {
      
  
      return {}
    },
    components: {
      // TreeItem
    },
    mounted()
    {
      console.log('Tree menu: ', this.menus)
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>