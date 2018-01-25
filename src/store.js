import Vuex from 'vuex';
import Vue from 'vue';
// import api from './api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user_info: {
      username: '游客',
      email: '未登录', // 必须有预设值，不然main.vue里，取email[0]会出错
      id: -1,
      token: '',
      status: '', // login
      ob_username: 'OB',
      role: 'user', // admin / user
      ob_passkey: '',
      secure_seeds_accepted: [],
      secure_seeds_assigned: [],
      not_accept: [],
      min_cap: 0,
      max_cap: 0,
      accepted_cap: 0,
      assigned_cap: 0,
      rate1: 0,
      rate2: 0,
      rate1_color: '',
      rate2_color: '',
      'sync_time': 'unknown',
      'sys_status': 'ready',
    },
    securers_info: [{
      email: 'admin',
      ob_username: 'kevinqqnj',
      ob_id: '',
      min_cap: 1,
      max_cap: 3,
      assigned_cap: 2.4,
      rate1: 80.0,
      rate1_color: 'color-red',
      accepted_cap: 1.0,
      rate2: 33.3,
      rate2_color: 'color-green',
      secure_seeds_assigned: [],
      secure_seeds_accepted: [],
      secure_salary: { mlz: 0, invite: 0 },
      id: 1,
    }],
    seeds_info: {
      gf_seeds: -1,
      fabu_size: -1,
      gftag_size: -1,
      total_size: -1,
      lost_seed: -1,
      no_secure: -1,
      sys_status: 'ready',
      sync_time: '-',
      banner: 'OB论坛最新消息',
    },
    vuetable: {
      selectedTo: [],
      selectedTotalSize: 0,
      loadStatus: '',
      tableData: {},
    },
    vuetable_action: {
      field: {},
      data: {},
      id: '', // cell ElementId
      count: 0, // 点击计数器
    },
    tr_info: {
      add_seeds: [],
      remove_seeds: [], //  【{id: 1, name: "Hotel.Rwanda.2...", ob_id:56789},...]
      tr_torrents: [], //  {torrents: [{id: 1, name: "Hotel.Rwanda.2004.1080p.WEB-DL.AAC.H264-OurTV.mp4", status: 0},…]}
    },
  },
  mutations: {
    update_tr_info(state, new_action) {
      state.tr_info = new_action
    },
    update_vuetable_action(state, new_action) {
      // window.localStorage.setItem("user", JSON.stringify(new_user_info));
      state.vuetable_action = new_action
      // console.log('Mutation: Ok, vuetable_action has been added');
    },
    update_vuetable(state, new_vuetable) {
      // window.localStorage.setItem("user", JSON.stringify(new_user_info));
      state.vuetable = new_vuetable
      // console.log('Mutation: Ok, vuetable has been added');
    },
    update_user(state, new_user_info) {
      let sr = new_user_info
      let rate1 = (sr.max_cap) ? sr.assigned_cap / sr.max_cap * 100 : 0
      sr.rate1 = rate1 // 分配的比率
      let rate2 = (sr.max_cap) ? sr.accepted_cap / sr.max_cap * 100 : 0
      sr.rate2 = rate2 // 认领的比率
      sr.rate1_color = (rate1 <= 50) ? 'green' : (rate1 <= 75) ? 'orange' : 'red'
      sr.rate2_color = (rate2 <= 50) ? 'green' : (rate2 <= 75) ? 'orange' : 'red'
      var ret = [];
            if (sr.secure_seeds_assigned)
              sr.secure_seeds_assigned.forEach(function(item) {
                if (!sr.secure_seeds_accepted.includes(item)) {
                    ret.push(item);
                }
            });
      sr.not_accept = ret
      window.localStorage.setItem("user_info", JSON.stringify(sr));
      state.user_info = sr
      console.log('Mutation: user_info has been added');
    },
    update_seeds(state, new_seeds_info) {
      window.localStorage.setItem("seeds", JSON.stringify(new_seeds_info));
      state.seeds_info = new_seeds_info
      // console.log('Mutation: Ok, seeds_info has been added');
    },
    update_securers(state, new_securers_info) {
      let srs = new_securers_info
      // 在激活/屏蔽页面，需要对应排序顺序
      // srs.sort( function(a,b){
      //     return a.ob_username[0]<b.ob_username[0]?-1: 1}); // 以Ob_username第一个字母排序
      srs.forEach((sr, index, array) => {　　　　
        let rate1 = (sr.max_cap) ? sr.assigned_cap / sr.max_cap * 100 : 0
        sr.rate1 = rate1
        let rate2 = (sr.max_cap) ? sr.accepted_cap / sr.max_cap * 100 : 0
        sr.rate2 = rate2
        sr.rate1_color = (rate1 <= 50) ? 'color-green' : (rate1 <= 75) ? 'color-orange' : 'color-red'
        sr.rate2_color = (rate2 <= 50) ? 'color-green' : (rate2 <= 75) ? 'color-orange' : 'color-red'
        // Salary 最低要求500G（基本工资1W魔力），高于500G的部分每100G奖励1W魔力，每500G额外奖励1W魔力，
        // 比如本月保种1T奖励魔力7W。每1T每月奖励一个永久邀请。
        let base_s = (sr.accepted_cap >= 0.5) ? 10000 : 0
        let total_mlz = 0;
        let total_invite = 0
        if (base_s == 10000) {
          let every_100G = parseInt((sr.accepted_cap - 0.5) * 10) * 10000
          let every_500G = parseInt((sr.accepted_cap - 0.5) * 10 / 5) * 10000
          total_invite = parseInt(sr.accepted_cap)
          total_mlz = base_s + every_100G + every_500G
        }
        sr.secure_salary = { mlz: total_mlz, invite: total_invite }
        // console.log(sr.secure_salary)

        　　
      });
      window.localStorage.setItem("securers", JSON.stringify(srs));
      state.securers_info = srs
      // console.log('Mutation: Ok, new_securers_info has been added');
    },
    addTodo(state, todo) {
      state.todos.push(todo);
      // console.log('Mutation: Ok, todo has been added');
    },
  },
  actions: {
    update_tr_info({ commit }, new_action) {
      // console.log('Action: Trying to add new_action');
      commit('update_tr_info', new_action);
    },
    update_vuetable_action({ commit }, new_action) {
      // console.log('Action: Trying to add new_action');
      commit('update_vuetable_action', new_action);
    },
    update_vuetable({ commit }, new_vuetable) {
      // console.log('Action: Trying to add vuetable');
      commit('update_vuetable', new_vuetable);
    },
    update_user({ commit }, new_user_info) {
      console.log('Action: Trying to add user_info');
      commit('update_user', new_user_info);
    },
    update_seeds({ commit }, new_seeds_info) {
      // console.log('Action: Trying to add seeds_info');
      commit('update_seeds', new_seeds_info);
    },
    update_securers({ commit }, new_securers_info) {
      // console.log('Action: Trying to add new_securers_info');
      commit('update_securers', new_securers_info);
    },
    addTodo({ commit }, todo) {
      // console.log('Action: Trying to add todo');
      if (!todo || !todo.title) {
        console.error('Invalid todo item');
        return;
      }
      // const result = await api.addTodo(todo);
      const result = true;
      if (result === true) commit('addTodo', todo);
      else console.error('Could not add todo');
    },
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
});

export default store;
