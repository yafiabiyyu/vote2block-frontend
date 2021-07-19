const user = JSON.parse(localStorage.getItem("user"));
const initialState = {status:{voted:false}}

export const vote = {
    namespaced: true,
    state: initialState,
    actions:{
        voted({ commit }){
            commit('voteSuccess')
        },
        removevoted({ commit }){
            commit('voteRemove')
        }
    },
    mutations:{
        voteSuccess(state){
            state.status.voted = true;
        },
        voteRemove(state){
            state.status.voted = false;
        }
    }
}