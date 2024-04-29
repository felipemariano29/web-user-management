<template>
  <div>
    <h2 class="title has-text-centered">Edição de usuário</h2>
    <hr />

    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error">
          <div class="notification is-danger">
            <button @click="error = undefined" class="delete"></button>

            <p class="has-text-white">{{ error }}</p>
          </div>
        </div>
        <label class="label mt-4" for="name">Nome</label>
        <input
          id="name"
          type="text"
          placeholder="Insira o nome"
          class="input"
          v-model="name"
        />

        <label class="label mt-4" for="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Insira o email"
          class="input"
          v-model="email"
        />

        <button class="button is-success mt-5 has-text-white" @click="edit">
          Editar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    const id = this.$route.params.id;

    const token = localStorage.getItem("token");

    const req = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .get(`http://localhost:8686/user/${id}`, req)
      .then((res) => {
        this.user = res.data;
        this.name = this.user.name;
        this.email = this.user.email;
      })
      .catch((err) => {
        console.log(err);
        this.$router.push({ name: "home" });
      });
  },
  data() {
    return {
      name: "",
      email: "",
      error: false,
      user: {},
    };
  },
  methods: {
    edit() {
      const token = localStorage.getItem("token");

      const req = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      axios
        .put(
          "http://localhost:8686/user/" + this.user.id,
          {
            id: this.user.id,
            name: this.name,
            email: this.email,
            role: this.user.role,
          },
          req
        )
        .then(() => {
          this.$router.push({ name: "users" });
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
