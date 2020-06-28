<template>
  <div>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" color="secondary">
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
            <v-btn icon color="secondary">
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="secondary accent-4">
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
export default {
  name: "directions",
  data() {
    return {
      // directions: [
      //   {
      //     id: 1,
      //     name: "当前企业实习项目",
      //     weight: null,
      //     insertTime: "2020-06-23"
      //   },
      //   {
      //     id: 2,
      //     name: "钉钉/微信等小程序",
      //     weight: null,
      //     insertTime: "2020-06-23"
      //   },
      //   {
      //     id: 3,
      //     name: "Web/微服务",
      //     weight: null,
      //     insertTime: "2020-06-23"
      //   },
      //   {
      //     id: 4,
      //     name: "移动应用开发",
      //     weight: null,
      //     insertTime: "2020-06-23"
      //   }
      // ]
    };
  },
  computed: {
    ...mapState(["directions"])
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped></style>
