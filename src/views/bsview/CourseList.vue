<template>
  <div>
    <v-row>
      <v-toolbar-title
        ><h1>Course</h1>
        <h6>课程管理，用于录入成绩</h6>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" color="secondary" @click="openAddDialog">
        <v-icon>mdi-plus</v-icon>addCourse
      </v-btn>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col v-for="(c, index) in courses" :key="index">
        <v-card class="ma-auto" width="300">
          <v-card-text>
            <p class="display-1 text--primary">
              {{ c.name }}
            </p>

            <p>课程</p>
            <div class="text--primary">
              所占权重<br />
              {{ c.weight }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn icon color="secondary" @click="deleteCourse(c.id)">
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="secondary accent-4" @click="router(c.id)">
              More <v-icon right dark>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="openAddDialog">
            <v-icon> mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="newcourse.name"
                  :counter="10"
                  :rules="nameRules"
                  label="课程名"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="newcourse.weight"
                  :rules="weightRules"
                  :counter="2"
                  label="权重"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="newcourse.extra"
                  :counter="20"
                  label="说明"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="mx-auto">
                <v-btn
                  class="mx-auto"
                  color="secondary"
                  :disabled="!valid"
                  @click="addCourse(newcourse)"
                >
                  <v-icon>check</v-icon>Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
export default {
  data() {
    return {
      valid: false,
      weightRules: [v => v <= 10 || "必须小于等于10"],
      nameRules: [v => v != "" || "不能为空"],
      dialog: false,
      newcourse: {
        name: "",
        weight: 0.0,
        extra: ""
      },
      courses: []
    };
  },
  computed: {},
  components: {},
  created() {
    //首先异步加载数据
    this.getCourses();
  },
  mounted() {},
  methods: {
    openAddDialog() {
      this.dialog = this.dialog == false ? true : false;
    },
    router(cid) {
      this.$router.push(`/backstage/courses/${cid}`);
    },

    // 课程集合获取
    async getCourses() {
      let resp = await axios.get("teacher/courses");
      this.courses = resp.data.courses;
    },
    //添加课程
    async addCourse(course) {
      let resp = await axios.post("teacher/courses", course);
      this.courses = resp.data.courses;
      this.openAddDialog();
    },
    //删除课程
    async deleteCourse(id) {
      let resp = await axios.delete(`teacher/courses/${id}`);
      this.courses = resp.data.courses;
    }
  }
};
</script>
<style scoped></style>
