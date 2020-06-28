<template>
  <div class="Setting">
    <v-row>
      <v-toolbar-title
        ><h1>Settings</h1>
        <h6>
          导入成绩之后，设置人数和限制成绩,计算加权，再根据需求调整成绩限制和人数
        </h6>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="twoWaySelection">
        <v-icon> gavel</v-icon>
        Calculation weighting</v-btn
      >
    </v-row>
    <v-divider></v-divider>

    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.upper_limit"
              :rules="limitRules"
              :counter="2"
              label="限制人数"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.mark_limit"
              :rules="markRules"
              :counter="3"
              label="成绩限制"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="mx-auto">
            <v-btn
              class="mx-auto"
              color="secondary"
              :disabled="!valid"
              @click="submit"
            >
              <v-icon>cached</v-icon>update
            </v-btn>
          </v-col>
        </v-row>
        <!-- <v-btn @click="qualifiedStudents"> qualified</v-btn> -->
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
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { UPDATE_USER } from "@/store/type.js";
import { GET_USER } from "@/store/type.js";
import { mapState } from "vuex";
import axiox from "@/axios/myAxios.js";
export default {
  name: "Setting",
  data() {
    return {
      students: [],
      valid: false,
      limitRules: [
        v => /[0-9]{1,2}/.test(v) || "必须是1-2位数字",
        v => v < 100 || "成绩必须小于等于100"
      ],
      markRules: [
        v => /[0-9]{1,3}/.test(v) || "成绩必须是数字",
        v => v <= 100 || "成绩必须小于等于100"
      ]
    };
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {},
  components: {},
  created() {
    this.$store.dispatch(GET_USER).then(() => {
      if (this.user.mark_limit != null) this.qualifiedStudents();
    });
  },
  mounted() {},
  methods: {
    submit() {
      if (this.valid) {
        this.$store
          .dispatch(UPDATE_USER, this.user)
          .then(() => {
            this.qualifiedStudents();
          })
          .then(() => {
            this.$router.go(0);
          });
      }
    },
    async twoWaySelection() {
      let resp = await axiox.get("teacher/start");
      this.students = resp.data.students;
    },
    async qualifiedStudents() {
      if (this.user.mark_limit != null) {
        let resp = await axiox.get("teacher/qualified");
        this.students = resp.data.students;
      }
    }
  }
};
</script>
<style scoped></style>
