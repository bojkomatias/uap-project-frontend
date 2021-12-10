<template>
  <div>
    <div id="odontogram"></div>
    <v-card height="50" class="pa-3 d-flex justify-around" flat>
      <div v-if="hoveredData && hoveredData.face">
        <div
          v-for="p in hoveredData.face.procedures"
          :key="p.procedureSelector"
        >
          <v-icon>{{ typeIcon[p.procedureSelector] }}</v-icon>
          <v-icon>{{ typeName[p.procedureSelector] }}</v-icon>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { odontogramTemplate } from 'static/odontogramTemplate.js'
import { stateColor, typeName, typeIcon } from 'static/helpers.js'
export default {
  props: {
    odontogram: {
      type: Array,
      default: () => [],
    },
    readonly: { type: Boolean, default: false },
  },
  emits: ['toothClicked'],
  data() {
    return {
      hoveredData: {},
      odontogramTemplate,
      stateColor,
      typeName,
      typeIcon,
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
    setTimeout(() => {
      this.populateOdontogram()
    }, 500)
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
      const teeth = d3
        .select('#odontogram')
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

      teeth
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
        .style('fill', '#FAF8F0')
        .style('stroke', 'gray')
        .on('mouseover', function () {
          d3.select(this).style('stroke', 'black')
        })
        .on('mouseout', function () {
          d3.select(this).style('stroke', 'gray')
        })
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
        .style('fill', 'gray')
        .text(function (d) {
          return d?.id
        })
    },
    toothAndFace(tooth, face) {
      tooth = tooth.substr(1, 3)
      face = face.substr(1, 2)
      this.$emit('toothClicked', { tooth, face })
    },
    populateOdontogram() {
      console.log('Populating')
      const ctx = this
      this.odontogram.forEach((tooth) => {
        tooth.faces.forEach((face) => {
          d3.select(`#d${tooth.id}`)
            .select(`#f${face.id}`)
            .style(
              'fill',
              stateColor[face.procedures[face.procedures.length - 1].state]
            )
            .on('mouseover', function () {
              return ctx.interactWithOdontogram(tooth.id, face)
            })
            .on('mouseout', function () {
              return (ctx.hoveredData = null)
            })
        })
      })
    },
    interactWithOdontogram(tooth, face) {
      this.hoveredData = { tooth, face }
    },
  },
}
</script>

<style scoped>
#odontogram {
  padding-top: 2rem;
  display: inline-grid;
  grid-template-columns: repeat(7, 1fr) 2fr repeat(8, 1fr);
  gap: 0.4rem;
}
.p {
  display: none;
}
@media (max-width: 1000px) {
  #odontogram {
    grid-template-columns: repeat(8, 1fr);
  }
}
</style>
