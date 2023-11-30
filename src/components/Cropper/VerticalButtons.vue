<template>
	<div class="vertical-buttons">
		<slot />
	</div>
</template>

<style>
.vertical-buttons {
	position: absolute;
    display: flex;
    gap: 0.5rem;
    top: 7.5%;
	left: 4.2%;
}
/* MEDIA QUERIES */

/* Large (lg) and Extra large (xl) */
@media (min-width: 992px) and (max-width: 1399.98px) {
	.vertical-buttons {
	gap: 0.3rem;
	/* top: 75%; */
}
}
</style>