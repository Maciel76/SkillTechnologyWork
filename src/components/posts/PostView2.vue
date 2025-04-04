<template>
    <div class="post-content">
      <h2>Postagem 2</h2>
      <p>Aqui estão algumas dicas para melhorar a performance:</p>
      <ul>
        <li>Use <strong>Lazy Loading</strong>.</li>
        <li>Evite reatividade desnecessária.</li>
        <li>Utilize <strong>Tree Shaking</strong>.</li>
      </ul>
      <img src="https://exemplo.com/imagem-performance.jpg" alt="Performance" class="dynamic-image" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'PostView2'
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