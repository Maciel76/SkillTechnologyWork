<template>
  <div id="app">
    <HeaderEducar />
    <HeroBanner />
    <Features />
    <Stats />
    <Gallery />
    <Testimonials />
    <AdmissionProcess />
    <Events />
    <FooterEducar />
  </div>
</template>

<script>
import HeaderEducar from " @/components/servicepage/InstitutoEducar/HeaderEducar.vue";
import HeroBanner from " @/components/servicepage/InstitutoEducar/HeroEducar.vue";
import Features from " @/components/servicepage/InstitutoEducar/FeaturesEducar.vue";
import Stats from " @/components/servicepage/InstitutoEducar/StatsEducar.vue";
import Gallery from " @/components/servicepage/InstitutoEducar/GalleryEducar.vue";
import Testimonials from " @/components/servicepage/InstitutoEducar/TestimonialEducar.vue";
import AdmissionProcess from " @/components/servicepage/InstitutoEducar/AdmissionProcess.vue";
import Events from " @/components/servicepage/InstitutoEducar/EventsEducar.vue";
import FooterEducar from " @/components/servicepage/InstitutoEducar/FooterEducar.vue";

export default {
  name: "InstitutoEducar",
  components: {
    HeaderEducar,
    HeroBanner,
    Features,
    Stats,
    Gallery,
    Testimonials,
    AdmissionProcess,
    Events,
    FooterEducar,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
  --light-color: #ecf0f1;
  --dark-color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
  line-height: 1.6;
  color: var(--dark-color);
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  background: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn:hover {
  background: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.btn-accent {
  background: var(--accent-color);
}

.btn-accent:hover {
  background: #c0392b;
}

.section {
  padding: 80px 0;
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
  color: var(--primary-color);
  position: relative;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--secondary-color);
}
</style>
