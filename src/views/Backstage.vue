<template>
  <v-container fluid>
    <v-col>
      <v-progress-linear :buffer-value="finish" stream height="25" color="cyan">
        <strong> 已完成{{ finish }}%</strong>
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
export default {
  name: "backstage",
  data() {
    return {
      init: 10,
      selected: 5
    };
  },
  components: {
    Drawer
  },
  computed: {
    finish() {
      return (this.selected / this.init) * (100).toFixed(2);
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped></style>
