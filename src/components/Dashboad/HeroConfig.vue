<template>
    <div class="config-page">
      <h1>Configuração do Hero Section</h1>
      <div>
        <h2>Imagens</h2>
        <div v-for="(image, index) in heroStore.images" :key="index">
          <input v-model="image.src" placeholder="URL da Imagem">
          <input v-model="image.alt" placeholder="Texto Alternativo">
        </div>
      </div>
      <div>
        <h2>Textos</h2>
        <div v-for="(text, index) in heroStore.texts" :key="index">
          <input v-model="text.h1" placeholder="Título">
          <input v-model="text.p" placeholder="Subtítulo">
        </div>
      </div>
      <div>
        <h2>Botões</h2>
        <label>
          <input type="checkbox" v-model="heroStore.showButtons"> Mostrar Botões
        </label>
      </div>
      <button @click="saveConfig">Salvar Configuração</button>
    </div>
  </template>
  
  <script>
  import { useHeroStore } from '@/store';
  
  export default {
    name: 'ConfigPage',
    setup() {
      const heroStore = useHeroStore();
      return { heroStore };
    },
    methods: {
      saveConfig() {
        this.heroStore.updateHeroConfig(this.heroStore);
        alert('Configuração salva com sucesso!');
      }
    }
  };
  </script>
  
  <style scoped>
  .config-page {
    padding: 20px;
  }
  </style>