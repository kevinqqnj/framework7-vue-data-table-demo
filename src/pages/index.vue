<template>
    <f7-page :page-content="false">
        <f7-navbar>
            <f7-nav-left>
                <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
            </f7-nav-left>
            <div class="title">Ourbits管理</div>
            <f7-nav-right>
              <f7-row v-show="desktop_large">
                <f7-link href="/about/" text="管理"></f7-link>
                <f7-link href="/about/" text="同步"></f7-link>
               <f7-link href="/about/" text="设置"></f7-link>
               <f7-link href="/about/" text="About"></f7-link>
             </f7-row>
                <f7-link href="/login/" title="登录 | 注册" icon="fas fa-user-times"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-toolbar tabbar style="background: rgba(33, 168, 243, 1);"
          :class="($device.desktop||$device.ipad)?'':'toolbar-bottom-md'">
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
      	  screenWidth: document.body.clientWidth,
    }
  },
  created() {},
  mounted() {
	window.onresize = ()=> { 
		return this.screenWidth = document.body.clientWidth
         }
  },
  beforeDestroy() {},
  computed: {
    desktop_large() {
      return (this.$device.desktop || this.$device.ipad) && this.screenWidth>768
    }
  },
  methods: {
    login() {
  },
}

}
</script>
