<template>
	<CRow alignHorizontal="center">
		<CCol lg="12">
			<CCard>
				<CCardHeader>Form Pendaftaran</CCardHeader>
				<CCardBody>
					<CRow>
						<CCol>
							<CInput type="text" label="No Identitas" />
						</CCol>
					</CRow>
					<CRow>
						<CCol :col="6">
							<CInput type="text" label="Nama Lengkap" />
						</CCol>
                        <CCol :col="6">
							<CInput type="date" label="Tanggal Lahir" />
						</CCol>
					</CRow>
					<CRow>
						<CCol :col="6">
							<CInput type="text" label="No Telephone" />
						</CCol>
						<CCol :col="6">
							<CInput type="text" label="E-mail" />
						</CCol>
					</CRow>
                    <CRow>
						<CCol :col="6">
							<CInput type="text" label="Provinsi" />
						</CCol>
						<CCol :col="6">
							<CInput type="text" label="Kota" />
						</CCol>
					</CRow>
                    <CRow>
                        <CCol>
                            <CInput type="text" label="Alamat Lengkap"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol :col="6">
                            <CTextarea label="Visi" rows="6"/>
                        </CCol>
                        <CCol :col="6">
                            <CTextarea label="Misi" rows="6"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol :col="6">
                            <CInput type="file" label="Foto Kandidat"/>
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
		name: "PendaftaranKandidat",
        beforeRouterEnter(to, from, next) {
            next(vm => {
                vm.userOpened = from.fullPath.includes('kandidat')
            })
        },
        data(){
            return{
                userOpened:null
            }
        },
        methods:{
            goBack(){
                this.userOpened? this.$router.go(-1) : this.$router.push({path:'/admin/kandidat'})
            }
        }
	};
</script>

<style scoped>
.CButton{
    margin-right: 20px;
}
</style>