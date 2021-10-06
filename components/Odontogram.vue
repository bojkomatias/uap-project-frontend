<template>
  <div>
    <div id="odontogram"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { odontogramTemplate } from 'static/odontogramTemplate.js'
export default {
  props: {
    odontogram: {
      type: Array,
      default: () => [],
    },
    readonly: { type: Boolean, default: false },
  },
  emits: ['selectTooth'],
  data() {
    return {
      odontogramTemplate,
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
        .attr('value', function (d) {
          return d.id
        })
        .selectAll('svg')
        .data(function (d) {
          return d.faces
        })
        .enter()
        .append('path')
        .attr('value', function (d) {
          return d.id
        })
        .attr('d', (d) => {
          if (d.id === 'top') return line(this.topPoints) + 'Z'
          if (d.id === 'left') return line(this.leftPoints) + 'Z'
          if (d.id === 'right') return line(this.rightPoints) + 'Z'
          if (d.id === 'bot') return line(this.botPoints) + 'Z'
          else return line(this.centerPoints) + 'Z'
        })
        .style('fill', '#F2F2E6')
        .style('stroke', 'black')
        .on('mouseover', function () {
          d3.select(this).style('fill', '#D3DDE6')
        })
        .on('mouseout', function () {
          d3.select(this).style('fill', '#F2F2E6')
        })
        .on('click', function (e, d) {
          return ctx.toothAndFace(
            d3.select(this.parentNode).attr('value'),
            d3.select(this).attr('value')
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
      this.$emit('selectTooth', { tooth, face })
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
