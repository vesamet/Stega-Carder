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
            outlined
            dense
            :truncate-length="44"
          ></v-file-input>
          <v-text-field
            dense
            v-model="secret"
            label="Password (optional)"
            @input="
              decoded = false
              wrongPassword = false
            "
            :error="wrongPassword"
            outlined
            prepend-icon="mdi-key"
            persistent-hint
            hint="If the card is encrypted, enter it's password."
          ></v-text-field>
          <v-btn
            v-if="!decoded"
            color="primary"
            block
            :disabled="!file || !valid"
            @click="loadImage()"
            >Decode</v-btn
          >
          <v-divider class="my-3"></v-divider>
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
      </v-col>
      <v-col cols="12" md="6">
        <h2 class="primary--text alt-font">Decoded text</h2>
        <h3
          v-if="isEncrypted && decoded && wrongPassword"
          class="error--text mt-4"
        >
          Uh oh! Wrong password.<br />Try something else.
        </h3>
        <h3
          v-if="!isEncrypted && decoded && !output"
          class="secondary--text mt-4"
        >
          This card is empty.<br />Empty as the cyber void...
        </h3>
        <h3 v-if="!file" class="secondary--text mt-4">
          Upload a card to see it's content.
        </h3>
        <h3 v-if="file && !decoded" class="secondary--text mt-4">
          Press the "decode" button to decode.
        </h3>
        <v-textarea
          v-if="output"
          v-model="output"
          outlined
          dense
          label="Decoded text"
          class="mt-5"
          :rows="10"
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import card from '@/mixins/card'
import crypto from 'crypto-js/aes'
import cryptoCore from 'crypto-js/core'
import pako from 'pako'
export default {
  mixins: [card],
  data() {
    return {
      valid: false,
      file: null,
      secret: '',
      rules: [
        (value) =>
          !value ||
          value.type === 'image/png' ||
          `Error: the file should be a .png image.`,
      ],
      output: '',
      decoded: false,
      isEncrypted: false,
      wrongPassword: false,
    }
  },
  methods: {
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
              ctx.clearRect(0, 0, this.cardWidth, this.cardHeight)
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
            if (pixel[3] === 253) {
              this.isEncrypted = true
            }
            if (pixel[3] === 254 || pixel[3] === 253) {
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
        // Remove trailing zeros occasionned by the way data is stored
        while (dataArray[dataArray.length - 1] === 0) {
          // While the last element is a 0,
          dataArray.pop() // Remove that last element
        }
        // Decompress data
        let textData = pako.inflate(new Uint8Array(dataArray), { to: 'string' })

        // Decrypt data if needed
        if (this.isEncrypted) {
          let bytes = crypto.decrypt(textData, this.secret)
          let decrypted = null
          try {
            decrypted = bytes.toString(cryptoCore.enc.Utf8)
          } catch {
            this.wrongPassword = true
          }
          this.output = decrypted
        } else {
          this.output = textData
        }
      })
    },
  },
  watch: {
    file(value) {
      this.decoded = false
      this.output = ''
      this.isEncrypted = false
      this.cardWidth = 0
      this.cardHeight = 0
      this.wrongPassword = false
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
