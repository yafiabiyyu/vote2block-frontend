import axios from "axios";
import authHeader from "./../auth-header";
import EthereumService from "./ethereum.service";

const base_url = process.env.VUE_APP_BASE_URL;

class PemilihAuth {
    login(user) {
        return axios
            .post(base_url + "/auth/pemilih/login", {
                username: user.username,
                password: user.password,
            })
            .then((response) => {
                if (response.data.status == "Berhasil") {
                    const hash = EthereumService.createRoleHash(
                        response.data.data.access_token
                    );
                    const verifyHash = EthereumService.createVerifyHash(
                        user.password
                    );
                    localStorage.setItem("hash", hash);
                    localStorage.setItem("verifyHash", verifyHash);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.data)
                    );
                }
                return response.data;
            });
    }
    
    removeAuth(){
        localStorage.removeItem("hash");
        localStorage.removeItem("verifyHash");
        localStorage.removeItem("user");
    }
}
export default new PemilihAuth();