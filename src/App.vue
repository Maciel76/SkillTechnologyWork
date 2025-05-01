<template>
  <div>
    <!-- Header da Agência -->
    <AppHeader v-if="showAgencyHeader" />

    <!-- Conteúdo principal -->
    <router-view />

    <!-- Footer da Agência -->
    <AppFooter v-if="showAgencyFooter" />

    <!-- WhatsApp -->
    <WhatsButton v-if="showWhatsApp" />
  </div>
</template>

<script>
import AppHeader from "@/components/organisms/AppHeader.vue";
import AppFooter from "@/components/organisms/AppFooter.vue";
import WhatsButton from "@/components/organisms/WhatsAppButton.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    WhatsButton,
  },
  computed: {
    showAgencyHeader() {
      return !this.$route.meta?.isDemo;
    },
    showAgencyFooter() {
      // Esconde footer da agência em demos E se a rota não pedir para manter
      return !this.$route.meta?.isDemo && !this.$route.meta?.keepFooter;
    },
    showWhatsApp() {
      return !this.$route.meta?.isDemo;
    },
  },
};
</script>
