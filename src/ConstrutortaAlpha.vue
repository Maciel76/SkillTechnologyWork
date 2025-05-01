<template>
  <div class="construtora-alpha">
    <!-- Header específico da Construtora Alpha -->
    <HeaderAlpha />

    <main>
      <HeroBanner />
      <PortfolioSection />
      <LaunchesSection />
      <VirtualTour />
      <StatsSection />
      <CareersSection />
    </main>

    <!-- Footer específico da Construtora Alpha -->
    <FooterAlpha />
  </div>
</template>

<script>
import HeaderAlpha from "@/components/servicepage/construtora-alpha/HeaderAlpha.vue";
import FooterAlpha from "@/components/servicepage/construtora-alpha/FooterAlpha.vue";
import HeroBanner from "@/components/servicepage/construtora-alpha/HeroBanner.vue";
import PortfolioSection from "@/components/servicepage/construtora-alpha/PortfolioSection.vue";
import LaunchesSection from "@/components/servicepage/construtora-alpha/LaunchesSection.vue";
import VirtualTour from "@/components/servicepage/construtora-alpha/VirtualTour.vue";
import StatsSection from "@/components/servicepage/construtora-alpha/StatsSection.vue";
import CareersSection from "@/components/servicepage/construtora-alpha/CareersSection.vue";

export default {
  name: "HomeAlpha",
  components: {
    HeaderAlpha,
    FooterAlpha,
    HeroBanner,
    PortfolioSection,
    LaunchesSection,
    VirtualTour,
    StatsSection,
    CareersSection,
  },
};
</script>

<style>
.construtora-alpha {
  font-family: "Montserrat", sans-serif;
}
</style>
