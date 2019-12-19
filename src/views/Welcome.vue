<template>
  <v-app>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <h3 class="text-center display-4 font-weight-thin">Bienvenido</h3>
        <h1 class="text-center font-weight-thin">
          {{ this.$route.params.user }}
        </h1>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  props: {
    user: null
  },
  beforeMount() {
    if (!this.$route.params.user) {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
