<template>
	<div>
		<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
		<CRow>
			<CCol col>
				<CCard>
					<CCardHeader>
						<strong>Total Suara Sementara</strong>
					</CCardHeader>
					<CCardBody>
						<CChartPie
							style="height:350px"
							:datasets="chartData.dataset"
							:labels="chartData.label"
							:options="{ maintainAspectRatio: false }"
						/>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	</div>
</template>

<script>
	import ChartGenerator from "../../utils/chart-generator";
	import EthereumService from "../../service/pemilih/ethereum.service";
	import VotingService from "../../service/voting.service";
	export default {
		name: "QuickCount",
		data() {
			return {
				alert: {
					color: "info",
					message: "test",
					status: false
				},
				chartData:{
					dataset:null,
					label:null
				},
				kandidat:[]
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
					VotingService.qucickCount().then(
						response => {
							this.kandidat = response.data;
							const [label, dataset] = ChartGenerator.generateData(this.kandidat);
							this.chartData.label = label;
							this.chartData.dataset = dataset;
							console.log(label)
						},
						error => {
							console.log(error)
						}
					)
				}else{
					this.$router.push("/loggin/administrator")
				}
			}
		}
	};
</script>

<style>
</style>