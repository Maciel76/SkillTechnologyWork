<template>
    <main>
      <!-- Conteúdo da página -->
      <section class="features-section">
        <h2>O Que Você Recebe</h2>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">
                    <img src="https://api.iconify.design/heroicons:cog.svg" alt="Implementation">
                </div>
                <div class="feature-content">
                    <h3>Implementação Completa</h3>
                    <p>Desenvolvimento, configuração e integração dos sistemas de IA.</p>
                    <ul>
                        <li>Setup inicial do sistema</li>
                        <li>Integração com suas ferramentas</li>
                        <li>Treinamento da equipe</li>
                    </ul>
                </div>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <img src="https://api.iconify.design/heroicons:lifebuoy.svg" alt="Support">
                </div>
                <div class="feature-content">
                    <h3>Suporte Contínuo</h3>
                    <p>Atendimento pós-implantação para ajustes e melhorias.</p>
                    <ul>
                        <li>Suporte técnico 24/7</li>
                        <li>Atualizações regulares</li>
                        <li>Consultoria especializada</li>
                    </ul>
                </div>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <img src="https://api.iconify.design/heroicons:document-chart-bar.svg" alt="Reports">
                </div>
                <div class="feature-content">
                    <h3>Relatórios Detalhados</h3>
                    <p>Métricas de desempenho e análises para otimização.</p>
                    <ul>
                        <li>Dashboard personalizado</li>
                        <li>Análise de performance</li>
                        <li>Recomendações de melhoria</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    </main>  
</template>

<script>  
export default {
  name: 'FeaturesPage',
};
</script>

<style scoped >
/* Estilos globais ou específicos da página */
/* Features Section */
.features-section {
    padding: 5rem 5%;
    background: #E5E7EB;
}
.features-section h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.feature-card {
    background-color: #E5E7EB;
    border-radius: 16px;
    text-align: left; /* Alinha o texto à esquerda */
}


.feature-icon {
    margin-bottom: 0,5rem;
    display: flex;
    align-items: center; /* Alinha verticalmente */
    justify-content: flex-start; /* Alinha à esquerda */
}

.feature-icon img {
    width: 48px;
    height: 48px;
    color: var(--primary-color);
}

.feature-content ul {
    margin-top: 1rem;
    padding-left: 1.5rem;
}

.feature-content li {
    margin-bottom: 0.5rem;
    color: #E5E7EB;
}
</style>