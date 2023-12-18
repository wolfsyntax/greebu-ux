<template>
    <div v-if="isVisible" @mouseover="hideDiv" class="d-flex align-items-center" id="drag-mouse-wrap">
        <img src="/assets/vue-cropper/drag-icon.svg" class="drag-cursor" />
        <h4 class="mb-0 drag">Drag to reposition</h4>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isVisible: true
        };
    },
    methods: {
        hideDiv(){
            this.isVisible = false;
        }
    }
};
</script>

<style lang="scss" scoped></style>