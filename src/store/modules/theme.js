const state = {
    buttonType: 'primary',
}
const mutations = {
    setButtonType: (state, buttonType) => {
        state.buttonType = buttonType
    }
}
const actions = {
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
