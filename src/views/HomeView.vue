<template>
  <main>
    <HeroSection />
    <ProjectSection />
    <ServiceSection/> />
  </main>
</template>

<script>
import HeroSection from '@/components/molecules/HeroSection.vue'
import ProjectSection from '@/components/molecules/ProjectSection.vue';
import ServiceSection from '@/components/molecules/ServiceSection.vue';

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    ProjectSection,
    ServiceSection,

  },
};
</script>
