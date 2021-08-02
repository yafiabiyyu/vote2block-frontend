const user = JSON.parse(localStorage.getItem("user"));


export const vote = {
    namespaced: true,
    state: {
        voted:false,
        timesetup:false
    },
    actions:{
        voted({ commit }){
            commit('voteSuccess')
        },
        removevoted({ commit }){
            commit('voteRemove')
        },
        setTime({commit}){
            commit('timeSuccess')
        }
    },
    mutations:{
        voteSuccess(state){
            state.voted = true;
        },
        voteRemove(state){
            state.voted = false;
        },
        timeSuccess(state){
            state.timesetup = true;
        }
    }
}