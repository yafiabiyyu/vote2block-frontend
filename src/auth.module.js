import AdminAuth from "./service/admin/auth.service";
import PemilihAuth from "./service/pemilih/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AdminAuth.login(user).then(
                (user) => {
                    commit("loginSuccess", user);
                    return Promise.resolve(user);
                },
                (error) => {
                    commit("loginFailur");
                    return Promise.reject(error);
                }
            );
        },
        loginPemilih({ commit }, user){
            return PemilihAuth.login(user).then(
                (user) => {
                    commit("loginSuccess", user);
                    return Promise.resolve(user);
                },
                (error) => {
                    commit("loginFailur");
                    return Promise.reject(error);
                }
            )
        },
        removeauth({ commit }) {
            AdminAuth.removeAuth();
            commit("removeAuth");
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailur(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        removeAuth(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
    },
};
