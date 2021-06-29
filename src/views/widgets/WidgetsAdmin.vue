<template>
	<div>
		<CContainer class="px-md-5">
			<CRow class="mx-md-n5">
				<CCol sm="6" md="4" class="py-3 px-lg-5">
					<CWidgetProgressIcon header="11" text="Pemilih" color="gradient-success" inverse>
						<CIcon name="cil-people" height="36" />
					</CWidgetProgressIcon>
				</CCol>
				<CCol sm="6" md="4" class="py-3 px-lg-5">
					<CWidgetProgressIcon header="2" text="Kandidat" color="gradient-info" inverse>
						<CIcon name="cil-people" height="36" />
					</CWidgetProgressIcon>
				</CCol>
				<CCol sm="6" md="4" class="py-3 px-lg-5">
					<CWidgetProgressIcon header="10" text="Ethereum Balance" color="gradient-danger" inverse>
						<CIcon name="cib-ethereum" height="36" />
					</CWidgetProgressIcon>
				</CCol>
			</CRow>
		</CContainer>
	</div>
</template>

<script>
	export default {
		name: "WidgetsAdmin"
	};
</script>

<style>
</style>