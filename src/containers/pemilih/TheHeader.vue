<template>
	<CHeader fixed with-subheader light>
		<CToggler in-header class="ml-3 d-lg-none" @click="$store.commit('toggleSidebarMobile')" />
		<CToggler in-header class="ml-3 d-md-down-none" @click="$store.commit('toggleSidebarDesktop')" />
		<CHeaderBrand class="mx-auto d-lg-none" to="/admin">
			<CIcon name="logo" height="48" alt="Logo" />
		</CHeaderBrand>
		<CHeaderNav class="ml-auto">
			<TheHeaderDropdownAccnt />
		</CHeaderNav>
		<CSubheader class="px-3">
			
		</CSubheader>
	</CHeader>
</template>

<script>
	import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";

	export default {
		name: "TheHeader",
		components: {
			TheHeaderDropdownAccnt
		}
	};
</script>
