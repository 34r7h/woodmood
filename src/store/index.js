import Vue from 'vue'
const state = () => ({
    tours: {},
    excursions: {},
    filtered: {
        tours: {
            location: "",
            cost: [0, 500],
            search: "",
            seasons: []
        },
        excursions: {
            location: "",
            cost: [0, 500],
            search: "",
            seasons: []
        }
    },
    transfers: {},
    site: {}

})

const mutations = {
    setState(state, { type, data }) {
        console.log(state, data)
        state[type] = data
    }
}

const actions = {
    add(state) {
        state.counter++
    },
    update(state, payload) {
        console.log('update', payload.type, payload.data)
        const ref = this.$fireStore.collection('items').doc(payload.type)
        return ref.set(payload.data)
    },
    get({ commit, state }) {
        ['tours', 'excursions', 'transfers', 'site'].map((type) => {
            const ref = this.$fireStore.collection('items').doc(type)
            ref.get().then((data) => {
                console.log(data.exists)
                data.exists ? commit('setState', { type, data: data.data() }) : null
            })
        })
    }
}
export { state, mutations, actions }