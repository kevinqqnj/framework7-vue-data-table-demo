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
                    <f7-link href="/help/" text="帮助"></f7-link>
                    <f7-link href="/about/" text="About"></f7-link>
                </f7-row>
                <f7-link v-show="user_info.status=='login'" popover-open="#pop-user" title="注销 | 同步">
                    <f7-chip :text="user_info.username" media-bg-color="orange" text-color="white" :media="user_info.username[0].toUpperCase()"></f7-chip>
                    <!-- arrary.slice(1) -->
                </f7-link>
                <f7-link v-show="user_info.status==''" href="/login/" title="登录 | 注册" icon="fas fa-user-times"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-toolbar tabbar style="background: rgba(33, 168, 243, 1);" :class="($device.desktop||$device.ipad)?'':'toolbar-bottom-md'">
            <a href="./" class="tab-link" data-route-tab-id="tab1">
              <i class="icon fas fa-home fa-lg"></i>Home
              <!-- <span class="tabbar-label">Home</span> -->
            </a>
            <a href="tab2/" class="tab-link" data-route-tab-id="tab2" title="认领、分配、撤销保种任务 点击种子打开详情 点击表头排序">
              <span v-show="user_info.not_accept.length==0"><i class="icon fas fa-download fa-lg"></i></span>
              <span v-show="user_info.not_accept.length>0"class="fa-layers fa-lg">
                <i class="fas fa-download"></i>
                <span class="fa-layers-counter">{{user_info.not_accept.length}}</span>
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
        <f7-popover class="popover-menu popover-max-height" id="pop-user">
            <f7-list>
                <f7-list-item class="popover-close" title="同步服务器">
                    <f7-link icon="fas fa-exchange-alt fa-pull-right color-blue" @click="fetch_user_allInfo"></f7-link>
                </f7-list-item>
                <f7-list-item class="popover-close" title="退出">
                    <f7-link icon="fas fa-sign-out-alt fa-pull-right color-red" @click="logout" text=""></f7-link>
                </f7-list-item>
            </f7-list>
        </f7-popover>
    </f7-page>
</template>
<style>


</style>
<script>
import { fetch_user_allInfo } from '../assets/js/util';
export default {
    name: 'index',
    data() {
        return {
            login_name: 'kevinqq',
            screenWidth: document.body.clientWidth,
        }
    },
    created() {
        let LS = window.localStorage.getItem("user_info")
        if (LS) this.$store.dispatch('update_user', JSON.parse(LS))
        LS = window.localStorage.getItem("seeds")
        if (LS) this.$store.dispatch('update_seeds', JSON.parse(LS))
        LS = window.localStorage.getItem("securers")
        if (LS) this.$store.dispatch('update_securers', JSON.parse(LS))
    },
    mounted() {
        window.onresize = () => {
            return this.screenWidth = document.body.clientWidth
        }
    },
    beforeDestroy() {},
    computed: {
        desktop_large() {
            return (this.$device.desktop || this.$device.ipad) && this.screenWidth > 768
        },
        user_info() {
            return this.$store.state.user_info
        },
    },
    methods: {
        async logout() {
            let response = await this.$axios.get('/logout')
            let data = this.$store.state.user_info
            data.status = ''
            data.username = '游客'
            data.ob_username = ''
            this.$store.dispatch('update_user', data)
            this.$f7.notification.create({ text: '<span class="text-color-green"><i class="fas fa-check"></i> 已退出</span>', closeOnClick: true, }).open()
        },
        async fetch_user_allInfo() {
            fetch_user_allInfo(this.user_info.username, this.$f7)
        },
    }

}

</script>
