<template>
    <f7-page>
        <f7-navbar title="登录 | 注册" back-link="Back" sliding></f7-navbar>
        <f7-block>
            <f7-row>
                <f7-col width="0" tablet-width="25" />
                <f7-col width="100" tablet-width="50">
                    <f7-list form form-store-data inline-labels no-hairlines-md id="login-form">
                        <!-- :inline-labels="$device.desktop"> -->
                        <f7-list-item>
                            <f7-icon icon="fas fa-user" slot="media"></f7-icon>
                            <f7-input type="text" placeholder="用户名，英文/数字/下划线" clear-button
                            :value="user.username" @input="user.username = $event.target.value"
                            name="login_username" required validate pattern="[A-z][A-z0-9_]*" />
                            <!-- f7-input 直接用v-model不能绑定，把语法糖改写成：:value="sth" @input="sth = $event.target.value" -->
                        </f7-list-item>
                        <f7-list-item>
                            <f7-icon icon="fas fa-key" slot="media"></f7-icon>
                            <f7-input type="password" placeholder="密码，至少四位" clear-button id="_first_pwd"
                            name="login_password" validate pattern="[A-z0-9_]*"
                            :value="user.password" @input="user.password = $event.target.value" />
                        </f7-list-item>
                        <f7-list-item v-show="is_register">
                            <f7-icon icon="fas fa-key color-gray" slot="media"></f7-icon>
                            <f7-input type="password" placeholder="再次输入密码" validate required pattern="[A-z0-9_]*" :value="user.password_repeat" @input="user.password_repeat = $event.target.value" />
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
                            <f7-input type="text" placeholder="Ourbits论坛用户名(字符)" clear-button name="login.ob_username" validate required :value="user.ob_username" @input="user.ob_username = $event.target.value" />
                        </f7-list-item>
                        <f7-list-item v-show="is_register">
                            <f7-icon icon="fas fa-barcode" slot="media"></f7-icon>
                            <f7-input type="text" placeholder="Ourbits论坛用户ID(纯数字)" clear-button name="login.ob_id" validate required pattern="[0-9]*" :value="user.ob_id" @input="user.ob_id = $event.target.value" />
                        </f7-list-item>
                        <f7-list-item v-show="is_register">
                            <f7-icon icon="fas fa-inbox" slot="media"></f7-icon>
                            <f7-label>保种空间</f7-label>
                            <f7-input type="number" placeholder="最大硬盘空间" name="login.sec_storage" validate required :value="user.sec_storage" @input="user.sec_storage = $event.target.value" />TB
                        </f7-list-item>
                    </f7-list>
                    <f7-block-title></f7-block-title>
                    <f7-block>
                        <f7-row>
                            <f7-col v-if="!is_register">
                                <f7-button @click="login" fill raised text="登 录" class="" />
                            </f7-col>
                            <f7-col v-if="is_register">
                                <f7-button @click="register" fill raised text="注 册" color="green" />
                            </f7-col>
                        </f7-row>
                    </f7-block>
                    <f7-block-title></f7-block-title>
                </f7-col>
                <f7-col width="0" tablet-width="25" />
            </f7-row>
        </f7-block>
    </f7-page>
