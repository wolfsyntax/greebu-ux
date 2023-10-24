<template>
    <div id="info-block-image">
        <div class="d-flex align-items-center img-dimensions">
        <span class="material-symbols-rounded info">&#xe88e;</span>
        <p class="text-start description">{{ infoText }}</p>
        </div>
    </div>
</template>
  
  <script>
  export default {
  
    props: {
      infoText: String,
    },
  };
  </script>
  
  <style lang="scss" scoped></style>