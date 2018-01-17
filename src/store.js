import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    todo: [],
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
      // console.log('Mutation: Ok, todo has been added');
    },
  },
  actions: {
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
