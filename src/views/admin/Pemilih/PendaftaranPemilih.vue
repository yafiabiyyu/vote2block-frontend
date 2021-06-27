<template>
    <CRow>
        <CCol md="12">
            <CCard>
                <CCardHeader>
                    Form Pendaftaran
                </CCardHeader>
                <CCardBody>
                    <CRow class="form-group">
                        <CCol :col="6">
                            <CInput type="text" label="No Identitas"/>
                        </CCol>
                        <CCol :col="6">
                            <CInput type="text" label="Nama Lengkap"/>
                        </CCol>
                    </CRow>
                    <CRow class="form-group">
                        <CCol :col="4">
                            <CInput type="text" label="No Telephone"/>
                        </CCol>
                        <CCol :col="4">
                            <CInput type="text" label="E-mail"/>
                        </CCol>
                        <CCol :col="4">
                            <CInput label="Tanggal Lahir" type="date"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol :col="12">
                            <CInput type="text" label="Alamat Lengkap"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol :col="6">
                            <CInput type="text" label="Provinsi"/>
                        </CCol>
                        <CCol :col="6">
                            <CInput type="text" label="Kota"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CButton type="submit" class="CButton" color="info">
                                Dafftar
                            </CButton>
                            <CButton type="button" @click="goBack" class="CButton" color="warning">
                                Batal
                            </CButton>
                        </CCol>
                        <CCol :col="3">
                            
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
export default {
    name:'PendaftaranPemilih',
    beforeRouteEnter(to, from , next){
        next(vm => {
            vm.userOpened = from.fullPath.includes('pemilih')
        })
    },
    data(){
        return{
            userOpened:null
        }
    },
    methods:{
        goBack(){
            this.userOpened ? this.$router.go(-1) : this.$router.push({path:'/admin/pemilih'})
        }
    }
}
</script>

<style scoped>
.CButton{
    margin-right: 20px;
}
</style>