<template>
	<CRow>
		<CCol col="12">
			<CCardHeader>UserID : {{$route.params.id}}</CCardHeader>
		</CCol>
	</CRow>
</template>

<script>
    import pemilihData from "./PemilihDumy";
    export default {
        name:'DetailPemilih',
        data(){
            return{
                userOpened:null
            }
        },
        computed:{
            fields(){
                return[
                    {key:'key', label:this.id,},
                    {key:'value', label:''}
                ]
            }
        }

    }
</script>

<style>
</style>