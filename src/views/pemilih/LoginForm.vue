<template>
	<div class="c-app flex-row align-items-center">
		<CContainer>
			<CRow class="justify-content-center">
				<CCol md="8">
					<CAlert :show="alert.status" :color="alert.color" closeButton>{{alert.message}}</CAlert>
					<CCardGroup>
						<CCard class="p-4">
							<CCardBody>
								<CForm @submit.stop.prevent="handleLogin">
									<h1>Pemilih Login</h1>
									<CInput
										placeholder="Username"
										v-model="user.username"
										required
										autocomplete="username email"
										was-validated
									>
										<template #prepend-content>
											<CIcon name="cil-user" />
										</template>
									</CInput>
									<CInput
										placeholder="Password"
										type="password"
										required
										v-model="user.password"
										autocomplete="curent-password"
										was-validated
									>
										<template #prepend-content>
											<CIcon name="cil-lock-locked" />
										</template>
									</CInput>
									<CRow>
										<CCol col="6" class="text-left">
											<CButton type="submit" color="primary" class="px-4">Login</CButton>
										</CCol>
									</CRow>
								</CForm>
							</CCardBody>
						</CCard>
						<CCard
							color="primary"
							text-color="white"
							class="text-center py-5 d-md-down-none"
							body-wrapper
						>
							<CCardBody>
								<h2>Vote2Block</h2>
								<p
									style="text-align='center'"
								>Voting Sistem Menggunakan <br/>Smart-Contract</p>
							</CCardBody>
						</CCard>
					</CCardGroup>
				</CCol>
			</CRow>
		</CContainer>
	</div>
</template>

<script>
	import User from "../../model/user";
	import EthereumService from "../../service/pemilih/ethereum.service";
	export default {
		name: "Login",
		data() {
			return {
				user: new User("", ""),
				alert: {
					color: "",
					message: "",
					status: false
				}
			};
		},
		computed: {
			loggedIn() {
				return this.$store.state.auth.status.loggedIn;
			},
			checkHash() {
				return EthereumService.checkHash();
			}
		},
		created() {
			if (this.loggedIn) {
				if (this.checkHash) {
					setTimeout(() => this.router.push("/pemilih"), 2000);
				} else {
					setTimeout(() => this.$router.push("/login/administrator"), 2000);
				}
			}
		},
		methods: {
			handleLogin() {
				this.$store.dispatch("auth/loginPemilih", this.user).then(
					response => {
						if (response.status == "Gagal") {
							this.alert.color = "warning";
							this.alert.message = response.message;
							this.alert.status = true;
							setTimeout(() => this.$router.go(0), 3000);
						} else {
							this.alert.color = "info";
							this.alert.message = response.message;
							this.alert.status = true;
							setTimeout(() => this.$router.push("/pemilih"), 3000);
						}
					},
					error => {
						this.alert.color = "danger";
						this.alert.message = error.response.data.message;
						this.alert.status = true;
						setTimeout(() => this.$router.go(0), 3000);
					}
				);
			}
		}
	};
</script>
