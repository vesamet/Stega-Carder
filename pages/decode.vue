<template>
  <v-row justify="center" align="center">
    <v-col class="main-col text-center">
      <v-card class="py-6 px-9">
        <h1 class="main-title">Stega Carder</h1>
        <v-divider class="py-3"></v-divider>
        <v-btn
          color="accent"
          fab
          small
          absolute
          top
          right
          @click="$router.push({ path: '/' })"
        >
          <v-icon>mdi-home</v-icon></v-btn
        >
        <Decoder />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Decoder from '@/components/Decoder.vue'
export default {
  components: {
    Decoder,
  },
}
</script>
<style lang="scss" scoped>
.main-col {
  max-width: 1500px;
}
</style>
