<template>
  <header class="header">
    <div class="header-left">
      <button class="mobile-menu-btn" @click="$emit('toggle-mobile-menu')">
        <i class="fas fa-bars"></i>
      </button>
      <h1>{{ title }}</h1>
    </div>
    <div class="header-right">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Pesquisar..." />
      </div>
      <div class="user-actions">
        <button class="notification-btn">
          <i class="fas fa-bell"></i>
          <span class="notification-badge">3</span>
        </button>
        <div class="user-profile">
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=4361ee&color=fff"
            alt="Admin"
          />
          <span>Admin User</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderDashboard",
  props: {
    title: String,
  },
  emits: ["toggle-mobile-menu"],
};
</script>

<style scoped>
.header {
  height: var(--header-height);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--gray-200);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mobile-menu-btn {
  display: none;
  background: var(--gray-100);
  border: none;
  color: var(--gray-600);
  font-size: 18px;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-btn:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.header-left h1 {
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--gray-900) 0%, var(--gray-600) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.search-bar i {
  position: absolute;
  left: 16px;
  color: var(--gray-400);
  font-size: 16px;
  transition: color 0.3s;
}

.search-bar input {
  padding: 12px 20px 12px 44px;
  border: 2px solid var(--gray-200);
  border-radius: 14px;
  width: 280px;
  font-size: 14.5px;
  background: var(--gray-50);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--gray-900);
}

.search-bar input::placeholder {
  color: var(--gray-400);
}

.search-bar input:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  width: 320px;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notification-btn {
  position: relative;
  background: var(--gray-100);
  border: none;
  color: var(--gray-600);
  font-size: 18px;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-btn:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  font-size: 11px;
  font-weight: 600;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.9);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--gray-50);
}

.user-profile:hover {
  background: var(--gray-100);
  transform: translateY(-1px);
}

.user-profile img {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 2px solid white;
  box-shadow: var(--shadow-sm);
}

.user-profile span {
  font-weight: 600;
  color: var(--gray-700);
  font-size: 14.5px;
}

@media (max-width: 768px) {
  .header {
    padding: 0 20px;
  }

  .header-left h1 {
    font-size: 1.4rem;
  }

  .search-bar {
    display: none;
  }

  .user-profile span {
    display: none;
  }

  .user-profile {
    padding: 6px;
  }

  .mobile-menu-btn {
    display: flex;
  }
}

@media (max-width: 480px) {
  .header-left h1 {
    font-size: 1.2rem;
  }

  .notification-btn {
    width: 38px;
    height: 38px;
  }
}
</style>
