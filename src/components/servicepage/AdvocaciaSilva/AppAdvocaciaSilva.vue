<template>
  <div class="demo-page">
    <DemoHeader />
    <HeroBanner />
    <StatsSection />
    <SobreSection />
    <ServicesSection />
    <EquipeSection />
    <PublicationsSection />
    <FeedbackSection />
    <ContactForm />
    <DemoFooter />
  </div>
</template>

<script>
import HeaderAdSilva from "./HeaderAdSilva.vue";
import HeroAdSilva from "./HeroAdSilva.vue";
import StatsAdSilva from "./StatsAdSilva.vue";
import ServicesAdSilva from "./ServicesAdSilva.vue";
import PublicationsAdSilva from "./PublicationsAdSilva.vue";
import FooterAdSilva from "./FooterAdSilva.vue";
import ContatosAdSilva from "./ContatsAdSilva.vue";
import SobreAdSilva from "./SobreAdSilva.vue";
import FeedbackAdsilva from "./FeedbackAdsilva.vue";
import EquipeAdsilva from "./EquipeAdsilva.vue";
export default {
  name: "DemoPage",
  components: {
    DemoHeader: HeaderAdSilva,
    HeroBanner: HeroAdSilva,
    StatsSection: StatsAdSilva,
    ServicesSection: ServicesAdSilva,
    PublicationsSection: PublicationsAdSilva,
    ContactForm: ContatosAdSilva,
    DemoFooter: FooterAdSilva,
    SobreSection: SobreAdSilva,
    FeedbackSection: FeedbackAdsilva,
    EquipeSection: EquipeAdsilva,
  },
};
</script>

<style>
/* Estilos globais podem ficar aqui */
:root {
  --primary: #1a3e72;
  --secondary: #d4af37;
  --dark: #0a192f;
  --light: #f8f9fa;
  --gray: #6c757d;
}

body {
  font-family: "Roboto", sans-serif;
  color: var(--dark);
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Playfair Display", serif;
  font-weight: 700;
}
</style>
