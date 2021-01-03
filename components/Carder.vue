<template>
  <v-card flat>
    <v-row>
      <v-col cols="12" md="6" class="px-10">
        <h2 class="primary--text text-left mb-4 alt-font">Define cartridge</h2>
        <v-row>
          <v-col cols="10" class="pa-1">
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
          <v-col cols="2" class="pa-2 pt-1">
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
          <v-col cols="12" md="10" class="pa-2">
            <v-row>
              <v-col cols="12" md="6" class="pa-2">
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
              <v-col cols="12" md="6" class="pa-2">
                <v-text-field
                  dense
                  v-model="author"
                  label="Author"
                  @input="render()"
                  outlined
                  counter
                  maxlength="19"
                ></v-text-field
              ></v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="2" class="pa-2 pt-1">
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

        <v-row>
          <v-col cols="10" class="pa-2">
            <v-row>
              <v-col class="pa-2">
                <v-select
                  v-model="cardType"
                  :items="cardTypes"
                  label="Stega card size"
                  @input="render()"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col class="pa-2">
                <v-text-field
                  dense
                  type="number"
                  v-model="number"
                  label="Card number"
                  @input="render()"
                  outlined
                  counter
                  maxlength="4"
                ></v-text-field
              ></v-col>
            </v-row>
          </v-col>
          <v-col cols="2" class="pa-2 pt-1">
            <ColorPicker
              :color="backgroundColor"
              @update:color="
                (c) => {
                  backgroundColor = c
                  render()
                }
              "
            />
          </v-col>
        </v-row>

        <v-divider class="mt-2 mb-5"></v-divider>
        <v-row>
          <v-col cols="12" md="10" class="pa-2">
            <v-textarea
              v-model="input"
              outlined
              dense
              label="Text to encode"
              @input="textIsEncoded = false"
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="2" align-self="center" class="pa-2">
            <v-btn
              class="encode-btn mb-4 py-3 elevation-6"
              :style="textIsEncoded ? 'opacity:0.5;' : ''"
              color="primary"
              block
              @click="!textIsEncoded ? encode() : false"
            >
              <template v-if="!textIsEncoded">
                <br />
                Encode<br />
                text
              </template>
              <template v-else>
                Text<br />
                encoded
              </template>
            </v-btn>
            <v-btn
              color="cancel"
              small
              block
              @click="
                render()
                animateCard = true
                input = ''
              "
            >
              Clear
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="6"
        align-self="center"
        class="pa-2"
      >
        <canvas
          ref="card"
          class="card"
          :width="cardWidth"
          :height="cardHeight"
          :class="animateCard ? 'animate__animated animate__headShake' : ''"
          @animationend="animateCard = false"
        ></canvas
        ><br />
        <v-btn color="cancel" @click="reset()" class="mx-3">
          <v-icon class="mr-2">mdi-close</v-icon> Reset
        </v-btn>
        <a
          v-if="$refs.card"
          :download="`${title}-${subtitle}-${number}.png`"
          :href="$refs.card.toDataURL('image/png')"
        >
          <v-btn color="secondary" class="mx-3" @click="animateCard = true">
            Obtain card <v-icon class="ml-2">mdi-download-circle</v-icon>
          </v-btn>
        </a>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import pako from 'pako'
import card from '@/mixins/card'
import ColorPicker from '@/components/ColorPicker.vue'
export default {
  mixins: [card],
  components: {
    ColorPicker,
  },
  data() {
    return {
      animateCard: false,
      // Form
      title: 'Nani Poems',
      titleColor: '#000000FF',
      subtitle: 'Feed Scavenger',
      subtitleColor: '#AAFDFFFF',
      input: `
      The little red birds have all flown away 🐦
      The tapestry of threads of conversation 🧵
      Dusty and rolled up in a corner 🧹
      The photos lie scattered on the floor 🖼️
      The algorithms still remember 🖥️
      And still remind me of you 🧝
      `,
      textIsEncoded: false,
      author: 'Nina Abramovic',
      number: 194,
      // Cartridge specification
      cardType: 'small',
      cardTypes: [
        { text: 'Small', value: 'small' },
        { text: 'Medium', value: 'medium' },
        { text: 'Large', value: 'large' },
      ],
      backgroundColor: '#5958C5FF',
    }
  },
  methods: {
    render() {
      // Set cartridge size
      switch (this.cardType) {
        case 'small':
          this.cardWidth = 350 + this.padding
          this.cardHeight = 150 + this.padding
          break
        case 'medium':
          this.cardWidth = 350 + this.padding
          this.cardHeight = 250 + this.padding
          break
        case 'large':
          this.cardWidth = 350 + this.padding
          this.cardHeight = 350 + this.padding
          break
      }
      this.$nextTick(() => {
        // ^^ nextTick insure that the width/height is set before painting
        const ctx = this.$refs.card.getContext('2d')
        //Clear cartridge
        ctx.clearRect(0, 0, this.cardWidth, this.cardHeight)
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
        ctx.textAlign = 'left'
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
        ctx.textAlign = 'right'
        ctx.fillText(
          '— ' + this.author,
          this.cardWidth - this.padding - this.textOffset,
          this.cardHeight - this.padding
        )
        // Add card number label
        if (this.number) {
          ctx.font = 'bold 12px Courier New'
          ctx.fillText(
            '#' + this.number,
            this.cardWidth - this.padding - this.textOffset,
            this.padding + 20
          )
        }
        // Add Stega card label
        ctx.font = 'bold 12px Courier New'
        ctx.textAlign = 'left'
        ctx.fillText(
          'Stega Card',
          this.padding + this.textOffset,
          this.cardHeight - this.padding
        )

        // Add no data label
        let dataArea = this.clone(this.getDataAreaBounds())
        ctx.fillStyle = this.subtitleColor
        ctx.fillRect(
          dataArea.start[0],
          dataArea.start[1],
          dataArea.width,
          dataArea.height
        )
        ctx.font = 'bold 20px Courier New'
        ctx.textAlign = 'center'
        ctx.fillStyle = this.backgroundColor
        ctx.fillText('No Data', this.cardWidth / 2, this.cardHeight / 2 + 26)
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
        let gradient = ctx.createLinearGradient(
          0,
          0,
          dataArea.start[0] + dataArea.width + this.padding,
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
          if (pointer.x === dataArea.end[0]) {
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
        this.animateCard = true
      })
    },
    reset() {
      this.cardType = 'small'
      this.input = ''
      this.number = '001'
      this.author = 'Anonymous'
      this.backgroundColor = '#DCDCE7FF'
      this.subtitle = 'template'
      this.subtitleColor = '#062525FF'
      this.textIsEncoded = false
      this.title = 'Blank'
      this.titleColor = '#0F2274FF'
      this.$nextTick(() => {
        this.render()
        this.animateCard = true
      })
    },
  },
  mounted() {
    this.encode()
  },
}
</script>

<style lang="scss" scoped>
.card {
  margin: auto;
  text-align: center;
  margin: 30px;
}
.encode-btn {
  height: 100% !important;
}
</style>
