<template>
	<div>
		<CContainer class="px-md-5">
			<CRow class="mx-md-n5">
				<CCol sm="6" md="4" class="py-3 px-lg-5">
					<CWidgetProgressIcon :header="totalPemilih" text="Pemilih" color="gradient-success" inverse>
						<CIcon name="cil-people" height="36" />
					</CWidgetProgressIcon>
				</CCol>
				<CCol sm="6" md="4" class="py-3 px-lg-5">
					<CWidgetProgressIcon :header="totalKandidat" text="Kandidat" color="gradient-info" inverse>
						<CIcon name="cil-people" height="36" />
					</CWidgetProgressIcon>
				</CCol>
				<CCol sm="6" md="4" class="py-3 px-lg-5">
					<CWidgetProgressIcon :header="ethereumBalance" text="Ethereum Balance" color="gradient-danger" inverse>
						<CIcon name="cib-ethereum" height="36" />
					</CWidgetProgressIcon>
				</CCol>
			</CRow>
		</CContainer>
	</div>
</template>

<script>
	export default {
		name: "WidgetsAdmin",
		props:{
			totalPemilih:{
				type:String,
				default:"0"
			},
			totalKandidat:{
				type:String,
				default:"0"
			},
			ethereumBalance:{
				type:String,
				default:"0"
			}
		}
	};
</script>

<style>
</style>