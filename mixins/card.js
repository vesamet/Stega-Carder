export default {
  data() {
    return {
      cardWidth: 300,
      cardHeight: 400,
      padding: 30,
      textOffset: 10,
    }
  },
  methods: {
    getDataAreaBounds() {
      let startHeight = 70
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

        height:
          this.cardHeight -
          this.padding -
          endHeight -
          (this.padding + startHeight),
      }
    },
    clone(object) {
        return JSON.parse(JSON.stringify(object))
      },
  },
}
