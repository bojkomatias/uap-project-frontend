<template>
  <div class="rounded-xl d-flex align-center justify-center ma-8 dentalImg">
    <div class="d-flex justify-center">
      <div class="pa-16 blured d-inline-flex align-center justify-center">
        <h1 id="text" class="primary--text display-1 text-h1 text-center">
          Administrador de Prácticas Odontológicas
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mouseX: null,
      mouseY: null,
    }
  },
  mounted() {
    const el = document.getElementById('text')
    el.addEventListener('mousemove', function (e) {
      this.handleEvent(e)
    })
  },
  methods: {
    handleEvent(e) {
      // eslint-disable-next-line no-console
      console.log(e)
    },
  },
}
</script>

<style scoped>
.blured {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px) saturate(70%) contrast(45%) brightness(110%);
}
.dentalImg {
  height: 90vh;
  background-size: cover;
  background-image: url('https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
}
</style>
