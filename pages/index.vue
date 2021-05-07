<template>
	<div class="container">
		<template v-if="!$fetchState.pending">
			<h2>{{ title }}</h2>
			<div class="alternate locals">
				<n-link v-for="local in locals" :key="local.id" :to="$prismic.linkResolver(local)" class="local">
					{{ local.lang }}
				</n-link>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'Index',
	data: () => ({
		page: null,
	}),
	async fetch() {
		const page = await this.$prismic.api.getSingle('index', {
			lang: this.$route.params.lang,
		})

		this.$store.dispatch('loadLocals', page)
		this.page = page
	},
	computed: {
		locals() {
			return this.$store.getters.locals
		},
		activeLocal() {
			return this.$store.getters.activeLocal
		},
		title() {
			return this.$prismic.asText(this.page.data.title)
		},
	},
	watch: {
		async activeLocal(newValue, oldValue) {
			await this.$nextTick()
			this.$fetch()
		},
	},
}
</script>
