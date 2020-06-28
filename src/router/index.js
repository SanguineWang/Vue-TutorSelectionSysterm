import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { role } from "../store/type";
import { teacherRole } from "../store/type";
import { studentRole } from "../store/type";
import store from "../store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  }
];

const router = new VueRouter({
  routes
});
let adminRouters = [
  {
    path: "/backstage",
    name: "backstage",
    component: () => import("../views/Backstage.vue"),
    children: [
      {
        path: "courses",
        component: () => import("../views/bsview/CourseList.vue")
      },
      {
        props: true,
        path: "courses/:cid",
        component: () => import("../views/bsview/CourseDetail.vue")
      },

      {
        path: "directions",
        component: () => import("../views/bsview/DirectionList.vue")
      },
      {
        props: true,
        path: "directions/:did",
        component: () => import("../views/bsview/DirectionDetail.vue")
      },
      {
        path: "settings",
        component: () => import("../views/bsview/Settings.vue")
      },
      {
        path: "mystudents",
        component: () => import("../views/bsview/MyStudents.vue")
      },
      {
        path: "uppw",
        component: () => import("../views/bsview/UpdatePassword.vue")
      }
    ]
  }
];
let studentRouters = [
  {
    path: "/reception",
    component: () => import("../views/Reception.vue")
  }
];
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
router.beforeEach((to, from, next) => {
  // var rolepath = "/";
  if (to.path != "/") {
    //通过查看state中的isLogin判断是否登录
    if (store.state.login) {
      next(); //表示已经登录
    } else {
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      next({
        name: "home"
      });
    }
  } else {
    // 登录页
    var auth = sessionStorage.getItem(role);
    if (auth != null) {
      if (auth == teacherRole) {
        next({ path: "/backstage/courses" });
      } else if (auth == studentRole) next({ path: "/reception" });
    } else {
      next();
    }
    //继续往后走
  }
});
export function updateRouters() {
  switch (sessionStorage.getItem(role)) {
    case teacherRole:
      router.addRoutes(adminRouters);
      break;
    case studentRole:
      router.addRoutes(studentRouters);
      break;
  }
}
export default router;
updateRouters();
