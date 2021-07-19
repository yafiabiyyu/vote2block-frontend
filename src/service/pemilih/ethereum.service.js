const Web3 = require("web3");
const w3 = new Web3()

class EthereumService{
    createRoleHash(access_token){
        const hash = w3.utils.soliditySha3(
            {t:'string',v:'pemilih'},
            {t:'string', v:access_token}
        )
        return hash;
    }

    createVerifyHash(pemilih_password) {
        const verifyHash = w3.utils.soliditySha3(
            {t:'string', v:'pemilih'},
            {t:'string', v:pemilih_password}
        )
        return verifyHash
    }

    checkHash(){
        const user = JSON.parse(localStorage.getItem('user'));
        const generateHash = this.createRoleHash(user.access_token.toString());
        const hash_from_storage = localStorage.getItem('hash');
        if(generateHash == hash_from_storage){
            return true
        }else{
            return false
        }
    }

    checkVerifyHash(pemilih_password){
        const generateVerifyHash = this.createVerifyHash(pemilih_password);
        const verifyHash_from_storage = localStorage.getItem('verifyHash');
        if(generateVerifyHash == verifyHash_from_storage){
            return true
        }else{
            return false
        }
    }
}
export default new EthereumService();