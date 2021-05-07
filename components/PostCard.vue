<template>
	<div class="card">
		<nuxt-link :to="link">
			<img :data-src="post.data.post_image.url + '&fit=crop&w=400&h=250'" class="lazyload" />
			<div class="color-overlay"></div>
			<div class="text">
				<div class="date">
					{{ date }}
				</div>
				<h2 class="title">
					{{ $prismic.asText(post.data.post_title) }}
				</h2>
			</div>
		</nuxt-link>
	</div>
</template>

<script>
export default {
	props: {
		post: {
			type: Object,
			required: true,
		},
	},
	computed: {
		link() {
			return this.$prismic.linkResolver(this.post)
		},
		date() {
			const date = this.$prismic.asDate(this.post.first_publication_date)
			return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(date)
		},
	},
}
</script>

<style lang="scss" scoped>
.card {
	display: flex;
	position: relative;
	overflow: hidden;
	width: 400px;
	height: 250px;
	margin: 20px;
	cursor: pointer;

	border-radius: 20px;
	img {
		width: 400px;
		height: 250px;
		object-fit: cover;
		object-position: center;

		transition: all 0.35s ease;
		&.lazyload,
		&.lazyloading {
			opacity: 0;
		}
		&.lazyloaded {
			opacity: 1;
			transition: all 1.5s cubic-bezier(0.215, 0.61, 0.355, 1);
		}
	}

	.color-overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		opacity: 1;
		transition: all 0.35s ease;
	}

	.text {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;

		text-align: center;
		color: #f7f7f2;

		.date {
			font-family: 'sourceCode';
			font-size: 0.9em;
			margin: 10px 0;
		}
		.title {
			width: 80%;
			font-family: 'sourceCode';
			text-transform: uppercase;
		}
	}

	&:hover {
		.color-overlay {
			background: rgba(0, 0, 0, 0.2);
		}
	}
}
</style>
