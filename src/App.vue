<template>
  <div>
    <AppHeader />  <!-- Header fixo para todas as páginas -->
    <router-view /> <!-- Área onde as páginas serão carregadas -->
  </div>
</template>

<script>
import AppHeader from '@/components/organisms/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
};
</script>
