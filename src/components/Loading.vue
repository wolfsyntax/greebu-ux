<template>
      <span>
      <i class="busy-submitting"></i>
        {{ infoText }}
      </span>
</template>

<script>
export default {

  props: {
    infoText: String,
  },
};
</script>

<style lang="scss" scoped>

.busy-submitting {
  animation: spin 1s infinite linear;
  display: inline-block;
  font-weight: bold;
  font-size: 1.1rem;
  font-style: normal;
  color: white !important;
  margin-right: 0.3rem;
}
.busy-submitting::before{
  content: "\25E0";
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
}
@media (min-width: 992px) and (max-width: 1399.98px) {
.busy-submitting {
  font-size: 0.8rem;
}
}

</style>