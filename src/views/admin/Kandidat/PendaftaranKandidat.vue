<template>
	<CRow alignHorizontal="center">
		<CCol lg="12">
			<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
			<CCard>
				<CCardHeader>Form Pendaftaran</CCardHeader>
				<CCardBody>
					<div v-show="showContentAndMessage.showContent">
						<CForm @submit.prevent="submitHandle">
							<CRow>
								<CCol :col="6">
									<CInput type="text" v-model="kandidat.kandidat_id" label="No Identitas" />
								</CCol>
								<CCol :col="6">
									<CInput type="number" v-model="kandidat.nomor_urut" label="No Urut" />
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="6">
									<CInput type="text" v-model="kandidat.nama_kandidat" label="Nama Lengkap" />
								</CCol>
								<CCol :col="6">
									<CInput type="date" v-model="kandidat.tanggal_lahir" label="Tanggal Lahir" />
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="6">
									<CInput type="text" v-model="contact.phone" label="No Telephone" />
								</CCol>
								<CCol :col="6">
									<CInput type="text" v-model="contact.email" label="E-mail" />
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="6">
									<CInput type="text" v-model="alamat.provinsi" label="Provinsi" />
								</CCol>
								<CCol :col="6">
									<CInput type="text" v-model="alamat.kota" label="Kota" />
								</CCol>
							</CRow>
							<CRow>
								<CCol>
									<CInput type="text" v-model="alamat.alamat_lengkap" label="Alamat Lengkap" />
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="6">
									<CTextarea v-model="kandidat.visi" label="Visi" rows="6" />
								</CCol>
								<CCol :col="6">
									<CTextarea v-model="kandidat.misi" label="Misi" rows="6" />
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="6">
									<div class="orm-group position-relative">
										<label for="foto">Foto Kandidat</label>
										<input type="file" id="foto" @change="fileHandle" class="form-control-file" />
									</div>
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
	import Kandidat from "../../../model/admin/kandidat";
	import AdminService from "../../../service/admin/admin.service";
	import EthereumService from "../../../service/admin/ethereum.service";
	import VotingService from "../../../service/voting.service";
	export default {
		name: "PendaftaranKandidat",
		beforeRouterEnter(to, from, next) {
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
				showContentAndMessage: {
					showContent: false,
					showMessage: false,
					message: ""
				},
				kandidat: new Kandidat(null, 0, null, null, null, null, null, null, null),
				contact: {
					email: null,
					phone: null
				},
				alamat: {
					provinsi: null,
					kota: null,
					alamat_lengkap: null
				},
				imageData: null
			};
		},
		methods: {
			goBack() {
				this.userOpened
					? this.$router.go(-1)
					: this.$router.push({ path: "/admin/kandidat" });
			},
			fileHandle(e) {
				const reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = e => {
					this.imageData = e.target.result.split(",").pop();
				};
			},
			submitHandle() {
				AdminService.imageBB(this.imageData).then(
					response => {
						console.log(response);
						if (response.data.success == true) {
							this.kandidat.image_url = response.data.data.url;
							this.kandidat.contact = this.contact;
							this.kandidat.alamat = this.alamat;
							AdminService.registerKandidat(this.kandidat).then(
								register_response => {
									if(register_response.data.status == "Berhasil"){
										this.alert.color="info";
										this.alert.message = register_response.data.message;
										this.alert.status = true;
										setTimeout(() => this.$router.push('/admin/kandidat'), 5000);
									}else{
										this.alert.color="warning";
										this.alert.message=register_response.data.message;
										this.alert.status=true;
										setTimeout(() => this.$router.go(0), 5000);
									}
								},
								register_error => {
									this.alert.color="danger";
									this.alert.message=register_error.data.message;
									this.alert.status=true;
									setTimeout(() => this.$router.go(0), 5000)
								}
							);
						}
					},
					error => {
						console.log(error.response);
					}
				);
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
					VotingService.getRegisterStatus().then(
						response => {
							if (response.data.status == "Gagal") {
								this.showContentAndMessage.showContent = false;
								this.showContentAndMessage.showMessage = true;
								this.showContentAndMessage.message = response.data.message;
							}else{
								this.showContentAndMessage.showContent = true;
							}
						},
						error => {
							if (error.response.status == 401) {
								this.showContentAndMessage.showContent = false;
								this.alert.color = "danger";
								this.alert.message = "Sesi anda telah berakhir";
								this.alert.status = true;
								this.$store.dispatch("auth/removeauth");
								setTimeout(() => this.$router.push("/login/administrator"), 5000);
							}
						}
					);
				} else {
					this.$router.push("/login/user");
				}
			}
		}
	};
</script>

<style scoped>
.CButton {
	margin-right: 20px;
	margin-top: 20px;
}
</style>