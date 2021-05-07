<template>
	<section class="lang-switcher">
		<nuxt-link v-for="altLang in langs" :key="altLang.lang" :to="$prismic.linkResolver(altLang)">
			<span>{{ altLang.lang }}</span>
		</nuxt-link>
	</section>
</template>

<script>
export default {
	name: 'LangSwitcher',
	props: {
		langs: {
			type: Array,
			required: true,
		},
	},
}
</script>
