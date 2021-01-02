<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <h2 class="primary--text">Upload a card</h2>
        <v-file-input
        v-model="file"
          show-size
          :rules="rules"
          truncate-length="15"
          prepend-icon="mdi-card-bulleted-settings"
          label="Stega card to decode"
          accept="image/png"
        ></v-file-input>
      </v-col>
      <v-col cols="12" md="6"></v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      rules: [
        (value) =>
          !value ||
          value.type === "image/png" ||
          `Error: the file should be a .png image.`,
      ],
    }
  },
  methods: {
    validate(e) {
      console.log(e.type)
    },
    loadImage() {
      let card = new Image()
      card.src = 'img/base.png'
      card.onload = function () {
        context.drawImage(card, 0, 0)
      }
    },
    decode() {
      this.$nextTick(() => {
        let dataArea = this.clone(this.getDataAreaBounds())
        const ctx = this.$refs.card.getContext('2d')
        let dataArray = []
        let abort = false
        console.log(
          ctx.getImageData(dataArea.start[0] + 5, dataArea.start[1], 1, 1)
        )
        console.log(
          ctx.getImageData(dataArea.start[0] + 4, dataArea.start[1], 1, 1)
        )
        for (let y = dataArea.start[1]; y < dataArea.end[1]; y++) {
          for (let x = dataArea.start[0]; x < dataArea.end[0]; x++) {
            let pixel = ctx.getImageData(x, y, 1, 1).data
            if (pixel[3] === 254) {
              abort = true
              break
            }
            dataArray.push(pixel[0])
            dataArray.push(pixel[1])
            dataArray.push(pixel[2])
          }
          if (abort === true) {
            break
          }
        }
        console.log(dataArray)
        console.log(pako.inflate(new Uint8Array(dataArray), { to: 'string' }))
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
