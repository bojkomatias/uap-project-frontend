<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {
      odontogram: [
        {
          // Pendiente
          state: 0,
          procedures: [
            {
              procedureSelector: 2,
              teeth: [
                {
                  tooth: '11',
                  faces: [1, 3],
                },
              ],
            },
          ],
        },
        {
          // Realizado
          state: 1,
          procedures: [
            {
              procedureSelector: 3,
              teeth: [
                {
                  tooth: '18',
                },
              ],
            },
            {
              procedureSelector: 7,
              teeth: [
                {
                  tooth: '34',
                  faces: [4],
                },
                {
                  tooth: '47',
                  faces: [3],
                },
              ],
            },
          ],
        },
      ],
    }
  },
}
</script>
