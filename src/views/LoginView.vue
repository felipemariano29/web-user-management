<template>
  <div>
    <h2>Login</h2>
    <hr />

    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error">
          <div class="notification is-danger">
            <button @click="error = undefined" class="delete"></button>

            <p class="has-text-white">{{ error }}</p>
          </div>
        </div>
        <label class="label mt-4" for="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Insira o email"
          class="input"
          v-model="email"
        />

        <label class="label mt-4" for="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="Insira a senha"
          class="input"
          v-model="password"
        />

        <button class="button is-success mt-5 has-text-white" @click="login">
          Logar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: false,
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8686/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("token", token);
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          const errorMessage = err.response.data.err;
          this.error = errorMessage;
        });
    },
  },
};
</script>

<style scoped></style>
