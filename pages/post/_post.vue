<template>
	<div class="container">
		<div v-if="!$fetchState.pending" class="post">
			<PostImage :image-src="post_image" :image-alt="title" />

			<div class="alternate locals">
				<n-link v-for="local in locals" :key="local.id" :to="$prismic.linkResolver(local)" class="local">
					{{ local.lang }}
				</n-link>
			</div>

			<div class="date">
				<i class="icon icon-calendar" />
				{{ date }}
			</div>
			<div class="tags">
				<div v-for="tag in tags" :key="tag">
					<a href="#"> <span>#</span>{{ tag }}</a>
				</div>
			</div>
			<div class="title">
				<h2>{{ title }}</h2>
			</div>

			<section v-for="(slice, index) in slices" :key="'slice-' + index" class="slice">
				<template v-if="slice.slice_type === 'text'">
					<prismic-rich-text class="text" :field="slice.primary.text" />
				</template>
				<template v-if="slice.slice_type === 'image'">
					<PostImage :image-src="slice.primary.image.url" :image-alt="slice.primary.image.alt" description />
				</template>
			</section>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		date: null,
		tags: null,
		post_image: null,
		title: null,
		slices: null,
	}),
	async fetch() {
		// console.log(this.$route)
		const post = await this.$prismic.api.getByUID('blog-post', this.$route.params.post, {
			lang: this.$route.params.lang,
		})

		// locals
		this.$store.dispatch('loadLocals', post)
		// post data
		this.post_image = post.data.post_image.url
		this.formatDate(post.first_publication_date)
		this.tags = post.tags
		this.title = this.$prismic.asText(post.data.post_title)
		// post slices
		this.slices = post.data.body
	},
	computed: {
		locals() {
			return this.$store.getters.locals
		},
		activeLocal() {
			return this.$store.getters.activeLocal
		},
	},
	methods: {
		formatDate(value) {
			let date = this.$prismic.asDate(value)
			date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(date)
			this.date = date
		},
	},
}
</script>

<style lang="scss">
.post {
	max-width: 800px;
	width: 100%;
	margin: 5% 0;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	flex-wrap: wrap;

	.date {
		display: flex;
		width: 100%;
		padding: 15px 0;

		color: $text;
	}
	.tags {
		display: flex;
		width: 100%;
		justify-content: flex-end;
		flex-wrap: wrap;

		a {
			text-decoration: none;
			span {
				color: white;
			}
			color: $primary;

			margin: 0 10px;
			transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);

			&:hover {
				opacity: 0.75;
			}
		}
	}
	.title {
		margin: 40px 0;

		h2 {
			font-size: 2.5em;
			text-align: center;
			margin: 0;
		}
	}

	.text {
		a {
			text-decoration: none;
			color: $primary;

			&:hover {
				color: $secondary;
			}
		}
		ol {
			margin: 20px 40px;
			li {
				margin: 10px 0;
			}
		}
		h4 {
			font-size: 1.6em;
			margin-bottom: 20px;
		}
	}
	.slice {
		width: 100%;
		margin: 20px 0;
	}
}

@media (max-width: 1150px) {
	.post {
		width: 90%;

		.title {
			h2 {
				font-size: 2em;
			}
		}
		.date {
			justify-content: center;
		}
		.tags {
			justify-content: center;
		}
		.paragraph {
			h4 {
				font-size: 1.6em;
			}
			ol {
				margin: 10px 20px;
			}
		}
	}
}
</style>
