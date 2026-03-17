<!-- src/components/Footer.vue  -->
<template>
  <p style="text-align: center;"><br />Siga Nosso Trabalho </p>
  <br />
  <div class="social-links">
    <a href="https://facebook.com/skilltechnologywork" target="_blank" rel="noopener noreferrer"><img src="@/assets/svg/icons/facbook.svg" alt="Facebook" /></a>
    <a href="https://instagram.com/skilltechnologywork" target="_blank" rel="noopener noreferrer"
      ><img src="@/assets/svg/icons/instagram.svg" alt="Instagram"
    /></a>
    <a href="https://youtube.com/@skilltechnologywork" target="_blank" rel="noopener noreferrer"><img src="@/assets/svg/icons/youtube.svg" alt="YouTube" /></a>
    <a href="https://linkedin.com/company/skilltechnologywork" target="_blank" rel="noopener noreferrer"><img src="@/assets/svg/icons/linkdin.svg" alt="LinkedIn" /></a>
    <a href="https://wa.me/5562982809010" target="_blank" rel="noopener noreferrer"><img src="@/assets/svg/icons/whatsapp.svg" alt="Whatsapp" /></a>
  </div>
</template>

<script>
export default {
  name: "RedesSocias",
};
</script>

<style scoped>
.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.social-links {
  display: flex;
  gap: 1rem;
}

.social-links img {
  width: 24px;
  height: 24px;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.social-links img:hover {
  opacity: 1;
}
</style>
