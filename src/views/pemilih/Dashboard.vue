<template>
	<div>
		<CRow>
			<CCol col>
				<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
				<CCard bodyWrapper v-show="messageCard.status">
					<CCardText>{{messageCard.message}}</CCardText>
				</CCard>
				<CCard bodyWrapper v-show="transactionCard.status">
					<CCardText>
						{{transactionCard.message}}, dapat dilihat pada halaman
						<CLink href="transactionCard.tx_hash" target="_blank">Etherscan Ropsten</CLink>
					</CCardText>
				</CCard>
			</CCol>
		</CRow>
		<div v-show="kandidatCard.kandidatList">
			<CRow>
				<CCol col v-for="kandidats in kandidat" :key="kandidats.nomor_urut">
					<CCard>
						<CImg
							:height="250"
							:width="250"
							align="center"
							:src="kandidats.image_url"
							style="margin-top='10px'"
						/>
						<CCardBody>
							<CCardTitle>
								<strong>No {{ kandidats.nomor_urut }} - {{kandidats.nama}}</strong>
							</CCardTitle>

							<CCardSubtitle>
								<strong>Visi</strong>
							</CCardSubtitle>
							<CCardText>{{kandidats.visi}}</CCardText>
							<CCardSubtitle>
								<strong>Misi</strong>
							</CCardSubtitle>
							<CCardText>{{kandidats.misi}}</CCardText>
							<CForm @submit.prevent="handleVoting(kandidats.nomor_urut)">
								<CButton type="submit" color="info">Pilih</CButton>
							</CForm>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</div>
		<div v-show="kandidatCard.kandidatSingle">
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
							:src="kandidatTerpilih.image_url"
							style="margin-top='10px'"
						/>
						<CCardBody>
							<CCardTitle>
								<strong>No {{ kandidatTerpilih.nomor_urut }} - {{kandidatTerpilih.nama}}</strong>
							</CCardTitle>
							<CCardSubtitle>
								<strong>Visi</strong>
							</CCardSubtitle>
							<CCardText>{{kandidatTerpilih.visi}}</CCardText>
							<CCardSubtitle>
								<strong>Misi</strong>
							</CCardSubtitle>
							<CCardText>{{kandidatTerpilih.misi}}</CCardText>
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
		name: "Dashboard",
		data() {
			return {
				kandidat: [], // Untuk menyimpan seluruh data kandidat
				kandidatTerpilih: {
					nomor_urut: null,
					nama: "",
					visi: "",
					misi: "",
					image_url: "https://i.ibb.co/6PjSWCr/hourglass.png"
				}, //Data kandidat yang di pilih oleh user
				alert: {
					color: "",
					message: "",
					status: false
				},
				kandidatCard: {
					kandidatList: false,
					kandidatSingle: false
				},
				messageCard: {
					status: false,
					message: ""
				},
				transactionCard:{
					status:false,
					message:"",
					tx_hash:""
				}
			};
		},
		computed: {
			loggedIn() {
				return this.$store.state.auth.status.loggedIn;
			},
			checkHash() {
				return EthereumService.checkHash();
			},
			checkVote() {
				console.log(this.$store.state.vote.status.voted);
				return this.$store.state.vote.status.voted;
			}
		},
		methods: {
			handleVoting(id) {
				VotingService.getVotingStatus().then(response => {
					if (response.data.status == "Berhasil") {
						VotingService.voting(id).then(
							response => {
								this.alert.message = response.data.message;
								this.alert.color = "info";
								this.alert.status = true;
								this.$store.dispatch("vote/voted");
								setTimeout(() => this.$router.go(0), 5000);
							},
							error => {
								this.alert.message = error.response.message;
								this.alert.color = "warning";
								this.alert.status = true;
								setTimeout(() => this.$router.go(0), 5000);
							}
						);
					} else {
						this.alert.message = response.data.message;
						this.alert.color = "warning";
						this.alert.status = true;
						this.showContent.kandidatList = false;
						setTimeout(() => this.$router.go(0), 5000);
					}
				});
			},
			getKandidatDipilih(){
				VotingService.getKandidatDipilih().then(
					response => {
						if(response.data.status == "Gagal"){
							this.transactionCard.status = true;
							this.transactionCard.message = response.data.message;
							this.transactionCard.tx_hash = response.data.tx_hash;
							console.log(this.transactionCard.tx_hash)
						}else{
							this.alert.color="info";
							this.alert.message="Berikut ini adalah kandidat yang anda pilih";
							this.alert.status = true;
							this.kandidatTerpilih.nomor_urut = response.data.data.nomor_urut;
							this.kandidatTerpilih.nama = response.data.data.nama;
							this.kandidatTerpilih.visi = response.data.data.visi;
							this.kandidatTerpilih.misi = response.data.data.misi;
							this.kandidatTerpilih.image_url = response.data.data.image_url;
							this.kandidatCard.kandidatSingle = true;
						}
					},
					error => {
						if (error.response.status == 401) {
							this.alert.color = "danger";
							this.alert.message = "Sesi anda telah berakhir";
							this.alert.status = true;
							setTimeout(() => this.$router.push("/"), 5000);
						}
					}
				)
			}
		},
		mounted() {
			if (this.loggedIn) {
				if (this.checkHash) {
					if (!this.checkVote) {
						// Melakukan pemeriksaan kembali pada smart-contract
						VotingService.checkHakPilih().then(
							hakResponse => {
								if (hakResponse.data.status == "Berhasil") {
									VotingService.getVotingStatus().then(
										votingStatusResponse => {
											if (votingStatusResponse.data.status == "Berhasil") {
												VotingService.getKandidatData().then(
													kandidatResponse => {
														this.kandidat = kandidatResponse.data;
														this.kandidatCard.kandidatList = true;
													},
													kandidatError => {
														console.log(kandidatError);
													}
												);
											} else {
												this.messageCard.status = true;
												this.messageCard.message =
													votingStatusResponse.data.message;
											}
										},
										votingStatusError => {
											console.log(votingStatusError.response.message);
										}
									);
								} else {
									this.getKandidatDipilih();
								}
							},
							hakError => {
								// handle jika terdapat error pada request chek hakPilih
								if (hakError.response.status == 401) {
									this.alert.color = "danger";
									this.alert.message = "Sesi anda telah berakhir";
									this.alert.status = true;
									setTimeout(() => this.$router.push("/"), 5000);
								}
							}
						);
					} else {
						this.getKandidatDipilih();
					}
				} else {
					this.$router.push("/login/administrator");
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
img {
	margin-top: 20px;
}
</style>