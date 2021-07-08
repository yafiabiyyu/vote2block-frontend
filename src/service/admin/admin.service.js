import axios from 'axios'
import authHeader from "./../auth-header";

const base_url = process.env.VUE_APP_BASE_URL;
const imgbb_url = process.env.VUE_APP_IMGBB_URL;

class AdminService{
    getAdminBoard(){
        return axios.get(base_url+"/admin/dashboard", {headers:authHeader()});
    }

    getKandidatData() {
        return axios.get(base_url + "/admin/data/kandidat", {headers:authHeader()});
    }

    setupWaktu(waktu){
        return axios.post(base_url + "/admin/setting/waktu",{
            registerstart:Date.parse(waktu.registerstart)/1000,
            registerfinis:Date.parse(waktu.registerfinis)/1000,
            votingstart:Date.parse(waktu.votingstart)/1000,
            votingfinis:Date.parse(waktu.votingfinis)/1000
        },{headers:authHeader()});
    }

    registerKandidat(kandidat){
        return axios.post(base_url + "/admin/pendaftaran/kandidat", {
            kandidat_id:kandidat.kandidat_id,
            nomor_urut:parseInt(kandidat.nomor_urut),
            nama_kandidat:kandidat.nama_kandidat,
            tanggal_lahir:kandidat.tanggal_lahir,
            visi:kandidat.visi,
            misi:kandidat.misi,
            contact:kandidat.contact,
            alamat:kandidat.alamat,
            image_url:kandidat.image_url
        },{headers:authHeader()});
    }

    imageBB(formData){
        const data = new FormData();
        data.set('key', process.env.VUE_APP_IMGBB_KEY);
        data.append('image',formData);
        const config = {
            method:'post',
            url:imgbb_url,
            data:data
        }
        return axios(config)
    }
}
export default new AdminService();