<template>
  <main>
    <HeroSection />
    <SobreNosResumo />
    <ComoFunciona />
    <ServicesLink />
    <ParaQuemE />
    <ProjectSection />
    <PortfolioSection />
    <BeneficSection title="Por que Escolher a SkillTechnology" />
    <FreedbackView />
    <PricingSection />
    <Perguntasfrequente />
    <ContatoService />
  </main>
</template>

<script>
import RecentPosts from "@/components/templates/RecentePost.vue";
import HeroSection from "@/components/molecules/HeroSection.vue";
import ProjectSection from "@/components/molecules/ProjectSection.vue";
import PortfolioSection from "@/components/servicepage/Portifolio/PortfolioSection.vue";
import ServicesLink from "@/components/celulas/ServicesLink.vue";
import SobreNosResumo from "@/components/molecules/SobreNosResumo.vue";
import PricingSection from "@/components/molecules/PricingSection.vue";
import ComoFunciona from "@/components/molecules/ComoFunciona.vue";
import ParaQuemE from "@/components/molecules/ParaQuemE.vue";
import BeneficSection from "@/components/molecules/BeneficSection.vue";
import FreedbackView from "@/components/molecules/FreedbackView.vue";
import Perguntasfrequente from "@/components/molecules/Perguntasfrequente.vue";
import ContatoService from "@/components/celulas/ContatoService.vue";

export default {
  name: "HomeView",
  components: {
    HeroSection,
    SobreNosResumo,
    ComoFunciona,
    ServicesLink,
    ParaQuemE,
    ProjectSection,
    PortfolioSection,
    BeneficSection,
    FreedbackView,
    PricingSection,
    Perguntasfrequente,
    ContatoService,
    RecentPosts,
  },
};
</script>
