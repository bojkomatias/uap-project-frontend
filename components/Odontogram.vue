<template>
  <div>
    <div id="odontogram"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { odontogramTemplate } from 'static/odontogramTemplate.js'
import { odontogram } from 'static/odontogram.js'
import { stateColors } from 'static/helpers.js'
export default {
  props: {
    // odontogram: {
    //   type: Array,
    //   default: () => [],
    // },
    readonly: { type: Boolean, default: false },
  },
  emits: ['toothClicked'],
  data() {
    return {
      odontogramTemplate,
      odontogram,
      stateColors,
      topPoints: [
        {
          x: 0,
          y: 0,
        },
        {
          x: 50,
          y: 0,
        },
        {
          x: 37,
          y: 13,
        },
        {
          x: 13,
          y: 13,
        },
      ],
      leftPoints: [
        {
          x: 0,
          y: 0,
        },
        {
          x: 0,
          y: 50,
        },
        {
          x: 13,
          y: 37,
        },
        {
          x: 13,
          y: 13,
        },
      ],
      rightPoints: [
        {
          x: 50,
          y: 0,
        },
        {
          x: 50,
          y: 50,
        },
        {
          x: 37,
          y: 37,
        },
        {
          x: 37,
          y: 13,
        },
      ],
      botPoints: [
        {
          x: 0,
          y: 50,
        },
        {
          x: 50,
          y: 50,
        },
        {
          x: 37,
          y: 37,
        },
        {
          x: 13,
          y: 37,
        },
      ],
      centerPoints: [
        {
          x: 13,
          y: 13,
        },
        {
          x: 37,
          y: 13,
        },
        {
          x: 37,
          y: 37,
        },
        {
          x: 13,
          y: 37,
        },
      ],
    }
  },
  mounted() {
    this.drawOdontogram()
    this.populateOdontogram()
  },
  methods: {
    drawOdontogram() {
      const ctx = this
      const line = d3
        .line()
        .x(function (d) {
          return d.x
        })
        .y(function (d) {
          return d.y
        })
      d3.select('#odontogram')
        .selectAll(null)
        .data(this.odontogramTemplate)
        .enter()
        .append('svg')
        .attr('height', 90)
        .append('g')
        .attr('transform', 'translate(0,20)')
        .attr('id', function (d) {
          return `d${d.id}`
        })
        .selectAll('svg')
        .data(function (d) {
          return d.faces
        })
        .enter()
        .append('path')
        .attr('id', function (d) {
          return `f${d.id}`
        })
        .attr('d', (d) => {
          if (d.id === '0') return line(this.topPoints) + 'Z'
          if (d.id === '1') return line(this.leftPoints) + 'Z'
          if (d.id === '2') return line(this.rightPoints) + 'Z'
          if (d.id === '3') return line(this.botPoints) + 'Z'
          else return line(this.centerPoints) + 'Z'
        })
        .style('fill', '#F2F2E6')
        .style('stroke', 'black')
        // .on('mouseover', function () {
        //   d3.select(this).style('fill', '#D3DDE6')
        // })
        // .on('mouseout', function () {
        //   d3.select(this).style('fill', '#F2F2E6')
        // })
        .on('click', function (e, d) {
          return ctx.toothAndFace(
            d3.select(this.parentNode).attr('id'),
            d3.select(this).attr('id')
          )
        })

      d3.selectAll('svg')
        .append('g')
        .append('text')
        .attr('y', 13)
        .attr('x', 17)
        .text(function (d) {
          return d?.id
        })
    },
    toothAndFace(tooth, face) {
      this.$emit('toothClicked', { tooth, face })
    },
    populateOdontogram() {
      odontogram.forEach((state) => {
        state.procedures.forEach((procedure) => {
          procedure.teeth.forEach((tooth) => {
            tooth.faces?.forEach((face) => {
              // Aca se usarian diferentes herramientas estaticas.
              d3.select(`#d${tooth.tooth}`)
                .select(`#f${face}`)
                .style('fill', stateColors[state.state])
            })
          })
        })
      })
    },
  },
}
</script>

<style scoped>
#odontogram {
  padding-top: 2rem;
  display: inline-grid;
  grid-template-columns: repeat(7, 1fr) 6rem repeat(8, 1fr);
  gap: 0.2rem;
}
</style>
