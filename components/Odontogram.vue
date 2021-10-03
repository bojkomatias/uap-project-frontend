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
  },
  data() {
    return {
      odontogramTemplate,
      topPoints: [
        {
          x: 0,
          y: 0,
        },
        {
          x: 60,
          y: 0,
        },
        {
          x: 45,
          y: 15,
        },
        {
          x: 15,
          y: 15,
        },
      ],
      leftPoints: [
        {
          x: 0,
          y: 0,
        },
        {
          x: 0,
          y: 60,
        },
        {
          x: 15,
          y: 45,
        },
        {
          x: 15,
          y: 15,
        },
      ],
      rightPoints: [
        {
          x: 60,
          y: 0,
        },
        {
          x: 60,
          y: 60,
        },
        {
          x: 45,
          y: 45,
        },
        {
          x: 45,
          y: 15,
        },
      ],
      botPoints: [
        {
          x: 0,
          y: 60,
        },
        {
          x: 60,
          y: 60,
        },
        {
          x: 45,
          y: 45,
        },
        {
          x: 15,
          y: 45,
        },
      ],
      centerPoints: [
        {
          x: 15,
          y: 15,
        },
        {
          x: 45,
          y: 15,
        },
        {
          x: 45,
          y: 45,
        },
        {
          x: 15,
          y: 45,
        },
      ],
    }
  },
  mounted() {
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
      .attr('height', 100)
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
      .style('fill', '#a1a1a1')
      .style('stroke', 'black')
      .on('mouseover', function () {
        d3.select(this).style('fill', '#b2f1a1')
      })
      .on('mouseout', function () {
        d3.select(this).style('fill', '#a1a1a1')
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
      .attr('y', 15)
      .attr('x', 20)
      .text(function (d) {
        return d?.id
      })
  },
  methods: {
    toothAndFace(tooth, face) {
      console.log(tooth, face)
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
