const state = () => ({
    icons: {
        spring: 'flower',
        summer: 'weather-sunny',
        fall: 'leaf-maple',
        winter: 'snowflake',
    },
    bookings: {},
    overlays: {listings: false, featured: {}},
    tours: {},
    excursions: {},
    filtered: {
        tours: {
            location: "",
            cost: [0, 500],
            search: "",
            seasons: [],
            type: ''
        },
        excursions: {
            location: "",
            cost: [0, 500],
            search: "",
            seasons: [],
            type: ''
        }
    },
    transfers: {},
    site: {}

})

const mutations = {
    setState(state, { type, data }) {
        state[type] = data
    }
}

const actions = {
    add(state) {
        state.counter++
    },
    sendBooking(state, payload) {
        const ref = this.$fireStore.collection('bookings').doc('v1')
        return ref.set({ [payload.timestamp]: payload }, { merge: true })
    },
    update(state, payload) {
        const ref = this.$fireStore.collection('items').doc(payload.type)
        return ref.set(payload.data)
    },
    updateSite(state, payload) {
        const ref = this.$fireStore.collection(payload.type).doc('v1')
        return ref.set(payload.data)
    },
    get({ commit, state }) {
        ['tours', 'excursions', 'transfers'].map((type) => {
            const ref = this.$fireStore.collection('items').doc(type)
            ref.get().then((data) => {
                data.exists ? commit('setState', { type, data: data.data() }) : null
            })
        })
    },
    getBookings({ commit, state }) {
        const ref = this.$fireStore.collection('bookings').doc('v1')
        ref.get().then((data) => {

            data.exists ? commit('setState', { type: 'bookings', data: data.data() }) : null
        })
    },
    getSite({ commit, state }) {
        const ref = this.$fireStore.collection('site').doc('v1')
        ref.get().then((data) => {

            data.exists ? commit('setState', { type: 'site', data: data.data() }) : null
        })
    }
}
export { state, mutations, actions }