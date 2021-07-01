import axios from 'axios'
import authHeader from "./../auth-header"

require("dotenv").config({path:'../../../.env'});

const base_url = "http://127.0.0.1:5000/vote2block/api/v1";

class AdminService{
    getAdminBoard(){
        return axios.get(base_url+"/admin/dashboard", {headers:authHeader()});
    }
}
export default new AdminService();