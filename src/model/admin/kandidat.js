export default class Kandidat {
    constructor(
        kandidat_id,
        nomor_urut,
        nama_kandidat,
        tanggal_lahir,
        visi,
        misi,
        contact,
        alamat,
        image_url
    ){
        this.kandidat_id = kandidat_id;
        this.nomor_urut = nomor_urut;
        this.nama_kandidat = nama_kandidat;
        this.tanggal_lahir = tanggal_lahir;
        this.visi = visi;
        this.misi = misi;
        this.contact = contact;
        this.alamat = alamat;
        this.image_url = image_url;
    }
}