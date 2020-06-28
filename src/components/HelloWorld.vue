<template>
  <div class="hello">
    <img alt="logo" src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <p>这里是详细介绍信息</p>

    <Dialog role="student" />
  </div>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
export default {
  name: "HelloWorld",
  data: () => ({
    // isShow: false
  }),
  props: {
    msg: String
  },
  components: {
    Dialog
  }
};
</script>
