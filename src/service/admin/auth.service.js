import axios from "axios";
import authHeader from "../auth-header";
require("dotenv").config({path:__dirname+'../../.env'});

const base_url = 'http://127.0.0.1:5000/vote2block/api/v1';

class AdminAuth{
    login(user){
        return axios.post(base_url + '/auth/admin/login', {
            username:user.username,
            password:user.password
        }).then(response =>{
            console.log(response.data.data);
            if(response.data){
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data.data;
        });
    }

    logout(){
        return axios.post(
            base_url + '/logout', { headers: authHeader() }
        ).then(response => {
            if(response.data.message === "Berhasil"){
                localStorage.removeItem('user');
            }
        });
    }
}

export default new AdminAuth();