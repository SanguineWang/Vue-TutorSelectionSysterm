<template>
  <div class="uppw">
    <v-container>
      <v-form v-model="valid">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="oldpw"
              :rules="oldpwRules"
              label="旧密码"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="newpw"
              :rules="newpwRules"
              label="新密码"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="mx-auto">
            <v-btn
              class="mx-auto"
              color="secondary"
              :disabled="!valid"
              @click="updatepw"
            >
              <v-icon>cached</v-icon>update
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from "@/axios/myAxios.js";
import { USER_LOGOUT } from "@/store/type.js";
export default {
  name: "uppw",
  data() {
    return {
      valid: false,
      oldpw: "",
      newpw: "",
      oldpwRules: [v => v != "" || "不能为空"],
      newpwRules: [v => v != "" || "不能为空"]
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    updatepw() {
      this.uppw().then(() => {
        this.$store.dispatch(USER_LOGOUT).then(() => {
          this.$router.push("/");
        });
      });
    },
    async uppw() {
      await axios.post("teacher/updatePassword", [this.oldpw, this.newpw]);
    }
  }
};
</script>
<style scoped></style>
