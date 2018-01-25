<template>
    <div>
        <f7-block-title>Welcome {{user_info.username}}</f7-block-title>
        <f7-list inline-labels>
            <f7-list-item :title="seeds_info.banner" class="banner">
                <f7-icon slot="media" icon="fas fa-info fa-fw"></f7-icon>
            </f7-list-item>
            <f7-list-item link="" title="">
                <f7-icon slot="media" icon="fas fa-user fa-fw"></f7-icon>
                <f7-link href="https://ourbits.club/" target="_blank" external class="item-link">
                    Ourbits论坛 <i class="fas fa-external-link-alt fa-xs" color="blue" /></f7-link>
                <f7-label>{{ user_info.ob_username }}</f7-label>
            </f7-list-item>
            <f7-list-item :title="'保种空间 '+user_info.max_cap+'TB'">
                <f7-icon icon="fas fa-chart-pie" slot="media"></f7-icon>
                <!-- <f7-label>保种空间({{user_info.max_cap}}TB)</f7-label> -->
                <f7-label>已分配{{user_info.secure_seeds_assigned.length}}
                    <f7-badge :color="user_info.rate1_color">{{(user_info.assigned_cap).toFixed(2)}}TB</f7-badge>
                    <f7-progressbar :color="user_info.rate1_color" :progress="user_info.assigned_cap/user_info.max_cap*100"></f7-progressbar>
                </f7-label>
                <f7-label>已认领{{user_info.secure_seeds_accepted.length}}
                    <f7-badge :color="user_info.rate2_color">{{(user_info.accepted_cap).toFixed(2)}}TB</f7-badge>
                    <f7-progressbar :color="user_info.rate2_color" :progress="user_info.accepted_cap/user_info.max_cap*100"></f7-progressbar>
                </f7-label>
            </f7-list-item>
            <f7-list-item title="上次同步种子">
                <f7-icon slot="media" icon="fas fa-clock fa-fw"></f7-icon>
                <f7-label>{{ seeds_info.sync_time | datefilter}}</f7-label>
            </f7-list-item>
            <f7-list-item link="#" @click="fetch_user_allInfo" title="同步服务器数据">
                <f7-icon slot="media" icon="fas fa-exchange-alt fa-fw"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/help/" title="汇报问题 建议">
                <f7-icon slot="media" icon="fas fa-bug fa-fw"></f7-icon>
            </f7-list-item>
        </f7-list>
        <f7-block-title>联 系</f7-block-title>
        <f7-list>
            <f7-list-item title="17197602">
                <f7-icon slot="media" icon="fab fa-weixin fa-fw color-green"></f7-icon>
            </f7-list-item>
            <f7-list-item link="">
                <f7-icon slot="media" icon="fab fa-github fa-fw"></f7-icon>
                <f7-link href="https://github.com/kevinqqnj/framework7-vue-data-table-demo" target="_blank" external class="item-link">
                Github <i class="fas fa-external-link-alt fa-xs" color="blue" /></f7-link>
            </f7-list-item>
        </f7-list>
    </div>
</template>
<script>
import { toSmartDate, fetch_user_allInfo } from '../assets/js/util';
export default {
    name: 'home',
    data() {
        return {
            sec_storage: 2,
        }
    },
    filters: {
        datefilter(para) {
            return toSmartDate(para);
        },
    },
    created() {},
    mounted() {},
    beforeDestroy() {},
    computed: {
        user_info() {
            return this.$store.state.user_info
        },
        seeds_info() {
            return this.$store.state.seeds_info
        },
        securers_info() {
            return this.$store.state.securers_info
        },
    },
    methods: {
        fetch_user_allInfo() {
            fetch_user_allInfo(this.user_info.username, this.$f7)
        },

    }
}

</script>
