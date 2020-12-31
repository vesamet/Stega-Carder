<template>
  <v-row justify="center" align="center">
    <v-col class="main-col text-center">
      <v-card class="py-6 px-9">
        <h1 class="main-title">Stega Carder</h1>
        <p>
          A tool to encode any text into an cartridge-like image using
          <a href="https://en.wikipedia.org/wiki/Steganography" rel="noopener"
            >steganography</a
          >.<br />
        </p>
        <img src="~/assets/img/deconstructed.svg" class="welcome-image" />
        <v-tooltip left color="white" content-class="about-tooltip">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="accent"
              fab
              small
              absolute
              top
              right
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-information-variant</v-icon>
            </v-btn>
          </template>
          <p class="primary--text">
            This tool aim to offer a
            <strong class="secondary--text"
              >refreshing and singular approach to share text</strong
            >, code or even entire library, in an elegant way.<br /><br />
            The
            <strong><i class="secondary--text">stega card</i></strong> generated
            is essentially a common <i>.png</i> image. <br />It can therefore be
            viewed/uploaded anywhere.<br />
          </p>
        </v-tooltip>
        <v-btn color="secondary" class="action-btn" large absolute bottom left @click="$router.push({path: '/import'})">
          <img src="~/assets/img/import.svg" alt="Decode image" />
          <span class="pa-3">Decode</span></v-btn
        >
        <v-btn color="primary" class="action-btn" large absolute bottom right @click="$router.push({path: '/create'})">
          <span class="pa-3">Create</span>
          <img src="~/assets/img/create-card.svg" alt="Create image" />
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
.welcome-image {
  width: 90%;
}
.main-col {
  max-width: 600px;
}
.about-tooltip {
  font-size: 1.2em;
  max-width: 500px;
  padding: 15px;
  box-shadow: 0 0 30px #613db6;
}
.about-tooltip p {
  padding: 0;
  margin: 0;
  font-weight: 1.3em;
}
.action-btn {
  font-size: 1.4em;
}
.action-btn img {
  width: 30px;
  display: block;
}
</style>
