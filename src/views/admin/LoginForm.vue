<template>
	<div class="c-app flex-row align-items-center">
		<CContainer>
			<CRow class="justify-content-center">
				<CCol md="8">
					<CCardGroup>
						<CCard class="p-4">
							<CCardBody>
								<CForm @submit.prevent="handleLogin">
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
								>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit dignissimos enim quisquam velit, eum blanditiis, quasi laudantium illo odit asperiores recusandae expedita, laborum quaerat maxime?</p>
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
				activeUser:{
					activeHash:"",
					generateHash:""
				}
			};
		},
		computed: {
			loggedIn() {
				return this.$store.state.auth.status.loggedIn;
			},
			VerifyUser(){
				return EthereumService.verifyUser();
			}
		},
		mounted() {
			if (this.loggedIn && this.VerifyUser) {
				setTimeout(() => this.$router.push('/admin'), 7000);
			}else{
				setTimeout(() => this.$router.push('/'),7000)
			}
		},
		methods: {
			handleLogin() {
				this.$store.dispatch("auth/login", this.user).then(() => {
					this.$router.push("/admin");
				});
			}
		}
	};
</script>
