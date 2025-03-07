<!-- src/components/Footer.vue  -->
<template>      
    <p><br>Siga Nosso Trabalho nas redes sócias</p> <br>
  <div class="social-links">
     <a href="#"><img src="@/assets/svg/icons/facbook.svg" alt="Facebook"></a>
     <a href="#"><img src="@/assets/svg/icons/instagram.svg" alt="Instagram"></a>
     <a href="#"><img src="@/assets/svg/icons/youtube.svg" alt="YouTube"></a>
     <a href="#"><img src="@/assets/svg/icons/linkdin.svg" alt="LinkedIn"></a>
     <a href="#"><img src="@/assets/svg/icons/whatsapp.svg" alt="Whatsapp"></a>
  </div>        
   </template>
   
   <script>
   export default {
     name: 'RedesSocias',
   };
   </script>
   
   <style scoped >
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