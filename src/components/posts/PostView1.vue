<template>
    <article class="blog-post">
      <!-- Header Section -->
      <header class="post-header">
        <h1>Como a Tecnologia Impulsiona a Inovação nas Empresas</h1>
        <div class="post-meta">
          <span class="author"><i class="fas fa-user"></i> João Silva</span>
          <span class="date"><i class="fas fa-calendar"></i> {{ formatDate('2024-01-25') }}</span>
          <span class="category"><i class="fas fa-folder"></i> Tecnologia</span>
        </div>
        <div class="post-tags">
          <span class="tag" v-for="tag in tags" :key="tag">#{{ tag }}</span>
        </div>
      </header>
  
      <!-- Featured Image  -->
      <img 
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
        alt="Tecnologia e Inovação Empresarial"
        class="featured-image"
      />
  
      <!-- Article Content -->
      <div class="post-content">
        <section class="introduction">
          <p>No cenário empresarial atual, a tecnologia tem se tornado cada vez mais crucial para o sucesso e crescimento das organizações. Este artigo explora como as inovações tecnológicas estão revolucionando o mundo dos negócios e criando novas oportunidades.</p>
        </section>
  
        <section class="main-content">
          <h2>Transformação Digital</h2>
          <p>A transformação digital não é mais uma opção, mas uma necessidade para empresas que desejam manter-se competitivas. Através da implementação de soluções digitais, organizações podem:</p>
          <ul>
            <li>Otimizar processos operacionais</li>
            <li>Melhorar a experiência do cliente</li>
            <li>Aumentar a eficiência operacional</li>
          </ul>
          <img 
            src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=2070&auto=format&fit=crop"
            alt="Transformação Digital em Ação"
            class="content-image"
          />
  
          <h2>IA e Automação</h2>
          <p>A Inteligência Artificial e a automação estão redefinindo como as empresas operam, permitindo:</p>
          <ul>
            <li>Análise preditiva de dados</li>
            <li>Automação de tarefas repetitivas</li>
            <li>Tomada de decisão baseada em dados</li>
          </ul>
  
          <h2>Futuro das Startups</h2>
          <p>As startups estão na vanguarda da inovação tecnológica, criando soluções disruptivas que desafiam modelos de negócios tradicionais.</p>
        </section>
  
        <section class="conclusion">
          <h2>Conclusão</h2>
          <p>A tecnologia continuará sendo um catalisador fundamental para a inovação empresarial. Empresas que abraçarem essas mudanças estarão melhor posicionadas para o sucesso futuro.</p>
          <div class="cta-section">
            <h3>Pronto para transformar sua empresa com tecnologia?</h3>
            <button class="cta-button" @click="handleContact">Entre em Contato</button>
          </div>
        </section>
      </div>
  
      <!-- Social Sharing -->
      <div class="social-sharing">
        <h3>Compartilhe este artigo</h3>
        <div class="share-buttons">
          <button @click="shareOnSocial('twitter')" class="share-button twitter">
            <i class="fab fa-twitter"></i> Twitter
          </button>
          <button @click="shareOnSocial('linkedin')" class="share-button linkedin">
            <i class="fab fa-linkedin"></i> LinkedIn
          </button>
          <button @click="shareOnSocial('facebook')" class="share-button facebook">
            <i class="fab fa-facebook"></i> Facebook
          </button>
        </div>
      </div>
  
      <!-- Comments Section -->
      <section class="comments-section">
        <h3>Comentários</h3>
        <div class="comments-list">
          <div v-for="comment in comments" :key="comment.id" class="comment">
            <div class="comment-header">
              <img :src="comment.avatar" :alt="comment.author" class="comment-avatar" />
              <div class="comment-meta">
                <span class="comment-author">{{ comment.author }}</span>
                <span class="comment-date">{{ formatDate(comment.date) }}</span>
              </div>
            </div>
            <p class="comment-content">{{ comment.content }}</p>
          </div>
        </div>
  
        <!-- Comment Form -->
        <form @submit.prevent="submitComment" class="comment-form">
          <div class="form-group">
            <label for="comment-name">Nome</label>
            <input 
              type="text" 
              id="comment-name"
              v-model="newComment.author"
              required
            />
          </div>
          <div class="form-group">
            <label for="comment-content">Comentário</label>
            <textarea 
              id="comment-content"
              v-model="newComment.content"
              required
            ></textarea>
          </div>
          <button type="submit" class="submit-button">Enviar Comentário</button>
        </form>
      </section>
    </article>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'PostView1',
    setup() {
      const tags = ref(['Tecnologia', 'Inovação', 'Empresas', 'Digital']);
      const comments = ref([]);
      const newComment = ref({
        author: '',
        content: ''
      });
  
      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };
  
      const shareOnSocial = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent('Como a Tecnologia Impulsiona a Inovação nas Empresas');
        
        const shareUrls = {
          twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
        };
  
        window.open(shareUrls[platform], '_blank');
      };
  
      const submitComment = () => {
        if (newComment.value.author && newComment.value.content) {
          comments.value.push({
            id: Date.now(),
            author: newComment.value.author,
            content: newComment.value.content,
            date: new Date().toISOString(),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newComment.value.author)}&background=random`
          });
  
          newComment.value = {
            author: '',
            content: ''
          };
        }
      };
  
      const handleContact = () => {
        // Implement contact functionality
        console.log('Contact button clicked');
      };
  
      return {
        tags,
        comments,
        newComment,
        formatDate,
        shareOnSocial,
        submitComment,
        handleContact
      };
    }
  };
  </script>
  
  <style scoped >
  .blog-post {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    color: var(--text-light);
  }
  
  .post-header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .post-header h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  .post-meta {
    display: flex;
    justify-content: center;
    gap: 2rem;
    color: var(--text-dark);
    margin-bottom: 1rem;
  }
  
  .post-tags {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .tag {
    background: var(--primary-color);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }
  
  .featured-image, .content-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2rem 0;
  }
  
  .post-content {
    line-height: 1.8;
    font-size: 1.1rem;
  }
  
  .post-content h2 {
    color: var(--primary-color);
    margin: 2rem 0 1rem;
  }
  
  .post-content ul {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  .social-sharing {
    margin: 3rem 0;
    text-align: center;
  }
  
  .share-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .share-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: opacity 0.3s;
  }
  
  .share-button:hover {
    opacity: 0.9;
  }
  
  .twitter { background: #1DA1F2; }
  .linkedin { background: #0077B5; }
  .facebook { background: #4267B2; }
  
  .comments-section {
    margin-top: 3rem;
  }
  
  .comment {
    background: var(--background-dark);
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  .comment-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .comment-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  .comment-form {
    margin-top: 2rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: var(--background-dark);
    color: var(--text-light);
  }
  
  .submit-button,
  .cta-button {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover,
  .cta-button:hover {
    background: var(--primary-dark);
  }
  
  .cta-section {
    text-align: center;
    margin: 3rem 0;
    padding: 2rem;
    background: var(--background-dark);
    border-radius: 8px;
  }
  </style>