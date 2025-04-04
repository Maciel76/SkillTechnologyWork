<template>
    <div class="post-content">
      <h2>Postagem 3</h2>
      <p>Vue 3 é um frameworsk incrível para desenvolvimento web.</p>
      <img src="https://exemplo.com/imagem-vue.jpg" alt="Vue 3" class="dynamic-image" />
      <p>Para saber mais, visite <a href="https://vuejs.org" target="_blank">Vue.js</a>.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PostView3'
  };
  </script>
  
  <style scoped>
  .post-content {
    line-height: 1.6;
    font-size: 1.1rem;
    color: var(--text-light);
  }
  
  .dynamic-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 20px 0;
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>