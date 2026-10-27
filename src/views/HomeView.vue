<template>
  <main>
    <HeroPrompt />
    <EmpresasCarrossel />
    <!-- <HeroSection /> -->
    <PortfolioSection />
    <!-- <ComoFunciona /> -->
    <!-- <ServicesLink /> -->
    <!-- <ProjectSection /> -->
    <SobreNosResumo />
    <BeneficSection title="Por que Escolher a SkillTechnology" />
    <FreedbackView />
    <!-- <PricingSection /> -->
    <Perguntasfrequente />
    <ContatoService />
  </main>
</template>

<script>
import RecentPosts from "@/components/templates/RecentePost.vue";
import HeroPrompt from "@/components/molecules/HeroPrompt.vue";
import EmpresasCarrossel from "@/components/molecules/EmpresasCarrossel.vue";
// import HeroSection from "@/components/molecules/HeroSection.vue";
// import ProjectSection from "@/components/molecules/ProjectSection.vue";
import PortfolioSection from "@/components/servicepage/Portifolio/PortfolioSection.vue";
// import ServicesLink from "@/components/celulas/ServicesLink.vue";
import SobreNosResumo from "@/components/molecules/SobreNosResumo.vue";
// import PricingSection from "@/components/molecules/PricingSection.vue";
// import ComoFunciona from "@/components/molecules/ComoFunciona.vue";
import BeneficSection from "@/components/molecules/BeneficSection.vue";
import FreedbackView from "@/components/molecules/FreedbackView.vue";
import Perguntasfrequente from "@/components/molecules/Perguntasfrequente.vue";
import ContatoService from "@/components/celulas/ContatoService.vue";

export default {
  name: "HomeView",
  components: {
    HeroPrompt,
    EmpresasCarrossel,
    // HeroSection,
    SobreNosResumo,
    // ComoFunciona,
    // ServicesLink,
    // ProjectSection,
    PortfolioSection,
    BeneficSection,
    FreedbackView,
    // PricingSection,
    Perguntasfrequente,
    ContatoService,
    RecentPosts,
  },
};
</script>
