export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.data.access_token) {
        return {Authorization: 'Bearer ' + user.data.access_token};
    }else {
        return {};
    }
}