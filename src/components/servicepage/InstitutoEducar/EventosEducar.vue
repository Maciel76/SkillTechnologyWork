<template>
  <section class="section" id="events">
    <div class="container">
      <h2 class="section-title">Próximos Eventos</h2>
      <div class="events-grid">
        <div class="event-card" v-for="(event, index) in events" :key="index">
          <div class="event-image">
            <img :src="event.image" :alt="event.title" />
            <div class="event-date">
              <span class="day">{{ event.day }}</span>
              <span class="month">{{ event.month }}</span>
            </div>
          </div>
          <div class="event-content">
            <h3>{{ event.title }}</h3>
            <p>{{ event.description }}</p>
            <div class="event-meta">
              <span><i class="fas fa-clock"></i> {{ event.time }}</span>
              <span
                ><i class="fas fa-map-marker-alt"></i>
                {{ event.location }}</span
              >
            </div>
            <button class="btn" @click="openModal(index)">
              Mais informações
            </button>
          </div>
        </div>
      </div>

      <!-- Modal/Overlay -->
      <div
        class="event-modal"
        :class="{ active: modalOpen }"
        @click.self="closeModal"
      >
        <div class="modal-content" v-if="selectedEvent">
          <button class="close-btn" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
          <div class="modal-grid">
            <div class="modal-image">
              <img :src="selectedEvent.image" :alt="selectedEvent.title" />
            </div>
            <div class="modal-details">
              <div class="modal-date">
                <span class="day">{{ selectedEvent.day }}</span>
                <span class="month">{{ selectedEvent.month }}</span>
              </div>
              <h3>{{ selectedEvent.title }}</h3>
              <p class="event-description">{{ selectedEvent.description }}</p>

              <div class="event-info">
                <div class="info-item">
                  <i class="fas fa-clock"></i>
                  <div>
                    <h4>Horário</h4>
                    <p>{{ selectedEvent.time }}</p>
                  </div>
                </div>

                <div class="info-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <div>
                    <h4>Local</h4>
                    <p>{{ selectedEvent.location }}</p>
                  </div>
                </div>

                <div class="info-item" v-if="selectedEvent.details">
                  <i class="fas fa-info-circle"></i>
                  <div>
                    <h4>Detalhes</h4>
                    <p>{{ selectedEvent.details }}</p>
                  </div>
                </div>
              </div>

              <div class="modal-actions">
                <button class="btn btn-primary">Confirmar Presença</button>
                <button class="btn btn-outline">Compartilhar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "EventsEducar",
  data() {
    return {
      modalOpen: false,
      selectedEvent: null,
      events: [
        {
          title: "Dia da Família na Escola",
          description:
            "Evento especial para integração entre família e escola com atividades para todas as idades.",
          details:
            "Traga sua família para um dia de integração com diversas atividades: jogos cooperativos, oficinas criativas, apresentações culturais e um delicioso piquenique comunitário. Haverá sorteio de brindes e atividades especiais para crianças de todas as idades.",
          day: "15",
          month: "MAI",
          time: "09:00 - 12:00",
          location: "Pátio Principal",
          image:
            "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Feira de Ciências",
          description:
            "Apresentação de projetos científicos desenvolvidos pelos alunos durante o semestre.",
          details:
            "Nossa feira de ciências deste ano terá como tema 'Soluções Sustentáveis para o Futuro'. Os alunos apresentarão projetos inovadores nas áreas de energia renovável, reciclagem criativa e tecnologias verdes. Venha conhecer e votar no seu projeto favorito! Premiação às 16h30.",
          day: "22",
          month: "MAI",
          time: "14:00 - 17:00",
          location: "Laboratórios",
          image:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Festival Cultural",
          description:
            "Apresentações artísticas e culturais dos alunos: música, dança, teatro e artes visuais.",
          details:
            "O tradicional festival cultural deste ano homenageará a diversidade brasileira. Teremos apresentações de capoeira, danças regionais, coral infantil, peça teatral 'O Auto da Compadecida' adaptada pelos alunos e exposição de artes visuais com tema 'Brasil: Nossas Cores e Formas'. Não perca!",
          day: "05",
          month: "JUN",
          time: "19:00 - 21:00",
          location: "Auditório",
          image:
            "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        },
      ],
    };
  },
  methods: {
    openModal(index) {
      this.selectedEvent = this.events[index];
      this.modalOpen = true;
      document.body.style.overflow = "hidden"; // Impede scroll da página quando modal está aberto
    },
    closeModal() {
      this.modalOpen = false;
      document.body.style.overflow = ""; // Restaura scroll da página
    },
  },
};
</script>

<style scoped>
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.event-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.event-card:hover {
  transform: translateY(-10px);
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
  top: 20px;
  left: 20px;
  background: var(--accent-color);
  color: white;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  width: 50px;
}

.event-date .day {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
}

.event-date .month {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.event-content {
  padding: 20px;
}

.event-content h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.event-content p {
  color: #666;
  margin-bottom: 15px;
}

.event-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  color: #777;
  font-size: 0.9rem;
}

.event-meta span {
  display: flex;
  align-items: center;
}

.event-meta i {
  margin-right: 5px;
  color: var(--secondary-color);
}

/* Estilos do Modal/Overlay */
.event-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.event-modal.active {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #777;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: var(--accent-color);
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.modal-image {
  height: 100%;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
}

.modal-details {
  padding: 30px;
}

.modal-date {
  background: var(--accent-color);
  color: white;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  width: 60px;
  margin-bottom: 20px;
}

.modal-date .day {
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1;
}

.modal-date .month {
  display: block;
  font-size: 0.9rem;
  text-transform: uppercase;
}

.modal-details h3 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-size: 1.8rem;
}

.event-description {
  color: #555;
  margin-bottom: 25px;
  line-height: 1.6;
}

.event-info {
  margin: 30px 0;
}

.info-item {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.info-item i {
  font-size: 1.5rem;
  color: var(--secondary-color);
  margin-top: 3px;
}

.info-item h4 {
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.info-item p {
  color: #666;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-primary {
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--accent-dark-color);
}

.btn-outline {
  background: none;
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background-color: var(--accent-color);
  color: white;
}

/* Responsividade */
@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
  }

  .modal-grid {
    grid-template-columns: 1fr;
  }

  .modal-image img {
    border-radius: 10px 10px 0 0;
    max-height: 200px;
  }

  .modal-details {
    padding: 20px;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>
