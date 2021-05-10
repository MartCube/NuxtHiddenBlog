<template>
	<div class="container">
		<template v-if="!$fetchState.pending">
			<h2>{{ title }}</h2>

			<div v-for="slice in slices" :key="slice.slice_type">
				<GridPost v-if="slice.slice_type === 'grid_post'" />
			</div>
		</template>
	</div>
</template>

<script>
export default {
	async validate({ $prismic, params }) {
		const page = await $prismic.api.getByUID('page', params.page, {
			lang: params.lang,
		})
		return page !== undefined
	},
	data: () => ({
		page: null,
	}),
	async fetch() {
		// console.log(this.$route)
		const page = await this.$prismic.api.getByUID('page', this.$route.params.page, {
			lang: this.$route.params.lang,
		})
		this.$store.dispatch('loadLocals', page)
		this.page = page
	},
	computed: {
		locals() {
			return this.$store.getters.locals
		},
		title() {
			return this.$prismic.asText(this.page.data.title)
		},
		slices() {
			return this.page.data.body
		},
	},

	methods: {},
}
</script>
