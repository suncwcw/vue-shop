<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/pi.png" alt />
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="please input username"
            prefix-icon="el-icon-s-custom
"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="please input password"
            prefix-icon="el-icon-bell"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">login</el-button>
          <el-button type="primary " @click="resetLoginForm">reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // eslint-disable-line space-before-function-paren
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // validation rules
      loginFormRules: {
        username: [
          { required: true, message: 'please input username', trigger: 'blur' },
          {
            min: 3,
            max: 7,
            message: 'length more than 3 less than 7 ',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: 'please input password', trigger: 'blur' },
          {
            min: 3,
            max: 7,
            message: 'length more than 3 less than 7 ',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      // console.log(this);

      this.$refs.loginFormRef.resetFields()
      this.$message.success('reset success')
    },
    login() {
      // 预验证
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          return
        }
        const result = this.$http.post('/login', this.loginForm).then(
          res => {
            this.$message.success('login success')
            // console.log(res.data.data.token)
            window.sessionStorage.setItem('token', res.data.data.token)
            this.$router.push('home')
          },
          err => {
            this.$message.error('login failed')
          }
        )
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  // background-color: #2b4b6b;
  background-image: linear-gradient(
    to right,
    #eea2a2 0%,
    #bbc1bf 19%,
    #57c6e1 42%,
    #b49fda 79%,
    #7ac5d8 100%
  );
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  // background-image: linear-gradient(to top, #d9afd9 0%, #97d9e1 100%);
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  // 根据左上角作修正
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    // 向外扩散10pxfff
    box-shadow: 0 0 25px #bbb;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: antiquewhite;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
.login_form {
  margin: 100px 30px 0 30px;
}
</style>
