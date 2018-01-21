<template>
  <f7-page>
    <f7-navbar title="登录 | 注册" back-link="Back" sliding></f7-navbar>
    <f7-block>
      <f7-row>
        <f7-col v-show="$device.desktop" tablet-width="25" />
        <f7-col width="100" tablet-width="50">

    <f7-list inline-labels> <!-- :inline-labels="$device.desktop"> -->
            <f7-list-item>
                <f7-icon icon="fas fa-user" slot="media"></f7-icon>
                <f7-input type="text" placeholder="用户名，英文/数字/下划线" clear-button
                  :value="user.name" @input="user.name = $event.target.value"
                  required validate pattern="[A-z][A-z0-9_]*" :data-error-message="'Only numbers please!'"/>
                  <!-- f7-input 直接用v-model不能绑定，把语法糖改写成：:value="sth" @input="sth = $event.target.value" -->
            </f7-list-item>
            <f7-list-item>
                <f7-icon icon="fas fa-key" slot="media"></f7-icon>
                <f7-input type="password" placeholder="密码，至少四位" clear-button id="_first_pwd"
                  validate pattern="[A-z0-9_]*"
                  :value="user.password" @input="user.password = $event.target.value" />
            </f7-list-item>
            <f7-list-item v-show="is_register">
                <f7-icon icon="fas fa-key color-gray" slot="media"></f7-icon>
                <f7-input type="password" placeholder="再次输入密码" validate pattern="[A-z0-9_]*"
                  :value="user.password_repeat" @input="user.password_repeat = $event.target.value" />
                <f7-icon :icon="user.password==user.password_repeat? 'fas fa-check color-green' : 'fas fa-exclamation-triangle color-red'"></f7-icon>
            </f7-list-item>
                        <f7-list-item>
                <f7-icon icon="fas fa-user-plus color-green" slot="media"></f7-icon>
                <f7-label>新用户？</f7-label>
                <f7-toggle @change="is_register = !is_register" title="手动输入种子ID" color="green"></f7-toggle>
            </f7-list-item>

            <f7-list-item v-show="is_register">
                <f7-icon icon="far fa-id-badge" slot="media"></f7-icon>
                <f7-input type="text" placeholder="Ourbits论坛用户名(字符)" clear-button validate
                  :value="user.ob_username" @input="user.ob_username = $event.target.value" />
            </f7-list-item>
            <f7-list-item v-show="is_register">
                <f7-icon icon="fas fa-barcode" slot="media"></f7-icon>
                <f7-input type="text" placeholder="Ourbits论坛用户ID(纯数字)" clear-button validate pattern="[0-9]*"
                  :value="user.ob_id" @input="user.ob_id = $event.target.value" />
            </f7-list-item>
          <f7-list-item v-show="is_register">
            <f7-icon icon="fas fa-inbox" slot="media"></f7-icon>
            <f7-label>保种空间</f7-label>
            <f7-input type="number" placeholder="最大硬盘空间" validate
              :value="user.sec_storage" @input="user.sec_storage = $event.target.value" />TB
              </f7-list-item>
   </f7-list>
   <f7-block-title></f7-block-title>
   <f7-block>
            <f7-row>
                  <f7-col v-if="!is_register">
                    <f7-button fill raised text="登 录" />
                  </f7-col>
                 <f7-col v-if="is_register">
                    <f7-button fill raised text="注 册" color="green" />
                  </f7-col>
            </f7-row>
        </f7-block>
        <f7-block-title></f7-block-title>

    </f7-col>
    <f7-col v-show="$device.desktop" tablet-width="25"/>
  </f7-row>
    </f7-block>


  </f7-page>
</template>
<script>
export default {
  name: 'login',
  components: {
  },
  data() {
    return {
      is_register: false,
      user: {
        name: '',
        password: '',
        password_repeat: '',
        ob_username: '',
        ob_id: '',
        sec_storage: '', // string, not Int
      }
    }
  },
  filters: {
    filter1(para) {
      return para;
    }
  },
  created() {},
  mounted() {
    document.getElementById('_first_pwd').addEventListener('keypress', (e)=>
      {if (e.keyCode==13) this.login(e)}, false);
  },
  beforeDestroy() {
    // document.getElementById('_first_pwd').removeEventListener('keypress')
  },
  computed: {
    name1() {
      return ;
    }
  },
  methods: {
    login(e) {
      console.log(e.keyCode)
      if (e.keyCode) alert('login:' + JSON.stringify(this.user))
    },
  }
}

</script>
