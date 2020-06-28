<template>
  <div class="Setting">
    <v-row>
      <v-toolbar-title>Settings</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-row>
    <v-divider></v-divider>

    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.upper_limit"
              :rules="limitRules"
              :counter="2"
              label="限制人数"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.mark_limit"
              :rules="markRules"
              :counter="3"
              label="成绩限制"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="mx-auto">
            <v-btn
              class="mx-auto"
              color="secondary"
              :disabled="!valid"
              @click="submit"
            >
              <v-icon>check</v-icon>Submit
            </v-btn>
          </v-col>
          {{ user }}
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import { UPDATE_USER } from "@/store/type.js";
import { GET_USER } from "@/store/type.js";
import { mapState } from "vuex";
export default {
  name: "Setting",
  data() {
    return {
      // user: this.$store.state.user,
      // user:
      valid: false,
      limitRules: [
        v => /[0-9]{1,2}/.test(v) || "必须是1-2位数字",
        v => v < 100 || "成绩必须小于等于100"
      ],
      markRules: [
        v => /[0-9]{1,3}/.test(v) || "成绩必须是数字",
        v => v <= 100 || "成绩必须小于等于100"
      ]
    };
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {},
  components: {},
  created() {
    this.$store.dispatch(GET_USER);
  },
  mounted() {},
  methods: {
    submit() {
      if (this.valid) {
        this.$store.dispatch(UPDATE_USER, this.user);
      }
    }
  }
};
</script>
<style scoped></style>
