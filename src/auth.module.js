import AdminAuth from "./service/admin/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced:true,
    state:initialState,
    actions:{
        login({ commit }, user) {
            return AdminAuth.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailur');
                    return Promise.reject(error);
                }
            )
        },
        logout({ commit }){
            AdminAuth.logout();
            commit('logout');
        },
        removeAuth({ commit }){
            AdminAuth.removeAuth();
            commit('removeauth')
        }
    },
    mutations:{
        loginSuccess(state, user){
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailur(state) {
            state.status.loggedIn = false;
            status.user = null;
        },
        logout(state){
            state.status.loggedIn = false;
            state.user = null;
        },
        removeauth(state){
            state.status.loggedIn = false;
            state.user = null;
        }
    }
}