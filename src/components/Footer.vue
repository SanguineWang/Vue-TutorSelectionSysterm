<template>
  <div class="myfooter">
    <v-footer absolute color="secondary">
      <v-spacer></v-spacer>

      <p class="ma-2" style="color:white">
        &copy; {{ new Date().getFullYear() }} by
        <a href="https://github.com/SanguineWang" target="_blank"
          >SanguineWang</a
        >
      </p>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "myfooter",
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped></style>
