export const state = (context) => ({
	activeLocal: '',
	locals: [],
})

// Functions that return back data from state.
export const getters = {
	activeLocal: (state) => state.activeLocal,
	locals: (state) => state.locals,
}

// Functions that directly mutate the state.
export const mutations = {
	setActiveLocal(state, value) {
		state.activeLocal = value
	},
	setLocals(state, value) {
		state.locals = value
	},
}

// Functions that call mutations on the state.
// They can call multiple mutations, can call other actions, and they support asynchronous operations.
export const actions = {
	loadLocals(context, value) {
		context.commit('setLocals', value.alternate_languages)
		context.commit('setActiveLocal', value.lang)
	},
}
