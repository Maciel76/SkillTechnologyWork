<template>
  <section class="section" id="gallery">
    <div class="container">
      <h2 class="section-title">Galeria</h2>
      <div class="gallery-grid">
        <div class="gallery-item" v-for="(image, index) in images" :key="index">
          <img :src="image.src" :alt="image.alt" @click="openModal(index)" />
        </div>
      </div>

      <div class="modal" v-if="modalOpen" @click="closeModal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <img :src="images[activeIndex].src" :alt="images[activeIndex].alt" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "GalleryEducar",
  data() {
    return {
      images: [
        {
          src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          alt: "Estudantes na sala de aula",
        },
        {
          src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          alt: "Professora ensinando",
        },
        {
          src: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          alt: "Laboratório de ciências",
        },
        {
          src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          alt: "Atividade esportiva",
        },
        {
          src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          alt: "Biblioteca escolar",
        },
        {
          src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          alt: "Apresentação artística",
        },
      ],
      modalOpen: false,
      activeIndex: 0,
    };
  },
  methods: {
    openModal(index) {
      this.activeIndex = index;
      this.modalOpen = true;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.modalOpen = false;
      document.body.style.overflow = "auto";
    },
  },
};
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.gallery-item {
  overflow: hidden;
  border-radius: 10px;
  height: 250px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.03);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.modal-content img {
  max-width: 100%;
  max-height: 80vh;
  display: block;
  margin: 0 auto;
}

.close {
  position: absolute;
  top: -40px;
  right: 0;
  color: white;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: var(--secondary-color);
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>
