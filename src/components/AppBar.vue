<template>
  <div>
    <v-app-bar color="secondary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <template v-if="login">
        <v-toolbar-title>Welcome</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-chip class="ma-2" color="white" outlined pill>
          Account: {{ userNumber }}
          <v-icon right>mdi-account-outline</v-icon>
        </v-chip>
      </template>
      <template v-if="!login">
        <v-spacer></v-spacer>
        <Dialog role="teacher" />
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Dialog from "@/components/Dialog.vue";
import { userNumber } from "../store/type";
export default {
  name: "appbar",
  data() {
    return {};
  },
  components: {
    Dialog
  },
  computed: {
    ...mapState(["login"]),
    userNumber() {
      return sessionStorage.getItem(userNumber);
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped></style>
