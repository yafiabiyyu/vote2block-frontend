<template>
	<div>
		<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
		<div class="buttonRegister">
			<CButton color="primary" @click="registerButton">
				<CIcon name="cil-user-plus" />&nbsp;Pendaftaran
			</CButton>
		</div>
		<CRow>
			<CCol col="12">
				<CCard>
					<CCardHeader>Kandidat Data</CCardHeader>
					<CCardBody>
						<div v-show="showContent">
							<CDataTable
								hover
								striped
								:items="items"
								:fields="fields"
								:items-per-page="5"
								clickable-rows
								:active-page="activePage"
								@row-clicked="rowClicked"
								:pagination="{ doubleArrows: false, align:'center'}"
								@page-change="pageChange"
							></CDataTable>
						</div>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	</div>
</template>

<script>
	import kandidatData from "./KandidatDumy";
	import EthereumService from "../../../service/admin/ethereum.service";
	import AdminService from "../../../service/admin/admin.service";
	export default {
		name: "DataKandidat",
		data() {
			return {
				items: [],
				fields: [
					{ key: "id", label: "ID" },
					{ key: "nomor_urut" },
					{ key: "nama" },
					{ key: "tanggal_lahir" }
				],
				activePage: 1,
				alert: {
					color: "",
					message: "",
					status: false
				},
				showContent: true
			};
		},
		watch: {
			$route: {
				immediate: true,
				handler(route) {
					if (route.query && route.query.page) {
						this.activePage = Number(route.query.page);
					}
				}
			}
		},
		methods: {
			rowClicked(item) {
				this.$router.push({ path: `/admin/kandidat/detail/${item.id}` });
			},
			pageChange(val) {
				this.$route.push({ query: { page: val } });
			},
			registerButton: function(event) {
				this.$router.push({ path: "/admin/kandidat/pendaftaran" });
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
					AdminService.getKandidatData().then(
						response => {
							this.items = response.data;
						},
						error => {
							if (error.response.status == 401) {
								this.showContent =false;
								this.alert.color = "warning";
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

<style>
.buttonRegister {
	margin-bottom: 15px;
}
</style>