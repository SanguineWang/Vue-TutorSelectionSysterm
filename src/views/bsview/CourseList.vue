<template>
  <div>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" color="secondary">
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
            <v-btn icon color="secondary">
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
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { LIST_COURSES } from "";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["courses"])
  },
  components: {},
  created() {
    //首先异步服务器加载集合数据
    // this.$store.dispatch("listCourses");
  },
  mounted() {},
  methods: {
    router(cid) {
      this.$router.push(`/backstage/courses/${cid}`);
    }
  }
};
</script>
<style scoped></style>
