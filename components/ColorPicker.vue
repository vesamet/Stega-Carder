<template>
  <v-menu
    v-model="isOpen"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
    :nudge-right="13"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        small
        fab
        v-bind="attrs"
        v-on="on"
        class="menu-btn"
      >
        <v-icon>mdi-palette</v-icon>
        <div
          class="pill"
          :style="`background-color: ${color};`"
        ></div>
      </v-btn>
    </template>

    <v-card>
      <v-color-picker
        :value="color"
        @input="(c) => $emit('update:color', c)"
        dot-size="25"
        mode="hexa"
        hide-mode-switch
      ></v-color-picker>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.menu-btn {
  position: relative;
}
.pill {
  position: absolute;
  border-radius: 50%;

  width: 12px;
  height: 12px;
  top: -10px;
  right: -10px;
}
</style>
