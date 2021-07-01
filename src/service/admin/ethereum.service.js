const Web3 = require("web3");
const w3 = new Web3()

class EthereumService{
    confirmAdmin(user_password){
        const hash = w3.utils.soliditySha3(
            {t:'string',v:'admin'},
            {t:'string', v:user_password}
        );
        return hash;
    }
    generateRole(roleData){
        const role_hash = w3.utils.soliditySha3(
            {t:'string',v:'admin'},
            {t:'string',v:roleData}
        )
        return role_hash
    }
    verifyUser(role_data){
        const active_role = localStorage.getItem('hashR');
        const active_user = localStorage.getItem('user')
        console.log(role_data)
        // const role_data = this.generateRole(active_user.data.access_token);
        // if(active_role == role_data){
        //     return true;
        // }else{
        //     return false;
        // }
    }

}
export default new EthereumService();