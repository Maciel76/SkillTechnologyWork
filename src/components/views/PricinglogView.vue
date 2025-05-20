<template>
  <div>
    <main>
      <PrecingCategory />
      <!-- Adicionando o componente PricingCategoria -->
    </main>
  </div>
</template>

<script>
//revisado
import PrecingCategory from "../celulas/PrecingCategory.vue";

export default {
  name: "PrecingView",
  components: {
    PrecingCategory,
  },
};
</script>

<style scoped>
/* Estilos globais ou específicos da página */
</style>
