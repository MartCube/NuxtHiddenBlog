export default function (doc) {
	// Return the path depending on Prismic Document's type

	if (doc.type === 'index') {
		if (doc.lang === 'en-us') return '/'
		else return `/${doc.lang}/`
	} else if (doc.type === 'page') {
		return `/${doc.lang}/${doc.uid}`
	} else if (doc.type === 'blog-post') {
		return `/${doc.lang}/post/${doc.uid}`
	}

	// Default to the root
	return '/not-found'
}
