<template>
	<div class="square-button" @click="$emit('click', $event)" v-bind="$attrs">
		<slot />
	</div>
</template>

<style lang="scss">
// .square-button {
// 	background: rgba(black, 0.4);
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	height: 42px;
// 	width: 42px;
// 	margin-bottom: 10px;
// 	cursor: pointer;
// 	transition: background 0.5s;
// 	&:hover {
// 		background: black;
// 	}
// }

.square-button {
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.60);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.75rem;
  width: 2.75rem;
  cursor: pointer;
  transition: background 0.5s;
}
.square-button:hover {
  background: black;
}
.square-button .zoom-in,
.square-button .zoom-out{
  color: #8690A2;
  font-size: 24px;
  font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 48;
  transition: 0.7s all;
}
.square-button:hover .zoom-in,
.square-button:hover .zoom-out{
  color: #fff;
  transition: 0.7s all;
  font-variation-settings: 'FILL' 1,'wght' 800,'GRAD' 0,'opsz' 48;
}

/* MEDIA QUERIES */

/* Large (lg) and Extra large (xl) */
@media (min-width: 992px) and (max-width: 1399.98px) {

.square-button {
  border-radius: 0.375rem;
  background: rgba(0, 0, 0, 0.60);
  height: 2.063rem;
  width: 2.063rem;
}
.square-button .zoom-in,
.square-button .zoom-out{
  font-size: 20px;
}

}


</style>