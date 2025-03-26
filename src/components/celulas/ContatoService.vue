<template>
    <main>
      <!-- Conteúdo da página  -->
      <section class="contact-section">
        <div class="contact-content">
            <h2>Transforme seu Negócio com  IA</h2>
            <p>Entre em contato e descubra como podemos impulsionar seus resultados</p>
            <form id="contactForm" class="contact-form">
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" id="name" name="name" placeholder="Seu nome" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" placeholder="Seu e-mail" required>
                    </div>
                </div>
                <div class="form-group">
                    <select id="service" name="service" required>
                        <option value="">Selecione um serviço</option>
                        <option value="websites">Websites Inteligentes</option>
                        <option value="apps">Apps com IA</option>
                        <option value="content">Geração de Conteúdo</option>
                        <option value="chatbot">Chatbots</option>
                        <option value="analytics">Análise de Dados</option>
                        <option value="marketing">Marketing Automatizado</option>
                    </select>
                </div>
                <div class="form-group">
                    <textarea id="message" name="message" placeholder="Sua mensagem" required></textarea>
                </div>
                <button type="submit" class="cta-button1">Solicitar Demonstração</button>
            </form>
        </div>
    </section>
    </main>  
</template>

<style scoped >
/* Estilos globais ou específicos da página */
/* Contact Section */
.contact-section {
    padding: 4rem 5%; /* Substituído --section-padding */
    background: #0052FF; /* Substituído --primary-color */
    color: white;
    text-align: center;
}

.contact-content {
    max-width: 800px;
    margin: 0 auto;
}

.contact-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.contact-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.8);
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-row {
    display: flex;
    gap: 1.5rem;
}

.form-group {
    flex: 1;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;
    transition: background 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    background: rgba(255, 255, 255, 0.2);
    outline: none;
}

.form-group textarea {
    height: 150px;
    resize: vertical;
}
</style>