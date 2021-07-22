<template>
	<CRow>
		<CCol md="12">
			<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
			<CCard>
				<CCardHeader>Form Pendaftaran</CCardHeader>
				<CCardBody>
					<div v-show="showContentAndMessage.showContent">
						<CForm @submit.prevent="submitHandle">
							<CRow>
								<CCol :col="4">
									<CInput v-model="pemilih.pemilih_id" type="text" label="No Identitas"/>
								</CCol>
								<CCol :col="4">
									<CInput v-model="pemilih.nama_lengkap" type="text" label="Nama Lengkap"/>
								</CCol>
								<CCol :col="4">
									<CInput v-model="pemilih.tgl_lahir" type="date" label="Tanggal Lahir"/>
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="6">
									<CInput v-model="contact.email" type="text" label="Email"/>
								</CCol>
								<CCol :col="6">
									<CInput v-model="contact.phone" type="text" label="No Telephone"/>
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="6">
									<CInput v-model="alamat.provinsi" type="text" label="Provinsi"/>
								</CCol>
								<CCol :col="6">
									<CInput v-model="alamat.kota" type="text" label="Kota"/>
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="12">
									<CInput v-model="alamat.alamat_lengkap" type="text" label="Alamat Lengkap"/>
								</CCol>
							</CRow>
							<CRow>
								<CCol>
									<CButton type="submit" class="CButton" color="info">Daftar</CButton>
									<CButton type="button" @click="goBack" class="CButton" color="warning">Batal</CButton>
								</CCol>
								<CCol :col="3"></CCol>
							</CRow>
						</CForm>
					</div>
					<p v-show="showContentAndMessage.showMessage">{{showContentAndMessage.message}}</p>
				</CCardBody>
			</CCard>
		</CCol>
	</CRow>
</template>

<script>
	import Pemilih from "../../../model/admin/pemilih";
	import AdminService from "../../../service/admin/admin.service";
	import VotingService from "../../../service/voting.service";
	import EthereumService from "../../../service/admin/ethereum.service";

	export default {
		name: "PendaftaranPemilih",
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.userOpened = from.fullPath.includes("pemilih");
			});
		},
		data() {
			return {
				userOpened: null,
				pemilih: new Pemilih(null, null, null, null, null),
				contact: {
					email: null,
					phone: null
				},
				alamat: {
					provinsi: null,
					kota: null,
					alamat_lengkap: null
				},
				alert: {
					color: "",
					message: "",
					status: false
				},
				showContentAndMessage: {
					showContent: false,
					showMessage: false,
					message: ""
				}
			};
		},
		methods: {
			goBack() {
				this.userOpened
					? this.$router.go(-1)
					: this.$router.push({ path: "/admin/pemilih" });
			},
			submitHandle(){
				this.pemilih.contact = this.contact;
				this.pemilih.alamat = this.alamat;
				AdminService.registerPemilih(this.pemilih).then(
					response => {
						if(response.data.status == "Berhasil"){
							this.alert.color="info";
							this.alert.message=response.data.message;
							this.alert.status=true;
							setTimeout(() => this.$router.push('/admin/pemilih'), 5000);
						}else{
							this.alert.color="warning";
							this.alert.message = response.data.message;
							this.alert.status = true;
							setTimeout(() => this.$router.go(0), 5000);
						}
					},
					error => {
						this.alert.color="danger";
						this.alert.message=error.data.message;
						this.alert.status=true;
						setTimeout(() => this.$router.go(0), 5000);
					}
				)
			}
		},
		computed:{
			loggedIn(){
				return this.$store.state.auth.status.loggedIn;
			},
			checkHash(){
				return EthereumService.checkHash();
			}
		},
		mounted(){
			if(this.loggedIn){
				if(this.checkHash){
					VotingService.getRegisterStatus().then(
						response => {
							if(response.data.status == "Gagal"){
								this.showContentAndMessage.showContent = false;
								this.showContentAndMessage.showMessage = true;
								this.showContentAndMessage.message = response.data.message;
								console.log(response)
							}else{
								this.showContentAndMessage.showContent = true;
							}
						},
						error => {
							if(error.response.status == 401){
								this.showContentAndMessage.showContent=false;
								this.alert.color="danger";
								this.alert.message = "Sesi anda telah berakhir";
								this.alert.status=true;
								this.$store.dispatch("auth/removeauth");
								setTimeout(() => this.$router.push("/login/administrator"), 5000);
							}
						}
					)
				}else{
					this.$router.push("/login/user");
				}
			}
		}
	};
</script>

<style scoped>
.CButton {
	margin-right: 20px;
}
</style>