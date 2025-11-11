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
        <template v-for="item in menuItems" :key="item.id">
          <!-- Menu sem submenu -->
          <li
            v-if="!item.submenu"
            :class="{ active: activeMenu === item.id }"
            @click="handleMenuClick(item.id)"
            class="menu-item"
          >
            <i :class="item.icon"></i>
            <span v-if="!collapsed">{{ item.name }}</span>
          </li>

          <!-- Menu com submenu (dropdown) -->
          <li v-else class="menu-item has-dropdown">
            <div
              class="menu-item-header"
              @click="toggleDropdown(item.id)"
              :class="{ active: isAnySubmenuActive(item) }"
            >
              <div class="menu-item-content">
                <i :class="item.icon"></i>
                <span v-if="!collapsed">{{ item.name }}</span>
              </div>
              <i
                v-if="!collapsed"
                class="fas fa-chevron-down dropdown-icon"
                :class="{ rotated: isDropdownOpen(item.id) }"
              ></i>
            </div>

            <!-- Submenu items -->
            <transition name="dropdown">
              <ul
                v-if="!collapsed && isDropdownOpen(item.id)"
                class="submenu-list"
              >
                <li
                  v-for="subitem in item.submenu"
                  :key="subitem.id"
                  :class="{ active: activeMenu === subitem.id }"
                  @click.stop="handleMenuClick(subitem.id)"
                  class="submenu-item"
                >
                  <i :class="subitem.icon"></i>
                  <span>{{ subitem.name }}</span>
                </li>
              </ul>
            </transition>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SidebarDashboard",
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    activeMenu: {
      type: String,
      default: "dashboard",
    },
    menuItems: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["toggle", "menu-change"],
  data() {
    return {
      openDropdowns: {},
    };
  },
  methods: {
    handleMenuClick(menuId) {
      this.$emit("menu-change", menuId);
    },
    toggleDropdown(menuId) {
      if (this.collapsed) return;

      // Força a reatividade usando Vue.set ou atribuição direta
      this.openDropdowns = {
        ...this.openDropdowns,
        [menuId]: !this.openDropdowns[menuId],
      };
    },
    isDropdownOpen(menuId) {
      return !!this.openDropdowns[menuId];
    },
    isAnySubmenuActive(item) {
      if (!item.submenu) return false;
      return item.submenu.some((sub) => sub.id === this.activeMenu);
    },
  },
  watch: {
    activeMenu: {
      handler(newMenu) {
        // Auto-abrir dropdown que contém o item ativo
        this.menuItems.forEach((item) => {
          if (item.submenu) {
            const hasActive = item.submenu.some((sub) => sub.id === newMenu);
            if (hasActive) {
              this.openDropdowns = {
                ...this.openDropdowns,
                [item.id]: true,
              };
            }
          }
        });
      },
      immediate: true,
    },
  },
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

.menu-item {
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

.menu-item::before {
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

.menu-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.menu-item.active {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.15),
    rgba(139, 92, 246, 0.15)
  );
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.menu-item.active::before {
  transform: scaleY(1);
}

.sidebar-nav i {
  margin-right: 14px;
  width: 20px;
  text-align: center;
  font-size: 18px;
  transition: all 0.3s;
}

.menu-item:hover i {
  transform: scale(1.1);
}

/* Dropdown Styles */
.has-dropdown {
  flex-direction: column;
  padding: 0 !important;
  margin-bottom: 8px;
}

.menu-item-header {
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.menu-item-header::before {
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

.menu-item-header:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.menu-item-header:hover::before {
  transform: scaleY(0.5);
}

.menu-item-header.active {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2),
    rgba(139, 92, 246, 0.2)
  );
  border: 1px solid rgba(99, 102, 241, 0.4);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.menu-item-header.active::before {
  transform: scaleY(1);
}

.menu-item-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.dropdown-icon {
  font-size: 12px;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-left: auto;
  color: rgba(255, 255, 255, 0.7);
}

.dropdown-icon.rotated {
  transform: rotate(180deg);
  color: rgba(255, 255, 255, 1);
}

.submenu-list {
  list-style: none;
  padding: 12px 0 12px 0;
  margin: 0;

  margin-left: -12px;
  border-radius: 0 0 12px 12px;
}

.submenu-item {
  padding: 12px 18px 12px 45px !important;
  margin: 3px 8px;
  font-size: 13.5px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 500;
  list-style: none;
}

.submenu-item::before {
  content: "";
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.submenu-item i {
  margin-right: 12px;
  width: 16px;
  text-align: center;
  font-size: 14px;
  opacity: 0.8;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.submenu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(6px);
  padding-left: 48px !important;
}

.submenu-item:hover::before {
  background: rgba(255, 255, 255, 0.8);
  width: 8px;
  height: 8px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.submenu-item:hover i {
  opacity: 1;
  transform: scale(1.15);
}

.submenu-item.active {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.3),
    rgba(139, 92, 246, 0.3)
  );
  border: 1px solid rgba(99, 102, 241, 0.5);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
}

.submenu-item.active::before {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  width: 10px;
  height: 10px;
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.8);
}

.submenu-item.active i {
  opacity: 1;
  color: #fff;
}

/* Transition for dropdown */
.dropdown-enter-active {
  animation: slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dropdown-leave-active {
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideDown {
  from {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
  }
  to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }
}

.sidebar-collapsed .sidebar-nav span {
  display: none;
}

.sidebar-collapsed .sidebar-nav i {
  margin-right: 0;
}

.sidebar-collapsed .menu-item {
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
