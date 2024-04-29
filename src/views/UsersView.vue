<template>
  <div>
    <p class="title has-text-centered">Painel Admin</p>

    <div class="columns is-centered">
      <div class="column is-half">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-light"
        >
          <thead>
            <tr>
              <th style="width: auto" class="has-text-centered">ID</th>
              <th style="width: auto" class="has-text-centered">Nome</th>
              <th style="width: auto" class="has-text-centered">Cargo</th>
              <th style="width: auto" class="has-text-centered">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="has-text-centered">{{ user.id }}</td>
              <td style="width: auto">{{ user.name }}</td>
              <td>{{ processedRole(user) }}</td>
              <td class="has-text-centered">
                <div class="buttons is-centered">
                  <button class="button is-success has-text-white">
                    Editar
                  </button>

                  <div class="is-divider-vertical"></div>

                  <button class="button is-danger has-text-white">
                    Deletar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    const token = localStorage.getItem("token");

    const req = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .get("http://localhost:8686/user", req)
      .then((res) => {
        this.users = res.data.users;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      users: [],
    };
  },
  computed: {
    processedRole() {
      return (user) => {
        return user.role === 1 ? "Administrador" : "Usuário";
      };
    },
  },
};
</script>

<style></style>