</template>
<script>
import { toSmartDate, fetch_user_allInfo } from '../assets/js/util';
export default {
    name: 'login',
    components: {},
    data() {
        return {
            is_register: false,
            user: {
                username: '',
                password: '',
                password_repeat: '',
                ob_username: '',
                ob_id: '',
                sec_storage: '', // string, not Int
                token: '',
                id: '', // id in database
            },
            is_login: false,
            username: '',
            password: '',
            ob_username: '',
            token: '',
        }
    },
    created() {},
    mounted() {
        document.getElementById('_first_pwd').addEventListener('keypress', (e) => { if (e.keyCode == 13) this.login(e) }, false);
    },
    beforeDestroy() {
        // document.getElementById('_first_pwd').removeEventListener('keypress')
    },
    computed: {
        compare_pwd() {
            // console.log(JSON.stringify(this.user))
            return this.user.password == this.user.password_repeat
        },
        validation() {
            var patt1 = /^[A-z_][\w]{3,}$/;
            var patt2 = /^\w{4,}$/;
            //              alert(this.username + patt1.test(this.username));
            return (patt1.test(this.user.username)) && patt2.test(this.user.password)
        },
        validation2() {
            var patt1 = /^[A-z_][\w]{3,}$/;
            var patt2 = /(\w{4,})/;
            let patt3 = /([\w\u4e00-\u9fa5]{1,})/;
            //              alert(this.username + patt1.test(this.username));
            return (this.username == 'admin' || patt1.test(this.username)) && patt2.test(this.password) && patt3.test(this.ob_username)
        },
    },
    methods: {
        async login() {
            if (!this.validation) return this.$f7.toast.create({
                text: '请检查字段',
                position: 'center',
                closeTimeout: 2000,
            }).open()
            this.$f7.dialog.preloader('登录中...');
            let response = await this.$axios.get('/login');
            //console.log(response.status)
            //之前已登录，则会重定向到“/”responseURL:"http://localhost:5000/"
            if (response.status == 200 && response.request.responseURL.indexOf('/login') == -1) {
                this.$f7.notification.create({ text: '<span class="<span class="text-color-orange">"><i class="fas fa-exclamation-triangle"></i> 已经是登录状态</span>', closeOnClick: true, }).open()
                let LS = window.localStorage.getItem("user_info")
                if (LS) {
                    let data = JSON.parse(LS)
                    data.status = 'login'
                    this.$store.dispatch('update_user', data)
                    this.$f7.dialog.close()
                    return this.$f7router.back()
                } else {
                    response = await this.$axios.get('/logout');
                    // this.$f7.dialog.close()
                    // return alert('登录状态异常，请重试')
                    this.$f7.notification.create({ text: '<span class="text-color-red"><i class="fas fa-exclamation-triangle"></i> 登录状态异常，正在重试</span>', closeOnClick: true, }).open()
                    response = await this.$axios.get('/login');
                }
            }
            // 获取 csrf_token
            let csrf_token = response.data.match(/name="csrf_token" type="hidden" value="(.*?)">/)[1];
            try {
                response = await this.$axios.post('/login', {
                    email: this.user.username,
                    password: this.user.password,
                    csrf_token: csrf_token,
                    remember_me: true,
                }, {
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                })
            } catch (error) {
                console.log(error.response)
                // 服务器返回400，用户名重复，或其它异常
                this.$f7.dialog.close()
                return alert(JSON.stringify(error.response.data.response.errors) + '，请重试')
            }
            // 获取 token
            this.user.token = response.data.response.user.authentication_token
            this.user.id = response.data.response.user.id
            let userData = this.$store.state.user_info
            let userData2 = {
                'username': this.user.username,
                'email': this.user.username,
                'token': this.user.token,
                'status': 'login',
                'id': this.user.id,
            };
            Object.assign(userData, userData2); // 合并{}
            window.localStorage.setItem("user_info", JSON.stringify(userData));
            this.$store.dispatch('update_user', userData)
            this.$f7.dialog.close()
            this.$f7.notification.create({ text: '<span class="text-color-green"><i class="fas fa-check"></i> 登录成功</span>', closeOnClick: true, }).open()
            // get more user info
            fetch_user_allInfo(this.user.username)
            return this.$f7router.back('/index/', { 'ignoreCache': true, })
        },
        async register() {
            fetch_user_allInfo(this.user.username, this.$f7)
        },
        register111() {
            //            this.$http.options.headers={
            //'Content-Type':'application/json; charset=UTF-8'
            //};

            // if (!this.validation) return;
            window.f7.showIndicator();

            // get CSRF
            // alert(this.username+', '+this.password)
            var csrf_token = '';
            this.$http.get('/login').then((response) => {
                // 响应成功回调
                var data = response.body;
                // alert(JSON.stringify(response));
                // <input id="csrf_token" name="csrf_token" type="hidden" value="1483433916##5b057abdef66da070c8385752b78f6c584f6ba41"><input
                var csrf_token = '';
                try {
                    csrf_token = data.match(/name="csrf_token" type="hidden" value="(.*?)">/)[1];
                    //                  alert(csrf_token);
                } catch (exception) {
                    // 如果已经登陆，则302，redirect to home
                    //                alert(exception); // exception: TypeError: Cannot read property '1' of null
                    // alert('登录异常，请重新登录');
                    window.f7.addNotification({
                        title: '登录状态不同步',
                        message: '登录异常，请重新登录'
                    });
                    // return window.location = '/logout';
                    window.f7.hideIndicator();
                    this.$http.get('/logout')
                    // window.location.href="/"
                }
                this.$http.post('/api/ob_register',
                    //body
                    {
                        email: this.username,
                        password: this.password,
                        ob_username: this.ob_username,
                        csrf_token: csrf_token
                    },
                    //options
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    }).then((response) => {
                    // 响应成功回调
                    window.f7.hideIndicator();
                    console.log(response)
                    if (response.body.code == 'success') {
                        window.f7.views.main.router.back()
                        window.f7.addNotification({
                            title: '<i class="fa fa-check-circle color-green"></i>',
                            // title: '登录成功！\n 请联系 kevinqqnj 激活账户',
                            message: response.body.msg,
                            // hold: 2000
                        });
                    } else {
                        return window.f7.addNotification({
                            title: '<i class="fa fa-warning color-red"></i>',
                            message: (response.body.msg), // 直接显示HTML
                            // hold: 2000
                        });
                    }

                }, (response) => {
                    // 响应Login-POST错误回调
                    // alert('登录出错了！ ' + response.status + response.statusText)
                    window.f7.addNotification({
                        title: response.body.msg || '出错了！',
                        message: response.status + ' ' + response.statusText
                    });
                    window.f7.hideIndicator();
                    this.password = ''
                });
            }, (response) => {
                // 响应login-GET 错误回调
                // alert('登录出错了(CSRF)！ ' + JSON.stringify(response))
                window.f7.addNotification({
                    title: '出错了(CSRF)',
                    message: JSON.stringify(response)
                });
                window.f7.hideIndicator();
                this.password = ''
            });

        }
    }
}

</script>
