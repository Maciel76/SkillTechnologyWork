<template>
    <div class="dashboard-page">
      <div class="dashboard-container">
        <!-- Sidebar Navigation -->
        <aside class="dashboard-sidebar">
          <div class="logo">
            <img src="https://api.iconify.design/heroicons:bolt.svg" alt="Bolt icon" class="logo-icon">
            <span>Skill Technology</span>
          </div>
          <nav class="sidebar-nav">
            <a
              v-for="item in menuItems"
              :key="item.view"
              href="#"
              class="nav-item"
              :class="{ active: activeView === item.view }"
              @click="setActiveView(item.view, $event)"
            >
              <img :src="item.icon" :alt="item.label">
              {{ item.label }}
            </a>
          </nav>
        </aside>
  
        <!-- Overlay -->
        <div
          class="overlay"
          :class="{ active: overlayActive }"
          @click="closeOverlay"
          :style="overlayStyle"
        >
          <div class="overlay-content" @click.stop>
            <h3>{{ overlayTitle }}</h3>
            <ul>
              <li v-for="link in overlayLinks" :key="link.text">
                <a :href="link.url">{{ link.text }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeView: 'home',
        overlayActive: false,
        overlayTitle: '',
        overlayLinks: [],
        overlayStyle: {
          top: '0',
          left: '0',
        },
        menuItems: [
          { view: 'home', label: 'Home', icon: 'https://api.iconify.design/heroicons:document-text.svg' },
          { view: 'portfolio', label: 'Portfolio', icon: 'https://api.iconify.design/heroicons:plus-circle.svg' },
          { view: 'services', label: 'Services', icon: 'https://api.iconify.design/heroicons:tag.svg' },
          { view: 'plans', label: 'Plans', icon: 'https://api.iconify.design/heroicons:cog.svg' },
          { view: 'clients', label: 'Clients', icon: 'https://api.iconify.design/heroicons:cog.svg' },
          { view: 'store', label: 'Store', icon: 'https://api.iconify.design/heroicons:cog.svg' },
          { view: 'contact', label: 'Contact', icon: 'https://api.iconify.design/heroicons:cog.svg' },
          { view: 'settings', label: 'Settings', icon: 'https://api.iconify.design/heroicons:cog.svg' },
        ],
      };
    },
    methods: {
      setActiveView(view, event) {
        this.activeView = view;
        this.overlayActive = true;
        this.setOverlayContent(view);
  
        // Calcular a posição do item clicado
        const clickedElement = event.target.closest('.nav-item');
        if (clickedElement) {
          const rect = clickedElement.getBoundingClientRect();
          this.overlayStyle = {
            top: `${rect.top}px`,
            left: `${rect.right + 10}px`, // Ajuste para posicionar ao lado do item
          };
        }
      },
      closeOverlay() {
        this.overlayActive = false;
      },
      setOverlayContent(view) {
        switch (view) {
          case 'home':
            this.overlayTitle = 'Home';
            this.overlayLinks = [
              { text: 'Hero Section', url: '/ss' },
              { text: 'Profile', url: '#' },
              { text: 'Notifications', url: '#' },
            ];
            break;
          case 'portfolio':
            this.overlayTitle = 'Portfolio';
            this.overlayLinks = [
              { text: 'Projects', url: '#' },
              { text: 'Case Studies', url: '#' },
              { text: 'Testimonials', url: '#' },
            ];
            break;
          case 'services':
            this.overlayTitle = 'Services';
            this.overlayLinks = [
              { text: 'Web Development', url: '#' },
              { text: 'SEO', url: '#' },
              { text: 'Consulting', url: '#' },
            ];
            break;
          case 'plans':
            this.overlayTitle = 'Plans';
            this.overlayLinks = [
              { text: 'Basic', url: '#' },
              { text: 'Pro', url: '#' },
              { text: 'Enterprise', url: '#' },
            ];
            break;
          case 'clients':
            this.overlayTitle = 'Clients';
            this.overlayLinks = [
              { text: 'Client List', url: '#' },
              { text: 'Client Reviews', url: '#' },
              { text: 'Client Portal', url: '#' },
            ];
            break;
          case 'store':
            this.overlayTitle = 'Store';
            this.overlayLinks = [
              { text: 'Products', url: '#' },
              { text: 'Cart', url: '#' },
              { text: 'Checkout', url: '#' },
            ];
            break;
          case 'contact':
            this.overlayTitle = 'Contact';
            this.overlayLinks = [
              { text: 'Contact Form', url: '#' },
              { text: 'Support', url: '#' },
              { text: 'FAQ', url: '#' },
            ];
            break;
          case 'settings':
            this.overlayTitle = 'Settings';
            this.overlayLinks = [
              { text: 'Account Settings', url: '#' },
              { text: 'Privacy', url: '#' },
              { text: 'Security', url: '#' },
            ];
            break;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Sidebar Styles */
  .dashboard-sidebar {
    width: 250px;
    background: #ffffff;
    border-right: 1px solid #e5e7eb;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
  
  .sidebar-nav {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    height: 100vh;
  }
  
  .nav-item {
    display: flex;
    align-items: start;
    gap: 2px;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    color: #6b7280;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .nav-item img {
    width: 20px;
    height: 20px;
    opacity: 0.7;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 1.2rem;
  }
  
  .logo-icon {
    width: 24px;
    height: 24px;
  }
  
  .nav-item:hover {
    background: rgba(0, 82, 255, 0.1);
    color: #0052ff;
  }
  
  .nav-item.active {
    background: rgb(29, 140, 204);
    color: rgb(255, 255, 255);
  }
  
  .nav-item.active img {
    opacity: 1;
  }
  
  /* Overlay Styles */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: start;
    align-items: start;
    z-index: 1000;
  }
  
  .overlay.active {
    display: flex;
  }
  
  .overlay-content {
    background: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .overlay-content h3 {
    margin-bottom: 1rem;
  }
  
  .overlay-content ul {
    list-style: none;
    padding: 0;
  }
  
  .overlay-content ul li {
    margin-bottom: 0.5rem;
  }
  
  .overlay-content ul li a {
    text-decoration: none;
    color: #0052ff;
  }
  
  @media (max-width: 1024px) {
    .dashboard-sidebar {
      width: 80px;
      padding: 1rem;
    }
  
    .dashboard-sidebar .logo span,
    .nav-item span {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    .dashboard-container {
      flex-direction: column;
    }
  
    .dashboard-sidebar {
      width: 100%;
      height: auto;
      position: static;
      padding: 1rem;
    }
  
    .sidebar-nav {
      flex-direction: row;
      overflow-x: auto;
      margin: 1rem 0;
    }
  }
  </style>