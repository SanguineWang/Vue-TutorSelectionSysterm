<template>
  <v-card height="400" width="256">
    <v-navigation-drawer class="secondary" dark permanent>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="routeTo(item.path)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2" @click="logout">
          <v-btn block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { USER_LOGOUT } from "../store/type";
export default {
  name: "drawar",
  data() {
    return {
      items: [
        { title: "Course", icon: "dashboard", path: "/backstage/courses" },
        { title: "Direction", icon: "gavel", path: "/backstage/directions" },
        { title: "Settings", icon: "account_box", path: "/backstage/settings" },
        { title: "MyStudents", icon: "face", path: "/backstage/mystudents" },
        { title: "UpdatePassword", icon: "vpn_key", path: "/backstage/uppw" }
      ]
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    logout() {
      console.log("click logout");
      this.$store.dispatch(USER_LOGOUT).then(() => {
        this.$router.push("/");
      });
    },
    routeTo(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style scoped></style>
