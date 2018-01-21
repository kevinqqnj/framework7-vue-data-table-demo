<template>
    <f7-page :page-content="false">
        <f7-navbar>
            <f7-nav-left>
                <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
            </f7-nav-left>
            <div class="title">Ourbits管理</div>
            <f7-nav-right>
                <f7-link href="/login/" title="登录 | 注册" icon="fas fa-user-times"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-toolbar tabbar style="background: rgba(33, 168, 243, 1);" :class="$device.desktop?'':'toolbar-bottom-md'">
            <a href="./" class="tab-link" data-route-tab-id="tab1">
              <i class="icon fas fa-home fa-lg"></i>Home
              <!-- <span class="tabbar-label">Home</span> -->
            </a>
            <a href="tab2/" class="tab-link" data-route-tab-id="tab2">
              <span class="fa-layers fa-lg">
                <i class="fas fa-download"></i>
                <span class="fa-layers-counter">19</span>
              </span>任 务
            </a>
            <a href="tab3/" class="tab-link" data-route-tab-id="tab3">
              <i class="icon fas fa-chart-bar fa-lg"></i>统 计
            </a>
            <a href="tab4/" class="tab-link" data-route-tab-id="tab4">
              <i class="icon fas fa-wrench fa-lg"></i>管 理
            </a>
        </f7-toolbar>
        <f7-tabs routable>
            <f7-tab class="page-content hide-navbar-on-scroll" id="tab1"></f7-tab>
            <f7-tab class="page-content" id="tab2"></f7-tab>
            <f7-tab class="page-content" id="tab3"></f7-tab>
            <f7-tab class="page-content" id="tab4"></f7-tab>
        </f7-tabs>
    </f7-page>
</template>
<style>
</style>
<script>
export default {
  name: 'index',
  data() {
    return {
      login_name: 'kevinqq',
    }
  },
  created() {},
  mounted() {

  },
  beforeDestroy() {},
  computed: {
    name1() {
      return ;
    }
  },
  methods: {
    login() {
      let prompt=`输入管理系统的用户名、密码<br>没有账号？<f7-link href="#">注 册</f7-link>`
      this.$f7.dialog.login(prompt, '登录', (username, password)=> {
          this.$f7.dialog.alert('Thank you!<br>Username:' + username + '<br>Password:' + password)
    },)
  },
}

}
</script>
