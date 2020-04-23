<template>
  <div>
    home
    <el-button type="info" class="logout" @click="logout">logout</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped></style>
