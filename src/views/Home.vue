<template>
  <v-container fluid>
    <v-row>
      <v-col :align="alignment">
        <HelloWorld msg="Welcome to Tutor Selection System" />
        <p>{{ login }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      login: this.$store.state.login,
      alignment: "center",
      justify: "center"
    };
  }
};
</script>
