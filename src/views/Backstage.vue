<template>
  <v-container fluid>
    <v-col>
      <v-progress-linear :buffer-value="finish" stream height="25" color="cyan">
        <strong> 已选 {{ selected }}:{{ limited }} </strong>
      </v-progress-linear>
    </v-col>
    <v-row>
      <v-col cols="3">
        <!-- 侧边导航 -->
        <Drawer />
      </v-col>
      <v-col cols="9">
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Drawer from "@/components/Drawer.vue";
import axios from "@/axios/myAxios.js";
export default {
  name: "backstage",
  data() {
    return {
      limited: 10,
      selected: 0
    };
  },
  components: {
    Drawer
  },
  computed: {
    finish() {
      return (this.selected / this.limited) * (100).toFixed(2);
    }
  },
  created() {
    this.getLimitedAndSelected();
  },
  mounted() {},
  methods: {
    async getLimitedAndSelected() {
      let resp = await axios.get("teacher/selected");
      this.limited = resp.data.limited;
      this.selected = resp.data.selected;
    }
  }
};
</script>
<style scoped></style>
