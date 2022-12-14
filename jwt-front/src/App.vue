<template>
  <div id="app app-wrapper">
    <button class="" @click="login">--------Fetch-------</button>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
export default {
  setup() {
    const userName = ref("qwde");
    const password = ref("password");

    const login = async () => {
      const response = await axios
        .post("http://localhost:4421/login", {
          userName: userName.value,
          password: password.value,
        })
        .catch((err) => {
          console.log(err.response.data);
        });

      console.log(response);
    };
    return {
      login,
    };
  },
  components: {},
  created() {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
