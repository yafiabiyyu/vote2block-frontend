<template>
	<CRow>
		<CCol col="12">
			<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
			<CCard>
				<CCardHeader>Data</CCardHeader>
				<div v-show="showContent">
					<CCardBody>
						<CRow>
							<CCol :col="6">
								<CInput type="text" readonly v-model="kandidat.kandidat_id" label="No Identitas" />
							</CCol>
							<CCol :col="6">
								<CInput type="text" readonly v-model="kandidat.nomor_urut" label="No Urut" />
							</CCol>
						</CRow>
						<CRow>
							<CCol :col="6">
								<CInput type="text" readonly v-model="kandidat.nama_kandidat" label="Nama Lengkap" />
							</CCol>
							<CCol :col="6">
								<CInput type="date" readonly v-model="kandidat.tanggal_lahir" label="Tanggal Lahir" />
							</CCol>
						</CRow>
						<CRow>
							<CCol :col="6">
								<CInput type="text" readonly v-model="kandidat.contact.email" label="Email" />
							</CCol>
							<CCol :col="6">
								<CInput type="text" readonly v-model="kandidat.contact.phone" label="No Telephone" />
							</CCol>
						</CRow>
						<CRow>
							<CCol :col="6">
								<CInput type="text" readonly v-model="kandidat.alamat.provinsi" label="Provinsi" />
							</CCol>
							<CCol :col="6">
								<CInput type="text" readonly v-model="kandidat.alamat.kota" label="Kota" />
							</CCol>
						</CRow>
						<CRow>
							<CCol :col="12">
								<CInput type="text" readonly v-model="kandidat.alamat.alamat_lengkap" label="Alamat Lengkap" />
							</CCol>
						</CRow>
						<CRow>
							<CCol :col="6">
								<CTextarea readonly v-model="kandidat.visi" label="Visi" rows="6" />
							</CCol>
							<CCol :col="6">
								<CTextarea readonly v-model="kandidat.misi" label="Misi" rows="6" />
							</CCol>
						</CRow>
						<CImg :src="kandidat.image_url" height="300" width="300" align="left" />
					</CCardBody>
				</div>
				<CCardFooter>
					<CButton color="primary" @click="goBack">Kembali</CButton>
				</CCardFooter>
			</CCard>
		</CCol>
	</CRow>
</template>

<script>
	import EthereumService from "../../../service/admin/ethereum.service";
	import AdminService from "../../../service/admin/admin.service";
	export default {
		name: "DetailKandidat",
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.userOpened = from.fullPath.includes("kandidat");
			});
		},
		data() {
			return {
				userOpened: null,
				alert: {
					color: "",
					message: "",
					status: false
				},
				showContent: true,
				kandidat: {
					kandidat_id: null,
					nomor_urut: null,
					nama_kandidat: null,
					tanggal_lahir: null,
					visi: null,
					misi: null,
					contact: {
						email: null,
						phone: null
					},
					alamat: {
						provinsi: null,
						kota: null,
						alamat_lengkap: null
					},
					image_url: null
				}
			};
		},
		methods: {
			goBack() {
				this.userOpened
					? this.$router.go(-1)
					: this.$router.push("/admin/kandidat");
			}
		},
		computed: {
			loggedIn() {
				return this.$store.state.auth.status.loggedIn;
			},
			checkHash() {
				return EthereumService.checkHash();
			}
		},
		mounted() {
			if (this.loggedIn) {
				if (this.checkHash) {
					AdminService.getSingleKandidat(this.$route.params.id).then(
						response => {
							this.kandidat.kandidat_id = response.data.kandidat_id;
							this.kandidat.nomor_urut = response.data.nomor_urut;
							this.kandidat.nama_kandidat = response.data.nama_kandidat;
							this.kandidat.tanggal_lahir = response.data.tanggal_lahir;
							this.kandidat.contact.phone = response.data.contact.phone;
							this.kandidat.contact.email = response.data.contact.email;
							this.kandidat.alamat.provinsi = response.data.alamat.provinsi;
							this.kandidat.alamat.kota = response.data.alamat.kota;
							this.kandidat.alamat.alamat_lengkap =
								response.data.alamat.alamat_lengkap;
							this.kandidat.visi = response.data.visi;
							this.kandidat.misi = response.data.misi;
							this.kandidat.image_url = response.data.image_url;
						},
						error => {
							if (error.status == 401) {
								this.showContent = false;
								this.alert.color = "danger";
								this.alert.message = "Sesi anda telah berakhir";
								this.alert.status = true;
								this.$store.dispatch("auth/removeauth");
								setTimeout(() => this.$router.push("/login/administrator"), 5000);
							}
						}
					);
				}else{
                    this.$router.push("/login/user");
                }
			}
		}
	};
</script>

<style scoped>
</style>