<template>
    <main>
      <!-- Conteúdo da página -->
      <section class="services-section">
        <h2>Nossas Soluções de IA</h2>
        <div class="services-grid">
            <div class="service-card">
                <img src="https://api.iconify.design/heroicons:globe-alt.svg" alt="Websites">
                <h3>Websites Inteligentes</h3>
                <p>Sites personalizados que adaptam conteúdo com base no comportamento do usuário.</p>
                <a href="#" class="learn-more">Saiba mais →</a>
            </div>
            <div class="service-card">
                <img src="https://api.iconify.design/heroicons:device-phone-mobile.svg" alt="Apps">
                <h3>Apps com IA</h3>
                <p>Aplicativos que aprendem com o uso, oferecendo experiências otimizadas.</p>
                <a href="#" class="learn-more">Saiba mais →</a>
            </div>
            <div class="service-card">
                <img src="https://api.iconify.design/heroicons:photo.svg" alt="Content">
                <h3>Geração de Conteúdo</h3>
                <p>Criação automática de imagens e vídeos para campanhas e redes sociais.</p>
                <a href="#" class="learn-more">Saiba mais →</a>
            </div>
            <div class="service-card">
                <img src="https://api.iconify.design/heroicons:chat-bubble-left-right.svg" alt="Chatbot">
                <h3>Chatbots Inteligentes</h3>
                <p>Atendimento 24/7 com respostas rápidas e personalizadas.</p>
                <a href="#" class="learn-more">Saiba mais →</a>
            </div>
            <div class="service-card">
                <img src="https://api.iconify.design/heroicons:chart-bar.svg" alt="Analytics">
                <h3>Análise de Dados e BI</h3>
                <p>Insights valiosos para tomadas de decisão com base em análises preditivas.</p>
                <a href="#" class="learn-more">Saiba mais →</a>
            </div>
            <div class="service-card">
                <img src="https://api.iconify.design/heroicons:megaphone.svg" alt="Marketing">
                <h3>Marketing Automatizado</h3>
                <p>Segmentação de audiência e campanhas personalizadas automáticas.</p>
                <a href="#" class="learn-more">Saiba mais →</a>
            </div>
        </div>
    </section>
    </main>  
</template>

<script>  
export default {
  name: 'ServicesPage',
};
</script>

<style scoped >
/* Estilos globais ou específicos da página */
/* Services Grid */
.services-section {
    padding: 5rem 5%;
    background: #E5E7EB;
}

.services-section h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.service-card {
    
    padding: 2rem;
    border-radius: 16px;
    text-align: center;
    transition: transform 0.3s ease;
}

.service-card:hover {
    transform: translateY(-8px);
    
}

.service-card img {
    width: 48px;
    height: 48px;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
}

.service-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.service-card p {
    color: #4B5563;
    margin-bottom: 1.5rem;
}

.learn-more {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
}
/* Responsive Design */
@media (max-width: 1024px) {
    .hero-sectionn {
        flex-direction: column;
        text-align: center;
    }

    .services-grid,
    .benefits-grid,
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .testimonials-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .hero-contentn h1 {
        font-size: 2.5rem;
    }

    .services-grid,
    .benefits-grid,
    .features-grid {
        grid-template-columns: 1fr;
    }

    .contact-form {
        padding: 0 1rem;
    }
}
</style>