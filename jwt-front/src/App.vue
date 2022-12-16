<template>
  <div id="app app-wrapper">
    <button
      class=""
      style="display: block; width: 100%; height: 50px"
      @click="login"
    >
      --------Login-------
    </button>
    <button
      class=""
      style="display: block; width: 100%; height: 50px"
      @click="token"
    >
      --------Token-------
    </button>
    <button
      class=""
      style="display: block; width: 100%; height: 50px"
      @click="user"
    >
      ---------User-------
    </button>
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
        .post(
          "http://localhost:4421/login",
          {
            userName: userName.value,
            password: password.value,
          },
          {
            withCredentials: true,
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .catch((err) => {
          console.log(err.response.data);
        });

      console.log(response);
    };

    const token = async () => {
      const response = await axios
        .get("http://localhost:4421/token", {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        })
        .catch((err) => {
          console.log(err.response.data);
        });

      console.log(response);
    };

    const user = async () => {
      const response = await axios
        .get("http://localhost:4421/get-all-users", {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        })
        .catch((err) => {
          console.log(err.response.data);
        });

      console.log(response);
    };

    return {
      login,
      token,
      user,
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
