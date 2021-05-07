export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',
	components: true,

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'blog',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Customize the progress-bar color
	loading: { color: '#00C08B' },

	// Global css
	css: ['~/assets/main.scss'],

	// Plugins to load before mounting the App
	plugins: [{ src: `~/plugins/lazysizes.client.js` }],

	// Nuxt.js modules
	modules: ['@nuxtjs/prismic', '@nuxtjs/style-resources'],

	prismic: {
		endpoint: 'https://nuxthiddenblog.cdn.prismic.io/api/v2',
		linkResolver: '@/plugins/link-resolver',
		htmlSerializer: '@/plugins/html-serializer',
		preview: false,
		// disableGenerator: true, // disable module's crawler
	},

	styleResources: {
		scss: ['./assets/colors.scss'],
	},

	// Build configuration
	build: {
		hotMiddleware: {
			client: {
				quiet: true,
			},
		},
		extend(config, { isClient, loaders: { vue } }) {
			vue.transformAssetUrls.img = ['data-src', 'src']
		},
	},

	generate: {
		fallback: '404.html',
	},
}
