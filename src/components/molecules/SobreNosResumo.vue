<template>
    <section class="about-section">
      <div class="about-content">
        <h2>Creative<span>Dev</span>Studio</h2>
        <p class="about-description">"Somos uma agência especializada em desenvolvimento web, criação de sistemas personalizados, lojas virtuais e sites institucionais. Utilizamos as tecnologias mais modernas para garantir alta performance e integramos as inteligências artificiais mais avançadas ao seu site para elevar a experiência do usuário, automatizar processos e impulsionar resultados."</p>
        <div class="stats">
          <div 
            v-for="(stat, index) in stats" 
            :key="index" 
            class="stat-item"
            :ref="el => statRefs[index] = el"
          >
            <span class="number">0</span>
            <span class="label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
      <div class="about-image"></div>
    </section>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  
  export default {
    name: 'AboutSection',
    setup() {
      const stats = ref([
        { value: 150, label: 'Projetos Entregues' },
        { value: 98, label: 'Satisfação do Cliente' },
        { value: 5, label: 'Anos de Experiência' }
      ])
      
      const statRefs = ref([])
  
      const animateCounters = () => {
        stats.value.forEach((stat, index) => {
          const element = statRefs.value[index]?.querySelector('.number')
          if (!element) return
          
          const target = stat.value
          const duration = 2000
          const increment = target / (duration / 16)
          let current = 0
          
          const updateCounter = () => {
            current += increment
            if (current < target) {
              element.textContent = Math.floor(current)
              requestAnimationFrame(updateCounter)
            } else {
              element.textContent = target + (index === 1 ? '%' : index === 2 ? '+' : '+')
            }
          }
          
          const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              updateCounter()
              observer.disconnect()
            }
          }, { threshold: 0.5 })
          
          observer.observe(element)
        })
      }
  
      onMounted(() => {
        animateCounters()
      })
  
      return {
        stats,
        statRefs
      }
    }
  }
  </script>
  
  <style scoped>
  .about-section {
    display: flex;
    padding: 5rem 10%;
    background: #f9f9f9;
    align-items: center;
    gap: 4rem;
  }
  
  .about-content {
    flex: 1;
    padding-right: 3rem;
  }
  
  .about-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #1E293B;
  }
  
  .about-content h2 span {
    color: #3B82F6;
  }
  
  .about-description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #555;
    font-style: italic;
  }
  
  .stats {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }
  
  .stat-item {
    text-align: center;
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 150px;
  }
  
  .number {
    display: block;
    font-size: 2.5rem;
    font-weight: bold;
    color: #3B82F6;
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 0.9rem;
    color: #64748B;
    font-weight: 500;
  }
  
  .about-image {
    flex: 1;
    height: 400px;
    background-image: url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
  
  @media (max-width: 1024px) {
    .about-section {
      flex-direction: column;
      gap: 2rem;
    }
    
    .about-content {
      padding-right: 0;
      text-align: center;
    }
    
    .stats {
      justify-content: center;
    }
    
    .about-image {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    .about-section {
      padding: 3rem 5%;
    }
    
    .stat-item {
      min-width: 120px;
      padding: 1rem;
    }
    
    .number {
      font-size: 2rem;
    }
  }
  </style>