import axios from "axios";
import authHeader from "../auth-header";
import EthereumService from './ethereum.service';
require("dotenv").config({path:'../../../.env'});

const base_url = "http://127.0.0.1:5000/vote2block/api/v1";
class AdminAuth{
    login(user){
        return axios.post(base_url + "/auth/admin/login", {
            username:user.username,
            password:user.password
        }).then(response =>{
            // console.log(response.data.data.access_token);
            if(response.data){
                const roleHash = EthereumService.generateRole(response.data.data.access_token);
                const confirmUser = EthereumService.confrimUser(user.password);
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('hashR',roleHash);
                localStorage.setItem('confirmUser', confirmUser);
            }
            return response.data;
        });
    }

    logout(){
        return axios.post(
            base_url + '/auth/logout', { headers: authHeader() }
        ).then(response => {
            if(response.data.data.message === "Berhasil"){
                localStorage.removeItem('user');
                localStorage.removeItem('hashR');
                localStorage.removeItem('confirmUser');
            }
        });
    }

    removeAuth(){
        localStorage.removeItem('user');
        localStorage.removeItem('hashR');
        localStorage.removeItem('confirmUser');
    }
}

export default new AdminAuth();