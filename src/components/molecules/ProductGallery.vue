<template>
  <div class="product-gallery">
    <h2>Galeria de Imagens</h2>
    <div class="gallery-grid">
      <div v-for="(image, index) in images" :key="index" class="gallery-item">
        <img
          :src="image"
          :alt="'Imagem ' + (index + 1)"
          class="gallery-image"
        />
      </div>
    </div>
  </div>
</template>

<script>
//revisado
export default {
  name: "ProductGallery",
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      images: [], // Lista de imagens do produto .
    };
  },
  methods: {
    fetchImages() {
      // Simulação de busca de imagens com base no ID do produto
      const produtos = [
        {
          id: 1,
          images: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
            "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f",
          ],
        },
        {
          id: 2,
          images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RW50ZXJwcmlzZXxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RW50ZXJwcmlzZXxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RW50ZXJwcmlzZXxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RW50ZXJwcmlzZXxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1629905679177-4c4e2623654f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEVudGVycHJpc2V8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1612296727716-d6c69d2a2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEVudGVycHJpc2V8ZW58MHx8MHx8fDA%3D",
          ],
        },
        // Adicione mais produtos conforme necessário
      ];

      // Encontra o produto pelo ID e define as imagens
      const produto = produtos.find((p) => p.id === this.productId);
      if (produto) {
        this.images = produto.images;
      }
    },
  },
  mounted() {
    this.fetchImages();
  },
};
</script>

<style scoped>
.product-gallery {
  margin-top: 4rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-gallery h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.gallery-item {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.gallery-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-image:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
