<template>
	<div>
		<CRow>
			<CCol col>
				<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
				<CCard bodyWrapper v-show="messageCard.status">
					<CCardText>{{messageCard.message}}</CCardText>
				</CCard>
			</CCol>
		</CRow>
        <div v-show="kandidatCard">
			<CRow alignHorizontal="center">
				<CCol col>
					<CCard>
						<!-- <CCardImg
							:src="kandidats.image_url"
							:width="50"
							:align="center"
							:height="50"
							:variant="imageSetting.variant"
						/>-->
						<CImg
							:height="250"
							:width="250"
							align="center"
							:src="pemenang.image_url"
							style="margin-top='10px'"
						/>
						<CCardBody>
							<CCardTitle>
								<strong>No {{ pemenang.nomor_urut }} - {{pemenang.nama}}</strong>
							</CCardTitle>
							<CCardSubtitle>
								<strong>Visi</strong>
							</CCardSubtitle>
							<CCardText>{{pemenang.visi}}</CCardText>
							<CCardSubtitle>
								<strong>Misi</strong>
							</CCardSubtitle>
							<CCardText>{{pemenang.misi}}</CCardText>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</div>
	</div>
</template>

<script>
    import EthereumService from "../../service/pemilih/ethereum.service";
    import VotingService from "../../service/voting.service";
	export default {
		name: "HasilPemilihan",
		data() {
			return {
				alert: {
					color: "",
					message: "",
					status: false
				},
				messageCard: {
					status: false,
					message: ""
				},
                pemenang:{
                    nomor_urut: null,
					nama: "",
					visi: "",
					misi: "",
					image_url: "https://i.ibb.co/6PjSWCr/hourglass.png"
                },
                kandidatCard:false
			};
		},
		computed:{
			loggedIn(){
				return this.$store.state.auth.status.loggedIn;
			},
			checkHash(){
				return EthereumService.checkHash();
			}
		},
		mounted(){
			if(this.loggedIn){
				if(this.checkHash){
					VotingService.hasilPemilihan().then(
						response => {
							if(response.data.status == "Berhasil"){
								console.log(response.data.data)
								this.pemenang.nomor_urut = response.data.data.nomor_urut;
								this.pemenang.nama = response.data.data.nama;
								this.pemenang.visi = response.data.data.visi;
								this.pemenang.misi = response.data.data.misi;
								this.pemenang.image_url = response.data.data.image_url;
								this.kandidatCard = true;
								this.messageCard.status = true;
								this.messageCard.message = response.data.message;
							}else{
								this.alert.color = "warning";
								this.alert.message = response.data.message;
								this.alert.status = true;
							}
						},
						error => {
							console.log(error.response.data)
						}
					)
				}
			}
		}
	};
</script>

<style>
img {
	margin-top: 20px;
}
</style>