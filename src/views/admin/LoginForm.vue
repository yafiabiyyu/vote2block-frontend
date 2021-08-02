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
									<h1>Admin Login</h1>
									<CInput
										placeholder="Username"
										v-model="user.username"
										autocomplete="username email"
										required
										was-validated
									>
										<template #prepend-content>
											<CIcon name="cil-user" />
										</template>
									</CInput>
									<CInput
										placeholder="Password"
										v-model="user.password"
										type="password"
										required
										was-validated
									>
										<template #prepend-content>
											<CIcon name="cil-lock-locked" />
										</template>
									</CInput>
									<CRow>
										<CCol col="6" class="text-left">
											<CButton color="primary" type="submit" class="px-4">Login</CButton>
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
								>Voting Sistem Menggunakan <br> Smart-Contract</p>
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
	import EthereumService from "../../service/admin/ethereum.service";

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
					setTimeout(() => this.$router.push("/admin"), 2000);
				} else {
					setTimeout(() => this.$router.push("/"), 2000);
				}
			}
		},
		methods: {
			handleLogin() {
				this.$store.dispatch("auth/login", this.user).then(
					response => {
						// setTimeout(() => this.$router.push("/admin"),5000);
						if (response.status == "Gagal") {
							this.alert.color = "warning";
							this.alert.message = response.message;
							this.alert.status = true;
							setTimeout(() => this.$router.go(0), 2000);
						} else {
							this.alert.color = "info";
							this.alert.message = response.message;
							this.alert.status = true;
							setTimeout(() => this.$router.push("/admin"), 2000);
						}
					},
					error => {
						// console.log(error.response.data.message)
						this.alert.color = "danger";
						this.alert.message = error.response.data.message;
						this.alert.status = true;
						setTimeout(() => this.$router.go(0), 2000);
					}
				);
			}
		}
	};
</script>
