<template>
  <div>
    <v-container>
      <v-textarea :value="evolution" readonly />
      <odontogram :odontogram="odontogram" readonly />
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      evolution: {},
    }
  },
  mounted() {
    this.fetchEvolution()
  },

  methods: {
    async fetchEvolution() {
      const { data } = await this.$axios.get(
        `evolutions/${this.$route.params.id}`
      )
      this.evolution = data
    },
  },
}
</script>
