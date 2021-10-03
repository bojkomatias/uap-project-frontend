<template>
  <div id="ortodoncia"></div>
</template>

<script>
import * as d3 from 'd3'
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
export default {
  emits: ['selection'],
  data() {
    return {
      teeth: [
        {
          id: '18',
          faces: [
            { id: 'top' },
            { id: 'bot' },
            { id: 'mid' },
            { id: 'right' },
            { id: 'left' },
          ],
        },
        {
          id: '17',
          faces: [
            { id: 'top' },
            { id: 'bot' },
            { id: 'mid' },
            { id: 'right' },
            { id: 'left' },
          ],
        },
      ],
      topPoints: [
        {
          x: 0,
          y: 0,
        },
        {
          x: 100,
          y: 0,
        },
        {
          x: 66,
          y: 33,
        },
        {
          x: 33,
          y: 33,
        },
      ],
      leftPoints: [
        {
          x: 0,
          y: 0,
        },
        {
          x: 0,
          y: 100,
        },
        {
          x: 33,
          y: 66,
        },
        {
          x: 33,
          y: 33,
        },
      ],
      rightPoints: [
        {
          x: 100,
          y: 0,
        },
        {
          x: 100,
          y: 100,
        },
        {
          x: 66,
          y: 66,
        },
        {
          x: 66,
          y: 33,
        },
      ],
      botPoints: [
        {
          x: 0,
          y: 100,
        },
        {
          x: 100,
          y: 100,
        },
        {
          x: 66,
          y: 66,
        },
        {
          x: 33,
          y: 66,
        },
      ],
      centerPoints: [
        {
          x: 33,
          y: 33,
        },
        {
          x: 66,
          y: 33,
        },
        {
          x: 66,
          y: 66,
        },
        {
          x: 33,
          y: 66,
        },
      ],
    }
  },
  mounted() {
    const ctx = this
    const orto = d3.select('#ortodoncia')
    var line = d3
      .line()
      .x(function (d) {
        return d.x
      })
      .y(function (d) {
        return d.y
      })
    var teeth = orto
      .selectAll(null)
      .data(this.teeth)
      .enter()
      .append('svg')
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
      .style('fill', 'yellow')
      .style('stroke', 'black')
      .on('mouseover', function () {
        d3.select(this).style('fill', 'red')
      })
      .on('mouseout', function () {
        d3.select(this).style('fill', 'yellow')
      })
      .on('click', function (e, d) {
        return ctx.toothAndFace(
          d3.select(this.parentNode).attr('value'),
          d3.select(this).attr('value')
        )
      })
  },
  methods: {
    toothAndFace(tooth, face) {
      console.log(tooth, face)
    },
  },
}
</script>

<style lang="scss" scoped></style>
