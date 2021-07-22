<template>
	<CRow alignHorizontal="center">
		<CCol lg="12">
			<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
			<CCard>
				<CCardHeader>Pengaturan Tanggal & Waktu</CCardHeader>
				<CCardBody>
					<div v-show="showContent">
						<CForm @submit.stop.prevent="saveWaktu">
							<CRow>
								<CCol :col="6">
									<VueCtkDateTimePicker
										class="dateInput"
										no-header
										label="Tanggal & Waktu Pendaftaran Dimulai"
										v-model="waktu.registerstart"
										input-size="sm"
										no-button-now
										time-zone="id"
										locale="id"
										formatted="lll"
										format="YYYY-MM-DD HH:mm"
										overlay
									/>
								</CCol>
								<CCol :col="6">
									<VueCtkDateTimePicker
										class="dateInput"
										no-header
										label="Tanggal & Waktu Pendaftaran Berakhir"
										v-model="waktu.registerfinis"
										input-size="sm"
										no-button-now
										time-zone="id"
										locale="id"
										formatted="lll"
										format="YYYY-MM-DD HH:mm"
										overlay
									/>
								</CCol>
							</CRow>
							<CRow>
								<CCol :col="6">
									<VueCtkDateTimePicker
										class="dateInput"
										no-header
										label="Tanggal & Waktu Pemilihan Dimulai"
										v-model="waktu.votingstart"
										input-size="sm"
										no-button-now
										time-zone="id"
										locale="id"
										formatted="lll"
										format="YYYY-MM-DD HH:mm"
										overlay
									/>
								</CCol>
								<CCol :col="6">
									<VueCtkDateTimePicker
										class="dateInput"
										no-header
										label="Tanggal & Waktu Pemilihan Berakhir"
										v-model="waktu.votingfinis"
										input-size="sm"
										no-button-now
										time-zone="id"
										locale="id"
										formatted="lll"
										format="YYYY-MM-DD HH:mm"
										overlay
									/>
								</CCol>
							</CRow>
							<CRow>
								<CCol>
									<CButton type="submit" class="CButton" color="info">Simpan</CButton>
									<CButton type="button" @click="goBack" class="CButton" color="warning">Batal</CButton>
								</CCol>
							</CRow>
						</CForm>
					</div>
					<p :show="showMessage.status">{{showMessage.message}}</p>
				</CCardBody>
			</CCard>
		</CCol>
	</CRow>
</template>

<script>
	import AdminService from "../../service/admin/admin.service";
	import EthereumService from "../../service/admin/ethereum.service";
	import VotingService from "../../service/voting.service";
	import Waktu from "../../model/admin/waktu";
	export default {
		name: "VotingTime",
		data() {
			return {
				alert: {
					color: "",
					message: "",
					status: false
				},
				waktu: new Waktu(null, null, null, null),
				showContent: false,
				showMessage: {
					message:"",
					status:false
				}
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
			goBack() {
				this.userOpened
					? this.$router.go(-1)
					: this.$router.push({ path: "/admin" });
			},
			saveWaktu() {
				AdminService.setupWaktu(this.waktu).then(
					response => {
						if (response.data.status == "Berhasil") {
							this.alert.color = "info";
							this.alert.message = response.data.message;
							this.alert.status = true;
							setTimeout(() => this.$router.push('/admin'), 5000);
						} else {
							this.alert.color = "warning";
							this.alert.message = response.data.message;
							this.alert.status = true;
							setTimeout(() => this.$router.go(0), 5000);
						}
					},
					error => {
						this.alert.color = "danger";
						this.alert.message = error.data.message;
						this.alert.status = true;
						setTimeout(() => this.$router.go(0), 5000);
					}
				);
			}
		},
		mounted() {
			if (this.loggedIn) {
				if (this.checkHash) {
					VotingService.getStatusWaktu().then(
						response => {
							if (response.data.status == "Gagal") {
								this.showContent = false;
								this.showMessage.message = response.data.message;
								this.showMessage.status=true;
								setTimeout(() => this.$router.push("/admin"), 5000);
							}else{
								this.showContent = true;
							}
						},
						error => {
							if (error.response.status == 401) {
								this.showContent = false;
								this.alert.color = "danger";
								this.alert.message = "Sesi anda telah berakhir";
								this.alert.status = true;
								this.$store.dispatch("auth/removeauth");
								setTimeout(() => this.$router.push("/login/administrator"), 5000);
							}
						}
					);
				}else {
					this.$router.push("/login/user");
				}
			}
		}
	};
</script>

<style scoped>
.dateInput {
	margin-bottom: 25px;
	margin-top: -10px;
}

.CButton {
	margin-right: 20px;
}
</style>