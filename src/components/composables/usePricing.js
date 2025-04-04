// src/composables/usePricing.js
import { ref, onMounted } from 'vue';

export function usePricing() {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  const currentTheme = ref(savedTheme);
  const isModalOpen = ref(false);
  const selectedPlan = ref(null);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    currentTheme.value = newTheme;
    updateThemeIcon(newTheme);
  };

  // Update theme icon
  const updateThemeIcon = (theme) => {
    const icon = document.getElementById('themeToggle')?.querySelector('img');
    if (icon) {
      icon.src = `https://api.iconify.design/heroicons:${theme === 'light' ? 'moon' : 'sun'}.svg`;
    }
  };

  // Pricing Data
  const pricingData = {
    websites: [
      {
        name: 'Plano Básico',
        price: 'R$ 500',
        period: 'One Page',
        features: [
          'Design Responsivo',
          'Otimização para SEO',
          'Formulário de Contato',
          'Integração com Redes Sociais',
          'Hospedagem por 1 ano',
        ],
        description: 'Ideal para profissionais liberais e pequenos negócios que precisam de uma presença online profissional.',
      },
      // Adicione mais planos conforme necessário
    ],
    // Adicione outras categorias (apps, design, etc.) aqui
  };

  // Load plans for a category
  const loadPlans = (category) => {
    return pricingData[category] || [];
  };

  // Show plan details in modal
  const showPlanDetails = (plan) => {
    selectedPlan.value = plan;
    isModalOpen.value = true;
  };

  // Close modal
  const closeModal = () => {
    isModalOpen.value = false;
  };

  // Initialize theme on mount
  onMounted(() => {
    document.documentElement.setAttribute('data-theme', currentTheme.value);
    updateThemeIcon(currentTheme.value);
  });

  return {
    currentTheme,
    toggleTheme,
    pricingData,
    loadPlans,
    showPlanDetails,
    closeModal,
    isModalOpen,
    selectedPlan,
  };
}