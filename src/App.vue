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
      // Assume true se não estiver definido
      return this.$route.meta?.hideHeader !== true;
    },
    showAgencyFooter() {
      return this.$route.meta?.hideFooter !== true;
    },
    showWhatsApp() {
      return this.$route.meta?.hideWhatsApp !== true;
    },
  },
};
</script>
