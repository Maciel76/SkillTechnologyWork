<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="image-container">
        <img :src="notFoundImage" alt="Erro 404" class="not-found-image" />
      </div>
      <h1 class="title">Ops!! Página não encontrada</h1>
      <p class="message">Parece que você se perdeu no caminho</p>
      <p class="sub-message">
        A página que você está procurando pode ter sido movida ou não existe
        mais.
      </p>

      <div class="actions">
        <router-link to="/" class="home-button">
          <span>Voltar para a Home</span>
          <svg class="arrow-icon" viewBox="0 0 24 24">
            <path
              d="M4 12H20M20 12L14 6M20 12L14 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </router-link>
        <button @click="goBack" class="back-button">
          <svg class="back-icon" viewBox="0 0 24 24">
            <path
              d="M19 12H5M5 12L11 18M5 12L11 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Voltar à página anterior</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import pagenotfoundImage from "@/assets/images/banners/404.png";
export default {
  name: "PageNotFound",
  data() {
    return {
      notFoundImage: pagenotfoundImage,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  margin: 0;
  padding: 0;
}

.not-found-content {
  width: 100%;
  max-width: 800px;
  text-align: center;
  background: white;
  padding: 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.image-container {
  margin-bottom: 30px;
}

.not-found-image {
  max-width: 300px;
  width: 100%;
  height: auto;
}

.title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.message {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 15px;
}

.sub-message {
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 40px;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.home-button,
.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.home-button {
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border: none;
}

.home-button:hover {
  background-color: #2980b9;
}

.back-button {
  background-color: transparent;
  color: #3498db;
  border: 2px solid #3498db;
}

.back-button:hover {
  background-color: rgba(52, 152, 219, 0.1);
}

.arrow-icon,
.back-icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

.back-icon {
  margin-left: 0;
  margin-right: 10px;
}

@media (max-width: 768px) {
  .not-found-content {
    padding: 30px 20px;
    margin: 0 20px;
  }

  .not-found-image {
    max-width: 250px;
    margin-bottom: 20px;
  }

  .title {
    font-size: 2rem;
  }

  .message {
    font-size: 1.3rem;
  }
  .highlight {
    color: #0052ff;
    position: relative;
  }

  .highlight::after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 8px;
    background: rgba(151, 11, 128, 0.2);
    z-index: 0;
    border-radius: 4px;
    transform: skewX(-15deg);
  }

  .sub-message {
    font-size: 1rem;
  }

  .actions {
    gap: 15px;
  }

  .home-button,
  .back-button {
    padding: 12px 25px;
  }
}

@media (max-width: 480px) {
  .not-found-image {
    max-width: 200px;
  }

  .title {
    font-size: 1.8rem;
  }

  .message {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  .sub-message {
    font-size: 0.9rem;
    margin-bottom: 30px;
  }
}
</style>
