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
              v-model="email"
              :rules="emailRules"
              placeholder="E-mail"
              :single-line="true"
              solo
              type="email"
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

            <v-btn @click="logIn" block color="blue" dark>Registrarme</v-btn>
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
      email: "",
      password: "",
      valid: true,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
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
      console.log(this.email);
      /* eslint-disable no-console */
      console.log(this.password);
    }
  }
};
</script>
