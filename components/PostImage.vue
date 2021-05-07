<template>
	<div class="image">
		<picture>
			<source :data-srcset="imageSrc + '&fit=crop&w=400&h=500'" media="(max-width: 500px)" />
			<img :data-src="imageSrc + '&fit=crop&w=800&h=450&q=45&dpr=1'" class="lazyload" :alt="imageAlt" />
		</picture>
		<span v-if="description" class="description"> {{ imageAlt }} </span>
	</div>
</template>

<script>
export default {
	props: {
		description: {
			type: Boolean,
			default: false,
		},
		imageSrc: {
			type: String,
			required: true,
		},
		imageAlt: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

.image {
	width: 100%;
	height: 450px;
	border-radius: 5px 0 0 5px;
	background-color: $dark;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;

		&.lazyload,
		&.lazyloading {
			opacity: 0;
		}
		&.lazyloaded {
			opacity: 1;
			transition: all 1s cubic-bezier(0.215, 0.61, 0.355, 1);
		}
	}
	.description {
		display: flex;
		justify-content: center;
		opacity: 0.8;
		font-size: 0.9em;
	}
}
</style>
