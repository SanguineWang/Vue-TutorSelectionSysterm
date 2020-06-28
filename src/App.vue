<template>
  <v-app id="app">
    <AppBar />
    <v-container fluid>
      <v-row>
        <v-col>
          <!-- 切换视图默认Home -->
          <!-- 登录后不同页面 -->
          <router-view id="firsrRouter" />
        </v-col>
      </v-row>
      <v-row>
        <Footer />
      </v-row>
    </v-container>
    <Exception />
  </v-app>
</template>
<script>
// @ is an alias to /src
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";
// import Home from "./views/Home";
// import { role } from "./store/type";
// import { teacherRole } from "./store/type";
// import { studentRole } from "./store/type";
export default {
  name: "Home",
  components: {
    AppBar,
    Footer,
    // Home,
    Exception: () => import("@/components/Exception.vue")
  },
  data() {
    return {
      login: this.$store.state.login,
      alignment: "center",
      justify: "center"
    };
  },
  // watch: {
  //   login(v) {
  //     this.jump();
  //   }
  // },
  methods: {
    // jump() {
    //   var path = "/";
    //   switch (sessionStorage.getItem(role)) {
    //     case teacherRole:
    //       path = "/backstage/courses";
    //       break;
    //     case studentRole:
    //       path = "/reception";
    //       break;
    //   }
    //   console.log(path);
    //   this.$router.push(path);
    // }
  },
  created() {
    // if (this.login) {
    //  this.methods.jump();
    // }
  }
};
</script>
