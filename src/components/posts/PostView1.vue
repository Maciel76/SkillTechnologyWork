<template>
  <div class="blog-container">
    <!-- Botão Voltar -->
    <nav class="blog-navigation">
      <router-link to="/blog" class="back-button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Voltar para o Blog
      </router-link>
    </nav>

    <!-- Conteúdo do Post -->
    <article class="blog-article">
      <!-- Cabeçalho -->
      <header class="article-header">
        <div class="meta-info">
          <span class="category">{{ post.category }}</span>
          <time class="date">{{ formatDate(post.date) }}</time>
          <span class="reading-time">{{ post.readingTime }} min de leitura</span>
        </div>
        <h1 class="article-title">{{ post.title }}</h1>
        <div class="author-info">
          <img :src="post.author.avatar" :alt="post.author.name" class="author-avatar">
          <div>
            <span class="author-name">{{ post.author.name }}</span>
            <span class="author-title">{{ post.author.title }}</span>
          </div>
        </div>
      </header>

      <!-- Imagem de Destaque -->
      <figure class="featured-image">
        <img :src="post.image" :alt="post.title">
        <figcaption v-if="post.imageCaption">{{ post.imageCaption }}</figcaption>
      </figure>

      <!-- Conteúdo do Artigo -->
      <div class="article-content">
        <section class="introduction">
          <p class="lead">{{ post.excerpt }}</p>
        </section>

        <section v-for="(section, index) in post.content" :key="index" class="content-section">
          <h2>{{ section.heading }}</h2>
          <div v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex">
            <p v-if="paragraph.type === 'text'">{{ paragraph.text }}</p>
            <ul v-if="paragraph.type === 'list'">
              <li v-for="(item, iIndex) in paragraph.items" :key="iIndex">{{ item }}</li>
            </ul>
            <figure v-if="paragraph.type === 'image'" class="content-image">
              <img :src="paragraph.src" :alt="paragraph.alt">
              <figcaption v-if="paragraph.caption">{{ paragraph.caption }}</figcaption>
            </figure>
          </div>
        </section>

        <!-- Conclusão e CTA -->
        <section class="conclusion">
          <h2>Conclusão</h2>
          <p>{{ post.conclusion }}</p>
          <div class="cta-section">
            <h3>Gostou do conteúdo?</h3>
            <p>Assine nossa newsletter para receber mais artigos como este</p>
            <form class="newsletter-form">
              <input type="email" placeholder="Seu melhor e-mail" required>
              <button type="submit">Assinar</button>
            </form>
          </div>
        </section>
      </div>

      <!-- Tags e Compartilhamento -->
      <footer class="article-footer">
        <div class="tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
        <div class="social-sharing">
          <span>Compartilhe:</span>
          <button @click="share('twitter')" class="social-button twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.46 6.012a8.58 8.58 0 01-2.466.676 4.305 4.305 0 001.887-2.374 8.591 8.591 0 01-2.725 1.041 4.292 4.292 0 00-7.313 3.914 12.18 12.18 0 01-8.846-4.483 4.286 4.286 0 001.328 5.728 4.283 4.283 0 01-1.943-.537v.054a4.293 4.293 0 003.442 4.208 4.278 4.278 0 01-1.937.073 4.296 4.296 0 004.008 2.98 8.61 8.61 0 01-5.33 1.84c-.342 0-.68-.02-1.013-.058a12.135 12.135 0 006.574 1.926c7.883 0 12.2-6.525 12.2-12.2 0-.186-.004-.371-.012-.555a8.72 8.72 0 002.152-2.223z"/>
            </svg>
          </button>
          <button @click="share('linkedin')" class="social-button linkedin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>
          <button @click="share('facebook')" class="social-button facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
            </svg>
          </button>
        </div>
      </footer>

      <!-- Posts Relacionados -->
      <section class="related-posts">
        <h2>Leia também</h2>
        <div class="related-grid">
          <article v-for="related in relatedPosts" :key="related.id" class="related-card">
            <router-link :to="`/blog/${related.id}`">
              <div class="related-image-container">
                <img :src="related.image" :alt="related.title" class="related-image">
                <span class="related-category">{{ related.category }}</span>
              </div>
              <div class="related-content">
                <h3>{{ related.title }}</h3>
                <p>{{ related.excerpt }}</p>
                <div class="related-meta">
                  <time>{{ formatDate(related.date) }}</time>
                  <span>{{ related.readingTime }} min de leitura</span>
                </div>
              </div>
            </router-link>
          </article>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'BlogPost',
  setup() {
    const route = useRoute()
    const post = ref({
      id: 1,
      title: 'Como a Tecnologia Impulsiona a Inovação nas Empresas',
      category: 'Tecnologia',
      date: '2024-01-25',
      readingTime: 8,
      excerpt: 'No cenário empresarial atual, a tecnologia tem se tornado cada vez mais crucial para o sucesso e crescimento das organizações.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      imageCaption: 'Tecnologia transformando os negócios modernos',
      author: {
        name: 'João Silva',
        title: 'Especialista em Transformação Digital',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      content: [
        {
          heading: 'Transformação Digital',
          paragraphs: [
            {
              type: 'text',
              text: 'A transformação digital não é mais uma opção, mas uma necessidade para empresas que desejam manter-se competitivas.'
            },
            {
              type: 'list',
              items: [
                'Otimizar processos operacionais',
                'Melhorar a experiência do cliente',
                'Aumentar a eficiência operacional'
              ]
            },
            {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=2070&auto=format&fit=crop',
              alt: 'Transformação Digital em Ação',
              caption: 'Soluções digitais revolucionando os negócios'
            }
          ]
        },
        {
          heading: 'IA e Automação',
          paragraphs: [
            {
              type: 'text',
              text: 'A Inteligência Artificial e a automação estão redefinindo como as empresas operam.'
            },
            {
              type: 'list',
              items: [
                'Análise preditiva de dados',
                'Automação de tarefas repetitivas',
                'Tomada de decisão baseada em dados'
              ]
            }
          ]
        }
      ],
      conclusion: 'A tecnologia continuará sendo um catalisador fundamental para a inovação empresarial. Empresas que abraçarem essas mudanças estarão melhor posicionadas para o sucesso futuro.',
      tags: ['Tecnologia', 'Inovação', 'Empresas', 'Digital']
    })

    const relatedPosts = ref([
      {
        id: 2,
        title: 'O Futuro do Trabalho Remoto em 2024',
        category: 'Negócios',
        date: '2024-01-18',
        readingTime: 5,
        excerpt: 'Como as empresas estão se adaptando ao novo normal do trabalho remoto e híbrido.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: 3,
        title: 'Inteligência Artificial na Gestão Empresarial',
        category: 'Tecnologia',
        date: '2024-01-10',
        readingTime: 7,
        excerpt: 'Descubra como a IA está transformando a tomada de decisões nas organizações.',
        image: 'https://images.unsplash.com/photo-1677442135136-760c813cd9d3?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: 4,
        title: 'Tendências de Marketing Digital para 2024',
        category: 'Marketing',
        date: '2024-01-05',
        readingTime: 6,
        excerpt: 'As estratégias que vão dominar o cenário digital neste ano.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
      }
    ])

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const share = (platform) => {
      const url = encodeURIComponent(window.location.href)
      const title = encodeURIComponent(post.value.title)
      
      const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
      }

      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer')
    }

    // Simular busca de dados na API
    onMounted(() => {
      // Aqui você faria a chamada à API para buscar o post específico
      // baseado no route.params.id
      console.log('Carregando post:', route.params.id)
    })

    return {
      post,
      relatedPosts,
      formatDate,
      share
    }
  }
}
</script>

