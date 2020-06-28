<template>
  <div class="myDialog">
    <!-- 激活按钮 -->
    <v-btn
      class="ma-2"
      color="secondary"
      @click="isShow = true"
      v-if="!ifTeacher"
    >
      {{ role }}<v-icon right dark>mdi-arrow-right</v-icon>
    </v-btn>

    <v-btn class="ma-2" outlined v-if="ifTeacher" @click="isShow = true">
      <v-icon left dark>mdi-checkbox-marked-circle</v-icon>
      {{ role }}
    </v-btn>
    <!-- 弹出窗口样式 -->
    <v-dialog v-model="isShow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Enter your account</span>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="isShow = false">
            <v-icon> mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="*ID"
                  required
                  v-model="user.number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" v-if="ifTeacher">
                <v-text-field
                  label="*Password"
                  type="password"
                  required
                  v-model="user.password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small
            >*Please confirm that you are using your own account {{ user }}
          </small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { USER_LOGIN } from "../store/type";
// import axios from "../axios/myAxios";
export default {
  name: "myDialog",
  data() {
    return {
      isShow: false,
      user: {
        number: "",
        password: "123456"
      }
    };
  },
  props: {
    role: String
  },
  computed: {
    ifTeacher() {
      return this.role == "teacher";
    }
  },
  //data只加载一次，异步过来的数据，需要watch他才能得到
  components: {},
  created() {},
  mounted() {},
  methods: {
    login() {
      console.log("click login");
      // var path =
      //   this.user.password == "" ? "/reception" : "/backstage/settings";
      // this.isShow = false;
      this.$store.dispatch(USER_LOGIN, this.user);
    }
  }
};
</script>
<style scoped></style>
