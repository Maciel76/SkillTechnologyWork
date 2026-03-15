<template>
  <div class="login-container">
    <!-- Snowflakes falling animation -->
    <div class="snowflakes">
      <div
        v-for="i in 30"
        :key="i"
        class="snowflake"
        :style="getRandomStyle(i)"
      >
        ❄
      </div>
    </div>

    <div class="login-form">
      <!-- Christmas hat Lottie animation on top of the form -->

      <div class="christmas-hat">
        <DotLottieVue
          style="height: 500px; width: 500px"
          autoplay
          loop
          :data="animationData"
        />
      </div>

      <div class="christmas-hat1">
        <DotLottieVue
          style="height: 500px; width: 500px"
          autoplay
          loop
          :data="bonecoData"
        />
      </div>

      <div class="login-header">
        <h2>Área Administrativa</h2>
        <p>Entre com suas credenciais para acessar o painel</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">Usuário</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Digite seu usuário"
            required
          />
        </div>

        <div class="input-group">
          <label for="password">Senha</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button type="submit" class="btn-login" :disabled="loading">
          <span v-if="!loading">Entrar</span>
          <span v-else>Entrando...</span>
        </button>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from "@/services/authService";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import animationData from "./lottie-animatio.json";
import bonecoData from "./boneco-neve.json";

export default {
  name: "PageLogin",
  components: {
    DotLottieVue,
  },
  data() {
    return {
      animationData,
      bonecoData,
      username: "",
      password: "",
      loading: false,
      error: null,
    };
  },
  methods: {
    getRandomStyle() {
      // Create random values for each snowflake
      const size = 8 + Math.random() * 12; // Random size between 8-20px
      const left = Math.random() * 100; // Random position from 0-100%
      const delay = Math.random() * 5; // Random delay up to 5s
      const duration = 5 + Math.random() * 10; // Random duration between 5-15s
      const opacity = 0.5 + Math.random() * 0.5; // Random opacity between 0.5-1

      return {
        "--size": `${size}px`,
        left: `${left}%`,
        "animation-delay": `${delay}s`,
        "animation-duration": `${duration}s`,
        opacity: opacity,
      };
    },
    async handleLogin() {
      this.loading = true;
      this.error = null;

      try {
        await login(this.username, this.password);
        // Redirect to dashboard after successful login
        this.$router.push("/dashboard");
      } catch (err) {
        this.error = err.message || "Credenciais inválidas. Tente novamente.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  padding: 20px;
  overflow: hidden;
  position: relative;
}

/* Snowflakes animation */
.snowflakes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.snowflake {
  position: absolute;
  top: -20px;
  font-size: var(--size);
  color: white;
  opacity: 0.8;
  animation: fall linear infinite;
  user-select: none;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
  animation-fill-mode: forwards;
}

@keyframes fall {
  to {
    transform: translateY(105vh) rotate(360deg);
  }
}

.login-form {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 1;
  overflow: visible; /* Allow the hat to be visible outside the form */
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

/* Snow around the form */
.login-form::before {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  pointer-events: none;
  z-index: -1;
}

.login-form::after {
  content: "❄ ❄ ❄ ❄ ❄ ❄ ❄ ❄ ❄ ❄";
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  letter-spacing: 8px;
  z-index: 0;
}

/* Christmas hat styles */
.christmas-hat {
  position: absolute;
  top: -148px; /* Position higher above the form */
  left: 1%; /* Position to the right side of the container */
  margin-left: 0px; /* Adjust to shift it back so it's at the edge */
  width: 400px;
  height: auto;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
.christmas-hat1 {
  position: absolute;
  top: -300px; /* Position higher above the form */
  left: 35%; /* Position to the right side of the container */
  margin-left: 0px; /* Adjust to shift it back so it's at the edge */
  width: 400px;
  height: auto;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.christmas-hat img {
  max-width: 400%;
  max-height: 200%;
  width: auto;
  height: auto;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
  margin-top: 20px; /* Add margin to account for the hat */
}

.login-header h2 {
  color: #1e293b;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 700;
}

.login-header p {
  color: #64748b;
  font-size: 14px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #334155;
  font-weight: 600;
  font-size: 14px;
}

.input-group input {
  width: 100%;
  padding: 14px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  font-size: 15px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.input-group input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.btn-login {
  width: 100%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 12px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #fecaca;
}
</style>
