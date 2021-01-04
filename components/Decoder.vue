<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h2 class="primary--text alt-font">Upload a card</h2>
        <v-form ref="form" v-model="valid">
          <v-file-input
            v-model="file"
            show-size
            :rules="rules"
            prepend-icon="mdi-card-bulleted-settings"
            label="Stega card to decode"
            accept="image/png"
            :truncate-length="44"
          ></v-file-input>
        </v-form>
        <div class="card-box">
          <canvas
            ref="card"
            v-show="file"
            class="card"
            :class="decoded ? 'animate__animated animate__headShake' : ''"
            :width="cardWidth"
            :height="cardHeight"
          ></canvas>
        </div>
        <br />
        <v-btn
          v-if="!decoded"
          color="primary"
          :disabled="!file || !valid"
          @click="loadImage()"
          >Decode</v-btn
        >
      </v-col>
      <v-col cols="12" md="6">
        <h2 class="primary--text alt-font">Decoded text</h2>
        <v-textarea
          v-if="output"
          v-model="output"
          outlined
          dense
          label="Decoded text"
          class="mt-5"
          :rows="10"
        ></v-textarea>
        <h3 v-else class="secondary--text mt-4">
          Upload a card to see it's content.
        </h3>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import card from '@/mixins/card'
import pako from 'pako'
export default {
  mixins: [card],
  data() {
    return {
      valid: false,
      file: null,
      rules: [
        (value) =>
          !value ||
          value.type === 'image/png' ||
          `Error: the file should be a .png image.`,
      ],
      output: '',
      decoded: false,
    }
  },
  methods: {
    validate(e) {
      console.log(e.type)
    },
    loadImage() {
      this.$nextTick(() => {
        let file = this.file
        let fr = new FileReader()
        let createImage = () => {
          let img = new Image()
          let imageLoaded = () => {
            let ctx = this.$refs.card.getContext('2d')
            this.cardWidth = img.width
            this.cardHeight = img.height
            this.$nextTick(() => {
              ctx.drawImage(img, 0, 0)
              this.decode()
              this.decoded = true
            })
          }
          img.onload = imageLoaded
          img.src = fr.result
        }
        fr.onload = createImage // onload fires after reading is complete
        fr.readAsDataURL(file)
      })
    },
    decode() {
      this.$nextTick(() => {
        let dataArea = this.clone(this.getDataAreaBounds())
        const ctx = this.$refs.card.getContext('2d')
        let dataArray = []
        let abort = false
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
        this.output = pako.inflate(new Uint8Array(dataArray), { to: 'string' })
      })
    },
  },
  watch: {
    file(value) {
      this.decoded = false
      this.output = ''
      this.cardWidth = 0
      this.cardHeight = 0
    },
  },
}
</script>

<style lang="scss" scoped>
.card-box {
  overflow: auto;
  position: relative;
  text-align: center;
  margin: auto;
}
</style>
