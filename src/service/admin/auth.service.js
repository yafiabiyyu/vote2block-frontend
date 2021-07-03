import axios from "axios";
import authHeader from "../auth-header";
import EthereumService from "./ethereum.service";
require("dotenv").config({ path: "../../../.env" });

const base_url = "http://127.0.0.1:5000/vote2block/api/v1";
class AdminAuth {
    login(user) {
        return axios
            .post(base_url + "/auth/admin/login", {
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
                    //simpan semua data kedalam localStorage
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
    // Menghapus auth data dari localStorage ketika sesi telah berakhir
    removeAuth() {
        localStorage.removeItem("hash");
        localStorage.removeItem("verifyHash");
        localStorage.removeItem("user");
    }
}

export default new AdminAuth();
