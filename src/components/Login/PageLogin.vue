<template>
  <div class="login-container">
    <div class="login-form">
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
import { login } from '@/services/authService';

export default {
  name: 'PageLogin',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      error: null
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = null;
      
      try {
        await login(this.username, this.password);
        // Redirect to dashboard after successful login
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.message || 'Credenciais inválidas. Tente novamente.';
      } finally {
        this.loading = false;
      }
    }
  }
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
}

.login-form {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
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