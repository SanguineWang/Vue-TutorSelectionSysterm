/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import * as types from "./type";
import axios from "../axios/myAxios";
import { updateRouters } from "../router";
Vue.use(Vuex);
//数据
const myState = {
  exception: { message: null },
  login: false,
  user: {
    id: 1,
    // user: {
    //   id: null,
    //   name: "",
    //   number: null,
    //   insertTime: ""
    // },
    upper_limit: null,
    mark_limit: null,
    insertTime: ""
  },
  students: []
};
//同步方法
const myMutations = {
  [types.USER_LOGIN](state, data) {
    state.login = data;
  },
  [types.SHOW_EXCEPTION](state, data) {
    state.exception = data;
  },

  //获取user
  [types.UPDATE_USER](state, data) {
    state.user = data;
  },

  [types.LIST_STUDENTS](state, data) {
    state.students = data;
  }
};
//异步方法
const myActions = {
  //登录 ！存在页面不跳转问题
  async [types.USER_LOGIN]({ commit }, user) {
    let resp = await axios.post("login", user);
    if (resp != null) {
      //改变登录状态
      commit(types.USER_LOGIN, true);
      //设置session到浏览器，并且更新路由
      setAuthorization(resp, user.number);
    }
  },
  //登出
  [types.USER_LOGOUT]({ commit }) {
    //如何设置监听，登录状态为false就路由到首页:"/"
    //需要清理路由和session，并回退到首页，设置登录状态为false
    sessionStorage.clear();
    // window.
    commit(types.USER_LOGIN, false);
  },
  //设置： 获取，更新
  async [types.GET_USER]({ commit }) {
    let resp = await axios.get("teacher/settings");
    commit(types.UPDATE_USER, resp.data.teacher);
  },
  async [types.UPDATE_USER]({ commit }, data) {
    let resp = await axios.patch("teacher/settings", data);
    console.log(data);
    commit(types.UPDATE_USER, resp.data.teacher);
  },
  //我的学生 ：获取 添加 批量删除
  async [types.GET_STUDENTS]({ commit }) {
    let resp = await axios.get("teacher/myStudents");
    commit(types.LIST_STUDENTS, resp.data.students);
  },
  async [types.ADD_STUDENT]({ commit }, data) {
    await axios.post("teacher/addMyStudent", data);
  },
  async [types.UPDATE_STUDENTS]({ commit }, data) {
    let resp = await axios.patch("teacher/removeMyStudents", data);
    commit(types.LIST_STUDENTS, resp.data.students);
  }
};
export default new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});

// 页面刷新后检测是否还有登录状态，执行时判断，刷新时检测,默认没有状态；也可以添加长度等更严格判断
if (sessionStorage.getItem(types.author) != null) {
  myState.login = true;
}
// 函数
function setAuthorization(response, number) {
  let token = response.headers["authorization"];
  let role = response.data.role;
  if (token != null) {
    sessionStorage.setItem(types.author, token);
    sessionStorage.setItem(types.role, role);
    sessionStorage.setItem(types.userNumber, number);
    updateRouters();
  }
}
