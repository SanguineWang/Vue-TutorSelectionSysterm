<template>
  <p>{{ cid }}</p>
</template>

<script>
// import { mapState } from "vuex";
export default {
  props: ["cid"],
  data() {
    return {};
  },
  computed: {
    // ...mapState("course")
  },
  components: {},
  created() {
    // this.$store.dispatch("getCourse");
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped></style>
