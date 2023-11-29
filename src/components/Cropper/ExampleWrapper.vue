<script>
export default {
	props: {
		href: {
			type: String,
			default: '',
		},
		noBorder: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<template>
	<div class="example-wrapper" :class="{ 'example-wrapper--no-border': noBorder }">
		<slot />
		<a
			:href="href"
			title="Full Source"
			class="example-wrapper__icon"
			target="_blank"
			rel="nofollow noopener"
			v-if="href"
		>
			<img src="/src/assets/footer-logo-og.png" />
		</a>
	</div>
</template>

<style>
.example-wrapper {
	width: 100%;
	height: 32.25rem;
}
.example-wrapper--no-border {
  border: none;
}
.example-wrapper__icon {
  opacity: 0.5;
  position: absolute;
  top: 0;
  right: -32px;
  height: 16px;
  display: flex;
  cursor: pointer;
  transition: 0.5s;
}
.example-wrapper__icon:hover {
  opacity: 1;
}
/* @media screen and (max-width: 1090px) {
  .example-wrapper__icon {
    right: -24px;
  }
} */

/* MEDIA QUERIES */

/* Large (lg) and Extra large (xl) */
@media (min-width: 992px) and (max-width: 1399.98px) {
	.example-wrapper {
	height: 324.1875rem;
}
}

</style>