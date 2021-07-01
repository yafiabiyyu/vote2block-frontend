<template>
	<div>
		<CRow>
			<CCol md="12">
				<!-- content -->
				<CAlert color="danger" :show.sync="showAllert.alert">{{showAllert.alertmessage}}</CAlert>
				<WidgetsAdmin
					:totalPemilih="totalPemilih"
					:totalKandidat="totalKandidat"
					:ethereumBalance="ethereumBalance"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
	import WidgetsAdmin from "../widgets/WidgetsAdmin";
	import EthereumService from "../../service/admin/ethereum.service";

	export default {
		name: "Dashboard",
		components: {
			WidgetsAdmin
		},
		data() {
			return {
				totalPemilih: "",
				totalKandidat: "",
				ethereumBalance: "",
				showAllert: {
					alert: false,
					alertmessage: ""
				}
			};
		},
		computed:{
			loggedIn() {
				return this.$store.state.auth.status.loggedIn;
			},
			VerifyUser(){
				return EthereumService.verifyUser(this.$store.state.auth.user.data.access_token);
			}
		},
		methods: {
			handleLogout() {
				this.$store.dispatch("auth/logout");
				setTimeout(() => this.$router.push("/"), 6000);
			},
			getDashboardData() {
				AdminService.getAdminBoard().then(
					response => {
						this.totalPemilih = response.data.data.total_pemilih.toString();
						this.totalKandidat = response.data.data.total_kandidat.toString();
						this.ethereumBalance = response.data.data.ethereum_balance.toString();
					},
					error => {
						if (error.response.status == 401) {
							this.showAllert.alert = true;
							this.showAllert.alertmessage =
								"Sesi anda telah berakhir, harap login kembali";
							this.$store.dispatch("auth/removeAuth");
							setTimeout(() => this.$router.push("/"), 7000);
						}
					}
				);
			}
		},
		mounted() {
			if(this.loggedIn && this.VerifyUser){
				this.getAdminBoard();
			}else{
				setTimeout(() => this.$router.push('/'),7000);
			}
		}
	};
</script>