<style scoped>
/* Estilos Base */
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Navegação */
.blog-navigation {
  padding: 20px 0;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-button:hover {
  color: #3730a3;
}

.back-button svg {
  width: 16px;
  height: 16px;
}

/* Artigo Principal */
.blog-article {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 40px;
}

/* Cabeçalho do Artigo */
.article-header {
  padding: 40px 40px 20px;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #6b7280;
}

.category {
  background: #e0e7ff;
  color: #4f46e5;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
}

.article-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  color: #111827;
  margin-bottom: 24px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-weight: 600;
  color: #111827;
  display: block;
}

.author-title {
  font-size: 14px;
  color: #6b7280;
}

/* Imagem de Destaque */
.featured-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
}

.featured-image figcaption {
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
}

/* Conteúdo do Artigo */
.article-content {
  padding: 0 40px 40px;
  line-height: 1.8;
  color: #374151;
}

.introduction .lead {
  font-size: 20px;
  color: #4b5563;
  margin-bottom: 32px;
}

.content-section {
  margin-bottom: 40px;
}

.content-section h2 {
  font-size: 28px;
  color: #111827;
  margin: 40px 0 20px;
  font-weight: 600;
}

.content-section p {
  margin-bottom: 20px;
}

.content-section ul {
  margin: 20px 0;
  padding-left: 24px;
}

