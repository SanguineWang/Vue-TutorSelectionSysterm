<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title
        ><h3>{{ direction.name }}</h3>
      </v-toolbar-title>
      <v-subheader> {{ direction.weight }} </v-subheader>

      <v-spacer></v-spacer>
      <div>
        <v-btn>
          <v-icon>build</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-divider></v-divider>
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
          <tr v-for="(item, index) in students" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.user.number }}</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.grade }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
export default {
  props: ["did"],
  data() {
    return {
      students: [],
      direction: {
        name: "",
        weight: ""
      }
    };
  },
  components: {},
  created() {
    this.getDirectionDetail(this.did);
    this.getDirectionStudents(this.did);
  },
  mounted() {},
  methods: {
    //获取详细
    async getDirectionDetail(id) {
      let resp = await axios.get(`teacher/directions/${id}`);
      this.direction = resp.data.direction;
    },
    //修改
    async updateDirection(id) {
      let resp = await axios.patch(`teacher/directions/${id}`);
      this.direction = resp.data.direction;
    },
    //获取学生
    async getDirectionStudents(id) {
      let resp = await axios.get(`teacher/directions/${id}/students`);
      this.students = resp.data.students;
    }
  }
};
</script>
<style scoped></style>
