<template>
	<div class="grid">
		<template v-if="!$fetchState.pending">
			<PostCard v-for="blogPost in blogPosts" :key="blogPost.id" :blog-post="blogPost" :post="blogPost" />
		</template>
	</div>
</template>

<script>
export default {
	data: () => ({
		blogPosts: null,
	}),
	async fetch() {
		const data = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'blog-post'), {
			orderings: '[document.first_publication_date desc]',
			pageSize: this.results_per_page,
			page: this.currentPage,
			lang: this.activeLocal,
		})

		this.blogPosts = data.results
	},
	computed: {
		activeLocal() {
			return this.$store.getters.activeLocal
		},
	},
}
</script>

<style lang="scss" scoped>
.grid {
	max-width: 900px;
	min-height: 400px;

	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
	flex-wrap: wrap;
}

.pagination {
	max-width: 800px;
	width: 100%;
	margin-bottom: 10%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-content: center;
	.pages {
		max-width: 300px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		.page {
			cursor: pointer;
			user-select: none;

			width: 35px;
			height: 35px;
			margin: 0 15px;

			display: flex;
			justify-content: center;
			align-items: center;
			align-content: center;

			border: 1px solid transparent;
			border-radius: 5px;
			transition: all 0.25s ease;
			&.active {
				color: $primary;
				border: 1px solid $primary;
			}
			&:hover {
				color: $primary;
				border: 1px solid $primary;
			}
		}
	}
	.back,
	.next {
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;

		span {
			cursor: pointer;
			user-select: none;
			font-size: 1.2em;
			transition: all 0.25s ease;
			&:hover {
				color: $primary;
			}
		}
		svg {
			width: 24px;
			margin: 0 10px;
			path {
				fill: #00c08b;
			}
		}

		&.disable {
			opacity: 0.5;
			pointer-events: none;
		}
	}
}
</style>
