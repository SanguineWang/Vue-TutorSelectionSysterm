<template>
  <div class="hello">
    <img alt="logo" src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <LoginDialog role="student" />
  </div>
</template>

<script>
import LoginDialog from "@/components/LoginDialog.vue";
export default {
  name: "HelloWorld",
  data: () => ({
    // isShow: false
  }),
  props: {
    msg: String
  },
  components: {
    LoginDialog
  }
};
</script>
