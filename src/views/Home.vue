<template>
  <v-app>
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="vista = 'login'" text>Inicia Sesión</v-btn>
        <v-btn @click="vista = 'signup'" text>Registro</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <LogIn v-if="vista == 'login'" />
    <SignUp v-if="vista == 'signup'" />
  </v-app>
</template>

<script>
// @ is an alias to /src
// import Welcome from "@/views/Welcome";
import LogIn from "@/views/LogIn";
import SignUp from "@/views/SignUp";

export default {
  name: "home",
  components: {
    SignUp,
    LogIn
  },
  data() {
    return {
      vista: "login"
    };
  }
};
</script>
