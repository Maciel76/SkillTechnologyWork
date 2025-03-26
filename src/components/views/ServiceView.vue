<template>
    <div>
      <main>
        <!-- Conteúdo da página  revisado -->
         <SlideService />
         <ServicesLink />
         <BeneServices />
         <SuporteService />
         <Depoimentos />
         <ContatoServices />
          
      </main>
    </div>
  </template>
  
  <script>
  import SlideService from '@/components/celulas/SlideService.vue';
  import BeneServices from '@/components/celulas/BeneServices.vue';
  import ContatoServices from '@/components/celulas/ContatoService.vue';
  import Depoimentos from '@/components/celulas/DepoimentosServices.vue';
  import ServicesLink from '@/components/celulas/ServicesLink.vue';
  import SuporteService from '@/components/celulas/SuporteService.vue';
  
  
  export default {
    name: 'ServicosView',
    components: {
      SlideService,
      BeneServices,
      ContatoServices,
      Depoimentos,
      ServicesLink,
      SuporteService,
      
    },
  };
  </script>
  
  <style scoped>
  /* Estilos globais ou específicos da página */
  </style>