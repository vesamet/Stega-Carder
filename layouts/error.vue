<template>
  <v-app>
    <v-main>
      <v-container class="secondary" fill-height fluid style="width: 100vw;">
        <Vignette />
        <v-row justify="center" align="center">
          <v-col class="text-center">
        <h1 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h1>
        <h1 v-else>
          {{ otherError }}
        </h1>
        <v-btn class="info" @click="$router.push({path: '/'})">Home</v-btn>
        </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vignette from '@/components/Vignette.vue';
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
      components: {
      Vignette,
    },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
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
    position: relative;
  }
h1 {
  font-size: 2em;
  color: white;
}
</style>
