<template>
  <main>
    <HeroSection />
    <ProjectSection />
  </main>
</template>

<script>
import HeroSection from '@/components/molecules/HeroSection.vue'
import ProjectSection from '@/components/molecules/ProjectSection.vue';

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    ProjectSection,

  },
};
</script>
