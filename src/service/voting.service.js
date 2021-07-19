import axios from 'axios'
import authHeader from "./auth-header"

const base_url = process.env.VUE_APP_BASE_URL;

class VotingService{
    getStatusWaktu(){
        return axios.get(base_url + "/voting/status/waktu", {headers:authHeader()});
    }

    getRegisterStatus(){
        return axios.get(base_url + "/voting/status/waktu/pendaftaran", {headers:authHeader()});
    }

    getVotingStatus(){
        return axios.get(base_url + "/voting/status/waktu/pemilihan");
    }

    getKandidatData(){
        return axios.get(base_url + "/voting/kandidat")
    }

    checkHakPilih(){
        return axios.get(base_url + "/voting/status/pemilih", {headers:authHeader()});
    }

    voting(kandidatId) {
        return axios.post(base_url + "/voting/kandidat", {kandidatId:kandidatId}, {headers:authHeader()});
    }

    qucickCount(){
        return axios.get(base_url + "/voting/quickcount")
    }

    hasilPemilihan(){
        return axios.get(base_url + "/voting/hasil/pemilihan")
    }

    getKandidatDipilih(){
        return axios.get(base_url + "/voting/kandidat/dipilih", {headers:authHeader()})
    }

}
export default new VotingService();