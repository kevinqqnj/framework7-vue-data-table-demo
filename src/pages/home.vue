<template>
    <div>
        <f7-block-title>Welcome to Ourbits</f7-block-title>
        <f7-block inner>
            Info from OB website.
        </f7-block>
         <a class="item-link smart-select smart-select-init" data-open-in="popover">
    <select name="superhero" multiple>
      <option value="Batman" selected>Batman</option>
      <option value="Superman">Superman</option>
      <option value="Hulk">Hulk</option>
      <option value="Spiderman">Spiderman</option>
      <option value="Ironman">Ironman</option>
      <option value="Thor">Thor</option>
      <option value="Wonder Woman">Wonder Woman</option>
    </select>
    <div class="item-content">
      <div class="item-inner">
        <div class="item-title">Super Hero</div>
      </div>
    </div>
  </a>
        <f7-block-title>用 户</f7-block-title>
        <f7-list class="components-list searchbar-found">
            <f7-list-item title="ID / Ourbits用户名：">
                        <f7-label>{{user_info}} / {{user_info}}</f7-label>
                    </f7-list-item>
            <f7-list-item link="#" @click="sync_server" title="同步服务器数据">
                <f7-icon slot="media" icon="fas fa-exchange-alt fa-lg fa-fw"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/dynamic-route/blog/11/post/23/" title="Dynamic Route">
                <f7-icon slot="media" icon="far fa-star fa-lg fa-fw"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/data-table/" title="Data-table">
                <f7-icon slot="media" icon="fas fa-table fa-lg fa-fw"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/tabs-routable/" title="Routable Tabs">
                <f7-icon slot="media" icon="fas fa-th-large fa-lg fa-fw" color="blue"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/about/" title="About">
                <f7-icon slot="media" icon="fas fa-info fa-lg fa-fw"></f7-icon>
            </f7-list-item>
        </f7-list>
                <f7-list>
                    <f7-list-item>
                        <div v-html="user_info.banner"></div>
                    </f7-list-item>

                    <f7-list-item>
                <f7-label><f7-link @click="sync_server">同步服务器数据: <i class="fas fa-exchange-alt fa-lg"></i></f7-link>
            </f7-label>
                <!-- <f7-label>{{user_info.sys_status}}</f7-label> -->
            </f7-list-item>
                 <!--     <f7-list-item title="上次同步种子:">
                        <f7-label>{{user_info.sync_time | toSmartDateFilter}}</f7-label>
                    </f7-list-item>
                </f7-list>

                <f7-list>

                    </f7-list-item>
                    <f7-list-item title="认领总数：">
                        <f7-label>{{user_info.secure_seeds_accepted.length}}个, {{(user_info.accepted_cap).toFixed(2)}} (TB)</f7-label>
                    </f7-list-item>
                    <f7-list-item title="分配总数：">
                        <f7-label>{{user_info.secure_seeds_assigned.length}}个, {{(user_info.assigned_cap).toFixed(2)}} (TB)</f7-label>
                    </f7-list-item>
                    <f7-list-item link="/accept_my_task/" title="新任务：">
                        <f7-label v-if="sr_pending_accept.length>0">
                            <f7-chip :text="sr_pending_accept.length" bg="red" color=""></f7-chip>
                        </f7-label>
                        <f7-label v-else>-</f7-label>
                    </f7-list-item> -->

                </f7-list>
                <f7-block></f7-block>
                <f7-block-title>必 读</f7-block-title>
                <f7-block inner>
                    <p>Ourbits保种员，自行注册用户名和密码。默认使用你的Ourbits用户名。如果是Ob用户名是全数字，则用户名为obXXXX。注册完，QQ群里联系管理员激活账户。</p>
                    <p>工资规则：最低要求500G（基本工资1W魔力），高于500G的部分每100G奖励1W魔力，每500G额外奖励1W魔力，比如本月保种1T奖励魔力7W。<br>
                        做种人数低于5的给予双倍魔力值奖励。<br>
每1T每月奖励一个永久邀请，但邀请码奖励以后会逐步取消，需要邀请码可以向管理组申请。<br>
注意：<br>
必须在本系统里已分配且已认领的种子才算，而且当月做种平均天数小于10天的工资减半，小于5天的没有工资，连续两个月无工资的，将被取消保种员。</p>
                </f7-block>

                <f7-block-title>联 系</f7-block-title>
                <f7-block inner>
                <f7-link href='/issue_report/' title=""><i class="fa fa-question-circle"></i> 点击汇报问题、提建议</f7-link><br><br>
                <i class="fa fa-weixin fa-fw color-green"></i> 17197602
                </f7-block>

        <f7-block-title>Introduction</f7-block-title>
        <f7-block inner>
            <p>This is template for Framework7 v2, Vue and Webpack.</p>
            <p>Here use Font-awesome 5 Icons, you can replace with other icon as you like.</p>
        </f7-block>
        <f7-block-title class="searchbar-found">Links</f7-block-title>

        <f7-list class="searchbar-not-found">
            <f7-list-item title="Nothing found"></f7-list-item>
        </f7-list>
        <f7-block-title class="searchbar-hide-on-search">Themes</f7-block-title>
        <f7-list class="searchbar-hide-on-search">
            <f7-list-item title="iOS Theme" external link="./index.html?theme=ios"></f7-list-item>
            <f7-list-item title="Material (MD) Theme" external link="./index.html?theme=md"></f7-list-item>
            <f7-list-item title="Color Themes" link="/color-themes/"></f7-list-item>
    		<f7-list-item link="#">
    			<f7-link href="https://github.com/kevinqqnj" target="_blank" external class="item-link">Github</f7-link>
    		</f7-list-item>
        </f7-list>
    </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      user_info: {},
    }
  },
  filters: {
    filter1(para) {
      return para;
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {
    name1() {
      return ;
    }
  },
  methods: {
    sync_server() {

    },

  }
}
</script>
