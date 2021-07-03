<template>
	<div>
		<CRow>
			<CCol md="12">
				<!-- content -->
				<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
				<WidgetsAdmin
					:totalPemilih="widgetsData.totalPemilih"
					:totalKandidat="widgetsData.totalKandidat"
					:ethereumBalance="widgetsData.ethereumBalance"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
	import WidgetsAdmin from "../widgets/WidgetsAdmin";
	import EthereumService from "../../service/admin/ethereum.service";
	import AdminService from "../../service/admin/admin.service";

	export default {
		name: "Dashboard",
		components: {
			WidgetsAdmin
		},
		data() {
			return {
				widgetsData: {
					totalPemilih: "Memuat...",
					totalKandidat: "Memuat...",
					ethereumBalance: "Memuat..."
				},
				alert: {
					color: "",
					message: "",
					status: false
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
		mounted() {
			if (this.loggedIn) {
				if (this.checkHash) {
					AdminService.getAdminBoard().then(
						response => {
							this.widgetsData.totalPemilih = response.data.data.total_pemilih.toString();
							this.widgetsData.totalKandidat = response.data.data.total_kandidat.toString();
							this.widgetsData.ethereumBalance = response.data.data.ethereum_balance.toString();
						},
						error => {
							if (error.response.status == 401) {
								this.alert.color = "warning";
								this.alert.message = "Sesi anda telah berakhir";
								this.alert.status = true;
								this.$store.dispatch("auth/removeauth");
								setTimeout(() => this.$router.push("/login/administrator"), 5000);
							}
						}
					);
				} else {
					this.alert.color = "danger";
					this.alert.message = "Anda tidak memiliki akses";
					this.alert.status = true;
				}
			}
		}
	};
</script>
