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
                  <router-link
                    :to="{ name: 'users-edit', params: { id: user.id } }"
                    ><button class="button is-success has-text-white">
                      Editar
                    </button></router-link
                  >

                  <div class="is-divider-vertical"></div>

                  <button
                    @click="showModal(user.id)"
                    class="button is-danger has-text-white"
                  >
                    Deletar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="modal has-text-centered has-text-white"
      :class="{ 'is-active': isModalActive }"
    >
      <div class="modal-background" @click="hideModal()"></div>

      <div class="modal-content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Você realmente deseja deletar este usuário?
            </p>
          </header>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" @click="hideModal()"
              >Cancelar</a
            >
            <a href="#" class="card-footer-item" @click="deleteUser(selectedId)"
              >Sim, quero deletar!</a
            >
          </footer>
        </div>
      </div>

      <button
        @click="hideModal()"
        class="modal-close is-large"
        aria-label="close"
      ></button>
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
      isModalActive: false,
      selectedId: null,
    };
  },
  methods: {
    hideModal() {
      this.isModalActive = false;
    },
    showModal(id) {
      this.isModalActive = true;
      this.selectedId = id;
    },
    deleteUser(id) {
      const token = localStorage.getItem("token");

      const req = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      axios
        .delete(`http://localhost:8686/user/${id}`, req)
        .then((res) => {
          console.log(res.data);
          this.hideModal();
          this.users = this.users.filter((user) => user.id !== id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
