<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab href="#decode">Decode</v-tab>
      <v-tab href="#create">Create</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="decode">
        <v-card flat>
          <v-card-text>decode</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="create">
        <v-card flat>
          <v-row>
            <v-col cols="12" md="6" class="pa-10">
              <v-row>
                <v-col cols="9">
                  <v-text-field
                    v-model="title"
                    label="Title"
                    @input="render()"
                    outlined
                    dense
                    counter
                    maxlength="17"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <ColorPicker
                    :color="titleColor"
                    @update:color="
                      (c) => {
                        titleColor = c
                        render()
                      }
                    "
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="9">
                  <v-row>
                    <v-col>
                      <v-text-field
                        dense
                        v-model="subtitle"
                        label="Subtitle"
                        @input="render()"
                        outlined
                        counter
                        maxlength="21"
                      ></v-text-field
                    ></v-col>
                    <v-col>
                      <v-text-field
                        dense
                        v-model="author"
                        label="Author"
                        @input="render()"
                        outlined
                        counter
                        maxlength="25"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <ColorPicker
                    :color="subtitleColor"
                    @update:color="
                      (c) => {
                        subtitleColor = c
                        render()
                      }
                    "
                  />
                </v-col>
              </v-row>
              <v-divider class="py-3"></v-divider>
              <v-textarea
                v-model="input"
                outlined
                dense
                label="Text to encode"
                @input="textIsEncoded = false"
              ></v-textarea>
              <div class="text-left">
                <v-btn
                  v-show="!textIsEncoded"
                  color="primary"
                  small
                  @click="encode()"
                >
                  Encode text
                </v-btn>
                <v-btn color="secondary" small @click="decode()">
                  Decode text
                </v-btn>
              </div>
              <v-divider class="my-3"></v-divider>

              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="cardType"
                    :items="cardTypes"
                    label="Stega card size"
                    @input="render()"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card outlined class="pa-3" style="border-color: #9e9e9e">
                    <v-row justify="center" align="center">
                      <v-col cols="12" md="8" class="pa-2"
                        >Background color:</v-col
                      >
                      <v-col cols="12" md="4" class="pa-2">
                        <ColorPicker
                          :color="backgroundColor"
                          @update:color="
                            (c) => {
                              backgroundColor = c
                              render()
                            }
                          "
                      /></v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6" align-self="center">
              <canvas
                ref="card"
                class="card"
                :width="cardWidth"
                :height="cardHeight"
              ></canvas>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import pako from 'pako'
