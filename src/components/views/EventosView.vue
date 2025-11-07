<template>
  <div>
    <main>
      <section class="institutional-hero">
        <div class="hero-particles"></div>
        <div class="hero-content">
          <!-- <div class="hero-badge">Eventos Exclusivos</div> -->
          <h1 class="hero-title">
            <span class="title-line"> Eventos que Conectam</span>
            <span class="title-line highlight">Pessoas & Conhecimento</span>
          </h1>
          <p class="hero-subtitle">
            Participe de experiências transformadoras que conectam
            profissionais, compartilham conhecimento e impulsionam carreiras em
            tecnologia e inovação.
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">{{ upcomingEvents.length }}</span>
              <span class="stat-label">Próximos Eventos</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">{{ pastEvents.length }}+</span>
              <span class="stat-label">Eventos Realizados</span>
            </div>
          </div>
        </div>
      </section>

      <div class="institutional-content">
        <!-- Loading State -->
        <div v-if="eventStore.loading" class="loading-container">
          <div class="spinner"></div>
          <p>Carregando eventos...</p>
        </div>

        <!-- Error State -->
        <div
          v-if="eventStore.error && !eventStore.loading"
          class="error-message"
        >
          <img
            src="https://api.iconify.design/heroicons:exclamation-circle.svg"
            alt="Erro"
          />
          <span>{{ eventStore.error }}</span>
          <button @click="loadEvents" class="retry-button">
            Tentar novamente
          </button>
        </div>

        <!-- Empty State -->
        <div
          v-if="
            !eventStore.loading &&
            upcomingEvents.length === 0 &&
            !eventStore.error
          "
          class="empty-state"
        >
          <img
            src="https://api.iconify.design/heroicons:calendar-days.svg"
            alt="Sem eventos"
          />
          <h3>Nenhum evento agendado no momento</h3>
          <p>Fique atento! Em breve teremos novos eventos incríveis.</p>
        </div>

        <!-- Events Section -->
        <section
          class="content-section animate-on-scroll"
          v-if="upcomingEvents.length > 0"
        >
          <h2>Próximos Eventos</h2>
          <div class="events-grid">
            <div
              v-for="event in upcomingEvents"
              :key="event._id"
              class="event-card"
              @click="openEventModal(event)"
            >
              <div class="event-image">
                <img :src="event.image" :alt="event.title" />
                <div class="event-date">
                  <span class="day">{{ event.day }}</span>
                  <span class="month">{{ event.month }}</span>
                </div>
              </div>
              <div class="event-content">
                <h3>{{ event.title }}</h3>
                <p class="event-description">{{ event.description }}</p>
                <div class="event-details">
                  <div class="detail">
                    <img
                      src="https://api.iconify.design/heroicons:clock.svg"
                      alt="Horário"
                    />
                    <span>{{ event.time }}</span>
                  </div>
                  <div class="detail">
                    <img
                      src="https://api.iconify.design/heroicons:map-pin.svg"
                      alt="Local"
                    />
                    <span>{{ event.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Past Events Section -->
        <section
          class="content-section animate-on-scroll"
          v-if="pastEvents.length > 0"
        >
          <h2>Eventos Realizados</h2>
          <div class="events-grid">
            <div
              v-for="event in pastEvents"
              :key="event._id"
              class="event-card past-event"
              @click="openEventModal(event)"
            >
              <div class="event-image">
                <img :src="event.image" :alt="event.title" />
                <div class="event-date past">
                  <span class="day">{{ event.day }}</span>
                  <span class="month">{{ event.month }}</span>
                </div>
                <div class="past-badge">Realizado</div>
              </div>
              <div class="event-content">
                <h3>{{ event.title }}</h3>
                <p class="event-description">{{ event.description }}</p>
                <div class="event-details">
                  <div class="detail">
                    <img
                      src="https://api.iconify.design/heroicons:clock.svg"
                      alt="Horário"
                    />
                    <span>{{ event.time }}</span>
                  </div>
                  <div class="detail">
                    <img
                      src="https://api.iconify.design/heroicons:map-pin.svg"
                      alt="Local"
                    />
                    <span>{{ event.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Event Modal -->
        <div
          v-if="selectedEvent"
          class="event-modal"
          @click.self="closeEventModal"
        >
          <div class="modal-content">
            <button class="close-modal" @click="closeEventModal">
              <img
                src="https://api.iconify.design/heroicons:x-mark.svg"
                alt="Fechar"
              />
            </button>
            <img
              :src="selectedEvent.image"
              :alt="selectedEvent.title"
              class="modal-image"
            />
            <h2>{{ selectedEvent.title }}</h2>
            <div class="modal-details">
              <div class="detail">
                <img
                  src="https://api.iconify.design/heroicons:calendar.svg"
                  alt="Data"
                />
                <span>{{ selectedEvent.fullDate }}</span>
              </div>
              <div class="detail">
                <img
                  src="https://api.iconify.design/heroicons:clock.svg"
                  alt="Horário"
                />
                <span>{{ selectedEvent.time }}</span>
              </div>
              <div class="detail">
                <img
                  src="https://api.iconify.design/heroicons:map-pin.svg"
                  alt="Local"
                />
                <span>{{ selectedEvent.location }}</span>
              </div>
            </div>
            <p class="modal-description">
              {{ selectedEvent.fullDescription || selectedEvent.description }}
            </p>
            <div
              class="modal-gallery"
              v-if="selectedEvent.gallery && selectedEvent.gallery.length > 0"
            >
              <img
                v-for="(image, index) in selectedEvent.gallery"
                :key="index"
                :src="image"
                :alt="`${selectedEvent.title} - Imagem ${index + 1}`"
              />
            </div>
            <button
              v-if="isUpcomingEvent(selectedEvent)"
              class="register-button"
              @click="registerForEvent"
            >
              Inscrever-se
            </button>
          </div>
        </div>

        <!-- Registration Form Section -->
        <section class="content-section animate-on-scroll">
          <div class="subscription-container">
            <div class="subscription-header">
              <h2>Fique por Dentro</h2>
              <p class="subscription-subtitle">
                Seja o primeiro a saber sobre nossos próximos eventos
              </p>
            </div>

            <!-- Collapsed State: Only Button -->
            <div v-if="!showSubscriptionForm" class="subscription-collapsed">
              <button
                @click="expandSubscriptionForm"
                class="subscribe-cta-button"
              >
                <span class="button-icon">✉️</span>
                <span class="button-text"
                  >Quero receber notificações dos eventos</span
                >
                <span class="button-arrow">→</span>
              </button>
            </div>

            <!-- Expanded State: Form -->
            <div v-else class="subscription-expanded">
              <form @submit.prevent="subscribeToEvents" class="subscribe-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">Nome completo</label>
                    <input
                      id="name"
                      type="text"
                      v-model="subscribeForm.name"
                      placeholder="Digite seu nome"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">E-mail</label>
                    <input
                      id="email"
                      type="email"
                      v-model="subscribeForm.email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
                <div class="form-actions">
                  <button
                    type="button"
                    @click="collapseSubscriptionForm"
                    class="cancel-button"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    :disabled="isSubscribing"
                    class="submit-button"
                  >
                    <span v-if="!isSubscribing">Inscrever-se agora</span>
                    <span v-else class="loading-text">
                      <span class="spinner-small"></span>
                      Enviando...
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <!-- Success Modal -->
        <div
          v-if="showSuccessModal"
          class="success-modal"
          @click="closeSuccessModal"
        >
          <div class="success-content" @click.stop>
            <div class="success-animation">
              <div class="checkmark-circle">
                <svg class="checkmark" viewBox="0 0 52 52">
                  <circle
                    class="checkmark-circle-path"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    class="checkmark-check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
            </div>
            <h3>Inscrição realizada com sucesso!</h3>
            <p>
              Obrigado por se inscrever! Você receberá notificações sobre nossos
              próximos eventos diretamente no seu e-mail.
            </p>
            <button @click="closeSuccessModal" class="close-success-button">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useEventStore } from "../../stores/eventStore";
// Update the path below to the correct relative path if needed
import { Event } from "../../services/eventService";
import subscriptionService from "../../services/subscriptionService";

export default defineComponent({
  name: "EventoView",

  data() {
    return {
      eventStore: useEventStore(),
      selectedEvent: null as Event | null,
      isSubscribing: false,
      showSubscriptionForm: false,
      showSuccessModal: false,
      subscribeForm: {
        name: "",
        email: "",
      },
    };
  },

  computed: {
    upcomingEvents(): Event[] {
      return this.eventStore.getUpcomingPublishedEvents;
    },
    pastEvents(): Event[] {
      return this.eventStore.getPastPublishedEvents.slice(0, 6); // Mostrar até 6 eventos passados
    },
  },

  methods: {
    async loadEvents() {
      // Carregar TODOS os eventos publicados (sem filtro)
      // Os getters farão a separação entre futuros e passados
      await this.eventStore.fetchPublishedEvents();
    },

    isUpcomingEvent(event: Event): boolean {
      return new Date(event.date) >= new Date();
    },

    openEventModal(event: Event) {
      this.selectedEvent = event;
      document.body.style.overflow = "hidden";
    },

    closeEventModal() {
      this.selectedEvent = null;
      document.body.style.overflow = "auto";
    },

    registerForEvent() {
      // Implementar lógica de registro
      alert(
        "Registro realizado com sucesso! Você receberá mais informações por e-mail."
      );
      this.closeEventModal();
    },

    expandSubscriptionForm() {
      this.showSubscriptionForm = true;
    },

    collapseSubscriptionForm() {
      this.showSubscriptionForm = false;
      this.subscribeForm = { name: "", email: "" };
    },

    async subscribeToEvents() {
      try {
        this.isSubscribing = true;

        // Enviar para o backend
        await subscriptionService.subscribe({
          name: this.subscribeForm.name,
          email: this.subscribeForm.email,
        });

        // Limpar formulário e fechar
        this.subscribeForm = { name: "", email: "" };
        this.showSubscriptionForm = false;

        // Mostrar modal de sucesso
        this.showSuccessModal = true;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error ||
          "Erro ao realizar inscrição. Tente novamente.";
        alert(errorMessage);
      } finally {
        this.isSubscribing = false;
      }
    },

    closeSuccessModal() {
      this.showSuccessModal = false;
    },

    setupIntersectionObserver() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll(".animate-on-scroll").forEach((section) => {
        observer.observe(section);
      });
    },
  },

  async mounted() {
    // Carregar eventos publicados
    await this.loadEvents();

    // Setup intersection observer para animações
    this.setupIntersectionObserver();
  },

  unmounted() {
    // Garantir que o scroll volta ao normal ao sair
    document.body.style.overflow = "auto";
  },
});
</script>

<style scoped>
/* Hero Section - Elegant Design */
.institutional-hero {
  position: relative;
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  overflow: hidden;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 20% 50%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 40% 20%,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 50%
    );
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: fadeInDown 0.8s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease 0.2s backwards;
}

.title-line {
  display: block;
}

.title-line.highlight {
  background: linear-gradient(90deg, #fff, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.title-line.highlight::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  border-radius: 2px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.8;
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto 3rem;
  animation: fadeInUp 0.8s ease 0.4s backwards;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  animation: fadeInUp 0.8s ease 0.6s backwards;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(90deg, #fff, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.9;
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-divider {
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.3);
}

.institutional-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
}

.content-section {
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.content-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.content-section h2 {
  font-size: 2rem;
  color: #2064bd;
  margin-bottom: 2rem;
  text-align: center;
}

/* Loading & Error States */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e0e0e0;
  border-top-color: #2064bd;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 20px;
  border-radius: 8px;
  margin: 20px auto;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.error-message img {
  width: 32px;
  height: 32px;
}

.retry-button {
  padding: 8px 20px;
  background: #c33;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.retry-button:hover {
  background: #a22;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #666;
}

.empty-state img {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  opacity: 0.3;
}

.empty-state h3 {
  margin-bottom: 12px;
  color: #333;
}

/* Events Grid */
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.event-card.past-event {
  opacity: 0.85;
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
  min-width: 60px;
}

.event-date.past {
  background: #6b7280;
}

.event-date .day {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
}

.event-date .month {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  margin-top: 2px;
}

.past-badge {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.event-content {
  padding: 1.5rem;
}

.event-content h3 {
  margin-bottom: 0.75rem;
  color: #333;
  font-size: 1.25rem;
}

.event-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.event-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.detail img {
  width: 20px;
  height: 20px;
}

/* Event Modal */
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
  padding: 20px;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
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
  z-index: 10;
  padding: 8px;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.close-modal:hover {
  background: rgba(0, 0, 0, 0.1);
}

.close-modal img {
  width: 24px;
  height: 24px;
}

.modal-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.modal-content h2 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #333;
}

.modal-details {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.modal-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #555;
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
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.3s ease;
}

.register-button:hover {
  background: #1a4f96;
}

/* Subscription Section - Improved Design */
.subscription-container {
  max-width: 100%;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.subscription-container::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.subscription-header {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-bottom: 2rem;
}

.subscription-header h2 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subscription-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
}

/* Collapsed State */
.subscription-collapsed {
  position: relative;
  z-index: 1;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.subscribe-cta-button {
  width: 100%;
  padding: 1.5rem 2rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.subscribe-cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.button-icon {
  font-size: 1.5rem;
}

.button-text {
  flex: 1;
  text-align: center;
}

.button-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.subscribe-cta-button:hover .button-arrow {
  transform: translateX(5px);
}

/* Expanded State */
.subscription-expanded {
  position: relative;
  z-index: 1;
  animation: expandForm 0.5s ease;
}

@keyframes expandForm {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.subscribe-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  padding: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: white;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.cancel-button {
  flex: 1;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.submit-button {
  flex: 2;
  padding: 1rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Success Modal */
.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.success-content {
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-animation {
  margin-bottom: 2rem;
}

.checkmark-circle {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.checkmark {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.checkmark-circle-path {
  stroke: #4caf50;
  stroke-width: 2;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

.checkmark-check {
  stroke: #4caf50;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
}

.success-content h3 {
  font-size: 1.75rem;
  color: #333;
  margin-bottom: 1rem;
}

.success-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.close-success-button {
  padding: 1rem 2rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-success-button:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(76, 175, 80, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .institutional-hero {
    padding: 5rem 1.5rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 2rem;
  }

  .stat-divider {
    width: 60px;
    height: 1px;
  }

  .subscription-container {
    padding: 2rem 1.5rem;
  }

  .subscription-header h2 {
    font-size: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .subscribe-cta-button {
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
  }

  .events-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .modal-details {
    flex-direction: column;
    gap: 0.75rem;
  }

  .modal-gallery {
    grid-template-columns: 1fr;
  }
}
</style>
