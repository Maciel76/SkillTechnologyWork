<template>
  <div
    class="dashboard-container"
    :class="{ 'sidebar-collapsed-global': sidebarCollapsed }"
  >
    <Sidebar
      :collapsed="sidebarCollapsed"
      :active-menu="activeMenu"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @menu-change="setActiveMenu"
    />

    <div class="main-content" :class="{ expanded: sidebarCollapsed }">
      <AppHeader
        :title="getActiveMenuTitle"
        @toggle-mobile-menu="toggleMobileMenu"
      />

      <div
        v-if="mobileMenuOpen"
        class="mobile-overlay"
        @click="toggleMobileMenu"
      ></div>

      <div class="content">
        <DashboardOverview v-if="activeMenu === 'dashboard'" />
        <LeadsManagement v-if="activeMenu === 'leads'" />
        <BlogManagement v-if="activeMenu === 'blog'" />
        <ServicesManagement v-if="activeMenu === 'services'" />
        <PortfolioManagement v-if="activeMenu === 'portfolio'" />
        <TestimonialsManagement v-if="activeMenu === 'testimonials'" />
        <EcommerceManagement v-if="activeMenu === 'ecommerce'" />
        <EventsManagement v-if="activeMenu === 'events'" />
        <StatsCards v-if="activeMenu === 'dashboard'" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Dashboad/layout/SidebarDashboad.vue";
import AppHeader from "@/components/Dashboad/layout/HeaderDashboad.vue";
import DashboardOverview from "@/components/Dashboad/DashboardOverview.vue";
import LeadsManagement from "@/components/Dashboad/sections/LeadsManagement.vue";
import BlogManagement from "@/components/Dashboad/sections/BlogManagement.vue";
import ServicesManagement from "@/components/Dashboad/sections/ServicesManagement.vue";
import PortfolioManagement from "@/components/Dashboad/sections/PortfolioManagement.vue";
import TestimonialsManagement from "@/components/Dashboad/sections/TestimonialsManagement.vue";
import EcommerceManagement from "@/components/Dashboad/sections/EcommerceManagement.vue";
import EventsManagement from "@/components/Dashboad/sections/EventsManagement.vue";
import StatsCards from "@/components/Dashboad/StatsCards.vue";

export default {
  name: "DashboardView",
  components: {
    Sidebar,
    AppHeader,
    DashboardOverview,
    LeadsManagement,
    BlogManagement,
    ServicesManagement,
    PortfolioManagement,
    TestimonialsManagement,
    EcommerceManagement,
    EventsManagement,
    StatsCards,
  },
  data() {
    return {
      sidebarCollapsed: false,
      mobileMenuOpen: false,
      activeMenu: "dashboard",
      menuItems: [
        { id: "dashboard", name: "Dashboard", icon: "fas fa-tachometer-alt" },
        { id: "leads", name: "Leads", icon: "fas fa-users" },
        { id: "blog", name: "Blog", icon: "fas fa-blog" },
        { id: "services", name: "Serviços", icon: "fas fa-concierge-bell" },
        { id: "portfolio", name: "Portfólio", icon: "fas fa-briefcase" },
        { id: "testimonials", name: "Depoimentos", icon: "fas fa-comment" },
        { id: "ecommerce", name: "Loja Virtual", icon: "fas fa-shopping-cart" },
        { id: "events", name: "Eventos", icon: "fas fa-calendar" },
      ],
    };
  },
  computed: {
    getActiveMenuTitle() {
      const item = this.menuItems.find((item) => item.id === this.activeMenu);
      return item ? item.name : "Dashboard";
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    setActiveMenu(menuId) {
      this.activeMenu = menuId;
      if (this.mobileMenuOpen) {
        this.mobileMenuOpen = false;
      }
    },
  },
};
</script>

<style>
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --primary-light: #818cf8;
  --secondary: #8b5cf6;
  --success: #10b981;
  --danger: #ef4444;
  --warning: #f59e0b;
  --info: #3b82f6;
  --light: #f9fafb;
  --dark: #0f172a;
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-300: #cbd5e1;
  --gray-400: #94a3b8;
  --gray-500: #64748b;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1e293b;
  --gray-900: #0f172a;
  --sidebar-width: 280px;
  --sidebar-collapsed-width: 80px;
  --header-height: 80px;
  --border-radius: 16px;
  --border-radius-sm: 12px;
  --border-radius-lg: 20px;
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.05),
    0 1px 2px -1px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08),
    0 4px 6px -4px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08),
    0 8px 10px -6px rgba(0, 0, 0, 0.08);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%);
  color: var(--gray-900);
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.dashboard-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%);
  position: relative;
}

.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  min-height: 100vh;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-content.expanded {
  margin-left: var(--sidebar-collapsed-width);
  width: calc(100% - var(--sidebar-collapsed-width));
}

.content {
  flex: 1;
  padding: 36px 40px;
  background: transparent;
  min-height: calc(100vh - var(--header-height));
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;
}

/* Common Styles */
.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
}

.btn-secondary {
  background: white;
  color: var(--primary);
  border: 2px solid var(--gray-200);
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  background: var(--gray-50);
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-900);
  letter-spacing: -0.5px;
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
}

.data-table thead {
  background: linear-gradient(135deg, var(--gray-50), var(--gray-100));
}

.data-table th {
  padding: 18px 20px;
  text-align: left;
  font-weight: 700;
  color: var(--gray-700);
  border-bottom: 2px solid var(--gray-200);
  font-size: 13.5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-table td {
  padding: 18px 20px;
  border-bottom: 1px solid var(--gray-200);
  color: var(--gray-700);
  font-size: 14.5px;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tbody tr {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.data-table tbody tr:hover {
  background: var(--gray-50);
  transform: scale(1.01);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.status-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.3px;
  display: inline-block;
}

.status-badge.novo {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
}

.status-badge.contatado {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #b45309;
}

.status-badge.proposta {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
}

.status-badge.fechado {
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  color: #9f1239;
}

.status-badge.ativo {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
}

.status-badge.esgotado {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #991b1b;
}

.action-btn {
  background: var(--gray-100);
  border: none;
  cursor: pointer;
  padding: 8px;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0 4px;
}

.action-btn.edit {
  color: var(--primary);
}

.action-btn.edit:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.action-btn.delete {
  color: var(--danger);
}

.action-btn.delete:hover {
  background: var(--danger);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0 !important;
    width: 100% !important;
  }

  .mobile-overlay {
    display: block;
  }

  .content {
    padding: 20px 16px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .section-header h2 {
    font-size: 1.6rem;
  }
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}
.card {
  background: white;
  border-radius: 12px;
  padding: 14px;
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
  text-align: left;
}
.card-title {
  font-size: 0.9rem;
  color: var(--gray-600, #64748b);
  margin-bottom: 6px;
  font-weight: 600;
}
.card-value {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--primary, #6366f1);
}
.card-sub {
  font-size: 0.8rem;
  color: var(--gray-400, #94a3b8);
  margin-top: 6px;
}
</style>
