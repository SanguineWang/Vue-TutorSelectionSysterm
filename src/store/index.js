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
    uid: "",
    number: "",
    name: "",
    mark_limit: "",
    upper_limit: ""
  },
  students: [],
  courses: [
    {
      id: 1,
      name: "Java",
      extra: null,
      weight: 2.0,
      insertTime: "2020-04-04"
    },
    {
      id: 2,
      name: "web系统框架",
      extra: null,
      weight: 2.5,
      insertTime: "2020-04-05"
    },
    {
      id: 3,
      name: "web前端",
      extra: null,
      weight: 2.5,
      insertTime: "2020-04-05"
    }
  ],
  course: {},
  directions: [
    {
      id: 2,
      name: "钉钉/微信等小程序",
      weight: null,
      insertTime: "2020-06-23"
    },
    {
      id: 3,
      name: "Web/微服务",
      weight: null,
      insertTime: "2020-06-23"
    },
    {
      id: 4,
      name: "移动应用开发",
      weight: null,
      insertTime: "2020-06-23"
    }
  ],
  direction: {}
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
  },

  [types.LIST_COURSES](state, data) {
    state.courses = data;
  },
  [types.GET_COURSE](state, data) {
    state.course = data;
  },
  [types.LIST_DIRECTIONS](state, data) {
    state.directions = data;
  },
  [types.GET_DIRECTION](state, data) {
    state.direction = data;
  }
};
//异步方法
const myActions = {
  //登录
  async [types.USER_LOGIN]({ commit }, user) {
    let resp = await axios.post("login", user);
    if (resp != null) {
      commit(types.USER_LOGIN, true);
      //设置session到浏览器，并且更新路由
      setAuthorization(resp, user.number);
      //改变登录状态
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
  // 设置
  async [types.GET_USER]({ commit }) {
    let resp = await axios.get("teacher/settings");
    commit(types.UPDATE_USER, resp.data.teacher);
  },

  async [types.UPDATE_USER]({ commit }, data) {
    let resp = await axios.patch("teacher/settings", data);
    console.log(data);
    commit(types.UPDATE_USER, resp.data.teacher);
  },

  //我的学生
  async [types.GET_STUDENTS]({ commit }) {
    let resp = await axios.get("teacher/myStudents");
    commit(types.LIST_STUDENTS, resp.data.students);
  },

  async [types.ADD_STUDENT]({ commit }, data) {
    await axios.post("teacher/addMyStudent", data);
  },

  // -------------------------------------------------
  async [types.UPDATE_STUDENTS]({ commit }, data) {
    let resp = await axios.patch("teacher/removeMyStudents", data);
    commit(types.LIST_STUDENTS, resp.data.students);
  },
  // 课程curd
  async [types.LIST_COURSES]({ commit }) {
    let resp = await axios.get("courses");
    commit(types.LIST_COURSES, resp.data.courses);
  },
  async [types.GET_COURSE]({ commit }, id) {
    let resp = await axios.get(`courses/${id}`);
    commit(types.GET_COURSE, resp.data.course);
  }
  // 方向curd

  // 导入学生集合
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
