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
            <a href="#" class="btn">Mais informações</a>
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
      events: [
        {
          title: "Dia da Família na Escola",
          description:
            "Evento especial para integração entre família e escola com atividades para todas as idades.",
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

@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
}
</style>
