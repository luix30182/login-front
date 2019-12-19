<template>
  <v-app>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <h1>Registro</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <v-text-field
              v-model="userName"
              placeholder="usuario"
              :single-line="true"
              solo
              clearable
              required
            ></v-text-field>
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              name="input-10-2"
              placeholder="Password"
              class="input-group--focused"
              @click:append="show = !show"
              solo
              clearable
              v-model="password"
            ></v-text-field>

            <v-btn @click="addUser" block color="blue" dark>Registrarme</v-btn>
            <v-snackbar v-model="snackbar" :timeout="2000">
              {{ text }}
              <v-btn color="pink" text @click="snackbar = false">Cerrar</v-btn>
            </v-snackbar>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-app>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      userName: "",
      password: "",
      valid: true,
      show: false,
      text: "",
      snackbar: false,
      user: null
    };
  },
  methods: {
    addUser: function() {
      const bodyC = JSON.stringify({
        nombreUsuario: this.userName,
        password: this.password,
        privilegio: 10
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
        .then(data => {
          if (data["message"]) {
            this.userName = "";
            this.password = "";
            this.text = data["message"];
            this.snackbar = true;
          }
        });
    }
  }
};
</script>
