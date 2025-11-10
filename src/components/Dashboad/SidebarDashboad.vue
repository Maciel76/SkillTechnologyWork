<template>
  <div class="sidebar" :class="{ 'sidebar-collapsed': collapsed }">
    <div class="sidebar-header">
      <h2 v-if="!collapsed">Agência Web</h2>
      <h2 v-else></h2>
      <button class="toggle-sidebar" @click="$emit('toggle')">
        <i
          class="fas"
          :class="collapsed ? 'fa-chevron-right' : 'fa-chevron-left'"
        ></i>
      </button>
    </div>

    <nav class="sidebar-nav">
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.id"
          :class="{ active: activeMenu === item.id }"
          @click="$emit('menu-change', item.id)"
        >
          <i :class="item.icon"></i>
          <span v-if="!collapsed">{{ item.name }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SidebarDashboard",
  props: {
    collapsed: Boolean,
    activeMenu: String,
    menuItems: Array,
  },
  emits: ["toggle", "menu-change"],
};
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar-collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar-header {
  padding: 28px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
}

.sidebar-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.toggle-sidebar {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.toggle-sidebar:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}

.sidebar-nav ul {
  list-style: none;
  padding: 16px 12px;
}

.sidebar-nav li {
  padding: 14px 18px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  font-weight: 500;
  font-size: 14.5px;
}

.sidebar-nav li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: linear-gradient(180deg, var(--primary), var(--secondary));
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0 3px 3px 0;
}

.sidebar-nav li:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.sidebar-nav li.active {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.15),
    rgba(139, 92, 246, 0.15)
  );
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.sidebar-nav li.active::before {
  transform: scaleY(1);
}

.sidebar-nav i {
  margin-right: 14px;
  width: 20px;
  text-align: center;
  font-size: 18px;
  transition: all 0.3s;
}

.sidebar-nav li:hover i {
  transform: scale(1.1);
}

.sidebar-collapsed .sidebar-nav span {
  display: none;
}

.sidebar-collapsed .sidebar-nav i {
  margin-right: 0;
}

.sidebar-collapsed .sidebar-nav li {
  justify-content: center;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }
}
</style>
