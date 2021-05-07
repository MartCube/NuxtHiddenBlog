<template>
	<header class="navbar">
		<div class="locals">
			<!-- <n-link class="logo" :to="/">
				<img data-src="/logo.svg" class="lazyload" alt="logo" />
			</n-link> -->

			<div class="active local">{{ activeLocal }}</div>
			<div class="alternate locals">
				<n-link v-for="local in locals" :key="local.id" :to="$prismic.linkResolver(local)" class="local" @click.native="setActiveLocal(local)">
					{{ local.lang }}
				</n-link>
			</div>
		</div>

		<template v-if="!$fetchState.pending">
			<div class="pages">
				<n-link v-for="page in pages" :key="page.id" :to="$prismic.linkResolver(page)" class="page">
					{{ page.uid }}
				</n-link>
			</div>
		</template>
	</header>
</template>

<script>
export default {
	data: () => ({
		pages: null,
	}),
	async fetch() {
		const pages = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'page'), {
			lang: this.activeLocal,
		})

		this.pages = pages.results
	},
	computed: {
		locals() {
			return this.$store.getters.locals
		},
		activeLocal() {
			return this.$store.getters.activeLocal
		},
	},
	watch: {
		async activeLocal(newValue, oldValue) {
			await this.$nextTick()
			this.$fetch()
		},
	},
	methods: {
		setActiveLocal(local) {
			this.$store.commit('setActiveLocal', local.lang)
		},
	},
}
</script>

<style lang="scss" scoped>
.navbar {
	width: 100%;
	display: flex;
	justify-content: space-between;

	height: 60px;

	.locals {
		display: flex;
		align-items: center;
		.local {
			margin-left: 2rem;
			cursor: pointer;
			&.active {
				background: $primary;
			}
		}
	}
	.pages {
		display: flex;
		align-items: center;
		.page {
			margin-right: 2rem;
		}
	}

	position: relative;
	.logo {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		img {
			height: 60px;
		}
	}
}
</style>
