<template>
  <v-container fluid>
    <v-row>
      <h1>选择导师</h1>
      <v-spacer></v-spacer>

      <v-btn @click="logout" color="secondary">
        <v-icon>mdi-account-outline</v-icon> {{ mine.user.name }} logout</v-btn
      >
    </v-row>
    <v-divider></v-divider>
    <v-col cols="6">
      <h3>我的导师：{{ myTeacher }}</h3>
    </v-col>
    <v-col cols="6">
      <h3>我的方向：</h3>
      <template v-for="(item, index) in directionChoose">
        <v-chip
          :key="`direcion${index}`"
          class="ma-2"
          color="primary"
          outlined
          pill
        >
          {{ item.name }}
          <v-icon right>star_border</v-icon>
        </v-chip>
      </template>
    </v-col>
    <br />
    <v-col cols="12">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">count</th>
              <th class="text-left">工号</th>
              <th class="text-left">姓名</th>
              <th class="text-left">成绩限制</th>
              <th class="text-left">总名额</th>
              <th class="text-left">已选人数</th>
              <th class="text-left">检查资格</th>
              <th class="text-left">选择方向</th>
              <th class="text-left">选择导师</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in teachers" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.user.number }}</td>
              <td>{{ item.user.name }}</td>
              <td>{{ item.mark_limit }}</td>
              <td>{{ item.upper_limit }}</td>
              <td>{{ selected }}</td>
              <td>
                <v-btn @click="check(item.id)" color="secondary">
                  Check Auth</v-btn
                >
              </td>
              <td>
                <template v-for="(c, index) in directions">
                  <label :key="`lab-${index}`">
                    <input
                      type="checkbox"
                      v-model="selectedD"
                      :value="{ id: c.id }"
                      :key="`input-${index}`"
                    />
                    {{ c.name }}
                  </label>
                  <br :key="`br-${index}`" />
                </template>
              </td>
              <td>
                <v-btn
                  @click="pick(item.id)"
                  color="secondary"
                  :disabled="!canPick"
                >
                  pick</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>

    <v-dialog v-model="isShow" max-width="900px">
      <v-card>
        <v-card-title>
          <h3>Weighted score : {{ mine.grade }}</h3>

          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="isShow = !isShow">
            <v-icon> mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">count</th>
                <th class="text-left">课程名</th>
                <th class="text-left">学分</th>
                <th class="text-left">成绩</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in electives" :key="`check${item.id}`">
                <td>{{ index + 1 }}</td>
                <td>{{ item.course.name }}</td>
                <td>{{ item.course.weight }}</td>
                <td>{{ item.grade }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { USER_LOGOUT } from "../store/type";
import axios from "../axios/myAxios";
export default {
  data() {
    return {
      canPick: false,
      isShow: false,
      mine: {
        user: {
          name: ""
        }
      },
      tid: null,
      teachers: [],
      directions: [],
      directionChoose: [],
      electives: [],
      selected: 0,
      selectedD: []
    };
  },
  computed: {
    myTeacher() {
      let teacher = this.mine.teacher;
      return teacher == null ? "无" : teacher.user.name;
    }
  },
  methods: {
    // postMychoose(tid) {
    //   this.ChooseDirection(tid, this.selectedD);
    // },
    pick(tid) {
      this.pickTeacher(tid);
      this.ChooseDirection(tid, this.selectedD);
    },
    check(tid) {
      this.getSheetAndSelected(tid);
      this.getTeachersDirections(tid);

      this.isShow = !this.isShow;
      let grade =
        this.mine.grade >=
        this.teachers.find(item => item.id == tid).mark_limit;
      console.log(grade);
      let number =
        this.selected <= this.teachers.find(item => item.id == tid).upper_limit;
      console.log(number);

      let teacher = this.mine.teacher == null;
      this.canPick = grade && number && teacher;
      console.log(this.canPick);
    },
    logout() {
      this.$store.dispatch(USER_LOGOUT).then(() => {
        this.$router.go(0);
      });
    },
    async getSheetAndSelected(tid) {
      let resp = await axios.get(`student/teachers/${tid}`);
      this.selected = resp.data.selected;
      this.electives = resp.data.electives;
    },
    async getMine() {
      let resp = await axios.get("student/myInfo");
      this.mine = resp.data.mine;
    },

    async getTeachers() {
      let resp = await axios.get("student/teachers");
      this.teachers = resp.data.teachers;
    },
    async getTeachersDirections(tid) {
      let resp = await axios.get(`student/teachers/${tid}/directions`);
      this.directions = resp.data.directions;
    },

    async pickTeacher(tid) {
      let resp = await axios.get(`student/teachers/${tid}/pick`);

      this.mine = resp.data.mine;
    },
    async ChooseDirection(tid, directions) {
      let resp = await axios.post("student/myDirections", directions);
      this.directionChoose = resp.data.chooseDirections;
    },

    async getMydirections() {
      let resp = await axios.get("student/myDirections");
      this.directionChoose = resp.data.chooseDirections;
    }
  },
  created() {
    this.getMine();
    this.getTeachers().then(() => {});

    this.getMydirections();
  }
};
</script>
>
