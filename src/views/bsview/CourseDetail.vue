<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title
          ><h1>{{ course.name }}</h1>
        </v-toolbar-title>
        <v-subheader>
          {{ course.weight }}
        </v-subheader>

        <v-spacer></v-spacer>
        <div>
          <v-btn>
            <v-icon>build</v-icon>
          </v-btn>
        </div>
      </v-toolbar>

      <v-row>
        <v-col class="ma-6">
          <v-file-input
            show-size
            counter
            chips
            multiple
            label="Import students"
            @change="read"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">count</th>
            <th class="text-left">学号</th>
            <th class="text-left">name</th>
            <th class="text-left">score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in electives" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.student.user.number }}</td>
            <td>{{ item.student.user.name }}</td>
            <td>{{ item.grade }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
import { readStudentsFile } from "@/util/analysisExcel.js";
export default {
  props: ["cid"],
  data() {
    return {
      electives: [],
      course: {
        name: "",
        weight: 0.0
      }
    };
  },
  computed: {},
  components: {},
  created() {
    this.getCourseDetail(this.cid);
    this.getCourseStudents(this.cid);
  },
  mounted() {},
  methods: {
    //读取文件
    read(files) {
      let file = files[0];
      readStudentsFile(file).then(data => {
        this.addCoursesStudents(this.course.id, data);
      });
    },
    //获取指定课程详细
    async getCourseDetail(id) {
      let resp = await axios.get(`teacher/courses/${id}`);
      this.course = resp.data.course;
    },
    //修改课程信息
    async updateCourse(id) {
      let resp = await axios.patch(`teacher/courses/${id}`);
      this.course = resp.data.course;
    },
    //获取课程的学生
    async getCourseStudents(id) {
      let resp = await axios.get(`teacher/courses/${id}/students`);
      this.electives = resp.data.electives;
    },
    //导入学生
    async addCoursesStudents(id, students) {
      let resp = await axios.post(`teacher/courses/${id}/students`, students);
      this.electives = resp.data.electives;
    }
  }
};
</script>
<style scoped></style>
