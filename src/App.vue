<template>
  <div>
    <AppHeader />  <!-- Header fixo para todas as páginas -->
    <router-view /> <!-- Área onde as páginas serão carregadas -->
    <AppFooter />

  </div>
</template>

<script>
import AppHeader from '@/components/organisms/AppHeader.vue';
import AppFooter from '@/components/organisms/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>
