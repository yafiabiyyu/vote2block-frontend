<template>
	<CRow>
		<CCol md="12">
			<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
			<CCard>
				<CCardHeader>Ganti Password</CCardHeader>
				<CCardBody v-show="showContent">
					<div>
						<CForm @submit.prevent="updatePass">
							<CRow>
								<CCol :col="6">
									<CInput v-model="passData.oldPassword" type="text" label="Password Lama" />
								</CCol>
								<CCol :col="6">
									<CInput v-model="passData.newPassword" type="text" label="Password Baru" />
								</CCol>
							</CRow>
							<CRow>
								<CCol>
									<CButton type="submit" class="CButton" color="info">Ganti</CButton>
								</CCol>
								<CCol :col="3"></CCol>
							</CRow>
						</CForm>
					</div>
				</CCardBody>
			</CCard>
		</CCol>
	</CRow>
</template>

<script>
	import EthereumService from "../../service/pemilih/ethereum.service";
	import PemilihService from "../../service/pemilih/pemilih.service";

	export default {
		name: "UpdatePassword",
		data() {
			return {
				alert: {
					color: "",
					message: "",
					status: false
				},
				passData: {
					oldPassword: "",
					newPassword: ""
				},
				showContent: false
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
		methods: {
			updatePass() {
				PemilihService.updatePassword(
					this.passData.oldPassword,
					this.passData.newPassword
				).then(
					response => {
						if (response.data.status == "Berhasil") {
							this.alert.color = "info";
							this.alert.message = response.data.message;
							this.alert.status = true;
							setTimeout(() => this.$router.push("/pemilih"), 5000);
						} else {
							this.alert.color = "warning";
							this.alert.message = response.data.message;
							this.alert.status = true;
							setTimeout(() => this.$router.go(0), 5000);
						}
					},
					error => {
						if (error.response.status == 401) {
							this.alert.color = "danger";
							this.alert.message = "Sesi anda telah berakhir, Silahkan coba lagi";
							this.alert.status = true;
							this.$store.dispatch("auth/removeauth");
							setTimeout(() => this.$router.push("/"),5000);
						}
					}
				);
			}
		},
		mounted() {
			if (this.loggedIn) {
				if (this.checkHash) {
					this.showContent = true;
				} else {
					this.$router.push("/login/administrator");
				}
			}
		}
	};
</script>

<style>
</style>