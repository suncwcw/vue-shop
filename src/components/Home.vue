<template>
  <el-container class="home-container">
    <div class="box">
      <el-header>
        <div class="container-title">
          <span>Manage ---System</span>
          <div class="el-icon-s-management"></div>
        </div>
        <el-button @click="logout">LogOut</el-button>
      </el-header>
    </div>

    <el-container>
      <el-aside width="isCollapse?'125px':'70px'">
        <div class="toggle-button" @click="toggleCollapse">button</div>
        <el-menu
          active-text-color="#e94057"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 1及菜单  循环渲染菜单 -->
          <el-submenu :index="item.id + '0'" v-for="item in menulist" :key="item.id">
            <!-- 模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 2级菜单  路径-->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/'+subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  // 重点有return
  data() {
    return {
      menulist: [],
      iconsObj: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-goods',
        '101': 'el-icon-s-help',
        '102': 'el-icon-camera-solid',
        '145': 'el-icon-s-promotion'
      },
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },

  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    getMenuList() {
      this.$http.get('/menus').then(res => {
        this.menulist = res.data.data
        console.log(this.menulist)
      })
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>
.el-menu {
  // font-family: 'Kaushan Script', cursive;
  font-size: bold;
  color: antiquewhite !important;
  background-color: antiquewhite;
}
.home-container {
  height: 100%;
}
.el-container {
  background-color: wheat;
  border-radius: 10px;
  box-shadow: 0 0 100px 20px #c1336b !important;
}
.el-aside {
  border-right: 0;
  border-radius: 8px !important;
  box-shadow: 0 0 10px #c1336b !important;
}
.el-submenu__title {
  border-radius: 20px !important;
}
.hr {
  background-color: red;
}
.el-icon-s-management {
  position: absolute;
  top: 20px;
  left: 50px;
}
.home-container .container-title {
  font-family: 'Kaushan Script', cursive;
  font-size: 35px;
  color: antiquewhite;
}
.home-container .container-title span {
  position: absolute;
  top: 10px;
  left: 435px;
}
.el-button {
  border-radius: 10px;
  float: right;
  position: absolute;
  right: 20px;
  top: 15px;
  z-index: 0;
  border-radius: 15px;
  background-color: #8a2388;
  color: #ffffff;
  font-family: 'Kaushan Script', cursive;
  font-size: 28px;
  box-shadow: 0 0 10px #fff;
  border: none;
  &:hover {
    background-color: antiquewhite;
    color: #8a2387; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #f27121,
      #e94057,
      #8a2387
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #f27121,
      #e94057,
      #8a2387
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
}

.home-container {
  height: 100%;
}
.el-header {
  height: 82px;
}
.box {
  background: #8a2387; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f27121,
    #e94057,
    #8a2387
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f27121,
    #e94057,
    #8a2387
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 82px;
  width: 100%;
  margin: 0px;
  padding: 0px;
  box-shadow: 0 3px 20px #e94057;
}
.el-aside {
  position: absolute;
  left: 5px;
  top: 120px;
  // width: 200px;

  background: antiquewhite;
  box-shadow: 0 0 40px 10px #c1336b !important;
}
.el-submenu span {
  margin: 0 40px;
}
.el-main {
  border-radius: 10px;
  position: absolute;
  top: 120px;
  left: 300px;
  width: 70%;
  background: #8a2387; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f27121,
    #e94057,
    #8a2387
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f27121,
    #e94057,
    #8a2387
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  box-shadow: 0 0 40px 10px #c1336b !important;
}
.toggle-button {
  font-family: 'Kaushan Script', cursive;
  background-color: #e94057;
  font-size: 6px bold;
  line-height: 24px;
  color: antiquewhite;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
