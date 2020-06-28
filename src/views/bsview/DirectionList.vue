<template>
  <div>
    <v-row>
      <v-toolbar-title
        ><h1>Direction</h1>
        <h6>方向管理，用于学生选择设计方向</h6>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" color="secondary" @click="openAddDialog">
        <v-icon>mdi-plus</v-icon>addDirection
      </v-btn>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col v-for="(d, index) in directions" :key="index">
        <v-card class="mx-auto" width="300">
          <v-card-text>
            <p class="display-1 text--primary">
              {{ d.name }}
            </p>
            <p>方向</p>
          </v-card-text>
          <v-card-actions>
            <v-btn icon color="secondary" @click="deleteDirection(d.id)">
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="secondary accent-4" @click="router(d.id)">
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
                  v-model="newdirection.name"
                  :counter="10"
                  :rules="nameRules"
                  label="方向名"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="newdirection.weight"
                  :counter="3"
                  :rules="weightRules"
                  label="推荐指数"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="mx-auto">
                <v-btn
                  class="mx-auto"
                  color="secondary"
                  :disabled="!valid"
                  @click="addDirection(newdirection)"
                >
                  <v-icon>check</v-icon>Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- {{ newdirection }}
    {{ directions }} -->
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
export default {
  name: "directions",
  data() {
    return {
      valid: false,
      nameRules: [v => v != "" || "不能为空"],
      weightRules: [v => (v > 0 && v <= 9) || "必须是0-9的数字"],
      dialog: false,
      newdirection: {
        name: "",
        weight: null
      },
      directions: []
    };
  },
  computed: {},
  components: {},
  created() {
    this.getDirections();
  },
  mounted() {},
  methods: {
    openAddDialog() {
      this.dialog = this.dialog == false ? true : false;
    },
    router(did) {
      this.$router.push(`/backstage/directions/${did}`);
    },
    // 集合获取
    async getDirections() {
      let resp = await axios.get("teacher/directions");
      this.directions = resp.data.directions;
    },
    //添加
    async addDirection(direction) {
      let resp = await axios.post("teacher/directions", direction);
      this.directions = resp.data.directions;
      this.openAddDialog();
    },
    //删除
    async deleteDirection(id) {
      let resp = await axios.delete(`teacher/directions/${id}`);
      this.directions = resp.data.directions;
    }
  }
};
</script>
<style scoped></style>