.content-section li {
  margin-bottom: 8px;
}

.content-image {
  margin: 24px 0;
  width: 100%;
  border-radius: 8px;
}

.content-image figcaption {
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  margin-top: 8px;
}

/* Conclusão e CTA */
.conclusion {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
}

.cta-section {
  background: #f9fafb;
  border-radius: 8px;
  padding: 24px;
  margin-top: 32px;
  text-align: center;
}

.cta-section h3 {
  font-size: 20px;
  color: #111827;
  margin-bottom: 8px;
}

.cta-section p {
  color: #6b7280;
  margin-bottom: 16px;
}

.newsletter-form {
  display: flex;
  max-width: 400px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px 0 0 6px;
  font-size: 14px;
}

.newsletter-form button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 0 6px 6px 0;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.newsletter-form button:hover {
  background: #4338ca;
}

/* Rodapé do Artigo */
.article-footer {
  padding: 24px 40px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f3f4f6;
  color: #4b5563;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.social-sharing {
  display: flex;
  align-items: center;
  gap: 12px;
}

.social-sharing span {
  font-size: 14px;
  color: #6b7280;
}

.social-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.social-button svg {
  width: 16px;
  height: 16px;
}

.social-button:hover {
  transform: translateY(-2px);
}

.twitter {
  color: #1da1f2;
  background: #e8f5fe;
}

.linkedin {
  color: #0077b5;
  background: #e8f0f8;
}

.facebook {
  color: #1877f2;
  background: #e8f0fe;
}

/* Posts Relacionados */
.related-posts {
  padding: 0 40px 40px;
}

.related-posts h2 {
  font-size: 24px;
  color: #111827;
  margin-bottom: 24px;
  font-weight: 600;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.related-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.related-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.related-image-container {
  position: relative;
  height: 180px;
}

.related-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-category {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.related-content {
  padding: 16px;
}

.related-content h3 {
  font-size: 18px;
  color: #111827;
  margin-bottom: 8px;
  font-weight: 600;
}

.related-content p {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 12px;
  line-height: 1.5;
}

.related-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #9ca3af;
}

/* Responsividade */
@media (max-width: 1024px) {
  .article-header,
  .article-content,
  .article-footer,
  .related-posts {
    padding-left: 24px;
    padding-right: 24px;
  }
  
  .article-title {
    font-size: 32px;
  }
  
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .article-header {
    padding-top: 24px;
  }
  
  .article-title {
    font-size: 28px;
  }
  
  .related-grid {
    grid-template-columns: 1fr;
  }
  
  .article-footer {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .social-sharing {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .meta-info {
    flex-wrap: wrap;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .newsletter-form {
    flex-direction: column;
    gap: 8px;
  }
  
  .newsletter-form input,
  .newsletter-form button {
    border-radius: 6px;
    width: 100%;
  }
}
</style>