<template>
  <div>
    <main>
      <section class="institutional-hero">
        <h1>Nossos <span class="highlight">Eventos</span></h1>
        <p>
          Participe dos nossos eventos exclusivos e expanda seu conhecimento em
          tecnologia e inovação.
        </p>
      </section>

      <div class="institutional-content">
        <!-- Loading State -->
        <div v-if="eventStore.loading" class="loading-container">
          <div class="spinner"></div>
          <p>Carregando eventos...</p>
        </div>

        <!-- Error State -->
        <div v-if="eventStore.error && !eventStore.loading" class="error-message">
          <img
            src="https://api.iconify.design/heroicons:exclamation-circle.svg"
            alt="Erro"
          />
          <span>{{ eventStore.error }}</span>
          <button @click="loadEvents" class="retry-button">Tentar novamente</button>
        </div>

        <!-- Empty State -->
        <div v-if="!eventStore.loading && upcomingEvents.length === 0 && !eventStore.error" class="empty-state">
          <img
            src="https://api.iconify.design/heroicons:calendar-days.svg"
            alt="Sem eventos"
          />
          <h3>Nenhum evento agendado no momento</h3>
          <p>Fique atento! Em breve teremos novos eventos incríveis.</p>
        </div>

        <!-- Events Section -->
        <section class="content-section animate-on-scroll" v-if="upcomingEvents.length > 0">
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
        <section class="content-section animate-on-scroll" v-if="pastEvents.length > 0">
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
            <div class="modal-gallery" v-if="selectedEvent.gallery && selectedEvent.gallery.length > 0">
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
          <h2>Fique por Dentro</h2>
          <div class="registration-form">
            <p>Receba notificações sobre nossos próximos eventos:</p>
            <form @submit.prevent="subscribeToEvents" class="subscribe-form">
              <div class="form-group">
                <input
                  type="text"
                  v-model="subscribeForm.name"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="email"
                  v-model="subscribeForm.email"
                  placeholder="Seu e-mail"
                  required
                />
              </div>
              <button type="submit" :disabled="isSubscribing">
                {{ isSubscribing ? "Enviando..." : "Inscrever-se" }}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEventStore } from '@/stores/eventStore';
import { Event } from '@/services/eventService';

export default defineComponent({
  name: "EventoView",

  data() {
    return {
      eventStore: useEventStore(),
      selectedEvent: null as Event | null,
      isSubscribing: false,
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
      alert("Registro realizado com sucesso! Você receberá mais informações por e-mail.");
      this.closeEventModal();
    },

    async subscribeToEvents() {
      try {
        this.isSubscribing = true;
        // Aqui você pode adicionar a lógica para enviar para o backend
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("Inscrição realizada com sucesso! Você receberá notificações sobre nossos eventos.");
        this.subscribeForm = { name: "", email: "" };
      } catch (error) {
        alert("Erro ao realizar inscrição. Tente novamente.");
      } finally {
        this.isSubscribing = false;
      }
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
.institutional-hero {
  color: rgb(48, 48, 48);
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.institutional-hero::before {
  content: "";
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

.highlight {
  color: #0052ff;
  position: relative;
}

.highlight::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(48, 105, 42, 0.2);
  z-index: 0;
  border-radius: 4px;
  transform: skewX(-15deg);
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
  to { transform: rotate(360deg); }
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

/* Registration Form */
.registration-form {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.registration-form p {
  margin-bottom: 1.5rem;
  color: #666;
}

.subscribe-form {
  display: grid;
  gap: 1rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #2064bd;
}

.subscribe-form button {
  padding: 0.75rem;
  background: #2064bd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.3s ease;
}

.subscribe-form button:hover:not(:disabled) {
  background: #1a4f96;
}

.subscribe-form button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .institutional-hero h1 {
    font-size: 2rem;
  }

  .institutional-hero p {
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
