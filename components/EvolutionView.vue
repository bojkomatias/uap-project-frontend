<template>
  <div>
    <v-expansion-panels focusable>
      <v-expansion-panel v-for="evolution in evolutions" :key="evolution.id">
        <v-expansion-panel-header class="d-flex justify-space-between">
          <div>
            <!-- {{ new Date(evolution.date).toLocaleString('es-AR') }} -->
          </div>
          <div class="font-weight-black">
            {{ evolution.motive }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-textarea :value="evolution.evolution" readonly />
          <odontogram :odontogram="evolution.odontogram" readonly />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: {
    evolutions: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped></style>
