<template>
	<div>
		<CRow>
			<CCol md="12">
				<!-- content -->
				<WidgetsAdmin/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
	import WidgetsAdmin from '../widgets/WidgetsAdmin';	


	export default {
		name: "Dashboard",
		components: {
			WidgetsAdmin
        },
		data() {
			return {};
		},
		methods: {}
	};
</script>
