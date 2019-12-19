<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <h1 class="display-2">Admin</h1>
        </v-col>
        <v-col cols="12" md="7">
          <h3>Agregar usuario nuevo</h3>
        </v-col>
        <v-col cols="12" md="7">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Usuario</th>
                  <th class="text-left">Password</th>
                  <th class="text-left">Privilegio</th>
                  <th class="text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <v-text-field
                      :flat="true"
                      v-model="userName"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      :flat="true"
                      v-model="password"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-select
                      :items="privilegios"
                      label="Privilegio"
                      v-model="privilegio"
                    ></v-select>
                  </td>
                  <td>
                    <v-btn
                      @click="addUser()"
                      fab
                      small
                      color="primary"
                      class="mx-2"
                      ><v-icon dark>mdi-content-save</v-icon></v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col cols="12" md="7">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Usuario</th>
                  <th class="text-left">Password</th>
                  <th class="text-left">Privilegio</th>
                  <th class="text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in users" :key="item.i">
                  <td>
                    <v-text-field
                      :value="item.nombreUsuario"
                      :flat="true"
                      :disabled="true"
                      v-model="users[i].nombreUsuario"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      :value="item.password"
                      :flat="true"
                      v-model="users[i].password"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-select
                      :items="privilegios"
                      label="Privilegio"
                      v-model="users[i].priv"
                    ></v-select>
                  </td>
                  <td>
                    <v-btn
                      @click="updateUser(i)"
                      fab
                      small
                      color="primary"
                      class="mx-2"
                      ><v-icon dark>mdi-content-save</v-icon></v-btn
                    >
                    <v-btn
                      @click="deleteUser(item.nombreUsuario)"
                      fab
                      small
                      color="error"
                      class="mx-2"
                      ><v-icon dark>mdi-delete</v-icon></v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      privilegios: ["Admin", "User"],
      userName: "",
      password: "",
      privilegio: ""
    };
  },
  methods: {
    getPrivilegio: function(priv) {
      if (priv == 100) {
        return this.privilegios[0];
      } else {
        return this.privilegios[1];
      }
    },
    getUsers: function() {
      this.users = [];
      fetch("/api/users")
        .then(blob => blob.json())
        .then(data => {
          data.forEach(element => {
            element.priv = this.getPrivilegio(element.privilegio);
            this.users.push(element);
          });
        });
    },
    deleteUser: function(id) {
      fetch(`/api/user/${id}`, { method: "DELETE" }).then(() =>
        this.getUsers()
      );
    },
    updateUser: function(id) {
      const body = JSON.stringify({
        password: this.users[id].password,
        privilegio: this.users[id].priv == "Admin" ? 100 : 10
      });

      fetch(`/api/user/${this.users[id].nombreUsuario}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: body
      })
        .then(blob => blob.json())
        .then(() => {
          this.getUsers();
        });
    },
    addUser: function() {
      const bodyC = JSON.stringify({
        nombreUsuario: this.userName,
        password: this.password,
        privilegio: this.privilegio == "Admin" ? 100 : 10
      });

      fetch(`/api/user/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: bodyC
      })
        .then(blob => blob.json())
        .then(() => {
          this.getUsers();
          this.userName = "";
          this.password = "";
          this.privilegio = 0;
        });
    }
  },
  beforeMount() {
    if (!this.$route.params.user) {
      this.$router.push({
        path: "/"
      });
    }
    this.getUsers();
  }
};
</script>
