import axios from "axios";
import authHeader from "./../auth-header";

const base_url = process.env.VUE_APP_BASE_URL;
const imgbb_url = process.env.VUE_APP_IMGBB_URL;

class AdminService {
    getAdminBoard() {
        return axios.get(base_url + "/admin/dashboard", {
            headers: authHeader(),
        });
    }

    setupWaktu(waktu) {
        return axios.post(
            base_url + "/admin/setting/waktu",
            {
                registerstart: Date.parse(waktu.registerstart) / 1000,
                registerfinis: Date.parse(waktu.registerfinis) / 1000,
                votingstart: Date.parse(waktu.votingstart) / 1000,
                votingfinis: Date.parse(waktu.votingfinis) / 1000,
            },
            { headers: authHeader() }
        );
    }

    getKandidatData() {
        return axios.get(base_url + "/admin/data/kandidat", {
            headers: authHeader(),
        });
    }

    registerKandidat(kandidat) {
        return axios.post(
            base_url + "/admin/pendaftaran/kandidat",
            {
                kandidat_id: kandidat.kandidat_id,
                nomor_urut: parseInt(kandidat.nomor_urut),
                nama_kandidat: kandidat.nama_kandidat,
                tanggal_lahir: kandidat.tanggal_lahir,
                visi: kandidat.visi,
                misi: kandidat.misi,
                contact: kandidat.contact,
                alamat: kandidat.alamat,
                image_url: kandidat.image_url,
            },
            { headers: authHeader() }
        );
    }

    getSingleKandidat(id) {
        return axios.get(base_url + "/admin/data/kandidat/" + id, {
            headers: authHeader(),
        });
    }

    imageBB(formData) {
        const data = new FormData();
        data.set("key", process.env.VUE_APP_IMGBB_KEY);
        data.append("image", formData);
        const config = {
            method: "post",
            url: imgbb_url,
            data: data,
        };
        return axios(config);
    }

    getPemilihData() {
        return axios.get(base_url + "/admin/data/pemilih", {
            headers: authHeader(),
        });
    }

    registerPemilih(pemilih) {
        return axios.post(
            base_url + "/admin/pendaftaran/pemilih",
            {
                pemilih_id: pemilih.pemilih_id,
                nama_lengkap: pemilih.nama_lengkap,
                tgl_lahir: pemilih.tgl_lahir,
                contact: pemilih.contact,
                alamat: pemilih.alamat,
            },
            { headers: authHeader() }
        );
    }

    getSinglePemilih(id) {
        return axios.get(base_url + "/admin/data/pemilih/" + id, {
            headers: authHeader(),
        });
    }
}
export default new AdminService();
