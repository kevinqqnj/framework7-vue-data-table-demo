<template>
  <f7-page>
    <f7-navbar title="登录 | 注册" back-link="Back" sliding></f7-navbar>
    <f7-block>
      <f7-row>
        <f7-col width="0" tablet-width="25" />
        <f7-col width="100" tablet-width="50">

    <f7-list form form-store-data inline-labels no-hairlines-md id="login-form">  <!-- :inline-labels="$device.desktop"> -->
            <f7-list-item>
                <f7-icon icon="fas fa-user" slot="media"></f7-icon>
                <f7-input type="text" placeholder="用户名，英文/数字/下划线" clear-button
                  :value="user.name" @input="user.name = $event.target.value" name="login.name"
                  required validate pattern="[A-z][A-z0-9_]*" :data-error-message="'Only numbers please!'"/>
                  <!-- f7-input 直接用v-model不能绑定，把语法糖改写成：:value="sth" @input="sth = $event.target.value" -->
            </f7-list-item>
            <f7-list-item>
                <f7-icon icon="fas fa-key" slot="media"></f7-icon>
                <f7-input type="password" placeholder="密码，至少四位" clear-button id="_first_pwd"
                  validate pattern="[A-z0-9_]*" name="login.password"
                  :value="user.password" @input="user.password = $event.target.value" />
            </f7-list-item>
            <f7-list-item v-show="is_register">
                <f7-icon icon="fas fa-key color-gray" slot="media"></f7-icon>
                <f7-input type="password" placeholder="再次输入密码" validate required pattern="[A-z0-9_]*"
                  :value="user.password_repeat" @input="user.password_repeat = $event.target.value" />
                <span v-show="compare_pwd"><i class="fas fa-check" color="green"></i></span>
        <span v-show="!compare_pwd"><i class="fas fa-exclamation-triangle" color="red"></i></span>
            </f7-list-item>
                        <f7-list-item>
                <f7-icon icon="fas fa-user-plus color-green" slot="media"></f7-icon>
                <f7-label>新用户？</f7-label>
                <f7-toggle @change="is_register = !is_register" title="我要注册" color="green"></f7-toggle>
            </f7-list-item>

            <f7-list-item v-show="is_register">
                <f7-icon icon="far fa-id-badge" slot="media"></f7-icon>
                <f7-input type="text" placeholder="Ourbits论坛用户名(字符)" clear-button name="login.ob_username"
                  validate required  :value="user.ob_username" @input="user.ob_username = $event.target.value" />
            </f7-list-item>
            <f7-list-item v-show="is_register">
                <f7-icon icon="fas fa-barcode" slot="media"></f7-icon>
                <f7-input type="text" placeholder="Ourbits论坛用户ID(纯数字)" clear-button name="login.ob_id"
                validate required pattern="[0-9]*" :value="user.ob_id" @input="user.ob_id = $event.target.value" />
            </f7-list-item>
          <f7-list-item v-show="is_register">
            <f7-icon icon="fas fa-inbox" slot="media"></f7-icon>
            <f7-label>保种空间</f7-label>
            <f7-input type="number" placeholder="最大硬盘空间" name="login.sec_storage"
              validate required   :value="user.sec_storage" @input="user.sec_storage = $event.target.value" />TB
              </f7-list-item>
	</f7-list>
   <f7-block-title></f7-block-title>
   <f7-block>
            <f7-row>
                  <f7-col v-if="!is_register">
                    <f7-button @click="login('login')" fill raised text="登 录" class="" />
                  </f7-col>
                 <f7-col v-if="is_register">
                    <f7-button @click="login('register')" fill raised text="注 册" color="green" />
                  </f7-col>
            </f7-row>
        </f7-block>
        <f7-block-title></f7-block-title>

    </f7-col>
    <f7-col width="0" tablet-width="25"/>
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
    compare_pwd() {
    	// console.log(JSON.stringify(this.user))
      return this.user.password==this.user.password_repeat
    },
  },
  methods: {
    login(e) {
      console.log(e || e.keyCode)
      if (e.keyCode==13) alert('login:' + JSON.stringify(this.user))
    },
  }
}

</script>
