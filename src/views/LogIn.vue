<template>
  <v-app>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <h1>Inicia Sesión</h1>
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
              :rules="[rules.required]"
              :type="show ? 'text' : 'password'"
              name="input-10-2"
              placeholder="Password"
              class="input-group--focused"
              @click:append="show = !show"
              solo
              clearable
              v-model="password"
            ></v-text-field>

            <v-btn @click="logIn" block color="blue" dark>Entrar</v-btn>
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
      rules: {
        required: value => !!value || "Required."
      },
      show: false,
      text: "",
      snackbar: false,
      user: null
    };
  },
  methods: {
    logIn: function() {
      /* eslint-disable no-console */
      fetch(`/api/user/${this.userName}`)
        .then(blob => blob.json())
        .then(data => {
          if (data[0].password == this.password) {
            if (data[0].privilegio == 100) {
              this.$router.push({
                name: "Admin",
                params: { user: data[0].nombreUsuario }
              });
            } else {
              this.$router.push({
                name: "Welcome",
                params: { user: data[0].nombreUsuario }
              });
            }
          } else {
            this.text = "verifica tus datos";
            this.snackbar = true;
          }
        });
    }
  }
};
</script>
