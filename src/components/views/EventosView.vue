<template>
    <div>
      <main>
        <section class="institutional-hero">
          <h1>Nossos <span class="highlight">Eventos</span></h1>
          <p>Participe dos nossos eventos exclusivos e expanda seu conhecimento em tecnologia e inovação.</p>
        </section>
  
        <div class="institutional-content">
          <!-- Features Section -->
          <section class="content-section animate-on-scroll">
            <h2>Por que Participar?</h2>
            <div class="features-grid">
              <div class="feature-card">
                <img src="https://api.iconify.design/heroicons:academic-cap.svg" alt="Aprendizado" />
                <h3>Aprendizado Prático</h3>
                <p>Workshops hands-on com especialistas da indústria.</p>
              </div>
              <div class="feature-card">
                <img src="https://api.iconify.design/heroicons:user-group.svg" alt="Networking" />
                <h3>Networking</h3>
                <p>Conecte-se com profissionais e empresas do setor.</p>
              </div>
              <div class="feature-card">
                <img src="https://api.iconify.design/heroicons:light-bulb.svg" alt="Inovação" />
                <h3>Inovação</h3>
                <p>Conheça as últimas tendências e tecnologias do mercado.</p>
              </div>
            </div>
          </section>
  
          <!-- Events Section -->
          <section class="content-section animate-on-scroll">
            <h2>Próximos Eventos</h2>
            <div class="events-grid">
              <div v-for="(event, index) in events" :key="index" class="event-card" @click="openEventModal(event)">
                <div class="event-image">
                  <img :src="event.image" :alt="event.title" />
                  <div class="event-date">
                    <span class="day">{{ event.date.day }}</span>
                    <span class="month">{{ event.date.month }}</span>
                  </div>
                </div>
                <div class="event-content">
                  <h3>{{ event.title }}</h3>
                  <p class="event-description">{{ event.description }}</p>
                  <div class="event-details">
                    <div class="detail">
                      <img src="https://api.iconify.design/heroicons:clock.svg" alt="Horário" />
                      <span>{{ event.time }}</span>
                    </div>
                    <div class="detail">
                      <img src="https://api.iconify.design/heroicons:map-pin.svg" alt="Local" />
                      <span>{{ event.location }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  
          <!-- Event Modal -->
          <div v-if="selectedEvent" class="event-modal" @click.self="closeEventModal">
            <div class="modal-content">
              <button class="close-modal" @click="closeEventModal">
                <img src="https://api.iconify.design/heroicons:x-mark.svg" alt="Fechar" />
              </button>
              <img :src="selectedEvent.image" :alt="selectedEvent.title" class="modal-image" />
              <h2>{{ selectedEvent.title }}</h2>
              <div class="modal-details">
                <div class="detail">
                  <img src="https://api.iconify.design/heroicons:calendar.svg" alt="Data" />
                  <span>{{ `${selectedEvent.date.day} ${selectedEvent.date.month}` }}</span>
                </div>
                <div class="detail">
                  <img src="https://api.iconify.design/heroicons:clock.svg" alt="Horário" />
                  <span>{{ selectedEvent.time }}</span>
                </div>
                <div class="detail">
                  <img src="https://api.iconify.design/heroicons:map-pin.svg" alt="Local" />
                  <span>{{ selectedEvent.location }}</span>
                </div>
              </div>
              <p class="modal-description">{{ selectedEvent.fullDescription }}</p>
              <div class="modal-gallery">
                <img v-for="(image, index) in selectedEvent.gallery" :key="index" :src="image" :alt="`${selectedEvent.title} - Imagem ${index + 1}`" />
              </div>
              <button class="register-button" @click="registerForEvent">Inscrever-se</button>
            </div>
          </div>
  
          <!-- Registration Form Section -->
          <section class="content-section animate-on-scroll">
            <h2>Fique por Dentro</h2>
            <div class="registration-form">
              <p>Receba notificações sobre nossos próximos eventos:</p>
              <form @submit.prevent="subscribeToEvents" class="subscribe-form">
                <div class="form-group">
                  <input type="text" v-model="subscribeForm.name" placeholder="Seu nome" required />
                </div>
                <div class="form-group">
                  <input type="email" v-model="subscribeForm.email" placeholder="Seu e-mail" required />
                </div>
                <button type="submit" :disabled="isSubscribing">
                  {{ isSubscribing ? 'Enviando...' : 'Inscrever-se' }}
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'EventoView',
    components: {
    },
    data() {
      return {
        selectedEvent: null,
        isSubscribing: false,
        subscribeForm: {
          name: '',
          email: ''
        },
        events: [
          {
            title: 'Workshop de React Native',
            description: 'Aprenda a criar aplicativos móveis com React Native.',
            fullDescription: 'Um workshop intensivo de desenvolvimento mobile com React Native. Aprenda desde os conceitos básicos até técnicas avançadas de desenvolvimento de aplicativos.',
            date: { day: '15', month: 'JUN' },
            time: '09:00 - 18:00',
            location: 'São Paulo, SP',
            image: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=500',
            gallery: [
              'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500',
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500',
              'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500'
            ]
          },
          {
            title: 'Conferência de IA',
            description: 'Descubra o futuro da Inteligência Artificial.',
            fullDescription: 'Uma conferência exclusiva sobre as últimas tendências em IA, com palestras de especialistas renomados e demonstrações práticas de tecnologias inovadoras.',
            date: { day: '22', month: 'JUL' },
            time: '10:00 - 17:00',
            location: 'Rio de Janeiro, RJ',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500',
            gallery: [
              'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500',
              'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500',
              'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500'
            ]
          }
        ]
      };
    },
    methods: {
      openEventModal(event) {
        this.selectedEvent = event;
        document.body.style.overflow = 'hidden';
      },
      closeEventModal() {
        this.selectedEvent = null;
        document.body.style.overflow = 'auto';
      },
      registerForEvent() {
        // Implementar lógica  de registro
        alert('Registro realizado com sucesso!');
        this.closeEventModal();
      },
      async subscribeToEvents() {
        try {
          this.isSubscribing = true;
          await new Promise(resolve => setTimeout(resolve, 1000));
          alert('Inscrição realizada com sucesso!');
          this.subscribeForm = { name: '', email: '' };
        } catch (error) {
          alert('Erro ao realizar inscrição. Tente novamente.');
        } finally {
          this.isSubscribing = false;
        }
      }
    },
    mounted() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );
  
      document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
      });
    }
  };
  </script>
  
  <style scoped>
  .institutional-hero {
    background: linear-gradient(135deg, #2064bd, #1a4f96);
    color: white;
    padding: 6rem 0;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .institutional-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
  }
  
  .institutional-hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    position: relative;
  }
  
  .institutional-hero .highlight {
    color: #4CAF50;
  }
  
  .institutional-hero p {
    font-size: 1.25rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
  }
  
  .institutional-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 1rem;
  }
  
  .content-section {
    margin-bottom: 4rem;
  }
  
  .content-section h2 {
    font-size: 2rem;
    color: #2064bd;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }
  
  .feature-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
  }
  
  .feature-card img {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
  }
  
  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .event-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .event-card:hover {
    transform: translateY(-5px);
  }
  
  .event-image {
    position: relative;
    height: 200px;
  }
  
  .event-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .event-date {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #2064bd;
    color: white;
    padding: 0.5rem;
    border-radius: 5px;
    text-align: center;
  }
  
  .event-date .day {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .event-content {
    padding: 1.5rem;
  }
  
  .event-description {
    color: #666;
    margin: 1rem 0;
  }
  
  .event-details {
    display: flex;
    gap: 1rem;
  }
  
  .detail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .detail img {
    width: 20px;
    height: 20px;
  }
  
  .event-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }
  
  .close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .modal-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1.5rem;
  }
  
  .modal-details {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .modal-description {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  .modal-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .modal-gallery img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .register-button {
    width: 100%;
    padding: 1rem;
    background: #2064bd;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .register-button:hover {
    background: #1a4f96;
  }
  
  .registration-form {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  
  .subscribe-form {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  </style>