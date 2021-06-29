<template>
	<CRow>
		<CCol col="12">
			<CCardHeader>UserID : {{$route.params.id}}</CCardHeader>
		</CCol>
	</CRow>
</template>

<script>
export default {
    name:"DetailKandidat",
    data(){
        return{
            userOpened:null
        }
    }

}
</script>

<style scoped>

</style>