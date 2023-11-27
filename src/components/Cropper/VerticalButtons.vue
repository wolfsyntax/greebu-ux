<template>
	<div class="vertical-buttons">
		<slot />
	</div>
</template>

<style lang="scss">
.vertical-buttons {
	position: absolute;
	// left: 10px;
	// top: 50%;
	// transform: translateY(-50%);
    display: flex;
    gap: 0.75rem;
    top: 83%;
	left: 2rem;
}
</style>