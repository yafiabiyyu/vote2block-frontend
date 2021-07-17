const user = JSON.parse(localStorage.getItem("user"));
const initialState = {status:{voted:false}}

export const vote = {
    namespaced: true,
    state: initialState,
    action:{
        voted({ commit }){
            commit('voteSuccess')
        },
        removevoted({ commit }){
            commit('voteRemove')
        }
    },
    mutations:{
        voteSuccess(state){
            state.status.votes = true;
        },
        voteRemove(state){
            state.status.votes = false;
        }
    }
}