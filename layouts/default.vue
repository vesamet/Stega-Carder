<template>
  <v-app>
    <v-main>
      <v-container class="secondary" fill-height fluid>
        <Vignette />
        <transition name="fade" mode="out-in">
          <nuxt />
        </transition>
        <div class="footer">
          <p class="pa-0 ma-0">
            <a
              href="https://github.com/vesamet/Stega-Carder"
              target="_blank"
              class="creator-link"
              >Made by Gwenaël Guyot</a
            >
            <a href="https://github.com/vesamet/Stega-Carder" target="_blank"
              ><button>
                <img src="@/assets/img/github.svg" alt="github" /></button
            ></a>
          </p>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vignette from '@/components/Vignette.vue'
export default {
  name: 'default',
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
  .title {
    // To pin point specific classes of some components
    font-family: $title-font, sans-serif !important;
  }
}
.container {
  margin: 0;
  max-width: 100%;
  overflow-y: auto;
  max-height: 100vh;
  position: relative;
}
.gradient {
  background-image: linear-gradient(
    90deg,
    var(--v-primary-base) 0%,
    var(--v-secondary-base) 100%
  ) !important;
  color: white !important;
}
/* Footer*/
.footer {
  position: absolute;
  right: 5px;
  bottom:  6px;
  pointer-events: all;
  z-index: 3;
}
.footer img {
  width: 20px;
  margin-bottom: -5px;
}
.footer button {
  padding: 3px 3px 0 3px;
}
a.creator-link {
  color: white !important;
  text-shadow: 0 0 3px rgb(57, 29, 158), 0 0 3px black;
  text-decoration: none;
  padding-right: 0px;
}
a::visited {
  color: white;
}

/*Fonts */
.main-title {
  font-size: 2.7em;
  font-family: $title-font;
  background: -webkit-linear-gradient(#9c27b0, #3f51b5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.alt-font {
  font-family: 'Eczar', serif;
}

/* animations/transitions */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