import ColorPicker from '@/components/ColorPicker.vue'
export default {
  components: {
    ColorPicker,
  },
  data() {
    return {
      tab: 'create',
      // Form
      title: 'Nani Poems',
      titleColor: '#000000FF',
      subtitle: 'Feed Scavenger',
      subtitleColor: '#AAFDFFFF',
      //       input: `The little red birds have all flown away 🐦
      // The tapestry of threads of conversation 🧵
      // Dusty and rolled up in a corner 🧹
      // The photos lie scattered on the floor 🖼️
      // The algorithms still remember 🖥️
      // And still remind me of you 🧝`,
      input: 'you 🧝',
      textIsEncoded: false,
      author: 'Nina Abramovic',
      // Cartridge specification
      cardType: 'small',
      cardTypes: [
        { text: 'Small', value: 'small' },
        { text: 'Medium', value: 'medium' },
        { text: 'Large', value: 'large', disabled: true },
      ],
      backgroundColor: '#DD2B00FF',
      cardWidth: 300,
      cardHeight: 400,
      padding: 30,
      textOffset: 10,
    }
  },
  methods: {
    render() {
      // Set cartridge size
      switch (this.cardType) {
        case 'small':
          this.cardWidth = 300 + this.padding
          this.cardHeight = 400 + this.padding
          break
        case 'medium':
          this.cardWidth = 500 + this.padding
          this.cardHeight = 600 + this.padding
          break
      }
      this.$nextTick(() => {
        // ^^ nextTick insure that the width/height is set before painting
        const ctx = this.$refs.card.getContext('2d')
        //Clear cartridge
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 1000, 1000)
        // Paint cartridge shadow
        ctx.shadowColor = this.backgroundColor
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.shadowBlur = 15
        ctx.fillRect(
          this.padding / 2,
          this.padding / 2,
          this.cardWidth - this.padding,
          this.cardHeight - this.padding
        )
        // Paint background
        ctx.fillStyle = this.backgroundColor
        ctx.fillRect(
          this.padding / 2,
          this.padding / 2,
          this.cardWidth - this.padding,
          this.cardHeight - this.padding
        )
        // Paint border
        ctx.strokeStyle = this.titleColor
        let strokePadding = 6
        ctx.strokeRect(
          this.padding / 2 + strokePadding,
          this.padding / 2 + strokePadding,
          this.cardWidth - this.padding - strokePadding * 2,
          this.cardHeight - this.padding - strokePadding * 2
        )

        // Paint title, subtitle & author
        ctx.shadowBlur = 0
        ctx.font = 'bold 25px Courier New'
        ctx.fillStyle = this.titleColor
        ctx.fillText(
          this.title,
          this.padding + this.textOffset,
          this.padding + 25
        )
        ctx.font = 'bold 20px Courier New'
        ctx.fillStyle = this.subtitleColor
        ctx.fillText(
          this.subtitle,
          this.padding + this.textOffset,
          this.padding + 50
        )
        ctx.font = 'bold 17px Courier New'
        ctx.fillText(
          this.author,
          this.padding + this.textOffset,
          this.cardHeight - this.padding
        )
      })
      // Set text as not encoded since we painted over the data area
      this.textIsEncoded = false
    },
    encode() {
      if (!this.input) return
      this.render()
      this.$nextTick(() => {
        const ctx = this.$refs.card.getContext('2d')
        // Compress text in 8-bit unsigned integer array (Uint8Array)
        const compressed = pako.deflate(this.input)
        // Clear & style data area
        let dataArea = this.clone(this.getDataAreaBounds())
        console.log(compressed)
        let gradient = ctx.createLinearGradient(
          0,
          0,
          dataArea.start[0] + dataArea.width,
          0
        )
        gradient.addColorStop(0, this.titleColor)
        gradient.addColorStop(0.3, this.backgroundColor)
        gradient.addColorStop(0.5, this.subtitleColor)
        gradient.addColorStop(0.7, this.backgroundColor)
        gradient.addColorStop(1, this.titleColor)
        ctx.fillStyle = gradient
        ctx.fillRect(
          dataArea.start[0],
          dataArea.start[1],
          dataArea.width,
          dataArea.height
        )
        // Fill data area
        let pointer = {
          x: dataArea.start[0],
          y: dataArea.start[1],
        }
        for (let index = 0; index < compressed.length; ) {
          ctx.putImageData(
            new ImageData(
              new Uint8ClampedArray([
                compressed[index],
                compressed[index + 1],
                compressed[index + 2],
                255,
              ]),
              1,
              1
            ),
            pointer.x,
            pointer.y
          )
          index += 3
          pointer.x++
          if (pointer.x + 1 === dataArea.end[0]) {
            pointer.x = dataArea.start[0]
            pointer.y++
          }
          if (index >= compressed.length) {
            //add special pixel to signal the end of the data
            ctx.putImageData(
              new ImageData(new Uint8ClampedArray([0, 0, 0, 254]), 1, 1),
              pointer.x,
              pointer.y
            )
            break
          }
        }
        // Set text as encoded
        this.textIsEncoded = true
      })
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
    getDataAreaBounds() {
      let startHeight = 80
      let endHeight = 30
      return {
        start: [this.padding + this.textOffset, this.padding + startHeight],
        end: [
          this.cardWidth - this.padding - this.textOffset,
          this.cardHeight - this.padding - endHeight,
        ],
        width:
          this.cardWidth -
          this.padding -
          this.textOffset -
          (this.padding + this.textOffset),

        height: this.cardHeight - this.padding - endHeight - (this.padding + startHeight),
      }
    },
    clone(object) {
      return JSON.parse(JSON.stringify(object))
    },
  },
  mounted() {
    this.encode()
    this.decode()
  },
}
</script>

<style lang="scss" scoped>
.card {
  margin: auto;
  text-align: center;
  margin: 30px;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
