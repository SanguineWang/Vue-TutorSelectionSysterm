<template>
  <div class="mystudens">
    <v-row>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" color="secondary" @click="openAddDialog">
        <v-icon>person_add</v-icon>addStudent
      </v-btn>
    </v-row>
    <v-divider></v-divider>
    <!-- 表单 -->
    <v-row>
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">count</th>
                <th class="text-left">学号</th>
                <th class="text-left">name</th>
                <th class="text-left">score</th>
                <th>
                  <v-btn icon color="secondary" @click="buildRemove">
                    <v-icon>build</v-icon>
                    <!-- {{ showRemove }} -->
                  </v-btn>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in students" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.user.number }}</td>
                <td>{{ item.user.name }}</td>
                <td>{{ item.grade }}</td>
                <td>
                  <v-btn
                    icon
                    color="secondary"
                    v-if="showRemove"
                    @click="remove(index, item.id)"
                  >
                    <v-icon>remove</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="12" md="4" class="mx-auto">
        <v-btn
          class="mx-auto"
          color="secondary"
          v-if="showRemove"
          @click="submit"
        >
          <v-icon>check</v-icon>Submit
        </v-btn>
      </v-col>
      {{ students }}
      {{ removelist }}
    </v-row>
    <!-- 添加对话框 -->
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
                  v-model="user.number"
                  :rules="numberRules"
                  :counter="10"
                  label="学号"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="user.name"
                  :counter="3"
                  label="姓名"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="mx-auto">
                <v-btn
                  class="mx-auto"
                  color="secondary"
                  :disabled="!valid"
                  @click="submitStudent"
                >
                  <v-icon>check</v-icon>Submit
                </v-btn>
              </v-col>
              {{ user }}
              {{ removelist }}
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { GET_STUDENTS } from "@/store/type.js";
import { UPDATE_STUDENTS } from "@/store/type.js";
import { ADD_STUDENT } from "@/store/type.js";
export default {
  data() {
    return {
      valid: false,
      numberRules: [v => /[0-9]{10}/.test(v) || "必须是10位数字"],
      dialog: false,
      user: {
        number: "",
        name: ""
      },
      removelist: [],
      // students : this.$store
      showRemove: false
    };
  },
  computed: {
    ...mapState(["students"])
  },
  components: {},
  created() {
    this.$store.dispatch(GET_STUDENTS);
  },
  mounted() {},
  methods: {
    remove(index, sid) {
      this.removelist.push(sid);
      this.$delete(this.students, index);
    },
    buildRemove() {
      this.showRemove = this.showRemove == true ? false : true;
    },
    submit() {
      //提交remove集合
      this.$store.dispatch(UPDATE_STUDENTS, this.removelist);
      this.buildRemove();
    },
    submitStudent() {
      if (this.valid) {
        this.$store.dispatch(ADD_STUDENT, this.user);
        this.openAddDialog();
        this.$store.dispatch(GET_STUDENTS);
      }
    },
    openAddDialog() {
      this.dialog = this.dialog == false ? true : false;
    }
  }
};
</script>
<style scoped></style>
