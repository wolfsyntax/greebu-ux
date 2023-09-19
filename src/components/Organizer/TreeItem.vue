<template>
    <ul>
      <li v-for="(menu, index) in menus" :key="index">
        {{ menu.name }}
        <tree-item :menus="menu.children" />
      </li>
    </ul>
  </template>
  
  <script>
  
  export default {
    setup () {
      
  
      return {}
    },
    props: {
      menus: {
        type: Object,
        required: true,
      }
    },
    components: {
  
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>