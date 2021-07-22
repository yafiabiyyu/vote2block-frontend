<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="img/avatars/6.jpg"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Settings</strong>
    </CDropdownHeader>
    <CDropdownItem @click="profilePemilih">
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    <CDropdownItem @click="updatePassword">
      <CIcon name="cil-shield-alt" /> Update Password
    </CDropdownItem>
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42
    }
  },
  methods:{
    profilePemilih(){
      this.$router.push('/pemilih/data')
    },
    logout(){
      this.$store.dispatch("auth/removeauth");
      setTimeout(() => this.$router.push('/'),5000);
    },
    updatePassword(){
      this.$router.push('/pemilih/password')
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>