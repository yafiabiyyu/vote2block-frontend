import axios from "axios";
import authHeader from "./../auth-header";

const base_url = process.env.VUE_APP_BASE_URL;

class PemilihService {
    getdataPemilih(){
        return axios.get(base_url + "/pemilih/detail",{headers:authHeader()})
    }

    updatePassword(oldPassword, newPassword){
        return axios.post(base_url + "/pemilih/update/password", {"old_password":oldPassword, "new_password":newPassword},{headers:authHeader()});
    }
}
export default new PemilihService();
