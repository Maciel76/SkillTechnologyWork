<template>
  <main>
    <HeroSection />
    <ProjectSection />
    <ServicesLink/> 
    <PortfolioSection/>
    <RecentPosts/>
  </main>
</template>

<script>
import RecentPosts from '@/components/templates/RecentePost.vue'
import HeroSection from '@/components/molecules/HeroSection.vue'
import ProjectSection from '@/components/molecules/ProjectSection.vue';
import PortfolioSection from '@/components/servicepage/Portifolio/PortfolioSection.vue';
import ServicesLink from '@/components/celulas/ServicesLink.vue';

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    ProjectSection,
    PortfolioSection,
    ServicesLink,
    RecentPosts,

  },
};
</script>
