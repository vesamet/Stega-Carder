<template>
  <v-app>
    <v-main>
      <v-container class="secondary" fill-height fluid>
        <Vignette />
        <transition name="fade" mode="out-in">
        <nuxt />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vignette from '@/components/Vignette.vue';
  export default {
    name: "default",
    components: {
      Vignette,
    },
  }

</script>

<style lang="scss">
  html {
    overflow-y: hidden;
  }
  .v-application {
    font-family: $body-font-family, sans-serif !important;
      .title { // To pin point specific classes of some components
        font-family: $title-font, sans-serif !important;
      }
  }
  .container {
    margin:0;
    max-width: 100%;
    overflow-y: auto;
    max-height: 100vh;
    position: relative;
  }
  .gradient {
    background-image: linear-gradient(90deg, var(--v-primary-base) 0%, var(--v-secondary-base) 100%) !important;
    color: white !important;
  }
  /*Fonts */
  .main-title {
  font-size: 2.7em;
  font-family: $title-font;
  background: -webkit-linear-gradient(#9c27b0, #3f51b5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
