<template>
	<div>
		<div class="buttonRegister">
			<CButton color="primary" @click="registerButton">
				<CIcon name="cil-user-plus"/>&nbsp;Pendaftaran
			</CButton>
		</div>
		<CRow>
			<CCol col="12">
				<CCard>
					<CCardHeader>Kandidat Data</CCardHeader>
					<CCardBody>
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
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	</div>
</template>

<script>
	import kandidatData from './KandidatDumy'
	export default {
		name: "DataKandidat",
		data() {
			return {
				items: kandidatData,
				fields: [
					{ key: "id", label: "ID" },
					{ key: "nomor_urut" },
					{ key: "nama"},
					{ key: "tanggal_lahir" }
				],
				activePage: 1
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
			registerButton:function(event){
				this.$router.push({path:'/admin/kandidat/pendaftaran'});
			}
		}
	};
</script>

<style>
.buttonRegister {
	margin-bottom: 15px;
}
</style>