<template>
	<div>
		<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
		<div class="buttonRegister">
			<CButton color="info" @click="registerButton">
				<CIcon name="cil-user-plus" />&nbsp;Pendaftaran
			</CButton>
		</div>
		<CRow>
			<CCol col="12">
				<CCard>
					<CCardHeader>Pemilih Data</CCardHeader>
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
	import pemilihData from "./PemilihDumy";
	import AdminService from "../../../service/admin/admin.service";
	import EthereumService from "../../../service/admin/ethereum.service";
	export default {
		name: "DataPemilih",
		data() {
			return {
				items: [],
				fields: [
					{ key: "id", label: "ID" },
					{ key: "nama_lengkap" },
					{ key: "tanggal_lahir" }
				],
				activePage: 1,
				showContent: true,
				alert: {
					color: "",
					message: "",
					status: false
				}
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
				this.$router.push({ path: `/admin/pemilih/detail/${item.id}` });
			},
			pageChange(val) {
				this.$route.push({ query: { page: val } });
			},
			registerButton: function(event) {
				this.$router.push({ path: "/admin/pemilih/daftar" });
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
					AdminService.getPemilihData().then(
						response => {
							this.items = response.data;
						},
						error => {
							if(error.response.status == 401){
								this.showContent = false;
								this.alert.color = "warning";
								this.alert.message = "Sesi anda telah berakhir";
								this.alert.status = true;
								this.$store.dispatch("auth/removeauth");
								setTimeout(() => this.$router.push("/login/administrator"),4000);
							}else {
								this.showContent = false;
								this.alert.color="danger";
								this.alert.message="Terjadi kesalahan internal server";
								this.alert.status=true;
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

<style>
.buttonRegister {
	margin-bottom: 15px;
}
</style>