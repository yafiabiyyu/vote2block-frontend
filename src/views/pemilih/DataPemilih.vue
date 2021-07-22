<template>
	<CRow>
		<CCol col="12">
			<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
			<CCard>
				<CCardHeader>Data Pemilih</CCardHeader>
				<div>
					<CCardBody>
						<div v-if="pemilih">
							<CRow>
								<CCol :col="4">
									<CInput v-model="pemilih.pemilih_id" type="text" label="No Identitas" />
								</CCol>
								<CCol :col="4">
									<CInput v-model="pemilih.nama_lengkap" type="text" label="Nama Lengkap" />
								</CCol>
								<CCol :col="4">
									<CInput v-model="pemilih.tanggal_lahir" type="date" label="Tanggal Lahir" />
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="6">
									<CInput v-model="pemilih.contact.email" type="text" label="Email" />
								</CCol>
								<CCol :col="6">
									<CInput v-model="pemilih.contact.phone" type="text" label="No Telephone" />
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="6">
									<CInput v-model="pemilih.alamat.provinsi" type="text" label="Provinsi" />
								</CCol>
								<CCol :col="6">
									<CInput v-model="pemilih.alamat.kota" type="text" label="Kota" />
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="12">
									<CInput v-model="pemilih.alamat.alamat_lengkap" type="text" label="Alamat Lengkap" />
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="12">
									<CInput v-model="pemilih.ethereum_address" type="text" label="Alamat Ethereum" />
								</CCol>
							</CRow>
						</div>
					</CCardBody>
				</div>
			</CCard>
		</CCol>
	</CRow>
</template>

<script>
	import PemilihService from "../../service/pemilih/pemilih.service";
	import EthereumService from "../../service/pemilih/ethereum.service";
	export default {
		name: "DetailPemilih",
		data() {
			return {
				alert: {
					color: "",
					message: "",
					status: false
				},
				showContent: true,
				pemilih: null
			};
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
					PemilihService.getdataPemilih().then(
						response => {
							this.pemilih = response.data;
						},
						error => {
							if (error.status == 401) {
								this.showContent = false;
								this.alert.color = "danger";
								this.alert.message = "Sesi anda telah berakhir";
								this.alert.status = true;
								this.$store.dispatch("auth/removeauth");
								setTimeout(() => this.router.push("/login/user"), 5000);
							}
						}
					);
				} else {
					this.$router.push("/login/administrator");
				}
			}
		}
	};
</script>

<style>
</style>