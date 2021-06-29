<template>
	<CRow alignHorizontal="center">
		<CCol lg="12">
			<CCard>
				<CCardHeader>Pengaturan Tanggal & Waktu</CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol :col="6">
                            <VueCtkDateTimePicker
                            class="dateInput"
                            no-header
                            label="Tanggal & Waktu Pendaftaran Dimulai"
                            v-model="timeSetting.registerstart"
                            input-size="sm"
                            no-button-now
                            time-zone="id"
                            locale="id"
                            formatted="lll"
                            format="YYYY-MM-DD HH:mm"
                            overlay
                            />
                        </CCol>
                        <CCol :col="6">
                            <VueCtkDateTimePicker
                            class="dateInput"
                            no-header
                            label="Tanggal & Waktu Pendaftaran Berakhir"
                            v-model="timeSetting.registerfinis"
                            input-size="sm"
                            no-button-now
                            time-zone="id"
                            locale="id"
                            formatted="lll"
                            format="YYYY-MM-DD HH:mm"
                            overlay
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol :col="6">
                            <VueCtkDateTimePicker
                            class="dateInput"
                            no-header
                            label="Tanggal & Waktu Pemilihan Dimulai"
                            v-model="timeSetting.votingstart"
                            input-size="sm"
                            no-button-now
                            time-zone="id"
                            locale="id"
                            formatted="lll"
                            format="YYYY-MM-DD HH:mm"
                            overlay
                            />
                        </CCol>
                        <CCol :col="6">
                            <VueCtkDateTimePicker
                            class="dateInput"
                            no-header
                            label="Tanggal & Waktu Pemilihan Berakhir"
                            v-model="timeSetting.votingfinis"
                            input-size="sm"
                            no-button-now
                            time-zone="id"
                            locale="id"
                            formatted="lll"
                            format="YYYY-MM-DD HH:mm"
                            overlay
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CButton type="submit" class="CButton" color="info">
                                Simpan
                            </CButton>
                            <CButton type="button" @click="goBack" class="CButton" color="warning">
                                Batal
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
			</CCard>
		</CCol>
	</CRow>
</template>

<script>
	export default {
		name: "VotingTime",
		data() {
			return {
				timeSetting: {
					registerstart: null,
					registerfinis: null,
					votingstart: null,
					votingfinis: null
				}
			};
		},
        methods:{
            goBack(){
                this.userOpened? this.$router.go(-1) : this.$router.push({path:'/admin'})
            }
        }
	};
</script>

<style scoped>
.dateInput {
	margin-bottom: 25px;
    margin-top: -10px;
}

.CButton{
    margin-right: 20px;
}
</style>