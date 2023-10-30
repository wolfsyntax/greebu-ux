<template>
    <div class="text-center no-message">
        <img src="/assets/empty.svg" class="empty-icon" alt="Empty icon">
        <h2 class="msg-title">{{ infoTitle }}</h2>
        <p class="mb-0 msg-description">{{ infoText }}</p>
    </div>
</template>

<script>
export default {

props: {
  infoTitle: String,
  infoText: String,
},
};
</script>

<style lang="scss" scoped>


</style>